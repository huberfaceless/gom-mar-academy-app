import { 
  PublishingJob, 
  SchedulerJob, 
  PublishResult, 
  SchedulerExecutionLog,
  toCanonicalStatus 
} from '../types/contentEngine';
import { FirestoreContentService } from './firestoreContentService';
import { pinterestService } from './pinterestService';
import { doc, runTransaction } from 'firebase/firestore';
import { db, isFirestoreOperational, handleFirestoreError } from '../firebase/config';
import { loadAllPublishingJobs, saveAllPublishingJobs } from '../utils/contentStorage';

/**
 * Sanitizes log messages and error strings to guarantee no OAuth tokens or secrets leak into logs
 */
function sanitizeLogText(text?: string): string | undefined {
  if (!text) return text;
  return text
    .replace(/Bearer\s+[A-Za-z0-9_\-\.]+/gi, 'Bearer [REDACTED]')
    .replace(/access_token=([A-Za-z0-9_\-\.]+)/gi, 'access_token=[REDACTED]')
    .replace(/pina_[A-Za-z0-9_\-\.]+/gi, 'pina_[REDACTED]')
    .replace(/AIza[0-9A-Za-z-_]{35}/g, '[FIREBASE_KEY_REDACTED]');
}

/**
 * Server-side Publishing and Scheduler Service
 * Operates on real UTC timestamps, guarantees idempotency, enforces max attempts with exponential backoff,
 * records detailed execution audit logs without sensitive tokens, and executes independently of browser presence.
 */
export type YouTubeVideoPublisher = (job: PublishingJob) => Promise<PublishResult>;

export class PublishingService {

  // ==========================================
  // 1. ATOMIC CLAIMING & LOCK MANAGEMENT
  // ==========================================

  /**
   * Atomically claims a job for execution using a Firestore transaction or memory-safe lock fallback.
   * Prevents multiple server instances or concurrent workers from processing the same job.
   */
  static async claimJobAtomically(
    jobId: string,
    workerId: string = `worker_${typeof process !== 'undefined' && process.pid ? process.pid : 'srv'}_${Math.random().toString(36).substring(2, 7)}`
  ): Promise<{ success: boolean; reason?: string; job?: PublishingJob }> {
    const nowIso = new Date().toISOString();

    // Fallback if Firestore is not operational (e.g. API disabled in GCP)
    if (!isFirestoreOperational()) {
      const allJobs = loadAllPublishingJobs();
      const idx = allJobs.findIndex(j => j.id === jobId);
      if (idx === -1) return { success: false, reason: 'not_found' };

      const job = allJobs[idx];
      if (job.status === 'PUBLISHED' || job.publishedAt || (job.externalId && job.externalId.length > 0)) {
        return { success: false, reason: 'already_published', job };
      }

      if (job.status === 'PUBLISHING') {
        const lockExpires = job.lockExpiresAt ? new Date(job.lockExpiresAt).getTime() : 0;
        if (lockExpires > Date.now()) {
          return { success: false, reason: 'locked_by_other' };
        }
      } else if (job.status !== 'SCHEDULED') {
        return { success: false, reason: `invalid_status_${job.status}` };
      }

      const maxAttempts = job.maxAttempts || 3;
      const nextAttemptNumber = (job.attempts || 0) + 1;
      if (nextAttemptNumber > maxAttempts) {
        job.status = 'FAILED';
        job.lastError = job.lastError || 'Maximale Anzahl an Versuchen überschritten.';
        job.updatedAt = nowIso;
        saveAllPublishingJobs(allJobs);
        return { success: false, reason: 'max_attempts_exceeded' };
      }

      const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const claimedJob: PublishingJob = {
        ...job,
        status: 'PUBLISHING',
        lockedAt: nowIso,
        lockedBy: workerId,
        lockExpiresAt,
        attempts: nextAttemptNumber,
        updatedAt: nowIso,
      };
      allJobs[idx] = claimedJob;
      saveAllPublishingJobs(allJobs);
      return { success: true, job: claimedJob };
    }

    try {
      const jobDocRef = doc(db, 'publishingJobs', jobId);

      return await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(jobDocRef);
        if (!docSnap.exists()) {
          return { success: false, reason: 'not_found' };
        }

        const data = docSnap.data() as PublishingJob;
        const job: PublishingJob = { ...data, id: docSnap.id };

        // 🔒 1. Idempotency check: If already published, never process again
        if (job.status === 'PUBLISHED' || job.publishedAt || (job.externalId && job.externalId.length > 0)) {
          return { success: false, reason: 'already_published', job };
        }

        // 🔒 2. Concurrency & Lock check
        if (job.status === 'PUBLISHING') {
          const lockExpires = job.lockExpiresAt ? new Date(job.lockExpiresAt).getTime() : 0;
          const isLockActive = lockExpires > Date.now();
          if (isLockActive) {
            // Another worker instance holds an active lock
            return { success: false, reason: 'locked_by_other' };
          }
          // Lock is expired (> 10 min) -> Crash Recovery: reclaim job
          console.info(`[PublishingService] Reclaiming expired lock for job ${job.id} (Crash Recovery)`);
        } else if (job.status !== 'SCHEDULED') {
          return { success: false, reason: `invalid_status_${job.status}` };
        }

        // 🔒 3. Max Attempts Guard
        const maxAttempts = job.maxAttempts || 3;
        const nextAttemptNumber = (job.attempts || 0) + 1;
        if (nextAttemptNumber > maxAttempts) {
          transaction.update(jobDocRef, {
            status: 'FAILED',
            lastError: job.lastError || 'Maximale Anzahl an Versuchen überschritten.',
            updatedAt: nowIso,
          });
          return { success: false, reason: 'max_attempts_exceeded' };
        }

        // 🔒 4. Atomic Lock State Update (10 min timeout)
        const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        transaction.update(jobDocRef, {
          status: 'PUBLISHING',
          lockedAt: nowIso,
          lockedBy: workerId,
          lockExpiresAt,
          attempts: nextAttemptNumber,
          updatedAt: nowIso,
        });

        const claimedJob: PublishingJob = {
          ...job,
          status: 'PUBLISHING',
          lockedAt: nowIso,
          lockedBy: workerId,
          lockExpiresAt,
          attempts: nextAttemptNumber,
          updatedAt: nowIso,
        };

        return { success: true, job: claimedJob };
      });
    } catch (err: unknown) {
      handleFirestoreError(err);
      console.warn(`[PublishingService] Atomic claim failed for job ${jobId}:`, err);
      return { success: false, reason: err instanceof Error ? err.message : 'transaction_failed' };
    }
  }


  // ==========================================
  // 1. PLATFORM PUBLISH METHODS
  // ==========================================

  /**
   * Publishes an article to WordPress / CMS.
   * In this phase: strictly returns NOT_IMPLEMENTED (NO fake publishing!).
   */
  static async publishArticle(job: PublishingJob): Promise<PublishResult> {
    console.info(`[PublishingService] publishArticle invoked for job ${job.id}`);
    return {
      success: false,
      status: 'NOT_IMPLEMENTED',
      error: 'WordPress / Blog API Veröffentlichung ist in dieser Entwicklungsphase noch nicht angebunden.',
    };
  }

  /**
   * Publishes a Pinterest Pin using genuine Pinterest API v5 integration.
   */
  static async publishPin(job: PublishingJob, accessToken?: string): Promise<PublishResult> {
    console.info(`[PublishingService] publishPin invoked for job ${job.id}`);
    
    // Resolve token from param or from stored settings
    const token = (accessToken && accessToken.trim().length > 0)
      ? accessToken.trim()
      : (typeof window !== 'undefined' ? pinterestService.loadAccountConfig().accessToken : '');

    if (!token || token.trim().length === 0) {
      return {
        success: false,
        status: 'NOT_CONNECTED',
        error: 'Pinterest ist nicht verbunden. Bitte hinterlege einen Pinterest Access Token in den Einstellungen.',
      };
    }

    if (!job.payload?.boardId) {
      return {
        success: false,
        status: 'FAILED',
        error: 'Kein Pinterest Board für diesen Pin im Payload hinterlegt.',
      };
    }

    try {
      // If we are in node/server environment, execute directly against Pinterest API or local server endpoint
      const payload: Record<string, unknown> = {
        title: (job.payload.title || 'Pin').slice(0, 100),
        description: (job.payload.description || '').slice(0, 500),
        link: job.payload.targetUrl || 'https://vital50.gomo-marketing.at/',
        alt_text: (job.payload.title || 'Pin').slice(0, 500),
        board_id: job.payload.boardId,
      };

      if (job.payload.imageUrl && (job.payload.imageUrl.startsWith('http://') || job.payload.imageUrl.startsWith('https://'))) {
        payload.media_source = {
          source_type: 'image_url',
          url: job.payload.imageUrl,
        };
      } else if (job.payload.imageBase64) {
        payload.media_source = {
          source_type: 'image_base64',
          content_type: 'image/png',
          data: job.payload.imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        };
      } else {
        payload.media_source = {
          source_type: 'image_url',
          url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80',
        };
      }

      // Reject demo/placeholder token in production publishing path
      if (token.toLowerCase() === 'demo' || token.startsWith('demo_')) {
        return {
          success: false,
          status: 'NOT_CONNECTED',
          error: 'Demo-Token erkannt: Pinterest API Zugriff ist noch nicht autorisiert (echter API Access Token erforderlich).',
        };
      }

      const response = await fetch('https://api.pinterest.com/v5/pins', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = (await response.json().catch(() => ({}))) as Record<string, any>;
        return {
          success: false,
          status: 'FAILED',
          error: errData.message || `Pinterest Pin Veröffentlichung fehlgeschlagen (HTTP ${response.status}).`,
        };
      }

      const createdPin = (await response.json()) as Record<string, any>;
      return {
        success: true,
        status: 'PUBLISHED',
        externalId: createdPin.id,
        publishedUrl: createdPin.pin_url || (createdPin.id ? `https://www.pinterest.com/pin/${createdPin.id}/` : undefined),
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unerwarteter Fehler bei der Pinterest-Veröffentlichung.';
      return {
        success: false,
        status: 'FAILED',
        error: msg,
      };
    }
  }

  /**
   * Publishes a previously uploaded, unlisted YouTube video through the server callback.
   */
  static async publishVideo(
    job: PublishingJob,
    youtubeVideoPublisher?: YouTubeVideoPublisher,
  ): Promise<PublishResult> {
    console.info(`[PublishingService] publishVideo invoked for job ${job.id}`);
    const videoId = job.payload?.metadata?.videoId;
    if (typeof videoId !== 'string' || !videoId) {
      return {
        success: false,
        status: 'FAILED',
        error: 'Vor der Planung muss das fertige Video als „Nicht gelistet“ zu YouTube hochgeladen werden.',
      };
    }
    if (!youtubeVideoPublisher) {
      return {
        success: false,
        status: 'FAILED',
        error: 'Die geplante YouTube-Veröffentlichung kann nur durch den Server-Scheduler ausgeführt werden.',
      };
    }
    return youtubeVideoPublisher(job);
  }

  /**
   * Publishes a YouTube Short.
   * In this phase: strictly returns NOT_IMPLEMENTED (NO fake publishing!).
   */
  static async publishShort(job: PublishingJob): Promise<PublishResult> {
    console.info(`[PublishingService] publishShort invoked for job ${job.id}`);
    return {
      success: false,
      status: 'NOT_IMPLEMENTED',
      error: 'YouTube Shorts Upload API ist in dieser Entwicklungsphase noch nicht angebunden.',
    };
  }

  // ==========================================
  // 2. QUEUE & SCHEDULER ORCHESTRATION
  // ==========================================

  /**
   * Enqueues a content item into the publishing queue and creates a matching scheduler job.
   */
  static async enqueueJob(
    userId: string,
    params: {
      projectId: string;
      contentProjectId: string;
      contentId: string;
      platform: PublishingJob['platform'];
      contentType: PublishingJob['contentType'];
      scheduledAt: string;
      payload: PublishingJob['payload'];
    }
  ): Promise<{ publishingJob: PublishingJob; schedulerJob: SchedulerJob }> {
    const isPinterestPin = params.platform === 'PINTEREST' && params.contentType === 'PIN';
    const isUploadedYouTubeVideo = params.platform === 'YOUTUBE'
      && params.contentType === 'VIDEO'
      && typeof params.payload?.metadata?.videoId === 'string'
      && params.payload.metadata.videoId.length > 0;
    if (!isPinterestPin && !isUploadedYouTubeVideo) {
      throw new Error('Für diesen Inhalt ist die automatische Veröffentlichung noch nicht verfügbar.');
    }

    const existingJobs = await FirestoreContentService.getPublishingJobs(userId, params.contentProjectId);
    const existingJob = existingJobs.find(job =>
      job.contentId === params.contentId
      && !['FAILED', 'CANCELLED'].includes(job.status),
    );
    if (existingJob) {
      throw new Error('Dieser Inhalt befindet sich bereits in der Publishing Queue.');
    }

    const jobId = `pub_job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const schedulerJobId = `sched_job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const publishingJob: PublishingJob = {
      id: jobId,
      userId,
      projectId: params.projectId,
      contentProjectId: params.contentProjectId,
      contentId: params.contentId,
      platform: params.platform,
      contentType: params.contentType,
      scheduledAt: params.scheduledAt || now,
      status: 'SCHEDULED',
      attempts: 0,
      maxAttempts: 3,
      payload: params.payload,
      executionLogs: [],
      createdAt: now,
      updatedAt: now,
    };

    const schedulerJob: SchedulerJob = {
      id: schedulerJobId,
      userId,
      publishingJobId: jobId,
      scheduledAt: params.scheduledAt || now,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    };

    await FirestoreContentService.savePublishingJob(userId, publishingJob);
    await FirestoreContentService.saveSchedulerJob(userId, schedulerJob);

    return { publishingJob, schedulerJob };
  }

  /**
   * Processes a single job with Idempotency check, Retry management, and Logging.
   * Triggered either by server scheduler cron, API webhook, or manual UI test.
   */
  static async processJob(
    userId: string,
    job: PublishingJob,
    pinterestToken?: string,
    triggeredBy: 'SCHEDULER_CRON' | 'MANUAL_RUN' | 'API_TRIGGER' = 'MANUAL_RUN',
    persistWithClient: boolean = true,
    youtubeVideoPublisher?: YouTubeVideoPublisher,
  ): Promise<{ job: PublishingJob; result: PublishResult }> {
    const startedAt = new Date().toISOString();

    // 🔒 1. IDEMPOTENCY CHECK
    // If job is already PUBLISHED or has externalId, avoid double posting!
    if (job.status === 'PUBLISHED' || job.publishedAt || (job.externalId && job.externalId.length > 0)) {
      console.info(`[PublishingService] Idempotency guard: Job ${job.id} already PUBLISHED. Skipping.`);
      return {
        job,
        result: {
          success: true,
          status: 'PUBLISHED',
          externalId: job.externalId,
          publishedUrl: job.publishedUrl,
          error: 'Job wurde bereits in einem früheren Durchlauf erfolgreich veröffentlicht (Idempotency Guard).',
        },
      };
    }

    const currentAttempts = job.status === 'PUBLISHING' ? (job.attempts || 1) : ((job.attempts || 0) + 1);
    const maxAttempts = job.maxAttempts || 3;

    // Transition to PUBLISHING state if not already locked
    if (job.status !== 'PUBLISHING') {
      await FirestoreContentService.updatePublishingJobStatus(userId, job.id, 'PUBLISHING', undefined, {
        attempts: currentAttempts,
      });
    }

    let result: PublishResult;

    // 2. PLATFORM ROUTING
    switch (job.platform) {
      case 'PINTEREST':
        result = await this.publishPin(job, pinterestToken);
        break;
      case 'BLOG':
        result = await this.publishArticle(job);
        break;
      case 'YOUTUBE':
        if (job.contentType === 'SHORT') {
          result = await this.publishShort(job);
        } else {
          result = await this.publishVideo(job, youtubeVideoPublisher);
        }
        break;
      default:
        result = {
          success: false,
          status: 'FAILED',
          error: `Unbekannte Plattform: ${job.platform}`,
        };
    }

    const completedAt = new Date().toISOString();
    const isSuccess = result.success;

    // 3. RETRY & EXPONENTIAL BACKOFF CALCULATION
    let nextAttemptAt: string | undefined = undefined;
    let finalStatus: PublishingJob['status'] = 'PUBLISHED';

    if (isSuccess) {
      finalStatus = 'PUBLISHED';
    } else {
      const isFatal = currentAttempts >= maxAttempts || result.status === 'NOT_IMPLEMENTED';
      if (isFatal) {
        finalStatus = 'FAILED';
      } else {
        finalStatus = 'SCHEDULED';
        // Exponential Backoff: Attempt 1 -> 5 min, Attempt 2 -> 15 min, Attempt 3 -> 45 min
        const backoffMinutes = currentAttempts === 1 ? 5 : (currentAttempts === 2 ? 15 : 45);
        nextAttemptAt = new Date(Date.now() + backoffMinutes * 60000).toISOString();
      }
    }

    const cleanError = sanitizeLogText(result.error);

    // 4. AUDIT LOG CREATION (No sensitive tokens logged)
    const logEntry: SchedulerExecutionLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      jobId: job.id,
      userId,
      platform: job.platform,
      contentType: job.contentType,
      startedAt,
      completedAt,
      status: finalStatus,
      attempts: currentAttempts,
      maxAttempts,
      lastError: isSuccess ? undefined : (cleanError || 'Fehler beim Publishing'),
      publishedAt: isSuccess ? completedAt : undefined,
      publishedUrl: result.publishedUrl,
      externalId: result.externalId,
      triggeredBy,
    };

    const existingLogs = job.executionLogs || [];
    const updatedLogs = [logEntry, ...existingLogs].slice(0, 10); // Keep last 10 audit logs

    // 5. UPDATE FIRESTORE JOB & RELEASE LOCK
    const updatedJob: PublishingJob = {
      ...job,
      status: finalStatus,
      attempts: currentAttempts,
      lastError: isSuccess ? undefined : (cleanError || 'Veröffentlichung nicht erfolgreich'),
      nextAttemptAt,
      publishedAt: isSuccess ? (job.publishedAt || completedAt) : undefined,
      publishedUrl: isSuccess ? (result.publishedUrl || job.publishedUrl) : undefined,
      externalId: isSuccess ? (result.externalId || job.externalId) : undefined,
      lockedAt: undefined,
      lockedBy: undefined,
      lockExpiresAt: undefined,
      executionLogs: updatedLogs,
      updatedAt: completedAt,
    };

    if (!persistWithClient) return { job: updatedJob, result };

    await FirestoreContentService.savePublishingJob(userId, updatedJob);

    // 6. SYNC TO CENTRAL CONTENT PROJECT & SCHEDULER JOBS
    const syncStatus = isSuccess ? 'published' : (finalStatus === 'FAILED' ? 'failed' : 'scheduled');
    await this.syncJobStatusToContentProject(userId, updatedJob, syncStatus);

    // Sync SchedulerJob status
    try {
      const schedJobs = await FirestoreContentService.getSchedulerJobs(userId);
      const matchingSched = schedJobs.find((s) => s.publishingJobId === job.id);
      if (matchingSched) {
        const schedStatus = isSuccess ? 'COMPLETED' : (finalStatus === 'FAILED' ? 'FAILED' : 'PENDING');
        await FirestoreContentService.updateSchedulerJobStatus(userId, matchingSched.id, schedStatus, cleanError);
      }
    } catch {
      // Non-blocking sync
    }

    return { job: updatedJob, result };
  }

  /**
   * Resets attempts and triggers a retry for a failed or scheduled job.
   */
  static async retryJob(
    userId: string,
    job: PublishingJob,
    pinterestToken?: string
  ): Promise<{ job: PublishingJob; result: PublishResult }> {
    const resetJob: PublishingJob = {
      ...job,
      attempts: 0,
      lastError: undefined,
      nextAttemptAt: undefined,
      status: 'SCHEDULED',
      updatedAt: new Date().toISOString(),
    };
    await FirestoreContentService.savePublishingJob(userId, resetJob);
    return this.processJob(userId, resetJob, pinterestToken, 'MANUAL_RUN');
  }

  /**
   * Helper to sync the job outcome back into the CentralContentProject model in Firestore
   */
  private static async syncJobStatusToContentProject(
    userId: string,
    job: PublishingJob,
    contentStatus: 'published' | 'failed' | 'scheduled'
  ): Promise<void> {
    try {
      const project = await FirestoreContentService.getContentProjectById(userId, job.contentProjectId);
      if (!project) return;

      let changed = false;

      // Check blog
      if (job.contentId === 'blog_main' && project.blogArticle) {
        project.blogArticle.status = contentStatus;
        if (job.publishedUrl) project.blogArticle.publishedUrl = job.publishedUrl;
        changed = true;
      }

      // Check YouTube Video
      if (job.contentId === 'yt_video_main' && project.youtubeVideo) {
        project.youtubeVideo.status = contentStatus;
        if (job.publishedUrl) project.youtubeVideo.videoUrl = job.publishedUrl;
        changed = true;
      }

      // Check Pins
      if (project.pinterestPins) {
        project.pinterestPins = project.pinterestPins.map((pin) => {
          if (pin.id === job.contentId) {
            changed = true;
            return {
              ...pin,
              status: contentStatus,
              publishedPinId: job.externalId || pin.publishedPinId,
              publishedUrl: job.publishedUrl || pin.publishedUrl,
            };
          }
          return pin;
        });
      }

      // Check Shorts
      if (project.youtubeShorts) {
        project.youtubeShorts = project.youtubeShorts.map((short) => {
          if (short.id === job.contentId) {
            changed = true;
            return {
              ...short,
              status: contentStatus,
            };
          }
          return short;
        });
      }

      // Check Calendar items
      if (project.calendarItems) {
        project.calendarItems = project.calendarItems.map((item) => {
          if (item.id === job.contentId) {
            changed = true;
            return {
              ...item,
              status: contentStatus,
              publishingJobId: job.id,
            };
          }
          return item;
        });
      }

      if (changed) {
        await FirestoreContentService.saveContentProject(userId, project);
      }
    } catch (err) {
      console.warn('Could not sync job status to content project:', err);
    }
  }
}

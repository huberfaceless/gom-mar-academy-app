/**
 * Server Background Scheduler Worker
 * Runs autonomously on the Express backend independently of user browser tabs.
 * Periodically polls Firestore for due PublishingJobs, enforces atomic claiming via Firestore transactions,
 * guarantees idempotency, executes genuine platform publishing via PublishingService,
 * records audit execution logs, and manages retry backoffs with crash recovery.
 */
import { PublishingJob } from '../types/contentEngine';
import { PublishingService } from './publishingService';
import {
  claimServerPublishingJob,
  listServerPublishingJobs,
  saveServerPublishingJob,
  syncServerPublishingOutcome,
} from '../../server/publishingQueueAdmin.js';
import { publishExistingYouTubeVideo } from '../../server/youtubeConnectionAdmin.js';


export interface SchedulerExecutionResult {
  jobsChecked: number;
  jobsProcessed: number;
  publishedCount: number;
  failedCount: number;
  skippedCount: number;
  details: Array<{
    jobId: string;
    platform: string;
    status: string;
    attempts: number;
    error?: string;
    publishedUrl?: string;
  }>;
  executedAt: string;
}

let isSchedulerRunning = false;
let schedulerIntervalTimer: NodeJS.Timeout | null = null;
let lastExecutionResult: SchedulerExecutionResult | null = null;

export class ServerSchedulerWorker {

  /**
   * Starts the background scheduler loop.
   * Default check interval: 60 seconds (1 minute).
   */
  static start(intervalMs: number = 60000) {
    if (schedulerIntervalTimer) {
      console.log('[ServerSchedulerWorker] Scheduler already running.');
      return;
    }

    console.log(`[ServerSchedulerWorker] 🕒 Starting background scheduler worker (Interval: ${intervalMs / 1000}s)`);
    
    // Run an immediate check on startup
    this.runTick('SCHEDULER_CRON').catch(err => {
      console.error('[ServerSchedulerWorker] Initial tick error:', err);
    });

    // Setup periodic interval
    schedulerIntervalTimer = setInterval(() => {
      this.runTick('SCHEDULER_CRON').catch(err => {
        console.error('[ServerSchedulerWorker] Cron tick error:', err);
      });
    }, intervalMs);
  }

  /**
   * Stops the background scheduler loop.
   */
  static stop() {
    if (schedulerIntervalTimer) {
      clearInterval(schedulerIntervalTimer);
      schedulerIntervalTimer = null;
      console.log('[ServerSchedulerWorker] ⏹️ Scheduler worker stopped.');
    }
  }

  /**
   * Returns current scheduler health status and stats
   */
  static getStatus() {
    return {
      active: !!schedulerIntervalTimer,
      isCurrentlyProcessing: isSchedulerRunning,
      lastExecution: lastExecutionResult,
      systemTime: new Date().toISOString(),
    };
  }

  /**
   * Executes a single scheduler sweep across all due jobs in Firestore.
   * Uses atomic transactions for job claiming and crash recovery.
   * Can be triggered by cron, Cloud Scheduler, or manually via protected API.
   */
  static async runTick(
    triggeredBy: 'SCHEDULER_CRON' | 'MANUAL_RUN' | 'API_TRIGGER' = 'SCHEDULER_CRON'
  ): Promise<SchedulerExecutionResult> {
    if (isSchedulerRunning) {
      console.log('[ServerSchedulerWorker] Sweep already in progress. Skipping tick.');
      return lastExecutionResult || {
        jobsChecked: 0,
        jobsProcessed: 0,
        publishedCount: 0,
        failedCount: 0,
        skippedCount: 0,
        details: [],
        executedAt: new Date().toISOString(),
      };
    }

    isSchedulerRunning = true;
    const nowIso = new Date().toISOString();
    const workerInstanceId = `worker_${typeof process !== 'undefined' && process.pid ? process.pid : 'srv'}_${Math.random().toString(36).substring(2, 7)}`;
    
    const result: SchedulerExecutionResult = {
      jobsChecked: 0,
      jobsProcessed: 0,
      publishedCount: 0,
      failedCount: 0,
      skippedCount: 0,
      details: [],
      executedAt: nowIso,
    };

    try {
      const candidateJobs: PublishingJob[] = (await listServerPublishingJobs())
        .filter(job => job.status === 'SCHEDULED' || job.status === 'PUBLISHING');

      result.jobsChecked = candidateJobs.length;

      for (const job of candidateJobs) {
        const jobId = job.id;

        // 🔒 1. Idempotency Check
        if (job.status === 'PUBLISHED' || job.publishedAt || (job.externalId && job.externalId.length > 0)) {
          result.skippedCount++;
          continue;
        }


        // 🔒 2. Scheduling & Timing Checks
        if (job.status === 'SCHEDULED') {
          // Check scheduled time (UTC ISO comparison)
          const isTimeDue = !job.scheduledAt || job.scheduledAt <= nowIso;
          // Check retry backoff time
          const isBackoffPassed = !job.nextAttemptAt || job.nextAttemptAt <= nowIso;

          if (!isTimeDue || !isBackoffPassed) {
            result.skippedCount++;
            continue;
          }
        } else if (job.status === 'PUBLISHING') {
          // Crash recovery check: Has lock expired (> 10 min)?
          const lockExpires = job.lockExpiresAt ? new Date(job.lockExpiresAt).getTime() : (job.lockedAt ? new Date(job.lockedAt).getTime() + 10 * 60 * 1000 : 0);
          const isLockExpired = lockExpires <= Date.now();

          if (!isLockExpired) {
            // Still actively processed by another worker
            result.skippedCount++;
            continue;
          }
          console.info(`[ServerSchedulerWorker] Found orphaned job ${jobId} with expired lock. Initiating crash recovery.`);
        }

        // 🔒 3. Atomic Claiming via Firestore Transaction
        const claimResult = await claimServerPublishingJob(jobId, workerInstanceId);

        if (!claimResult.success || !claimResult.job) {
          if (claimResult.reason === 'already_published') {
            result.skippedCount++;
          } else if (claimResult.reason === 'locked_by_other') {
            result.skippedCount++;
          } else if (claimResult.reason === 'max_attempts_exceeded') {
            result.failedCount++;
            result.details.push({
              jobId,
              platform: job.platform,
              status: 'FAILED',
              attempts: job.attempts || 3,
              error: 'Maximale Anzahl an Versuchen (3) überschritten.',
            });
          } else {
            result.skippedCount++;
          }
          continue;
        }

        // 🔒 4. Execute Job through Central Publishing Service
        const claimedJob = claimResult.job;
        result.jobsProcessed++;

        // Pass payload Pinterest token if present, or let service look up stored config
        const pinterestToken = claimedJob.payload?.accessToken;
        const { job: finalizedJob, result: pubResult } = await PublishingService.processJob(
          claimedJob.userId,
          claimedJob,
          pinterestToken,
          triggeredBy,
          false,
          async (youtubeJob) => {
            const videoId = youtubeJob.payload?.metadata?.videoId;
            if (typeof videoId !== 'string' || !videoId) {
              return {
                success: false,
                status: 'FAILED',
                error: 'Die YouTube-Video-ID fehlt.',
              };
            }
            try {
              const published = await publishExistingYouTubeVideo(
                process.env.FIREBASE_PROJECT_ID || 'gom-mar-akademie',
                youtubeJob.userId,
                videoId,
              );
              return {
                success: true,
                status: 'PUBLISHED',
                externalId: published.videoId,
                publishedUrl: published.videoUrl,
              };
            } catch (error) {
              return {
                success: false,
                status: 'FAILED',
                error: error instanceof Error ? error.message : 'Die YouTube-Veröffentlichung ist fehlgeschlagen.',
              };
            }
          },
        );
        await saveServerPublishingJob(finalizedJob, claimResult.updateTime);
        await syncServerPublishingOutcome(finalizedJob);

        if (pubResult.success) {
          result.publishedCount++;
          result.details.push({
            jobId,
            platform: finalizedJob.platform,
            status: 'PUBLISHED',
            attempts: finalizedJob.attempts,
            publishedUrl: finalizedJob.publishedUrl,
          });
        } else {
          result.failedCount++;
          result.details.push({
            jobId,
            platform: finalizedJob.platform,
            status: finalizedJob.status,
            attempts: finalizedJob.attempts,
            error: pubResult.error,
          });
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn('[ServerSchedulerWorker] Warning during scheduler runTick:', errMsg);
    } finally {
      isSchedulerRunning = false;
      lastExecutionResult = result;
    }

    return result;
  }
}

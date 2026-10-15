import type { PublishingJob } from '../src/types/contentEngine.js';
import { canUseContentProject } from '../src/utils/contentProjectAccess.js';

export class PublishingJobActionError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

// Called only after current member authentication and tariff checks.
export const preparePublishingJobRetry = (job: PublishingJob, userId: string, isAdmin = false): PublishingJob => {
  if (job.userId !== userId) throw new PublishingJobActionError('Der Auftrag wurde nicht gefunden.', 404);
  if (!canUseContentProject({ id: job.projectId }, isAdmin) || !canUseContentProject(job.payload, isAdmin)) {
    throw new PublishingJobActionError('Vital50 steht ausschließlich Administratoren zur Verfügung.', 403);
  }
  if (job.status !== 'FAILED' || job.publicationUncertain || job.externalId || job.publishedAt
    || job.lockedAt || job.lockedBy || job.lockExpiresAt) {
    throw new PublishingJobActionError('Dieser Auftrag kann nicht erneut gestartet werden. Bitte aktualisiere die Ansicht und prüfe bei unklarem Ergebnis das Plattformprofil.', 409);
  }
  const now = new Date().toISOString();
  return { ...job, status: 'SCHEDULED', attempts: 0, lastError: undefined, nextAttemptAt: undefined,
    scheduledAt: now, updatedAt: now };
};

import type { CentralContentProject, PublishingJob, SchedulerJob } from '../types/contentEngine';

/** A removal never interrupts a publisher that may already have reached a platform. */
export function planContentProjectRemoval(
  projectId: string,
  contentProjectId: string | undefined,
  contents: CentralContentProject[],
  jobs: PublishingJob[],
  schedulers: SchedulerJob[],
) {
  const contentIds = new Set(contents.filter(p => !p.deletedAt && p.projectSettings?.id === projectId && (!contentProjectId || p.id === contentProjectId)).map(p => p.id));
  if (contentProjectId) contentIds.add(contentProjectId);
  const selectedJobs = jobs.filter(j => contentProjectId ? contentIds.has(j.contentProjectId) : j.projectId === projectId || contentIds.has(j.contentProjectId));
  const jobIds = new Set(selectedJobs.map(j => j.id));
  const selectedSchedulers = schedulers.filter(j => jobIds.has(j.publishingJobId));
  if (selectedJobs.some(j => j.status === 'PUBLISHING' || j.publicationUncertain || j.lockedAt || j.lockedBy || j.lockExpiresAt)
    || selectedSchedulers.some(j => j.status === 'PROCESSING')) {
    throw new Error('Eine Veröffentlichung läuft noch oder ihr Ergebnis ist unklar. Bitte zuerst die Veröffentlichungswarteschlange prüfen.');
  }
  return { contentIds, jobIds, schedulerIds: new Set(selectedSchedulers.map(j => j.id)) };
}

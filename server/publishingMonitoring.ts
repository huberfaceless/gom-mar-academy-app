import type { PublishingJob } from '../src/types/contentEngine.js';

/** Only fixed operational fields: never log payloads, credentials or provider errors. */
export const logPublishingOutcome = (job: PublishingJob): void => {
  const uncertain = job.publicationUncertain === true;
  const terminalFailure = job.status === 'FAILED' || uncertain;
  const retry = job.status === 'SCHEDULED' && job.attempts > 0;
  if (!terminalFailure && !retry && job.status !== 'PUBLISHED') return;

  console.log(JSON.stringify({
    severity: terminalFailure ? 'ERROR' : retry ? 'WARNING' : 'INFO',
    event: 'publishing_job_outcome',
    outcome: uncertain ? 'PUBLICATION_UNCERTAIN' : terminalFailure ? 'FAILED' : retry ? 'RETRY_SCHEDULED' : 'PUBLISHED',
    platform: ['YOUTUBE', 'PINTEREST', 'INSTAGRAM', 'BLOG'].includes(job.platform) ? job.platform : 'UNKNOWN',
    attempts: Number.isSafeInteger(job.attempts) && job.attempts >= 0 ? job.attempts : 0,
    publicationUncertain: uncertain,
  }));
};

export const logPublishingSweepFailure = (): void => {
  console.log(JSON.stringify({
    severity: 'ERROR',
    event: 'publishing_sweep_failed',
    message: 'Der Veröffentlichungsdurchlauf konnte nicht vollständig abgeschlossen werden.',
  }));
};

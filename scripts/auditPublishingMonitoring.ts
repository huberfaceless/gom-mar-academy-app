import assert from 'node:assert/strict';
import { build } from 'esbuild';
import type { PublishingJob } from '../src/types/contentEngine';
import { logPublishingOutcome, logPublishingSweepFailure } from '../server/publishingMonitoring';

const base = {
  id: 'private-job', userId: 'private-user', platform: 'PINTEREST',
  status: 'FAILED', attempts: 3, lastError: 'private-token',
  payload: { title: 'private-title', targetUrl: 'https://private.example' },
} as PublishingJob;
const originalLog = console.log;
const originalFetch = globalThis.fetch;
const entries: Record<string, any>[] = [];
console.log = (line: string) => { entries.push(JSON.parse(line)); };

async function bundle(entry: string, mocks: Record<string, string>) {
  const result = await build({
    entryPoints: [entry], bundle: true, write: false, platform: 'node', format: 'esm',
    plugins: [{ name: 'isolated-dependencies', setup(builder) {
      builder.onResolve({ filter: /.*/ }, args => args.path in mocks
        ? { path: args.path, namespace: 'mock' } : undefined);
      builder.onLoad({ filter: /.*/, namespace: 'mock' }, args => ({ contents: mocks[args.path] }));
    } }],
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

try {
  for (const [patch, severity, outcome] of [
    [{}, 'ERROR', 'FAILED'],
    [{ attempts: 0 }, 'ERROR', 'FAILED'], // Membership denial before a platform call.
    [{ status: 'SCHEDULED', attempts: 1 }, 'WARNING', 'RETRY_SCHEDULED'],
    [{ status: 'PUBLISHED' }, 'INFO', 'PUBLISHED'],
    [{ publicationUncertain: true }, 'ERROR', 'PUBLICATION_UNCERTAIN'],
  ] as const) {
    logPublishingOutcome({ ...base, ...patch } as PublishingJob);
    const entry = entries.at(-1)!;
    assert.equal(entry.severity, severity);
    assert.equal(entry.outcome, outcome);
    assert.deepEqual(Object.keys(entry).sort(), [
      'attempts', 'event', 'outcome', 'platform', 'publicationUncertain', 'severity',
    ]);
  }
  const count = entries.length;
  for (const status of ['DRAFT', 'PUBLISHING', 'NEEDS_REVIEW', 'SCHEDULED']) {
    logPublishingOutcome({ ...base, status, attempts: 0 } as PublishingJob);
  }
  assert.equal(entries.length, count, 'Waiting and newly scheduled jobs must not raise errors.');
  logPublishingOutcome({ ...base, platform: 'private-value', attempts: NaN } as unknown as PublishingJob);
  assert.equal(entries.at(-1)!.platform, 'UNKNOWN');
  assert.equal(entries.at(-1)!.attempts, 0);
  logPublishingSweepFailure();
  assert.equal(entries.at(-1)!.event, 'publishing_sweep_failed');

  // Run the real persistence adapter: announce outcomes only after a successful write.
  const adapter = await bundle('server/publishingQueueAdmin.ts', {
    'google-auth-library': 'export class GoogleAuth { async getClient() { return { getAccessToken: async () => ({token:"isolated-test"}) }; } }',
  });
  let writeStatus = 200;
  globalThis.fetch = (async (_input: unknown, init?: RequestInit) => {
    assert.equal(init?.method, 'PATCH');
    return Response.json({ updateTime: 'saved-version' }, { status: writeStatus });
  }) as typeof fetch;
  const beforeSave = entries.length;
  await adapter.saveServerPublishingJob(base, 'expected-version');
  assert.equal(entries.length, beforeSave + 1);
  assert.equal(entries.at(-1)!.outcome, 'FAILED');
  writeStatus = 412;
  const originalError = console.error;
  console.error = () => {};
  try {
    await assert.rejects(adapter.saveServerPublishingJob(base, 'old-version'), /HTTP 412/);
  } finally { console.error = originalError; }
  assert.equal(entries.length, beforeSave + 1, 'Rejected writes must not announce a saved outcome.');

  // Exhausted crash recovery claims also produce a terminal error after persistence.
  const fields = {
    userId: { stringValue: 'owner' }, status: { stringValue: 'PUBLISHING' },
    platform: { stringValue: 'PINTEREST' }, attempts: { integerValue: '3' },
    maxAttempts: { integerValue: '3' },
  };
  globalThis.fetch = (async (_input: unknown, init?: RequestInit) => Response.json(
    init?.method === 'PATCH' ? { updateTime: 'new-version' }
      : { name: 'projects/test/databases/(default)/documents/publishingJobs/job', fields, updateTime: 'old-version' },
  )) as typeof fetch;
  const claim = await adapter.claimServerPublishingJob('job', 'worker');
  assert.equal(claim.reason, 'max_attempts_exceeded');
  assert.equal(entries.at(-1)!.outcome, 'FAILED');

  // A failed queue read must be visible even when the HTTP scheduler call returns normally.
  const worker = await bundle('src/services/serverSchedulerWorker.ts', {
    './publishingService': 'export const PublishingService = {};',
    '../../server/publishingQueueAdmin.js': 'export const listServerPublishingJobs = async () => {throw Error("private-provider-error")}; export const claimServerPublishingJob = async () => {}; export const saveServerPublishingJob = async () => {}; export const syncServerPublishingOutcome = async () => {};',
    '../../server/youtubeConnectionAdmin.js': 'export const publishExistingYouTubeVideo = async () => {};',
    '../../server/pinterestConnectionAdmin.js': 'export const loadPinterestAccessToken = async () => {};',
    '../../server/instagramPublishingGuard.js': 'export class InstagramPublicationUncertainError extends Error {}',
    '../../server/instagramConnectionAdmin.js': 'export const publishInstagramImage = async () => {};',
    '../../server/emailCampaignDeliveryAdmin.js': 'export const runEmailCampaignDeliveries = async () => ({});',
    '../../server/publishingMemberAccess.js': 'export class PublishingAccessDeniedError extends Error {} export const requirePublishingMember = async () => {};',
  });
  await worker.ServerSchedulerWorker.runTick();
  assert.equal(entries.at(-1)!.event, 'publishing_sweep_failed');
  assert.equal(entries.at(-1)!.severity, 'ERROR');
  assert.equal(worker.ServerSchedulerWorker.getStatus().isCurrentlyProcessing, false);
  assert.doesNotMatch(JSON.stringify(entries), /private-/);
} finally {
  console.log = originalLog;
  globalThis.fetch = originalFetch;
}
console.log('Publishing-Überwachung geprüft: Endfehler, Wiederholungen, unklare Ergebnisse, erfolgreiche Speicherung, Konkurrenzkonflikte, ausgeschöpfte Versuche und Durchlauffehler ohne private Inhalte.');

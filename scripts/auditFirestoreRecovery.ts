import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { build, transform } from 'esbuild';

// Real queue adapter, scheduler and publishing orchestration. All credentials,
// network responses and platform side effects are isolated fixtures.
const mocks: Record<string, string> = {
  'google-auth-library': 'export class GoogleAuth { async getClient(){ return {getAccessToken:async()=>({token:"test-only"})}; } }',
  './firestoreContentService': 'export const FirestoreContentService = {};',
  './pinterestService': 'export const pinterestService = {};',
  'firebase/firestore': 'export const doc=()=>{}; export const runTransaction=()=>{};',
  '../firebase/config': 'export const db={}; export const isFirestoreOperational=()=>false; export const handleFirestoreError=()=>{};',
  '../utils/contentStorage': 'export const loadAllPublishingJobs=()=>[]; export const saveAllPublishingJobs=()=>{};',
  '../../server/youtubeConnectionAdmin.js': 'export const publishExistingYouTubeVideo=async()=>{throw Error("unexpected publisher")};',
  '../../server/pinterestConnectionAdmin.js': 'export const loadPinterestAccessToken=async()=>"test-only";',
  '../../server/instagramConnectionAdmin.js': 'export const publishInstagramImage=async()=>{throw Error("unexpected publisher")};',
  '../../server/emailCampaignDeliveryAdmin.js': 'export const runEmailCampaignDeliveries=async()=>{if(globalThis.auditEmailFailure)throw Error("simulated read failure");return {reserved:0,accepted:0,failed:0}};',
  '../../server/publishingMemberAccess.js': 'export class PublishingAccessDeniedError extends Error {} export const requirePublishingMember=async()=>{};',
};
const built = await build({
  stdin: { contents: `export {ServerSchedulerWorker} from './src/services/serverSchedulerWorker.ts';
    export {PublishingService} from './src/services/publishingService.ts';
    export {listServerPublishingJobs, claimServerPublishingJob, saveServerPublishingJob} from './server/publishingQueueAdmin.ts';
    export {loadEmailCampaigns} from './server/emailCampaignsAdmin.ts';
    export {fetchFirestoreRead} from './server/firestoreReadRetry.ts';`, resolveDir: process.cwd() },
  bundle: true, write: false, platform: 'node', format: 'esm',
  plugins: [{ name: 'isolated', setup(builder) {
    builder.onResolve({ filter: /.*/ }, args => args.path in mocks ? { path: args.path, namespace: 'mock' } : undefined);
    builder.onLoad({ filter: /.*/, namespace: 'mock' }, args => ({ contents: mocks[args.path] }));
  } }],
});
const api = await import('data:text/javascript;base64,' + Buffer.from(built.outputFiles[0].text).toString('base64'));
const originalFetch = globalThis.fetch;
const originalTimeout = globalThis.setTimeout;
const originalLogs = { log: console.log, error: console.error, info: console.info, warn: console.warn };
const logs: unknown[][] = [];
for (const key of ['log', 'error', 'info', 'warn'] as const) console[key] = (...args) => { logs.push(args); };
const waits: number[] = [];
globalThis.setTimeout = ((callback: () => void, delay: number) => {
  waits.push(delay); callback(); return 0;
}) as unknown as typeof setTimeout;
const encode = (v: any): any => v === null ? { nullValue: null }
  : typeof v === 'string' ? { stringValue: v } : typeof v === 'number' ? { integerValue: String(v) }
  : typeof v === 'boolean' ? { booleanValue: v } : Array.isArray(v) ? { arrayValue: { values: v.map(encode) } }
  : { mapValue: { fields: Object.fromEntries(Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => [k, encode(x)])) } };
const decode = (v: any): any => 'stringValue' in v ? v.stringValue : 'integerValue' in v ? Number(v.integerValue)
  : 'booleanValue' in v ? v.booleanValue : 'arrayValue' in v ? (v.arrayValue.values || []).map(decode)
  : 'mapValue' in v ? Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decode(x)])) : null;
const initial: Record<string, any> = {
  id: 'job', userId: 'owner', projectId: 'project', contentProjectId: 'content', contentId: 'pin',
  platform: 'PINTEREST', contentType: 'PIN', status: 'SCHEDULED', attempts: 0, maxAttempts: 3,
  scheduledAt: '2026-01-01T00:00:00.000Z', payload: { boardId: 'board' }, executionLogs: [],
};
let stored: any = structuredClone(initial);
let version = 0, publications = 0, reads = 0, writes = 0;
let queueStatuses: number[] = [], campaignStatuses: number[] = [];
let writeMode = 'ok';
const document = () => ({ name: 'projects/test/databases/(default)/documents/publishingJobs/job', fields: encode(stored).mapValue.fields, updateTime: `version-${version}` });
const reset = () => {
  stored = structuredClone(initial); version = 0; publications = 0; reads = 0; writes = 0;
  queueStatuses = []; campaignStatuses = []; writeMode = 'ok';
};
const response = (status: number, data: unknown = {}) => Response.json(data, { status });
globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const url = new URL(String(input));
  assert.equal(url.hostname, 'firestore.googleapis.com', 'No real provider requests permitted.');
  if (url.pathname.endsWith('/academyEmailCampaigns/owner')) {
    reads++; const status = campaignStatuses.shift() || 200;
    return response(status, { fields: { campaignsJson: { stringValue: '[]' } } });
  }
  if (url.pathname.endsWith('/publishingJobs')) {
    reads++; const status = queueStatuses.shift() || 200;
    return response(status, { documents: [document()] });
  }
  if (url.pathname.endsWith('/publishingJobs/job')) {
    if (init.method !== 'PATCH') { reads++; return response(200, document()); }
    writes++;
    if (url.searchParams.get('currentDocument.updateTime') !== `version-${version}`) return response(412);
    const next = decode({ mapValue: { fields: JSON.parse(String(init.body)).fields } });
    if (next.status === 'PUBLISHED') {
      if (writeMode === 'final-down') return response(503);
      if (writeMode === 'final-transient-once') { writeMode = 'ok'; return response(503); }
      if (writeMode === 'final-conflict') { stored = { ...stored, lastError: 'concurrent change' }; version++; return response(503); }
      if (writeMode === 'final-412') return response(412);
      if (writeMode === 'final-applied-response-lost') { stored = next; version++; throw new TypeError('simulated lost response'); }
    }
    stored = next; version++;
    if (writeMode === 'claim-response-lost' && next.status === 'PUBLISHING') return response(503);
    return response(200, document());
  }
  if (url.pathname.endsWith('/schedulerJobs')) return response(200, { documents: [] });
  if (url.pathname.endsWith('/contentProjects/content')) return response(404);
  throw Error('Unexpected request: ' + url.pathname);
}) as typeof fetch;
api.PublishingService.publishPin = async () => {
  publications++;
  return { success: true, status: 'PUBLISHED', externalId: `fake-pin-${publications}`, publishedUrl: 'https://example.test/fake' };
};
try {
  queueStatuses = [503, 503, 200];
  await api.listServerPublishingJobs();
  assert.equal(reads, 3); assert.equal(waits.length, 2);
  assert.ok(waits[0] >= 500 && waits[0] < 700 && waits[1] >= 1000 && waits[1] < 1200);
  reset(); queueStatuses = [503, 503, 503];
  await assert.rejects(api.listServerPublishingJobs(), /HTTP 503/);
  assert.equal(reads, 3); assert.deepEqual(stored, initial); assert.equal(writes, 0);
  for (const status of [400, 401, 403, 404, 409, 412, 429, 500]) {
    reset(); queueStatuses = [status];
    await assert.rejects(api.listServerPublishingJobs(), new RegExp(`HTTP ${status}`));
    assert.equal(reads, 1, 'Permanent errors must not be replayed blindly.');
  }
  reset(); campaignStatuses = [503, 200];
  assert.deepEqual(await api.loadEmailCampaigns('test', 'owner'), { campaigns: [], exists: true });
  assert.equal(reads, 2);
  reset(); campaignStatuses = [503, 503, 503];
  await assert.rejects(api.loadEmailCampaigns('test', 'owner'), /konnten nicht geladen/); assert.equal(reads, 3);
  await assert.rejects(api.fetchFirestoreRead('https://api.sendgrid.com/v3/mail/send'), /Ungültiger/);
  await assert.rejects(api.fetchFirestoreRead('https://firestore.googleapis.com/test', { method: 'POST' }), /nur GET/);
  const isolatedFetch = globalThis.fetch;
  for (const name of ['TypeError', 'TimeoutError']) {
    let attempts = 0;
    globalThis.fetch = (async () => {
      attempts++;
      if (attempts < 3) { const error = new Error('simulated transport error'); error.name = name;
        throw name === 'TypeError' ? new TypeError(error.message) : error; }
      return response(200);
    }) as typeof fetch;
    assert.equal((await api.fetchFirestoreRead('https://firestore.googleapis.com/test')).status, 200);
    assert.equal(attempts, 3);
  }
  let abortedCalls = 0;
  const controller = new AbortController(); controller.abort();
  globalThis.fetch = (async () => { abortedCalls++; throw new DOMException('cancelled', 'AbortError'); }) as typeof fetch;
  await assert.rejects(api.fetchFirestoreRead('https://firestore.googleapis.com/test', { signal: controller.signal }));
  assert.equal(abortedCalls, 1);
  globalThis.fetch = isolatedFetch;

  reset(); stored = { ...stored, status: 'PUBLISHING', lockedAt: new Date().toISOString() };
  assert.equal((await api.claimServerPublishingJob('job', 'other')).reason, 'locked_by_other');
  assert.equal(writes, 0, 'A legacy active lock without explicit expiry must remain effective.');

  reset(); queueStatuses = [503, 503, 503];
  const failed = await api.ServerSchedulerWorker.runTick('API_TRIGGER');
  assert.equal(failed.sweepFailed, true); assert.equal(publications, 0); assert.deepEqual(stored, initial);
  assert.equal(api.ServerSchedulerWorker.getStatus().isCurrentlyProcessing, false);
  await api.ServerSchedulerWorker.runTick('API_TRIGGER');
  assert.equal(stored.status, 'PUBLISHED'); assert.equal(publications, 1);
  await api.ServerSchedulerWorker.runTick('API_TRIGGER'); assert.equal(publications, 1);

  for (const mode of ['final-transient-once', 'final-applied-response-lost']) {
    reset(); writeMode = mode;
    const outcome = await api.ServerSchedulerWorker.runTick('API_TRIGGER');
    assert.equal(outcome.sweepFailed, undefined); assert.equal(outcome.publishedCount, 1);
    assert.equal(stored.status, 'PUBLISHED'); assert.equal(publications, 1);
    assert.equal(writes, mode === 'final-transient-once' ? 3 : 2);
    await api.ServerSchedulerWorker.runTick('API_TRIGGER'); assert.equal(publications, 1);
  }
  for (const mode of ['final-down', 'claim-response-lost', 'final-conflict', 'final-412']) {
    reset(); writeMode = mode;
    const outcome = await api.ServerSchedulerWorker.runTick('API_TRIGGER');
    assert.equal(outcome.sweepFailed, true);
    assert.equal(publications, mode === 'claim-response-lost' ? 0 : 1);
    assert.equal(stored.status, 'PUBLISHING');
    assert.equal(writes, mode === 'final-down' ? 4 : mode === 'claim-response-lost' ? 1 : 2);
    const before = publications;
    await api.ServerSchedulerWorker.runTick('API_TRIGGER'); assert.equal(publications, before);
    stored.lockExpiresAt = '2026-01-01T00:00:00.000Z'; writeMode = 'ok';
    const recovery = await api.ServerSchedulerWorker.runTick('API_TRIGGER');
    assert.equal(recovery.failedCount, 1); assert.equal(stored.status, 'FAILED');
    assert.equal(stored.publicationUncertain, true); assert.equal(publications, before);
    await api.ServerSchedulerWorker.runTick('API_TRIGGER'); assert.equal(publications, before);
    const claim = await api.claimServerPublishingJob('job', 'another-worker');
    assert.equal(claim.success, false); assert.equal(publications, before);
  }
  // Verify the actual HTTP endpoint body, including its catch path, without booting Express.
  const source = readFileSync('server.ts', 'utf8');
  const route = source.match(/app\.post\('\/api\/internal\/scheduler\/run'[\s\S]*?\n  \}\);/)?.[0];
  assert.ok(route);
  for (const outcome of [{}, { sweepFailed: true }, { emailSweepFailed: true }]) {
    let handler: any;
    const context = { app: { post: (_path: string, _auth: unknown, callback: unknown) => { handler = callback; } },
      requireSchedulerSecret: () => {}, ServerSchedulerWorker: { runTick: async () => outcome } };
    vm.runInNewContext((await transform(route, { loader: 'ts' })).code, context);
    let status = 200, body: any;
    const res = { status(code: number) { status = code; return res; }, json(data: unknown) { body = data; } };
    await handler({}, res);
    assert.equal(status, Object.keys(outcome).length ? 503 : 200);
    assert.equal(body.success, status === 200);
  }
  (globalThis as any).auditEmailFailure = true;
  reset(); stored.status = 'PUBLISHED';
  assert.equal((await api.ServerSchedulerWorker.runTick()).emailSweepFailed, true);
} finally {
  delete (globalThis as any).auditEmailFailure;
  globalThis.fetch = originalFetch; globalThis.setTimeout = originalTimeout;
  Object.assign(console, originalLogs);
}
console.log('Firestore-Störungstests bestanden: begrenzte Lesewiederholungen, dauerhafte Fehler, unveränderte Aufträge, sichere Ergebnisspeicherung, verlorene Antworten, Konkurrenzkonflikte, unklare Veröffentlichungen ohne Doppelpost und HTTP-Fehlerstatus. Kein externer Versand.');

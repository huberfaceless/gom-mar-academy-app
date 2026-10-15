import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import type { PublishingJob } from '../src/types/contentEngine';
import { preparePublishingJobRetry } from '../server/publishingJobRetry';

const base = { id: 'job', userId: 'owner', projectId: 'business', status: 'FAILED', attempts: 3, maxAttempts: 3,
  lastError: 'Fehler', nextAttemptAt: 'old', executionLogs: [{ id: 'log' }], payload: { title: 'Test' } } as PublishingJob;
const reset = preparePublishingJobRetry(base, 'owner');
assert.equal(reset.status, 'SCHEDULED'); assert.equal(reset.attempts, 0);
assert.equal(reset.maxAttempts, 3); assert.equal(reset.lastError, undefined); assert.equal(reset.nextAttemptAt, undefined);
assert.deepEqual(reset.executionLogs, base.executionLogs); assert.deepEqual(reset.payload, base.payload);
assert.equal(base.status, 'FAILED'); assert.equal(base.attempts, 3);
assert.throws(() => preparePublishingJobRetry(base, 'stranger'), /nicht gefunden/);
for (const patch of [{ status: 'PUBLISHING' }, { status: 'PUBLISHED' }, { status: 'SCHEDULED' },
  { publicationUncertain: true }, { externalId: 'real' }, { publishedAt: 'now' },
  { lockedAt: 'now' }, { lockedBy: 'worker' }, { lockExpiresAt: 'future' }]) {
  assert.throws(() => preparePublishingJobRetry({ ...base, ...patch } as PublishingJob, 'owner'), /nicht erneut/);
}
assert.throws(() => preparePublishingJobRetry({ ...base, projectId: 'proj_vital50' }, 'owner'), /Administratoren/);
assert.equal(preparePublishingJobRetry({ ...base, projectId: 'proj_vital50' }, 'owner', true).status, 'SCHEDULED');

// Execute the actual REST adapter with isolated credentials and Firestore responses.
const bundle = await build({ entryPoints: ['server/publishingQueueAdmin.ts'], bundle: true, write: false, platform: 'node', format: 'esm',
  plugins: [{ name: 'test-auth', setup(builder) {
    builder.onResolve({ filter: /^google-auth-library$/ }, () => ({ path: 'auth', namespace: 'test-auth' }));
    builder.onLoad({ filter: /.*/, namespace: 'test-auth' }, () => ({ contents: 'export class GoogleAuth { async getClient() { return { getAccessToken: async () => ({token:"test"}) }; } }' }));
  } }],
});
const adapter = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const encode = (value: any): any => typeof value === 'string' ? { stringValue: value }
  : typeof value === 'number' ? { integerValue: String(value) }
  : typeof value === 'boolean' ? { booleanValue: value }
  : Array.isArray(value) ? { arrayValue: { values: value.map(encode) } }
  : { mapValue: { fields: fields(value) } };
const fields = (value: any): any => Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encode(v)]));
const originalFetch = globalThis.fetch;
let commits: any[] = []; let status = 200; let stored = base;
globalThis.fetch = (async (input: any, init?: RequestInit) => {
  const url = String(input);
  if (url.endsWith('/publishingJobs/job')) return Response.json({ fields: fields(stored), name: 'projects/test/databases/(default)/documents/publishingJobs/job', updateTime: 'job-version' });
  if (url.includes('/schedulerJobs?')) return Response.json({ documents: [{
    name: 'projects/test/databases/(default)/documents/schedulerJobs/scheduler', updateTime: 'scheduler-version',
    fields: fields({ userId: 'owner', publishingJobId: 'job', status: 'FAILED' }),
  }, { name: 'projects/test/databases/(default)/documents/schedulerJobs/other', fields: fields({ userId: 'stranger', publishingJobId: 'job' }) }] });
  if (url.endsWith('/documents:commit')) { commits.push(JSON.parse(String(init?.body))); return Response.json({}, { status }); }
  throw new Error(`Unerwarteter Testzugriff: ${url}`);
}) as typeof fetch;
try {
  await adapter.retryServerPublishingJob('owner', 'job');
  assert.equal(commits.length, 1); assert.equal(commits[0].writes.length, 2);
  assert.deepEqual(commits[0].writes.map((w: any) => w.currentDocument.updateTime), ['job-version', 'scheduler-version']);
  assert.equal(commits[0].writes[0].update.fields.attempts.integerValue, '0');
  assert.equal(commits[0].writes[1].update.fields.status.stringValue, 'PENDING');
  commits = []; await assert.rejects(adapter.retryServerPublishingJob('stranger', 'job'), /nicht gefunden/); assert.equal(commits.length, 0);
  stored = { ...base, publicationUncertain: true };
  await assert.rejects(adapter.retryServerPublishingJob('owner', 'job'), /nicht erneut/); assert.equal(commits.length, 0);
  stored = base; status = 412;
  await assert.rejects(adapter.retryServerPublishingJob('owner', 'job'), /HTTP 412/);
  assert.equal(commits.length, 1, 'Konflikte dürfen nicht blind mit veralteten Daten wiederholt werden.');
} finally { globalThis.fetch = originalFetch; }
const server = readFileSync('server.ts', 'utf8');
assert.match(server, /app.post\('\/api\/publishing\/jobs\/:jobId\/retry', requireVerifiedMember, requireProMember/);
assert.match(server, /retryServerPublishingJob\(member.sub, jobId, isAcademyAdminToken\(member\)\)/);
console.log('Publishing-Wiederholung geprüft: Eigentum, Serverfelder, unklare Ergebnisse, atomare Queue-/Scheduler-Aktualisierung und Konkurrenzschutz.');

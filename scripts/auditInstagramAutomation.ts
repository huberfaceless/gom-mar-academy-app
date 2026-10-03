import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publishInstagramOnce, InstagramPublicationUncertainError } from '../server/instagramPublishingGuard';

const server = readFileSync('server.ts', 'utf8');
const connection = readFileSync('server/instagramConnectionAdmin.ts', 'utf8');
const client = readFileSync('src/services/instagramService.ts', 'utf8');
const modal = readFileSync('src/components/ContentEngine/InstagramPublishModal.tsx', 'utf8');
const instagramTab = readFileSync('src/components/ContentEngine/InstagramPostsTab.tsx', 'utf8');
const calendar = readFileSync('src/components/ContentEngine/ContentCalendarTab.tsx', 'utf8');
const pins = readFileSync('src/components/ContentEngine/PinterestPinsTab.tsx', 'utf8');
const legal = readFileSync('src/components/LegalModal.tsx', 'utf8');
const publicPrivacy = readFileSync('public/privacy/index.html', 'utf8');

assert.match(server, /app\.post\('\/api\/instagram\/oauth\/start', requireVerifiedMember, requireProMember/, 'Instagram OAuth muss geschützt sein.');
assert.match(server, /app\.get\('\/api\/instagram\/oauth\/callback'/, 'Der Instagram OAuth-Callback fehlt.');
assert.match(server, /app\.post\('\/api\/instagram\/publish-image', requireVerifiedMember, requireProMember/, 'Instagram-Veröffentlichungen müssen geschützt sein.');
assert.match(server, /app\.get\('\/api\/instagram\/media\/:token'/, 'Instagram benötigt einen kurzlebigen öffentlichen Bildabruf.');
assert.match(connection, /LESSON_AUDIO_BUCKET/, 'Der bewährte private Medien-Bucket muss als Fallback genutzt werden.');
assert.match(connection, /instagram-media:/, 'Instagram-Bildadressen müssen signiert sein.');
assert.match(connection, /instagramMediaUrlMaxAgeMs/, 'Instagram-Bildadressen müssen zeitlich begrenzt sein.');
assert.match(connection, /createCipheriv\('aes-256-gcm'/, 'Instagram-Tokens müssen verschlüsselt gespeichert werden.');
assert.match(connection, /academyInstagramConnections/, 'Instagram-Verbindungen müssen serverseitig gespeichert werden.');
assert.match(connection, /ig_exchange_token/, 'Kurzlebige Instagram-Tokens müssen in langlebige Tokens umgewandelt werden.');
assert.match(connection, /ig_refresh_token/, 'Instagram-Tokens müssen automatisch erneuert werden.');
assert.match(connection, /instagram_business_content_publish/, 'Die Veröffentlichungsberechtigung fehlt.');
assert.match(connection, /media_publish/, 'Die echte Instagram-Veröffentlichung fehlt.');
assert.match(connection, /waitForInstagramMedia/, 'Vor der Veröffentlichung muss die Instagram-Medienverarbeitung abgewartet werden.');
assert.match(connection, /status_code === 'FINISHED'/, 'Instagram darf erst nach vollständig verarbeiteter Grafik veröffentlichen.');
assert.match(connection, /status_code === 'ERROR'/, 'Fehler bei der Instagram-Medienverarbeitung müssen erkannt werden.');
assert.match(client, /authenticatedFetch\('\/api\/instagram\/oauth\/start'/, 'Der Browser muss den geschützten OAuth-Start verwenden.');
assert.doesNotMatch(client, /client_secret|access_token/i, 'Instagram-Geheimnisse dürfen nicht in den Browser gelangen.');
assert.match(modal, /Instagram verbinden/, 'Die Oberfläche muss eine Instagram-Verbindung anbieten.');
assert.match(modal, /width: 1080, height: 1350/, 'Instagram-Grafiken müssen im Feed-Format 4:5 erstellt werden.');
assert.match(modal, /canvas\.toDataURL\('image\/jpeg', 0\.82\)/, 'Direkte Instagram-Veröffentlichungen müssen dieselbe JPEG-Kodierung wie die Queue verwenden.');
assert.match(calendar, /canvas\.toDataURL\('image\/jpeg', 0\.82\)/, 'Geplante Instagram-Veröffentlichungen müssen JPEG verwenden.');
assert.doesNotMatch(modal, /toDataURL\('image\/png'/, 'Die direkte Instagram-Veröffentlichung darf keine PNG-Grafik versenden.');
assert.match(modal, /aspect-\[4\/5\]/, 'Die Instagram-Vorschau muss das Feed-Format 4:5 zeigen.');
assert.doesNotMatch(pins, /Auf Instagram posten/, 'Pinterest- und Instagram-Veröffentlichung müssen getrennte Bereiche haben.');
assert.match(instagramTab, /Auf Instagram veröffentlichen/, 'Der getrennte Instagram-Bereich muss eine Veröffentlichung anbieten.');
assert.match(instagramTab, /width: 1080, height: 1350/, 'Der Instagram-Bereich muss im Format 4:5 rendern.');
assert.match(legal, /Instagram-Verbindung/, 'Die interne Datenschutzerklärung muss Instagram erläutern.');
assert.match(publicPrivacy, /Instagram-Verbindung/, 'Die öffentliche Datenschutzerklärung muss Instagram erläutern.');

console.log('Instagram-Automatisierung geprüft: OAuth, verschlüsselte Tokens und echte Bildveröffentlichung sind vorbereitet.');

// Execute the real worker and publishing service with isolated API/storage substitutes.
const { build } = await import('esbuild');
const state = { job: null as any, inputJobId: '', calls: 0, saves: 0, outcome: 'fail', claims: 0 };
(globalThis as any).__instagramRetryAudit = state;
const forbidden = `const deny = () => { throw new Error('Unerlaubter Browser- oder Fremdplattformzugriff im Server-Test'); };`;
const substitutes: Record<string, string> = {
  './firestoreContentService': `${forbidden} export const FirestoreContentService = new Proxy({}, { get: () => deny });`,
  './pinterestService': `${forbidden} export const pinterestService = new Proxy({}, { get: () => deny });`,
  'firebase/firestore': `${forbidden} export const doc = deny; export const runTransaction = deny;`,
  '../firebase/config': `${forbidden} export const db = {}; export const isFirestoreOperational = deny; export const handleFirestoreError = deny;`,
  '../utils/contentStorage': `${forbidden} export const loadAllPublishingJobs = deny; export const saveAllPublishingJobs = deny;`,
  '../../server/publishingQueueAdmin.js': `
    const state = globalThis.__instagramRetryAudit;
    export const listServerPublishingJobs = async () => [structuredClone(state.job)];
    export const claimServerPublishingJob = async () => {
      state.claims++;
      state.job = { ...state.job, status: 'PUBLISHING', attempts: state.job.attempts + 1, lockedBy: 'audit', lockExpiresAt: new Date(Date.now() + 600000).toISOString() };
      return { success: true, job: structuredClone(state.job), updateTime: 'audit' };
    };
    export const saveServerPublishingJob = async job => { state.saves++; state.job = structuredClone(job); };
    export const syncServerPublishingOutcome = async () => {};
  `,
  '../../server/instagramConnectionAdmin.js': `
    import { InstagramPublicationUncertainError } from '${process.cwd()}/server/instagramPublishingGuard.ts';
    export const publishInstagramImage = async (projectId, userId, input) => {
      const state = globalThis.__instagramRetryAudit; state.calls++; state.inputJobId = input.publishingJobId;
      if (state.outcome === 'uncertain') throw new InstagramPublicationUncertainError();
      if (state.outcome === 'fail') throw new Error('HTTP 503 access_token=test-secret Bearer test-token');
      return { id: 'instagram-media-audit', url: 'https://www.instagram.com/audit/' };
    };
  `,
  '../../server/youtubeConnectionAdmin.js': `${forbidden} export const publishExistingYouTubeVideo = deny;`,
  '../../server/pinterestConnectionAdmin.js': `${forbidden} export const loadPinterestAccessToken = deny;`,
  '../../server/emailCampaignDeliveryAdmin.js': `export const runEmailCampaignDeliveries = async () => ({ reserved: 0, accepted: 0, failed: 0 });`,
};
const bundle = await build({
  stdin: { contents: "export { ServerSchedulerWorker } from './src/services/serverSchedulerWorker'; export { PublishingService } from './src/services/publishingService';", resolveDir: process.cwd(), loader: 'ts' }, bundle: true, write: false,
  platform: 'node', format: 'esm', plugins: [{ name: 'isolated-instagram-retries', setup(plugin) {
    plugin.onResolve({ filter: /.*/ }, args => args.path in substitutes ? { path: args.path, namespace: 'audit' } : undefined);
    plugin.onLoad({ filter: /.*/, namespace: 'audit' }, args => ({ contents: substitutes[args.path], loader: 'js', resolveDir: process.cwd() }));
  } }],
});
const { ServerSchedulerWorker: worker, PublishingService: publishingService } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const reset = () => {
  state.job = { id: 'audit-instagram', userId: 'audit-owner', platform: 'INSTAGRAM', contentType: 'INSTAGRAM_POST', status: 'SCHEDULED', scheduledAt: '2020-01-01T00:00:00.000Z', attempts: 0, maxAttempts: 3, payload: { imageBase64: 'audit-image', title: 'Audit' } };
  state.calls = 0; state.saves = 0; state.claims = 0; state.outcome = 'fail';
};
reset();
await worker.runTick();
assert.equal(state.inputJobId, 'audit-instagram', 'Der Server muss den Schutz an die dauerhafte Auftrags-ID binden.');
assert.equal(state.job.status, 'SCHEDULED');
assert.equal(state.job.attempts, 1);
assert.ok(Math.abs(Date.parse(state.job.nextAttemptAt) - Date.now() - 5 * 60000) < 2000);
assert.doesNotMatch(state.job.lastError, /test-secret|test-token/);
assert.equal(state.job.lockedBy, undefined);
await worker.runTick();
assert.equal(state.calls, 1, 'Während der Wartezeit darf die Instagram-API nicht erneut aufgerufen werden.');
state.job.nextAttemptAt = '2020-01-01T00:00:00.000Z';
await worker.runTick();
assert.equal(state.job.attempts, 2);
assert.ok(Math.abs(Date.parse(state.job.nextAttemptAt) - Date.now() - 15 * 60000) < 2000);
state.job.nextAttemptAt = '2020-01-01T00:00:00.000Z';
await worker.runTick();
assert.equal(state.job.status, 'FAILED');
assert.equal(state.job.attempts, 3);
assert.equal(state.job.nextAttemptAt, undefined);
assert.equal(state.job.executionLogs.length, 3);
await worker.runTick();
assert.equal(state.calls, 3, 'Nach drei Fehlversuchen muss die Automatik stoppen.');
reset();
await worker.runTick();
state.outcome = 'success'; state.job.nextAttemptAt = '2020-01-01T00:00:00.000Z';
await worker.runTick();
assert.equal(state.job.status, 'PUBLISHED');
assert.equal(state.job.externalId, 'instagram-media-audit');
assert.equal(state.job.attempts, 2);
assert.equal(state.job.nextAttemptAt, undefined);
assert.equal(state.job.lastError, undefined);
await worker.runTick();
assert.equal(state.calls, 2, 'Ein bestätigter Erfolg darf nicht erneut veröffentlicht werden.');
reset(); state.job.scheduledAt = '2099-01-01T00:00:00.000Z';
await worker.runTick(); assert.equal(state.calls, 0);
reset(); state.job.status = 'PUBLISHING'; state.job.lockExpiresAt = '2099-01-01T00:00:00.000Z';
await worker.runTick(); assert.equal(state.calls, 0);
reset(); state.job.externalId = 'already-published';
await worker.runTick(); assert.equal(state.calls, 0);
reset(); delete state.job.payload.imageBase64;
await worker.runTick(); assert.equal(state.calls, 0); assert.match(state.job.lastError, /Grafik fehlt/);
reset(); state.outcome = 'uncertain';
await worker.runTick();
assert.equal(state.job.status, 'FAILED');
assert.equal(state.job.publicationUncertain, true);
assert.equal(state.job.attempts, 1);
assert.equal(state.job.nextAttemptAt, undefined);
await assert.rejects(publishingService.retryJob('audit-owner', state.job), /Unklarer Instagram-Status/);
await assert.rejects(publishingService.processJob('audit-owner', state.job), /zuerst das Instagram-Profil prüfen/);
await worker.runTick(); assert.equal(state.calls, 1);
delete (globalThis as any).__instagramRetryAudit;
console.log('Instagram-Wiederholungen geprüft: 5/15 Minuten Wartezeit, Stopp nach drei Versuchen, Erfolg nach Fehler, Sperren, Geheimnisschutz und fehlende Grafik.');


const originalFetch = globalThis.fetch;
let operations = new Map<string, any>();
let mediaCalls = 0;
let prepareCalls = 0;
let losePublishResponse = false;
let failCompletionSave = false;
let loseReservationResponse = false;
try {
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input); const key = url.split('?')[0];
    if (!key.includes('/academyInstagramPublishOperations/')) throw new Error('Unerwarteter externer Abruf');
    if (init?.method !== 'PATCH') return operations.has(key)
      ? new Response(JSON.stringify(operations.get(key)), { status: 200 }) : new Response('', { status: 404 });
    if (url.includes('currentDocument.exists=false') && operations.has(key)) return new Response('', { status: 409 });
    const document = JSON.parse(String(init.body));
    if (document.fields.state.stringValue === 'COMPLETED' && failCompletionSave) return new Response('', { status: 503 });
    operations.set(key, document);
    if (url.includes('currentDocument.exists=false') && loseReservationResponse) throw new Error('Verbindungsabbruch nach Speicherung');
    return new Response('{}', { status: 200 });
  }) as typeof fetch;
  const prepare = async () => { prepareCalls++; return 'container-audit'; };
  const publish = async () => {
    mediaCalls++;
    if (losePublishResponse) throw new Error('Antwort nach Veröffentlichung verloren');
    return { id: 'confirmed-media', url: 'https://www.instagram.com/audit/' };
  };
  const execute = (owner = 'owner') => publishInstagramOnce('audit-project', owner, 'audit-job', prepare, publish, async () => 'fake-google-token');
  const resetGuard = () => { operations = new Map(); mediaCalls = 0; prepareCalls = 0; losePublishResponse = false; failCompletionSave = false; loseReservationResponse = false; };
  resetGuard();
  assert.equal((await execute()).id, 'confirmed-media');
  assert.equal((await execute()).id, 'confirmed-media');
  assert.equal(mediaCalls, 1); assert.equal(prepareCalls, 1);
  assert.doesNotMatch(JSON.stringify([...operations.values()]), /fake-google-token/);
  resetGuard(); losePublishResponse = true;
  await assert.rejects(execute(), InstagramPublicationUncertainError);
  await assert.rejects(execute(), InstagramPublicationUncertainError);
  assert.equal(mediaCalls, 1, 'Eine verlorene Erfolgsantwort darf keinen zweiten Aufruf auslösen.');
  assert.equal(prepareCalls, 1);
  resetGuard(); failCompletionSave = true;
  assert.equal((await execute()).id, 'confirmed-media');
  await assert.rejects(execute(), InstagramPublicationUncertainError);
  assert.equal(mediaCalls, 1, 'Auch nach einem Speicherfehler darf nicht erneut veröffentlicht werden.');
  resetGuard(); loseReservationResponse = true;
  await assert.rejects(execute(), InstagramPublicationUncertainError);
  await assert.rejects(execute(), InstagramPublicationUncertainError);
  assert.equal(mediaCalls, 0, 'Ohne bestätigte Reservierung darf nicht veröffentlicht werden.');
  resetGuard();
  const concurrent = await Promise.allSettled([execute(), execute()]);
  assert.ok(concurrent.some(result => result.status === 'fulfilled'));
  assert.equal(mediaCalls, 1, 'Gleichzeitige Aufrufe dürfen nur einmal veröffentlichen.');
  await execute('other-owner'); assert.equal(mediaCalls, 2);
  assert.equal(operations.size, 2, 'Schutzprotokolle müssen nach Mitglied und Auftrag getrennt sein.');
} finally { globalThis.fetch = originalFetch; }
console.log('Instagram-Doppelpostschutz geprüft: verlorene Antworten, Server-Wiederanlauf, Speicherfehler, konkurrierende Aufrufe und Mitgliedstrennung.');

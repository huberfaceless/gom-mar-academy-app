import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as storage from '../src/utils/contentStorage';
import { planContentProjectRemoval } from '../src/utils/contentProjectRemoval';
import type { CentralContentProject, PublishingJob, SchedulerJob } from '../src/types/contentEngine';

// Exercise the actual initial circuit state: the old code stayed false forever
// because no production caller ever invoked setFirestoreOperational(true).
const configSource = readFileSync('src/firebase/config.ts', 'utf8');
const circuitSource = configSource.slice(configSource.indexOf('let firestoreApiAvailable'));
let now = 1000;
const circuit = vm.createContext({ isFirebaseConfigured: true, Date: { now: () => now }, Error });
vm.runInContext(ts.transpileModule(circuitSource.replaceAll('export ', ''), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, circuit);
assert.equal(circuit.isFirestoreOperational(), true, 'First authenticated cloud operation must be allowed.');
circuit.handleFirestoreError(new Error('permission-denied: one document is forbidden'));
assert.equal(circuit.isFirestoreOperational(), true, 'A document permission error must not disable all cloud operations.');
circuit.handleFirestoreError(new Error('unavailable'));
assert.equal(circuit.isFirestoreOperational(), false);
now += 16000;
assert.equal(circuit.isFirestoreOperational(), true, 'Transient failures must permit a new probe.');
circuit.setFirestoreOperational(true);
assert.equal(circuit.isFirestoreOperational(), true);
circuit.isFirebaseConfigured = false;
assert.equal(circuit.isFirestoreOperational(), false);
circuit.isFirebaseConfigured = true;
const helperSource = readFileSync('src/services/firestoreContentService.ts', 'utf8');
vm.runInContext(ts.transpileModule(helperSource.slice(helperSource.indexOf('async function firestoreWithTimeout'), helperSource.indexOf('export class FirestoreContentService')), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, Object.assign(circuit, { setTimeout, clearTimeout }));
circuit.setFirestoreOperational(false);
assert.equal(await circuit.firestoreWithTimeout(Promise.resolve('confirmed')), 'confirmed');
assert.equal(circuit.isFirestoreOperational(), true, 'A confirmed operation must reopen the circuit.');
await assert.rejects(circuit.firestoreWithTimeout(Promise.reject(new Error('unavailable'))));
assert.equal(circuit.isFirestoreOperational(), false);

const user = 'removal-audit';
const brand = { ...storage.createOnlineBusinessProject(user), id: 'remove-brand' };
const other = { ...brand, id: 'keep-brand', name: 'Behalten' };
const content = (id: string, settings = brand): CentralContentProject => ({ id, topic: id, projectSettings: settings, pinterestPins: [], calendarItems: [], createdAt: 'now', updatedAt: 'now' });
const contents = [content('one'), content('two'), content('other', other)];
const job = (id: string, contentProjectId: string, status: PublishingJob['status'] = 'SCHEDULED'): PublishingJob => ({ id, userId: user, projectId: contentProjectId === 'other' ? other.id : brand.id, contentProjectId, contentId: 'video', platform: 'YOUTUBE', contentType: 'VIDEO', status, scheduledAt: 'later', attempts: 0, maxAttempts: 3, createdAt: 'now', updatedAt: 'now' });
const jobs = [job('pending', 'one'), { ...job('published', 'two', 'PUBLISHED'), externalId: 'external-video', publishedUrl: 'https://youtube.com/watch?v=external-video' }, job('other-job', 'other')];
const schedulers: SchedulerJob[] = jobs.map(j => ({ id: `scheduler-${j.id}`, userId: user, publishingJobId: j.id, scheduledAt: 'later', status: 'PENDING', createdAt: 'now', updatedAt: 'now' }));
const seedLocal = (uid: string) => {
  storage.saveAllProjectSettings([brand, other], uid);
  storage.saveAllContentProjects(contents, uid);
  storage.saveAllPublishingJobs(jobs, uid);
  storage.saveAllSchedulerJobs(schedulers, uid);
};
seedLocal(user);
seedLocal('untouched-account');
storage.removeContentProjectLocally(brand.id, 'one', user);
assert.deepEqual(storage.loadAllContentProjects(user).map(p => p.id), ['two', 'other']);
assert.equal(storage.loadAllProjectSettings(user).length, 2, 'Removing a workflow must keep its brand.');
storage.saveAllContentProjects(contents, user); // stale tab/cache must not bring it back
assert.equal(storage.loadAllContentProjects(user).some(p => p.id === 'one'), false);
storage.removeContentProjectLocally(brand.id, undefined, user);
storage.saveAllProjectSettings([brand, other], user);
storage.saveAllContentProjects(contents, user);
assert.deepEqual(storage.loadAllProjectSettings(user).map(p => p.id), [other.id]);
assert.deepEqual(storage.loadAllContentProjects(user).map(p => p.id), ['other']);
assert.deepEqual(storage.loadAllPublishingJobs(user).map(p => p.id), ['other-job']);
assert.deepEqual(storage.loadAllSchedulerJobs(user).map(p => p.publishingJobId), ['other-job']);
assert.equal(storage.loadAllContentProjects('untouched-account').length, 3);
storage.removeContentProjectLocally(other.id, undefined, user);
assert.deepEqual(storage.loadAllProjectSettings(user), [], 'Removing the last project must not recreate a starter.');
for (const patch of [{ status: 'PUBLISHING' }, { publicationUncertain: true }, { lockedAt: 'now' }, { lockedBy: 'worker' }, { lockExpiresAt: 'later' }]) {
  assert.throws(() => planContentProjectRemoval(brand.id, undefined, contents, [{ ...jobs[0], ...patch } as PublishingJob], []));
}
assert.throws(() => planContentProjectRemoval(brand.id, undefined, contents, jobs, [{ ...schedulers[0], status: 'PROCESSING' }]));

// Run the real service method against transactional documents. A claim between
// the query and the transaction must block every write; failed commits keep cache.
const source = readFileSync('src/services/firestoreContentService.ts', 'utf8');
const method = source.slice(source.indexOf('  private static async removeProject'), source.indexOf('  // ==========================================', source.indexOf('  private static async removeProject')));
for (const scenario of ['success', 'claimed-after-query', 'foreign-owner', 'commit-failed', 'offline'] as const) {
  const uid = `cloud-${scenario}`; seedLocal(uid);
  let writes: Array<[string, string, unknown?]> = [];
  const ref = (collection: string, id: string) => ({ id, parent: { id: collection }, key: `${collection}/${id}` });
  const records = new Map<string, any>([[`projects/${brand.id}`, { ...brand, userId: uid }]]);
  for (const c of contents) records.set(`contentProjects/${c.id}`, { ...c, userId: uid });
  for (const j of jobs) records.set(`publishingJobs/${j.id}`, { ...j, userId: uid });
  for (const j of schedulers) records.set(`schedulerJobs/${j.id}`, { ...j, userId: uid });
  if (scenario === 'foreign-owner') records.get(`projects/${brand.id}`).userId = 'stranger';
  const snap = (r: ReturnType<typeof ref>) => ({ ref: r, id: r.id, exists: () => records.has(r.key), data: () => records.get(r.key) });
  const ctx = vm.createContext({ ...storage, planContentProjectRemoval, db: {}, isFirestoreOperational: () => scenario !== 'offline',
    COLLECTION_PROJECTS: 'projects', COLLECTION_CONTENT_PROJECTS: 'contentProjects', COLLECTION_PUBLISHING_JOBS: 'publishingJobs', COLLECTION_SCHEDULER_JOBS: 'schedulerJobs', FIRESTORE_WRITE_TIMEOUT_MS: 8000,
    firestoreWithTimeout: (promise: Promise<unknown>) => promise,
    doc: (_db: unknown, name: string, id: string) => ref(name, id), collection: (_db: unknown, name: string) => name,
    where: () => null, query: (name: string) => name,
    getDocs: async (name: string) => ({ docs: [...records.keys()].filter(k => k.startsWith(name + '/')).map(k => snap(ref(name, k.split('/')[1]))) }),
    runTransaction: async (_db: unknown, fn: (tx: any) => Promise<unknown>) => {
      if (scenario === 'claimed-after-query') records.get('publishingJobs/pending').status = 'PUBLISHING';
      const pending: typeof writes = [];
      const result = await fn({ get: async (r: any) => snap(r), update: (r: any, patch: unknown) => pending.push(['update', r.key, patch]), delete: (r: any) => pending.push(['delete', r.key]) });
      if (scenario === 'commit-failed') throw new Error('Unavailable');
      writes = pending; return result;
    },
  });
  vm.runInContext(ts.transpileModule(`class Service { ${method} } globalThis.service = Service;`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, ctx);
  if (scenario === 'success') {
    await ctx.service.removeProject(uid, brand.id);
    assert.equal(writes.length, 7); // brand + two content tombstones + two jobs + two schedulers
    assert.ok(writes.every(([, key]) => !key.includes('other')));
    assert.deepEqual(storage.loadAllContentProjects(uid).map(p => p.id), ['other']);
  } else {
    await assert.rejects(ctx.service.removeProject(uid, brand.id));
    assert.equal(writes.length, 0);
    assert.equal(storage.loadAllContentProjects(uid).length, 3);
  }
}
console.log('Projektentfernung geprüft: Einzelinhalt, ganzes/letztes Projekt, Cache-Wiederkehr, Kontotrennung, atomare Cloud-Bestätigung und laufende Aufträge.');

// Reopening cloud access must not upload an older browser copy over newer data.
const syncMethod = source.slice(source.indexOf('  static async syncLocalDataToFirestore'), source.lastIndexOf('\n}'));
const localSettings = ['newer-local', 'older-local', 'same', 'local-only'].map(id => ({ ...brand, id, userId: 'sync', updatedAt: '2026-11-06T10:00:00Z' }));
const remote = [
  { ...localSettings[0], updatedAt: '2026-11-05T10:00:00Z' },
  { ...localSettings[1], updatedAt: '2026-11-07T10:00:00Z' },
  localSettings[2],
];
const syncWrites: string[] = [];
const syncContext = vm.createContext({
  db: {}, COLLECTION_PROJECTS: 'projects', COLLECTION_CONTENT_PROJECTS: 'contentProjects', FIRESTORE_WRITE_TIMEOUT_MS: 8000,
  reconcileContentProjectCache() {}, migrateLegacyContentStorage() {}, isFirestoreOperational: () => true, canUseContentProject: () => true,
  firestoreWithTimeout: (p: Promise<unknown>) => p,
  query: (name: string) => name, collection: (_db: unknown, name: string) => name, where() {},
  getDocs: async (name: string) => ({ docs: (name === 'projects' ? remote : []).map(p => ({ id: p.id, data: () => p })) }),
  loadAllProjectSettings: () => localSettings, saveAllProjectSettings() {}, loadAllContentProjects: () => [], saveAllContentProjects() {},
  handleFirestoreError(error: unknown) { throw error; },
});
vm.runInContext(ts.transpileModule(`class SyncService { ${syncMethod} } globalThis.service = SyncService;`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, syncContext);
syncContext.service.saveProjectSettings = async (_uid: string, p: { id: string }) => { syncWrites.push(p.id); };
await syncContext.service.syncLocalDataToFirestore('sync');
assert.deepEqual(syncWrites, ['newer-local', 'local-only']);
console.log('Cloud-Start und Wiederverbindung geprüft: erste Anfrage, Berechtigungsfehler, Transportfehler, Wiederholung und Schutz neuerer Cloud-Daten.');

// Reproduce the reported regression using the actual cloud-read methods: Vital50
// must not vanish merely because it has not yet reached the cloud query.
const cacheUser = 'preserve-cloud-read';
const cacheBusiness = { ...storage.createOnlineBusinessProject(cacheUser, true), id: 'business', updatedAt: '2026-11-05T10:00:00Z' };
const cacheVital = { ...storage.DEFAULT_VITAL50_PROJECT, id: 'legacy-vital50', updatedAt: '2026-11-05T10:00:00Z' };
const cacheContents = [content('health-article', cacheVital)];
storage.saveAllProjectSettings([cacheBusiness, cacheVital], cacheUser);
storage.saveAllContentProjects(cacheContents, cacheUser);
const settingsRead = source.slice(source.indexOf('  static async getProjectSettings'), source.indexOf('  static async saveProjectSettings'));
const contentsRead = source.slice(source.indexOf('  static async getContentProjects'), source.indexOf('  static async getContentProjectById'));
const readContext = vm.createContext({ ...storage, db: {}, isFirestoreOperational: () => true, canUseContentProject: () => true,
  COLLECTION_PROJECTS: 'projects', COLLECTION_CONTENT_PROJECTS: 'contentProjects',
  firestoreWithTimeout: (p: Promise<unknown>) => p, query: (name: string) => name, collection: (_db: unknown, name: string) => name, where() {},
  getDocs: async (name: string) => ({ docs: (name === 'projects' ? [cacheBusiness] : []).map(p => ({ id: p.id, data: () => p })) }),
  handleFirestoreError(error: unknown) { throw error; },
});
vm.runInContext(ts.transpileModule(`class ReadService { ${settingsRead} ${contentsRead} } globalThis.service = ReadService;`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, readContext);
assert.deepEqual((await readContext.service.getProjectSettings(cacheUser, true)).map((p: any) => p.id), ['business', 'legacy-vital50']);
assert.deepEqual((await readContext.service.getContentProjects(cacheUser)).map((p: any) => p.id), ['health-article']);
assert.equal(storage.loadAllProjectSettings(cacheUser, true).find(p => p.id === 'legacy-vital50')?.userId, cacheUser);
// A previously missing parent can be reconstructed from the owned article copy.
const embeddedUser = 'recover-parent-metadata';
storage.saveAllProjectSettings([cacheBusiness], embeddedUser);
storage.saveAllContentProjects([{ ...cacheContents[0], userId: embeddedUser }], embeddedUser);
storage.reconcileContentProjectCache([], [], embeddedUser);
assert.equal(storage.loadAllProjectSettings(embeddedUser, true).some(p => p.id === cacheVital.id), true);
// A cloud tombstone remains authoritative; metadata copies never undo a deletion.
storage.reconcileContentProjectCache([{ ...cacheVital, userId: cacheUser, deletedAt: 'removed' }], [], cacheUser);
assert.equal(storage.loadAllProjectSettings(cacheUser, true).some(p => p.id === cacheVital.id), false);
assert.equal(storage.loadAllContentProjects(cacheUser).length, 0);
// Unrelated accounts and deleted workflows remain isolated.
assert.equal(storage.loadAllProjectSettings(embeddedUser, true).some(p => p.id === cacheVital.id), true);
console.log('Cloud-Leseabgleich geprüft: Vital50 und lokale Artikel bleiben erhalten, fehlende Eltern-Metadaten werden rekonstruiert, bewusste Löschungen bleiben wirksam.');

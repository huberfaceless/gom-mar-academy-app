import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as storage from '../src/utils/contentStorage';
import { planContentProjectRemoval } from '../src/utils/contentProjectRemoval';
import type { CentralContentProject, PublishingJob, SchedulerJob } from '../src/types/contentEngine';

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

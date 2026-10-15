import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, deleteDoc, deleteField, runTransaction } from 'firebase/firestore';

if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error('Dieser Test darf nur im Firestore-Emulator laufen.');
const env = await initializeTestEnvironment({ projectId: 'demo-gommar-rules', firestore: { rules: readFileSync('firestore.rules', 'utf8') } });
const claims = { email_verified: true, academyTier: 'PRO' };
const owner = env.authenticatedContext('owner', claims).firestore();
const stranger = env.authenticatedContext('stranger', claims).firestore();
const base = { id: 'job', userId: 'owner', projectId: 'business', contentProjectId: 'content', contentId: 'pin',
  platform: 'PINTEREST', contentType: 'PIN', scheduledAt: '2026-11-01T10:00:00.000Z', status: 'SCHEDULED',
  attempts: 0, maxAttempts: 3, executionLogs: [], payload: { title: 'Test' }, createdAt: 'now', updatedAt: 'now' };
const seed = async (patch: Record<string, unknown> = {}) => env.withSecurityRulesDisabled(async ctx => {
  await setDoc(doc(ctx.firestore(), 'publishingJobs/job'), { ...base, ...patch });
  await setDoc(doc(ctx.firestore(), 'schedulerJobs/scheduler'), { id: 'scheduler', userId: 'owner', publishingJobId: 'job', status: 'PENDING', scheduledAt: base.scheduledAt });
});
try {
  await env.clearFirestore();
  await assertSucceeds(setDoc(doc(owner, 'publishingJobs/job'), base));
  for (const [key, value] of Object.entries({ attempts: 99, maxAttempts: 99, executionLogs: ['forged'], externalId: 'fake',
    publishedAt: 'now', publishedUrl: 'https://example.com', lockedAt: 'now', lockedBy: 'fake', lockExpiresAt: 'now',
    nextAttemptAt: 'now', publicationUncertain: false, lastError: 'fake' })) {
    await env.clearFirestore();
    await assertFails(setDoc(doc(owner, 'publishingJobs/job'), { ...base, [key]: value }));
  }
  for (const status of ['PUBLISHING', 'PUBLISHED', 'FAILED', 'CANCELLED']) {
    await assertFails(setDoc(doc(owner, 'publishingJobs/job'), { ...base, status }));
  }
  for (const db of [stranger, env.unauthenticatedContext().firestore(),
    env.authenticatedContext('owner', { ...claims, academyTier: 'FREE' }).firestore(),
    env.authenticatedContext('owner', { ...claims, email_verified: false }).firestore()]) {
    await assertFails(setDoc(doc(db, 'publishingJobs/job'), base));
  }
  await assertFails(setDoc(doc(owner, 'publishingJobs/job'), { ...base, projectId: 'proj_vital50' }));
  for (const role of [{ academyTier: 'PREMIUM' }, { academyTier: 'FREE', academyRole: 'admin' }]) {
    await env.clearFirestore();
    const db = env.authenticatedContext('owner', { ...claims, ...role }).firestore();
    await assertSucceeds(setDoc(doc(db, 'publishingJobs/job'), base));
  }
  await seed();
  await assertSucceeds(updateDoc(doc(owner, 'publishingJobs/job'), { payload: { title: 'Bearbeitet' }, updatedAt: 'later' }));
  await assertSucceeds(runTransaction(owner, async tx => {
    const job = doc(owner, 'publishingJobs/job');
    const scheduler = doc(owner, 'schedulerJobs/scheduler');
    await tx.get(job); await tx.get(scheduler);
    tx.update(job, { scheduledAt: '2026-11-02T10:00:00.000Z', updatedAt: 'later' });
    tx.update(scheduler, { scheduledAt: '2026-11-02T10:00:00.000Z', updatedAt: 'later' });
  }));
  for (const [key, value] of Object.entries({ attempts: 2, maxAttempts: 100, executionLogs: [], externalId: 'fake',
    publishedAt: 'now', publishedUrl: 'https://example.com', lockedAt: 'now', lockedBy: 'fake', lockExpiresAt: 'now',
    nextAttemptAt: 'now', publicationUncertain: true, lastError: 'fake', userId: 'stranger',
    projectId: 'other', contentProjectId: 'other', contentId: 'other', platform: 'INSTAGRAM', contentType: 'VIDEO', createdAt: 'fake', id: 'fake' })) {
    await seed({ executionLogs: [{ status: 'FAILED' }] });
    await assertFails(updateDoc(doc(owner, 'publishingJobs/job'), { [key]: value }));
  }
  for (const status of ['PUBLISHING', 'PUBLISHED', 'FAILED', 'CANCELLED']) {
    await seed(); await assertFails(updateDoc(doc(owner, 'publishingJobs/job'), { status }));
  }
  await seed({ nextAttemptAt: 'server-backoff' });
  await assertFails(updateDoc(doc(owner, 'publishingJobs/job'), { nextAttemptAt: deleteField() }));
  for (const key of ['attempts', 'maxAttempts', 'createdAt', 'userId', 'executionLogs']) {
    await assertFails(updateDoc(doc(owner, 'publishingJobs/job'), { [key]: deleteField() }));
  }
  await assertFails(updateDoc(doc(stranger, 'publishingJobs/job'), { scheduledAt: 'fake' }));
  for (const patch of [{ status: 'PUBLISHING' }, { status: 'PUBLISHED', externalId: 'real' }, { status: 'FAILED' },
    { publicationUncertain: true }, { lockedBy: 'server', lockExpiresAt: 'server-time' }]) {
    await seed(patch);
    await assertFails(updateDoc(doc(owner, 'publishingJobs/job'), { status: 'SCHEDULED', payload: { title: 'Zurücksetzen' } }));
  }
  await seed(); await assertSucceeds(deleteDoc(doc(owner, 'publishingJobs/job')));
  await seed(); await assertFails(deleteDoc(doc(stranger, 'publishingJobs/job')));
  for (const patch of [{ status: 'PUBLISHING' }, { publicationUncertain: true }, { lockedBy: 'server' }, { lockedAt: 'now' }]) {
    await seed(patch); await assertFails(deleteDoc(doc(owner, 'publishingJobs/job')));
  }
  await seed({ status: 'PUBLISHED', externalId: 'real' });
  await assertSucceeds(deleteDoc(doc(owner, 'publishingJobs/job')));
  console.log('Firestore-Emulatortest erfolgreich: Anlegen, Bearbeiten, Umplanen, Löschen, Eigentum, Tarife, Serverfelder und laufende/unklare Aufträge.');
} finally { await env.cleanup(); }

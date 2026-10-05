import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { PublishingAccessDeniedError, requirePublishingMember } from '../server/publishingMemberAccess';
import type { FirebaseMember } from '../server/firebaseMembershipAdmin';

const member: FirebaseMember = { uid: 'owner', email: 'member@example.com', displayName: 'Test', emailVerified: true, disabled: false, tier: 'PRO', role: 'member', language: 'de' };
for (const tier of ['PRO', 'PREMIUM'] as const) await requirePublishingMember('project', 'owner', async () => ({ ...member, tier }));
await requirePublishingMember('project', 'owner', async () => ({ ...member, tier: 'FREE', role: 'admin' }));
for (const account of [null, { ...member, tier: 'FREE' as const }, { ...member, disabled: true }, { ...member, emailVerified: false }, { ...member, uid: 'other' }]) {
  await assert.rejects(requirePublishingMember('project', 'owner', async () => account), PublishingAccessDeniedError);
}
await assert.rejects(requirePublishingMember('project', 'owner', async () => { throw new Error('Firebase nicht erreichbar'); }), /Firebase nicht erreichbar/);

// Run the actual worker and access guard with isolated account, persistence and publisher adapters.
// No Firebase, social platform or e-mail requests are made.
let account: FirebaseMember | null = member;
let lookupFails = false;
let lookupCount = 0;
let publishCount = 0;
let credentialCount = 0;
let saved: any[] = [];
const job = { id: 'job', userId: 'owner', status: 'SCHEDULED', scheduledAt: '2020-01-01T00:00:00Z', platform: 'PINTEREST', attempts: 0, maxAttempts: 3 };
const mock = {
  getFirebaseMember: async () => { lookupCount++; if (lookupFails) throw new Error('offline'); return account; },
  listServerPublishingJobs: async () => [job],
  claimServerPublishingJob: async () => ({ success: true, job: { ...job, status: 'PUBLISHING', attempts: 1 }, updateTime: 'version' }),
  saveServerPublishingJob: async (value: any, version: string) => { assert.equal(version, 'version'); saved.push(value); },
  syncServerPublishingOutcome: async () => {},
  loadPinterestAccessToken: async () => { credentialCount++; return 'test'; },
  publishExistingYouTubeVideo: async () => { throw new Error('unerwarteter Aufruf'); },
  publishInstagramImage: async () => { throw new Error('unerwarteter Aufruf'); },
  runEmailCampaignDeliveries: async () => ({ reserved: 0, accepted: 0, failed: 0 }),
  PublishingService: { processJob: async (_owner: string, value: any) => { publishCount++; return { job: { ...value, status: 'PUBLISHED' }, result: { success: true } }; } },
};
(globalThis as any).__publishingAccessAudit = mock;
try {
  const bundled = await build({
    entryPoints: ['src/services/serverSchedulerWorker.ts'], bundle: true, write: false, format: 'esm', platform: 'node',
    plugins: [{ name: 'isolated-publishing-access', setup(builder) {
      builder.onResolve({ filter: /(?:firebaseMembershipAdmin|publishingQueueAdmin|youtubeConnectionAdmin|pinterestConnectionAdmin|instagramPublishingGuard|instagramConnectionAdmin|emailCampaignDeliveryAdmin|publishingService)(?:\.js)?$/ }, args => ({ path: args.path, namespace: 'access-mock' }));
      builder.onLoad({ filter: /.*/, namespace: 'access-mock' }, args => {
        if (args.path.includes('instagramPublishingGuard')) return { contents: 'export class InstagramPublicationUncertainError extends Error {}', loader: 'js' };
        if (args.path.endsWith('publishingService')) return { contents: 'export const PublishingService = globalThis.__publishingAccessAudit.PublishingService;', loader: 'js' };
        const exports = args.path.includes('publishingQueueAdmin') ? ['listServerPublishingJobs', 'claimServerPublishingJob', 'saveServerPublishingJob', 'syncServerPublishingOutcome']
          : args.path.includes('firebaseMembershipAdmin') ? ['getFirebaseMember']
          : args.path.includes('youtubeConnectionAdmin') ? ['publishExistingYouTubeVideo']
          : args.path.includes('pinterestConnectionAdmin') ? ['loadPinterestAccessToken']
          : args.path.includes('instagramConnectionAdmin') ? ['publishInstagramImage'] : ['runEmailCampaignDeliveries'];
        return { contents: exports.map(name => `export const ${name} = (...args) => globalThis.__publishingAccessAudit.${name}(...args);`).join('\n'), loader: 'js' };
      });
    } }],
  });
  const { ServerSchedulerWorker } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
  for (const next of [null, { ...member, tier: 'FREE' as const }, { ...member, disabled: true }, { ...member, emailVerified: false }, member, { ...member, tier: 'PREMIUM' as const }, { ...member, tier: 'FREE' as const, role: 'admin' as const }]) {
    account = next; saved = []; publishCount = 0; credentialCount = 0;
    const outcome = await ServerSchedulerWorker.runTick();
    const allowed = Boolean(next && !next.disabled && next.emailVerified && (next.tier !== 'FREE' || next.role === 'admin'));
    assert.equal(publishCount, allowed ? 1 : 0);
    assert.equal(credentialCount, allowed ? 1 : 0, 'Gesperrte Konten dürfen keine Plattform-Zugangsdaten laden.');
    assert.equal(saved[0].status, allowed ? 'PUBLISHED' : 'FAILED');
    assert.equal(outcome.failedCount, allowed ? 0 : 1);
  }
  lookupFails = true; saved = []; publishCount = 0; credentialCount = 0;
  await ServerSchedulerWorker.runTick();
  assert.equal(publishCount, 0);
  assert.equal(credentialCount, 0);
  assert.equal(saved[0].status, 'SCHEDULED');
  assert.equal(saved[0].attempts, 0, 'Eine fehlgeschlagene Rechteprüfung darf keinen Publishing-Versuch verbrauchen.');
  assert.ok(Date.parse(saved[0].nextAttemptAt) > Date.now());
  assert.equal(saved[0].lockedBy, undefined);
  assert.equal(lookupCount, 8, 'Jeder Durchlauf muss die aktuellen Mitgliedsrechte neu laden.');
} finally {
  delete (globalThis as any).__publishingAccessAudit;
}

const rules = readFileSync('firestore.rules', 'utf8');
for (const collection of ['publishingJobs', 'schedulerJobs']) {
  const section = rules.slice(rules.indexOf(`match /${collection}/`)).split('\n    }')[0];
  assert.match(section, /allow create: if canSchedulePublishing\(\)/);
  assert.match(section, /allow update: if canSchedulePublishing\(\)/);
  assert.match(section, /request.resource.data.userId == request.auth.uid/);
}
console.log('Publishing-Zugriff geprüft: aktuelle Tarife, Admin, Sperrung, Löschung, fehlende Bestätigung und Firebase-Ausfall ohne Veröffentlichung. Firestore-Regelverknüpfung geprüft; Emulatorprüfung separat erforderlich.');

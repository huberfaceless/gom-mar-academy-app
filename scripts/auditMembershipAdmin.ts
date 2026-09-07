import assert from 'node:assert/strict';
import { buildTierCustomAttributes } from '../server/firebaseMembershipAdmin';
import { canAccessView, requiredTierForView } from '../src/utils/membershipAccess';

const existingClaims = JSON.stringify({
  academyTier: 'FREE',
  academyRole: 'admin',
  supportRegion: 'eu',
});
const upgraded = buildTierCustomAttributes(existingClaims, 'PREMIUM');
assert.equal(upgraded.previousTier, 'FREE');
assert.deepEqual(JSON.parse(upgraded.customAttributes), {
  academyTier: 'PREMIUM',
  academyRole: 'admin',
  supportRegion: 'eu',
});

const repaired = buildTierCustomAttributes('{ungueltig', 'PRO');
assert.equal(repaired.previousTier, 'FREE');
assert.deepEqual(JSON.parse(repaired.customAttributes), { academyTier: 'PRO' });

for (const view of ['email', 'toolbox']) {
  assert.equal(canAccessView(view, 'FREE', 'member'), false, `FREE darf keinen Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'PRO', 'member'), true, `PRO muss Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'PREMIUM', 'member'), true, `PREMIUM muss Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'FREE', 'admin'), true, `Admin muss Zugriff auf ${view} erhalten`);
  assert.equal(requiredTierForView(view), 'PRO');
}

for (const view of ['dashboard', 'academy', 'progress', 'profile', 'settings']) {
  assert.equal(canAccessView(view, 'FREE', 'member'), true, `FREE muss Zugriff auf ${view} behalten`);
}

for (const view of ['admin', 'contentEngine']) {
  assert.equal(canAccessView(view, 'FREE', 'member'), false, `FREE-Mitglied darf ${view} nicht öffnen`);
  assert.equal(canAccessView(view, 'PRO', 'member'), false, `PRO-Mitglied darf ${view} nicht öffnen`);
  assert.equal(canAccessView(view, 'PREMIUM', 'member'), false, `PREMIUM-Mitglied darf ${view} nicht öffnen`);
  assert.equal(canAccessView(view, 'FREE', 'admin'), true, `Admin muss ${view} öffnen können`);
  assert.equal(requiredTierForView(view), null);
}

console.log('Firebase-Tarifverwaltung und FREE/PRO-Zugriffsgrenzen geprüft.');

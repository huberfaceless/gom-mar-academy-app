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

for (const view of ['email', 'toolbox', 'contentEngine']) {
  assert.equal(canAccessView(view, 'FREE', 'member'), false, `FREE darf keinen Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'PRO', 'member'), true, `PRO muss Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'PREMIUM', 'member'), true, `PREMIUM muss Zugriff auf ${view} erhalten`);
  assert.equal(canAccessView(view, 'FREE', 'admin'), true, `Admin muss Zugriff auf ${view} erhalten`);
  assert.equal(requiredTierForView(view), 'PRO');
}

for (const view of ['dashboard', 'academy', 'progress', 'profile', 'settings']) {
  assert.equal(canAccessView(view, 'FREE', 'member'), true, `FREE muss Zugriff auf ${view} behalten`);
}

assert.equal(canAccessView('admin', 'PREMIUM', 'member'), false, 'Mitglied darf den Adminbereich nicht öffnen');
assert.equal(canAccessView('admin', 'FREE', 'admin'), true, 'Admin muss den Adminbereich öffnen können');

console.log('Firebase-Tarifverwaltung und FREE/PRO-Zugriffsgrenzen geprüft.');

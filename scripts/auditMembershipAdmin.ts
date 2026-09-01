import assert from 'node:assert/strict';
import { buildTierCustomAttributes } from '../server/firebaseMembershipAdmin';

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

console.log('Firebase-Tarifverwaltung geprüft: bestehende Claims bleiben erhalten und Tarife werden normalisiert.');

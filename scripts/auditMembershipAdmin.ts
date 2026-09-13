import assert from 'node:assert/strict';
import { buildLanguageCustomAttributes, buildTierCustomAttributes } from '../server/firebaseMembershipAdmin';
import fs from 'node:fs';
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

const languageClaims = buildLanguageCustomAttributes(upgraded.customAttributes, 'pl');
assert.deepEqual(JSON.parse(languageClaims), {
  academyTier: 'PREMIUM',
  academyRole: 'admin',
  supportRegion: 'eu',
  academyLanguage: 'pl',
});

const server = fs.readFileSync(new URL('../server.ts', import.meta.url), 'utf8');
const admin = fs.readFileSync(new URL('../src/components/AdminDashboardView.tsx', import.meta.url), 'utf8');
const auth = fs.readFileSync(new URL('../src/firebase/auth.ts', import.meta.url), 'utf8');
assert.match(auth, /registerWithEmail[\s\S]*language: LanguageCode = 'de'/, 'Die Registrierung muss die gewählte Sprache übernehmen.');
assert.match(auth, /\/api\/member\/language/, 'Die Registrierung muss die Mitgliedssprache serverseitig speichern.');
assert.match(server, /app\.post\('\/api\/admin\/members\/:uid\/language', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen Mitgliedssprachen ändern.');
assert.match(server, /app\.patch\('\/api\/admin\/members\/:uid\/email', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen Mitgliedsadressen ändern.');
assert.match(server, /app\.delete\('\/api\/admin\/members\/:uid', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen nicht bestätigte Konten löschen.');
assert.match(server, /existing\.role === 'admin'/, 'Administratorkonten müssen vor Adressänderungen geschützt sein.');
assert.match(admin, /Deutsche Mitglieder/, 'Der deutsche Mitgliederbereich fehlt.');
assert.match(admin, /Englische Mitglieder/, 'Der englische Mitgliederbereich fehlt.');
assert.match(admin, /Polnische Mitglieder/, 'Der polnische Mitgliederbereich fehlt.');
assert.match(admin, /Nicht bestätigtes Konto löschen/, 'Die sichere Löschaktion für nicht bestätigte Konten fehlt.');

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

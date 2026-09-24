import assert from 'node:assert/strict';
import { buildLanguageCustomAttributes, buildTierCustomAttributes } from '../server/firebaseMembershipAdmin';
import fs from 'node:fs';
import { canAccessView, isMembershipResolvedForUser, requiredTierForView } from '../src/utils/membershipAccess';

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
assert.match(server, /whatsappProfilesByUserId/, 'Die Mitgliederliste muss gespeicherte WhatsApp-Profile zuordnen.');
assert.match(server, /whatsappPhoneNumber: whatsappProfile\?\.phoneNumber/, 'Die Mitglieder-API muss die hinterlegte Telefonnummer liefern.');
assert.match(server, /app\.patch\('\/api\/admin\/members\/:uid\/email', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen Mitgliedsadressen ändern.');
assert.match(server, /app\.patch\('\/api\/admin\/members\/:uid\/whatsapp', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen WhatsApp-Nummern ändern.');
assert.match(server, /deleteWhatsAppMemberProfile\(FIREBASE_PROJECT_ID, uid\)/, 'Eine leere Nummer muss das WhatsApp-Profil vollständig entfernen.');
assert.match(server, /app\.delete\('\/api\/admin\/members\/:uid', requireVerifiedMember, requireAcademyAdmin/, 'Nur Administratoren dürfen Mitgliedskonten löschen.');
assert.match(server, /existing\.role === 'admin'/, 'Administratorkonten müssen vor Adressänderungen geschützt sein.');
assert.match(server, /deleteEmailConsent\(FIREBASE_PROJECT_ID, uid\)/, 'Beim Löschen wird die gespeicherte E-Mail-Einwilligung entfernt.');
assert.match(server, /deleteCrmContact\(FIREBASE_PROJECT_ID, adminUserId, memberContactId\(uid\)\)/, 'Beim Löschen wird der synchronisierte CRM-Kontakt entfernt.');
assert.match(admin, /Deutsche Mitglieder/, 'Der deutsche Mitgliederbereich fehlt.');
assert.match(admin, /Englische Mitglieder/, 'Der englische Mitgliederbereich fehlt.');
assert.match(admin, /Polnische Mitglieder/, 'Der polnische Mitgliederbereich fehlt.');
assert.match(admin, /Konto und E-Mail löschen/, 'Die Löschaktion für Mitgliedskonten fehlt.');
assert.match(admin, />WhatsApp</, 'Die Mitgliederverwaltung muss eine WhatsApp-Spalte anzeigen.');
assert.match(admin, /member\.whatsappPhoneNumber/, 'Die hinterlegte Telefonnummer muss beim Mitglied angezeigt werden.');
assert.match(admin, /WhatsApp bearbeiten/, 'Die Mitgliederverwaltung muss WhatsApp-Nummern bearbeiten oder entfernen können.');
assert.doesNotMatch(admin, /students: StudentRecord\[\]/, 'Die Admin-Mitgliederliste darf keine lokale Browserliste mehr erhalten.');
assert.doesNotMatch(admin, /membersLoaded \? firebaseMembers : students/, 'Mitgliederzahlen dürfen nicht auf veraltete lokale Daten zurückfallen.');
assert.match(admin, /const totalStudents = firebaseMembers\.length/, 'Firebase muss die einzige Quelle der Mitgliederzahlen sein.');
assert.match(admin, /window\.prompt\(`Zur Bestätigung bitte exakt eingeben:/, 'Die dauerhafte Löschung verlangt eine zweite exakte Bestätigung.');

assert.equal(isMembershipResolvedForUser('admin-uid', 'admin-uid'), true);
assert.equal(isMembershipResolvedForUser('new-member-uid', 'admin-uid'), false, 'Beim Kontowechsel darf die alte Adminrolle nicht gerendert werden.');
assert.equal(isMembershipResolvedForUser('new-member-uid', null), false, 'Neue Mitglieder müssen bis zur Rollenauflösung gesperrt bleiben.');
assert.equal(isMembershipResolvedForUser(null, null), true);

const app = fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
assert.match(app, /setResolvedMembershipUid\(null\)/, 'Beim Kontowechsel muss die zuvor aufgelöste Rolle verworfen werden.');
assert.match(app, /tier: 'FREE',[\s\S]*role: 'member'/, 'Vor dem Laden neuer Claims muss das Konto auf Mitglied zurückgesetzt werden.');
assert.match(app, /authLoading \|\| isMembershipResolving/, 'Die Oberfläche darf erst nach sicherer Rollenauflösung gerendert werden.');

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

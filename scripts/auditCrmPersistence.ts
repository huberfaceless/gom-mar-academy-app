import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { deleteCrmContact, mergeAcademyMembersIntoCrm, validateCrmContacts } from '../server/crmContactsAdmin.js';
import type { FirebaseMember } from '../server/firebaseMembershipAdmin.js';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/crmContactsAdmin.ts', 'utf8');
const service = readFileSync('src/services/crmContactsService.ts', 'utf8');
const view = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');

assert.match(server, /app\.get\('\/api\/crm\/contacts', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Lesen muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.put\('\/api\/crm\/contacts', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Speichern muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.delete\('\/api\/crm\/contacts\/:contactId', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Löschen muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.post\('\/api\/admin\/crm\/sync-members', requireVerifiedMember, requireAcademyAdmin/, 'Der Mitgliederabgleich muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /syncAcademyMembersToCrm\(FIREBASE_PROJECT_ID, adminUserId, members\)/, 'Der Mitgliederabgleich muss serverseitig erfolgen.');
assert.match(storage, /academyCrmContacts\//, 'CRM-Kontakte müssen zentral in Firestore gespeichert werden.');
assert.match(storage, /encodeURIComponent\(userId\)/, 'CRM-Kontakte müssen nach Firebase-Benutzer getrennt werden.');
assert.match(storage, /value\.length > 1_000/, 'Die Kontaktanzahl muss serverseitig begrenzt sein.');
assert.match(service, /authenticatedFetch\('\/api\/crm\/contacts'/, 'Der Client muss den geschützten CRM-Endpunkt verwenden.');
assert.match(service, /authenticatedFetch\('\/api\/admin\/crm\/sync-members'/, 'Der Client muss den geschützten Mitgliederabgleich verwenden.');
assert.match(service, /encodeURIComponent\(contactId\)/, 'Kontakt-IDs müssen beim Löschen sicher kodiert werden.');
assert.match(view, /await saveCrmContacts\(\[newLead, \.\.\.persistentContacts\]\)/, 'Neue Kontakte müssen vor der Erfolgsmeldung zentral gespeichert werden.');
assert.match(view, /loadCrmContacts\(\)/, 'Gespeicherte CRM-Kontakte müssen beim Öffnen geladen werden.');
assert.match(view, /!contact\.id\.startsWith\('lead_sim_'\)/, 'Lokale Test-Leads dürfen nicht in Firestore gespeichert werden.');
assert.match(view, /onUpdateLead=\{async/, 'Änderungen am Interaktionsverlauf müssen zentral gespeichert werden.');
assert.match(view, /onDeleteLead=\{async/, 'Kontakte müssen aus der zentralen Speicherung gelöscht werden.');
assert.match(view, /if \(!isAdmin\)/, 'Normale Mitglieder dürfen keine CRM-Kontakte laden.');
assert.match(view, /isAdmin && mainTab === 'crm'/, 'Der CRM-Bereich darf nur für Administratoren gerendert werden.');
assert.match(view, /Alle Mitglieder abgleichen/, 'Der Adminbereich muss den Mitgliederabgleich anbieten.');
assert.match(view, /void syncRequest/, 'Admin-Mitglieder müssen beim Öffnen mit dem CRM abgeglichen werden.');
assert.match(view, /Es wurde keine E-Mail versendet\./, 'Der Mitgliederabgleich darf keinen Versand vortäuschen.');
assert.match(storage, /consent\.granted && consent\.email\.trim\(\)\.toLowerCase\(\) === member\.email\.trim\(\)\.toLowerCase\(\)/, 'Nur Einwilligungen für die aktuell bestätigte Mitgliedsadresse dürfen markiert werden.');
assert.match(storage, /member\.emailVerified && !member\.disabled/, 'Nur bestätigte und aktive Mitglieder dürfen übernommen werden.');
assert.match(storage, /!contact\.id\.startsWith\('member_'\)/, 'Manuell angelegte Kontakte müssen beim Abgleich erhalten bleiben.');
assert.match(modal, /lead\.tags\.includes\('E-Mail-Einwilligung'\)/, 'Ohne Einwilligung darf der Marketing-Button für Mitglieder nicht verfügbar sein.');
assert.match(readFileSync('src/App.tsx', 'utf8'), /isAdmin=\{user\.role === 'admin'\}/, 'Die Admin-Rolle muss ausdrücklich an den CRM-Bereich übergeben werden.');
assert.match(modal, /Kontakt dauerhaft löschen/, 'Das Kontaktprofil muss eine sichtbare Löschfunktion anbieten.');
assert.match(modal, /window\.confirm/, 'Vor dem dauerhaften Löschen muss eine Bestätigung verlangt werden.');

const validContact = { id: 'lead_1', name: 'Anna Muster', email: 'anna@example.com' };
assert.deepEqual(validateCrmContacts([validContact]), [validContact], 'Ein gültiger Kontakt muss akzeptiert werden.');
assert.throws(() => validateCrmContacts([{ ...validContact, email: 'ungueltig' }]), /E-Mail-Adresse/, 'Ungültige Empfängeradressen müssen abgelehnt werden.');
assert.throws(() => validateCrmContacts(new Array(1_001).fill(validContact)), /zu groß/, 'Mehr als 1.000 Kontakte müssen abgelehnt werden.');
await assert.rejects(() => deleteCrmContact('project', 'user', '../fremd'), /Kontakt-ID/, 'Ungültige Kontakt-IDs müssen vor dem Firestore-Zugriff abgelehnt werden.');

const members: FirebaseMember[] = ['stefan', 'test', 'stephan'].map((uid) => ({
  uid, email: `${uid}@example.com`, displayName: uid, emailVerified: true, disabled: false,
  tier: 'FREE', role: 'member', language: 'de',
}));
const manual = { id: 'lead_manual', name: 'Interessent', email: 'manual@example.com' };
const consentedMember = { member: members[0], consentUpdatedAt: '2026-09-28T08:00:00Z', emailConsentGranted: true };
const withoutConsent = members.slice(1).map((member) => ({ member, consentUpdatedAt: null, emailConsentGranted: false }));
const merged = mergeAcademyMembersIntoCrm([consentedMember, ...withoutConsent], [manual]);
assert.equal(merged.contacts.length, 4, 'Drei bestätigte Mitglieder und ein manueller Kontakt müssen im CRM erscheinen.');
assert.equal(merged.memberCount, 3);
assert.equal(merged.consentedCount, 1);
assert.equal(merged.contacts.filter((contact) => contact.badge === 'Keine E-Mail-Einwilligung').length, 2);
assert.equal(merged.contacts.at(-1)?.id, manual.id, 'Manuelle Kontakte müssen erhalten bleiben.');
const refreshed = mergeAcademyMembersIntoCrm(withoutConsent.concat({ ...consentedMember, emailConsentGranted: false, consentUpdatedAt: null }), merged.contacts);
assert.equal(refreshed.importedCount, 0, 'Ein weiterer Abgleich darf bestehende Mitglieder nicht duplizieren.');
assert.equal(refreshed.contacts.filter((contact) => Array.isArray(contact.tags) && contact.tags.includes('E-Mail-Einwilligung')).length, 0, 'Nach Widerruf dürfen keine Einwilligungsmarker bestehen bleiben.');

console.log('CRM-Persistenz geprüft: benutzergetrennt, serverseitig validiert und zentral in Firestore gespeichert.');

// Einwilligung nach dem Import ändern: CRM-Lesen muss den aktuellen Nachweis verwenden,
// ohne Einwilligungen zu schreiben, Kontakte hinzuzufügen oder Notizen zu verlieren.
const { refreshCrmMemberConsents, memberContactId } = await import('../server/crmContactsAdmin.js');
const { GoogleAuth } = await import('google-auth-library');
const originalFetch = globalThis.fetch;
const originalGetClient = GoogleAuth.prototype.getClient;
try {
  GoogleAuth.prototype.getClient = (async () => ({ getAccessToken: async () => ({ token: 'audit-token' }) })) as unknown as typeof originalGetClient;
  let granted = true;
  let pending = false;
  let consentEmail = members[0].email.toUpperCase();
  let failRead = false;
  let reads = 0;
  globalThis.fetch = (async (input, init) => {
    assert.equal(init?.method || 'GET', 'GET', 'Einwilligungsaktualisierung darf niemals schreiben.');
    assert.match(String(input), /academyEmailConsents\/stefan$/, 'Nur gespeicherte Mitglieder prüfen.');
    reads += 1;
    if (failRead) return new Response('', { status: 503 });
    return Response.json({ fields: {
      granted: { booleanValue: granted }, email: { stringValue: consentEmail },
      updatedAt: { timestampValue: '2026-11-22T11:00:00Z' },
      ...(pending ? { confirmationTokenHash: { stringValue: 'audit' }, confirmationExpiresAt: { timestampValue: '2099-01-01T00:00:00Z' } } : {}),
    } });
  }) as typeof fetch;
  const saved: Record<string, unknown> = { ...merged.contacts.find((contact) => contact.id === memberContactId(members[0].uid))!,
    badge: 'Keine E-Mail-Einwilligung', tags: ['Academy-Mitglied'], timeline: [{ id: 'note', text: 'Eigene Notiz' }], phone: '+43123' };
  const contacts = [manual, saved];
  const approved = await refreshCrmMemberConsents('audit', contacts, members);
  assert.deepEqual(approved.map(contact => contact.id), contacts.map(contact => contact.id), 'Reihenfolge und Kontaktbestand bleiben erhalten.');
  assert.equal(approved[0], manual, 'Manuelle Kontakte bleiben unverändert.');
  assert.equal(approved[1].badge, 'E-Mail-Einwilligung aktiv', 'Später bestätigte Einwilligung wird ohne erneuten Import angezeigt.');
  assert.equal(approved[1].badgeType, 'active');
  assert.deepEqual(approved[1].timeline, saved.timeline);
  assert.equal(approved[1].phone, saved.phone);
  assert.equal(reads, 1, 'Kein unnötiges Prüfen noch nicht importierter Mitglieder.');
  for (const scenario of ['widerrufen', 'ausstehend', 'andere-adresse', 'deaktiviert', 'unbestaetigt', 'geloescht'] as const) {
    granted = scenario !== 'widerrufen' && scenario !== 'ausstehend';
    pending = scenario === 'ausstehend';
    consentEmail = scenario === 'andere-adresse' ? 'other@example.com' : members[0].email;
    const currentMembers = scenario === 'geloescht' ? members.slice(1) : members.map((member, index) => index ? member : {
      ...member, disabled: scenario === 'deaktiviert', emailVerified: scenario !== 'unbestaetigt',
    });
    const result = await refreshCrmMemberConsents('audit', approved, currentMembers);
    assert.equal(result[1].badge, 'Keine E-Mail-Einwilligung', scenario);
    assert.equal(result[1].badgeType, 'neutral', 'Keine irreführende grüne Einwilligungsanzeige.');
    assert.ok(!(result[1].tags as string[]).includes('E-Mail-Einwilligung'), scenario);
  }
  failRead = true;
  await assert.rejects(() => refreshCrmMemberConsents('audit', approved, members), /nicht geladen/, 'Lesefehler dürfen keine vermeintlich aktuelle Einwilligung liefern.');
  assert.equal(saved.badge, 'Keine E-Mail-Einwilligung', 'Gespeicherter Snapshot wurde nicht mutiert.');
} finally {
  globalThis.fetch = originalFetch;
  GoogleAuth.prototype.getClient = originalGetClient;
}
assert.match(server, /refreshCrmMemberConsents\(FIREBASE_PROJECT_ID, storedContacts, members\)/);
assert.match(view, /window\.addEventListener\('focus', refresh\)/);
assert.match(view, /document\.addEventListener\('visibilitychange', refresh\)/);
assert.match(view, /window\.clearInterval\(interval\)/);
assert.match(view, /setSelectedLead\(\(previous\) => previous \? current\.find/);
console.log('CRM-Einwilligung geprüft: aktuelle Bestätigung, Widerruf, ausstehende Bestätigung, Adresswechsel, deaktiviertes/gelöschtes Konto und Lesefehler; ausschließlich Lesezugriffe.');

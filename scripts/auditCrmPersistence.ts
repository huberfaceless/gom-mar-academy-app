import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { deleteCrmContact, validateCrmContacts } from '../server/crmContactsAdmin.js';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/crmContactsAdmin.ts', 'utf8');
const service = readFileSync('src/services/crmContactsService.ts', 'utf8');
const view = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');

assert.match(server, /app\.get\('\/api\/crm\/contacts', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Lesen muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.put\('\/api\/crm\/contacts', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Speichern muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.delete\('\/api\/crm\/contacts\/:contactId', requireVerifiedMember, requireAcademyAdmin/, 'CRM-Löschen muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /app\.post\('\/api\/admin\/crm\/sync-consented-members', requireVerifiedMember, requireAcademyAdmin/, 'Der Mitgliederabgleich muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /syncConsentedMembersToCrm\(FIREBASE_PROJECT_ID, adminUserId, members\)/, 'Der Mitgliederabgleich muss serverseitig erfolgen.');
assert.match(storage, /academyCrmContacts\//, 'CRM-Kontakte müssen zentral in Firestore gespeichert werden.');
assert.match(storage, /encodeURIComponent\(userId\)/, 'CRM-Kontakte müssen nach Firebase-Benutzer getrennt werden.');
assert.match(storage, /value\.length > 1_000/, 'Die Kontaktanzahl muss serverseitig begrenzt sein.');
assert.match(service, /authenticatedFetch\('\/api\/crm\/contacts'/, 'Der Client muss den geschützten CRM-Endpunkt verwenden.');
assert.match(service, /authenticatedFetch\('\/api\/admin\/crm\/sync-consented-members'/, 'Der Client muss den geschützten Mitgliederabgleich verwenden.');
assert.match(service, /encodeURIComponent\(contactId\)/, 'Kontakt-IDs müssen beim Löschen sicher kodiert werden.');
assert.match(view, /await saveCrmContacts\(\[newLead, \.\.\.persistentContacts\]\)/, 'Neue Kontakte müssen vor der Erfolgsmeldung zentral gespeichert werden.');
assert.match(view, /loadCrmContacts\(\)/, 'Gespeicherte CRM-Kontakte müssen beim Öffnen geladen werden.');
assert.match(view, /!contact\.id\.startsWith\('lead_sim_'\)/, 'Lokale Test-Leads dürfen nicht in Firestore gespeichert werden.');
assert.match(view, /onUpdateLead=\{async/, 'Änderungen am Interaktionsverlauf müssen zentral gespeichert werden.');
assert.match(view, /onDeleteLead=\{async/, 'Kontakte müssen aus der zentralen Speicherung gelöscht werden.');
assert.match(view, /if \(!isAdmin\)/, 'Normale Mitglieder dürfen keine CRM-Kontakte laden.');
assert.match(view, /isAdmin && mainTab === 'crm'/, 'Der CRM-Bereich darf nur für Administratoren gerendert werden.');
assert.match(view, /Einwilligende Mitglieder abgleichen/, 'Der Adminbereich muss den Mitgliederabgleich anbieten.');
assert.match(view, /Es wurde keine E-Mail versendet\./, 'Der Mitgliederabgleich darf keinen Versand vortäuschen.');
assert.match(storage, /consent\.granted && consent\.email\.trim\(\)\.toLowerCase\(\) === member\.email\.trim\(\)\.toLowerCase\(\)/, 'Nur Einwilligungen für die aktuell bestätigte Mitgliedsadresse dürfen übernommen werden.');
assert.match(storage, /member\.emailVerified && !member\.disabled/, 'Nur bestätigte und aktive Mitglieder dürfen übernommen werden.');
assert.match(storage, /!contact\.id\.startsWith\('member_'\)/, 'Widerrufene Mitgliedskontakte müssen beim Abgleich entfernt werden, ohne manuelle Leads zu löschen.');
assert.match(readFileSync('src/App.tsx', 'utf8'), /isAdmin=\{user\.role === 'admin'\}/, 'Die Admin-Rolle muss ausdrücklich an den CRM-Bereich übergeben werden.');
assert.match(modal, /Kontakt dauerhaft löschen/, 'Das Kontaktprofil muss eine sichtbare Löschfunktion anbieten.');
assert.match(modal, /window\.confirm/, 'Vor dem dauerhaften Löschen muss eine Bestätigung verlangt werden.');

const validContact = { id: 'lead_1', name: 'Anna Muster', email: 'anna@example.com' };
assert.deepEqual(validateCrmContacts([validContact]), [validContact], 'Ein gültiger Kontakt muss akzeptiert werden.');
assert.throws(() => validateCrmContacts([{ ...validContact, email: 'ungueltig' }]), /E-Mail-Adresse/, 'Ungültige Empfängeradressen müssen abgelehnt werden.');
assert.throws(() => validateCrmContacts(new Array(1_001).fill(validContact)), /zu groß/, 'Mehr als 1.000 Kontakte müssen abgelehnt werden.');
await assert.rejects(() => deleteCrmContact('project', 'user', '../fremd'), /Kontakt-ID/, 'Ungültige Kontakt-IDs müssen vor dem Firestore-Zugriff abgelehnt werden.');

console.log('CRM-Persistenz geprüft: benutzergetrennt, serverseitig validiert und zentral in Firestore gespeichert.');

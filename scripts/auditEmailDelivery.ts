import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const service = readFileSync('src/services/emailDeliveryService.ts', 'utf8');
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');
const automation = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');

assert.match(
  server,
  /app\.post\('\/api\/email\/send', requireVerifiedMember, requireAcademyAdmin/,
  'Der CRM-E-Mail-Endpunkt muss eine bestätigte Admin-Anmeldung verlangen.',
);
assert.match(server, /app\.post\('\/api\/email\/test-send', requireVerifiedMember, requireProMember/, 'Der Testversand muss eine bestätigte PRO-Anmeldung verlangen.');
assert.match(server, /app\.post\('\/api\/admin\/members\/:uid\/email', requireVerifiedMember, requireAcademyAdmin/, 'Mitglieder-E-Mails müssen eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /getFirebaseMember\(FIREBASE_PROJECT_ID, uid\)/, 'Die Empfängeradresse muss serverseitig anhand der Firebase-UID ermittelt werden.');
assert.match(server, /!member\.emailVerified \|\| member\.disabled/, 'Unbestätigte oder deaktivierte Mitglieder dürfen nicht angeschrieben werden.');
assert.match(server, /handleEmailSend\(req, res, member\.email\.trim\(\)\.toLowerCase\(\)\)/, 'Der Client darf die Mitglieder-Empfängeradresse nicht bestimmen.');
assert.match(server, /handleEmailSend\(req, res, ownVerifiedEmail\)/, 'Der Testversand muss die bestätigte eigene Firebase-Adresse erzwingen.');
assert.match(server, /process\.env\.SENDGRID_API_KEY/, 'Der SendGrid-Schlüssel muss aus der Laufzeitumgebung kommen.');
assert.match(server, /process\.env\.SENDGRID_FROM_EMAIL/, 'Die bestätigte Absenderadresse muss konfiguriert sein.');
assert.match(server, /https:\/\/api\.sendgrid\.com\/v3\/mail\/send/, 'Der echte SendGrid-Endpunkt fehlt.');
assert.match(server, /EMAIL_SEND_LIMIT/, 'Der Einzelversand muss serverseitig begrenzt sein.');
assert.match(service, /authenticatedFetch\('\/api\/email\/send'/, 'Der Client muss den geschützten E-Mail-Endpunkt verwenden.');
assert.match(service, /authenticatedFetch\('\/api\/email\/test-send'/, 'Der Client muss den geschützten Testversand verwenden.');
assert.doesNotMatch(service, /sendTestEmail[\s\S]{0,300}to:/, 'Der Client darf beim Testversand keine fremde Empfängeradresse bestimmen.');
assert.match(modal, /await onSendEmail\(lead, subject, body\)/, 'Eine Erfolgsmeldung darf erst nach der Serverantwort entstehen.');
assert.match(modal, /window\.confirm/, 'Der echte Versand muss vor dem Aufruf ausdrücklich bestätigt werden.');
assert.match(automation, /Es wurde keine E-Mail versendet\./, 'Lokale Test-Leads dürfen keinen Versand vortäuschen.');
assert.doesNotMatch(
  automation,
  /Willkommens-Mail \(Mail 1\) wurde automatisch versendet/,
  'Der Test-Lead darf keinen automatischen E-Mail-Erfolg behaupten.',
);
assert.match(automation, /Test an mich senden/, 'Der E-Mail-Entwurf muss einen eindeutigen Testversand anbieten.');
assert.match(automation, /ausschließlich an deine eigene Anmeldeadresse/, 'Der Testversand muss vorab eindeutig bestätigt werden.');
const adminDashboard = readFileSync('src/components/AdminDashboardView.tsx', 'utf8');
assert.match(adminDashboard, /E-Mail schreiben/, 'Der Adminbereich muss den Mitglieder-Einzelversand anbieten.');
assert.match(adminDashboard, /disabled=\{!member\.emailVerified \|\| member\.disabled \|\| !member\.email\}/, 'Der Versandbutton muss für ungeeignete Mitgliedskonten gesperrt sein.');
assert.match(adminDashboard, /window\.confirm\(`E-Mail wirklich an \$\{emailingMember\.email\} senden\?`\)/, 'Der Mitglieder-Versand muss ausdrücklich bestätigt werden.');

console.log('CRM-E-Mail-Versand geprüft: geschützt, begrenzt, über SendGrid und ohne simulierte Erfolgsmeldung.');

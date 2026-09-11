import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const service = readFileSync('src/services/emailDeliveryService.ts', 'utf8');
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');
const automation = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');
const consentStorage = readFileSync('server/emailConsentAdmin.ts', 'utf8');
const consentService = readFileSync('src/services/emailConsentService.ts', 'utf8');
const profile = readFileSync('src/components/ProfileView.tsx', 'utf8');

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
assert.match(server, /app\.get\('\/api\/email\/consent', requireVerifiedMember/, 'Nur bestätigte Mitglieder dürfen ihre Einwilligung laden.');
assert.match(server, /app\.put\('\/api\/email\/consent', requireVerifiedMember/, 'Nur bestätigte Mitglieder dürfen ihre Einwilligung ändern.');
assert.match(server, /app\.get\('\/api\/email\/consent\/confirm', \(req, res\)/, 'Der Bestätigungslink muss ohne bestehende Academy-Sitzung geöffnet werden können.');
assert.match(server, /app\.post\('\/api\/email\/consent\/confirm', async/, 'Erst die bewusste Bestätigung auf der Zielseite darf die Einwilligung aktivieren.');
assert.match(server, /firebaseUser\.email_verified === true/, 'Die Einwilligung muss an die bestätigte Firebase-Adresse gebunden sein.');
assert.match(server, /requestEmailConsent\(FIREBASE_PROJECT_ID, userId, verifiedEmail\)/, 'Eine Zustimmung muss zuerst als ausstehend gespeichert werden.');
assert.match(server, /confirmEmailConsent\(FIREBASE_PROJECT_ID, userId, confirmationToken\)/, 'Die Einwilligung darf erst durch den Bestätigungslink aktiv werden.');
assert.match(server, /https:\/\/academy\.gomo-marketing\.at/, 'Der Double-Opt-in-Link muss die feste Produktionsadresse verwenden.');
assert.match(server, /Referrer-Policy', 'no-referrer'/, 'Der Bestätigungstoken darf beim Weiterklicken nicht als Referrer übertragen werden.');
assert.match(server, /<form method="post" action="\/api\/email\/consent\/confirm">/, 'Automatische E-Mail-Linkprüfungen dürfen die Einwilligung nicht aktivieren.');
assert.match(server, /Confirmation not possible/, 'Die englische Bestätigungsseite fehlt.');
assert.match(server, /Potwierdzenie niemożliwe/, 'Die polnische Bestätigungsseite fehlt.');
assert.match(consentStorage, /academyEmailConsents/, 'Einwilligungen müssen zentral in Firestore gespeichert werden.');
assert.match(consentStorage, /historyJson/, 'Erteilung und Widerruf müssen historisch dokumentiert werden.');
assert.match(consentStorage, /policyVersion/, 'Die verwendete Einwilligungstext-Version muss dokumentiert werden.');
assert.match(consentStorage, /randomBytes\(32\)/, 'Bestätigungslinks benötigen einen kryptografisch zufälligen Token.');
assert.match(consentStorage, /createHash\('sha256'\)/, 'Der Bestätigungstoken darf nicht im Klartext gespeichert werden.');
assert.match(consentStorage, /CONFIRMATION_VALIDITY_MS = 24 \* 60 \* 60 \* 1000/, 'Bestätigungslinks müssen nach 24 Stunden ablaufen.');
assert.match(consentStorage, /action: 'confirmed'/, 'Die bestätigte Einwilligung muss in der Historie dokumentiert werden.');
assert.match(consentService, /authenticatedFetch\('\/api\/email\/consent'/, 'Das Profil muss den geschützten Einwilligungs-Endpunkt verwenden.');
assert.match(profile, /Einwilligung ist freiwillig und jederzeit widerrufbar/, 'Die deutsche Einwilligung muss freiwillig und widerrufbar erklärt werden.');
assert.match(profile, /Consent is voluntary and can be withdrawn at any time/, 'Die englische Einwilligungserklärung fehlt.');
assert.match(profile, /Zgoda jest dobrowolna i można ją wycofać w każdej chwili/, 'Die polnische Einwilligungserklärung fehlt.');
assert.match(profile, /window\.confirm\(nextGranted \? copy\.emailConsentConfirmGrant : copy\.emailConsentConfirmWithdraw\)/, 'Erteilung und Widerruf müssen ausdrücklich bestätigt werden.');
assert.match(profile, /Bestätigungs-E-Mail gesendet\. Die Einwilligung wird erst nach dem Klick auf den Link aktiv\./, 'Das Profil muss den ausstehenden Double-Opt-in-Status erklären.');
assert.match(profile, /emailConsentPending/, 'Das Profil muss eine ausstehende Bestätigung sichtbar darstellen.');
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

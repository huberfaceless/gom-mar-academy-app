import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const service = readFileSync('src/services/emailDeliveryService.ts', 'utf8');
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');
const automation = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');

assert.match(
  server,
  /app\.post\('\/api\/email\/send', requireVerifiedMember, requireProMember/,
  'Der E-Mail-Endpunkt muss eine bestätigte PRO-Anmeldung verlangen.',
);
assert.match(server, /process\.env\.SENDGRID_API_KEY/, 'Der SendGrid-Schlüssel muss aus der Laufzeitumgebung kommen.');
assert.match(server, /process\.env\.SENDGRID_FROM_EMAIL/, 'Die bestätigte Absenderadresse muss konfiguriert sein.');
assert.match(server, /https:\/\/api\.sendgrid\.com\/v3\/mail\/send/, 'Der echte SendGrid-Endpunkt fehlt.');
assert.match(server, /EMAIL_SEND_LIMIT/, 'Der Einzelversand muss serverseitig begrenzt sein.');
assert.match(service, /authenticatedFetch\('\/api\/email\/send'/, 'Der Client muss den geschützten E-Mail-Endpunkt verwenden.');
assert.match(modal, /await onSendEmail\(lead, subject, body\)/, 'Eine Erfolgsmeldung darf erst nach der Serverantwort entstehen.');
assert.match(modal, /window\.confirm/, 'Der echte Versand muss vor dem Aufruf ausdrücklich bestätigt werden.');
assert.match(automation, /Es wurde keine E-Mail versendet\./, 'Lokale Test-Leads dürfen keinen Versand vortäuschen.');
assert.doesNotMatch(
  automation,
  /Willkommens-Mail \(Mail 1\) wurde automatisch versendet/,
  'Der Test-Lead darf keinen automatischen E-Mail-Erfolg behaupten.',
);

console.log('CRM-E-Mail-Versand geprüft: geschützt, begrenzt, über SendGrid und ohne simulierte Erfolgsmeldung.');

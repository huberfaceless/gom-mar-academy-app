import assert from 'node:assert/strict';
import fs from 'node:fs';
import { accountVerificationEmailCopy } from '../server/emailHtmlTemplate.js';

const auth = fs.readFileSync('src/firebase/auth.ts', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');

assert.match(
  auth,
  /AUTH_EMAIL_CONTINUE_URL = 'https:\/\/academy\.gomo-marketing\.at\/'/,
  'Authentifizierungs-E-Mails müssen zur festen Produktionsdomain zurückführen.',
);
assert.match(
  auth,
  /auth\.languageCode = language/,
  'Authentifizierungs-E-Mails müssen die gewählte Sprache verwenden.',
);
assert.match(
  auth,
  /fetch\('\/api\/auth\/verification-email'/,
  'Bestätigungs-E-Mails müssen den geschützten Academy-Versand verwenden.',
);
assert.match(server, /app\.post\('\/api\/auth\/verification-email', requireAuthenticatedMember/, 'Nur angemeldete Konten dürfen die Verifizierung anfordern.');
assert.match(server, /member\.email\.trim\(\)\.toLowerCase\(\) !== email/, 'Die E-Mail-Adresse muss serverseitig dem Konto zugeordnet werden.');
assert.match(server, /requestType: 'VERIFY_EMAIL', email, returnOobLink: true/, 'Der Link muss von Firebase generiert werden, ohne eine zweite Firebase-E-Mail zu senden.');
assert.match(server, /localizedLink\.searchParams\.set\('lang', language\)/, 'Die Firebase-Bestätigungsseite muss dieselbe Sprache wie die E-Mail verwenden.');
assert.match(server, /\{ type: 'text\/plain', value: message\.text \}, \{ type: 'text\/html', value: message\.html \}/, 'Der Versand braucht Text- und HTML-Version.');
const link = 'https://example.firebaseapp.com/action?mode=verifyEmail&oobCode=abc&lang=de';
const de = accountVerificationEmailCopy('de', link);
const en = accountVerificationEmailCopy('en', link);
const pl = accountVerificationEmailCopy('pl', link);
assert.match(de.html, /E-Mail-Adresse bestätigen/, 'Die deutsche E-Mail braucht einen Bestätigungsbutton.');
assert.match(en.subject, /Verify your email address/, 'Die englische Vorlage fehlt.');
assert.match(pl.subject, /Potwierdź adres e-mail/, 'Die polnische Vorlage fehlt.');
assert.match(de.html, /oobCode=abc&amp;lang=de/, 'Linkparameter müssen im HTML korrekt maskiert werden.');
assert.match(
  auth,
  /sendPasswordResetEmail\(auth, email\.trim\(\), prepareAuthEmail\(language\)\)/,
  'Passwort-Reset-E-Mails müssen die geprüften Aktionseinstellungen verwenden.',
);

console.log('Firebase-Kontoverifizierung geprüft: geschützter Linkversand, HTML und lokalisierte Vorlagen.');

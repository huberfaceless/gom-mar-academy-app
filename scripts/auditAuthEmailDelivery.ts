import assert from 'node:assert/strict';
import fs from 'node:fs';
import { accountVerificationEmailCopy, passwordResetEmailCopy } from '../server/emailHtmlTemplate.js';

const auth = fs.readFileSync('src/firebase/auth.ts', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');
const entry = fs.readFileSync('src/main.tsx', 'utf8');
const handler = fs.readFileSync('src/components/VerifyEmailAction.tsx', 'utf8');
const resetHandler = fs.readFileSync('src/components/ResetPasswordAction.tsx', 'utf8');

assert.match(
  auth,
  /fetch\('\/api\/auth\/verification-email'/,
  'Bestätigungs-E-Mails müssen den geschützten Academy-Versand verwenden.',
);
assert.match(server, /app\.post\('\/api\/auth\/verification-email', requireAuthenticatedMember/, 'Nur angemeldete Konten dürfen die Verifizierung anfordern.');
assert.match(server, /member\.email\.trim\(\)\.toLowerCase\(\) !== email/, 'Die E-Mail-Adresse muss serverseitig dem Konto zugeordnet werden.');
assert.match(server, /requestType: 'VERIFY_EMAIL', email, returnOobLink: true/, 'Der Link muss von Firebase generiert werden, ohne eine zweite Firebase-E-Mail zu senden.');
assert.match(server, /firebaseLink\.searchParams\.get\('mode'\) !== 'verifyEmail'/, 'Nur Firebase-Links zur Kontoverifizierung dürfen übernommen werden.');
assert.match(server, /new URL\('\/verify-email', ACADEMY_PUBLIC_URL\)/, 'Die E-Mail muss zur Academy-Bestätigungsseite führen.');
assert.match(server, /academyLink\.searchParams\.set\('oobCode', verificationCode\)/, 'Der Firebase-Code muss im Academy-Link enthalten sein.');
assert.match(server, /academyLink\.searchParams\.set\('lang', language\)/, 'Die Bestätigungsseite muss dieselbe Sprache wie die E-Mail verwenden.');
assert.match(entry, /window\.location\.pathname === '\/verify-email' \? <VerifyEmailAction/, 'Bestätigungslinks müssen zur eigenen Seite führen.');
assert.match(handler, /applyActionCode\(auth, code\)/, 'Firebase muss die Bestätigung tatsächlich ausführen.');
assert.match(handler, /window\.history\.replaceState\(null, '', '\/verify-email'\)/, 'Einmal-Codes dürfen nicht im Browser-Verlauf verbleiben.');
assert.match(server, /\{ type: 'text\/plain', value: message\.text \}, \{ type: 'text\/html', value: message\.html \}/, 'Der Versand braucht Text- und HTML-Version.');
const link = 'https://example.firebaseapp.com/action?mode=verifyEmail&oobCode=abc&lang=de';
const de = accountVerificationEmailCopy('de', link);
const en = accountVerificationEmailCopy('en', link);
const pl = accountVerificationEmailCopy('pl', link);
assert.match(de.html, /E-Mail-Adresse bestätigen/, 'Die deutsche E-Mail braucht einen Bestätigungsbutton.');
assert.match(en.subject, /Verify your email address/, 'Die englische Vorlage fehlt.');
assert.match(pl.subject, /Potwierdź adres e-mail/, 'Die polnische Vorlage fehlt.');
assert.match(de.html, /oobCode=abc&amp;lang=de/, 'Linkparameter müssen im HTML korrekt maskiert werden.');
assert.match(auth, /fetch\('\/api\/auth\/password-reset-email'/, 'Passwort-Reset muss den HTML-Versand nutzen.');
assert.match(server, /app\.post\('\/api\/auth\/password-reset-email'/, 'Der Passwort-Reset-Endpunkt fehlt.');
assert.match(server, /recent\.length >= 3 \|\| ipRecent\.length >= 10/, 'Passwort-Reset-Versand braucht Schutz gegen Massenanforderungen.');
assert.match(server, /failure\.error\?\.message === 'EMAIL_NOT_FOUND'/, 'Unbekannte E-Mail-Adressen dürfen nicht offengelegt werden.');
assert.match(server, /requestType: 'PASSWORD_RESET', email, returnOobLink: true/, 'Firebase muss den Passwort-Reset-Code ohne zweite E-Mail erzeugen.');
assert.match(server, /new URL\('\/reset-password', ACADEMY_PUBLIC_URL\)/, 'Der Reset-Button muss zur Academy-Seite führen.');
assert.match(entry, /window\.location\.pathname === '\/reset-password' \? <ResetPasswordAction/, 'Reset-Links müssen die eigene Seite öffnen.');
assert.match(resetHandler, /verifyPasswordResetCode\(auth, code\)/, 'Der Reset-Code muss vor der Eingabe geprüft werden.');
assert.match(resetHandler, /confirmPasswordReset\(auth, code, password\)/, 'Das neue Passwort muss bei Firebase gesetzt werden.');
assert.match(resetHandler, /window\.history\.replaceState\(null, '', '\/reset-password'\)/, 'Reset-Codes dürfen nicht im Browser-Verlauf verbleiben.');
assert.match(resetHandler, /\[params\] = useState\(\(\) => new URLSearchParams\(window\.location\.search\)\)/, 'Der Reset-Code muss beim ersten Rendern erhalten bleiben, auch wenn die URL geleert wird.');
assert.match(resetHandler, /<form noValidate onSubmit=/, 'Zu kurze Passwörter müssen eine sichtbare Fehlermeldung auslösen.');
const resetLink = 'https://academy.gomo-marketing.at/reset-password?oobCode=abc&lang=de';
assert.match(passwordResetEmailCopy('de', resetLink).html, /Passwort zurücksetzen/, 'Deutsche Reset-E-Mail braucht einen Button.');
assert.match(passwordResetEmailCopy('en', resetLink).html, /Reset password/, 'Englische Reset-E-Mail braucht einen Button.');
assert.match(passwordResetEmailCopy('pl', resetLink).html, /Zresetuj hasło/, 'Polnische Reset-E-Mail braucht einen Button.');
assert.match(passwordResetEmailCopy('de', resetLink).html, /oobCode=abc&amp;lang=de/, 'Reset-Link muss im HTML sicher maskiert werden.');

console.log('Firebase-Kontoverifizierung und Passwort-Reset geprüft: HTML, Einmal-Codes und drei Sprachen.');

import assert from 'node:assert/strict';
import fs from 'node:fs';

const auth = fs.readFileSync('src/firebase/auth.ts', 'utf8');

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
  /sendEmailVerification\(targetUser, prepareAuthEmail\(language\)\)/,
  'Bestätigungs-E-Mails müssen die geprüften Aktionseinstellungen verwenden.',
);
assert.match(
  auth,
  /sendPasswordResetEmail\(auth, email\.trim\(\), prepareAuthEmail\(language\)\)/,
  'Passwort-Reset-E-Mails müssen die geprüften Aktionseinstellungen verwenden.',
);

console.log('Firebase-Authentifizierungs-E-Mails geprüft: Produktionsdomain und Sprache sind fest konfiguriert.');

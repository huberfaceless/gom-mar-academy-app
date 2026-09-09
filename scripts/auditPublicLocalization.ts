import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dashboard = readFileSync('src/components/DashboardView.tsx', 'utf8');
const academy = readFileSync('src/components/AcademyView.tsx', 'utf8');
const footer = readFileSync('src/components/Footer.tsx', 'utf8');

assert.match(
  dashboard,
  /localizeAllAcademyStages\(ACADEMY_STAGES, language\)/,
  'Das Dashboard muss dieselben lokalisierten Academy-Daten wie die Academy verwenden.',
);
assert.doesNotMatch(
  dashboard,
  /import \{ localizeAllAcademyStages \} from '\.\.\/i18n\/localizeAllAcademyStages';/,
  'Das Dashboard darf die vollständige Academy-Lokalisierung nicht synchron laden.',
);
assert.match(
  dashboard,
  /import\('\.\.\/i18n\/localizeAllAcademyStages'\)/,
  'Das Dashboard muss die vollständige Academy-Lokalisierung bei Bedarf nachladen.',
);
assert.match(
  academy,
  /localizeAllAcademyStages\(stages, language\)/,
  'Die Academy muss den gemeinsamen Lokalisierungshelfer verwenden.',
);
assert.match(footer, /useLanguage\(\)/, 'Der Footer muss auf die gewählte Sprache reagieren.');

for (const language of ['de', 'en', 'pl']) {
  assert.match(
    footer,
    new RegExp(`\\b${language}: \\{`),
    `Im Footer fehlt die Sprachfassung ${language}.`,
  );
}

for (const unsupportedClaim of [
  'krisensicheren',
  '100% DSGVO-konform',
  '256-Bit SSL-Schutz',
]) {
  assert.doesNotMatch(
    footer,
    new RegExp(unsupportedClaim),
    `Unbelegte Footer-Aussage gefunden: ${unsupportedClaim}`,
  );
}

console.log('Öffentliche Lokalisierung geprüft: Dashboard und Footer sind dreisprachig und risikogerecht.');

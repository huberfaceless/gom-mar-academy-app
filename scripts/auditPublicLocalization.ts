import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dashboard = readFileSync('src/components/DashboardView.tsx', 'utf8');
const academy = readFileSync('src/components/AcademyView.tsx', 'utf8');
const footer = readFileSync('src/components/Footer.tsx', 'utf8');
const localizationHook = readFileSync('src/i18n/useLocalizedAcademyStages.ts', 'utf8');
const viteConfig = readFileSync('vite.config.ts', 'utf8');

for (const [source, label] of [[dashboard, 'Dashboard'], [academy, 'Academy']] as const) {
  assert.match(source, /useLocalizedAcademyStages\(/, `${label} muss den gemeinsamen Lokalisierungshook verwenden.`);
  assert.doesNotMatch(source, /localizeAllAcademyStages/, `${label} darf die vollständige Lokalisierung nicht synchron laden.`);
}
assert.match(localizationHook, /import\('virtual:academy-localization-en'\)/, 'Englisch muss separat geladen werden.');
assert.match(localizationHook, /import\('virtual:academy-localization-pl'\)/, 'Polnisch muss separat geladen werden.');
assert.match(viteConfig, /virtual:academy-localization-en/, 'Der Build muss ein eigenes englisches Lokalisierungsmodul erzeugen.');
assert.match(viteConfig, /virtual:academy-localization-pl/, 'Der Build muss ein eigenes polnisches Lokalisierungsmodul erzeugen.');
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

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
assert.match(localizationHook, /virtual:academy-localization-en-1-20/, 'Englisch muss nach Etappengruppen geladen werden.');
assert.match(localizationHook, /virtual:academy-localization-pl-81-99/, 'Polnisch muss nach Etappengruppen geladen werden.');
assert.match(viteConfig, /\{ key: '1-20', from: 1, to: 20 \}/, 'Der Build muss mit Etappengruppe 1–20 beginnen.');
assert.match(viteConfig, /\{ key: '81-99', from: 81, to: 99 \}/, 'Der Build muss mit Etappengruppe 81–99 enden.');
assert.match(dashboard, /accessibleSourceStages\.map\(\(stage\) => stage\.id\)/, 'Das Dashboard darf nur zugängliche Etappengruppen laden.');
assert.match(academy, /viewMode === 'lesson' \? \[selectedStageId\]/, 'Eine direkt geöffnete Lektion darf nur ihre Etappengruppe laden.');
assert.match(academy, /viewMode === 'lesson' \? \[selectedStageId\] : overviewStageIds/, 'Die Academy-Übersicht darf nur sichtbare Etappengruppen laden.');
assert.match(academy, /stage\.id >= selectedRange\[0\] && stage\.id <= selectedRange\[1\]/, 'Der ausgewählte Academy-Bereich muss die geladenen Etappen begrenzen.');
assert.match(academy, /else \{\s+handleBackToOverview\(\);\s+\}/, 'Die erste Lektion muss über die Rückwärtsnavigation verlassen werden können.');
assert.match(academy, /if \(isStageUnlocked\) \{[\s\S]*onClick=\{\(\) => handleOpenLesson\(stage\.id, lesson\.id\)\}/, 'Alle Lektionen einer freigeschalteten Etappe müssen anklickbar sein.');
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

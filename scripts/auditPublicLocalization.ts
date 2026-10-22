import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { visitorFunnelCopy } from '../src/i18n/visitorFunnelCopy';

const dashboard = readFileSync('src/components/DashboardView.tsx', 'utf8');
const academy = readFileSync('src/components/AcademyView.tsx', 'utf8');
const footer = readFileSync('src/components/Footer.tsx', 'utf8');
const header = readFileSync('src/components/Header.tsx', 'utf8');
const authModal = readFileSync('src/components/AuthModal.tsx', 'utf8');
const publicLanding = readFileSync('src/components/PublicLandingView.tsx', 'utf8');
const visitorGate = readFileSync('src/components/VisitorAccessGateModal.tsx', 'utf8');
const localizationHook = readFileSync('src/i18n/useLocalizedAcademyStages.ts', 'utf8');
const viteConfig = readFileSync('vite.config.ts', 'utf8');

for (const [source, label] of [[dashboard, 'Dashboard'], [academy, 'Academy']] as const) {
  assert.match(source, /useLocalizedAcademyStages\(/, `${label} muss den gemeinsamen Lokalisierungshook verwenden.`);
  assert.doesNotMatch(source, /localizeAllAcademyStages/, `${label} darf die vollständige Lokalisierung nicht synchron laden.`);
}
assert.match(localizationHook, /API returns localized stages/, 'Die Sprachfassung muss vom geschützten Server kommen.');
assert.doesNotMatch(localizationHook, /virtual:academy-localization/, 'Bezahlte Sprachfassungen dürfen nicht im Browser geladen werden.');
assert.match(viteConfig, /outDir: 'dist\/public'/, 'Nur der öffentliche Build darf statisch ausgeliefert werden.');
assert.match(dashboard, /stages\.filter\(\(stage\) => stage\.id <= stageAccessLimit\)/, 'Das Dashboard darf nur freigegebene Etappen anzeigen.');
assert.match(academy, /stage\.id >= selectedRange\[0\] && stage\.id <= selectedRange\[1\]/, 'Der ausgewählte Academy-Bereich muss die geladenen Etappen begrenzen.');
assert.match(academy, /resolvePreviousAcademyLocation\(localizedStages, selectedStageId, currentLesson\.id\)/, 'Die Academy muss die geprüfte Rückwärtsnavigation verwenden.');
assert.match(academy, /const isStageAccessible = isAcademyStageAccessible\(stage\.id, stageAccessLimit\);/, 'Etappen müssen ausschließlich entsprechend der Tarifgrenze anklickbar sein.');
assert.match(academy, /if \(isStageAccessible\) \{[\s\S]*onClick=\{\(\) => handleOpenLesson\(stage\.id, lesson\.id\)\}/, 'Alle Lektionen einer zugänglichen Etappe müssen anklickbar sein.');
assert.doesNotMatch(academy, /unlockedStageIdSet/, 'Gespeicherter Lernfortschritt darf zugängliche Etappen nicht zusätzlich sperren.');
assert.match(footer, /useLanguage\(\)/, 'Der Footer muss auf die gewählte Sprache reagieren.');
assert.match(header, /onClick=\{\(\) => onNavigate\('profile'\)\}/, 'Das Profil muss auf Mobilgeräten direkt erreichbar sein.');
assert.match(footer, /onClick=\{\(\) => onNavigate\('academy'\)\}/, 'Der Footer muss zur Academy navigieren.');
assert.match(footer, /onClick=\{\(\) => onNavigate\('email'\)\}/, 'Der Footer muss zum E-Mail-Bereich navigieren.');
assert.match(footer, /onClick=\{\(\) => onNavigate\('toolbox'\)\}/, 'Der Footer muss zur Toolbox navigieren.');
assert.match(footer, /onClick=\{onOpenFragGommar\}/, 'Der Footer muss den KI-Mentor öffnen.');
assert.match(authModal, /const \{ language, setLanguage, t \} = useLanguage\(\)/, 'Das Kontoformular muss auf die aktive Sprache reagieren.');
assert.match(authModal, /\['de', 'Deutsch'\]/, 'Im Kontoformular fehlt Deutsch.');
assert.match(authModal, /\['en', 'English'\]/, 'Im Kontoformular fehlt Englisch.');
assert.match(authModal, /\['pl', 'Polski'\]/, 'Im Kontoformular fehlt Polnisch.');
assert.match(authModal, /onClick=\{\(\) => setLanguage\(code\)\}/, 'Die Sprachauswahl im Kontoformular muss die Academy-Sprache ändern.');
assert.match(publicLanding, /const \{ language, setLanguage \} = useLanguage\(\)/, 'Das öffentliche Kontoformular muss auf die aktive Sprache reagieren.');
assert.match(publicLanding, /registrationCopy\[language\]/, 'Das öffentliche Kontoformular muss die Texte der aktiven Sprache verwenden.');
assert.match(publicLanding, /\['de', 'Deutsch'\]/, 'Im öffentlichen Kontoformular fehlt Deutsch.');
assert.match(publicLanding, /\['en', 'English'\]/, 'Im öffentlichen Kontoformular fehlt Englisch.');
assert.match(publicLanding, /\['pl', 'Polski'\]/, 'Im öffentlichen Kontoformular fehlt Polnisch.');
assert.match(publicLanding, /onClick=\{\(\) => setLanguage\(code\)\}/, 'Die Sprachauswahl im öffentlichen Kontoformular muss die Academy-Sprache ändern.');
assert.match(visitorGate, /const \{ language, setLanguage, t \} = useLanguage\(\)/, 'Die Besucher-Vorschau muss auf die aktive Sprache reagieren.');
assert.match(visitorGate, /\['de', 'Deutsch'\]/, 'In der Besucher-Vorschau fehlt Deutsch.');
assert.match(visitorGate, /\['en', 'English'\]/, 'In der Besucher-Vorschau fehlt Englisch.');
assert.match(visitorGate, /\['pl', 'Polski'\]/, 'In der Besucher-Vorschau fehlt Polnisch.');
assert.match(visitorGate, /onClick=\{\(\) => setLanguage\(code\)\}/, 'Die Sprachauswahl der Besucher-Vorschau muss die Academy-Sprache ändern.');

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



// Render the actual visitor page through the language provider, both publicly
// and as an in-app preview. Authentication is isolated; no accounts are created.
const bundled = await build({ stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from './src/context/LanguageContext';
import { PublicLandingView } from './src/components/PublicLandingView';
export function render(preview) {
  return renderToStaticMarkup(<LanguageProvider><PublicLandingView onCancelToMemberArea={preview ? () => {} : undefined} onOpenLegal={() => {}} /></LanguageProvider>);
}
` }, bundle: true, write: false, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent', plugins: [{ name: 'isolated-visitor', setup(builder) {
  builder.onResolve({ filter: /context\/AuthContext$/ }, () => ({ path: 'auth', namespace: 'audit' }));
  builder.onLoad({ filter: /^auth$/, namespace: 'audit' }, () => ({ contents: `export const useAuth = () => ({error:null,clearError(){},register(){throw Error('Rendering must not register an account');},login(){throw Error('Rendering must not log in');}});`, loader: 'js' }));
  builder.onResolve({ filter: /gommar_logo[.]jpg$/ }, () => ({ path: 'logo', namespace: 'audit' }));
  builder.onLoad({ filter: /^logo$/, namespace: 'audit' }, () => ({ contents: 'export default "/audit-logo.jpg";', loader: 'js' }));
} }] });
const temp = mkdtempSync(join(tmpdir(), 'gommar-visitor-i18n-'));
const previousWindow = globalThis.window;
try {
  symlinkSync(join(process.cwd(), 'node_modules'), join(temp, 'node_modules'), 'dir');
  writeFileSync(join(temp, 'render.mjs'), bundled.outputFiles[0].text);
  const { render } = await import(pathToFileURL(join(temp, 'render.mjs')).href);
  const registrationTitles = { de: 'Kostenloses Konto erstellen', en: 'Create a free account', pl: 'Utwórz bezpłatne konto' };
  const escapeHtml = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const language of ['de', 'en', 'pl', 'de'] as const) {
    const storage = { getItem: (key: string) => key === 'gommar-language' ? language : null, setItem() {}, removeItem() {} };
    globalThis.window = { localStorage: storage, sessionStorage: storage, location: { search: '' } } as unknown as Window & typeof globalThis;
    for (const preview of [false, true]) {
      const html = render(preview);
      for (const [key, value] of Object.entries(visitorFunnelCopy[language])) {
        if (key === 'closePreview' && !preview) continue;
        assert.ok(html.includes(escapeHtml(value)), language + ': missing visitor text ' + key);
      }
      assert.equal(html.includes(escapeHtml(visitorFunnelCopy[language].closePreview)), preview, 'Close-preview action must only appear in the member preview.');
      assert.ok(html.includes(registrationTitles[language]), 'Registration must follow the same language.');
      assert.ok(html.includes('/media/gom-mar-einfuehrung-' + language + '.mp4'));
      assert.ok(html.includes('/media/gom-mar-einfuehrung-' + language + '.jpg'));
      assert.ok(html.includes('href="/terms/"') && html.includes('href="/withdrawal/"'), 'Legal destinations must stay intact.');
      for (const value of ['Faceless Content & Reels', 'Digital Products & E-Books', 'High-Ticket Affiliate Marketing', 'SaaS & KI Dienstleistungen']) {
        assert.ok(html.includes('value="' + escapeHtml(value) + '"'), 'Niche values must stay stable.');
      }
      if (language !== 'de') {
        for (const key of ['pageSubtitle', 'memberLogin', 'badge', 'headlineBefore', 'introAfter', 'masterclassDescription', 'companionDescription', 'privacy'] as const) {
          assert.ok(!html.includes(escapeHtml(visitorFunnelCopy.de[key])), language + ': German visitor text remains: ' + key);
        }
      }
    }
  }
} finally {
  if (previousWindow === undefined) delete (globalThis as any).window; else globalThis.window = previousWindow;
  rmSync(temp, { recursive: true, force: true });
}
console.log('Öffentliche Lokalisierung geprüft: Besucher-Funnel und Mitgliedervorschau vollständig in DE/EN/PL, Formular und Videosprache synchron, Nischenwerte und Rechtslinks unverändert.');

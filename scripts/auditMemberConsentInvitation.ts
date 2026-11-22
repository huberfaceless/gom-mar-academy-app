import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { MEMBER_EMAIL_CONSENT_URL, memberConsentDestination, memberConsentInvitationCopy } from '../src/utils/memberConsentInvitation';

const link = new URL(MEMBER_EMAIL_CONSENT_URL);
assert.equal(link.origin, 'https://academy.gomo-marketing.at');
assert.equal(link.search, '?emailConsent=1', 'Kein UID, Empfänger oder Bestätigungstoken im geteilten Link.');
assert.equal(link.hash, '#email-consent');
assert.equal(memberConsentDestination(link.search), 'profile');
for (const search of ['', '?emailConsent=0', '?emailConsent=true', '?uid=other', '?emailConsent=1evil']) {
  assert.equal(memberConsentDestination(search), 'dashboard');
}
for (const copy of Object.values(memberConsentInvitationCopy)) {
  assert.equal(copy.message.split(MEMBER_EMAIL_CONSENT_URL).length, 2);
  assert.ok(copy.copyLink && copy.copyMessage && copy.copyFailed && copy.description);
}
const modal = readFileSync('src/components/LeadDetailModal.tsx', 'utf8');
assert.match(modal, /lead\.id\.startsWith\('member_'\) && !canSendMarketingEmail && <MemberConsentInvitation/);
const app = readFileSync('src/App.tsx', 'utf8');
assert.match(app, /if \(!firebaseUser\) \{\s*setAuthModalState\(\{ isOpen: true, mode: 'login' \}\)/);
assert.match(app, /if \(!firebaseUser\.emailVerified \|\| resolvedMembershipUid !== firebaseUser\.uid\) return;\s*setAuthModalState[\s\S]*?setActiveView\('profile'\);\s*setConsentLinkHandled\(true\)/, 'Erst nach Anmeldung, Verifizierung und Rechteauflösung das eigene Profil laden.');
const profile = readFileSync('src/components/ProfileView.tsx', 'utf8');
assert.match(profile, /id="email-consent"/);
assert.match(profile, /getElementById\('email-consent'\)\?\.scrollIntoView/);
const invitation = readFileSync('src/components/MemberConsentInvitation.tsx', 'utf8');
assert.match(invitation, /await navigator\.clipboard\.writeText\(text\)/);
assert.match(invitation, /catch \{ setResult\('copyFailed'\)/);
assert.doesNotMatch(invitation, /fetch\(|saveEmailConsent|requestEmailConsent|sendEmail/, 'Kopieren und Rendern dürfen weder Einwilligungen noch E-Mails erzeugen.');

// Den echten Einladungskasten in allen Mitgliedssprachen rendern; kein Browser oder Versand.
const bundled = await build({ stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from './src/context/LanguageContext';
import { MemberConsentInvitation } from './src/components/MemberConsentInvitation';
export const render = () => renderToStaticMarkup(<LanguageProvider><MemberConsentInvitation /></LanguageProvider>);
` }, bundle: true, write: false, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent' });
const temp = mkdtempSync(join(tmpdir(), 'academy-consent-invitation-'));
const previousWindow = globalThis.window;
try {
  symlinkSync(join(process.cwd(), 'node_modules'), join(temp, 'node_modules'), 'dir');
  writeFileSync(join(temp, 'render.mjs'), bundled.outputFiles[0].text);
  const { render } = await import(pathToFileURL(join(temp, 'render.mjs')).href);
  for (const language of ['de', 'en', 'pl'] as const) {
    const storage = { getItem: (key: string) => key === 'gommar-language' ? language : null, setItem() {}, removeItem() {} };
    globalThis.window = { localStorage: storage, sessionStorage: storage, location: { search: '' } } as unknown as Window & typeof globalThis;
    const html = render();
    const copy = memberConsentInvitationCopy[language];
    for (const text of [copy.title, copy.copyLink, copy.copyMessage, copy.description, MEMBER_EMAIL_CONSENT_URL]) assert.ok(html.includes(text), `${language}: ${text}`);
    assert.match(html, /readonly=""/i);
    assert.match(html, /<textarea/);
  }
} finally {
  globalThis.window = previousWindow;
  rmSync(temp, { recursive: true, force: true });
}
console.log('Mitglieder-Einladung geprüft: persönlicher Link, freiwillige Entscheidung im eigenen Profil, Anmeldung vor Profilaufruf, DE/EN/PL und keinerlei Versand oder Einwilligung durch Kopieren.');

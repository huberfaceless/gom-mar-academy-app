import assert from 'node:assert/strict';
import { pinterestApiBase } from '../src/utils/pinterestEnvironment';
import React from 'react';
import { renderToStaticMarkup as renderMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { contentLanguageInstruction, recommendationLabel } from '../server/contentGenerationLanguage';
import { contentHubText } from '../src/i18n/contentHubCopy';
const renderToStaticMarkup = (element: React.ReactNode) => renderMarkup(React.createElement(LanguageProvider, null, element));
import { AffiliateLinkModal } from '../src/components/ContentEngine/AffiliateLinkModal';
import { ProjectSettingsModal } from '../src/components/ContentEngine/ProjectSettingsModal';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { build } from 'esbuild';
import { resolvePinterestTargetUrl, pinterestTrackingUrl, isEditablePinterestTarget } from '../src/utils/pinterestTargetUrl';
import { generatePinterestBulkUploadCsv } from '../src/utils/pinterestCanvasRenderer';

const selected = 'https://geldfluss.gomo-marketing.at/?ref=Stefan%2B50&value=one%20two#start';
const fallback = 'https://project.example/default';
assert.equal(resolvePinterestTargetUrl(selected, fallback), selected);
assert.equal(resolvePinterestTargetUrl(undefined, fallback), fallback);
for (const value of [null, '']) assert.equal(resolvePinterestTargetUrl(value, fallback), '');
for (const value of ['javascript:alert(1)', 'Blog-Beitrag: Vorschlag', {}, 'https://example.com/' + 'a'.repeat(2050)]) assert.throws(() => resolvePinterestTargetUrl(value));
const tracked = pinterestTrackingUrl(selected, 'Mein Projekt', 'solution');
assert.ok(tracked.startsWith(selected.split('#')[0] + '&'));
assert.ok(tracked.endsWith('#start'));
assert.equal(new URL(tracked).searchParams.get('ref'), 'Stefan+50');
assert.equal(pinterestTrackingUrl('', 'Test', 'solution'), '');
const existingTracking = pinterestTrackingUrl('https://example.com/?utm_source=custom#section', 'Test', 'solution');
assert.equal(new URL(existingTracking).searchParams.get('utm_source'), 'custom');
assert.equal(new URL(existingTracking).searchParams.getAll('utm_source').length, 1);
assert.ok(existingTracking.endsWith('#section'));
for (const status of ['ai_generated', 'DRAFT', 'approved', 'NEEDS_REVIEW']) assert.equal(isEditablePinterestTarget(status), true);
for (const status of ['scheduled', 'PUBLISHING', 'published', 'FAILED']) assert.equal(isEditablePinterestTarget(status), false);
const csv = generatePinterestBulkUploadCsv([{ id: 'pin', title: 'Test', targetUrl: selected, angle: 'solution' } as any], { name: 'Mein Projekt', coreTopics: [] } as any);
assert.ok(csv.includes('ref=Stefan%2B50&value=one%20two')); assert.ok(csv.includes('#start"'));

// Run actual generation and publication handlers with isolated AI/Pinterest adapters.
const server = readFileSync('server.ts', 'utf8');
let handler: (req: any, res: any) => Promise<void>;
let modelReply: any = { pins: Array.from({ length: 5 }, () => ({ title: 'Test', targetUrl: 'https://invented.example/' })) };
let lastPrompt = '';
let aiCalls = 0; let credentialCalls = 0; let platformCalls = 0; let sent: any;
const context = vm.createContext({ contentLanguageInstruction, recommendationLabel,
  app: { post: (_path: string, ...args: any[]) => { handler = args.at(-1); } }, requireVerifiedMember: [], requireProMember: () => {}, requireContentProjectAccess: () => {},
  resolvePinterestTargetUrl, pinterestApiBase, FIREBASE_PROJECT_ID: 'test',
  loadPinterestAccessToken: async () => { credentialCalls++; return 'isolated-test-token'; },
  ai: { models: { generateContent: async (request: any) => { aiCalls++; lastPrompt = request.contents; return { text: JSON.stringify(modelReply) }; } } },
  fetch: async (_url: string, request: RequestInit) => { platformCalls++; sent = JSON.parse(String(request.body)); return Response.json({ id: 'test-pin', title: 'Test' }); }, console,
});
const register = (start: string, end: string) => vm.runInContext(ts.transpileModule(server.slice(server.indexOf(start), server.indexOf(end, server.indexOf(start))), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
const invoke = async (body: any) => {
  let status = 200; let result: any;
  await handler({ body, firebaseUser: { sub: 'owner' } }, { locals: { pinterestEnvironment: 'production' }, status(value: number) { status = value; return this; }, json(value: any) { result = value; } });
  return { status, result };
};
register("  app.post('/api/content-engine/pins'", '  // 🚀 Content Engine: 4.');
for (const [value, expected] of [[selected, selected], [null, ''], ['', ''], [undefined, fallback]]) {
  const result = await invoke({ topic: 'Test', projectSettings: { defaultTargetUrl: fallback }, targetUrl: value });
  assert.equal(result.status, 200); assert.equal(result.result.pins.length, 5);
  for (const pin of result.result.pins) assert.equal(pin.targetUrl, expected);
}
const before = aiCalls;
assert.equal((await invoke({ topic: 'Test', targetUrl: 'javascript:alert(1)' })).status, 400); assert.equal(aiCalls, before);
register("  app.post('/api/pinterest/publish-pin'", '  // 📌 Pinterest AI Image Prompt');
const pinData = { title: 'Test', description: 'Test', imageBase64: 'data:image/png;base64,test' };
await invoke({ pinData: { ...pinData, targetUrl: selected }, boardId: 'board' }); assert.equal(sent.link, selected);
await invoke({ pinData: { ...pinData, targetUrl: '' }, boardId: 'board' }); assert.equal('link' in sent, false);
const credentialsBefore = credentialCalls; const platformBefore = platformCalls;
assert.equal((await invoke({ pinData: { ...pinData, targetUrl: 'javascript:alert(1)' }, boardId: 'board' })).status, 400);
assert.equal(credentialCalls, credentialsBefore); assert.equal(platformCalls, platformBefore);

// Project defaults, one-off overrides and explicit opt-out across video/brief handlers.
for (const [route, end] of [['brief', '  // 🚀 Content Engine: 2.'], ['youtube', '  // 🚀 Content Engine: 5.'], ['shorts', "  app.post('/api/instagram/oauth/start'"]]) {
  register("  app.post('/api/content-engine/" + route + "'", end);
  modelReply = route === 'shorts' ? { shorts: [{ description: 'Kurzvideo' }] } : { description: 'Inhalt' };
  for (const [value, expected] of [[undefined, fallback], [selected, selected], [null, ''], ['', '']]) {
    const response = await invoke({ topic: 'Test', projectSettings: { defaultTargetUrl: fallback }, targetUrl: value });
    assert.equal(response.status, 200);
    assert.ok(lastPrompt.includes('Ziel-URL: ' + expected + '\n'));
    if (expected !== fallback) assert.equal(lastPrompt.includes(fallback), false);
    if (route !== 'brief') {
      const description = route === 'youtube' ? response.result.video.description : response.result.shorts[0].description;
      assert.equal(description, (route === 'youtube' ? 'Inhalt' : 'Kurzvideo') + (expected ? '\n\n' + expected : ''));
    }
  }
  const callsBefore = aiCalls;
  assert.equal((await invoke({ topic: 'Test', targetUrl: 'javascript:alert(1)' })).status, 400);
  assert.equal(aiCalls, callsBefore);
}
const dialogHtml = renderToStaticMarkup(React.createElement(AffiliateLinkModal, { initialLink: selected, contentLabel: 'Pinterest-Pins', onConfirm() {}, onClose() {} }));
assert.ok(dialogHtml.includes('Mit Projekt-Link erstellen'));
assert.ok(dialogHtml.includes('Andere Adresse für diese Inhalte'));
assert.ok(dialogHtml.includes('checked=""'));
const settingsHtml = renderToStaticMarkup(React.createElement(ProjectSettingsModal, { isOpen: true, project: { defaultTargetUrl: selected, coreTopics: [] } as any, onSave() {}, onClose() {} }));
assert.ok(settingsHtml.includes('Projekt-Zieladresse für alle Inhalte'));
assert.ok(settingsHtml.includes('Briefing, Blog, Pinterest, YouTube und Shorts'));

// Actual browser service must ignore model-suggested destinations as well.
const bundled = await build({ entryPoints: ['src/services/aiContentService.ts'], bundle: true, write: false, platform: 'node', format: 'esm',
  plugins: [{ name: 'pin-fetch', setup(builder) {
    builder.onResolve({ filter: /authenticatedFetch$/ }, () => ({ path: 'fetch', namespace: 'pin-fetch' }));
    builder.onLoad({ filter: /.*/, namespace: 'pin-fetch' }, () => ({ contents: 'export const authenticatedFetch = (...args) => globalThis.__pinFetch(...args);' }));
  } }],
});
let expected = selected;
(globalThis as any).__pinFetch = async (_url: string, request: RequestInit) => {
  assert.equal(JSON.parse(String(request.body)).targetUrl, expected);
  return Response.json({ pins: [{ title: 'Test', targetUrl: 'https://invented.example/' }], video: { title: 'Test' }, shorts: [], brief: { mainKeyword: 'Test' } });
};
try {
  const { AIContentService } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
  const pins = await AIContentService.generatePinterestPins('Test', {}, { defaultTargetUrl: fallback }, selected);
  assert.equal(pins[0].targetUrl, selected);
  expected = ''; assert.equal((await AIContentService.generatePinterestPins('Test', {}, { defaultTargetUrl: fallback }, null))[0].targetUrl, '');
  for (const [value, target] of [[undefined, fallback], [selected, selected], [null, '']]) {
    expected = target as string;
    const settings = { defaultTargetUrl: fallback };
    await AIContentService.generateYouTubeScript('Test', {}, settings, value);
    await AIContentService.generateYouTubeShorts('Test', {}, settings, value);
    await AIContentService.generateContentBrief('Test', settings, undefined, value === null ? '' : value);
  }
} finally { delete (globalThis as any).__pinFetch; }
console.log('Pinterest-Zieladressen geprüft: bestätigter Link statt KI-Vorschlag, bewusster Verzicht, Tracking/CSV und Veröffentlichung ohne Ersatzadresse.');

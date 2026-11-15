import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { researchBeforeBrief, researchReport, classifyResearchError, CompetitorResearchError } from '../server/competitorResearch';
import { editorialStrategyPrompt, publicResearchUrl, groundedResearchUrl, resolveEditorialStrategy } from '../src/utils/editorialStrategy';
import { CompetitorResearchPanel } from '../src/components/ContentEngine/CompetitorResearchPanel';
import { ProjectSettingsModal } from '../src/components/ContentEngine/ProjectSettingsModal';
import { LanguageProvider } from '../src/context/LanguageContext';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';
import { contentLanguageInstruction, recommendationLabel } from '../server/contentGenerationLanguage';
import { campaignSourcePrompt } from '../src/utils/articleCampaign';
import { resolvePinterestTargetUrl } from '../src/utils/pinterestTargetUrl';

const settings = { ...createOnlineBusinessProject('research-audit'), editorialStrategy: { competitorResearch: true, boldHonest: true, competitorWebsites: ['https://anbieter-a.example.com/'] } };
assert.deepEqual(resolveEditorialStrategy(undefined), { competitorResearch: false, boldHonest: false, competitorWebsites: [] });
for (const value of ['http://example.com', 'https://user:password@example.com', 'https://localhost', 'https://127.0.0.1', 'https://[::1]', 'javascript:alert(1)']) assert.equal(publicResearchUrl(value), null);
assert.equal(publicResearchUrl('https://example.com/blog/'), 'https://example.com/blog/');
const text = 'Anbieter A spricht Anfänger an. Anbieter B betont kleine Schritte. Eigene Einordnung: konkrete Grenzen offen benennen.';
const fixture: any = { candidates: [{ content: { parts: [{ text }] }, groundingMetadata: {
  webSearchQueries: ['Online Geld verdienen ab 50 Anbieter'],
  searchEntryPoint: { renderedContent: '<style>a{color:green}</style><a href="https://www.google.com/search?q=test" target="_blank">Google Search</a>' },
  groundingChunks: [{ web: { uri: 'https://anbieter-a.example.com/', title: 'Anbieter A' } }, { web: { uri: 'https://anbieter-b.example.com/blog/', title: 'Anbieter B' } }],
  groundingSupports: [{ segment: { text: 'Anbieter A spricht Anfänger an.' }, groundingChunkIndices: [0] }, { segment: { text: 'Anbieter B betont kleine Schritte.' }, groundingChunkIndices: [1] }],
} }] };
const report = researchReport(fixture, 'Online Geld verdienen ab 50', settings);
assert.equal(report.sources.length, 2); assert.equal(report.projectId, settings.id); assert.equal(report.audience, settings.targetAudience);
assert.match(report.text, /\[1\]\(<https:\/\/anbieter-a/); assert.match(report.text, /\[2\]\(<https:\/\/anbieter-b/);
for (const key of ['groundingChunks', 'webSearchQueries', 'groundingSupports', 'searchEntryPoint']) {
  const invalid = structuredClone(fixture); delete invalid.candidates[0].groundingMetadata[key];
  assert.throws(() => researchReport(invalid, 'Topic', settings));
}
const unsafe = structuredClone(fixture); unsafe.candidates[0].groundingMetadata.groundingChunks[0].web.uri = 'javascript:alert(1)';
assert.throws(() => researchReport(unsafe, 'Topic', settings));
const instructions = editorialStrategyPrompt(settings, report);
assert.match(instructions, /HART, EHRLICH, GLASKLAR/); assert.match(instructions, /Keine erfundenen Studien/);
assert.match(instructions, /keine Faktenprüfung behaupten/); assert.match(instructions, /Mitbewerberbehauptungen sind keine Fachbelege/);
assert.throws(() => editorialStrategyPrompt(settings), /zuerst ein neues Inhaltsbriefing/);
assert.throws(() => editorialStrategyPrompt({ ...settings, id: 'other-project' }, report), /passt nicht mehr/);
assert.equal(editorialStrategyPrompt(undefined), '');
let paidCalls = 0;
const adapter: any = { models: { generateContent: async (request: any) => {
  paidCalls++; assert.deepEqual(request.config.tools, [{ googleSearch: {} }]);
  assert.equal(request.model, 'gemini-3.8-flash');
  assert.equal(request.config.thinkingConfig.thinkingLevel, 'LOW');
  assert.equal(request.config.thinkingConfig.thinkingBudget, undefined, 'Gemini 3 uses a thinking level, not the legacy numeric budget.');
  assert.equal(request.config.maxOutputTokens, 6144);
  assert.equal(request.config.responseMimeType, undefined, 'Grounded research is not forced into JSON.');
  assert.match(request.contents, new RegExp(settings.targetAudience.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  return fixture;
} } };
assert.equal(await researchBeforeBrief(adapter, 'Topic', { ...settings, editorialStrategy: undefined }), undefined);
assert.equal(paidCalls, 0);
assert.equal((await researchBeforeBrief(adapter, 'Topic', settings))?.sources.length, 2);
assert.equal(paidCalls, 1);
await assert.rejects(researchBeforeBrief({ models: { generateContent: async () => ({ text: 'Erfundene Recherche' }) } } as any, 'Topic', settings), /keine neuen Texte/);

// Run the real brief route: research must finish before drafting, and its report must survive the response.
const server = readFileSync('server.ts', 'utf8');
const ast = ts.createSourceFile('server.ts', server, ts.ScriptTarget.ES2022, true);
let route = '';
const visit = (node: ts.Node) => {
  if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression) && node.expression.expression.getText(ast) === 'app.post' && node.expression.arguments[0]?.getText(ast) === "'/api/content-engine/brief'") route = node.getText(ast);
  ts.forEachChild(node, visit);
}; visit(ast); assert.ok(route);
let handler: any, failResearch = false;
const order: string[] = [];
const context = vm.createContext({ Error, console: { error() {} }, researchBeforeBrief, editorialStrategyPrompt, contentLanguageInstruction, recommendationLabel, campaignSourcePrompt, resolvePinterestTargetUrl,
  requireVerifiedMember() {}, requireProMember() {}, requireContentProjectAccess() {},
  app: { post(_path: string, ...handlers: any[]) { handler = handlers.at(-1); } },
  ai: { models: { generateContent: async (request: any) => {
    if (request.config.tools) { order.push('research'); return failResearch ? { text: 'Keine Quellen' } : fixture; }
    order.push('brief'); assert.match(request.contents, /HART, EHRLICH, GLASKLAR/);
    if (order.includes('research')) assert.match(request.contents, /Anbieter A spricht Anfänger/);
    return { text: JSON.stringify({ mainKeyword: 'Online Geld verdienen', outline: [] }) };
  } } },
});
vm.runInContext(ts.transpileModule(route, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
let status = 200, result: any;
const response = { status(value: number) { status = value; return this; }, json(value: unknown) { result = value; } };
await handler({ body: { topic: 'Online Geld verdienen ab 50', projectSettings: settings } }, response);
assert.deepEqual(order, ['research', 'brief']); assert.equal(status, 200);
assert.equal(result.brief.competitorResearch.sources.length, 2);
assert.deepEqual(JSON.parse(JSON.stringify(result.brief)).competitorResearch.audience, settings.targetAudience);
order.length = 0; failResearch = true;
await handler({ body: { topic: 'Topic', projectSettings: settings } }, response);
assert.deepEqual(order, ['research']); assert.equal(status, 500); assert.match(result.error, /keine neuen Texte/);
for (const endpoint of ['blog', 'pins', 'youtube', 'shorts']) {
  const start = server.indexOf(`app.post('/api/content-engine/${endpoint}'`);
  assert.match(server.slice(start, server.indexOf('const response =', start)), /editorialStrategyPrompt\(projectSettings, brief\?\.competitorResearch\)/);
}
const panel = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(CompetitorResearchPanel, { report })));
assert.match(panel, /Anbieter A/); assert.match(panel, /sandbox="allow-popups allow-popups-to-escape-sandbox"/);
assert.doesNotMatch(panel, /allow-scripts|allow-same-origin|<script/);
assert.match(panel, /srcDoc=/i);
const form = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(ProjectSettingsModal, { isOpen: true, project: settings, onSave() {}, onClose() {} })));
assert.match(form, /Hart, ehrlich, glasklar/); assert.match(form, /zusätzliche API-Kosten/);
assert.match(form, /anbieter-a.example.com/);
console.log('Mitbewerber-Recherche: echte Suchmetadaten statt Modellbehauptung, Quellenzuordnung, Recherche vor Briefing, Stopp bei Fehlern, Projektscope, ehrliche Zuspitzung, Speicherung und isolierte Quellenanzeige geprüft.');

// Realistic failure variants must retain a precise, safe diagnostic rather than the old catch-all.
for (const [key, expected] of [['groundingChunks', 'RESEARCH_SOURCES'], ['webSearchQueries', 'RESEARCH_NO_SEARCH'], ['groundingSupports', 'RESEARCH_CITATIONS'], ['searchEntryPoint', 'RESEARCH_SUGGESTIONS']]) {
  const invalid = structuredClone(fixture); delete invalid.candidates[0].groundingMetadata[key];
  assert.throws(() => researchReport(invalid, 'Topic', settings), (error: unknown) => error instanceof CompetitorResearchError && error.code === expected);
}
const truncated = structuredClone(fixture); truncated.candidates[0].finishReason = 'MAX_TOKENS';
assert.throws(() => researchReport(truncated, 'Topic', settings), (error: unknown) => error instanceof CompetitorResearchError && error.code === 'RESEARCH_OUTPUT_LIMIT');
for (const [provider, expected] of [[{ status: 401 }, 'RESEARCH_AUTH'], [{ status: 403 }, 'RESEARCH_AUTH'], [{ status: 404 }, 'RESEARCH_MODEL'], [{ status: 429 }, 'RESEARCH_QUOTA'], [{ status: 400 }, 'RESEARCH_REQUEST'], [{ name: 'TimeoutError' }, 'RESEARCH_TIMEOUT'], [new TypeError('secret API_KEY=do-not-log'), 'RESEARCH_PROVIDER']] as const) {
  const error = classifyResearchError(provider); assert.equal(error.code, expected); assert.doesNotMatch(error.message, /do-not-log|API_KEY=/);
}
const longGoogleLink = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/' + 'x'.repeat(3500);
assert.equal(publicResearchUrl(longGoogleLink), null, 'Competitor input limits remain unchanged.');
assert.equal(groundedResearchUrl(longGoogleLink), longGoogleLink);
assert.equal(groundedResearchUrl('https://evil.example.com/' + 'x'.repeat(3500)), null);
assert.equal(groundedResearchUrl('https://vertexaisearch.cloud.google.com/other/' + 'x'.repeat(3500)), null);
assert.equal(groundedResearchUrl(longGoogleLink + 'x'.repeat(17000)), null);
const longSources = structuredClone(fixture); longSources.candidates[0].groundingMetadata.groundingChunks[0].web.uri = longGoogleLink;
const longReport = researchReport(longSources, 'Topic', settings);
assert.equal(longReport.sources[0].url, longGoogleLink);
const longPanel = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(CompetitorResearchPanel, { report: longReport })));
assert.ok(longPanel.includes('href="' + longGoogleLink + '"'), 'Valid signed Google sources must remain clickable.');
const logged: unknown[][] = [];
const originalWarn = console.warn;
try {
  console.warn = (...args: unknown[]) => { logged.push(args); };
  await assert.rejects(researchBeforeBrief({ models: { generateContent: async () => { throw Object.assign(new Error('SECRET_KEY=do-not-log private prompt'), { status: 429 }); } } } as any, 'private topic', settings), /RESEARCH_QUOTA/);
  await assert.rejects(researchBeforeBrief({ models: { generateContent: async () => truncated } } as any, 'private topic', settings), /RESEARCH_OUTPUT_LIMIT/);
} finally { console.warn = originalWarn; }
assert.match(JSON.stringify(logged), /RESEARCH_QUOTA/); assert.match(JSON.stringify(logged), /RESEARCH_OUTPUT_LIMIT/);
assert.doesNotMatch(JSON.stringify(logged), /SECRET_KEY|private topic|private prompt|do-not-log/);
console.log('Recherche-Diagnose: API-/Kontingent-/Timeoutfehler, abgeschnittene Antworten, aktuelle Flash-Modellkonfiguration, lange signierte Google-Quellen und geheimnisfreie Protokolle geprüft.');

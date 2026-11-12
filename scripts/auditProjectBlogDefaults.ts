import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { ProjectSettingsModal } from '../src/components/ContentEngine/ProjectSettingsModal';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { resolveProjectBlogDefaults, applyProjectBlogDefaults, type ProjectBlogDefaults } from '../src/utils/projectBlogDefaults';
import { inspectBlogSeo } from '../src/utils/blogSeoCheck';
import { createOnlineBusinessProject, loadAllProjectSettings, saveAllProjectSettings } from '../src/utils/contentStorage';
import { contentLanguageInstruction, recommendationLabel } from '../server/contentGenerationLanguage';
import { validateBlogAffiliateLink } from '../src/utils/blogAffiliateLink';
import { appendWordPressInternalLinks, removeUnverifiedInternalLinks } from '../server/wordpressInternalLinks';
import type { BlogArticle } from '../src/types/contentEngine';

const base = createOnlineBusinessProject('defaults-owner');
const settings = { ...base, id: 'proj_vital50_defaults_audit', name: 'Vital50', websiteUrl: 'https://vital50.gomo-marketing.at/' };
const defaults = resolveProjectBlogDefaults(settings);
assert.equal(defaults.verifiedSources, true);
assert.equal(resolveProjectBlogDefaults(base).verifiedSources, false);
const off = Object.fromEntries(Object.keys(defaults).map(key => [key, false])) as unknown as ProjectBlogDefaults;
saveAllProjectSettings([{ ...settings, blogDefaults: defaults }, { ...base, blogDefaults: off }], 'defaults-owner');
const reloaded = loadAllProjectSettings('defaults-owner', true);
assert.deepEqual(reloaded.find(p => p.id === settings.id)?.blogDefaults, defaults);
assert.deepEqual(resolveProjectBlogDefaults(reloaded.find(p => p.id === base.id)), off);
assert.ok(!loadAllProjectSettings('different-owner', true).some(p => p.id === settings.id), 'Settings remain account scoped');
const article: BlogArticle = { title: 'Bauchfett verlieren ab 50', seoTitle: 'Ein Ratgeber', metaDescription: 'Was im Alltag helfen kann.', focusKeyword: 'Anderer Modellvorschlag', answerSummary: 'Eine sachliche Kurzantwort.', contentMarkdown: '## Überblick\n\nVorhandener Artikeltext.', status: 'ai_generated', readingTimeMinutes: 1, wordCount: 8, wordpressSlug: 'old', referenceIds: ['at-stress'], wordpressImage: { id: 99, url: 'https://example.com/old.png', alt: 'Altes Bild' } };
const before = structuredClone(article);
const brief = { mainKeyword: 'Bauchfett verlieren ab 50', h1: article.title, outline: [] };
const prepared = applyProjectBlogDefaults(article, brief, settings);
assert.equal(prepared.focusKeyword, brief.mainKeyword);
const checked = inspectBlogSeo(prepared);
assert.ok(checked.title && checked.description && checked.heading);
assert.equal(prepared.wordpressSlug, 'bauchfett-verlieren-ab-50');
assert.equal(prepared.wordpressCategorySlug, 'abnehmen-ab-50');
assert.equal(prepared.wordpressImage, undefined, 'No image is inherited from another article or a model response');
assert.equal(prepared.referenceIds, undefined, 'Sources are selected only from the fresh checked report');
assert.deepEqual(article, before, 'Existing articles are not mutated');
const disabled = applyProjectBlogDefaults(article, brief, { ...settings, blogDefaults: off });
assert.equal(disabled.seoTitle, article.seoTitle);
assert.equal(disabled.contentMarkdown, article.contentMarkdown);
assert.equal(disabled.wordpressSlug, undefined);
assert.equal(disabled.answerSummary, '');
const next = applyProjectBlogDefaults({ ...article, title: 'Wasser trinken ab 50' }, { mainKeyword: 'Wasser trinken ab 50' }, settings);
assert.equal(next.focusKeyword, 'Wasser trinken ab 50'); assert.equal(next.wordpressCategorySlug, 'wasser-hydration');

// Execute the real generation route with isolated AI and public-link adapters.
const server = readFileSync('server.ts', 'utf8');
const ast = ts.createSourceFile('server.ts', server, ts.ScriptTarget.ES2022, true);
let handler: (req: any, res: any) => Promise<void>;
let sourceCalls = 0, internalCalls = 0;
let unavailable = false;
const context = vm.createContext({ resolveProjectBlogDefaults, applyProjectBlogDefaults, validateBlogAffiliateLink, contentLanguageInstruction, recommendationLabel, appendWordPressInternalLinks, removeUnverifiedInternalLinks,
  app: { post: (_path: string, ...args: any[]) => { handler = args.at(-1); } }, requireVerifiedMember: [], requireProMember: [], requireContentProjectAccess: [],
  suggestBlogReferenceReport: async () => { sourceCalls++; return { state: unavailable ? 'unavailable' : 'checked', sources: unavailable ? [] : [{ id: 'at-adipositas' }, { id: 'at-bewegung' }, { id: 'at-stress' }] }; },
  findWordPressInternalLinks: async () => { internalCalls++; return { state: 'checked', links: [], checkedAt: new Date().toISOString() }; },
  ai: { models: { async generateContent() { return { text: JSON.stringify(article) }; } } }, console,
});
const visit = (node: ts.Node) => {
  if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
    const call = node.expression;
    if (call.expression.getText(ast) === 'app.post' && ts.isStringLiteral(call.arguments[0]) && call.arguments[0].text === '/api/content-engine/blog') {
      vm.runInContext(ts.transpileModule(node.getText(ast), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context); return;
    }
  }
  ts.forEachChild(node, visit);
}; visit(ast);
const invoke = async (blogDefaults = defaults) => {
  let status = 200, data: any;
  await handler({ body: { topic: article.title, brief, projectSettings: { ...settings, blogDefaults }, affiliateLink: null } }, { status(code: number) { status = code; return this; }, json(value: any) { data = value; } });
  assert.equal(status, 200);
  return data.article;
};
const generated = await invoke();
assert.ok(inspectBlogSeo(generated).heading);
assert.deepEqual([...generated.referenceIds], ['at-adipositas', 'at-bewegung']);
assert.equal(generated.referenceCheck, 'checked');
assert.equal(generated.wordpressImage, undefined);
assert.equal(generated.wordpressSlug, 'bauchfett-verlieren-ab-50');
const counts = [sourceCalls, internalCalls];
const noAuto = await invoke(off);
assert.deepEqual([sourceCalls, internalCalls], counts, 'Disabled options make no public requests');
assert.equal(noAuto.referenceCheck, 'disabled'); assert.equal(noAuto.answerSummary, '');
unavailable = true;
assert.equal((await invoke()).referenceCheck, 'unavailable', 'Source outages are visible and do not block generation');
console.log('Projektvorgaben geprüft: Speicherung/Neuladen, Kontotrennung, explizites Deaktivieren, automatische Keyword-Prüfung, themenbezogene Slugs/Kategorien, neue Quellenprüfung und keine Bildübernahme.');

const modal = (blogDefaults: ProjectBlogDefaults) => renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(ProjectSettingsModal, { isOpen: true, project: { ...settings, blogDefaults }, onClose() {}, onSave() {} })));
assert.equal((modal(off).match(/checked=""/g) || []).length, 0, 'Saved disabled defaults are reflected by the form');
assert.equal((modal(defaults).match(/checked=""/g) || []).length, 5, 'The five automatic defaults are visibly enabled');

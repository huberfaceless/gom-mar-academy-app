import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup as renderMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { contentLanguageInstruction, recommendationLabel } from '../server/contentGenerationLanguage';
import { contentHubText } from '../src/i18n/contentHubCopy';
const renderToStaticMarkup = (element: React.ReactNode) => renderMarkup(React.createElement(LanguageProvider, null, element));
import { build } from 'esbuild';
import { BlogArticleContent } from '../src/components/ContentEngine/BlogArticleContent';
import { validateBlogAffiliateLink } from '../src/utils/blogAffiliateLink';

import { createBlogArticleProject } from '../src/utils/blogArticleProjects';
import { selectContentProjectScope } from '../src/utils/contentProjectSelection';
import { createOnlineBusinessProject, saveAllContentProjects, saveOrUpdateContentProject, loadAllContentProjects } from '../src/utils/contentStorage';
import { BlogArticleLibrary } from '../src/components/ContentEngine/BlogArticleLibrary';
import { AffiliateLinkModal } from '../src/components/ContentEngine/AffiliateLinkModal';
import type { BlogArticle, ContentBrief } from '../src/types/contentEngine';

const link = 'https://example.com/offer?ref=Stefan&campaign=50%2B#start';
assert.equal(validateBlogAffiliateLink(` ${link} `), link);
assert.equal(validateBlogAffiliateLink(null), null);
for (const invalid of [undefined, '', 'example.com', 'javascript:alert(1)', 'data:text/html,test', 'ftp://example.com',
  'https://user:password@example.com', 'https://example.com/<script>', 123]) assert.throws(() => validateBlogAffiliateLink(invalid));

const markdown = `### Brauche ich Vorwissen?\n\nEin **einfacher** Einstieg.\n\n---\n\n## Dein nächster Schritt\n\n**[Mehr erfahren](<${link}>)**\n\n- Erster Schritt\n- Zweiter Schritt`;
const html = renderToStaticMarkup(React.createElement(BlogArticleContent, { content: markdown }));
assert.match(html, /<h3>Brauche ich Vorwissen\?<\/h3>/);
assert.match(html, /<strong>einfacher<\/strong>/);
assert.match(html, /<hr\/>/); assert.match(html, /<ul>/);
assert.match(html, /href="https:\/\/example.com\/offer\?ref=Stefan&amp;campaign=50%2B#start"/);
assert.doesNotMatch(html, /###|\*\*|\]\(/);
const unsafe = renderToStaticMarkup(React.createElement(BlogArticleContent, { content: '<script>alert(1)</script>\n\n[Klick](javascript:alert%281%29)\n\n![Bild](https://tracker.example/pixel)' }));
assert.doesNotMatch(unsafe, /<script|href="javascript:|<img/);

// Execute the actual blog route with an isolated AI adapter; no paid generation.
const server = readFileSync('server.ts', 'utf8');
const route = server.slice(server.indexOf("  app.post('/api/content-engine/blog'"), server.indexOf('  // 🚀 Content Engine: 3.'));
let handler: (req: any, res: any) => Promise<void>;
let calls = 0; let prompt = '';
const context = vm.createContext({ contentLanguageInstruction, recommendationLabel,
  app: { post: (_path: string, ...args: any[]) => { handler = args.at(-1); } },
  requireVerifiedMember: [], requireProMember: () => {}, requireContentProjectAccess: () => {}, validateBlogAffiliateLink,
  ai: { models: { generateContent: async (request: any) => { calls++; prompt = request.contents; return { text: JSON.stringify({ title: 'Test', contentMarkdown: 'Ein hilfreicher Artikel.' }) }; } } }, console,
});
vm.runInContext(ts.transpileModule(route, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
const invoke = async (affiliateLink: unknown) => {
  let status = 200; let body: any;
  await handler({ body: { topic: 'Test', brief: { h1: 'Test', outline: [] }, projectSettings: { defaultTargetUrl: 'https://old.example/' }, affiliateLink } },
    { status(value: number) { status = value; return this; }, json(value: any) { body = value; } });
  return { status, body };
};
const result = await invoke(link);
assert.equal(result.status, 200);
assert.ok(result.body.article.contentMarkdown.endsWith(`[Zur Empfehlung](<${link}>)`));
assert.ok(prompt.includes(link)); assert.ok(!prompt.includes('https://old.example/'));
const noLink = await invoke(null); assert.equal(noLink.status, 200);
assert.equal(noLink.body.article.contentMarkdown, 'Ein hilfreicher Artikel.');
for (const value of [undefined, '', 'javascript:alert(1)']) {
  const before = calls; assert.equal((await invoke(value)).status, 400); assert.equal(calls, before);
}

const bundled = await build({ entryPoints: ['src/services/aiContentService.ts'], bundle: true, write: false, platform: 'node', format: 'esm',
  plugins: [{ name: 'blog-fetch', setup(builder) {
    builder.onResolve({ filter: /authenticatedFetch$/ }, () => ({ path: 'fetch', namespace: 'blog-fetch' }));
    builder.onLoad({ filter: /.*/, namespace: 'blog-fetch' }, () => ({ contents: 'export const authenticatedFetch = (...args) => globalThis.__blogFetch(...args);' }));
  } }],
});
(globalThis as any).__blogFetch = async (_url: string, request: RequestInit) => {
  assert.equal(JSON.parse(String(request.body)).affiliateLink, link);
  return Response.json({ article: { title: 'Test', contentMarkdown: 'Inhalt' } });
};
try {
  const { AIContentService } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
  await AIContentService.generateBlogArticle('Test', {}, {}, link);
} finally { delete (globalThis as any).__blogFetch; }
console.log('Blogartikel geprüft: formatierte Vorschau, sichere Links, URL-Parameter, explizite Linkwahl und API-Abweisung vor KI-Aufruf.');

// Multiple articles survive independent edits and a JSON persistence/reload cycle.
const owner = 'audit-multiple-blog-articles';
const settings = createOnlineBusinessProject(owner);
const brief = { h1: 'Ein Thema' } as ContentBrief;
const article = (title: string): BlogArticle => ({ title, metaDescription: '', contentMarkdown: title, wordCount: 1, readingTimeMinutes: 1, status: 'ai_generated' });
const first = createBlogArticleProject('Thema eins', settings, brief, article('Erster Artikel'), link);
const firstBefore = structuredClone(first);
const second = createBlogArticleProject('Thema zwei', settings, brief, article('Zweiter Artikel'), null);
const variant = createBlogArticleProject(first.topic, settings, brief, article('Weitere Fassung'), 'https://example.com/other', first);
assert.notEqual(first.id, second.id); assert.notEqual(first.id, variant.id); assert.notEqual(second.id, variant.id);
assert.deepEqual(first, firstBefore, 'Eine neue Fassung darf den vorhandenen Artikel nicht überschreiben.');
const emptyTopic = { ...first, blogArticle: undefined, pinterestPins: [{ id: 'old-pin' }] };
const completed = createBlogArticleProject(first.topic, settings, brief, article('Erster Entwurf'), link, emptyTopic as any);
assert.equal(completed.id, emptyTopic.id, 'Der erste Artikel darf das bereits angelegte Briefing ergänzen.');
assert.deepEqual(completed.pinterestPins, emptyTopic.pinterestPins);
assert.deepEqual(variant.pinterestPins, []); assert.deepEqual(variant.calendarItems, []);
saveAllContentProjects([], owner);
for (const value of [first, second, variant]) saveOrUpdateContentProject(value, owner);
let reloaded = loadAllContentProjects(owner); assert.equal(reloaded.length, 3);
assert.equal(reloaded.find(project => project.id === first.id)?.blogArticle?.title, 'Erster Artikel');
assert.equal(reloaded.find(project => project.id === first.id)?.affiliateLink, link);
saveOrUpdateContentProject({ ...second, blogArticle: article('Zweiter Artikel bearbeitet') }, owner);
reloaded = loadAllContentProjects(owner); assert.equal(reloaded.length, 3);
assert.equal(reloaded.find(project => project.id === first.id)?.blogArticle?.title, 'Erster Artikel');
assert.equal(reloaded.find(project => project.id === second.id)?.blogArticle?.title, 'Zweiter Artikel bearbeitet');
const foreign = createBlogArticleProject('Anderes Projekt', { ...settings, id: 'different-project' }, brief, article('Fremder Bereich'), null);
const scoped = selectContentProjectScope([...reloaded, foreign], settings.id, first.id);
assert.equal(scoped.scopedProjects.length, 3); assert.equal(scoped.activeProject?.id, first.id);
const library = renderToStaticMarkup(React.createElement(BlogArticleLibrary, {
  projects: scoped.scopedProjects, projectName: settings.name, selectedId: first.id, isGenerating: false, onSelect: () => {}, onCreate: () => {},
}));
for (const title of ['Erster Artikel', 'Zweiter Artikel bearbeitet', 'Weitere Fassung', 'Neuer Blogartikel']) assert.ok(library.includes(title));
assert.ok(!library.includes('Fremder Bereich'));
const newArticleDialog = renderToStaticMarkup(React.createElement(AffiliateLinkModal, { requestTopic: true, onConfirm: () => {}, onClose: () => {} }));
assert.ok(newArticleDialog.includes('Thema des neuen Artikels')); assert.ok(newArticleDialog.includes('Affiliate-/Empfehlungslink'));
saveAllContentProjects([], owner);
console.log('Mehrere Blogartikel geprüft: getrennte IDs, neue Fassung ohne Überschreiben, Bearbeiten, Neuladen, Projekttrennung und Artikelauswahl.');

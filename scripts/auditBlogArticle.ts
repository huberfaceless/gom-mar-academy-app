import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { BlogArticleContent } from '../src/components/ContentEngine/BlogArticleContent';
import { validateBlogAffiliateLink } from '../src/utils/blogAffiliateLink';

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
const context = vm.createContext({
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

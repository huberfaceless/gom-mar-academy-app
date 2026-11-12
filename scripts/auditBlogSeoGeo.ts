import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import JSZip from 'jszip';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { BlogSeoGeoPanel } from '../src/components/ContentEngine/BlogSeoGeoPanel';
import { contentLanguageInstruction } from '../server/contentGenerationLanguage';
import { normalizeSeoGeo, articleSeoDefaults, rankMathMeta, blogMarkdownWithSummary } from '../src/utils/blogSeoGeo';
import { wordpressSeoBridgeZip, wordpressSeoBridgeSource } from '../server/wordpressSeoBridge';
import { renderWordPressArticle } from '../server/wordpressDraftAdmin';
import type { BlogArticle } from '../src/types/contentEngine';

const article: BlogArticle = { title: 'Bauchfett ab 50', metaDescription: 'Eine hilfreiche Beschreibung.', contentMarkdown: '## Ausgangslage\n\nVorhandener Text mit einem [internen Link](https://vital50.gomo-marketing.at/hydration-ab-50/).', status: 'ai_generated', readingTimeMinutes: 2, wordCount: 40 };
const brief = { mainKeyword: 'Bauchfett ab 50' };
assert.equal(articleSeoDefaults(article, brief).seoTitle, article.title);
assert.equal(rankMathMeta(article, brief)?.rank_math_focus_keyword, brief.mainKeyword);
assert.equal(rankMathMeta({ ...article, focusKeyword: '' }, brief), null, 'Explicitly cleared keywords must not be replaced');
assert.equal(rankMathMeta({ ...article, metaDescription: '<b></b>' }, brief), null);
assert.throws(() => rankMathMeta({ ...article, seoTitle: 'x'.repeat(201) }, brief), /zu lang/);
const fields = normalizeSeoGeo({ seoTitle: '<b>SEO-Titel</b>', metaDescription: '  Beschreibung\nmit Zeilenumbruch ', focusKeyword: 'Keyword', answerSummary: 'Ein <script>unerwünschter</script> Text mit **Sternen**.' }, article, brief);
assert.equal(fields.seoTitle, 'SEO-Titel');
assert.equal(fields.metaDescription, 'Beschreibung mit Zeilenumbruch');
const withSummary = { ...article, ...fields };
const markdown = blogMarkdownWithSummary(withSummary, 'de');
assert.equal((markdown.match(/Das Wichtigste in Kürze/g) || []).length, 1);
assert.ok(markdown.endsWith(article.contentMarkdown), 'Original content and links remain unchanged');
assert.equal(withSummary.contentMarkdown, article.contentMarkdown, 'Summary is rendered separately, never repeatedly saved into the original');
assert.match(blogMarkdownWithSummary(withSummary, 'en'), /Key points at a glance/);
assert.match(blogMarkdownWithSummary(withSummary, 'pl'), /Najważniejsze informacje/);
assert.equal(blogMarkdownWithSummary(article), article.contentMarkdown);
const html = renderWordPressArticle(markdown);
assert.match(html, /<blockquote>/); assert.doesNotMatch(html, /<script>/);
const panel = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(BlogSeoGeoPanel, { article, mainKeyword: brief.mainKeyword, onChange() {}, async onPrepare() {} })));
assert.match(panel, /SEO-Titel/); assert.match(panel, /SEO und GEO vorbereiten/);
assert.match(panel, /value="Bauchfett ab 50"/);
const zipped = await JSZip.loadAsync(await wordpressSeoBridgeZip());
const source = await zipped.file('gommar-academy-seo/gommar-academy-seo.php')!.async('string');
assert.equal(source, wordpressSeoBridgeSource);
assert.match(source, /Plugin Name: GOM-MAR Academy SEO Bridge/);
assert.match(source, /current_user_can\( 'edit_post', \$post_id \)/);
assert.match(source, /'context' => array\( 'edit' \)/);
assert.doesNotMatch(source, /register_rest_route|update_post_meta|wp_head/);

// Execute the actual preparation route with an isolated AI adapter.
const server = readFileSync('server.ts', 'utf8');
const ast = ts.createSourceFile('server.ts', server, ts.ScriptTarget.ES2022, true);
let handler: (req: any, res: any) => Promise<void>;
let calls = 0; let request: any; let reply: unknown = fields;
const context = vm.createContext({ normalizeSeoGeo, contentLanguageInstruction,
  app: { post: (_path: string, ...middleware: any[]) => { handler = middleware.at(-1); } }, requireVerifiedMember: [], requireProMember: [], requireContentProjectAccess: [],
  ai: { models: { async generateContent(value: any) { calls++; request = value; return { text: typeof reply === 'string' ? reply : JSON.stringify(reply) }; } } },
});
const visit = (node: ts.Node) => {
  if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
    const call = node.expression;
    if (call.expression.getText(ast) === 'app.post' && ts.isStringLiteral(call.arguments[0]) && call.arguments[0].text === '/api/content-engine/seo-geo') {
      vm.runInContext(ts.transpileModule(node.getText(ast), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context); return;
    }
  }
  ts.forEachChild(node, visit);
};
visit(ast);
const invoke = async (input: any = article, language = 'de') => {
  let status = 200, body: any;
  await handler({ body: { article: input, brief, projectSettings: { language } } }, { status(value: number) { status = value; return this; }, json(value: any) { body = value; } });
  return { status, body };
};
assert.equal((await invoke()).body.fields.seoTitle, fields.seoTitle);
assert.equal(JSON.parse(request.contents).content, article.contentMarkdown, 'Preparation uses existing article, not an invented source');
assert.match(request.config.systemInstruction, /Keine neuen Fakten/);
for (const [language, expected] of [['en', 'English'], ['pl', 'Polish']]) { assert.equal((await invoke(article, language)).status, 200); assert.match(request.config.systemInstruction, new RegExp(expected)); }
const count = calls;
assert.equal((await invoke({ ...article, contentMarkdown: 'x'.repeat(200001) })).status, 400);
assert.equal(calls, count);
reply = '{}'; assert.equal((await invoke()).status, 502);
reply = 'not json'; assert.equal((await invoke()).status, 502);
assert.match(server, /seo-geo', requireVerifiedMember, requireProMember, requireContentProjectAccess/);
console.log('SEO/GEO geprüft: editierbare Daten, Fokuskeyword, sichtbare Zusammenfassung, unveränderter Artikel, DE/EN/PL, gültiges Plugin-ZIP und geschützte Vorbereitung aus dem vorhandenen Text.');

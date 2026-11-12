import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { findWordPressInternalLinks, appendWordPressInternalLinks, removeUnverifiedInternalLinks, enrichWordPressInternalLinks } from '../server/wordpressInternalLinks';
import { WORDPRESS_ORIGIN, renderWordPressArticle } from '../server/wordpressDraftAdmin';
import { blogLinkRel } from '../src/utils/blogLinkRel';

const settings = { websiteUrl: WORDPRESS_ORIGIN };
const post = (id: number, title: string, path = `article-${id}`) => ({ id, status: 'publish', title: { rendered: title }, link: `${WORDPRESS_ORIGIN}/${path}/`, content: { protected: false } });
const calls: string[] = [];
let published = [post(1, 'Bauchfett verlieren ab 50'), post(2, 'Kaloriendefizit ab 50'), post(3, 'Muskelabbau ab 50'), post(4, 'Stress und Gewohnheiten'), post(5, 'Origami für Anfänger')];
let fail = false, broken = '', redirected = '', malformed = false, protectedPost = false;
let pageCount = 1;
const request = (async (input: string, init: RequestInit) => {
  calls.push(input);
  assert.equal(new URL(input).origin, WORDPRESS_ORIGIN);
  assert.equal(init.redirect, 'error');
  assert.equal(init.headers, undefined, 'Public discovery must never transmit WordPress credentials');
  if (fail) throw new Error('offline');
  if (input.includes('/wp-json/')) {
    const page = Number(new URL(input).searchParams.get('page'));
    assert.equal(new URL(input).searchParams.get('status'), 'publish');
    return Response.json(malformed ? {} : page === 1 && pageCount > 1 ? Array.from({ length: 100 }, () => post(99, 'Unpassend')) : [...published, ...(protectedPost ? [{ ...post(88, 'Kalorien geheim'), content: { protected: true } }] : [])], { headers: { 'x-wp-totalpages': String(pageCount) } });
  }
  if (input === redirected) return new Response(null, { status: 301, headers: { location: 'https://evil.example/' } });
  return new Response(null, { status: input === broken ? 404 : 200, headers: { 'content-type': 'text/html; charset=UTF-8' } });
}) as typeof fetch;
const query = { title: 'Bauchfett verlieren ab 50 | Vital50', brief: { outline: [{ h2: 'Protein und Muskelmasse', h3s: [] }, { h2: 'Stress reduzieren', h3s: [] }] } };
const report = await findWordPressInternalLinks(settings, query, request);
assert.equal(report.state, 'checked');
assert.equal(report.links.length, 3);
assert.ok(report.links.some(l => l.url.endsWith('/article-2/')));
assert.ok(report.links.some(l => l.url.endsWith('/article-3/')));
assert.ok(report.links.some(l => l.url.endsWith('/article-4/')));
assert.ok(!report.links.some(l => l.url.endsWith('/article-1/') || l.url.endsWith('/article-5/')), 'No self-link or irrelevant target');
const enriched = appendWordPressInternalLinks('Text', report, 'de');
assert.match(enriched, /## Passende Artikel/);
assert.equal(appendWordPressInternalLinks(enriched, report, 'de'), enriched, 'Repeated clicks must not duplicate links');
assert.match(appendWordPressInternalLinks('Text', report, 'en'), /Related articles/);
assert.match(appendWordPressInternalLinks('Text', report, 'pl'), /Powiązane artykuły/);
assert.match(appendWordPressInternalLinks('', { ...report, links: [{ title: '[Test] **<script>', url: report.links[0].url }] }), /\\\[Test\\\]/);
const html = renderWordPressArticle(enriched);
assert.match(html, /href="https:\/\/vital50/);
assert.doesNotMatch(html, /sponsored/);
assert.match(blogLinkRel('https://affiliate.example/offer'), /sponsored/);

const safe = report.links[0].url;
const modelText = `[OK](<${safe}>)\n\n[Falsch](${WORDPRESS_ORIGIN}/erfunden/)\n\n[Relativ](/erfunden/)\n\n[Referenz][falsch]\n\n[falsch]: ${WORDPRESS_ORIGIN}/erfunden/\n\n<${WORDPRESS_ORIGIN}/falsch/>\n\n[Extern](https://example.com/source)\n\n\`[Code](/example)\``;
const cleaned = removeUnverifiedInternalLinks(modelText + `\n\n${WORDPRESS_ORIGIN}/bare-erfunden/`, report);
assert.doesNotMatch(renderWordPressArticle(cleaned), /href="[^"]*(erfunden|falsch)/);
assert.match(cleaned, /\[OK\]/);
assert.doesNotMatch(cleaned, /\[Falsch\]|\[Relativ\]|\[Referenz\]|\[falsch\]:|<https:\/\/vital50.*falsch/);
assert.match(cleaned, /\[Extern\]/);
assert.match(cleaned, /`\[Code\]\(\/example\)`/);

protectedPost = true;
broken = `${WORDPRESS_ORIGIN}/article-2/`; redirected = `${WORDPRESS_ORIGIN}/article-3/`;
const filtered = await findWordPressInternalLinks(settings, query, request);
assert.deepEqual(filtered.links.map(l => l.url), [`${WORDPRESS_ORIGIN}/article-4/`]);
assert.ok(!calls.some(url => url.includes('evil.example') || url.includes('article-88')));
pageCount = 2; broken = ''; redirected = '';
assert.equal((await findWordPressInternalLinks(settings, query, request)).links.length, 3);
assert.ok(calls.some(url => url.includes('page=2')));
pageCount = 1;
published.push({ ...post(6, 'Kalorien extern'), link: 'https://evil.example/' }, { ...post(7, 'Kalorien Entwurf'), status: 'draft' });
await findWordPressInternalLinks(settings, query, request);
assert.ok(!calls.some(url => url.includes('evil.example') || url.includes('article-7')));
assert.equal((await findWordPressInternalLinks(settings, { title: 'Basteln ab 50 für Anfänger' }, request)).links.length, 0, 'Audience words alone are not relevance');
const before = calls.length;
assert.equal((await findWordPressInternalLinks({ websiteUrl: 'https://other.example' }, query, request)).state, 'not-supported');
assert.equal(calls.length, before);
malformed = true;
assert.equal((await findWordPressInternalLinks(settings, query, request)).state, 'unavailable');
malformed = false; fail = true;
assert.equal((await findWordPressInternalLinks(settings, query, request)).state, 'unavailable');
assert.equal(appendWordPressInternalLinks('Text', { ...report, links: [], state: 'unavailable' }), 'Text');

// Run the actual route without AI, Firebase, or external mutations.
const source = readFileSync('server.ts', 'utf8');
const route = source.slice(source.indexOf("  app.post('/api/content-engine/internal-links'"), source.indexOf('  // 🚀 Content Engine: 2.'));
let handler: (req: any, res: any) => Promise<void>;
let enrichCalls = 0;
const context = vm.createContext({ app: { post: (_path: string, ...middleware: any[]) => { handler = middleware.at(-1); } }, requireVerifiedMember: [], requireProMember: [], requireContentProjectAccess: [],
  enrichWordPressInternalLinks: async (article: any) => { enrichCalls++; return { ...article, internalLinking: report }; },
});
vm.runInContext(ts.transpileModule(route, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
const invoke = async (article: any) => {
  let status = 200, body: any;
  await handler({ body: { article, projectSettings: settings, topic: 'Bauchfett', brief: {} } }, { status(value: number) { status = value; return this; }, json(value: any) { body = value; } });
  return { status, body };
};
assert.equal((await invoke({ title: 'Test', contentMarkdown: 'Text' })).status, 200);
const count = enrichCalls;
assert.equal((await invoke({ title: 'Test', contentMarkdown: 'x'.repeat(200001) })).status, 400);
assert.equal(enrichCalls, count);
assert.match(source, /internal-links', requireVerifiedMember, requireProMember, requireContentProjectAccess/);
assert.equal(typeof enrichWordPressInternalLinks, 'function');
console.log('Interne Links geprüft: echte veröffentlichte Ziele, Relevanz, Selbstlinks, Pagination, defekte/geschützte/fremde Ziele, keine Zugangsdaten, Markdown, keine Duplikate und geschützte API.');

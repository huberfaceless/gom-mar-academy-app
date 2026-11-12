import { VITAL50_CATEGORIES, mapVital50Categories, suggestVital50Category } from '../src/utils/vital50BlogCategories';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createWordPressDraftService, renderWordPressArticle, WORDPRESS_ORIGIN, type WordPressStore } from '../server/wordpressDraftAdmin';

const data = new Map<string, { value: Record<string, any>; version: string }>();
let revision = 0;
let content: any = { userId: 'owner', projectSettings: { id: 'vital50', websiteUrl: WORDPRESS_ORIGIN }, blogArticle: { title: 'Vital50-Test', wordpressCategorySlug: 'abnehmen-ab-50', contentMarkdown: '## Überschrift\n\n**Fett** und [Link](https://example.com/)\n\n<script>alert(1)</script>', metaDescription: 'Beschreibung' } };
const storage: WordPressStore = {
  async read(c, id) { return data.get(`${c}/${id}`) || null; },
  async write(c, id, value, version) {
    const key = `${c}/${id}`;
    assert.equal(data.get(key)?.version, version, 'Firestore compare-and-swap');
    data.set(key, { value: structuredClone(value), version: String(++revision) });
  },
  async remove(c, id) { data.delete(`${c}/${id}`); },
  async content() { return content; },
};
const calls: Array<{ url: string; init: RequestInit }> = [];
let wpStatus = 'draft';
let fail = false;
let categoryId = 103;
let categoryMissing = false;
let categoryFailure = false;
const request = (async (url: string, init: RequestInit) => {
  calls.push({ url, init });
  assert.ok(url.startsWith(`${WORDPRESS_ORIGIN}/wp-json/wp/v2/`));
  assert.equal(init.redirect, 'error', 'Credentials cannot follow redirects');
  assert.equal((init.headers as any).Authorization, `Basic ${Buffer.from('editor:applicationpassword').toString('base64')}`);
  if (url.includes('users/me')) return Response.json({ capabilities: { edit_posts: true } });
  if (url.includes('/categories?')) {
    if (categoryFailure) return new Response('', { status: 503 });
    return Response.json(categoryMissing ? [] : [...VITAL50_CATEGORIES.map((c, i) => ({ ...c, id: i === 0 ? categoryId : 200 + i })), { id: 4, slug: 'keto' }]);
  }
  if (init.method === 'POST') {
    if (fail) throw new Error('network timeout');
    return Response.json({ id: 42, status: 'draft', categories: JSON.parse(init.body as string).categories });
  }
  return Response.json({ id: 42, status: wpStatus });
}) as typeof fetch;
const service = createWordPressDraftService(storage, request, () => 'test-key-with-at-least-32-random-characters');
assert.equal((await service.status('owner', 'article')).connected, false);
await assert.rejects(service.connect('other', 'article', 'editor', 'password'), /nicht verfügbar/);
await service.connect('owner', 'article', 'editor', 'application password');
const storedConnection = [...data.values()][0].value;
assert.ok(storedConnection.encrypted);
assert.ok(!JSON.stringify(storedConnection).includes('applicationpassword'));
assert.ok(!JSON.stringify(await service.status('owner', 'article')).includes('encrypted'));
assert.equal((await service.categories('owner', 'article')).categories.length, 5);
await assert.rejects(service.categories('other', 'article'), /nicht verfügbar/);
for (const [title, slug] of [
  ['Bauchfett verlieren ab 50', 'abnehmen-ab-50'], ['Wasser richtig trinken', 'wasser-hydration'],
  ['Gesunde Schlafroutine', 'gesunde-gewohnheiten'], ['Mehr Energie gegen Müdigkeit', 'energie-vitalitaet'],
  ['Smoothie-Rezept zum Abnehmen', 'rezepte'],
]) assert.equal(suggestVital50Category(title), slug);
assert.equal(suggestVital50Category('Unbekannt'), null);
assert.equal(mapVital50Categories([{ id: 4, slug: 'keto' }, { id: -1, slug: 'rezepte' }]).length, 0);
assert.equal(mapVital50Categories([{ id: 8, slug: 'rezepte' }, { id: 9, slug: 'rezepte' }]).length, 0);
const assertNoWrite = async (pattern: RegExp) => {
  const writes = calls.filter(c => c.init.method === 'POST').length;
  const records = data.size;
  await assert.rejects(service.transfer('owner', 'validation'), pattern);
  assert.equal(calls.filter(c => c.init.method === 'POST').length, writes);
  assert.equal(data.size, records, 'Validation failures must not leave a transfer lock');
};
content.blogArticle.wordpressCategorySlug = 'keto';
await assertNoWrite(/fünf Vital50/);
content.blogArticle.wordpressCategorySlug = 'abnehmen-ab-50';
categoryMissing = true; await assertNoWrite(/fehlt in WordPress/); categoryMissing = false;
categoryFailure = true; await assertNoWrite(/HTTP 503/); categoryFailure = false;
let result = await service.transfer('owner', 'article');
assert.equal(result.postId, 42);
assert.equal(result.status, 'draft');
const created = calls.find(c => c.init.method === 'POST')!;
assert.equal(created.url, `${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts`);
assert.equal(JSON.parse(created.init.body as string).status, 'draft');
assert.deepEqual(JSON.parse(created.init.body as string).categories, [103]);
categoryId = 303;
assert.ok(JSON.parse(created.init.body as string).content.includes('<strong>Fett</strong>'));
assert.ok(!renderWordPressArticle(content.blogArticle.contentMarkdown).includes('<script>'));
await service.transfer('owner', 'article');
assert.equal(calls.at(-1)!.url, `${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts/42`, 'Further transfers update the same post');
assert.equal(JSON.parse(calls.at(-1)!.init.body as string).status, undefined, 'Updates must never unpublish an existing post');
assert.deepEqual(JSON.parse(calls.at(-1)!.init.body as string).categories, [303], 'Resolve current IDs on each transfer');
content.blogArticle.title = 'Bauchfett verlieren ab 50';
content.blogArticle.wordpressCategorySlug = 'rezepte';
await service.transfer('owner', 'article');
assert.deepEqual(JSON.parse(calls.at(-1)!.init.body as string).categories, [204], 'Manual choice wins over suggestion');
delete content.blogArticle.wordpressCategorySlug;
await service.transfer('owner', 'article');
assert.deepEqual(JSON.parse(calls.at(-1)!.init.body as string).categories, [303], 'Existing articles receive a suggestion');
wpStatus = 'publish';
const before = calls.filter(c => c.init.method === 'POST').length;
await assert.rejects(service.transfer('owner', 'article'), /kein Entwurf/);
assert.equal(calls.filter(c => c.init.method === 'POST').length, before);
wpStatus = 'draft';
const concurrent = await Promise.allSettled([service.transfer('owner', 'article'), service.transfer('owner', 'article')]);
assert.equal(concurrent.filter(r => r.status === 'fulfilled').length, 1, 'Only one concurrent transfer may write');
fail = true;
await assert.rejects(service.transfer('owner', 'uncertain'), /nicht eindeutig/);
const afterTimeout = calls.length;
await assert.rejects(service.transfer('owner', 'uncertain'), /kein weiterer Beitrag/);
assert.equal(calls.length, afterTimeout, 'Uncertain results must not cause duplicate posts');
content = { ...content, projectSettings: { ...content.projectSettings, websiteUrl: 'http://127.0.0.1' } };
await assert.rejects(service.status('owner', 'article'), /ausschließlich/);
await assert.rejects(service.status('owner', '../unsafe'), /Ungültiger/);
content.projectSettings.websiteUrl = WORDPRESS_ORIGIN;
await service.disconnect('owner', 'article');
assert.equal((await service.status('owner', 'article')).connected, false);
await assert.rejects(service.transfer('owner', 'article'), /zuerst WordPress verbinden/);
const server = readFileSync('server.ts', 'utf8');
assert.match(server, /app\.all\('\/api\/wordpress\/:contentId\/:action', requireVerifiedMember, requireAcademyAdmin/);
console.log('WordPress-Entwürfe geprüft: Verschlüsselung, Projektzuordnung, HTML, Entwurfsstatus, Aktualisierung, parallele Anfragen, unklare Ergebnisse und feste Zieladresse.');

const grid = [
  '+------------------------------------------------------------+',
  '| DER VITAL50 4-SÄULEN-STOFFWECHSEL-PLAN                       |',
  '+------------------------------------------------------------+',
  '| 1. Proteine & Blutzucker     | 2. Krafttraining              |',
  '| 25–35g Protein / Mahlzeit    | 2–3x / Woche                  |',
  '+-----------------------------+------------------------------+',
  '| 3. Stress- & Schlaf-Sync     | 4. NEAT (Alltagsbewegung)     |',
  '| Cortisolsenkung & 7–8h       | 7.000–10.000 Schritte täglich |',
  '+-----------------------------+------------------------------+',
].join('\n');
for (const source of [grid, `\`\`\`\n${grid}\n\`\`\``, `\`\`\`text\n${grid}\n\`\`\``]) {
  const rendered = renderWordPressArticle(`Einleitung\n\n${source}\n\n## Säule 1\n\nWeiterer Text.`);
  assert.match(rendered, /<table/);
  assert.equal((rendered.match(/<td /g) || []).length, 4);
  assert.match(rendered, /25–35g Protein \/ Mahlzeit/);
  assert.match(rendered, /7\.000–10\.000 Schritte täglich/);
  assert.match(rendered, /border:1px solid/);
  assert.doesNotMatch(rendered, /\+---|<pre>/);
  assert.match(rendered, /<h2>Säule 1<\/h2>/);
}
assert.match(renderWordPressArticle('```js\nconst a = 1;\n```'), /<pre>/, 'Real source code must stay source code');
assert.doesNotMatch(renderWordPressArticle('+---+\n| incomplete |'), /<table/);
assert.match(renderWordPressArticle('| Bereich | Wert |\n| --- | --- |\n| A | B |'), /<table/);
console.log('WordPress-Tabellen geprüft: bestehende Textgitter, umbrochene Zellen, echte Tabellen, sichtbare Zellrahmen und unveränderter Programmcode.');

await import('./auditWordPressInternalLinks');

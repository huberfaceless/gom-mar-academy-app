import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createWordPressDraftService, renderWordPressArticle, WORDPRESS_ORIGIN, type WordPressStore } from '../server/wordpressDraftAdmin';

const data = new Map<string, { value: Record<string, any>; version: string }>();
let revision = 0;
let content: any = { userId: 'owner', projectSettings: { id: 'vital50', websiteUrl: WORDPRESS_ORIGIN }, blogArticle: { title: 'Vital50-Test', contentMarkdown: '## Überschrift\n\n**Fett** und [Link](https://example.com/)\n\n<script>alert(1)</script>', metaDescription: 'Beschreibung' } };
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
const request = (async (url: string, init: RequestInit) => {
  calls.push({ url, init });
  assert.ok(url.startsWith(`${WORDPRESS_ORIGIN}/wp-json/wp/v2/`));
  assert.equal(init.redirect, 'error', 'Credentials cannot follow redirects');
  assert.equal((init.headers as any).Authorization, `Basic ${Buffer.from('editor:applicationpassword').toString('base64')}`);
  if (url.includes('users/me')) return Response.json({ capabilities: { edit_posts: true } });
  if (init.method === 'POST') {
    if (fail) throw new Error('network timeout');
    return Response.json({ id: 42, status: 'draft' });
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
let result = await service.transfer('owner', 'article');
assert.equal(result.postId, 42);
assert.equal(result.status, 'draft');
const created = calls.find(c => c.init.method === 'POST')!;
assert.equal(created.url, `${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts`);
assert.equal(JSON.parse(created.init.body as string).status, 'draft');
assert.ok(JSON.parse(created.init.body as string).content.includes('<strong>Fett</strong>'));
assert.ok(!renderWordPressArticle(content.blogArticle.contentMarkdown).includes('<script>'));
await service.transfer('owner', 'article');
assert.equal(calls.at(-1)!.url, `${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts/42`, 'Further transfers update the same post');
assert.equal(JSON.parse(calls.at(-1)!.init.body as string).status, undefined, 'Updates must never unpublish an existing post');
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

import assert from 'node:assert/strict';
import { createWordPressDraftService, type WordPressStore } from '../server/wordpressDraftAdmin';
import { automaticWordPressPublication, GOMO_WORDPRESS_ORIGIN as origin } from '../src/utils/wordpressSites';
const data = new Map<string, any>(); let revision = 0;
const article: any = { title: 'Online Geld verdienen ab 50', contentMarkdown: '## Ehrlicher Einstieg\n\nEin eigener Artikel.', seoTitle: 'Online Geld verdienen ab 50', metaDescription: 'Seriöser Einstieg ohne Versprechen.', focusKeyword: 'online Geld verdienen', answerSummary: 'Es braucht Zeit und Arbeit.', wordpressSlug: 'online-geld-verdienen' };
let site = origin;
const storage: WordPressStore = {
 async content() { return { userId: 'owner', projectSettings: { id: 'business', websiteUrl: site }, blogArticle: article }; },
 async read(c, id) { return data.get(c + id) || null; },
 async write(c, id, value, version) { assert.equal(data.get(c + id)?.version, version, 'Concurrent writes must not pass'); data.set(c + id, { value: structuredClone(value), version: String(++revision) }); },
 async remove(c, id) { data.delete(c + id); },
};
let configured = true, verified = true, timeout = false, canPublish = true;
const posts = new Map<number, any>(); const calls: any[] = []; let nextId = 40;
const request = (async (url: string, init: RequestInit) => {
 assert.ok(url.startsWith(origin + '/wp-json/wp/v2/')); assert.equal(init.redirect, 'error');
 calls.push({ url, method: init.method, body: init.body && JSON.parse(String(init.body)) });
 if (init.method === 'OPTIONS') return Response.json({ schema: { properties: { meta: { properties: configured ? Object.fromEntries(['rank_math_title', 'rank_math_description', 'rank_math_focus_keyword'].map(k => [k, { type: 'string' }])) : {} } } } });
 if (url.includes('users/me')) return Response.json({ capabilities: { edit_posts: true, publish_posts: canPublish } });
 if (url.includes('/categories?')) return Response.json([{ id: 35, slug: 'online-geld-verdienen-50', name: 'Online Geld verdienen 50+' }, { id: 1, slug: 'uncategorized', name: 'Uncategorized' }]);
 const id = Number(url.match(/posts\/(\d+)/)?.[1]);
 if (init.method === 'POST') {
  const body = JSON.parse(String(init.body)); const postId = id || ++nextId;
  const post = { ...posts.get(postId), ...body, id: postId, link: origin + '/online-geld-verdienen/' }; posts.set(postId, post);
  if (body.status === 'publish' && timeout) throw new Error('Lost publish response');
  return Response.json(post);
 }
 const post = posts.get(id); return Response.json({ ...post, meta: verified ? post?.meta : {} });
}) as typeof fetch;
const service = createWordPressDraftService(storage, request, () => 'key-of-at-least-thirty-two-characters', request, origin);
assert.equal(automaticWordPressPublication({ websiteUrl: origin }), true);
assert.equal(automaticWordPressPublication({ websiteUrl: origin, wordpressAutoPublish: false }), false);
assert.equal(automaticWordPressPublication({ websiteUrl: 'https://vital50.gomo-marketing.at' }), false);
await service.connect('owner', 'content', 'editor', 'password');
const writes = () => calls.filter(c => c.method === 'POST');
configured = false;
await assert.rejects(service.publish('owner', 'missing-seo'), /Rank-Math/); assert.equal(writes().length, 0);
configured = true; const summary = article.answerSummary; article.answerSummary = '';
await assert.rejects(service.publish('owner', 'missing-geo'), /GEO/); assert.equal(writes().length, 0); article.answerSummary = summary;
canPublish = false; await assert.rejects(service.publish('owner', 'permission'), /darf keine Beiträge veröffentlichen/); assert.equal(writes().length, 0); canPublish = true;
verified = false; await assert.rejects(service.publish('owner', 'unverified'), /nicht veröffentlicht/); assert.equal(posts.get(41).status, 'draft'); verified = true;
const before = calls.length; const result = await service.publish('owner', 'success'); assert.equal(result.status, 'publish');
const transaction = calls.slice(before); const publishIndex = transaction.findIndex(c => c.body?.status === 'publish');
assert.ok(transaction.slice(0, publishIndex).some(c => !c.method && c.url.includes('posts/42?context=edit')), 'SEO readback precedes public write');
assert.deepEqual(posts.get(42).categories, [35]); assert.match(posts.get(42).content, /Das Wichtigste in Kürze/);
const count = writes().length; await service.publish('owner', 'success'); assert.equal(writes().length, count, 'No duplicate or silent overwrite');
timeout = true; await assert.rejects(service.publish('owner', 'lost-response'), /nicht eindeutig/); assert.equal((await service.status('owner', 'lost-response')).draft?.postStatus, 'publish');
const uncertainCount = writes().length; await service.publish('owner', 'lost-response'); assert.equal(writes().length, uncertainCount);
timeout = false;
const concurrent = await Promise.allSettled([service.publish('owner', 'concurrent'), service.publish('owner', 'concurrent')]);
assert.equal(concurrent.filter(r => r.status === 'fulfilled').length, 1);
site = 'https://vital50.gomo-marketing.at'; const requestsBefore = calls.length;
await assert.rejects(service.status('owner', 'content'), /passt nicht/); assert.equal(calls.length, requestsBefore, 'Credentials never cross sites');
console.log('WordPress immediate publication: SEO/GEO preflight, permissions, category, readback, concurrency, reconciliation, isolation passed.');

const { findWordPressInternalLinks } = await import('../server/wordpressInternalLinks');
const linkReport = await findWordPressInternalLinks({ websiteUrl: origin }, { title: 'Affiliate Marketing Einstieg', topic: 'Affiliate Marketing' }, (async (url: string, init: RequestInit) => {
 assert.ok(url.startsWith(origin + '/')); assert.equal(init.headers, undefined, 'Public links never receive credentials');
 return init.method === 'HEAD' ? new Response('', { headers: { 'Content-Type': 'text/html' } }) : Response.json([{ id: 4, status: 'publish', link: origin + '/affiliate-grundlagen/', title: { rendered: 'Affiliate Marketing Grundlagen' }, content: { protected: false } }]);
}) as typeof fetch);
assert.equal(linkReport.origin, origin); assert.equal(linkReport.links[0].url, origin + '/affiliate-grundlagen/');
console.log('Interne Links der Hauptwebsite: geprüfte eigene Ziele ohne Zugangsdaten.');

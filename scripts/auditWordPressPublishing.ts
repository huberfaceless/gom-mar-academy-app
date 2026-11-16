import assert from 'node:assert/strict';
import { BLOGPOSTING_META_KEY, createWordPressDraftService, type WordPressStore } from '../server/wordpressDraftAdmin';
import { automaticWordPressPublication, GOMO_WORDPRESS_ORIGIN as origin } from '../src/utils/wordpressSites';
const data = new Map<string, any>(); let revision = 0;
const article: any = { title: 'Online Geld verdienen ab 50', contentMarkdown: '# Online Geld verdienen ab 50\n\n## Ehrlicher Einstieg\n\nEin eigener Artikel.', seoTitle: 'Online Geld verdienen ab 50', metaDescription: 'Seriöser Einstieg ohne Versprechen.', focusKeyword: 'online Geld verdienen', answerSummary: 'Es braucht Zeit und Arbeit.', wordpressSlug: 'online-geld-verdienen' };
let site = origin;
const storage: WordPressStore = {
 async content() { return { userId: 'owner', projectSettings: { id: 'business', websiteUrl: site }, blogArticle: article }; },
 async read(c, id) { return data.get(c + id) || null; },
 async write(c, id, value, version) { assert.equal(data.get(c + id)?.version, version, 'Concurrent writes must not pass'); data.set(c + id, { value: structuredClone(value), version: String(++revision) }); },
 async remove(c, id) { data.delete(c + id); },
};
let configured = true, verified = true, timeout = false, canPublish = true, rankMathOnly = false, keywordHidden = false, schemaInstalled = true, schemaHidden = false;
const seoKeys = ['_seopress_titles_title', '_seopress_titles_desc', '_seopress_analysis_target_kw'];
const posts = new Map<number, any>(); const calls: any[] = []; let nextId = 40;
const request = (async (url: string, init: RequestInit) => {
 assert.ok(url.startsWith(origin + '/wp-json/wp/v2/')); assert.equal(init.redirect, 'error');
 assert.equal((init.headers as any).Authorization, 'Basic ' + Buffer.from('editor:password').toString('base64'), 'SEOPress reads are authenticated, including draft meta');
 calls.push({ url, method: init.method, body: init.body && JSON.parse(String(init.body)) });
 if (init.method === 'OPTIONS') return Response.json({ schema: { properties: { meta: { properties: configured ? { ...(schemaInstalled ? { [BLOGPOSTING_META_KEY]: { type: 'boolean' } } : {}), ...Object.fromEntries((rankMathOnly ? ['rank_math_title', 'rank_math_description', 'rank_math_focus_keyword'] : seoKeys).map(k => [k, { type: 'string' }])) } : {} } } } });
 if (url.includes('users/me')) return Response.json({ capabilities: { edit_posts: true, publish_posts: canPublish } });
 if (url.includes('/categories?')) return Response.json([{ id: 35, slug: 'online-geld-verdienen-50', name: 'Online Geld verdienen 50+' }, { id: 1, slug: 'uncategorized', name: 'Uncategorized' }]);
 const id = Number(url.match(/posts\/(\d+)/)?.[1]);
 if (init.method === 'POST') {
  const body = JSON.parse(String(init.body)); const postId = id || ++nextId;
  const post = { ...posts.get(postId), ...body, ...(body.meta ? { meta: { ...posts.get(postId)?.meta, ...body.meta } } : {}), id: postId, link: origin + '/online-geld-verdienen/' }; posts.set(postId, post);
  if (body.status === 'publish' && timeout) throw new Error('Lost publish response');
  return Response.json(post);
 }
 assert.ok(url.endsWith('?context=edit'), 'SEOPress 10.4 draft metadata must be read in the authenticated edit context');
 const post = posts.get(id); const meta = verified ? { ...post?.meta } : {}; if (keywordHidden) delete meta._seopress_analysis_target_kw; if (schemaHidden) delete meta[BLOGPOSTING_META_KEY];
 return Response.json({ ...post, meta });
}) as typeof fetch;
const service = createWordPressDraftService(storage, request, () => 'key-of-at-least-thirty-two-characters', request, origin);
assert.equal(automaticWordPressPublication({ websiteUrl: origin }), true);
assert.equal(automaticWordPressPublication({ websiteUrl: origin, wordpressAutoPublish: false }), false);
assert.equal(automaticWordPressPublication({ websiteUrl: 'https://vital50.gomo-marketing.at' }), false);
await service.connect('owner', 'content', 'editor', 'password');
const writes = () => calls.filter(c => c.method === 'POST');
configured = false;
await assert.rejects(service.publish('owner', 'missing-seo'), /SEOPress/); assert.equal(writes().length, 0);
configured = true; rankMathOnly = true;
assert.equal((await service.seo('owner', 'content')).provider, 'seopress');
assert.equal((await service.seo('owner', 'content')).requiresBridge, false);
assert.equal((await service.seo('owner', 'content')).ready, false, 'Rank Math fields cannot satisfy the SEOPress preflight');
await assert.rejects(service.publish('owner', 'wrong-plugin'), /SEOPress/); assert.equal(writes().length, 0);
rankMathOnly = false; assert.equal((await service.seo('owner', 'content')).ready, true);
assert.equal((await service.status('owner', 'content')).seoProvider, 'seopress');
schemaInstalled = false; await assert.rejects(service.publish('owner', 'no-schema'), /1.1.0/); assert.equal(writes().length, 0); schemaInstalled = true;
assert.equal((await service.seo('owner', 'content')).schemaReady, true);
const summary = article.answerSummary; article.answerSummary = '';
await assert.rejects(service.publish('owner', 'missing-geo'), /GEO/); assert.equal(writes().length, 0); article.answerSummary = summary;
canPublish = false; await assert.rejects(service.publish('owner', 'permission'), /darf keine Beiträge veröffentlichen/); assert.equal(writes().length, 0); canPublish = true;
verified = false; await assert.rejects(service.publish('owner', 'unverified'), /nicht veröffentlicht/); assert.equal(posts.get(41).status, 'draft'); verified = true;
const before = calls.length; const result = await service.publish('owner', 'success'); assert.equal(result.status, 'publish');
const transaction = calls.slice(before); const publishIndex = transaction.findIndex(c => c.body?.status === 'publish');
assert.ok(transaction.slice(0, publishIndex).some(c => !c.method && c.url.includes('posts/42?context=edit')), 'SEO readback precedes public write');
assert.deepEqual(posts.get(42).meta, { _seopress_titles_title: article.seoTitle, _seopress_titles_desc: article.metaDescription, _seopress_analysis_target_kw: article.focusKeyword, [BLOGPOSTING_META_KEY]: true }, 'Native SEO fields plus the protected schema opt-in are written');
assert.deepEqual(posts.get(42).categories, [35]); assert.match(posts.get(42).content, /Das Wichtigste in Kürze/);
assert.doesNotMatch(posts.get(42).content, /<h1[ >]/i, 'Public export leaves the page H1 to the theme');
assert.doesNotMatch(posts.get(42).content, />Online Geld verdienen ab 50</, 'The article title is not repeated in the body');
assert.match(article.contentMarkdown, /^# Online Geld verdienen ab 50/, 'Saved Academy Markdown remains intact');
const count = writes().length; await service.publish('owner', 'success'); assert.equal(writes().length, count, 'No duplicate or silent overwrite');
timeout = true; await assert.rejects(service.publish('owner', 'lost-response'), /nicht eindeutig/); assert.equal((await service.status('owner', 'lost-response')).draft?.postStatus, 'publish');
const uncertainCount = writes().length; await service.publish('owner', 'lost-response'); assert.equal(writes().length, uncertainCount);
timeout = false;
const concurrent = await Promise.allSettled([service.publish('owner', 'concurrent'), service.publish('owner', 'concurrent')]);
assert.equal(concurrent.filter(r => r.status === 'fulfilled').length, 1);
// A transfer started before the provider change is reconciled with its original keys.
const legacyRecord = [...data.entries()].find(([, record]) => record.value.postId === 42 && record.value.state === 'confirmed')!;
legacyRecord[1].value.state = 'publishing'; delete legacyRecord[1].value.seoProvider; delete legacyRecord[1].value.expectedSchema;
legacyRecord[1].value.expectedMeta = { rank_math_title: 'Vorheriger Titel', rank_math_description: 'Vorherige Beschreibung', rank_math_focus_keyword: 'Vorheriges Keyword' };
posts.get(42).meta = { ...legacyRecord[1].value.expectedMeta };
const beforeLegacy = writes().length;
assert.equal((await service.status('owner', 'success')).draft?.postStatus, 'publish');
assert.equal((await service.status('owner', 'success')).draft?.seoProvider, 'rank-math');
assert.equal(writes().length, beforeLegacy, 'Legacy recovery reads the known post without writing or migration');
const schemaWritesBefore = writes().length;
assert.equal((await service.enableSchema('owner', 'success')).enabled, true);
assert.deepEqual(writes().at(-1).body, { meta: { [BLOGPOSTING_META_KEY]: true } }, 'Explicit schema activation sends no content, title, slug or SEO edits');
assert.equal(writes().length, schemaWritesBefore + 1);
await service.enableSchema('owner', 'success'); assert.equal(writes().length, schemaWritesBefore + 1, 'Schema activation is idempotent');
await assert.rejects(service.enableSchema('other-owner', 'success'), /nicht verfügbar/);
await assert.rejects(service.enableSchema('owner', 'unmapped'), /bestätigte/);
keywordHidden = true;
await assert.rejects(service.publish('owner', 'keyword-role-blocked'), /nicht veröffentlicht/);
assert.equal([...posts.values()].at(-1).status, 'draft', 'A hidden/blocked target keyword must stop publication');
keywordHidden = false;
schemaHidden = true; await assert.rejects(service.publish('owner', 'schema-stripped'), /BlogPosting/); assert.equal([...posts.values()].at(-1).status, 'draft'); schemaHidden = false;
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

// Render the actual connection panel with resolved status; no browser credentials.
const React = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
const { readFileSync } = await import('node:fs');
const { default: vm } = await import('node:vm');
const { default: ts } = await import('typescript');
const { contentHubText } = await import('../src/i18n/contentHubCopy');
const panelHtml = (provider: 'seopress' | 'rank-math', ready: boolean) => {
 let slot = 0;
 const fakeReact = { ...React, useEffect() {}, useState(initial: any) {
   const n = slot++;
   const value = n === 0 ? { connected: true, configured: true, siteUrl: provider === 'seopress' ? origin : 'https://vital50.gomo-marketing.at', seoProvider: provider, draft: null } : n === 7 ? false : n === 11 ? ready : initial;
   return [value, () => {}];
 } };
 const context = vm.createContext({ exports: {}, require(name: string) {
   if (name === 'react') return fakeReact;
   if (name.endsWith('wordpressSites')) return { GOMO_WORDPRESS_ORIGIN: origin };
   if (name.endsWith('useContentHubCopy')) return { useContentHubCopy: () => ({ hubText: (text: string) => contentHubText('de', text) }) };
   return {};
 } });
 vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/WordPressDraftPanel.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText, context);
 return renderToStaticMarkup(React.createElement((context.exports as any).WordPressDraftPanel, { contentId: 'article', onSave: async () => true }));
};
assert.match(panelHtml('seopress', true), /SEOPress-Übertragung ist eingerichtet/);
assert.match(panelHtml('seopress', false), /Rollensperren/);
assert.doesNotMatch(panelHtml('seopress', false), /Rank.?Math|SEO-Zusatzplugin herunterladen/);
assert.match(panelHtml('seopress', true), /Academy-Brücke 1.1.0 herunterladen/);
assert.match(panelHtml('rank-math', false), /SEO-Zusatzplugin herunterladen/);
console.log('SEO-Anzeige: Hauptwebsite erhält SEOPress-Hinweise ohne Rank-Math-Installation; Vital50 behält seine Einrichtung.');

await import('./auditWordPressSchema');

import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { LanguageProvider } from '../src/context/LanguageContext';
import { BlogSeoCheckPanel } from '../src/components/ContentEngine/BlogSeoCheckPanel';
import { inspectBlogSeo, suggestedBlogSlug, applyKeywordHeading, keywordDescriptionProposal } from '../src/utils/blogSeoCheck';
import { BLOG_REFERENCES, isWordPressImageUrl } from '../src/utils/blogReferences';
import { verifyBlogReferences, suggestBlogReferences } from '../server/blogReferences';
import { blogMarkdownWithSummary } from '../src/utils/blogSeoGeo';
import { createWordPressDraftService, decodeWordPressContentValue, renderWordPressArticle, WORDPRESS_ORIGIN, type WordPressStore } from '../server/wordpressDraftAdmin';
import type { BlogArticle } from '../src/types/contentEngine';

let article: BlogArticle = { title: 'Bauchfett verlieren ab 50', seoTitle: 'Warum Diäten scheitern', metaDescription: 'Eine Beschreibung.', focusKeyword: 'Bauchfett verlieren ab 50', wordpressCategorySlug: 'abnehmen-ab-50', contentMarkdown: '```\n## Überblick\n```\n\n## Überblick\n\nBauchfett verlieren ab 50: vorhandener Text.', status: 'ai_generated', wordCount: 12, readingTimeMinutes: 1 };
const before = structuredClone(article);
assert.equal(inspectBlogSeo(article).heading, false);
assert.equal(inspectBlogSeo(article).occurrences, 1);
const updated = applyKeywordHeading(article, article.focusKeyword!);
assert.ok(updated.contentMarkdown.startsWith('```\n## Überblick\n```'), 'Code blocks must not be edited');
assert.equal(inspectBlogSeo(updated).heading, true);
assert.deepEqual(article, before, 'Suggestions never mutate the original');
assert.equal(applyKeywordHeading(updated, article.focusKeyword!).contentMarkdown, updated.contentMarkdown, 'Applying twice is idempotent');
assert.ok(keywordDescriptionProposal(article.metaDescription, article.focusKeyword!).startsWith(article.focusKeyword!));
assert.ok(keywordDescriptionProposal('x '.repeat(200), article.focusKeyword!).length <= 160);
assert.equal(suggestedBlogSlug('Bauchfett verlieren ab 50'), 'bauchfett-verlieren-ab-50');
assert.equal(suggestedBlogSlug('Über Äpfel & Öl'), 'ueber-aepfel-oel');
assert.ok(suggestedBlogSlug('Ein sehr langes Thema '.repeat(20)).length <= 40);
assert.equal(isWordPressImageUrl('https://evil.example/image.png'), false);
assert.deepEqual(decodeWordPressContentValue({ mapValue: { fields: { id: { integerValue: '7' }, ids: { arrayValue: { values: [{ stringValue: 'at-adipositas' }] } } } } }), { id: 7, ids: ['at-adipositas'] });
let broken = false;
const publicCalls: string[] = [];
const publicRequest = (async (url: string, init: RequestInit) => {
  publicCalls.push(url); assert.ok(BLOG_REFERENCES.some(source => source.url === url));
  assert.equal(init.headers, undefined); assert.equal(init.redirect, 'error');
  return new Response(null, { status: broken ? 404 : 200, headers: { 'content-type': 'text/html' } });
}) as typeof fetch;
assert.ok((await suggestBlogReferences('Bauchfett verlieren', publicRequest)).length > 0);
assert.equal((await suggestBlogReferences('Instagram Affiliate Marketing', publicRequest)).length, 0);
await assert.rejects(verifyBlogReferences(['https://127.0.0.1'], publicRequest), /Quellen/);
broken = true; assert.equal((await verifyBlogReferences(['at-adipositas'], publicRequest)).length, 0); broken = false;
article.referenceIds = ['at-adipositas'];
article.wordpressImage = { id: 7, url: `${WORDPRESS_ORIGIN}/wp-content/uploads/test.png`, alt: 'Ein Teller mit Gemüse', featured: true };
const rendered = renderWordPressArticle(blogMarkdownWithSummary(article));
assert.match(rendered, /<img/); assert.match(rendered, /alt="Ein Teller mit Gemüse"/);
assert.match(rendered, /<h2>Quellen<\/h2>/);
assert.ok(!rendered.includes(`href="${BLOG_REFERENCES[0].url}" rel="noopener noreferrer sponsored"`));
assert.doesNotMatch(renderWordPressArticle('![Tracker](https://evil.example/tracker.png)'), /<img/);
const panel = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(BlogSeoCheckPanel, { article, contentId: 'article', onChange() {} })));
assert.match(panel, /SEO-Check vor der Übertragung/); assert.match(panel, /Mediathek laden/);

const records = new Map<string, any>(); let version = 0;
const content = { userId: 'owner', topic: article.title, projectSettings: { id: 'vital50', websiteUrl: WORDPRESS_ORIGIN }, blogArticle: article };
const storage: WordPressStore = {
  async content() { return content; }, async read(c, id) { return records.get(`${c}/${id}`) || null; },
  async write(c, id, value, expected) { assert.equal(records.get(`${c}/${id}`)?.version, expected); records.set(`${c}/${id}`, { value, version: String(++version) }); },
  async remove(c, id) { records.delete(`${c}/${id}`); },
};
const image = { id: 7, media_type: 'image', source_url: `${WORDPRESS_ORIGIN}/wp-content/uploads/test.png`, alt_text: '', title: { rendered: 'Testbild' } };
const writes: any[] = []; let featured = 0; let mediaForeign = false; let published = false; let uploadUnclear = false;
const request = (async (url: string, init: RequestInit) => {
  assert.ok(url.startsWith(WORDPRESS_ORIGIN)); assert.equal(init.redirect, 'error');
  if (url.includes('users/me')) return Response.json({ capabilities: { edit_posts: true } });
  if (url.includes('/media?')) return Response.json([image]);
  if (url.includes('/media/7')) return Response.json(mediaForeign ? { ...image, source_url: 'https://evil.example/file.svg' } : image);
  if (url.endsWith('/media')) { if (uploadUnclear) throw new Error('timeout'); assert.equal((init.headers as any)['Content-Type'], 'image/png'); return Response.json(image); }
  if (url.includes('/categories?')) return Response.json([{ id: 3, slug: 'abnehmen-ab-50' }]);
  if (init.method === 'POST') { const body = JSON.parse(String(init.body)); writes.push(body); featured = body.featured_media ?? featured; return Response.json({ id: 42, status: 'draft', categories: [3], featured_media: featured, slug: body.slug || 'existing' }); }
  return Response.json({ id: 42, status: published ? 'publish' : 'draft', featured_media: featured });
}) as typeof fetch;
const service = createWordPressDraftService(storage, request, () => 'a'.repeat(40), publicRequest);
await service.connect('owner', 'article', 'user', 'password');
assert.equal((await service.media('owner', 'article')).images[0].id, 7);
await assert.rejects(service.media('other', 'article'), /nicht verfügbar/);
await assert.rejects(service.uploadMedia('owner', 'article', 'data:image/svg+xml;base64,AAAA'), /PNG/);
await assert.rejects(service.uploadMedia('owner', 'article', 'data:image/png;base64,AAAA'), /Dateiinhalt/);
const png = `data:image/png;base64,${Buffer.from([137,80,78,71,13,10,26,10,0]).toString('base64')}`;
assert.equal((await service.uploadMedia('owner', 'article', png)).image.id, 7);
uploadUnclear = true; await assert.rejects(service.uploadMedia('owner', 'article', png), /Mediathek prüfen/); uploadUnclear = false;
article.wordpressSlug = 'bauchfett-verlieren-ab-50';
await service.transfer('owner', 'article');
assert.equal(writes.at(-1).slug, article.wordpressSlug); assert.equal(writes.at(-1).featured_media, 7);
assert.match(writes.at(-1).content, /<img/); assert.equal((await service.status('owner', 'article')).draft?.slug, article.wordpressSlug);
const count = writes.length;
article.wordpressImage.alt = ''; await assert.rejects(service.transfer('owner', 'article'), /Alt-Text/); assert.equal(writes.length, count); article.wordpressImage.alt = 'Gemüse';
mediaForeign = true; await assert.rejects(service.transfer('owner', 'article'), /Bild ist nicht verfügbar/); mediaForeign = false;
broken = true; await assert.rejects(service.transfer('owner', 'article'), /Quelle ist aktuell/); broken = false;
article.wordpressSlug = '../unsafe'; await assert.rejects(service.transfer('owner', 'article'), /URL-Slug/); article.wordpressSlug = '';
article.wordpressImage = null;
await service.transfer('owner', 'article');
assert.equal(writes.at(-1).featured_media, 0, 'Explicit removal clears only the featured image managed by the Academy');
assert.equal(writes.at(-1).slug, undefined, 'Empty slug preserves existing WordPress URL');
published = true; await assert.rejects(service.transfer('owner', 'article'), /kein Entwurf/);
console.log('SEO-Check geprüft: Keyword-Vorschläge, Codeblöcke, kurze Slugs, Bildauswahl/Upload/Alt-Text, Quellenprüfung, geschützte Übertragung und Erhalt veröffentlichter Beiträge.');

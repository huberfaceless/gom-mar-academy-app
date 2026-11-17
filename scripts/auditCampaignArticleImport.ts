import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { readCampaignWordPressArticles, readCampaignWordPressArticleUrl } from '../server/campaignWordPressArticles';
import { validateCampaignArticle } from '../src/utils/articleCampaign';

const origin = 'https://gomo-marketing.at';
const url = origin + '/2026/05/31/warum-viele-glauben-sie-muessten-vor-die-kamera/';
const text = '## Einstieg\n\n' + 'Hilfreiche konkrete Schritte für Einsteiger ab 50. '.repeat(10);
const post = { id: 371317, status: 'publish', link: url, title: { rendered: 'Ohne Kamera &amp; ohne Versprechen' }, content: { protected: false, rendered: '<p>' + text + '</p><script>ignore()</script>' } };
let calls: string[] = [];
const request: typeof fetch = async (input, init) => {
  const endpoint = new URL(String(input));
  calls.push(endpoint.href);
  assert.equal(endpoint.origin, origin);
  assert.equal(init?.redirect, 'error');
  assert.equal(init?.method, undefined);
  assert.equal(new Headers(init?.headers).has('authorization'), false);
  return new Response(JSON.stringify(endpoint.pathname.endsWith('/371317') ? post : [post]), { headers: { 'x-wp-totalpages': '2' } });
};
const result = await readCampaignWordPressArticleUrl(origin, url, request);
assert.equal(result.posts[0].title, 'Ohne Kamera & ohne Versprechen');
assert.equal(result.posts[0].contentMarkdown, text.trim());
assert.equal(result.posts[0].url, url);
assert.equal(calls.length, 2);
assert.match(calls[0], /slug=warum-viele-glauben/);
assert.doesNotMatch(result.posts[0].contentMarkdown!, /ignore|<script>/);
assert.equal((await readCampaignWordPressArticles(origin, undefined, 1, request)).hasMore, true);
const before = calls.length;
for (const bad of [
  'https://evil.example/post', 'http://gomo-marketing.at/post', 'https://gomo-marketing.at:8443/post',
  'https://user:pass@gomo-marketing.at/post', origin + '/', origin + '/wp-admin/post.php',
  origin + '/wp-json/wp/v2/users/', origin + '/category/online/', url + '?utm_source=test',
]) await assert.rejects(readCampaignWordPressArticleUrl(origin, bad, request));
await assert.rejects(readCampaignWordPressArticleUrl('https://evil.example', url, request));
assert.equal(calls.length, before, 'Rejected URLs must never cause a network request');
for (const bad of [
  { ...post, status: 'draft' }, { ...post, content: { protected: true } },
  { ...post, link: 'https://evil.example/post' }, { ...post, link: origin + '/other-date/warum-viele-glauben-sie-muessten-vor-die-kamera/' },
]) await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => new Response(JSON.stringify([bad]))));
await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => new Response('[]')));
await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => { throw new Error('redirect rejected'); }));
await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => new Response('x'.repeat(1_000_001))), /zu groß/);
await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => new Response('{}')), /Ungültige/);
let reads = 0;
await assert.rejects(readCampaignWordPressArticleUrl(origin, url, async () => new Response(JSON.stringify(++reads === 1 ? [post] : { ...post, link: origin + '/changed/' }))), /geändert/);
const vital = 'https://vital50.gomo-marketing.at';
const vitalResult = await readCampaignWordPressArticleUrl(vital, vital + '/wasser/', async (input) => {
  assert.equal(new URL(String(input)).origin, vital);
  const p = { ...post, link: vital + '/wasser/' };
  return new Response(JSON.stringify(String(input).includes('/371317?') ? p : [p]));
});
assert.equal(vitalResult.posts[0].url, vital + '/wasser/');

// Exercise the modal's real handlers with persistent hook state and mocked authenticated API.
const modal = readFileSync('src/components/ContentEngine/ArticleCampaignModal.tsx', 'utf8');
const body = modal.slice(modal.indexOf('  const { hubText }'), modal.indexOf('  return <div'));
let state: any[] = [], refs: any[] = [], stateIndex = 0, refIndex = 0, apiCalls = 0;
let started: any[] = [], invalid = false;
const source = validateCampaignArticle({ title: post.title.rendered, contentMarkdown: text, url });
const ctx = vm.createContext({
  settings: { websiteUrl: origin }, projects: [], wordpressAvailable: true, validateCampaignArticle,
  onClose: () => {}, onStart: async (value: unknown) => { started.push(value); },
  useContentHubCopy: () => ({ hubText: (s: string) => s }),
  useState: (initial: unknown) => {
    const i = stateIndex++;
    if (!(i in state)) state[i] = initial;
    return [state[i], (value: any) => { state[i] = typeof value === 'function' ? value(state[i]) : value; }];
  },
  useRef: (initial: unknown) => { const i = refIndex++; return refs[i] ||= { current: initial }; },
  useEffect: (fn: () => void) => fn(),
  authenticatedFetch: async (_path: string, init: RequestInit) => {
    apiCalls++;
    const request = JSON.parse(String(init.body));
    assert.equal(request.projectSettings.websiteUrl, origin);
    return { ok: !invalid, json: async () => invalid ? { error: 'Nicht erreichbar' } : { posts: [source], hasMore: false } };
  },
});
const compiled = ts.transpileModule('function render() {\n' + body + '\nreturn {mode, preview, reviewed, error, setUrl, setMode, setSelected, setReviewed, clearPreview, loadPreview, start}; }\nglobalThis.render = render;', { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
vm.runInContext(compiled, ctx);
const render = () => { stateIndex = 0; refIndex = 0; return ctx.render(); };
let ui = render();
assert.equal(ui.mode, 'url');
ui.setUrl(url); ui = render();
await ui.start(); assert.equal(started.length, 0);
await ui.loadPreview(); ui = render();
assert.equal(ui.preview.contentMarkdown, text.trim());
await ui.start(); assert.equal(started.length, 0, 'Preview must be reviewed');
ui.setReviewed(true); ui = render();
const readsBeforeStart = apiCalls;
await ui.start();
assert.equal(started.length, 1);
assert.equal(started[0].contentMarkdown, text.trim());
assert.equal(apiCalls, readsBeforeStart, 'Generation must use the reviewed snapshot');
ui.setUrl(origin + '/other/'); ui.clearPreview(); ui = render();
await ui.start(); assert.equal(started.length, 1, 'Changed URL invalidates the preview');
invalid = true; await ui.loadPreview(); ui = render();
assert.equal(ui.preview, null); assert.equal(ui.error, 'Nicht erreichbar');
assert.match(modal, /textarea readOnly rows=\{10\} value=\{preview.contentMarkdown\}/);
assert.doesNotMatch(modal, /dangerouslySetInnerHTML/);
const view = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
assert.match(view, /wordpressAvailable=\{isAdmin && !!wordpressSiteOrigin\(campaignSettings.websiteUrl\)\}/);
const server = readFileSync('server.ts', 'utf8');
const route = server.slice(server.indexOf("app.post('/api/content-engine/campaign-articles'"), server.indexOf("app.post('/api/content-engine/brief'"));
assert.match(route, /requireVerifiedMember, requireProMember, requireAcademyAdmin, requireContentProjectAccess/);
assert.match(route, /readCampaignWordPressArticleUrl/);
console.log('Kampagnenimport: beide Websites, exakte URL-Zuordnung, reine Lesezugriffe, Antwortlimit und geprüfter Text-Snapshot erfolgreich getestet.');

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createArticleCampaign, attachCampaignSource, campaignSourcePrompt, validateCampaignArticle } from '../src/utils/articleCampaign';
import { readCampaignWordPressArticles, campaignHtmlText } from '../server/campaignWordPressArticles';
import { DEFAULT_VITAL50_PROJECT } from '../src/utils/contentStorage';

const source = { title: 'Wasser im Alltag', contentMarkdown: '## Wasser trinken\n\n' + 'Ein Glas Wasser zum Frühstück und regelmäßige Trinkpausen. '.repeat(8).trim(), url: 'https://vital50.gomo-marketing.at/wasser-im-alltag/' };
const settings = structuredClone(DEFAULT_VITAL50_PROJECT);
const original = { ...source, metaDescription: 'Trinkpausen', wordCount: 90, readingTimeMinutes: 1, status: 'published' as const };
const before = JSON.stringify({ settings, original });
const first = createArticleCampaign(source, settings, original), second = createArticleCampaign(source, settings);
assert.notEqual(first.id, second.id);
assert.equal(first.projectSettings.defaultTargetUrl, source.url);
assert.equal(first.blogArticle?.contentMarkdown, source.contentMarkdown);
assert.equal(first.campaignSource?.url, source.url);
assert.deepEqual(first.calendarItems, []);
assert.deepEqual(first.pinterestPins, []);
assert.equal(JSON.stringify({ settings, original }), before);
assert.equal(second.blogArticle?.status, 'published');
for (const invalid of ['', 'javascript:alert(1)', 'https://user:pass@example.com/post', 'https://vital50.gomo-marketing.at/']) assert.throws(() => validateCampaignArticle({ ...source, url: invalid }));
assert.throws(() => validateCampaignArticle({ ...source, contentMarkdown: 'kurz' }));
assert.throws(() => validateCampaignArticle({ ...source, contentMarkdown: 'a'.repeat(60001) }));
assert.match(campaignSourcePrompt(source), /Trinkpausen/);
assert.equal(campaignSourcePrompt(undefined), '');
assert.match(campaignHtmlText('<h2>Wasser &amp; Alltag</h2><p>Ein Glas.</p><script>tracking()</script>'), /## Wasser & Alltag\n\nEin Glas\./);
assert.doesNotMatch(campaignHtmlText('<style>hide</style><iframe>embed</iframe><p>Sicher</p>'), /hide|embed|<p>/);
let requests = 0;
const wordpress: typeof fetch = async (input, init) => {
  requests++;
  assert.match(String(input), /^https:\/\/vital50\.gomo-marketing\.at\/wp-json\/wp\/v2\/posts/);
  assert.equal(init?.redirect, 'error'); assert.equal(init?.method, undefined);
  assert.equal(new Headers(init?.headers).has('Authorization'), false);
  const post = { id: 13, status: 'publish', title: { rendered: source.title }, link: source.url, content: { protected: false, rendered: `<p>${source.contentMarkdown}</p>` } };
  return new Response(JSON.stringify(String(input).includes('/13?') ? post : [post, { ...post, id: 14, status: 'draft' }, { ...post, id: 15, content: { protected: true } }, { ...post, id: 16, link: 'https://evil.example/article' }]), { headers: { 'x-wp-totalpages': '2' } });
};
const list = await readCampaignWordPressArticles(settings.websiteUrl, undefined, 1, wordpress);
assert.equal(list.posts.length, 1); assert.equal(list.hasMore, true);
assert.equal((await readCampaignWordPressArticles(settings.websiteUrl, 13, undefined, wordpress)).posts[0].contentMarkdown, source.contentMarkdown);
const requestCount = requests;
await assert.rejects(readCampaignWordPressArticles('https://evil.example', undefined, 1, wordpress));
await assert.rejects(readCampaignWordPressArticles(settings.websiteUrl, '../private', 1, wordpress));
await assert.rejects(readCampaignWordPressArticles(settings.websiteUrl, undefined, -1, wordpress));
assert.equal(requests, requestCount);
await assert.rejects(readCampaignWordPressArticles(settings.websiteUrl, 13, 1, async () => new Response(JSON.stringify({ id: 13, status: 'draft' }))));

// Exercise the real UI orchestration without Firebase or paid model requests.
const view = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
const start = view.slice(view.indexOf('  const startArticleCampaign ='), view.indexOf('  const handleGenerateAllInOneClick'));
let saved: any[] = [], notices: string[] = [], tabs: string[] = [], failVideo = false, modelCalls = 0;
const brief = { mainKeyword: 'Wasser trinken', secondaryKeywords: [], searchIntent: 'informational' as const, targetAudience: '50+', suggestedTitle: source.title, metaDescription: '', h1: source.title, outline: [], faqTopics: [], cta: 'Lesen', internalLinkingSuggestions: [] };
const context = vm.createContext({
  campaignSettings: settings, isGeneratingAll: false, createArticleCampaign, attachCampaignSource,
  hubText: (value: string) => value, setIsGeneratingAll: () => {}, setErrorMsg: (value: string) => { if (value) notices.push(value); }, setSaveNotice: (value: string) => { if (value) notices.push(value); }, setCampaignSettings: () => {}, setActiveTab: (value: string) => tabs.push(value),
  handleUpdateActiveProject: async (project: unknown) => { saved.push(structuredClone(project)); return true; },
  AIContentService: {
    generateBlogArticle: () => { throw new Error('The existing article must never be regenerated'); },
    generateContentBrief: async (...args: any[]) => { assert.deepEqual(args[5], source); modelCalls++; return { brief }; },
    generatePinterestPins: async (_topic: string, actualBrief: any, actualSettings: any, url: string) => {
      assert.deepEqual(actualBrief.sourceArticle, source); assert.equal(actualSettings.defaultTargetUrl, source.url); assert.equal(url, source.url); modelCalls++;
      return Array.from({ length: 5 }, (_, index) => ({ id: `pin_${index}`, targetUrl: url }));
    },
    generateYouTubeScript: async (_topic: string, actualBrief: any, _settings: any, url: string) => { assert.equal(url, source.url); assert.deepEqual(actualBrief.sourceArticle, source); modelCalls++; if (failVideo) throw new Error('temporary failure'); return { title: 'Video' }; },
    generateYouTubeShorts: async () => { modelCalls++; return [{ id: '1' }, { id: '2' }, { id: '3' }]; },
  },
});
vm.runInContext(ts.transpileModule(start + '\nglobalThis.run = startArticleCampaign;', { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
await context.run(source, original);
assert.equal(modelCalls, 4); assert.equal(saved.length, 3);
assert.equal(saved[2].pinterestPins.length, 5); assert.equal(saved[2].youtubeShorts.length, 3);
assert.equal(tabs.at(-1), 'calendar'); assert.match(notices.at(-1)!, /Kampagne erstellt/);
assert.equal(saved[2].blogArticle.contentMarkdown, source.contentMarkdown);
failVideo = true; saved = []; notices = [];
await context.run(source, original);
assert.equal(saved[2].pinterestPins.length, 5); assert.equal(saved[2].youtubeVideo, undefined);
assert.match(notices.at(-1)!, /teilweise erstellt und gespeichert/);
const server = readFileSync('server.ts', 'utf8');
for (const route of ['brief', 'pins', 'youtube', 'shorts']) {
  const handler = server.slice(server.indexOf(`app.post('/api/content-engine/${route}'`));
  assert.match(handler.slice(0, handler.indexOf('const response =') > 0 ? handler.indexOf('const response =') : 5000), /campaignSourcePrompt\(/);
}
assert.match(server, /campaign-articles', requireVerifiedMember, requireProMember, requireAcademyAdmin, requireContentProjectAccess/);
assert.match(readFileSync('src/components/ContentEngine/ContentCalendarTab.tsx', 'utf8'), /project.blogArticle && !project.campaignSource/);
console.log('Artikelkampagnen: Quelle, getrennte Speicherung, konkrete Ziel-URL, WordPress-Lesezugriff und Teilfehler erfolgreich geprüft.');

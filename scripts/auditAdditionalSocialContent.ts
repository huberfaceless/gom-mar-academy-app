import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { appendSocialPins, appendYouTubeContent, instagramPostsFor, youtubeVideosFor, updateYouTubeVideo, assertGenerationSource, briefForSocial } from '../src/utils/additionalSocialContent';
import { matchesCurrentYouTubeUpload } from '../src/utils/publishingTarget';
import type { CentralContentProject, PinterestPin, YouTubeVideoData, PublishingJob } from '../src/types/contentEngine';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';

const pin = { id: 'existing-pin', title: 'Vorhandener Pin', angle: 'solution', angleLabel: 'Lösung', description: 'Gespeicherter Text', keywords: [], targetUrl: 'https://gomo-marketing.at/article/', status: 'published', scheduledDate: '2026-12-01T09:00', publishedPinId: 'published', templateStyle: 'vital50_clean', imagePrompt: 'Bild' } as PinterestPin;
const video: YouTubeVideoData = { title: 'Vorhandenes Video', description: 'Original', keywords: [], script: { hook: '', intro: '', mainBody: [], cta: '', outro: '' }, chapters: [], thumbnailConcept: { headline: '', visualDescription: '', imagePrompt: '' }, status: 'published', videoId: 'old-upload', videoUrl: 'https://youtu.be/old-upload', scheduledDate: '2026-12-02T09:00' };
const project: CentralContentProject = { id: 'saved', topic: 'Thema', projectSettings: createOnlineBusinessProject('user'), createdAt: '2026-11-22', pinterestPins: [pin], youtubeVideo: video, youtubeShorts: [{ id: 'old-short', shortNumber: 1, title: 'Alt', hook: '', scriptText: '', description: '', cta: '', status: 'published' }], calendarItems: [{ id: 'old-calendar', channel: 'pinterest', title: 'Termin', status: 'published', scheduledDate: '2026-12-01T09:00' }], blogArticle: { title: 'Artikel', metaDescription: 'Beschreibung', contentMarkdown: 'Echter Artikelinhalt. '.repeat(20), status: 'published', publishedUrl: 'https://gomo-marketing.at/article/', wordCount: 100, readingTimeMinutes: 1 }, contentBrief: { mainKeyword: 'Thema' } as any };
const original = structuredClone(project);
const morePins = appendSocialPins(project, 'pinterest', [pin, pin], 'pins');
assert.equal(morePins.pinterestPins.length, 3);
assert.deepEqual(morePins.pinterestPins[0], pin);
assert.equal(instagramPostsFor(morePins).length, 1, 'Zusätzliche Pinterest-Pins erzeugen keine zusätzlichen Instagram-Beiträge.');
const moreInstagram = appendSocialPins(morePins, 'instagram', [pin, pin, pin], 'instagram');
assert.equal(instagramPostsFor(moreInstagram).length, 4);
assert.deepEqual(moreInstagram.pinterestPins, morePins.pinterestPins);
assert.deepEqual(instagramPostsFor(moreInstagram)[0], pin);
assert.equal(new Set([...moreInstagram.pinterestPins, ...instagramPostsFor(moreInstagram).slice(1)].map(p => p.id)).size, 6, 'Neue IDs trotz identischer Modell-IDs.');
const addedVideo = appendYouTubeContent(moreInstagram, video, project.youtubeShorts!, 'video');
assert.equal(youtubeVideosFor(addedVideo).length, 2);
assert.deepEqual(addedVideo.youtubeVideo, video, 'Bestehenden Upload und Termin nicht ersetzen.');
assert.equal(addedVideo.youtubeAdditionalVideos![0].video.videoId, undefined);
assert.equal(addedVideo.youtubeAdditionalVideos![0].video.status, 'ai_generated');
assert.equal(addedVideo.youtubeShorts!.length, 2);
assert.equal(addedVideo.youtubeShorts![1].shortNumber, 2);
assert.notEqual(addedVideo.youtubeShorts![1].id, 'old-short');
assert.deepEqual(addedVideo.calendarItems, original.calendarItems, 'Es wird kein Auftrag erzeugt oder umgeplant.');
assert.deepEqual(addedVideo.blogArticle, original.blogArticle);
assert.deepEqual(project, original, 'Eingangsdaten nicht mutieren.');
const roundtrip = JSON.parse(JSON.stringify(addedVideo));
assert.equal(instagramPostsFor(roundtrip).length, 4);
assert.equal(youtubeVideosFor(roundtrip).length, 2);
const edited = updateYouTubeVideo(addedVideo, 'yt_video_video', { ...addedVideo.youtubeAdditionalVideos![0].video, title: 'Zweite Variante', videoId: 'new-upload', status: 'approved' });
assert.equal(edited.youtubeVideo!.title, video.title);
assert.equal(edited.youtubeAdditionalVideos![0].video.title, 'Zweite Variante');
assert.ok(matchesCurrentYouTubeUpload({ platform: 'YOUTUBE', contentId: 'yt_video_video', payload: { metadata: { videoId: 'new-upload' } } } as unknown as PublishingJob, edited));
assert.ok(!matchesCurrentYouTubeUpload({ platform: 'YOUTUBE', contentId: 'yt_video_main', payload: { metadata: { videoId: 'new-upload' } } } as unknown as PublishingJob, edited));
assert.ok(!matchesCurrentYouTubeUpload({ platform: 'YOUTUBE', contentId: 'yt_video_video', payload: { metadata: { videoId: 'old-upload' } } } as unknown as PublishingJob, edited));
assertGenerationSource({ ...project, pinterestPins: morePins.pinterestPins }, project);
for (const stale of [null, { ...project, id: 'other' }, { ...project, topic: 'Anderes Thema' }, { ...project, blogArticle: { ...project.blogArticle!, contentMarkdown: 'Geändert' } }]) assert.throws(() => assertGenerationSource(stale, project), /geändert/);
assert.equal(briefForSocial(project).sourceArticle!.contentMarkdown, project.blogArticle!.contentMarkdown.trim());
const first = appendSocialPins({ ...project, pinterestPins: [], instagramPosts: undefined }, 'pinterest', [pin], 'first');
assert.equal(instagramPostsFor(first).length, 1, 'Erstes Set bleibt mit älteren Abläufen kompatibel.');
assert.throws(() => appendSocialPins(project, 'pinterest', []), /keine neuen/);

// Echte Kalender- und Eingabekomponenten rendern; keine Netzwerkaufrufe oder Veröffentlichung.
const bundled = await build({ stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from './src/context/LanguageContext';
import { ContentCalendarTab } from './src/components/ContentEngine/ContentCalendarTab';
import { YouTubeCollectionTab } from './src/components/ContentEngine/YouTubeCollectionTab';
import { PinterestPinsTab } from './src/components/ContentEngine/PinterestPinsTab';
import { InstagramPostsTab } from './src/components/ContentEngine/InstagramPostsTab';
const noop=()=>{};
export const render=(project)=>renderToStaticMarkup(<LanguageProvider><>
<ContentCalendarTab project={project} onUpdateProject={noop}/>
<YouTubeCollectionTab project={project} onChange={noop} onGenerate={noop} busy={false} onGoToCalendar={noop}/>
<PinterestPinsTab pins={[]} topic={project.topic} projectSettings={project.projectSettings} onChange={noop} onOpenInstagram={noop} onGenerate={noop}/>
<InstagramPostsTab pins={[]} topic={project.topic} projectSettings={project.projectSettings} onChange={noop} onGenerate={noop} onGenerateYouTube={noop} isGeneratingYouTube={false}/>
</></LanguageProvider>);
` }, bundle: true, write: false, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent', plugins: [{ name: 'isolated-auth', setup(builder) {
  builder.onResolve({ filter: /context\/AuthContext$/ }, () => ({ path: 'auth', namespace: 'audit' }));
  builder.onLoad({ filter: /.*/, namespace: 'audit' }, () => ({ contents: 'export const useAuth=()=>({user:null});', loader: 'js' }));
} }] });
const temporary = mkdtempSync(join(tmpdir(), 'academy-social-'));
const previousWindow = globalThis.window;
try {
  symlinkSync(join(process.cwd(), 'node_modules'), join(temporary, 'node_modules'), 'dir');
  writeFileSync(join(temporary, 'render.mjs'), bundled.outputFiles[0].text);
  const { render } = await import(pathToFileURL(join(temporary, 'render.mjs')).href);
  for (const language of ['de', 'en'] as const) {
    const storage = { getItem: (key: string) => key === 'gommar-language' ? language : null, setItem() {}, removeItem() {} };
    globalThis.window = { localStorage: storage, sessionStorage: storage, location: { search: '' } } as unknown as Window & typeof globalThis;
    const html = render(edited);
    assert.ok(html.includes('Zweite Variante') && html.includes(video.title));
    assert.ok(html.includes('YouTube Video: Zweite Variante'), 'Zusätzliches Video erhält einen eigenen Kalender-Eintrag.');
    assert.ok(html.includes(language === 'de' ? 'Instagram-Beitrag #4:' : 'Instagram post #4:'), 'Zusätzlicher Instagram-Beitrag hat einen eigenen Kalender-Eintrag.');
    assert.ok(html.includes(language === 'de' ? 'YouTube-Skript auswählen' : 'Select YouTube script'));
    assert.ok(html.includes(language === 'de' ? '5 weitere Instagram-Beiträge erstellen' : 'Create 5 more Instagram posts'));
  }
} finally { globalThis.window = previousWindow; rmSync(temporary, { recursive: true, force: true }); }
const source = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
assert.match(source, /await handleUpdateActiveProject\(\{ \.\.\.appendSocialPins\(current/);
assert.match(source, /await handleUpdateActiveProject\(\{ \.\.\.appendYouTubeContent\(current/);
console.log('Zusätzliche Social-Inhalte geprüft: getrennte Kanäle, Erhalt alter Inhalte/IDs/Termine, kollisionsfreie Ergänzung, mehrere YouTube-Videos, Upload-Abgleich, Cloud-Serialisierung und echter Kalender in DE/EN.');

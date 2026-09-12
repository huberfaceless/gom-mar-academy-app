import React, { useState, useEffect, useRef } from 'react';
import { 
  Youtube, 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  Tv, 
  Smartphone, 
  ListOrdered, 
  Eye, 
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
  Download,
  Volume2,
  Palette,
  Clock,
  Play,
  Share2,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { YouTubeVideoData, YouTubeShort, ProjectSettings } from '../../types/contentEngine';
import { 
  renderYouTubeThumbnail, 
  downloadThumbnailAsImage, 
  ThumbnailColorTheme 
} from '../../utils/youtubeThumbnailRenderer';
import { 
  renderShortsCover, 
  downloadShortsCoverAsImage 
} from '../../utils/shortsCoverRenderer';
import { YouTubeTeleprompterModal } from './YouTubeTeleprompterModal';
import { youtubeService, YouTubeConnectionStatus } from '../../services/youtubeService';

interface YouTubeScriptTabProps {
  video?: YouTubeVideoData;
  shorts?: YouTubeShort[];
  onChangeVideo: (updated: YouTubeVideoData) => void;
  onChangeShorts: (updated: YouTubeShort[]) => void;
  onGoToCalendar: () => void;
  topic: string;
  projectSettings?: ProjectSettings;
}

const THUMBNAIL_THEMES: { id: ThumbnailColorTheme; label: string; colorHex: string }[] = [
  { id: 'red_black', label: 'Rot & Schwarz (Klassisch)', colorHex: '#ef4444' },
  { id: 'emerald_dark', label: 'Vital50 Emerald', colorHex: '#10b981' },
  { id: 'amber_gold', label: 'Amber Gold (Achtung)', colorHex: '#f59e0b' },
  { id: 'royal_blue', label: 'Königsblau', colorHex: '#3b82f6' },
];

const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  id: 'vital50',
  name: 'Vital50',
  websiteUrl: 'https://vital50.gomo-marketing.at/',
  targetAudience: 'Menschen 50+',
  coreTopics: ['Gesundheit', 'Ernährung', 'Abnehmen ab 50'],
  language: 'de',
  defaultCta: 'Kostenlose Anleitung holen',
  defaultTargetUrl: 'https://vital50.gomo-marketing.at/',
  brandVoice: 'Einfühlsam, seriös, motivierend',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const YouTubeScriptTab: React.FC<YouTubeScriptTabProps> = ({
  video,
  shorts = [],
  onChangeVideo,
  onChangeShorts,
  onGoToCalendar,
  topic,
  projectSettings = DEFAULT_PROJECT_SETTINGS,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'video' | 'shorts'>('video');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Thumbnail State
  const [thumbnailTheme, setThumbnailTheme] = useState<ThumbnailColorTheme>('red_black');
  const [thumbnailBadge, setThumbnailBadge] = useState<string>('ACHTUNG FÜR 50+');
  const [isDownloadingThumb, setIsDownloadingThumb] = useState<boolean>(false);
  const thumbnailCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shorts Canvas Refs
  const [downloadingShortIdx, setDownloadingShortIdx] = useState<number | null>(null);

  // Teleprompter Modal
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState<boolean>(false);
  const [youtubeConnection, setYouTubeConnection] = useState<YouTubeConnectionStatus | null>(null);
  const [youtubeConnectionError, setYouTubeConnectionError] = useState<string | null>(null);
  const [isConnectingYouTube, setIsConnectingYouTube] = useState(false);

  useEffect(() => {
    youtubeService.getConnectionStatus()
      .then(setYouTubeConnection)
      .catch((error: unknown) => setYouTubeConnectionError(error instanceof Error ? error.message : 'YouTube-Status konnte nicht geladen werden.'));
    const params = new URLSearchParams(window.location.search);
    if (params.get('youtube') === 'connected') {
      setYouTubeConnectionError(null);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('youtube') === 'error') {
      setYouTubeConnectionError('Die YouTube-Verbindung konnte nicht abgeschlossen werden.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleConnectYouTube = async () => {
    setIsConnectingYouTube(true);
    setYouTubeConnectionError(null);
    try {
      await youtubeService.startConnection();
    } catch (error: unknown) {
      setYouTubeConnectionError(error instanceof Error ? error.message : 'YouTube-Verbindung konnte nicht gestartet werden.');
      setIsConnectingYouTube(false);
    }
  };

  // Render 16:9 Thumbnail Canvas whenever video or thumbnail options change
  useEffect(() => {
    if (!thumbnailCanvasRef.current || !video) return;

    renderYouTubeThumbnail(thumbnailCanvasRef.current, video, projectSettings, {
      theme: thumbnailTheme,
      badgeText: thumbnailBadge,
    }).catch((e) => console.error('Thumbnail render error:', e));
  }, [video, projectSettings, thumbnailTheme, thumbnailBadge, activeSubTab]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadThumbnail = async () => {
    if (!video) return;
    setIsDownloadingThumb(true);
    try {
      await downloadThumbnailAsImage(video, projectSettings, {
        theme: thumbnailTheme,
        badgeText: thumbnailBadge,
      });
    } catch (e) {
      console.error('Download thumbnail error:', e);
    } finally {
      setIsDownloadingThumb(false);
    }
  };

  const handleDownloadShortCover = async (short: YouTubeShort, idx: number) => {
    setDownloadingShortIdx(idx);
    try {
      await downloadShortsCoverAsImage(short, projectSettings);
    } catch (e) {
      console.error('Download short cover error:', e);
    } finally {
      setDownloadingShortIdx(null);
    }
  };

  if (!video) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
        <Youtube className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-700">Noch kein YouTube Skript generiert</h3>
        <p className="text-xs text-slate-500 mt-1">Erstelle zuerst ein Content-Projekt, um das Faceless-Video-Skript und 3 Shorts zu erzeugen.</p>
      </div>
    );
  }

  // Word count & Estimated duration for the longform script
  const scriptWords = [
    video.script.hook,
    video.script.intro,
    ...video.script.mainBody.map((b) => b.narrationText),
    video.script.cta,
    video.script.outro,
  ].join(' ').split(/\s+/).filter(Boolean).length;
  const estimatedMin = Math.ceil(scriptWords / 130);

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
              <Youtube className="w-3.5 h-3.5 text-red-600" />
              YouTube Faceless Suite
            </span>
            <span className="text-xs text-slate-500 font-medium">1 langes Video (~{estimatedMin} Min.) + 3 virale Shorts</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
            "{video.title}"
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleConnectYouTube}
            disabled={isConnectingYouTube || youtubeConnection?.connected === true}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-default ${youtubeConnection?.connected ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {youtubeConnection?.connected ? <CheckCircle2 className="w-4 h-4" /> : <Youtube className="w-4 h-4" />}
            <span>{youtubeConnection?.connected ? 'YouTube verbunden' : isConnectingYouTube ? 'Weiterleitung…' : 'YouTube verbinden'}</span>
          </button>
          {/* SubTab Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveSubTab('video')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-red-600" />
              Haupt-Video Skript
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('shorts')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'shorts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-red-600" />
              3 Shorts ({shorts.length})
            </button>
          </div>

          {/* Teleprompter Button */}
          <button
            type="button"
            onClick={() => setIsTeleprompterOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-red-400" />
            <span>Teleprompter / Sprecher</span>
          </button>

          {/* Next Step Button */}
          <button
            type="button"
            onClick={onGoToCalendar}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Zur Content-Planung</span>
          </button>
        </div>
      </div>

      {youtubeConnectionError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-800">
          {youtubeConnectionError}
        </div>
      )}

      {activeSubTab === 'video' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Script Narrative & Visual Cues (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  Faceless Sprechertext & Regieanweisungen
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Optimiert für Faceless-Kanäle mit Voiceover & B-Roll Footage
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => handleCopy(
                  `TITEL: ${video.title}\n\nHOOK:\n${video.script.hook}\n\nINTRO:\n${video.script.intro}\n\n` +
                  video.script.mainBody.map((b) => `${b.sectionTitle.toUpperCase()}\nRegie: ${b.visualCue}\n${b.narrationText}\n`).join('\n') +
                  `\nCTA:\n${video.script.cta}\n\nOUTRO:\n${video.script.outro}`,
                  'full_script'
                )}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copiedId === 'full_script' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'full_script' ? 'Kopiert' : 'Skript kopieren'}</span>
              </button>
            </div>

            {/* 1. Hook */}
            <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span>
                  1. Hook (Erste 10 Sekunden – Scroll-Stopper!)
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-red-200 text-red-700 font-bold">
                  0:00 - 0:15
                </span>
              </div>
              <textarea
                rows={2}
                value={video.script.hook}
                onChange={(e) => onChangeVideo({
                  ...video,
                  script: { ...video.script, hook: e.target.value }
                })}
                className="w-full p-3 bg-white border border-red-200 rounded-xl text-xs font-bold text-slate-900 focus:border-red-500 outline-hidden leading-relaxed"
              />
            </div>

            {/* 2. Intro */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                2. Intro & Themenübersicht
              </span>
              <textarea
                rows={2}
                value={video.script.intro}
                onChange={(e) => onChangeVideo({
                  ...video,
                  script: { ...video.script, intro: e.target.value }
                })}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-slate-400 outline-hidden leading-relaxed"
              />
            </div>

            {/* 3. Main Sections (Body) */}
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                3. Hauptteil (Kapitel & B-Roll Regie)
              </span>
              {video.script.mainBody.map((section, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={section.sectionTitle}
                      onChange={(e) => {
                        const newBody = [...video.script.mainBody];
                        newBody[idx].sectionTitle = e.target.value;
                        onChangeVideo({ ...video, script: { ...video.script, mainBody: newBody } });
                      }}
                      className="text-xs font-black text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 outline-hidden flex-1"
                    />
                    <span className="text-[10px] text-slate-400 font-mono">Kapitel {idx + 1}</span>
                  </div>

                  {/* Visual Cue (B-Roll) */}
                  <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <span className="font-bold shrink-0">🎬 B-Roll:</span>
                    <input
                      type="text"
                      value={section.visualCue}
                      onChange={(e) => {
                        const newBody = [...video.script.mainBody];
                        newBody[idx].visualCue = e.target.value;
                        onChangeVideo({ ...video, script: { ...video.script, mainBody: newBody } });
                      }}
                      className="w-full bg-transparent text-xs text-amber-950 outline-hidden font-semibold"
                    />
                  </div>

                  {/* Narration text */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Sprechertext (Voiceover):
                    </label>
                    <textarea
                      rows={4}
                      value={section.narrationText}
                      onChange={(e) => {
                        const newBody = [...video.script.mainBody];
                        newBody[idx].narrationText = e.target.value;
                        onChangeVideo({ ...video, script: { ...video.script, mainBody: newBody } });
                      }}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800 focus:border-slate-400 outline-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 4. CTA & Outro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider block">
                  4. Call to Action (CTA)
                </span>
                <textarea
                  rows={2}
                  value={video.script.cta}
                  onChange={(e) => onChangeVideo({
                    ...video,
                    script: { ...video.script, cta: e.target.value }
                  })}
                  className="w-full p-2.5 bg-white border border-emerald-200 rounded-xl text-xs text-emerald-950 focus:border-emerald-500 outline-hidden"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  5. Outro & Nächstes Video Hook
                </span>
                <textarea
                  rows={2}
                  value={video.script.outro}
                  onChange={(e) => onChangeVideo({
                    ...video,
                    script: { ...video.script, outro: e.target.value }
                  })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-slate-400 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 16:9 Thumbnail Live Canvas & SEO Metadata (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Live 16:9 HD Thumbnail Generator */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-red-600" />
                  Live 16:9 HD Thumbnail (1280×720)
                </h4>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-md border border-red-200">
                  High-CTR Formel
                </span>
              </div>

              {/* Canvas Preview Element */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-300 bg-slate-950 flex items-center justify-center relative">
                <canvas
                  ref={thumbnailCanvasRef}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Theme & Badge Quick Selector */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Farbschema:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {THUMBNAIL_THEMES.map((th) => (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setThumbnailTheme(th.id)}
                          title={th.label}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${
                            thumbnailTheme === th.id ? 'scale-120 border-slate-900 ring-2 ring-slate-400' : 'border-white opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: th.colorHex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Badge Text:
                    </label>
                    <input
                      type="text"
                      value={thumbnailBadge}
                      onChange={(e) => setThumbnailBadge(e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Headline im Thumbnail (max 3-4 Worte):
                  </label>
                  <input
                    type="text"
                    value={video.thumbnailConcept?.headline || ''}
                    onChange={(e) => onChangeVideo({
                      ...video,
                      thumbnailConcept: { ...video.thumbnailConcept, headline: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Download Thumbnail Button */}
              <button
                type="button"
                onClick={handleDownloadThumbnail}
                disabled={isDownloadingThumb}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>{isDownloadingThumb ? 'Generiere Bild...' : '1280×720 HD Thumbnail herunterladen'}</span>
              </button>
            </div>

            {/* 2. YouTube Title & Video Description with Timestamps */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  YouTube SEO Beschreibung & Timestamps
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(
                    `${video.title}\n\n${video.description}\n\n` +
                    video.chapters.map((c) => `${c.timestamp} ${c.title}`).join('\n') +
                    `\n\nWebsite: ${projectSettings.websiteUrl}`,
                    'yt_desc'
                  )}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  {copiedId === 'yt_desc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'yt_desc' ? 'Kopiert' : 'Kopieren'}</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={video.description}
                onChange={(e) => onChangeVideo({ ...video, description: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed outline-hidden"
              />

              {video.chapters && video.chapters.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kapitel-Timestamps für YouTube Studio:</p>
                  <div className="space-y-1">
                    {video.chapters.map((ch, i) => (
                      <div key={i} className="text-xs font-mono text-slate-700 flex items-center justify-between">
                        <span className="text-red-600 font-bold">{ch.timestamp}</span>
                        <span className="text-slate-800 truncate max-w-[200px]">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Keywords & Tags */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  YouTube Tags ({video.keywords.length})
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(video.keywords.join(', '), 'yt_tags')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  {copiedId === 'yt_tags' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'yt_tags' ? 'Kopiert' : 'Kommagetrennt kopieren'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {video.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* YouTube Shorts Sub-Tab (3 Vertical Cards with 1080x1920 Cover Downloader) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shorts.map((short, idx) => (
            <div key={short.id || idx} className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Short #{short.shortNumber || idx + 1} (9:16)
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleCopy(`${short.title}\n\nHook: ${short.hook}\n\nSkript:\n${short.scriptText}\n\n${short.description}`, `short_${idx}`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Short kopieren"
                  >
                    {copiedId === `short_${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Short Titel:</label>
                  <input
                    type="text"
                    value={short.title}
                    onChange={(e) => {
                      const newShorts = [...shorts];
                      newShorts[idx].title = e.target.value;
                      onChangeShorts(newShorts);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-hidden"
                  />
                </div>

                {/* 3-Second Hook */}
                <div className="p-3 bg-red-50/80 rounded-2xl border border-red-200">
                  <label className="block text-[10px] font-black text-red-900 uppercase mb-1">⚡ 3-Sekunden Hook:</label>
                  <textarea
                    rows={2}
                    value={short.hook}
                    onChange={(e) => {
                      const newShorts = [...shorts];
                      newShorts[idx].hook = e.target.value;
                      onChangeShorts(newShorts);
                    }}
                    className="w-full p-2 bg-white border border-red-200 rounded-xl text-xs font-bold text-slate-900 outline-hidden"
                  />
                </div>

                {/* Narration Script */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Sprechertext (~30-45 Sek.):
                  </label>
                  <textarea
                    rows={6}
                    value={short.scriptText}
                    onChange={(e) => {
                      const newShorts = [...shorts];
                      newShorts[idx].scriptText = e.target.value;
                      onChangeShorts(newShorts);
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800 outline-hidden"
                  />
                </div>

                {/* Description & Hashtags */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Beschreibung & Hashtags:</label>
                  <input
                    type="text"
                    value={short.description}
                    onChange={(e) => {
                      const newShorts = [...shorts];
                      newShorts[idx].description = e.target.value;
                      onChangeShorts(newShorts);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-hidden"
                  />
                </div>
              </div>

              {/* Action: Download 1080x1920 Cover Card */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDownloadShortCover(short, idx)}
                  disabled={downloadingShortIdx === idx}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-red-600" />
                  <span>{downloadingShortIdx === idx ? 'Generiere...' : '1080×1920 Cover PNG'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Teleprompter Modal */}
      <YouTubeTeleprompterModal
        video={video}
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
      />
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { authenticatedFetch } from '../services/authenticatedFetch';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Clock, 
  Video, 
  Tv, 
  Rewind, 
  FastForward, 
  Subtitles, 
  Check, 
  ChevronRight, 
  Zap, 
  Lightbulb, 
  Wrench,
  ShieldCheck
} from 'lucide-react';

interface LessonVideoPlayerProps {
  lesson: Lesson;
  niche?: string;
}

export const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({ lesson, niche }) => {
  const { language } = useLanguage();
  const copy = {
    de: { chapters: ['Einführung & Überblick', 'Kern-Prinzipien & Methodik', 'Praxisbeispiel & Anwendung', 'Zusammenfassung & Umsetzung'], lesson: 'Lektion', stage: 'Etappe', keyPoints: 'Die wichtigsten Punkte sind:', takeaway: 'Merk-Satz:', chapterReached: 'Audio-Kapitel erreicht.', changeUrl: 'Video-URL ändern', embed: '🎥 YouTube-Video einbetten', addUrl: 'Füge einen YouTube-Link oder Video-Embed ein für Lektion', save: 'Speichern', reset: 'Zurücksetzen', parts: ['Teil 1: Einführung & Ausrichtung', 'Teil 2: Die 3 Kern-Prinzipien', 'Teil 3: Konkretes Praxisbeispiel', 'Teil 4: Fazit & Deine Aufgabe'], playHint: 'Klicke auf Play, um die Audio-Erklärung zu starten', loading: 'Deine Academy-Stimme wird geladen …', audioError: 'Die Audio-Erklärung konnte nicht geladen werden. Bitte versuche es erneut.', back10: '10 Sekunden zurück', forward10: '10 Sekunden vor', audioPlayer: 'GOM-MAR Audio-Erklärung', videoPlayer: 'YouTube-Videoplayer', academyVoice: 'Einheitliche Academy-Stimme', audioExplanation: 'Audio-Erklärung', speechOutput: 'Sprachausgabe', interactive: 'Audio-Kapitel', chapterHint: 'Wähle ein Kapitel, um die Audio-Erklärung dort fortzusetzen', textToggle: 'Textanzeige umschalten', fullscreen: 'Vollbild umschalten' },
    en: { chapters: ['Introduction & overview', 'Core principles & method', 'Practical example & application', 'Summary & implementation'], lesson: 'Lesson', stage: 'Stage', keyPoints: 'The key points are:', takeaway: 'Key takeaway:', chapterReached: 'Audio chapter reached.', changeUrl: 'Change video URL', embed: '🎥 Embed YouTube video', addUrl: 'Add a YouTube link or video embed for lesson', save: 'Save', reset: 'Reset', parts: ['Part 1: Introduction & direction', 'Part 2: The 3 core principles', 'Part 3: Practical example', 'Part 4: Conclusion & your task'], playHint: 'Press Play to start the audio explanation', loading: 'Your Academy voice is loading …', audioError: 'The audio explanation could not be loaded. Please try again.', back10: 'Back 10 seconds', forward10: 'Forward 10 seconds', audioPlayer: 'GOM-MAR audio explanation', videoPlayer: 'YouTube video player', academyVoice: 'Consistent Academy voice', audioExplanation: 'Audio explanation', speechOutput: 'Speech output', interactive: 'Audio chapters', chapterHint: 'Select a chapter to continue the audio explanation there', textToggle: 'Toggle text display', fullscreen: 'Toggle fullscreen' },
    pl: { chapters: ['Wprowadzenie i przegląd', 'Główne zasady i metoda', 'Przykład i zastosowanie', 'Podsumowanie i wdrożenie'], lesson: 'Lekcja', stage: 'Etap', keyPoints: 'Najważniejsze punkty:', takeaway: 'Kluczowa myśl:', chapterReached: 'Rozdział audio rozpoczęty.', changeUrl: 'Zmień adres wideo', embed: '🎥 Osadź wideo YouTube', addUrl: 'Dodaj link YouTube lub osadzone wideo dla lekcji', save: 'Zapisz', reset: 'Resetuj', parts: ['Część 1: Wprowadzenie i kierunek', 'Część 2: 3 główne zasady', 'Część 3: Praktyczny przykład', 'Część 4: Podsumowanie i Twoje zadanie'], playHint: 'Naciśnij Play, aby uruchomić objaśnienie audio', loading: 'Trwa ładowanie głosu Academy …', audioError: 'Nie udało się załadować objaśnienia audio. Spróbuj ponownie.', back10: 'Cofnij o 10 sekund', forward10: 'Przewiń o 10 sekund', audioPlayer: 'Objaśnienie audio GOM-MAR', videoPlayer: 'Odtwarzacz wideo YouTube', academyVoice: 'Spójny głos Academy', audioExplanation: 'Objaśnienie audio', speechOutput: 'Odtwarzanie głosu', interactive: 'Rozdziały audio', chapterHint: 'Wybierz rozdział, aby kontynuować od niego objaśnienie audio', textToggle: 'Przełącz wyświetlanie tekstu', fullscreen: 'Przełącz pełny ekran' },
  }[language];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const customVideoUrl = lesson.learnContent.videoUrl?.trim() || '';
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string>('');
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Parse total duration in seconds from string "7:45" or fallback to 480 seconds (8 min)
  const parseDurationSeconds = (durStr?: string): number => {
    if (!durStr) return 480;
    const parts = durStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 480;
  };

  const totalDurationSeconds = audioDuration || parseDurationSeconds(lesson.learnContent.videoDuration);

  const audioChapters = lesson.learnContent.videoChapters || [
    { time: '0:00', title: `01. ${copy.chapters[0]}` },
    { time: '2:15', title: `02. ${copy.chapters[1]}` },
    { time: '4:30', title: `03. ${copy.chapters[2]}` },
    { time: '6:50', title: `04. ${copy.chapters[3]}` },
  ];
  const chaptersWithSeconds = audioChapters.map((chap, index) => {
    const fourChapterRatios = [0, 0.25, 0.55, 0.8];
    const ratio = audioChapters.length === 4
      ? fourChapterRatios[index]
      : index / Math.max(1, audioChapters.length);
    return { ...chap, ratio, seconds: Math.floor(totalDurationSeconds * ratio) };
  });

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    setAudioUrl('');
    setAudioDuration(null);
    setAudioError('');
    setCurrentTime(0);
    setIsPlaying(false);
  }, [lesson.id, language]);

  // Update active slide based on current time position
  useEffect(() => {
    const progressRatio = currentTime / totalDurationSeconds;
    if (progressRatio < 0.25) setActiveSlide(0);
    else if (progressRatio < 0.55) setActiveSlide(1);
    else if (progressRatio < 0.8) setActiveSlide(2);
    else setActiveSlide(3);
  }, [currentTime, totalDurationSeconds]);

  const audioCacheKey = `/__academy-audio__/v1/${language}/${encodeURIComponent(lesson.id)}`;

  const loadAudio = async (): Promise<string> => {
    if (audioUrl) return audioUrl;
    setAudioLoading(true);
    setAudioError('');
    try {
      const cache = 'caches' in window ? await caches.open('gommar-lesson-audio-v1') : null;
      const cachedResponse = await cache?.match(audioCacheKey);
      const response = cachedResponse || await authenticatedFetch(
        `/api/academy/lessons/${encodeURIComponent(lesson.id)}/audio?language=${language}`,
      );
      if (!response.ok) throw new Error(copy.audioError);
      if (!cachedResponse) await cache?.put(audioCacheKey, response.clone());
      const url = URL.createObjectURL(await response.blob());
      setAudioUrl(url);
      return url;
    } catch {
      setAudioError(copy.audioError);
      throw new Error(copy.audioError);
    } finally {
      setAudioLoading(false);
    }
  };

  const prepareAudio = async (): Promise<HTMLAudioElement> => {
    const audio = audioRef.current;
    if (!audio) throw new Error(copy.audioError);
    if (!audioUrl) {
      audio.src = await loadAudio();
      audio.load();
    }
    if (audio.readyState < 1) {
      await new Promise<void>((resolve, reject) => {
        const handleLoaded = () => {
          audio.removeEventListener('error', handleError);
          resolve();
        };
        const handleError = () => {
          audio.removeEventListener('loadedmetadata', handleLoaded);
          reject(new Error(copy.audioError));
        };
        audio.addEventListener('loadedmetadata', handleLoaded, { once: true });
        audio.addEventListener('error', handleError, { once: true });
      });
    }
    return audio;
  };

  const handlePlayToggle = async () => {
    if (audioLoading) return;
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    if (isPlaying) {
      currentAudio.pause();
      return;
    }
    try {
      const audio = await prepareAudio();
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (newTimeSec: number) => {
    const clamped = Math.max(0, Math.min(newTimeSec, totalDurationSeconds));
    setCurrentTime(clamped);
    if (audioRef.current && audioUrl) audioRef.current.currentTime = clamped;
  };

  const handleChapterSelect = async (ratio: number) => {
    if (audioLoading) return;
    try {
      const audio = await prepareAudio();
      const targetTime = Math.max(0, Math.min(audio.duration * ratio, audio.duration));
      audio.currentTime = targetTime;
      setCurrentTime(targetTime);
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Convert YouTube link to embed URL if applicable
  const getEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./u, '');
      const id = host === 'youtu.be'
        ? parsed.pathname.slice(1).split('/')[0]
        : host === 'youtube.com' && parsed.pathname === '/watch'
          ? parsed.searchParams.get('v') || ''
          : host === 'youtube.com' && parsed.pathname.startsWith('/embed/')
            ? parsed.pathname.split('/')[2] || ''
            : '';
      return /^[a-zA-Z0-9_-]{11}$/u.test(id)
        ? `https://www.youtube-nocookie.com/embed/${id}`
        : '';
    } catch {
      return '';
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Media header */}
      <div className="flex items-center justify-between gap-3 text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-white uppercase tracking-wider">
            {customVideoUrl ? copy.videoPlayer : copy.audioPlayer}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">{customVideoUrl ? 'HD 1080p' : copy.academyVoice}</span>
        </div>

      </div>

      {/* Embedded YouTube / External Player if custom URL exists */}
      {customVideoUrl && (
        <div className="relative aspect-video bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            src={getEmbedUrl(customVideoUrl)}
            title={lesson.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {customVideoUrl && (
        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-white uppercase tracking-wider">{copy.audioPlayer}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">{copy.academyVoice}</span>
        </div>
      )}

      {/* ElevenLabs audio explanation remains available alongside an optional video. */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-8 group select-none">
          <audio
            ref={audioRef}
            src={audioUrl || undefined}
            preload="metadata"
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setAudioDuration(event.currentTarget.duration)}
          />
          {/* Background Animated Wave Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Stage Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-xs text-slate-300">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-white">{copy.stage} {lesson.stageId}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">{copy.lesson} {lesson.id}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                {copy.audioExplanation}: {lesson.learnContent.videoTitle || lesson.title}
              </span>
            </div>
          </div>

          {/* Center Visual Slide Canvas (Changes based on activeSlide / progress) */}
          <div className="relative z-10 my-auto text-center max-w-2xl mx-auto space-y-4 px-4 py-2">
            {activeSlide === 0 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>{copy.parts[0]}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {lesson.description}
                </p>
              </div>
            )}

            {activeSlide === 1 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>{copy.parts[1]}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-left bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl">
                  {lesson.learnContent.bulletPoints.map((bp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSlide === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                  <span>{copy.parts[2]}</span>
                </div>
                <div className="bg-purple-950/40 border border-purple-500/30 p-4 rounded-2xl text-xs sm:text-sm text-purple-100 font-medium leading-relaxed text-left">
                  {lesson.learnContent.practicalExamples?.[0] || lesson.learnContent.summaryText}
                </div>
              </div>
            )}

            {activeSlide === 3 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{copy.parts[3]}</span>
                </div>
                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl text-xs sm:text-sm text-amber-100 font-bold">
                  "{lesson.understandContent.coreTakeaway}"
                </div>
              </div>
            )}

            {/* Subtitles Overlay Bar */}
            {showCaptions && (
              <div className="inline-block bg-slate-950/90 backdrop-blur-md border border-slate-800/80 px-4 py-2 rounded-2xl text-xs text-emerald-300 font-medium shadow-xl">
                🎙️ {audioLoading ? <span>{copy.loading}</span> : isPlaying ? (
                  <span>{copy.speechOutput}: "{lesson.learnContent.summaryText.slice(0, 110)}..."</span>
                ) : audioError ? (
                  <span className="text-red-300">{audioError}</span>
                ) : (
                  <span>{copy.playHint}</span>
                )}
              </div>
            )}
          </div>

          {/* Center Play Button Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={handlePlayToggle}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform duration-300 cursor-pointer z-20"
            >
              <Play className="w-10 h-10 ml-1 fill-current" />
            </button>
          )}

          {/* Audio controls */}
          <div className="relative z-10 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
            {/* Scrubber Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                handleSeek(Math.floor(ratio * totalDurationSeconds));
              }}
              className="w-full h-2 bg-slate-800 hover:h-3 rounded-full cursor-pointer relative overflow-hidden transition-all group/scrubber"
            >
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / totalDurationSeconds) * 100}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayToggle}
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={() => handleSeek(currentTime - 10)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={copy.back10}
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleSeek(currentTime + 10)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={copy.forward10}
                >
                  <FastForward className="w-4 h-4" />
                </button>

                <div className="font-mono text-slate-200 text-[11px] font-bold">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-600 mx-1">/</span>
                  <span className="text-slate-400">{formatTime(totalDurationSeconds)}</span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Speed selector */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                    setPlaybackSpeed(speeds[nextIdx]);
                    if (audioRef.current) audioRef.current.playbackRate = speeds[nextIdx];
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-bold transition-colors cursor-pointer"
                >
                  {playbackSpeed}x
                </button>

                {/* Captions Toggle */}
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showCaptions ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-slate-800 text-slate-500'
                  }`}
                  title={copy.textToggle}
                >
                  <Subtitles className="w-4 h-4" />
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={copy.fullscreen}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
      </div>

      {/* Audio chapters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <p className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{copy.interactive} ({chaptersWithSeconds.length})</span>
          </p>
          <span className="text-[11px] text-slate-400">{copy.chapterHint}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {chaptersWithSeconds.map((chap, idx) => {
            const isChapActive = currentTime >= chap.seconds && (idx === chaptersWithSeconds.length - 1 || currentTime < chaptersWithSeconds[idx + 1].seconds);
            return (
              <button
                key={idx}
                onClick={() => void handleChapterSelect(chap.ratio)}
                disabled={audioLoading}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                  isChapActive
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isChapActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
                  <span className="font-medium text-white">{chap.title}</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 shrink-0 font-bold">
                  {formatTime(chap.seconds)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

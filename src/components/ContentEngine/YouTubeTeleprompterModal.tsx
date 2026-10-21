import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Type, 
  Volume2, 
  Copy, 
  Check, 
  Maximize2,
  Minimize2,
  Clock
} from 'lucide-react';
import { YouTubeVideoData } from '../../types/contentEngine';

interface YouTubeTeleprompterModalProps {
  video: YouTubeVideoData;
  isOpen: boolean;
  onClose: () => void;
}

export const YouTubeTeleprompterModal: React.FC<YouTubeTeleprompterModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  const { language, hubText } = useContentHubCopy();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(3); // 1 to 10
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('large');
  const [copied, setCopied] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Calculate total words and reading time (approx 130 words per minute)
  const fullText = [
    `HOOK: ${video.script.hook}`,
    `INTRO: ${video.script.intro}`,
    ...video.script.mainBody.map((b) => `${b.sectionTitle.toUpperCase()}:\n${b.narrationText}`),
    `CALL TO ACTION: ${video.script.cta}`,
    `OUTRO: ${video.script.outro}`,
  ].join('\n\n');

  const totalWords = fullText.split(/\s+/).filter(Boolean).length;
  const estimatedMinutes = Math.ceil(totalWords / 130);

  // Auto-scroll animation loop
  useEffect(() => {
    let animationId: number;
    if (isPlaying && scrollContainerRef.current) {
      const scroll = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed * 0.4;
        }
        animationId = requestAnimationFrame(scroll);
      };
      animationId = requestAnimationFrame(scroll);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, scrollSpeed]);

  if (!isOpen) return null;

  const handleResetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  const handleCopyCleanText = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizeClass = 
    fontSize === 'normal' ? 'text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-2xl sm:text-3xl leading-loose' : 'text-3xl sm:text-4xl leading-loose';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 text-white w-full max-w-4xl h-[92vh] rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{hubText("Teleprompter & Sprecher-Modus")}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>{totalWords}{' '}{hubText("Wörter")}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Clock className="w-3 h-3" />
                  ~{estimatedMinutes}{' '}{hubText("Min. Sprechzeit")}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCleanText}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? hubText("Kopiert") : hubText("TTS-Text kopieren")}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Playback Controls Toolbar */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? hubText("Pause (Leertaste)") : hubText("Teleprompter Starten")}</span>
            </button>

            <button
              type="button"
              onClick={handleResetScroll}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title={hubText("An den Anfang zurückspringen")}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Font Options */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{hubText("Tempo:")}</span>
              <input
                type="range"
                min={1}
                max={10}
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className="w-24 accent-red-500 cursor-pointer"
              />
              <span className="text-red-400 font-mono font-bold w-4">{scrollSpeed}</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  fontSize === 'normal' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded-lg text-sm font-bold ${
                  fontSize === 'large' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xl')}
                className={`px-2.5 py-1 rounded-lg text-base font-bold ${
                  fontSize === 'xl' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Teleprompter Screen */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-8 sm:p-14 overflow-y-auto space-y-12 font-sans select-text scroll-smooth"
        >
          {/* Hook */}
          <div className="space-y-3 border-l-4 border-red-500 pl-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-400">{hubText("🎬 1. Hook (Erste 10 Sekunden)")}</span>
            <p className={`font-extrabold text-amber-300 ${fontSizeClass}`}>
              {video.script.hook}
            </p>
          </div>

          {/* Intro */}
          <div className="space-y-3 border-l-4 border-slate-700 pl-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
              2. Intro
            </span>
            <p className={`font-semibold text-slate-200 ${fontSizeClass}`}>
              {video.script.intro}
            </p>
          </div>

          {/* Main Body Sections */}
          {video.script.mainBody.map((section, idx) => (
            <div key={idx} className="space-y-4 border-l-4 border-emerald-500 pl-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                  {section.sectionTitle}
                </span>
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">{hubText("Regie:")}{' '}{section.visualCue}
                </span>
              </div>
              <p className={`font-medium text-white ${fontSizeClass}`}>
                {section.narrationText}
              </p>
            </div>
          ))}

          {/* CTA & Outro */}
          <div className="space-y-3 border-l-4 border-amber-500 pl-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              4. Call to Action (CTA)
            </span>
            <p className={`font-bold text-amber-200 ${fontSizeClass}`}>
              {video.script.cta}
            </p>
          </div>

          <div className="space-y-3 border-l-4 border-slate-700 pl-6 pb-20">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">{hubText("5. Outro")}</span>
            <p className={`font-medium text-slate-300 ${fontSizeClass}`}>
              {video.script.outro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Instagram, RefreshCw, Sparkles } from 'lucide-react';
import { PinterestPin, ProjectSettings } from '../../types/contentEngine';
import { renderPinToCanvas } from '../../utils/pinterestCanvasRenderer';
import { InstagramPublishModal } from './InstagramPublishModal';

interface InstagramPostsTabProps {
  pins: PinterestPin[];
  topic: string;
  projectSettings: ProjectSettings;
  onGenerateYouTube: () => void;
  isGeneratingYouTube: boolean;
}

export const InstagramPostsTab: React.FC<InstagramPostsTabProps> = ({
  pins,
  topic,
  projectSettings,
  onGenerateYouTube,
  isGeneratingYouTube,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activePin = pins[selectedIndex] || pins[0];

  useEffect(() => {
    if (!canvasRef.current || !activePin) return;
    setIsRendering(true);
    void renderPinToCanvas(canvasRef.current, activePin, projectSettings, { width: 1080, height: 1350 })
      .finally(() => setIsRendering(false));
  }, [activePin, projectSettings]);

  if (!pins.length || !activePin) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
        <Instagram className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-700">Noch keine Instagram-Beiträge vorhanden</h3>
        <p className="text-xs text-slate-500 mt-1">Erstelle zuerst die fünf Grafiken im Pinterest-Bereich.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-fuchsia-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200 inline-flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5" />
            5 Instagram-Beiträge (1080×1350)
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-2">Instagram Beitrags-Set: „{topic}“</h2>
          <p className="text-xs text-slate-500 mt-1">Feed-Format 4:5 mit vollständiger Grafik, Caption und Hashtags</p>
        </div>
        <button
          type="button"
          onClick={onGenerateYouTube}
          disabled={isGeneratingYouTube}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isGeneratingYouTube ? 'Generiere YouTube...' : 'Weiter: YouTube-Skript'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {pins.map((pin, index) => (
          <button
            key={pin.id || index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedIndex === index
                ? 'bg-fuchsia-50 border-fuchsia-500 shadow-md ring-2 ring-fuchsia-500/20'
                : 'bg-white border-slate-200 hover:border-fuchsia-300'
            }`}
          >
            <span className="text-[10px] font-black text-fuchsia-700">BEITRAG #{index + 1}</span>
            <p className="text-xs font-extrabold text-slate-900 line-clamp-2 mt-1">{pin.title}</p>
            <span className="text-[10px] text-slate-400 mt-2 block">📐 1080×1350 · 4:5</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-fuchsia-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-fuchsia-600" />
              Instagram-Vorschau
            </h4>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Format 4:5
            </span>
          </div>
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-300 bg-slate-950">
            <canvas ref={canvasRef} className="w-full h-full object-contain" />
            {isRendering && (
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-xs font-bold gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-fuchsia-300" /> Vorschau wird erstellt…
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-fuchsia-200 shadow-xs space-y-5">
          <div>
            <span className="text-xs font-extrabold text-fuchsia-600 uppercase tracking-wider">Aktiver Instagram-Beitrag</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">{activePin.title}</h3>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs font-black text-slate-500 uppercase mb-2">Caption und Hashtags</p>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{activePin.description}</p>
            {activePin.keywords.length > 0 && (
              <p className="text-sm text-fuchsia-700 mt-4">{activePin.keywords.map((keyword) => `#${keyword.replace(/[^\p{L}\p{N}_]/gu, '')}`).join(' ')}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsPublishModalOpen(true)}
            className="w-full px-5 py-3.5 bg-linear-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 text-white rounded-xl font-black shadow-md flex items-center justify-center gap-2"
          >
            <Instagram className="w-5 h-5" /> Auf Instagram veröffentlichen
          </button>
        </div>
      </div>

      <InstagramPublishModal
        pin={activePin}
        projectSettings={projectSettings}
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
};

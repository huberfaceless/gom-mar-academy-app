import React, { useState, useEffect, useRef } from 'react';
import { 
  Pin, 
  Sparkles, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  ExternalLink, 
  Calendar,
  Layers,
  Palette,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  FolderArchive,
  FileSpreadsheet,
  RefreshCw,
  Plus,
  Trash2,
  CheckCheck,
  Globe,
  Sliders,
  Type,
  LayoutTemplate
} from 'lucide-react';
import { 
  PinterestPin, 
  PinAngle, 
  PinTemplateStyle, 
  PinColorTheme, 
  ProjectSettings 
} from '../../types/contentEngine';
import { 
  renderPinToCanvas, 
  downloadPinAsImage, 
  downloadAllPinsAsZip, 
  generatePinterestBulkUploadCsv,
  CURATED_HEALTH_PHOTOS 
} from '../../utils/pinterestCanvasRenderer';
import { PinterestPublishModal } from './PinterestPublishModal';
import { PinterestImagePickerModal } from './PinterestImagePickerModal';

interface PinterestPinsTabProps {
  pins: PinterestPin[];
  onChange: (updatedPins: PinterestPin[]) => void;
  onGenerateYouTube: () => void;
  isGeneratingYouTube: boolean;
  topic: string;
  projectSettings?: ProjectSettings;
}

const ANGLE_BADGES: Record<PinAngle, { label: string; color: string; icon: string; desc: string }> = {
  problem: { label: 'Angle 1: Problem & Schmerzpunkt', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: '⚡', desc: 'Fokus auf den konkreten Alltagsschmerz' },
  solution: { label: 'Angle 2: Klare 3-Schritte-Lösung', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '🌱', desc: 'Die direkte & einfache Methode' },
  mistake: { label: 'Angle 3: Typische Diätfehler', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: '⚠️', desc: 'Was man ab 50 unbedingt vermeiden sollte' },
  list: { label: 'Angle 4: Checkliste & Power-Foods', color: 'bg-teal-100 text-teal-800 border-teal-200', icon: '📋', desc: 'Strukturierte Tipps & Übersicht' },
  curiosity: { label: 'Angle 5: Neugier & Geheimtipp', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🔮', desc: 'Überraschende Erkenntnis' },
};

const TEMPLATE_OPTIONS: { id: PinTemplateStyle; label: string; icon: string }[] = [
  { id: 'vital50_clean', label: 'Clean Editorial (Standard)', icon: '✨' },
  { id: 'vital50_bold', label: 'High-Impact Bold Box', icon: '⚡' },
  { id: 'vital50_list', label: 'Checkliste / 4 Schritte', icon: '📋' },
  { id: 'vital50_curiosity', label: 'Curiosity Hook', icon: '🔮' },
  { id: 'vital50_dark', label: 'Premium Dark Luxury', icon: '🌙' },
];

const THEME_OPTIONS: { id: PinColorTheme; label: string; colorHex: string }[] = [
  { id: 'emerald', label: 'Vital50 Emerald', colorHex: '#059669' },
  { id: 'teal', label: 'Deep Teal', colorHex: '#0d9488' },
  { id: 'coral', label: 'Warm Coral', colorHex: '#ea580c' },
  { id: 'amber', label: 'Amber Gold', colorHex: '#d97706' },
  { id: 'berry', label: 'Berry Violett', colorHex: '#c026d3' },
  { id: 'dark', label: 'Obsidian Dark', colorHex: '#0f172a' },
  { id: 'ocean', label: 'Nordic Ocean', colorHex: '#2563eb' },
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

export const PinterestPinsTab: React.FC<PinterestPinsTabProps> = ({
  pins,
  onChange,
  onGenerateYouTube,
  isGeneratingYouTube,
  topic,
  projectSettings = DEFAULT_PROJECT_SETTINGS,
}) => {
  const [selectedPinIndex, setSelectedPinIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDownloadingSingle, setIsDownloadingSingle] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  
  // Modals
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState<boolean>(false);

  // Canvas ref for live rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRenderingCanvas, setIsRenderingCanvas] = useState<boolean>(false);

  const activePin = pins[selectedPinIndex] || pins[0];

  // Re-render canvas whenever activePin, theme, template or image changes
  useEffect(() => {
    if (!canvasRef.current || !activePin) return;

    setIsRenderingCanvas(true);
    renderPinToCanvas(canvasRef.current, activePin, projectSettings)
      .catch((e) => console.error('Canvas render error:', e))
      .finally(() => setIsRenderingCanvas(false));
  }, [activePin, projectSettings, selectedPinIndex]);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateActivePin = (updatedField: Partial<PinterestPin>) => {
    const newPins = [...pins];
    newPins[selectedPinIndex] = {
      ...newPins[selectedPinIndex],
      ...updatedField,
    };
    onChange(newPins);
  };

  const handleDownloadCurrentPin = async () => {
    if (!activePin) return;
    setIsDownloadingSingle(true);
    try {
      await downloadPinAsImage(activePin, projectSettings);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setIsDownloadingSingle(false);
    }
  };

  const handleDownloadAllZip = async () => {
    setIsDownloadingZip(true);
    try {
      await downloadAllPinsAsZip(pins, projectSettings, topic);
    } catch (e) {
      console.error('Zip download error:', e);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generatePinterestBulkUploadCsv(pins, projectSettings);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pinterest-Bulk-Upload-${topic.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!pins || pins.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
        <Pin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-700">Noch keine Pinterest Pins vorhanden</h3>
        <p className="text-xs text-slate-500 mt-1">Erstelle zuerst ein Content-Projekt, um 5 psychologische Pin-Grafiken zu erzeugen.</p>
      </div>
    );
  }

  // Calculate clean UTM link
  const utmUrl = `${activePin.targetUrl || projectSettings.websiteUrl}${
    (activePin.targetUrl || projectSettings.websiteUrl).includes('?') ? '&' : '?'
  }utm_source=pinterest&utm_medium=pin&utm_campaign=vital50_${encodeURIComponent(topic.slice(0, 20))}&utm_content=angle_${activePin.angle}`;

  return (
    <div className="space-y-6">
      {/* Top Bar with Main Action Engine */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
              <Pin className="w-3 h-3" />
              5 Pinterest Pins (1080×1620 HD)
            </span>
            <span className="text-xs text-slate-500 font-medium">5 psychologische Blickwinkel für maximale Klicks</span>
            {activePin.status === 'published' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-100 text-teal-800 flex items-center gap-1 border border-teal-200">
                <CheckCheck className="w-3.5 h-3.5" />
                Live auf Pinterest
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
            Pinterest Kampagnen-Set: "{topic}"
          </h2>
        </div>

        {/* Global Export & Progression Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Exportiert eine CSV-Datei für die Pinterest-Massenerstellung"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>CSV-Massenexport</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAllZip}
            disabled={isDownloadingZip}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50"
            title="Rendert alle 5 Pins in 1080x1620 und verpackt sie als ZIP"
          >
            <FolderArchive className="w-4 h-4 text-amber-400" />
            <span>{isDownloadingZip ? 'Erstelle ZIP...' : 'Alle 5 Pins als ZIP'}</span>
          </button>

          <button
            type="button"
            onClick={onGenerateYouTube}
            disabled={isGeneratingYouTube}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGeneratingYouTube ? 'Generiere YouTube...' : 'Weiter: YouTube Skript'}</span>
          </button>
        </div>
      </div>

      {/* 5 Pins Angle Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {pins.map((pin, idx) => {
          const badge = ANGLE_BADGES[pin.angle] || { 
            label: `Pin ${idx + 1}`, 
            color: 'bg-slate-100 text-slate-800 border-slate-200', 
            icon: '📌', 
            desc: 'Allgemeiner Tipp' 
          };
          const isSelected = selectedPinIndex === idx;

          return (
            <button
              key={pin.id || idx}
              type="button"
              onClick={() => setSelectedPinIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border ${badge.color}`}>
                    <span>{badge.icon}</span>
                    <span>#{idx + 1} {pin.angle.toUpperCase()}</span>
                  </span>
                  {pin.status === 'published' && (
                    <span className="w-2 h-2 rounded-full bg-teal-500 ring-2 ring-teal-200" title="Veröffentlicht" />
                  )}
                </div>
                <p className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-snug">
                  {pin.title}
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-1.5 border-t border-slate-100">
                <span className="font-semibold">{pin.templateStyle || 'vital50_clean'}</span>
                <span>📐 1080×1620</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace: Left Live Canvas Preview, Right Comprehensive Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: 1080×1620 Live Interactive Canvas Preview (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-rose-500" />
              Live 1080×1620 HD Grafik
            </h4>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Format 2:3 Ready</span>
            </div>
          </div>

          {/* HTML5 Canvas Container */}
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-slate-950 flex items-center justify-center">
            {/* The real rendered canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />

            {isRenderingCanvas && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Rendere HD Grafik...</span>
              </div>
            )}
          </div>

          {/* Canvas Actions Bar */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDownloadCurrentPin}
              disabled={isDownloadingSingle}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isDownloadingSingle ? 'Herunterladen...' : 'HD PNG (1080×1620)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              className="px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Auf Pinterest posten 🚀</span>
            </button>
          </div>

          {/* Background Image Quick Selector */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                Hintergrundbild (1080×1620)
              </span>
              <button
                type="button"
                onClick={() => setIsImagePickerOpen(true)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>Bild ändern / KI</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-16 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                <img
                  src={activePin.imageUrl || CURATED_HEALTH_PHOTOS[0].url}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {activePin.imagePrompt || 'Kuriertes Vital50 HD-Gesundheitsfoto mit optimalem Kontrast für Pinterest.'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Visual & SEO Pin Editor (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Aktive Pin-Bearbeitung</span>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>{ANGLE_BADGES[activePin.angle]?.icon || '📌'}</span>
                <span>{activePin.angleLabel}</span>
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleCopyText(
                `${activePin.title}\n\n${activePin.description}\n\nLink: ${utmUrl}`,
                `full_${activePin.id}`
              )}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {copiedId === `full_${activePin.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === `full_${activePin.id}` ? 'Alles kopiert ✅' : 'Titel + SEO-Text kopieren'}</span>
            </button>
          </div>

          {/* 1. Design Template & Color Theme Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1">
                <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600" />
                Grafik-Template
              </label>
              <select
                value={activePin.templateStyle || 'vital50_clean'}
                onChange={(e) => handleUpdateActivePin({ templateStyle: e.target.value as PinTemplateStyle })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:border-emerald-500 outline-hidden cursor-pointer"
              >
                {TEMPLATE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-rose-600" />
                Farbwelt / Branding
              </label>
              <div className="flex items-center gap-1.5 pt-0.5">
                {THEME_OPTIONS.map((th) => {
                  const isSelected = (activePin.colorTheme || 'emerald') === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => handleUpdateActivePin({ colorTheme: th.id })}
                      title={th.label}
                      className={`w-7 h-7 rounded-full transition-all border-2 cursor-pointer ${
                        isSelected ? 'scale-115 border-slate-900 shadow-md ring-2 ring-slate-400' : 'border-white hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: th.colorHex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Visual Pin Text Elements */}
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Oberer Tag / Badge Text
                </label>
                <input
                  type="text"
                  value={activePin.customBadge || ''}
                  placeholder="z.B. RATGEBER AB 50"
                  onChange={(e) => handleUpdateActivePin({ customBadge: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Branding Zeile oben
                </label>
                <input
                  type="text"
                  value={activePin.customBrandText || 'VITAL50.AT'}
                  onChange={(e) => handleUpdateActivePin({ customBrandText: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
                />
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Pin Headline (Scroll-Stopper auf Pinterest)
                </label>
                <span className="text-[11px] text-slate-400">{activePin.title.length}/100 Zeichen</span>
              </div>
              <input
                type="text"
                value={activePin.title}
                onChange={(e) => handleUpdateActivePin({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>

            {/* Sub-Hook / Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Sub-Headline / Teaser-Text im Pin
              </label>
              <input
                type="text"
                value={activePin.subHook || ''}
                placeholder="z.B. Warum Diäten scheitern & was den Stoffwechsel sofort aktiviert..."
                onChange={(e) => handleUpdateActivePin({ subHook: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>

            {/* CTA Button Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={activePin.ctaButtonText || 'Jetzt lesen →'}
                  onChange={(e) => handleUpdateActivePin({ ctaButtonText: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pinterest Board
                </label>
                <input
                  type="text"
                  value={activePin.board || 'Gesundheit & Vitalität 50+'}
                  onChange={(e) => handleUpdateActivePin({ board: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* 3. Pinterest SEO Description & Hashtags */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                SEO-Beschreibung (für Pinterest Suchalgorithmus)
              </label>
              <span className={`text-[11px] font-semibold ${
                (activePin.description?.length || 0) > 480 ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {activePin.description?.length || 0} / 500 Zeichen
              </span>
            </div>
            <textarea
              rows={3}
              value={activePin.description}
              onChange={(e) => handleUpdateActivePin({ description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          {/* 4. Tracking & UTM Link Preview */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                UTM-Tracking Link (Automatisch generiert)
              </span>
              <button
                type="button"
                onClick={() => handleCopyText(utmUrl, `utm_${activePin.id}`)}
                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
              >
                {copiedId === `utm_${activePin.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === `utm_${activePin.id}` ? 'Kopiert' : 'Link kopieren'}</span>
              </button>
            </div>
            <p className="text-[11px] font-mono text-emerald-950 bg-white p-2 rounded-lg border border-emerald-300 break-all">
              {utmUrl}
            </p>
          </div>

          {/* Keywords / Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">SEO Hashtags</label>
            <div className="flex flex-wrap gap-1.5">
              {activePin.keywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-lg">
                  #{kw.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pinterest Publishing Modal */}
      <PinterestPublishModal
        pin={activePin}
        projectSettings={projectSettings}
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPinPublished={(updated) => handleUpdateActivePin(updated)}
      />

      {/* Pinterest Background Image Picker Modal */}
      <PinterestImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        currentImageUrl={activePin.imageUrl}
        topic={topic}
        angle={activePin.angle}
        imagePrompt={activePin.imagePrompt}
        onSelectImage={(url) => handleUpdateActivePin({ imageUrl: url })}
      />
    </div>
  );
};

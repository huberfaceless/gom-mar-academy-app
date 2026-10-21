import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Upload, 
  Sparkles, 
  Check, 
  Link2, 
  Search,
  Loader2 
} from 'lucide-react';
import { CURATED_HEALTH_PHOTOS } from '../../utils/pinterestCanvasRenderer';
import { pinterestService } from '../../services/pinterestService';

interface PinterestImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl?: string;
  topic: string;
  angle: string;
  imagePrompt: string;
  onSelectImage: (imageUrl: string) => void;
}

export const PinterestImagePickerModal: React.FC<PinterestImagePickerModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  topic,
  angle,
  imagePrompt,
  onSelectImage,
}) => {
  const { language, hubText } = useContentHubCopy();
  const [selectedUrl, setSelectedUrl] = useState<string>(currentImageUrl || CURATED_HEALTH_PHOTOS[0].url);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'curated' | 'upload' | 'ai'>('curated');
  
  // AI Optimization
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>(imagePrompt || '');
  const [keywords, setKeywords] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setSelectedUrl(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptimizePrompt = async () => {
    setIsOptimizing(true);
    const res = await pinterestService.optimizeImagePrompt(topic, imagePrompt, angle);
    setIsOptimizing(false);
    if (res.success && res.optimizedPrompt) {
      setOptimizedPrompt(res.optimizedPrompt);
      if (res.stockKeywords) setKeywords(res.stockKeywords);
    }
  };

  const handleApply = () => {
    onSelectImage(selectedUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">{hubText("Hintergrundbild für Pin (1080×1620)")}</h3>
              <p className="text-xs text-slate-400">{hubText("Wähle kuratierte HD-Fotos, lade eigene Bilder hoch oder nutze KI-Prompts")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all ${
              activeTab === 'curated'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >{hubText("🖼️ Kuratierte Vital50 HD-Fotos")}</button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >{hubText("📤 Eigenes Bild / URL")}</button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all ${
              activeTab === 'ai'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >{hubText("✨ KI-Prompt & Imagen")}</button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {activeTab === 'curated' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {CURATED_HEALTH_PHOTOS.map((photo) => {
                const isSelected = selectedUrl === photo.url;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setSelectedUrl(photo.url)}
                    className={`group relative aspect-[2/3] rounded-xl overflow-hidden border-2 text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-between">
                      {isSelected ? (
                        <span className="self-end p-1 bg-emerald-500 text-white rounded-full">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : <span />}
                      <div>
                        <p className="text-[11px] font-bold text-white leading-tight">{photo.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {photo.tags.map((t) => (
                            <span key={t} className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50 hover:bg-emerald-50/40">
                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-700">{hubText("Bild vom Computer hochladen")}</span>
                <span className="text-xs text-slate-400 mt-1">{hubText("Empfohlen: 1080×1620 (JPG, PNG, WebP)")}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">{hubText("Oder Bild-URL einfügen")}</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={customUrlInput}
                      onChange={(e) => {
                        setCustomUrlInput(e.target.value);
                        if (e.target.value) setSelectedUrl(e.target.value);
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">{hubText("Optimierter Fotografie-Prompt für Bild-KI")}</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">{hubText("Generiere professionelle fotorealistische Prompts für Midjourney, Imagen oder DALL-E, abgestimmt auf die Zielgruppe 50+.")}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">{hubText("KI-Prompt (Englisch für Bildgeneratoren)")}</label>
                  <button
                    type="button"
                    onClick={handleOptimizePrompt}
                    disabled={isOptimizing}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 disabled:opacity-50"
                  >
                    {isOptimizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{hubText("Prompt mit KI verfeinern")}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={optimizedPrompt}
                  onChange={(e) => setOptimizedPrompt(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-hidden focus:bg-white focus:border-emerald-500"
                />
              </div>

              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-bold text-slate-500">{hubText("Such-Tags:")}</span>
                  {keywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-xl"
          >{hubText("Abbrechen")}</button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >{hubText("Bild für diesen Pin übernehmen")}</button>
        </div>
      </div>
    </div>
  );
};

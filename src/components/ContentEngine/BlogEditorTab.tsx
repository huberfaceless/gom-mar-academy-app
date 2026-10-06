import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Edit3, 
  Eye, 
  Clock, 
  Hash, 
  Sparkles, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { BlogArticle } from '../../types/contentEngine';

interface BlogEditorTabProps {
  article: BlogArticle;
  onChange: (updated: BlogArticle) => void;
  onGeneratePinterest: () => void;
  isGeneratingPinterest: boolean;
}

export const BlogEditorTab: React.FC<BlogEditorTabProps> = ({
  article,
  onChange,
  onGeneratePinterest,
  isGeneratingPinterest,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(article.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = article.contentMarkdown ? article.contentMarkdown.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start gap-4">
        <div className="w-full min-w-0 break-words">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Blogartikel generiert
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" />
                {wordCount} Wörter
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{readingTime} Min. Lesezeit
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{article.title}</h2>
          {article.metaDescription && (
            <p className="text-xs text-slate-500 mt-0.5 italic">"{article.metaDescription}"</p>
          )}
        </div>

        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          <div className="flex max-w-full flex-wrap bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Vorschau
            </button>
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'edit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Markdown Editor
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopiert!' : 'Artikel kopieren'}</span>
          </button>

          <button
            type="button"
            onClick={onGeneratePinterest}
            disabled={isGeneratingPinterest}
            className="max-w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{isGeneratingPinterest ? 'Generiere 5 Pinterest Pins...' : 'Weiter: 5 Pinterest Pins erzeugen'}</span>
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      {viewMode === 'edit' ? (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Artikel Titel (H1)</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => onChange({ ...article, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Meta Description</label>
            <input
              type="text"
              value={article.metaDescription}
              onChange={(e) => onChange({ ...article, metaDescription: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Artikel Inhalt (Markdown)</label>
            <textarea
              rows={22}
              value={article.contentMarkdown}
              onChange={(e) => onChange({ ...article, contentMarkdown: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm leading-relaxed text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs max-w-4xl mx-auto">
          <div className="prose prose-slate max-w-none space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              {article.title}
            </h1>
            
            {/* Simple Markdown Render view */}
            <div className="whitespace-pre-line text-slate-800 leading-relaxed text-base font-normal">
              {article.contentMarkdown}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React from 'react';
import { 
  FileText, 
  Target, 
  Search, 
  ListTree, 
  HelpCircle, 
  Link2, 
  Sparkles, 
  CheckCircle2, 
  Copy,
  Check
} from 'lucide-react';
import { ContentBrief } from '../../types/contentEngine';

interface BriefEditorTabProps {
  brief: ContentBrief;
  onChange: (updatedBrief: ContentBrief) => void;
  onGenerateBlog: () => void;
  isGeneratingBlog: boolean;
}

export const BriefEditorTab: React.FC<BriefEditorTabProps> = ({
  brief,
  onChange,
  onGenerateBlog,
  isGeneratingBlog,
}) => {
  const { language, hubText } = useContentHubCopy();
  const [copied, setCopied] = React.useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(brief, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 p-5 rounded-2xl border border-emerald-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">{hubText("Content Brief fertig")}</span>
            <span className="text-xs text-slate-500">{hubText("Fundament für Blog, Pinterest & YouTube")}</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mt-1">
            {brief.suggestedTitle || brief.h1}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">{hubText("Hauptkeyword:")}{' '}<strong className="text-emerald-700 font-bold">{brief.mainKeyword}</strong>{' '}{hubText("| Suchintention:")}{' '}<span className="uppercase font-mono text-[11px] bg-white px-1.5 py-0.5 rounded-sm border border-slate-200">{brief.searchIntent}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyJson}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? hubText("Kopiert") : hubText("JSON kopieren")}</span>
          </button>

          <button
            type="button"
            onClick={onGenerateBlog}
            disabled={isGeneratingBlog}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGeneratingBlog ? hubText("Generiere Blogartikel...") : hubText("Nächster Schritt: Blogartikel erzeugen")}</span>
          </button>
        </div>
      </div>

      {/* Grid with Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Metadata & SEO (1 col) */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-emerald-600" />
              SEO & Keywords
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{hubText("Haupt-Keyword")}</label>
              <input
                type="text"
                value={brief.mainKeyword}
                onChange={(e) => onChange({ ...brief, mainKeyword: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{hubText("Neben-Keywords")}</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {brief.secondaryKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={brief.metaDescription}
                onChange={(e) => onChange({ ...brief, metaDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden"
              />
              <span className="text-[10px] text-slate-400">{hubText("Zeichen:")}{' '}{brief.metaDescription?.length || 0} / 155</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />{hubText("Zielgruppe & CTA")}</h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{hubText("Zielgruppe")}</label>
              <input
                type="text"
                value={brief.targetAudience}
                onChange={(e) => onChange({ ...brief, targetAudience: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Call to Action (CTA)</label>
              <input
                type="text"
                value={brief.cta}
                onChange={(e) => onChange({ ...brief, cta: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-emerald-800 bg-emerald-50/50 border-emerald-200 focus:bg-white outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Outline & FAQs (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Outline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ListTree className="w-4 h-4 text-emerald-600" />{hubText("Geplante Artikelstruktur (Gliederung)")}</h4>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3">
              <p className="text-[11px] font-bold uppercase text-slate-400">{hubText("H1 Hauptüberschrift:")}</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{brief.h1 || brief.suggestedTitle}</p>
            </div>

            <div className="space-y-3">
              {brief.outline.map((section, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={section.h2}
                      onChange={(e) => {
                        const newOutline = [...brief.outline];
                        newOutline[idx].h2 = e.target.value;
                        onChange({ ...brief, outline: newOutline });
                      }}
                      className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:border-emerald-500 outline-hidden"
                    />
                  </div>

                  {section.h3s && section.h3s.length > 0 && (
                    <div className="pl-8 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{hubText("Unterabschnitte (H3):")}</p>
                      {section.h3s.map((h3, h3Idx) => (
                        <div key={h3Idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="text-emerald-500">•</span>
                          <span>{h3}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="pl-8 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {section.keyPoints.map((kp, kpIdx) => (
                          <span key={kpIdx} className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600">
                            ✓ {kp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {brief.faqTopics && brief.faqTopics.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />{hubText("Vorgeschlagene FAQ-Fragen für den Artikel")}</h4>
              <div className="space-y-2">
                {brief.faqTopics.map((faq, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900">Q: {faq.question}</p>
                    <p className="text-xs text-slate-600 mt-1">A: {faq.answerSummary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internal Linking Suggestions */}
          {brief.internalLinkingSuggestions && brief.internalLinkingSuggestions.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-600" />{hubText("Interne Verlinkungsvorschläge")}</h4>
              <div className="flex flex-wrap gap-2">
                {brief.internalLinkingSuggestions.map((link, i) => (
                  <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg">
                    🔗 {link}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

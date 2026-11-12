import React, { useState } from 'react';
import type { BlogArticle } from '../../types/contentEngine';
import { articleSeoDefaults } from '../../utils/blogSeoGeo';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

export function BlogSeoGeoPanel({ article, mainKeyword, onChange, onPrepare }: {
  article: BlogArticle; mainKeyword?: string; onChange: (article: BlogArticle) => void; onPrepare: () => Promise<void>;
}) {
  const { hubText } = useContentHubCopy();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fields = articleSeoDefaults(article, { mainKeyword });
  const prepare = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try { await onPrepare(); }
    catch (error) { setError(error instanceof Error ? error.message : hubText('SEO- und GEO-Daten konnten nicht vorbereitet werden.')); }
    finally { setBusy(false); }
  };
  return <section aria-label={hubText('SEO und GEO')} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
    <h3 className="font-bold">{hubText('SEO und GEO')}</h3>
    <p className="text-sm text-slate-600">{hubText('SEO-Titel, Beschreibung und Fokuskeyword werden an Rank Math übergeben, sobald die WordPress-Verbindung dafür eingerichtet ist. Die Kurzantwort erscheint sichtbar im Artikel.')}</p>
    <button type="button" disabled={busy} onClick={() => void prepare()} className="rounded-xl border px-4 py-2 font-semibold disabled:opacity-50">{busy ? hubText('SEO und GEO werden vorbereitet…') : hubText('SEO und GEO vorbereiten')}</button>
    <div className="grid gap-3 md:grid-cols-2">
      <label className="text-sm font-semibold">{hubText('SEO-Titel')}<input value={fields.seoTitle} maxLength={200} onChange={e => onChange({ ...article, seoTitle: e.target.value })} className="mt-1 w-full rounded-xl border p-2" /><span className="text-xs font-normal text-slate-500">{fields.seoTitle.length} / 60 {hubText('Zeichen als Richtwert')}</span></label>
      <label className="text-sm font-semibold">{hubText('Fokuskeyword')}<input value={fields.focusKeyword} maxLength={150} onChange={e => onChange({ ...article, focusKeyword: e.target.value })} className="mt-1 w-full rounded-xl border p-2" /></label>
    </div>
    <label className="block text-sm font-semibold">{hubText('SEO-Beschreibung')}<textarea rows={2} value={fields.metaDescription} maxLength={500} onChange={e => onChange({ ...article, metaDescription: e.target.value })} className="mt-1 w-full rounded-xl border p-2" /><span className="text-xs font-normal text-slate-500">{fields.metaDescription.length} / 160 {hubText('Zeichen als Richtwert')}</span></label>
    <label className="block text-sm font-semibold">{hubText('GEO-Kurzantwort')}<textarea rows={4} value={fields.answerSummary} maxLength={1200} onChange={e => onChange({ ...article, answerSummary: e.target.value })} className="mt-1 w-full rounded-xl border p-2" /></label>
    <p className="text-xs text-slate-500">{hubText('Vor der Veröffentlichung fachlich prüfen. Die Kurzantwort fasst den Artikel zusammen; sie ist kein Nachweis für die Richtigkeit seiner Aussagen.')}</p>
    {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
  </section>;
}

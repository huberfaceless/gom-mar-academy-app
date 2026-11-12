import React, { useEffect, useRef, useState } from 'react';
import type { BlogArticle } from '../../types/contentEngine';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { BLOG_REFERENCES, isWordPressImageUrl, type BlogReference } from '../../utils/blogReferences';
import { inspectBlogSeo, keywordHeadingProposal, applyKeywordHeading, keywordDescriptionProposal } from '../../utils/blogSeoCheck';
import { articleSeoDefaults } from '../../utils/blogSeoGeo';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

type Image = { id: number; url: string; alt: string; title: string };
const jsonRequest = async (url: string, init?: RequestInit) => {
  const response = await authenticatedFetch(url, init); const value = await response.json();
  if (!response.ok) throw new Error(value.error || 'Die Anfrage ist fehlgeschlagen.');
  return value;
};
export function BlogSeoCheckPanel({ article, mainKeyword, contentId, onChange }: { article: BlogArticle; mainKeyword?: string; contentId?: string; onChange: (value: BlogArticle) => void }) {
  const { hubText } = useContentHubCopy();
  const check = inspectBlogSeo(article, mainKeyword);
  const fields = articleSeoDefaults(article, { mainKeyword });
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [sources, setSources] = useState<BlogReference[] | null>(null);
  const [images, setImages] = useState<Image[]>([]), [search, setSearch] = useState('');
  const latest = useRef(article), alive = useRef(true); latest.current = article;
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const heading = keywordHeadingProposal(article, check.keyword);
  const sourceQuery = `${article.title}\n${check.keyword}`;
  const latestQuery = useRef(sourceQuery); latestQuery.current = sourceQuery;
  useEffect(() => { setSources(null); }, [sourceQuery]);
  const run = async (action: () => Promise<void>) => {
    if (busy) return; setBusy(true); setError('');
    try { await action(); } catch (error) { if (alive.current) setError(error instanceof Error ? error.message : hubText('Die Anfrage ist fehlgeschlagen.')); }
    finally { if (alive.current) setBusy(false); }
  };
  const findSources = () => run(async () => {
    const response = await jsonRequest('/api/content-engine/reference-suggestions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: article.title, mainKeyword: check.keyword }) });
    if (alive.current && latestQuery.current === sourceQuery) setSources(response.sources);
  });
  const loadImages = (event?: React.FormEvent) => { event?.preventDefault(); return run(async () => {
    const result = await jsonRequest(`/api/wordpress/${encodeURIComponent(contentId!)}/media?search=${encodeURIComponent(search)}`);
    if (alive.current) setImages(result.images);
  }); };
  const upload = (file?: File) => run(async () => {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024) throw new Error(hubText('Bitte PNG, JPEG oder WebP bis 4 MB auswählen.'));
    const image = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); });
    const result = await jsonRequest(`/api/wordpress/${encodeURIComponent(contentId!)}/media`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image }) });
    if (alive.current) onChange({ ...latest.current, wordpressImage: { id: result.image.id, url: result.image.url, alt: result.image.alt || '', featured: false } });
  });
  return <section aria-label={hubText('SEO-Check vor der Übertragung')} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
    <h3 className="font-bold">{hubText('SEO-Check vor der Übertragung')}</h3>
    <p className="text-sm text-slate-600">{hubText('Hinweise zur Gestaltung, kein Google-Rankingwert. Vorschläge werden erst nach deinem Klick übernommen.')}</p>
    <ul className="space-y-2 text-sm">
      {[[check.title, 'Fokuskeyword im SEO-Titel'], [check.description, 'Fokuskeyword in der SEO-Beschreibung'], [check.heading, 'Fokuskeyword in einer Zwischenüberschrift'], [check.image, 'Artikelbild mit Alt-Text']].map(([ok, label]) => <li key={String(label)}>{ok ? '✓' : '○'} {hubText(String(label))}</li>)}
    </ul>
    <p className="text-sm">{hubText('Nennungen im Artikeltext:')} {check.occurrences}. {hubText('Natürlich formulieren; keine feste Keyword-Dichte erzwingen.')}</p>
    {!check.title && check.keyword && <button type="button" onClick={() => onChange({ ...article, seoTitle: `${check.keyword}: ${fields.seoTitle}`.slice(0, 200) })} className="mr-3 text-sm underline">{hubText('Fokuskeyword im SEO-Titel ergänzen')}</button>}
    {!check.description && check.keyword && <div className="text-sm"><p>{hubText('Vorschlag für die Beschreibung:')} {keywordDescriptionProposal(fields.metaDescription, check.keyword)}</p><button type="button" onClick={() => onChange({ ...article, metaDescription: keywordDescriptionProposal(fields.metaDescription, check.keyword) })} className="underline">{hubText('Beschreibung übernehmen')}</button></div>}
    {!check.heading && heading && <div className="text-sm"><p>{hubText('Vorschlag für die erste Zwischenüberschrift:')} {heading.replace(/^#+ /, '')}</p><button type="button" onClick={() => onChange(applyKeywordHeading(article, check.keyword))} className="underline">{hubText('Zwischenüberschrift übernehmen')}</button></div>}
    {contentId && <div className="space-y-2 border-t pt-3">
      <label className="block text-sm font-semibold">{hubText('Kurzer WordPress-URL-Slug')}<input value={article.wordpressSlug || ''} maxLength={80} placeholder={check.suggestedSlug} onChange={e => onChange({ ...article, wordpressSlug: e.target.value })} className="mt-1 w-full rounded-xl border p-2" /></label>
      <button type="button" onClick={() => onChange({ ...article, wordpressSlug: check.suggestedSlug })} className="text-sm underline">{hubText('URL-Vorschlag übernehmen')}: {check.suggestedSlug}</button>
      <p className="text-xs text-slate-600">{hubText('Leer lassen behält die bisherige URL. Geändert werden ausschließlich WordPress-Entwürfe.')}</p>
      <h4 className="font-semibold">{hubText('Artikelbild aus WordPress')}</h4>
      <form onSubmit={loadImages} className="flex flex-wrap gap-2"><input aria-label={hubText('Mediathek durchsuchen')} value={search} maxLength={100} onChange={e => setSearch(e.target.value)} className="rounded-xl border p-2" /><button disabled={busy} className="rounded-xl border px-3 py-2 disabled:opacity-50">{hubText('Mediathek laden')}</button></form>
      <label className="block text-sm">{hubText('Eigenes Bild hochladen (bis 4 MB)')}<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }} className="mt-1 block max-w-full" /></label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{images.map(image => <button key={image.id} type="button" onClick={() => onChange({ ...article, wordpressImage: { id: image.id, url: image.url, alt: image.alt, featured: false } })} className="rounded-xl border p-2 text-left text-xs">{isWordPressImageUrl(image.url) && <img src={image.url} alt={image.alt || image.title} loading="lazy" className="h-24 w-full object-contain" />}{image.title}</button>)}</div>
      {article.wordpressImage && <div className="space-y-2">
        {isWordPressImageUrl(article.wordpressImage.url) && <img src={article.wordpressImage.url} alt={article.wordpressImage.alt} className="max-h-48 max-w-full object-contain" />}
        <label className="block text-sm font-semibold">{hubText('Alt-Text: Was zeigt das Bild?')}<input value={article.wordpressImage.alt} maxLength={300} onChange={e => onChange({ ...article, wordpressImage: { ...article.wordpressImage!, alt: e.target.value } })} className="mt-1 w-full rounded-xl border p-2" /></label>
        <label className="block text-sm"><input type="checkbox" checked={Boolean(article.wordpressImage.featured)} onChange={e => onChange({ ...article, wordpressImage: { ...article.wordpressImage!, featured: e.target.checked } })} /> {hubText('Zusätzlich als WordPress-Beitragsbild setzen')}</label>
        <p className="text-xs text-slate-600">{hubText('Das Bild erscheint im Artikeltext. Ein zusätzliches Beitragsbild kann je nach Theme doppelt erscheinen. Alt-Texte anderer Beiträge werden nicht geändert.')}</p>
        <button type="button" onClick={() => onChange({ ...article, wordpressImage: null })} className="text-sm underline">{hubText('Bildauswahl entfernen')}</button>
      </div>}
    </div>}
    <div className="space-y-2 border-t pt-3">
      <h4 className="font-semibold">{hubText('Redaktionelle Quellen')}</h4>
      <p className="text-xs text-slate-600">{hubText('Vorschläge aus dem recherchierten Vital50-Fachstellenbestand. Erreichbarkeit wird geprüft; die fachliche Passung zum Artikel bitte selbst prüfen.')}</p>
      <button type="button" disabled={busy} onClick={() => void findSources()} className="text-sm underline disabled:opacity-50">{hubText('Passende Quellen prüfen')}</button>
      {sources?.length === 0 && <p role="status" className="text-sm">{hubText('Keine erreichbare passende Quelle im aktuellen Fachstellenbestand gefunden.')}</p>}
      {BLOG_REFERENCES.filter(source => article.referenceIds?.includes(source.id) || sources?.some(item => item.id === source.id)).map(source => <label key={source.id} className="block text-sm"><input type="checkbox" checked={Boolean(article.referenceIds?.includes(source.id))} onChange={e => onChange({ ...article, referenceIds: e.target.checked ? [...new Set([...(article.referenceIds || []), source.id])] : (article.referenceIds || []).filter(id => id !== source.id) })} /> {source.publisher}: <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.title}</a></label>)}
    </div>
    {busy && <p role="status" className="text-sm">{hubText('Bitte warten…')}</p>}
    {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
  </section>;
}

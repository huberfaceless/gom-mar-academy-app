import React, { useEffect, useRef, useState } from 'react';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { validateCampaignArticle, type CampaignArticle } from '../../utils/articleCampaign';
import type { BlogArticle, CentralContentProject, ProjectSettings } from '../../types/contentEngine';

type WordPressArticle = CampaignArticle & { id: number };
interface Props {
  projects: CentralContentProject[];
  settings: ProjectSettings;
  wordpressAvailable: boolean;
  onClose: () => void;
  onStart: (source: CampaignArticle, original?: BlogArticle) => Promise<void>;
}
export function ArticleCampaignModal({ projects, settings, wordpressAvailable, onClose, onStart }: Props) {
  const { hubText } = useContentHubCopy();
  const [mode, setMode] = useState<'academy' | 'wordpress' | 'url' | 'text'>(wordpressAvailable ? 'url' : 'academy');
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [posts, setPosts] = useState<WordPressArticle[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState<CampaignArticle | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const alive = useRef(true);
  const locked = useRef(false);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const articles = projects.filter(project => project.blogArticle && !project.campaignSource);
  const imported = mode === 'wordpress' || mode === 'url';
  const visiblePosts = posts.filter(post => post.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  const clearPreview = () => { setPreview(null); setReviewed(false); setError(''); };
  const request = async (postId?: number, requestedPage = 1, articleUrl?: string) => {
    const res = await authenticatedFetch('/api/content-engine/campaign-articles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectSettings: settings, postId, page: requestedPage, articleUrl }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || hubText('Artikel konnten nicht geladen werden.'));
    return data as { posts: WordPressArticle[]; hasMore: boolean };
  };
  const load = async (reset = false) => {
    if (locked.current) return;
    locked.current = true; setBusy(true); setError('');
    if (reset) { setSelected(''); setPreview(null); setReviewed(false); }
    const requestedPage = reset ? 1 : page;
    try {
      const data = await request(undefined, requestedPage);
      if (alive.current) {
        setPosts(old => Array.from(new Map((reset ? data.posts : [...old, ...data.posts]).map(post => [post.id, post])).values()));
        setHasMore(data.hasMore); setPage(requestedPage + 1);
      }
    } catch (err) { if (alive.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { locked.current = false; if (alive.current) setBusy(false); }
  };
  const loadPreview = async () => {
    if (locked.current) return;
    locked.current = true; setBusy(true); clearPreview();
    try {
      const data = mode === 'url' ? await request(undefined, 1, url) : await request(Number(selected));
      const source = validateCampaignArticle(data.posts[0]);
      if (alive.current) setPreview(source);
    } catch (err) { if (alive.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { locked.current = false; if (alive.current) setBusy(false); }
  };
  const start = async () => {
    if (locked.current) return;
    locked.current = true; setBusy(true); setError('');
    try {
      let source: CampaignArticle = { title, contentMarkdown: content, url };
      let original: BlogArticle | undefined;
      if (mode === 'academy') {
        original = articles.find(item => item.id === selected)?.blogArticle;
        if (!original) throw new Error(hubText('Bitte einen Artikel auswählen.'));
        source = { title: original.title, contentMarkdown: original.contentMarkdown, url };
      } else if (imported) {
        if (!preview || !reviewed) throw new Error(hubText('Bitte den Artikel laden und die Vorschau prüfen.'));
        // Generate from exactly the snapshot the user reviewed, without a second read.
        source = preview;
      }
      source = validateCampaignArticle(source);
      if (!alive.current) return;
      await onStart(source, original);
      if (alive.current) onClose();
    } catch (err) { if (alive.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { locked.current = false; if (alive.current) setBusy(false); }
  };
  return <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="article-campaign-title" className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 text-slate-900">
      <h2 id="article-campaign-title" className="text-xl font-bold">{hubText('Kampagne aus vorhandenem Artikel')}</h2>
      <p>{hubText('Erstellt 5 Pinterest-Pins, 5 Instagram-Beiträge, ein YouTube-Skript und 3 Shorts als neuen Inhaltsablauf. Termine und Veröffentlichung gibst du danach im Kalender frei.')}</p>
      <p className="text-sm text-slate-600">{hubText('Der ursprüngliche Artikel bleibt erhalten. Es wird kein neuer Blogartikel erzeugt oder veröffentlicht.')}</p>
      <label className="block font-semibold">{hubText('Artikelquelle')}
        <select disabled={busy} value={mode} onChange={event => { setMode(event.target.value as typeof mode); setSelected(''); setUrl(''); clearPreview(); }} className="block border rounded-xl p-3 w-full mt-1">
          {wordpressAvailable && <option value="url">{hubText('Artikel über Link laden')}</option>}
          {wordpressAvailable && <option value="wordpress">{hubText('Veröffentlichter WordPress-Artikel')}</option>}
          <option value="academy">{hubText('Gespeicherter Academy-Artikel')}</option>
          <option value="text">{hubText('Artikeltext übernehmen')}</option>
        </select>
      </label>
      {mode === 'academy' && <label className="block font-semibold">{hubText('Artikel auswählen')}
        <select disabled={busy} value={selected} onChange={event => { setSelected(event.target.value); setUrl(articles.find(item => item.id === event.target.value)?.blogArticle?.publishedUrl || ''); }} className="block border rounded-xl p-3 w-full mt-1">
          <option value="">{hubText('Bitte einen Artikel auswählen.')}</option>
          {articles.map(item => <option key={item.id} value={item.id}>{item.blogArticle?.title}</option>)}
        </select>
      </label>}
      {mode === 'url' && <>
        <label className="block font-semibold">{hubText('Link zum einzulesenden WordPress-Artikel')}
          <input type="url" disabled={busy} value={url} maxLength={2048} placeholder="https://…/mein-artikel/" onChange={event => { setUrl(event.target.value); clearPreview(); }} className="block border rounded-xl p-3 w-full mt-1" />
        </label>
        <p className="text-sm text-slate-600">{hubText('Titel und Text werden aus dem veröffentlichten Artikel geladen. Danach prüfst du die Vorschau.')}</p>
        <button type="button" disabled={busy || !url.trim()} onClick={() => void loadPreview()} className="rounded-xl border p-3 disabled:opacity-50">{hubText('Artikel laden')}</button>
      </>}
      {mode === 'wordpress' && <>
        <button type="button" disabled={busy} onClick={() => void load(true)} className="underline disabled:opacity-50">{hubText(posts.length ? 'Artikel neu laden' : 'WordPress-Artikel laden')}</button>
        {!!posts.length && <>
          <label className="block font-semibold">{hubText('Geladene Artikel durchsuchen')}
            <input type="search" disabled={busy} value={search} onChange={event => { setSearch(event.target.value); setSelected(''); clearPreview(); }} className="block border rounded-xl p-3 w-full mt-1" />
          </label>
          <label className="block font-semibold">{hubText('Artikel auswählen')}
            <select value={selected} disabled={busy} onChange={event => { setSelected(event.target.value); clearPreview(); }} className="block border rounded-xl p-3 w-full mt-1">
              <option value="">{hubText('Bitte einen Artikel auswählen.')}</option>
              {visiblePosts.map(post => <option key={post.id} value={post.id}>{post.title}</option>)}
            </select>
          </label>
        </>}
        {hasMore && <button type="button" disabled={busy} onClick={() => void load()} className="underline disabled:opacity-50">{hubText('Weitere Artikel laden')}</button>}
        {!!posts.length && !hasMore && <p className="text-sm">{hubText('Alle veröffentlichten Artikel wurden geladen.')}</p>}
        {!!selected && <button type="button" disabled={busy} onClick={() => void loadPreview()} className="rounded-xl border p-3 disabled:opacity-50">{hubText('Artikel laden')}</button>}
      </>}
      {mode === 'text' && <>
        <label className="block font-semibold">{hubText('Artikeltitel')}<input disabled={busy} maxLength={500} value={title} onChange={event => setTitle(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>
        <label className="block font-semibold">{hubText('Vorhandener Artikeltext')}<textarea disabled={busy} maxLength={60000} rows={7} value={content} onChange={event => setContent(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>
      </>}
      {imported && preview && <div className="border rounded-xl p-4 space-y-3 bg-slate-50">
        <h3 className="font-bold">{hubText('Eingelesenen Artikel prüfen')}</h3>
        <p className="font-semibold">{preview.title}</p>
        <p className="text-sm break-all">{preview.url}</p>
        <label className="block">{hubText('Vorhandener Artikeltext')}
          <textarea readOnly rows={10} value={preview.contentMarkdown} className="block border rounded-xl p-3 w-full mt-1 bg-white font-normal" />
        </label>
        <label className="flex gap-2 items-start">
          <input type="checkbox" disabled={busy} checked={reviewed} onChange={event => setReviewed(event.target.checked)} className="mt-1" />
          <span>{hubText('Ich habe geprüft, dass der richtige Artikel vollständig eingelesen wurde.')}</span>
        </label>
      </div>}
      {!imported && <label className="block font-semibold">{hubText('Zieladresse der Kampagnenbeiträge')}<input type="url" disabled={busy} value={url} maxLength={2048} placeholder="https://…/mein-artikel/" onChange={event => setUrl(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>}
      {imported && preview && <p className="text-sm break-all"><strong>{hubText('Zieladresse der Kampagnenbeiträge')}: </strong>{preview.url}</p>}
      <p className="text-sm text-slate-600">{hubText('Alle Kampagneninhalte verweisen auf diesen Artikellink. Die Erstellung verwendet KI und kann einige Minuten dauern.')}</p>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <div className="flex justify-end gap-4">
        <button type="button" disabled={busy} onClick={onClose}>{hubText('Abbrechen')}</button>
        <button type="button" disabled={busy || (mode === 'academy' && !selected) || (imported && (!preview || !reviewed))} onClick={() => void start()} className="rounded-xl bg-emerald-700 text-white font-bold p-3 disabled:opacity-50">{hubText(busy ? 'Kampagne wird vorbereitet…' : 'Kampagne erstellen')}</button>
      </div>
    </section>
  </div>;
}

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
  const [mode, setMode] = useState<'academy' | 'wordpress' | 'text'>('academy');
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [posts, setPosts] = useState<WordPressArticle[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const alive = useRef(true);
  const locked = useRef(false);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const articles = projects.filter(project => project.blogArticle && !project.campaignSource);
  const request = async (postId?: number, requestedPage = 1) => {
    const res = await authenticatedFetch('/api/content-engine/campaign-articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectSettings: settings, postId, page: requestedPage }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || hubText('Artikel konnten nicht geladen werden.'));
    return data as { posts: WordPressArticle[]; hasMore: boolean };
  };
  const load = async () => {
    if (locked.current) return;
    locked.current = true; setBusy(true); setError('');
    try {
      const data = await request(undefined, page);
      if (alive.current) { setPosts(old => [...old, ...data.posts]); setHasMore(data.hasMore); setPage(page + 1); }
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
      } else if (mode === 'wordpress') {
        if (!selected) throw new Error(hubText('Bitte einen Artikel auswählen.'));
        const data = await request(Number(selected));
        source = data.posts[0];
        if (!source) throw new Error(hubText('Bitte einen Artikel auswählen.'));
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
        <select disabled={busy} value={mode} onChange={event => { setMode(event.target.value as typeof mode); setSelected(''); setUrl(''); setError(''); }} className="block border rounded-xl p-3 w-full mt-1">
          <option value="academy">{hubText('Gespeicherter Academy-Artikel')}</option>
          {wordpressAvailable && <option value="wordpress">{hubText('Veröffentlichter WordPress-Artikel')}</option>}
          <option value="text">{hubText('Artikeltext übernehmen')}</option>
        </select>
      </label>
      {mode === 'academy' && <label className="block font-semibold">{hubText('Artikel auswählen')}
        <select disabled={busy} value={selected} onChange={event => { setSelected(event.target.value); setUrl(articles.find(item => item.id === event.target.value)?.blogArticle?.publishedUrl || ''); }} className="block border rounded-xl p-3 w-full mt-1">
          <option value="">{hubText('Bitte einen Artikel auswählen.')}</option>
          {articles.map(item => <option key={item.id} value={item.id}>{item.blogArticle?.title}</option>)}
        </select>
      </label>}
      {mode === 'wordpress' && <>
        <button type="button" disabled={busy || (!!posts.length && !hasMore)} onClick={() => void load()} className="underline disabled:opacity-50">{hubText(posts.length ? 'Weitere Artikel laden' : 'WordPress-Artikel laden')}</button>
        {!!posts.length && <label className="block font-semibold">{hubText('Artikel auswählen')}
          <select value={selected} disabled={busy} onChange={event => setSelected(event.target.value)} className="block border rounded-xl p-3 w-full mt-1">
            <option value="">{hubText('Bitte einen Artikel auswählen.')}</option>
            {posts.map(post => <option key={post.id} value={post.id}>{post.title}</option>)}
          </select>
          <p className="text-sm font-normal break-all mt-2">{posts.find(post => String(post.id) === selected)?.url}</p>
        </label>}
        {!!posts.length && !hasMore && <p className="text-sm">{hubText('Alle veröffentlichten Artikel wurden geladen.')}</p>}
      </>}
      {mode === 'text' && <>
        <label className="block font-semibold">{hubText('Artikeltitel')}<input disabled={busy} maxLength={500} value={title} onChange={event => setTitle(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>
        <label className="block font-semibold">{hubText('Vorhandener Artikeltext')}<textarea disabled={busy} maxLength={60000} rows={7} value={content} onChange={event => setContent(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>
      </>}
      {mode !== 'wordpress' && <label className="block font-semibold">{hubText('Link zum Blogartikel')}<input type="url" disabled={busy} value={url} maxLength={2048} placeholder="https://…/mein-artikel/" onChange={event => setUrl(event.target.value)} className="block border rounded-xl p-3 w-full mt-1" /></label>}
      <p className="text-sm text-slate-600">{hubText('Alle Kampagneninhalte verweisen auf diesen Artikellink. Die Erstellung verwendet KI und kann einige Minuten dauern.')}</p>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <div className="flex justify-end gap-4">
        <button type="button" disabled={busy} onClick={onClose}>{hubText('Abbrechen')}</button>
        <button type="button" disabled={busy || (mode !== 'text' && !selected)} onClick={() => void start()} className="rounded-xl bg-emerald-700 text-white font-bold p-3 disabled:opacity-50">{hubText(busy ? 'Kampagne wird vorbereitet…' : 'Kampagne erstellen')}</button>
      </div>
    </section>
  </div>;
}

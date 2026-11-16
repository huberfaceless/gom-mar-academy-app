import { GOMO_WORDPRESS_ORIGIN } from '../../utils/wordpressSites';
import { type WordPressCategory } from '../../utils/vital50BlogCategories';
import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

type Status = { configured: boolean; connected: boolean; siteUrl: string; seoProvider?: 'rank-math' | 'seopress'; draft: { state: string; postId: number | null; editUrl: string | null; seoProvider?: 'rank-math' | 'seopress'; postStatus?: string; publishedUrl?: string; seoStatus?: string; slug?: string } | null };
const api = async (id: string, action: string, init: RequestInit = {}) => {
  const response = await authenticatedFetch(`/api/wordpress/${encodeURIComponent(id)}/${action}`, init);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'WordPress-Anfrage fehlgeschlagen.');
  return data;
};
export const WordPressDraftPanel: React.FC<{ contentId: string; savedCategorySlug?: string; onPublished?: (url: string) => Promise<void>; onSave: (categorySlug: string) => Promise<boolean> }> = ({ contentId, savedCategorySlug, onSave, onPublished }) => {
  const { hubText } = useContentHubCopy();
  const [status, setStatus] = useState<Status | null>(null);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [categorySlug, setCategorySlug] = useState(savedCategorySlug || '');
  const [categoryError, setCategoryError] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryReload, setCategoryReload] = useState(0);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [seoReady, setSeoReady] = useState<boolean | null>(null);
  const [seoError, setSeoError] = useState('');
  const [error, setError] = useState('');
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  useEffect(() => {
    let cancelled = false;
    void api(contentId, 'status').then(value => { if (!cancelled) setStatus(value); })
      .catch(error => { if (!cancelled) setError(error.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [contentId]);
  useEffect(() => {
    if (!status?.connected) { setCategories([]); return; }
    let cancelled = false;
    setCategoryLoading(true); setCategoryError('');
    void api(contentId, 'categories').then(value => {
      if (cancelled) return;
      setCategories(value.categories);
      setCategorySlug(current => current || savedCategorySlug || value.suggestedSlug || '');
    }).catch(error => { if (!cancelled) { setCategories([]); setCategoryError(error.message); } })
      .finally(() => { if (!cancelled) setCategoryLoading(false); });
    return () => { cancelled = true; };
  }, [contentId, status?.connected, categoryReload, savedCategorySlug]);
  useEffect(() => {
    if (!status?.connected) { setSeoReady(null); setSchemaReady(null); return; }
    let cancelled = false;
    void api(contentId, 'seo').then(value => { if (!cancelled) { setSeoReady(value.ready); setSchemaReady(value.schemaReady === true); } })
      .catch(() => { if (!cancelled) setSeoReady(null); });
    return () => { cancelled = true; };
  }, [contentId, status?.connected]);
  const checkSeo = async () => {
    setBusy(true); setSeoError('');
    try { const value = await api(contentId, 'seo'); setSeoReady(value.ready); setSchemaReady(value.schemaReady === true); }
    catch (error) { setSeoError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { setBusy(false); }
  };
  const downloadSeoPlugin = async () => {
    setBusy(true); setSeoError('');
    try {
      const response = await authenticatedFetch(`/api/wordpress/${encodeURIComponent(contentId)}/seo-plugin`);
      if (!response.ok) throw new Error(hubText('Das SEO-Zusatzplugin konnte nicht geladen werden.'));
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'gommar-academy-seo.zip';
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) { setSeoError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { setBusy(false); }
  };
  const publishNow = status?.siteUrl === GOMO_WORDPRESS_ORIGIN;
  const usesSeopress = status?.seoProvider === 'seopress';
  const published = status?.draft?.postStatus === 'publish';
  const enableSchema = async () => {
    setBusy(true); setError(''); setNotice('');
    try {
      await api(contentId, 'schema', { method: 'POST' });
      setNotice(hubText('BlogPosting wurde für diesen Beitrag aktiviert. Bitte den WordPress-Cache leeren und die SEO-Analyse erneut starten.'));
    } catch (error) { setError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { setBusy(false); }
  };
  const validCategory = categories.some(c => c.slug === categorySlug);
  const refresh = async () => setStatus(await api(contentId, 'status'));
  const connect = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await api(contentId, 'connection', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      setUsername(''); await refresh();
    } catch (error) { setError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { setPassword(''); setBusy(false); }
  };
  const transfer = async () => {
    setBusy(true); setError(''); setNotice('');
    try {
      if (!validCategory) throw new Error(hubText('Bitte eine Kategorie auswählen.'));
      if (!await onSave(categorySlug)) throw new Error(hubText('Bitte den Artikel zuerst erfolgreich in der Cloud speichern.'));
      const result = await api(contentId, publishNow ? 'publish' : 'draft', { method: 'POST' });
      if (result.status === 'publish') { await onPublished?.(result.publishedUrl); setNotice(hubText('Der Artikel ist auf gomo-marketing.at veröffentlicht. SEO-Daten wurden bestätigt.')); return; }
      setNotice(hubText('Der Artikel wurde als WordPress-Entwurf gespeichert. Bitte in WordPress prüfen und dort veröffentlichen.'));
    } catch (error) { setError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { try { await refresh(); } catch { /* Keep the original result visible. */ } setBusy(false); }
  };
  const disconnect = async () => {
    setBusy(true); setError(''); setNotice('');
    try { await api(contentId, 'connection', { method: 'DELETE' }); await refresh(); }
    catch (error) { setError(error instanceof Error ? error.message : hubText('WordPress-Anfrage fehlgeschlagen.')); }
    finally { setBusy(false); }
  };
  return <section aria-label={hubText('WordPress-Entwurf')} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
    <h3 className="font-bold text-slate-900">{publishNow ? hubText('WordPress · gomo-marketing.at · Sofort veröffentlichen') : `${hubText('WordPress-Entwurf')} · Vital50`}</h3>
    <p className="text-sm text-slate-600">{publishNow ? hubText('Neue Artikel werden nach erfolgreicher Cloud-Speicherung automatisch veröffentlicht. Bestehende Artikel kannst du hier sofort veröffentlichen. SEO, GEO-Kurzantwort und Kategorie werden mit übertragen.') : hubText('Übertrage diesen Artikel direkt nach Vital50. Die Veröffentlichung erfolgt anschließend in WordPress.')}</p>
    {loading && <p role="status">{hubText('Verbindung wird geprüft…')}</p>}
    {status && !status.configured && <p className="text-sm text-amber-800">{hubText('Die WordPress-Verbindung muss zuerst auf dem Academy-Server eingerichtet werden.')}</p>}
    {status?.configured && !status.connected && <form onSubmit={connect} className="flex max-w-xl flex-col gap-3">
      <label className="text-sm font-semibold">{hubText('WordPress-Benutzername')}<input required autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} disabled={busy} className="mt-1 w-full rounded-xl border p-2" /></label>
      <label className="text-sm font-semibold">{hubText('WordPress-Anwendungspasswort')}<input required type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} disabled={busy} className="mt-1 w-full rounded-xl border p-2" /></label>
      <p className="text-xs text-slate-600">{hubText('Erstelle das Anwendungspasswort in WordPress unter Benutzer → Profil. Verwende hierfür ein separates Passwort für die Academy.')}</p>
      <button disabled={busy} className="self-start rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white disabled:opacity-50">{hubText('WordPress verbinden')}</button>
    </form>}
    {status?.connected && <div className="space-y-2 rounded-xl bg-slate-50 p-3 text-sm">
      <p className="font-semibold">{usesSeopress ? seoReady === true ? hubText('SEOPress-Übertragung ist eingerichtet.') : hubText('SEOPress-Übertragung ist noch nicht bestätigt.') : seoReady === true ? hubText('Rank-Math-Übertragung ist eingerichtet.') : hubText('Rank-Math-Übertragung ist noch nicht bestätigt.')}</p>
      {usesSeopress && <p>{hubText('SEOPress 10.4 überträgt die SEO-Felder über seine vorhandene WordPress-API. Bei fehlendem Zugriff bitte SEOPress aktivieren und unter SEO → Erweitert → Sicherheit die Rollensperren für SEO-Metabox und Inhaltsanalyse prüfen.')}</p>}
      {usesSeopress && <div className="space-y-2 border-t pt-2">
        <p className="font-semibold">{schemaReady ? hubText('BlogPosting-Ausgabe ist eingerichtet.') : hubText('BlogPosting-Ausgabe noch nicht eingerichtet.')}</p>
        <p>{hubText('Einmalig Academy SEO Bridge 1.1.0 in WordPress hochladen, die vorhandene Version ersetzen und aktivieren. Danach SEO-Verbindung prüfen. Die Brücke ergänzt strukturierte Artikeldaten für neue Academy-Beiträge mit SEOPress Free. Vorhandene Artikel werden nicht automatisch geändert.')}</p>
        <button type="button" disabled={busy} onClick={() => void downloadSeoPlugin()} className="font-semibold underline">{hubText('Academy-Brücke 1.1.0 herunterladen')}</button>
        {published && schemaReady && <button type="button" disabled={busy} onClick={() => void enableSchema()} className="block font-semibold underline">{hubText('BlogPosting für diesen veröffentlichten Artikel aktivieren')}</button>}
      </div>}
      {seoReady === false && !usesSeopress && <>
        <p>{hubText('Einmalig das SEO-Zusatzplugin herunterladen und in WordPress unter Plugins → Neues Plugin → Plugin hochladen installieren und aktivieren. Rank Math muss aktiv sein.')}</p>
        <button type="button" disabled={busy} onClick={() => void downloadSeoPlugin()} className="font-semibold underline">{hubText('SEO-Zusatzplugin herunterladen')}</button>
      </>}
      <button type="button" disabled={busy} onClick={() => void checkSeo()} className="ml-3 underline">{hubText('SEO-Verbindung prüfen')}</button>
      {seoError && <p role="alert" className="text-rose-700">{seoError}</p>}
      {status.draft?.seoStatus === 'saved' && (status.draft.seoProvider || 'rank-math') === (status.seoProvider || 'rank-math') && <p role="status" className="text-emerald-800">{hubText('SEO-Daten wurden in WordPress gespeichert und zurückgelesen.')}</p>}
      {status.draft?.seoStatus === 'incomplete' && <p role="alert" className="text-amber-800">{hubText('Der Entwurf wurde gespeichert. Bitte SEO-Titel, Beschreibung und Fokuskeyword vervollständigen und erneut übertragen.')}</p>}
      {status.draft?.seoStatus === 'unavailable' && <p role="alert" className="text-amber-800">{hubText('Der Entwurf wurde gespeichert. Die SEO-Daten wurden noch nicht an das SEO-Plugin übertragen. Bitte die SEO-Verbindung einrichten und erneut übertragen.')}</p>}
      {status.draft?.seoStatus === 'unverified' && <p role="alert" className="text-amber-800">{hubText('Der Entwurf wurde gespeichert. Die SEO-Daten konnten nicht eindeutig bestätigt werden. Bitte im WordPress-Entwurf prüfen.')}</p>}
    </div>}
    {status?.connected && <div className="space-y-2">
      <label className="block text-sm font-semibold">{hubText('WordPress-Kategorie')}
        <select value={validCategory ? categorySlug : ''} onChange={e => setCategorySlug(e.target.value)} disabled={busy || categoryLoading} className="mt-1 w-full rounded-xl border p-2">
          <option value="">{hubText('Bitte eine Kategorie auswählen.')}</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </label>
      <p className="text-xs text-slate-600">{hubText('Ein passender Vorschlag wird automatisch ausgewählt. Du kannst ihn vor der Übertragung ändern. Die Auswahl wird mit dem Artikel gespeichert.')}</p>
      {categoryLoading && <p role="status">{hubText('Kategorien werden geladen…')}</p>}
      {categoryError && <p role="alert" className="text-sm text-rose-700">{categoryError}</p>}
      {!categoryLoading && !categoryError && !publishNow && categories.length < 5 && <p role="alert">{hubText('Nicht alle fünf Kategorien sind in WordPress verfügbar. Bitte dort prüfen.')}</p>}
      <button type="button" disabled={busy || categoryLoading} onClick={() => setCategoryReload(n => n + 1)} className="text-sm underline">{hubText('Kategorien neu laden')}</button>
    </div>}
    {status?.connected && <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-emerald-800">{hubText('WordPress verbunden')}</span>
      <button type="button" disabled={busy || published || categoryLoading || !validCategory || status.draft?.state === 'pending' || status.draft?.state === 'publishing'} onClick={() => void transfer()} className="rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white disabled:opacity-50">
        {busy ? hubText('Bitte warten…') : published ? hubText('Veröffentlicht') : publishNow ? hubText('Jetzt auf gomo-marketing.at veröffentlichen') : status.draft?.postId ? hubText('WordPress-Entwurf aktualisieren') : hubText('Als WordPress-Entwurf übertragen')}
      </button>
      <button type="button" disabled={busy} onClick={() => void disconnect()} className="text-sm underline disabled:opacity-50">{hubText('Verbindung trennen')}</button>
    </div>}
    {status?.draft?.publishedUrl && <a href={status.draft.publishedUrl} target="_blank" rel="noopener noreferrer" className="block font-semibold text-emerald-800 underline">{hubText("Veröffentlichten Artikel öffnen")}</a>}
    {status?.draft?.state === 'publishing' && <p role="alert">{hubText("Die Veröffentlichung wird noch geprüft. Bitte den Status erneut laden oder direkt in WordPress prüfen.")}</p>}
    <button type="button" onClick={() => void refresh().catch(e => setError(e.message))} className="underline">{hubText("WordPress-Status aktualisieren")}</button>
    {status?.draft?.slug && <p className="text-sm">{hubText('Gespeicherter URL-Slug:')} {status.draft.slug}</p>}
    {status?.draft?.editUrl && <a href={status.draft.editUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-emerald-800 underline">{published ? hubText('Beitrag in WordPress bearbeiten') : hubText('Entwurf in WordPress öffnen')}</a>}
    {status?.draft?.state === 'pending' && <p role="alert" className="text-sm text-amber-800">{hubText('Die letzte Übertragung ist noch nicht eindeutig bestätigt. Bitte die Entwürfe direkt in WordPress prüfen; ein erneutes Erstellen ist gesperrt.')}</p>}
    {notice && <p role="status" className="text-sm text-emerald-800">{notice}</p>}
    {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
  </section>;
};

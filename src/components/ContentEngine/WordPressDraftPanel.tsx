import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

type Status = { configured: boolean; connected: boolean; siteUrl: string; draft: { state: string; postId: number | null; editUrl: string | null } | null };
const api = async (id: string, action: string, init: RequestInit = {}) => {
  const response = await authenticatedFetch(`/api/wordpress/${encodeURIComponent(id)}/${action}`, init);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'WordPress-Anfrage fehlgeschlagen.');
  return data;
};
export const WordPressDraftPanel: React.FC<{ contentId: string; onSave: () => Promise<boolean> }> = ({ contentId, onSave }) => {
  const { hubText } = useContentHubCopy();
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    void api(contentId, 'status').then(value => { if (!cancelled) setStatus(value); })
      .catch(error => { if (!cancelled) setError(error.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [contentId]);
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
      if (!await onSave()) throw new Error(hubText('Bitte den Artikel zuerst erfolgreich in der Cloud speichern.'));
      await api(contentId, 'draft', { method: 'POST' });
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
    <h3 className="font-bold text-slate-900">{hubText('WordPress-Entwurf')} · Vital50</h3>
    <p className="text-sm text-slate-600">{hubText('Übertrage diesen Artikel direkt nach Vital50. Die Veröffentlichung erfolgt anschließend in WordPress.')}</p>
    {loading && <p role="status">{hubText('Verbindung wird geprüft…')}</p>}
    {status && !status.configured && <p className="text-sm text-amber-800">{hubText('Die WordPress-Verbindung muss zuerst auf dem Academy-Server eingerichtet werden.')}</p>}
    {status?.configured && !status.connected && <form onSubmit={connect} className="flex max-w-xl flex-col gap-3">
      <label className="text-sm font-semibold">{hubText('WordPress-Benutzername')}<input required autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} disabled={busy} className="mt-1 w-full rounded-xl border p-2" /></label>
      <label className="text-sm font-semibold">{hubText('WordPress-Anwendungspasswort')}<input required type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} disabled={busy} className="mt-1 w-full rounded-xl border p-2" /></label>
      <p className="text-xs text-slate-600">{hubText('Erstelle das Anwendungspasswort in WordPress unter Benutzer → Profil. Verwende hierfür ein separates Passwort für die Academy.')}</p>
      <button disabled={busy} className="self-start rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white disabled:opacity-50">{hubText('WordPress verbinden')}</button>
    </form>}
    {status?.connected && <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-emerald-800">{hubText('WordPress verbunden')}</span>
      <button type="button" disabled={busy || status.draft?.state === 'pending'} onClick={() => void transfer()} className="rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white disabled:opacity-50">
        {busy ? hubText('Bitte warten…') : status.draft?.postId ? hubText('WordPress-Entwurf aktualisieren') : hubText('Als WordPress-Entwurf übertragen')}
      </button>
      <button type="button" disabled={busy} onClick={() => void disconnect()} className="text-sm underline disabled:opacity-50">{hubText('Verbindung trennen')}</button>
    </div>}
    {status?.draft?.editUrl && <a href={status.draft.editUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-emerald-800 underline">{hubText('Entwurf in WordPress öffnen')}</a>}
    {status?.draft?.state === 'pending' && <p role="alert" className="text-sm text-amber-800">{hubText('Die letzte Übertragung ist noch nicht eindeutig bestätigt. Bitte die Entwürfe direkt in WordPress prüfen; ein erneutes Erstellen ist gesperrt.')}</p>}
    {notice && <p role="status" className="text-sm text-emerald-800">{notice}</p>}
    {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
  </section>;
};

import React, { useEffect, useRef, useState } from 'react';
import type { PinterestPin, ProjectSettings } from '../../types/contentEngine';
import { socialEditorialContent, type SocialChannel, type SocialEditorialContent } from '../../utils/socialEditorialReview';
import { renderPinToCanvas } from '../../utils/pinterestCanvasRenderer';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

interface Props {
  pin: PinterestPin;
  channel: SocialChannel;
  projectSettings: ProjectSettings;
  onClose: () => void;
  onSave: (content: SocialEditorialContent) => void | boolean | Promise<void | boolean>;
}
export function SocialEditorialReviewModal({ pin, channel, projectSettings, onClose, onSave }: Props) {
  const { hubText } = useContentHubCopy();
  const [draft, setDraft] = useState(() => socialEditorialContent(pin, channel));
  const [keywords, setKeywords] = useState(draft.keywords.join(', '));
  const [bullets, setBullets] = useState((draft.bulletPoints || []).join('\n'));
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [rendering, setRendering] = useState(true);
  let targetLink = '';
  try {
    const target = new URL(pin.targetUrl);
    if (['https:', 'http:'].includes(target.protocol) && !target.username && !target.password) targetLink = target.href;
  } catch { /* Saved invalid URLs are shown as text only. */ }
  const initial = useRef(JSON.stringify(pin));
  const alive = useRef(true);
  const lock = useRef(false);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => {
    let cancelled = false;
    setRendering(true);
    // Render on a detached canvas, so an older image request cannot repaint a newer preview.
    const timer = setTimeout(() => {
      const canvas = document.createElement('canvas');
      void renderPinToCanvas(canvas, { ...pin, ...draft, bulletPoints: bullets.split('\n').filter(Boolean) }, projectSettings,
        channel === 'instagram' ? { width: 1080, height: 1350 } : undefined)
        .then(() => { if (!cancelled) setPreview(canvas.toDataURL('image/png')); })
        .catch(() => { if (!cancelled) setError(hubText('Die Grafikvorschau konnte nicht erstellt werden.')); })
        .finally(() => { if (!cancelled) setRendering(false); });
    }, 200);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pin, draft, bullets, projectSettings, channel, hubText]);
  const save = async () => {
    if (lock.current) return;
    if (JSON.stringify(pin) !== initial.current) { setError(hubText('Der Beitrag wurde inzwischen geändert. Bitte die Prüfung neu öffnen.')); return; }
    lock.current = true; setSaving(true); setError('');
    try {
      const confirmed = await onSave({ ...draft, keywords: keywords.split(',').map(value => value.trim()).filter(Boolean), bulletPoints: bullets.split('\n').map(value => value.trim()).filter(Boolean) });
      if (confirmed === false) throw new Error(hubText('Die Cloud-Speicherung konnte nicht bestätigt werden.'));
      if (alive.current) onClose();
    } catch (err) { if (alive.current) setError(err instanceof Error ? err.message : String(err)); }
    finally { lock.current = false; if (alive.current) setSaving(false); }
  };
  return <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="social-review-heading" className="bg-white text-slate-900 rounded-2xl p-5 max-w-5xl w-full max-h-[92vh] overflow-y-auto space-y-4">
      <h2 id="social-review-heading" className="text-xl font-bold">{channel === 'instagram' ? 'Instagram' : 'Pinterest'} · {hubText('Inhalt prüfen und bearbeiten')}</h2>
      <p className="text-sm">{hubText('Prüfe Aussagen, Zahlen, Rechtschreibung und die Übereinstimmung mit dem Blogartikel. Deine Korrekturen aktualisieren die Vorschau und werden erst beim Speichern übernommen.')}</p>
      <p className="text-sm text-amber-800 bg-amber-50 rounded-xl p-3">{hubText('Bereits eingeplante Aufträge behalten ihren bisherigen Inhalt. Entferne sie zuerst aus der Warteschlange und plane sie nach der Korrektur neu ein. Bereits veröffentlichte Beiträge werden nicht geändert.')}</p>
      {channel === 'instagram' && <p className="text-sm text-fuchsia-800">{hubText('Diese Textkorrekturen gelten nur für Instagram. Der Pinterest-Pin bleibt unverändert.')}</p>}
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-5">
        <div className="space-y-2">
          {preview && <img src={preview} alt={hubText('Grafikvorschau des bearbeiteten Beitrags')} className="w-full rounded-xl" />}
          {rendering && <p role="status">{hubText('Grafikvorschau wird aktualisiert…')}</p>}
          <p className="text-xs break-all">{hubText('Ziel-URL:')}{' '}{pin.targetUrl}</p>
          {targetLink && <a href={targetLink} target="_blank" rel="noreferrer" className="block font-semibold underline text-emerald-800">{hubText('Zielseite zum inhaltlichen Abgleich öffnen')}</a>}
        </div>
        <div className="space-y-3">
          <label className="block font-semibold">{hubText('Überschrift auf der Grafik')}<input disabled={saving} maxLength={100} value={draft.title} onChange={event => setDraft(old => ({ ...old, title: event.target.value }))} className="block w-full mt-1 rounded-xl border p-3" /></label>
          <label className="block font-semibold">{hubText('Unterzeile auf der Grafik')}<textarea disabled={saving} maxLength={300} rows={2} value={draft.subHook || ''} onChange={event => setDraft(old => ({ ...old, subHook: event.target.value }))} className="block w-full mt-1 rounded-xl border p-3" /></label>
          <label className="block font-semibold">{hubText('Stichpunkte auf der Grafik (eine Zeile je Punkt)')}<textarea disabled={saving} rows={3} value={bullets} onChange={event => setBullets(event.target.value)} className="block w-full mt-1 rounded-xl border p-3" /></label>
          <label className="block font-semibold">{hubText('Button-Text auf der Grafik')}<input disabled={saving} maxLength={100} value={draft.ctaButtonText || ''} onChange={event => setDraft(old => ({ ...old, ctaButtonText: event.target.value }))} className="block w-full mt-1 rounded-xl border p-3" /></label>
          <label className="block font-semibold">{hubText('Beschreibung / Beitragstext')}<textarea disabled={saving} maxLength={channel === 'instagram' ? 2000 : 500} rows={6} value={draft.description} onChange={event => setDraft(old => ({ ...old, description: event.target.value }))} className="block w-full mt-1 rounded-xl border p-3" /></label>
          <label className="block font-semibold">{hubText('Suchbegriffe / Hashtags (mit Komma trennen)')}<textarea disabled={saving} rows={2} value={keywords} onChange={event => setKeywords(event.target.value)} className="block w-full mt-1 rounded-xl border p-3" /></label>
        </div>
      </div>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <div className="flex justify-end gap-4"><button type="button" disabled={saving} onClick={onClose}>{hubText('Abbrechen')}</button>
        <button type="button" disabled={saving} onClick={() => void save()} className="rounded-xl p-3 bg-emerald-700 text-white font-bold disabled:opacity-50">{hubText(saving ? 'Wird gespeichert…' : 'Korrekturen speichern')}</button></div>
    </section>
  </div>;
}

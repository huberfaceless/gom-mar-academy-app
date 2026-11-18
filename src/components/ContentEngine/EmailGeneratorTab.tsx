import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import type { Campaign } from '../../types';
import type { CentralContentProject } from '../../types/contentEngine';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import { generateEmails, importEmails } from '../../services/contentEmailService';
import { validateContentEmailBatch, type ContentEmailBatch, type ContentEmailDraft } from '../../utils/contentEmail';

type Props = {
  project: CentralContentProject;
  disabled: boolean;
  onBusyChange: (busy: boolean) => void;
  onSave: (batch: ContentEmailBatch, campaignId?: string) => Promise<boolean>;
  onImported?: (campaigns: Campaign[]) => void;
};
export function EmailGeneratorTab({ project, disabled, onBusyChange, onSave, onImported }: Props) {
  const { hubText } = useContentHubCopy();
  const [batch, setBatch] = useState<ContentEmailBatch | undefined>(project.emailBatch);
  const [count, setCount] = useState(project.emailBatch?.emails.length || 1);
  const [targetUrl, setTargetUrl] = useState(project.emailBatch?.targetUrl || project.blogArticle?.publishedUrl || project.targetUrl || project.projectSettings.defaultTargetUrl || '');
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [importedId, setImportedId] = useState(project.emailCampaignId);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const locked = Boolean(batch && importedId === `hub_${batch.id}`);
  const blocked = busy || disabled;
  const run = async (action: () => Promise<void>) => {
    if (blocked) return;
    setBusy(true); onBusyChange(true); setError(''); setNotice('');
    try { await action(); }
    catch (err) { setError(err instanceof Error ? err.message : hubText('Die E-Mail-Anfrage ist fehlgeschlagen.')); }
    finally { setBusy(false); onBusyChange(false); }
  };
  const save = async (draft: ContentEmailBatch, campaignId?: string) => {
    const checked = validateContentEmailBatch(draft);
    if (!await onSave(checked, campaignId)) throw new Error(hubText('Die Cloud-Speicherung konnte nicht bestätigt werden.'));
    return checked;
  };
  const update = (index: number, fields: Partial<ContentEmailDraft>) => {
    if (!batch || locked) return;
    setBatch({ ...batch, emails: batch.emails.map((email, i) => i === index ? { ...email, ...fields } : email) });
    setReviewed(false); setNotice('');
  };
  const fieldClass = 'w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 disabled:opacity-60';
  return <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
    <h2 className="flex items-center gap-2 text-xl font-bold"><Mail />{hubText('E-Mail-Generator')}</h2>
    <p>{hubText('Erstellt Entwürfe aus dem aktuellen Blogartikel, Briefing oder Thema. Zielgruppe, Inhaltssprache und Tonalität stammen aus deinem Projekt.')}</p>
    <p className="text-sm text-slate-600">{hubText('Die Übernahme nach E-Mail & CRM startet keinen Versand. Empfänger und Versand gibst du dort separat frei.')}</p>
    <div className="grid gap-4 md:grid-cols-2">
      <label>{hubText('Umfang')}<select className={fieldClass} value={count} disabled={blocked} onChange={e => setCount(Number(e.target.value))}>
        <option value={1}>{hubText('Eine E-Mail')}</option><option value={5}>{hubText('Serie mit fünf E-Mails')}</option>
      </select></label>
      <label>{hubText('Zieladresse für neue E-Mails')}<input type="url" className={fieldClass} value={targetUrl} disabled={blocked} maxLength={2048} onChange={e => setTargetUrl(e.target.value)} /></label>
    </div>
    <button type="button" disabled={blocked || !targetUrl.trim()} className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white disabled:opacity-50" onClick={() => {
      if (batch && !window.confirm(hubText('Vorhandene E-Mail-Entwürfe in diesem Inhaltsablauf ersetzen? Bereits übernommene CRM-Kampagnen bleiben erhalten.'))) return;
      void run(async () => {
        const next = await generateEmails(project, count, targetUrl);
        setBatch(next); setReviewed(false); setImportedId(undefined);
        await save(next);
        setNotice(hubText('E-Mail-Entwürfe erstellt und gespeichert. Bitte prüfen.'));
      });
    }}>{hubText('E-Mails erstellen')}</button>
    {batch && <div className="space-y-5">
      <label className="block">{hubText('Kampagnenname')}<input className={fieldClass} maxLength={200} disabled={blocked || locked} value={batch.title} onChange={e => { setBatch({ ...batch, title: e.target.value }); setReviewed(false); setNotice(''); }} /></label>
      <p className="break-all text-sm">{hubText('Zieladresse dieser Entwürfe:')} {batch.targetUrl}</p>
      {batch.emails.map((email, index) => <fieldset key={index} className="space-y-3 rounded-xl border border-slate-200 p-4" disabled={blocked || locked}>
        <legend className="px-2 font-bold">{hubText('E-Mail {0}', index + 1)}</legend>
        <label className="block">{hubText('Interner Name')}<input className={fieldClass} maxLength={200} value={email.title} onChange={e => update(index, { title: e.target.value })} /></label>
        <label className="block">{hubText('Betreff')}<input className={fieldClass} maxLength={300} value={email.subject} onChange={e => update(index, { subject: e.target.value })} /></label>
        <label className="block">{hubText('Vorschautext')}<input className={fieldClass} maxLength={1000} value={email.previewText} onChange={e => update(index, { previewText: e.target.value })} /></label>
        <label className="block">{hubText('E-Mail-Text')}<textarea className={fieldClass} rows={10} maxLength={12000} value={email.content} onChange={e => update(index, { content: e.target.value })} /></label>
        <label className="block">{hubText('Tage nach Kampagnenstart')}<input type="number" className={fieldClass} min={0} max={3650} value={email.dayOffset} onChange={e => update(index, { dayOffset: e.target.value === '' ? -1 : Number(e.target.value) })} /></label>
        <details><summary>{hubText('Textvorschau öffnen')}</summary><div className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4"><strong>{email.subject}</strong><p>{email.previewText}</p><hr className="my-3" />{email.content}</div></details>
      </fieldset>)}
      {locked ? <p role="status">{hubText('Als Entwurf in E-Mail & CRM übernommen. Weitere Änderungen bitte dort vornehmen. Neue Entwürfe kannst du oben erstellen.')}</p> : <>
        <button type="button" disabled={blocked} className="rounded-xl border px-5 py-3 font-bold disabled:opacity-50" onClick={() => void run(async () => { await save(batch); setNotice(hubText('E-Mail-Entwürfe gespeichert.')); })}>{hubText('E-Mail-Entwürfe speichern')}</button>
        <label className="flex items-start gap-2"><input type="checkbox" checked={reviewed} disabled={blocked} onChange={e => setReviewed(e.target.checked)} />{hubText('Ich habe Aussagen, Leistungen, Links und die Betreiberrolle geprüft.')}</label>
        <button type="button" disabled={blocked || !reviewed} className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white disabled:opacity-50" onClick={() => void run(async () => {
          const checked = await save(batch);
          const result = await importEmails(checked);
          setImportedId(result.campaignId);
          onImported?.(result.campaigns);
          setNotice(hubText('Entwurf in E-Mail & CRM verfügbar. Es wurde keine E-Mail versendet.'));
          // A failed marker save must not turn a successful CRM import into a failed import.
          if (!await onSave(checked, result.campaignId)) setError(hubText('CRM-Entwurf übernommen; die Markierung im Inhaltsablauf konnte nicht gespeichert werden. Eine erneute Übernahme erzeugt kein Duplikat.'));
        })}>{hubText('In E-Mail & CRM als Entwurf übernehmen')}</button>
      </>}
    </div>}
    {busy && <p role="status" className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{hubText('E-Mails werden verarbeitet …')}</p>}
    {notice && <p role="status" className="text-emerald-700">{notice}</p>}
    {error && <p role="alert" className="text-red-700">{error}</p>}
  </section>;
}

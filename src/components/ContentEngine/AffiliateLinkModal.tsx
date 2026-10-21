import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useEffect, useRef, useState } from 'react';
import { resolvePinterestTargetUrl } from '../../utils/pinterestTargetUrl';

interface AffiliateLinkModalProps {
  initialLink?: string | null;
  requestTopic?: boolean;
  contentLabel?: string;
  onConfirm: (link: string | null, topic?: string) => void;
  onClose: () => void;
}

export const AffiliateLinkModal: React.FC<AffiliateLinkModalProps> = ({ initialLink, requestTopic = false, contentLabel = 'Blogartikel', onConfirm, onClose }) => {
  const { language, hubText } = useContentHubCopy();
  const dialog = useRef<HTMLDialogElement>(null);
  const [link, setLink] = useState('');
  const [linkMode, setLinkMode] = useState(initialLink ? 'project' : 'custom');
  const [error, setError] = useState('');
  const [topic, setTopic] = useState('');
  const topicInput = useRef<HTMLInputElement>(null);
  const confirm = (confirmedLink: string | null) => {
    if (requestTopic && !topic.trim()) {
      setError(hubText("Bitte gib ein Thema für den neuen Blogartikel ein."));
      topicInput.current?.focus();
      return;
    }
    onConfirm(confirmedLink, requestTopic ? topic.trim() : undefined);
  };
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="affiliate-link-title"
      className="m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-slate-950/60">
      <form onSubmit={event => {
        event.preventDefault();
        try { if (linkMode === 'custom' && !link.trim()) throw new Error(hubText("Bitte gib eine Zieladresse ein oder wähle „Ohne Link erstellen“.")); confirm(resolvePinterestTargetUrl(linkMode === 'project' ? initialLink : link) || null); } catch (err) { setError((err as Error).message); }
      }} className="space-y-4">
        <h2 id="affiliate-link-title" className="text-xl font-bold">{requestTopic ? hubText("Neuen Blogartikel erstellen") : hubText("{0}: Zieladresse wählen", contentLabel)}</h2>
        {requestTopic && (
          <div className="space-y-2">
            <label htmlFor="new-blog-topic" className="block text-sm font-semibold">{hubText("Thema des neuen Artikels")}</label>
            <input ref={topicInput} id="new-blog-topic" type="text" required autoFocus value={topic} maxLength={500}
              aria-invalid={Boolean(error && !topic.trim())} aria-describedby={error ? 'blog-link-error' : undefined}
              onChange={event => { setTopic(event.target.value); setError(''); }} placeholder={hubText("Worüber möchtest du schreiben?")}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-emerald-500 focus:outline-none" />
            <p className="text-xs text-slate-600">{hubText("Ein eigenes Briefing und ein zusätzlicher Artikel werden erstellt. Deine bisherigen Artikel bleiben erhalten.")}</p>
          </div>
        )}
        <p className="text-sm text-slate-600">{hubText("Die Projekt-Zieladresse gilt für neue Inhalte. Eine andere Adresse gilt nur für diese Erstellung.")}</p>
        {initialLink && <fieldset className="space-y-2 text-sm">
          <legend className="font-semibold">{hubText("Projekt-Link beibehalten oder andere Adresse verwenden?")}</legend>
          <label className="flex items-start gap-2"><input type="radio" name="content-link-mode" checked={linkMode === 'project'} onChange={() => { setLinkMode('project'); setError(''); }} /><span className="break-all">{hubText("Projekt-Link verwenden:")}{' '}{initialLink}</span></label>
          <label className="flex items-center gap-2"><input type="radio" name="content-link-mode" checked={linkMode === 'custom'} onChange={() => { setLinkMode('custom'); setError(''); }} />{hubText("Andere Adresse für diese Inhalte")}</label>
        </fieldset>}
        {linkMode === 'custom' && <><label htmlFor="blog-affiliate-link" className="block text-sm font-semibold">{hubText("Affiliate-/Empfehlungslink")}</label>
        <input id="blog-affiliate-link" type="url" value={link} autoFocus={!requestTopic} placeholder="https://…" maxLength={2048}
          aria-invalid={Boolean(error && (!requestTopic || topic.trim()))} aria-describedby={error ? 'blog-link-error' : undefined}
          onChange={event => { setLink(event.target.value); setError(''); }}
          className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-emerald-500 focus:outline-none" /></>}
        {error && <p id="blog-link-error" role="alert" className="text-sm text-rose-700">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">{linkMode === 'project' ? hubText("Mit Projekt-Link erstellen") : hubText("Mit diesem Link erstellen")}</button>
          <button type="button" onClick={() => confirm(null)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">{hubText("Ohne Link erstellen")}</button>
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm text-slate-600">{hubText("Abbrechen")}</button>
        </div>
      </form>
    </dialog>
  );
};

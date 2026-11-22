import { wordpressSiteOrigin } from '../../utils/wordpressSites';
import React, { useEffect, useRef } from 'react';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import { WordPressDraftPanel } from './WordPressDraftPanel';

export function WordPressPublishingDialog({ contentId, siteUrl, onEditProject, categorySlug, hasArticle, onSave, onPublished, onClose }: {
  contentId: string; siteUrl: string; onEditProject: () => void; categorySlug?: string; hasArticle: boolean;
  onSave: (category: string) => Promise<boolean>;
  onPublished: (url: string) => Promise<void>; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { hubText } = useContentHubCopy();
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);
  return <dialog ref={ref} onCancel={onClose} aria-labelledby="wordpress-dialog-title" className="m-auto max-h-[90vh] w-[min(56rem,95vw)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl backdrop:bg-black/50">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 id="wordpress-dialog-title" className="text-lg font-bold text-slate-900">{hubText('WordPress & Veröffentlichung')}</h2>
      <button type="button" onClick={onClose} className="rounded-xl border px-3 py-2 text-sm font-bold text-slate-700">{hubText('Schließen')}</button>
    </div>
    {wordpressSiteOrigin(siteUrl)
      ? <WordPressDraftPanel contentId={contentId} savedCategorySlug={categorySlug} connectionOnly={!hasArticle} onSave={onSave} onPublished={onPublished} />
      : <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="font-bold text-slate-900">{hubText('Veröffentlichungsseite prüfen')}</h3>
        <p className="break-words text-sm text-slate-800">{hubText('Im Artikel gespeicherte Webseite:')} {siteUrl || hubText('Nicht angegeben')}</p>
        <p className="text-sm text-slate-700">{hubText('Diese Adresse ist nicht als WordPress-Veröffentlichungsseite eingerichtet. Trage unter Website URL die gewünschte WordPress-Seite ein: https://gomo-marketing.at oder https://vital50.gomo-marketing.at. Die Projekt-Zieladresse für deine Werbung bleibt davon getrennt.')}</p>
        <button type="button" onClick={onEditProject} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white">{hubText('Projekt-Webseite einstellen')}</button>
      </section>}

  </dialog>;
}

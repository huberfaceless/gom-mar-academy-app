import React, { useEffect, useRef } from 'react';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import { WordPressDraftPanel } from './WordPressDraftPanel';

export function WordPressPublishingDialog({ contentId, categorySlug, hasArticle, onSave, onPublished, onClose }: {
  contentId: string; categorySlug?: string; hasArticle: boolean;
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
    <WordPressDraftPanel contentId={contentId} savedCategorySlug={categorySlug} connectionOnly={!hasArticle} onSave={onSave} onPublished={onPublished} />
  </dialog>;
}

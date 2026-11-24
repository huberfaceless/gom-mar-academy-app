import React, { useEffect, useRef, useState } from 'react';
import type { ProjectSettings } from '../../types/contentEngine';
import { AIContentService } from '../../services/aiContentService';
import { normalizeLongTailKeywords } from '../../utils/longTailKeywords';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

export function LongTailKeywordsPanel({ value, topic, content, projectSettings, onChange }: {
  value?: string[]; topic: string; content: string; projectSettings?: ProjectSettings;
  onChange: (keywords: string[]) => unknown;
}) {
  const { hubText } = useContentHubCopy();
  const saved = normalizeLongTailKeywords(value).join('\n');
  const [text, setText] = useState(saved);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const latest = useRef({ onChange, topic, content, saved, projectSettings });
  latest.current = { onChange, topic, content, saved, projectSettings };
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => { setText(saved); setError(''); setCopied(false); }, [saved, topic, content]);
  const suggest = async () => {
    if (!projectSettings || busy) return;
    const source = latest.current;
    setBusy(true); setError('');
    try {
      const result = await AIContentService.suggestLongTailKeywords(topic, content, projectSettings);
      if (!mounted.current) return;
      const current = latest.current;
      if (current.topic !== source.topic || current.content !== source.content || current.saved !== source.saved || current.projectSettings?.id !== source.projectSettings?.id || current.projectSettings?.language !== source.projectSettings?.language) {
        throw new Error(hubText('Der Inhalt wurde inzwischen geändert. Bitte erneut erstellen.'));
      }
      if (await current.onChange(result) === false) throw new Error(hubText('Bitte die Änderungen zuerst erfolgreich speichern.'));
    } catch (error) { if (mounted.current) setError(error instanceof Error ? error.message : hubText('Long-Tail-Keywords konnten nicht erstellt werden.')); }
    finally { if (mounted.current) setBusy(false); }
  };
  return <section className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4" aria-label={hubText('Long-Tail-Keywords')}>
    <h4 className="text-sm font-bold">{hubText('Long-Tail-Keywords')}</h4>
    <p className="text-xs text-slate-600">{hubText('Konkrete Suchphrasen, eine pro Zeile. Vorschläge ohne gemessenes Suchvolumen. Änderungen hier schreiben bestehende Texte nicht um.')}</p>
    <textarea aria-label={hubText('Long-Tail-Keywords bearbeiten')} value={text} rows={4} maxLength={1600} disabled={busy}
      placeholder={hubText('Noch keine Long-Tail-Keywords hinterlegt.')}
      onChange={event => { setText(event.target.value); setCopied(false); }}
      onBlur={() => { const keywords = normalizeLongTailKeywords(text.split('\n')); if (keywords.join('\n') !== saved) onChange(keywords); setText(keywords.join('\n')); }}
      className="w-full rounded-xl border p-2 text-sm disabled:opacity-50" />
    <div className="flex flex-wrap gap-2">
      {projectSettings && <button type="button" onClick={() => void suggest()} disabled={busy || !content.trim()} className="rounded-xl border px-3 py-2 text-xs font-bold disabled:opacity-50">{hubText(busy ? 'Long-Tail-Keywords werden erstellt…' : 'Long-Tail-Keywords erstellen')}</button>}
      <button type="button" disabled={!text.trim()} className="rounded-xl border px-3 py-2 text-xs font-bold disabled:opacity-50" onClick={async () => {
        try { await navigator.clipboard.writeText(normalizeLongTailKeywords(text.split('\n')).join('\n')); setCopied(true); setError(''); }
        catch { setError(hubText('Kopieren nicht möglich. Bitte erlaube den Zugriff auf die Zwischenablage.')); }
      }}>{hubText(copied ? 'Kopiert' : 'Keywords kopieren')}</button>
    </div>
    {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
  </section>;
}

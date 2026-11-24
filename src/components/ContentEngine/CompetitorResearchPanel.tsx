import { searchSuggestionsDocument } from '../../utils/searchSuggestionsDocument';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { CompetitorResearch } from '../../utils/editorialStrategy';
import { groundedResearchUrl } from '../../utils/editorialStrategy';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

export function CompetitorResearchPanel({ report }: { report: CompetitorResearch }) {
  const { language, hubText } = useContentHubCopy();
  // Provider HTML stays in an opaque sandbox; it never enters the Academy DOM.
  const suggestionDocument = searchSuggestionsDocument(report.searchSuggestionsHtml);
  return <section className="rounded-2xl bg-white border border-emerald-200 p-5 space-y-3">
    <h2 className="font-bold text-emerald-900">{hubText('Mitbewerber-Recherche vor der Erstellung')}</h2>
    <p className="text-xs text-slate-600">{hubText('Stand:')}{' '}{new Date(report.checkedAt).toLocaleString(language)} · {report.audience}</p>
    <p className="text-sm text-slate-700">{hubText('Momentaufnahme öffentlicher Inhalte. Beobachtungen und Vorschläge sind keine vollständige Marktanalyse oder geprüfte Erfolgsdaten. Mitbewerberversprechen ersetzen keine Fachbelege.')}</p>
    <details>
      <summary className="font-semibold cursor-pointer">{hubText('Analyse und Quellen ansehen')}</summary>
      <div className="prose prose-sm max-w-none mt-3">
        <ReactMarkdown skipHtml components={{
          a: ({ href, children }) => groundedResearchUrl(href) ? <a href={groundedResearchUrl(href)!} target="_blank" rel="noreferrer" className="underline text-emerald-800">{children}</a> : <span>{children}</span>,
          img: () => null,
        }}>{report.text}</ReactMarkdown>
      </div>
      <ol className="list-decimal pl-5 mt-3 text-sm space-y-1">
        {report.sources.map((source, index) => <li key={source.url + index}>{groundedResearchUrl(source.url) ? <a href={source.url} target="_blank" rel="noreferrer" className="underline text-emerald-800">{source.title}</a> : source.title}</li>)}
      </ol>
    </details>
    {!!report.searchSuggestionsHtml && <iframe title={hubText('Google-Suchvorschläge zur Recherche')} srcDoc={suggestionDocument}
      sandbox="allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" className="w-full h-40 border-0" />}
  </section>;
}

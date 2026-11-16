import React from 'react';
import type { BlogArticle } from '../../types/contentEngine';
import { wordpressSiteOrigin } from '../../utils/wordpressSites';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

export function InboundLinkSuggestions({ article }: { article: BlogArticle }) {
  const { hubText } = useContentHubCopy();
  let target: URL;
  try {
    target = new URL(article.publishedUrl || '');
    if (!wordpressSiteOrigin(target.origin) || target.username || target.password || target.pathname === '/') return null;
  } catch { return null; }
  const candidates = article.internalLinking?.state === 'checked' ? article.internalLinking.links.filter(link => {
    try { const url = new URL(link.url); return url.origin === target.origin && !url.username && !url.password && url.pathname !== '/' && url.pathname !== target.pathname; } catch { return false; }
  }).slice(0, 3) : [];
  return <div className="space-y-2 border-t pt-3 text-sm">
    <h4 className="font-semibold">{hubText('Eingehende interne Links')}</h4>
    <p>{hubText('Ein bestehender Artikel muss auf diesen neuen Artikel verlinken. Die Academy ändert veröffentlichte Artikel nicht automatisch. Öffne einen passenden Artikel und ergänze dort den folgenden Link als normalen Textlink.')}</p>
    {candidates.length > 0 && <ul>{candidates.map(link => <li key={link.url}><a className="underline" href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></li>)}</ul>}
    {!candidates.length && <p>{hubText('Noch keine passenden Ausgangsartikel geprüft. Nutze oben „Passende interne Links ergänzen“.')}</p>}
    <p>{hubText('Linktext:')} {article.title}</p>
    <p className="break-all">{hubText('Zieladresse:')} <a href={target.href} target="_blank" rel="noopener noreferrer" className="underline">{target.href}</a></p>
    <p>{hubText('Die Vorschläge sind keine Bestätigung, dass bereits ein eingehender Link vorhanden ist.')}</p>
  </div>;
}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderToStaticMarkup } from 'react-dom/server';
import type { BlogArticle, ProjectSettings, ContentBrief } from '../src/types/contentEngine';
import { WORDPRESS_ORIGIN } from './wordpressDraftAdmin.js';

export type InternalLink = { title: string; url: string };
export type InternalLinkReport = { state: 'checked' | 'unavailable' | 'not-supported'; checkedAt: string; links: InternalLink[] };
const plain = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => {
  const n = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code);
  return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : '';
}).replace(/&(amp|quot|apos|lt|gt|nbsp);/g, (_, name) => ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' })[name] || '').trim();
const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const stop = new Set('ab alter vital50 warum wie was und oder der die das ein eine einer einem einen mit ohne fur von zum zur nicht mehr wirklich hilft gegen trotz beim gesund gesunde gesunden tipps menschen anfanger anfangerfreundlich uber years after the and for with your you can from'.split(' '));
const tokens = (text: string) => new Set(normalize(text).split(' ').filter(t => t.length > 3 && !stop.has(t)).map(t => t.replace(/(ungen|ung|ern|en|er|es|e|s)$/, '')));
const concepts = [ /bauchfett|abnehm|kalori|gewicht|diat|fettver/, /protein|muskel|kraft/, /wasser|trink|hydrat|elektrolyt|flussig/, /schlaf|mude|energie|nachmittagstief|erschopf/, /stress|gewohnheit|routine|willenskraft/, /rezept|fruhstuck|snack|low carb|keto|ketose/ ];
const matches = (title: string, query: string) => {
  const a = tokens(title), b = tokens(query);
  let score = [...a].filter(t => b.has(t)).length * 3;
  for (const concept of concepts) if (concept.test(normalize(title)) && concept.test(normalize(query))) score += 2;
  return score;
};
const safeUrl = (value: unknown): string | null => {
  try {
    if (typeof value !== 'string') return null;
    const u = new URL(value);
    return u.origin === WORDPRESS_ORIGIN && !u.username && !u.password && u.pathname !== '/' && !u.search && !u.hash ? u.href : null;
  } catch { return null; }
};

// Read only the fixed, public WordPress endpoint. Never send stored credentials or fetch a caller-supplied host.
export async function findWordPressInternalLinks(settings: Pick<ProjectSettings, 'websiteUrl'> | undefined, query: { title: string; topic?: string; brief?: Partial<ContentBrief>; content?: string }, request: typeof fetch = fetch): Promise<InternalLinkReport> {
  const report: InternalLinkReport = { state: 'not-supported', checkedAt: new Date().toISOString(), links: [] };
  try { if (new URL(settings?.websiteUrl || '').origin !== WORDPRESS_ORIGIN) return report; } catch { return report; }
  try {
    const posts: any[] = [];
    const signal = AbortSignal.timeout(12000);
    // Bounded pagination covers up to 500 current posts, without caching deleted or unpublished targets.
    for (let page = 1; page <= 5; page++) {
      const response = await request(`${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts?status=publish&per_page=100&page=${page}&orderby=date&order=desc&_fields=id,status,link,title,content.protected`, { redirect: 'error', signal });
      if (!response.ok) throw new Error('Katalog nicht verfügbar');
      const batch = await response.json();
      if (!Array.isArray(batch)) throw new Error('Ungültiger Katalog');
      posts.push(...batch);
      const pages = Number(response.headers.get('x-wp-totalpages'));
      if (batch.length < 100 || (pages > 0 && page >= pages)) break;
    }
    const search = [query.title, query.topic, query.brief?.mainKeyword, ...(query.brief?.secondaryKeywords || []), ...(query.brief?.outline || []).map(item => item.h2), query.content?.slice(0, 20000)].filter(Boolean).join(' ');
    const seen = new Set<string>();
    const candidates = posts.flatMap(post => {
      const url = safeUrl(post?.link);
      const title = typeof post?.title?.rendered === 'string' ? plain(post.title.rendered).slice(0, 500) : '';
      if (post?.status !== 'publish' || post?.content?.protected || !url || !title || seen.has(url) || normalize(title.replace(/\s*\|\s*Vital50\s*$/i, '')) === normalize(query.title.replace(/\s*\|\s*Vital50\s*$/i, ''))) return [];
      seen.add(url);
      const score = matches(title, search);
      return score > 0 ? [{ title, url, score }] : [];
    }).sort((a, b) => b.score - a.score || a.url.localeCompare(b.url)).slice(0, 6);
    const checked = await Promise.all(candidates.map(async ({ title, url }) => {
      try {
        // Only the already validated same-origin permalink is requested; redirects are not followed.
        const response = await request(url, { method: 'HEAD', redirect: 'error', signal });
        return response.ok && response.headers.get('content-type')?.includes('text/html') ? { title, url } : null;
      } catch { return null; }
    }));
    const links = checked.filter((link): link is InternalLink => link !== null).slice(0, 3);
    return { ...report, state: candidates.length && !links.length ? 'unavailable' : 'checked', links };
  } catch { return { ...report, state: 'unavailable' }; }
}

export function appendWordPressInternalLinks(markdown: string, report: InternalLinkReport, language?: string): string {
  const fresh = report.links.filter(link => !markdown.includes(link.url));
  if (!fresh.length) return markdown;
  const title = language === 'en' ? 'Related articles' : language === 'pl' ? 'Powiązane artykuły' : 'Passende Artikel';
  const escape = (text: string) => text.replace(/[\\`*_[\]<>]/g, '\\$&').replace(/[\r\n]+/g, ' ');
  return `${markdown}\n\n## ${title}\n\n${fresh.map(link => `- [${escape(link.title)}](<${link.url}>)`).join('\n')}`;
}

export async function enrichWordPressInternalLinks(article: BlogArticle, settings: ProjectSettings, topic: string, brief: ContentBrief) {
  const report = await findWordPressInternalLinks(settings, { title: article.title, topic, brief, content: article.contentMarkdown });
  return { ...article, contentMarkdown: appendWordPressInternalLinks(article.contentMarkdown, report, settings.language), internalLinking: report };
}

// Parse Markdown rather than matching link syntax with regex, including reference links and autolinks.
export function removeUnverifiedInternalLinks(markdown: string, report: InternalLinkReport): string {
  if (report.state === 'not-supported') return markdown;
  const approved = new Set(report.links.map(link => link.url));
  type Node = { type: string; identifier?: string; url?: string; value?: string; children?: Node[]; position?: { start: { offset?: number }; end: { offset?: number } } };
  const edits: { start: number; end: number; text: string }[] = [];
  const label = (node: Node): string => node.value || (node.children || []).map(label).join('');
  const visitor = () => (root: Node) => {
    const definitions = new Map<string, string>();
    const collect = (node: Node) => {
      if (node.type === 'definition' && node.identifier && node.url) definitions.set(node.identifier, node.url);
      node.children?.forEach(collect);
    };
    collect(root);
    const visit = (node: Node) => {
      const url = node.url || (node.type === 'linkReference' ? definitions.get(node.identifier || '') : undefined);
      if ((node.type === 'link' || node.type === 'definition' || node.type === 'linkReference') && url) {
        let internal = false;
        try { internal = new URL(url, WORDPRESS_ORIGIN).origin === WORDPRESS_ORIGIN; } catch { /* Renderer rejects unsafe URLs. */ }
        if (internal && !url.startsWith('#') && !approved.has(url)) {
          const start = node.position?.start.offset, end = node.position?.end.offset;
          if (typeof start === 'number' && typeof end === 'number') edits.push({ start, end, text: node.type === 'definition' || label(node).includes('://') ? '' : label(node).replace(/[\\`*_[\]<>:]/g, '\\$&') });
          return;
        }
      }
      node.children?.forEach(visit);
    };
    visit(root);
  };
  renderToStaticMarkup(React.createElement(ReactMarkdown, { children: markdown, remarkPlugins: [remarkGfm, visitor], skipHtml: true }));
  for (const edit of edits.sort((a, b) => b.start - a.start)) markdown = markdown.slice(0, edit.start) + edit.text + markdown.slice(edit.end);
  return markdown;
}

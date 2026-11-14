import { WORDPRESS_ORIGIN } from './wordpressDraftAdmin.js';

// Text snapshots are for campaign generation, never inserted as HTML or written back to WordPress.
export const campaignHtmlText = (html: string): string => html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<(script|style|iframe|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
  .replace(/<h([1-6])\b[^>]*>/gi, (_, level) => `\n\n${'#'.repeat(Number(level))} `)
  .replace(/<li\b[^>]*>/gi, '\n- ')
  .replace(/<\/(?:p|div|section|h[1-6]|ul|ol|li|tr|blockquote)\s*>|<br\b[^>]*>/gi, '\n\n')
  .replace(/<[^>]*>/g, '')
  .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, code) => {
    const n = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code);
    return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : '';
  })
  .replace(/&(amp|lt|gt|quot|apos|nbsp|ndash|mdash|hellip);/g, (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…' })[name] || '')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim();

export async function readCampaignWordPressArticles(websiteUrl: unknown, postId?: unknown, pageInput?: unknown, request: typeof fetch = fetch) {
  if (typeof websiteUrl !== 'string' || new URL(websiteUrl).origin !== WORDPRESS_ORIGIN) throw new Error('Der WordPress-Import ist für diese Website nicht eingerichtet.');
  const page = pageInput === undefined ? 1 : Number(pageInput);
  if (!Number.isSafeInteger(page) || page < 1 || page > 100) throw new Error('Ungültige Artikelseite.');
  if (postId !== undefined && (!Number.isSafeInteger(postId) || Number(postId) <= 0)) throw new Error('Ungültige Artikelkennung.');
  const fields = postId === undefined ? 'id,status,link,title,content.protected' : 'id,status,link,title,content';
  const path = postId === undefined ? `?status=publish&per_page=50&page=${page}&_fields=${fields}` : `/${postId}?_fields=${fields}`;
  const response = await request(`${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts${path}`, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('WordPress-Artikel konnten nicht geladen werden.');
  const data = await response.json();
  if (postId === undefined && !Array.isArray(data)) throw new Error('Ungültige WordPress-Antwort.');
  const posts = (postId === undefined ? data : [data]).flatMap((post: any) => {
    let url: URL;
    try { url = new URL(post.link); } catch { return []; }
    if (post.status !== 'publish' || post.content?.protected || !Number.isSafeInteger(post.id) || post.id <= 0
      || (postId !== undefined && post.id !== postId) || url.origin !== WORDPRESS_ORIGIN || url.username || url.password || url.pathname === '/') return [];
    const title = campaignHtmlText(String(post.title?.rendered || '')).slice(0, 500);
    if (!title) return [];
    const contentMarkdown = postId === undefined ? undefined : campaignHtmlText(String(post.content?.rendered || ''));
    if (contentMarkdown && contentMarkdown.length > 60000) throw new Error('Der Artikel überschreitet 60.000 Zeichen. Bitte einen kürzeren Text übernehmen.');
    return [{ id: post.id, title, url: url.href, ...(contentMarkdown !== undefined ? { contentMarkdown } : {}) }];
  });
  if (postId !== undefined && !posts.length) throw new Error('Der Artikel ist nicht öffentlich verfügbar.');
  return { posts, hasMore: postId === undefined && Number(response.headers.get('x-wp-totalpages')) > page };
}

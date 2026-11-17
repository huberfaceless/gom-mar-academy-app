import { wordpressSiteOrigin } from '../src/utils/wordpressSites.js';

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
  const origin = wordpressSiteOrigin(websiteUrl);
  if (!origin) throw new Error('Der WordPress-Import ist für diese Website nicht eingerichtet.');
  const page = pageInput === undefined ? 1 : Number(pageInput);
  if (!Number.isSafeInteger(page) || page < 1 || page > 100) throw new Error('Ungültige Artikelseite.');
  if (postId !== undefined && (!Number.isSafeInteger(postId) || Number(postId) <= 0)) throw new Error('Ungültige Artikelkennung.');
  const fields = postId === undefined ? 'id,status,link,title,content.protected' : 'id,status,link,title,content';
  const path = postId === undefined ? `?status=publish&per_page=50&page=${page}&_fields=${fields}` : `/${postId}?_fields=${fields}`;
  const response = await request(`${origin}/wp-json/wp/v2/posts${path}`, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('WordPress-Artikel konnten nicht geladen werden.');
  const data = await readCampaignJson(response);
  if (postId === undefined && !Array.isArray(data)) throw new Error('Ungültige WordPress-Antwort.');
  const posts = (postId === undefined ? data : [data]).flatMap((post: any) => {
    let url: URL;
    try { url = new URL(post.link); } catch { return []; }
    if (post.status !== 'publish' || post.content?.protected || !Number.isSafeInteger(post.id) || post.id <= 0
      || (postId !== undefined && post.id !== postId) || url.origin !== origin || url.username || url.password || url.pathname === '/') return [];
    const title = campaignHtmlText(String(post.title?.rendered || '')).slice(0, 500);
    if (!title) return [];
    const contentMarkdown = postId === undefined ? undefined : campaignHtmlText(String(post.content?.rendered || ''));
    if (contentMarkdown && contentMarkdown.length > 60000) throw new Error('Der Artikel überschreitet 60.000 Zeichen. Bitte einen kürzeren Text übernehmen.');
    return [{ id: post.id, title, url: url.href, ...(contentMarkdown !== undefined ? { contentMarkdown } : {}) }];
  });
  if (postId !== undefined && !posts.length) throw new Error('Der Artikel ist nicht öffentlich verfügbar.');
  return { posts, hasMore: postId === undefined && Number(response.headers.get('x-wp-totalpages')) > page };
}


// Only the fixed, approved WordPress REST origins are fetched. An entered permalink
// is used to identify a published post, never as an arbitrary network request URL.
async function readCampaignJson(response: Response): Promise<any> {
  const limit = 1_000_000;
  if (Number(response.headers.get('content-length')) > limit) throw new Error('Die Artikelantwort ist zu groß.');
  if (!response.body) throw new Error('Leere WordPress-Antwort.');
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > limit) throw new Error('Die Artikelantwort ist zu groß.');
      chunks.push(part.value);
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function readCampaignWordPressArticleUrl(websiteUrl: unknown, articleUrl: unknown, request: typeof fetch = fetch) {
  const origin = wordpressSiteOrigin(websiteUrl);
  if (!origin) throw new Error('Der WordPress-Import ist für diese Website nicht eingerichtet.');
  if (typeof articleUrl !== 'string' || articleUrl.length > 2048) throw new Error('Bitte einen gültigen Artikellink angeben.');
  let url: URL;
  try { url = new URL(articleUrl.trim()); } catch { throw new Error('Bitte einen gültigen Artikellink angeben.'); }
  if (url.origin !== origin || url.username || url.password) throw new Error('Der Artikel muss auf der im Projekt hinterlegten WordPress-Website liegen.');
  if (url.search) throw new Error('Bitte den vollständigen Artikellink ohne Such- oder Trackingparameter verwenden.');
  const parts = url.pathname.split('/').filter(Boolean);
  if (!parts.length || parts.some(part => /^(wp-admin|wp-json|wp-content|feed|category|tag|author)$/i.test(part))) throw new Error('Bitte den konkreten Link zu einem veröffentlichten Blogartikel angeben.');
  const slug = parts.at(-1)!;
  // A full path match prevents loading another post merely because its slug matches.
  const response = await request(`${origin}/wp-json/wp/v2/posts?status=publish&slug=${encodeURIComponent(decodeURIComponent(slug))}&per_page=10&_fields=id,link,status,content.protected`, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Der Artikellink konnte nicht geladen werden. Bitte Artikeltext übernehmen oder später erneut versuchen.');
  const data = await readCampaignJson(response);
  if (!Array.isArray(data)) throw new Error('Ungültige WordPress-Antwort.');
  const normalizePath = (path: string) => decodeURIComponent(path).replace(/\/+$/, '') || '/';
  const match = data.find((post: any) => {
    try {
      const canonical = new URL(post.link);
      return post.status === 'publish' && !post.content?.protected && Number.isSafeInteger(post.id) && post.id > 0
        && canonical.origin === origin && !canonical.username && !canonical.password && !canonical.search
        && normalizePath(canonical.pathname) === normalizePath(url.pathname);
    } catch { return false; }
  });
  if (!match) throw new Error('Unter diesem Link wurde kein öffentlicher WordPress-Artikel gefunden. Bitte den Artikellink prüfen oder Artikeltext übernehmen.');
  const result = await readCampaignWordPressArticles(origin, match.id, undefined, request);
  if (normalizePath(new URL(result.posts[0].url).pathname) !== normalizePath(url.pathname)) throw new Error('Der Artikellink hat sich geändert. Bitte den aktuellen Link verwenden.');
  return result;
}

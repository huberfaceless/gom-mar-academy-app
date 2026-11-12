import { BLOG_REFERENCES, selectedBlogReferences } from '../src/utils/blogReferences.js';

export async function verifyBlogReferences(ids: unknown, request: typeof fetch = fetch) {
  if (ids === undefined) return [];
  if (!Array.isArray(ids) || ids.length > 6 || ids.some(id => typeof id !== 'string' || !BLOG_REFERENCES.some(source => source.id === id))) throw new Error('Bitte Quellen aus den geprüften Vorschlägen auswählen.');
  const sources = selectedBlogReferences(ids);
  const checked = await Promise.all(sources.map(async source => {
    try {
      const response = await request(source.url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(8000) });
      return response.ok && response.headers.get('content-type')?.includes('text/html') ? source : null;
    } catch { return null; }
  }));
  return checked.filter((item): item is typeof sources[number] => item !== null);
}
export async function suggestBlogReferences(text: string, request: typeof fetch = fetch) {
  const query = text.toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '');
  const ids = BLOG_REFERENCES.filter(source => source.keywords.normalize('NFD').replace(/\p{M}/gu, '').split(' ').some(word => query.includes(word))).map(source => source.id);
  return verifyBlogReferences(ids, request);
}

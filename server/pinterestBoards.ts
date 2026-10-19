import { pinterestApiBase, type PinterestEnvironment } from '../src/utils/pinterestEnvironment.js';

// Sandbox can filter every board from a page while still returning a bookmark.
export async function listPinterestBoards(accessToken: string, environment: PinterestEnvironment) {
  const boards: Array<{ id: string; name: string; privacy?: string }> = [];
  const seen = new Set<string>();
  let bookmark = '';
  for (let page = 0; page < 50; page++) {
    const query = new URLSearchParams({ page_size: '250', ...(bookmark ? { bookmark } : {}) });
    const response = await fetch(`${pinterestApiBase(environment)}/boards?${query}`, {
      headers: { Authorization: `Bearer ${accessToken.trim()}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || `Pinterest-Pinnwände konnten nicht geladen werden (HTTP ${response.status}).`);
    if (Array.isArray(data.items)) boards.push(...data.items);
    if (!data.bookmark) return boards;
    if (typeof data.bookmark !== 'string' || seen.has(data.bookmark)) break;
    bookmark = data.bookmark;
    seen.add(bookmark);
  }
  throw new Error('Die Pinnwand-Liste konnte nicht vollständig geladen werden. Bitte erneut versuchen.');
}

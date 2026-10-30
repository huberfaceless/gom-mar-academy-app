import { type PinterestEnvironment } from './pinterestEnvironment';

const KEY = 'gommar_pinterest_oauth_return';
export interface PinterestOAuthReturn {
  userId: string;
  projectId: string;
  contentProjectId: string;
  pinId: string;
  environment: PinterestEnvironment;
  savedAt: number;
}
export const savePinterestOAuthReturn = (context: Omit<PinterestOAuthReturn, 'savedAt'>): void => {
  sessionStorage.setItem(KEY, JSON.stringify({ ...context, savedAt: Date.now() }));
};
export const readPinterestOAuthReturn = (userId?: string): PinterestOAuthReturn | null => {
  try {
    if (!userId || !['connected', 'error'].includes(new URLSearchParams(window.location.search).get('pinterest') || '')) return null;
    const context = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (!context || context.userId !== userId || typeof context.savedAt !== 'number'
      || Date.now() - context.savedAt > 30 * 60_000 || context.savedAt > Date.now()
      || !['sandbox', 'production'].includes(context.environment)
      || !['projectId', 'contentProjectId', 'pinId'].every(key => typeof context[key] === 'string' && context[key])) return null;
    return context;
  } catch { return null; }
};
export const clearPinterestOAuthReturn = (): void => {
  try { sessionStorage.removeItem(KEY); } catch { /* Storage can be disabled. */ }
  const url = new URL(window.location.href);
  url.searchParams.delete('pinterest');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
};

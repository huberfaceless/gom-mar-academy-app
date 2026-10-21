const TRANSIENT_STATUS = new Set([502, 503, 504]);

export const waitForFirestoreRetry = (attempt: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt + Math.floor(Math.random() * 200)));

/** Read operations only. Never replay a publication, delivery reservation or arbitrary write. */
export const fetchFirestoreRead = async (url: string, init: RequestInit = {}): Promise<Response> => {
  if (init.method && init.method.toUpperCase() !== 'GET') throw new Error('Firestore-Lesewiederholungen erlauben nur GET.');
  if (new URL(url).hostname !== 'firestore.googleapis.com') throw new Error('Ungültiger Firestore-Leseendpunkt.');
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal: init.signal || AbortSignal.timeout(8_000) });
      if (!TRANSIENT_STATUS.has(response.status) || attempt >= 2) return response;
      await response.body?.cancel();
    } catch (error) {
      if (init.signal?.aborted || attempt >= 2 || !(error instanceof TypeError
        || (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)))) throw error;
    }
    await waitForFirestoreRetry(attempt);
  }
};

export const isTransientFirestoreError = (error: unknown): boolean =>
  error instanceof TypeError || (error instanceof Error && (
    ['TimeoutError', 'AbortError'].includes(error.name)
    || TRANSIENT_STATUS.has((error as Error & { status?: number }).status || 0)
  ));

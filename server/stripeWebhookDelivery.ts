import { GoogleAuth } from 'google-auth-library';

type Document = { updateTime: string; fields: Record<string, { stringValue?: string }> };
export type DeliveryState = { completed: boolean; leaseUntil: number; steps: string[]; emailUncertain?: boolean };
export class UncertainContractEmailError extends Error {}
export interface DeliveryStore {
  load(): Promise<{ state: DeliveryState; version: string } | null>;
  save(state: DeliveryState, version: string | null): Promise<string>;
}
const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const leaseMs = 300_000;

export const firestoreStripeDeliveryStore = (projectId: string, eventId: string): DeliveryStore => {
  const database = process.env.FIREBASE_DATABASE_ID || '(default)';
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(database)}/documents/academyStripeWebhookDeliveries/${encodeURIComponent(eventId)}`;
  const request = async (target: string, options?: RequestInit) => {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    if (!token.token) throw new Error('Google-Anmeldedaten für Stripe-Webhooks fehlen.');
    return fetch(target, { ...options, headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30_000) });
  };
  return {
    async load() {
      const response = await request(url);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error('Stripe-Webhook-Verarbeitung konnte nicht geladen werden.');
      const document = await response.json() as Document;
      return { state: JSON.parse(document.fields.state.stringValue!) as DeliveryState, version: document.updateTime };
    },
    async save(state, version) {
      // Firestore preconditions serialize claims across Cloud Run instances.
      const condition = version === null ? 'currentDocument.exists=false' : `currentDocument.updateTime=${encodeURIComponent(version)}`;
      const response = await request(`${url}?${condition}`, { method: 'PATCH', body: JSON.stringify({ fields: { state: { stringValue: JSON.stringify(state) } } }) });
      if (!response.ok) throw new Error('Stripe-Webhook ist bereits in Verarbeitung oder konnte nicht gespeichert werden.');
      return (await response.json() as Document).updateTime;
    },
  };
};

export type DeliveryStep = (name: string, action: () => Promise<unknown>) => Promise<void>;
export const processStripeDelivery = async (
  store: DeliveryStore,
  action: (step: DeliveryStep) => Promise<void>,
  now: () => number = Date.now,
): Promise<'processed' | 'duplicate'> => {
  const existing = await store.load();
  if (existing?.state.completed) return 'duplicate';
  if (existing && existing.state.leaseUntil > now()) throw new Error('Stripe-Webhook wird bereits verarbeitet. Bitte erneut zustellen.');
  if (existing?.state.emailUncertain) throw new Error('Stripe-Vertrags-E-Mail: Versandstatus unklar. SendGrid prüfen, bevor erneut versandt wird.');
  let state: DeliveryState = { completed: false, leaseUntil: now() + leaseMs, steps: existing?.state.steps || [] };
  let version = await store.save(state, existing?.version || null);
  const persist = async (next: DeliveryState) => {
    version = await store.save(next, version);
    state = next;
  };
  try {
    await action(async (name, run) => {
      if (state.steps.includes(name)) return;
      // Renew and verify ownership before performing any external action.
      const email = name === 'contract-email';
      await persist({ ...state, leaseUntil: now() + leaseMs, ...(email ? { emailUncertain: true } : {}) });
      try {
        await run();
      } catch (error) {
        // Definite rejection can be retried. Network timeouts cannot prove non-delivery.
        if (email && !(error instanceof UncertainContractEmailError)) await persist({ ...state, emailUncertain: false });
        throw error;
      }
      await persist({ ...state, steps: [...state.steps, name], ...(email ? { emailUncertain: false } : {}) });
    });
    await persist({ ...state, completed: true, leaseUntil: 0 });
    return 'processed';
  } catch (error) {
    // Keep completed steps; a failed email may be retried without reactivating PRO.
    try { await persist({ ...state, leaseUntil: 0 }); } catch { /* A stale owner must not overwrite a newer claim. */ }
    throw error;
  }
};

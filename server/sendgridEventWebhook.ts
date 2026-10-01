import { createHash, createPublicKey, verify } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
export type SendgridDeliveryState = 'processed' | 'deferred' | 'delivered' | 'bounce' | 'dropped';
const ranks: Record<SendgridDeliveryState, number> = { processed: 0, deferred: 1, delivered: 2, bounce: 3, dropped: 3 };
export const verifySendgridEventSignature = (body: Buffer, signature: string | undefined, timestamp: string | undefined, publicKey: string): boolean => {
  try {
    if (!signature || !/^[A-Za-z0-9+/]+={0,2}$/.test(signature) || signature.length > 256 || !timestamp || !/^\d{1,12}$/.test(timestamp)) return false;
    const key = publicKey.includes('BEGIN PUBLIC KEY') ? createPublicKey(publicKey) : createPublicKey({ key: Buffer.from(publicKey, 'base64'), format: 'der', type: 'spki' });
    if (key.asymmetricKeyType !== 'ec' || key.asymmetricKeyDetails?.namedCurve !== 'prime256v1') return false;
    // SendGrid signiert SHA-256 über Zeitstempel und unveränderte Nutzdaten.
    return verify('sha256', Buffer.concat([Buffer.from(timestamp), body]), key, Buffer.from(signature, 'base64'));
  } catch { return false; }
};

export type DeliveryEvent = { deliveryId: string; state: SendgridDeliveryState; timestamp: number; eventHash: string };
export const parseSendgridDeliveryEvents = (body: Buffer): DeliveryEvent[] => {
  const events: unknown = JSON.parse(body.toString('utf8'));
  if (!Array.isArray(events) || events.length > 1000) throw new Error('Ungültiger Ereignisstapel.');
  return events.flatMap(event => {
    if (!event || typeof event !== 'object') return [];
    const e = event as Record<string, unknown>;
    // custom_args erscheinen in SendGrid-Ereignissen als Felder auf oberster Ebene.
    if (typeof e.academy_delivery_id !== 'string' || !/^[a-f0-9]{64}$/.test(e.academy_delivery_id)
      || typeof e.event !== 'string' || !Object.hasOwn(ranks, e.event)
      || typeof e.timestamp !== 'number' || !Number.isSafeInteger(e.timestamp) || e.timestamp < 0 || e.timestamp > 253402300799
      || typeof e.sg_event_id !== 'string' || !e.sg_event_id || e.sg_event_id.length > 100) return [];
    return [{ deliveryId: e.academy_delivery_id, state: e.event as SendgridDeliveryState, timestamp: e.timestamp,
      eventHash: createHash('sha256').update(e.sg_event_id).digest('hex') }];
  });
};

export const shouldApplyDeliveryEvent = (previous: { state?: string; timestamp?: number; eventHash?: string }, event: DeliveryEvent) => {
  if (previous.eventHash === event.eventHash) return false;
  if (previous.state && Object.hasOwn(ranks, previous.state)) {
    // Späte Verarbeitungs-/Verzögerungsmeldungen dürfen Endzustände nicht zurücksetzen.
    if (ranks[previous.state as SendgridDeliveryState] >= 2 && ranks[event.state] < 2) return false;
    if (event.timestamp < (previous.timestamp || 0)) return false;
    if (event.timestamp === previous.timestamp && ranks[event.state] <= ranks[previous.state as SendgridDeliveryState]) return false;
  }
  return true;
};

type Document = { updateTime?: string; fields?: Record<string, { stringValue?: string; integerValue?: string }> };
export const recordSendgridDeliveryEvents = async (projectId: string, events: DeliveryEvent[]) => {
  if (!events.length) return;
  const token = await (await auth.getClient()).getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten fehlen.');
  const headers = { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' };
  for (const event of events) {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(process.env.FIREBASE_DATABASE_ID || '(default)')}/documents/academyEmailDeliveries/${event.deliveryId}`;
    let completed = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await fetch(url, { headers });
      if (response.status === 404) { completed = true; break; }
      if (!response.ok) throw new Error('Versanddatensatz konnte nicht geladen werden.');
      const document = await response.json() as Document;
      const f = document.fields || {};
      if (!f.ownerUid?.stringValue || !f.campaignId?.stringValue || !f.emailId?.stringValue) { completed = true; break; }
      if (!shouldApplyDeliveryEvent({ state: f.deliveryState?.stringValue, timestamp: Number(f.deliveryEventTimestamp?.integerValue || 0), eventHash: f.deliveryEventHash?.stringValue }, event)) { completed = true; break; }
      if (!document.updateTime) throw new Error('Versionsstand des Versanddatensatzes fehlt.');
      const params = new URLSearchParams({ 'currentDocument.updateTime': document.updateTime });
      for (const field of ['deliveryState', 'deliveryEventTimestamp', 'deliveryEventHash', 'deliveryEventReceivedAt']) params.append('updateMask.fieldPaths', field);
      const updated = await fetch(`${url}?${params}`, { method: 'PATCH', headers, body: JSON.stringify({ fields: {
        deliveryState: { stringValue: event.state }, deliveryEventTimestamp: { integerValue: String(event.timestamp) },
        deliveryEventHash: { stringValue: event.eventHash }, deliveryEventReceivedAt: { timestampValue: new Date().toISOString() },
      } }) });
      if (updated.status === 409 || updated.status === 412) continue;
      if (updated.status === 400) {
        const error = await updated.json().catch(() => ({})) as { error?: { status?: string } };
        if (error.error?.status === 'FAILED_PRECONDITION') continue;
      }
      if (!updated.ok) throw new Error('Zustellereignis konnte nicht gespeichert werden.');
      completed = true; break;
    }
    if (!completed) throw new Error('Gleichzeitige Zustellmeldungen erfordern erneute Verarbeitung.');
  }
};

import { createHmac, timingSafeEqual } from 'crypto';

type WhatsAppWebhookEntry = {
  id?: unknown;
  changes?: Array<{
    field?: unknown;
    value?: {
      messages?: unknown[];
      statuses?: unknown[];
    };
  }>;
};

export type WhatsAppWebhookPayload = {
  object?: unknown;
  entry?: WhatsAppWebhookEntry[];
};

export const verifyWhatsAppWebhookChallenge = (
  query: Record<string, unknown>,
  configuredToken: string,
): string | null => {
  const mode = query['hub.mode'];
  const token = query['hub.verify_token'];
  const challenge = query['hub.challenge'];

  if (mode !== 'subscribe' || token !== configuredToken || typeof challenge !== 'string') {
    return null;
  }

  return challenge;
};

export const verifyWhatsAppWebhookSignature = (
  rawBody: Buffer,
  signatureHeader: string | undefined,
  appSecret: string,
): boolean => {
  if (!signatureHeader?.startsWith('sha256=')) return false;

  const receivedHex = signatureHeader.slice('sha256='.length);
  if (!/^[a-f0-9]{64}$/iu.test(receivedHex)) return false;

  const received = Buffer.from(receivedHex, 'hex');
  const expected = createHmac('sha256', appSecret).update(rawBody).digest();
  return received.length === expected.length && timingSafeEqual(received, expected);
};

export const summarizeWhatsAppWebhook = (payload: WhatsAppWebhookPayload) => {
  const entries = Array.isArray(payload.entry) ? payload.entry : [];
  let messageCount = 0;
  let statusCount = 0;
  const fields = new Set<string>();

  for (const entry of entries) {
    for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
      if (typeof change.field === 'string') fields.add(change.field);
      if (Array.isArray(change.value?.messages)) messageCount += change.value.messages.length;
      if (Array.isArray(change.value?.statuses)) statusCount += change.value.statuses.length;
    }
  }

  return {
    object: typeof payload.object === 'string' ? payload.object : 'unknown',
    entryCount: entries.length,
    messageCount,
    statusCount,
    fields: [...fields],
  };
};

import { createHmac, timingSafeEqual } from 'crypto';

type WhatsAppWebhookEntry = {
  id?: unknown;
  changes?: Array<{
    field?: unknown;
    value?: {
      contacts?: unknown[];
      messages?: unknown[];
      metadata?: unknown;
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

type WhatsAppDeliveryError = {
  code?: number | string;
  title?: string;
  message?: string;
  details?: string;
};

export type WhatsAppDeliveryStatus = {
  messageId?: string;
  status?: string;
  timestamp?: string;
  conversationOriginType?: string;
  pricingCategory?: string;
  billable?: boolean;
  errors: WhatsAppDeliveryError[];
};

const MAX_DELIVERY_STATUSES = 20;
const MAX_ERRORS_PER_STATUS = 10;
const MAX_LOG_STRING_LENGTH = 500;
const MAX_INBOUND_MESSAGES = 50;
const MAX_MESSAGE_TEXT_LENGTH = 4_096;

const asRecord = (value: unknown): Record<string, unknown> | null => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
);

const sanitizedString = (value: unknown): string | undefined => (
  typeof value === 'string'
    ? value.slice(0, MAX_LOG_STRING_LENGTH)
    : undefined
);

const sanitizedMessageText = (value: unknown): string | undefined => (
  typeof value === 'string'
    ? value.slice(0, MAX_MESSAGE_TEXT_LENGTH)
    : undefined
);

export type WhatsAppInboundMessage = {
  messageId: string;
  senderPhone: string;
  senderName?: string;
  timestamp: string;
  type: string;
  text: string;
};

const inboundMessageText = (message: Record<string, unknown>, type: string): string => {
  const text = asRecord(message.text);
  if (type === 'text') return sanitizedMessageText(text?.body) || '';

  const button = asRecord(message.button);
  if (type === 'button') return sanitizedMessageText(button?.text) || '[Schaltfläche]';

  const interactive = asRecord(message.interactive);
  const buttonReply = asRecord(interactive?.button_reply);
  const listReply = asRecord(interactive?.list_reply);
  if (type === 'interactive') {
    return sanitizedMessageText(buttonReply?.title)
      || sanitizedMessageText(listReply?.title)
      || '[Interaktive Antwort]';
  }

  const media = asRecord(message[type]);
  const caption = sanitizedMessageText(media?.caption);
  const labels: Record<string, string> = {
    audio: 'Audio',
    document: 'Dokument',
    image: 'Bild',
    location: 'Standort',
    reaction: 'Reaktion',
    sticker: 'Sticker',
    video: 'Video',
  };
  return caption || `[${labels[type] || 'Nicht unterstützte Nachricht'}]`;
};

export const extractWhatsAppInboundMessages = (
  payload: WhatsAppWebhookPayload,
): WhatsAppInboundMessage[] => {
  const result: WhatsAppInboundMessage[] = [];
  const entries = Array.isArray(payload.entry) ? payload.entry : [];

  for (const entry of entries) {
    for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
      const contacts = Array.isArray(change.value?.contacts) ? change.value.contacts : [];
      const contactNames = new Map<string, string>();
      for (const rawContact of contacts) {
        const contact = asRecord(rawContact);
        const profile = asRecord(contact?.profile);
        const phone = sanitizedString(contact?.wa_id);
        const name = sanitizedString(profile?.name);
        if (phone && name) contactNames.set(phone, name.slice(0, 200));
      }

      const messages = Array.isArray(change.value?.messages) ? change.value.messages : [];
      for (const rawMessage of messages) {
        if (result.length >= MAX_INBOUND_MESSAGES) return result;
        const message = asRecord(rawMessage);
        if (!message) continue;

        const messageId = sanitizedString(message.id);
        const senderPhone = sanitizedString(message.from);
        const timestamp = sanitizedString(message.timestamp);
        const type = sanitizedString(message.type)?.slice(0, 32) || 'unknown';
        if (!messageId || !senderPhone || !timestamp) continue;

        result.push({
          messageId,
          senderPhone: senderPhone.slice(0, 32),
          senderName: contactNames.get(senderPhone),
          timestamp,
          type,
          text: inboundMessageText(message, type),
        });
      }
    }
  }

  return result;
};

export const extractWhatsAppDeliveryStatuses = (
  payload: WhatsAppWebhookPayload,
): WhatsAppDeliveryStatus[] => {
  const result: WhatsAppDeliveryStatus[] = [];
  const entries = Array.isArray(payload.entry) ? payload.entry : [];

  for (const entry of entries) {
    for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
      const statuses = Array.isArray(change.value?.statuses) ? change.value.statuses : [];

      for (const rawStatus of statuses) {
        if (result.length >= MAX_DELIVERY_STATUSES) return result;

        const status = asRecord(rawStatus);
        if (!status) continue;

        const conversation = asRecord(status.conversation);
        const origin = asRecord(conversation?.origin);
        const pricing = asRecord(status.pricing);
        const rawErrors = Array.isArray(status.errors) ? status.errors : [];
        const errors = rawErrors.slice(0, MAX_ERRORS_PER_STATUS).flatMap((rawError) => {
          const error = asRecord(rawError);
          if (!error) return [];

          const errorData = asRecord(error.error_data);
          const code = typeof error.code === 'number' || typeof error.code === 'string'
            ? error.code
            : undefined;

          return [{
            code,
            title: sanitizedString(error.title),
            message: sanitizedString(error.message),
            details: sanitizedString(errorData?.details),
          }];
        });

        result.push({
          messageId: sanitizedString(status.id),
          status: sanitizedString(status.status),
          timestamp: sanitizedString(status.timestamp),
          conversationOriginType: sanitizedString(origin?.type),
          pricingCategory: sanitizedString(pricing?.category),
          billable: typeof pricing?.billable === 'boolean' ? pricing.billable : undefined,
          errors,
        });
      }
    }
  }

  return result;
};

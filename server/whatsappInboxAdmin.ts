import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import type { WhatsAppInboundMessage } from './whatsappWebhook.js';

type FirestoreValue = {
  stringValue?: string;
  timestampValue?: string;
};

type FirestoreDocument = {
  fields?: Record<string, FirestoreValue>;
};

export type WhatsAppInboxMessage = WhatsAppInboundMessage & {
  receivedAt: string;
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const FIRESTORE_DATABASE_ID = process.env.FIREBASE_DATABASE_ID || '(default)';
const COLLECTION_NAME = 'whatsappInboxMessages';

const documentsUrl = (projectId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents/${COLLECTION_NAME}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für den WhatsApp-Posteingang fehlen.');
  return token.token;
};

const documentId = (messageId: string) =>
  createHash('sha256').update(messageId).digest('hex');

const storedMessage = (document: FirestoreDocument): WhatsAppInboxMessage | null => {
  const fields = document.fields;
  const messageId = fields?.messageId?.stringValue;
  const senderPhone = fields?.senderPhone?.stringValue;
  const timestamp = fields?.timestamp?.stringValue;
  const type = fields?.type?.stringValue;
  const text = fields?.text?.stringValue;
  const receivedAt = fields?.receivedAt?.timestampValue;
  if (!messageId || !senderPhone || !timestamp || !type || text === undefined || !receivedAt) return null;
  return {
    messageId,
    senderPhone,
    senderName: fields?.senderName?.stringValue,
    timestamp,
    type,
    text,
    receivedAt,
  };
};

export const saveWhatsAppInboundMessages = async (
  projectId: string,
  messages: WhatsAppInboundMessage[],
): Promise<void> => {
  if (messages.length === 0) return;
  const token = await getAccessToken();

  for (const message of messages) {
    const response = await fetch(`${documentsUrl(projectId)}/${documentId(message.messageId)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          messageId: { stringValue: message.messageId },
          senderPhone: { stringValue: message.senderPhone },
          ...(message.senderName ? { senderName: { stringValue: message.senderName } } : {}),
          timestamp: { stringValue: message.timestamp },
          type: { stringValue: message.type },
          text: { stringValue: message.text },
          receivedAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });
    if (!response.ok) {
      console.error('WhatsApp-Nachricht konnte nicht gespeichert werden.', { status: response.status });
      throw new Error('Der WhatsApp-Posteingang ist derzeit nicht verfügbar.');
    }
  }
};

export const listWhatsAppInboxMessages = async (
  projectId: string,
  requestedLimit = 100,
): Promise<WhatsAppInboxMessage[]> => {
  const limit = Math.min(Math.max(Math.trunc(requestedLimit) || 100, 1), 200);
  const token = await getAccessToken();
  const messages: WhatsAppInboxMessage[] = [];
  let pageToken = '';

  do {
    const url = new URL(documentsUrl(projectId));
    url.searchParams.set('pageSize', '200');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 404) return [];
    if (!response.ok) {
      console.error('WhatsApp-Posteingang konnte nicht geladen werden.', { status: response.status });
      throw new Error('Der WhatsApp-Posteingang ist derzeit nicht verfügbar.');
    }
    const payload = await response.json() as {
      documents?: FirestoreDocument[];
      nextPageToken?: string;
    };
    for (const document of payload.documents || []) {
      const message = storedMessage(document);
      if (message) messages.push(message);
    }
    pageToken = payload.nextPageToken || '';
  } while (pageToken && messages.length < 1_000);

  return messages
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, limit);
};

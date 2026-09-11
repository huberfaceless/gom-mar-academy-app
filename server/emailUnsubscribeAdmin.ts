import { GoogleAuth } from 'google-auth-library';
import { createHash, randomBytes } from 'node:crypto';

type FirestoreDocument = {
  fields?: {
    email?: { stringValue?: string };
    memberUserId?: { stringValue?: string };
    createdAt?: { timestampValue?: string };
    usedAt?: { timestampValue?: string };
    suppressed?: { booleanValue?: boolean };
    updatedAt?: { timestampValue?: string };
  };
};

export type MarketingUnsubscribeResult = {
  email: string;
  memberUserId: string | null;
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const tokenHash = (token: string): string => createHash('sha256').update(token).digest('hex');
const emailHash = (email: string): string => createHash('sha256').update(email.trim().toLowerCase()).digest('hex');

const documentUrl = (projectId: string, collection: string, documentId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/${collection}/${encodeURIComponent(documentId)}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Marketing-Abmeldung fehlen.');
  return token.token;
};

const loadDocument = async (url: string): Promise<FirestoreDocument | null> => {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${await getAccessToken()}` } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Der Abmeldestatus konnte nicht geladen werden.');
  return response.json() as Promise<FirestoreDocument>;
};

const writeDocument = async (url: string, fields: Record<string, unknown>): Promise<void> => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) throw new Error('Der Abmeldestatus konnte nicht gespeichert werden.');
};

export const isMarketingEmailSuppressed = async (
  projectId: string,
  email: string,
  activeConsentUpdatedAt?: string | null,
): Promise<boolean> => {
  const document = await loadDocument(documentUrl(projectId, 'academyEmailSuppressions', emailHash(email)));
  if (document?.fields?.suppressed?.booleanValue !== true) return false;
  const suppressionUpdatedAt = document.fields?.updatedAt?.timestampValue || '';
  return !activeConsentUpdatedAt
    || !suppressionUpdatedAt
    || Date.parse(suppressionUpdatedAt) >= Date.parse(activeConsentUpdatedAt);
};

export const createMarketingUnsubscribeToken = async (
  projectId: string,
  email: string,
  memberUserId?: string,
): Promise<string> => {
  const token = randomBytes(32).toString('base64url');
  const createdAt = new Date().toISOString();
  await writeDocument(documentUrl(projectId, 'academyEmailUnsubscribeTokens', tokenHash(token)), {
    email: { stringValue: email.trim().toLowerCase() },
    memberUserId: { stringValue: memberUserId || '' },
    createdAt: { timestampValue: createdAt },
  });
  return token;
};

export const unsubscribeMarketingEmail = async (
  projectId: string,
  token: string,
): Promise<MarketingUnsubscribeResult> => {
  const suppliedHash = tokenHash(token);
  const tokenDocumentUrl = documentUrl(projectId, 'academyEmailUnsubscribeTokens', suppliedHash);
  const document = await loadDocument(tokenDocumentUrl);
  const email = document?.fields?.email?.stringValue?.trim().toLowerCase() || '';
  if (!document || !email) throw new Error('Der Abmeldelink ist ungültig.');

  const timestamp = new Date().toISOString();
  await writeDocument(documentUrl(projectId, 'academyEmailSuppressions', emailHash(email)), {
    email: { stringValue: email },
    suppressed: { booleanValue: true },
    source: { stringValue: 'email-unsubscribe-link' },
    updatedAt: { timestampValue: timestamp },
  });
  await writeDocument(tokenDocumentUrl, {
    email: { stringValue: email },
    memberUserId: { stringValue: document.fields?.memberUserId?.stringValue || '' },
    createdAt: { timestampValue: document.fields?.createdAt?.timestampValue || timestamp },
    usedAt: { timestampValue: timestamp },
  });

  return {
    email,
    memberUserId: document.fields?.memberUserId?.stringValue || null,
  };
};

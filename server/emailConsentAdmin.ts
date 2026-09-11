import { GoogleAuth } from 'google-auth-library';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const EMAIL_CONSENT_POLICY_VERSION = 'academy-marketing-v2-double-opt-in-2026-09-11';

export type EmailConsent = {
  granted: boolean;
  pending: boolean;
  email: string;
  policyVersion: string;
  updatedAt: string | null;
};

type ConsentEvent = {
  action: 'requested' | 'confirmed' | 'withdrawn';
  email: string;
  policyVersion: string;
  source: 'academy-profile' | 'email-unsubscribe-link';
  timestamp: string;
};

type FirestoreDocument = {
  fields?: {
    granted?: { booleanValue?: boolean };
    email?: { stringValue?: string };
    policyVersion?: { stringValue?: string };
    updatedAt?: { timestampValue?: string };
    historyJson?: { stringValue?: string };
    confirmationTokenHash?: { stringValue?: string };
    confirmationExpiresAt?: { timestampValue?: string };
  };
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyEmailConsents/${encodeURIComponent(userId)}`;
const CONFIRMATION_VALIDITY_MS = 24 * 60 * 60 * 1000;
const tokenHash = (token: string): string => createHash('sha256').update(token).digest('hex');

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die E-Mail-Einwilligung fehlen.');
  return token.token;
};

const parseHistory = (document: FirestoreDocument): ConsentEvent[] => {
  try {
    const parsed = JSON.parse(document.fields?.historyJson?.stringValue || '[]') as unknown;
    return Array.isArray(parsed) ? parsed.filter((event): event is ConsentEvent => Boolean(event) && typeof event === 'object') : [];
  } catch {
    return [];
  }
};

export const loadEmailConsent = async (projectId: string, userId: string): Promise<EmailConsent> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) {
    return { granted: false, pending: false, email: '', policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: null };
  }
  if (!response.ok) throw new Error('Die E-Mail-Einwilligung konnte nicht geladen werden.');
  const document = await response.json() as FirestoreDocument;
  const confirmationExpiresAt = document.fields?.confirmationExpiresAt?.timestampValue || '';
  return {
    granted: document.fields?.granted?.booleanValue === true,
    pending: Boolean(
      document.fields?.confirmationTokenHash?.stringValue
      && confirmationExpiresAt
      && Date.parse(confirmationExpiresAt) > Date.now(),
    ),
    email: document.fields?.email?.stringValue || '',
    policyVersion: document.fields?.policyVersion?.stringValue || EMAIL_CONSENT_POLICY_VERSION,
    updatedAt: document.fields?.updatedAt?.timestampValue || null,
  };
};

const loadConsentDocument = async (projectId: string, userId: string): Promise<FirestoreDocument> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) return {};
  if (!response.ok) throw new Error('Die bestehende E-Mail-Einwilligung konnte nicht geladen werden.');
  return response.json() as Promise<FirestoreDocument>;
};

const writeConsentDocument = async (projectId: string, userId: string, fields: Record<string, unknown>): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) throw new Error('Die E-Mail-Einwilligung konnte nicht gespeichert werden.');
};

export const requestEmailConsent = async (
  projectId: string,
  userId: string,
  email: string,
): Promise<{ consent: EmailConsent; confirmationToken: string }> => {
  const currentDocument = await loadConsentDocument(projectId, userId);
  const timestamp = new Date().toISOString();
  const confirmationToken = randomBytes(32).toString('base64url');
  const confirmationExpiresAt = new Date(Date.now() + CONFIRMATION_VALIDITY_MS).toISOString();
  const event: ConsentEvent = {
    action: 'requested',
    email,
    policyVersion: EMAIL_CONSENT_POLICY_VERSION,
    source: 'academy-profile',
    timestamp,
  };
  const history = [...parseHistory(currentDocument), event].slice(-100);
  await writeConsentDocument(projectId, userId, {
    userId: { stringValue: userId },
    granted: { booleanValue: false },
    email: { stringValue: email },
    policyVersion: { stringValue: EMAIL_CONSENT_POLICY_VERSION },
    source: { stringValue: 'academy-profile' },
    updatedAt: { timestampValue: timestamp },
    confirmationTokenHash: { stringValue: tokenHash(confirmationToken) },
    confirmationExpiresAt: { timestampValue: confirmationExpiresAt },
    historyJson: { stringValue: JSON.stringify(history) },
  });
  return {
    consent: { granted: false, pending: true, email, policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: timestamp },
    confirmationToken,
  };
};

export const confirmEmailConsent = async (
  projectId: string,
  userId: string,
  confirmationToken: string,
): Promise<EmailConsent> => {
  const currentDocument = await loadConsentDocument(projectId, userId);
  const storedHash = currentDocument.fields?.confirmationTokenHash?.stringValue || '';
  const expiresAt = currentDocument.fields?.confirmationExpiresAt?.timestampValue || '';
  const suppliedHash = tokenHash(confirmationToken);
  const tokenMatches = storedHash.length === suppliedHash.length
    && timingSafeEqual(Buffer.from(storedHash), Buffer.from(suppliedHash));
  if (!tokenMatches || !expiresAt || Date.parse(expiresAt) <= Date.now()) {
    throw new Error('Der Bestätigungslink ist ungültig oder abgelaufen.');
  }

  const email = currentDocument.fields?.email?.stringValue || '';
  const timestamp = new Date().toISOString();
  const history = [...parseHistory(currentDocument), {
    action: 'confirmed' as const,
    email,
    policyVersion: EMAIL_CONSENT_POLICY_VERSION,
    source: 'academy-profile' as const,
    timestamp,
  }].slice(-100);
  await writeConsentDocument(projectId, userId, {
    userId: { stringValue: userId },
    granted: { booleanValue: true },
    email: { stringValue: email },
    policyVersion: { stringValue: EMAIL_CONSENT_POLICY_VERSION },
    source: { stringValue: 'academy-profile' },
    updatedAt: { timestampValue: timestamp },
    confirmationTokenHash: { stringValue: '' },
    confirmationExpiresAt: { timestampValue: timestamp },
    historyJson: { stringValue: JSON.stringify(history) },
  });
  return { granted: true, pending: false, email, policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: timestamp };
};

export const withdrawEmailConsent = async (
  projectId: string,
  userId: string,
  email: string,
  source: ConsentEvent['source'] = 'academy-profile',
): Promise<EmailConsent> => {
  const currentDocument = await loadConsentDocument(projectId, userId);
  const timestamp = new Date().toISOString();
  const history = [...parseHistory(currentDocument), {
    action: 'withdrawn' as const,
    email,
    policyVersion: EMAIL_CONSENT_POLICY_VERSION,
    source,
    timestamp,
  }].slice(-100);
  await writeConsentDocument(projectId, userId, {
    userId: { stringValue: userId },
    granted: { booleanValue: false },
    email: { stringValue: email },
    policyVersion: { stringValue: EMAIL_CONSENT_POLICY_VERSION },
    source: { stringValue: source },
    updatedAt: { timestampValue: timestamp },
    confirmationTokenHash: { stringValue: '' },
    confirmationExpiresAt: { timestampValue: timestamp },
    historyJson: { stringValue: JSON.stringify(history) },
  });
  return { granted: false, pending: false, email, policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: timestamp };
};

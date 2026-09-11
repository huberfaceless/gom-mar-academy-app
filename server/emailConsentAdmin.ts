import { GoogleAuth } from 'google-auth-library';

export const EMAIL_CONSENT_POLICY_VERSION = 'academy-marketing-v1-2026-09-11';

export type EmailConsent = {
  granted: boolean;
  email: string;
  policyVersion: string;
  updatedAt: string | null;
};

type ConsentEvent = {
  granted: boolean;
  email: string;
  policyVersion: string;
  source: 'academy-profile';
  timestamp: string;
};

type FirestoreDocument = {
  fields?: {
    granted?: { booleanValue?: boolean };
    email?: { stringValue?: string };
    policyVersion?: { stringValue?: string };
    updatedAt?: { timestampValue?: string };
    historyJson?: { stringValue?: string };
  };
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyEmailConsents/${encodeURIComponent(userId)}`;

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
    return { granted: false, email: '', policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: null };
  }
  if (!response.ok) throw new Error('Die E-Mail-Einwilligung konnte nicht geladen werden.');
  const document = await response.json() as FirestoreDocument;
  return {
    granted: document.fields?.granted?.booleanValue === true,
    email: document.fields?.email?.stringValue || '',
    policyVersion: document.fields?.policyVersion?.stringValue || EMAIL_CONSENT_POLICY_VERSION,
    updatedAt: document.fields?.updatedAt?.timestampValue || null,
  };
};

export const saveEmailConsent = async (
  projectId: string,
  userId: string,
  email: string,
  granted: boolean,
): Promise<EmailConsent> => {
  const currentResponse = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (currentResponse.status !== 404 && !currentResponse.ok) {
    throw new Error('Die bestehende E-Mail-Einwilligung konnte nicht geladen werden.');
  }
  const currentDocument = currentResponse.status === 404 ? {} : await currentResponse.json() as FirestoreDocument;
  const timestamp = new Date().toISOString();
  const event: ConsentEvent = {
    granted,
    email,
    policyVersion: EMAIL_CONSENT_POLICY_VERSION,
    source: 'academy-profile',
    timestamp,
  };
  const history = [...parseHistory(currentDocument), event].slice(-100);
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        granted: { booleanValue: granted },
        email: { stringValue: email },
        policyVersion: { stringValue: EMAIL_CONSENT_POLICY_VERSION },
        source: { stringValue: 'academy-profile' },
        updatedAt: { timestampValue: timestamp },
        historyJson: { stringValue: JSON.stringify(history) },
      },
    }),
  });
  if (!response.ok) throw new Error('Die E-Mail-Einwilligung konnte nicht gespeichert werden.');
  return { granted, email, policyVersion: EMAIL_CONSENT_POLICY_VERSION, updatedAt: timestamp };
};

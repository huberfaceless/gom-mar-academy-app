import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { EMAIL_CONSENT_POLICY_VERSION } from './emailConsentAdmin.js';

type Document = { fields?: Record<string, { stringValue?: string; booleanValue?: boolean; timestampValue?: string }> };
const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const normalize = (email: string) => email.trim().toLowerCase();
const url = (projectId: string, email: string) => `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(process.env.FIREBASE_DATABASE_ID || '(default)')}/documents/academyExternalEmailConsents/${digest(normalize(email))}`;

const read = async (projectId: string, email: string): Promise<Document> => {
  const client = await auth.getClient();
  const response = await fetch(url(projectId, email), { headers: { Authorization: `Bearer ${(await client.getAccessToken()).token}` } });
  if (response.status === 404) return {};
  if (!response.ok) throw new Error('Die Einwilligung konnte nicht geprüft werden.');
  return response.json() as Promise<Document>;
};

const write = async (projectId: string, email: string, fields: Document['fields']) => {
  const client = await auth.getClient();
  const response = await fetch(url(projectId, email), { method: 'PATCH', headers: { Authorization: `Bearer ${(await client.getAccessToken()).token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }) });
  if (!response.ok) throw new Error('Die Einwilligung konnte nicht gespeichert werden.');
};

export const loadExternalEmailConsent = async (projectId: string, email: string) => {
  const fields = (await read(projectId, email)).fields;
  return { granted: fields?.granted?.booleanValue === true && fields?.email?.stringValue === normalize(email), updatedAt: fields?.updatedAt?.timestampValue || null };
};

export const requestExternalEmailConsent = async (projectId: string, email: string): Promise<string | null> => {
  const normalized = normalize(email);
  const fields = (await read(projectId, normalized)).fields;
  if (fields?.granted?.booleanValue === true || (fields?.requestedAt?.timestampValue && Date.now() - Date.parse(fields.requestedAt.timestampValue) < 60 * 60 * 1000)) return null;
  const token = randomBytes(32).toString('base64url');
  const now = new Date().toISOString();
  await write(projectId, normalized, {
    email: { stringValue: normalized }, granted: { booleanValue: false }, policyVersion: { stringValue: EMAIL_CONSENT_POLICY_VERSION },
    requestedAt: { timestampValue: now }, updatedAt: { timestampValue: now }, confirmationTokenHash: { stringValue: digest(token) },
    confirmationExpiresAt: { timestampValue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    historyJson: { stringValue: JSON.stringify([...JSON.parse(fields?.historyJson?.stringValue || '[]'), { action: 'requested', source: 'public-signup', policyVersion: EMAIL_CONSENT_POLICY_VERSION, timestamp: now }].slice(-100)) },
  });
  return token;
};

export const confirmExternalEmailConsent = async (projectId: string, email: string, token: string) => {
  const normalized = normalize(email);
  const fields = (await read(projectId, normalized)).fields;
  const expected = fields?.confirmationTokenHash?.stringValue || '';
  const actual = digest(token);
  if (expected.length !== actual.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(actual)) || !fields?.confirmationExpiresAt?.timestampValue || Date.parse(fields.confirmationExpiresAt.timestampValue) <= Date.now() || fields?.email?.stringValue !== normalized) throw new Error('Der Bestätigungslink ist ungültig oder abgelaufen.');
  const now = new Date().toISOString();
  await write(projectId, normalized, {
    ...fields, granted: { booleanValue: true }, updatedAt: { timestampValue: now }, confirmationTokenHash: { stringValue: '' }, confirmationExpiresAt: { timestampValue: now },
    historyJson: { stringValue: JSON.stringify([...JSON.parse(fields.historyJson?.stringValue || '[]'), { action: 'confirmed', source: 'email-confirmation', policyVersion: EMAIL_CONSENT_POLICY_VERSION, timestamp: now }].slice(-100)) },
  });
};

export const withdrawExternalEmailConsent = async (projectId: string, email: string) => {
  const normalized = normalize(email);
  const fields = (await read(projectId, normalized)).fields;
  if (!fields?.email?.stringValue) return;
  const now = new Date().toISOString();
  await write(projectId, normalized, {
    ...fields, granted: { booleanValue: false }, updatedAt: { timestampValue: now }, confirmationTokenHash: { stringValue: '' }, confirmationExpiresAt: { timestampValue: now },
    historyJson: { stringValue: JSON.stringify([...JSON.parse(fields.historyJson?.stringValue || '[]'), { action: 'withdrawn', source: 'email-unsubscribe-link', policyVersion: EMAIL_CONSENT_POLICY_VERSION, timestamp: now }].slice(-100)) },
  });
};

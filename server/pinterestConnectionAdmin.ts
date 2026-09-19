import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';

type FirestoreDocument = {
  fields?: {
    encryptedAccessToken?: { stringValue?: string };
    encryptionIv?: { stringValue?: string };
    encryptionTag?: { stringValue?: string };
    username?: { stringValue?: string };
    connectedAt?: { timestampValue?: string };
  };
};

const getEncryptionSecret = (): string => {
  const secret = process.env.PINTEREST_TOKEN_ENCRYPTION_KEY?.trim()
    || process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim()
    || '';
  if (!secret) throw new Error('Die Pinterest-Tokenverschlüsselung ist noch nicht konfiguriert.');
  return secret;
};

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyPinterestConnections/${encodeURIComponent(userId)}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Pinterest-Verbindung fehlen.');
  return token.token;
};

const loadDocument = async (projectId: string, userId: string): Promise<FirestoreDocument> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) throw new Error('Pinterest ist noch nicht verbunden.');
  if (!response.ok) throw new Error('Die Pinterest-Verbindung konnte nicht geladen werden.');
  return response.json() as Promise<FirestoreDocument>;
};

export const savePinterestConnection = async (
  projectId: string,
  userId: string,
  accessToken: string,
  username: string,
): Promise<void> => {
  const secret = getEncryptionSecret();
  const key = createHash('sha256').update(secret).digest();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(accessToken, 'utf8'), cipher.final()]);
  const timestamp = new Date().toISOString();
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: {
      userId: { stringValue: userId },
      encryptedAccessToken: { stringValue: encrypted.toString('base64url') },
      encryptionIv: { stringValue: iv.toString('base64url') },
      encryptionTag: { stringValue: cipher.getAuthTag().toString('base64url') },
      username: { stringValue: username },
      connectedAt: { timestampValue: timestamp },
      updatedAt: { timestampValue: timestamp },
    } }),
  });
  if (!response.ok) throw new Error('Die Pinterest-Verbindung konnte nicht sicher gespeichert werden.');
};

export const loadPinterestAccessToken = async (projectId: string, userId: string): Promise<string> => {
  const document = await loadDocument(projectId, userId);
  const encrypted = document.fields?.encryptedAccessToken?.stringValue || '';
  const iv = document.fields?.encryptionIv?.stringValue || '';
  const tag = document.fields?.encryptionTag?.stringValue || '';
  if (!encrypted || !iv || !tag) throw new Error('Die gespeicherte Pinterest-Verbindung ist unvollständig.');
  const decipher = createDecipheriv(
    'aes-256-gcm',
    createHash('sha256').update(getEncryptionSecret()).digest(),
    Buffer.from(iv, 'base64url'),
  );
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
};

export const loadPinterestConnectionStatus = async (projectId: string, userId: string) => {
  try {
    const document = await loadDocument(projectId, userId);
    return {
      connected: Boolean(document.fields?.encryptedAccessToken?.stringValue),
      username: document.fields?.username?.stringValue || '',
      connectedAt: document.fields?.connectedAt?.timestampValue || null,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Pinterest ist noch nicht verbunden.') {
      return { connected: false, username: '', connectedAt: null };
    }
    throw error;
  }
};

export const deletePinterestConnection = async (projectId: string, userId: string): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (!response.ok && response.status !== 404) throw new Error('Die Pinterest-Verbindung konnte nicht getrennt werden.');
};

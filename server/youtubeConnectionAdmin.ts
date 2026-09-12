import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const YOUTUBE_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';
const OAUTH_STATE_VALIDITY_MS = 10 * 60 * 1000;
const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';

type OAuthState = { uid: string; exp: number; nonce: string };
type FirestoreDocument = {
  fields?: {
    encryptedRefreshToken?: { stringValue?: string };
    encryptionIv?: { stringValue?: string };
    encryptionTag?: { stringValue?: string };
    connectedAt?: { timestampValue?: string };
    updatedAt?: { timestampValue?: string };
  };
};

type YouTubeUploadMetadata = {
  title: string;
  description: string;
  tags: string[];
  contentType: string;
  contentLength: number;
};

export type YouTubeConnectionStatus = {
  connected: boolean;
  connectedAt: string | null;
};

const getOAuthConfig = () => {
  const clientId = process.env.YOUTUBE_OAUTH_CLIENT_ID?.trim() || '';
  const clientSecret = process.env.YOUTUBE_OAUTH_CLIENT_SECRET?.trim() || '';
  const encryptionSecret = process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim() || '';
  const redirectUri = process.env.YOUTUBE_OAUTH_REDIRECT_URI?.trim()
    || 'https://academy.gomo-marketing.at/api/youtube/oauth/callback';
  if (!clientId || !clientSecret || !encryptionSecret) {
    throw new Error('Die YouTube-OAuth-Konfiguration ist noch nicht vollständig hinterlegt.');
  }
  return { clientId, clientSecret, encryptionSecret, redirectUri };
};

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyYouTubeConnections/${encodeURIComponent(userId)}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die YouTube-Verbindung fehlen.');
  return token.token;
};

const stateSignature = (payload: string, secret: string): Buffer =>
  createHmac('sha256', secret).update(payload).digest();

const createState = (userId: string, secret: string): { state: string; nonce: string } => {
  const nonce = randomBytes(16).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    uid: userId,
    exp: Date.now() + OAUTH_STATE_VALIDITY_MS,
    nonce,
  } satisfies OAuthState)).toString('base64url');
  return { state: `${payload}.${stateSignature(payload, secret).toString('base64url')}`, nonce };
};

const verifyState = (state: string, secret: string): OAuthState => {
  const [payload, suppliedSignature] = state.split('.');
  if (!payload || !suppliedSignature) throw new Error('Ungültiger YouTube-Verbindungsstatus.');
  const expected = stateSignature(payload, secret);
  const supplied = Buffer.from(suppliedSignature, 'base64url');
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    throw new Error('Ungültige YouTube-Verbindungssignatur.');
  }
  const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as OAuthState;
  if (!parsed.uid || !Number.isFinite(parsed.exp) || parsed.exp <= Date.now()) {
    throw new Error('Die YouTube-Verbindungsanfrage ist abgelaufen.');
  }
  return parsed;
};

const encryptRefreshToken = (refreshToken: string, secret: string) => {
  const key = createHash('sha256').update(secret).digest();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(refreshToken, 'utf8'), cipher.final()]);
  return {
    encryptedRefreshToken: encrypted.toString('base64url'),
    encryptionIv: iv.toString('base64url'),
    encryptionTag: cipher.getAuthTag().toString('base64url'),
  };
};

const loadYouTubeConnectionDocument = async (projectId: string, userId: string): Promise<FirestoreDocument> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) throw new Error('YouTube ist noch nicht verbunden.');
  if (!response.ok) throw new Error('Die YouTube-Verbindung konnte nicht geladen werden.');
  return response.json() as Promise<FirestoreDocument>;
};

const createYouTubeAccessToken = async (document: FirestoreDocument): Promise<string> => {
  const { clientId, clientSecret } = getOAuthConfig();
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: decryptYouTubeRefreshToken(document),
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json().catch(() => ({})) as { access_token?: string; error_description?: string };
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'Der YouTube-Zugriff konnte nicht erneuert werden.');
  }
  return data.access_token;
};

export const createYouTubeUploadSession = async (
  projectId: string,
  userId: string,
  metadata: YouTubeUploadMetadata,
): Promise<string> => {
  const document = await loadYouTubeConnectionDocument(projectId, userId);
  const accessToken = await createYouTubeAccessToken(document);
  const response = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': metadata.contentType,
      'X-Upload-Content-Length': String(metadata.contentLength),
    },
    body: JSON.stringify({
      snippet: {
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
      },
      status: {
        privacyStatus: 'unlisted',
        selfDeclaredMadeForKids: false,
      },
    }),
  });
  const uploadUrl = response.headers.get('location');
  if (!response.ok || !uploadUrl) {
    const data = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(data.error?.message || 'YouTube konnte keine sichere Upload-Sitzung starten.');
  }
  return uploadUrl;
};

export const decryptYouTubeRefreshToken = (document: FirestoreDocument): string => {
  const { encryptionSecret } = getOAuthConfig();
  const encrypted = document.fields?.encryptedRefreshToken?.stringValue || '';
  const iv = document.fields?.encryptionIv?.stringValue || '';
  const tag = document.fields?.encryptionTag?.stringValue || '';
  if (!encrypted || !iv || !tag) throw new Error('Die gespeicherte YouTube-Verbindung ist unvollständig.');
  const decipher = createDecipheriv('aes-256-gcm', createHash('sha256').update(encryptionSecret).digest(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
};

export const createYouTubeAuthorizationUrl = (userId: string): { authorizationUrl: string; nonce: string } => {
  const { clientId, clientSecret, encryptionSecret, redirectUri } = getOAuthConfig();
  const { state, nonce } = createState(userId, `${clientSecret}:${encryptionSecret}`);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: YOUTUBE_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true',
    state,
  });
  return { authorizationUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`, nonce };
};

export const completeYouTubeAuthorization = async (
  projectId: string,
  code: string,
  state: string,
  cookieNonce: string,
): Promise<void> => {
  const { clientId, clientSecret, encryptionSecret, redirectUri } = getOAuthConfig();
  const { uid, nonce } = verifyState(state, `${clientSecret}:${encryptionSecret}`);
  const expectedNonce = Buffer.from(nonce);
  const suppliedNonce = Buffer.from(cookieNonce);
  if (!cookieNonce || expectedNonce.length !== suppliedNonce.length || !timingSafeEqual(expectedNonce, suppliedNonce)) {
    throw new Error('Die YouTube-Verbindungsanfrage gehört nicht zu dieser Browsersitzung.');
  }
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  const tokenData = await tokenResponse.json().catch(() => ({})) as { refresh_token?: string; error_description?: string };
  if (!tokenResponse.ok || !tokenData.refresh_token) {
    throw new Error(tokenData.error_description || 'Google hat kein dauerhaftes YouTube-Zugriffstoken erteilt.');
  }
  const encrypted = encryptRefreshToken(tokenData.refresh_token, encryptionSecret);
  const timestamp = new Date().toISOString();
  const response = await fetch(documentUrl(projectId, uid), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: {
      userId: { stringValue: uid },
      encryptedRefreshToken: { stringValue: encrypted.encryptedRefreshToken },
      encryptionIv: { stringValue: encrypted.encryptionIv },
      encryptionTag: { stringValue: encrypted.encryptionTag },
      scope: { stringValue: YOUTUBE_SCOPE },
      connectedAt: { timestampValue: timestamp },
      updatedAt: { timestampValue: timestamp },
    } }),
  });
  if (!response.ok) throw new Error('Die YouTube-Verbindung konnte nicht sicher gespeichert werden.');
};

export const loadYouTubeConnectionStatus = async (
  projectId: string,
  userId: string,
): Promise<YouTubeConnectionStatus> => {
  let document: FirestoreDocument;
  try {
    document = await loadYouTubeConnectionDocument(projectId, userId);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'YouTube ist noch nicht verbunden.') {
      return { connected: false, connectedAt: null };
    }
    throw error;
  }
  return {
    connected: Boolean(document.fields?.encryptedRefreshToken?.stringValue),
    connectedAt: document.fields?.connectedAt?.timestampValue || null,
  };
};

export const deleteYouTubeConnection = async (projectId: string, userId: string): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (!response.ok && response.status !== 404) throw new Error('Die YouTube-Verbindung konnte nicht getrennt werden.');
};

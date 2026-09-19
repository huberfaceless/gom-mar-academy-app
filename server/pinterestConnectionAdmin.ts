import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const pinterestScope = 'boards:read,boards:write,pins:read,pins:write,user_accounts:read';
const oauthStateMaxAgeMs = 10 * 60 * 1000;
const expirySafetyMs = 5 * 60 * 1000;

type FirestoreDocument = {
  fields?: Record<string, { stringValue?: string; timestampValue?: string }>;
};

type PinterestTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
  scope?: string;
  response_type?: string;
  message?: string;
};

const getClientId = () => {
  const value = process.env.PINTEREST_OAUTH_CLIENT_ID?.trim() || '';
  if (!value) throw new Error('Die Pinterest OAuth Client-ID ist noch nicht konfiguriert.');
  return value;
};

const getClientSecret = () => {
  const value = process.env.PINTEREST_OAUTH_CLIENT_SECRET?.trim() || '';
  if (!value) throw new Error('Das Pinterest OAuth Client-Secret ist noch nicht konfiguriert.');
  return value;
};

const getEncryptionSecret = () => {
  const value = process.env.PINTEREST_TOKEN_ENCRYPTION_KEY?.trim()
    || process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim()
    || '';
  if (!value) throw new Error('Die Pinterest-Tokenverschlüsselung ist noch nicht konfiguriert.');
  return value;
};

const getRedirectUri = () => process.env.PINTEREST_OAUTH_REDIRECT_URI?.trim()
  || 'https://academy.gomo-marketing.at/api/pinterest/oauth/callback';

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyPinterestConnections/${encodeURIComponent(userId)}`;

const getGoogleAccessToken = async () => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Pinterest-Verbindung fehlen.');
  return token.token;
};

const loadDocument = async (projectId: string, userId: string): Promise<FirestoreDocument> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}` },
  });
  if (response.status === 404) throw new Error('Pinterest ist noch nicht verbunden.');
  if (!response.ok) throw new Error('Die Pinterest-Verbindung konnte nicht geladen werden.');
  return response.json() as Promise<FirestoreDocument>;
};

const encrypt = (value: string) => {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', createHash('sha256').update(getEncryptionSecret()).digest(), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return { encrypted: encrypted.toString('base64url'), iv: iv.toString('base64url'), tag: cipher.getAuthTag().toString('base64url') };
};

const decrypt = (encrypted: string, iv: string, tag: string) => {
  const decipher = createDecipheriv('aes-256-gcm', createHash('sha256').update(getEncryptionSecret()).digest(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
};

const stateSignature = (payload: string) => createHmac('sha256', getEncryptionSecret()).update(payload).digest('base64url');

const createState = (userId: string, nonce: string) => {
  const payload = Buffer.from(JSON.stringify({ userId, nonce, createdAt: Date.now() })).toString('base64url');
  return `${payload}.${stateSignature(payload)}`;
};

const validateState = (state: string, cookieNonce: string) => {
  const [payload, signature] = state.split('.');
  if (!payload || !signature) throw new Error('Die Pinterest-Anmeldung ist ungültig.');
  const expected = stateSignature(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error('Die Pinterest-Anmeldung konnte nicht verifiziert werden.');
  }
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { userId?: string; nonce?: string; createdAt?: number };
  if (!decoded.userId || !decoded.nonce || decoded.nonce !== cookieNonce || !decoded.createdAt || Date.now() - decoded.createdAt > oauthStateMaxAgeMs) {
    throw new Error('Die Pinterest-Anmeldung ist abgelaufen. Bitte erneut verbinden.');
  }
  return decoded.userId;
};

const requestToken = async (parameters: URLSearchParams): Promise<PinterestTokenResponse> => {
  const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${getClientId()}:${getClientSecret()}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: parameters.toString(),
  });
  const data = await response.json().catch(() => ({})) as PinterestTokenResponse;
  if (!response.ok || !data.access_token) throw new Error(data.message || 'Pinterest konnte die Anmeldung nicht abschließen.');
  return data;
};

const saveTokens = async (projectId: string, userId: string, tokens: PinterestTokenResponse, existingRefreshToken = '') => {
  if (!tokens.access_token) throw new Error('Pinterest hat keinen Zugriffstoken zurückgegeben.');
  const access = encrypt(tokens.access_token);
  const refreshValue = tokens.refresh_token || existingRefreshToken;
  if (!refreshValue) throw new Error('Pinterest hat keinen dauerhaften Refresh-Token zurückgegeben.');
  const refresh = encrypt(refreshValue);
  const timestamp = new Date().toISOString();
  const expiresAt = new Date(Date.now() + Number(tokens.expires_in || 0) * 1000).toISOString();
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      userId: { stringValue: userId },
      encryptedAccessToken: { stringValue: access.encrypted },
      accessTokenIv: { stringValue: access.iv },
      accessTokenTag: { stringValue: access.tag },
      encryptedRefreshToken: { stringValue: refresh.encrypted },
      refreshTokenIv: { stringValue: refresh.iv },
      refreshTokenTag: { stringValue: refresh.tag },
      accessTokenExpiresAt: { timestampValue: expiresAt },
      scope: { stringValue: tokens.scope || pinterestScope },
      connectedAt: { timestampValue: timestamp },
      updatedAt: { timestampValue: timestamp },
    } }),
  });
  if (!response.ok) throw new Error('Die Pinterest-Verbindung konnte nicht sicher gespeichert werden.');
};

export const createPinterestAuthorizationUrl = (userId: string) => {
  const nonce = randomBytes(24).toString('base64url');
  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: pinterestScope,
    state: createState(userId, nonce),
  });
  return { authorizationUrl: `https://www.pinterest.com/oauth/?${params.toString()}`, nonce };
};

export const completePinterestAuthorization = async (projectId: string, code: string, state: string, cookieNonce: string) => {
  const userId = validateState(state, cookieNonce);
  const tokens = await requestToken(new URLSearchParams({ code, redirect_uri: getRedirectUri(), grant_type: 'authorization_code' }));
  await saveTokens(projectId, userId, tokens);
};

export const loadPinterestAccessToken = async (projectId: string, userId: string): Promise<string> => {
  const document = await loadDocument(projectId, userId);
  const fields = document.fields || {};
  const expiresAt = Date.parse(fields.accessTokenExpiresAt?.timestampValue || '');
  if (expiresAt > Date.now() + expirySafetyMs) {
    return decrypt(fields.encryptedAccessToken?.stringValue || '', fields.accessTokenIv?.stringValue || '', fields.accessTokenTag?.stringValue || '');
  }
  const refreshToken = decrypt(fields.encryptedRefreshToken?.stringValue || '', fields.refreshTokenIv?.stringValue || '', fields.refreshTokenTag?.stringValue || '');
  const tokens = await requestToken(new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken, scope: pinterestScope }));
  await saveTokens(projectId, userId, tokens, refreshToken);
  return tokens.access_token || '';
};

export const loadPinterestConnectionStatus = async (projectId: string, userId: string) => {
  try {
    const document = await loadDocument(projectId, userId);
    return {
      connected: Boolean(document.fields?.encryptedRefreshToken?.stringValue),
      connectedAt: document.fields?.connectedAt?.timestampValue || null,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Pinterest ist noch nicht verbunden.') return { connected: false, connectedAt: null };
    throw error;
  }
};

export const deletePinterestConnection = async (projectId: string, userId: string): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}` },
  });
  if (!response.ok && response.status !== 404) throw new Error('Die Pinterest-Verbindung konnte nicht getrennt werden.');
};

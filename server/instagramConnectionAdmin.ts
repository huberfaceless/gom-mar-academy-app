import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

const googleAuth = new GoogleAuth({ scopes: [
  'https://www.googleapis.com/auth/datastore',
  'https://www.googleapis.com/auth/devstorage.read_write',
] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const instagramScopes = 'instagram_business_basic,instagram_business_content_publish';
const oauthStateMaxAgeMs = 10 * 60 * 1000;
const tokenRefreshAgeMs = 45 * 24 * 60 * 60 * 1000;

type FirestoreDocument = {
  fields?: Record<string, { stringValue?: string; timestampValue?: string }>;
};

type InstagramTokenResponse = {
  access_token?: string;
  user_id?: number | string;
  expires_in?: number;
  error_message?: string;
  error?: { message?: string };
};

type InstagramProfile = {
  id?: string;
  user_id?: string;
  username?: string;
  account_type?: string;
  error?: { message?: string };
};

const getAppId = () => {
  const value = process.env.INSTAGRAM_APP_ID?.trim() || '';
  if (!value) throw new Error('Die Instagram App-ID ist noch nicht konfiguriert.');
  return value;
};

const getAppSecret = () => {
  const value = process.env.INSTAGRAM_APP_SECRET?.trim() || '';
  if (!value) throw new Error('Der Instagram App-Geheimcode ist noch nicht konfiguriert.');
  return value;
};

const getEncryptionSecret = () => {
  const value = process.env.INSTAGRAM_TOKEN_ENCRYPTION_KEY?.trim()
    || process.env.PINTEREST_TOKEN_ENCRYPTION_KEY?.trim()
    || process.env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim()
    || '';
  if (!value) throw new Error('Die Instagram-Tokenverschlüsselung ist noch nicht konfiguriert.');
  return value;
};

const getRedirectUri = () => process.env.INSTAGRAM_OAUTH_REDIRECT_URI?.trim()
  || 'https://academy.gomo-marketing.at/api/instagram/oauth/callback';
const getGraphVersion = () => process.env.INSTAGRAM_GRAPH_API_VERSION?.trim() || 'v24.0';
const graphBase = () => `https://graph.instagram.com/${getGraphVersion()}`;

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyInstagramConnections/${encodeURIComponent(userId)}`;

const getGoogleAccessToken = async () => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Instagram-Verbindung fehlen.');
  return token.token;
};

const loadDocument = async (projectId: string, userId: string): Promise<FirestoreDocument> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}` },
  });
  if (response.status === 404) throw new Error('Instagram ist noch nicht verbunden.');
  if (!response.ok) throw new Error('Die Instagram-Verbindung konnte nicht geladen werden.');
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
  if (!payload || !signature) throw new Error('Die Instagram-Anmeldung ist ungültig.');
  const expected = stateSignature(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error('Die Instagram-Anmeldung konnte nicht verifiziert werden.');
  }
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { userId?: string; nonce?: string; createdAt?: number };
  if (!decoded.userId || !decoded.nonce || decoded.nonce !== cookieNonce || !decoded.createdAt || Date.now() - decoded.createdAt > oauthStateMaxAgeMs) {
    throw new Error('Die Instagram-Anmeldung ist abgelaufen. Bitte erneut verbinden.');
  }
  return decoded.userId;
};

const requestJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({})) as T & { error?: { message?: string }; error_message?: string };
  if (!response.ok) throw new Error(data.error?.message || data.error_message || `Instagram API Fehler (HTTP ${response.status}).`);
  return data;
};

const saveConnection = async (projectId: string, userId: string, accessToken: string, profile: InstagramProfile, connectedAt?: string) => {
  const encrypted = encrypt(accessToken);
  const timestamp = new Date().toISOString();
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      userId: { stringValue: userId },
      instagramUserId: { stringValue: profile.user_id || profile.id || '' },
      username: { stringValue: profile.username || '' },
      accountType: { stringValue: profile.account_type || '' },
      encryptedAccessToken: { stringValue: encrypted.encrypted },
      accessTokenIv: { stringValue: encrypted.iv },
      accessTokenTag: { stringValue: encrypted.tag },
      tokenRefreshedAt: { timestampValue: timestamp },
      connectedAt: { timestampValue: connectedAt || timestamp },
      updatedAt: { timestampValue: timestamp },
    } }),
  });
  if (!response.ok) throw new Error('Die Instagram-Verbindung konnte nicht sicher gespeichert werden.');
};

const loadTokenAndProfile = async (projectId: string, userId: string) => {
  const document = await loadDocument(projectId, userId);
  const fields = document.fields || {};
  let accessToken = decrypt(
    fields.encryptedAccessToken?.stringValue || '',
    fields.accessTokenIv?.stringValue || '',
    fields.accessTokenTag?.stringValue || '',
  );
  const refreshedAt = Date.parse(fields.tokenRefreshedAt?.timestampValue || fields.connectedAt?.timestampValue || '');
  if (!Number.isFinite(refreshedAt) || Date.now() - refreshedAt >= tokenRefreshAgeMs) {
    const refreshed = await requestJson<InstagramTokenResponse>(
      `${graphBase()}/refresh_access_token?${new URLSearchParams({ grant_type: 'ig_refresh_token', access_token: accessToken })}`,
    );
    if (!refreshed.access_token) throw new Error('Instagram hat keinen erneuerten Zugriffstoken zurückgegeben.');
    accessToken = refreshed.access_token;
    await saveConnection(projectId, userId, accessToken, {
      user_id: fields.instagramUserId?.stringValue || '',
      username: fields.username?.stringValue || '',
      account_type: fields.accountType?.stringValue || '',
    }, fields.connectedAt?.timestampValue);
  }
  return {
    accessToken,
    instagramUserId: fields.instagramUserId?.stringValue || '',
    username: fields.username?.stringValue || '',
  };
};

export const createInstagramAuthorizationUrl = (userId: string) => {
  const nonce = randomBytes(24).toString('base64url');
  const params = new URLSearchParams({
    enable_fb_login: '0',
    force_authentication: '1',
    client_id: getAppId(),
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: instagramScopes,
    state: createState(userId, nonce),
  });
  return { authorizationUrl: `https://www.instagram.com/oauth/authorize?${params.toString()}`, nonce };
};

export const completeInstagramAuthorization = async (projectId: string, code: string, state: string, cookieNonce: string) => {
  const userId = validateState(state, cookieNonce);
  const shortLived = await requestJson<InstagramTokenResponse>('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: getAppId(),
      client_secret: getAppSecret(),
      grant_type: 'authorization_code',
      redirect_uri: getRedirectUri(),
      code,
    }).toString(),
  });
  if (!shortLived.access_token) throw new Error('Instagram hat keinen Zugriffstoken zurückgegeben.');
  const longLived = await requestJson<InstagramTokenResponse>(
    `${graphBase()}/access_token?${new URLSearchParams({ grant_type: 'ig_exchange_token', client_secret: getAppSecret(), access_token: shortLived.access_token })}`,
  );
  if (!longLived.access_token) throw new Error('Instagram hat keinen dauerhaften Zugriffstoken zurückgegeben.');
  const profile = await requestJson<InstagramProfile>(
    `${graphBase()}/me?${new URLSearchParams({ fields: 'user_id,username,account_type', access_token: longLived.access_token })}`,
  );
  await saveConnection(projectId, userId, longLived.access_token, profile);
};

export const loadInstagramConnectionStatus = async (projectId: string, userId: string) => {
  try {
    const document = await loadDocument(projectId, userId);
    return {
      connected: Boolean(document.fields?.encryptedAccessToken?.stringValue),
      connectedAt: document.fields?.connectedAt?.timestampValue || null,
      username: document.fields?.username?.stringValue || null,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Instagram ist noch nicht verbunden.') {
      return { connected: false, connectedAt: null, username: null };
    }
    throw error;
  }
};

export const deleteInstagramConnection = async (projectId: string, userId: string): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${await getGoogleAccessToken()}` },
  });
  if (!response.ok && response.status !== 404) throw new Error('Die Instagram-Verbindung konnte nicht getrennt werden.');
};

const uploadInstagramImage = async (projectId: string, userId: string, imageBase64: string) => {
  const match = imageBase64.match(/^data:(image\/(?:png|jpeg));base64,(.+)$/s);
  if (!match) throw new Error('Für Instagram wird eine PNG- oder JPEG-Grafik benötigt.');
  const bucket = process.env.FIREBASE_STORAGE_BUCKET?.trim()
    || process.env.VITE_FIREBASE_STORAGE_BUCKET?.trim()
    || `${projectId}.firebasestorage.app`;
  const extension = match[1] === 'image/png' ? 'png' : 'jpg';
  const objectName = `instagram/${userId}/${Date.now()}-${randomUUID()}.${extension}`;
  const downloadToken = randomUUID();
  const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(objectName)}`;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getGoogleAccessToken()}`,
      'Content-Type': match[1],
    },
    body: Buffer.from(match[2], 'base64'),
  });
  if (!response.ok) throw new Error('Die Instagram-Grafik konnte nicht sicher bereitgestellt werden.');
  const metadataResponse = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${await getGoogleAccessToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ metadata: { firebaseStorageDownloadTokens: downloadToken } }),
    },
  );
  if (!metadataResponse.ok) throw new Error('Der sichere Instagram-Bildzugriff konnte nicht eingerichtet werden.');
  return `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}?alt=media&token=${downloadToken}`;
};

export const publishInstagramImage = async (projectId: string, userId: string, input: { caption: string; imageBase64?: string; imageUrl?: string }) => {
  const connection = await loadTokenAndProfile(projectId, userId);
  if (!connection.instagramUserId) throw new Error('Die Instagram-Konto-ID fehlt. Bitte Instagram erneut verbinden.');
  const imageUrl = input.imageBase64
    ? await uploadInstagramImage(projectId, userId, input.imageBase64)
    : input.imageUrl?.trim();
  if (!imageUrl || !/^https:\/\//i.test(imageUrl)) throw new Error('Für Instagram wird eine öffentlich erreichbare HTTPS-Grafik benötigt.');
  const container = await requestJson<{ id?: string }>(`${graphBase()}/${encodeURIComponent(connection.instagramUserId)}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ image_url: imageUrl, caption: input.caption.slice(0, 2200), access_token: connection.accessToken }).toString(),
  });
  if (!container.id) throw new Error('Instagram hat keinen Mediencontainer erstellt.');
  const published = await requestJson<{ id?: string }>(`${graphBase()}/${encodeURIComponent(connection.instagramUserId)}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ creation_id: container.id, access_token: connection.accessToken }).toString(),
  });
  if (!published.id) throw new Error('Instagram hat die Veröffentlichung nicht bestätigt.');
  return {
    id: published.id,
    url: connection.username ? `https://www.instagram.com/${connection.username}/` : 'https://www.instagram.com/',
  };
};

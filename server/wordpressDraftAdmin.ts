import { normalizeBlogMarkdown } from '../src/utils/blogMarkdownFormatting.js';
import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// The first connector is deliberately limited to the verified Vital50 origin.
// No user-controlled request hosts or redirects may receive credentials.
export const WORDPRESS_ORIGIN = 'https://vital50.gomo-marketing.at';
type RecordData = Record<string, any>;
type Stored = { value: RecordData; version: string };
export interface WordPressStore {
  read(collection: string, id: string): Promise<Stored | null>;
  write(collection: string, id: string, value: RecordData, version?: string): Promise<void>;
  remove(collection: string, id: string): Promise<void>;
  content(id: string): Promise<RecordData | null>;
}
const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const root = () => `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(process.env.VITE_FIREBASE_PROJECT_ID || 'gom-mar-akademie')}/databases/${encodeURIComponent(process.env.FIREBASE_DATABASE_ID || '(default)')}/documents`;
const fsRequest = async (path: string, init: RequestInit = {}) => {
  const token = (await (await auth.getClient()).getAccessToken()).token;
  if (!token) throw new Error('Cloud-Zugriff für WordPress fehlt.');
  return fetch(`${root()}/${path}`, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000) });
};
const decode = (v: any): any => v.stringValue ?? v.booleanValue ?? (v.mapValue ? Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decode(x)])) : v.nullValue ?? undefined);
const store: WordPressStore = {
  async read(collection, id) {
    const r = await fsRequest(`${collection}/${encodeURIComponent(id)}`);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error('WordPress-Verbindungsdaten konnten nicht gelesen werden.');
    const d = await r.json();
    return { value: JSON.parse(d.fields.data.stringValue), version: d.updateTime };
  },
  async write(collection, id, value, version) {
    const condition = version ? `currentDocument.updateTime=${encodeURIComponent(version)}` : 'currentDocument.exists=false';
    const r = await fsRequest(`${collection}/${encodeURIComponent(id)}?${condition}`, { method: 'PATCH', body: JSON.stringify({ fields: { data: { stringValue: JSON.stringify(value) } } }) });
    if (!r.ok) throw new Error('WordPress-Vorgang konnte nicht sicher gespeichert werden. Bitte Status erneut laden.');
  },
  async remove(collection, id) {
    const r = await fsRequest(`${collection}/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!r.ok && r.status !== 404) throw new Error('WordPress-Verbindung konnte nicht getrennt werden.');
  },
  async content(id) {
    const r = await fsRequest(`contentProjects/${encodeURIComponent(id)}`);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error('Der gespeicherte Artikel konnte nicht geladen werden.');
    const d = await r.json();
    return Object.fromEntries(Object.entries(d.fields || {}).map(([k, v]) => [k, decode(v)]));
  },
};
const connectionCollection = 'academyWordPressConnections';
const draftCollection = 'academyWordPressDrafts';
const keyFor = (...values: string[]) => createHash('sha256').update(JSON.stringify(values)).digest('hex');
export const renderWordPressArticle = (markdown: string) => renderToStaticMarkup(React.createElement(ReactMarkdown, {
  remarkPlugins: [remarkGfm], skipHtml: true,
  components: {
    table: ({ children }) => React.createElement('div', { style: { overflowX: 'auto' } }, React.createElement('table', { style: { borderCollapse: 'collapse', width: '100%' } }, children)),
    th: ({ children }) => React.createElement('th', { style: { border: '1px solid #cbd5e1', padding: '12px', textAlign: 'left', verticalAlign: 'top' } }, children),
    td: ({ children }) => React.createElement('td', { style: { border: '1px solid #cbd5e1', padding: '12px', textAlign: 'left', verticalAlign: 'top' } }, children),
    a: ({ children, href }) => React.createElement('a', { href, rel: 'noopener noreferrer sponsored' }, children),
    img: ({ alt }) => React.createElement('span', null, alt),
  },
  children: normalizeBlogMarkdown(markdown),
}));

export function createWordPressDraftService(storage = store, request: typeof fetch = fetch, secret = () => process.env.WORDPRESS_CREDENTIAL_ENCRYPTION_KEY || '') {
  const encryptionKey = () => {
    const key = secret().trim();
    if (key.length < 32) throw new Error('WordPress ist serverseitig noch nicht eingerichtet (Verschlüsselungsschlüssel fehlt).');
    return createHash('sha256').update('wordpress-v1:' + key).digest();
  };
  const encrypt = (value: string) => {
    const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
    return { encrypted: Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]).toString('base64url'), iv: iv.toString('base64url'), tag: cipher.getAuthTag().toString('base64url') };
  };
  const decrypt = (value: RecordData) => {
    const cipher = createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(value.iv, 'base64url'));
    cipher.setAuthTag(Buffer.from(value.tag, 'base64url'));
    return Buffer.concat([cipher.update(Buffer.from(value.encrypted, 'base64url')), cipher.final()]).toString('utf8');
  };
  const wp = async (path: string, credential: string, init: RequestInit = {}) => {
    let r: Response;
    try {
      r = await request(`${WORDPRESS_ORIGIN}/wp-json/wp/v2/${path}`, { ...init,
        headers: { Authorization: `Basic ${credential}`, 'Content-Type': 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(20000) });
    } catch { throw new Error('WordPress antwortet nicht eindeutig. Bitte die WordPress-Entwürfe prüfen.'); }
    if (!r.ok) throw new Error(`WordPress hat die Anfrage abgelehnt (HTTP ${r.status}). Bitte Benutzerrechte und Anwendungspasswort prüfen.`);
    return r.json();
  };
  const projectFor = async (uid: string, contentId: string) => {
    if (typeof contentId !== 'string' || !/^[a-zA-Z0-9_-]{1,160}$/.test(contentId)) throw new Error('Ungültiger Inhaltsablauf.');
    const content = await storage.content(contentId);
    if (!content || content.deletedAt || content.userId !== uid || !content.projectSettings?.id || content.projectSettings.deletedAt) throw new Error('Dieser Inhaltsablauf ist nicht verfügbar.');
    let url: URL;
    try { url = new URL(content.projectSettings.websiteUrl); } catch { throw new Error('Ungültige Projekt-Webseite.'); }
    if (url.origin !== WORDPRESS_ORIGIN) throw new Error('Diese Verbindung ist ausschließlich für Vital50 eingerichtet.');
    return { content, key: keyFor(uid, content.projectSettings.id) };
  };
  return {
    async status(uid: string, contentId: string) {
      const { key } = await projectFor(uid, contentId);
      const connection = await storage.read(connectionCollection, key);
      const draft = await storage.read(draftCollection, keyFor(uid, contentId));
      return { configured: secret().trim().length >= 32, connected: Boolean(connection), siteUrl: WORDPRESS_ORIGIN,
        draft: draft ? { state: draft.value.state, postId: draft.value.postId || null,
          editUrl: draft.value.postId ? `${WORDPRESS_ORIGIN}/wp-admin/post.php?post=${draft.value.postId}&action=edit` : null } : null };
    },
    async connect(uid: string, contentId: string, username: unknown, password: unknown) {
      const { key } = await projectFor(uid, contentId);
      encryptionKey();
      if (typeof username !== 'string' || !username.trim() || username.includes(':') || username.length > 200 || typeof password !== 'string' || !password.trim() || password.length > 200) throw new Error('Bitte WordPress-Benutzername und Anwendungspasswort eingeben.');
      const credential = Buffer.from(`${username.trim()}:${password.replace(/\s/g, '')}`).toString('base64');
      const me = await wp('users/me?context=edit', credential);
      if (!me.capabilities?.edit_posts) throw new Error('Der WordPress-Benutzer darf keine Beiträge bearbeiten.');
      const existing = await storage.read(connectionCollection, key);
      await storage.write(connectionCollection, key, { ...encrypt(credential), connectedAt: new Date().toISOString() }, existing?.version);
      return { connected: true };
    },
    async disconnect(uid: string, contentId: string) {
      const { key } = await projectFor(uid, contentId);
      await storage.remove(connectionCollection, key);
      return { connected: false };
    },
    async transfer(uid: string, contentId: string) {
      const { content, key } = await projectFor(uid, contentId);
      const article = content.blogArticle;
      if (!article || typeof article.title !== 'string' || !article.title.trim() || article.title.length > 500 || typeof article.contentMarkdown !== 'string' || !article.contentMarkdown.trim() || article.contentMarkdown.length > 200000) throw new Error('Der gespeicherte Artikel ist leer oder zu groß.');
      const connection = await storage.read(connectionCollection, key);
      if (!connection) throw new Error('Bitte zuerst WordPress verbinden.');
      const credential = decrypt(connection.value);
      const draftId = keyFor(uid, contentId);
      const previous = await storage.read(draftCollection, draftId);
      if (previous && previous.value.state !== 'confirmed') throw new Error('Eine Übertragung läuft noch oder ihr Ergebnis ist unklar. Bitte zuerst die WordPress-Entwürfe prüfen. Es wird kein weiterer Beitrag erstellt.');
      const postId = previous?.value.postId;
      if (postId) {
        const current = await wp(`posts/${postId}?context=edit`, credential);
        if (current.status !== 'draft') throw new Error('Der WordPress-Beitrag ist kein Entwurf mehr. Änderungen bitte direkt in WordPress vornehmen.');
      }
      const lock = { state: 'pending', ...(postId ? { postId } : {}), updatedAt: new Date().toISOString() };
      // Persistent compare-and-swap before the external write, including concurrent requests.
      await storage.write(draftCollection, draftId, lock, previous?.version);
      const claimed = await storage.read(draftCollection, draftId);
      if (!claimed) throw new Error('Die Übertragung konnte nicht sicher gestartet werden.');
      const body = { title: article.title, content: renderWordPressArticle(article.contentMarkdown), excerpt: article.metaDescription || '', ...(postId ? {} : { status: 'draft' }) };
      const post = await wp(postId ? `posts/${postId}` : 'posts', credential, { method: 'POST', body: JSON.stringify(body) });
      if (!Number.isSafeInteger(post.id) || post.id <= 0 || post.status !== 'draft') throw new Error('WordPress hat keinen eindeutigen Entwurf bestätigt. Bitte direkt in WordPress prüfen.');
      await storage.write(draftCollection, draftId, { state: 'confirmed', postId: post.id, updatedAt: new Date().toISOString() }, claimed.version);
      return { postId: post.id, editUrl: `${WORDPRESS_ORIGIN}/wp-admin/post.php?post=${post.id}&action=edit`, status: 'draft' };
    },
  };
}
export const wordpressDraftService = createWordPressDraftService();

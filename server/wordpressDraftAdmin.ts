import { wordpressSiteOrigin, GOMO_WORDPRESS_ORIGIN } from '../src/utils/wordpressSites';
import { verifyBlogReferences } from './blogReferences.js';
import { isWordPressImageUrl } from '../src/utils/blogReferences.js';
import { wordpressSeoKeys, wordpressSeoMeta, blogMarkdownWithSummary, type WordPressSeoProvider } from '../src/utils/blogSeoGeo.js';
import { blogLinkRel } from '../src/utils/blogLinkRel.js';
import { VITAL50_CATEGORIES, isVital50CategorySlug, mapVital50Categories, suggestVital50Category } from '../src/utils/vital50BlogCategories.js';
import { normalizeBlogMarkdown } from '../src/utils/blogMarkdownFormatting.js';
import { GoogleAuth } from 'google-auth-library';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Connections are isolated between the two explicitly approved WordPress origins.
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
export const decodeWordPressContentValue = (v: any): any => v.stringValue ?? v.booleanValue ?? (v.integerValue !== undefined ? Number(v.integerValue) : undefined) ?? (v.doubleValue !== undefined ? v.doubleValue : undefined) ?? (v.arrayValue ? (v.arrayValue.values || []).map(decodeWordPressContentValue) : undefined) ?? (v.mapValue ? Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decodeWordPressContentValue(x)])) : v.nullValue ?? undefined);
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
    return Object.fromEntries(Object.entries(d.fields || {}).map(([k, v]) => [k, decodeWordPressContentValue(v)]));
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
    a: ({ children, href }) => React.createElement('a', { href, rel: blogLinkRel(href) }, children),
    img: ({ alt, src }) => isWordPressImageUrl(src) ? React.createElement('img', { src, alt: alt || '', loading: 'lazy' }) : React.createElement('span', null, alt),
  },
  children: normalizeBlogMarkdown(markdown),
}));

export function createWordPressDraftService(storage = store, request: typeof fetch = fetch, secret = () => process.env.WORDPRESS_CREDENTIAL_ENCRYPTION_KEY || '', publicRequest: typeof fetch = fetch, siteOrigin = WORDPRESS_ORIGIN) {
  if (wordpressSiteOrigin(siteOrigin) !== siteOrigin) throw new Error('Diese WordPress-Seite ist nicht freigegeben.');
  const seoProvider: WordPressSeoProvider = siteOrigin === GOMO_WORDPRESS_ORIGIN ? 'seopress' : 'rank-math';
  const seoName = seoProvider === 'seopress' ? 'SEOPress' : 'Rank Math';
  const seoKeys = wordpressSeoKeys(seoProvider);
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
      r = await request(`${siteOrigin}/wp-json/wp/v2/${path}`, { ...init,
        headers: { 'Content-Type': 'application/json', ...init.headers, Authorization: `Basic ${credential}` }, redirect: 'error', signal: AbortSignal.timeout(20000) });
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
    if (wordpressSiteOrigin(content.projectSettings.websiteUrl) !== siteOrigin) throw new Error('Die WordPress-Verbindung passt nicht zur Projekt-Webseite.');
    return { content, key: siteOrigin === WORDPRESS_ORIGIN ? keyFor(uid, content.projectSettings.id) : keyFor(uid, content.projectSettings.id, siteOrigin) };
  };
  const boundCredential = (value: RecordData) => {
    if ((value.siteUrl || WORDPRESS_ORIGIN) !== siteOrigin) throw new Error('Bitte WordPress für diese Webseite neu verbinden.');
    return decrypt(value);
  };
  const connectionFor = async (uid: string, contentId: string) => {
    const { key } = await projectFor(uid, contentId);
    const connection = await storage.read(connectionCollection, key);
    if (!connection) throw new Error('Bitte zuerst WordPress verbinden.');
    if ((connection.value.siteUrl || WORDPRESS_ORIGIN) !== siteOrigin) throw new Error('Bitte WordPress für diese Webseite neu verbinden.');
    return boundCredential(connection.value);
  };
  const mediaItem = (item: RecordData) => {
    if (!Number.isSafeInteger(item.id) || item.id <= 0 || item.media_type !== 'image' || (!isWordPressImageUrl(item.source_url) || new URL(item.source_url).origin !== siteOrigin)) throw new Error('Das WordPress-Bild ist nicht verfügbar.');
    return { id: item.id, url: item.source_url, alt: typeof item.alt_text === 'string' ? item.alt_text : '', title: typeof item.title?.rendered === 'string' ? item.title.rendered.replace(/<[^>]*>/g, '') : `Bild ${item.id}` };
  };
  const categoriesFor = async (credential: string) => {
    if (siteOrigin === WORDPRESS_ORIGIN) return mapVital50Categories(await wp(`categories?per_page=100&hide_empty=false&slug=${VITAL50_CATEGORIES.map(c => c.slug).join(',')}`, credential));
    const list = await wp('categories?per_page=100&hide_empty=false', credential);
    if (!Array.isArray(list)) throw new Error('WordPress hat keine gültige Kategorienliste geliefert.');
    return list.filter(item => Number.isSafeInteger(item.id) && item.id > 0 && typeof item.slug === 'string' && typeof item.name === 'string').map(item => ({ id: item.id, slug: item.slug, name: item.name.replace(/<[^>]*>/g, '') }));
  };
  const suggestedCategory = (categories: { slug: string; name: string }[], content: RecordData) => {
    if (siteOrigin === WORDPRESS_ORIGIN) return suggestVital50Category(content.blogArticle?.title || '', content.topic, content.contentBrief?.mainKeyword);
    const custom = categories.filter(item => !['uncategorized', 'allgemein'].includes(item.slug));
    if (custom.length === 1) return custom[0].slug;
    const words = `${content.blogArticle?.title || ''} ${content.contentBrief?.mainKeyword || ''}`.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(word => word.length > 3);
    const scored = custom.map(item => ({ slug: item.slug, score: words.filter(word => item.name.toLowerCase().includes(word)).length })).sort((a, b) => b.score - a.score);
    return scored[0]?.score > 0 && scored[0]?.score !== scored[1]?.score ? scored[0].slug : null;
  };
  const mappingId = (uid: string, contentId: string) => siteOrigin === WORDPRESS_ORIGIN ? keyFor(uid, contentId) : keyFor(uid, contentId, siteOrigin);
  const publicationUrl = (value: unknown) => {
    if (typeof value !== 'string') throw new Error('WordPress hat keinen öffentlichen Artikellink bestätigt.');
    const url = new URL(value);
    if (url.origin !== siteOrigin || url.username || url.password || url.pathname === '/') throw new Error('WordPress hat keinen gültigen Artikellink bestätigt.');
    return url.href;
  };
  const confirmPublished = async (uid: string, contentId: string, credential: string, record: Stored) => {
    const post = await wp(`posts/${record.value.postId}?context=edit`, credential);
    if (post.id !== record.value.postId || post.status !== 'publish' || !record.value.expectedMeta || !wordpressSeoKeys(record.value.seoProvider || 'rank-math').every(key => typeof record.value.expectedMeta[key] === 'string' && post.meta?.[key] === record.value.expectedMeta[key])) throw new Error('Die Veröffentlichung ist noch nicht eindeutig bestätigt. Bitte WordPress prüfen und den Status erneut laden.');
    const publishedUrl = publicationUrl(post.link);
    const value = { ...record.value, state: 'confirmed', postStatus: 'publish', publishedUrl, seoStatus: 'saved', updatedAt: new Date().toISOString() };
    try { await storage.write(draftCollection, mappingId(uid, contentId), value, record.version); }
    catch (error) { const latest = await storage.read(draftCollection, mappingId(uid, contentId)); if (latest?.value.postId !== post.id || latest.value.postStatus !== 'publish') throw error; }
    return { postId: post.id, status: 'publish', publishedUrl, seoStatus: 'saved', editUrl: `${siteOrigin}/wp-admin/post.php?post=${post.id}&action=edit` };
  };
  const seoReady = async (credential: string) => {
    const schema = await wp('posts', credential, { method: 'OPTIONS' });
    const properties = schema?.schema?.properties?.meta?.properties;
    return seoKeys.every(key => properties?.[key]?.type === 'string' && properties[key].readonly !== true);
  };
  const service = {
    async media(uid: string, contentId: string, search = '') {
      const credential = await connectionFor(uid, contentId);
      if (typeof search !== 'string' || search.length > 100) throw new Error('Ungültige Bildsuche.');
      const list = await wp(`media?media_type=image&per_page=30&context=edit&search=${encodeURIComponent(search)}`, credential);
      if (!Array.isArray(list)) throw new Error('Die Mediathek konnte nicht geladen werden.');
      return { images: list.flatMap(item => { try { return [mediaItem(item)]; } catch { return []; } }) };
    },
    async uploadMedia(uid: string, contentId: string, image: unknown) {
      const credential = await connectionFor(uid, contentId);
      if (typeof image !== 'string' || image.length > 5600000) throw new Error('Bitte ein Bild bis 4 MB auswählen.');
      const match = image.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
      if (!match) throw new Error('Bitte PNG, JPEG oder WebP verwenden.');
      const bytes = Buffer.from(match[2], 'base64');
      if (!bytes.length || bytes.length > 4 * 1024 * 1024) throw new Error('Bitte ein Bild bis 4 MB auswählen.');
      const valid = match[1] === 'png' ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : match[1] === 'jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP';
      if (!valid) throw new Error('Dateiinhalt und Bildformat stimmen nicht überein.');
      try {
        const item = await wp('media', credential, { method: 'POST', body: bytes, headers: { 'Content-Type': `image/${match[1]}`, 'Content-Disposition': `attachment; filename="academy-${Date.now()}.${match[1] === 'jpeg' ? 'jpg' : match[1]}"` } });
        return { image: mediaItem(item) };
      } catch (error) {
        if (error instanceof Error && error.message.includes('nicht eindeutig')) throw new Error('Der Bild-Upload konnte nicht eindeutig bestätigt werden. Bitte zuerst die WordPress-Mediathek prüfen, bevor du erneut hochlädst.');
        throw error;
      }
    },
    async seo(uid: string, contentId: string) {
      const { key } = await projectFor(uid, contentId);
      const connection = await storage.read(connectionCollection, key);
      if (!connection) throw new Error('Bitte zuerst WordPress verbinden.');
      return { ready: await seoReady(boundCredential(connection.value)), provider: seoProvider, requiresBridge: seoProvider === 'rank-math' };
    },
    async categories(uid: string, contentId: string) {
      const { content, key } = await projectFor(uid, contentId);
      const connection = await storage.read(connectionCollection, key);
      if (!connection) throw new Error('Bitte zuerst WordPress verbinden.');
      const categories = await categoriesFor(boundCredential(connection.value));
      return { categories, suggestedSlug: suggestedCategory(categories, content) };
    },
    async status(uid: string, contentId: string) {
      const { key } = await projectFor(uid, contentId);
      const connection = await storage.read(connectionCollection, key);
      let draft = await storage.read(draftCollection, mappingId(uid, contentId));
      if (draft?.value.state === 'publishing' && connection) {
        try { await confirmPublished(uid, contentId, boundCredential(connection.value), draft); draft = await storage.read(draftCollection, mappingId(uid, contentId)); } catch { /* Keep an uncertain write visible, never create another post. */ }
      }
      return { configured: secret().trim().length >= 32, connected: Boolean(connection), siteUrl: siteOrigin, seoProvider,
        draft: draft ? { state: draft.value.state, postId: draft.value.postId || null,
          seoProvider: draft.value.seoProvider || 'rank-math', postStatus: draft.value.postStatus || 'draft', publishedUrl: draft.value.publishedUrl || null, seoStatus: draft.value.seoStatus || null, slug: draft.value.slug || null, editUrl: draft.value.postId ? `${siteOrigin}/wp-admin/post.php?post=${draft.value.postId}&action=edit` : null } : null };
    },
    async connect(uid: string, contentId: string, username: unknown, password: unknown) {
      const { key } = await projectFor(uid, contentId);
      encryptionKey();
      if (typeof username !== 'string' || !username.trim() || username.includes(':') || username.length > 200 || typeof password !== 'string' || !password.trim() || password.length > 200) throw new Error('Bitte WordPress-Benutzername und Anwendungspasswort eingeben.');
      const credential = Buffer.from(`${username.trim()}:${password.replace(/\s/g, '')}`).toString('base64');
      const me = await wp('users/me?context=edit', credential);
      if (!me.capabilities?.edit_posts) throw new Error('Der WordPress-Benutzer darf keine Beiträge bearbeiten.');
      const existing = await storage.read(connectionCollection, key);
      await storage.write(connectionCollection, key, { ...encrypt(credential), siteUrl: siteOrigin, connectedAt: new Date().toISOString() }, existing?.version);
      return { connected: true };
    },
    async disconnect(uid: string, contentId: string) {
      const { key } = await projectFor(uid, contentId);
      await storage.remove(connectionCollection, key);
      return { connected: false };
    },
    async transfer(uid: string, contentId: string, publishNow = false) {
      const { content, key } = await projectFor(uid, contentId);
      if (publishNow && siteOrigin !== GOMO_WORDPRESS_ORIGIN) throw new Error('Die direkte Veröffentlichung ist nur für gomo-marketing.at eingerichtet.');
      const article = content.blogArticle;
      if (!article || typeof article.title !== 'string' || !article.title.trim() || article.title.length > 500 || typeof article.contentMarkdown !== 'string' || !article.contentMarkdown.trim() || article.contentMarkdown.length > 200000) throw new Error('Der gespeicherte Artikel ist leer oder zu groß.');
      const connection = await storage.read(connectionCollection, key);
      if (!connection) throw new Error('Bitte zuerst WordPress verbinden.');
      const credential = boundCredential(connection.value);
      const draftId = mappingId(uid, contentId);
      const previous = await storage.read(draftCollection, draftId);
      if (publishNow && previous?.value.state === 'publishing') return confirmPublished(uid, contentId, credential, previous);
      if (previous && previous.value.state !== 'confirmed') throw new Error('Eine Übertragung läuft noch oder ihr Ergebnis ist unklar. Bitte zuerst die WordPress-Entwürfe prüfen. Es wird kein weiterer Beitrag erstellt.');
      const postId = previous?.value.postId;
      let currentFeatured = 0;
      if (postId) {
        const current = await wp(`posts/${postId}?context=edit`, credential);
        currentFeatured = current.featured_media || 0;
        if (publishNow && current.status === 'publish' && previous?.value.postStatus === 'publish') return { postId, status: 'publish', seoStatus: previous.value.seoStatus, publishedUrl: publicationUrl(current.link), editUrl: `${siteOrigin}/wp-admin/post.php?post=${postId}&action=edit` };
        if (current.status !== 'draft') throw new Error('Der WordPress-Beitrag ist kein Entwurf mehr. Änderungen bitte direkt in WordPress vornehmen.');
      }
      const categories = await categoriesFor(credential);
      const slug = article.wordpressCategorySlug || suggestedCategory(categories, content);
      if (siteOrigin === WORDPRESS_ORIGIN && !isVital50CategorySlug(slug)) throw new Error('Bitte eine der fünf Vital50-Kategorien auswählen.');
      const category = categories.find(c => c.slug === slug);
      if (!category) throw new Error(siteOrigin === WORDPRESS_ORIGIN ? 'Die ausgewählte Kategorie fehlt in WordPress.' : 'Bitte eine passende WordPress-Kategorie auswählen.');
      if (article.wordpressSlug && (typeof article.wordpressSlug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.wordpressSlug) || article.wordpressSlug.length > 80)) throw new Error('Bitte einen kurzen URL-Slug aus Kleinbuchstaben, Zahlen und Bindestrichen verwenden.');
      const sources = await verifyBlogReferences(article.referenceIds, publicRequest);
      if (sources.length !== new Set(article.referenceIds || []).size) throw new Error('Eine ausgewählte Quelle ist aktuell nicht erreichbar. Bitte die Quellenauswahl prüfen.');
      let exportArticle = article;
      if (article.wordpressImage) {
        if (!Number.isSafeInteger(article.wordpressImage.id) || article.wordpressImage.id <= 0 || typeof article.wordpressImage.alt !== 'string' || !article.wordpressImage.alt.trim() || article.wordpressImage.alt.length > 300) throw new Error('Bitte ein Bild mit beschreibendem Alt-Text auswählen.');
        const image = mediaItem(await wp(`media/${article.wordpressImage.id}?context=edit`, credential));
        exportArticle = { ...article, wordpressImage: { ...article.wordpressImage, url: image.url } };
      }
      const desiredMeta = wordpressSeoMeta(seoProvider, article, content.contentBrief);
      let seoStatus = desiredMeta ? 'unavailable' : 'incomplete';
      let meta: Record<string, string> | null = null;
      try { if (desiredMeta && await seoReady(credential)) meta = desiredMeta; } catch { /* Drafts remain available; SEO is explicitly reported as unavailable. */ }
      if (publishNow) {
        if (!desiredMeta || !meta) throw new Error(`Für die direkte Veröffentlichung müssen SEO-Titel, Beschreibung, Fokuskeyword und die ${seoName}-Verbindung vollständig eingerichtet sein.`);
        if (typeof article.answerSummary !== 'string' || !article.answerSummary.trim()) throw new Error('Bitte die GEO-Kurzantwort vor der Veröffentlichung ergänzen.');
        const me = await wp('users/me?context=edit', credential);
        if (!me.capabilities?.publish_posts) throw new Error('Der WordPress-Benutzer darf keine Beiträge veröffentlichen.');
      }
      const lock = { state: 'pending', ...(postId ? { postId } : {}), updatedAt: new Date().toISOString() };
      // Persistent compare-and-swap before the external write, including concurrent requests.
      await storage.write(draftCollection, draftId, lock, previous?.version);
      const claimed = await storage.read(draftCollection, draftId);
      if (!claimed) throw new Error('Die Übertragung konnte nicht sicher gestartet werden.');
      const body = { ...(article.wordpressSlug ? { slug: article.wordpressSlug } : {}), ...(article.wordpressImage?.featured ? { featured_media: article.wordpressImage.id } : previous?.value.featuredMediaId && currentFeatured === previous.value.featuredMediaId ? { featured_media: 0 } : {}), categories: [category.id], title: article.title, content: renderWordPressArticle(blogMarkdownWithSummary(exportArticle, content.projectSettings.language)), ...(meta ? { meta } : {}), excerpt: article.metaDescription || '', ...(postId ? {} : { status: 'draft' }) };
      const post = await wp(postId ? `posts/${postId}` : 'posts', credential, { method: 'POST', body: JSON.stringify(body) });
      if (!Number.isSafeInteger(post.id) || post.id <= 0 || (postId && post.id !== postId) || post.status !== 'draft' || !Array.isArray(post.categories) || !post.categories.includes(category.id)) throw new Error('WordPress hat keinen eindeutigen Entwurf bestätigt. Bitte direkt in WordPress prüfen.');
      if (meta) {
        seoStatus = 'unverified';
        try {
          const verified = await wp(`posts/${post.id}?context=edit`, credential);
          if (seoKeys.every(key => verified.meta?.[key] === meta[key])) seoStatus = 'saved';
        } catch { /* The post is confirmed; a metadata read failure must never cause a duplicate creation. */ }
      }
      const confirmed = { state: 'confirmed', seoProvider, postId: post.id, postStatus: 'draft', seoStatus, ...(typeof post.slug === 'string' ? { slug: post.slug } : {}), ...(article.wordpressImage?.featured ? { featuredMediaId: article.wordpressImage.id } : {}), updatedAt: new Date().toISOString() };
      await storage.write(draftCollection, draftId, confirmed, claimed.version);
      if (publishNow) {
        if (seoStatus !== 'saved') throw new Error('Der Artikel wurde als Entwurf gespeichert. Die SEO-Daten sind noch nicht bestätigt; er wurde nicht veröffentlicht.');
        const saved = await storage.read(draftCollection, draftId);
        if (!saved) throw new Error('Der WordPress-Status konnte nicht bestätigt werden.');
        await storage.write(draftCollection, draftId, { ...confirmed, state: 'publishing', expectedMeta: meta }, saved.version);
        const publishing = await storage.read(draftCollection, draftId);
        if (!publishing) throw new Error('Die Veröffentlichung konnte nicht sicher gestartet werden.');
        await wp(`posts/${post.id}`, credential, { method: 'POST', body: JSON.stringify({ status: 'publish' }) });
        return confirmPublished(uid, contentId, credential, publishing);
      }
      return { seoStatus, postId: post.id, editUrl: `${siteOrigin}/wp-admin/post.php?post=${post.id}&action=edit`, status: 'draft' };
    },
    async publish(uid: string, contentId: string) { return service.transfer(uid, contentId, true); },
  };
  return service;
}
// Resolve only allowlisted origins from the owned saved content, never from an API request host.
const siteServices = new Map<string, ReturnType<typeof createWordPressDraftService>>();
export const wordpressDraftService = Object.fromEntries(['media', 'uploadMedia', 'seo', 'categories', 'status', 'connect', 'disconnect', 'transfer', 'publish'].map(method => [method, async (uid: string, contentId: string, ...args: any[]) => {
  const content = await store.content(contentId);
  if (!content || content.userId !== uid || content.deletedAt) throw new Error('Dieser Inhaltsablauf ist nicht verfügbar.');
  const origin = wordpressSiteOrigin(content.projectSettings?.websiteUrl);
  if (!origin) throw new Error('Diese WordPress-Seite ist nicht freigegeben.');
  if (!siteServices.has(origin)) siteServices.set(origin, createWordPressDraftService(store, fetch, undefined, fetch, origin));
  const service = siteServices.get(origin)!;
  return (service as any)[method](uid, contentId, ...args);
}])) as Record<string, (...args: any[]) => Promise<any>>;

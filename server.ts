import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { verify as verifySignature } from 'crypto';
import {
  AcademyTier,
  getFirebaseMember,
  listFirebaseMembers,
  updateFirebaseMemberTier,
} from './server/firebaseMembershipAdmin.js';
import { deleteCurriculumOverride, listCurriculumOverrides, resetCurriculumOverrides, saveCurriculumOverride } from './server/academyCurriculumAdmin.js';
import { deleteCrmContact, loadCrmContacts, memberContactId, saveCrmContacts, syncConsentedMembersToCrm } from './server/crmContactsAdmin.js';
import { loadEmailCampaigns, saveEmailCampaigns } from './server/emailCampaignsAdmin.js';
import { confirmEmailConsent, loadEmailConsent, requestEmailConsent, withdrawEmailConsent } from './server/emailConsentAdmin.js';
import { createMarketingUnsubscribeToken, isMarketingEmailSuppressed, unsubscribeMarketingEmail } from './server/emailUnsubscribeAdmin.js';
import { Lesson } from './src/types.js';

dotenv.config();

type FirebaseTokenPayload = {
  aud: string;
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  academyTier?: unknown;
  academyRole?: unknown;
  admin?: unknown;
  [key: string]: unknown;
};

type FirebaseRequest = Request & { firebaseUser?: FirebaseTokenPayload };
type FirebaseCertificates = Record<string, string>;

type SendEmailRequest = {
  to?: unknown;
  subject?: unknown;
  body?: unknown;
  contactId?: unknown;
  language?: unknown;
};

const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'gom-mar-akademie';
const FIREBASE_CERTIFICATES_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';
const ACADEMY_PUBLIC_URL = 'https://academy.gomo-marketing.at';
const EMAIL_ADDRESS_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_SEND_WINDOW_MS = 60_000;
const EMAIL_SEND_LIMIT = 5;
const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
const ACADEMY_ADMIN_EMAILS = new Set(
  (process.env.ACADEMY_ADMIN_EMAILS || 'admin@gom-mar.de')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);
let firebaseCertificateCache: { certificates: FirebaseCertificates; expiresAt: number } | null = null;

const decodeJwtSegment = <T>(segment: string): T => JSON.parse(Buffer.from(segment, 'base64url').toString('utf8')) as T;

const getFirebaseCertificates = async (): Promise<FirebaseCertificates> => {
  if (firebaseCertificateCache && firebaseCertificateCache.expiresAt > Date.now()) {
    return firebaseCertificateCache.certificates;
  }

  const response = await fetch(FIREBASE_CERTIFICATES_URL);
  if (!response.ok) throw new Error('Firebase-Zertifikate konnten nicht geladen werden.');
  const certificates = await response.json() as FirebaseCertificates;
  const maxAgeMatch = response.headers.get('cache-control')?.match(/max-age=(\d+)/i);
  const maxAgeSeconds = maxAgeMatch ? Number(maxAgeMatch[1]) : 300;
  firebaseCertificateCache = {
    certificates,
    expiresAt: Date.now() + Math.max(60, maxAgeSeconds) * 1000,
  };
  return certificates;
};

const verifyFirebaseIdToken = async (idToken: string): Promise<FirebaseTokenPayload> => {
  const segments = idToken.split('.');
  if (segments.length !== 3) throw new Error('Ungültiges Firebase-Tokenformat.');

  const header = decodeJwtSegment<{ alg?: string; kid?: string }>(segments[0]);
  const payload = decodeJwtSegment<FirebaseTokenPayload>(segments[1]);
  if (header.alg !== 'RS256' || !header.kid) throw new Error('Ungültiger Firebase-Tokenheader.');

  const certificates = await getFirebaseCertificates();
  const certificate = certificates[header.kid];
  if (!certificate) throw new Error('Unbekannter Firebase-Signaturschlüssel.');

  const signatureIsValid = verifySignature(
    'RSA-SHA256',
    Buffer.from(`${segments[0]}.${segments[1]}`),
    certificate,
    Buffer.from(segments[2], 'base64url'),
  );
  if (!signatureIsValid) throw new Error('Ungültige Firebase-Tokensignatur.');

  const now = Math.floor(Date.now() / 1000);
  if (payload.aud !== FIREBASE_PROJECT_ID) throw new Error('Ungültige Firebase-Zielgruppe.');
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) throw new Error('Ungültiger Firebase-Aussteller.');
  if (!payload.sub || typeof payload.sub !== 'string') throw new Error('Firebase-Benutzerkennung fehlt.');
  if (!Number.isFinite(payload.exp) || payload.exp <= now) throw new Error('Firebase-Token ist abgelaufen.');
  if (!Number.isFinite(payload.iat) || payload.iat > now) throw new Error('Ungültiger Firebase-Ausstellungszeitpunkt.');
  if (!Number.isFinite(payload.auth_time) || payload.auth_time > now) throw new Error('Ungültiger Firebase-Anmeldezeitpunkt.');

  return payload;
};

const firebaseTierRank = (payload: FirebaseTokenPayload): number => {
  const isAdmin = payload.academyRole === 'admin'
    || payload.admin === true
    || (payload.email_verified === true && ACADEMY_ADMIN_EMAILS.has(payload.email?.toLowerCase() || ''));
  if (isAdmin || payload.academyTier === 'PREMIUM') return 2;
  if (payload.academyTier === 'PRO') return 1;
  return 0;
};

const isAcademyAdminToken = (payload?: FirebaseTokenPayload): boolean => payload?.academyRole === 'admin'
  || payload?.admin === true
  || (payload?.email_verified === true && ACADEMY_ADMIN_EMAILS.has(payload.email?.toLowerCase() || ''));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const recentEmailSends = new Map<string, number[]>();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '16kb' }));

  const requireVerifiedMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const idToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : '';
      if (!idToken) {
        res.status(401).json({ error: 'Eine Firebase-Anmeldung ist erforderlich.' });
        return;
      }

      const firebaseUser = await verifyFirebaseIdToken(idToken);
      if (firebaseUser.email_verified !== true) {
        res.status(403).json({ error: 'Die E-Mail-Adresse muss zuerst bestätigt werden.' });
        return;
      }

      (req as FirebaseRequest).firebaseUser = firebaseUser;
      next();
    } catch {
      res.status(401).json({ error: 'Die Firebase-Anmeldung ist ungültig oder abgelaufen.' });
    }
  };

  const requireProMember = (req: Request, res: Response, next: NextFunction) => {
    const firebaseUser = (req as FirebaseRequest).firebaseUser;
    if (!firebaseUser || firebaseTierRank(firebaseUser) < 1) {
      res.status(403).json({ error: 'Für diese Funktion ist ein freigeschalteter PRO-Tarif erforderlich.' });
      return;
    }
    next();
  };

  const requireAcademyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const firebaseUser = (req as FirebaseRequest).firebaseUser;
    const isAdmin = isAcademyAdminToken(firebaseUser);
    if (!isAdmin) {
      res.status(403).json({ error: 'Nur autorisierte Academy-Administratoren dürfen diese Funktion verwenden.' });
      return;
    }
    next();
  };

  const requireSchedulerSecret = (req: Request, res: Response, next: NextFunction) => {
    const configuredSecret = process.env.SCHEDULER_SECRET;
    if (!configuredSecret) {
      res.status(503).json({ error: 'Scheduler-Schutz ist nicht konfiguriert.' });
      return;
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7).trim()
      : undefined;
    const customSecretHeader = req.headers['x-scheduler-secret'];
    const suppliedSecret = Array.isArray(customSecretHeader)
      ? customSecretHeader[0]
      : customSecretHeader;

    if (bearerToken !== configuredSecret && suppliedSecret !== configuredSecret) {
      res.status(401).json({ error: 'Nicht autorisiert: Ungültiger Scheduler-Secret-Schlüssel.' });
      return;
    }

    next();
  };

  // Initialize Gemini AI Client
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      status: 'ok',
      hasKey: !!apiKey,
      service: process.env.K_SERVICE || null,
      revision: process.env.K_REVISION || null,
      commit: process.env.APP_COMMIT_SHA || null,
      emailDeliveryConfigured: Boolean(process.env.SENDGRID_API_KEY?.trim() && process.env.SENDGRID_FROM_EMAIL?.trim()),
    });
  });

  app.get('/api/crm/contacts', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const contacts = await loadCrmContacts(FIREBASE_PROJECT_ID, userId);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ contacts });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'CRM-Kontakte konnten nicht geladen werden.' });
    }
  });

  app.put('/api/crm/contacts', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const contacts = await saveCrmContacts(FIREBASE_PROJECT_ID, userId, req.body?.contacts);
      res.json({ contacts });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'CRM-Kontakte konnten nicht gespeichert werden.';
      const isValidationError = /ungültig|Größe|zu groß|überschreitet/.test(message);
      res.status(isValidationError ? 400 : 503).json({ error: message });
    }
  });

  app.delete('/api/crm/contacts/:contactId', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const contacts = await deleteCrmContact(FIREBASE_PROJECT_ID, userId, req.params.contactId);
      if (!contacts) {
        res.status(404).json({ error: 'Der CRM-Kontakt wurde nicht gefunden.' });
        return;
      }
      res.json({ contacts });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Der CRM-Kontakt konnte nicht gelöscht werden.';
      res.status(message.includes('ungültig') ? 400 : 503).json({ error: message });
    }
  });

  app.post('/api/admin/crm/sync-consented-members', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    try {
      const adminUserId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!adminUserId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const members = [];
      let pageToken: string | undefined;
      for (let page = 0; page < 10; page += 1) {
        const result = await listFirebaseMembers(FIREBASE_PROJECT_ID, pageToken);
        members.push(...result.members);
        pageToken = result.nextPageToken;
        if (!pageToken) break;
      }
      if (pageToken) throw new Error('Die Mitgliederliste ist für einen sicheren Abgleich zu groß.');
      const result = await syncConsentedMembersToCrm(FIREBASE_PROJECT_ID, adminUserId, members);
      console.info('Academy-Mitglieder mit CRM synchronisiert', {
        action: 'academy.crm.members.synced',
        actorUid: adminUserId,
        eligibleCount: result.eligibleCount,
        importedCount: result.importedCount,
        timestamp: new Date().toISOString(),
      });
      res.setHeader('Cache-Control', 'no-store');
      res.json(result);
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Mitglieder konnten nicht mit dem CRM synchronisiert werden.' });
    }
  });

  app.get('/api/email/campaigns', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const result = await loadEmailCampaigns(FIREBASE_PROJECT_ID, userId);
      res.setHeader('Cache-Control', 'no-store');
      res.json(result);
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'E-Mail-Kampagnen konnten nicht geladen werden.' });
    }
  });

  app.put('/api/email/campaigns', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const campaigns = await saveEmailCampaigns(FIREBASE_PROJECT_ID, userId, req.body?.campaigns);
      res.json({ campaigns });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'E-Mail-Kampagnen konnten nicht gespeichert werden.';
      const isValidationError = /ungültig|zu groß|überschreiten/.test(message);
      res.status(isValidationError ? 400 : 503).json({ error: message });
    }
  });

  app.get('/api/email/consent', requireVerifiedMember, async (req, res) => {
    try {
      const userId = (req as FirebaseRequest).firebaseUser?.sub;
      if (!userId) throw new Error('Firebase-Benutzerkennung fehlt.');
      const consent = await loadEmailConsent(FIREBASE_PROJECT_ID, userId);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ consent });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Die E-Mail-Einwilligung konnte nicht geladen werden.' });
    }
  });

  app.put('/api/email/consent', requireVerifiedMember, async (req, res) => {
    const granted = req.body?.granted;
    if (typeof granted !== 'boolean') {
      res.status(400).json({ error: 'Der Einwilligungsstatus ist ungültig.' });
      return;
    }
    const firebaseUser = (req as FirebaseRequest).firebaseUser;
    const userId = firebaseUser?.sub;
    const verifiedEmail = typeof firebaseUser?.email === 'string' && firebaseUser.email_verified === true
      ? firebaseUser.email.trim().toLowerCase()
      : '';
    if (!userId || !EMAIL_ADDRESS_PATTERN.test(verifiedEmail)) {
      res.status(400).json({ error: 'Eine bestätigte E-Mail-Adresse ist erforderlich.' });
      return;
    }
    try {
      if (!granted) {
        const consent = await withdrawEmailConsent(FIREBASE_PROJECT_ID, userId, verifiedEmail);
        console.info('Academy-E-Mail-Einwilligung widerrufen', {
          action: 'academy.email.consent.withdrawn',
          actorUid: userId,
          policyVersion: consent.policyVersion,
          timestamp: consent.updatedAt,
        });
        res.setHeader('Cache-Control', 'no-store');
        res.json({ consent });
        return;
      }

      const sendGridApiKey = process.env.SENDGRID_API_KEY?.trim();
      const senderEmail = process.env.SENDGRID_FROM_EMAIL?.trim();
      const senderName = process.env.SENDGRID_FROM_NAME?.trim() || 'GOM-MAR Academy';
      if (!sendGridApiKey || !senderEmail || !EMAIL_ADDRESS_PATTERN.test(senderEmail)) {
        res.status(503).json({ error: 'Die Bestätigungs-E-Mail kann derzeit nicht versendet werden.' });
        return;
      }

      const windowStart = Date.now() - EMAIL_SEND_WINDOW_MS;
      const sendKey = `consent:${userId}`;
      const sendsInWindow = (recentEmailSends.get(sendKey) || []).filter((timestamp) => timestamp > windowStart);
      if (sendsInWindow.length >= EMAIL_SEND_LIMIT) {
        res.status(429).json({ error: 'Zu viele Bestätigungs-E-Mails in kurzer Zeit. Bitte warte eine Minute.' });
        return;
      }

      const { consent, confirmationToken } = await requestEmailConsent(FIREBASE_PROJECT_ID, userId, verifiedEmail);
      const language = req.body?.language === 'en' || req.body?.language === 'pl' ? req.body.language : 'de';
      const confirmationUrl = `${ACADEMY_PUBLIC_URL}/api/email/consent/confirm?uid=${encodeURIComponent(userId)}&token=${encodeURIComponent(confirmationToken)}&lang=${language}`;
      const messages = {
        de: {
          subject: 'Bitte bestätige deine E-Mail-Einwilligung',
          body: `Du hast in der GOM-MAR Academy den Erhalt von Academy-Neuigkeiten, hilfreichen Tipps und Angeboten angefordert.\n\nBestätige deine Einwilligung innerhalb von 24 Stunden:\n${confirmationUrl}\n\nErst nach dem Klick wird die Einwilligung aktiv. Falls du dies nicht angefordert hast, ignoriere diese E-Mail. Wichtige Nachrichten zu deinem Konto bleiben davon unberührt.`,
        },
        en: {
          subject: 'Please confirm your email consent',
          body: `You requested Academy news, helpful tips, and offers from the GOM-MAR Academy.\n\nConfirm your consent within 24 hours:\n${confirmationUrl}\n\nYour consent becomes active only after you click the link. If you did not request this, ignore this email. Important account messages are not affected.`,
        },
        pl: {
          subject: 'Potwierdź zgodę na wiadomości e-mail',
          body: `W GOM-MAR Academy poproszono o wiadomości z aktualnościami Academy, pomocnymi wskazówkami i ofertami.\n\nPotwierdź zgodę w ciągu 24 godzin:\n${confirmationUrl}\n\nZgoda stanie się aktywna dopiero po kliknięciu linku. Jeśli nie wysłano tej prośby, zignoruj tę wiadomość. Nie ma to wpływu na ważne wiadomości dotyczące konta.`,
        },
      } as const;
      const message = messages[language];
      const sendResponse = await fetch(SENDGRID_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: verifiedEmail }] }],
          from: { email: senderEmail, name: senderName.slice(0, 100) },
          subject: message.subject,
          content: [{ type: 'text/plain', value: message.body }],
        }),
      });
      if (!sendResponse.ok) {
        console.error('SendGrid-Bestätigungsversand fehlgeschlagen.', {
          status: sendResponse.status,
          requestId: sendResponse.headers.get('x-message-id'),
        });
        res.status(502).json({ error: 'Die Bestätigungs-E-Mail wurde nicht angenommen. Bitte versuche es erneut.' });
        return;
      }
      recentEmailSends.set(sendKey, [...sendsInWindow, Date.now()]);
      console.info('Academy-E-Mail-Einwilligung geändert', {
        action: 'academy.email.consent.requested',
        actorUid: userId,
        policyVersion: consent.policyVersion,
        timestamp: consent.updatedAt,
      });
      res.setHeader('Cache-Control', 'no-store');
      res.status(202).json({ consent });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Die E-Mail-Einwilligung konnte nicht gespeichert werden.' });
    }
  });

  type ConsentConfirmationLanguage = 'de' | 'en' | 'pl';
  type ConsentConfirmationState = 'prompt' | 'success' | 'error';
  const consentConfirmationPage = (
    language: ConsentConfirmationLanguage,
    state: ConsentConfirmationState,
    userId = '',
    confirmationToken = '',
  ) => {
    const confirmationCopy = {
      de: {
        title: 'E-Mail-Einwilligung', promptTitle: 'Einwilligung bestätigen', successTitle: 'Einwilligung bestätigt', errorTitle: 'Bestätigung nicht möglich',
        prompt: 'Bestätige jetzt bewusst, dass du E-Mails mit Academy-Neuigkeiten, hilfreichen Tipps und Angeboten erhalten möchtest.', confirm: 'Einwilligung jetzt bestätigen',
        success: 'Du kannst jetzt E-Mails mit Academy-Neuigkeiten, hilfreichen Tipps und Angeboten erhalten. Die Einwilligung kannst du jederzeit in deinem Profil widerrufen.',
        error: 'Der Bestätigungslink ist ungültig oder abgelaufen. Bitte fordere im Profil eine neue E-Mail an.', back: 'Zur GOM-MAR Academy',
      },
      en: {
        title: 'Email consent', promptTitle: 'Confirm consent', successTitle: 'Consent confirmed', errorTitle: 'Confirmation not possible',
        prompt: 'Please confirm that you want to receive Academy news, helpful tips, and offers by email.', confirm: 'Confirm consent now',
        success: 'You can now receive Academy news, helpful tips, and offers by email. You can withdraw your consent at any time in your profile.',
        error: 'The confirmation link is invalid or has expired. Please request a new email in your profile.', back: 'Go to GOM-MAR Academy',
      },
      pl: {
        title: 'Zgoda na wiadomości e-mail', promptTitle: 'Potwierdź zgodę', successTitle: 'Zgoda potwierdzona', errorTitle: 'Potwierdzenie niemożliwe',
        prompt: 'Potwierdź, że chcesz otrzymywać e-maile z aktualnościami Academy, pomocnymi wskazówkami i ofertami.', confirm: 'Potwierdź zgodę teraz',
        success: 'Możesz teraz otrzymywać e-maile z aktualnościami Academy, pomocnymi wskazówkami i ofertami. Zgodę możesz w każdej chwili wycofać w swoim profilu.',
        error: 'Link potwierdzający jest nieprawidłowy lub wygasł. Poproś o nowy e-mail w swoim profilu.', back: 'Przejdź do GOM-MAR Academy',
      },
    } as const;
    const copy = confirmationCopy[language];
    const title = state === 'success' ? copy.successTitle : state === 'prompt' ? copy.promptTitle : copy.errorTitle;
    const message = state === 'success' ? copy.success : state === 'prompt' ? copy.prompt : copy.error;
    const confirmationForm = state === 'prompt' ? `<form method="post" action="/api/email/consent/confirm">
<input type="hidden" name="uid" value="${userId}"><input type="hidden" name="token" value="${confirmationToken}"><input type="hidden" name="lang" value="${language}">
<button type="submit">${copy.confirm}</button></form>` : '';
    return `<!doctype html>
<html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${copy.title} | GOM-MAR Academy</title><style>body{margin:0;background:#f1f5f9;color:#0f172a;font-family:system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}.card{background:#fff;border:1px solid #cbd5e1;border-radius:24px;box-shadow:0 12px 35px #0f172a18;max-width:560px;margin:24px;padding:32px}h1{font-size:24px;margin:0 0 14px;color:${state === 'success' ? '#047857' : state === 'error' ? '#be123c' : '#312e81'}}p{line-height:1.6}a,button{display:inline-block;margin-top:10px;border:0;border-radius:12px;background:#4f46e5;color:white;padding:12px 18px;text-decoration:none;font:inherit;font-weight:700;cursor:pointer}a{background:#475569}</style></head>
<body><main class="card"><h1>${title}</h1><p>${message}</p>${confirmationForm}<a href="${ACADEMY_PUBLIC_URL}">${copy.back}</a></main></body></html>`;
  };

  const setConsentConfirmationHeaders = (res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  };

  app.get('/api/email/consent/confirm', (req, res) => {
    setConsentConfirmationHeaders(res);
    const userId = typeof req.query.uid === 'string' ? req.query.uid.trim() : '';
    const confirmationToken = typeof req.query.token === 'string' ? req.query.token.trim() : '';
    const language: ConsentConfirmationLanguage = req.query.lang === 'en' || req.query.lang === 'pl' ? req.query.lang : 'de';

    if (!userId || userId.length > 128 || !/^[A-Za-z0-9_-]{40,60}$/.test(confirmationToken)) {
      res.status(400).type('html').send(consentConfirmationPage(language, 'error'));
      return;
    }
    res.type('html').send(consentConfirmationPage(language, 'prompt', userId, confirmationToken));
  });

  app.post('/api/email/consent/confirm', async (req, res) => {
    setConsentConfirmationHeaders(res);
    const userId = typeof req.body?.uid === 'string' ? req.body.uid.trim() : '';
    const confirmationToken = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
    const language: ConsentConfirmationLanguage = req.body?.lang === 'en' || req.body?.lang === 'pl' ? req.body.lang : 'de';
    if (!userId || userId.length > 128 || !/^[A-Za-z0-9_-]{40,60}$/.test(confirmationToken)) {
      res.status(400).type('html').send(consentConfirmationPage(language, 'error'));
      return;
    }
    try {
      const consent = await confirmEmailConsent(FIREBASE_PROJECT_ID, userId, confirmationToken);
      console.info('Academy-E-Mail-Einwilligung bestätigt', {
        action: 'academy.email.consent.confirmed',
        actorUid: userId,
        policyVersion: consent.policyVersion,
        timestamp: consent.updatedAt,
      });
      res.type('html').send(consentConfirmationPage(language, 'success'));
    } catch {
      res.status(400).type('html').send(consentConfirmationPage(language, 'error'));
    }
  });

  type PublicEmailLanguage = 'de' | 'en' | 'pl';
  type UnsubscribePageState = 'prompt' | 'success' | 'error';
  const unsubscribePage = (
    language: PublicEmailLanguage,
    state: UnsubscribePageState,
    token = '',
  ) => {
    const pageCopy = {
      de: {
        title: 'Marketing-E-Mails abmelden', promptTitle: 'Abmeldung bestätigen', successTitle: 'Abmeldung gespeichert', errorTitle: 'Abmeldung nicht möglich',
        prompt: 'Schade, dass du keine Marketing-E-Mails mehr erhalten möchtest. Wenn dir etwas nicht gefallen hat, freuen wir uns über dein Feedback. Mit der Abmeldung erhältst du keine E-Mail-Hinweise mehr auf neue Academy-Inhalte, hilfreiche Tipps und Angebote. Dein Academy-Zugang und deine Mitgliedschaft bleiben vollständig erhalten. Möchtest du dich trotzdem abmelden?', confirm: 'Marketing-E-Mails abmelden',
        success: 'Du erhältst keine weiteren Marketing-E-Mails. Wichtige Nachrichten zu deinem Konto und deiner Mitgliedschaft bleiben davon unberührt.',
        error: 'Der Abmeldelink ist ungültig. Bitte widerrufe die Einwilligung alternativ in deinem Academy-Profil.', back: 'Zur GOM-MAR Academy',
      },
      en: {
        title: 'Unsubscribe from marketing emails', promptTitle: 'Confirm unsubscribe', successTitle: 'Unsubscribe saved', errorTitle: 'Unable to unsubscribe',
        prompt: 'We are sorry to see you unsubscribe from marketing emails. If something did not meet your expectations, we welcome your feedback. After unsubscribing, you will no longer receive email updates about new Academy content, helpful tips, and offers. Your Academy access and membership remain fully active. Do you still want to unsubscribe?', confirm: 'Unsubscribe from marketing emails',
        success: 'You will receive no further marketing emails. Important account and membership messages are not affected.',
        error: 'The unsubscribe link is invalid. You can also withdraw your consent in your Academy profile.', back: 'Go to GOM-MAR Academy',
      },
      pl: {
        title: 'Rezygnacja z e-maili marketingowych', promptTitle: 'Potwierdź rezygnację', successTitle: 'Rezygnacja zapisana', errorTitle: 'Nie można zrezygnować',
        prompt: 'Przykro nam, że rezygnujesz z e-maili marketingowych. Jeśli coś nie spełniło Twoich oczekiwań, chętnie poznamy Twoją opinię. Po rezygnacji nie będziesz otrzymywać e-maili o nowych treściach Academy, pomocnych wskazówkach i ofertach. Twój dostęp do Academy i członkostwo pozostaną w pełni aktywne. Czy mimo to chcesz zrezygnować?', confirm: 'Zrezygnuj z e-maili marketingowych',
        success: 'Nie będziesz otrzymywać kolejnych e-maili marketingowych. Nie ma to wpływu na ważne wiadomości dotyczące konta i członkostwa.',
        error: 'Link rezygnacji jest nieprawidłowy. Możesz również wycofać zgodę w swoim profilu Academy.', back: 'Przejdź do GOM-MAR Academy',
      },
    } as const;
    const copy = pageCopy[language];
    const title = state === 'success' ? copy.successTitle : state === 'prompt' ? copy.promptTitle : copy.errorTitle;
    const message = state === 'success' ? copy.success : state === 'prompt' ? copy.prompt : copy.error;
    const confirmationForm = state === 'prompt' ? `<form method="post" action="/api/email/unsubscribe">
<input type="hidden" name="token" value="${token}"><input type="hidden" name="lang" value="${language}">
<button type="submit">${copy.confirm}</button></form>` : '';
    return `<!doctype html>
<html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${copy.title} | GOM-MAR Academy</title><style>body{margin:0;background:#f1f5f9;color:#0f172a;font-family:system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}.card{background:#fff;border:1px solid #cbd5e1;border-radius:24px;box-shadow:0 12px 35px #0f172a18;max-width:560px;margin:24px;padding:32px}h1{font-size:24px;margin:0 0 14px;color:${state === 'success' ? '#047857' : state === 'error' ? '#be123c' : '#312e81'}}p{line-height:1.6}a,button{display:inline-block;margin-top:10px;border:0;border-radius:12px;background:#4f46e5;color:white;padding:12px 18px;text-decoration:none;font:inherit;font-weight:700;cursor:pointer}a{background:#475569}</style></head>
<body><main class="card"><h1>${title}</h1><p>${message}</p>${confirmationForm}<a href="${ACADEMY_PUBLIC_URL}">${copy.back}</a></main></body></html>`;
  };

  app.get('/api/email/unsubscribe', (req, res) => {
    setConsentConfirmationHeaders(res);
    const token = typeof req.query.token === 'string' ? req.query.token.trim() : '';
    const language: PublicEmailLanguage = req.query.lang === 'en' || req.query.lang === 'pl' ? req.query.lang : 'de';
    if (!/^[A-Za-z0-9_-]{40,60}$/.test(token)) {
      res.status(400).type('html').send(unsubscribePage(language, 'error'));
      return;
    }
    res.type('html').send(unsubscribePage(language, 'prompt', token));
  });

  app.post('/api/email/unsubscribe', async (req, res) => {
    setConsentConfirmationHeaders(res);
    const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
    const language: PublicEmailLanguage = req.body?.lang === 'en' || req.body?.lang === 'pl' ? req.body.lang : 'de';
    if (!/^[A-Za-z0-9_-]{40,60}$/.test(token)) {
      res.status(400).type('html').send(unsubscribePage(language, 'error'));
      return;
    }
    try {
      const result = await unsubscribeMarketingEmail(FIREBASE_PROJECT_ID, token);
      if (result.memberUserId) {
        await withdrawEmailConsent(FIREBASE_PROJECT_ID, result.memberUserId, result.email, 'email-unsubscribe-link');
      }
      console.info('Academy-Marketing-E-Mail abgemeldet', {
        action: 'academy.email.marketing.unsubscribed',
        memberUserId: result.memberUserId,
        timestamp: new Date().toISOString(),
      });
      res.type('html').send(unsubscribePage(language, 'success'));
    } catch {
      res.status(400).type('html').send(unsubscribePage(language, 'error'));
    }
  });

  const handleEmailSend = async (
    req: Request,
    res: Response,
    recipientOverride?: string,
    marketing?: { memberUserId?: string; consentUpdatedAt?: string | null; language: PublicEmailLanguage },
  ) => {
    const sendGridApiKey = process.env.SENDGRID_API_KEY?.trim();
    const senderEmail = process.env.SENDGRID_FROM_EMAIL?.trim();
    const senderName = process.env.SENDGRID_FROM_NAME?.trim() || 'GOM-MAR Academy';
    if (!sendGridApiKey || !senderEmail || !EMAIL_ADDRESS_PATTERN.test(senderEmail)) {
      res.status(503).json({ error: 'Der E-Mail-Versand ist derzeit nicht vollständig konfiguriert.' });
      return;
    }

    const { to, subject, body } = (req.body || {}) as SendEmailRequest;
    const recipient = recipientOverride || (typeof to === 'string' ? to.trim().toLowerCase() : '');
    const emailSubject = typeof subject === 'string' ? subject.trim() : '';
    const emailBody = typeof body === 'string' ? body.trim() : '';
    if (!EMAIL_ADDRESS_PATTERN.test(recipient)) {
      res.status(400).json({ error: 'Bitte gib eine gültige Empfängeradresse ein.' });
      return;
    }
    if (!emailSubject || emailSubject.length > 200) {
      res.status(400).json({ error: 'Der Betreff muss zwischen 1 und 200 Zeichen lang sein.' });
      return;
    }
    if (!emailBody || emailBody.length > 20_000) {
      res.status(400).json({ error: 'Der Nachrichtentext muss zwischen 1 und 20.000 Zeichen lang sein.' });
      return;
    }

    const firebaseUser = (req as FirebaseRequest).firebaseUser;
    const userId = firebaseUser?.sub || '';
    const windowStart = Date.now() - EMAIL_SEND_WINDOW_MS;
    const sendsInWindow = (recentEmailSends.get(userId) || []).filter((timestamp) => timestamp > windowStart);
    if (sendsInWindow.length >= EMAIL_SEND_LIMIT) {
      res.status(429).json({ error: 'Zu viele E-Mails in kurzer Zeit. Bitte warte eine Minute.' });
      return;
    }
    recentEmailSends.set(userId, [...sendsInWindow, Date.now()]);

    try {
      let deliveredBody = emailBody;
      let deliveredHtml: string | null = null;
      if (marketing) {
        if (await isMarketingEmailSuppressed(FIREBASE_PROJECT_ID, recipient, marketing.consentUpdatedAt)) {
          res.status(409).json({ error: 'Dieser Kontakt hat Marketing-E-Mails abbestellt.' });
          return;
        }
        const unsubscribeToken = await createMarketingUnsubscribeToken(FIREBASE_PROJECT_ID, recipient, marketing.memberUserId);
        const unsubscribeUrl = `${ACADEMY_PUBLIC_URL}/api/email/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}&lang=${marketing.language}`;
        const unsubscribeLabel = {
          de: 'Marketing-E-Mails abbestellen',
          en: 'Unsubscribe from marketing emails',
          pl: 'Zrezygnuj z e-maili marketingowych',
        }[marketing.language];
        deliveredBody = `${emailBody}\n\n—\n${unsubscribeLabel}:\n${unsubscribeUrl}`;
        deliveredHtml = `<div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;white-space:normal">${escapeHtml(emailBody).replaceAll('\n', '<br>')}</div>
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #cbd5e1;font-family:Arial,sans-serif;color:#475569;font-size:14px;line-height:1.5">
<a href="${unsubscribeUrl}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700">${escapeHtml(unsubscribeLabel)}</a>
</div>`;
      }
      const response = await fetch(SENDGRID_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipient }] }],
          from: { email: senderEmail, name: senderName.slice(0, 100) },
          subject: emailSubject,
          content: deliveredHtml
            ? [
                { type: 'text/plain', value: deliveredBody },
                { type: 'text/html', value: deliveredHtml },
              ]
            : [{ type: 'text/plain', value: deliveredBody }],
        }),
      });

      if (!response.ok) {
        console.error('SendGrid-Versand fehlgeschlagen.', {
          status: response.status,
          requestId: response.headers.get('x-message-id'),
        });
        res.status(502).json({ error: 'SendGrid hat die E-Mail nicht angenommen. Bitte versuche es erneut.' });
        return;
      }

      res.status(202).json({ success: true });
    } catch {
      res.status(502).json({ error: 'Der E-Mail-Dienst ist momentan nicht erreichbar.' });
    }
  };

  app.post('/api/email/send', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    const actorUserId = (req as FirebaseRequest).firebaseUser?.sub || '';
    const contactId = typeof req.body?.contactId === 'string' ? req.body.contactId.trim() : '';
    const requestedRecipient = typeof req.body?.to === 'string' ? req.body.to.trim().toLowerCase() : '';
    const language: PublicEmailLanguage = req.body?.language === 'en' || req.body?.language === 'pl' ? req.body.language : 'de';
    if (!actorUserId || !/^[a-zA-Z0-9_-]{1,100}$/.test(contactId)) {
      res.status(400).json({ error: 'Der CRM-Kontakt ist ungültig.' });
      return;
    }
    try {
      const contacts = await loadCrmContacts(FIREBASE_PROJECT_ID, actorUserId);
      const contact = contacts.find((item) => item.id === contactId);
      const storedRecipient = typeof contact?.email === 'string' ? contact.email.trim().toLowerCase() : '';
      if (!contact || storedRecipient !== requestedRecipient || !EMAIL_ADDRESS_PATTERN.test(storedRecipient)) {
        res.status(400).json({ error: 'Der CRM-Kontakt oder seine E-Mail-Adresse ist ungültig.' });
        return;
      }

      let memberUserId: string | undefined;
      let consentUpdatedAt: string | null | undefined;
      if (contactId.startsWith('member_')) {
        const members = [];
        let pageToken: string | undefined;
        for (let page = 0; page < 10; page += 1) {
          const result = await listFirebaseMembers(FIREBASE_PROJECT_ID, pageToken);
          members.push(...result.members);
          pageToken = result.nextPageToken;
          if (!pageToken) break;
        }
        if (pageToken) throw new Error('Die Mitgliederliste ist für eine sichere Prüfung zu groß.');
        const member = members.find((item) => memberContactId(item.uid) === contactId);
        if (!member || member.email.trim().toLowerCase() !== storedRecipient) {
          res.status(409).json({ error: 'Das verknüpfte Academy-Mitglied konnte nicht sicher bestätigt werden.' });
          return;
        }
        const consent = await loadEmailConsent(FIREBASE_PROJECT_ID, member.uid);
        if (!consent.granted || consent.email.trim().toLowerCase() !== storedRecipient) {
          res.status(409).json({ error: 'Dieses Mitglied hat keine aktive Marketing-E-Mail-Einwilligung.' });
          return;
        }
        memberUserId = member.uid;
        consentUpdatedAt = consent.updatedAt;
      }

      await handleEmailSend(req, res, storedRecipient, { memberUserId, consentUpdatedAt, language });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Der CRM-Kontakt konnte nicht geprüft werden.' });
    }
  });

  app.post('/api/email/test-send', requireVerifiedMember, requireProMember, async (req, res) => {
    const firebaseUser = (req as FirebaseRequest).firebaseUser;
    const ownVerifiedEmail = typeof firebaseUser?.email === 'string' ? firebaseUser.email.trim().toLowerCase() : '';
    if (!EMAIL_ADDRESS_PATTERN.test(ownVerifiedEmail)) {
      res.status(400).json({ error: 'Die eigene bestätigte Anmeldeadresse ist nicht verfügbar.' });
      return;
    }
    await handleEmailSend(req, res, ownVerifiedEmail);
  });

  app.post('/api/admin/members/:uid/email', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    const uid = req.params.uid?.trim();
    if (!uid || uid.length > 128) {
      res.status(400).json({ error: 'Ungültige Firebase-Benutzerkennung.' });
      return;
    }
    try {
      const member = await getFirebaseMember(FIREBASE_PROJECT_ID, uid);
      if (!member) {
        res.status(404).json({ error: 'Firebase-Mitglied wurde nicht gefunden.' });
        return;
      }
      if (!member.emailVerified || member.disabled || !EMAIL_ADDRESS_PATTERN.test(member.email)) {
        res.status(400).json({ error: 'E-Mails können nur an aktive Mitglieder mit bestätigter Adresse gesendet werden.' });
        return;
      }
      await handleEmailSend(req, res, member.email.trim().toLowerCase());
      if (res.statusCode === 202) {
        const actor = (req as FirebaseRequest).firebaseUser;
        console.info('Academy-Mitglied kontaktiert', {
          action: 'academy.membership.email.sent',
          actorUid: actor?.sub,
          targetUid: member.uid,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Das Mitglied konnte nicht kontaktiert werden.' });
    }
  });

  app.get('/api/admin/members', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    try {
      const pageToken = typeof req.query.pageToken === 'string' ? req.query.pageToken : undefined;
      const result = await listFirebaseMembers(FIREBASE_PROJECT_ID, pageToken);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ success: true, ...result });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Mitglieder konnten nicht geladen werden.';
      res.status(503).json({ error: message });
    }
  });

  app.get('/api/academy/curriculum-overrides', requireVerifiedMember, async (req, res) => {
    try {
      const overrides = await listCurriculumOverrides(FIREBASE_PROJECT_ID);
      const visibleOverrides = isAcademyAdminToken((req as FirebaseRequest).firebaseUser)
        ? overrides
        : overrides.map((override) => override.lesson?.publicationStatus === 'draft'
          ? { lessonId: override.lessonId, stageId: override.stageId, deleted: true }
          : override);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ overrides: visibleOverrides });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Curriculum konnte nicht geladen werden.' });
    }
  });

  app.put('/api/admin/curriculum/lessons/:lessonId', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    const lessonId = req.params.lessonId?.trim();
    const stageId = Number(req.body?.stageId);
    const deleted = req.body?.deleted === true;
    const lesson = req.body?.lesson as Lesson | undefined;
    if (!lessonId || lessonId.length > 40 || !Number.isInteger(stageId) || stageId < 1 || (!deleted && lesson?.id !== lessonId)) {
      res.status(400).json({ error: 'Die Lektionsdaten sind ungültig.' });
      return;
    }
    try {
      await saveCurriculumOverride(FIREBASE_PROJECT_ID, { lessonId, stageId, deleted, lesson: deleted ? undefined : lesson });
      res.json({ success: true });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Lektion konnte nicht gespeichert werden.' });
    }
  });

  app.delete('/api/admin/curriculum/lessons/:lessonId', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    const lessonId = req.params.lessonId?.trim();
    if (!lessonId || lessonId.length > 40) {
      res.status(400).json({ error: 'Die Lektions-ID ist ungültig.' });
      return;
    }
    try {
      await deleteCurriculumOverride(FIREBASE_PROJECT_ID, lessonId);
      res.json({ success: true });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Die Originallektion konnte nicht wiederhergestellt werden.' });
    }
  });

  app.delete('/api/admin/curriculum-overrides', requireVerifiedMember, requireAcademyAdmin, async (_req, res) => {
    try {
      await resetCurriculumOverrides(FIREBASE_PROJECT_ID);
      res.json({ success: true });
    } catch (error: unknown) {
      res.status(503).json({ error: error instanceof Error ? error.message : 'Curriculum konnte nicht zurückgesetzt werden.' });
    }
  });

  app.post('/api/admin/members/:uid/tier', requireVerifiedMember, requireAcademyAdmin, async (req, res) => {
    const uid = req.params.uid?.trim();
    const tier = req.body?.tier as AcademyTier | undefined;
    if (!uid || uid.length > 128) {
      res.status(400).json({ error: 'Ungültige Firebase-Benutzerkennung.' });
      return;
    }
    if (tier !== 'FREE' && tier !== 'PRO' && tier !== 'PREMIUM') {
      res.status(400).json({ error: 'Der Tarif muss FREE, PRO oder PREMIUM sein.' });
      return;
    }

    try {
      const { member, previousTier } = await updateFirebaseMemberTier(FIREBASE_PROJECT_ID, uid, tier);
      const actor = (req as FirebaseRequest).firebaseUser;
      console.info('Academy-Tarif geändert', {
        action: 'academy.membership.tier.updated',
        actorUid: actor?.sub,
        actorEmail: actor?.email,
        targetUid: uid,
        previousTier,
        tier,
        timestamp: new Date().toISOString(),
      });
      res.setHeader('Cache-Control', 'no-store');
      res.json({
        success: true,
        member,
        message: 'Tarif gespeichert. Das Mitglied erhält den neuen Zugriff nach der nächsten Token-Aktualisierung.',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Tarif konnte nicht gespeichert werden.';
      const status = message.includes('nicht gefunden') ? 404 : 503;
      res.status(status).json({ error: message });
    }
  });

  // 🤖 Frag GOM-MAR AI Mentor Endpoint
  app.post('/api/ask-gommar', requireVerifiedMember, async (req, res) => {
    try {
      const {
        prompt,
        currentStageId,
        currentLessonId,
        currentStageTitle,
        currentLessonTitle,
        niche,
        targetAudience,
        history,
        language,
      } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt ist erforderlich.' });
        return;
      }

      const outputLanguage = language === 'en' ? 'Englisch' : language === 'pl' ? 'Polnisch' : 'Deutsch';
      const systemInstruction = `Du bist "Frag GOM-MAR", der persönliche KI-Mentor der GOM-MAR Academy.
Die GOM-MAR Academy führt Nutzer Schritt für Schritt zu ihrem eigenen Online-Nebeneinkommen.
Grundsatz: "Wir zeigen dir, was du als Nächstes tun musst." Keine trockene Theorie, sondern konkrete Handlungsanweisungen.

Aktueller Kontext des Nutzers:
- Aktuelle Etappe: ${currentStageTitle || '1. Dein Start'}
- Aktuelle Lektion: ${currentLessonTitle || '1.1 Wie funktioniert Online-Einkommen?'}
- Nische des Nutzers: ${niche || 'Noch nicht gewählt'}
- Zielgruppe: ${targetAudience || 'Noch nicht definiert'}

Verhaltensregeln:
1. Antworte vollständig auf ${outputLanguage} in einer motivierenden, professionellen, klaren und freundlichen Tonalität.
2. Beziehe dich direkt auf den Lernpfad der GOM-MAR Academy und gib präzise Antworten.
3. Wenn der Nutzer nach Orientierung fragt (z.B. "Was mache ich jetzt?"), verweise ihn auf den nächsten konkreten Schritt im Lernpfad oder in der Toolbox.
4. Halte Antworten prägnant, übersichtlich mit Bullet Points oder Schritten, wenn passend.
5. Verwende kurze Absätze und hebe Schlüsselbegriffe hervor.
6. Wenn deine Antwort einen konkreten nächsten Schritt in der App empfiehlt, füge als letzte Zeile genau einen passenden Marker ein:
   - [[ACTION:academy]] für eine Lektion oder den Lernpfad
   - [[ACTION:email]] für E-Mail-Kampagnen oder Automationen
   - [[ACTION:toolbox]] für Vorlagen, Generatoren oder Werkzeuge
   - [[ACTION:profile]] für Nische, Zielgruppe oder Profildaten
   Verwende keinen Marker, wenn keine direkte Navigation sinnvoll ist. Erkläre die Marker niemals im Antworttext.`;

      const contents = history && Array.isArray(history) && history.length > 0
        ? [
            ...history.map((h: { sender: string; text: string }) => ({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }],
            })),
            { role: 'user', parts: [{ text: prompt }] },
          ]
        : prompt;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const rawAnswer = response.text || '';
      const actionMatch = rawAnswer.match(/\[\[ACTION:(academy|email|toolbox|profile)\]\]/i);
      type ActionView = 'academy' | 'email' | 'toolbox' | 'profile';
      const markerAction = actionMatch?.[1]?.toLowerCase() as ActionView | undefined;
      const answer = rawAnswer
        .replace(/\s*\[\[ACTION:(?:academy|email|toolbox|profile)\]\]\s*/gi, '\n')
        .trim();

      const inferActionFromText = (text: string): ActionView | undefined => {
        const normalizedText = text.toLowerCase();
        if (/\b(profil|profile|nische|niche|nisza|zielgruppe|audience|profildaten)\b/.test(normalizedText)) return 'profile';
        if (/\b(e-?mail|kampagne|campaign|kampania|autoresponder|automation|automatyzacja)\b/.test(normalizedText)) return 'email';
        if (/\b(toolbox|werkzeug|tool|generator|vorlage|template|narzędzi\w*)\b/.test(normalizedText)) return 'toolbox';
        if (/\b(academy|akademie|lektion|lesson|lekcja|lernpfad|stage|etappe|etap)\b/.test(normalizedText)) return 'academy';
        return undefined;
      };

      const promptAction = inferActionFromText(prompt);
      const answerSuggestsNavigation = /\b(klick|öffn|geh|spring|wechsel|direkt zu|findest du|click|open|go to|switch|przejdź|otwórz|kliknij)\w*/i.test(answer);
      const answerAction = answerSuggestsNavigation ? inferActionFromText(answer) : undefined;
      const actionView = markerAction || promptAction || answerAction;

      const actionLabelsByLanguage: Record<string, Record<ActionView, string>> = {
        de: { academy: 'Zur aktuellen Lektion', email: 'Zum E-Mail-Bereich', toolbox: 'Toolbox öffnen', profile: 'Profil vervollständigen' },
        en: { academy: 'Go to the current lesson', email: 'Open the email section', toolbox: 'Open the Toolbox', profile: 'Complete your profile' },
        pl: { academy: 'Przejdź do bieżącej lekcji', email: 'Otwórz sekcję e-mail', toolbox: 'Otwórz narzędzia', profile: 'Uzupełnij profil' },
      };
      const responseLanguage = language === 'en' || language === 'pl' ? language : 'de';
      const actionLabels = actionLabelsByLanguage[responseLanguage];

      const suggestedAction = actionView
        ? {
            label: actionLabels[actionView],
            view: actionView,
            ...(actionView === 'academy' && Number.isInteger(currentStageId)
              ? { stageId: currentStageId }
              : {}),
            ...(actionView === 'academy' && typeof currentLessonId === 'string'
              ? { lessonId: currentLessonId }
              : {}),
          }
        : undefined;

      res.json({
        answer: answer || ({ de: 'Entschuldigung, ich konnte gerade keine Antwort generieren.', en: 'Sorry, I could not generate an answer right now.', pl: 'Przepraszam, nie udało mi się teraz wygenerować odpowiedzi.' })[responseLanguage],
        suggestedAction,
      });
    } catch (err: unknown) {
      console.error('Error in /api/ask-gommar:', err);
      const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.';
      res.status(500).json({ error: message });
    }
  });

  // 🛠️ GOM-MAR Toolbox Generator Endpoint
  app.post('/api/toolbox/generate', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { toolType, format, topic, targetAudience, niche, offer, additionalInfo, language } = req.body;

      let promptText = '';
      const outputLanguage = language === 'en' ? 'Englisch' : language === 'pl' ? 'Polnisch' : 'Deutsch';
      const sysInstruction = `Du bist der spezialisierte KI-Content- & Text-Generator der GOM-MAR Academy. Antworte vollständig auf ${outputLanguage}.`;

      if (toolType === 'content') {
        promptText = `Erstelle einen hochkonvertierenden Social Media Beitrag für die Plattform "${format || 'Facebook'}".
Thema: ${topic || 'Online-Nebeneinkommen aufbauen'}
Zielgruppe: ${targetAudience || 'Angestellte, die mehr Freiheit wollen'}
Nische: ${niche || 'Digitale Produkte'}
Zusatz-Infos: ${additionalInfo || 'Keine'}

Formatvorgabe:
1. Aufmerksamkeitsstarke Hook (Erster Satz)
2. Kurze packende Story / Mehrwert (3 Punkte)
3. Klare Handlungsaufforderung (Call to Action) zum Kommentieren oder Klicken.`;
      } else if (toolType === 'email') {
        promptText = `Erstelle eine professionelle E-Mail für die GOM-MAR Mail Automation.
E-Mail Typ: ${format || 'Welcome-Mail'}
Thema / Betreff-Fokus: ${topic || 'Willkommen & Download des Lead Magneten'}
Zielgruppe: ${targetAudience || 'Interessenten'}
Nische / Angebot: ${niche || 'Online Business Starter Guide'} / ${offer || 'GOM-MAR System'}

Vorgabe:
Gib mir 3 knackige Betreffzeilen und den fertigen E-Mail Text inklusive Platzhaltern wie [NAME] und [LINK].`;
      } else if (toolType === 'landingpage') {
        promptText = `Erstelle Werbetexte für eine hochkonvertierende Opt-In Landingpage.
Thema / Lead Magnet: ${topic || '5-Schritte Checkliste'}
Zielgruppe: ${targetAudience || 'Einsteiger'}
Angebot: ${offer || 'Kostenlose Anleitung'}

Gib das Ergebnis klar strukturiert zurück:
- 3 starke Haupt-Headlines (Formel: Wie du X erreichst ohne Y)
- 1 passende Sub-Headline
- 3 Vorteils-Stichpunkte (Bullet Points)
- 2 wirkungsvolle Button-Texte (Call To Action)`;
      } else if (toolType === 'affiliate') {
        promptText = `Analysiere und optimiere die Vermarktung für ein Affiliate-Angebot.
Produkt / Angebot: ${topic || offer || 'Online Kurs für Nebeneinkommen'}
Nische: ${niche || 'Finanzen / Business'}
Zielgruppe: ${targetAudience || 'Einsteiger'}

Erstelle:
1. Analyse der Kernmotivation der Zielgruppe
2. Den stärksten Verkaufsaufhänger (Angle)
3. Eine Empfehlung für einen passenden Bonus, den der Nutzer seinen Käufern anbieten kann.`;
      } else {
        promptText = `Erstelle hilfreichen Text für den Bereich ${toolType}. Thema: ${topic}.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: promptText,
        config: {
          systemInstruction: sysInstruction,
          temperature: 0.7,
        },
      });

      res.json({ result: response.text || 'Keine Ausgabe generiert.' });
    } catch (err: unknown) {
      console.error('Error in /api/toolbox/generate:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Generieren des Inhalts.';
      res.status(500).json({ error: message });
    }
  });

  // 🚀 Content Engine: 1. Generate Content Brief
  app.post('/api/content-engine/brief', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { topic, projectSettings, customAngle, targetUrl, cta } = req.body;
      if (!topic) {
        res.status(400).json({ error: 'Thema ist erforderlich.' });
        return;
      }

      const prompt = `Du bist ein führender SEO- und Content-Stratege für das Projekt "${projectSettings?.name || 'Content Engine'}".
Website: ${projectSettings?.websiteUrl || ''}
Zielgruppe: ${projectSettings?.targetAudience || 'Allgemein'}
Kern-Nische: ${(projectSettings?.coreTopics || []).join(', ')}
Brand Voice: ${projectSettings?.brandVoice || 'Professionell, einfühlsam, lösungsorientiert'}
Ziel-URL: ${targetUrl || projectSettings?.defaultTargetUrl || ''}
Gewünschter CTA: ${cta || projectSettings?.defaultCta || 'Jetzt mehr erfahren'}
Spezifischer Angle: ${customAngle || 'Bester Mehrwert & Problemlösung'}

Erstelle ein hochpräzises, strategisches CONTENT BRIEF für das Thema:
"${topic}"

Antworte ausschließlich im folgenden validen JSON-Format:
{
  "mainKeyword": "...",
  "secondaryKeywords": ["...", "...", "..."],
  "searchIntent": "informational",
  "targetAudience": "...",
  "suggestedTitle": "...",
  "metaDescription": "... (max 155 Zeichen)",
  "h1": "...",
  "outline": [
    {
      "h2": "...",
      "h3s": ["...", "..."],
      "keyPoints": ["...", "..."]
    }
  ],
  "faqTopics": [
    { "question": "...", "answerSummary": "..." },
    { "question": "...", "answerSummary": "..." },
    { "question": "...", "answerSummary": "..." }
  ],
  "cta": "...",
  "internalLinkingSuggestions": ["...", "..."]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Du bist ein Senior SEO & Content Strategist. Gib immer reines, valides JSON ohne Markdown-Backticks zurück.',
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ success: true, brief: parsed, raw: text });
      } catch {
        res.json({ success: true, brief: null, raw: text });
      }
    } catch (err: unknown) {
      console.error('Error in /api/content-engine/brief:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Erstellen des Content Briefs.';
      res.status(500).json({ error: message });
    }
  });

  // 🚀 Content Engine: 2. Generate Full Blog Article
  app.post('/api/content-engine/blog', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { topic, brief, projectSettings } = req.body;
      if (!topic || !brief) {
        res.status(400).json({ error: 'Thema und Content Brief sind erforderlich.' });
        return;
      }

      const prompt = `Erstelle einen erstklassigen, suchmaschinenoptimierten und tiefgründigen Blogartikel auf Deutsch basierend auf folgendem Content Brief:
Thema: ${topic}
Projekt: ${projectSettings?.name || 'Vital50'}
Zielgruppe: ${brief.targetAudience || projectSettings?.targetAudience || 'Menschen 50+'}
Brand Voice: ${projectSettings?.brandVoice || 'Einfühlsam, wissenschaftlich fundiert, motivierend, seriös'}
Haupt-Keyword: ${brief.mainKeyword}
Neben-Keywords: ${(brief.secondaryKeywords || []).join(', ')}
H1 Titel: ${brief.h1 || brief.suggestedTitle}
Gliederung: ${JSON.stringify(brief.outline || [])}
FAQs: ${JSON.stringify(brief.faqTopics || [])}
CTA: ${brief.cta}
Ziel-URL: ${projectSettings?.defaultTargetUrl || ''}

Stil & Struktur-Anforderungen:
- Schreibe einen vollständigen, fundierten Artikel (mind. 1.200 - 1.800 Wörter).
- Nutze ansprechende Markdown-Formatierung (#, ##, ###, Bulletpoints, fette Schlüsselwörter, Zitate/Infoboxen).
- Binde die Keywords organisch und natürlich ein.
- Baue konkrete Praxisbeispiele und Tipps für den Alltag der Zielgruppe ein.
- Am Ende ein FAQ-Abschnitt und ein starker, konvertierender CTA mit Handlungsaufforderung.

Antworte im JSON-Format:
{
  "title": "${brief.suggestedTitle || brief.h1}",
  "metaDescription": "${brief.metaDescription || ''}",
  "contentMarkdown": "... (vollständiger Artikel in Markdown)",
  "readingTimeMinutes": 6,
  "wordCount": 1400
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Du bist ein erfahrener Fachredakteur und Copywriter. Gib immer reines, valides JSON zurück.',
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ success: true, article: parsed });
      } catch {
        res.json({ success: true, article: { title: brief.suggestedTitle, contentMarkdown: text, wordCount: 800, readingTimeMinutes: 5 } });
      }
    } catch (err: unknown) {
      console.error('Error in /api/content-engine/blog:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Erstellen des Blogartikels.';
      res.status(500).json({ error: message });
    }
  });

  // 🚀 Content Engine: 3. Generate 5 Distinct Pinterest Pins (5 Angles)
  app.post('/api/content-engine/pins', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { topic, brief, projectSettings } = req.body;
      if (!topic) {
        res.status(400).json({ error: 'Thema ist erforderlich.' });
        return;
      }

      const prompt = `Erstelle genau 5 unterschiedliche Pinterest Pins für das Thema "${topic}".
Projekt: ${projectSettings?.name || 'Vital50'}
Zielgruppe: ${projectSettings?.targetAudience || 'Menschen 50+'}
Ziel-URL: ${projectSettings?.defaultTargetUrl || ''}
Standard-Board: ${projectSettings?.pinterestBoardDefault || 'Gesundheit & Ernährung 50+'}

WICHTIG: Die 5 Pins MÜSSEN 5 völlig unterschiedliche psychologische Angles (Blickwinkel) nutzen, NICHT nur denselben Text umformulieren:
1. Angle: Problem (Der Schmerzpunkt / Die Hürde im Alltag)
2. Angle: Lösung (Die einfache Methode / Der Durchbruch)
3. Angle: Fehler (Die 3 typischen Fehler, die man vermeiden muss)
4. Angle: Liste (Checkliste / 5 beste Tipps)
5. Angle: Neugier / Curiosity (Die überraschende Wahrheit / Warum kaum jemand darüber spricht)

Jeder Pin benötigt:
- title: Scroll-stoppende Headline (prägnant für Bild & Titel)
- description: SEO-optimierte Pin-Beschreibung mit Keywords & Hashtags (max 400 Zeichen)
- keywords: 3-5 relevante Suchbegriffe
- targetUrl: ${projectSettings?.defaultTargetUrl || ''}
- board: ${projectSettings?.pinterestBoardDefault || 'Vitalität 50+'}
- imagePrompt: Präziser Prompt für ein fotorealistisches 1080x1620 Pinterest-Bild im Stil der Marke ${projectSettings?.name || 'Vital50'} (z.B. warme Töne, aktive fitte Best Ager, frisches gesundes Essen, heller Hintergrund, keine kitschigen Grafiken)
- templateStyle: "vital50_clean" | "vital50_bold" | "vital50_list" | "vital50_quote"

Antworte im JSON-Format:
{
  "pins": [
    {
      "angle": "problem",
      "angleLabel": "1. Problem & Schmerzpunkt",
      "title": "...",
      "description": "...",
      "keywords": ["...", "..."],
      "targetUrl": "...",
      "board": "...",
      "imagePrompt": "...",
      "templateStyle": "vital50_bold"
    },
    {
      "angle": "solution",
      "angleLabel": "2. Klare Lösung & Methode",
      "title": "...",
      "description": "...",
      "keywords": ["...", "..."],
      "targetUrl": "...",
      "board": "...",
      "imagePrompt": "...",
      "templateStyle": "vital50_clean"
    },
    {
      "angle": "mistake",
      "angleLabel": "3. Typische Fehler vermeiden",
      "title": "...",
      "description": "...",
      "keywords": ["...", "..."],
      "targetUrl": "...",
      "board": "...",
      "imagePrompt": "...",
      "templateStyle": "vital50_bold"
    },
    {
      "angle": "list",
      "angleLabel": "4. Checkliste & Übersicht",
      "title": "...",
      "description": "...",
      "keywords": ["...", "..."],
      "targetUrl": "...",
      "board": "...",
      "imagePrompt": "...",
      "templateStyle": "vital50_list"
    },
    {
      "angle": "curiosity",
      "angleLabel": "5. Neugier & Geheimtipp",
      "title": "...",
      "description": "...",
      "keywords": ["...", "..."],
      "targetUrl": "...",
      "board": "...",
      "imagePrompt": "...",
      "templateStyle": "vital50_quote"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Du bist ein führender Pinterest-Growth-Stratege. Gib immer reines, valides JSON zurück.',
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ success: true, pins: parsed.pins || [] });
      } catch {
        res.json({ success: true, pins: [] });
      }
    } catch (err: unknown) {
      console.error('Error in /api/content-engine/pins:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Erstellen der Pinterest Pins.';
      res.status(500).json({ error: message });
    }
  });

  // 🚀 Content Engine: 4. Generate YouTube Faceless Video Script & Metadata
  app.post('/api/content-engine/youtube', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { topic, brief, projectSettings } = req.body;
      if (!topic) {
        res.status(400).json({ error: 'Thema ist erforderlich.' });
        return;
      }

      const prompt = `Erstelle ein komplettes, hochprofessionelles YouTube-Videoskript (speziell optimiert für Faceless Channels mit Voiceover & Stock/B-Roll Footage) zum Thema:
"${topic}"

Projekt: ${projectSettings?.name || 'Vital50'}
Zielgruppe: ${projectSettings?.targetAudience || 'Menschen 50+'}
Brand Voice: ${projectSettings?.brandVoice || 'Klar, motivierend, seriös'}
CTA: ${brief?.cta || projectSettings?.defaultCta || 'Kanal abonnieren & Link in der Beschreibung anklicken'}
Ziel-URL: ${projectSettings?.defaultTargetUrl || ''}

Struktur des Skripts:
1. Hook (Die ersten 10 Sekunden: Problem + Neugier, keine Begrüßungsfloskeln!)
2. Intro (Kurze Orientierung was der Zuschauer lernt)
3. Hauptteil: 3-4 logische Kapitel mit Narration-Text (Sprechertext) und visuellen Regie-Anweisungen (Visual Cue / B-Roll)
4. CTA (Call To Action: Kanal-Abo & Link in der Beschreibung)
5. Outro (Schlussgedanke & Verweis auf das nächste Video)

Zusätzlich:
- YouTube-Titel (Klickstark, SEO-optimiert)
- YouTube-Beschreibung (inkl. Timestamps / Kapitel und Link-Platzhalter)
- 10 Keywords / Tags
- Thumbnail-Konzept (Headline-Text max. 4 Wörter, Bildbeschreibung und AI-Prompt)

Antworte im JSON-Format:
{
  "title": "...",
  "description": "...",
  "keywords": ["...", "..."],
  "script": {
    "hook": "...",
    "intro": "...",
    "mainBody": [
      { "sectionTitle": "Kapitel 1: ...", "narrationText": "...", "visualCue": "[B-Roll: ...]" },
      { "sectionTitle": "Kapitel 2: ...", "narrationText": "...", "visualCue": "[B-Roll: ...]" },
      { "sectionTitle": "Kapitel 3: ...", "narrationText": "...", "visualCue": "[B-Roll: ...]" }
    ],
    "cta": "...",
    "outro": "..."
  },
  "chapters": [
    { "timestamp": "0:00", "title": "Einleitung & Hook" },
    { "timestamp": "1:15", "title": "..." },
    { "timestamp": "3:40", "title": "..." },
    { "timestamp": "6:10", "title": "Fazit & Empfehlung" }
  ],
  "thumbnailConcept": {
    "headline": "3-4 WORTE TEXT",
    "visualDescription": "Beschreibung für den Designer...",
    "imagePrompt": "YouTube Thumbnail Prompt..."
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Du bist ein YouTube Creator & Skript-Experte für Faceless Kanäle. Gib immer reines, valides JSON zurück.',
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ success: true, video: parsed });
      } catch {
        res.json({ success: true, video: null, raw: text });
      }
    } catch (err: unknown) {
      console.error('Error in /api/content-engine/youtube:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Erstellen des YouTube Skripts.';
      res.status(500).json({ error: message });
    }
  });

  // 🚀 Content Engine: 5. Generate 3 YouTube Shorts
  app.post('/api/content-engine/shorts', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { topic, brief, projectSettings } = req.body;
      if (!topic) {
        res.status(400).json({ error: 'Thema ist erforderlich.' });
        return;
      }

      const prompt = `Erstelle 3 virale YouTube Shorts Skripte (Dauer 30-50 Sekunden) aus dem Haupt-Thema "${topic}".
Projekt: ${projectSettings?.name || 'Vital50'}
Zielgruppe: ${projectSettings?.targetAudience || 'Menschen 50+'}

Jeder Short muss haben:
- shortNumber (1, 2, 3)
- title (knackiger Shorts-Titel)
- hook (Die ersten 3 Sekunden Text & Bildidee)
- scriptText (Vollständiger Sprechertext, max. 90-120 Wörter, schnelle Dynamik)
- description (inklusive 3 relevanter Hashtags wie #shorts #vital50 #gesundheit)
- cta (Kanal abonnieren für mehr Tipps)

Antworte im JSON-Format:
{
  "shorts": [
    {
      "shortNumber": 1,
      "title": "...",
      "hook": "...",
      "scriptText": "...",
      "description": "...",
      "cta": "..."
    },
    {
      "shortNumber": 2,
      "title": "...",
      "hook": "...",
      "scriptText": "...",
      "description": "...",
      "cta": "..."
    },
    {
      "shortNumber": 3,
      "title": "...",
      "hook": "...",
      "scriptText": "...",
      "description": "...",
      "cta": "..."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Du bist ein Experte für YouTube Shorts & vertikale Kurzvideos. Gib immer reines, valides JSON zurück.',
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ success: true, shorts: parsed.shorts || [] });
      } catch {
        res.json({ success: true, shorts: [] });
      }
    } catch (err: unknown) {
      console.error('Error in /api/content-engine/shorts:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Erstellen der YouTube Shorts.';
      res.status(500).json({ error: message });
    }
  });

  // 📌 Pinterest API Integration: 1. Test Connection
  app.post('/api/pinterest/test-connection', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken || typeof accessToken !== 'string') {
        res.status(400).json({ error: 'Pinterest Access Token ist erforderlich.' });
        return;
      }

      // If simulated or demo token
      if (accessToken.trim().toLowerCase() === 'demo' || accessToken.trim().startsWith('demo_')) {
        res.json({
          success: true,
          user: {
            username: 'vital50_official',
            account_type: 'BUSINESS',
            profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            website_url: 'https://vital50.gomo-marketing.at/',
            isDemo: true,
          },
        });
        return;
      }

      // Genuine Pinterest API v5 call
      const response = await fetch('https://api.pinterest.com/v5/user_account', {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        res.status(response.status).json({
          error: errData.message || `Pinterest API Fehler (HTTP ${response.status}). Bitte überprüfe deinen Access Token.`,
          details: errData,
        });
        return;
      }

      const userData = await response.json();
      res.json({ success: true, user: userData });
    } catch (err: unknown) {
      console.error('Error in /api/pinterest/test-connection:', err);
      const message = err instanceof Error ? err.message : 'Fehler bei der Pinterest-Verbindung.';
      res.status(500).json({ error: message });
    }
  });

  // 📌 Pinterest API: 2. Get User Boards
  app.post('/api/pinterest/boards', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        // Fallback default Vital50 boards for seamless UI
        res.json({
          success: true,
          boards: [
            { id: 'board_vital50_1', name: 'Gesundheit & Vitalität 50+', privacy: 'PUBLIC', pin_count: 14 },
            { id: 'board_vital50_2', name: 'Ernährung & Stoffwechsel ab 50', privacy: 'PUBLIC', pin_count: 28 },
            { id: 'board_vital50_3', name: 'Bauchfett & Intervallfasten', privacy: 'PUBLIC', pin_count: 19 },
            { id: 'board_vital50_4', name: 'Gelenke & Schmerzfrei bewegen', privacy: 'PUBLIC', pin_count: 9 },
            { id: 'board_vital50_5', name: 'Anti-Aging & Zellgesundheit', privacy: 'PUBLIC', pin_count: 12 },
          ],
        });
        return;
      }

      if (accessToken.trim().toLowerCase() === 'demo' || accessToken.trim().startsWith('demo_')) {
        res.json({
          success: true,
          boards: [
            { id: 'demo_board_1', name: 'Vital50 - Ratgeber & Tipps', privacy: 'PUBLIC', pin_count: 24 },
            { id: 'demo_board_2', name: 'Gesunde Ernährung 50+', privacy: 'PUBLIC', pin_count: 35 },
            { id: 'demo_board_3', name: 'Stoffwechsel aktivieren', privacy: 'PUBLIC', pin_count: 18 },
            { id: 'demo_board_4', name: 'Bauchfett loswerden', privacy: 'PUBLIC', pin_count: 12 },
          ],
        });
        return;
      }

      const response = await fetch('https://api.pinterest.com/v5/boards?page_size=50', {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        res.status(response.status).json({
          error: errData.message || `Pinterest Boards konnten nicht geladen werden (HTTP ${response.status}).`,
        });
        return;
      }

      const data = await response.json();
      res.json({ success: true, boards: data.items || [] });
    } catch (err: unknown) {
      console.error('Error in /api/pinterest/boards:', err);
      res.status(500).json({ error: 'Fehler beim Laden der Pinterest Boards.' });
    }
  });

  // 📌 Pinterest API: 3. Create New Board
  app.post('/api/pinterest/create-board', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { accessToken, name, description, privacy } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Board-Name ist erforderlich.' });
        return;
      }

      if (!accessToken || accessToken.trim().toLowerCase() === 'demo' || accessToken.trim().startsWith('demo_')) {
        res.json({
          success: true,
          board: {
            id: `board_${Date.now()}`,
            name,
            description: description || 'Erstellt über Vital50 Content Engine',
            privacy: privacy || 'PUBLIC',
          },
        });
        return;
      }

      const response = await fetch('https://api.pinterest.com/v5/boards', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || 'Vital50 Pinterest Board',
          privacy: privacy || 'PUBLIC',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        res.status(response.status).json({
          error: errData.message || `Board konnte nicht erstellt werden (HTTP ${response.status}).`,
        });
        return;
      }

      const data = await response.json();
      res.json({ success: true, board: data });
    } catch (err: unknown) {
      console.error('Error in /api/pinterest/create-board:', err);
      res.status(500).json({ error: 'Fehler beim Erstellen des Pinterest Boards.' });
    }
  });

  // 📌 Pinterest API: 4. Publish Real Pin (Single or Scheduled)
  app.post('/api/pinterest/publish-pin', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { accessToken, pinData, boardId } = req.body;

      if (!pinData || !pinData.title) {
        res.status(400).json({ error: 'Pin-Daten sind unvollständig.' });
        return;
      }

      if (!boardId) {
        res.status(400).json({ error: 'Bitte wähle ein Pinterest Board aus.' });
        return;
      }

      // Verify real access token
      if (!accessToken || accessToken.trim().length === 0 || accessToken.trim().toLowerCase() === 'demo' || accessToken.trim().startsWith('demo_')) {
        res.status(400).json({ 
          error: 'Pinterest ist nicht verbunden. Bitte hinterlege einen gültigen Pinterest API Access Token in den Einstellungen.',
          status: 'NOT_CONNECTED'
        });
        return;
      }

      // Genuine Pinterest API v5 Pin Creation
      const payload: Record<string, unknown> = {
        title: pinData.title.slice(0, 100),
        description: pinData.description.slice(0, 500),
        link: pinData.targetUrl || 'https://vital50.gomo-marketing.at/',
        alt_text: pinData.title.slice(0, 500),
        board_id: boardId,
      };

      if (pinData.imageUrl && (pinData.imageUrl.startsWith('http://') || pinData.imageUrl.startsWith('https://'))) {
        payload.media_source = {
          source_type: 'image_url',
          url: pinData.imageUrl,
        };
      } else if (pinData.imageBase64) {
        payload.media_source = {
          source_type: 'image_base64',
          content_type: 'image/png',
          data: pinData.imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        };
      } else {
        // Default high-res fallback image if none provided
        payload.media_source = {
          source_type: 'image_url',
          url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80',
        };
      }

      const response = await fetch('https://api.pinterest.com/v5/pins', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        res.status(response.status).json({
          error: errData.message || `Pinterest Pin konnte nicht veröffentlicht werden (HTTP ${response.status}).`,
          details: errData,
        });
        return;
      }

      const createdPin = await response.json();
      res.json({
        success: true,
        publishedPin: {
          id: createdPin.id,
          title: createdPin.title,
          link: createdPin.link,
          board_id: createdPin.board_id,
          created_at: createdPin.created_at,
          pin_url: `https://www.pinterest.com/pin/${createdPin.id}/`,
        },
      });
    } catch (err: unknown) {
      console.error('Error in /api/pinterest/publish-pin:', err);
      const message = err instanceof Error ? err.message : 'Fehler beim Veröffentlichen des Pinterest Pins.';
      res.status(500).json({ error: message });
    }
  });

  // 📌 Pinterest AI Image Prompt & Visual Enhancement Endpoint
  app.post('/api/pinterest/generate-image', requireVerifiedMember, requireProMember, async (req, res) => {
    try {
      const { prompt, topic, angle } = req.body;
      if (!prompt && !topic) {
        res.status(400).json({ error: 'Prompt oder Thema ist erforderlich.' });
        return;
      }

      // Generate optimized photo prompt using Gemini
      const promptGen = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Erstelle einen detaillierten, hyper-realistischen Fotografie-Prompt für einen hochkonvertierenden Pinterest Pin (1080x1620) zum Thema "${topic}".
Blickwinkel: ${angle || 'Gesundheit & Vitalität 50+'}.
Ausgangsprompt: ${prompt || ''}

Der Prompt muss auf Englisch formuliert sein und folgende Kriterien erfüllen:
- Stil: Professional crisp commercial health photography, natural sunlight, warm organic tones, 8k resolution.
- Motiv: Vibrant healthy ingredients, fresh herbs, water glass with citrus, or fit active senior in serene bright setting.
- Wichtig: No text in the image, clean negative space for overlays.

Antworte mit einem reinen JSON-Objekt:
{
  "optimizedPrompt": "...",
  "suggestedPhotoCategory": "nutrition | exercise | hydration | antiaging | nature",
  "stockSearchKeywords": ["...", "..."]
}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = promptGen.text || '{}';
      let parsed = { optimizedPrompt: prompt, stockSearchKeywords: [topic] };
      try {
        parsed = JSON.parse(text);
      } catch {
        // fallback
      }

      res.json({
        success: true,
        data: parsed,
      });
    } catch (err: unknown) {
      console.error('Error in /api/pinterest/generate-image:', err);
      res.status(500).json({ error: 'Fehler beim Erstellen des Bild-Prompts.' });
    }
  });

  // ⏰ Server-side Background Scheduler Endpoints
  const { ServerSchedulerWorker } = await import('./src/services/serverSchedulerWorker.js').catch(() => import('./src/services/serverSchedulerWorker'));
  const { PublishingService } = await import('./src/services/publishingService.js').catch(() => import('./src/services/publishingService'));
  const { FirestoreContentService } = await import('./src/services/firestoreContentService.js').catch(() => import('./src/services/firestoreContentService'));

  // Start the background scheduler worker automatically on server boot
  ServerSchedulerWorker.start(60000);

  // Status check endpoint for scheduler
  app.get('/api/scheduler/status', requireVerifiedMember, requireProMember, (_req, res) => {
    res.json({
      success: true,
      ...ServerSchedulerWorker.getStatus(),
    });
  });

  // 🔒 Protected Internal Scheduler Endpoint for Cloud Scheduler / Cron
  app.post('/api/internal/scheduler/run', requireSchedulerSecret, async (_req, res) => {
    try {
      const outcome = await ServerSchedulerWorker.runTick('API_TRIGGER');
      res.json({
        success: true,
        triggeredBy: 'INTERNAL_API',
        outcome,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Fehler beim Ausführen des internen Schedulers.';
      res.status(500).json({ error: message });
    }
  });

  // Manual immediate execution endpoint for a specific job
  app.post('/api/publishing/run-now', requireSchedulerSecret, async (req, res) => {
    try {
      const { userId, jobId, pinterestToken } = req.body;
      if (!userId || !jobId) {
        res.status(400).json({ error: 'userId und jobId sind erforderlich.' });
        return;
      }

      const jobs = await FirestoreContentService.getPublishingJobs(userId);
      const targetJob = jobs.find((j: any) => j.id === jobId);

      if (!targetJob) {
        res.status(404).json({ error: `Job mit ID ${jobId} wurde nicht gefunden.` });
        return;
      }

      const outcome = await PublishingService.processJob(userId, targetJob, pinterestToken, 'MANUAL_RUN');
      res.json({
        success: outcome.result.success,
        job: outcome.job,
        result: outcome.result,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Fehler bei der Sofort-Ausführung des Jobs.';
      res.status(500).json({ error: message });
    }
  });

  // Manual trigger sweep for instant testing or webhook trigger
  app.post('/api/scheduler/run-tick', requireSchedulerSecret, async (_req, res) => {
    try {
      const outcome = await ServerSchedulerWorker.runTick('API_TRIGGER');
      res.json({
        success: true,
        outcome,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Fehler beim Ausführen des Scheduler-Ticks.';
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for dev mode vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GOM-MAR Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { verify as verifySignature } from 'crypto';
import {
  AcademyTier,
  listFirebaseMembers,
  updateFirebaseMemberTier,
} from './server/firebaseMembershipAdmin.js';

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

const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'gom-mar-akademie';
const FIREBASE_CERTIFICATES_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

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
    const isAdmin = firebaseUser?.academyRole === 'admin'
      || firebaseUser?.admin === true
      || (
        firebaseUser?.email_verified === true
        && ACADEMY_ADMIN_EMAILS.has(firebaseUser.email?.toLowerCase() || '')
      );
    if (!isAdmin) {
      res.status(403).json({ error: 'Nur autorisierte Academy-Administratoren dürfen Tarife verwalten.' });
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
    res.json({ status: 'ok', hasKey: !!apiKey });
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

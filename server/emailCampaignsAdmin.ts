import { GoogleAuth } from 'google-auth-library';

type FirestoreDocument = {
  fields?: {
    campaignsJson?: { stringValue?: string };
  };
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const FIRESTORE_DATABASE_ID = process.env.FIREBASE_DATABASE_ID || '(default)';
const ID_PATTERN = /^[a-zA-Z0-9_-]{1,100}$/;
const CAMPAIGN_STATUSES = new Set(['active', 'draft', 'paused']);
const EMAIL_STATUSES = new Set(['sent', 'scheduled', 'locked']);

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents/academyEmailCampaigns/${encodeURIComponent(userId)}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für E-Mail-Kampagnen fehlen.');
  return token.token;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const isBoundedString = (value: unknown, maximumLength: number, allowEmpty = false): value is string =>
  typeof value === 'string' && value.length <= maximumLength && (allowEmpty || Boolean(value.trim()));

const isOptionalCount = (value: unknown): boolean =>
  value === undefined || (Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 1_000_000_000);

export const validateEmailCampaigns = (value: unknown): Record<string, unknown>[] => {
  if (!Array.isArray(value) || value.length > 100) {
    throw new Error('Die E-Mail-Kampagnenliste ist ungültig oder zu groß.');
  }

  const campaigns = value.filter(isRecord);
  if (campaigns.length !== value.length) throw new Error('Eine E-Mail-Kampagne ist ungültig.');

  for (const campaign of campaigns) {
    if (typeof campaign.id !== 'string' || !ID_PATTERN.test(campaign.id)) throw new Error('Eine Kampagnen-ID ist ungültig.');
    if (!isBoundedString(campaign.title, 200)) throw new Error('Ein Kampagnentitel ist ungültig.');
    if (!isBoundedString(campaign.targetAudience, 1_000, true)) throw new Error('Eine Kampagnen-Zielgruppe ist ungültig.');
    if (!isBoundedString(campaign.description, 5_000, true)) throw new Error('Eine Kampagnenbeschreibung ist ungültig.');
    if (!isBoundedString(campaign.createdAt, 100)) throw new Error('Ein Kampagnendatum ist ungültig.');
    if (!CAMPAIGN_STATUSES.has(String(campaign.status))) throw new Error('Ein Kampagnenstatus ist ungültig.');
    if (!Number.isInteger(campaign.leadsCount) || Number(campaign.leadsCount) < 0 || Number(campaign.leadsCount) > 10_000_000) {
      throw new Error('Eine Kampagnen-Kontaktzahl ist ungültig.');
    }
    if (!Array.isArray(campaign.emails) || campaign.emails.length > 100) throw new Error('Eine Kampagnen-E-Mail-Liste ist ungültig oder zu groß.');

    for (const email of campaign.emails) {
      if (!isRecord(email)) throw new Error('Eine Kampagnen-E-Mail ist ungültig.');
      if (typeof email.id !== 'string' || !ID_PATTERN.test(email.id)) throw new Error('Eine Kampagnen-E-Mail-ID ist ungültig.');
      if (email.campaignId !== campaign.id) throw new Error('Eine Kampagnen-E-Mail ist falsch zugeordnet.');
      if (!Number.isInteger(email.dayOffset) || Number(email.dayOffset) < 0 || Number(email.dayOffset) > 3_650) throw new Error('Ein Versandabstand ist ungültig.');
      if (!isBoundedString(email.title, 200)) throw new Error('Ein E-Mail-Titel ist ungültig.');
      if (!isBoundedString(email.subject, 300)) throw new Error('Ein E-Mail-Betreff ist ungültig.');
      if (!isBoundedString(email.previewText, 1_000, true)) throw new Error('Ein E-Mail-Vorschautext ist ungültig.');
      if (!isBoundedString(email.content, 100_000, true)) throw new Error('Ein E-Mail-Inhalt ist ungültig.');
      if (!EMAIL_STATUSES.has(String(email.status))) throw new Error('Ein E-Mail-Status ist ungültig.');
      if (email.requiredLessonId !== undefined && !isBoundedString(email.requiredLessonId, 40)) throw new Error('Eine erforderliche Lektions-ID ist ungültig.');
      if (!isOptionalCount(email.opensCount) || !isOptionalCount(email.clicksCount)) throw new Error('Eine E-Mail-Statistik ist ungültig.');
    }
  }

  if (Buffer.byteLength(JSON.stringify(campaigns), 'utf8') > 900_000) {
    throw new Error('Die E-Mail-Kampagnen überschreiten die zulässige Größe.');
  }
  return campaigns;
};

export const loadEmailCampaigns = async (
  projectId: string,
  userId: string,
): Promise<{ campaigns: Record<string, unknown>[]; exists: boolean }> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) return { campaigns: [], exists: false };
  if (!response.ok) {
    console.error('Firestore-Kampagnenabfrage fehlgeschlagen.', { status: response.status });
    throw new Error('E-Mail-Kampagnen konnten nicht geladen werden.');
  }

  const document = await response.json() as FirestoreDocument;
  try {
    return {
      campaigns: validateEmailCampaigns(JSON.parse(document.fields?.campaignsJson?.stringValue || '[]')),
      exists: true,
    };
  } catch {
    throw new Error('Die gespeicherten E-Mail-Kampagnen sind beschädigt.');
  }
};

export const saveEmailCampaigns = async (
  projectId: string,
  userId: string,
  campaigns: unknown,
): Promise<Record<string, unknown>[]> => {
  const validatedCampaigns = validateEmailCampaigns(campaigns);
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        campaignsJson: { stringValue: JSON.stringify(validatedCampaigns) },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) {
    console.error('Firestore-Kampagnenspeicherung fehlgeschlagen.', { status: response.status });
    throw new Error('E-Mail-Kampagnen konnten nicht gespeichert werden.');
  }
  return validatedCampaigns;
};

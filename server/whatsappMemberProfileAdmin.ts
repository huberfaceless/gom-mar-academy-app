import { GoogleAuth } from 'google-auth-library';

type FirestoreValue = {
  stringValue?: string;
  booleanValue?: boolean;
  timestampValue?: string;
};

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

export type WhatsAppMemberProfile = {
  userId: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  phoneDigits: string;
  consentGranted: boolean;
  updatedAt: string | null;
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const collectionName = 'academyWhatsAppProfiles';

const documentsUrl = (projectId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/${collectionName}`;

const accessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für WhatsApp-Profile fehlen.');
  return token.token;
};

export const normalizeWhatsAppPhone = (value: unknown): string => {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';
  if (!raw.startsWith('+') && !raw.startsWith('00')) {
    throw new Error('Bitte gib die Telefonnummer mit Ländervorwahl ein, zum Beispiel +43.');
  }
  let digits = raw.replace(/\D/g, '');
  if (raw.startsWith('00')) digits = digits.slice(2);
  if (digits.length < 8 || digits.length > 15) {
    throw new Error('Bitte gib eine gültige Telefonnummer mit Ländervorwahl ein.');
  }
  return `+${digits}`;
};

const fromDocument = (document: FirestoreDocument): WhatsAppMemberProfile | null => {
  const userId = document.name?.split('/').pop();
  const fields = document.fields;
  if (!userId || !fields) return null;
  const phoneNumber = fields.phoneNumber?.stringValue || '';
  return {
    userId,
    email: fields.email?.stringValue || '',
    displayName: fields.displayName?.stringValue || '',
    phoneNumber,
    phoneDigits: phoneNumber.replace(/\D/g, ''),
    consentGranted: fields.consentGranted?.booleanValue === true,
    updatedAt: fields.updatedAt?.timestampValue || null,
  };
};

export const loadWhatsAppMemberProfile = async (
  projectId: string,
  userId: string,
): Promise<WhatsAppMemberProfile> => {
  const response = await fetch(`${documentsUrl(projectId)}/${encodeURIComponent(userId)}`, {
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  if (response.status === 404) {
    return { userId, email: '', displayName: '', phoneNumber: '', phoneDigits: '', consentGranted: false, updatedAt: null };
  }
  if (!response.ok) throw new Error('Das WhatsApp-Profil konnte nicht geladen werden.');
  return fromDocument(await response.json() as FirestoreDocument)
    || { userId, email: '', displayName: '', phoneNumber: '', phoneDigits: '', consentGranted: false, updatedAt: null };
};

export const saveWhatsAppMemberProfile = async (
  projectId: string,
  userId: string,
  input: { email: string; displayName: string; phoneNumber: unknown; consentGranted: unknown },
): Promise<WhatsAppMemberProfile> => {
  const phoneNumber = normalizeWhatsAppPhone(input.phoneNumber);
  const consentGranted = phoneNumber ? input.consentGranted === true : false;
  if (phoneNumber) {
    const duplicate = (await listWhatsAppMemberProfiles(projectId))
      .find(profile => profile.userId !== userId && profile.phoneNumber === phoneNumber);
    if (duplicate) throw new Error('Diese Telefonnummer ist bereits einem anderen Academy-Konto zugeordnet.');
  }
  const updatedAt = new Date().toISOString();
  const response = await fetch(`${documentsUrl(projectId)}/${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        email: { stringValue: input.email.trim().toLowerCase() },
        displayName: { stringValue: input.displayName.trim().slice(0, 120) },
        phoneNumber: { stringValue: phoneNumber },
        consentGranted: { booleanValue: consentGranted },
        updatedAt: { timestampValue: updatedAt },
      },
    }),
  });
  if (!response.ok) throw new Error('Das WhatsApp-Profil konnte nicht gespeichert werden.');
  return {
    userId,
    email: input.email.trim().toLowerCase(),
    displayName: input.displayName.trim().slice(0, 120),
    phoneNumber,
    phoneDigits: phoneNumber.replace(/\D/g, ''),
    consentGranted,
    updatedAt,
  };
};

export const listWhatsAppMemberProfiles = async (projectId: string): Promise<WhatsAppMemberProfile[]> => {
  const profiles: WhatsAppMemberProfile[] = [];
  let pageToken = '';
  do {
    const url = new URL(documentsUrl(projectId));
    url.searchParams.set('pageSize', '200');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const response = await fetch(url, { headers: { Authorization: `Bearer ${await accessToken()}` } });
    if (response.status === 404) return [];
    if (!response.ok) throw new Error('WhatsApp-Profile konnten nicht geladen werden.');
    const payload = await response.json() as { documents?: FirestoreDocument[]; nextPageToken?: string };
    profiles.push(...(payload.documents || []).map(fromDocument).filter((profile): profile is WhatsAppMemberProfile => profile !== null));
    pageToken = payload.nextPageToken || '';
  } while (pageToken);
  return profiles;
};

export const deleteWhatsAppMemberProfile = async (projectId: string, userId: string): Promise<void> => {
  const response = await fetch(`${documentsUrl(projectId)}/${encodeURIComponent(userId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  if (!response.ok && response.status !== 404) throw new Error('Das WhatsApp-Profil konnte nicht gelöscht werden.');
};

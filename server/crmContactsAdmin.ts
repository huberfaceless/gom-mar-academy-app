import { GoogleAuth } from 'google-auth-library';

type FirestoreDocument = {
  fields?: {
    contactsJson?: { stringValue?: string };
  };
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const FIRESTORE_DATABASE_ID = process.env.FIREBASE_DATABASE_ID || '(default)';

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents/academyCrmContacts/${encodeURIComponent(userId)}`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für das CRM fehlen.');
  return token.token;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const validateCrmContacts = (value: unknown): Record<string, unknown>[] => {
  if (!Array.isArray(value) || value.length > 1_000) {
    throw new Error('Die CRM-Kontaktliste ist ungültig oder zu groß.');
  }

  const contacts = value.filter(isRecord);
  if (contacts.length !== value.length) throw new Error('Ein CRM-Kontakt ist ungültig.');
  for (const contact of contacts) {
    if (typeof contact.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(contact.id)) {
      throw new Error('Eine CRM-Kontakt-ID ist ungültig.');
    }
    if (typeof contact.name !== 'string' || !contact.name.trim() || contact.name.length > 200) {
      throw new Error('Ein CRM-Kontaktname ist ungültig.');
    }
    if (typeof contact.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || contact.email.length > 320) {
      throw new Error('Eine CRM-E-Mail-Adresse ist ungültig.');
    }
  }

  if (Buffer.byteLength(JSON.stringify(contacts), 'utf8') > 900_000) {
    throw new Error('Die CRM-Kontaktliste überschreitet die zulässige Größe.');
  }
  return contacts;
};

export const loadCrmContacts = async (projectId: string, userId: string): Promise<Record<string, unknown>[]> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) return [];
  if (!response.ok) {
    console.error('Firestore-CRM-Abfrage fehlgeschlagen.', { status: response.status });
    throw new Error('CRM-Kontakte konnten nicht geladen werden.');
  }

  const document = await response.json() as FirestoreDocument;
  try {
    return validateCrmContacts(JSON.parse(document.fields?.contactsJson?.stringValue || '[]'));
  } catch {
    throw new Error('Die gespeicherten CRM-Kontakte sind beschädigt.');
  }
};

export const saveCrmContacts = async (
  projectId: string,
  userId: string,
  contacts: unknown,
): Promise<Record<string, unknown>[]> => {
  const validatedContacts = validateCrmContacts(contacts);
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        contactsJson: { stringValue: JSON.stringify(validatedContacts) },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) {
    console.error('Firestore-CRM-Speicherung fehlgeschlagen.', { status: response.status });
    throw new Error('CRM-Kontakte konnten nicht gespeichert werden.');
  }
  return validatedContacts;
};

export const deleteCrmContact = async (
  projectId: string,
  userId: string,
  contactId: string,
): Promise<Record<string, unknown>[] | null> => {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(contactId)) {
    throw new Error('Die CRM-Kontakt-ID ist ungültig.');
  }

  const contacts = await loadCrmContacts(projectId, userId);
  const remainingContacts = contacts.filter((contact) => contact.id !== contactId);
  if (remainingContacts.length === contacts.length) return null;
  return saveCrmContacts(projectId, userId, remainingContacts);
};

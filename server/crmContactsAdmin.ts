import { GoogleAuth } from 'google-auth-library';
import { createHash } from 'node:crypto';
import type { FirebaseMember } from './firebaseMembershipAdmin.js';
import { loadEmailConsent } from './emailConsentAdmin.js';

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

const memberContactId = (uid: string) =>
  `member_${createHash('sha256').update(uid).digest('hex').slice(0, 32)}`;

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

export const syncConsentedMembersToCrm = async (
  projectId: string,
  adminUserId: string,
  members: FirebaseMember[],
): Promise<{
  contacts: Record<string, unknown>[];
  eligibleCount: number;
  importedCount: number;
}> => {
  const eligibleMembers: Array<{ member: FirebaseMember; consentUpdatedAt: string | null }> = [];
  const candidates = members.filter((member) => member.emailVerified && !member.disabled && Boolean(member.email));

  for (let offset = 0; offset < candidates.length; offset += 20) {
    const batch = candidates.slice(offset, offset + 20);
    const checked = await Promise.all(batch.map(async (member) => ({
      member,
      consent: await loadEmailConsent(projectId, member.uid),
    })));
    for (const { member, consent } of checked) {
      if (consent.granted && consent.email.trim().toLowerCase() === member.email.trim().toLowerCase()) {
        eligibleMembers.push({ member, consentUpdatedAt: consent.updatedAt });
      }
    }
  }

  const existingContacts = await loadCrmContacts(projectId, adminUserId);
  const existingMemberContacts = new Map(
    existingContacts
      .filter((contact) => typeof contact.id === 'string' && contact.id.startsWith('member_'))
      .map((contact) => [contact.id as string, contact]),
  );
  const manualContacts = existingContacts.filter(
    (contact) => typeof contact.id !== 'string' || !contact.id.startsWith('member_'),
  );
  const occupiedEmails = new Set(
    manualContacts
      .map((contact) => typeof contact.email === 'string' ? contact.email.trim().toLowerCase() : '')
      .filter(Boolean),
  );
  let importedCount = 0;
  const syncedMemberContacts: Record<string, unknown>[] = [];

  for (const { member, consentUpdatedAt } of eligibleMembers.sort((a, b) => a.member.email.localeCompare(b.member.email))) {
    const email = member.email.trim().toLowerCase();
    if (occupiedEmails.has(email)) continue;
    occupiedEmails.add(email);
    const id = memberContactId(member.uid);
    const existing = existingMemberContacts.get(id);
    if (!existing) importedCount += 1;
    syncedMemberContacts.push({
      ...(existing || {}),
      id,
      name: member.displayName || email.split('@')[0],
      role: `Academy-Mitglied (${member.tier})`,
      company: 'GOM-MAR Academy',
      avatarUrl: typeof existing?.avatarUrl === 'string' ? existing.avatarUrl : '',
      email,
      phone: typeof existing?.phone === 'string' ? existing.phone : '—',
      location: typeof existing?.location === 'string' ? existing.location : '—',
      badge: 'Einwilligung aktiv',
      badgeType: 'active',
      score: typeof existing?.score === 'number' ? existing.score : 50,
      scoreDescription: 'Bestätigtes Academy-Mitglied mit dokumentierter E-Mail-Einwilligung.',
      tags: ['Academy-Mitglied', 'E-Mail-Einwilligung', member.tier],
      lastInteraction: consentUpdatedAt || 'Einwilligung erteilt',
      timeline: Array.isArray(existing?.timeline) ? existing.timeline : [{
        id: `consent_${id.slice(7)}`,
        type: 'note',
        title: 'E-Mail-Einwilligung erteilt',
        timestamp: consentUpdatedAt || 'Dokumentiert',
        noteDetails: {
          author: 'System',
          text: 'Aus der dokumentierten Academy-Einwilligung synchronisiert.',
        },
      }],
    });
  }

  const contacts = await saveCrmContacts(projectId, adminUserId, [...syncedMemberContacts, ...manualContacts]);
  return { contacts, eligibleCount: eligibleMembers.length, importedCount };
};

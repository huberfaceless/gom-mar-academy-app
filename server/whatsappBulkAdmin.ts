import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { listFirebaseMembers } from './firebaseMembershipAdmin.js';
import { listWhatsAppMemberProfiles } from './whatsappMemberProfileAdmin.js';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });

export const eligibleWhatsAppMembers = async (projectId: string) => {
  const members = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const result = await listFirebaseMembers(projectId, pageToken);
    members.push(...result.members);
    pageToken = result.nextPageToken;
    if (!pageToken) break;
  }
  if (pageToken) throw new Error('Die Mitgliederliste ist für einen sicheren WhatsApp-Versand zu groß.');
  const profiles = await listWhatsAppMemberProfiles(projectId);
  const uniquePhone = new Set<string>();
  return profiles.filter((profile) => {
    const member = members.find((item) => item.uid === profile.userId);
    if (!member || member.disabled || !member.emailVerified || !profile.consentGranted || !/^\d{8,15}$/.test(profile.phoneDigits)) return false;
    if (uniquePhone.has(profile.phoneDigits)) return false;
    uniquePhone.add(profile.phoneDigits);
    return true;
  }).map(({ userId, displayName, email, phoneNumber, phoneDigits }) => ({
    userId, displayName, email, phoneNumber, phoneDigits,
  }));
};

export const reserveWhatsAppBulkRecipient = async (projectId: string, campaignId: string, userId: string) => {
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für den WhatsApp-Versand fehlen.');
  const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
  const url = new URL(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/whatsappBulkReservations`);
  url.searchParams.set('documentId', createHash('sha256').update(`${campaignId}:${userId}`).digest('hex'));
  const response = await fetch(url, { method: 'POST', headers: {
    Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json',
  }, body: JSON.stringify({ fields: {
    campaignId: { stringValue: campaignId }, memberId: { stringValue: userId },
    reservedAt: { timestampValue: new Date().toISOString() },
  } }) });
  if (response.status === 409) return false;
  if (!response.ok) throw new Error('Der WhatsApp-Versand konnte nicht gegen doppelte Zustellung gesichert werden.');
  return true;
};

import { GoogleAuth } from 'google-auth-library';
import type { StripeCheckoutSession } from './stripeManagedPayments.js';

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, { stringValue?: string }>;
};

export type StripeMembershipSummary = {
  userId: string;
  status: string;
  cancellationAt?: string;
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const collectionName = 'academyStripeMemberships';

const documentUrl = (projectId: string, userId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/${collectionName}/${encodeURIComponent(userId)}`;

const accessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für Stripe-Mitgliedschaften fehlen.');
  return token.token;
};

export const loadStripeCustomerId = async (projectId: string, userId: string): Promise<string | undefined> => {
  const response = await fetch(documentUrl(projectId, userId), {
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('Die Stripe-Mitgliedschaft konnte nicht geladen werden.');
  const document = await response.json() as FirestoreDocument;
  return document.fields?.stripeCustomerId?.stringValue || undefined;
};

export const listStripeMemberships = async (projectId: string): Promise<StripeMembershipSummary[]> => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/${collectionName}?pageSize=1000`,
    { headers: { Authorization: `Bearer ${await accessToken()}` } },
  );
  if (!response.ok) throw new Error('Die Stripe-Mitgliedschaften konnten nicht geladen werden.');
  const payload = await response.json() as { documents?: FirestoreDocument[] };
  return (payload.documents || []).flatMap((document) => {
    const userId = document.fields?.userId?.stringValue || document.name?.split('/').pop() || '';
    if (!userId) return [];
    const cancellationAt = document.fields?.cancellationAt?.stringValue || undefined;
    return [{
      userId,
      status: document.fields?.status?.stringValue || '',
      ...(cancellationAt ? { cancellationAt } : {}),
    }];
  });
};

export const saveStripeMembership = async (
  projectId: string,
  userId: string,
  eventId: string,
  session: StripeCheckoutSession,
): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        stripeCustomerId: { stringValue: session.customer || '' },
        stripeSubscriptionId: { stringValue: session.subscription || '' },
        stripeCheckoutSessionId: { stringValue: session.id },
        stripeEventId: { stringValue: eventId },
        tier: { stringValue: 'PRO' },
        status: { stringValue: 'active' },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) throw new Error('Die Stripe-Mitgliedschaft konnte nicht gespeichert werden.');
};

export const cancelStripeMembership = async (
  projectId: string,
  userId: string,
  eventId: string,
  subscription: StripeCheckoutSession,
): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        stripeCustomerId: { stringValue: subscription.customer || '' },
        stripeSubscriptionId: { stringValue: subscription.id },
        stripeEventId: { stringValue: eventId },
        tier: { stringValue: 'FREE' },
        status: { stringValue: 'canceled' },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) throw new Error('Die gekündigte Stripe-Mitgliedschaft konnte nicht gespeichert werden.');
};

export const saveStripeCancellationStatus = async (
  projectId: string,
  userId: string,
  eventId: string,
  subscription: StripeCheckoutSession,
  cancellationAt: string | null,
): Promise<void> => {
  const response = await fetch(documentUrl(projectId, userId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        userId: { stringValue: userId },
        stripeCustomerId: { stringValue: subscription.customer || '' },
        stripeSubscriptionId: { stringValue: subscription.id },
        stripeEventId: { stringValue: eventId },
        tier: { stringValue: 'PRO' },
        status: { stringValue: cancellationAt ? 'canceling' : 'active' },
        cancellationAt: { stringValue: cancellationAt || '' },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) throw new Error('Der Stripe-Kündigungsstatus konnte nicht gespeichert werden.');
};

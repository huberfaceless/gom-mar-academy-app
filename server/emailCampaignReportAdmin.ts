import { GoogleAuth } from 'google-auth-library';
import { getFirebaseMember } from './firebaseMembershipAdmin.js';
import { loadEmailConsent } from './emailConsentAdmin.js';
import { isMarketingEmailSuppressed } from './emailUnsubscribeAdmin.js';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
export const loadCampaignDeliveryReport = async (projectId: string, ownerUid: string) => {
  const token = await (await auth.getClient()).getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten fehlen.');
  const database = process.env.FIREBASE_DATABASE_ID || '(default)';
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(database)}/documents:runQuery`, {
    method: 'POST', headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: 'academyEmailDeliveries' }],
      where: { fieldFilter: { field: { fieldPath: 'ownerUid' }, op: 'EQUAL', value: { stringValue: ownerUid } } },
      limit: 1001,
    } }),
  });
  if (!response.ok) throw new Error('Das Versandprotokoll konnte nicht geladen werden.');
  const rows = await response.json() as Array<{ document?: { fields?: Record<string, { stringValue?: string }> } }>;
  const documents = rows.filter(row => row.document);
  if (documents.length > 1000) throw new Error('Das Versandprotokoll ist zu groß für diese Übersicht.');
  const deliveries = documents.map(row => {
    const f = row.document?.fields || {};
    return { campaignId: f.campaignId?.stringValue || '', emailId: f.emailId?.stringValue || '', status: f.status?.stringValue || 'reserved' };
  });
  const member = await getFirebaseMember(projectId, ownerUid);
  const consent = await loadEmailConsent(projectId, ownerUid);
  const selfTestAllowed = Boolean(member?.emailVerified && !member.disabled && consent.granted
    && consent.email.trim().toLowerCase() === member.email.trim().toLowerCase()
    && !await isMarketingEmailSuppressed(projectId, member.email, consent.updatedAt));
  return { deliveries, selfTestAllowed, checkedAt: new Date().toISOString() };
};

import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { getFirebaseMember, listFirebaseMembers, type FirebaseMember } from './firebaseMembershipAdmin.js';
import { campaignDeliveryMode, loadEmailCampaigns } from './emailCampaignsAdmin.js';
import { loadEmailConsent } from './emailConsentAdmin.js';
import { createMarketingUnsubscribeToken, isMarketingEmailSuppressed } from './emailUnsubscribeAdmin.js';

type Campaign = {
  id: string;
  status: string;
  automationStartedAt?: string;
  deliveryMode?: 'self-test' | 'members';
  emails: Array<{ id: string; status: string; dayOffset: number; subject: string; content: string }>;
};

export const campaignAllowsRecipient = (campaign: { deliveryMode?: unknown }, ownerUid: string, recipientUid: string): boolean => {
  try { return campaignDeliveryMode(campaign) === 'members' || ownerUid === recipientUid; }
  catch { return false; }
};

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });

export const campaignConsentSkipReason = (
  consent: { granted: boolean; email: string },
  recipientEmail: string,
): string | null => {
  if (!consent.granted) return 'missing-consent';
  if (consent.email.trim().toLowerCase() !== recipientEmail.trim().toLowerCase()) return 'consent-email-mismatch';
  return null;
};

const logSkippedRecipient = (ownerUid: string, campaignId: string, emailId: string, memberUid: string, reason: string) => {
  // Keine E-Mail-Adressen, Inhalte oder Abmeldetoken in Produktionslogs.
  console.info(JSON.stringify({
    event: 'academy.email.campaign.recipient.skipped',
    ownerUid, campaignId, emailId, memberUid, reason,
    message: reason === 'missing-consent'
      ? 'Wegen fehlender Einwilligung übersprungen'
      : reason === 'marketing-suppressed'
        ? 'Wegen Marketing-Versandsperre übersprungen'
        : 'Wegen geänderter Versandvoraussetzungen übersprungen',
  }));
};
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
const MAX_SENDS_PER_TICK = 10;
const collectionUrl = (projectId: string) =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyEmailDeliveries`;

const accessToken = async () => {
  const token = await (await auth.getClient()).getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für E-Mail-Versand fehlen.');
  return token.token;
};

export const isCampaignEmailDue = (
  campaign: Campaign,
  email: Campaign['emails'][number],
  now: number,
  consentUpdatedAt?: string | null,
): boolean => Boolean(
  campaign.status === 'active'
  && campaign.automationStartedAt
  && Number.isFinite(Date.parse(campaign.automationStartedAt))
  && email.status === 'scheduled'
  && Number.isInteger(email.dayOffset)
  && Math.max(Date.parse(campaign.automationStartedAt), consentUpdatedAt ? Date.parse(consentUpdatedAt) : 0)
    + email.dayOffset * 86_400_000 <= now,
);

const reserveDelivery = async (projectId: string, ownerUid: string, campaignId: string, emailId: string, memberUid: string) => {
  const id = createHash('sha256').update(JSON.stringify([ownerUid, campaignId, emailId, memberUid])).digest('hex');
  const url = `${collectionUrl(projectId)}?documentId=${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      ownerUid: { stringValue: ownerUid },
      campaignId: { stringValue: campaignId },
      emailId: { stringValue: emailId },
      memberUid: { stringValue: memberUid },
      status: { stringValue: 'reserved' },
      createdAt: { timestampValue: new Date().toISOString() },
    } }),
  });
  if (response.status === 409) return null;
  if (!response.ok) throw new Error(`E-Mail-Versand konnte nicht reserviert werden (${response.status}).`);
  return `${collectionUrl(projectId)}/${id}`;
};

const updateDelivery = async (url: string, status: 'accepted' | 'failed') => {
  const response = await fetch(`${url}?updateMask.fieldPaths=status&updateMask.fieldPaths=updatedAt`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      status: { stringValue: status },
      updatedAt: { timestampValue: new Date().toISOString() },
    } }),
  });
  if (!response.ok) throw new Error('Der E-Mail-Versandstatus konnte nicht gespeichert werden.');
};

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (value) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[value] || value);

const sendCampaignEmail = async (
  projectId: string,
  member: FirebaseMember,
  email: Campaign['emails'][number],
  selfTest = false,
) => {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim();
  if (!apiKey || !fromEmail) throw new Error('SendGrid ist nicht konfiguriert.');
  const token = await createMarketingUnsubscribeToken(projectId, member.email, member.uid);
  const unsubscribeUrl = `https://academy.gomo-marketing.at/api/email/unsubscribe?token=${encodeURIComponent(token)}&lang=${member.language}`;
  const label = {
    de: 'Marketing-E-Mails abbestellen',
    en: 'Unsubscribe from marketing emails',
    pl: 'Zrezygnuj z e-maili marketingowych',
  }[member.language];
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: member.email }] }],
      from: { email: fromEmail, name: (process.env.SENDGRID_FROM_NAME || 'GOM-MAR Academy').slice(0, 100) },
      subject: selfTest ? `[AUTOMATIK-TEST] ${email.subject}` : email.subject,
      content: [
        { type: 'text/plain', value: `${email.content}\n\n—\n${label}: ${unsubscribeUrl}` },
        { type: 'text/html', value: `<div style="white-space:pre-wrap;font-family:Arial,sans-serif">${escapeHtml(email.content)}</div><p><a href="${unsubscribeUrl}">${escapeHtml(label)}</a></p>` },
      ],
    }),
  });
  if (!response.ok) throw new Error(`SendGrid hat den Kampagnenversand abgelehnt (${response.status}).`);
};

const allMembers = async (projectId: string): Promise<FirebaseMember[]> => {
  const members: FirebaseMember[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 10; page++) {
    const result = await listFirebaseMembers(projectId, pageToken);
    members.push(...result.members);
    pageToken = result.nextPageToken;
    if (!pageToken) return members;
  }
  throw new Error('Die Mitgliederliste ist für einen sicheren Kampagnenversand zu groß.');
};

export const runEmailCampaignDeliveries = async (projectId: string): Promise<{ reserved: number; accepted: number; failed: number }> => {
  const outcome = { reserved: 0, accepted: 0, failed: 0 };
  if (!process.env.SENDGRID_API_KEY?.trim() || !process.env.SENDGRID_FROM_EMAIL?.trim()) {
    throw new Error('SendGrid ist für den Kampagnenversand nicht konfiguriert.');
  }
  const members = await allMembers(projectId);
  const adminEmails = new Set((process.env.ACADEMY_ADMIN_EMAILS || 'admin@gom-mar.de')
    .split(',').map((email) => email.trim().toLowerCase()).filter(Boolean));
  const owners = members.filter((member) => member.emailVerified && !member.disabled
    && (member.role === 'admin' || adminEmails.has(member.email.toLowerCase())));

  for (const owner of owners) {
    const { campaigns } = await loadEmailCampaigns(projectId, owner.uid);
    for (const campaign of campaigns as Campaign[]) {
      for (const email of campaign.emails) {
        if (!isCampaignEmailDue(campaign, email, Date.now())) continue;
        for (const member of members) {
          if (outcome.reserved >= MAX_SENDS_PER_TICK) return outcome;
          if (!campaignAllowsRecipient(campaign, owner.uid, member.uid)) continue;
          if (!member.emailVerified || member.disabled || !member.email) continue;
          const consent = await loadEmailConsent(projectId, member.uid);
          const consentSkipReason = campaignConsentSkipReason(consent, member.email);
          if (consentSkipReason) {
            logSkippedRecipient(owner.uid, campaign.id, email.id, member.uid, consentSkipReason);
            continue;
          }
          if (!isCampaignEmailDue(campaign, email, Date.now(), consent.updatedAt)) continue;
          if (await isMarketingEmailSuppressed(projectId, member.email, consent.updatedAt)) {
            logSkippedRecipient(owner.uid, campaign.id, email.id, member.uid, 'marketing-suppressed');
            continue;
          }
          const reservation = await reserveDelivery(projectId, owner.uid, campaign.id, email.id, member.uid);
          if (!reservation) continue;
          outcome.reserved++;
          try {
            // Recheck immediately before sending; a reservation is never retried automatically.
            const active = (await loadEmailCampaigns(projectId, owner.uid)).campaigns
              .find((item) => item.id === campaign.id) as Campaign | undefined;
            const currentEmail = active?.emails.find((item) => item.id === email.id);
            const currentMember = await getFirebaseMember(projectId, member.uid);
            const latest = await loadEmailConsent(projectId, member.uid);
            if (!active || !campaignAllowsRecipient(active, owner.uid, member.uid)
              || campaignDeliveryMode(active) !== campaignDeliveryMode(campaign)
              || !currentEmail || !isCampaignEmailDue(active, currentEmail, Date.now(), latest.updatedAt)
              || !currentMember?.emailVerified || currentMember.disabled
              || currentMember.email.trim().toLowerCase() !== member.email.trim().toLowerCase()
              || !latest.granted || latest.email.trim().toLowerCase() !== member.email.trim().toLowerCase()
              || await isMarketingEmailSuppressed(projectId, member.email, latest.updatedAt)) {
              logSkippedRecipient(owner.uid, campaign.id, email.id, member.uid,
                campaignConsentSkipReason(latest, member.email) || 'pre-send-check-failed');
              await updateDelivery(reservation, 'failed');
              outcome.failed++;
              continue;
            }
            await sendCampaignEmail(projectId, currentMember, currentEmail, campaignDeliveryMode(active) === 'self-test');
            await updateDelivery(reservation, 'accepted');
            outcome.accepted++;
          } catch (error: unknown) {
            outcome.failed++;
            console.error('Kampagnen-E-Mail erfordert manuelle Prüfung', {
              campaignId: campaign.id, emailId: email.id, memberUid: member.uid,
              reason: error instanceof Error ? error.message : 'Unbekannter Versandfehler',
            });
            try { await updateDelivery(reservation, 'failed'); } catch { /* Die Reservierung verhindert einen doppelten Versand. */ }
          }
        }
      }
    }
  }
  return outcome;
};

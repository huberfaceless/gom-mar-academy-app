import type { Campaign } from '../types';
import { resolvePinterestTargetUrl } from './pinterestTargetUrl';

export interface ContentEmailDraft {
  title: string;
  subject: string;
  previewText: string;
  content: string;
  dayOffset: number;
}
export interface ContentEmailBatch {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  targetUrl: string;
  emails: ContentEmailDraft[];
}
export function validateContentEmailBatch(input: unknown): ContentEmailBatch {
  const data = input as ContentEmailBatch;
  const check = (value: unknown, max: number, empty = false): string => {
    if (typeof value !== 'string' || value.length > max || (!empty && !value.trim())) throw new Error('Bitte die E-Mail-Felder vollständig und innerhalb der Zeichenlimits ausfüllen.');
    return value.trim();
  };
  if (!data || typeof data.id !== 'string' || !/^[a-zA-Z0-9_-]{1,70}$/.test(data.id)) throw new Error('Ungültiger E-Mail-Entwurf.');
  if (!Array.isArray(data.emails) || ![1, 5].includes(data.emails.length)) throw new Error('Bitte eine E-Mail oder eine Serie mit fünf E-Mails erstellen.');
  let previous = -1;
  const emails = data.emails.map(email => {
    if (!email || !Number.isSafeInteger(email.dayOffset) || email.dayOffset < 0 || email.dayOffset > 3650 || email.dayOffset < previous) throw new Error('Die Versandabstände müssen aufsteigend zwischen 0 und 3650 Tagen liegen.');
    previous = email.dayOffset;
    return { title: check(email.title, 200), subject: check(email.subject, 300), previewText: check(email.previewText, 1000, true), content: check(email.content, 12000), dayOffset: email.dayOffset };
  });
  return { id: data.id, title: check(data.title, 200), targetAudience: check(data.targetAudience, 1000), description: check(data.description, 5000), targetUrl: resolvePinterestTargetUrl(check(data.targetUrl, 2048)), emails };
}
// A stable batch ID makes retries idempotent. Never inherit recipients or send state.
export function contentEmailCampaign(input: unknown, now = new Date().toISOString()): Campaign {
  const batch = validateContentEmailBatch(input);
  const id = `hub_${batch.id}`;
  return {
    id, title: batch.title, targetAudience: batch.targetAudience, description: batch.description,
    createdAt: now, leadsCount: 0, status: 'draft', deliveryMode: 'self-test',
    emails: batch.emails.map((email, index) => ({ ...email, id: `${id}_${index}`, campaignId: id, status: 'draft' })),
  };
}

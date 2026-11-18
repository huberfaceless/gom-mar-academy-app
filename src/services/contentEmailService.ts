import { authenticatedFetch } from './authenticatedFetch';
import type { Campaign } from '../types';
import type { CentralContentProject } from '../types/contentEngine';
import { validateContentEmailBatch, type ContentEmailBatch } from '../utils/contentEmail';

async function post(path: string, body: unknown) {
  const response = await authenticatedFetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Die E-Mail-Anfrage ist fehlgeschlagen.');
  return data;
}
export async function generateEmails(project: CentralContentProject, count: number, targetUrl: string): Promise<ContentEmailBatch> {
  const data = await post('/api/content-engine/emails', {
    topic: project.topic, projectSettings: project.projectSettings, article: project.blogArticle,
    brief: project.contentBrief, count, targetUrl,
  });
  return validateContentEmailBatch(data.batch);
}
export async function importEmails(batch: ContentEmailBatch): Promise<{ campaigns: Campaign[]; campaignId: string; alreadyExists: boolean }> {
  return post('/api/email/campaigns/from-content', { batch: validateContentEmailBatch(batch) });
}

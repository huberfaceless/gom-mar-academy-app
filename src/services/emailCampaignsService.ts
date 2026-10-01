import type { Campaign } from '../types';
import { authenticatedFetch } from './authenticatedFetch';

export const loadEmailCampaigns = async (): Promise<{ campaigns: Campaign[]; exists: boolean }> => {
  const response = await authenticatedFetch('/api/email/campaigns');
  const result = await response.json().catch(() => ({})) as { campaigns?: Campaign[]; exists?: boolean; error?: string };
  if (!response.ok) throw new Error(result.error || 'E-Mail-Kampagnen konnten nicht geladen werden.');
  return { campaigns: Array.isArray(result.campaigns) ? result.campaigns : [], exists: result.exists === true };
};

export const saveEmailCampaigns = async (campaigns: Campaign[]): Promise<Campaign[]> => {
  const response = await authenticatedFetch('/api/email/campaigns', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campaigns }),
  });
  const result = await response.json().catch(() => ({})) as { campaigns?: Campaign[]; error?: string };
  if (!response.ok) throw new Error(result.error || 'E-Mail-Kampagnen konnten nicht gespeichert werden.');
  return Array.isArray(result.campaigns) ? result.campaigns : [];
};

export type CampaignDeliveryReport = {
  deliveries: Array<{ campaignId: string; emailId: string; status: string; deliveryState: string }>;
  selfTestAllowed: boolean;
  webhookKeyConfigured: boolean;
  checkedAt: string;
};
export const loadCampaignDeliveryReport = async (): Promise<CampaignDeliveryReport> => {
  const response = await authenticatedFetch('/api/email/campaigns/report');
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Versandprotokoll nicht verfügbar.');
  return result as CampaignDeliveryReport;
};

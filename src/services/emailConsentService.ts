import { authenticatedFetch } from './authenticatedFetch';

export type EmailConsent = {
  granted: boolean;
  pending: boolean;
  email: string;
  policyVersion: string;
  updatedAt: string | null;
};

export const loadEmailConsent = async (): Promise<EmailConsent> => {
  const response = await authenticatedFetch('/api/email/consent');
  const result = await response.json().catch(() => ({})) as { consent?: EmailConsent; error?: string };
  if (!response.ok || !result.consent) throw new Error(result.error || 'Die E-Mail-Einwilligung konnte nicht geladen werden.');
  return result.consent;
};

export const saveEmailConsent = async (granted: boolean, language: 'de' | 'en' | 'pl'): Promise<EmailConsent> => {
  const response = await authenticatedFetch('/api/email/consent', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ granted, language }),
  });
  const result = await response.json().catch(() => ({})) as { consent?: EmailConsent; error?: string };
  if (!response.ok || !result.consent) throw new Error(result.error || 'Die E-Mail-Einwilligung konnte nicht gespeichert werden.');
  return result.consent;
};

import { authenticatedFetch } from './authenticatedFetch';

type EmailDeliveryPayload = {
  to: string;
  subject: string;
  body: string;
};

export const sendEmail = async (payload: EmailDeliveryPayload): Promise<void> => {
  const response = await authenticatedFetch('/api/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(result.error || 'Die E-Mail konnte nicht versendet werden.');
  }
};

export const sendTestEmail = async (payload: Omit<EmailDeliveryPayload, 'to'>): Promise<void> => {
  const response = await authenticatedFetch('/api/email/test-send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(result.error || 'Die Test-E-Mail konnte nicht versendet werden.');
  }
};

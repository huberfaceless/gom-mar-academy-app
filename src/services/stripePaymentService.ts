import { auth } from '../firebase/config';

export const startProMonthlyCheckout = async (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch('/api/payments/checkout/pro-monthly', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await currentUser.getIdToken()}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json().catch(() => ({})) as { url?: string; error?: string };
  if (!response.ok || !result.url) throw new Error(result.error || 'Stripe Checkout konnte nicht gestartet werden.');
  window.location.assign(result.url);
};

export const loadCompletedProCheckout = async (sessionId: string): Promise<{ email: string }> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch(`/api/payments/checkout/session/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` },
  });
  const result = await response.json().catch(() => ({})) as { email?: string; error?: string };
  if (!response.ok || !result.email) {
    throw new Error(result.error || 'Stripe-Zahlung konnte nicht bestätigt werden.');
  }
  return { email: result.email };
};

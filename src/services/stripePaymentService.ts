import { auth } from '../firebase/config';

export const startProMonthlyCheckout = async (contractVersion?: string): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch('/api/payments/checkout/pro-monthly', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await currentUser.getIdToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contractVersion }),
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
export const openStripeCustomerPortal = async (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch('/api/payments/customer-portal', {
    method: 'POST',
    headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` },
  });
  const result = await response.json().catch(() => ({})) as { url?: string; error?: string };
  if (!response.ok || !result.url) {
    throw new Error(result.error || 'Stripe-Kundenportal konnte nicht geöffnet werden.');
  }
  window.location.assign(result.url);
};

export const loadProContract = async (): Promise<{ sixMonthContract: boolean; contractVersion: string }> => {
  const response = await fetch('/api/payments/contract');
  if (!response.ok) throw new Error('Vertragsinformationen konnten nicht geladen werden.');
  return response.json();
};
export type ProSubscriptionStatus = { sixMonthContract: boolean; minimumTermEndsAt?: string; cancellationAt?: string };
export const loadProSubscription = async (): Promise<ProSubscriptionStatus> => {
  const user = auth.currentUser;
  if (!user) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch('/api/payments/subscription', { headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
  if (!response.ok) throw new Error('Abodaten konnten nicht geladen werden.');
  return response.json();
};
export const cancelProSubscription = async (): Promise<{ cancellationAt: string }> => {
  const user = auth.currentUser;
  if (!user) throw new Error('Eine Anmeldung ist erforderlich.');
  const response = await fetch('/api/payments/subscription/cancel', { method: 'POST', headers: { Authorization: `Bearer ${await user.getIdToken()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ confirm: true }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Die Kündigung konnte nicht bestätigt werden.');
  return result;
};

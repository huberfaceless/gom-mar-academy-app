import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const STRIPE_MANAGED_PAYMENTS_API_VERSION = '2026-02-25.preview';

const STRIPE_API_URL = 'https://api.stripe.com/v1';

type StripeApiError = {
  error?: { message?: string };
};

export type StripeCheckoutSession = {
  id: string;
  url: string | null;
  customer?: string | null;
  subscription?: string | null;
  client_reference_id?: string | null;
  mode?: string | null;
  payment_status?: string | null;
  status?: string | null;
  metadata?: Record<string, string> | null;
};

export type StripeWebhookEvent = {
  id: string;
  type: string;
  data: { object: StripeCheckoutSession };
};

const stripeRequest = async <T>(
  secretKey: string,
  endpoint: string,
  params: URLSearchParams,
  idempotencyKey?: string,
): Promise<T> => {
  const response = await fetch(`${STRIPE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': STRIPE_MANAGED_PAYMENTS_API_VERSION,
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: params,
    signal: AbortSignal.timeout(20_000),
  });
  const payload = await response.json() as T & StripeApiError;
  if (!response.ok) {
    throw new Error(payload.error?.message || `Stripe antwortete mit Status ${response.status}.`);
  }
  return payload;
};

export const createManagedSubscriptionProduct = async (secretKey: string) => {
  const params = new URLSearchParams({
    name: 'Basic subscription',
    tax_code: 'txcd_10103100',
    'default_price_data[currency]': 'usd',
    'default_price_data[recurring][interval]': 'month',
    'default_price_data[unit_amount]': '1000',
  });
  return stripeRequest<{ id: string; default_price: string }>(
    secretKey,
    '/products',
    params,
    'gom-mar-managed-payments-basic-product',
  );
};

export const createManagedSubscriptionCheckout = async (input: {
  secretKey: string;
  priceId: string;
  firebaseUid: string;
  customerEmail: string;
  customerId?: string;
  applicationUrl: string;
}): Promise<StripeCheckoutSession> => {
  const params = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': input.priceId,
    'line_items[0][quantity]': '1',
    'managed_payments[enabled]': 'true',
    success_url: `${input.applicationUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.applicationUrl}/?checkout=cancelled`,
    client_reference_id: input.firebaseUid,
    'metadata[firebase_uid]': input.firebaseUid,
    'metadata[academy_tier]': 'PRO',
    'subscription_data[metadata][firebase_uid]': input.firebaseUid,
    'subscription_data[metadata][academy_tier]': 'PRO',
  });
  if (input.customerId) params.set('customer', input.customerId);
  else params.set('customer_email', input.customerEmail);
  return stripeRequest<StripeCheckoutSession>(
    input.secretKey,
    '/checkout/sessions',
    params,
    `academy-pro-checkout-${input.firebaseUid}-${randomUUID()}`,
  );
};

const secureHexEqual = (left: string, right: string): boolean => {
  if (!/^[a-f\d]{64}$/iu.test(left) || !/^[a-f\d]{64}$/iu.test(right)) return false;
  return timingSafeEqual(Buffer.from(left, 'hex'), Buffer.from(right, 'hex'));
};

export const verifyStripeWebhook = (
  rawBody: Buffer,
  signatureHeader: string | undefined,
  webhookSecret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): StripeWebhookEvent => {
  if (!signatureHeader) throw new Error('Stripe-Signatur fehlt.');
  const parts = signatureHeader.split(',').map(part => part.trim().split('='));
  const timestamp = Number(parts.find(([key]) => key === 't')?.[1]);
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!Number.isFinite(timestamp) || Math.abs(nowSeconds - timestamp) > 300 || signatures.length === 0) {
    throw new Error('Stripe-Signatur ist ungültig oder abgelaufen.');
  }
  const expected = createHmac('sha256', webhookSecret)
    .update(`${timestamp}.${rawBody.toString('utf8')}`)
    .digest('hex');
  if (!signatures.some(signature => secureHexEqual(signature, expected))) {
    throw new Error('Stripe-Signatur ist ungültig.');
  }
  return JSON.parse(rawBody.toString('utf8')) as StripeWebhookEvent;
};

export const completedCheckoutMemberId = (event: StripeWebhookEvent): string | null => {
  if (event.type !== 'checkout.session.completed') return null;
  const session = event.data.object;
  if (session.mode !== 'subscription' || session.status !== 'complete') return null;
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') return null;
  if (session.metadata?.academy_tier !== 'PRO') return null;
  return session.metadata.firebase_uid || session.client_reference_id || null;
};

import { PRO_CONTRACT_VERSION, ordinaryCancellationAt, sixMonthCheckoutEnabled } from './proSubscriptionContract.js';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const STRIPE_MANAGED_PAYMENTS_API_VERSION = '2026-02-25.preview';

const STRIPE_API_URL = 'https://api.stripe.com/v1';

type StripeApiError = {
  error?: { message?: string; code?: string; param?: string; type?: string };
};

class StripeApiRequestError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly param?: string,
  ) {
    super(message);
    this.name = 'StripeApiRequestError';
  }
}

export const isMissingStripeCustomerError = (error: unknown): boolean =>
  error instanceof Error
  && (error as Error & { code?: unknown }).code === 'resource_missing'
  && (error as Error & { param?: unknown }).param === 'customer';

export type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  customer?: string | null;
  subscription?: string | null;
  client_reference_id?: string | null;
  mode?: string | null;
  payment_status?: string | null;
  status?: string | null;
  metadata?: Record<string, string> | null;
  customer_email?: string | null;
  start_date?: number;
  billing_cycle_anchor?: number;
  customer_details?: { email?: string | null } | null;
  cancel_at_period_end?: boolean;
  cancel_at?: number | null;
  current_period_end?: number | null;
  items?: {
    data?: Array<{ current_period_end?: number | null }>;
  };
};

export type StripeBillingPortalSession = {
  id: string;
  url: string;
};

export type StripeWebhookEvent = {
  livemode?: boolean;
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
    throw new StripeApiRequestError(
      payload.error?.message || `Stripe antwortete mit Status ${response.status}.`,
      payload.error?.code,
      payload.error?.param,
    );
  }
  return payload;
};

export const retrieveManagedSubscriptionCheckout = async (
  secretKey: string,
  sessionId: string,
): Promise<StripeCheckoutSession> => {
  const response = await fetch(`${STRIPE_API_URL}/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Stripe-Version': STRIPE_MANAGED_PAYMENTS_API_VERSION,
    },
    signal: AbortSignal.timeout(20_000),
  });
  const payload = await response.json() as StripeCheckoutSession & StripeApiError;
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
  sixMonthContract?: boolean;
}): Promise<StripeCheckoutSession> => {
  const params = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': input.priceId,
    'line_items[0][quantity]': '1',
    'managed_payments[enabled]': input.sixMonthContract ? 'false' : 'true',
    success_url: `${input.applicationUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.applicationUrl}/?checkout=cancelled`,
    client_reference_id: input.firebaseUid,
    'metadata[firebase_uid]': input.firebaseUid,
    'metadata[academy_tier]': 'PRO',
    'subscription_data[metadata][firebase_uid]': input.firebaseUid,
    'subscription_data[metadata][academy_tier]': 'PRO',
  });
  if (input.sixMonthContract) {
    params.set('metadata[contract_version]', PRO_CONTRACT_VERSION);
    params.set('metadata[contract_accepted_at]', new Date().toISOString());
    params.set('subscription_data[metadata][contract_version]', PRO_CONTRACT_VERSION);
    params.set('custom_text[submit][message]', '29,90 EUR monatlicher Gesamtpreis; Mindestlaufzeit 6 Monate (179,40 EUR). Kündigung schon jetzt zum Ende der Mindestlaufzeit möglich, danach zum Ende des bezahlten Monats. Gesetzlicher Widerruf bleibt unberührt. Vertragsinformationen: ' + input.applicationUrl + '/terms/');
    params.set('automatic_tax[enabled]', 'true');
  }
  if (input.customerId) params.set('customer', input.customerId);
  else params.set('customer_email', input.customerEmail);
  return stripeRequest<StripeCheckoutSession>(
    input.secretKey,
    '/checkout/sessions',
    params,
    `academy-pro-checkout-${input.firebaseUid}-${randomUUID()}`,
  );
};

export const createStripeBillingPortalSession = async (input: {
  secretKey: string;
  customerId: string;
  returnUrl: string;
  configurationId?: string;
}): Promise<StripeBillingPortalSession> => stripeRequest<StripeBillingPortalSession>(
  input.secretKey,
  '/billing_portal/sessions',
  new URLSearchParams({
    customer: input.customerId,
    return_url: input.returnUrl,
    ...(input.configurationId ? { configuration: input.configurationId } : {}),
  }),
);

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

export const completedCheckoutSessionMemberId = (session: StripeCheckoutSession): string | null => {
  if (session.mode !== 'subscription' || session.status !== 'complete') return null;
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') return null;
  if (session.metadata?.academy_tier !== 'PRO') return null;
  return session.metadata.firebase_uid || session.client_reference_id || null;
};

export const completedCheckoutMemberId = (event: StripeWebhookEvent): string | null => {
  if (event.type !== 'checkout.session.completed') return null;
  return completedCheckoutSessionMemberId(event.data.object);
};

export const deletedSubscriptionMemberId = (event: StripeWebhookEvent): string | null => {
  if (event.type !== 'customer.subscription.deleted') return null;
  return event.data.object.metadata?.firebase_uid || null;
};

export const updatedSubscriptionCancellation = (event: StripeWebhookEvent): {
  userId: string;
  cancellationAt: string | null;
} | null => {
  if (event.type !== 'customer.subscription.updated') return null;
  const subscription = event.data.object;
  const userId = subscription.metadata?.firebase_uid;
  if (!userId) return null;
  const itemPeriodEnd = subscription.items?.data?.find((item) => (
    typeof item.current_period_end === 'number' && Number.isFinite(item.current_period_end)
  ))?.current_period_end;
  const cancellationTimestamp = typeof subscription.cancel_at === 'number'
    && Number.isFinite(subscription.cancel_at)
    ? subscription.cancel_at
    : subscription.cancel_at_period_end === true
      && typeof subscription.current_period_end === 'number'
      && Number.isFinite(subscription.current_period_end)
      ? subscription.current_period_end
      : subscription.cancel_at_period_end === true
        && typeof itemPeriodEnd === 'number'
        && Number.isFinite(itemPeriodEnd)
        ? itemPeriodEnd
        : null;
  const cancellationAt = cancellationTimestamp === null
    ? null
    : new Date(cancellationTimestamp * 1000).toISOString();
  return { userId, cancellationAt };
};

export const checkoutSessionPayerEmail = (session: StripeCheckoutSession): string | null => {
  const email = session.customer_details?.email || session.customer_email;
  return typeof email === 'string' && email.trim() ? email.trim().toLowerCase() : null;
};

export const retrieveStripeSubscription = async (secretKey: string, id: string): Promise<StripeCheckoutSession> => {
  const response = await fetch(`${STRIPE_API_URL}/subscriptions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${secretKey}`, 'Stripe-Version': STRIPE_MANAGED_PAYMENTS_API_VERSION },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error('Das Stripe-Abo konnte nicht geladen werden.');
  return response.json();
};

export const scheduleSixMonthCancellation = async (secretKey: string, subscription: StripeCheckoutSession, uid: string): Promise<StripeCheckoutSession> => {
  if (subscription.metadata?.firebase_uid !== uid || subscription.metadata?.contract_version !== PRO_CONTRACT_VERSION) throw new Error('Dieses Abo gehört nicht zum Sechsmonatstarif.');
  if (subscription.status !== 'active' && subscription.status !== 'past_due') throw new Error('Dieses Abo kann nicht vorgemerkt werden.');
  const start = subscription.start_date;
  const end = subscription.current_period_end || subscription.items?.data?.[0]?.current_period_end;
  if (!start || !end) throw new Error('Vertragsdaten fehlen.');
  const cancellationAt = ordinaryCancellationAt(start, end);
  if (subscription.cancel_at && subscription.cancel_at <= cancellationAt) return subscription;
  return stripeRequest<StripeCheckoutSession>(secretKey, `/subscriptions/${encodeURIComponent(subscription.id)}`,
    new URLSearchParams({ cancel_at: String(cancellationAt), proration_behavior: 'none' }),
    `academy-cancel-${subscription.id}-${cancellationAt}`);
};

export const verifySixMonthConfiguration = async (secretKey: string, requireActivation = true): Promise<{ priceId: string; portalId: string }> => {
  if (requireActivation && !sixMonthCheckoutEnabled()) throw new Error('Der Sechsmonatstarif ist noch nicht aktiviert.');
  const priceId = process.env.STRIPE_PRO_SIX_MONTH_PRICE_ID?.trim();
  const portalId = process.env.STRIPE_PRO_SIX_MONTH_PORTAL_ID?.trim();
  if (!priceId || !portalId) throw new Error('Preis oder Kundenportal für den Sechsmonatstarif fehlt.');
  const get = async (path: string) => {
    const response = await fetch(`${STRIPE_API_URL}${path}`, { headers: { Authorization: `Bearer ${secretKey}`, 'Stripe-Version': STRIPE_MANAGED_PAYMENTS_API_VERSION }, signal: AbortSignal.timeout(20_000) });
    if (!response.ok) throw new Error('Die Stripe-Konfiguration konnte nicht geprüft werden.');
    return response.json();
  };
  const [price, portal, portals] = await Promise.all([get(`/prices/${encodeURIComponent(priceId)}?expand[]=product`), get(`/billing_portal/configurations/${encodeURIComponent(portalId)}`), get('/billing_portal/configurations?limit=100')]);
  if (!price.active || price.unit_amount !== 2990 || price.currency !== 'eur' || price.tax_behavior !== 'inclusive' || price.recurring?.interval !== 'month' || price.recurring?.interval_count !== 1 || !price.product?.tax_code) throw new Error('Der Preis muss 29,90 EUR inkl. MwSt. monatlich und einen Steuer-Code enthalten.');
  if (!portal.active || portal.features?.subscription_cancel?.enabled !== false || portal.features?.subscription_update?.enabled !== false || portal.login_page?.enabled) throw new Error('Das separate Kundenportal darf keine direkte Kündigung, Tarifänderung oder öffentliche Anmeldung anbieten.');
  if (portals.has_more || portals.data?.some((item: { active?: boolean; login_page?: { enabled?: boolean } }) => item.active && item.login_page?.enabled)) throw new Error('Öffentliche Portal-Anmeldelinks müssen für die Mindestlaufzeit deaktiviert sein.');
  return { priceId, portalId };
};

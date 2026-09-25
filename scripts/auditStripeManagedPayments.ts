import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  checkoutSessionPayerEmail,
  completedCheckoutMemberId,
  completedCheckoutSessionMemberId,
  deletedSubscriptionMemberId,
  STRIPE_MANAGED_PAYMENTS_API_VERSION,
  verifyStripeWebhook,
} from '../server/stripeManagedPayments.js';

assert.equal(STRIPE_MANAGED_PAYMENTS_API_VERSION, '2026-02-25.preview');

const payload = Buffer.from(JSON.stringify({
  id: 'evt_test',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test',
      mode: 'subscription',
      status: 'complete',
      payment_status: 'paid',
      customer: 'cus_test',
      subscription: 'sub_test',
      metadata: { firebase_uid: 'firebase-user', academy_tier: 'PRO' },
    },
  },
}));
const timestamp = 1_790_000_000;
const secret = 'whsec_test';
const signature = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
const event = verifyStripeWebhook(payload, `t=${timestamp},v1=${signature}`, secret, timestamp);
assert.equal(completedCheckoutMemberId(event), 'firebase-user');
assert.equal(completedCheckoutSessionMemberId(event.data.object), 'firebase-user');
assert.equal(checkoutSessionPayerEmail({
  ...event.data.object,
  customer_details: { email: 'Member@Example.com' },
}), 'member@example.com');
assert.equal(checkoutSessionPayerEmail(event.data.object), null);
assert.throws(() => verifyStripeWebhook(payload, `t=${timestamp},v1=${'0'.repeat(64)}`, secret, timestamp));
assert.throws(() => verifyStripeWebhook(payload, `t=${timestamp - 301},v1=${signature}`, secret, timestamp));
assert.equal(completedCheckoutMemberId({ ...event, type: 'invoice.paid' }), null);
assert.equal(deletedSubscriptionMemberId({
  id: 'evt_subscription_deleted',
  type: 'customer.subscription.deleted',
  data: {
    object: {
      id: 'sub_deleted',
      customer: 'cus_member',
      status: 'canceled',
      metadata: { firebase_uid: 'firebase-user' },
    },
  },
}), 'firebase-user');
assert.equal(deletedSubscriptionMemberId(event), null);
assert.equal(completedCheckoutMemberId({
  ...event,
  data: { object: { ...event.data.object, payment_status: 'unpaid' } },
}), null);

console.log('Stripe-Managed-Payments-Audit erfolgreich.');

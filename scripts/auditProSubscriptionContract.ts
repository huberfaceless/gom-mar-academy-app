import assert from 'node:assert/strict';
import { addCalendarMonths, ordinaryCancellationAt } from '../server/proSubscriptionContract.js';
const seconds = (date: string) => Date.parse(date) / 1000;
assert.equal(addCalendarMonths(seconds('2026-08-31T12:30:00Z'), 6), seconds('2027-02-28T12:30:00Z'));
assert.equal(addCalendarMonths(seconds('2023-08-31T12:30:00Z'), 6), seconds('2024-02-29T12:30:00Z'));
assert.equal(ordinaryCancellationAt(seconds('2026-10-07T12:00:00Z'), seconds('2026-11-07T12:00:00Z')), seconds('2027-04-07T12:00:00Z'));
assert.equal(ordinaryCancellationAt(seconds('2026-10-07T12:00:00Z'), seconds('2027-06-07T12:00:00Z')), seconds('2027-06-07T12:00:00Z'));
assert.throws(() => ordinaryCancellationAt(100, 90));
assert.throws(() => addCalendarMonths(NaN, 6));
console.log('Sechsmonatsvertrag: Monatsenden, Schaltjahr und Kündigungstermine bestanden.');

import { createManagedSubscriptionCheckout, scheduleSixMonthCancellation, verifySixMonthConfiguration } from '../server/stripeManagedPayments.js';
import { PRO_CONTRACT_VERSION } from '../server/proSubscriptionContract.js';
import { validateWithdrawal } from '../server/contractWithdrawal.js';
assert.throws(() => validateWithdrawal({ name: 'A', email: 'a@example.com', contract: 'PRO' }));
assert.deepEqual(validateWithdrawal({ name: ' A ', email: 'A@example.com', contract: 'PRO', confirm: true }), { name: 'A', email: 'a@example.com', contract: 'PRO' });
const originalFetch = globalThis.fetch;
const originalTaxMode = process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE;
delete process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE;
const requests: URLSearchParams[] = [];
globalThis.fetch = async (_url, options) => {
  requests.push(options?.body as URLSearchParams);
  return new Response(JSON.stringify({ id: 'sub_test', cancel_at: seconds('2027-04-07T12:00:00Z'), url: 'https://checkout.stripe.com/test' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
try {
  await createManagedSubscriptionCheckout({ secretKey: 'sk_test_mock', priceId: 'price_test', firebaseUid: 'user', customerEmail: 'user@example.com', applicationUrl: 'https://academy.example', sixMonthContract: true, residenceCountry: 'AT' });
  assert.equal(requests[0].get('managed_payments[enabled]'), 'false');
  assert.equal(requests[0].get('subscription_data[metadata][contract_version]'), PRO_CONTRACT_VERSION);
  assert.equal(requests[0].get('automatic_tax[enabled]'), 'true');
  await createManagedSubscriptionCheckout({ secretKey: 'sk_test_mock', priceId: 'price_test', firebaseUid: 'user', customerEmail: 'user@example.com', applicationUrl: 'https://academy.example' });
  assert.equal(requests[1].get('managed_payments[enabled]'), 'true');
  assert.equal(requests[1].get('subscription_data[metadata][contract_version]'), null);
  const subscription = { id: 'sub_test', status: 'active', start_date: seconds('2026-10-07T12:00:00Z'), current_period_end: seconds('2026-11-07T12:00:00Z'), metadata: { firebase_uid: 'user', contract_version: PRO_CONTRACT_VERSION } };
  await assert.rejects(scheduleSixMonthCancellation('sk_test_mock', subscription, 'other'));
  await assert.rejects(scheduleSixMonthCancellation('sk_test_mock', { ...subscription, metadata: { firebase_uid: 'user' } }, 'user'));
  await scheduleSixMonthCancellation('sk_test_mock', subscription, 'user');
  assert.equal(requests[2].get('cancel_at'), String(seconds('2027-04-07T12:00:00Z')));
  const count = requests.length;
  await scheduleSixMonthCancellation('sk_test_mock', { ...subscription, cancel_at: seconds('2027-04-07T12:00:00Z') }, 'user');
  assert.equal(requests.length, count, 'Wiederholte Kündigung darf den Termin nicht verschieben.');
  const flag = process.env.STRIPE_PRO_SIX_MONTH_ENABLED;
  delete process.env.STRIPE_PRO_SIX_MONTH_ENABLED;
  await assert.rejects(verifySixMonthConfiguration('sk_test_mock'));
  if (flag !== undefined) process.env.STRIPE_PRO_SIX_MONTH_ENABLED = flag;
  const baseCheckout = { secretKey: 'sk_test_mock', priceId: 'price_test', firebaseUid: 'user', customerEmail: 'user@example.com', applicationUrl: 'https://academy.example', sixMonthContract: true };
  const beforeInvalid = requests.length;
  for (const country of [undefined, '', 'US', 'GB', 'CH', 'at', ' AT', 'DE,PL']) {
    await assert.rejects(createManagedSubscriptionCheckout({ ...baseCheckout, residenceCountry: country }));
  }
  assert.equal(requests.length, beforeInvalid, 'Unzulässiges Land muss vor Stripe-Aufruf blockieren.');
  process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE = 'austrian-small-business';
  for (const residenceCountry of ['AT', 'DE', 'PL']) {
    await createManagedSubscriptionCheckout({ ...baseCheckout, residenceCountry });
    const params = requests.at(-1)!;
    assert.equal(params.get('automatic_tax[enabled]'), 'false');
    assert.equal(params.get('metadata[residence_country]'), residenceCountry);
    assert.equal(params.get('subscription_data[metadata][residence_country]'), residenceCountry);
    assert.equal(params.get('metadata[tax_mode]'), 'austrian-small-business');
    assert.equal(params.get('billing_address_collection'), 'required');
    assert.match(params.get('custom_text[submit][message]')!, /Umsatzsteuerfrei/);
    assert.equal(params.get('subscription_data[default_tax_rates][0]'), null);
  }
  process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE = 'unknown';
  const beforeInvalidMode = requests.length;
  await assert.rejects(createManagedSubscriptionCheckout({ ...baseCheckout, residenceCountry: 'AT' }));
  assert.equal(requests.length, beforeInvalidMode);
  await createManagedSubscriptionCheckout({ ...baseCheckout, sixMonthContract: false });
  assert.equal(requests.at(-1)!.get('managed_payments[enabled]'), 'true');
  assert.equal(requests.at(-1)!.get('automatic_tax[enabled]'), null, 'Bestandsangebot darf nicht durch Steuerumschaltung verändert werden.');
} finally {
  globalThis.fetch = originalFetch;
  if (originalTaxMode === undefined) delete process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE;
  else process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE = originalTaxMode;
}
console.log('Checkout-Modus, Bestandsschutz, Eigentümerprüfung, Widerrufseingaben und wiederholte Kündigung bestanden.');

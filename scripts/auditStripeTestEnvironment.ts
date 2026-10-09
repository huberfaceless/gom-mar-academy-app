import assert from 'node:assert/strict';
import { academyPublicUrl, validateStripeTestEnvironment } from '../server/deploymentEnvironment.js';

assert.equal(academyPublicUrl({}), 'https://academy.gomo-marketing.at');
validateStripeTestEnvironment({});
const env = {
  ACADEMY_ENVIRONMENT: 'stripe-test', VITE_FIREBASE_PROJECT_ID: 'academy-isolated-test',
  STRIPE_SECRET_KEY: 'sk_test_fixture', STRIPE_WEBHOOK_SECRET: 'whsec_fixture',
  ACADEMY_PUBLIC_URL: 'https://academy-test.example.com', K_SERVICE: 'gom-mar-academy-stripe-test',
};
validateStripeTestEnvironment(env, env.VITE_FIREBASE_PROJECT_ID);
for (const change of [
  { VITE_FIREBASE_PROJECT_ID: 'gom-mar-akademie' }, { STRIPE_SECRET_KEY: 'sk_live_fixture' },
  { ACADEMY_PUBLIC_URL: 'https://academy.gomo-marketing.at' }, { STRIPE_WEBHOOK_SECRET: '' },
  { K_SERVICE: 'gom-mar-academy' },
]) assert.throws(() => validateStripeTestEnvironment({ ...env, ...change }, env.VITE_FIREBASE_PROJECT_ID));
assert.throws(() => validateStripeTestEnvironment(env, 'gom-mar-akademie'));
assert.throws(() => academyPublicUrl({ ACADEMY_PUBLIC_URL: 'https://test.example/path' }));
console.log('Stripe-Testtrennung bestanden: Live-Schlüssel, Live-Dienst, Live-Rückleitung und falsches Firebase-Projekt werden blockiert.');

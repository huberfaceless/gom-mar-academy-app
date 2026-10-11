import assert from 'node:assert/strict';
import { GoogleAuth } from 'google-auth-library';
import { firestoreStripeDeliveryStore, processStripeDelivery, type DeliveryState, type DeliveryStore } from '../server/stripeWebhookDelivery.js';
import { sendProContractConfirmation } from '../server/proContractConfirmation.js';
import { PRO_CONTRACT_VERSION } from '../server/proSubscriptionContract.js';

const memoryStore = () => {
  let saved: { state: DeliveryState; version: string } | null = null;
  let revision = 0;
  const store: DeliveryStore = {
    async load() { return saved ? structuredClone(saved) : null; },
    async save(state, version) {
      if ((saved?.version || null) !== version) throw new Error('Precondition failed');
      saved = { state: structuredClone(state), version: String(++revision) };
      return saved.version;
    },
  };
  return store;
};

const originalFetch = globalThis.fetch;
const originalGetClient = GoogleAuth.prototype.getClient;
const envNames = ['SENDGRID_API_KEY', 'SENDGRID_FROM_EMAIL', 'NODE_ENV'] as const;
const previous = envNames.map((name) => process.env[name]);
let emails = 0;
let rejectMail = false;
process.env.SENDGRID_API_KEY = 'mock-not-a-real-key';
process.env.SENDGRID_FROM_EMAIL = 'test@example.com';
process.env.NODE_ENV = 'test';
try {
  globalThis.fetch = async (url) => {
    assert.equal(String(url), 'https://api.sendgrid.com/v3/mail/send');
    if (rejectMail) return new Response('', { status: 503 });
    emails++;
    return new Response(null, { status: 202 });
  };
  const session = { id: 'cs_test_mock', customer_email: 'test@example.com', metadata: { contract_version: PRO_CONTRACT_VERSION } };
  const store = memoryStore();
  let activations = 0;
  const action: Parameters<typeof processStripeDelivery>[1] = async (step) => {
    await step('activate-pro', async () => { activations++; });
    await step('contract-email', () => sendProContractConfirmation(session, 'https://academy.example'));
  };
  assert.equal(await processStripeDelivery(store, action), 'processed');
  assert.equal(await processStripeDelivery(store, action), 'duplicate');
  assert.equal(emails, 1, 'Dasselbe Ereignis darf nur eine E-Mail auslösen.');
  assert.equal(activations, 1);

  const retryStore = memoryStore();
  rejectMail = true;
  await assert.rejects(processStripeDelivery(retryStore, action), /SendGrid/);
  assert.equal((await retryStore.load())!.state.completed, false);
  rejectMail = false;
  await processStripeDelivery(retryStore, action);
  assert.equal(activations, 2, 'Wiederholung nach E-Mail-Fehler darf PRO nicht erneut aktivieren.');
  assert.equal(emails, 2);
  assert.equal(await processStripeDelivery(retryStore, action), 'duplicate');

  const uncertain = memoryStore();
  globalThis.fetch = async () => { throw new Error('Network timeout'); };
  await assert.rejects(processStripeDelivery(uncertain, action), /SendGrid-Antwort fehlt/);
  await assert.rejects(processStripeDelivery(uncertain, action), /Versandstatus unklar/);
  assert.equal((await uncertain.load())!.state.emailUncertain, true);
  globalThis.fetch = async () => { emails++; return new Response(null, { status: 202 }); };

  const interrupted = memoryStore();
  await interrupted.save({ completed: false, leaseUntil: 0, steps: ['activate-pro'], emailUncertain: true }, null);
  await assert.rejects(processStripeDelivery(interrupted, action), /Versandstatus unklar/);

  const parallel = memoryStore();
  let sideEffects = 0;
  const run = () => processStripeDelivery(parallel, async (step) => {
    await step('effect', async () => { sideEffects++; });
  });
  const results = await Promise.allSettled([run(), run()]);
  assert.equal(results.filter((result) => result.status === 'fulfilled').length, 1);
  assert.equal(sideEffects, 1, 'Parallele Cloud-Run-Aufrufe müssen atomar gesperrt werden.');

  const expired = memoryStore();
  await expired.save({ completed: false, leaseUntil: 500, steps: ['activate-pro'] }, null);
  await assert.rejects(processStripeDelivery(expired, action, () => 100), /bereits verarbeitet/);
  await processStripeDelivery(expired, action, () => 501);
  assert.equal(activations, 3, 'Abgelaufene Sperre muss abgeschlossene Schritte beibehalten.');

  // Exercise the real REST adapter, including both atomic preconditions.
  GoogleAuth.prototype.getClient = (async () => ({ getAccessToken: async () => ({ token: 'mock-token' }) })) as typeof originalGetClient;
  const requests: { url: string; method: string }[] = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url: String(url), method: options?.method || 'GET' });
    if (!options?.method) return new Response('', { status: 404 });
    return Response.json({ updateTime: '2026-10-11T17:00:00.123456Z' });
  };
  const rest = firestoreStripeDeliveryStore('isolated-mock-project', 'evt_mock');
  assert.equal(await rest.load(), null);
  const state = { completed: false, leaseUntil: 123, steps: [] };
  const version = await rest.save(state, null);
  await rest.save(state, version);
  assert.equal(new URL(requests[1].url).searchParams.get('currentDocument.exists'), 'false');
  assert.equal(new URL(requests[2].url).searchParams.get('currentDocument.updateTime'), version);
  globalThis.fetch = async () => new Response('', { status: 412 });
  await assert.rejects(rest.save(state, version));
  globalThis.fetch = async () => new Response('', { status: 503 });
  await assert.rejects(rest.load());
  console.log('Stripe-Webhooks: Wiederholung, E-Mail-Fehler, parallele Zustellung, Sperrablauf und Firestore-Vorbedingungen bestanden (ausschließlich Mocks).');
} finally {
  globalThis.fetch = originalFetch;
  GoogleAuth.prototype.getClient = originalGetClient;
  envNames.forEach((name, i) => {
    if (previous[i] === undefined) delete process.env[name];
    else process.env[name] = previous[i];
  });
}

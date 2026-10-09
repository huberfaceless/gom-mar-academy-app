import { readFileSync } from 'node:fs';

const LIVE_URL = 'https://academy.gomo-marketing.at';
const LIVE_FIREBASE = 'gom-mar-akademie';

export const academyPublicUrl = (env: NodeJS.ProcessEnv): string => {
  const value = env.ACADEMY_PUBLIC_URL?.trim() || LIVE_URL;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('ACADEMY_PUBLIC_URL muss eine HTTPS-Adresse ohne Pfad sein.');
  }
  return url.origin;
};

export const validateStripeTestEnvironment = (env: NodeJS.ProcessEnv, builtProject?: string): void => {
  if (env.ACADEMY_ENVIRONMENT !== 'stripe-test') return;
  const project = env.VITE_FIREBASE_PROJECT_ID?.trim();
  if (!project || project === LIVE_FIREBASE || builtProject !== project) {
    throw new Error('Stripe-Testserver benötigt dasselbe getrennte Firebase-Projekt in Frontend und Backend.');
  }
  if (!env.STRIPE_SECRET_KEY?.startsWith('sk_test_') || !env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_')) {
    throw new Error('Stripe-Testserver benötigt einen Testschlüssel und ein eigenes Webhook-Secret.');
  }
  if (academyPublicUrl(env) === LIVE_URL) throw new Error('Stripe-Testserver darf keine Live-Rückleitung verwenden.');
  if (env.K_SERVICE === 'gom-mar-academy') throw new Error('Stripe-Testserver darf nicht auf dem produktiven Dienst starten.');
};

export const validateDeploymentEnvironment = (): void => {
  if (process.env.ACADEMY_ENVIRONMENT !== 'stripe-test') return;
  const built = JSON.parse(readFileSync('dist/stripe-test-config.json', 'utf8')) as { projectId?: string };
  validateStripeTestEnvironment(process.env, built.projectId);
};

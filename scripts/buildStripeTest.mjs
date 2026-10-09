import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// Nur öffentliche Firebase-Webkonfiguration; keine Schlüssel für Stripe oder SendGrid.
const config = JSON.parse(readFileSync('stripe-test-firebase.json', 'utf8'));
const fields = {
  apiKey: 'VITE_FIREBASE_API_KEY', authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID', storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID', appId: 'VITE_FIREBASE_APP_ID',
};
if (config.projectId === 'gom-mar-akademie') throw new Error('Produktives Firebase-Projekt ist für Testbuilds gesperrt.');
const env = { ...process.env };
for (const [field, variable] of Object.entries(fields)) {
  if (typeof config[field] !== 'string' || !config[field].trim()) throw new Error(`Firebase-Konfiguration fehlt: ${field}`);
  env[variable] = config[field].trim();
}
env.VITE_FIREBASE_DATABASE_ID = '(default)';
const runner = process.argv.includes('--bun') ? 'bun' : 'npm';
execFileSync(runner, ['run', 'build'], { env, stdio: 'inherit' });
writeFileSync('dist/stripe-test-config.json', JSON.stringify({ projectId: env.VITE_FIREBASE_PROJECT_ID }));

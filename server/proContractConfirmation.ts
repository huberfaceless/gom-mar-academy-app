import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { StripeCheckoutSession } from './stripeManagedPayments.js';
import { PRO_CONTRACT_VERSION } from './proSubscriptionContract.js';
export const sendProContractConfirmation = async (session: StripeCheckoutSession, applicationUrl: string): Promise<void> => {
  if (session.metadata?.contract_version !== PRO_CONTRACT_VERSION) return;
  const email = session.customer_details?.email || session.customer_email;
  const key = process.env.SENDGRID_API_KEY?.trim();
  const from = process.env.SENDGRID_FROM_EMAIL?.trim();
  if (!email || !key || !from) throw new Error('Die Vertragsbestätigung kann derzeit nicht versandt werden.');
  const folder = process.env.NODE_ENV === 'production' ? 'dist/public' : 'public';
  const html = await readFile(path.join(process.cwd(), folder, 'terms/index.html'), 'utf8');
  const text = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/\n{3,}/g, '\n\n');
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ personalizations: [{ to: [{ email }] }], from: { email: from, name: 'GOM-MAR Academy' }, subject: 'Dein PRO-Vertrag: sechs Monate Mindestlaufzeit',
      content: [{ type: 'text/plain', value: `Vertragsreferenz: ${session.id}\nVertragsfassung: ${PRO_CONTRACT_VERSION}\nBestätigung vor dem Checkout: ${session.metadata?.contract_accepted_at || 'siehe Buchung'}\n\n${text}\n\nOnline-Widerruf: ${applicationUrl}/withdrawal/\nAboverwaltung: ${applicationUrl}/` }] }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error('Die Vertragsbestätigung konnte nicht an SendGrid übergeben werden.');
};

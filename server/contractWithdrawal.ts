import { GoogleAuth } from 'google-auth-library';
import { randomUUID } from 'node:crypto';
const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
export type WithdrawalInput = { name: string; email: string; contract: string };
export const validateWithdrawal = (body: unknown): WithdrawalInput => {
  const value = body as Record<string, unknown>;
  const name = typeof value?.name === 'string' ? value.name.trim() : '';
  const email = typeof value?.email === 'string' ? value.email.trim().toLowerCase() : '';
  const contract = typeof value?.contract === 'string' ? value.contract.trim() : '';
  if (!name || name.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !contract || contract.length > 500 || value.confirm !== true) throw new Error('Bitte Name, E-Mail und Vertragsangaben ausfüllen und den Widerruf bestätigen.');
  return { name, email, contract };
};
export const recordWithdrawal = async (projectId: string, input: WithdrawalInput): Promise<{ id: string; receivedAt: string; emailConfirmed: boolean }> => {
  const token = await (await auth.getClient()).getAccessToken();
  if (!token.token) throw new Error('Verwaltungszugriff fehlt.');
  const id = randomUUID();
  const receivedAt = new Date().toISOString();
  const db = process.env.FIREBASE_DATABASE_ID || '(default)';
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(db)}/documents/academyContractWithdrawals/${id}`;
  const save = async (fields: Record<string, unknown>, mask = '') => fetch(url + mask, {
    method: 'PATCH', headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }), signal: AbortSignal.timeout(20_000),
  });
  const response = await save({ name: { stringValue: input.name }, email: { stringValue: input.email }, contract: { stringValue: input.contract }, receivedAt: { timestampValue: receivedAt }, status: { stringValue: 'received' }, receiptStatus: { stringValue: 'pending' } });
  if (!response.ok) throw new Error('Der Widerruf konnte nicht gespeichert werden. Bitte sende ihn an huber@gomo-marketing.at.');
  const key = process.env.SENDGRID_API_KEY?.trim();
  const from = process.env.SENDGRID_FROM_EMAIL?.trim();
  const text = `Dein Widerruf ist bei GomMar eingegangen.\n\nName: ${input.name}\nVertrag: ${input.contract}\nEingang: ${receivedAt}\nReferenz: ${id}\n\nDiese Nachricht bestätigt den Eingang deiner Erklärung. Die Prüfung des Widerrufsrechts sowie eine gegebenenfalls erforderliche Abo-Beendigung und Rückzahlung erfolgen gesondert.\nStefan Gomolka (GomMar), Hammerskjoeldgasse 1, 2000 Stockerau, Österreich\nhuber@gomo-marketing.at`;
  let emailConfirmed = false;
  if (key && from) {
    try {
      const mail = await fetch('https://api.sendgrid.com/v3/mail/send', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ personalizations: [{ to: [{ email: input.email }], ...(input.email !== 'huber@gomo-marketing.at' ? { bcc: [{ email: 'huber@gomo-marketing.at' }] } : {}) }], from: { email: from, name: 'GOM-MAR Academy' }, subject: 'Eingangsbestätigung deines Widerrufs', content: [{ type: 'text/plain', value: text }] }), signal: AbortSignal.timeout(20_000) });
      emailConfirmed = mail.ok;
    } catch { /* The declaration stays recorded even if email is temporarily unavailable. */ }
  }
  await save({ receiptStatus: { stringValue: emailConfirmed ? 'accepted' : 'failed' } }, '?updateMask.fieldPaths=receiptStatus');
  return { id, receivedAt, emailConfirmed };
};

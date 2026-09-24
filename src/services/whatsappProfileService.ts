import { auth } from '../firebase/config';

export type WhatsAppProfile = {
  phoneNumber: string;
  consentGranted: boolean;
  updatedAt: string | null;
};

const whatsappProfileFetch = async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Eine Anmeldung ist erforderlich.');
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${await currentUser.getIdToken()}`);
  return fetch(input, { ...init, headers });
};

export const loadWhatsAppProfile = async (): Promise<WhatsAppProfile> => {
  const response = await whatsappProfileFetch('/api/member/whatsapp-profile');
  const result = await response.json().catch(() => ({})) as { profile?: WhatsAppProfile; error?: string };
  if (!response.ok || !result.profile) throw new Error(result.error || 'WhatsApp-Profil konnte nicht geladen werden.');
  return result.profile;
};

export const saveWhatsAppProfile = async (
  phoneNumber: string,
  consentGranted: boolean,
  displayName = '',
): Promise<WhatsAppProfile> => {
  const response = await whatsappProfileFetch('/api/member/whatsapp-profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, consentGranted, displayName }),
  });
  const result = await response.json().catch(() => ({})) as { profile?: WhatsAppProfile; error?: string };
  if (!response.ok || !result.profile) throw new Error(result.error || 'WhatsApp-Profil konnte nicht gespeichert werden.');
  return result.profile;
};

import type { LeadContact } from '../components/LeadDetailModal';
import { authenticatedFetch } from './authenticatedFetch';

export const loadCrmContacts = async (): Promise<LeadContact[]> => {
  const response = await authenticatedFetch('/api/crm/contacts');
  const result = await response.json().catch(() => ({})) as { contacts?: LeadContact[]; error?: string };
  if (!response.ok) throw new Error(result.error || 'CRM-Kontakte konnten nicht geladen werden.');
  return Array.isArray(result.contacts) ? result.contacts : [];
};

export const saveCrmContacts = async (contacts: LeadContact[]): Promise<LeadContact[]> => {
  const response = await authenticatedFetch('/api/crm/contacts', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contacts }),
  });
  const result = await response.json().catch(() => ({})) as { contacts?: LeadContact[]; error?: string };
  if (!response.ok) throw new Error(result.error || 'CRM-Kontakte konnten nicht gespeichert werden.');
  return Array.isArray(result.contacts) ? result.contacts : [];
};

import { GoogleAuth } from 'google-auth-library';
import { Lesson } from '../src/types.js';

export type CurriculumOverride = { lessonId: string; stageId: number; deleted: boolean; lesson?: Lesson };
type FirestoreDocument = { name?: string; fields?: Record<string, { stringValue?: string; integerValue?: string; booleanValue?: boolean }> };

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const collectionUrl = (projectId: string) => `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/academyCurriculumOverrides`;

const firestoreRequest = async (url: string, init: RequestInit = {}) => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Curriculum-Verwaltung fehlen.');
  const response = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json', ...init.headers } });
  if (!response.ok) {
    console.error('Firestore-Curriculum-Anfrage fehlgeschlagen', { status: response.status, details: (await response.text()).slice(0, 500) });
    throw new Error('Die zentrale Lektionenverwaltung ist derzeit nicht verfügbar.');
  }
  return response;
};

export const listCurriculumOverrides = async (projectId: string): Promise<CurriculumOverride[]> => {
  const result = await (await firestoreRequest(`${collectionUrl(projectId)}?pageSize=1000`)).json() as { documents?: FirestoreDocument[] };
  const overrides: CurriculumOverride[] = [];
  for (const document of result.documents || []) {
    const lessonId = document.fields?.lessonId?.stringValue;
    const stageId = Number(document.fields?.stageId?.integerValue);
    const deleted = document.fields?.deleted?.booleanValue === true;
    if (!lessonId || !Number.isInteger(stageId)) continue;
    if (deleted) {
      overrides.push({ lessonId, stageId, deleted: true });
      continue;
    }
    try {
      overrides.push({ lessonId, stageId, deleted: false, lesson: JSON.parse(document.fields?.lessonJson?.stringValue || '') as Lesson });
    } catch { /* Ignore malformed overrides and keep the built-in lesson. */ }
  }
  return overrides;
};

export const saveCurriculumOverride = async (projectId: string, override: CurriculumOverride): Promise<void> => {
  await firestoreRequest(`${collectionUrl(projectId)}/${encodeURIComponent(override.lessonId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields: {
      lessonId: { stringValue: override.lessonId },
      stageId: { integerValue: String(override.stageId) },
      deleted: { booleanValue: override.deleted },
      lessonJson: { stringValue: override.lesson ? JSON.stringify(override.lesson) : '' },
    } }),
  });
};

export const resetCurriculumOverrides = async (projectId: string): Promise<void> => {
  const result = await (await firestoreRequest(`${collectionUrl(projectId)}?pageSize=1000`)).json() as { documents?: FirestoreDocument[] };
  await Promise.all((result.documents || []).map(async (document) => {
    if (document.name) await firestoreRequest(`https://firestore.googleapis.com/v1/${document.name}`, { method: 'DELETE' });
  }));
};

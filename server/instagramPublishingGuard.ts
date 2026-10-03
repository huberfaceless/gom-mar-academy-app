import { createHash } from 'node:crypto';

type PublishedMedia = { id: string; url: string };
export class InstagramPublicationUncertainError extends Error {
  constructor() {
    super('Der Instagram-Veröffentlichungsstatus ist unklar. Bitte das Instagram-Profil prüfen. Automatische Wiederholung wurde zum Schutz vor Doppelposts gestoppt.');
    this.name = 'InstagramPublicationUncertainError';
  }
}

// Reserve before the external side effect. A saved reservation survives worker crashes.
export async function publishInstagramOnce(
  projectId: string, userId: string, jobId: string,
  prepare: () => Promise<string>, publish: (containerId: string) => Promise<PublishedMedia>,
  getAccessToken: () => Promise<string>,
): Promise<PublishedMedia> {
  const key = createHash('sha256').update(JSON.stringify([userId, jobId])).digest('hex');
  const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/academyInstagramPublishOperations/${key}`;
  const headers = async () => ({ Authorization: `Bearer ${await getAccessToken()}`, 'Content-Type': 'application/json' });
  const load = async (): Promise<PublishedMedia | null> => {
    const response = await fetch(url, { headers: await headers() });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Der Instagram-Doppelpostschutz konnte nicht geladen werden.');
    const document = await response.json() as { fields?: Record<string, { stringValue?: string }> };
    const fields = document.fields || {};
    if (fields.state?.stringValue === 'COMPLETED' && fields.mediaId?.stringValue) {
      return { id: fields.mediaId.stringValue, url: fields.mediaUrl?.stringValue || 'https://www.instagram.com/' };
    }
    throw new InstagramPublicationUncertainError();
  };
  const existing = await load();
  if (existing) return existing;
  const containerId = await prepare();
  const fields = {
    userId: { stringValue: userId }, jobId: { stringValue: jobId },
    containerId: { stringValue: containerId }, state: { stringValue: 'REQUESTED' },
    requestedAt: { timestampValue: new Date().toISOString() },
  };
  let reservation: Response;
  try {
    reservation = await fetch(`${url}?currentDocument.exists=false`, {
      method: 'PATCH', headers: await headers(), body: JSON.stringify({ fields }),
    });
  } catch {
    throw new InstagramPublicationUncertainError();
  }
  if (reservation.status === 409 || reservation.status === 412) {
    const concurrentResult = await load();
    if (concurrentResult) return concurrentResult;
    throw new InstagramPublicationUncertainError();
  }
  if (!reservation.ok) throw new Error('Der Instagram-Doppelpostschutz konnte nicht gespeichert werden.');
  let result: PublishedMedia;
  try {
    result = await publish(containerId);
    if (!result.id) throw new Error('Fehlende Veröffentlichungsbestätigung');
  } catch {
    throw new InstagramPublicationUncertainError();
  }
  try {
    const saved = await fetch(url, {
      method: 'PATCH', headers: await headers(),
      body: JSON.stringify({ fields: { ...fields, state: { stringValue: 'COMPLETED' }, mediaId: { stringValue: result.id }, mediaUrl: { stringValue: result.url } } }),
    });
    if (!saved.ok) throw new Error('Speicherung fehlgeschlagen');
  } catch {
    // The REQUESTED reservation still blocks a duplicate if saving the queue result also fails.
    console.warn('Instagram-Erfolg bestätigt; Schutzprotokoll konnte nicht abgeschlossen werden.');
  }
  return result;
}

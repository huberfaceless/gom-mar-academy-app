import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/devstorage.read_write'] });
const STORAGE_API_URL = 'https://storage.googleapis.com';

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für den Lektionsaudio-Cache fehlen.');
  return token.token;
};

export const lessonAudioObjectName = (
  lessonId: string,
  language: string,
  voiceId: string,
  modelId: string,
  narrationText: string,
): string => {
  const contentHash = createHash('sha256')
    .update([language, voiceId, modelId, narrationText].join('\n'))
    .digest('hex')
    .slice(0, 20);
  return `lesson-audio/v1/${language}/${lessonId}-${contentHash}.mp3`;
};

export const loadLessonAudioFromCache = async (
  bucket: string,
  objectName: string,
): Promise<Buffer | null> => {
  const response = await fetch(
    `${STORAGE_API_URL}/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}?alt=media`,
    { headers: { Authorization: `Bearer ${await getAccessToken()}` } },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Lektionsaudio-Cache antwortete beim Lesen mit Status ${response.status}.`);
  return Buffer.from(await response.arrayBuffer());
};

export const saveLessonAudioToCache = async (
  bucket: string,
  objectName: string,
  audio: Buffer,
): Promise<void> => {
  const response = await fetch(
    `${STORAGE_API_URL}/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(objectName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'audio/mpeg',
      },
      body: audio,
    },
  );
  if (!response.ok && response.status !== 409) {
    throw new Error(`Lektionsaudio-Cache antwortete beim Speichern mit Status ${response.status}.`);
  }
};

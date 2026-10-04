import { createHash } from 'node:crypto';
import type { Lesson } from '../src/types';

export const LESSON_AUDIO_ADMIN_BATCH_SIZE = 2;

export const selectAudioLessons = (lessons: Lesson[], requested: unknown): Lesson[] => {
  if (!Array.isArray(requested) || requested.length < 1 || requested.length > LESSON_AUDIO_ADMIN_BATCH_SIZE
    || requested.some(id => typeof id !== 'string') || new Set(requested).size !== requested.length) {
    throw new Error('Bitte genau eine oder höchstens zwei verschiedene Lektionen auswählen.');
  }
  return requested.map(id => {
    const lesson = lessons.find(candidate => candidate.id === id);
    if (!lesson) throw new Error('Eine ausgewählte Lektion unterstützt noch keine Audio-Vorbereitung.');
    return lesson;
  });
};

export const audioSelectionFingerprint = (objectNames: string[]): string =>
  createHash('sha256').update(JSON.stringify(objectNames)).digest('hex');

export const generateSelectedAudio = async <T extends { characters: number }>(
  items: T[],
  maxCharacters: unknown,
  isCached: (item: T) => Promise<boolean>,
  generate: (item: T) => Promise<void>,
): Promise<{ generated: number; cached: number; characters: number }> => {
  if (!Number.isSafeInteger(maxCharacters) || (maxCharacters as number) < 0) {
    throw new Error('Die bestätigte Zeichengrenze fehlt. Bitte die Auswahl erneut prüfen.');
  }
  const missing: T[] = [];
  for (const item of items) {
    if (!await isCached(item)) missing.push(item);
  }
  const characters = missing.reduce((sum, item) => sum + item.characters, 0);
  if (characters > (maxCharacters as number)) {
    throw new Error('Die Auswahl überschreitet die bestätigte Zeichengrenze. Bitte erneut prüfen.');
  }
  for (const item of missing) await generate(item);
  return { generated: missing.length, cached: items.length - missing.length, characters };
};

import { ProjectSettings, CentralContentProject } from '../types/contentEngine';

const STORAGE_KEY_PROJECT_SETTINGS = 'gommar_content_projects_settings_v1';
const STORAGE_KEY_CONTENT_PROJECTS = 'gommar_content_projects_list_v1';

export const DEFAULT_VITAL50_PROJECT: ProjectSettings = {
  id: 'proj_vital50',
  name: 'Vital50',
  websiteUrl: 'https://vital50.gomo-marketing.at/',
  targetAudience: 'Menschen 50+ (Fokus auf nachhaltige Gesundheit, Wohlbefinden & Vitalität)',
  coreTopics: ['Gesundheit', 'Ernährung 50+', 'Abnehmen im Alter', 'Gelenke & Beweglichkeit', 'Energie & Vitalität'],
  language: 'de',
  defaultCta: 'Lade dir jetzt die kostenlose Vital50-Formel & Checkliste herunter!',
  defaultTargetUrl: 'https://vital50.gomo-marketing.at/',
  brandVoice: 'Einfühlsam, wissenschaftlich fundiert, motivierend, respektvoll und auf Augenhöhe',
  pinterestBoardDefault: 'Gesundheit & Vitalität 50+',
  youtubeChannelName: 'Vital50 - Gesund & Fit ab 50',
  createdAt: new Date().toISOString(),
};

const memoryStore: Record<string, string> = {};

const scopedKey = (baseKey: string, userId?: string): string =>
  userId ? `${baseKey}:${userId}` : `${baseKey}:anonymous`;

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return window.localStorage.getItem(key);
    }
  } catch {}
  return memoryStore[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch {}
  memoryStore[key] = value;
}

export function loadAllProjectSettings(userId?: string): ProjectSettings[] {
  try {
    const raw = safeGetItem(scopedKey(STORAGE_KEY_PROJECT_SETTINGS, userId));
    if (!raw) {
      saveAllProjectSettings([DEFAULT_VITAL50_PROJECT], userId);
      return [DEFAULT_VITAL50_PROJECT];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveAllProjectSettings([DEFAULT_VITAL50_PROJECT], userId);
      return [DEFAULT_VITAL50_PROJECT];
    }
    return parsed;
  } catch (e) {
    console.error('Error loading project settings', e);
    return [DEFAULT_VITAL50_PROJECT];
  }
}

export function saveAllProjectSettings(projects: ProjectSettings[], userId?: string): void {
  try {
    safeSetItem(scopedKey(STORAGE_KEY_PROJECT_SETTINGS, userId), JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving project settings', e);
  }
}

export function loadAllContentProjects(userId?: string): CentralContentProject[] {
  try {
    const raw = safeGetItem(scopedKey(STORAGE_KEY_CONTENT_PROJECTS, userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading content projects', e);
    return [];
  }
}

export function saveAllContentProjects(projects: CentralContentProject[], userId?: string): void {
  try {
    safeSetItem(scopedKey(STORAGE_KEY_CONTENT_PROJECTS, userId), JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving content projects', e);
  }
}

export function saveOrUpdateContentProject(project: CentralContentProject, userId?: string): void {
  const current = loadAllContentProjects(userId);
  const index = current.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    current[index] = project;
  } else {
    current.unshift(project);
  }
  saveAllContentProjects(current, userId);
}

export function deleteContentProject(id: string, userId?: string): void {
  const current = loadAllContentProjects(userId).filter((p) => p.id !== id);
  saveAllContentProjects(current, userId);
}

const STORAGE_KEY_PUBLISHING_JOBS = 'gommar_publishing_jobs_list_v1';
const STORAGE_KEY_SCHEDULER_JOBS = 'gommar_scheduler_jobs_list_v1';

export function loadAllPublishingJobs(userId?: string): import('../types/contentEngine').PublishingJob[] {
  try {
    const raw = safeGetItem(scopedKey(STORAGE_KEY_PUBLISHING_JOBS, userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading publishing jobs', e);
    return [];
  }
}

export function saveAllPublishingJobs(jobs: import('../types/contentEngine').PublishingJob[], userId?: string): void {
  try {
    safeSetItem(scopedKey(STORAGE_KEY_PUBLISHING_JOBS, userId), JSON.stringify(jobs));
  } catch (e) {
    console.error('Error saving publishing jobs', e);
  }
}

export function loadAllSchedulerJobs(userId?: string): import('../types/contentEngine').SchedulerJob[] {
  try {
    const raw = safeGetItem(scopedKey(STORAGE_KEY_SCHEDULER_JOBS, userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading scheduler jobs', e);
    return [];
  }
}

export function saveAllSchedulerJobs(jobs: import('../types/contentEngine').SchedulerJob[], userId?: string): void {
  try {
    safeSetItem(scopedKey(STORAGE_KEY_SCHEDULER_JOBS, userId), JSON.stringify(jobs));
  } catch (e) {
    console.error('Error saving scheduler jobs', e);
  }
}

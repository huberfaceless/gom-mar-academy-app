import { GoogleAuth } from 'google-auth-library';
import { PublishingJob } from '../src/types/contentEngine.js';

type FirestoreValue = {
  nullValue?: null;
  booleanValue?: boolean;
  integerValue?: string;
  doubleValue?: number;
  stringValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
  updateTime?: string;
};

const googleAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const FIRESTORE_DATABASE_ID = process.env.FIREBASE_DATABASE_ID || '(default)';
const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'gom-mar-akademie';

const documentsUrl = () =>
  `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(FIREBASE_PROJECT_ID)}/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents`;

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Google-Anmeldedaten für die Publishing Queue fehlen.');
  return token.token;
};

const firestoreRequest = async (url: string, init: RequestInit = {}): Promise<Response> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  if (!response.ok) {
    const details = (await response.text()).slice(0, 500);
    console.error('Firestore-Publishing-Queue-Anfrage fehlgeschlagen.', { status: response.status, details });
    const error = new Error(`Publishing Queue ist derzeit nicht verfügbar (HTTP ${response.status}).`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }
  return response;
};

const decodeValue = (value: FirestoreValue): unknown => {
  if ('nullValue' in value) return null;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('stringValue' in value) return value.stringValue;
  if ('arrayValue' in value) return (value.arrayValue?.values || []).map(decodeValue);
  if ('mapValue' in value) return decodeFields(value.mapValue?.fields || {});
  return undefined;
};

const decodeFields = (fields: Record<string, FirestoreValue>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));

const encodeValue = (value: unknown): FirestoreValue => {
  if (value === null) return { nullValue: null };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (typeof value === 'string') return { stringValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (value && typeof value === 'object') {
    return { mapValue: { fields: encodeFields(value as Record<string, unknown>) } };
  }
  return { nullValue: null };
};

const encodeFields = (record: Record<string, unknown>): Record<string, FirestoreValue> =>
  Object.fromEntries(
    Object.entries(record)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, encodeValue(value)]),
  );

const documentId = (document: FirestoreDocument): string => document.name?.split('/').pop() || '';

const parseJob = (document: FirestoreDocument): PublishingJob | null => {
  const id = documentId(document);
  if (!id || !document.fields) return null;
  const decoded = decodeFields(document.fields) as unknown as PublishingJob;
  if (!decoded.userId || !decoded.status) return null;
  return { ...decoded, id };
};

export const listServerPublishingJobs = async (): Promise<PublishingJob[]> => {
  const jobs: PublishingJob[] = [];
  let pageToken = '';
  do {
    const url = new URL(`${documentsUrl()}/publishingJobs`);
    url.searchParams.set('pageSize', '1000');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const payload = await (await firestoreRequest(url.toString())).json() as {
      documents?: FirestoreDocument[];
      nextPageToken?: string;
    };
    for (const document of payload.documents || []) {
      const job = parseJob(document);
      if (job) jobs.push(job);
    }
    pageToken = payload.nextPageToken || '';
  } while (pageToken);
  return jobs;
};

const loadServerPublishingJob = async (jobId: string): Promise<{ job: PublishingJob; updateTime: string } | null> => {
  const response = await fetch(`${documentsUrl()}/publishingJobs/${encodeURIComponent(jobId)}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Publishing Job konnte nicht geladen werden (HTTP ${response.status}).`);
  const document = await response.json() as FirestoreDocument;
  const job = parseJob(document);
  return job && document.updateTime ? { job, updateTime: document.updateTime } : null;
};

const replaceServerPublishingJob = async (
  job: PublishingJob,
  expectedUpdateTime?: string,
): Promise<string> => {
  const url = new URL(`${documentsUrl()}/publishingJobs/${encodeURIComponent(job.id)}`);
  if (expectedUpdateTime) url.searchParams.set('currentDocument.updateTime', expectedUpdateTime);
  const response = await firestoreRequest(url.toString(), {
    method: 'PATCH',
    body: JSON.stringify({ fields: encodeFields(job as unknown as Record<string, unknown>) }),
  });
  const document = await response.json() as FirestoreDocument;
  if (!document.updateTime) throw new Error('Firestore hat keine Aktualisierungszeit zurückgegeben.');
  return document.updateTime;
};

export const claimServerPublishingJob = async (
  jobId: string,
  workerId: string,
): Promise<{ success: boolean; reason?: string; job?: PublishingJob; updateTime?: string }> => {
  const loaded = await loadServerPublishingJob(jobId);
  if (!loaded) return { success: false, reason: 'not_found' };
  const { job, updateTime } = loaded;
  if (job.status === 'PUBLISHED' || job.publishedAt || job.externalId) {
    return { success: false, reason: 'already_published', job };
  }
  if (job.status === 'PUBLISHING' && new Date(job.lockExpiresAt || 0).getTime() > Date.now()) {
    return { success: false, reason: 'locked_by_other' };
  }
  if (job.status !== 'SCHEDULED' && job.status !== 'PUBLISHING') {
    return { success: false, reason: `invalid_status_${job.status}` };
  }
  const attempts = (job.attempts || 0) + 1;
  if (attempts > (job.maxAttempts || 3)) {
    const failedJob = { ...job, status: 'FAILED' as const, updatedAt: new Date().toISOString() };
    await replaceServerPublishingJob(failedJob, updateTime);
    return { success: false, reason: 'max_attempts_exceeded', job: failedJob };
  }
  const now = new Date().toISOString();
  const claimedJob: PublishingJob = {
    ...job,
    status: 'PUBLISHING',
    attempts,
    lockedAt: now,
    lockedBy: workerId,
    lockExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    updatedAt: now,
  };
  try {
    const claimedUpdateTime = await replaceServerPublishingJob(claimedJob, updateTime);
    return { success: true, job: claimedJob, updateTime: claimedUpdateTime };
  } catch (error) {
    if ([409, 412].includes((error as Error & { status?: number }).status || 0)) {
      return { success: false, reason: 'locked_by_other' };
    }
    throw error;
  }
};

export const saveServerPublishingJob = async (job: PublishingJob, expectedUpdateTime?: string): Promise<void> => {
  await replaceServerPublishingJob(job, expectedUpdateTime);
};

const listCollectionDocuments = async (collectionName: string): Promise<FirestoreDocument[]> => {
  const documents: FirestoreDocument[] = [];
  let pageToken = '';
  do {
    const url = new URL(`${documentsUrl()}/${collectionName}`);
    url.searchParams.set('pageSize', '1000');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const payload = await (await firestoreRequest(url.toString())).json() as {
      documents?: FirestoreDocument[];
      nextPageToken?: string;
    };
    documents.push(...(payload.documents || []));
    pageToken = payload.nextPageToken || '';
  } while (pageToken);
  return documents;
};

const replaceCollectionDocument = async (
  collectionName: string,
  id: string,
  record: Record<string, unknown>,
): Promise<void> => {
  await firestoreRequest(`${documentsUrl()}/${collectionName}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields: encodeFields(record) }),
  });
};

export const syncServerPublishingOutcome = async (job: PublishingJob): Promise<void> => {
  const contentStatus = job.status === 'PUBLISHED' ? 'published' : job.status === 'FAILED' ? 'failed' : 'scheduled';
  const schedulerStatus = job.status === 'PUBLISHED' ? 'COMPLETED' : job.status === 'FAILED' ? 'FAILED' : 'PENDING';

  const schedulerDocuments = await listCollectionDocuments('schedulerJobs');
  const matchingScheduler = schedulerDocuments.find(document => {
    if (!document.fields) return false;
    const scheduler = decodeFields(document.fields);
    return scheduler.publishingJobId === job.id && scheduler.userId === job.userId;
  });
  if (matchingScheduler?.fields) {
    const schedulerId = documentId(matchingScheduler);
    const scheduler = decodeFields(matchingScheduler.fields);
    await replaceCollectionDocument('schedulerJobs', schedulerId, {
      ...scheduler,
      status: schedulerStatus,
      lastError: job.lastError,
      updatedAt: new Date().toISOString(),
    });
  }

  const projectResponse = await fetch(
    `${documentsUrl()}/contentProjects/${encodeURIComponent(job.contentProjectId)}`,
    { headers: { Authorization: `Bearer ${await getAccessToken()}` } },
  );
  if (projectResponse.status === 404) return;
  if (!projectResponse.ok) throw new Error(`Content-Projekt konnte nicht synchronisiert werden (HTTP ${projectResponse.status}).`);
  const projectDocument = await projectResponse.json() as FirestoreDocument;
  if (!projectDocument.fields) return;
  const project = decodeFields(projectDocument.fields) as Record<string, any>;
  if (project.userId !== job.userId) throw new Error('Publishing Job und Content-Projekt gehören nicht demselben Nutzer.');

  if (job.contentId === 'blog_main' && project.blogArticle) {
    project.blogArticle.status = contentStatus;
    if (job.publishedUrl) project.blogArticle.publishedUrl = job.publishedUrl;
  }
  if (job.contentId === 'yt_video_main' && project.youtubeVideo) {
    project.youtubeVideo.status = contentStatus;
    if (job.publishedUrl) project.youtubeVideo.videoUrl = job.publishedUrl;
  }
  if (Array.isArray(project.pinterestPins)) {
    project.pinterestPins = project.pinterestPins.map((pin: Record<string, any>) => pin.id === job.contentId
      ? { ...pin, status: contentStatus, publishedPinId: job.externalId || pin.publishedPinId, publishedUrl: job.publishedUrl || pin.publishedUrl }
      : pin);
  }
  if (Array.isArray(project.youtubeShorts)) {
    project.youtubeShorts = project.youtubeShorts.map((short: Record<string, any>) => short.id === job.contentId
      ? { ...short, status: contentStatus }
      : short);
  }
  if (Array.isArray(project.calendarItems)) {
    project.calendarItems = project.calendarItems.map((item: Record<string, any>) => item.id === job.contentId
      ? { ...item, status: contentStatus, publishingJobId: job.id }
      : item);
  }
  project.updatedAt = new Date().toISOString();
  await replaceCollectionDocument('contentProjects', job.contentProjectId, project);
};

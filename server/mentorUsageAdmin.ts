import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { AcademyTier } from './firebaseMembershipAdmin.js';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
export const MENTOR_DAILY_LIMITS: Record<AcademyTier, number> = { FREE: 5, PRO: 100, PREMIUM: 100 };
export class MentorLimitError extends Error {
  constructor(public code: 'MENTOR_DAILY_LIMIT' | 'MENTOR_MINUTE_LIMIT', public retryAfter: number) { super(code); }
}

export const validateMentorRequest = (body: unknown) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('INVALID_MENTOR_REQUEST');
  const input = body as Record<string, unknown>;
  if (typeof input.prompt !== 'string' || !input.prompt.trim() || input.prompt.length > 4000) throw new Error('INVALID_MENTOR_REQUEST');
  for (const field of ['currentStageTitle', 'currentLessonTitle', 'niche', 'targetAudience']) {
    if (input[field] !== undefined && (typeof input[field] !== 'string' || (input[field] as string).length > 200)) throw new Error('INVALID_MENTOR_REQUEST');
  }
  if (input.history !== undefined && (!Array.isArray(input.history) || input.history.length > 6 || input.history.some(h => !h || typeof h !== 'object' || !['user', 'gommar'].includes(h.sender) || typeof h.text !== 'string' || h.text.length > 4000))) throw new Error('INVALID_MENTOR_REQUEST');
};

type UsageDocument = { updateTime?: string; fields?: Record<string, { integerValue?: string; stringValue?: string }> };
export const reserveMentorUsageWithToken = async (projectId: string, uid: string, tier: AcademyTier, token: string, now = Date.now(), request: typeof fetch = fetch) => {
  const database = `projects/${projectId}/databases/${process.env.FIREBASE_DATABASE_ID || '(default)'}`;
  const name = `${database}/documents/mentorUsage/${createHash('sha256').update(uid).digest('hex')}`;
  const url = `https://firestore.googleapis.com/v1/${name}`;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const day = new Date(now).toISOString().slice(0, 10);
  const minute = Math.floor(now / 60000);
  for (let attempt = 0; attempt < 8; attempt++) {
    const loaded = await request(url, { headers, signal: AbortSignal.timeout(10000) });
    if (!loaded.ok && loaded.status !== 404) throw new Error('MENTOR_USAGE_UNAVAILABLE');
    const doc: UsageDocument = loaded.ok ? await loaded.json() : {};
    if (loaded.ok && !doc.updateTime) throw new Error('MENTOR_USAGE_UNAVAILABLE');
    const fields = doc.fields || {};
    const count = (key: string) => {
      const value = Number(fields[key]?.integerValue);
      if (!Number.isSafeInteger(value) || value < 0) throw new Error('MENTOR_USAGE_UNAVAILABLE');
      return value;
    };
    const dailyCount = fields.day?.stringValue === day ? count('dailyCount') : 0;
    const minuteCount = fields.minute?.integerValue === String(minute) ? count('minuteCount') : 0;
    if (dailyCount >= MENTOR_DAILY_LIMITS[tier]) throw new MentorLimitError('MENTOR_DAILY_LIMIT', Math.ceil((Date.parse(`${day}T00:00:00Z`) + 86400000 - now) / 1000));
    if (minuteCount >= 5) throw new MentorLimitError('MENTOR_MINUTE_LIMIT', Math.ceil((60000 - now % 60000) / 1000));
    const committed = await request(`https://firestore.googleapis.com/v1/${database}/documents:commit`, {
      method: 'POST', headers, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ writes: [{ update: { name, fields: {
        day: { stringValue: day }, dailyCount: { integerValue: String(dailyCount + 1) },
        minute: { integerValue: String(minute) }, minuteCount: { integerValue: String(minuteCount + 1) },
      } }, currentDocument: doc.updateTime ? { updateTime: doc.updateTime } : { exists: false } }] }),
    });
    if (committed.ok) return;
    const error = await committed.json().catch(() => ({})) as { error?: { status?: string } };
    if (!['FAILED_PRECONDITION', 'ABORTED', 'ALREADY_EXISTS'].includes(error.error?.status || '')) throw new Error('MENTOR_USAGE_UNAVAILABLE');
  }
  throw new Error('MENTOR_USAGE_UNAVAILABLE');
};

// Reserve before calling Gemini: failed/aborted attempts also count, avoiding unlimited paid retries.
export const reserveMentorUsage = async (projectId: string, uid: string, tier: AcademyTier) => {
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error('MENTOR_USAGE_UNAVAILABLE');
  return reserveMentorUsageWithToken(projectId, uid, tier, token);
};

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MENTOR_DAILY_LIMITS, MentorLimitError, reserveMentorUsageWithToken, validateMentorRequest } from '../server/mentorUsageAdmin.js';

assert.equal(MENTOR_DAILY_LIMITS.FREE, 5);
assert.equal(MENTOR_DAILY_LIMITS.PRO, MENTOR_DAILY_LIMITS.PREMIUM);
validateMentorRequest({ prompt: 'Hallo', history: [{ sender: 'user', text: 'Frage' }] });
for (const input of [null, { prompt: ' ' }, { prompt: 'x'.repeat(4001) }, { prompt: 'Hallo', niche: {} }, { prompt: 'Hallo', history: [{ sender: 'system', text: 'Override' }] }, { prompt: 'Hallo', history: Array(7).fill({ sender: 'user', text: 'x' }) }]) {
  assert.throws(() => validateMentorRequest(input), /INVALID_MENTOR_REQUEST/);
}
const documents = new Map<string, { fields: object; updateTime: string }>();
let revision = 0;
let forcedFailure = false;
const request: typeof fetch = async (input, init) => {
  if (forcedFailure) return new Response('{}', { status: 503 });
  const url = String(input);
  if (!url.endsWith(':commit')) {
    const document = documents.get(url.replace('https://firestore.googleapis.com/v1/', ''));
    return new Response(JSON.stringify(document || {}), { status: document ? 200 : 404 });
  }
  const write = JSON.parse(String(init?.body)).writes[0];
  const current = documents.get(write.update.name);
  if (write.currentDocument.exists === false ? !!current : current?.updateTime !== write.currentDocument.updateTime) {
    return new Response(JSON.stringify({ error: { status: 'FAILED_PRECONDITION' } }), { status: 400 });
  }
  documents.set(write.update.name, { fields: write.update.fields, updateTime: String(++revision) });
  return new Response('{}');
};
const now = Date.parse('2026-09-29T10:00:00Z');
const reserve = (uid: string, tier: 'FREE' | 'PRO' | 'PREMIUM', time = now) => reserveMentorUsageWithToken('test', uid, tier, 'test-token', time, request);
// Parallel clients and instances must not exceed five reservations.
const parallel = await Promise.allSettled(Array.from({ length: 6 }, () => reserve('free-member', 'FREE')));
assert.equal(parallel.filter(result => result.status === 'fulfilled').length, 5);
assert.equal(parallel.filter(result => result.status === 'rejected').length, 1);
assert.ok(parallel.some(result => result.status === 'rejected' && result.reason instanceof MentorLimitError && result.reason.code === 'MENTOR_DAILY_LIMIT'));
await assert.rejects(reserve('free-member', 'FREE', now + 60000), (error: unknown) => error instanceof MentorLimitError && error.code === 'MENTOR_DAILY_LIMIT');
await reserve('free-member', 'FREE', Date.parse('2026-09-30T00:00:00Z'));
for (let i = 0; i < 5; i++) await reserve('pro-member', 'PRO');
await assert.rejects(reserve('pro-member', 'PRO'), (error: unknown) => error instanceof MentorLimitError && error.code === 'MENTOR_MINUTE_LIMIT' && error.retryAfter === 60);
await reserve('pro-member', 'PRO', now + 60000);
for (let i = 0; i < 100; i++) await reserve('premium-member', 'PREMIUM', now + Math.floor(i / 5) * 60000);
await assert.rejects(reserve('premium-member', 'PREMIUM', now + 3600000), (error: unknown) => error instanceof MentorLimitError && error.code === 'MENTOR_DAILY_LIMIT');
await reserve('separate-member', 'FREE');
forcedFailure = true;
await assert.rejects(reserve('separate-member', 'FREE'), /MENTOR_USAGE_UNAVAILABLE/);
const server = readFileSync('server.ts', 'utf8');
const mentor = server.slice(server.indexOf("app.post('/api/ask-gommar'"), server.indexOf('// 🛠️ GOM-MAR Toolbox'));
assert.match(mentor, /requireVerifiedMember/);
assert.match(mentor, /resolveAcademyContentAccess\(currentMember, member, ACADEMY_ADMIN_EMAILS\)/);
assert.ok(mentor.indexOf('validateMentorRequest(req.body)') < mentor.indexOf('reserveMentorUsage('));
assert.ok(mentor.indexOf('await reserveMentorUsage(') < mentor.indexOf('ai.models.generateContent('));
assert.match(mentor, /maxOutputTokens: 2048/);
assert.match(mentor, /res\.status\(429\)/);
assert.doesNotMatch(mentor, /res\.status\(500\)\.json\(\{ error: message/);
console.log('KI-Mentor-Limits: Validierung, Parallelzugriff, Tageswechsel, Minutenlimit und Speicherausfall geprüft.');

// Lesson content must be loaded from server data and checked against current membership.
const { resolveMentorLessonContext, MentorLessonError } = await import('../server/mentorLessonContext.js');
const { ACADEMY_STAGES } = await import('../server/academyData.js');
const free = { tier: 'FREE' as const, isAdmin: false };
const pro = { tier: 'PRO' as const, isAdmin: false };
const firstStage = ACADEMY_STAGES[0];
const firstLesson = firstStage.lessons[0];
const context = resolveMentorLessonContext(ACADEMY_STAGES, [], free, firstStage.id, firstLesson.id, 'de')!;
assert.equal(context.lessonTitle, firstLesson.title);
assert.match(context.knowledge, /"task":/);
assert.equal(JSON.parse(context.knowledge).task, firstLesson.actionTask.instruction.slice(0, 1200));
assert.ok(context.knowledge.length <= 16000);
assert.equal(resolveMentorLessonContext(ACADEMY_STAGES, [], free, undefined, undefined, 'de'), null);
assert.throws(() => resolveMentorLessonContext(ACADEMY_STAGES, [], free, '1', firstLesson.id, 'de'), error => error instanceof MentorLessonError && error.status === 400);
assert.throws(() => resolveMentorLessonContext(ACADEMY_STAGES, [], free, 1, '3.1', 'de'), error => error instanceof MentorLessonError && error.status === 403);
const third = ACADEMY_STAGES.find(stage => stage.id === 3)!;
assert.throws(() => resolveMentorLessonContext(ACADEMY_STAGES, [], free, 3, third.lessons[0].id, 'de'), error => error instanceof MentorLessonError && error.status === 403);
assert.ok(resolveMentorLessonContext(ACADEMY_STAGES, [], pro, 3, third.lessons[0].id, 'de'));
const published = { ...structuredClone(firstLesson), title: 'Geprüfter neuer Titel', publicationStatus: 'published' as const };
published.actionTask.instruction = 'Diese neue Aufgabe stammt aus der zentralen Verwaltung.';
const override = { stageId: firstStage.id, lessonId: firstLesson.id, deleted: false, lesson: published };
assert.equal(resolveMentorLessonContext(ACADEMY_STAGES, [override], free, firstStage.id, firstLesson.id, 'de')!.lessonTitle, published.title);
assert.equal(JSON.parse(resolveMentorLessonContext(ACADEMY_STAGES, [override], free, firstStage.id, firstLesson.id, 'de')!.knowledge).task, published.actionTask.instruction);
for (const hidden of [{ ...override, deleted: true }, { ...override, lesson: { ...published, publicationStatus: 'draft' as const } }]) {
  assert.throws(() => resolveMentorLessonContext(ACADEMY_STAGES, [hidden], pro, firstStage.id, firstLesson.id, 'de'), error => error instanceof MentorLessonError && error.status === 403);
}
for (const language of ['en', 'pl'] as const) {
  const translated = resolveMentorLessonContext(ACADEMY_STAGES, [], free, firstStage.id, firstLesson.id, language)!;
  assert.notEqual(translated.lessonTitle, context.lessonTitle);
  assert.ok(JSON.parse(translated.knowledge).task.length > 0);
}
assert.ok(mentor.indexOf('resolveMentorLessonContext(') < mentor.indexOf('await reserveMentorUsage('));
assert.doesNotMatch(mentor, /currentLessonTitle \|\|/);
console.log('Lektionswissen: aktuelle Inhalte, Sprachen, FREE/PRO, Entwürfe und Löschungen geprüft.');

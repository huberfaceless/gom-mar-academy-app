import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { MemberSessionDeniedError, resolveCurrentMemberSession } from '../server/memberSessionAccess.js';
import type { FirebaseMember } from '../server/firebaseMembershipAdmin.js';

const member: FirebaseMember = {
  uid: 'member-1', email: 'member@example.com', displayName: 'Test',
  emailVerified: true, disabled: false, tier: 'FREE', role: 'member', language: 'de',
};
const token = {
  sub: member.uid, auth_time: 100, iat: 200, exp: 300,
  email: 'admin@gom-mar.de', email_verified: true,
  academyTier: 'PREMIUM', academyRole: 'admin', admin: true,
};
const resolve = (current: FirebaseMember | null, supplied = token) =>
  resolveCurrentMemberSession('test-project', supplied, async () => current);

const current = await resolve(member);
assert.equal(current.academyTier, 'FREE');
assert.equal(current.academyRole, 'member');
assert.equal(current.admin, false);
assert.equal(current.email, member.email);
assert.equal(current.sub, token.sub);
assert.equal(current.exp, token.exp);
for (const tier of ['FREE', 'PRO', 'PREMIUM'] as const) {
  assert.equal((await resolve({ ...member, tier })).academyTier, tier);
}
assert.equal((await resolve({ ...member, role: 'admin', tier: 'PREMIUM' })).admin, true);
assert.equal((await resolve({ ...member, emailVerified: false })).email_verified, false);
for (const denied of [null, { ...member, disabled: true }, { ...member, uid: 'other' },
  { ...member, tokensValidAfterSeconds: 101 },
  { ...member, tokensValidAfterSeconds: NaN },
  { ...member, tokensValidAfterSeconds: -1 }]) {
  await assert.rejects(resolve(denied), MemberSessionDeniedError);
}
assert.equal((await resolve({ ...member, tokensValidAfterSeconds: 100 })).sub, member.uid);
// Ein frisch erneuertes Token (iat=200) darf eine widerrufene Anmeldung (auth_time=100) nicht retten.
await assert.rejects(resolve({ ...member, tokensValidAfterSeconds: 150 }), MemberSessionDeniedError);
await assert.rejects(resolve(member, { ...token, auth_time: NaN }), MemberSessionDeniedError);
let lookups = 0;
let latest = { ...member, tier: 'PRO' as FirebaseMember['tier'] };
const lookup = async () => { lookups++; return latest; };
assert.equal((await resolveCurrentMemberSession('test', token, lookup)).academyTier, 'PRO');
latest = { ...member };
assert.equal((await resolveCurrentMemberSession('test', token, lookup)).academyTier, 'FREE');
assert.equal(lookups, 2, 'Jede Anfrage muss den aktuellen Kontostand laden.');
const outage = new Error('lookup unavailable');
await assert.rejects(resolveCurrentMemberSession('test', token, async () => { throw outage; }), e => e === outage);

// Die echte Middleware und die nachgelagerten Rechteprüfungen aus server.ts ausführen.
const server = fs.readFileSync(new URL('../server.ts', import.meta.url), 'utf8');
const auth = server.slice(server.indexOf('  const requireAuthenticatedMember ='), server.indexOf('  const verificationGoogleAuth ='));
const helpers = server.slice(server.indexOf('const firebaseTierRank ='), server.indexOf('async function startServer()'));
const guards = server.slice(server.indexOf('  const requireProMember ='), server.indexOf('  const requireSchedulerSecret ='));
let verifyFails = false;
let lookupCalls = 0;
let account: FirebaseMember | null = member;
let lookupFails = false;
const context = vm.createContext({
  FIREBASE_PROJECT_ID: 'test', ACADEMY_ADMIN_EMAILS: new Set(['admin@gom-mar.de']),
  MemberSessionDeniedError,
  verifyFirebaseIdToken: async () => { if (verifyFails) throw Error('invalid signature'); return token; },
  resolveCurrentMemberSession: async (project: string, supplied: typeof token) => {
    lookupCalls++;
    return resolveCurrentMemberSession(project, supplied, async () => {
      if (lookupFails) throw outage;
      return account;
    });
  },
});
const code = ts.transpileModule(helpers + auth + guards
  + '\nglobalThis.testGuards = { requireAuthenticatedMember, requireVerifiedMember, requireProMember, requireAcademyAdmin };',
  { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
vm.runInContext(code, context);
type Middleware = (req: object, res: object, next: () => void) => void | Promise<void>;
const middleware = context.testGuards as Record<string, Middleware | Middleware[]>;
const run = async (kind: 'member' | 'pro' | 'admin') => {
  let status = 200, passed = false;
  const req = { headers: { authorization: 'Bearer signed-token' } };
  const res = { status(n: number) { status = n; return this; }, json() {} };
  const chain = [...middleware.requireVerifiedMember as Middleware[],
    ...(kind === 'member' ? [] : [middleware[kind === 'pro' ? 'requireProMember' : 'requireAcademyAdmin'] as Middleware])];
  for (const guard of chain) {
    let next = false;
    await guard(req, res, () => { next = true; });
    if (!next) return { status, passed };
  }
  passed = true;
  return { status, passed };
};
assert.deepEqual(await run('pro'), { status: 403, passed: false });
assert.deepEqual(await run('admin'), { status: 403, passed: false });
account = { ...member, tier: 'PRO' };
assert.equal((await run('pro')).passed, true);
account = { ...member, role: 'admin', tier: 'PREMIUM' };
assert.equal((await run('admin')).passed, true);
account = { ...member, email: 'admin@gom-mar.de' };
assert.equal((await run('admin')).passed, true, 'Der aktuelle bestätigte Admin-Allowlist-Zugang bleibt erhalten.');
for (const denied of [null, { ...member, disabled: true }, { ...member, tokensValidAfterSeconds: 101 }]) {
  account = denied;
  assert.equal((await run('admin')).status, 401);
}
account = { ...member, emailVerified: false };
assert.equal((await run('member')).status, 403);
lookupFails = true;
assert.equal((await run('admin')).status, 503);
lookupFails = false;
verifyFails = true;
const before = lookupCalls;
assert.equal((await run('admin')).status, 401);
assert.equal(lookupCalls, before, 'Ungültige Tokens dürfen keine Kontoprüfung auslösen.');
const accounts = fs.readFileSync(new URL('../server/firebaseMembershipAdmin.ts', import.meta.url), 'utf8');
assert.match(accounts, /tokensValidAfterSeconds: account\.validSince === undefined \? undefined : Number\(account\.validSince\)/);
const mapperContext = vm.createContext({ exports: {} });
const mappingCode = accounts.slice(accounts.indexOf('const normalizeTier ='), accounts.indexOf('const getAccessToken ='))
  + accounts.slice(accounts.indexOf('const toFirebaseMember ='), accounts.indexOf('export const listFirebaseMembers ='))
  + '\nglobalThis.mapAccount = toFirebaseMember;';
vm.runInContext(ts.transpileModule(mappingCode, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText, mapperContext);
const mapAccount = mapperContext.mapAccount as (account: object) => FirebaseMember;
assert.equal(mapAccount({ localId: 'test', validSince: '150' }).tokensValidAfterSeconds, 150);
assert.equal(mapAccount({ localId: 'test' }).tokensValidAfterSeconds, undefined);
assert.ok(Number.isNaN(mapAccount({ localId: 'test', validSince: 'invalid' }).tokensValidAfterSeconds));
await assert.rejects(resolve(mapAccount({ localId: member.uid, validSince: 'invalid' })), MemberSessionDeniedError);

console.log('Aktuelle Kontorechte, Sperren, Sitzungswiderruf und echte Server-Middleware erfolgreich geprüft.');

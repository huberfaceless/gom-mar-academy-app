import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { canUseContentProject, isVital50Project } from '../src/utils/contentProjectAccess';
import { createStarterProjects, createOnlineBusinessProject, DEFAULT_VITAL50_PROJECT, loadAllProjectSettings, saveAllProjectSettings } from '../src/utils/contentStorage';
import { requirePublishingMember, PublishingAccessDeniedError } from '../server/publishingMemberAccess';
import ts from 'typescript';
import vm from 'node:vm';

const storage = readFileSync('src/utils/contentStorage.ts', 'utf8');
const hub = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
const modal = readFileSync('src/components/ContentEngine/ProjectSettingsModal.tsx', 'utf8');
const server = readFileSync('server.ts', 'utf8');

assert.match(storage, /GOM-MAR Online Business/, 'Eine Online-Business-Projektvorlage fehlt.');
assert.match(hub, /Neues Inhaltsprojekt anlegen/, 'Neue Inhaltsprojekte müssen über die Oberfläche anlegbar sein.');
assert.match(hub, /exists[\s\S]*?\[\.\.\.projects, updatedSettings\]/, 'Mitglieder müssen weiterhin eigene Projekte anlegen können.');
assert.match(modal, /useEffect\([\s\S]*?setFormData/, 'Das Einstellungsformular muss beim Projektwechsel aktualisiert werden.');
assert.doesNotMatch(server, /projectSettings\?\.name \|\| 'Vital50'/, 'Server-Prompts dürfen nicht auf Vital50 zurückfallen.');
assert.doesNotMatch(server, /projectSettings\?\.targetAudience \|\| 'Menschen 50\+'/, 'Server-Prompts dürfen keine Vital50-Zielgruppe erzwingen.');

console.log('Content-Engine-Projekte geprüft: Vital50 und frei konfigurierbare Themenwelten bleiben getrennt.');

const business = createOnlineBusinessProject('member-one');
assert.equal(isVital50Project(business), false);
assert.notEqual(business.id, createOnlineBusinessProject('member-two').id, 'Startprojekte verschiedener Mitglieder dürfen keine Firestore-ID teilen.');
assert.deepEqual(createStarterProjects('member-one').map(p => p.name), ['GOM-MAR Online Business']);
assert.deepEqual(createStarterProjects('admin', true).map(p => p.name), ['Vital50', 'GOM-MAR Online Business']);
for (const project of [DEFAULT_VITAL50_PROJECT, { id: 'proj_vital50_owner' }, { name: ' VITAL50 ' }, { websiteUrl: 'https://vital50.gomo-marketing.at/' }, { defaultTargetUrl: 'https://VITAL50.gomo-marketing.at/path' }]) {
  assert.equal(canUseContentProject(project, false), false);
  assert.equal(canUseContentProject(project, true), true);
}
const ownProject = { ...business, id: 'own', name: 'Meine Gesundheitstipps', websiteUrl: 'https://example.com/', defaultTargetUrl: 'https://example.com/' };
assert.equal(canUseContentProject(ownProject, false), true, 'Eigene Themen dürfen nicht gesperrt werden.');
saveAllProjectSettings([DEFAULT_VITAL50_PROJECT, ownProject], 'legacy-member');
assert.deepEqual(loadAllProjectSettings('legacy-member').map(p => p.id), ['own']);
assert.deepEqual(loadAllProjectSettings('legacy-member', true).map(p => p.id), ['proj_vital50', 'own'], 'Filter darf vorhandene Projekte nicht löschen.');
saveAllProjectSettings([DEFAULT_VITAL50_PROJECT], 'old-starter');
assert.deepEqual(loadAllProjectSettings('old-starter').map(p => p.name), ['GOM-MAR Online Business']);
assert.equal(loadAllProjectSettings('old-starter', true).some(isVital50Project), true);
assert.equal(loadAllProjectSettings('new-member')[0].name, 'GOM-MAR Online Business');
const account = { uid: 'member', email: 'member@example.com', displayName: 'Test', disabled: false, emailVerified: true, tier: 'PRO' as const, role: 'member' as const, language: 'de' as const };
for (const tier of ['PRO', 'PREMIUM'] as const) {
  const lookup = async () => ({ ...account, tier });
  await requirePublishingMember('project', 'member', lookup, business);
  await requirePublishingMember('project', 'member', lookup, ownProject);
  await assert.rejects(requirePublishingMember('project', 'member', lookup, DEFAULT_VITAL50_PROJECT), PublishingAccessDeniedError);
}
await requirePublishingMember('project', 'member', async () => ({ ...account, role: 'admin' }), DEFAULT_VITAL50_PROJECT);
// Execute the real request guard: forbidden projects stop before an AI call.
const guardSource = server.slice(server.indexOf('  const requireContentProjectAccess = '), server.indexOf('  const requireAcademyAdmin = '));
const guardJs = ts.transpileModule(guardSource + '\n(globalThis as any).guard = requireContentProjectAccess;', { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
const context = vm.createContext({ canUseContentProject, isAcademyAdminToken: (token: { admin?: boolean }) => token?.admin === true });
vm.runInContext(guardJs, context);
for (const [project, admin, expected] of [[DEFAULT_VITAL50_PROJECT, false, 403], [business, false, 200], [ownProject, false, 200], [DEFAULT_VITAL50_PROJECT, true, 200]] as const) {
  let status = 0;
  const res = { status(code: number) { status = code; return this; }, json() {} };
  context.guard({ body: { projectSettings: project }, firebaseUser: { admin } }, res, () => { status = 200; });
  assert.equal(status, expected);
}
for (const endpoint of ['brief', 'blog', 'pins', 'youtube', 'shorts']) {
  assert.ok(server.includes(`app.post('/api/content-engine/${endpoint}', requireVerifiedMember, requireProMember, requireContentProjectAccess,`));
}
assert.match(readFileSync('src/App.tsx', 'utf8'), /<ContentEngineView isAdmin=\{user.role === 'admin'\} \/>/);
const rules = readFileSync('firestore.rules', 'utf8');
assert.match(rules, /function canUseContentProject/);
assert.match(rules, /canUseContentProject\(resource.data\) && canUseContentProject\(request.resource.data\)/);
console.log('Vital50-Schutz geprüft: Mitglieder starten mit Online Business, behalten eigene Projekte; Admins behalten Vital50.');

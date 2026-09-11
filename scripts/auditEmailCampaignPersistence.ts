import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateEmailCampaigns } from '../server/emailCampaignsAdmin.js';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/emailCampaignsAdmin.ts', 'utf8');
const service = readFileSync('src/services/emailCampaignsService.ts', 'utf8');
const app = readFileSync('src/App.tsx', 'utf8');
const view = readFileSync('src/components/EmailAutomationView.tsx', 'utf8');

assert.match(server, /app\.get\('\/api\/email\/campaigns', requireVerifiedMember, requireProMember/, 'Kampagnen-Lesen muss eine bestätigte PRO-Anmeldung verlangen.');
assert.match(server, /app\.put\('\/api\/email\/campaigns', requireVerifiedMember, requireProMember/, 'Kampagnen-Speichern muss eine bestätigte PRO-Anmeldung verlangen.');
assert.match(storage, /academyEmailCampaigns\//, 'E-Mail-Kampagnen müssen zentral in Firestore gespeichert werden.');
assert.match(storage, /encodeURIComponent\(userId\)/, 'E-Mail-Kampagnen müssen nach Firebase-Benutzer getrennt werden.');
assert.match(storage, /campaigns\.length > 100|value\.length > 100/, 'Die Kampagnenanzahl muss serverseitig begrenzt sein.');
assert.match(storage, /campaign\.emails\.length > 100/, 'Die E-Mail-Anzahl pro Kampagne muss serverseitig begrenzt sein.');
assert.match(service, /authenticatedFetch\('\/api\/email\/campaigns'/, 'Der Client muss den geschützten Kampagnen-Endpunkt verwenden.');
assert.match(app, /loadEmailCampaigns\(\)/, 'Kampagnen müssen nach bestätigter Anmeldung zentral geladen werden.');
assert.match(app, /await saveEmailCampaigns\(updatedCampaigns\)/, 'Kampagnen müssen vor der lokalen Aktualisierung zentral gespeichert werden.');
assert.match(app, /!remoteState\.exists[\s\S]{0,300}legacyCampaignState\.ownerEmail === currentEmail/, 'Bestehende lokale Kampagnen dürfen nur dem passenden Firebase-Konto zugeordnet werden.');
assert.doesNotMatch(app, /useState<Campaign\[]>\(loadCampaigns\(\)\)/, 'Globale Browser-Kampagnen dürfen nicht zwischen Konten geteilt werden.');
assert.doesNotMatch(view, /handleSimulateLead[\s\S]{0,500}onUpdateCampaigns/, 'Lokale Test-Leads dürfen gespeicherte Kampagnenwerte nicht verändern.');
assert.match(view, /isLoadingCampaigns/, 'Der Kampagnenbereich muss den Ladezustand anzeigen.');
assert.match(view, /campaignActionError/, 'Speicherfehler müssen sichtbar angezeigt werden.');
assert.match(view, /handleSaveCampaign/, 'Kampagnendaten müssen zentral bearbeitet werden können.');
assert.match(view, /handleCreateEmail/, 'Neue E-Mail-Entwürfe müssen direkt in einer Kampagne angelegt werden können.');
assert.match(view, /status: 'draft'/, 'Neue E-Mails müssen sicher als Entwurf angelegt werden.');
assert.match(view, /nicht automatisch versendet/, 'Der Entwurfsstatus muss in der Oberfläche eindeutig erklärt werden.');

const validCampaign = {
  id: 'camp_1',
  title: 'Willkommensserie',
  targetAudience: 'Einsteiger',
  description: 'Erste Sequenz',
  leadsCount: 0,
  status: 'draft',
  createdAt: '2026-09-11',
  emails: [{
    id: 'mail_1',
    campaignId: 'camp_1',
    dayOffset: 0,
    title: 'Willkommen',
    subject: 'Herzlich willkommen',
    previewText: '',
    content: 'Hallo [NAME]',
    status: 'scheduled',
  }],
};

assert.deepEqual(validateEmailCampaigns([validCampaign]), [validCampaign], 'Eine gültige Kampagne muss akzeptiert werden.');
assert.deepEqual(
  validateEmailCampaigns([{ ...validCampaign, emails: [{ ...validCampaign.emails[0], status: 'draft' }] }]),
  [{ ...validCampaign, emails: [{ ...validCampaign.emails[0], status: 'draft' }] }],
  'Ein neuer E-Mail-Entwurf muss akzeptiert werden.',
);
assert.throws(
  () => validateEmailCampaigns([{ ...validCampaign, emails: [{ ...validCampaign.emails[0], campaignId: 'fremd' }] }]),
  /falsch zugeordnet/,
  'E-Mails dürfen keiner fremden Kampagne zugeordnet sein.',
);
assert.throws(() => validateEmailCampaigns(new Array(101).fill(validCampaign)), /zu groß/, 'Mehr als 100 Kampagnen müssen abgelehnt werden.');

console.log('E-Mail-Kampagnen geprüft: benutzergetrennt, validiert und zentral in Firestore gespeichert.');

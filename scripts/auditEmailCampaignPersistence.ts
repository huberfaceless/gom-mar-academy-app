import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateEmailCampaigns } from '../server/emailCampaignsAdmin.js';
import { isCampaignEmailDue } from '../server/emailCampaignDeliveryAdmin.js';

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
assert.match(view, /handleDeleteCampaign/, 'Kampagnenentwürfe müssen gelöscht werden können.');
assert.match(view, /activeCampaign\.status !== 'draft'/, 'Aktive oder pausierte Kampagnen dürfen nicht versehentlich gelöscht werden.');
assert.match(view, /handleDeleteEmail/, 'Einzelne E-Mail-Entwürfe müssen gelöscht werden können.');
assert.match(view, /selectedEmail\.status !== 'draft'/, 'Bereits geplante oder versendete E-Mails dürfen nicht gelöscht werden.');
assert.match(view, /window\.confirm\(`Kampagne/, 'Vor dem Löschen einer Kampagne muss eine Bestätigung verlangt werden.');
assert.match(view, /window\.confirm\(`E-Mail-Entwurf/, 'Vor dem Löschen eines E-Mail-Entwurfs muss eine Bestätigung verlangt werden.');
assert.match(view, /campaigns\.find\(\(campaign\) => campaign\.id === selectedCampaignId\)/, 'Die ausgewählte Kampagne muss statt einer festen ersten Kampagne angezeigt werden.');
assert.match(view, /id="campaign-selector"/, 'Mehrere Kampagnen müssen über eine eindeutige Auswahl erreichbar sein.');
assert.match(view, /await onUpdateCampaigns\(\[\.\.\.campaigns, newCampaign\]\)/, 'Eine neue Kampagne muss ergänzt werden, ohne bestehende Kampagnen zu überschreiben.');
assert.match(view, /Die bestehende Kampagne bleibt vollständig erhalten/, 'Die sichere Ergänzung muss in der Oberfläche erklärt werden.');
assert.match(view, /getCampaignReadinessError/, 'Vor der Freigabe müssen die Kampagneninhalte vollständig geprüft werden.');
assert.match(view, /handleChangeCampaignStatus/, 'Kampagnen müssen kontrolliert freigegeben und pausiert werden können.');
assert.match(view, /alle Academy-Mitglieder mit bestätigter E-Mail-Einwilligung/, 'Die automatische Empfängergruppe muss vor Aktivierung klar benannt werden.');
assert.match(view, /automationStartedAt: !shouldPause && isAdmin/, 'Nur eine ausdrücklich bestätigte Admin-Freigabe darf den Versand starten.');
assert.doesNotMatch(view, /handleChangeCampaignStatus[\s\S]{0,2500}sendEmail\(/, 'Die Statusänderung darf keine Empfänger-E-Mail versenden.');
assert.match(view, /Eine neue Freigabe startet den automatischen Versand/, 'Der tatsächliche Versandbeginn muss erklärt werden.');
assert.match(server, /Automatischer Kampagnenversand ist nur für Administratoren verfügbar/, 'Nicht-Admins dürfen keine Kampagne automatisch versenden.');

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
const startedAt = '2026-09-27T15:00:00.000Z';
const activeCampaign = { ...validCampaign, status: 'active', automationStartedAt: startedAt };
assert.deepEqual(validateEmailCampaigns([activeCampaign]), [activeCampaign]);
assert.throws(() => validateEmailCampaigns([{ ...activeCampaign, automationStartedAt: 'ungültig' }]), /Startzeitpunkt/);
assert.equal(isCampaignEmailDue(activeCampaign, validCampaign.emails[0], Date.parse(startedAt) - 1), false);
assert.equal(isCampaignEmailDue(activeCampaign, validCampaign.emails[0], Date.parse(startedAt)), true);
assert.equal(isCampaignEmailDue({ ...activeCampaign, status: 'paused' }, validCampaign.emails[0], Date.parse(startedAt) + 1), false);
assert.equal(isCampaignEmailDue({ ...activeCampaign, automationStartedAt: undefined }, validCampaign.emails[0], Date.parse(startedAt) + 1), false);
assert.equal(isCampaignEmailDue(activeCampaign, { ...validCampaign.emails[0], dayOffset: 1 }, Date.parse(startedAt) + 86_400_000 - 1), false);
assert.equal(isCampaignEmailDue(activeCampaign, { ...validCampaign.emails[0], dayOffset: 1 }, Date.parse(startedAt) + 86_400_000), true);
const laterConsent = '2026-09-29T15:00:00.000Z';
assert.equal(isCampaignEmailDue(activeCampaign, { ...validCampaign.emails[0], dayOffset: 1 }, Date.parse(laterConsent) + 86_400_000 - 1, laterConsent), false);
assert.equal(isCampaignEmailDue(activeCampaign, { ...validCampaign.emails[0], dayOffset: 1 }, Date.parse(laterConsent) + 86_400_000, laterConsent), true);
const delivery = readFileSync('server/emailCampaignDeliveryAdmin.ts', 'utf8');
const scheduler = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
assert.match(delivery, /if \(response\.status === 409\) return null/, 'Doppelte Kampagnen-E-Mails müssen durch atomare Firestore-Reservierungen verhindert werden.');
assert.match(delivery, /await loadEmailConsent\(projectId, member\.uid\)/, 'Die Einwilligung muss unmittelbar vor dem Versand erneut geprüft werden.');
assert.match(delivery, /await isMarketingEmailSuppressed\(projectId, member\.email, latest\.updatedAt\)/, 'Abmeldungen müssen vor jedem Versand erneut geprüft werden.');
assert.match(scheduler, /await runEmailCampaignDeliveries\(/, 'Der Server-Scheduler muss fällige Kampagnen verarbeiten.');
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
assert.throws(
  () => validateEmailCampaigns([{ ...validCampaign, status: 'active', targetAudience: '', description: '', emails: [] }]),
  /Zielgruppe und Beschreibung/,
  'Eine unvollständige Kampagne darf nicht aktiviert werden.',
);
assert.throws(
  () => validateEmailCampaigns([{ ...validCampaign, status: 'active', emails: [{ ...validCampaign.emails[0], status: 'draft' }] }]),
  /keine E-Mail-Entwürfe/,
  'Eine aktive Kampagne darf keine E-Mail-Entwürfe enthalten.',
);

console.log('E-Mail-Kampagnen geprüft: benutzergetrennt, validiert und zentral in Firestore gespeichert.');

const { campaignAllowsRecipient } = await import('../server/emailCampaignDeliveryAdmin.js');
const { campaignDeliveryMode, assertCampaignDeliveryModeUnchanged } = await import('../server/emailCampaignsAdmin.js');
assert.equal(campaignAllowsRecipient({ deliveryMode: 'self-test' }, 'admin-one', 'admin-one'), true);
assert.equal(campaignAllowsRecipient({ deliveryMode: 'self-test' }, 'admin-one', 'member-two'), false);
assert.equal(campaignAllowsRecipient({ deliveryMode: 'self-test' }, 'admin-one', 'admin-two'), false);
assert.equal(campaignAllowsRecipient({ deliveryMode: 'invalid' }, 'admin-one', 'admin-one'), false);
assert.equal(campaignAllowsRecipient({ deliveryMode: 'members' }, 'admin-one', 'member-two'), true);
assert.equal(campaignDeliveryMode({}), 'members', 'Bestehende Kampagnen behalten ihren bisherigen Versandmodus.');
validateEmailCampaigns([{ ...activeCampaign, deliveryMode: 'self-test' }]);
assert.throws(() => validateEmailCampaigns([{ ...activeCampaign, deliveryMode: 'invalid' }]), /Versandmodus/);
const startedTest = { ...activeCampaign, deliveryMode: 'self-test' };
assert.throws(() => assertCampaignDeliveryModeUnchanged(startedTest, { ...startedTest, deliveryMode: 'members' }), /nicht geändert/);
assert.throws(() => assertCampaignDeliveryModeUnchanged(startedTest, { ...activeCampaign }), /nicht geändert/);
assertCampaignDeliveryModeUnchanged(startedTest, { ...startedTest, status: 'paused' });
assertCampaignDeliveryModeUnchanged({ ...validCampaign, deliveryMode: 'self-test' }, { ...validCampaign, deliveryMode: 'members' });
assert.match(delivery, /campaignAllowsRecipient\(campaign, owner\.uid, member\.uid\)/);
assert.match(delivery, /campaignAllowsRecipient\(active, owner\.uid, member\.uid\)/);
assert.match(server, /assertCampaignDeliveryModeUnchanged\(previous, campaign\)/);
console.log('Automatik-Testmodus geprüft: nur eigenes Konto, erneute Empfängerprüfung, gesperrter Moduswechsel und unveränderte Alt-Kampagnen.');

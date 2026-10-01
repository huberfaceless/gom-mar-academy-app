import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateEmailCampaigns } from '../server/emailCampaignsAdmin.js';
import { campaignExternalRecipients, campaignRecipientDeliveryId, isCampaignEmailDue } from '../server/emailCampaignDeliveryAdmin.js';
import { renderCampaignEmailHtml } from '../server/emailHtmlTemplate.js';

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
assert.match(view, /activeCampaign\.status === 'active'/, 'Aktive Kampagnen müssen vor dem Löschen pausiert werden.');
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

const { campaignConsentSkipReason } = await import('../server/emailCampaignDeliveryAdmin.js');
assert.equal(campaignConsentSkipReason({ granted: false, email: 'test@example.com' }, 'test@example.com'), 'missing-consent');
assert.equal(campaignConsentSkipReason({ granted: true, email: 'other@example.com' }, 'test@example.com'), 'consent-email-mismatch');
assert.equal(campaignConsentSkipReason({ granted: true, email: ' TEST@example.com ' }, 'test@EXAMPLE.com'), null);
assert.match(delivery, /event: 'academy\.email\.campaign\.recipient\.skipped'/);
assert.match(delivery, /logSkippedRecipient\(owner\.uid, campaign\.id, email\.id, member\.uid, consentSkipReason\)/);
assert.match(delivery, /logSkippedRecipient\(owner\.uid, campaign\.id, email\.id, member\.uid, 'marketing-suppressed'\)/);
console.log('Abmelde-Protokoll geprüft: fehlende Einwilligung, abweichende Adresse und Marketing-Versandsperre.');

assert.match(server, /app\.get\('\/api\/email\/campaigns\/report', requireVerifiedMember, requireAcademyAdmin/);
assert.match(server, /existing\.campaigns\.some\(previous => previous\.status === 'active'/);
const reportSource = readFileSync('server/emailCampaignReportAdmin.ts', 'utf8');
assert.match(reportSource, /fieldPath: 'ownerUid'/);
assert.match(reportSource, /stringValue: ownerUid/);
assert.match(reportSource, /documents.length > 1000/);
assert.match(view, /Kampagnen insgesamt/);
assert.match(view, /Kontakte im CRM/);
assert.match(view, /Versandprotokoll der ausgewählten Kampagne/);
assert.match(view, /Übergabe an SendGrid bestätigt keine Zustellung/);
console.log('Kampagnenübersicht geprüft: echte Versanddaten, geschützter Bericht und Pausieren vor Löschen.');

for (const [language, button, unsubscribe] of [
  ['de', 'Zur Academy', 'Marketing-E-Mails abbestellen'],
  ['en', 'Go to the Academy', 'Unsubscribe from marketing emails'],
  ['pl', 'Przejdź do Academy', 'Zrezygnuj z e-maili marketingowych'],
] as const) {
  const html = renderCampaignEmailHtml(language, '<Titel> & Test', 'Zeile 1\r\nZeile 2\n<script>alert("x")</script>', 'https://academy.gomo-marketing.at/api/email/unsubscribe?token=personal&lang=' + language);
  assert.ok(html.includes(`<html lang="${language}">`));
  assert.ok(html.includes(button));
  assert.ok(html.includes(unsubscribe));
  assert.ok(html.includes('href="https://academy.gomo-marketing.at"'));
  assert.ok(html.includes(`token=personal&amp;lang=${language}`), 'Der persönliche Abmeldelink muss erhalten bleiben.');
  assert.ok(html.includes('&lt;Titel&gt; &amp; Test'));
  assert.ok(html.includes('Zeile 1<br>Zeile 2<br>&lt;script&gt;'));
  assert.ok(!html.includes('<script>'), 'Kampagnentext darf kein aktives HTML einschleusen.');
}
assert.match(delivery, /renderCampaignEmailHtml\(member.language/, 'Der tatsächliche automatische Versand muss die HTML-Vorlage verwenden.');
assert.match(delivery, /type: 'text\/plain'/, 'Die Textversion muss weiterhin verfügbar sein.');
console.log('Kampagnen-HTML geprüft: DE/EN/PL, Academy-Button, persönlicher Abmeldelink und sichere Textdarstellung.');

validateEmailCampaigns([{ ...activeCampaign, deliveryMode: 'members-and-crm' }]);
assert.equal(campaignAllowsRecipient({ deliveryMode: 'members-and-crm' }, 'owner', 'member'), true);
assert.throws(() => assertCampaignDeliveryModeUnchanged(startedTest, { ...startedTest, deliveryMode: 'members-and-crm' }), /nicht geändert/);
assert.deepEqual(campaignExternalRecipients([
  { id: 'one', email: ' PERSON@example.com ' },
  { id: 'two', email: 'person@example.com' },
  { id: 'three', email: 'MEMBER@example.com' },
  { id: 'member_fake', email: 'other@example.com' },
], [{ email: 'member@example.com' }]), [{ id: 'one', email: 'person@example.com' }]);
assert.equal(campaignRecipientDeliveryId('o', 'c', 'e', ' PERSON@example.com '), campaignRecipientDeliveryId('o', 'c', 'e', 'person@example.com'));
assert.notEqual(campaignRecipientDeliveryId('o', 'c', 'e', 'person@example.com'), campaignRecipientDeliveryId('other', 'c', 'e', 'person@example.com'));
assert.notEqual(campaignRecipientDeliveryId('o', 'c', 'e', 'person@example.com'), campaignRecipientDeliveryId('o', 'c', 'next', 'person@example.com'));
assert.match(delivery, /await loadCrmContacts\(projectId, owner.uid\)/);
assert.match(delivery, /const latest = await loadExternalEmailConsent\(projectId, contact.email\)/);
assert.match(delivery, /await isMarketingEmailSuppressed\(projectId, contact.email, latest.updatedAt\)/);
assert.match(delivery, /if \(legacy.ok\) return null/);
assert.match(view, /value="members-and-crm"/);
console.log('CRM-Empfänger geprüft: eigener CRM-Bestand, Adress-Deduplizierung, Einwilligung, Abmeldung und ausdrücklicher neuer Modus.');

// Vollständiger Worker mit simuliertem Firebase, Firestore und SendGrid; kein Netzwerkversand.
const { GoogleAuth } = await import('google-auth-library');
const { runEmailCampaignDeliveries } = await import('../server/emailCampaignDeliveryAdmin.js');
const originalFetch = globalThis.fetch;
const originalGetClient = GoogleAuth.prototype.getClient;
const originalKey = process.env.SENDGRID_API_KEY;
const originalFrom = process.env.SENDGRID_FROM_EMAIL;
try {
  GoogleAuth.prototype.getClient = (async () => ({ getAccessToken: async () => ({ token: 'audit-token' }) })) as unknown as typeof originalGetClient;
  process.env.SENDGRID_API_KEY = 'audit-only';
  process.env.SENDGRID_FROM_EMAIL = 'audit@example.com';
  for (const scenario of ['success', 'missing-consent', 'withdrawn', 'suppressed', 'deleted', 'paused', 'self-test', 'members', 'legacy'] as const) {
    const docs = new Map<string, unknown>();
    const sent: Array<Record<string, unknown>> = [];
    let crmReads = 0;
    let consentReads = 0;
    let campaignReads = 0;
    const fixture = { ...activeCampaign, deliveryMode: scenario === 'self-test' ? 'self-test' : scenario === 'members' ? 'members' : 'members-and-crm' };
    const contacts = [
      { id: 'manual_1', name: 'Kontakt', email: 'external@example.com' },
      { id: 'manual_2', name: 'Duplikat', email: 'EXTERNAL@example.com' },
      { id: 'manual_owner', name: 'Mitglied', email: 'owner@example.com' },
    ];
    const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';
      if (url.includes('accounts:batchGet')) return response({ users: [{ localId: 'owner', email: 'owner@example.com', emailVerified: true, customAttributes: JSON.stringify({ academyRole: 'admin', academyLanguage: 'pl' }) }] });
      if (url.includes('/academyEmailCampaigns/')) {
        campaignReads++;
        return response({ fields: { campaignsJson: { stringValue: JSON.stringify([{ ...fixture, status: scenario === 'paused' && campaignReads > 1 ? 'paused' : 'active' }]) } } });
      }
      if (url.includes('/academyCrmContacts/')) {
        assert.ok(url.endsWith('/owner'), 'Nur das eigene CRM darf gelesen werden.');
        crmReads++;
        return response({ fields: { contactsJson: { stringValue: JSON.stringify(scenario === 'deleted' && crmReads > 1 ? [] : contacts) } } });
      }
      if (url.includes('/academyEmailConsents/')) return response({}, 404);
      if (url.includes('/academyExternalEmailConsents/')) {
        consentReads++;
        return response({ fields: { email: { stringValue: 'external@example.com' }, granted: { booleanValue: !(scenario === 'missing-consent' || (scenario === 'withdrawn' && consentReads > 1)) }, updatedAt: { timestampValue: startedAt } } });
      }
      if (url.includes('/academyEmailSuppressions/')) return scenario === 'suppressed'
        ? response({ fields: { suppressed: { booleanValue: true }, updatedAt: { timestampValue: startedAt } } }) : response({}, 404);
      if (url.includes('/academyEmailDeliveries')) {
        const parsed = new URL(url);
        const key = parsed.searchParams.has('documentId') ? parsed.pathname + '/' + parsed.searchParams.get('documentId') : parsed.pathname;
        if (method === 'GET') return scenario === 'legacy' ? response({ fields: { status: { stringValue: 'accepted' } } }) : docs.has(key) ? response(docs.get(key)) : response({}, 404);
        if (method === 'POST' && docs.has(key)) return response({}, 409);
        docs.set(key, JSON.parse(String(init?.body)));
        return response({});
      }
      if (url.includes('/academyEmailUnsubscribeTokens/')) {
        const body = JSON.parse(String(init?.body));
        assert.equal(body.fields.memberUserId.stringValue, '', 'Externe Kontakte dürfen keine erfundene Mitglieds-UID erhalten.');
        return response({});
      }
      if (url === 'https://api.sendgrid.com/v3/mail/send') {
        sent.push(JSON.parse(String(init?.body)));
        return response({}, 202);
      }
      throw new Error('Unerwarteter Audit-Netzwerkzugriff: ' + url);
    }) as typeof fetch;
    const result = await runEmailCampaignDeliveries('audit-project');
    assert.equal(result.accepted, scenario === 'success' ? 1 : 0, scenario);
    if (scenario === 'success') {
      await runEmailCampaignDeliveries('audit-project');
      assert.equal(sent.length, 1, 'Wiederholter Scheduler-Durchlauf darf nicht erneut senden.');
      const message = sent[0] as { personalizations: Array<{ to: Array<{ email: string }> }>; content: Array<{ type: string; value: string }> };
      assert.equal(message.personalizations[0].to[0].email, 'external@example.com');
      assert.ok(message.content.some(part => part.type === 'text/html' && part.value.includes('<html lang="pl">') && part.value.includes('/api/email/unsubscribe?token=')));
    }
  }
} finally {
  globalThis.fetch = originalFetch;
  GoogleAuth.prototype.getClient = originalGetClient;
  if (originalKey === undefined) delete process.env.SENDGRID_API_KEY; else process.env.SENDGRID_API_KEY = originalKey;
  if (originalFrom === undefined) delete process.env.SENDGRID_FROM_EMAIL; else process.env.SENDGRID_FROM_EMAIL = originalFrom;
}
console.log('Worker-Simulation bestanden: externer Versand, doppelte Kontakte, Wiederholung, Widerruf, Sperre, Löschung, Pause, Testmodus und Altdaten.');

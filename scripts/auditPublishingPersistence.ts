import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';

const worker = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
const publishing = readFileSync('src/services/publishingService.ts', 'utf8');
const admin = readFileSync('server/publishingQueueAdmin.ts', 'utf8');
const storage = readFileSync('src/utils/contentStorage.ts', 'utf8');
const contentEngine = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
const calendar = readFileSync('src/components/ContentEngine/ContentCalendarTab.tsx', 'utf8');
const server = readFileSync('server.ts', 'utf8');
const firestoreContent = readFileSync('src/services/firestoreContentService.ts', 'utf8');
const publishingJobsReadMethod = firestoreContent.slice(
  firestoreContent.indexOf('static async getPublishingJobs'),
  firestoreContent.indexOf('static async savePublishingJob'),
);

assert.doesNotMatch(worker, /firebase\/firestore|contentStorage/,
  'Der Server-Scheduler darf weder Browser-Firestore noch lokalen Browser-Speicher verwenden.');
assert.match(worker, /listServerPublishingJobs/,
  'Der Server-Scheduler muss Publishing-Jobs über den Admin-Zugriff laden.');
assert.match(worker, /claimServerPublishingJob/,
  'Der Server-Scheduler muss Jobs zentral und konkurenzsicher sperren.');
assert.match(worker, /saveServerPublishingJob/,
  'Der Server-Scheduler muss Ergebnisse zentral speichern.');
assert.match(worker, /syncServerPublishingOutcome/,
  'Der Server-Scheduler muss Queue-Ergebnisse mit Scheduler und Content-Projekt synchronisieren.');
assert.match(worker, /triggeredBy,\s*false/,
  'Die Serververarbeitung darf nicht auf den Browser-Firestore-Client zurückfallen.');

assert.match(publishing, /persistWithClient: boolean = true/,
  'PublishingService benötigt eine explizite serverseitige Persistenzgrenze.');
assert.match(admin, /GoogleAuth/,
  'Der zentrale Queue-Zugriff muss das Cloud-Run-Dienstkonto verwenden.');
assert.match(admin, /currentDocument\.updateTime/,
  'Das Sperren eines Jobs muss eine Firestore-Precondition verwenden.');

assert.match(storage, /scopedKey/,
  'Lokale Content-Daten müssen einen nutzerspezifischen Schlüssel verwenden.');
assert.match(storage, /`\$\{baseKey\}:\$\{userId\}`/,
  'Der lokale Schlüssel muss die Firebase-Benutzerkennung enthalten.');
assert.match(storage, /migrateLegacyContentStorage/,
  'Bestehende nutzerzugeordnete Browserdaten müssen kontrolliert übernommen werden.');
assert.match(storage, /project\.userId === userId/,
  'Die Altdatenmigration darf nur Content-Projekte des angemeldeten Nutzers übernehmen.');
assert.match(storage, /STORAGE_KEY_LEGACY_MIGRATION/,
  'Die Altdatenmigration benötigt eine nutzerbezogene Einmal-Markierung.');
assert.match(storage, /safeGetItem\(migrationMarker\) === ['"]done['"]/,
  'Bereits migrierte Altbestände dürfen gelöschte Queue-Jobs nicht erneut herstellen.');
assert.doesNotMatch(contentEngine, /saveOrUpdateContentProject\(updated\);/,
  'Content-Projekte dürfen nicht in einem kontounabhängigen Cache gespeichert werden.');
assert.match(contentEngine, /saveOrUpdateContentProject\(updated, userId\)/,
  'Content-Projekte müssen mit der aktuellen Firebase-Benutzerkennung gespeichert werden.');
assert.match(server, /['"]\/api\/admin\/scheduler\/run-tick['"][\s\S]*requireVerifiedMember,[\s\S]*requireAcademyAdmin/,
  'Der manuelle Scheduler-Endpunkt muss eine bestätigte Admin-Anmeldung verlangen.');
assert.match(server, /['"]\/api\/internal\/scheduler\/run['"][\s\S]*requireSchedulerSecret/,
  'Der interne Scheduler-Endpunkt muss weiterhin mit dem Scheduler-Secret geschützt sein.');
assert.match(calendar, /authenticatedFetch\(['"]\/api\/admin\/scheduler\/run-tick['"]/,
  'Die Adminoberfläche muss den manuellen Scheduler mit Firebase-Authentifizierung auslösen.');
assert.doesNotMatch(calendar, /fetch\(['"]\/api\/scheduler\/run-tick['"]/,
  'Die Adminoberfläche darf den geheimnisgeschützten Server-Endpunkt nicht direkt aufrufen.');
assert.match(publishing, /isUploadedYouTubeVideo/,
  'Nur bereits hochgeladene YouTube-Langvideos dürfen neue Warteschlangenaufträge anlegen.');
assert.match(publishing, /result\.status === ['"]NOT_IMPLEMENTED['"]/,
  'Nicht implementierte Veröffentlichungen dürfen nicht wiederholt werden.');
assert.match(publishing, /Dieser Inhalt befindet sich bereits in der Publishing Queue/,
  'Ein Inhalt darf nicht mehrfach gleichzeitig eingereiht werden.');
assert.match(calendar, /items\.filter\(supportsPublishingQueue\)/,
  'Die Sammelaktion darf nur unterstützte Inhalte einreihen.');
assert.doesNotMatch(calendar, /handleStatusChange\(item\.id, ['"]scheduled['"]\)/,
  'Das Einreihen darf nicht über eine Statusänderung unbemerkt einen zweiten Job erzeugen.');
assert.match(firestoreContent, /function rethrowFirestoreWriteError\(err: unknown\): never/,
  'Fehler bei Firestore-Schreibvorgängen müssen an die Oberfläche weitergegeben werden.');
assert.match(firestoreContent, /FIRESTORE_WRITE_TIMEOUT_MS = 8000/,
  'Cloud-Schreibvorgänge benötigen ein realistisches Zeitfenster für eine bestätigte Antwort.');
assert.match(contentEngine, /setErrorMsg\(err instanceof Error \? err\.message/,
  'Fehler beim Speichern von Content-Projekten müssen sichtbar angezeigt werden.');
assert.match(contentEngine, />Projekt bearbeiten<\/span>/,
  'Die Bearbeitung bestehender Projekte muss eine eindeutig beschriftete Aktion besitzen.');
assert.match(contentEngine, /Projekt „\$\{updatedSettings\.name\}“ wurde erfolgreich gespeichert\./,
  'Erfolgreich gespeicherte Projekte müssen sichtbar bestätigt werden.');
assert.match(contentEngine, /contentSaved = await handleUpdateActiveProject/,
  'Die Speicherbestätigung darf erst nach dem zugehörigen Content-Projekt erscheinen.');
assert.match(contentEngine, /const getSuggestedTopics = \(project: ProjectSettings\)/,
  'Themen-Inspirationen müssen aus den Einstellungen des aktiven Projekts abgeleitet werden.');
assert.match(contentEngine, /const suggestedTopics = getSuggestedTopics\(activeProjectSettings\)/,
  'Die sichtbaren Inspirationen müssen beim Projektwechsel neu bestimmt werden.');
assert.match(contentEngine, /suggestedTopics\.map\(\(topic, i\)/,
  'Die Oberfläche muss die projektspezifischen Themen-Inspirationen anzeigen.');
assert.match(calendar, /text: err instanceof Error \? err\.message : 'Der Auftrag konnte nicht gelöscht werden\.'/,
  'Fehler beim Löschen eines Queue-Jobs müssen sichtbar angezeigt werden.');


assert.doesNotMatch(calendar, /In Queue|Publishing Queue|>Queue<|in Queue einreihen|Queue Job:/,
  'Die deutsche Oberfläche darf die englische Bezeichnung „Queue“ nicht anzeigen.');
assert.match(calendar, /Content-Planung & Veröffentlichungswarteschlange/,
  'Die Veröffentlichungswarteschlange muss vollständig deutsch beschriftet sein.');


assert.doesNotMatch(calendar, /\{(?:job|log|matchingJob)\.status\}|\$\{result\.status\}/,
  'Technische Statuswerte dürfen nicht direkt in der Oberfläche erscheinen.');
assert.match(calendar, /getStatusLabel\(job\.status\)/,
  'Auftragsstatus müssen vor der Anzeige deutsch übersetzt werden.');
assert.match(calendar, /getTriggerLabel\(log\.triggeredBy\)/,
  'Technische Auslöser müssen vor der Anzeige deutsch übersetzt werden.');


const youtubeScript = readFileSync('src/components/ContentEngine/YouTubeScriptTab.tsx', 'utf8');
assert.match(youtubeScript, /flex flex-col items-start gap-4/,
  'Der YouTube-Kopfbereich muss Überschrift und Aktionsleiste überlaufsicher untereinander anordnen.');
assert.match(youtubeScript, /flex flex-wrap items-center gap-2\.5 w-full min-w-0/,
  'Die YouTube-Aktionsleiste muss innerhalb des Containers umbrechen können.');
assert.doesNotMatch(youtubeScript, /lg:flex-row items-start lg:items-center justify-between/,
  'Der YouTube-Kopfbereich darf nicht erneut in eine überlaufende starre Desktop-Zeile wechseln.');


const youtubeView = readFileSync('src/components/ContentEngine/YouTubeScriptTab.tsx', 'utf8');
const youtubeAdmin = readFileSync('server/youtubeConnectionAdmin.ts', 'utf8');
assert.match(youtubeView, /videoId: result\.videoId/,
  'Die YouTube-Video-ID muss nach dem nicht gelisteten Upload dauerhaft dem Content-Projekt zugeordnet werden.');
assert.match(calendar, /Zuerst Video hochladen/,
  'Nicht hochgeladene YouTube-Videos müssen in der Inhaltsplanung verständlich blockiert werden.');
assert.match(calendar, /project\.youtubeVideo\.videoId \|\| getYouTubeVideoId/,
  'Bestehende nicht gelistete YouTube-Videos müssen anhand ihrer gespeicherten URL planbar bleiben.');
assert.match(worker, /publishExistingYouTubeVideo/,
  'Der Server-Scheduler muss geplante YouTube-Langvideos veröffentlichen können.');
assert.match(youtubeAdmin, /privacyStatus: 'public'/,
  'Die geplante YouTube-Veröffentlichung muss den Sichtbarkeitsstatus serverseitig auf öffentlich setzen.');
assert.match(publishing, /params\.platform === 'YOUTUBE'[\s\S]*params\.contentType === 'VIDEO'[\s\S]*videoId/,
  'Die Warteschlange darf YouTube nur für hochgeladene Langvideos öffnen.');

assert.match(calendar, /type="datetime-local"/,
  'Die Inhaltsplanung muss Datum und Uhrzeit gemeinsam erfassen.');
assert.match(calendar, /toScheduledIso\(item\.scheduledDate\)/,
  'Der gewählte lokale Veröffentlichungszeitpunkt muss für Firestore in UTC umgewandelt werden.');
assert.doesNotMatch(calendar, /T09:00:00\.000Z/,
  'Die Veröffentlichungszeit darf nicht mehr fest auf 09:00 Uhr UTC gesetzt sein.');
assert.match(calendar, /hour: '2-digit'[\s\S]*minute: '2-digit'/,
  'Die Warteschlange muss neben dem Datum auch die geplante Uhrzeit anzeigen.');

assert.match(calendar, /if \(job\.platform === 'YOUTUBE'\)[\s\S]*ausschließlich zum geplanten Zeitpunkt durch den Server/,
  'YouTube-Aufträge müssen gegen eine Ausführung im Browser geschützt sein.');
assert.match(calendar, /item\.platform === 'YOUTUBE'[\s\S]*Automatische Veröffentlichung geplant/,
  'Geplante YouTube-Videos dürfen in der Inhaltskarte keine manuelle Ausführung anbieten.');

assert.doesNotMatch(publishingJobsReadMethod, /isFirestoreOperational|loadAllPublishingJobs/,
  'Angemeldete Benutzer dürfen die Veröffentlichungswarteschlange nicht unbemerkt nur lokal laden.');
assert.match(firestoreContent, /savePublishingJob[\s\S]*await firestoreWithTimeout\(setDoc[\s\S]*const current = loadAllPublishingJobs/,
  'Veröffentlichungsaufträge müssen vor der lokalen Spiegelung von Firestore bestätigt werden.');
assert.match(firestoreContent, /saveSchedulerJob[\s\S]*await firestoreWithTimeout\(setDoc[\s\S]*const current = loadAllSchedulerJobs/,
  'Scheduler-Aufträge müssen vor der lokalen Spiegelung von Firestore bestätigt werden.');
assert.doesNotMatch(firestoreContent, /savePublishingJob[\s\S]*if \(isFirestoreOperational\(\)\)[\s\S]*saveSchedulerJob/,
  'Kritische Veröffentlichungsaufträge dürfen nicht von der optionalen Firestore-Verfügbarkeitsmarkierung abhängen.');

assert.match(youtubeView, /handleUploadShort/,
  'Jedes YouTube-Kurzvideo muss eine eigene Upload-Funktion besitzen.');
assert.match(youtubeView, /videoId: result\.videoId, videoUrl: result\.videoUrl/,
  'Video-ID und Link müssen dauerhaft am hochgeladenen Kurzvideo gespeichert werden.');
assert.match(calendar, /short\.videoId \|\| getYouTubeVideoId\(short\.videoUrl\)/,
  'Hochgeladene Kurzvideos müssen ihre Video-ID an die Warteschlange übergeben.');
assert.match(calendar, /item\.contentType === 'VIDEO' \|\| item\.contentType === 'SHORT'/,
  'Lang- und Kurzvideos dürfen erst nach einem erfolgreichen Upload eingeplant werden.');
assert.match(publishing, /params\.contentType === 'VIDEO' \|\| params\.contentType === 'SHORT'/,
  'Die Warteschlange muss hochgeladene Lang- und Kurzvideos akzeptieren.');
assert.match(publishing, /publishShort[\s\S]*return this\.publishVideo\(job, youtubeVideoPublisher\)/,
  'Der Server-Scheduler muss hochgeladene Kurzvideos über den geprüften YouTube-Publisher veröffentlichen.');
assert.doesNotMatch(publishing, /YouTube Shorts Upload API ist in dieser Entwicklungsphase noch nicht angebunden/,
  'Kurzvideos dürfen nicht mehr als nicht implementiert abgewiesen werden.');

assert.match(calendar, /job\.platform === 'YOUTUBE' && \(job\.contentType === 'VIDEO' \|\| job\.contentType === 'SHORT'\)/,
  'Lang- und Kurzvideo-Aufträge müssen in der Warteschlange als automatisch geplant angezeigt werden.');

assert.match(calendar, /await FirestoreContentService\.reschedulePublishingJob/,
  'Datumsänderungen bestehender Aufträge müssen von Firestore bestätigt werden.');
assert.match(calendar, /formatLocalDateTime\(matchingJob\.scheduledAt\)/,
  'Datumsfelder müssen den tatsächlichen Auftragstermin anzeigen.');

// Den echten Service mit einem isolierten Firestore-Adapter ausführen: kein Cloud-Zugriff.
let documents: Record<string, any> = {};
let cachedPublishing: any[] = [];
let cachedScheduler: any[] = [];
let failCommit = false;
const deletedField = '__deleted__';
const snapshot = (key: string) => ({ id: key.split('/').pop(), exists: () => Boolean(documents[key]), data: () => structuredClone(documents[key]) });
const mock = {
  doc: (_db: unknown, collection: string, id: string) => `${collection}/${id}`,
  collection: (_db: unknown, name: string) => name,
  query: (...parts: any[]) => parts,
  where: (...parts: any[]) => parts,
  getDocs: async () => ({ docs: Object.keys(documents).filter(key => key.startsWith('schedulerJobs/')).map(snapshot) }),
  deleteField: () => deletedField,
  runTransaction: async (_db: unknown, callback: (transaction: any) => Promise<void>) => {
    const writes: Array<{ key: string; fields: any }> = [];
    await callback({ get: async (key: string) => snapshot(key), update: (key: string, fields: any) => writes.push({ key, fields }) });
    if (failCommit) throw new Error('simulierter Cloud-Fehler');
    for (const write of writes) {
      for (const [field, value] of Object.entries(write.fields)) {
        if (value === deletedField) delete documents[write.key][field];
        else documents[write.key][field] = value;
      }
    }
  },
  loadAllPublishingJobs: () => structuredClone(cachedPublishing),
  saveAllPublishingJobs: (jobs: any[]) => { cachedPublishing = structuredClone(jobs); },
  loadAllSchedulerJobs: () => structuredClone(cachedScheduler),
  saveAllSchedulerJobs: (jobs: any[]) => { cachedScheduler = structuredClone(jobs); },
};
(globalThis as any).__publishingScheduleAudit = mock;
const bundled = await build({
  entryPoints: ['src/services/firestoreContentService.ts'], bundle: true, write: false, format: 'esm', platform: 'node',
  plugins: [{ name: 'isolated-firestore', setup(builder) {
    builder.onResolve({ filter: /^firebase\/firestore$|firebase\/config$|utils\/contentStorage$/ }, args => ({ path: args.path, namespace: 'audit-mock' }));
    builder.onLoad({ filter: /.*/, namespace: 'audit-mock' }, args => {
      if (args.path.endsWith('firebase/config')) return { contents: 'export const db = {}; export const isFirestoreOperational = () => true; export const handleFirestoreError = () => {};', loader: 'js' };
      const names = args.path === 'firebase/firestore'
        ? ['collection', 'doc', 'setDoc', 'getDoc', 'getDocs', 'query', 'where', 'deleteDoc', 'updateDoc', 'runTransaction', 'deleteField']
        : ['loadAllProjectSettings', 'saveAllProjectSettings', 'loadAllContentProjects', 'saveAllContentProjects', 'loadAllPublishingJobs', 'saveAllPublishingJobs', 'loadAllSchedulerJobs', 'saveAllSchedulerJobs', 'DEFAULT_VITAL50_PROJECT', 'migrateLegacyContentStorage'];
      return { contents: names.map(name => `export const ${name} = (...args) => globalThis.__publishingScheduleAudit.${name}(...args);`).join('\n'), loader: 'js' };
    });
  } }],
});
const { FirestoreContentService: scheduleService } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
const oldDate = '2026-10-04T07:00:00.000Z';
const newDate = '2026-10-03T07:10:00.000Z';
const resetSchedule = () => {
  documents = {
    'publishingJobs/job': { id: 'job', userId: 'owner', status: 'SCHEDULED', scheduledAt: oldDate, attempts: 0, nextAttemptAt: oldDate, payload: { title: 'Test' } },
    'schedulerJobs/scheduler': { id: 'scheduler', userId: 'owner', publishingJobId: 'job', status: 'PENDING', scheduledAt: oldDate },
    'publishingJobs/other': { id: 'other', userId: 'owner', status: 'SCHEDULED', scheduledAt: oldDate },
  };
  cachedPublishing = [structuredClone(documents['publishingJobs/job'])];
  cachedScheduler = [structuredClone(documents['schedulerJobs/scheduler'])];
  failCommit = false;
};
resetSchedule();
await scheduleService.reschedulePublishingJob('owner', 'job', newDate);
assert.equal(documents['publishingJobs/job'].scheduledAt, newDate);
assert.equal(documents['schedulerJobs/scheduler'].scheduledAt, newDate);
assert.equal(cachedPublishing[0].scheduledAt, newDate);
assert.equal(cachedScheduler[0].scheduledAt, newDate);
assert.equal(documents['publishingJobs/other'].scheduledAt, oldDate);
assert.equal(documents['publishingJobs/job'].status, 'SCHEDULED');
assert.equal(documents['publishingJobs/job'].attempts, 0);
assert.equal(documents['publishingJobs/job'].payload.title, 'Test');
assert.equal(documents['publishingJobs/job'].nextAttemptAt, undefined);
for (const status of ['PUBLISHING', 'PUBLISHED', 'FAILED', 'CANCELLED']) {
  resetSchedule(); documents['publishingJobs/job'].status = status;
  await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'job', newDate), /Nur wartende/);
  assert.equal(documents['publishingJobs/job'].scheduledAt, oldDate);
  assert.equal(documents['schedulerJobs/scheduler'].scheduledAt, oldDate);
}
resetSchedule();
await assert.rejects(scheduleService.reschedulePublishingJob('stranger', 'job', newDate), /gehört nicht/);
await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'missing', newDate), /nicht gefunden/);
await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'job', 'ungültig'), /gültiges Datum/);
resetSchedule(); documents['publishingJobs/job'].externalId = 'already-published';
await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'job', newDate), /Nur wartende/);
resetSchedule(); documents['schedulerJobs/scheduler'].status = 'RUNNING';
await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'job', newDate), /nicht mehr verschoben/);
resetSchedule(); failCommit = true;
await assert.rejects(scheduleService.reschedulePublishingJob('owner', 'job', newDate), /Cloud-Fehler/);
assert.equal(documents['publishingJobs/job'].scheduledAt, oldDate);
assert.equal(documents['schedulerJobs/scheduler'].scheduledAt, oldDate);
assert.equal(cachedPublishing[0].scheduledAt, oldDate);
assert.equal(cachedScheduler[0].scheduledAt, oldDate);
delete (globalThis as any).__publishingScheduleAudit;

console.log('Publishing-Persistenz geprüft: Terminänderung, gemeinsame Cloud-Aktualisierung, Statusschutz und Fehlerfälle erfolgreich.');

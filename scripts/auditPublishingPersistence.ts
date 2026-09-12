import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const worker = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
const publishing = readFileSync('src/services/publishingService.ts', 'utf8');
const admin = readFileSync('server/publishingQueueAdmin.ts', 'utf8');
const storage = readFileSync('src/utils/contentStorage.ts', 'utf8');
const contentEngine = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
const calendar = readFileSync('src/components/ContentEngine/ContentCalendarTab.tsx', 'utf8');
const server = readFileSync('server.ts', 'utf8');
const firestoreContent = readFileSync('src/services/firestoreContentService.ts', 'utf8');

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
assert.match(publishing, /params\.platform !== ['"]PINTEREST['"] \|\| params\.contentType !== ['"]PIN['"]/,
  'Nicht implementierte Publisher dürfen keine neuen Queue-Jobs annehmen.');
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
assert.match(calendar, /Der Job konnte nicht gelöscht werden/,
  'Fehler beim Löschen eines Queue-Jobs müssen sichtbar angezeigt werden.');

console.log('Publishing-Persistenz geprüft: serverseitiger Firestore-Zugriff und lokale Benutzertrennung sind aktiv.');

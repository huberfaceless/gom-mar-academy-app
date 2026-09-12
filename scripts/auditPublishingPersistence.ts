import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const worker = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
const publishing = readFileSync('src/services/publishingService.ts', 'utf8');
const admin = readFileSync('server/publishingQueueAdmin.ts', 'utf8');
const storage = readFileSync('src/utils/contentStorage.ts', 'utf8');
const contentEngine = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');

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
assert.doesNotMatch(contentEngine, /saveOrUpdateContentProject\(updated\);/,
  'Content-Projekte dürfen nicht in einem kontounabhängigen Cache gespeichert werden.');
assert.match(contentEngine, /saveOrUpdateContentProject\(updated, userId\)/,
  'Content-Projekte müssen mit der aktuellen Firebase-Benutzerkennung gespeichert werden.');

console.log('Publishing-Persistenz geprüft: serverseitiger Firestore-Zugriff und lokale Benutzertrennung sind aktiv.');

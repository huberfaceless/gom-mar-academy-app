# Geschützte Veröffentlichungsaufträge

Mitglieder dürfen neue wartende Aufträge anlegen, deren Inhalt und Termin ändern und wartende Aufträge durch Löschen abbrechen. Versuchszähler, Wiederholungswartezeit, Sperren, Ergebnis und Protokoll bleiben beim Server. Laufende oder als unklar markierte Aufträge dürfen weder geändert noch gelöscht werden. Veröffentlichte und fehlgeschlagene Historieneinträge ohne Sperre dürfen weiterhin gelöscht werden.

„Erneut versuchen“ verwendet `/api/publishing/jobs/:jobId/retry`. Der Server prüft den aktuellen bestätigten PRO-/PREMIUM-/Admin-Zugang und das Eigentum am gespeicherten Auftrag. Nur fehlgeschlagene, eindeutig unveröffentlichte und nicht gesperrte Aufträge können erneut eingeplant werden. Auftrag und zugehörige Scheduler-Einträge werden in einem Firestore-Commit mit Versionsvorbedingungen aktualisiert. Der nächste Worker-Durchlauf übernimmt die tatsächliche Veröffentlichung. Bei unklarem Instagram-Ergebnis bleibt die Wiederholung gesperrt.

## Prüfung

- `npm run audit:publishing-rules`: echte Firestore-Regelprüfung in einem lokalen Demo-Emulator; Java 17 erforderlich. Kein Produktionszugriff.
- `npm run audit:publishing-retry`: Status-, Eigentums- und Konflikttests mit isolierten Firestore-/Credential-Adaptern; keine Veröffentlichung.
- Beide Prüfungen sind im GitHub-Workflow eingebunden.

## Bereitstellung

Ein Merge stellt den Anwendungscode über den vorhandenen Cloud-Run-Workflow bereit. Firestore-Regeln werden dadurch **nicht** veröffentlicht.

Zuerst die erfolgreiche Bereitstellung des Anwendungscodes abwarten. Danach aus dem aktuellen Repository-Checkout mit einem für das Firebase-Projekt autorisierten Konto ausführen:

```sh
npx --yes --package firebase-tools@14.12.1 firebase deploy --only firestore:rules --project gom-mar-akademie --config firebase.rules-deploy.json
```

Alternativ den Inhalt von `firestore.rules` in der Firebase-Konsole unter Firestore → Regeln veröffentlichen. Die Regeln müssen für die von der Academy verwendete Datenbank gelten. `FIREBASE_DATABASE_ID` verwendet im bestehenden Servercode standardmäßig `(default)`; bei einer bewusst abweichenden Datenbank die Zielkonfiguration entsprechend wählen.

Nach Veröffentlichung mit einem Mitgliedskonto einen wartenden Auftrag anlegen, umplanen und entfernen. Ein kontrolliert fehlgeschlagener Auftrag kann über „Erneut versuchen“ wieder eingeplant werden. Ein produktiver Plattformbeitrag wird von den automatischen Tests nicht ausgelöst.

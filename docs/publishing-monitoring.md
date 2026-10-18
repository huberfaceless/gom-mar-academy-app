# Überwachung der Veröffentlichungsergebnisse

Der Minutenzeitplan bestätigt den Aufruf des Workers. Die fachlichen Ergebnisse
einzelner Veröffentlichungsaufträge werden zusätzlich als strukturierte JSON-Zeilen
auf stdout gemeldet. Cloud Run übernimmt `severity` als Log-Schweregrad.

| Ereignis | Ergebnis | Schweregrad |
| --- | --- | --- |
| `publishing_job_outcome` | `PUBLISHED` | INFO |
| `publishing_job_outcome` | `RETRY_SCHEDULED` | WARNING |
| `publishing_job_outcome` | `FAILED` | ERROR |
| `publishing_job_outcome` | `PUBLICATION_UNCERTAIN` | ERROR |
| `publishing_sweep_failed` | Durchlauf abgebrochen | ERROR |

Ein Auftragsergebnis wird erst nach erfolgreicher Speicherung gemeldet, vor der
Synchronisierung der Kalender- und Inhaltsansichten. Auch ausgeschöpfte Versuche
bei der Wiederaufnahme abgelaufener Sperren erzeugen eine Fehlermeldung.
Fehlende Mitgliedsberechtigungen erzeugen nach Speicherung des endgültigen
Fehlerzustands ebenfalls ERROR. Neue, wartende Aufträge erzeugen keine Meldung.

Die neuen Meldungen enthalten nur feste Ereignis-/Ergebniswerte, eine bekannte
Plattform, die Anzahl der Versuche und den Unsicherheitsstatus. Sie enthalten keine
Nutzer- oder Auftragskennungen, Beiträge, Zieladressen, Zugangsdaten oder freien
Fehlertexte von Plattformanbietern. Detailprüfung erfolgt in der bestehenden
Auftragsverwaltung. Dies gilt für die neuen Meldungen, nicht pauschal für alle
bereits vorhandenen Logs der Anwendung.

## Vorhandener Alarm

Der eingerichtete Alarm `GOM-MAR Academy - Serverfehler` im Projekt
`gen-lang-client-0943155541` erfasst für den Dienst `gom-mar-academy` bereits
`severity>=ERROR`. Nach Auslieferung dieses Codes deckt er daher die neuen
endgültigen Veröffentlichungsfehler, unklaren Ergebnisse und Durchlauffehler ab.
Eine zusätzliche, inhaltlich gleiche Alarmregel ist nicht erforderlich.
Neue Wiederholungsmeldungen verwenden stdout und WARNING; sie erfüllen diesen
Fehlerfilter nicht. Bestehende andere stderr-Meldungen können weiterhin den
allgemeinen Serverfehler-Alarm auslösen.

Der vorhandene Log-Alarm begrenzt Benachrichtigungen auf eine pro 30 Minuten.
Mehrere Fehler bedeuten daher nicht zwangsläufig mehrere E-Mails. Bei
`PUBLICATION_UNCERTAIN` zuerst das externe Profil prüfen; ein automatischer
Neuversuch könnte einen Doppelbeitrag erzeugen. Die bestehende Sperre für diesen
Fall bleibt wirksam.

## Prüfung nach dem Deployment

Die tatsächliche Aufnahme der Ereignisse in Cloud Logging lässt sich lesen mit:

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="gom-mar-academy" AND (jsonPayload.event="publishing_job_outcome" OR jsonPayload.event="publishing_sweep_failed")' \
  --project=gen-lang-client-0943155541 \
  --freshness=24h --limit=20 \
  --format='json(timestamp,severity,jsonPayload)'
```

Vor einem neuen Verarbeitungsergebnis ist eine leere Liste erwartbar. Lokale
Tests prüfen Einstufung, Datenschutz und die echten Speicher-/Worker-Pfade mit
isolierten Abhängigkeiten: `bun run audit:publishing-monitoring`.
Diese Tests versenden keine E-Mail und veröffentlichen keinen Beitrag. Der
E-Mail-Kanal wurde bei der Einrichtung separat getestet; ein echter neuer
Publishing-Alarm ist erst nach dem Deployment im Betrieb nachweisbar.

Diese Ergänzung überwacht neue Verarbeitungsergebnisse. Sie durchsucht keine
historischen FAILED-Aufträge und erkennt keine dauerhaft überfälligen Aufträge,
die der Worker überhaupt nicht erreicht. Browserfehler bleiben separat offen.

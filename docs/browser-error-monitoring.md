# Fehlerüberwachung im Browser

## Erfasste Fälle

Die Produktionsanwendung installiert einmalig Listener für unbehandelte
JavaScript-Fehler und Promise-Ablehnungen. Ein Abbruch mit `AbortError` und reine
Ressourcen-Ladeereignisse werden ignoriert. JavaScript-Fehler mit fremdem
Dateiursprung (z. B. Browser-Erweiterungen) werden ebenfalls ignoriert.
React-Darstellungsfehler melden die Error Boundaries der Anwendung.

Die innere Boundary schützt die aktive Hauptansicht. Kopfzeile und Navigation
bleiben bei einem dort aufgefangenen Fehler erhalten. Ein Wechsel des Bereichs
setzt die Boundary durch ihren Schlüssel zurück. Die Übersicht-Schaltfläche
setzt den Fehlerzustand zurück und öffnet das Dashboard. Eine äußere Boundary
schützt auch Provider und die separaten Passwort-/Verifizierungsansichten.
Die Auffangansicht enthält in DE/EN/PL eine verständliche Meldung und einen
Neuladebutton. Ein Neuladen kann ungespeicherte Eingaben verlieren; die Boundary
rettet keine Entwürfe und verändert keine gespeicherten Mitgliedsdaten.

## Versand und Zugriff

Nur bei einer wiederhergestellten Firebase-Anmeldung wird eine Meldung an
`POST /api/client-errors` gesendet. Die Wiederherstellung der Anmeldung wird
abgewartet. Der Server verwendet den vorhandenen Authentifizierungswächter mit
Prüfung des aktuellen Kontostatus, ohne PRO-/Admin-Voraussetzung. Öffentliche
Besucher erhalten die Auffangansicht, ihre Fehler werden nicht zentral gemeldet.
Eine abgelaufene/gesperrte Anmeldung kann die Übermittlung verhindern.

Der Bericht enthält ausschließlich `kind` und `view` aus festen Wertelisten.
Zusätzliche Schlüssel sind ungültig. Freie Fehlermeldungen, Stacktraces,
Komponentenstacks, Nutzernamen, Mitgliedskennungen, Formularinhalte, Beiträge,
Adressen und URL-Parameter werden weder als Bericht gesendet noch im neuen
strukturierten Fehlerereignis gespeichert. Der Firebase-ID-Token wird wie bei
anderen geschützten API-Aufrufen ausschließlich als Authorization-Header zur
Authentifizierung übertragen. Der Reporter sendet keine Cookies oder Referer.
Bestehende HTTP-Zugriffslogs der Plattform bleiben davon unabhängig.

## Begrenzung

- Browser: höchstens drei Meldungsversuche pro Minute und dieselbe Kombination
  aus Fehlerart/Bereich höchstens alle fünf Minuten pro Seitenladung.
- Server: höchstens 60 Anfragen pro Minute vor der Authentifizierung und zehn
  akzeptierte Meldungen pro Minute je Prozess. Dieselbe Kombination aus Mitglied,
  Fehlerart und Bereich wird fünf Minuten lang unterdrückt. Die dafür verwendete
  Mitgliedskennung verbleibt ausschließlich im begrenzten Prozessspeicher.
- Der Speicher für Duplikate ist auf 1000 Einträge begrenzt; abgelaufene Einträge
  werden entfernt. Der spezialisierte JSON-Parser akzeptiert maximal 1 KiB.
- Anfragen müssen den konfigurierten Academy-Ursprung im Origin-Header senden.
  Die Herkunftsprüfung ersetzt keine Anmeldung. Die Mengenlimits gelten je
  Prozess, nicht global über mehrere Cloud-Run-Instanzen oder Neustarts.
- Netzwerk-/Anmeldefehler, Ablehnungen und ausbleibende Übermittlung werden nicht
  erneut gemeldet. Der Versand hat einen Fünf-Sekunden-Abbruch und keine Retries.

## Alarmierung

Akzeptierte Berichte erzeugen auf stdout ein strukturiertes Ereignis:

```json
{"severity":"ERROR","event":"browser_error_reported","kind":"render_error","view":"academy"}
```

Cloud Run übernimmt den Schweregrad ERROR. Der bereits konfigurierte Alarm
`GOM-MAR Academy - Serverfehler` erfasst diese Meldungen für `gom-mar-academy`.
Seine Begrenzung auf eine E-Mail je 30 Minuten bleibt maßgeblich. Ein Bericht ist
eine vom angemeldeten Browser gemeldete Störung, kein serverseitiger Beweis ihrer
Ursache. Eine neue, doppelte Cloud-Monitoring-Regel ist nicht nötig.

Nach dem Deployment lassen sich eingegangene Berichte lesen:

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="gom-mar-academy" AND jsonPayload.event="browser_error_reported"' \
  --project=gen-lang-client-0943155541 --freshness=24h --limit=20 \
  --format='json(timestamp,severity,jsonPayload)'
```

Ein leeres Ergebnis ohne neue Browserstörung ist erwartbar. Tests unter
`bun run audit:browser-monitoring` prüfen den tatsächlichen HTTP-Empfang mit
isoliertem Anmeldewächter, das Berichtformat, die Eventhandler, Recovery-Aktionen,
Sprachfassungen, Größen-/Mengenlimits und ausbleibende Rekursion bei Transportfehlern.
Sie verwenden keine produktiven Zugangsdaten und versenden keine E-Mail.
Die Aufnahme eines echten Browserereignisses samt Alarmzustellung ist nach
Merge/Deployment separat zu bestätigen.

## Grenzen

Bereits behandelte API-Fehler/abgefangene Promises und reine `console.error`-Ausgaben
werden nicht pauschal gemeldet. Offlinebetrieb, blockierte Übertragung, fehlende
Anmeldung oder JavaScript, das schon vor Installation der Listener nicht startet,
können keine Meldung erzeugen. Die feste Bereichsangabe ist bewusst gröber als
ein Stacktrace. Diese Ergänzung ersetzt weder die Erreichbarkeitsprüfung noch
die Überwachung von Servern, Veröffentlichungen und Sicherungen.

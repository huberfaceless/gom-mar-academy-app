# Pinterest-Sandbox testen

Die Sandbox wird im Fenster „Pinterest-Veröffentlichung“ unter „Pinterest-Umgebung“ ausgewählt. Sie dient dem manuellen Integrationstest und der Demo für die Pinterest-Standard-Freigabe. Kalender und Server-Scheduler verwenden weiterhin die Produktion und benötigen Standard-Zugriff.

1. Bei einem Pin das Veröffentlichungsfenster öffnen und „Sandbox – privater Test mit Trial-Zugriff“ wählen.
2. „Sandbox mit Pinterest verbinden“ anklicken und den offiziellen Pinterest-OAuth-Ablauf abschließen. Derselbe registrierte Callback wird verwendet; zusätzliche Secrets sind nicht erforderlich.
3. Das Veröffentlichungsfenster wieder öffnen. Die Auswahl bleibt im aktuellen Browser-Tab gespeichert.
4. Eine eigene Sandbox-Test-Pinnwand erstellen, zum Beispiel „Academy Sandbox Test“. Produktionspinnwände stehen hier nicht zur Verfügung.
5. „Test-Pin in Sandbox erstellen“ wählen und das Ergebnis auf Pinterest mit dem eigenen Konto prüfen. Der Test-Pin ist nur für den Ersteller sichtbar.
6. Für den Antrag auf Standard-Zugriff eine Bildschirmaufnahme mit OAuth-Verbindung, Pinnwand-Auswahl und erfolgreichem API-Test vorbereiten.

Ein Sandbox-Erfolg setzt weder den Pin im Inhaltsprojekt auf „veröffentlicht“ noch trägt er Sandbox-IDs in die öffentliche Warteschlange ein. Der Button wird nach einem erfolgreichen Test deaktiviert, um einen unbeabsichtigten zweiten Test-Pin im selben Fenster zu vermeiden.

Die bestehende Produktionsverbindung liegt weiterhin unter `academyPinterestConnections/{uid}`. Sandbox-Tokens werden serverseitig verschlüsselt unter `academyPinterestSandboxConnections/{uid}` gespeichert. Firestore-Clientzugriffe bleiben durch die bestehenden Regeln gesperrt. Beide Verbindungen haben eigene Access- und Refresh-Tokens; OAuth-State bindet die Umgebung an seine Signatur. Trennen im Sandbox-Modus löscht nur die Sandbox-Verbindung.

Alle Datenaufrufe, Token-Austausch und Token-Erneuerung verwenden je nach expliziter Auswahl `https://api-sandbox.pinterest.com/v5` oder `https://api.pinterest.com/v5`. Es gibt keinen automatischen Wechsel zwischen Umgebungen. Die Pinnwandliste verfolgt auch leere Sandbox-Seiten mit Bookmark. Eine unvollständige Liste wird als Fehler gemeldet.

Automatische Prüfung: `node --import tsx scripts/auditPinterestSandbox.ts`. Sie arbeitet mit isolierten HTTP- und Google-Adaptern und führt keine echte Pinterest-Veröffentlichung aus. Der tatsächliche OAuth-/Test-Pin-Durchlauf muss nach der Bereitstellung im angemeldeten Konto geprüft werden.

Offizielle Grundlagen:
- https://developers.pinterest.com/docs/developer-tools/sandbox/
- https://developers.pinterest.com/docs/key-concepts/access-tiers/

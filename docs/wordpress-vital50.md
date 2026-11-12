# Vital50: Blogartikel als WordPress-Entwurf

Diese erste Anbindung überträgt Titel, Markdown-Inhalt als HTML sowie die Beschreibung als WordPress-Auszug. Sie erstellt ausschließlich Entwürfe. Weitere Übertragungen desselben Academy-Inhaltsablaufs aktualisieren denselben Entwurf. Bereits veröffentlichte oder geplante Beiträge werden nicht verändert. Kategorien, Beitragsbilder, SEO-Plugin-Felder und Veröffentlichungstermine werden zunächst in WordPress bearbeitet. Ein Auszug ersetzt kein Rank-Math-Metabeschreibungsfeld.

## Server einrichten

Im Cloud-Run-Service `gom-mar-academy` (Projekt `gen-lang-client-0943155541`, Region `us-west1`) einen neuen, zufällig erzeugten Secret-Wert mit mindestens 32 Zeichen als Umgebungsvariable `WORDPRESS_CREDENTIAL_ENCRYPTION_KEY` anbinden. Secret Manager verwenden und dem Laufzeit-Servicekonto ausschließlich Zugriff auf dieses Secret geben. Bestehende Secrets beim Aktualisieren erhalten. Kein `VITE_`-Präfix verwenden. Der Schlüssel muss bei Deployments erhalten bleiben; ein Austausch macht bestehende Verbindungen unlesbar, bis sie neu verbunden werden.

Der Server speichert die Zugangsdaten mit AES-256-GCM in `academyWordPressConnections`. Die Verbindung ist über einen Hash aus Academy-Benutzer und Projekt-ID getrennt. Die bestehende abschließende Firestore-Regel verbietet Browserzugriff auf die neue Sammlung und auf `academyWordPressDrafts`; ein Regel-Deploy ist nicht erforderlich. Alle API-Aktionen erfordern bestätigte Academy-Administratorrechte und einen eigenen, aktiven Inhaltsablauf.

## In der Academy verbinden

1. Einen WordPress-Benutzer mit Berechtigung zum Bearbeiten von Beiträgen verwenden, vorzugsweise einen eigenen Autor für die Academy.
2. In WordPress unter **Benutzer → Profil → Anwendungspasswörter** ein Passwort namens „GOM-MAR Academy“ erstellen.
3. Einen gespeicherten Vital50-Blogartikel in der Academy öffnen. Im Abschnitt **WordPress-Entwurf** Benutzername und Anwendungspasswort eingeben. Das normale WordPress-Loginpasswort nicht verwenden.
4. **WordPress verbinden**, anschließend **Als WordPress-Entwurf übertragen**.
5. **Entwurf in WordPress öffnen**, Formatierung und Links kontrollieren, Kategorie und gegebenenfalls Beitragsbild ergänzen. Erst in WordPress veröffentlichen.

Die Zugangsdaten werden weder in Browser-Speichern noch im Quellcode abgelegt. Das Passwortfeld wird nach dem Verbindungsversuch geleert. **Verbindung trennen** entfernt die serverseitige Kopie; das Anwendungspasswort kann zusätzlich im WordPress-Profil widerrufen werden. Bestehende WordPress-Beiträge bleiben erhalten.

## Schutz vor Doppelbeiträgen

Ein dauerhafter Firestore-Eintrag wird vor dem WordPress-Schreibzugriff mit einer Versionsbedingung gesperrt. Ein paralleler zweiter Zugriff scheitert vor dem Erstellen. Bei einem Timeout oder einer fehlenden Speicherbestätigung wird keine automatische Wiederholung ausgeführt: WordPress-Entwürfe direkt prüfen. Ein ausstehender Eintrag ist kein Beleg für eine erfolgreiche oder gescheiterte Erstellung. Für eine manuelle Auflösung muss ein Administrator den zugehörigen WordPress-Beitrag eindeutig identifizieren und den Transfer-Datensatz korrigieren; nicht einfach löschen und erneut übertragen.

Nur `https://vital50.gomo-marketing.at` ist als Ziel freigeschaltet. Redirects werden nicht verfolgt. Weitere Webseiten benötigen eine eigene freigegebene Anbindung; die Projekt-URL wird nicht als frei wählbares Server-Request-Ziel verwendet.

## Validierung

`npm run audit:wordpress`, `npm run lint`, `npm run audit:content-hub-i18n`, `npm run audit:blog` und `npm run build`.

Die automatischen Tests verwenden isolierte WordPress- und Speicherantworten. Ein echter Entwurf mit dem später eingerichteten Anwendungspasswort ist nach dem Deployment separat zu bestätigen. Während der Entwicklung wurde kein Beitrag auf Vital50 erstellt.

Referenzen: [WordPress-Authentifizierung](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/), [Beiträge-API](https://developer.wordpress.org/rest-api/reference/posts/).

## Tabellenformatierung

Vollständige ASCII-Textgitter mit Plus-/Strichrahmen werden in der Academy-Vorschau und beim WordPress-Export in echte Tabellen umgewandelt. Umgebrochene Zelltexte bleiben zusammen, eine vorhandene übergreifende Titelzeile bleibt über der Tabelle erhalten. Andere Codeblöcke und unvollständige Zeichnungen werden nicht verändert. Der WordPress-Export ergänzt sichtbare Zellrahmen und Abstände. Ein bereits übertragener Entwurf kann über **WordPress-Entwurf aktualisieren** korrigiert werden; der Artikel muss nicht neu generiert werden.

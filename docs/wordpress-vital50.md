# Vital50: Blogartikel als WordPress-Entwurf

Diese erste Anbindung überträgt Titel, Markdown-Inhalt als HTML sowie die Beschreibung als WordPress-Auszug. Sie erstellt ausschließlich Entwürfe. Weitere Übertragungen desselben Academy-Inhaltsablaufs aktualisieren denselben Entwurf. Bereits veröffentlichte oder geplante Beiträge werden nicht verändert. Die gewählte Vital50-Kategorie wird mitübertragen. SEO-Titel, Meta-Beschreibung und Fokuskeyword können nach einmaliger Einrichtung direkt in Rank Math gespeichert werden. Eine sichtbare Kurzantwort ergänzt den Artikel. Beitragsbilder und Veröffentlichungstermine werden weiterhin in WordPress bearbeitet. Ein Auszug ersetzt kein Rank-Math-Metabeschreibungsfeld.

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

## Vital50-Kategorien

Die Academy lädt die vorhandenen WordPress-Kategorien und bietet genau diese fünf an: Abnehmen ab 50, Wasser & Hydration, Gesunde Gewohnheiten, Energie & Vitalität sowie Rezepte. Ein regelbasierter Vorschlag berücksichtigt zuerst den Artikeltitel, dann Hauptkeyword und Thema. Bei unklarem Thema muss eine Kategorie gewählt werden. Die Auswahl kann vor der Übertragung geändert werden und wird beim Übertragen mit dem Artikel gespeichert.

Die Zuordnung erfolgt über Slugs und die jeweils aktuellen WordPress-IDs. Fehlende Kategorien werden nicht automatisch angelegt. Andere WordPress-Kategorien bleiben unverändert. Beim Aktualisieren eines Entwurfs wird dessen Kategorie ebenfalls aktualisiert. SEO-Plugin-Felder und GEO-Ergänzungen sind von dieser Kategoriezuordnung unabhängig.

## Interne Verlinkung

Bei neuen Vital50-Artikeln liest die Academy den öffentlichen WordPress-Bestand (bis zu 500 aktuelle Beiträge). Sie berücksichtigt veröffentlichte, nicht passwortgeschützte Beiträge auf derselben Domain und bewertet Titel, Thema, Hauptkeyword, Gliederung und bei bestehenden Artikeln den Text auf thematische Übereinstimmung. Allgemeine Wörter wie „ab 50“ gelten nicht als Übereinstimmung. Bis zu drei erreichbare Ziele werden unter „Passende Artikel“ ergänzt. Es werden keine Zieladressen erfunden; mögliche interne Modell-Links außerhalb der geprüften Auswahl werden bei der Neugenerierung entfernt. Der separat bestätigte Empfehlungslink bleibt erhalten.

Bestehende Academy-Artikel lassen sich mit „Passende interne Links ergänzen“ aktualisieren, ohne sie neu zu generieren. Wiederholte Aufrufe duplizieren die Links nicht. Änderungen während der Prüfung werden nicht überschrieben. Anschließend kann der vorhandene WordPress-Entwurf aktualisiert werden. Veröffentlichte WordPress-Beiträge werden nicht automatisch geändert.

Die Prüfung benötigt keine WordPress-Zugangsdaten. Fehler beim Laden bzw. Prüfen werden sichtbar angezeigt; neue Artikel können dennoch ohne interne Links erstellt werden. Weiterleitungen und nicht erreichbare Ziele werden ausgelassen. Erreichbarkeit gilt zum Prüfzeitpunkt. Bestehende manuell gesetzte Links werden beim Ergänzen nicht entfernt. Interne Links erhalten kein „sponsored“-Attribut. Die SEO-/GEO-Ergänzung ist im folgenden Abschnitt beschrieben.

## SEO und GEO

Neue Artikel erhalten zusätzlich SEO-Titel, Fokuskeyword und eine sachliche Kurzantwort. Bei bestehenden Artikeln erstellt **SEO und GEO vorbereiten** diese Angaben und die Meta-Beschreibung aus dem vorhandenen Text. Der Artikeltext bleibt dabei erhalten. Alle vier Felder können bearbeitet werden. Automatische Zusammenfassungen prüfen die zugrunde liegenden Aussagen nicht; insbesondere Gesundheitstexte müssen vor Veröffentlichung fachlich geprüft werden. Während der Vorbereitung geänderte Artikel werden nicht mit einer verspäteten Antwort überschrieben.

Die Kurzantwort wird bei Vorschau, Kopieren und WordPress-Übertragung als sichtbarer Abschnitt **Das Wichtigste in Kürze** vor dem Artikel eingefügt. Sie bleibt separat gespeichert und wird nicht bei jeder Übertragung erneut in den Ursprungstext geschrieben. Die Artikelgenerierung verlangt klare Frage-Antwort-Abschnitte und verbietet erfundene Studien, Zahlen und Heilsversprechen. Es werden keine zusätzlichen unsichtbaren FAQ- oder Schema-Blöcke angelegt. Die bereits von Rank Math erzeugten strukturierten Daten bleiben zuständig. GEO bezeichnet hier die verständliche Aufbereitung für Antwortsysteme; eine Aufnahme in KI-Antworten wird nicht zugesichert.

### Rank Math einmalig verbinden

1. Nach dem Academy-Deployment im Abschnitt **WordPress-Entwurf** auf **SEO-Verbindung prüfen** klicken.
2. Falls die drei Felder in WordPress noch nicht freigegeben sind: **SEO-Zusatzplugin herunterladen**.
3. In WordPress als Administrator **Plugins → Neues Plugin → Plugin hochladen**, die heruntergeladene ZIP-Datei installieren und aktivieren. Rank Math muss ebenfalls aktiv sein.
4. Zur Academy zurückkehren und **SEO-Verbindung prüfen** anklicken. Die Meldung **Rank-Math-Übertragung ist eingerichtet.** muss erscheinen.
5. SEO-Titel, Beschreibung und Fokuskeyword prüfen und den WordPress-Entwurf aktualisieren. Die Academy liest diese drei Werte aus WordPress zurück und bestätigt deren Speicherung nur bei Übereinstimmung.

Das Zusatzplugin **GOM-MAR Academy SEO Bridge** wird direkt aus der geprüften Serverquelle `server/wordpressSeoBridge.ts` als installierbare ZIP-Datei erzeugt. Es registriert ausschließlich `rank_math_title`, `rank_math_description` und `rank_math_focus_keyword` für Beiträge. Anmeldung, Anwendungspasswort und WordPress-Bearbeitungsrechte bleiben erforderlich. Die Werte sind nur im REST-Kontext `edit` sichtbar; Fokuskeywords werden nicht öffentlich ausgegeben. Das Plugin erzeugt keine eigenen Meta-Tags und kein zusätzliches Schema. Eine Deaktivierung beendet die API-Freigabe; gespeicherte Werte bleiben bestehen.

Fehlt die Freigabe, werden Entwürfe weiterhin ohne SEO-Metadaten übertragen; die Academy zeigt dies an. Unvollständige SEO-Felder werden nicht übertragen, um vorhandene Werte nicht zu leeren. Eine nicht bestätigte SEO-Rücklesung verliert nicht die bereits bekannte Entwurfs-ID und führt nicht zum Anlegen eines zweiten Beitrags. Bereits veröffentlichte oder geplante WordPress-Beiträge bleiben durch die bestehende Entwurfsprüfung geschützt. Der Rank-Math-Analysescore wird nicht künstlich gesetzt und ist kein Übertragungsnachweis.

Prüfung: `npm run audit:wordpress` beinhaltet SEO-/GEO- und Plugin-ZIP-Tests. Der tatsächliche WordPress-Rücklesetest erfordert die einmalige Plugin-Installation in Produktion.

Referenzen: [WordPress-Metafelder](https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/), [Rank-Math-Support zur Registrierung der Felder](https://wordpress.org/support/topic/meta-title-and-meta-description-with-n8n/), [Google zu AI-Funktionen und SEO](https://developers.google.com/search/docs/appearance/ai-features).

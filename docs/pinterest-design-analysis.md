# Pinterest: Bildanalyse und Designvorgaben

Im Pinterest-Reiter der KI-Inhaltszentrale befindet sich „Design aus erfolgreichen Pins ableiten“.

1. Optional Pinterest in Produktion verbinden und Kontodaten für 30, 60 oder 90 Tage laden.
2. Bis zu drei messbare Konto-Pins und/oder hochgeladene Designvorbilder auswählen.
3. Die tatsächlichen Bilder analysieren und die Designvorgaben im Projekt speichern.
4. Weitere Pinterest-Pins erzeugen. Die drei analysierten Layoutvarianten werden auf die neuen Pins angewendet.

Bestehende Pins, IDs, Termine, Veröffentlichungsergebnisse und separate Instagram-Entwürfe werden dadurch nicht geändert. Die Standard-Vorlagen-/Farbauswahl kann ein analysiertes Layout für den einzelnen Pin ersetzen.

## Daten und Grenzen

- Der serverseitige Aufruf verwendet den Token des angemeldeten Mitglieds. Kontofremde Token oder behauptete Klickzahlen werden nicht akzeptiert.
- Pinterest `user_account/analytics/top_pins`: organische Daten, sortiert nach ausgehenden Klicks, bis zu 50 Ergebnisse. Für bis zu zehn Kandidaten werden verfügbare Pin-Bilder geladen. Erstellungsfilter: letzte 30 Tage. Berichtszeitraum: volle UTC-Tage bis gestern.
- Der Erstellungsfilter ist unabhängig vom Messzeitraum: Pinterest erlaubt hier nur `created_in_last_n_days=30`; der Berichtszeitraum bleibt auf 30/60/90 Tage wählbar.
- Fehler zeigen HTTP-Status, gegebenenfalls Pinterest-Code und eine bereinigte Fehlermeldung. Token, Zugangsdaten und URLs werden nicht zurückgespiegelt.
- Klickrate = ausgehende Klicks / Impressionen. Fehlende Werte bleiben unbekannt. Unter 100 Impressionen zeigt die Oberfläche eine geringe Datenbasis an; diese Grenze ist kein Signifikanztest.
- Sandbox-Daten werden nicht für eine Erfolgsanalyse verwendet. Business-Konto, App-Freigabe und passende Pinterest-Berechtigungen sind Voraussetzung für Kontometriken. Eine fehlende Freigabe wird als Fehler angezeigt, nicht durch erfundene Daten ersetzt.
- Hochgeladene Vorbilder können auch ohne Analytics-Verbindung analysiert werden. Ihnen werden keine verifizierten Klickdaten zugeschrieben.
- Hohe Klickzahlen beweisen keine Ursache durch das Design. Die Analyse trennt Beobachtungen von Hypothesen. Es erfolgt keine automatische A/B-Zuordnung oder Veröffentlichung.

## Bildverarbeitung und Speicherung

Die KI bekommt echte Bilddaten. Konto-Bilder stammen ausschließlich von `https://i.pinimg.com`, ohne Redirects oder Weitergabe des Kontotokens an den Bildhost. Uploads werden im Browser verkleinert. Serverseitig sind PNG, JPEG und WebP mit begrenzter Größe zulässig; SVG und beliebige Remote-Adressen werden nicht eingelesen.

Gespeichert werden Quellverweise/Messbezug, Beobachtungen und drei kontrollierte Designvarianten. Hochgeladene Referenzbilder werden nicht im Projekt gespeichert oder als neues Pin-Bild wiederverwendet. Für neue Pins gelten eigene Inhalte, Marke und Bildauswahl. Der Renderer berücksichtigt die Varianten bei Vorschau, PNG-/ZIP-Export und Veröffentlichung und korrigiert unlesbare Textkontraste.

Prüfung: `node --import tsx scripts/auditPinterestDesign.ts` (keine echten Pinterest- oder KI-Aufrufe).


## Öffentliche Konkurrenz-Pins

Im Designpanel zuerst „Konkurrenz-Pins suchen“ verwenden. Das aktuelle Thema wird vorbelegt, der Suchbegriff bleibt editierbar. Die Suche nutzt die vorhandene Google-Websuche über Gemini, ohne Pinterest-OAuth. Sie bietet maximal zehn tatsächlich gefundene und öffentlich lesbare einzelne Pins zur Auswahl. Suchzeitpunkt, Originalquelle und isolierte Google-Quellenanzeige bleiben sichtbar. Bekannte Zieladressen der eigenen Projektwebsite werden anhand vorhandener öffentlicher Metadaten ausgeschlossen; die Identität jedes Creators lässt sich damit nicht vollständig überprüfen.

Dies ist keine vollständige Pinterest-Suche und keine Rangliste erfolgreicher Konkurrenz. Ausgehende Klicks und Impressionen fremder Pins sind unbekannt. Keine Treffer oder öffentliche Lesesperren werden sichtbar gemeldet; es werden keine Ersatz-URLs oder Bilder erfunden. Alternativ kann ein konkreter öffentlicher Pin-Link ergänzt oder ein Designvorbild hochgeladen werden. Keine Anmeldesperren umgehen.

Maximal drei Referenzen insgesamt (Konkurrenz-Pins, eigene gemessene Pins, Uploads). Die Analyse lädt öffentliche Pin-Metadaten und Bilddaten erneut serverseitig. Clientseitig übergebene Bildadressen und angebliche Fremdmetriken werden nicht übernommen. Es werden nur sichere Pinterest-Pin-URLs und i.pinimg.com-Bilder geladen; Redirects, Seiten- und Bildgrößen sind begrenzt. Zusätzlich im Suchantworttext genannte Pin-Links gelten nur als ungeprüfte Kandidaten: Erst der erneute öffentliche Abruf mit passender kanonischer Pin-ID und sicherer Bildadresse macht sie auswählbar. Kandidaten ohne lesbare öffentliche Metadaten werden verworfen. Die Diagnose unterscheidet Quellen, Pin-Kandidaten und nicht lesbare Bilder. Google-Quellenlinks werden nur über den bekannten Grounding-Redirect aufgelöst.

Gespeichert werden Gestaltungsvorgaben und Quellenreferenzen. Künftige Pin-Generierungen verwenden die vorhandene Varianten-/Canvas-Pipeline. Die Vorbildbilder werden nicht als eigene Pin-Bilder veröffentlicht.

Prüfung: `node --import tsx scripts/auditPinterestCompetitors.ts` prüft belegte Suchquellen, sichere Abrufe, leere Treffer, echte Bilddaten im Analyseaufruf, fehlende Fremdmetriken und die tatsächlichen UI-Handler für Suche, Auswahl und Speicherung. API/Modellantworten sind dabei simuliert; Suchabdeckung und öffentliche Lesbarkeit können sich produktiv ändern.


### Regressionen bei öffentlichen Pinterest-Seiten und Suchlinks

Pinterest-Seiten können Open-Graph-Bildmetadaten erst nach mehr als 1,3 MB im Seitenkopf ausliefern. Der öffentliche Head-Abruf ist deshalb auf 3 MB begrenzt (statt 512 KB), prüft auch nachträglich gestreamte Metadaten nach dem Head und lädt keine Sitzung oder Anmeldedaten. Bei fehlenden Seitenmetadaten wird der öffentliche oEmbed-Endpunkt von Pinterest geprüft: Anbieter, numerische Pin-ID im Embed und sichere Thumbnail-Adresse müssen übereinstimmen; das Embed-HTML wird nicht ausgeführt. Erkannte eigene Zielseiten bleiben ausgeschlossen. SEO-Pin-URLs mit `titel--PIN_ID` werden zur numerischen kanonischen Pin-Adresse normalisiert. Die Suchanweisung fordert kurze Kernbegriffe und deutsche/englische Varianten; verwendete Suchbegriffe und leere Ergebnisursachen sind sichtbar.

Google-Suchvorschläge bleiben im isolierten Frame. Ihre Links öffnen mit `_blank` außerhalb des Frames, damit Google-Suchergebnisse nicht als eingebettete Seite geblockt werden. Dieser Helfer wird auch im bestehenden Mitbewerber-Recherchepanel verwendet. Der Pinterest-Direktlink öffnet ebenfalls einen neuen Tab. Tests decken die echte Größe eines späten Head-Metadatensatzes, SEO-URLs, geprüfte Textkandidaten und externe Linkziele ab.

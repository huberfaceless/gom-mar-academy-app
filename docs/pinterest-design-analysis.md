# Pinterest: Bildanalyse und Designvorgaben

Im Pinterest-Reiter der KI-Inhaltszentrale befindet sich „Design aus erfolgreichen Pins ableiten“.

1. Optional Pinterest in Produktion verbinden und Kontodaten für 30, 60 oder 90 Tage laden.
2. Bis zu drei messbare Konto-Pins und/oder hochgeladene Designvorbilder auswählen.
3. Die tatsächlichen Bilder analysieren und die Designvorgaben im Projekt speichern.
4. Weitere Pinterest-Pins erzeugen. Die drei analysierten Layoutvarianten werden auf die neuen Pins angewendet.

Bestehende Pins, IDs, Termine, Veröffentlichungsergebnisse und separate Instagram-Entwürfe werden dadurch nicht geändert. Die Standard-Vorlagen-/Farbauswahl kann ein analysiertes Layout für den einzelnen Pin ersetzen.

## Daten und Grenzen

- Der serverseitige Aufruf verwendet den Token des angemeldeten Mitglieds. Kontofremde Token oder behauptete Klickzahlen werden nicht akzeptiert.
- Pinterest `user_account/analytics/top_pins`: organische Daten, sortiert nach ausgehenden Klicks, bis zu 50 Ergebnisse. Für bis zu zehn Kandidaten werden verfügbare Pin-Bilder geladen. Erstellungsfilter: letzte 90 Tage. Berichtszeitraum: volle UTC-Tage bis gestern.
- Klickrate = ausgehende Klicks / Impressionen. Fehlende Werte bleiben unbekannt. Unter 100 Impressionen zeigt die Oberfläche eine geringe Datenbasis an; diese Grenze ist kein Signifikanztest.
- Sandbox-Daten werden nicht für eine Erfolgsanalyse verwendet. Business-Konto, App-Freigabe und passende Pinterest-Berechtigungen sind Voraussetzung für Kontometriken. Eine fehlende Freigabe wird als Fehler angezeigt, nicht durch erfundene Daten ersetzt.
- Hochgeladene Vorbilder können auch ohne Analytics-Verbindung analysiert werden. Ihnen werden keine verifizierten Klickdaten zugeschrieben.
- Hohe Klickzahlen beweisen keine Ursache durch das Design. Die Analyse trennt Beobachtungen von Hypothesen. Es erfolgt keine automatische A/B-Zuordnung oder Veröffentlichung.

## Bildverarbeitung und Speicherung

Die KI bekommt echte Bilddaten. Konto-Bilder stammen ausschließlich von `https://i.pinimg.com`, ohne Redirects oder Weitergabe des Kontotokens an den Bildhost. Uploads werden im Browser verkleinert. Serverseitig sind PNG, JPEG und WebP mit begrenzter Größe zulässig; SVG und beliebige Remote-Adressen werden nicht eingelesen.

Gespeichert werden Quellverweise/Messbezug, Beobachtungen und drei kontrollierte Designvarianten. Hochgeladene Referenzbilder werden nicht im Projekt gespeichert oder als neues Pin-Bild wiederverwendet. Für neue Pins gelten eigene Inhalte, Marke und Bildauswahl. Der Renderer berücksichtigt die Varianten bei Vorschau, PNG-/ZIP-Export und Veröffentlichung und korrigiert unlesbare Textkontraste.

Prüfung: `node --import tsx scripts/auditPinterestDesign.ts` (keine echten Pinterest- oder KI-Aufrufe).

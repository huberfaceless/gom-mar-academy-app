# Search Console für die Keyword-Auswahl

Im Schritt **Inhaltsbriefing** steht die **Keyword-Prüfung vor dem Artikel**. Google einmal verbinden, passende Website-Properties laden, Property und Zeitraum (28 oder 90 Tage) wählen und Suchdaten abrufen. Ein Klick auf **Als Hauptkeyword wählen** übernimmt die tatsächlich zurückgegebene Suchanfrage in das Briefing. Titel und Gliederung anschließend prüfen, dann den Artikel erstellen. Das komplette Report-Datum bleibt im gespeicherten Briefing erhalten; spätere Änderungen des Hauptkeywords werden gegen diese Momentaufnahme geprüft.

Die Tabelle zeigt bis zu 250 Suchanfragen, Klicks, Impressionen, CTR und durchschnittliche Position der aktuellen Projektwebsite. Gefiltert werden deren URL und Unterseiten, auch wenn eine Domain-Property mehrere Subdomains umfasst. Zeitraumgrenzen folgen der Search Console in Pazifikzeit. Verwendet werden finale Web-Suchdaten bis drei Tage vor dem heutigen Pacific-Kalendertag. Unbekannte Messwerte bleiben unbekannt. Die Oberfläche zeigt maximal 50 gefilterte Zeilen gleichzeitig und nennt die Anzahl. Top-Zeilen, Anonymisierung und API-Limits bedeuten: keine vollständige Markt- oder Nachfrageanalyse.

## Google-Konfiguration

1. Die **Google Search Console API** im Google-Cloud-Projekt des verwendeten OAuth-Clients aktivieren.
2. Im Web-OAuth-Client die autorisierte Weiterleitungsadresse ergänzen:
   `https://academy.gomo-marketing.at/api/search-console/oauth/callback`
3. Den Lese-Scope `https://www.googleapis.com/auth/webmasters.readonly` im Google-Consent-Setup berücksichtigen. Google muss dem verwendeten Konto diese Freigabe erteilen; gegebenenfalls sind die zugehörigen App-/Testnutzerfreigaben erforderlich.
4. In der Academy verbinden und das Google-Konto mit freigegebener Search-Console-Property auswählen.

Dedizierte Serverkonfiguration:

- `SEARCH_CONSOLE_OAUTH_CLIENT_ID`
- `SEARCH_CONSOLE_OAUTH_CLIENT_SECRET`
- `SEARCH_CONSOLE_TOKEN_ENCRYPTION_KEY`
- optional `SEARCH_CONSOLE_OAUTH_REDIRECT_URI`

Ohne dediziertes Client-Paar werden die bereits vorhandenen `YOUTUBE_OAUTH_CLIENT_ID` und `YOUTUBE_OAUTH_CLIENT_SECRET` verwendet. Ein nur teilweise gesetztes dediziertes Paar wird nicht mit fremden Clientdaten vervollständigt. Der Schlüssel kann auf `YOUTUBE_TOKEN_ENCRYPTION_KEY` zurückfallen, wird kryptografisch mit eigenem Zweckkontext abgeleitet. Bei Nutzung des vorhandenen Clients dort nur die neue Weiterleitungsadresse ergänzen; keine YouTube-Weiterleitungsadresse entfernen.

## Daten- und Zugriffsschutz

Nur bestätigte PRO-/PREMIUM-Mitglieder beziehungsweise berechtigte Admins können die Verbindung benutzen. Geschützte Projektbereiche behalten ihre zusätzliche Zugriffskontrolle. Die Benutzerkennung kommt aus der bestätigten Firebase-Anmeldung, nicht aus dem Request-Body. OAuth verlangt nur den Search-Console-Lese-Scope und übernimmt keine YouTube-Berechtigungen. Signierter, kurzlebiger OAuth-State und ein HttpOnly/Secure/SameSite-Lax-Nonce-Cookie binden den Rückweg an die Browsersitzung. Keine Zugangstokens im Browser oder in Projektfeldern.

Refresh-Tokens liegen AES-256-GCM-verschlüsselt und an die Benutzerkennung gebunden in `academySearchConsoleConnections/{uid}`. Der bestehende Firestore-Standardausschluss blockiert alle direkten Clientzugriffe auf diese Sammlung. Zugriff erfolgt ausschließlich serverseitig über ADC. Ein Mitglied kann dadurch keine Verbindung eines anderen Mitglieds lesen. Beim Trennen wird diese gespeicherte Search-Console-Verbindung gelöscht; gespeicherte Reports bleiben datierte Momentaufnahmen. Der Google-Grant beziehungsweise die getrennte YouTube-Verbindung werden nicht pauschal widerrufen.

## Status und Grenzen

- **KI-Vorschlag:** Ohne zugeordneten Suchdatenreport liegen keine gemessenen Belege vor.
- **Suchdaten vorhanden:** Die genaue Suchanfrage (Groß-/Kleinschreibung ausgenommen) hat im angezeigten Report positive Impressionen. Das ist keine allgemeine Suchvolumenschätzung.
- **Noch ungeprüft:** Ein vorhandener Report belegt den aktuellen Begriff nicht oder gehört zu einer anderen Website. Das bedeutet weder „keine Nachfrage“ noch „schlechtes Keyword“.

Im Briefing erhalten auch die Long-Tail-Suchphrasen diese Zuordnung. Neue automatisch generierte Begriffe außerhalb dieses geprüften Reports bleiben Vorschläge. Die gespeicherten Messwerte werden nicht als allgemeines Marktvolumen ausgegeben und nicht als vollständiger Report in den Long-Tail-Generierungsprompt aufgenommen.

Diese erste Anbindung unterstützt die bewusste Auswahl im Briefing. Bestehende automatische Komplettläufe werden nicht stillschweigend auf einen beliebigen erfolgreichen Website-Suchbegriff umgestellt und weiterhin nicht durch eine universelle Pflichtprüfung blockiert. Neue Themen benötigen weiterhin eine zusätzliche Nachfrageprüfung; **Keyword Planner ist nicht angebunden**. Keine Rankings, Suchvolumen oder Erfolgsgarantien aus Search-Console-Daten ableiten.

## Validierung

`node --import tsx scripts/auditSearchConsole.ts` prüft OAuth-Scope/State/Cookie-Grundlagen, verschlüsselte Kontentrennung, passende Properties und URL-Filter, Pacific-Zeiträume, echte und fehlende Messfelder, leere Reports und Google-Fehler sowie tatsächliche UI-Handler für Laden/Auswählen/Speichern und Schutz bei zwischenzeitlichem Projektwechsel. Die externen Google-/Firestore-Antworten sind simuliert. Echte Nutzerdaten werden erst nach Google-Einrichtung und persönlicher Freigabe geprüft.

Primärquellen:

- https://developers.google.com/webmaster-tools/v1/how-tos/authorizing
- https://developers.google.com/webmaster-tools/v1/sites/list
- https://developers.google.com/webmaster-tools/v1/searchanalytics/query

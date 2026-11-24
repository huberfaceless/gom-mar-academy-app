# Google Keyword Planner im Inhaltsbriefing

Zusätzlich zu Search Console zeigt **Nachfrage neuer Themen prüfen** Google-Ads-Suchvolumenschätzungen. Zwei manuelle Modi:

- **Vorhandene Keywords prüfen:** bis zu 50 Haupt-/Long-Tail-Suchphrasen über `generateKeywordHistoricalMetrics`.
- **Neue Keyword-Ideen entdecken:** bis zu 20 Startbegriffe über `generateKeywordIdeas`, maximal 100 Ergebnisse. Weitere Seiten werden als begrenzt ausgewiesen.

Sprache folgt dem Projekt (DE/EN/PL). Zielregionen sind Deutschland, Österreich und/oder Schweiz, standardmäßig DE + AT. Google-Suche ohne Suchpartner. Explizit angefragt werden die letzten zwölf vollständigen UTC-Kalendermonate. Der Report nennt angefragten Zeitraum, Abrufzeit, Regionen, Sprache, Modus und Quelle; tatsächliche Monatswerte können fehlen und sind separat aufklappbar. Schätzungen sind keine genauen Messungen oder versprochenen Besucherzahlen. Anzeigenwettbewerb ist keine organische SEO-Schwierigkeit. Zusammengefasste Varianten bleiben einer Ergebniszeile zugeordnet, werden nicht addiert und nicht als eigene exakte Messung ausgegeben. Fehlende Werte bleiben `null`, einschließlich nicht zurückgegebener Suchphrasen; explizite Google-Nullen bleiben 0 Suchanfragen als Schätzung.

Die bewusste Übernahme verändert das Hauptkeyword bzw. ergänzt eine Long-Tail-Suchphrase. Titel, Gliederung und Artikel werden nicht automatisch umgeschrieben. Der datierte Report wird mit dem Briefing gespeichert. Der Long-Tail-Editor unterscheidet Google-Schätzung, zusammengefasste Variante, Search-Console-Beleg und ungeprüfte Begriffe. Report-Metadaten werden nicht in die Long-Tail-Generierungsanfrage aufgenommen. Automatische Komplettläufe bleiben unverändert; keine automatische Bestätigung erfundener Volumen oder garantierter Nachfrage.

## Einmalige Einrichtung

1. Google Ads API im Cloud-Projekt des OAuth-Clients aktivieren; **Basic / Grundlegend** inklusive Keyword-Recherche freischalten. Explorer genügt für Keyword-Planung nicht.
2. Im bestehenden Web-OAuth-Client diese weitere autorisierte Weiterleitungsadresse eintragen:
   `https://academy.gomo-marketing.at/api/keyword-planner/oauth/callback`
3. Consent-Setup für `https://www.googleapis.com/auth/adwords` berücksichtigen. Google bietet hier keinen speziellen Keyword-Readonly-Scope an. Die Oberfläche erklärt den umfassenden Scope; die Implementation verwendet nur die beiden Keyword-Abfragen, keinerlei Anzeigen-/Kampagnenmutation. Gegebenenfalls App-/Testnutzer- bzw. Google-Verifikation abschließen.
4. In der Academy Google Ads verbinden. Das Google-Konto benötigt Zugriff auf die eingetragene Ads-Kundennummer. Optional bei Zugriff über ein Verwaltungskonto dessen `login-customer-id` ergänzen.
5. Keywords und Regionen prüfen, Daten laden, Quelle/Zeitraum und passende Begriffe prüfen, dann ausdrücklich auswählen.

Konfiguration (optional dediziert): `KEYWORD_PLANNER_OAUTH_CLIENT_ID`, `KEYWORD_PLANNER_OAUTH_CLIENT_SECRET`, `KEYWORD_PLANNER_TOKEN_ENCRYPTION_KEY`, `KEYWORD_PLANNER_OAUTH_REDIRECT_URI`. Ohne dediziertes Client-Paar wird das bestehende YouTube-Client-Paar verwendet, der Verschlüsselungsschlüssel kann auf `YOUTUBE_TOKEN_ENCRYPTION_KEY` zurückfallen. Teilweise gesetzte dedizierte Clientdaten werden nicht mit einem fremden Client ergänzt. **Keine Kundennummer wird im Quellcode als allgemeiner Standard hinterlegt**. Kundennummern werden im Formular eingegeben und im gespeicherten Report wieder angeboten. Keine Schlüssel oder Tokens im Formular.

Google hat Developer Tokens am 9. September 2026 abgeschafft. Die Berechtigung folgt dem OAuth-Cloud-Projekt; es wird kein Developer Token angefordert oder gesendet. API-Version v26.

## Sicherheit und Grenzen

Bestätigte PRO-Mitglieder/berechtigte Admins, bestehende Projektzugriffskontrolle, Firebase-UID ausschließlich aus der verifizierten Anmeldung. Signierter 10-Minuten-OAuth-State und browsersitzungsgebundener HttpOnly/Secure/SameSite-Lax-Nonce-Cookie. Refresh-Token AES-256-GCM-verschlüsselt mit UID-AAD und eigenem Zweckkontext, serverseitig in `academyKeywordPlannerConnections/{uid}`. Firestore-Clientzugriff durch vorhandenen Default-Deny ausgeschlossen; Serverzugriff über ADC. Search-Console- und YouTube-Verbindungen werden nicht überschrieben oder pauschal widerrufen. Trennen entfernt nur die eigene gespeicherte Planner-Verbindung; Briefing-Reports bleiben Momentaufnahmen.

Eingabe-Whitelist für Länder, Sprache, Abfragemodus, Kundennummern und begrenzte Keywords. Ausschließlich feste Google-Endpunkte. Ungeprüfte Google-Fehlertexte/Tokens werden nicht an den Browser weitergegeben. Pro Serverprozess 30 Sekunden Abstand für neue Anfragen je Mitglied; identische Ergebnisse bis zu 24 Stunden kontogetrennt gecacht (maximal 100 Einträge). Der Cache ist kein globaler verteilter Rate-Limiter. Bei Projekt-/Themenwechseln während einer Abfrage wird deren Antwort verworfen; fehlgeschlagene Cloud-Speicherung wird als Fehler angezeigt. Kein Livekonto-Zugriff ohne individuellen OAuth-Grant.

## Validierung

`node --import tsx scripts/auditKeywordPlanner.ts` prüft Request-Payloads beider Modi, IDs/Regionen/Sprache, fehlende Werte und Nullwerte, Variantenzuordnung, verschlüsselte kontogetrennte Tokens, State/Nonce, Kontozugriffsfehler, Caching, Guards, tatsächliche UI-Handler und erfolglose Cloud-Speicherung/Projektwechsel. Externe Antworten sind simuliert. Zusätzlich TypeScript, Build, bestehende Search-Console-, Long-Tail-, Sprach- und Themenübergabeprüfungen. Echte Google-Zustimmung und Kontoabfrage erst nach Deployment und Einrichtung prüfen.

Primärquellen:
- https://developers.google.com/google-ads/api/docs/keyword-planning/generate-keyword-ideas
- https://developers.google.com/google-ads/api/reference/rpc/v26/GenerateKeywordHistoricalMetricsRequest
- https://developers.google.com/google-ads/api/reference/rpc/v26/KeywordPlanHistoricalMetrics
- https://developers.google.com/google-ads/api/docs/api-policy/developer-token
- https://developers.google.com/google-ads/api/docs/api-policy/access-levels
- https://developers.google.com/google-ads/api/rest/auth

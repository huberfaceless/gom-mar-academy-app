# Vorbereitung: PRO mit sechs Monaten Mindestlaufzeit

Noch nicht aktivieren. Das bestehende Managed-Payments-Angebot bleibt aktiv, solange STRIPE_PRO_SIX_MONTH_ENABLED nicht exakt true ist. Bestehende Abos werden nicht umgeschrieben. Ein Tarifwechsel in Firestore ist keine Stripe-Kündigung.

## Verhalten des neuen Tarifs

29,90 EUR monatlicher Gesamtpreis, sechs Monate Mindestlaufzeit, Mindestgesamtpreis 179,40 EUR. Danach unbefristete Fortsetzung mit monatlicher Abrechnung. Kündigung jederzeit erklärbar: vor Ablauf der sechs Monate zum Ende der Mindestlaufzeit, danach zum Ende des bezahlten Monats, ohne zusätzliche Kündigungsfrist. Gesetzlicher Widerruf und außerordentliche Rechte bleiben bestehen. Zugang endet über den bestehenden Stripe-Löschungswebhook, nicht beim Vormerken.

Vertragsversion und Zustimmungszeitpunkt werden an der Checkout-Session hinterlegt; die Version außerdem an der Subscription. Bei Zahlung geht eine Vertragsbestätigung mit dem vollständigen Text an die Checkout-E-Mail. Ein Fehler bei der Übergabe löst einen Webhook-Retry aus (doppelte Bestätigung bei Retries möglich).

Die Mindestlaufzeit gilt nur für neue Standard-Billing-Subscriptions mit passender Vertragsversion. Neue Kundenobjekte verhindern den Zugriff über alte, bereits erzeugte Portal-Sessions. Standard-Billing und Managed Payments können für unterschiedliche Bestandsabos parallel bestehen.

## Vor Aktivierung zwingend prüfen

1. Neue separate Standard-Billing-Testpreise und später Live-Preise: 2990 Cent EUR, tax_behavior=inclusive, recurring.interval=month, interval_count=1, gültiger Produkt-Steuercode. Variable STRIPE_PRO_SIX_MONTH_PRICE_ID. Nicht den bisherigen Managed-Payments-Preis ersetzen.
2. Stripe Tax, steuerliche Registrierung, Rechnungssteller und Kleinunternehmer-/Umsatzsteuerstatus prüfen. Bei Standard Billing ist GomMar selbst Verkäufer und für Umsatzsteuer verantwortlich; automatische Steuerberechnung ersetzt keine Registrierung oder Abfuhr. Stefan hat die österreichische Kleinunternehmerbefreiung bestätigt. Der neue Gesamtpreis bleibt 29,90 EUR; bei anwendbarer Befreiung darf keine Umsatzsteuer ausgewiesen werden. Die bisherigen Managed-Payments-Rechnungen haben einen anderen Verkäufer und sind dadurch nicht automatisch falsch. Befreiung, EU-Auslandsumsätze und etwaige Registrierungen müssen vor Aktivierung konkret mit Stripe Tax geprüft werden.
3. Separates Portal (STRIPE_PRO_SIX_MONTH_PORTAL_ID): Rechnungen und Zahlungsdaten erlaubt, subscription_cancel=false, subscription_update=false, login_page=false. Öffentliche Portal-Loginlinks sämtlicher aktiver Konfigurationen deaktivieren. Die API prüft Preis und Portal vor Checkout und Portalöffnung; bei mehr als 100 Konfigurationen wird vorsorglich blockiert.
4. Widerrufspfad /withdrawal/ ohne Login erreichbar, Daten in academyContractWithdrawals nur serverseitig. SendGrid-Konfiguration prüfen. Bestätigung an Verbraucher, Kopie an huber@gomo-marketing.at. Fehlgeschlagene E-Mails werden mit receiptStatus=failed gespeichert und müssen nachversandt werden. Kündigung/Rückzahlung bei wirksamem Widerruf erfolgt nach Prüfung manuell im Stripe-Dashboard; nicht über die Sechsmonats-Kündigungsfunktion. Die Erklärung ist bei Speicherung eingegangen, auch wenn E-Mail fehlschlägt.
5. Vertragstexte vor Aktivierung prüfen: Anbieterangaben, konkrete Leistungen, Gewährleistungs- und Aktualisierungspflichten, sofortiger Leistungsbeginn, Widerruf. Es wird auf einen Widerrufsverzicht und anteilige Nutzungskosten verzichtet. Der Entwurf beansprucht keine abschließende rechtliche Prüfung. Ergänzungen bei der Einordnung als digitale Dienstleistung bleiben möglich.
6. Checkout-Settings in Stripe: /terms/ als eigene AGB-Adresse und /privacy/ als eigene Datenschutz-Adresse hinterlegen. Öffentliche Datenschutzseite für Standard Billing sowie Widerrufsdaten aktualisieren. Die Widerrufsfunktion ist in der öffentlichen Navigation und im Rechtsfenster sichtbar verlinkt. Beide Datenschutzansichten sind um Zahlungs- und Widerrufsdaten ergänzt; konkret vereinbarte Drittlandübermittlungsgarantien bleiben vor Aktivierung zu prüfen.
7. Testmodus-End-to-End: Vertragsannahme, tatsächlicher Checkout-Text, Tax, erster und wiederkehrender Einzug, Bestätigungs-E-Mail, Kündigung im ersten Monat, sechs Monatsrechnungen mit Test Clock, kein siebter Einzug bei Kündigung, Rückstufung erst am Enddatum, Bestandsabo unverändert, Widerruf samt Bestätigung und Erstattung. Sonderfall Monatsende und Schaltjahr prüfen.
8. Erst nach den Prüfungen und ausdrücklicher Freigabe STRIPE_PRO_SIX_MONTH_ENABLED=true setzen. Keine bestehenden Abos nachträglich binden. Direkte Stripe-Dashboard-Kündigungen und gesetzliche Sonderfälle bleiben möglich.

## Bestätigte Stripe-Testkonfiguration (7. Oktober 2026)

Nur in einer getrennten Testumgebung mit Stripe-Testschlüssel und Test-Webhook verwenden:

```env
STRIPE_PRO_SIX_MONTH_PRICE_ID=price_1UNwPmAWdsglo18nKe8PUFOA
STRIPE_PRO_SIX_MONTH_PORTAL_ID=bpc_1UNx02AWdsglo18nAa70tUCI
STRIPE_PRO_SIX_MONTH_ENABLED=false
```

Die vom Betreiber übermittelten Portal-Daten bestätigen `livemode=false`, `subscription_cancel.enabled=false`, `subscription_update.enabled=false`, `login_page.enabled=false` und die Rückleitung zu https://academy.gomo-marketing.at. Die Portal-Aktivität und die vollständige Konfiguration werden zusätzlich durch die API vor Verwendung geprüft. Die IDs sind keine geheimen Schlüssel. Sie dürfen nicht in die produktive Live-Konfiguration übernommen werden.

Für einen echten Checkout-Test muss zuerst eine getrennte Testbereitstellung mit Testschlüssel, passendem Test-Webhook und Testdaten eingerichtet werden. Erst dort den Schalter auf `true` setzen. Die lokalen Audits verwenden simulierte Stripe-Antworten und ersetzen keinen echten Stripe-Checkout oder Test-Clock-Durchlauf.

## Getrennte Testbereitstellung

Vorbereitet: `Dockerfile.stripe-test` baut mit einer öffentlichen Firebase-Webkonfiguration aus `stripe-test-firebase.json` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId). Diese Datei wird erst für die Bereitstellung mit der Konfiguration des neuen Testprojekts angelegt; keine Stripe- oder SendGrid-Schlüssel darin hinterlegen. Für einen Quellbuild muss in einer temporären Kopie der Test-Dockerfile als `Dockerfile` eingesetzt werden. Den produktiven Dockerfile nicht ersetzen.

Der Testserver startet nur mit `ACADEMY_ENVIRONMENT=stripe-test`, separatem `VITE_FIREBASE_PROJECT_ID`, passendem Test-Frontend-Build, `STRIPE_SECRET_KEY=sk_test_…`, eigenem `STRIPE_WEBHOOK_SECRET=whsec_…` und `ACADEMY_PUBLIC_URL` der Testbereitstellung. Der Dienstname `gom-mar-academy` und die produktive Rückleitungsadresse sind dabei gesperrt. Live-Webhook-Ereignisse werden in der Testumgebung zurückgewiesen.

Für die getrennte Bereitstellung erforderlich: separates Firebase-Projekt mit E-Mail-/Passwort-Anmeldung, Firestore und passenden Regeln; Test-Domain als autorisierte Firebase-Domain; separater Cloud-Run-Dienst `gom-mar-academy-stripe-test` mit einer Dienstidentität, die nur auf die Testdaten Zugriff hat; Stripe-Test-Webhook zur Test-URL und Secret-Manager-Einträge für dessen Geheimnisse. Für Vertrags- und Widerrufsbestätigungen ist zusätzlich ein freigegebener SendGrid-Absender erforderlich. Keine Produktionskonfiguration oder Produktions-Secrets pauschal kopieren. Keine Cloud-Scheduler-Jobs für die Testbereitstellung anlegen.

Zusätzlicher lokaler Audit: `node --import tsx scripts/auditStripeTestEnvironment.ts`.

## Prüfbefehle für den Vertrag

npm run lint; npm run build; node --import tsx scripts/auditStripeManagedPayments.ts; node --import tsx scripts/auditProSubscriptionContract.ts.

Die öffentliche Widerrufseingabe ist kurzzeitig pro IP begrenzt und erfordert gültige Eingaben. Sie ist keine Authentifizierung des Vertragsinhabers und beendet deshalb niemals automatisch fremde Verträge.


## Manuell bestätigte Tests am 8.–9. Oktober 2026

Die isolierte Umgebung wurde bereitgestellt: Firebase/GCP `gom-mar-academy-test-20261007`, Firestore `(default)` in `us-west1`, Cloud Run `gom-mar-academy-stripe-test`, separate Dienstidentität und drei Secrets für Stripe, Webhook und SendGrid. URL: https://gom-mar-academy-stripe-test-884543939966.us-west1.run.app. Keine produktiven Mitgliederdaten verwendet.

Vom Betreiber bestätigt: Registrierung und Verifizierungs-E-Mail, Vertragsannahme im Profil, erfolgreicher Test-Checkout, PRO-Zugang, vorgemerkte Kündigung zum 8. April 2027 bei fortbestehendem Zugang, Kundenportal und erste bezahlte Rechnung, Vertragsbestätigungs-E-Mail, öffentlicher Widerruf mit Bestätigungs-E-Mail. Nach manueller Erstattung und unmittelbarer Stripe-Kündigung wurde der Academy-Zugang auf FREE zurückgestuft. Passwort-Reset am 9. Oktober: E-Mail angekommen, neues Passwort erfolgreich gesetzt.

Separater Stripe-Dashboard-Test mit Test Clock `clock_1UOMQeAWdsglo18nftBoRoVx`: monatliches Standard-Billing-Testabo für den Kunden „Sechsmonatstest“, Beginn 8. Oktober 2026, vorgemerkte Beendigung 8. April 2027 um 20:44 MESZ. Monatlich vorgespult bis 9. April 2027. Screenshot der vollständigen gefilterten Rechnungsliste bestätigt genau sechs bezahlte Rechnungen ATZFGWJI-0002 bis ATZFGWJI-0007, jeweils 29,90 EUR (179,40 EUR insgesamt), keine siebte Rechnung. Abschließender Screenshot bestätigt Status „Storniert“ und Ende am 8. April 2027 um 20:44.

Dieser separat im Dashboard angelegte Vertrag bestätigt Stripes Abrechnung und die geplante Beendigung. Er ersetzt keinen Academy-Test-Clock-End-to-End-Test mit Firebase-Zuordnung und Rückstufung am simulierten Enddatum. Die tatsächliche Academy-Rückstufung wurde mit der unmittelbaren Testkündigung geprüft. Die unveränderte Behandlung von Bestandsabos sowie Monatsende und Schaltjahr sind lokal geprüft; ein produktiver Bestandsabo-Test bleibt offen.

Vor Live-Aktivierung bleiben die oben aufgeführten Live-Preis-/Portal-, Steuer-, Vertrags- und Konfigurationsprüfungen erforderlich. Der Schalter bleibt standardmäßig aus. Die Test-IDs sind ausschließlich für die Testumgebung bestimmt.

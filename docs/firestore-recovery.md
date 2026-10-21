# Firestore-Störungen bei Veröffentlichungen

Lesende Firestore-Aufrufe für Publishing Queue, einzelne Aufträge, Projektsynchronisierung und E-Mail-Kampagnen versuchen HTTP 502/503/504 sowie Verbindungsfehler höchstens dreimal. Zwischen den Versuchen liegen etwa 0,5 und 1 Sekunde mit Zufallsanteil; jeder Abruf hat ein Zeitlimit von acht Sekunden. Fehler wie fehlende Berechtigungen oder Versionskonflikte werden nicht blind wiederholt.

Die Ergebnisspeicherung wiederholt ausschließlich denselben durch `currentDocument.updateTime` geschützten Schreibvorgang. Nach einer vorübergehenden Störung wird zuerst neu gelesen: Ist das Ergebnis bereits identisch gespeichert, gilt die Speicherung als erfolgreich. Bei einer fremden Änderung wird abgebrochen. Die externe Veröffentlichung wird innerhalb dieser Wiederholung nie aufgerufen.

Ein Auftrag mit abgelaufener Veröffentlichungssperre wird nicht erneut veröffentlicht: Der frühere Worker könnte bereits erfolgreich gewesen sein. Der Server setzt den Auftrag versionsgeschützt auf `FAILED` mit `publicationUncertain: true`, erhält die bisherige Sperrinformation und meldet `PUBLICATION_UNCERTAIN`. Kalender und Wiederholungs-Endpunkt sperren den Neustart; die Oberfläche fordert zur Prüfung des Plattformprofils auf. Das gilt auch für alte Aufträge ohne Ergebnisnachweis.

Diese konservative Behandlung kann auch einen noch nicht veröffentlichten Auftrag anhalten, etwa nach einem Absturz direkt nach der Reservierung. Vor jeder weiteren Aktion muss deshalb das Plattformprofil geprüft werden. Eine automatische Auflösung oder allgemeine Garantie eines exakt einmaligen Versands wird damit nicht eingeführt. Bestehende E-Mail-Versandreservierungen bleiben unverändert.

Fehlgeschlagene Publishing- oder E-Mail-Durchläufe kennzeichnen das Ergebnis mit `sweepFailed` beziehungsweise `emailSweepFailed`. Die Scheduler-Endpunkte antworten dann mit HTTP 503 und `success: false`. Ein einzelner endgültig fehlgeschlagener Auftrag ist weiterhin ein bearbeitetes Auftragsergebnis und wird gesondert protokolliert.

Prüfung: `node --import tsx scripts/auditFirestoreRecovery.ts`. Der Test verwendet die echte Queue, Worker- und Veröffentlichungssteuerung mit simulierten Zugangsdaten, Firestore-Antworten und Plattformaufrufen. Er deckt insbesondere Anbietererfolg mit anschließendem Speicherfehler, verlorene Schreibantworten, Versionskonflikte und den nächsten Durchlauf nach Ablauf der Sperre ab.

Referenz: https://firebase.google.com/docs/firestore/use-rest-api (Fehlerbehandlung, exponentielle Wiederholung bei UNAVAILABLE).

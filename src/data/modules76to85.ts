import { Stage } from '../types';

export const MODULES_76_TO_85: Stage[] = [
  {
    id: 76,
    title: '76. Enterprise SaaS Architektur & Multi-Tenancy',
    subtitle: 'Microservices, Multi-Tenant Datenbanken, SOC-2 Compliance & SLA-Garantien',
    color: 'from-blue-700 via-indigo-800 to-slate-900',
    badgeIcon: '☁️',
    description: 'Transformiere dein Business in ein skalierbares Softwareunternehmen: Lerne, wie du hochverfügbare Multi-Tenant SaaS-Plattformen entwickelst, 99.99% Verfügbarkeits-SLAs garantierst und SOC-2/ISO-27001 Sicherheitsaudits für Großkunden bestehst.',
    lessons: [
      {
        id: '76.1',
        stageId: 76,
        stageTitle: '76. Multi-Tenant Architektur & Isolation',
        title: 'Multi-Tenancy & Datenisolierung: Pool vs. Silo Datenbank-Modelle',
        durationMinutes: 34,
        description: 'Wie du Daten mehrerer Unternehmenskunden sicher trennst, Row-Level Security (RLS) einsetzt und Tenant-Migrationen ohne Downtime durchführst.',
        learnContent: {
          videoTitle: 'Masterclass: Enterprise Multi-Tenant SaaS-Architektur',
          videoDuration: '34:20',
          summaryText: 'Ein Enterprise-Kunde kauft deine Software nur, wenn seine Daten absolut isoliert und gegen Zugriffe anderer Mandanten geschützt sind. Lerne die Vor- und Nachteile von Shared-Database-Modellen mit RLS gegenüber dedizierten Tenant-Clustern kennen.',
          bulletPoints: [
            'Tenant-Isolation: Row-Level Security (RLS) in PostgreSQL vs. Schema-per-Tenant vs. Database-per-Tenant',
            'Noisy Neighbor Problem: Wie du Rate-Limiter und Tenant-spezifische CPU-Quotas setzt',
            'Zero-Downtime Migrationen: Schema-Updates im laufenden Betrieb bei Millionen aktiver Datensätze',
            'Global Edge Routing: Dynamische Zuordnung von Subdomains (kunde.app.com) zu Mandanten-Instanzen'
          ],
          coreConcepts: [
            {
              iconName: 'database',
              title: 'ROW-LEVEL SECURITY',
              description: 'Datenbankseitige Garantie, dass Mandanten nur ihre eigenen Daten sehen.',
              highlight: true
            },
            {
              iconName: 'server',
              title: 'NOISY NEIGHBOR SHIELD',
              description: 'Automatische Drosselung verhindert, dass ein Großkunde alle Serverressourcen blockiert.'
            }
          ],
          resources: [
            {
              title: 'Enterprise Multi-Tenancy Architecture Whitepaper',
              subtitle: 'RLS & Datenisolierungs-Konzepte als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Tenant Management Cockpit',
              subtitle: 'Mandanten-Quotas, API-Keys und Datenbank-Status zentral monitoren',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur moderner B2B-SaaS Plattformen

Skalierbarkeit und Sicherheit sind die Fundamente für 6-stellige Enterprise-Verträge.

#### Die 3 Isolations-Stufen:
1. **Shared Database / Shared Schema**: Kostengünstig, perfekt für KMU-Tier – abgesichert durch Postgres RLS.
2. **Shared Database / Separate Schema**: Höhere Trennung für Mid-Market Kunden.
3. **Dedicated Database**: Vollständige physische Trennung für DAX-Konzerne und regulierte Industrien (FinTech, Health).`
        },
        understandContent: {
          coreTakeaway: 'Wer Datenisolierung auf Datenbankebene verankert, schließt Sicherheitslücken im Code automatisch aus.',
          keyPrinciples: [
            'Niemals Mandanten-Filter nur in der Anwendungslogik prüfen – die Datenbank muss unberechtigte Abfragen selbst blockieren',
            'Regelmäßige automatisierte Penetration-Tests für Mandantentrennung durchführen'
          ]
        },
        actionTask: {
          instruction: 'Definiere deine Multi-Tenant Isolations-Strategie:',
          inputType: 'checklist',
          checklistItems: [
            'Datenbank-Isolationsmodell (RLS oder Schema-Trennung) festgelegt',
            'Tenant-Routing für Subdomains im Load Balancer konfiguriert',
            'Automatisiertes Backup- & Wiederherstellungskonzept pro Mandant definiert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '76.2',
        stageId: 76,
        stageTitle: '76. SOC-2, ISO 27001 & Enterprise SLAs',
        title: 'Enterprise Compliance: SOC-2 Type II, ISO 27001 & 99.99% SLAs',
        durationMinutes: 32,
        description: 'Wie du die Sicherheitsfragen von Konzern-Einkäufern souverän beantwortest, Compliance-Zertifikate erwirbst und Ausfallzeiten vertraglich absicherst.',
        learnContent: {
          videoTitle: 'Masterclass: SOC-2 Zertifizierung & Enterprise Vendor Risk Management',
          videoDuration: '32:40',
          summaryText: 'Ein 100.000€ Jahresvertrag scheitert fast immer am Vendor-Security-Fragebogen der IT-Sicherheitsabteilung. Erfahre, wie du SOC-2 Type II Audits automatisierst und SLAs mit 99.99% Uptime anbietest.',
          bulletPoints: [
            'Die Trust Services Criteria: Sicherheit, Verfügbarkeit, Vertraulichkeit, Integrität und Datenschutz',
            'Automatisierte Compliance-Plattformen: Vanta & Drata zur lückenlosen Beweissammlung',
            'Incident Response & Disaster Recovery: Notfallpläne mit maximal 15 Minuten RTO (Recovery Time Objective)',
            'SLA-Vertragsstrafen: Wie du Service-Credits staffelst, ohne dein Unternehmen finanziell zu gefährden'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'SOC-2 TYPE II',
              description: 'Der Goldstandard für Enterprise-Sicherheit und Vertrauen bei US- und Großkonzernen.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: '99.99% SLA UPTIME',
              description: 'Maximal 52 Minuten ungeplante Ausfallzeit pro Jahr durch Multi-Region Redundanz.'
            }
          ],
          resources: [
            {
              title: 'Enterprise Vendor Security Questionnaire & SLA-Muster',
              subtitle: '100 Standard-Antworten für Konzern-Audits als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Status-Page & SLA Monitor',
              subtitle: 'Öffentliche Uptime-Monitore für Kunden und Einkäufer schalten',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Wie du Enterprise Vendor Audits meisterst

Konzernkunden haben strikte Vorgaben. Wenn du die Antworten parat hast, überspringst du monatelange Verhandlungsschleifen.

#### Die wichtigsten Compliance-Bausteine:
- **End-to-End Verschlüsselung**: AES-256 at Rest und TLS 1.3 in Transit.
- **Rollenbasierte Zugriffskontrolle (RBAC)**: Least-Privilege Prinzip für alle Mitarbeiter.
- **Penetration Test Report**: Jährlich aktualisierter Bericht eines unabhängigen Prüfinstituts.`
        },
        understandContent: {
          coreTakeaway: 'Compliance ist kein lästiger Papierkram, sondern der stärkste Hebel für 6-stellige ACVs (Annual Contract Values).',
          keyPrinciples: [
            'Single Sign-On (SAML/Okta) immer als teures Add-on oder nur im Enterprise-Plan anbieten',
            'Audits durch automatisierte Tools ganzjährig aktuell halten'
          ]
        },
        actionTask: {
          instruction: 'Bereite dein Enterprise-Sicherheitspaket vor:',
          inputType: 'checklist',
          checklistItems: [
            'Standardisierter Sicherheitsfragebogen (SIG / CAIQ) ausgefüllt hinterlegt',
            'SLA-Konditionen und Service-Credit-Matrix im Vertragswerk definiert',
            'Status-Page für Uptime-Monitoring öffentlich geschaltet'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 77,
    title: '77. Autonome KI-Agenten & Multi-Agent Workflows',
    subtitle: 'LangGraph, AutoGen, ReAct-Loops, Function Calling & Autonome Firmen-Abteilungen',
    color: 'from-emerald-600 via-teal-700 to-cyan-900',
    badgeIcon: '🤖',
    description: 'Ersetze manuelle Workflows durch autonome KI-Agenten: Baue miteinander kommunizierende Agenten-Netzwerke auf, die Marktrecherchen durchführen, Code schreiben, Angebote kalkulieren und Kundenanfragen selbstständig abschließen.',
    lessons: [
      {
        id: '77.1',
        stageId: 77,
        stageTitle: '77. Agentische Architekturen & ReAct',
        title: 'Autonome Agenten: Thought-Action-Observation Loops & Function Calling',
        durationMinutes: 36,
        description: 'Wie Agenten Werkzeuge (APIs, Datenbanken, Web-Search) dynamisch nutzen, Denkprozesse strukturieren und komplexe Aufgaben selbstständig lösen.',
        learnContent: {
          videoTitle: 'Masterclass: Autonome KI-Agenten & Tool-Use Architektur',
          videoDuration: '36:15',
          summaryText: 'Ein einfacher Chatbot antwortet nur; ein KI-Agent handelt eigenständig in der realen Welt. Erfahre, wie du ReAct-Loops (Reasoning + Acting) aufsetzt, damit der Agent APIs aufruft, Fehler analysiert und Aufgaben ohne menschliches Eingreifen vollendet.',
          bulletPoints: [
            'ReAct-Architektur: Thought (Planung), Action (Werkzeugaufruf) und Observation (Ergebnisanalyse)',
            'Structured Output & Function Calling: Wie LLMs zuverlässig JSON an interne Schnittstellen übergeben',
            'Self-Correction Loops: Wenn ein API-Call fehlschlägt, korrigiert der Agent seine Parameter selbstständig',
            'Memory Systems: Short-Term Buffer, Vector Embeddings (Episodisches Gedächtnis) und Entity Knowledge Graphs'
          ],
          coreConcepts: [
            {
              iconName: 'cpu',
              title: 'REACT LOOPS',
              description: 'Kontinuierliche Schleife aus Nachdenken, Werkzeugnutzung und Nachjustierung.',
              highlight: true
            },
            {
              iconName: 'database',
              title: 'VECTOR MEMORY',
              description: 'Langzeitgedächtnis über semantische Einbettungen in Vektordatenbanken.'
            }
          ],
          resources: [
            {
              title: 'Autonomous AI Agent Architecture Guide',
              subtitle: 'Prompting-Muster, Tool-Schemas und Flowcharts als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Autonomous Agent Hub',
              subtitle: 'Eigene KI-Agenten mit CRM-Tools und Web-Suche verknüpfen',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'ai'
            }
          ],
          fullArticleGuide: `### Vom Sprachmodell zum handlungsfähigen Agenten

KI-Agenten transformieren die Unternehmensproduktivität, indem sie mehrstufige operative Aufgaben autonom übernehmen.

#### Die 4 Säulen eines robusten KI-Agenten:
1. **System Prompt & Persona**: Klare Rollendefinition und strikte Sicherheitsgrenzen.
2. **Tool Registry**: Präzise definierte JSON-Schemas für alle zugänglichen Funktionen.
3. **Execution Engine**: Sandboxed Ausführungsumgebung für API-Calls und Code-Generierung.
4. **Guardrails**: Filter gegen Halluzinationen und unerwünschte Endlosschleifen.`
        },
        understandContent: {
          coreTakeaway: 'Ein Agent ist nur so gut wie die Werkzeuge und Schemas, die du ihm zur Verfügung stellst.',
          keyPrinciples: [
            'Immer ein maximales Iterations-Limit (z. B. 10 Schritte) setzen, um Endlosschleifen zu verhindern',
            'Kritische Aktionen (z. B. Geldüberweisungen, finale Verträge) immer mit einem "Human-in-the-Loop" Freigabeschritt absichern'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deinen ersten autonomen Recherche-Agenten:',
          inputType: 'checklist',
          checklistItems: [
            'System Prompt mit klarem ReAct-Instruktionssatz formuliert',
            '2 Tools (Websuche und CRM-Lead-Eintragung) per JSON-Schema angebunden',
            'Human-in-the-Loop Freigabeschwelle für finale E-Mails aktiviert'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '77.2',
        stageId: 77,
        stageTitle: '77. Multi-Agent Systeme & Team-Orchestrierung',
        title: 'Multi-Agent Netzwerke: Spezialisierte Agenten-Teams (Manager, Researcher, Coder, Critic)',
        durationMinutes: 33,
        description: 'Wie du komplexe Unternehmensbereiche durch hierarchische Agenten-Netzwerke automatisierst, die sich gegenseitig kontrollieren und verbessern.',
        learnContent: {
          videoTitle: 'Masterclass: Multi-Agent Orchestrierung mit LangGraph & AutoGen',
          videoDuration: '33:45',
          summaryText: 'Ein einzelner Agent scheitert an komplexen Projekten. Ein Team aus spezialisierten Agenten (z. B. Analyst, Stratege, Texter, Qualitätsprüfer) liefert Ergebnisse auf Weltklasse-Niveau, weil sie sich gegenseitig Korrektur lesen.',
          bulletPoints: [
            'Hierarchische Orchestrierung: Ein "Supervisor Agent" delegiert Teilaufgaben an Fachagenten',
            'Der "Critic-in-the-Loop": Ein Reviewer-Agent prüft jeden Entwurf anhand von 10 Qualitätskriterien vor der Freigabe',
            'State-Machine Workflows: Klare Zustandsübergänge und bedingte Pfade mit LangGraph',
            'Kosten-Optimierung: Günstige Modelle (Flash/Haiku) für Vorarbeiten, Spitzenmodelle (Pro/Opus) für finale Synthese'
          ],
          coreConcepts: [
            {
              iconName: 'users',
              title: 'AGENT SWARMS',
              description: 'Spezialisierte Kleinteams liefern präzisere Ergebnisse als Allrounder-Prompts.',
              highlight: true
            },
            {
              iconName: 'check-circle',
              title: 'AUTOMATED CRITIC',
              description: 'Eingebaute Gegenprüfung eliminiert Fehler und Halluzinationen vor Auslieferung.'
            }
          ],
          resources: [
            {
              title: 'Multi-Agent Team Orchestration Blueprint',
              subtitle: 'LangGraph Flow-Diagramme & Supervisor-Prompts als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Multi-Agent Studio',
              subtitle: 'Agenten-Teams für Marketing-, Sales- und Support-Workflows zusammenstellen',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'ai'
            }
          ],
          fullArticleGuide: `### Die Architektur autonomer Firmen-Abteilungen

Mit Multi-Agent-Systemen baust du virtuelle Teams, die rund um die Uhr arbeiten.

#### Das 4-Rollen Modell für Content-Produktion:
- **Researcher-Agent**: Sucht aktuelle Studien und Branchen-News.
- **Copywriter-Agent**: Schreibt den ersten strukturierten Entwurf.
- **Editor/Critic-Agent**: Prüft Tonfall, Grammatik und Fakten und gibt Verbesserungswünsche zurück.
- **Publisher-Agent**: Formatiert und veröffentlicht den Beitrag nach Freigabe.`
        },
        understandContent: {
          coreTakeaway: 'Wer Agenten in wechselseitigen Review-Schleifen arbeiten lässt, erreicht menschliche Qualitätsstandards bei 100-facher Geschwindigkeit.',
          keyPrinciples: [
            'Jeder Agent darf nur eine einzige, scharf umrissene Kernaufgabe besitzen',
            'Zwischenergebnisse immer in einem gemeinsamen, versionierten State-Objekt speichern'
          ]
        },
        actionTask: {
          instruction: 'Erstelle einen 3-stufigen Multi-Agenten Workflow:',
          inputType: 'checklist',
          checklistItems: [
            'Supervisor-, Ausführungs- und Review-Agenten im Multi-Agent Studio angelegt',
            'Kritik-Kriterienkatalog für den Reviewer-Agenten definiert',
            'Testlauf mit automatischer Feedback-Schleife erfolgreich abgeschlossen'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  {
    id: 78,
    title: '78. Strategisches IP, Patente & Markenschutz',
    subtitle: 'Markenrecht (DPMA/EUIPO), Patentrecherchen, Trade Secrets & Lizenz-Monetarisierung',
    color: 'from-amber-600 via-orange-700 to-zinc-900',
    badgeIcon: '🛡️',
    description: 'Sichere deine Marktposition durch rechtliche Schutzwälle: Schütze deine Markennamen international, baue Patente und Gebrauchsmuster für proprietäre Algorithmen auf und lizenziere deine Methoden für passive Royalty-Einnahmen.',
    lessons: [
      {
        id: '78.1',
        stageId: 78,
        stageTitle: '78. Markenrecht & Internationale Registrierung',
        title: 'Markenstrategie: DPMA, EUIPO & WIPO (Madrid System) Markenschutz',
        durationMinutes: 31,
        description: 'Wie du Nizza-Klassen strategisch wählst, Ähnlichkeitsrecherchen durchführst und Abmahnungen sowie Markenpiraterie abwehrst.',
        learnContent: {
          videoTitle: 'Masterclass: Internationale Markenanmeldung & Markenschutz',
          videoDuration: '31:20',
          summaryText: 'Ein erfolgreicher Markenname ohne Markeneintragung ist eine tickende Zeitbombe. Lerne, wie du Wort- und Bildmarken in Deutschland, der EU und weltweit schützt und Konkurrenten per Unterlassungserklärung stoppen kannst.',
          bulletPoints: [
            'Wortmarke vs. Wort-Bildmarke: Warum reine Wortmarken den stärksten rechtlichen Schutz bieten',
            'Die Nizza-Klassifikation: Strategische Auswahl relevanter Klassen für Software (9), Beratung (35) und Bildung (41)',
            'Kollisions-Recherche: Ähnliche Marken in TMview und DPMA-Register vor der Anmeldung aufspüren',
            'Das WIPO Madrid System: Mit einer einzigen Basisanmeldung weltweit in über 120 Ländern Schutz beantragen'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'WORD MARK SUPREMACY',
              description: 'Reine Wortmarken schützen den Namen unabhängig von Schriftart oder Logo-Design.',
              highlight: true
            },
            {
              iconName: 'globe',
              title: 'WIPO MADRID PROTOCOL',
              description: 'Effiziente globale Schutzrechtsausweitung aus einer Hand.'
            }
          ],
          resources: [
            {
              title: 'Markenanmeldung Leitfaden & Nizza-Klassen Leitfaden',
              subtitle: 'Schritt-für-Schritt Anleitung für DPMA & EUIPO als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Brand Asset Manager',
              subtitle: 'Markenurkunden, Fristen und Schutzrechte zentral überwachen',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Absicherung deiner wichtigsten Vermögenswerte

Eine eingetragene Marke erhöht den Wert deines Unternehmens beim Verkauf um bis zu 40%.

#### Der 4-Stufen Markenschutz-Prozess:
1. **Identitäts- & Ähnlichkeitsrecherche**: Keine Verwechslungsgefahr mit bestehenden Marken im selben Markt.
2. **Klassen-Auswahl**: Nicht zu eng fassen – zukünftige Produktlinien mit abdecken.
3. **Anmeldung bei DPMA/EUIPO**: Elektronische Einreichung und Gebührenzahlung.
4. **Widerspruchsfrist überwachen**: 3 Monate nach Veröffentlichung auf Einwände Dritter achten.`
        },
        understandContent: {
          coreTakeaway: 'Wer frühzeitig Wortmarken anmeldet, sichert sich uneinholbare Monopolrechte auf seine Begriffe.',
          keyPrinciples: [
            'Niemals rein beschreibende Begriffe (z. B. "Bester Marketing Kurs") anmelden – sie werden wegen fehlender Unterscheidungskraft abgewiesen',
            'Eine Markenüberwachung (Monitoring) einrichten, um neue ähnliche Anmeldungen sofort anzufechten'
          ]
        },
        actionTask: {
          instruction: 'Führe eine Kollisionsprüfung für deine Hauptmarke durch:',
          inputType: 'checklist',
          checklistItems: [
            'TMview und DPMA-Register nach identischen und ähnlichen Wortmarken durchsucht',
            'Relevante Nizza-Klassen (z. B. 9, 35, 41, 42) für dein Portfolio definiert',
            'Markenüberwachungs-Workflow im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '78.2',
        stageId: 78,
        stageTitle: '78. IP-Lizenzierung & Geschäftsgeheimnisse',
        title: 'Lizenzierungs-Modelle: Eigene Frameworks & Methoden profitabel lizenzieren',
        durationMinutes: 30,
        description: 'Wie du White-Label Lizenzen, Zertifizierungs-Franchises und Geschäftsgeheimnisse (Trade Secrets nach GeschGehG) monetarisierst.',
        learnContent: {
          videoTitle: 'Masterclass: IP-Lizenzverträge & Geschäftsgeheimnisschutz',
          videoDuration: '30:35',
          summaryText: 'Verkaufe nicht nur deine Zeit, sondern lizenziere deine erprobten Methoden an andere Agenturen und Berater. Lerne, wie du wasserdichte Lizenzverträge schreibst und Know-how nach dem Geschäftsgeheimnisgesetz rechtssicher schützt.',
          bulletPoints: [
            'Lizenzvertrags-Typen: Exklusiv, Nicht-Exklusiv und Sole License mit Mindestlizenzgebühren',
            'Royalty-Modelle: Feste Monatsgebühr vs. prozentuale Umsatzbeteiligung (3-8% vom Bruttoumsatz)',
            'Geschäftsgeheimnisgesetz (GeschGehG): Warum Know-how nur geschützt ist, wenn "angemessene Geheimhaltungsmaßnahmen" nachgewiesen werden',
            'Audit-Rechte: Das vertragliche Recht, die Bücher des Lizenznehmers einmal jährlich durch Wirtschaftsprüfer zu kontrollieren'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'ROYALTY ENGINE',
              description: 'Reine Lizenzgebühren haben 95%+ Gewinnmarge ohne operative Lieferkosten.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'TRADE SECRET SHIELD',
              description: 'Rechtlicher Schutz geheimer Algorithmen und interner Prozess-Handbücher.'
            }
          ],
          resources: [
            {
              title: 'Master IP-Lizenzvertrag & Geheimhaltungsvereinbarung',
              subtitle: 'Rechtlich geprüfte Vertragsmuster als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Licensee Portal',
              subtitle: 'Lizenznehmer, Umsatzzahlen und automatische Royalty-Abrechnungen verwalten',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Der Weg zum hochprofitablen Lizenzgeschäft

Wenn deine Methode belegbare Resultate liefert, wollen andere Dienstleister deine Marke und dein System nutzen.

#### Wichtige Bestandteile eines Lizenzvertrags:
- **Territorium**: Geografische Begrenzung (z. B. DACH-Region oder Postleitzahlen-Exklusivität).
- **Qualitätsstandards**: Pflicht zur Einhaltung deiner Qualitätsrichtlinien bei Kündigungsandrohung.
- **Wettbewerbsverbot**: Verbot, während und 2 Jahre nach Vertragsende ähnliche Systeme anzubieten.`
        },
        understandContent: {
          coreTakeaway: 'Lizenzverträge verwandeln Know-how in wiederkehrende, hochmargige Cashflows.',
          keyPrinciples: [
            'Immer Mindestumsätze oder Mindestgebühren vereinbaren, damit exklusive Lizenzen nicht brachliegen',
            'Alle internen SOPs mit klaren Vertraulichkeitsvermerken (Confidential) kennzeichnen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle dein Lizenzierungs-Angebot:',
          inputType: 'checklist',
          checklistItems: [
            'Lizenzpaket (Handbücher, Software-Zugang, Markennutzung) strukturiert',
            'Royalty-Modell mit Mindestgarantie und Abrechnungsintervallen kalkuliert',
            'Lizenzvertrag-Vorlage durch Fachanwalt für gewerblichen Rechtsschutz prüfen lassen'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 79,
    title: '79. Global Franchising & Systemgastronomie-Skalierung',
    subtitle: 'Franchise-Handbuch, FDD, Gebührenstrukturen (Upfront + Royalties) & Filial-Auditierung',
    color: 'from-amber-700 via-red-800 to-zinc-900',
    badgeIcon: '🏪',
    description: 'Skaliere physische Standorte und Dienstleistungskonzepte weltweit über Franchising: Baue unzerstörbare Franchise-Handbücher, gestalte Franchise Disclosure Documents (FDD) und steuere hunderte Partner-Filialen über standardisierte Qualitätsaudits.',
    lessons: [
      {
        id: '79.1',
        stageId: 79,
        stageTitle: '79. Franchise-Architektur & Gebührenmodelle',
        title: 'Das Franchise-System: Franchise-Gebühr, Ongoing Royalties & Werbefonds',
        durationMinutes: 32,
        description: 'Wie du ein profitables Pilot-Konzept in ein Franchise-Modell übersetzt, Einstiegsgebühren kalkulierst und Marketing-Umlagen einziehst.',
        learnContent: {
          videoTitle: 'Masterclass: Franchise-Systemarchitektur & Partnergewinnung',
          videoDuration: '32:30',
          summaryText: 'Ein Franchise-Geber baut nicht jeden Laden selbst, sondern liefert das schlüsselfertige Erfolgsrezept an motivierte Unternehmer vor Ort. Erfahre, wie du 25.000€ bis 50.000€ Einstiegsgebühr und 5-8% monatliche Umsatz-Royalties realisierst.',
          bulletPoints: [
            'Der Franchise-Finanzmix: Upfront Fee (Einstieg), Ongoing Royalty (Betreuung) und Marketing Fund (1-2% für globale Werbung)',
            'Der Pilot-Betrieb: Warum ein Konzept erst nach mindestens 2 Jahren nachweislicher Profitabilität multipliziert werden darf',
            'Gebietsschutz-Zonierung: Einwohnerdichte und Pendlerströme als Basis für exklusive Vertriebsgebiete',
            'Franchise-Lead-Funnel: Wie du kapitalkräftige Betreiber und Quereinsteiger über gezielte B2B-Kampagnen gewinnst'
          ],
          coreConcepts: [
            {
              iconName: 'dollar-sign',
              title: 'THREE-TIER FEES',
              description: 'Kombination aus Einstiegsgebühr, laufenden Royalties und zentralem Werbefonds.',
              highlight: true
            },
            {
              iconName: 'map-pin',
              title: 'TERRITORY PROTECTION',
              description: 'Exklusive Postleitzahlen-Zonierung verhindert Kannibalisierung zwischen Partnern.'
            }
          ],
          resources: [
            {
              title: 'Franchise Financial Model & Gebühren-Kalkulator',
              subtitle: 'ROI-Planung für Franchisegeber und Franchisenehmer als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Franchise Expansion Hub',
              subtitle: 'Bewerbungs-Pipeline für Franchise-Interessenten verwalten',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Der Bauplan für ein globales Franchise-Netzwerk

Franchising ist die schnellste Methode zur physischen und regionalen Marktdurchdringung ohne eigenes Investitionskapital.

#### Die Phasen der Franchise-Expansion:
1. **Pilotbetrieb**: Perfektionierung aller Arbeitsschritte in den eigenen 2-3 Filialen.
2. **Franchise-Handbuch**: Detaillierte Dokumentation jedes Handgriffs (vom Empfang bis zum Kassenabschluss).
3. **Erste 5 Partner**: Intensive Betreuung der Pioniere, um Case Studies aufzubauen.
4. **Skalierung**: Multi-Unit-Franchisenehmer gewinnen, die gleich 3 bis 5 Standorte auf einmal eröffnen.`
        },
        understandContent: {
          coreTakeaway: 'Der Erfolg des Franchisegebers hängt zu 100% vom wirtschaftlichen Erfolg seiner Franchisenehmer ab.',
          keyPrinciples: [
            'Niemals Partner nur wegen der Einstiegsgebühr annehmen – ungeeignete Betreiber zerstören die Marke',
            'Den Werbefonds auf einem separaten Treuhandkonto führen und transparent für globale Kampagnen nutzen'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deine Franchise-Gebühren und Partner-Voraussetzungen:',
          inputType: 'checklist',
          checklistItems: [
            'Einstiegsgebühr, laufende Royalty und Marketingfonds-Prozentsatz kalkuliert',
            'Anforderungsprofil für Franchisenehmer (Eigenkapital, Erfahrung) definiert',
            'Franchise-Bewerbungsformular im Mara CRM erstellt'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '79.2',
        stageId: 79,
        stageTitle: '79. Operations Manual & Mystery Audits',
        title: 'Das Betriebs-Handbuch (Operations Manual) & Mystery Shopping Audits',
        durationMinutes: 31,
        description: 'Wie du ein 300-Seiten Systemhandbuch aufbaust, standardisierte Schulungen durchführst und Filialen über Mystery-Shopper kontrollierst.',
        learnContent: {
          videoTitle: 'Masterclass: Franchise Operations Manual & Qualitäts-Audits',
          videoDuration: '31:40',
          summaryText: 'Ein McDonald\'s Burger schmeckt in Tokio genauso wie in Frankfurt, weil das Betriebs-Handbuch keine Abweichungen erlaubt. Lerne, wie du SOPs digitalisierst, Partner schult und Qualitätsstandards durch Mystery-Audits durchsetzt.',
          bulletPoints: [
            'Das digitale Operations Manual: Video-SOPs, Rezepte, Kundenservice-Skripte und Beschwerdemanagement',
            'Zentrales Warenwirtschaftssystem (ERP): Pflichtbezug von Kernprodukten zur Qualitätssicherung und Marge',
            'Mystery Shopping Audits: Unangekündigte Qualitätsprüfungen anhand einer 100-Punkte Scorecard',
            'Abmahn- und Kündigungsprozesse: Rechtssichere Trennung von Partnern bei Verstößen gegen Markenstandards'
          ],
          coreConcepts: [
            {
              iconName: 'book-open',
              title: 'OPERATIONS MANUAL',
              description: 'Die unanfechtbare "Bibel" deines Unternehmens für ausnahmslos alle Abläufe.',
              highlight: true
            },
            {
              iconName: 'check-circle',
              title: 'MYSTERY AUDITING',
              description: 'Verdeckte Tests garantieren einheitliche Kundenbegeisterung an allen Standorten.'
            }
          ],
          resources: [
            {
              title: 'Operations Manual Inhaltsverzeichnis & Audit-Scorecard',
              subtitle: 'Standard-Struktur für Systemhandbücher als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Franchise Learning Management System',
              subtitle: 'Digitale Schulung und Zertifizierung für Mitarbeiter aller Filialen',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Qualitätskontrolle in dezentralen Netzwerken

Ohne strikte Standardisierung verkommt jedes Franchise-System in kürzester Zeit zu einem Flickenteppich.

#### Die Säulen des Qualitätsmanagements:
- **Onboarding-Academy**: Jeder neue Franchisenehmer absolviert eine 4-wöchige Intensivschulung.
- **Zertifizierte Mitarbeiter**: Nur geschultes Personal darf Kunden bedienen.
- **Monatliche Kennzahlen-Audits**: Kundenzufriedenheits-Scores (NPS) und Wareneinsatz-Quoten vergleichen.`
        },
        understandContent: {
          coreTakeaway: 'Absolute Standardisierung ist das einzige Geheimnis hinter globalen Ketten mit tausenden Standorten.',
          keyPrinciples: [
            'Jede Abweichung vom Handbuch muss sofort schriftlich gerügt werden',
            'Erfolgreiche Best Practices von Partnern ins zentrale Handbuch für alle aufnehmen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle die Struktur deines digitalen Systemhandbuchs:',
          inputType: 'checklist',
          checklistItems: [
            'Hauptkapitel des Franchise-Handbuchs (Eröffnung, Betrieb, Marketing, HR) angelegt',
            'Audit-Prüfbogen für Filial-Inspektionen erstellt',
            'Partner-Schulungsbereich in der Academy hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 80,
    title: '80. Private Debt, Mezzanine Capital & Venture Debt',
    subtitle: 'Nicht-verwässerndes Wachstumskapital, Covenants, Warrants & Revenue-Based Financing',
    color: 'from-zinc-800 via-stone-800 to-amber-900',
    badgeIcon: '🏦',
    description: 'Finanziere exponentielles Wachstum ohne Unternehmensanteile abzugeben: Meistere Private Debt, Venture Debt, Mezzanine-Kapital und umsatzbasierte Finanzierungen (Revenue-Based Financing), um Marketingbudgets und Zukäufe gehebelt zu skalieren.',
    lessons: [
      {
        id: '80.1',
        stageId: 80,
        stageTitle: '80. Venture Debt & Warrants',
        title: 'Venture Debt: Fremdkapital-Hebel für wachstumsstarke Digitalunternehmen',
        durationMinutes: 33,
        description: 'Wie Venture-Debt-Fonds Kredite strukturieren, was Equity Kicker (Warrants) bedeuten und wie du deinen Cash-Runway verlängerst.',
        learnContent: {
          videoTitle: 'Masterclass: Venture Debt & Nicht-verwässernde Finanzierung',
          videoDuration: '33:10',
          summaryText: 'Wer für Marketing oder Inventar teure Unternehmensanteile an VCs verkauft, verschenkt Millionen beim Exit. Erfahre, wie du Venture Debt als Ergänzung nutzt, um Bewertungssprünge vor der nächsten Eigenkapitalrunde ohne Verwässerung zu erreichen.',
          bulletPoints: [
            'Venture Debt Mechanik: 2 bis 4 Jahre Laufzeit, tilgungsfreie Anlaufphase (Interest-Only Period) und Zinsen von 8-14%',
            'Equity Kicker (Warrants): Einräumung von Bezugsrechten auf Unternehmensanteile (1-2% Verwässerung statt 20%)',
            'Financial Covenants: Mindestliquiditäts-Vorgaben und Runway-Klauseln verstehen und verhandeln',
            'Einsatzbereiche: Vorfinanzierung von Werbeausgaben mit berechenbarem CAC-zu-LTV Verhältnis'
          ],
          coreConcepts: [
            {
              iconName: 'trending-up',
              title: 'NON-DILUTIVE LEVERAGE',
              description: 'Wachstumskapital ohne massiven Verlust von Stimmrechten und Firmenanteilen.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'WARRANT MINIMIZATION',
              description: 'Niedrige Equity-Kicker schonen die Cap-Table für den finalen Exit.'
            }
          ],
          resources: [
            {
              title: 'Venture Debt Term Sheet & Covenant Guide',
              subtitle: 'Wichtige Klauseln & Zinsberechnungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Debt & Runway Calculator',
              subtitle: 'Zinslast, Tilgungspläne und Cashflow-Auswirkungen simulieren',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die strategische Nutzung von Venture Debt

Venture Debt ist der Treibstoff für Firmen, die bereits über verlässliche Unit Economics verfügen.

#### Wann Venture Debt sinnvoll ist:
- **Zwischenfinanzierung (Bridge)**: Erreichen der nächsten Bewertungsstufe für eine 3x höhere Series-A Bewertung.
- **Akquisitionsfinanzierung**: Kauf eines Konkurrenten, dessen Cashflow den Kredit selbst bedient.
- **Inventar & Media-Spend**: Vorfinanzierung von Kampagnen mit bewiesenem Return on Ad Spend (ROAS).`
        },
        understandContent: {
          coreTakeaway: 'Nutze Venture Debt nur, wenn dein Customer Lifetime Value (LTV) die Kundengewinnungskosten (CAC) um mindestens das 3-fache übersteigt.',
          keyPrinciples: [
            'Niemals Covenants akzeptieren, die bei einem leichten Umsatzrückgang sofort zur Fälligstellung des Kredits führen',
            'Stets eine tilgungsfreie Zeit von mindestens 6 bis 12 Monaten verhandeln'
          ]
        },
        actionTask: {
          instruction: 'Kalkuliere deinen Fremdkapital-Bedarf und Zinsdienst:',
          inputType: 'checklist',
          checklistItems: [
            'Kapitalbedarf für die nächsten 18 Monate anhand von CAC und LTV ermittelt',
            'Zins- und Tilgungsplan im Debt Calculator simuliert',
            'Liste von 5 spezialisierten Debt-Fonds und Banken recherchiert'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '80.2',
        stageId: 80,
        stageTitle: '80. Revenue-Based Financing & Mezzanine',
        title: 'Revenue-Based Financing & Mezzanine-Kapital: Rückzahlung gekoppelt an den Monatsumsatz',
        durationMinutes: 30,
        description: 'Wie moderne RBF-Plattformen (Pipe, Wayflyer) funktionieren und wie Mezzanine-Darlehen bilanziell als wirtschaftliches Eigenkapital wirken.',
        learnContent: {
          videoTitle: 'Masterclass: Revenue-Based Financing & Mezzanine-Strukturen',
          videoDuration: '30:45',
          summaryText: 'Feste monatliche Kreditraten können in schwachen Monaten das Genick brechen. Revenue-Based Financing passt die Rückzahlung dynamisch an: In starken Monaten zahlst du mehr, in schwachen weniger. Erfahre, wie du diese Flexibilität nutzt.',
          bulletPoints: [
            'Revenue-Based Financing (RBF): Rückzahlung von 5-10% der täglichen/monatlichen Umsatzerlöse bis zur Erreichung eines Caps (z. B. 1.15x)',
            'Keine persönlichen Bürgschaften: Bonitätsprüfung erfolgt vollautomatisiert über API-Anbindung an Stripe und Bankkonten',
            'Mezzanine-Kapital: Nachrangdarlehen, die das Rating bei Hausbanken verbessern und Eigenkapitalquoten stärken',
            'Stille Beteiligungen: Gewinnabhängige Vergütung ohne Mitspracherechte im Tagesgeschäft'
          ],
          coreConcepts: [
            {
              iconName: 'repeat',
              title: 'FLEXIBLE REPAYMENT',
              description: 'Rückzahlungsraten atmen synchron mit deinem realen Monatsumsatz.',
              highlight: true
            },
            {
              iconName: 'layers',
              title: 'MEZZANINE BUFFER',
              description: 'Wirtschaftliches Eigenkapital verbessert deine Kreditwürdigkeit bei Banken massiv.'
            }
          ],
          resources: [
            {
              title: 'Revenue-Based Financing vs. Equity Vergleichsmatrix',
              subtitle: 'Effektive Kosten & Gesamtkostenanalyse als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Payment API Health Connect',
              subtitle: 'Stripe- und Bank-Schnittstellen für RBF-Finanzierungsfreigaben vorbereiten',
              type: 'tool',
              iconName: 'link',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Flexibilität umsatzbasierter Finanzierung

RBF ist ideal für SaaS- und E-Commerce-Unternehmen mit wiederkehrenden, verifizierbaren Umsätzen.

#### Die Funktionsweise in 3 Schritten:
1. **API-Connect**: Verknüpfe dein Stripe-, Shopify- und Bankkonto.
2. **Kreditangebot in 48 Stunden**: Erhalte ein Angebot über 100.000€ bis 2.000.000€ ohne Businessplan-Präsentation.
3. **Automatischer Einzug**: Die RBF-Plattform zieht täglich automatisch den vereinbarten Prozentsatz (z. B. 6%) deines Umsatzes ein.`
        },
        understandContent: {
          coreTakeaway: 'Umsatzbasierte Finanzierung schützt vor Liquiditätsengpässen in saisonalen Flauten.',
          keyPrinciples: [
            'Den effektiven Jahreszins (APR) genau prüfen – RBF ist bei extrem schnellem Wachstum teurer als klassische Kredite',
            'Niemals mehrere RBF-Anbieter gleichzeitig stapeln (Stacking), um Überschuldung zu vermeiden'
          ]
        },
        actionTask: {
          instruction: 'Prüfe deine Eignung für Revenue-Based Financing:',
          inputType: 'checklist',
          checklistItems: [
            'Monatlich wiederkehrende Umsätze (MRR) und Churn-Rate sauber aufbereitet',
            'Stripe- und Bankdaten für automatisierte Bonitätsprüfung bereitgestellt',
            'Vergleich zwischen RBF-Gebühr (Cap 1.1x-1.2x) und Bankkredit durchgeführt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 81,
    title: '81. Programmatic Advertising & Private Marketplace (PMP) Deals',
    subtitle: 'DSP, SSP, Real-Time Bidding (RTB), First-Party Data Clean Rooms & Direct Deals',
    color: 'from-violet-700 via-purple-800 to-zinc-900',
    badgeIcon: '📡',
    description: 'Schalte Werbung wie die weltgrößten Media-Agenturen: Verlasse die geschlossenen Werbenetzwerke von Meta und Google und kaufe Premium-Werbeplätze über Demand-Side-Platforms (DSP), Private Marketplaces (PMP) und Programmatic Direct Deals.',
    lessons: [
      {
        id: '81.1',
        stageId: 81,
        stageTitle: '81. DSP, SSP & Real-Time Bidding',
        title: 'Programmatic Bidding: Demand-Side Platforms (The Trade Desk, DV360) & OpenRTB',
        durationMinutes: 34,
        description: 'Wie Real-Time Bidding in Millisekunden abläuft, wie du DSPs aufsetzt und Werbeplätze auf tausenden Premium-Websites automatisiert ersteigerst.',
        learnContent: {
          videoTitle: 'Masterclass: Programmatic Advertising & DSP-Kampagnenführung',
          videoDuration: '34:25',
          summaryText: 'Während Anfänger nur im Facebook Ads Manager klicken, nutzt die Elite des Performance-Marketings DSPs wie The Trade Desk. Lerne, wie du weltweit Inventare auf News-Portalen, Streaming-Diensten und Apps millisekundengenau einkaufst.',
          bulletPoints: [
            'Das Programmatic-Ökosystem: DSP (Einkauf), SSP (Verkauf der Publisher), Ad Exchange und Ad Server',
            'Der OpenRTB Auktionsprozess: Bid Requests, Cookie-Matching und Zuschlag in unter 100 Millisekunden',
            'Hyper-Targeting: Geofencing, Gerätekennungen, Wetter-Trigger und kontextuelle Seitenanalyse',
            'Fraud-Prevention: Wie du Bot-Traffic und Click-Fraud mit Tools wie MOAT und DoubleVerify eliminierst'
          ],
          coreConcepts: [
            {
              iconName: 'cpu',
              title: 'DEMAND-SIDE PLATFORM',
              description: 'Zentraler Einkauf von Werbeinventar über Millionen von Publishern weltweit.',
              highlight: true
            },
            {
              iconName: 'shield-check',
              title: 'AD FRAUD FILTERING',
              description: 'Mehrstufige Kontrollen können Bot- und Betrugsrisiken reduzieren, aber nicht vollständig ausschließen.'
            }
          ],
          resources: [
            {
              title: 'Programmatic Media Buying Master-Handbuch',
              subtitle: 'Bidding-Strategien & DSP Setup-Guide als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Programmatic Pixel & Audience Hub',
              subtitle: 'First-Party Zielgruppen für DSPs und Ad Exchanges exportieren',
              type: 'tool',
              iconName: 'share-2',
              actionUrl: 'marketing'
            }
          ],
          fullArticleGuide: `### Der Einstieg in den offenen Werbemarkt

Programmatic Advertising gibt dir die Kontrolle über deine Mediainvestitionen zurück – unabhängig von den Algorithmen einzelner Tech-Giganten.

#### Die wichtigsten Bidding-Strategien:
- **vCPM (Viewable CPM)**: Du zahlst nur, wenn die Anzeige nach IAB-Standard mindestens 1 Sekunde lang zu 50% im sichtbaren Bereich war.
- **dCPA (Dynamic CPA)**: Die DSP optimiert die Gebote in Echtzeit auf tatsächliche Conversions.
- **Frequency Capping**: Verhindert Werbeermüdung, indem ein Nutzer die Anzeige maximal 3 Mal pro Woche sieht.`
        },
        understandContent: {
          coreTakeaway: 'Wer Programmatic beherrscht, skaliert Kampagnen über die Grenzen einzelner Plattformen hinweg auf unbegrenztes weltweites Inventar.',
          keyPrinciples: [
            'Immer strikte Brand-Safety Filter aktivieren, damit Anzeigen nicht neben fragwürdigen Inhalten erscheinen',
            'Regelmäßig Publisher-Domain-Whitelists pflegen und unrentable Websites konsequent ausschließen'
          ]
        },
        actionTask: {
          instruction: 'Richte deine First-Party Audience für Programmatic Advertising ein:',
          inputType: 'checklist',
          checklistItems: [
            'First-Party Zielgruppen-Segmentierung im CRM abgeschlossen',
            'Brand-Safety Whitelist mit den 200 wichtigsten Branchen-Websites erstellt',
            'Frequency-Capping auf maximal 3 Impressionen pro Tag limitiert'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '81.2',
        stageId: 81,
        stageTitle: '81. PMP Deals & Data Clean Rooms',
        title: 'Private Marketplace (PMP) Deals, Programmatic Guaranteed & Data Clean Rooms',
        durationMinutes: 31,
        description: 'Wie du exklusive Direct Deals mit Großverlagen (Spiegel, Forbes, NZZ) schließt und Kundendaten datenschutzkonform abgleichst.',
        learnContent: {
          videoTitle: 'Masterclass: PMP Deals & Datenschutzkonforme Data Clean Rooms',
          videoDuration: '31:50',
          summaryText: 'Die besten Werbeplätze landen niemals in der offenen Auktion. Verlage vergeben ihre Premium-Flächen über PMP-Deals (Deal-IDs) an ausgewählte Partner. Erfahre, wie du diese Deals verhandelst und Zielgruppen über Data Clean Rooms abgleichst.',
          bulletPoints: [
            'Deal-Typen: Preferred Deals (fester Preis, nicht garantiert) vs. Programmatic Guaranteed (garantiertes Volumen)',
            'Deal-ID Konfiguration: Wie du verhandelte Konditionen in deiner DSP mit 1 Klick aktivierst',
            'Data Clean Rooms: Verschlüsselter First-Party-Datenabgleich ohne Weitergabe personenbezogener Daten (DSGVO-konform)',
            'Post-Cookie Ära: Identity-Lösungen wie Unified ID 2.0 (UID2) und Privacy Sandbox'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'PRIVATE MARKETPLACE',
              description: 'Exklusiver Zugang zu Premium-Werbeflächen vor allen anderen Bietern.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'DATA CLEAN ROOMS',
              description: 'Kontrollierter Zielgruppenabgleich kann Datenrisiken reduzieren, ersetzt aber keine DSGVO-Prüfung.'
            }
          ],
          resources: [
            {
              title: 'PMP Deal Verhandlungs-Leitfaden & Deal-ID Vorlagen',
              subtitle: 'Musterschreiben für Verlags-Verhandlungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR UID2 Identity Bridge',
              subtitle: 'Cookielose Werbe-Identifikatoren kontrolliert prüfen und verwalten',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Wie du Premium-Verlage direkt buchst

Mit PMP-Deals sicherst du dir Top-Platzierungen zu Großkunden-Konditionen.

#### Der Ablauf eines PMP-Deals:
1. **Verlags-Kontakt**: Kontaktiere das Programmatic-Sales-Team des Publishers.
2. **Konditionen vereinbaren**: Floor-Preis (z. B. 4,50€ eCPM) und Platzierungs-Garantie aushandeln.
3. **Deal-ID Erstellung**: Der Verlag generiert eine 12-stellige Deal-ID in seiner SSP.
4. **Kampagnenstart**: Du trägst die Deal-ID in deine DSP ein und schaltest die Kampagne live.`
        },
        understandContent: {
          coreTakeaway: 'PMP-Deals kombinieren die Exklusivität klassischer Mediaplanung mit der Geschwindigkeit programmatischer Aussteuerung.',
          keyPrinciples: [
            'Immer ein Testbudget von 2.000€ vereinbaren, bevor du langfristige Mindestabnahmen zusagst',
            'Auf garantierte Sichtbarkeitsraten (Viewability > 70%) im Vertrag bestehen'
          ]
        },
        actionTask: {
          instruction: 'Bereite deinen ersten Private Marketplace Deal vor:',
          inputType: 'checklist',
          checklistItems: [
            'Liste von 5 relevanten Fach- und Wirtschaftsverlagen für Zielkunden recherchiert',
            'Deal-Anfrage-Template für Verlagsansprache formuliert',
            'Identity- oder Clean-Room-Workflow rechtlich und technisch geprüft'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 82,
    title: '82. High-End Event-Funnels & Ultra-VIP Masterminds',
    subtitle: '10k€-25k€ Ticketpreise, Luxus-Locations, Bewerbungs-Funnels & Vor-Ort Closing',
    color: 'from-amber-600 via-yellow-700 to-stone-900',
    badgeIcon: '✨',
    description: 'Plane hochwertige Masterminds und Events mit transparenter Preisgestaltung: Entwickle faire Bewerbungsprozesse, wähle passende Locations und biete geeigneten Teilnehmern freiwillige, klar definierte Folgeprogramme an.',
    lessons: [
      {
        id: '82.1',
        stageId: 82,
        stageTitle: '82. VIP-Event Bewerbungs-Funnels',
        title: 'Der Ultra-VIP Event-Funnel: 15.000€ Masterminds ausverkaufen',
        durationMinutes: 33,
        description: 'Wie du echte Kapazitätsgrenzen, transparente Bewerbungsverfahren und persönliche Gespräche nutzt, um eine fachlich passende Teilnehmergruppe zusammenzustellen.',
        learnContent: {
          videoTitle: 'Masterclass: High-Ticket Event-Funnels & Exklusive Masterminds',
          videoDuration: '33:30',
          summaryText: 'Hochpreisige Event-Tickets erfordern ein klares Leistungsversprechen, nachprüfbare Ergebnisse, transparente Kosten und persönliche Beratung. Lerne, wie du geeignete Unternehmer informierst, fair qualifizierst und ohne künstlichen Druck entscheiden lässt.',
          bulletPoints: [
            'Echte Exklusivität: Begrenzte Betreuungskapazität und nachvollziehbare Auswahlkriterien transparent erklären',
            'Der 4-stufige Eignungscheck: Ziele, Entwicklungsstand, Beitrag zur Gruppe und realistische Erwartungen',
            "Der Peer-Group-Nutzen: Wie moderierter Erfahrungsaustausch messbaren Wert schaffen kann",
            'Concierge-Onboarding: Persönlicher Fahrer, 5-Sterne Hotel-Suiten und maßgeschneiderte VIP-Geschenkboxen vorab'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'PEER-GROUP GRAVITY',
              description: 'Kunden zahlen nicht für den Vortrag, sondern für die Exklusivität des Raumes.',
              highlight: true
            },
            {
              iconName: 'user-check',
              title: 'APPLICATION FILTER',
              description: 'Strenge Auswahl erhöht die Attraktivität und verhindert unpassende Teilnehmer.'
            }
          ],
          resources: [
            {
              title: 'Ultra-VIP Mastermind Bewerbungs-Funnel Template',
              subtitle: 'Fragebögen, Qualifizierungs-Leitfäden und Concierge-Checklisten als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM VIP Event Manager',
              subtitle: 'Bewerber-Status, Hotel-Zimmer und Ticket-Zahlungen verwalten',
              type: 'tool',
              iconName: 'calendar',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Anatomie eines 500.000€ Mastermind-Events

Ein Event mit 20 Teilnehmern zu je 15.000€ hätte 300.000€ Bruttoticketerlös; Gewinn und Folgeumsatz hängen jedoch von Auslastung, Steuern, Rückerstattungen, Vertriebs- und Durchführungskosten sowie tatsächlicher Nachfrage ab.

#### Die Phasen der Event-Vorbereitung:
1. **Location-Scouting**: Privatanwesen in St. Moritz, Mallorca, Dubai oder der Toskana – keine anonymen Konferenzhotels.
2. **Private Einladungsrunde**: Gezielte persönliche Video-Botschaften an bestehende Top-Kunden.
3. **Öffentliche Bewerbungsphase**: Ein klar kommuniziertes Zeitfenster, das nur bei echter organisatorischer Frist begrenzt wird.
4. **15-Minuten Auswahl-Calls**: Prüfung der Teilnehmerharmonie und finale Zusage.`
        },
        understandContent: {
          coreTakeaway: 'Der Wert eines VIP-Events bemisst sich an den Personen, die im Raum sitzen.',
          keyPrinciples: [
            'Niemals Personen zulassen, die nur zum Verkaufen kommen – das vergiftet die Atmosphäre',
            'Alle Details (Catering, Shuttles, Aktivitäten) lückenlos durchplanen'
          ]
        },
        actionTask: {
          instruction: 'Konzipiere dein erstes Ultra-VIP Mastermind-Event:',
          inputType: 'checklist',
          checklistItems: [
            'Event-Thema, Location-Kategorie und Ticketpreis (z. B. 12.500€) festgelegt',
            'Bewerbungs-Fragebogen mit Umsatz- und Eignungsfiltern im CRM aufgesetzt',
            'Concierge-Service-Ablauf für Teilnehmer-Betreuung definiert'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '82.2',
        stageId: 82,
        stageTitle: '82. Vor-Ort Back-End Closing',
        title: 'Vor-Ort Monetarisierung: Das 100.000€ Boardroom-Back-End Angebot',
        durationMinutes: 31,
        description: 'Wie du geeigneten Teilnehmern am Ende eines Events optionale, klar definierte Beratungsangebote präsentierst und ausreichend Entscheidungszeit einräumst.',
        learnContent: {
          videoTitle: 'Masterclass: Vor-Ort Closing & High-End Back-End Verkäufe',
          videoDuration: '31:40',
          summaryText: 'Ticket- und Folgeangebote müssen jeweils eigenständig wirtschaftlich und wertvoll sein. Ein optionales Beratungsprogramm darf nur geeigneten Teilnehmern mit transparentem Leistungsumfang, Gesamtpreis, Vertragsbedingungen und angemessener Entscheidungszeit angeboten werden.',
          bulletPoints: [
            'Der sachliche Rückblick: Ergebnisse prüfen und erst danach mögliche nächste Schritte ohne emotionalen Entscheidungsdruck besprechen',
            'Das "Natural Extension" Angebot: "Wir haben diesen Plan geschmiedet – wollen wir ihn im nächsten Jahr gemeinsam exekutieren?"',
            'Keine Pitch-Folien: Das Angebot wird im persönlichen Gespräch oder beim gemeinsamen Dinner unterbreitet',
            'Realistische Angebotsauswertung: Interesse, Eignung, Abschlussquote, Storno und Kundenerfolg getrennt messen'
          ],
          coreConcepts: [
            {
              iconName: 'star',
              title: 'NATURAL EXTENSION',
              description: 'Folgeangebote fühlen sich wie der logische nächste Schritt an, nicht wie ein Verkauf.',
              highlight: true
            },
            {
              iconName: 'briefcase',
              title: 'BOARDROOM ADVISORY',
              description: 'Hochwertige Jahresbegleitungen benötigen klar kalkulierte Betreuungskapazität und verlässliche Leistungserbringung.'
            }
          ],
          resources: [
            {
              title: 'Boardroom Advisory Vertrag & Mandats-Muster',
              subtitle: 'Vertragsmuster zur individuellen Prüfung durch qualifizierte Rechtsberatung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Contract Closer',
              subtitle: 'Digitale Vor-Ort-Vertragsunterzeichnung per Tablet ermöglichen',
              type: 'tool',
              iconName: 'file-text',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kunst des Vor-Ort Back-End Verkaufs

Wer eine außergewöhnliche Event-Erfahrung liefert, hat sich das Vertrauen für jahrelange Partnerschaften verdient.

#### Die Struktur des Abschluss-Dinners:
- **Rückblick**: Würdigung der Durchbrüche jedes einzelnen Teilnehmers.
- **Die Ausblick-Frage**: "Wer von euch möchte, dass mein Team und ich euch bei der Umsetzung dieses Plans zur Seite stehen?"
- **Exklusives Kontingent**: Maximal 5 Plätze für die Jahres-Master-Group.`
        },
        understandContent: {
          coreTakeaway: 'Ein erstklassiges Live-Event ist die vertrauensvollste Verkaufsbühne der Welt.',
          keyPrinciples: [
            'Niemals aggressive Verkaufsdruck-Methoden anwenden – das zerstört den Status sofort',
            'Vertrag, Zahlungsplan, Kündigungs- und Rücktrittsbedingungen transparent bereitstellen und angemessene Prüfzeit ermöglichen'
          ]
        },
        actionTask: {
          instruction: 'Entwirf dein 100.000€ Jahres-Beiratsangebot:',
          inputType: 'checklist',
          checklistItems: [
            'Leistungsumfang (z. B. monatliche Strategie-Calls, 4 Boardroom-Treffen) definiert',
            'Digitaler Beratungsvertrag im Mara CRM hinterlegt',
            'Exklusivitäts-Bedingungen (z. B. maximal 6 Unternehmer pro Jahr) festgelegt'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 83,
    title: '83. Vertikales B2B-Publishing & Eigene Medienhäuser',
    subtitle: 'Fachportale, Branchen-Awards, Print-Magazine, Lead-Monetarisierung & Sponsoring-Pakete',
    color: 'from-slate-800 via-zinc-800 to-blue-950',
    badgeIcon: '📰',
    description: 'Werde zum unangefochtenen Leitmedium deiner Nische: Baue ein eigenes digitales Branchen-Magazin auf, veranstalte prestigeträchtige Branchen-Awards und monetarisiere deine Reichweite über 6-stellige Jahres-Sponsoringpakete von Konzernen.',
    lessons: [
      {
        id: '83.1',
        stageId: 83,
        stageTitle: '83. Fachportal-Architektur & Sponsoring',
        title: 'Das vertikale Medienhaus: Vom Dienstleister zum Meinungsführer der Branche',
        durationMinutes: 33,
        description: 'Wie du ein digitales Fachportal aufbaust, Fachbeiträge kuratierst und 20.000€ bis 50.000€ Sponsoring-Pakete an Softwareanbieter und Konzerne verkaufst.',
        learnContent: {
          videoTitle: 'Masterclass: Vertikales B2B Publishing & Medienmonopolisierung',
          videoDuration: '33:15',
          summaryText: 'Ein Dienstleister muss Kunden hinterherlaufen. Ein Medienhaus wird von Kunden und Partnern um Audienz gebeten. Lerne, wie du ein unabhängiges Branchenportal gründest und Werbegelder von Konzernen einsammelst.',
          bulletPoints: [
            'Die Medien-Dienstleister-Symbiose: Das Magazin generiert Vertrauen und Leads, deine Hauptfirma liefert die High-End Lösungen',
            'Content-Syndizierung: Branchenexperten schreiben kostenlos für dich, um Reichweite und Renommee zu erhalten',
            'Sponsoring-Katalog: Native Articles, Newsletter-Header, Podcast-Sponsoring und exklusive Lead-Gen Reports',
            'Paywall vs. Sponsored Free: Warum kostenlose, hochqualitative B2B-Inhalte mit Sponsoring 10x mehr Gewinn abwerfen als Abogebühren'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'MEDIA AUTHORITY',
              description: 'Als Inhaber des Leitmediums bestimmst du die Themen und Trends der Branche.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'SPONSORSHIP DEALS',
              description: 'Wiederkehrende Jahresbudgets von B2B-Konzernen für Native Ads und Leads.'
            }
          ],
          resources: [
            {
              title: 'B2B Medienhaus Mediadaten & Sponsoring-Katalog',
              subtitle: 'Preise, Pakete und Reichweiten-Präsentationen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Media Publishing Portal',
              subtitle: 'Gastautoren, Artikel-Pipelines und Sponsoren-Verträge verwalten',
              type: 'tool',
              iconName: 'file-text',
              actionUrl: 'content'
            }
          ],
          fullArticleGuide: `### Die Macht des vertikalen Medienhauses

Wenn du der Branche eine Stimme gibst, wirst du zum unvermeidbaren Knotenpunkt für alle Marktteilnehmer.

#### Die 4 Säulen des Medienhauses:
1. **Nachrichtenportal**: Tägliche fundierte News und Analysen zur Nische.
2. **Der wöchentliche Executive-Newsletter**: Pflichtlektüre für Geschäftsführer der Branche.
3. **Marktstudien (Whitepaper)**: Tiefgehende Reports, gesponsert von großen Softwarehäusern.
4. **Branchen-Award**: Die jährliche Krönung der besten Unternehmen des Sektors.`
        },
        understandContent: {
          coreTakeaway: 'Wer das Leitmedium besitzt, kontrolliert den gesamten Aufmerksamkeitsstrom seiner Nische.',
          keyPrinciples: [
            'Strikte Trennung von redaktionellem Inhalt und gesponserten Beiträgen (Kennzeichnungspflicht)',
            'Sponsoring-Pakete immer als 12-Monats-Verträge mit Vorauszahlung abschließen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle die Mediadaten für dein Fachportal:',
          inputType: 'checklist',
          checklistItems: [
            'Zielgruppen-Profil und Reichweiten-Prognosen im Mediadaten-PDF definiert',
            '3 Sponsoring-Pakete (Gold, Platin, Hauptpartner) kalkuliert',
            'Gastautoren-Richtlinien und Redaktionsplan im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '83.2',
        stageId: 83,
        stageTitle: '83. Branchen-Awards & Gala-Veranstaltungen',
        title: 'Der Branchen-Award: Wie du die Branchen-Elite auf deine Gala holst',
        durationMinutes: 31,
        description: 'Wie du einen renommierten Award ins Leben rufst, eine hochkarätige Jury aufbaust und 6-stellige Gala-Sponsorings einnimmst.',
        learnContent: {
          videoTitle: 'Masterclass: Branchen-Awards als ultimative Autoritäts-Maschine',
          videoDuration: '31:45',
          summaryText: 'Menschen und Unternehmen lieben Trophäen und Auszeichnungen. Ein eigener Branchen-Award bringt dir die CEOs deiner gesamten Zielgruppe als Bewerber ins Haus. Lerne, wie du eine renommierte Gala organisierst und monetarisierst.',
          bulletPoints: [
            'Die Award-Kategorien: "Innovator des Jahres", "Bester Arbeitgeber", "Nachhaltigkeitspreis"',
            'Die Promi-Jury: Wie du Universitätsprofessoren und Verbandspräsidenten als ehrenamtliche Juroren gewinnst',
            'Bewerbungs-Gebühren & Einreichungen: Tausende Euro Einnahmen bereits bei der Einreichung der Unterlagen',
            'Gala-Tischpakete: Konzerne kaufen ganze 10er-Tische für 5.000€ bis 15.000€, um bei der Verleihung präsent zu sein'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'AWARD PRESTIGE',
              description: 'Siegel und Trophäen schaffen lebenslange Bindung und maximale Markenbekanntheit.',
              highlight: true
            },
            {
              iconName: 'users',
              title: 'C-LEVEL CONVERGENCE',
              description: 'Alle relevanten Entscheider versammeln sich an einem einzigen Abend in deinem Saal.'
            }
          ],
          resources: [
            {
              title: 'Branchen-Award Leitfaden & Einreichungs-Richtlinien',
              subtitle: 'Bewertungs-Kriterien und Gala-Planung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Award Submission Portal',
              subtitle: 'Bewerbungen, Jury-Votings und Gala-Tickets online verwalten',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Inszenierung eines Branchen-Preises

Ein gut geführter Award wird innerhalb von 3 Jahren zum wichtigsten Event des gesamten Wirtschaftszweigs.

#### Der Zeitplan eines erfolgreichen Awards:
- **Monat 1-3**: Bekanntgabe der Kategorien & Jury-Vorstellung.
- **Monat 4-6**: Einreichungsphase (Call for Entries) & PR-Begleitung.
- **Monat 7-8**: Jury-Sitzung & Bekanntgabe der Nominierten (Shortlist).
- **Monat 9**: Große Gala-Verleihung mit 300-500 Führungskräften.`
        },
        understandContent: {
          coreTakeaway: 'Wer die Preise vergibt, steht über dem Wettbewerb.',
          keyPrinciples: [
            'Das Jury-Verfahren muss transparent und unanfechtbar sein – Neutralität schützt die Glaubwürdigkeit',
            'Den Gewinnern hochwertige Siegel-Lizenzen für ihr Marketing anbieten'
          ]
        },
        actionTask: {
          instruction: 'Plane die Eckdaten deines Branchen-Awards:',
          inputType: 'checklist',
          checklistItems: [
            '3 bis 5 aussagekräftige Award-Kategorien definiert',
            'Wunsch-Jury-Liste mit 5 bekannten Persönlichkeiten der Nische erstellt',
            'Gala-Ticket- und Sponsoring-Kalkulation im CRM hinterlegt'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 84,
    title: '84. Defense-Grade Cybersecurity & Ransomware-Resilienz',
    subtitle: 'Zero Trust, Air-Gapped Backups, Red-Team Pentesting & DSGVO-Haftungsvermeidung',
    color: 'from-red-900 via-zinc-900 to-black',
    badgeIcon: '🔒',
    description: 'Schütze dein 8-stelliges Digitalunternehmen vor existenzbedrohenden Cyber-Angriffen: Implementiere Zero-Trust-Architekturen, Air-Gapped Immutable Backups, meistere Red-Team Penetrationstests und vermeide persönliche Geschäftsführerhaftung bei DSGVO-Vorfällen.',
    lessons: [
      {
        id: '84.1',
        stageId: 84,
        stageTitle: '84. Zero Trust & Ransomware-Schutz',
        title: 'Zero Trust Security: Niemals vertrauen, immer verifizieren',
        durationMinutes: 34,
        description: 'Wie du Zero-Trust-Netzwerke aufbaust, Hardware-Sicherheitsschlüssel (YubiKeys) erzwingst und Ransomware-Erpressungen mathematisch unmöglich machst.',
        learnContent: {
          videoTitle: 'Masterclass: Zero Trust Architektur & Ransomware-Abwehr',
          videoDuration: '34:30',
          summaryText: 'Ein einziger Klick eines Mitarbeiters auf einen Phishing-Link kann dein gesamtes Unternehmen lahmlegen und Millionen kosten. Lerne, wie du mit Zero Trust, FIDO2/WebAuthn Hardware-Tokens und Micro-Segmentierung sicherstellst, dass Angreifer isoliert bleiben.',
          bulletPoints: [
            'Das Zero-Trust-Paradigma: Keine implizite Vertrauenszone mehr – jede Anfrage wird authentifiziert und autorisiert',
            'FIDO2 Hardware-Sicherheitsschlüssel: Phishing-resistente Authentifizierung ohne Passwörter',
            'Micro-Segmentierung: Isolierung von Servern und Datenbanken, sodass keine Querausbreitung (Lateral Movement) möglich ist',
            'Immutable Air-Gapped Backups: WORM-Speicher (Write Once Read Many), die selbst mit Admin-Rechten nicht gelöscht werden können'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'ZERO TRUST',
              description: 'Kontinuierliche Verifikation jedes Nutzers und Geräts schützt vor internen und externen Gefahren.',
              highlight: true
            },
            {
              iconName: 'database',
              title: 'IMMUTABLE BACKUPS',
              description: 'Unveränderliche Backups garantieren 100%ige Wiederherstellung nach Ransomware-Attacken.'
            }
          ],
          resources: [
            {
              title: 'Zero Trust Implementation Blueprint & Backup-Matrix',
              subtitle: 'IT-Sicherheitsleitfaden nach BSI IT-Grundschutz als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Security & Access Control Cockpit',
              subtitle: '2FA-Erzwingung, Session-Timeouts und IP-Whitelists konfigurieren',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Verteidigung moderner Digitalunternehmen

Cyber-Resilienz ist der wichtigste Versicherungsschutz für den Fortbestand deines Unternehmens.

#### Die 3 goldenen Backup-Regeln (3-2-1-1-0 Regel):
- **3 Kopien** aller wichtigen Daten.
- **2 verschiedene Speichermedien** (Cloud & On-Premises).
- **1 Kopie an einem externen Standort**.
- **1 Kopie Air-Gapped oder Immutable** (unveränderlich gesperrt).
- **0 Fehler** bei regelmäßigen automatisierten Wiederherstellungstests.`
        },
        understandContent: {
          coreTakeaway: 'Wer unveränderliche Backups und Hardware-Tokens besitzt, kann von Cyber-Kriminellen niemals erpresst werden.',
          keyPrinciples: [
            'Niemals Passwörter oder SMS-2FA als alleinigen Schutz nutzen – Hardware-Tokens sind Pflicht',
            'Monatliche Wiederherstellungstests durchführen, um sicherzustellen, dass Backups fehlerfrei funktionieren'
          ]
        },
        actionTask: {
          instruction: 'Erhöhe die Sicherheitseinstellungen deiner Organisation:',
          inputType: 'checklist',
          checklistItems: [
            'FIDO2/WebAuthn Hardware-Schlüssel für alle Administratoren verpflichtend gemacht',
            'Unveränderliches (Immutable) Backup-Intervall auf S3/WORM-Speicher eingerichtet',
            'Notfall-Wiederherstellungsplan (Disaster Recovery Plan) getestet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '84.2',
        stageId: 84,
        stageTitle: '84. Red Teaming & DSGVO-Haftung',
        title: 'Penetration Testing & Red Teaming: Kontrollierte Angriffe & Haftungsschutz',
        durationMinutes: 31,
        description: 'Wie ethische Hacker Schwachstellen aufdecken und wie Geschäftsführer sich vor persönlicher Schadensersatzhaftung nach DSGVO Art. 82 schützen.',
        learnContent: {
          videoTitle: 'Masterclass: Red Teaming, Pentests & Geschäftsführer-Compliance',
          videoDuration: '31:50',
          summaryText: 'Warte nicht, bis echte Kriminelle deine Sicherheitslücken finden. Beauftrage Red-Teams mit simulierten Hackerangriffen. Erfahre außerdem, wie du technische und organisatorische Maßnahmen (TOMs) dokumentierst, um Bußgelder abzuwenden.',
          bulletPoints: [
            'Red Teaming vs. Vulnerability Scan: Reale Angriffsszenarien inklusive Social Engineering und Phishing-Simulationen',
            'Bug Bounty Programme: Wie du weltweite Sicherheitsforscher auf HackerOne legal für gefundene Lücken belohnst',
            'DSGVO Art. 82 Haftung: Vermeidung persönlicher Geschäftsführerhaftung durch lückenlose Dokumentation nach Stand der Technik',
            '72-Stunden Meldepflicht: Der genaue Krisenplan bei meldepflichtigen Datenschutz-Vorfällen an die Landesdatenschutzbehörde'
          ],
          coreConcepts: [
            {
              iconName: 'shield-alert',
              title: 'ETHICAL RED TEAMING',
              description: 'Gezielte simulierte Angriffe schließen Sicherheitslücken vor echten Hacks.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'TOM COMPLIANCE',
              description: 'Rechtssichere Dokumentation schützt die Geschäftsführung vor Millionen-Bußgeldern.'
            }
          ],
          resources: [
            {
              title: 'TOM Dokumentations-Muster & 72h-Meldepflicht Leitfaden',
              subtitle: 'Rechtssichere DSGVO-Nachweise als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Audit Log & Compliance Tracker',
              subtitle: 'Manipulationssichere Protokollierung aller Datenzugriffe nach DSGVO',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Wie sich Geschäftsführer gegen Haftungsrisiken absichern

Bei schweren Datenschutzverletzungen drohen Bußgelder von bis zu 20 Millionen Euro oder 4% des weltweiten Jahresumsatzes.

#### Die wichtigsten Schutzmaßnahmen:
- **Stand der Technik**: Einsatz moderner Verschlüsselungs- und Identitätsstandards.
- **Cyber-Versicherung**: Deckung von Forensik-Kosten, Lösegeldern und Betriebsunterbrechungen.
- **Mitarbeiter-Schulungen**: Regelmäßige simulierte Phishing-Kampagnen zur Sensibilisierung.`
        },
        understandContent: {
          coreTakeaway: 'Sicherheit ist Chefsache: Eine lückenlose Dokumentation der Sicherheitsmaßnahmen entlastet die Geschäftsführung vollständig.',
          keyPrinciples: [
            'Bei Datenschutzvorfällen unverzüglich innerhalb von 72 Stunden die zuständige Behörde informieren',
            'Regelmäßige externe Penetrationstests schriftlich festhalten'
          ]
        },
        actionTask: {
          instruction: 'Erstelle dein technisches Sicherheits- und TOM-Dossier:',
          inputType: 'checklist',
          checklistItems: [
            'Aktuelle Dokumentation der Technischen und Organisatorischen Maßnahmen (TOM) hinterlegt',
            '72-Stunden Notfall-Meldeprozess für Datenschutzvorfälle definiert',
            'Erster externer Pentest-Bericht oder Vulnerability-Scan archiviert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 85,
    title: '85. Der 9-stellige Megadeal: IPO, SPAC & Private Equity Secondary',
    subtitle: 'Börsengang, S-1 Filing, Roadshows, PE LBO-Strukturen & Reichtums-Liquidierung',
    color: 'from-amber-500 via-yellow-600 to-zinc-900',
    badgeIcon: '🏛️',
    description: 'Das ultimative Finale der Unternehmensbewertung: Verstehe die Mechanismen eines Börsengangs (IPO / SPAC), erstelle S-1 Wertpapierprospekte, meistere internationale Investoren-Roadshows und strukturiere 9-stellige Private Equity Leveraged Buyouts (LBO).',
    lessons: [
      {
        id: '85.1',
        stageId: 85,
        stageTitle: '85. IPO & S-1 Wertpapierprospekt',
        title: 'Der Weg an die Börse: S-1 Filing, Konsortialbanken & die weltweite Roadshow',
        durationMinutes: 36,
        description: 'Wie ein Börsengang an Frankfurt, London oder NASDAQ abläuft, wie Konsortialbanken den Ausgabepreis festlegen und Roadshows funktionieren.',
        learnContent: {
          videoTitle: 'Masterclass: IPO-Architektur, S-1 Prospekt & Börsennotierung',
          videoDuration: '36:40',
          summaryText: 'Ein Börsengang ist die Krönung des Unternehmertums. Lerne, wie Konsortialbanken (Goldman Sachs, Morgan Stanley) ausgewählt werden, wie das S-1 Wertpapier-Filing strukturiert ist und wie du auf der 2-wöchigen weltweiten Roadshow institutionelle Investoren überzeugst.',
          bulletPoints: [
            'Das Konsortialbanken-Syndikat: Lead-Left Bookrunner, Co-Manager und Underwriting-Spreads (3-7%)',
            'Das S-1 Prospekt (Registration Statement): MD&A (Management Discussion & Analysis), Risikofaktoren und Finanzhistorie',
            'Das Orderbuch & Bookbuilding: Preisfindung zwischen institutionellen Fondsangeboten und Ausgabespanne',
            'Die Lock-up Periode: Warum Gründer ihre Aktien in den ersten 180 Tagen nach dem IPO nicht verkaufen dürfen'
          ],
          coreConcepts: [
            {
              iconName: 'trending-up',
              title: 'BOOKBUILDING PROCESS',
              description: 'Auktionsverfahren zur Maximierung des Ausgabepreises vor Handelsbeginn.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: '180-DAY LOCK-UP',
              description: 'Gesetzliche Haltefrist stabilisiert den Aktienkurs nach dem Börsengang.'
            }
          ],
          resources: [
            {
              title: 'IPO Master-Roadmap & S-1 Prospekt Gliederung',
              subtitle: 'Schritt-für-Schritt Fahrplan an die Börse als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Investor Relations Portal',
              subtitle: 'Aktionärsstruktur, Quartalsberichte und Ad-hoc Mitteilungen verwalten',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Vorbereitung auf das Börsen-Debüt

Ein IPO erfordert 18 bis 24 Monate akribische Vorbereitung in Rechnungslegung (IFRS / US-GAAP) und Governance.

#### Die Meilensteine des Börsengangs:
1. **Beauty Contest**: Auswahl der federführenden Investmentbanken.
2. **Draft Registration Statement**: Vertrauliche Einreichung bei der BaFin oder SEC.
3. **Analyst Presentation**: Präsentation der Finanzzahlen vor führenden Aktien-Analysten.
4. **Die Roadshow**: 50+ Meetings mit Staatsfonds, Pensionsfonds und Hedgefonds in New York, London und Frankfurt.
5. **Priced & Ringing the Bell**: Festlegung des Erstausgabepreises und das Läuten der Börsenglocke.`
        },
        understandContent: {
          coreTakeaway: 'Ein Börsengang verschafft deinem Unternehmen die härteste Währung der Welt: Eigene liquide Aktien für weitere Übernahmen.',
          keyPrinciples: [
            'Niemals unrealistische Prognosen abgeben – Quartalsverfehlungen (Earnings Miss) bestraft die Börse gnadenlos',
            'Ein professionelles Investor-Relations-Team aufbauen, das kontinuierlich Vertrauen bei Analysten stiftet'
          ]
        },
        actionTask: {
          instruction: 'Prüfe deine IPO-Readiness Kennzahlen:',
          inputType: 'checklist',
          checklistItems: [
            'Finanzberichte auf IFRS-Standard mit Wirtschaftsprüfungsgesellschaft vorbereitet',
            'Corporate Governance Kodex und Aufsichtsratsstrukturen implementiert',
            'Investor-Relations Sektion im Mara CRM vorbereitet'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '85.2',
        stageId: 85,
        stageTitle: '85. PE Leveraged Buyout & Secondary Exits',
        title: 'Private Equity Mega-Exits: Leveraged Buyouts (LBO) & Mehrheitsübernahmen',
        durationMinutes: 33,
        description: 'Wie Private Equity Riesen (KKR, Blackstone, EQT) Firmen mit 70% Fremdkapitalhebel kaufen und Gründern 8-stellige Cash-Exits ermöglichen.',
        learnContent: {
          videoTitle: 'Masterclass: Leveraged Buyouts & Private Equity Transaktionen',
          videoDuration: '33:35',
          summaryText: 'Nicht jeder Gründer will an die Börse. Der Verkauf an Private Equity bietet oft mehr Diskretion und höhere Bewertungssicherheit. Lerne, wie LBOs strukturiert werden, wie du 80% deines Vermögens bar auszahlst und mit den restlichen 20% in der neuen Holding rückbeteiligt bleibst.',
          bulletPoints: [
            'LBO-Mechanik: Wie PE-Fonds den Unternehmenskauf mit 60-75% Bankkrediten auf das Zielunternehmen finanzieren',
            'Die Rückbeteiligung (Rollover Equity): Warum die zweite Runde mit PE oft mehr Gewinn bringt als der Erstverkauf ("Second Bite at the Apple")',
            'Management Incentive Programme (MIP): Hurdle Rates und Carried Interest für das Führungsteam',
            'Der finale Exit nach 4-6 Jahren: Weiterverkauf an einen noch größeren Mega-Fonds oder strategischen Käufer'
          ],
          coreConcepts: [
            {
              iconName: 'pie-chart',
              title: 'ROLLOVER EQUITY',
              description: 'Rückbeteiligung ermöglicht eine zweite Multimillionen-Auszahlung beim Folge-Exit.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'CASH-OUT SECURITY',
              description: 'Sofortige finanzielle Unabhängigkeit durch 8-stellige Barüberweisung beim Signing.'
            }
          ],
          resources: [
            {
              title: 'PE Leveraged Buyout Modell & Rollover-Kalkulator',
              subtitle: 'Excel-Finanzmodell für Mega-Exits als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Mega-Deal Pipeline',
              subtitle: 'Verhandlungen mit Private Equity Fonds diskret steuern',
              type: 'tool',
              iconName: 'briefcase',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Das Spiel der Private Equity Giganten

Ein Leveraged Buyout maximiert die Eigenkapitalrendite durch geschickten Einsatz von Fremdkapital.

#### Die Vorteile für Gründer:
- **De-Risking**: 80% des Firmenwerts fließen direkt auf dein privates Bankkonto oder in deine Holding.
- **Wachstumstreiber**: Der PE-Fonds finanziert aggressive Zukäufe (Buy-and-Build), die du alleine nicht stemmen könntest.
- **Der zweite Exit**: Beim Weiterverkauf nach 5 Jahren verdoppelt oder verdreifacht sich der Wert deiner Restanteile.`
        },
        understandContent: {
          coreTakeaway: 'Wer mit Private Equity kooperiert, sichert sein Lebenswerk ab und profitiert gleichzeitig vom nächsten Skalierungsschritt.',
          keyPrinciples: [
            'Immer erfahrene M&A-Anwälte und Investmentbanker an deiner Seite haben – verhandle niemals alleine gegen PE-Profis',
            'Auf klare Mitbestimmungsrechte und Schutz vor unberechtigter Abberufung als Geschäftsführer achten'
          ]
        },
        actionTask: {
          instruction: 'Modelliere deinen Private Equity Exit mit Rollover Equity:',
          inputType: 'checklist',
          checklistItems: [
            'Unternehmensbewertung auf Basis von 12x-15x EBITDA kalkuliert',
            'Aufteilung zwischen Cash-Auszahlung (z. B. 75%) und Rollover (25%) simuliert',
            'Management-Incentive-Struktur im CRM hinterlegt'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  }
];

import { Stage } from '../types';

export const MODULES_46_TO_55: Stage[] = [
  {
    id: 46,
    title: '46. Google Search Ads & High-Intent Keyword Dominanz',
    subtitle: 'Search Intent, Exact Match Skalierung, Quality Score & Negative Keywords',
    color: 'from-blue-600 via-green-600 to-amber-500',
    badgeIcon: '🔍',
    description: 'Fange Kunden im Moment höchster Kaufabsicht ab: Baue Google Search Kampagnen auf, die bei transaktionalen Suchbegriffen ganz oben stehen, den Qualitätsfaktor auf 9/10 maximieren und Klickpreise halbieren.',
    lessons: [
      {
        id: '46.1',
        stageId: 46,
        stageTitle: '46. Google Search Setup & Quality Score',
        title: 'Die Google Search Architektur: Exact-Match & High-Intent Keyword-Clustering',
        durationMinutes: 29,
        description: 'Wie du transaktionale Keywords identifizierst, Broad-Match-Streuverluste eliminierst und Anzeigentexte perfekt auf Suchanfragen spiegelst.',
        learnContent: {
          videoTitle: 'Masterclass: Google Search Ads & Quality Score Engineering',
          videoDuration: '29:40',
          summaryText: 'Wer auf Google nach einer Lösung sucht, will jetzt kaufen. Erfahre, wie du Google Search Kampagnen so strukturierst, dass deine Anzeigen stets auf Position 1 stehen und du trotzdem weniger zahlst als Konkurrenten.',
          bulletPoints: [
            'Die 3 Säulen des Qualitätsfaktors: Erwartete CTR, Anzeigenrelevanz und Nutzererfahrung mit der Landingpage',
            'Single-Theme Ad Groups (STAGs): Maximale Relevanz durch thematisch eng gefasste Anzeigengruppen',
            'Negative Keyword Listen: Wie du wöchentlich tausende Euro an irrelevanten Klicks sparst',
            'Responsive Suchanzeigen (RSA): 15 Headlines und 4 Beschreibungen für algorithmische Höchstleistung'
          ],
          coreConcepts: [
            {
              iconName: 'search',
              title: 'QUALITY SCORE 9/10',
              description: 'Hohe Relevanz senkt den Klickpreis (CPC) um bis zu 50% gegenüber Wettbewerbern.',
              highlight: true
            },
            {
              iconName: 'filter',
              title: 'NEGATIVE KEYWORDS',
              description: 'Konsequenter Ausschluss von Begriffen wie "kostenlos", "PDF" oder "Jobs".'
            }
          ],
          resources: [
            {
              title: 'Negative Keyword Masterliste für Dienstleister',
              subtitle: '500+ auszuschließende Begriffe als PDF/Excel',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Google Ads Attribution',
              subtitle: 'GCLID-Parameter und Offline-Conversions im CRM tracken',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Anatomie einer perfekten Google Search Kampagne

Google Ads ist kein Verdrängungs-Wettbewerb des Budgets, sondern ein Relevanz-Wettbewerb.

#### Die 4 Hebel für profitable Google Search Kampagnen:
1. **Suchabsicht verstehen**: Trenne informative Suchen ("Wie lerne ich Copywriting") von kommerziellen Suchen ("Copywriting Agentur buchen").
2. **Dynamic Keyword Insertion (DKI)**: Binde den genauen Suchbegriff dynamisch in die Anzeigen-Überschrift ein.
3. **Anzeigenerweiterungen nutzen**: Sitelinks, Zusatzinformationen, Anruf-Assets und strukturierte Snippets ausfüllen.
4. **Landingpage-Spiegelung**: Die H1-Überschrift deiner Landingpage muss mit der Anzeige wortgenau übereinstimmen.`
        },
        understandContent: {
          coreTakeaway: 'Wer das exakte Suchwort in Anzeige und Landingpage widerspiegelt, zahlt die geringsten Klickpreise.',
          keyPrinciples: [
            'Niemals reines Broad Match ohne automatische Gebotsstrategien und harte Negativlisten verwenden',
            'Wöchentlich den Suchbegriffe-Bericht prüfen und irrelevante Suchphrasen ausschließen'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deine Google Search Anzeigengruppe:',
          inputType: 'checklist',
          checklistItems: [
            'Liste von 10 transaktionalen High-Intent Keywords (Exact & Phrase Match) erstellt',
            'Responsive Suchanzeige mit 15 relevanten Headlines verfasst',
            'Umfassende Negativ-Keyword-Liste im Kampagnenkonto hinterlegt'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '46.2',
        stageId: 46,
        stageTitle: '46. Performance Max & Smart Bidding',
        title: 'Performance Max (PMax) & Smart Bidding: KI-Kampagnen bändigen',
        durationMinutes: 31,
        description: 'Wie du Googles KI-Kampagnen (PMax) mit Zielgruppen-Signalen und Conversion-Werten fütterst, um automatisierte Multi-Channel-Verkäufe zu erzielen.',
        learnContent: {
          videoTitle: 'Masterclass: Google Performance Max (PMax) Skalierung',
          videoDuration: '31:15',
          summaryText: 'Performance Max bespielt YouTube, Display, Search, Discover, Gmail und Maps in einer einzigen Kampagne. Lerne, wie du PMax mit First-Party-Daten steuerst und Budgetverschwendung im Display-Netzwerk verhinderst.',
          bulletPoints: [
            'Asset-Gruppen-Architektur: Hochwertige Bilder, Videos, Logos und Texte für jede Zielgruppe',
            'Zielgruppensignale (Audience Signals): Custom Intent Segmente basierend auf Konkurrenz-URLs',
            'Smart Bidding Strategien: Ziel-CPA (tCPA) vs. Ziel-ROAS (tROAS) richtig anwenden',
            'Brand Exclusion Listen: Verhindere, dass PMax günstigen Brand-Traffic als eigenen Erfolg zählt'
          ],
          coreConcepts: [
            {
              iconName: 'cpu',
              title: 'AUDIENCE SIGNALS',
              description: 'Füttere Googles Algorithmus mit Daten deiner besten Bestandskunden.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'BRAND CANNIBALIZATION FIX',
              description: 'Eigennamen ausschließen, um echten Neukunden-ROAS zu messen.'
            }
          ],
          resources: [
            {
              title: 'Performance Max Asset & Setup Checkliste',
              subtitle: 'Grafikgrößen, Textvorgaben und Signal-Setup als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Offline-Conversion Sync',
              subtitle: 'Tatsächliche Zahlungseingänge an Google Ads zurückmelden',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Steuerung von Performance Max Kampagnen

PMax ist extrem mächtig, benötigt aber klare Leitplanken, um nicht minderwertigen Display-Traffic einzukaufen.

#### Die PMax Checkliste:
- **First-Party-Data Upload**: Lade deine Kundenliste verschlüsselt in Google Ads hoch.
- **Konkurrenz-URLs als Signale**: Füge Webseiten deiner stärksten Wettbewerber als Custom Segments hinzu.
- **Video-Kontrolle**: Lade eigene hochauflösende YouTube-Videos hoch, damit Google keine unschönen Auto-Videos generiert.`
        },
        understandContent: {
          coreTakeaway: 'Je präziser die Daten sind, mit denen du Google fütterst, desto profitabler skaliert die KI.',
          keyPrinciples: [
            'PMax benötigt mindestens 30 Conversions pro Monat, um verlässlich zu optimieren',
            'Immer getrennte PMax-Kampagnen für unterschiedliche Produktkategorien anlegen'
          ]
        },
        actionTask: {
          instruction: 'Richte deine erste Performance Max Kampagne ein:',
          inputType: 'checklist',
          checklistItems: [
            'Vollständiges Asset-Set (Texte, 5+ Bilder, 1+ Video, Logo) bereitgestellt',
            'Zielgruppensignale mit Bestandskunden-Listen und Nischen-Suchbegriffen gefüttert',
            'Brand-Exclusion-Liste aktiviert'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 47,
    title: '47. Meta Ads Skalierung: Advantage+ & Creative-Testing-Systeme',
    subtitle: 'Advantage+ Shopping, Dynamic Creative Tests (DCT), Hook-Rates & Ad Fatigue Prävention',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeIcon: '📈',
    description: 'Skaliere Werbebudgets auf 1.000€+ pro Tag auf Facebook & Instagram: Erfahre, wie moderne Creative-Testing-Pipelines funktionieren, wie du Ad-Fatigue besiegst und Advantage+ Kampagnen stabil hältst.',
    lessons: [
      {
        id: '47.1',
        stageId: 47,
        stageTitle: '47. Dynamic Creative Testing (DCT)',
        title: 'Die DCT-Methode: 3:2:2 Creative Testing für unerschöpfliche Ad-Gewinner',
        durationMinutes: 32,
        description: 'Wie du mit 3 Videos/Bildern, 2 Texten und 2 Headlines statistisch valide Werbegewinner in 48 Stunden ermittelst.',
        learnContent: {
          videoTitle: 'Masterclass: Die 3:2:2 Creative-Testing Matrix auf Meta',
          videoDuration: '32:30',
          summaryText: 'Audience-Targeting ist auf Meta tot – heute ist das Creative das Targeting. Wer jede Woche 5-10 neue Creatives systematisch testet, findet konstant Anzeigen, die 5-stellige Tagesumsätze tragen.',
          bulletPoints: [
            'Die 3:2:2 Testformel: 3 visuelle Varianten, 2 Anzeigentexte, 2 Headlines in einer Dynamic Creative Unit',
            'Die 3-Sekunden Video-Hook-Rate: Wie du Videos unter 25% Hook-Rate sofort aussortierst',
            'Hold-Rate & Click-Through-Rate (CTR Outbound): Die Diagnose-Metriken für Creative-Schwächen',
            'Post-ID Extraktion: Social Proof (Likes & Kommentare) von Tests in Skalierungskampagnen übertragen'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: '3:2:2 TESTING FRAMEWORK',
              description: 'Schnellste und günstigste Methode zur Identifikation von Top-Werbemitteln.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'POST-ID PRESERVATION',
              description: 'Erhaltung aller Kommentare und Likes beim Skalieren in CBO-Kampagnen.'
            }
          ],
          resources: [
            {
              title: 'Creative-Testing Tracker & Metriken-Dashboard',
              subtitle: 'Excel-Template zur Auswertung von Hook- & Hold-Rates',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Meta Ad Analytics',
              subtitle: 'Echtzeit-ROAS und Leadkosten im Kampagnen-Dashboard',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Das moderne Meta-Testing-Ökosystem

Meta belohnt Werbetreibende, die den Algorithmus kontinuierlich mit frischem, visuell ansprechendem Content füttern.

#### Der wöchentliche Testing-Rhythmus:
1. **Montag (Produktion)**: Drehe 3 neue Hooks für dein bestes Angebot.
2. **Dienstag (Launch)**: Starte eine Dynamic Creative Kampagne mit 50€ Tagesbudget.
3. **Freitag (Auswertung)**: Identifiziere die Variante mit den geringsten Kosten pro Lead/Kauf.
4. **Samstag (Scale)**: Übertrage die Post-ID in deine Haupt-Skalierungskampagne.`
        },
        understandContent: {
          coreTakeaway: 'Wer das Creative-Testing automatisiert, leidet nie wieder unter steigenden Werbekosten.',
          keyPrinciples: [
            'Niemals Targeting-Interessen überladen – Broad Targeting mit starkem Creative ist am profitabelsten',
            'Kleine Änderungen am Video-Hook (Sekunde 0-3) verändern die Rentabilität um bis zu 300%'
          ]
        },
        actionTask: {
          instruction: 'Setze deinen ersten 3:2:2 Dynamic Creative Test auf:',
          inputType: 'checklist',
          checklistItems: [
            '3 unterschiedliche Video-Hooks für dasselbe Angebot gerendert',
            '2 packende Copy-Varianten (Kurz vs. Lang) geschrieben',
            'DCT-Kampagne auf Meta mit CBO eingerichtet'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '47.2',
        stageId: 47,
        stageTitle: '47. Advantage+ & Budget-Skalierung',
        title: 'Advantage+ Shopping & Budget-Surfing: Von 100€ auf 1.000€/Tag skalieren',
        durationMinutes: 30,
        description: 'Die Kunst der vertikalen und horizontalen Budget-Eskalation ohne Kampagnenabstürze.',
        learnContent: {
          videoTitle: 'Masterclass: Meta Advantage+ Scaling & Budget-Management',
          videoDuration: '30:45',
          summaryText: 'Schnelle Budgeterhöhungen zerstören oft den Algorithmus-Lernstatus. Lerne, wie du Advantage+ Kampagnen mit bewährten Skalierungs-Gewinnern bestückst und Budget in 20%-Schritten stabil nach oben ziehst.',
          bulletPoints: [
            'Advantage+ Shopping/Lead Kampagnen: Wann und wie man Metas stärkste KI-Kampagne nutzt',
            'Vertikale Skalierung: Die 20%-Regel alle 48 Stunden zur Wahrung des Lernstatus',
            'Horizontale Skalierung: Duplikation von CBOs auf alternative Broad-Segmente',
            'Budget Surfing: Wie du an verkaufsstarken Tagen um 12:00 Uhr das Budget temporär verdoppelst'
          ],
          coreConcepts: [
            {
              iconName: 'trending_up',
              title: 'ADVANTAGE+ SCALE',
              description: 'Metas KI findet vollautomatisch die kaufbereitesten Nutzer im gesamten Netzwerk.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'BUDGET SURFING',
              description: 'Tagesbudgets an Peak-Tagen dynamisch erhöhen und nachts zurücksetzen.'
            }
          ],
          resources: [
            {
              title: 'Meta Scaling Rules & Automations-Playbook',
              subtitle: 'Automatisierungs-Regeln für den Ads Manager als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Pixel Tracking',
              subtitle: 'Conversion-API (CAPI) Serverseitig für 100% Tracking-Genauigkeit einrichten',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Gesetze der Ad-Skalierung

Wenn ein Funnel profitabel ist, ist die richtige Skalierungs-Strategie der Hebel zu 7-stelligen Jahresumsätzen.

#### Die 3 Skalierungs-Säulen:
- **Die Gewinner-Kampagne**: Nur Creatives mit mindestens 10 profitablen Verkäufen dürfen hier rein.
- **Server-Side Tracking (CAPI)**: Umgehe iOS-Tracking-Blockaden durch direkte Server-Übertragung an Meta.
- **Automatische Sicherheitsregeln**: Schalte Anzeigensets automatisch ab, wenn der CPA das 1,5-fache des Zielwerts übersteigt.`
        },
        understandContent: {
          coreTakeaway: 'Skalieren bedeutet, das System stabil zu halten, während mehr Geld durch die Rohre fließt.',
          keyPrinciples: [
            'Niemals in funktionierende Skalierungs-Anzeigen eingreifen – Änderungen nur über neue Ads vornehmen',
            'Serverseitige Conversion API ist Pflicht für verlässliche ROAS-Daten'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deine Advantage+ Skalierungs-Kampagne:',
          inputType: 'checklist',
          checklistItems: [
            'Meta Conversions API (CAPI) im Mara CRM aktiviert',
            'Advantage+ Kampagne mit deinen 3 besten Post-IDs bestückt',
            'Automatisierte Schutzregeln für maximalen CPA im Ads Manager angelegt'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 48,
    title: '48. SEO & Topical Authority: Organische Sichtbarkeit entwickeln',
    subtitle: 'Topical Clustering, Semantisches SEO, E-E-A-T & KI-Content-Pipelines',
    color: 'from-emerald-600 via-teal-600 to-green-700',
    badgeIcon: '🌱',
    description: 'Baue hilfreiche Themen-Cluster auf, berücksichtige E-E-A-T-Signale und entwickle organische Sichtbarkeit schrittweise. Rankings und Besucherzahlen bleiben von Wettbewerb, Qualität, Technik und Suchsystemen abhängig.',
    lessons: [
      {
        id: '48.1',
        stageId: 48,
        stageTitle: '48. Topical Authority & Silo-Struktur',
        title: 'Topical Authority: Themen strukturiert und hilfreich abdecken',
        durationMinutes: 33,
        description: 'Wie Pillar-Pages, Themen-Cluster und interne Links Suchmaschinen und Nutzern helfen können, Zusammenhänge zu verstehen.',
        learnContent: {
          videoTitle: 'Masterclass: Semantisches SEO & Topical Authority Architecture',
          videoDuration: '33:40',
          summaryText: 'Suchsysteme bewerten viele Signale auf Seiten- und Website-Ebene. Lerne, Themen-Cluster an Nutzerfragen auszurichten und ihre Wirkung über einen angemessenen Zeitraum zu messen, ohne eine Position oder Frist vorauszusetzen.',
          bulletPoints: [
            'Das Pillar-Cluster-Modell: 1 umfassende Kernseite (Pillar Page) verlinkt auf 15-20 spezifische Sub-Artikel (Cluster)',
            'Semantische Entitäten: Wie Google Begriffe in Wissensgraphen (Knowledge Graphs) verknüpft',
            'Interne Verlinkungs-Architektur: Saubere Silos ohne themenfremde Querverweise',
            'Search Intent Mapping: Informational, Commercial und Transactional Keywords perfekt aufteilen'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: 'TOPICAL CLUSTERING',
              description: 'Lückenlose Beantwortung aller Nutzerfragen zu einem Hauptthema.',
              highlight: true
            },
            {
              iconName: 'link',
              title: 'SILO LINKING',
              description: 'Gezielte interne Verlinkungsstruktur leitet PageRank zur Kern-Landingpage.'
            }
          ],
          resources: [
            {
              title: 'Topical Map Blueprint & Cluster-Vorlage',
              subtitle: 'Excel-Template für Content-Hierarchien & Silos',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara Blog & CMS Engine',
              subtitle: 'SEO-optimierte Artikel mit internen Links blitzschnell veröffentlichen',
              type: 'tool',
              iconName: 'layout',
              actionUrl: 'landingpage'
            }
          ],
          fullArticleGuide: `### Die Architektur der Topical Authority

Wer nur über 'Fitness Tipps' schreibt, wird nicht ranken. Wer aber Ernährung, Trainingslehre, Regeneration und Supplementierung bis ins Detail erklärt, wird zur Authority.

#### Die 4 Schritte zur Topical Authority:
1. **Themen-Recherche**: Extrahiere alle Fragen der Zielgruppe mit Tools wie AlsoAsked und Google Suggest.
2. **Die Pillar-Page**: Erstelle einen 3.000-Wörter Leitfaden als zentralen Anker.
3. **Die Cluster-Artikel**: Verfasse 10-15 präzise Artikel zu den Detailfragen.
4. **Die Verlinkung**: Jeder Cluster-Artikel verlinkt zurück auf die Pillar-Page mit optimiertem Ankertext.`
        },
        understandContent: {
          coreTakeaway: 'Hilfreiche, gut strukturierte Inhalte verbessern die Grundlage für organische Sichtbarkeit; ein bestimmtes Ranking lässt sich nicht zusagen.',
          keyPrinciples: [
            'Keine Keyword-Cannibalization: Jedes Keyword darf nur genau einer URL zugeordnet sein',
            'Interne Links sind der stärkste und günstigste Rankinghebel'
          ]
        },
        actionTask: {
          instruction: 'Entwirf deine Topical Map für deine Hauptnische:',
          inputType: 'checklist',
          checklistItems: [
            '1 zentrale Pillar-Page für dein Hauptangebot definiert',
            'Mindestens 10 spezifische Cluster-Artikel-Themen recherchiert',
            'Interne Verlinkungs-Struktur auf Papier oder im Tool aufgezeichnet'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '48.2',
        stageId: 48,
        stageTitle: '48. E-E-A-T & AI Content Skalierung',
        title: 'E-E-A-T & KI-Content: 50 hochwertige Artikel pro Monat veröffentlichen',
        durationMinutes: 29,
        description: 'Wie du Experience, Expertise, Authoritativeness und Trustworthiness in KI-Texte einfließen lässt, um Google-Updates sicher zu überstehen.',
        learnContent: {
          videoTitle: 'Masterclass: E-E-A-T konformer KI-Content & SEO-Skalierung',
          videoDuration: '29:50',
          summaryText: "Reiner KI-Spam wird von Google abgestraft. Lerne den 'Human-in-the-Loop' Workflow kennen, bei dem KI die Recherche und Erstentwürfe liefert, du aber echte Praxiserfahrung (E-E-A-T) einwechst.",
          bulletPoints: [
            'Die E-E-A-T Checkliste: Autoren-Boxen, echte Zitate, eigene Original-Bilder und Quellenangaben',
            'KI-Prompting für SEO: Strukturierte Gliederungen nach People-Also-Ask Daten erstellen',
            'Schema.org Structured Data: Artikel-, FAQ- und Review-Schemas für Rich Snippets in den Suchergebnissen',
            'Core Web Vitals Optimierung: Ladezeiten unter 1 Sekunde für Top-Platzierungen'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'E-E-A-T COMPLIANCE',
              description: 'Echte Experten-Signale schützen vor Google Core Updates.',
              highlight: true
            },
            {
              iconName: 'cpu',
              title: 'HYBRID AI WORKFLOW',
              description: 'KI-Geschwindigkeit kombiniert mit menschlicher Fachkompetenz.'
            }
          ],
          resources: [
            {
              title: 'E-E-A-T Audit Checkliste & Schema Markup Templates',
              subtitle: 'JSON-LD Vorlagen für Autoren & FAQs als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR KI SEO-Writer',
              subtitle: 'Vollständige Blogartikel nach E-E-A-T Richtlinien generieren',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Der E-E-A-T Standard im modernen SEO

Google will wissen: Hat der Autor echte Erfahrung mit dem Thema?

#### Die 4 E-E-A-T Elemente in jedem Artikel:
- **Erfahrung (Experience)**: Eigene Screenshots, Anekdoten und Praxis-Ergebnisse einbinden.
- **Expertise**: Qualifikationen des Autors in der Autoren-Box transparent darlegen.
- **Autorität (Authoritativeness)**: Zitate in anderen Fachmedien und Backlinks von Nischenseiten.
- **Vertrauen (Trust)**: Impressum, transparente Datenschutzerklärung und fehlerfreie Fakten.`
        },
        understandContent: {
          coreTakeaway: 'KI beschleunigt das Schreiben, aber deine persönliche Praxiserfahrung sichert das Ranking.',
          keyPrinciples: [
            'Niemals ungeprüften KI-Text 1:1 online stellen – immer eigene Beispiele ergänzen',
            'FAQ-Schema Markup einbauen, um mehr Platz auf der Google-Ergebnisseite einzunehmen'
          ]
        },
        actionTask: {
          instruction: 'Optimiere deinen Blog nach E-E-A-T Standards:',
          inputType: 'checklist',
          checklistItems: [
            'Detaillierte Autoren-Bio mit Bild und Qualifikationen auf der Website eingebunden',
            'FAQ-Schema (JSON-LD) auf deinen Kern-Seiten integriert',
            'Ersten E-E-A-T geprüften Fachartikel mit eigenen Praxis-Beispielen publiziert'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  {
    id: 49,
    title: '49. VSL-Engineering & Video Sales Letter Meisterklasse',
    subtitle: 'Die 10-Minuten VSL-Formel, State-Change Dramaturgie & Hypnotic Visuals',
    color: 'from-amber-600 via-red-600 to-rose-700',
    badgeIcon: '🎬',
    description: 'Der Video Sales Letter (VSL) ist die stärkste Verkaufsmaschine der Welt: Lerne die exakte psychologische Dramaturgie kennen, die kalte Zuschauer fesselt, alle Einwände auflöst und Kaufquoten über 5% erzielt.',
    lessons: [
      {
        id: '49.1',
        stageId: 49,
        stageTitle: '49. VSL-Dramaturgie & Skripting',
        title: 'Die 12-Stufen VSL-Formel: Vom Schmerz-Hook bis zum Call to Action',
        durationMinutes: 34,
        description: 'Das mathematisch präzise Skript-Framework für hochkonvertierende Video Sales Letter.',
        learnContent: {
          videoTitle: 'Masterclass: Die 12-Stufen VSL-Skript-Architektur',
          videoDuration: '34:20',
          summaryText: 'Ein schlechter VSL langweilt nach 30 Sekunden. Ein Meister-VSL fühlt sich an wie ein fesselnder Dokumentarfilm, der dem Zuschauer die Augen öffnet und dein Produkt als einzige logische Lösung präsentiert.',
          bulletPoints: [
            'Stufe 1-3: Der Schock-Hook, das gebrochene Versprechen und die Enthüllung des wahren Feindes',
            'Stufe 4-6: Die Heldengeschichte (Hero Journey), der Tiefpunkt und die Entdeckung des neuen Mechanismus',
            'Stufe 7-9: Beweise, Fallstudien und die Demontage der 5 größten Einwände',
            'Stufe 10-12: Der Value Stack, die risikofreie Garantie und die Verknappung (Scarcity)'
          ],
          coreConcepts: [
            {
              iconName: 'video',
              title: 'THE NEW MECHANISM',
              description: 'Nicht härter arbeiten, sondern einen bisher unbekannten Hebel nutzen.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'STATE CHANGE HOOK',
              description: 'Gefühlszustand des Zuschauers in den ersten 15 Sekunden radikal verändern.'
            }
          ],
          resources: [
            {
              title: 'Wort-für-Wort VSL Skript Template',
              subtitle: '12-Stufen Leitfaden mit Beispielen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR KI VSL-Writer',
              subtitle: 'Generiere komplette VSL-Skripte passend zu deinem Angebot',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Die Dramaturgie des perfekten VSLs

Ein VSL verkauft nicht über Features, sondern über eine veränderte Überzeugung im Kopf des Kunden.

#### Die Kern-Phasen des VSLs:
1. **Der Big Reveal**: "In den nächsten 10 Minuten zeige ich dir, warum alles, was du bisher über [Thema] gehört hast, falsch ist..."
2. **Der Mechanismus**: Erkläre wissenschaftlich oder logisch plausibel, warum frühere Versuche scheitern mussten.
3. **Die Transformation**: Zeige Vorher-Nachher Resultate echter Kunden.
4. **Der Call to Action**: Blende den Kaufen-Button erst genau in der Sekunde ein, in der der Preis genannt wird.`
        },
        understandContent: {
          coreTakeaway: 'Wenn der Zuschauer an deinen einzigartigen Mechanismus glaubt, ist der Verkauf bereits abgeschlossen.',
          keyPrinciples: [
            'Niemals langatmige Firmenvorstellungen am Anfang – starte sofort mit dem größten Schmerzpunkt',
            'Kaufen-Button zeitverzögert erst beim Pitch einblenden (Delay-Button)'
          ]
        },
        actionTask: {
          instruction: 'Schreibe das Skript für deinen ersten 10-Minuten VSL:',
          inputType: 'checklist',
          checklistItems: [
            "Schock-Hook und 'Neuen Mechanismus' definiert",
            '12-Stufen VSL-Skript vollständig formuliert',
            'Folien mit kontrastreichen Text-Elementen und Symbolen erstellt'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '49.2',
        stageId: 49,
        stageTitle: '49. VSL-Produktion & Funnel-Player',
        title: 'VSL-Produktion & High-Speed Video-Hosting: Drop-Offs verhindern',
        durationMinutes: 28,
        description: 'Wie du VSLs mit Loom, Descript oder CapCut aufnimmst und mit Wistia oder Bunny.net blitzschnell ausspielst.',
        learnContent: {
          videoTitle: 'Masterclass: VSL-Produktion, Video-Player & Conversion-Tricks',
          videoDuration: '28:30',
          summaryText: 'Langsame Video-Ladezeiten vernichten Millionen an Werbeumsatz. Erfahre, wie du Videos verlustfrei komprimierst, benutzerdefinierte Video-Player mit animierten Play-Buttons nutzt und Abbrüche minimierst.',
          bulletPoints: [
            'Foliengestaltung: Schwarzer Text auf weißem Grund oder Neon auf Dunkelgrau für maximale Lesbarkeit',
            'Stimmdynamik: Betonung, Pausen und Hintergrundmusik zur emotionalen Steuerung',
            "Smart Video-Player: Autoplay mit Stummschaltung und 'Tippe für Ton'-Banner",
            'Resume-Playback: Besucher setzen das Video an der exakten Stelle fort, an der sie abgebrochen haben'
          ],
          coreConcepts: [
            {
              iconName: 'play',
              title: 'SMART AUTOPLAY',
              description: 'Animierte Vorschau verleitet bis zu 85% der Besucher zum Starten des Videos.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'BUNNY CDN SPEED',
              description: 'Ladezeiten unter 200 Millisekunden weltweit für null Absprungrate.'
            }
          ],
          resources: [
            {
              title: 'VSL Folien-Master & Design-Set',
              subtitle: 'Keynote & PowerPoint Vorlagen mit optimierten Kontrasten als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara Landingpage VSL-Player',
              subtitle: 'Verzögerten Button-Klick und Video-Tracking im Funnel einstellen',
              type: 'tool',
              iconName: 'layout',
              actionUrl: 'landingpage'
            }
          ],
          fullArticleGuide: `### Die technische Optimierung deines Video Sales Letters

Ein Video nützt nichts, wenn der Besucher vor dem Laden der ersten Sekunde die Seite verlässt.

#### Die technischen Must-Haves:
- **Kein YouTube-Player**: YouTube-Player zeigen nach dem Video fremde Vorschläge und leiten Kunden ab.
- **Dediziertes CDN-Hosting**: Nutze professionelles Video-Hosting über Bunny.net oder Vimeo OTT.
- **Delayed Button**: Der Checkout-Button erscheint erst bei Minute 08:30, wenn der Preis fällt.`
        },
        understandContent: {
          coreTakeaway: 'Technik muss unsichtbar sein – der Zuschauer darf nur die packende Story wahrnehmen.',
          keyPrinciples: [
            'Audio-Qualität ist wichtiger als 4K-Kamera – ein klares Mikrofon ist Pflicht',
            'Mobile Optimierung: Der Text auf den Folien muss auf kleinsten Bildschirmen lesbar sein'
          ]
        },
        actionTask: {
          instruction: 'Produziere und binde deinen VSL ein:',
          inputType: 'checklist',
          checklistItems: [
            'VSL-Audio sauber mit Rauschfilter aufgenommen',
            'Video auf schnellem CDN gehostet und in Landingpage integriert',
            'Zeitverzögerte Einblendung des Kaufen-Buttons exakt getimt'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 50,
    title: '50. Das 8-Figure Holding- & Unternehmensstruktur-System',
    subtitle: 'Holding-Setup, Steueroptimierung, Vermögensschutz & M&A-Vorbereitung',
    color: 'from-slate-800 via-zinc-900 to-amber-500',
    badgeIcon: '🏛️',
    description: 'Das Fundament für echte Milliardärs-Sicherheit: Baue eine rechtssichere Holding-Struktur (Mutter-Tochter-GmbHs) auf, sichere Unternehmensgewinne mit 1,5% Steuersatz und schütze dein Privatvermögen vor Haftungsrisiken.',
    lessons: [
      {
        id: '50.1',
        stageId: 50,
        stageTitle: '50. Holding-Architektur & Steueroptimierung',
        title: 'Die Holding-Struktur: 1,5% Steuer auf Dividenden & Exits',
        durationMinutes: 35,
        description: 'Wie die Mutter-Tochter-Gesellschaft nach § 8b KStG funktioniert und warum jeder 6- bis 7-Figure Unternehmer eine Holding braucht.',
        learnContent: {
          videoTitle: 'Masterclass: Die Holding-Architektur für digitale Unternehmer',
          videoDuration: '35:10',
          summaryText: 'Wer als Einzelunternehmer oder mit einer einfachen GmbH skaliert, verbrennt bis zu 50% seiner Gewinne an Steuern. Erfahre, wie du Gewinne aus der operativen Gesellschaft nahezu steuerfrei in die Holding verschiebst und dort reinvestierst.',
          bulletPoints: [
            'Die Struktur: Holding GmbH (oben) hält 100% der Anteile an der operativen Betriebs-GmbH (unten)',
            '§ 8b KStG: 95% Steuerbefreiung auf Dividenden und Beteiligungsverkäufe (effektiver Steuersatz ~1,5%)',
            'Gewinnabführungsvertrag & Organschaft: Wann sie Sinn machen und wann man sie vermeidet',
            'Vermögensaufbau in der Holding: Aktien, Immobilien und Private Equity steuerbegünstigt kaufen'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'ASSET PROTECTION',
              description: 'Operative Haftungsrisiken berühren niemals das angesammelte Holding-Vermögen.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: '1,5% TAX LEVERAGE',
              description: 'Vollständige Reinvestitionskraft für Immobilien und Aktienportfolios.'
            }
          ],
          resources: [
            {
              title: 'Holding-Struktur & Steuer-Kompass Blueprint',
              subtitle: 'Übersicht über Gesellschaftsformen & Steuerflüsse als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Company Billing',
              subtitle: 'Rechnungsstellung und Mandanten-Trennung im CRM verwalten',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Macht der Holding-Struktur

In der operativen GmbH wird das Risiko getragen. In der Holding wird der Wohlstand gesichert.

#### Die 3 goldenen Vorteile:
1. **Haftungstrennung**: Sollte die operative Gesellschaft verklagt werden, ist das Geld in der Holding sicher.
2. **Steuerstundung**: Gewinnausschüttungen werden erst bei Entnahme ins Privatvermögen voll besteuert.
3. **Exit-Vorteil**: Beim Verkauf der operativen GmbH fließen die Millionen zu 98,5% netto in die Holding.`
        },
        understandContent: {
          coreTakeaway: 'Reiche Menschen besitzen nichts privat – sie kontrollieren alles über intelligente Unternehmensstrukturen.',
          keyPrinciples: [
            'Die Holding MUSS vor dem Aufbau wertvoller Firmenanteile gegründet werden',
            'Keine operativen Verträge oder Risikogeschäfte über die Holding abwickeln'
          ]
        },
        actionTask: {
          instruction: 'Plane dein steueroptimiertes Holding-Setup:',
          inputType: 'checklist',
          checklistItems: [
            'Strukturplan mit Steuerberater auf Holding-Eignung geprüft',
            'Gesellschaftsverträge mit Notar auf Anteilsabtretungen vorbereitet',
            'Trennungs-Buchhaltung für Betriebs- und Holding-Konto eingerichtet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '50.2',
        stageId: 50,
        stageTitle: '50. IP-Lizenzierung & Vermögensschutz',
        title: 'IP-Holding & Lizenzgebühren: Marken, Software & Patente schützen',
        durationMinutes: 31,
        description: 'Wie du geistiges Eigentum (IP) in einer separaten Gesellschaft parkst und Lizenzgebühren rechtssicher verrechnest.',
        learnContent: {
          videoTitle: 'Masterclass: IP-Lizenzierung & Asset Protection',
          videoDuration: '31:30',
          summaryText: 'Deine Marke, deine Kursinhalte und dein Software-Code sind dein wertvollstes Kapital. Erfahre, wie du diese Assets in eine eigene IP-Holding auslagerst und deine operative Firma für die Nutzung lizenzieren lässt.',
          bulletPoints: [
            'IP-Transfer: Wie Marke, Domains und Code rechtssicher in der Holding verankert werden',
            'Fremdvergleichsgrundsatz (Arm’s Length Principle): Lizenzgebühren steuerlich wasserdicht kalkulieren',
            'Schutz vor Insolvenz und Mitbewerber-Klagen: Warum niemand an deine Kern-Assets herankommt',
            'Stiftungs-Modelle: Wann sich eine Familienstiftung zur generationenübergreifenden Vermögenssicherung lohnt'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'IP VAULT',
              description: 'Markenrechte und Domains sind vollkommen isoliert vom operativen Geschäftsrisiko.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'FOUNDATION LEGACY',
              description: 'Stiftungen für steuerfreien Generationen-Vermögensübergang.'
            }
          ],
          resources: [
            {
              title: 'IP-Lizenzvertrag & Fremdvergleichs-Muster',
              subtitle: 'Rechtlicher Leitfaden zur internen Verrechnung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Corporate Asset Manager',
              subtitle: 'Lizenzverträge und IP-Nachweise digital archivieren',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Festung um dein geistiges Eigentum

Wenn eine operative Firma strauchelt, darf das Herzstück – die Marke und das Know-how – niemals verloren gehen.

#### Die IP-Architektur:
- **Besitz**: Die Holding oder IP-Gesellschaft besitzt die Marken, Geschmacksmuster und Software-Rechte.
- **Nutzung**: Die operative GmbH mietet diese Rechte gegen eine marktübliche monatliche Lizenzgebühr.
- **Folge**: Der Gewinn der operativen GmbH sinkt (geringere Gewerbesteuer), während das Kapital sicher oben ankommt.`
        },
        understandContent: {
          coreTakeaway: 'Wer seine Assets trennt, schläft ruhig und baut ein unzerstörbares Firmen-Imperium auf.',
          keyPrinciples: [
            'Lizenzgebühren müssen durch reale Gutachten oder Marktpreise belegbar sein',
            'Markeneintragungen beim DPMA und EUIPO immer auf die Holding ausstellen'
          ]
        },
        actionTask: {
          instruction: 'Sichere deine geistigen Eigentumsrechte ab:',
          inputType: 'checklist',
          checklistItems: [
            'Wort- und Bildmarken beim DPMA/EUIPO auf Holding-Ebene registriert',
            'Lizenzvertrag zwischen Holding und Betriebs-GmbH aufgesetzt',
            'Domains und IP-Assets auf die Muttergesellschaft umgeschrieben'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 51,
    title: '51. B2B Account-Based Marketing (ABM) für Großkonzerne',
    subtitle: '1-to-1 Kampagnen, Enterprise Pipeline Acceleration & C-Level Geschenke',
    color: 'from-blue-800 via-indigo-900 to-slate-900',
    badgeIcon: '🏢',
    description: 'Gewinne DAX-Konzerne, Mittelständler und 50.000€+ Jahresverträge: Meistere hyper-personalisiertes Account-Based Marketing (ABM), physische Direct-Mail Kampagnen und maßgeschneiderte Landingpages für Vorstände.',
    lessons: [
      {
        id: '51.1',
        stageId: 51,
        stageTitle: '51. ABM-Strategie & Account-Auswahl',
        title: 'Die Tier-1 Target Account Matrix: Die 50 Traumkunden identifizieren',
        durationMinutes: 30,
        description: 'Wie du deine lukrativsten Zielunternehmen filterst, das Buying Center analysierst und jeden Entscheider kartografierst.',
        learnContent: {
          videoTitle: 'Masterclass: Account-Based Marketing & Enterprise Targeting',
          videoDuration: '30:30',
          summaryText: 'Im B2B-Enterprise-Bereich gibt es kein Massenmarketing. Lerne, wie du eine Liste der 50 wertvollsten Firmen deiner Branche erstellst und jeden Entscheider im Buying Center mit maßgeschneiderten Inhalten begleitest.',
          bulletPoints: [
            'Die 3 ABM-Ebenen: 1-to-1 (Strategisch), 1-to-Few (Skaliert) und 1-to-Many (Programmatisch)',
            'Buying Center Mapping: CEO (Freigabe), CFO (Budget), Head of Department (Nutzer) und Betriebsrat',
            'Intent Data: Erkennen, welche Konzerne gerade aktiv nach deinen Lösungen googeln',
            'Maßgeschneiderte Value-Propositions für jede einzelne Entscheider-Rolle'
          ],
          coreConcepts: [
            {
              iconName: 'target',
              title: 'BUYING CENTER MAP',
              description: 'Gleichzeitige Ansprache aller 4-6 Entscheider eines Großkonzerns.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: 'INTENT SIGNALS',
              description: 'Unternehmen kontaktieren, genau wenn ihr Kaufinteresse am höchsten ist.'
            }
          ],
          resources: [
            {
              title: 'ABM Target Account & Buying Center Template',
              subtitle: 'Excel-Matrix zur Kartografierung von Großkunden',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Account-Management',
              subtitle: 'Unternehmen mit mehreren Ansprechpartnern im CRM verknüpfen',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Essenz des Account-Based Marketings

Große Deals werden nicht im Warenkorb abgeschlossen, sondern durch Konsens im Vorstand.

#### Der ABM-Stufenplan:
1. **Ideal Customer Profile (ICP)**: Definiere Umsatz, Mitarbeiterzahl und Tech-Stack deiner Wunschkunden.
2. **Die Top 50 Liste**: Wähle 50 Accounts aus, bei denen ein einzelner Abschluss mindestens 50.000€ wert ist.
3. **Multi-Threading**: Vernetze dich zeitgleich mit 3-5 Führungskräften desselben Unternehmens.
4. **Personalized Content**: Erstelle ein Whitepaper oder eine Video-Analyse exklusiv für diese Firma.`
        },
        understandContent: {
          coreTakeaway: 'Angle nicht mit dem Netz im Meer – jage mit der Harpune nach den dicksten Fischen.',
          keyPrinciples: [
            'Enterprise B2B Verkäufe dauern 3-9 Monate – Kontinuität und Mehrwert gewinnen den Deal',
            'Jeder Entscheider im Buying Center hat andere Ängste (CFO = Kosten, Fachleiter = Arbeitsaufwand)'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deine Liste der Top 20 Zielkonzerne:',
          inputType: 'checklist',
          checklistItems: [
            'Liste von 20 Wunsch-Großunternehmen mit Jahresumsatz >10 Mio. € angelegt',
            'Pro Unternehmen mindestens 3 relevante Entscheider (Name, Position, LinkedIn) recherchiert',
            'Unternehmensspezifisches Nutzenversprechen für jeden Account formuliert'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '51.2',
        stageId: 51,
        stageTitle: '51. Direct Mail & Physische Türöffner',
        title: 'Lumpy Mail & Executive Outreach: Auffallen ohne Umgehungstaktiken',
        durationMinutes: 28,
        description: 'Wie du relevante physische Mailings respektvoll, transparent und im Einklang mit internen Annahmeregeln einsetzt.',
        learnContent: {
          videoTitle: 'Masterclass: Physisches Direct-Mailing & High-End Türöffner',
          videoDuration: '28:40',
          summaryText: "Relevante physische Post kann im B2B-Outreach Aufmerksamkeit erzeugen. Plane kleine, messbare Tests, respektiere Annahme-, Datenschutz- und Compliance-Regeln und rechne nicht mit einer festen Antwort- oder Terminquote.",
          bulletPoints: [
            "Das 'Lumpy Mail' Prinzip: Ein relevanter, angemessener Inhalt, der Interesse wecken kann",
            'Video-Brochures: Edle Klappkarten mit integriertem LCD-Display, die beim Öffnen dein Video abspielen',
            "Das 'Zerschnittene Buch': Ein Buch mit persönlicher Widmung und einem Lesezeichen bei der Lösung",
            'Das telefonische Follow-up: Wie du nach der Zustellbestätigung den perfekten Übergang zum Gespräch machst'
          ],
          coreConcepts: [
            {
              iconName: 'mail',
              title: 'LUMPY MAIL IMPACT',
              description: 'Ein passendes physisches Mailing kann Aufmerksamkeit erhalten, wird aber nicht zwingend persönlich geöffnet.',
              highlight: true
            },
            {
              iconName: 'video',
              title: 'VIDEO BROCHURE',
              description: 'Personalisierte LCD-Videokarte sorgt für maximalen Wow-Effekt beim Entscheider.'
            }
          ],
          resources: [
            {
              title: 'Lumpy Mail Kampagnen-Katalog & Anschreiben-Muster',
              subtitle: '10 kreative Mailing-Ideen für B2B als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Sendungsverfolgungs-Trigger',
              subtitle: 'Automatischer Telefonie-Reminder, sobald das Paket zugestellt ist',
              type: 'tool',
              iconName: 'send',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Psychologie des physischen Türöffners

Physische Mailings können anders wahrgenommen werden als E-Mails. Zustellung, Öffnung und Reaktion hängen jedoch von Unternehmen, internen Regeln, Relevanz und Timing ab.

#### Die Schritte einer VIP-Mailing Kampagne:
- **Schritt 1 (Das Mailing)**: Sende sachliche, relevante Unterlagen ohne unangemessene Geschenke und beachte die Annahmerichtlinien des Unternehmens.
- **Schritt 2 (Das Tracking)**: Überwache die Sendungsverfolgung minutengenau.
- **Schritt 3 (Das Follow-up)**: Frage nach einem angemessenen Zeitraum höflich nach, ohne Zustellung an eine bestimmte Person zu behaupten.
- **Schritt 4 (Der Termin)**: Vereinbare ein unverbindliches 15-minütiges Strategiegespräch.`
        },
        understandContent: {
          coreTakeaway: 'Ein relevantes Mailing kann einen Gesprächsanlass schaffen; Erfolg, Termin und Auftragswert bleiben offen und müssen gemessen werden.',
          keyPrinciples: [
            'Niemals billigen Werbemüll verschicken – Qualität des Geschenks spiegelt Qualität deiner Dienstleistung wider',
            'Das Follow-up Telefonat innerhalb von 2 Stunden nach Zustellung ist Pflicht'
          ]
        },
        actionTask: {
          instruction: 'Plane deine erste Lumpy-Mail Testkampagne:',
          inputType: 'checklist',
          checklistItems: [
            'Mailing-Konzept (z. B. Video-Broschüre oder personalisiertes Buch) ausgewählt',
            'Persönliches Anschreiben mit individuellem Bezug zum Zielunternehmen formuliert',
            'Zustell- und Telefon-Follow-up Workflow im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 52,
    title: '52. KI-Voice-Bots & Telefonie-Automatisierung im Vertrieb',
    subtitle: 'Conversational Voice AI, Inbound Lead-Annahme & 24/7 Terminbuchung per Telefon',
    color: 'from-cyan-600 via-teal-600 to-blue-700',
    badgeIcon: '🤖',
    description: 'Ersetze teure Callcenter durch menschlich klingende KI-Sprachagenten: Baue Telefonie-Bots, die Anrufe in unter 1 Sekunde entgegennehmen, Kundenfragen beantworten und Termine direkt in deinen Kalender buchen.',
    lessons: [
      {
        id: '52.1',
        stageId: 52,
        stageTitle: '52. Voice-AI Architektur & Setup',
        title: 'KI-Telefonie-Setup: Natürlich klingende Voice-Agenten mit Retell & Vapi',
        durationMinutes: 32,
        description: 'Wie moderne Voice-APIs Sprache in Echtzeit transkribieren, per LLM verarbeiten und mit menschlicher Intonation antworten.',
        learnContent: {
          videoTitle: 'Masterclass: Einrichtung von KI-Sprachassistenten für den Vertrieb',
          videoDuration: '32:20',
          summaryText: 'Moderne KI-Sprachmodelle klingen heute so menschlich, dass Kunden den Unterschied nicht mehr bemerken. Lerne, wie du einen 24/7 KI-Telefonisten konfigurierst, der alle eingehenden Werbe-Leads in Sekunden anruft.',
          bulletPoints: [
            'Die Technologie: Speech-to-Text (Deepgram) $\rightarrow$ LLM Reasoning (Gemini/GPT-4o) $\rightarrow$ Text-to-Speech (ElevenLabs/Cartesia)',
            'Latenz-Optimierung: Wie du Antworten unter 600 Millisekunden erreichst für natürliche Gespräche',
            'Unterbrechungs-Erkennung (Turn-Taking): Die KI stoppt sofort, wenn der Kunde ins Wort fällt',
            'System-Prompting für Telefon-Agenten: Klare Grenzen, Verkaufsleitfäden und Einwandbehandlung'
          ],
          coreConcepts: [
            {
              iconName: 'phone',
              title: 'INSTANT SPEED-TO-LEAD',
              description: 'Automatischer Rückruf von neuen Web-Leads innerhalb von 15 Sekunden.',
              highlight: true
            },
            {
              iconName: 'cpu',
              title: 'LOW-LATENCY VOICE',
              description: 'Unter 600ms Reaktionszeit für flüssigen menschlichen Gesprächsfluss.'
            }
          ],
          resources: [
            {
              title: 'Voice-AI System-Prompt & Gesprächsleitfaden',
              subtitle: 'Erprobte Telefonie-Prompts für Inbound & Outbound als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Voice-AI Schnittstelle',
              subtitle: 'Webhook-Anbindung für automatische Anrufe bei Lead-Eingang',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Revolution der KI-Sprachagenten

Wer nach dem Absenden eines Formulars 24 Stunden auf einen Rückruf wartet, kauft beim Konkurrenten.

#### Der Workflow des KI-Telefonisten:
1. **Formular ausgefüllt**: Kunde trägt Handynummer im Funnel ein.
2. **Webhook auslösen**: Das Mara CRM sendet die Daten an den Voice-Agenten.
3. **Anruf nach 15 Sekunden**: Die KI ruft an, bedankt sich für die Anfrage und stellt 3 Vorqualifizierungsfragen.
4. **Kalender-Buchung**: Bei Eignung wählt die KI live im Telefonat einen freien Termin im Kalender des Closers.`
        },
        understandContent: {
          coreTakeaway: 'Wer Kunden in den ersten 60 Sekunden anruft, hat eine 391% höhere Chance auf einen Verkaufsabschluss.',
          keyPrinciples: [
            'Die KI muss sich transparent als virtueller Assistent vorstellen',
            'Bei komplexen Sonderfällen muss eine sofortige Live-Weiterleitung an einen Menschen möglich sein'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deinen ersten KI-Telefon-Assistenten:',
          inputType: 'checklist',
          checklistItems: [
            'Voice-Prompt mit 3 Qualifizierungsfragen und Einwandbehandlung verfasst',
            'Telefonnummer mit deutscher Vorwahl im Voice-Portal gemietet',
            'Kalender-Schnittstelle zur automatischen Terminbuchung getestet'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '52.2',
        stageId: 52,
        stageTitle: '52. Inbound & Outbound Skalierung',
        title: 'Inbound-Annahme & No-Show Rettung: Telefon-Bots in der Praxis',
        durationMinutes: 29,
        description: 'Wie Voice-Bots Nichterscheiner (No-Shows) reaktivieren und Support-Hotlines vollautomatisch entlasten.',
        learnContent: {
          videoTitle: 'Masterclass: No-Show Rettung & Hotline-Automatisierung',
          videoDuration: '29:40',
          summaryText: 'Nichts ist frustrierender als Termine, zu denen Interessenten nicht erscheinen. Lerne, wie dein KI-Agent 15 Minuten vor dem Call anruft, um die Anwesenheit zu bestätigen, oder verpasste Termine sofort neu einbucht.',
          bulletPoints: [
            'Der 15-Minuten Reminder-Call: "Ich wollte kurz sicherstellen, dass der Zoom-Link angekommen ist"',
            'Die No-Show Reaktivierungs-Kampagne: Automatischer Anruf 5 Minuten nach verpasstem Termin',
            'Kundenservice-Hotlines: 80% der Standardfragen (Öffnungszeiten, Rechnungsfragen) ohne Personal lösen',
            'Gesprächs-Transkription & CRM-Zusammenfassung: Jeder Anruf wird als Notiz im Lead-Profil gespeichert'
          ],
          coreConcepts: [
            {
              iconName: 'calendar',
              title: 'NO-SHOW MINIMIZER',
              description: 'Erhöhung der Show-Up Rate auf über 85% durch automatisierte Telefon-Erinnerung.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'AUTO-CALL-SUMMARY',
              description: 'Vollständige KI-Zusammenfassung jedes Telefonats direkt im Mara CRM.'
            }
          ],
          resources: [
            {
              title: 'No-Show & Inbound Telefonie-Skripte',
              subtitle: 'Vorlagen für Erinnerungen und Reaktivierung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Anruf-Transkripte',
              subtitle: 'Aufzeichnungen und KI-Analysen direkt im Lead-Feed einsehen',
              type: 'tool',
              iconName: 'phone',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Praxis der Telefonie-Automatisierung

Ein verpasster Termin ist kein verlorener Kunde, wenn man innerhalb von 5 Minuten reagiert.

#### Die 3 profitabelsten Anwendungsfälle:
1. **Pre-Call Confirmation**: Kurzer Anruf vor dem Beratungstermin senkt No-Shows drastisch.
2. **Reaktivierung alter Leads**: Lasse die KI 500 alte Leads aus dem Vorjahr anrufen und fragen, ob das Thema noch aktuell ist.
3. **After-Hour Support**: Kundenanrufe am Wochenende oder abends werden kompetent beantwortet.`
        },
        understandContent: {
          coreTakeaway: 'Telefonie-Automatisierung rettet bis zu 30% der sonst verlorenen Vertriebsumsätze.',
          keyPrinciples: [
            'Erinnerungsanrufe freundlich, kurz und lösungsorientiert halten',
            'Gesprächsergebnisse müssen sofort per Tagging das CRM aktualisieren'
          ]
        },
        actionTask: {
          instruction: 'Richte die No-Show Rettungs-Automation ein:',
          inputType: 'checklist',
          checklistItems: [
            'Reminder-Anruf 15 Minuten vor Zoom-Terminen im CRM aktiviert',
            'No-Show Reaktivierungs-Workflow für verpasste Termine scharfgeschaltet',
            'Automatische Transkript-Speicherung im Mara CRM getestet'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 53,
    title: '53. Micro-Acquisitions: Digitale Unternehmen prüfen und entwickeln',
    subtitle: 'Due Diligence, SaaS & Content-Sites kaufen, Restrukturierung & Value-Add',
    color: 'from-amber-700 via-orange-600 to-yellow-600',
    badgeIcon: '💰',
    description: 'Lerne, digitale Unternehmen strukturiert zu prüfen, Kaufpreis und Risiken einzuordnen und nach einer Übernahme belastbare Verbesserungen zu testen. Erwerb, Wertentwicklung und Weiterverkauf bleiben mit erheblichen Risiken verbunden.',
    lessons: [
      {
        id: '53.1',
        stageId: 53,
        stageTitle: '53. Micro-M&A & Deal-Sourcing',
        title: 'Deal-Sourcing & Due Diligence: Digitale Unternehmen sorgfältig prüfen',
        durationMinutes: 34,
        description: 'Wie du Angebote auf Marktplätzen und über Makler findest und Umsatz, Kosten, Technik, Recht sowie Abhängigkeiten nachvollziehbar prüfst.',
        learnContent: {
          videoTitle: 'Masterclass: Digitale Firmenkäufe & Due Diligence Checkliste',
          videoDuration: '34:10',
          summaryText: 'Der Kauf eines bestehenden Unternehmens kann Zugang zu Produkt, Kunden und Prozessen bieten, bringt aber finanzielle, technische und rechtliche Risiken mit sich. Lerne, Annahmen zu prüfen und unterschiedliche Entwicklungsszenarien zu modellieren.',
          bulletPoints: [
            'Die Marktplätze: Acquire.com (SaaS), Flippa, Empire Flippers und Direct-Outreach an Website-Inhaber',
            'Due Diligence Checkliste: Google Analytics Fake-Traffic entlarven, Churn prüfen, Code-Audit durchführen',
            'Bewertungsbandbreiten: SDE, Wachstum, Abhängigkeiten, Qualität und Marktvergleich gemeinsam beurteilen',
            'Asset Purchase Agreement (APA): Vermögenswerte, übernommene Pflichten und verbleibende Haftungsrisiken rechtlich prüfen lassen'
          ],
          coreConcepts: [
            {
              iconName: 'search',
              title: 'BUY THEN BUILD',
              description: 'Bestehende Assets können Aufbauzeit reduzieren; Integrationsaufwand, Kundenbindung und Datenqualität müssen geprüft werden.',
              highlight: true
            },
            {
              iconName: 'shield-check',
              title: 'DUE DILIGENCE AUDIT',
              description: 'Zahlungsströme, Analytics-Daten und Quelldokumente abgleichen; vollständige Sicherheit bietet auch eine Due Diligence nicht.'
            }
          ],
          resources: [
            {
              title: 'Due Diligence Master-Checkliste für Webseiten & SaaS',
              subtitle: '100 Prüfpunkte vor dem Firmenkauf als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Store Datenmigration',
              subtitle: 'Kunden- und E-Mail-Listen gekaufter Unternehmen sicher importieren',
              type: 'tool',
              iconName: 'database',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Strategie des 'Buy & Build'

Viele geniale Entwickler haben tolle Software gebaut, verstehen aber nichts von Funnels, Copywriting und Marketing.

#### Wo der Wertzuwachs entsteht:
1. **Das ungeschliffene Juwel**: Ein Tool mit 2.000 monatlichen Nutzern, aber ohne E-Mail Marketing und mit schlechter Landingpage.
2. **Die Bewertung**: Leite eine Bandbreite aus Ertrag, Wachstum, Risiken und vergleichbaren Transaktionen ab.
3. **Die Tests**: Prüfe Preis, Kommunikation und Akquisekanäle schrittweise mit klaren Kosten- und Abbruchkriterien.
4. **Die Auswertung**: Vergleiche Umsatz, Deckungsbeitrag, Kundenbindung und Aufwand; eine Steigerung ist nicht garantiert.`
        },
        understandContent: {
          coreTakeaway: 'Ein günstiger Kaufpreis ersetzt keine sorgfältige Prüfung, realistische Integrationsplanung und professionelle Beratung.',
          keyPrinciples: [
            'Asset Deal und Share Deal anhand von Steuern, Haftung, Verträgen und Übertragbarkeit mit Fachleuten vergleichen',
            'Niemals ein Unternehmen kaufen, dessen Traffic nur von einer einzigen instabilen Quelle abhängt'
          ]
        },
        actionTask: {
          instruction: 'Analysiere deinen ersten potenziellen Zukauf:',
          inputType: 'checklist',
          checklistItems: [
            'Konto auf Acquire.com oder Flippa angelegt',
            '3 potenzielle SaaS- oder Content-Assets nach SDE-Kriterien gescreent',
            'Due-Diligence Checkliste auf das interessanteste Listing angewendet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '53.2',
        stageId: 53,
        stageTitle: '53. Post-Merger Optimization & Flip',
        title: 'Der 90-Tage-Turnaround: Werttreiber prüfen und priorisieren',
        durationMinutes: 31,
        description: 'Wie du nach einer Übernahme Preise, Kundenbindung, E-Mail-Prozesse und Reporting prüfst und Verbesserungen kontrolliert priorisierst.',
        learnContent: {
          videoTitle: 'Masterclass: 90-Tage Skalierung & Unternehmens-Flipping',
          videoDuration: '31:30',
          summaryText: 'Nach dem Kauf beginnt die Integrations- und Prüfphase. Erfahre, wie du in den ersten 90 Tagen Cashflow-Risiken analysierst, sauberes Reporting etablierst und belastbare Verbesserungsmaßnahmen testest. Wertsteigerung und späterer Verkauf bleiben unsicher.',
          bulletPoints: [
            'Tag 1-30: Preisanpassung für Neukunden und Reaktivierung der inaktiven E-Mail-Liste',
            'Tag 31-60: Implementierung eines modernen Checkouts und Upsell-Funnels',
            'Tag 61-90: begrenzte Tests neuer Akquisekanäle mit klaren Kosten- und Abbruchkriterien',
            'Investor-Reporting: geprüfte Kennzahlen, Risiken und Entwicklung nachvollziehbar aufbereiten'
          ],
          coreConcepts: [
            {
              iconName: 'trending_up',
              title: 'PRICE LIFT LEVER',
              description: 'Preisanpassungen zunächst testen und dabei Nachfrage, Kündigungen und Deckungsbeitrag gemeinsam beobachten.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'MULTIPLE EXPANSION',
              description: 'Kauf- und Verkaufsmultiples hängen von Qualität, Wachstum, Risiko, Finanzierung und Marktumfeld ab.'
            }
          ],
          resources: [
            {
              title: '90-Tage Turnaround Playbook & Exit Deck',
              subtitle: 'Schritt-für-Schritt Fahrplan nach Firmenübernahme als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Profit & MRR Analytics',
              subtitle: 'Lückenloser Nachweis des Umsatzwachstums für den Käufer',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kunst des digitalen Unternehmens-Flippings

Wie ein Immobilien-Entwickler ein altes Haus renoviert, modernisierst du digitale Geschäftsmodelle.

#### Die 4 Hebel nach dem Kauf:
- **Hebel 1**: E-Mail Willkommens- und Win-Back-Sequenzen im Mara CRM aktivieren.
- **Hebel 2**: Checkout von Standard auf 1-Click-Upsells und Ratenzahlung umstellen.
- **Hebel 3**: Jährliche Zahlungspläne mit 20% Rabatt anbieten, um sofortige Liquidität zu generieren.
- **Hebel 4**: Neue Traffic-Kanäle (YouTube/Pinterest/Meta) erschließen.`
        },
        understandContent: {
          coreTakeaway: 'Gezielte Verbesserungen können den Unternehmenswert beeinflussen; Umfang, Dauer und Ergebnis sind nicht vorhersehbar.',
          keyPrinciples: [
            'Bestehende Kunden vor radikalen Änderungen behutsam informieren',
            'Alle Kennzahlen von Tag 1 an sauber für die Due Diligence des nächsten Käufers dokumentieren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deinen 90-Tage Turnaround-Plan:',
          inputType: 'checklist',
          checklistItems: [
            'Preis- und Angebotsstruktur-Audit für das Ziel-Asset erstellt',
            'E-Mail-Automations-Pipeline für Bestandskunden entworfen',
            'Dokumenten-Ordner für den späteren Weiterverkauf angelegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 54,
    title: '54. Krisen-Management, PR-Shitstorms & Reputationsschutz',
    subtitle: 'Crisis-Communication, De-Indexing, Trust-Wiederherstellung & Legal Defense',
    color: 'from-red-700 via-rose-800 to-slate-900',
    badgeIcon: '🛡️',
    description: 'Wenn der Sturm aufzieht: Schütze deine Marke vor unberechtigten Shitstorms, Trustpilot-Attacken und Medienberichten. Lerne, wie du Krisen deeskalierst, negative Google-Ergebnisse verdrängst und Vertrauen wiederherstellst.',
    lessons: [
      {
        id: '54.1',
        stageId: 54,
        stageTitle: '54. Krisen-Kommunikation & Shitstorm-Stopp',
        title: 'Die 24-Stunden Krisen-Matrix: Sofort-Reaktion bei Shitstorms & Angriffen',
        durationMinutes: 29,
        description: 'Wie du die ersten kritischen Stunden managst, offizielle Statements verfasst und emotionale Eskalationen im Keim erstickst.',
        learnContent: {
          videoTitle: 'Masterclass: Krisen-PR & Shitstorm-Deeskalation',
          videoDuration: '29:50',
          summaryText: 'Jedes wachsende Unternehmen wird früher oder später mit Kritik konfrontiert. Der Unterschied zwischen Marktführern und Verlierern liegt in der Professionalität der Reaktion. Lerne das 3-Phasen Deeskalations-Protokoll kennen.',
          bulletPoints: [
            'Die goldenen ersten 3 Stunden: Schweigen analysieren, Fakten zusammentragen, keine vorschnellen Emotionen',
            'Das 4-Punkte Krisen-Statement: Empathie, Transparenz, konkrete Fehlerbehebung und Zukunftsausblick',
            'Community-Management: Kommentarspalten moderieren ohne Zensur-Vorwürfe auszulösen',
            'Interne Team-Kommunikation: Mitarbeiter und Vertriebler auf einheitliche Sprachregelungen einschwören'
          ],
          coreConcepts: [
            {
              iconName: 'shield-alert',
              title: 'HOLDING STATEMENT',
              description: 'Sachliche Erst-Reaktion verhindert unkontrollierte Medien-Spekulationen.',
              highlight: true
            },
            {
              iconName: 'users',
              title: 'EMPATHY-FIRST',
              description: 'Berechtigte Kundenkritik sofort anerkennen und kulant lösen.'
            }
          ],
          resources: [
            {
              title: 'Krisen-PR Playbook & Statement-Vorlagen',
              subtitle: 'Wort-für-Wort Formulierungen für Krisenfälle als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Kundenfeedback & Reklamations-Ticketings',
              subtitle: 'Beschwerden priorisiert und eskalationsfrei im Support bearbeiten',
              type: 'tool',
              iconName: 'help-circle',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Psychologie des Krisenmanagements

Ein Shitstorm lebt von Sauerstoff. Wenn du defensiv oder arrogant reagierst, gießt du Benzin ins Feuer.

#### Die 4 Regeln der Krisen-Kommunikation:
1. **Niemals angreifen**: Greife niemals Kritiker oder Kunden öffentlich an – du verlierst immer vor den Augen der Zuschauer.
2. **Die Sachebene**: Trenne persönliche Beleidigungen von sachlicher Kritik.
3. **Die Kulanz-Geste**: Überrasche unzufriedene Kunden mit bedingungsloser Rückerstattung oder kostenlosen VIP-Upgrades.
4. **Der Lerneffekt**: Zeige öffentlich, welche Prozesse im Unternehmen verbessert wurden.`
        },
        understandContent: {
          coreTakeaway: 'Aus einer meisterhaft gelösten Krise geht ein Unternehmen mit mehr Vertrauen hervor als zuvor.',
          keyPrinciples: [
            "Niemals kritische Kommentare heimlich löschen – das erzeugt einen 'Streisand-Effekt'",
            'Ein sachliches Video des Gründers entwaffnet 90% der Wut im Netz'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen Notfall-Krisenplan:',
          inputType: 'checklist',
          checklistItems: [
            'Notfall-Krisenteam (Gründer, Support-Leiter, Anwalt) benannt',
            'Muster-Krisenstatement für verschiedene Szenarien vorbereitet',
            'Eskalations-Workflow für negative Kundenbewertungen im Support etabliert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '54.2',
        stageId: 54,
        stageTitle: '54. Reputations-Management & SERP-Bereinigung',
        title: 'SERP-Bereinigung & Review-Dominanz: Google-Seite 1 positiv kontrollieren',
        durationMinutes: 30,
        description: 'Wie du negative Suchergebnisse durch eigene Presseartikel auf Seite 2 verdrängst und Trustpilot-Profile legal optimierst.',
        learnContent: {
          videoTitle: 'Masterclass: Online Reputations-Management & SEO-Verdrängung',
          videoDuration: '30:30',
          summaryText: 'Wenn Interessenten deinen Namen auf Google suchen, müssen die ersten 10 Ergebnisse Vertrauen ausstrahlen. Erfahre, wie du mit digitaler PR und Trust-Plattformen eine uneinnehmbare Festung auf Google Seite 1 errichtest.',
          bulletPoints: [
            'Das SERP-Dominanz-Prinzip: Wie du alle 10 Plätze auf Seite 1 mit eigenen Profilen (LinkedIn, YouTube, Crunchbase, Medium) besetzt',
            'Positive Review-Automatisierung: Wie zufriedene Kunden nach Meilensteinen automatisiert um Bewertungen gebeten werden',
            'Löschung unberechtigter Fake-Bewertungen auf Google und Trustpilot über spezialisierte Kanzleien',
            'Trustpilot-Score Reparatur: Von 2.5 auf 4.8 Sterne durch aktive Einladungs-Funnels'
          ],
          coreConcepts: [
            {
              iconName: 'star',
              title: 'REVIEW INVITATION FUNNEL',
              description: 'Vollautomatischer Bewertungs-Trigger nach erfolgreichem Kunden-Meilenstein.',
              highlight: true
            },
            {
              iconName: 'globe',
              title: 'SERP SUPPRESSION',
              description: 'Verdrängung negativer Artikel auf Seite 2 durch hochwertige Authority-Publikationen.'
            }
          ],
          resources: [
            {
              title: 'Reputations-Management Leitfaden & Review-E-Mail Templates',
              subtitle: 'Vorlagen für 5-Sterne Bewertungs-Anfragen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Automatisierter Review-Drip',
              subtitle: 'Bewertungs-Einladungen bei hoher Kundenzufriedenheit automatisch senden',
              type: 'tool',
              iconName: 'star',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kontrolle über deine Suchergebnisse

Kunden googeln vor dem Kauf fast immer: "[Dein Name / Firmenname] Erfahrungen".

#### Die 3 Säulen der Marken-Reputation:
- **Eigene Kontroll-Assets**: Erstelle verifizierte Profile auf Medium, LinkedIn, YouTube, Wikipedia/Fandom und ProvenExpert.
- **Aktiver Bewertungs-Zufluss**: Bitte jeden Kunden, der ein tolles Resultat erzielt hat, innerhalb von 24 Stunden um eine ehrliche Bewertung.
- **Juristischer Schutz**: Gehe konsequent gegen nachweisliche Verleumdungen und Fake-Reviews von Konkurrenten vor.`
        },
        understandContent: {
          coreTakeaway: 'Wer seine Google-Seite 1 aktiv gestaltet, lässt Konkurrenten und Hatern keinen Raum.',
          keyPrinciples: [
            'Niemals gefälschte Bewertungen kaufen – das führt zu Account-Sperren und Reputationsverlust',
            'Der beste Reputationsschutz ist ein herausragendes Produkt mit begeisterten Kunden'
          ]
        },
        actionTask: {
          instruction: 'Sichere deine Google-Ergebnisseite ab:',
          inputType: 'checklist',
          checklistItems: [
            'Die ersten 10 Google-Ergebnisse für deinen Markennamen analysiert',
            'Fehlende Unternehmensprofile (LinkedIn, YouTube, Crunchbase) vervollständigt',
            'Automatisierte Bewertungs-Einladung für glückliche Kunden im CRM aktiviert'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 55,
    title: '55. Das Milliardärs-Mindset: Lebenswerk, Philosophie & Vermächtnis',
    subtitle: 'Vom Jäger zum Weisen: Epikur, Stoizismus, Philanthropie & Generationen-Vision',
    color: 'from-amber-500 via-yellow-500 to-amber-600',
    badgeIcon: '👑',
    description: 'Der ultimative Meilenstein der GOM-MAR Reise: Wie du unternehmerischen Reichtum mit seelischem Frieden, stoischer Gelassenheit, philanthropischer Wirkung und einem unvergänglichen Vermächtnis krönst.',
    lessons: [
      {
        id: '55.1',
        stageId: 55,
        stageTitle: '55. Stoizismus & Mentale Unerschütterlichkeit',
        title: 'Der stoische Unternehmer: Gelassenheit inmitten des Marktchaos',
        durationMinutes: 32,
        description: 'Wie du die Lehren von Marcus Aurelius und Seneca nutzt, um dich von äußeren Marktergebnissen emotional frei zu machen.',
        learnContent: {
          videoTitle: 'Masterclass: Stoizismus, Gelassenheit & Innere Souveränität',
          videoDuration: '32:45',
          summaryText: 'Echter Reichtum ist die Fähigkeit, unabhängig von Marktschwankungen, Krisen oder Erfolgen in tiefer innerer Ruhe zu verweilen. Lerne, wie die größten Denker der Geschichte unternehmerische Meisterschaft mit geistiger Freiheit verbanden.',
          bulletPoints: [
            'Die Dichotomie der Kontrolle (Epiktet): Konzentration nur auf das, was in deiner Macht steht',
            'Amor Fati: Die Liebe zum Schicksal – jede Hürde als Treibstoff für persönliches Wachstum nutzen',
            'Memento Mori: Die Endlichkeit der Zeit als Kompass für radikale Priorisierung und Klarheit',
            'Vom Mangel zum Überfluss: Warum Dankbarkeit die mächtigste Frequenz für nachhaltigen Wohlstand ist'
          ],
          coreConcepts: [
            {
              iconName: 'compass',
              title: 'DICHOTOMY OF CONTROL',
              description: 'Vollkommene Gelassenheit durch Trennung von eigenem Handeln und äußeren Umständen.',
              highlight: true
            },
            {
              iconName: 'heart',
              title: 'AMOR FATI',
              description: 'Herausforderungen nicht nur akzeptieren, sondern als Chance feiern.'
            }
          ],
          resources: [
            {
              title: 'Das Stoische Gründer-Manifest & Tägliches Journal',
              subtitle: 'Reflexionsfragen für Morgen- und Abendroutinen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Absolventen-Reflexion',
              subtitle: 'Deinen persönlichen Fortschritt über alle 55 Module betrachten',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'progress'
            }
          ],
          fullArticleGuide: `### Die stoische Kunst der Unternehmensführung

Wer sein emotionales Wohlbefinden vom täglichen Umsatz abhängig macht, bleibt ein Gefangener seines Erfolgs.

#### Die 3 stoischen Kern-Übungen:
1. **Praemeditatio Malorum**: Stelle dir das Schlimmste vor, was passieren könnte – und erkenne, dass du es überstehen wirst.
2. **Die Vogelperspektive**: Betrachte dein Unternehmen aus dem Kosmos – der Stress wird unbedeutend, die Dankbarkeit wächst.
3. **Tugendhaftes Handeln**: Nicht der Profit bestimmt deine Würde, sondern die Integrität, mit der du deine Kunden und Mitarbeiter behandelst.`
        },
        understandContent: {
          coreTakeaway: 'Wer sich selbst beherrscht, hat das größte aller Imperien erobert.',
          keyPrinciples: [
            'Erfolg nicht an Zahlen messen, sondern an der Tiefe der persönlichen Transformation',
            'Tägliche Stille und Selbstreflexion sind das Fundament für klare Entscheidungen'
          ]
        },
        actionTask: {
          instruction: 'Etabliere deine tägliche stoische Reflexions-Routine:',
          inputType: 'checklist',
          checklistItems: [
            'Morgen- und Abend-Journaling mit stoischen Fragen eingeführt',
            'Die 3 wichtigsten nicht-materiellen Lebensziele schriftlich festgehalten',
            'Dankbarkeits-Praxis für die bisherige Reise der 55 Module verankert'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '55.2',
        stageId: 55,
        stageTitle: '55. Philanthropie & Ewiges Vermächtnis',
        title: 'Das Lebenswerk: Wie du der Welt mehr zurückgibst, als du genommen hast',
        durationMinutes: 35,
        description: 'Die Vollendung: Wie du Stiftungen gründest, Mentoring-Initiativen startest und ein Vermächtnis hinterlässt, das Generationen überdauert.',
        learnContent: {
          videoTitle: 'Abschluss-Zeremonie: Dein Vermächtnis & Die GOM-MAR Master-Zertifizierung',
          videoDuration: '35:50',
          summaryText: 'Herzlichen Glückwunsch! Du hast 55 Stufen unternehmerischer, technischer, psychologischer und strategischer Meisterschaft gemeistert. In diesem großen Abschlussmodul bündeln wir dein Lebenswerk und feiern deine Zertifizierung.',
          bulletPoints: [
            'Impact Investing & Philanthropie: Wie man Kapital einsetzt, um echte gesellschaftliche Probleme zu lösen',
            'Das Mentoren-Prinzip: Wissen und Weisheit an die nächste Generation junger Gründer weitergeben',
            'Das 100-Jahre-Manifest: Was soll über dein Wirken gesprochen werden, wenn du nicht mehr da bist?',
            'Der GOM-MAR Lifetime Circle: Dein lebenslanger Ehrenplatz in unserer Gründer-Gemeinschaft'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'LIFETIME MASTER CERTIFICATE',
              description: 'Vollständiger Abschluss aller 55 Meilensteine des gesamten GOM-MAR Ökosystems.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'ETERNAL LEGACY',
              description: 'Ein Lebenswerk schaffen, das Menschlichkeit, Exzellenz und Freiheit vereint.'
            }
          ],
          resources: [
            {
              title: 'Das GOM-MAR Vermächtnis- & Stiftungs-Handbuch',
              subtitle: 'Leitfaden für philanthropische Projekte als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Master-Zertifikat Generator',
              subtitle: 'Offizielles Abschluss-Diplom mit Verifizierungs-Code generieren',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'progress'
            }
          ],
          fullArticleGuide: `### Das Finale: Dein Vermächtnis

Unternehmer zu sein ist die edelste Form der Wertschöpfung. Du löst Probleme, schaffst Arbeitsplätze, inspirierst Menschen und baust Zukunft.

#### Die goldenen Regeln für den Rest deines Lebens:
1. **Bleibe ein ewiger Schüler**: Egal wie groß dein Unternehmen wird, bewahre dir die kindliche Neugierde.
2. **Handle mit kompromissloser Integrität**: Dein Ruf ist dein einziges unbezahlbares Gut.
3. **Gib großzügig zurück**: Wahrer Reichtum zeigt sich nicht darin, wie viel man anhäuft, sondern wie viel man weitergibt.`
        },
        understandContent: {
          coreTakeaway: 'Das Ziel ist nicht, ewig zu leben – das Ziel ist, etwas zu schaffen, das ewig bleibt.',
          keyPrinciples: [
            'Wissen teilen und andere auf ihrem Weg nach oben unterstützen',
            'Freiheit, Gesundheit und Familie stets als oberste Priorität bewahren'
          ]
        },
        actionTask: {
          instruction: 'Schließe die GOM-MAR Masterclass feierlich ab:',
          inputType: 'checklist',
          checklistItems: [
            'Gesamtfortschritt der GOM-MAR Academy auf 100% gebracht',
            'Dein persönliches 100-Jahre-Vermächtnis-Manifest formuliert',
            'Offizielles GOM-MAR Lifetime Master Zertifikat im Profil generiert'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  }
];

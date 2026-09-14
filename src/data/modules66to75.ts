import { Stage } from '../types';

export const MODULES_66_TO_75: Stage[] = [
  {
    id: 66,
    title: '66. M&A, Due Diligence & Buy-and-Build Strategien',
    subtitle: 'Unternehmensübernahmen, Rollup-Modelle, Financial Audits & Post-Merger-Integration',
    color: 'from-amber-700 via-yellow-700 to-zinc-900',
    badgeIcon: '🤝',
    description: 'Lerne Akquisitionen als mögliche Wachstumsstrategie kennen: Prüfe Zielunternehmen, Integrationsrisiken, Finanzierung und mögliche Synergien, ohne eine bestimmte Bewertung oder Wertsteigerung vorauszusetzen.',
    lessons: [
      {
        id: '66.1',
        stageId: 66,
        stageTitle: '66. Deal-Sourcing & Financial Audits',
        title: 'M&A-Architektur: Deal-Sourcing, Letter of Intent (LOI) & Financial Due Diligence',
        durationMinutes: 34,
        description: 'Wie du Übernahme-Targets außerhalb öffentlicher Marktplätze findest, Bilanzen normalisierst (EBITDA-Bereinigung) und rechtssichere LOIs aufsetzt.',
        learnContent: {
          videoTitle: 'Masterclass: M&A Deal-Sourcing & Bilanz-Due-Diligence',
          videoDuration: '34:20',
          summaryText: 'Ein Zukauf kann Wachstum beschleunigen, erhöht aber auch Kapitalbedarf, Integrationsaufwand und Haftungsrisiken. Erfahre, wie du potenzielle Verkäufer ansprichst und eine nachvollziehbare Bewertungsbandbreite statt eines vermeintlich exakten Unternehmenswerts ermittelst.',
          bulletPoints: [
            'Off-Market Sourcing: Direkte Ansprache von Gründern mit Nachfolgeproblemen oder Wachstums-Erschöpfung',
            'EBITDA-Normalisierung: Bereinigung von Geschäftsführer-Gehältern, privaten Spesen und Einmaleffekten',
            'LOI-Grundlagen: Exklusivität, Earn-out und Escrow mit qualifizierter Rechtsberatung ausgestalten',
            'Die Due Diligence Matrix: Commercial, Financial, Legal, Tax und Tech Checklisten'
          ],
          coreConcepts: [
            {
              iconName: 'search',
              title: 'OFF-MARKET TARGETS',
              description: 'Direkter Kontakt kann den Prozess verändern; Preis, Informationslage und Wettbewerb bleiben einzelfallabhängig.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'CLEAN EBITDA',
              description: 'Ermittlung des realen Cashflow-Potenzials nach Bereinigung aller Sonderausgaben.'
            }
          ],
          resources: [
            {
              title: 'M&A Due Diligence Master-Checkliste',
              subtitle: '150 Prüfpunkte für Unternehmensprüfungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Deal-Pipeline',
              subtitle: 'M&A-Kandidaten und Akquisitions-Gespräche im CRM tracken',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Praxis des Zukaufs profitabler Unternehmen

Wachstum durch Akquisition (Inorganisches Wachstum) ist das bevorzugte Werkzeug von Private-Equity-Investoren.

#### Der 4-Stufen Akquisitions-Zyklus:
1. **Target-Profiling**: Suche nach Unternehmen in deiner Nische mit starkem Produkt, aber schwachem Marketing.
2. **Der Erstkontakt**: "Wir bauen eine Markengruppe auf und schätzen Ihre Arbeit sehr. Wäre ein strategischer Austausch denkbar?"
3. **Die Due Diligence**: 30 Tage tiefste Einsicht in Bankkonten, Steuerbescheide, Kundenlisten und Kündigungsquoten.
4. **Das Closing**: Notartermin mit gestaffeltem Kaufpreis (Upfront Cash + Earn-Out nach Zielerreichung).`
        },
        understandContent: {
          coreTakeaway: 'Der Kaufpreis muss zu Ertragsqualität, Wachstum, Risiken, Finanzierung und Integrationsplan passen; eine pauschale Multiple-Grenze ist nicht belastbar.',
          keyPrinciples: [
            'Earn-out-Anteil, Ziele, Messung und Haftung passend zum konkreten Deal verhandeln und rechtlich prüfen lassen',
            'Kundenkonzentration prüfen und die akzeptable Grenze anhand Branche, Vertragslaufzeiten und Risikotragfähigkeit festlegen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle dein M&A-Akquisitionsprofil:',
          inputType: 'checklist',
          checklistItems: [
            'Akquisitions-Kriterien (Umsatz, Nische, Teamgröße) im Mara CRM dokumentiert',
            'Liste von 10 potenziellen M&A-Übernahmezielen recherchiert',
            'Standardisierte Geheimhaltungsvereinbarung (NDA) für Verkäufer vorbereitet'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '66.2',
        stageId: 66,
        stageTitle: '66. Rollup & Post-Merger Synergien',
        title: 'Das Rollup-Modell: Multiple Expansion & Zentralisierte Shared Services',
        durationMinutes: 31,
        description: 'Wie Rollups grundsätzlich funktionieren und wie du Integrationsaufwand, mögliche Synergien sowie unterschiedliche Bewertungsszenarien realistisch modellierst.',
        learnContent: {
          videoTitle: 'Masterclass: Rollup-Strategien & Post-Merger Wertsteigerung',
          videoDuration: '31:40',
          summaryText: 'Größe allein bestimmt kein Bewertungsmultiple. Qualität, Wachstum, Risiken, Marktumfeld und Integrationsfähigkeit beeinflussen die Bewertung. Lerne, wie du übernommene Firmen schrittweise in eine gemeinsame Struktur integrierst.',
          bulletPoints: [
            'Bewertungsszenarien: mögliche Unterschiede nach Größe, Qualität, Wachstum und Risiko analysieren',
            'Shared Services Hub: Zusammenlegung von Buchhaltung, HR, IT und Legal in einer zentralen Management-Einheit',
            'Cross-Selling Potenziale: Die Angebote der gekauften Firmen sofort an die bestehenden Kunden der Gruppe verkaufen',
            'Kulturelle Integration: Wie du Schlüsselmitarbeiter bindest und Kündigungswellen nach dem Buyout verhinderst'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: 'MULTIPLE EXPANSION',
              description: 'Eine größere Gruppe kann anders bewertet werden; Synergien, Kosten und Integrationsrisiken bestimmen das tatsächliche Ergebnis.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'SHARED SERVICES',
              description: 'Gemeinsame Dienste können Kosten senken, verursachen aber zunächst Umstellungs- und Integrationsaufwand.'
            }
          ],
          resources: [
            {
              title: 'Rollup Synergie-Kalkulator & Multiple-Matrix',
              subtitle: 'Excel-Kalkulation für Portfoliogruppen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Brand Suite',
              subtitle: 'Mehrere Tochtermarken über eine zentrale Schaltzentrale führen',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur eines erfolgreichen Rollups

Die Zusammenlegung von Marketing, CRM und Verwaltung kann Vorteile schaffen, birgt aber Daten-, Prozess-, Personal- und Kundenrisiken. Wirkung und Tempo unterscheiden sich je nach Unternehmen.

#### Der 100-Tage Integrationsplan:
- **Tag 1-30**: CRM- und Finanzsysteme vereinheitlichen.
- **Tag 31-60**: Bisherige Leadquellen mit dem GOM-MAR Funnel-System professionalisieren.
- **Tag 61-100**: Cross-Selling Kampagnen an alle gemeinsamen Kundenlisten ausrollen.`
        },
        understandContent: {
          coreTakeaway: 'Ein Rollup schafft nur dann nachhaltigen Wert, wenn Integration, Finanzierung und operative Qualität funktionieren; Zeitraum und Bewertung sind nicht garantiert.',
          keyPrinciples: [
            'Zentralisiere nur die administrativen Funktionen – bewahre die kundennahe Identität der Marke',
            'Retention-Boni für die Top-Performenden Mitarbeiter der Zielgesellschaft einplanen'
          ]
        },
        actionTask: {
          instruction: 'Plane die Shared-Services-Architektur für dein Portfolio:',
          inputType: 'checklist',
          checklistItems: [
            'Zentrales CRM- und Abrechnungskonzept für mehrere Marken definiert',
            'Cross-Selling Angebots-Katalog für Portfoliounternehmen entworfen',
            '100-Tage Post-Merger Integrationsplan als Leitfaden hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 67,
    title: '67. High-End Web3, Smart Contracts & Token-Gated Memberships',
    subtitle: 'Digitale Eigentumsrechte, On-Chain Communities, Token-Gating & Dezentrale Loyalität',
    color: 'from-purple-600 via-indigo-600 to-cyan-500',
    badgeIcon: '⛓️',
    description: 'Binde High-Net-Worth Kunden über Web3-Technologien: Nutze Smart Contracts für unveränderliche Mitgliedschafts-Pässe, Token-Gated Community-Zugänge und dezentrale Loyalitäts-Engines ohne Mittelsmänner.',
    lessons: [
      {
        id: '67.1',
        stageId: 67,
        stageTitle: '67. Token-Gating & On-Chain Access',
        title: 'Smart-Contract Memberships: VIP-Pässe & Token-Gated Content-Zugänge',
        durationMinutes: 30,
        description: 'Wie du Smart Contracts (ERC-721 / ERC-1155) auf Polygon oder Base aufsetzt und Mitgliederbereiche kryptografisch absicherst.',
        learnContent: {
          videoTitle: 'Masterclass: Web3 Token-Gating & Dezentrale Mitgliedschaften',
          videoDuration: '30:30',
          summaryText: 'Ein Token-Gated Zugang ist fälschungssicher und ermöglicht es Kunden, ihren Zugang bei Bedarf auf Sekundärmärkten weiterzuverkaufen – wodurch du jedes Mal automatische Royalties erhältst.',
          bulletPoints: [
            'Eigentum statt Miete: Warum HNW-Kunden handelbare Lifetime-Mitgliedschaften lieben',
            'Low-Gas Chains: Warum moderne Business-Web3-Apps auf Polygon, Base oder Arbitrum laufen',
            'Web3-to-Web2 Brücke: Anmeldung mit E-Mail (Account Abstraction) ohne Krypto-Vorkenntnisse des Nutzers',
            'Sekundärmarkt-Royalties: 5% bis 10% Erlös bei jeder Weitergabe des Mitgliedschafts-Passes'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'CRYPTOGRAPHIC ACCESS',
              description: 'Mitgliederbereich-Freischaltung basiert auf Wallet-Besitz in Echtzeit.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'PERPETUAL ROYALTIES',
              description: 'Automatische Tantiemen bei jedem Weiterverkauf der Mitgliedschaft.'
            }
          ],
          resources: [
            {
              title: 'Smart Contract Deployment & Token-Gating Guide',
              subtitle: 'Schritt-für-Schritt Anleitung für non-tech Gründer als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Web3 Wallet Integration',
              subtitle: 'Ethereum/Polygon Wallets mit CRM-Kundenprofilen verknüpfen',
              type: 'tool',
              iconName: 'link',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die nächste Generation digitaler Mitgliedschaften

Web3 ermöglicht es, digitale Zugänge wie echte Sachwerte zu behandeln.

#### Die Schritte zum Web3-Mitgliederbereich:
1. **Smart Contract Deployment**: Erstelle eine standardisierte Kollektion (z. B. 100 exklusive VIP-Pässe).
2. **Account Abstraction Checkout**: Der Kunde zahlt ganz normal per Kreditkarte; im Hintergrund wird ein Wallet generiert.
3. **Token-Gating Middleware**: Deine Website prüft vor dem Öffnen exklusiver Inhalte, ob der Token vorhanden ist.`
        },
        understandContent: {
          coreTakeaway: 'Wer Web3 nahtlos im Hintergrund integriert, bietet Kunden maximalen Nutzen ohne Krypto-Hürden.',
          keyPrinciples: [
            'Niemals Kunden mit komplizierten Seed-Phrasen überfordern – nutze Social-Logins via Web3Auth',
            'Auf extrem günstige Netzwerkgebühren (Gas Fees < 0.05€) achten'
          ]
        },
        actionTask: {
          instruction: 'Plane dein erstes Token-Gated Community-Angebot:',
          inputType: 'checklist',
          checklistItems: [
            'Smart Contract Konzept für 50 limitierte Lifetime-VIP-Pässe definiert',
            'Kreditkarten-zu-Wallet Onboarding über moderne Web3-Gateways getestet',
            'Token-Gated Inhalts-Bereich im Mara CRM vorkonfiguriert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '67.2',
        stageId: 67,
        stageTitle: '67. Dezentrale Loyalität & Belohnungen',
        title: 'On-Chain Loyalty: Unveränderliche Badges & Aktivitäts-Prämien',
        durationMinutes: 28,
        description: 'Wie du Soulbound Tokens (SBTs) als unübertragbare Ausbildungs-Zertifikate und Leistungsnachweise ausgibst.',
        learnContent: {
          videoTitle: 'Masterclass: Soulbound Tokens & On-Chain Zertifizierungen',
          videoDuration: '28:45',
          summaryText: 'Papier-Zertifikate lassen sich fälschen. Ein Soulbound Token (SBT) liegt fest in der digitalen Identität deines Absolventen und beweist seine Ausbildung weltweit unveränderlich.',
          bulletPoints: [
            'Soulbound Tokens (SBTs): Digitale Medaillen, die nicht verkauft oder transferiert werden können',
            'Automatischer Minting-Trigger: Sobald Modul 99 abgeschlossen ist, wird das Zertifikat on-chain geprägt',
            'Dezentrale Reputations-Profile: Absolventen weisen ihre Fähigkeiten bei Arbeitgebern kryptografisch nach',
            'Dynamic NFTs: Tokens, die sich optisch verändern, wenn der Nutzer neue Umsatz-Meilensteine erreicht'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'SOULBOUND CERTS',
              description: 'Fälschungssichere Ausbildungsnachweise auf der Blockchain verankert.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: 'DYNAMIC REPUTATION',
              description: 'Status-Badges wachsen automatisch mit dem Erfolg des Teilnehmers.'
            }
          ],
          resources: [
            {
              title: 'On-Chain Zertifizierungs-Architektur',
              subtitle: 'SBT Standards & Verifikations-Leitfaden als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Academy Blockchain-Zertifikats-Ausgabe',
              subtitle: 'Automatisches Minting bei Kursabschluss aktivieren',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Zukunft der Weiterbildungs-Zertifikate

Mit On-Chain Zertifikaten machst du deine Academy zur vertrauenswürdigsten Marke im Bildungsbereich.

#### Die Vorteile für Absolventen:
- **Weltweite Überprüfbarkeit**: Jeder Kunde oder Arbeitgeber kann die Echtheit mit 1 Klick verifizieren.
- **Unzerstörbarkeit**: Kein Server-Ausfall kann das Diplom vernichten.`
        },
        understandContent: {
          coreTakeaway: 'Unveränderliche digitale Leistungsnachweise schaffen unvergleichliche Marken-Autorität.',
          keyPrinciples: [
            'SBTs dürfen niemals transferierbar sein, um Zertifikats-Handel zu unterbinden',
            'Zertifikats-Vorschau immer als ansprechendes 3D-Badge im Profil visualisieren'
          ]
        },
        actionTask: {
          instruction: 'Richte die automatische Zertifikats-Prägung ein:',
          inputType: 'checklist',
          checklistItems: [
            'Design für das finale Master-Diplom-Badge festgelegt',
            'Automatischer Verifikations-Link für Absolventen-Profile erstellt',
            'On-Chain Verankerung im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 68,
    title: '68. B2B GovTech & Kommunale Vergabeverfahren',
    subtitle: 'Öffentliche Ausschreibungen, Digitalisierungspaket für Städte, EVB-IT Verträge & Submissionsanzeiger',
    color: 'from-slate-700 via-zinc-800 to-blue-900',
    badgeIcon: '🏛️',
    description: 'Erschließe die solventesten Kunden des Landes: Gewinne Digitalisierungs- und Beratungsaufträge von Städten, Landkreisen und Ministerien über öffentliche Vergabeverfahren mit 6- und 7-stelligen Budgets.',
    lessons: [
      {
        id: '68.1',
        stageId: 68,
        stageTitle: '68. Vergaberecht & Ausschreibungs-Plattformen',
        title: 'Das GovTech-System: Öffentliche Vergabeverfahren systematisch gewinnen',
        durationMinutes: 32,
        description: 'Wie das Vergaberecht (VgV, UVgO) funktioniert, wo Bund & Länder ausschreiben (TED, Bund.de) und wie du formale Ausschlusskriterien vermeidest.',
        learnContent: {
          videoTitle: 'Masterclass: Öffentliche Auftragsvergabe & GovTech Akquise',
          videoDuration: '32:30',
          summaryText: 'Öffentliche Stellen verfügen über gigantische Digitalisierungs-Budgets, die gesetzlich ausgegeben werden müssen. Lerne, wie du Ausschreibungen liest, Eignungskriterien erfüllst und den Zuschlag erhältst.',
          bulletPoints: [
            'Vergabe-Portale: TED (EU-weit), Bund.de, Vergabe24 und regionale Submissionsanzeiger',
            'Vergabearten: Öffentliche Ausschreibung, Beschränkte Ausschreibung und Verhandlungsvergabe',
            'Die formale Falle: 40% aller Angebote fliegen wegen kleiner Formfehler vor der inhaltlichen Prüfung raus',
            'Wirtschaftlichkeitskriterien: Warum das günstigste Angebot selten gewinnt, wenn das Konzept überzeugt'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'FORMAL PRECISION',
              description: '100% exakte Einhaltung aller Vorgaben schlägt unstrukturierte Konkurrenten.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'CONCEPT SCORING',
              description: 'Hohe Punktzahl im Fachkonzept gleicht höhere Stundensätze mühelos aus.'
            }
          ],
          resources: [
            {
              title: 'Öffentliche Vergabe Master-Checkliste & EVB-IT Guide',
              subtitle: 'Formblatt-Prüfung & Ausschlusskriterien als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM GovTech Ausschreibungs-Tracker',
              subtitle: 'Fristen und Abgabetermine für öffentliche Verfahren überwachen',
              type: 'tool',
              iconName: 'calendar',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Der Weg zum verlässlichen Staatsauftrag

Behörden sind die sichersten Zahler der Welt – keine Ausfallrisiken, planbare Zahlungsziele.

#### Die Phasen der Angebotsabgabe:
1. **Bekanntmachung prüfen**: Eignungskriterien (Referenzen der letzten 3 Jahre, Umsatzvolumen) analysieren.
2. **Bieterfragen stellen**: Unklare Formulierungen vorab offiziell über das Vergabeportal beanstanden.
3. **Konzept ausarbeiten**: Jede einzelne Anforderung des Leistungsverzeichnisses nummerngenau beantworten.
4. **Digitale Signatur**: Angebot rechtssicher mit qualifizierter elektronischer Signatur (QES) einreichen.`
        },
        understandContent: {
          coreTakeaway: 'Wer die bürokratischen Hürden meistert, profitiert von mehrjährigen Rahmenverträgen mit Millionengarantie.',
          keyPrinciples: [
            'Niemals Fristen auch nur um 1 Sekunde überschreiten – Vergabeportale schließen sekundengenau',
            'Immer die geforderten Standard-Vertragsmuster (EVB-IT) unverändert akzeptieren'
          ]
        },
        actionTask: {
          instruction: 'Richte dein Profil für öffentliche Ausschreibungen ein:',
          inputType: 'checklist',
          checklistItems: [
            'Bieter-Account auf Bund.de und Vergabe24 registriert',
            'Referenz-Portfolio mit 3 standardisierten Projektbeschreibungen erstellt',
            'Qualifizierte elektronische Signaturkarte oder Software-Zertifikat eingerichtet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '68.2',
        stageId: 68,
        stageTitle: '68. Rahmenverträge & Kommunal-Funnels',
        title: 'Kommunale Rahmenvereinbarungen: Abrufe ohne garantierte Menge',
        durationMinutes: 30,
        description: 'Wie Rahmenvereinbarungen und spätere Einzelabrufe funktionieren und welche Vergabe- und Vertragsbedingungen zu beachten sind.',
        learnContent: {
          videoTitle: 'Masterclass: Mehrjährige Rahmenverträge mit öffentlichen Trägern',
          videoDuration: '30:15',
          summaryText: 'Eine Rahmenvereinbarung legt Bedingungen für mögliche spätere Einzelaufträge fest. Laufzeit, Höchstwert, Abrufverfahren und tatsächliches Volumen ergeben sich aus Vergabeunterlagen und Vertrag; ein Mindestabruf besteht nur, wenn er ausdrücklich vereinbart wurde.',
          bulletPoints: [
            'Rahmenvereinbarung nach VgV: Festlegung von Stundensätzen und maximalen Gesamtabrufvolumina',
            'Mini-Wettbewerbe im Rahmenvertrag: Wie du Zweitangebote gegen andere Rahmenvertragspartner gewinnst',
            'Rechnungswesen: Elektronische Rechnungsstellung nach XRechnung-Standard über ZUGFeRD',
            'Laufzeit und Optionen: Voraussetzungen, Fristen und erneute Vergabepflichten rechtzeitig prüfen'
          ],
          coreConcepts: [
            {
              iconName: 'repeat',
              title: 'MULTI-YEAR RETENTION',
              description: 'Mehrjährige Vertragsbeziehungen können Planung erleichtern, garantieren aber keine Einzelaufträge.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'XRECHNUNG COMPLIANT',
              description: 'Automatisierte Rechnungsverarbeitung für blitzschnelle Auszahlungen.'
            }
          ],
          resources: [
            {
              title: 'XRechnung & EVB-IT Rahmenvertrags-Muster',
              subtitle: 'Leitfaden für behördliche Abrechnungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM XRechnung Generator',
              subtitle: 'Konforme E-Rechnungen für Bund & Kommunen exportieren',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Skalierung durch behördliche Rahmenverträge

Ein Folgeauftrag darf nur nach den Bedingungen der Rahmenvereinbarung und des anwendbaren Vergaberechts erteilt werden. Gute Leistung kann die Zusammenarbeit stärken, ersetzt aber keine rechtlichen Voraussetzungen.

#### Best Practices im Behörden-Management:
- **Pünktliche Meilensteine**: Behörden schätzen Planbarkeit mehr als impulsive Änderungen.
- **Transparente Dokumentation**: Ausführliche Statusberichte schaffen Vertrauen beim Rechnungsprüfungsamt.`
        },
        understandContent: {
          coreTakeaway: 'Eine Rahmenvereinbarung eröffnet die Möglichkeit späterer Abrufe, garantiert jedoch weder Menge, Umsatz noch Fortsetzung.',
          keyPrinciples: [
            'Rechnungen immer mit korrekter Leitweg-ID einreichen, um Zahlungsverzögerungen zu vermeiden',
            'Regelmäßige Quartals-Reviews mit dem behördlichen Projektleiter durchführen'
          ]
        },
        actionTask: {
          instruction: 'Bereite deine XRechnung-Abrechnung vor:',
          inputType: 'checklist',
          checklistItems: [
            'Leitweg-ID Konfiguration im Abrechnungssystem getestet',
            'Standardisierter Leistungsnachweis-Bericht für Behörden entworfen',
            'Erste Bewerbung auf eine kommunale Rahmenausschreibung eingereicht'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 69,
    title: '69. Executive Media Training & Krisen-PR',
    subtitle: 'Live-Interviews, TV-Talkshows, Investigativ-Journalisten & Krisen-Kommunikation',
    color: 'from-red-800 via-rose-900 to-zinc-900',
    badgeIcon: '🎙️',
    description: 'Bestehe im Kreuzfeuer der Medien: Lerne die Interview-Techniken von Spitzenpolitikern und DAX-Vorständen kennen, lenke kritische Reporterfragen souverän um (Bridging) und meistere Live-TV-Auftritte ohne Wackeln.',
    lessons: [
      {
        id: '69.1',
        stageId: 69,
        stageTitle: '69. Bridging-Techniken & Interview-Führung',
        title: "Die 'Bridging'-Methode: Kritische Journalistenfragen meisterhaft umlenken",
        durationMinutes: 33,
        description: 'Wie du die Gesprächskontrolle behältst, Fangfragen entlarvst und deine 3 Kernbotschaften in jedem Interview platzierst.',
        learnContent: {
          videoTitle: 'Masterclass: Executive Media Training & Krisen-Interview Führung',
          videoDuration: '33:15',
          summaryText: 'Ein ungeübter Gründer verliert im Interview sofort die Kontrolle. Lerne, wie du kritische Angriffe mit der "Block & Bridge" Technik neutralisierst und das Gespräch elegant auf deine Erfolgsgeschichte lenkst.',
          bulletPoints: [
            'Die 3 Message-Pillars: Deine Botschaft in maximal 3 einfachen, einprägsamen Sätzen',
            'Block & Bridge Formeln: "Das ist ein wichtiger Punkt, aber die entscheidende Frage, vor der unsere Branche steht, lautet..."',
            'Die Soundbite-Formel: Wie du druckreife Zitate lieferst, die Zeitungen als Überschrift drucken müssen',
            "Körpersprache im Studio: Blickkontakt, Handhaltung im 'Merkel-Dreieck' und kontrollierte Stimmlage"
          ],
          coreConcepts: [
            {
              iconName: 'mic',
              title: 'BLOCK & BRIDGE',
              description: 'Elegante Umleitung feindseliger Fragen auf die eigene Kernbotschaft.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'SOUNDBITE DESIGN',
              description: 'Prägnante Zitate, die Journalisten ungekürzt übernehmen müssen.'
            }
          ],
          resources: [
            {
              title: 'Executive Media Training Handbuch & Bridging-Phrasen',
              subtitle: '50 formulierte Übergänge für TV- & Zeitungsinterviews als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Presse-Verteiler',
              subtitle: 'Journalisten-Kontakte und Pressemitteilungen zentral verwalten',
              type: 'tool',
              iconName: 'send',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kunst der medialen Souveränität

Journalisten suchen nach Konflikten und Zitaten. Du suchst nach Positionierung und Vertrauen.

#### Die goldenen Regeln des Medieninterviews:
1. **Es gibt kein 'Off the Record'**: Gehe immer davon aus, dass jedes Wort aufgezeichnet wird.
2. **Keine Wiederholung negativer Worte**: Wiederhole niemals die negative Formulierung des Reporters.
3. **Die 3-Sekunden Pause**: Antworte niemals hastig; nimm dir 3 Sekunden Bedenkzeit vor jeder Antwort.`
        },
        understandContent: {
          coreTakeaway: 'Wer die Kunst des Bridgings beherrscht, kann vor laufender Kamera niemals in die Enge getrieben werden.',
          keyPrinciples: [
            'Niemals in die Defensive geraten oder sich rechtfertigen – bleibe ruhig und lösungsorientiert',
            'Stets die Autorisierung des schriftlichen Interviewtextes vor dem Druck vereinbaren'
          ]
        },
        actionTask: {
          instruction: 'Definiere deine 3 Kernbotschaften für Medienauftritte:',
          inputType: 'checklist',
          checklistItems: [
            '3 unverrückbare Kernbotschaften (Message Pillars) formuliert',
            '5 Bridging-Übergangssätze für kritische Fragen auswendig gelernt',
            'Video-Probeinterview mit 3 harten Fangfragen aufgenommen und analysiert'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '69.2',
        stageId: 69,
        stageTitle: '69. Presse-Statements & Shitstorm-Drahtseilakt',
        title: 'Krisen-Pressestatements: In 60 Minuten rechtssicher und deeskalierend reagieren',
        durationMinutes: 29,
        description: 'Wie du in Akutfällen Pressemitteilungen formulierst, die rechtliche Risiken minimieren und die Wut der Öffentlichkeit ersticken.',
        learnContent: {
          videoTitle: 'Masterclass: Krisen-Pressemitteilungen & Ad-hoc Kommunikation',
          videoDuration: '29:40',
          summaryText: 'Schweigen wird in der Krise als Schuldeingeständnis gewertet. Lerne, wie du mit der "Empathie - Aktion - Transparenz" Formel Statements verfasst, die juristisch abgesichert sind und Shitstorms im Keim ersticken.',
          bulletPoints: [
            'Die 1-Stunden Reaktions-Matrix: Erstes Holding-Statement innerhalb von 60 Minuten veröffentlichen',
            'Die \'E-A-T\' Krisen-Formel: Empathie zeigen, sofortige Prüfmaßnahmen ankündigen, Transparenz zusichern',
            'Zusammenarbeit mit Medienanwälten: Vorab-Freigabe zur Vermeidung von Schadensersatzansprüchen',
            'Gegendarstellungsansprüche: Wie du falsche Verdachtsberichterstattung per einstweiliger Verfügung stoppst'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'HOLDING STATEMENT',
              description: 'Schnelle Erst-Reaktion nimmt Journalisten den Wind aus den Segeln.',
              highlight: true
            },
            {
              iconName: 'alert-triangle',
              title: 'LEGAL CLEARANCE',
              description: 'Rechtssichere Formulierungen verhindern teure Schuldanerkenntnisse.'
            }
          ],
          resources: [
            {
              title: 'Krisen-Pressemitteilung Templates & Musterschreiben',
              subtitle: '10 Ad-hoc Vorlagen für verschiedene Krisenszenarien als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR KI Krisen-Writer',
              subtitle: 'Sofortige Entwürfe für Stellungnahmen und Presseerklärungen',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Die Anatomie eines perfekten Krisen-Statements

Ein gutes Statement beruhigt die Emotionen und zeigt volle Handlungsfähigkeit des Unternehmens.

#### Die 4 Absätze eines Krisen-Statements:
- **Absatz 1 (Bedauern & Empathie)**: "Wir nehmen die geäußerten Vorwürfe außerordentlich ernst..."
- **Absatz 2 (Sofortmaßnahme)**: "Wir haben unverzüglich eine interne Untersuchung eingeleitet..."
- **Absatz 3 (Fakten)**: Sachliche Klarstellung ohne Aggressivität.
- **Absatz 4 (Ausblick)**: "Wir werden die Ergebnisse transparent veröffentlichen."`
        },
        understandContent: {
          coreTakeaway: 'Wer schnell und menschlich reagiert, verwandelt eine Krise in einen Beweis für Führungsstärke.',
          keyPrinciples: [
            'Niemals Schuldige im eigenen Team öffentlich an den Pranger stellen – Führung übernimmt die Verantwortung',
            'Immer nur eine einzige Person als offiziellen Pressesprecher autorisieren'
          ]
        },
        actionTask: {
          instruction: 'Erstelle dein Krisen-Kommunikations-Protokoll:',
          inputType: 'checklist',
          checklistItems: [
            'Krisen-Holding-Statement für Notfälle vorformuliert',
            'Kontaktliste von Krisen-PR-Beratern und Medienanwälten hinterlegt',
            'Interne Anweisung: Mitarbeiter dürfen keine Presseanfragen eigenständig beantworten'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 70,
    title: '70. Internationales Steuerrecht & Holding-Strukturen',
    subtitle: 'Wegzugsbesteuerung, DBA, Substanz-Anforderungen, Dubai/Zypern/USA & Stiftungen',
    color: 'from-amber-600 via-yellow-600 to-zinc-900',
    badgeIcon: '🌍',
    description: 'Das Regelwerk für globale Steuerintelligenz: Verstehe Doppelbesteuerungsabkommen (DBA), meistere die deutsche Wegzugsbesteuerung (§ 6 AStG) und baue rechtssichere internationale Firmenstrukturen mit echter Substanz auf.',
    lessons: [
      {
        id: '70.1',
        stageId: 70,
        stageTitle: '70. Wegzugsbesteuerung & Substanz-Regeln',
        title: 'Wegzugsbesteuerung (§ 6 AStG) & Reale Substanz im Ausland',
        durationMinutes: 35,
        description: 'Wie die fiktive Veräußerung beim Verlassen Deutschlands funktioniert und wie du Holdingstrukturen ohne Scheinfirmen-Vorwurf aufsetzt.',
        learnContent: {
          videoTitle: 'Masterclass: Internationales Steuerrecht & Substanz-Architektur',
          videoDuration: '35:20',
          summaryText: 'Wer einfach nach Dubai oder Zypern zieht, ohne seine deutschen Firmenanteile zu regeln, tappt in die Wegzugsbesteuerungsfalle. Lerne, wie du Wohnsitzverlagerungen und Auslandsgesellschaften rechtssicher gestaltest.',
          bulletPoints: [
            '§ 6 AStG Wegzugsbesteuerung: Fiktiver Exit nach 7 Jahren unbeschränkter Steuerpflicht in Deutschland',
            'Substanz-Anforderungen: Warum ein Briefkasten nicht reicht – Büro, Mitarbeiter und Geschäftsführer vor Ort',
            'Ort der tatsächlichen Geschäftsleitung (§ 10 AO): Wo Entscheidungen getroffen werden, fallen Steuern an',
            'Hinzurechnungsbesteuerung (AStG): Wie passive Einkünfte im Niedrigsteuerland zurückgerechnet werden'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'REAL SUBSTANCE',
              description: 'Echte Büros und Geschäftsführer schützen vor Steuerstrafverfahren.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'EXIT TAX MITIGATION',
              description: 'Holding-Modelle und Ratenzahlungskonzepte vor dem Wegzug aufsetzen.'
            }
          ],
          resources: [
            {
              title: 'International Tax & Substance Master-Guide',
              subtitle: 'Rechtlicher Leitfaden zu DBA & Außensteuergesetz als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Country Entity Manager',
              subtitle: 'Internationale Rechnungsstellung und Steuerflüsse verwalten',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Spielregeln des internationalen Steuerrechts

Steueroptimierung ist legal und erstrebenswert, muss aber mit absoluter handwerklicher Präzision umgesetzt werden.

#### Die Säulen einer legalen Auslandsstruktur:
1. **Wohnsitz**: Vollständige Aufgabe des inländischen Wohnsitzes (keine Schlüsselgewalt, kein gewöhnlicher Aufenthalt).
2. **Geschäftsführung**: Ein angestellter Geschäftsführer vor Ort leitet die operativen Geschäfte im Ausland.
3. **Reale Wertschöpfung**: Server, Verträge und Mitarbeiter befinden sich am Sitz der Gesellschaft.`
        },
        understandContent: {
          coreTakeaway: 'Wer Steuern international optimieren will, muss bereit sein, echte Substanz im Ausland aufzubauen.',
          keyPrinciples: [
            'Niemals auf dubiose "Briefkasten-Agenturen" vertrauen – das Finanzamt prüft Telefonrechnungen und Mietverträge',
            'Immer ein verbindliches Gutachten eines spezialisierten Fachberaters für internationales Steuerrecht einholen'
          ]
        },
        actionTask: {
          instruction: 'Prüfe deine internationale Firmenstruktur auf Substanz-Kriterien:',
          inputType: 'checklist',
          checklistItems: [
            'Wegzugs-Status und Firmenanteile mit internationalem Steuerberater auditiert',
            'Mietvertrag für ein dediziertes Büro und lokale Mitarbeiter-Verträge dokumentiert',
            'Tätigkeitsberichte und Protokolle der Geschäftsführungs-Sitzungen vor Ort archiviert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '70.2',
        stageId: 70,
        stageTitle: '70. Globale Holding-Standorte',
        title: 'Standortvergleich: Zypern (Non-Dom), VAE (Freezone), USA (LLC) & Liechtenstein',
        durationMinutes: 32,
        description: 'Vorteile, Nachteile und Kombinationsmöglichkeiten der beliebtesten Steuerstandorte für Digitalunternehmer.',
        learnContent: {
          videoTitle: 'Masterclass: Globale Firmenstandorte & Holding-Jurisdiktionen',
          videoDuration: '32:45',
          summaryText: 'Nicht jedes Land passt zu jedem Geschäftsmodell. Erfahre, wann sich eine US-LLC für Software eignet, warum Zypern das Non-Dom Paradigma in Europa ist und wie VAE-Freezones mit 0% Steuern funktionieren.',
          bulletPoints: [
            'Zypern Non-Dom: 60-Tage-Regel, 0% Steuer auf Dividenden und Zinserträge für 17 Jahre',
            'VAE Freezone (Dubai): 0% bis 9% Corporate Tax, keine Einkommensteuer, erstklassige Banken',
            'US-LLC: Pass-Through-Besteuerung für Nicht-US-Bürger bei rein digitalen Dienstleistungen',
            'Liechtenstein & Schweiz: Stiftungskonzepte und Holding-Privilegien für langfristigen Vermögensschutz'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'CYPRUS NON-DOM',
              description: 'Rechtssichere Dividendenbefreiung innerhalb der Europäischen Union.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'SWISS/LIECHTENSTEIN TRUST',
              description: 'Höchster Vermögensschutz und Diskretion für Generationen.'
            }
          ],
          resources: [
            {
              title: 'Global Jurisdiction Matrix & Kostenvergleich',
              subtitle: 'Gründungskosten, Steuersätze und Bankzugänge im Vergleich als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Currency Gateway',
              subtitle: 'Abrechnungskonten in USD, EUR und AED sicher anbinden',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Wahl der richtigen Jurisdiktion

Die optimale Struktur hängt von deinem Kundenkreis (B2B vs. B2C) und deinem Lebensmittelpunkt ab.

#### Der 3-Länder-Check:
- **Verkauf an US-Kunden**: Eine US-Corporation oder LLC schafft maximales Kundenvertrauen.
- **Wohnsitz in Europa**: Zypern bietet die beste Kombination aus EU-Recht und niedriger Steuerlast.
- **Asien & Naher Osten**: Dubai bietet unübertroffene Lebensqualität und steuerliche Freiheit.`
        },
        understandContent: {
          coreTakeaway: 'Die beste Struktur kombiniert operatives Ansehen beim Kunden mit minimaler Steuerlast auf Konzernebene.',
          keyPrinciples: [
            'Geschäftskonten immer bei erstklassigen Tier-1 Banken führen',
            'Internationale Verrechnungspreise (Transfer Pricing) marktgerecht dokumentieren'
          ]
        },
        actionTask: {
          instruction: 'Wähle die passende Rechtsform für deine internationale Expansion:',
          inputType: 'checklist',
          checklistItems: [
            'Steuer- und Kosten-Nutzen-Rechnung für den Zielstandort aufgestellt',
            'Bankkonten bei renommierten internationalen Instituten beantragt',
            'Verrechnungspreis-Dokumentation zwischen Mutter- und Tochtergesellschaft hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 71,
    title: '71. Corporate Venture Capital & Angel Investing',
    subtitle: 'Deal-Flow, SAFE-Agreements, Wandelanleihen, Cap-Table-Modellierung & Startup-Beteiligungen',
    color: 'from-emerald-700 via-teal-800 to-zinc-900',
    badgeIcon: '🚀',
    description: 'Investiere wie die Elite des Silicon Valley: Baue einen erstklassigen Angel-Deal-Flow auf, investiere Firmenüberschüsse über SAFE-Agreements in wachstumsstarke Startups und skaliere dein Vermögen über Equity-Upside.',
    lessons: [
      {
        id: '71.1',
        stageId: 71,
        stageTitle: '71. Angel Investing & SAFE-Noten',
        title: 'Startup-Beteiligungen: SAFE-Vereinbarungen, Wandelanleihen & Pre-Seed Deals',
        durationMinutes: 31,
        description: 'Wie Y-Combinator SAFE-Notes funktionieren, wie du Bewertungs-Caps (Valuation Caps) verhandelst und Startups analysierst.',
        learnContent: {
          videoTitle: 'Masterclass: Business Angel Investing & SAFE Agreements',
          videoDuration: '31:30',
          summaryText: 'Ein erfolgreicher Angel-Deal kann dein gesamtes Portfolio verzehnfachen. Erfahre, wie du kleine Tickets (10.000€ bis 50.000€) in bahnbrechende Tech-Startups investierst, ohne dich in monatelangen Anwaltsverhandlungen zu verlieren.',
          bulletPoints: [
            'Das SAFE-Instrument (Simple Agreement for Future Equity): Schnelle Beteiligung ohne sofortige Unternehmensbewertung',
            'Valuation Cap & Discount Rate: Wie du dir als Frühphasen-Investor günstige Einstiegskurse sicherst',
            'Die Power-Law Verteilung: Warum 1 von 10 Investments für 90% der gesamten Portfoliorendite sorgt',
            'Due Diligence für Startups: Gründer-Qualität, Marktgröße (TAM) und Product-Market-Fit Signale'
          ],
          coreConcepts: [
            {
              iconName: 'zap',
              title: 'SAFE AGREEMENTS',
              description: 'Standardisierte 5-Seiten Verträge für blitzschnelle Startup-Investments.',
              highlight: true
            },
            {
              iconName: 'trending_up',
              title: 'POWER LAW DISTRIBUTION',
              description: 'Breite Streuung auf 20+ Startups maximiert die Chance auf den nächsten Unicorn-Hit.'
            }
          ],
          resources: [
            {
              title: 'Angel Investor SAFE & Wandelanleihen Vorlagensatz',
              subtitle: 'Y-Combinator Standardverträge auf Deutsch & Englisch als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Angel Portfolio Tracker',
              subtitle: 'Startup-Beteiligungen, Bewertungsrunden und ROI-Multiples verwalten',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Strategie des erfolgreichen Angel-Investors

Investiere niemals Geld, das du im operativen Business benötigst – Angel Investing ist illiquides Risikokapital mit gigantischer Hebelwirkung.

#### Die 4 Kriterien für ein Angel-Investment:
1. **Das Gründer-Team**: Haben die Gründer unbändige Umsetzungsstärke und tiefes Branchenwissen?
2. **Der unfaire Vorteil**: Warum kann dieses Team gewinnen, wo andere scheitern?
3. **Der Markt**: Ist der Zielmarkt mindestens 1 Milliarde Euro groß?
4. **Die Traktion**: Gibt es erste zahlende Kunden oder exponentielles Nutzerwachstum?`
        },
        understandContent: {
          coreTakeaway: 'Investiere in erstklassige Gründer zu fairen Valuation-Caps und lass die Zeit für dich arbeiten.',
          keyPrinciples: [
            'Niemals alles auf ein einziges Startup setzen – baue ein Portfolio von mindestens 15-20 Beteiligungen auf',
            'Biete Gründern Mehrwert durch dein Marketing- und Vertriebs-Know-how (Smart Money)'
          ]
        },
        actionTask: {
          instruction: 'Formuliere deine persönliche Angel-Investing-These:',
          inputType: 'checklist',
          checklistItems: [
            'Ticketgröße (z. B. 15.000€ pro Deal) und Fokus-Branchen definiert',
            'Standardisierte SAFE-Vertragsvorlage mit Valuation Cap vorbereitet',
            'Profil auf Plattformen wie AngelList oder Leapfunder für Dealflow angelegt'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '71.2',
        stageId: 71,
        stageTitle: '71. Cap-Table Modellierung & Exits',
        title: 'Cap-Tables & Verwässerung: Vom Seed-Investment bis zum 100M€ Exit',
        durationMinutes: 29,
        description: 'Wie Verwässerung in Series A/B/C Finanzierungsrunden berechnet wird, Liquidationspräferenzen funktionieren und Secondary-Verkäufe ablaufen.',
        learnContent: {
          videoTitle: 'Masterclass: Cap-Table Modellierung & Exit-Szenarien',
          videoDuration: '29:40',
          summaryText: 'Ein 5%-Anteil nützt nichts, wenn spätere Investoren dich durch Verwässerung auf 0,2% reduzieren. Lerne, wie du Cap-Tables liest, Verwässerungsschutzklauseln verstehst und deine Anteile vor dem Börsengang gewinnbringend verkaufst.',
          bulletPoints: [
            'Die Cap-Table Architektur: Stammaktien, Vorzugsaktien (Preferred Shares) und Optionspools (ESOP)',
            'Verwässerungs-Mathematik (Dilution): Wie sich dein prozentualer Anteil über mehrere Runden verändert',
            'Liquidationspräferenzen: 1x Non-Participating vs. Participating – warum sie beim Verkauf über Leben und Tod entscheiden',
            'Secondary Sales: Wie du deine Anteile in späteren Finanzierungsrunden an Groß-VCs vorab versilberst'
          ],
          coreConcepts: [
            {
              iconName: 'pie-chart',
              title: 'CAP TABLE MODELING',
              description: 'Exakte Berechnung des Erlöses bei verschiedenen Exit-Bewertungen.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'SECONDARY LIQUIDITY',
              description: 'Vorzeitige Gewinnauszahlung bei Series-B/C Runden ohne auf den IPO zu warten.'
            }
          ],
          resources: [
            {
              title: 'Cap-Table Simulator & Dilution-Excel-Modell',
              subtitle: 'Prognose-Rechner für Finanzierungsrunden als PDF/Excel',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Corporate Investment Cockpit',
              subtitle: 'Beteiligungswerte und Verwässerungs-Szenarien visualisieren',
              type: 'tool',
              iconName: 'trending_up',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Mathematik des Startup-Exits

Verstehe die Spielregeln von Wagniskapitalgesellschaften (VCs), um als Business Angel auf Augenhöhe zu verhandeln.

#### Wichtige Vertragsklauseln:
- **Pro-Rata Rechte**: Das Recht, in Folge-Finanzierungsrunden nachzulegen, um deinen Anteil zu halten.
- **Tag-Along / Drag-Along**: Mitverkaufsrechte und Mitverkaufspflichten beim Firmenverkauf.
- **Information Rights**: Recht auf vierteljährliche Finanzberichte und Kennzahlen des Startups.`
        },
        understandContent: {
          coreTakeaway: 'Wer die Vertragsfeinheiten versteht, sichert sich den maximalen Ertrag beim Multimillionen-Exit.',
          keyPrinciples: [
            'Immer auf Pro-Rata Rechten für deine besten Gewinner-Startups bestehen',
            'Niemals hochriskante nachrangige Darlehen ohne Wandlungsrecht vergeben'
          ]
        },
        actionTask: {
          instruction: 'Modelliere ein Beispielszenario in deinem Cap-Table Simulator:',
          inputType: 'checklist',
          checklistItems: [
            'Cap-Table Modell mit 3 Finanzierungsrunden (Seed, Series A, Exit) durchgerechnet',
            'Liquidationspräferenz-Klauseln in Musterverträgen geprüft',
            'Portfolio-Übersicht im Mara CRM aktualisiert'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 72,
    title: '72. Neuro-Marketing & Biometrische Conversion-Optimierung',
    subtitle: 'Eye-Tracking, EEG-Aufmerksamkeit, F-Muster-Scans & Subliminale Farbreize',
    color: 'from-fuchsia-600 via-pink-600 to-rose-700',
    badgeIcon: '🧠',
    description: 'Optimiere deine Funnels auf biologischer Ebene: Nutze wissenschaftliche Erkenntnisse aus Eye-Tracking-Studien, Heatmaps, kognitiver Last (Cognitive Load) und emotionaler Pupillenerweiterung für Rekord-Conversion-Rates.',
    lessons: [
      {
        id: '72.1',
        stageId: 72,
        stageTitle: '72. Eye-Tracking & Das F-Shape Scanning',
        title: 'Eye-Tracking & Das F-Muster: Wie das menschliche Auge Webseiten scannt',
        durationMinutes: 30,
        description: 'Blickverlaufs-Analysen: Warum Nutzer Webseiten in Millisekunden nach dem F- und Z-Muster scannen und wo deine wichtigsten Verkaufsargumente stehen müssen.',
        learnContent: {
          videoTitle: 'Masterclass: Biometrisches Neuro-Marketing & Eye-Tracking Analyse',
          videoDuration: '30:30',
          summaryText: 'Niemand liest eine Website von oben links nach unten rechts durch. Das Gehirn springt in 200 Millisekunden zu Kontrastpunkten, Gesichtern und visuellen Ankern. Lerne, wie du den Blickverlauf des Kunden exakt steuerst.',
          bulletPoints: [
            'Das F-Shape Scanning: Wie Überschriften, Aufzählungspunkte und erste Satzwörter die Aufmerksamkeit fesseln',
            'Der \'Gaze Cueing\' Effekt: Wenn die Person im Bild auf den Kaufen-Button blickt, schauen 78% der Nutzer automatisch dorthin',
            'Kognitive Reibung (Cognitive Load): Warum unruhige Layouts und schlechte Kontraste Kaufabbrüche erzwingen',
            'Visuelle Hierarchie: Größe, Kontrast und Weißraum als unsichtbare Pfadfinder für den Kunden'
          ],
          coreConcepts: [
            {
              iconName: 'eye',
              title: 'GAZE CUEING',
              description: 'Blickrichtung von Gesichtern lenkt die Aufmerksamkeit direkt auf den CTA.',
              highlight: true
            },
            {
              iconName: 'layers',
              title: 'F-PATTERN LAYOUT',
              description: 'Wichtigste Kaufargumente stets am linken Rand und in Zwischenüberschriften platzieren.'
            }
          ],
          resources: [
            {
              title: 'Eye-Tracking & Blickverlaufs-Heatmap Audit',
              subtitle: 'Analyse-Leitfaden für Landingpage-Layouts als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara Landingpage Heatmap Simulator',
              subtitle: 'Blickpunkte und Klickwahrscheinlichkeiten visuell simulieren',
              type: 'tool',
              iconName: 'layout',
              actionUrl: 'landingpage'
            }
          ],
          fullArticleGuide: `### Die Biologie der visuellen Wahrnehmung

Das menschliche Sehzentrum priorisiert Bewegung, Gesichter und starke Farbkontraste.

#### Die 4 visuellen Anker für deinen Funnel:
1. **Der Hero-Blickfang**: Das Produktbild muss in den ersten 50 Millisekunden erfassbar sein.
2. **Die Blickführung**: Nutze subtile Pfeile, Zeigegesten oder Linien, die zum Anmeldeformular weisen.
3. **Chunking**: Teile Textblöcke in mundgerechte Häppchen von maximal 2-3 Zeilen auf.
4. **Der Button-Kontrast**: Der CTA-Button muss die einzige Stelle mit dieser Signalfarbe auf der gesamten Seite sein.`
        },
        understandContent: {
          coreTakeaway: 'Wer die Augen des Kunden steuert, steuert seine Gedanken und seine Kaufentscheidung.',
          keyPrinciples: [
            'Niemals Personen abbilden, die gelangweilt vom Angebot wegschauen',
            'Wichtige Schlüsselwörter in Bulletpoints immer fett hervorheben'
          ]
        },
        actionTask: {
          instruction: 'Optimiere deine Verkaufsseite nach Eye-Tracking Prinzipien:',
          inputType: 'checklist',
          checklistItems: [
            'Hero-Bild auf Gaze-Cueing (Blickrichtung zum Formular) angepasst',
            'Textabsätze auf maximal 3 Zeilen gekürzt und F-Muster-Struktur etabliert',
            'CTA-Farbe auf maximalen Komplementärkontrast zum Hintergrund umgestellt'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '72.2',
        stageId: 72,
        stageTitle: '72. Farbpsychologie & Biometrische Reize',
        title: 'Farbpsychologie & Kognitive Leichtigkeit: Kaufimpulse im Unterbewusstsein auslösen',
        durationMinutes: 28,
        description: 'Wie Farbtemperaturen, Typografie und Mikro-Animationen das Belohnungszentrum (Nucleus Accumbens) aktivieren.',
        learnContent: {
          videoTitle: 'Masterclass: Farbpsychologie, Typografie & Kognitive Leichtigkeit',
          videoDuration: '28:40',
          summaryText: 'Farben sind keine Dekoration, sondern biologische Signale. Blau erzeugt Vertrauen, Grün signalisiert Sicherheit, Orange weckt Kaufdringlichkeit. Lerne, wie du harmonische Farbwelten für maximale Konversionskraft zusammenstellst.',
          bulletPoints: [
            'Die 60-30-10 Farbregel: 60% neutrale Dominanzfarbe, 30% Sekundärfarbe, 10% scharfe Akzentfarbe für Aktionen',
            'Fluency-Effekt: Warum leicht lesbare Schriftarten (Sans-Serif) unbewusst als glaubwürdiger und wahrer eingestuft werden',
            'Der Kontrast-Quotient: WCAG AAA-Standards für ermüdungsfreies Lesen auf mobilen OLED-Displays',
            'Mikro-Feedback: Sofortige visuelle Bestätigung beim Klick für Dopamin-Ausschüttung im Gehirn'
          ],
          coreConcepts: [
            {
              iconName: 'sun',
              title: '60-30-10 COLOR RULE',
              description: 'Perfekte visuelle Balance lenkt das Auge ohne sensorische Reizüberflutung.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'COGNITIVE FLUENCY',
              description: 'Müheloses Lesen führt direkt zu höherer Akzeptanz von Preis und Angebot.'
            }
          ],
          resources: [
            {
              title: 'Neuro-Farbpaletten & Kontrast-Toolkit',
              subtitle: '10 erprobte High-Converting Farbkombinationen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara Landingpage Neuro-Styler',
              subtitle: 'Farbharmonie und Typografie-Hierarchie mit 1 Klick anwenden',
              type: 'tool',
              iconName: 'layout',
              actionUrl: 'landingpage'
            }
          ],
          fullArticleGuide: `### Die Psychophysik der Conversion-Rate

Wenn das Gehirn sich anstrengen muss, um eine Information zu verstehen, schaltet es auf Abwehr.

#### Die Gestaltungsgesetze:
- **Gesetz der Nähe**: Elemente, die zusammengehören (z. B. Label und Inputfeld), müssen nah beieinander stehen.
- **Gesetz der Ähnlichkeit**: Alle interaktiven Links und Buttons müssen dieselbe visuelle Sprache sprechen.`
        },
        understandContent: {
          coreTakeaway: 'Kognitive Leichtigkeit erzeugt ein Wohlgefühl – und wer sich wohlfühlt, kauft.',
          keyPrinciples: [
            'Niemals hellgrauen Text auf weißem Grund verwenden – Kontrastverlust senkt die Conversion um bis zu 25%',
            'Verwende maximal 2 Schriftarten auf einer Landingpage (eine für Headlines, eine für Fließtext)'
          ]
        },
        actionTask: {
          instruction: 'Wende die 60-30-10 Farbregel auf deinen Funnel an:',
          inputType: 'checklist',
          checklistItems: [
            'Farbpalette nach dem 60-30-10 Schema kalibriert',
            'Kontrastprüfung aller Text-Elemente mit WCAG-Rechner durchgeführt',
            'Mikro-Animationen für Button-Hover und Formular-Erfolge aktiviert'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 73,
    title: '73. High-Performance Biohacking & CEO-Energie-Management',
    subtitle: 'Schlafgewohnheiten, HRV-Tracking, Fokus-Routinen & verantwortungsvolle Regeneration',
    color: 'from-teal-600 via-emerald-600 to-cyan-700',
    badgeIcon: '⚡',
    description: 'Beobachte Schlaf, Erholung und Arbeitsrhythmus, um alltagstaugliche Routinen zu entwickeln. Wearable-Daten sind Orientierungshilfen und ersetzen weder Diagnose noch medizinische Beratung.',
    lessons: [
      {
        id: '73.1',
        stageId: 73,
        stageTitle: '73. Schlaf-Architektur & HRV-Tracking',
        title: 'Schlafgewohnheiten und HRV verantwortungsvoll beobachten',
        durationMinutes: 32,
        description: 'Oura- und Whoop-Daten als Trends auswerten sowie Licht, Temperatur und Abendroutine individuell und vorsichtig testen.',
        learnContent: {
          videoTitle: 'Masterclass: CEO-Biohacking & Kognitives Schlaf-Management',
          videoDuration: '32:15',
          summaryText: 'Zu wenig oder schlechter Schlaf kann Aufmerksamkeit und Entscheidungsfähigkeit beeinträchtigen. Du lernst, Schlafdaten als Trends zu lesen und risikoarme Änderungen an Licht, Raumtemperatur und Abendroutine zu testen. Nahrungsergänzungsmittel gehören vorab mit medizinischem Fachpersonal geklärt.',
          bulletPoints: [
            'Schlafzyklen variieren: Wearable-Schätzungen über mehrere Nächte statt einzelne Messwerte betrachten',
            'Morgenlicht: Tageslicht nach dem Aufstehen als mögliche Unterstützung für einen regelmäßigen Rhythmus nutzen',
            'HRV (Herzratenvariabilität): Persönliche Trends beobachten, statt Werte zwischen Personen zu vergleichen',
            'Abendroutine: Essens-, Trink- und Bildschirmzeiten individuell testen, ohne starre Erfolgszusage'
          ],
          coreConcepts: [
            {
              iconName: 'moon',
              title: 'SCHLAF-TRENDS',
              description: 'Mehrere Wochen beobachten, bevor du Zusammenhänge zwischen Routinen und Erholung ableitest.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: 'HRV RECOVERY',
              description: 'HRV ist individuell und kann durch viele Faktoren beeinflusst werden; Trends sind keine medizinische Diagnose.'
            }
          ],
          resources: [
            {
              title: 'CEO Biohacking & Schlaf-Protokoll Blueprint',
              subtitle: 'Supplement-Leitfaden, Licht-Timing & Abendroutine als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Performance & Daily Streak Tracker',
              subtitle: 'Tägliche Energielevels und Arbeitsblöcke im Dashboard erfassen',
              type: 'tool',
              iconName: 'activity',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Physiologie der kognitiven Höchstleistung

Spitzenunternehmer behandeln sich wie olympische Athleten.

#### Das tägliche Energie-Protokoll:
1. **07:00 Uhr (Morgen)**: 500ml Wasser mit Meersalz und Zitrone + 10 Minuten echtes Sonnenlicht.
2. **08:30 - 12:30 Uhr (Deep Work)**: 4 Stunden ungestörte Blockarbeit ohne Telefon oder E-Mails.
3. **14:00 Uhr (Rest & Reset)**: 20 Minuten NSDR (Non-Sleep Deep Rest) oder Meditation.
4. **22:00 Uhr (Abend)**: Blaulichtfilter-Brille, kühles Schlafzimmer (18 Grad) und Dunkelheit.`
        },
        understandContent: {
          coreTakeaway: 'Konstante, individuell passende Schlaf- und Pausenroutinen können konzentriertes Arbeiten unterstützen; Ergebnisse unterscheiden sich.',
          keyPrinciples: [
            'Kein Koffein in den ersten 90 Minuten nach dem Aufwachen, um den Nachmittags-Crash zu verhindern',
            'Schlafzimmer vollkommen abdunkeln (Blackout-Vorhänge) und Temperatur auf 17-19°C absenken'
          ]
        },
        actionTask: {
          instruction: 'Implementiere dein 3-2-1 Schlaf- und Energie-Protokoll:',
          inputType: 'checklist',
          checklistItems: [
            'Schlafzimmer für 100% Dunkelheit und 18°C Schlaftemperatur vorbereitet',
            '3-2-1 Abendroutine (kein schweres Essen 3h vor dem Schlafen) in den Kalender eingetragen',
            'Morgendliches Sonnenlicht-Protokoll für die nächsten 7 Tage gestartet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '73.2',
        stageId: 73,
        stageTitle: '73. Fokus-Routinen & verantwortungsvolle Stressregulation',
        title: 'Fokus-Routinen, Atemübungen und sichere Grenzen',
        durationMinutes: 30,
        description: 'Arbeitsumgebung, Pausen und Atemübungen vorsichtig testen sowie Nahrungsergänzung und Kälte-Exposition nur nach individueller medizinischer Abklärung erwägen.',
        learnContent: {
          videoTitle: 'Masterclass: Fokus-Routinen & verantwortungsvolle Stressregulation',
          videoDuration: '30:30',
          summaryText: 'Anhaltender Entscheidungsdruck kann Konzentration und Wohlbefinden beeinträchtigen. Lerne risikoarme Fokus- und Pausenroutinen kennen. Atemübungen sind keine Behandlung; bei Panik, Beschwerden oder Erkrankungen ist professionelle medizinische Hilfe erforderlich.',
          bulletPoints: [
            'Ruhiges Atmen: Wirkung und Verträglichkeit individuell beobachten und bei Schwindel oder Unwohlsein abbrechen',
            'Fokusblöcke: Arbeitsdauer und Pausen an Aufgabe, Belastung und persönliche Konzentration anpassen',
            'Nahrungsergänzungsmittel: mögliche Wechselwirkungen, Nebenwirkungen und individuelle Risiken ärztlich oder pharmazeutisch klären',
            'Kälte-Exposition: nicht als Leistungsversprechen behandeln und bei Herz-Kreislauf-Risiken nur nach medizinischer Freigabe nutzen'
          ],
          coreConcepts: [
            {
              iconName: 'zap',
              title: 'PHYSIOLOGICAL SIGH',
              description: 'Eine kurze Atemübung kann manchen Menschen beim Beruhigen helfen; Wirkung und Verträglichkeit unterscheiden sich.',
              highlight: true
            },
            {
              iconName: 'battery-charging',
              title: 'FOKUSBLOCK MIT PAUSE',
              description: 'Eine klar abgegrenzte Aufgabe bearbeiten und Dauer sowie Pausen an die eigene Belastbarkeit anpassen.'
            }
          ],
          resources: [
            {
              title: 'Fokus-Routinen & Sicherheitsleitfaden',
              subtitle: 'Arbeitsblöcke, Pausen und Hinweise zur medizinischen Abklärung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Deep Work Pomodoro Timer',
              subtitle: 'Fokus-Timer mit 40Hz Audio-Begleitung im Browser',
              type: 'tool',
              iconName: 'clock',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Die Chemie des mentalen Fokus

Fokus wird von Schlaf, Stress, Gesundheit, Umgebung, Aufgabe und individuellen Voraussetzungen beeinflusst. Eine einzelne Technik oder Substanz erzeugt ihn nicht zuverlässig.

#### Die 3 Flow-Regeln:
- **Single-Tasking**: Niemals zwischen E-Mails, WhatsApp und Konzeptarbeit hin- und herspringen.
- **Klare Reizabschirmung**: Noise-Cancelling Kopfhörer und Benachrichtigungen auf allen Geräten stummschalten.
- **Klares Endziel**: Vor dem Arbeitsblock genau ein einziges messbares Ergebnis definieren.`
        },
        understandContent: {
          coreTakeaway: 'Klare Aufgaben, störungsarme Arbeitsphasen und passende Pausen können Konzentration unterstützen; medizinische Beschwerden gehören fachlich abgeklärt.',
          keyPrinciples: [
            'Niemals länger als 90 Minuten ohne 5-minütige Augen- und Bewegungspause arbeiten',
            'Bei akuter Überlastung Arbeit unterbrechen, Unterstützung suchen und bei starken oder anhaltenden Beschwerden professionelle Hilfe nutzen'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deinen morgendlichen 90-Minuten Deep-Work Block:',
          inputType: 'checklist',
          checklistItems: [
            'Fester 90-Minuten Arbeitsblock im Kalender ohne Meetings blockiert',
            'Fokus-Umgebung (Smartphone in anderem Raum, Benachrichtigungen aus) eingerichtet',
            'Physiologische Seufzer-Atemtechnik vor schwierigen Aufgaben erprobt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 74,
    title: '74. Automatisierte Logistik & Global Supply Chain Orchestration',
    subtitle: '3PL Fulfillment, Zollabwicklung, Fracht-Konsolidierung & Just-in-Time Inventar',
    color: 'from-amber-600 via-orange-600 to-zinc-900',
    badgeIcon: '📦',
    description: 'Beherrsche globale Warenströme für physische Produkte und Merchandise: Baue automatisierte 3PL-Fulfillment-Netzwerke in Europa, USA und Asien auf, optimiere Seefracht-Kosten und automatisiere die Verzollung.',
    lessons: [
      {
        id: '74.1',
        stageId: 74,
        stageTitle: '74. 3PL-Fulfillment & Lager-Netzwerke',
        title: '3PL-Fulfillment: Weltweiter Same-Day Versand ohne eigenes Lager',
        durationMinutes: 31,
        description: 'Wie du moderne Third-Party-Logistics (3PL) Anbieter auswählst, Schnittstellen anbindest und Retourenquoten minimierst.',
        learnContent: {
          videoTitle: 'Masterclass: 3PL-Logistik & Globales E-Commerce Fulfillment',
          videoDuration: '31:30',
          summaryText: 'Ein eigenes Lager bindet Kapital und Personal. Mit modernen 3PL-Partnern (wie ShipBob, Hive oder Byrd) werden Bestellungen vollautomatisch verpackt, versendet und innerhalb von 24 Stunden zugestellt.',
          bulletPoints: [
            '3PL-Auswahlkriterien: Pick-and-Pack Gebühren, Lagerkosten pro Palette und Schnittstellen-Kompatibilität',
            'Multi-Warehouse Strategie: Lagerung in Norddeutschland und Süddeutschland für schnellste Lieferzeiten',
            'Custom Unboxing Experience: Gebrandete Kartons, Seidenpapier und handgeschriebene Dankeskarten auf Autopilot',
            'Retouren-Management: Automatisierte Qualitätsprüfung und Wiedereinlagerung'
          ],
          coreConcepts: [
            {
              iconName: 'truck',
              title: 'AUTOMATED 3PL',
              description: 'Bestellung im Shop löst sofortiges Verpacken und Versenden im Lager aus.',
              highlight: true
            },
            {
              iconName: 'gift',
              title: 'BRANDED UNBOXING',
              description: 'Hochwertiges Verpackungserlebnis steigert die Wiederkaufrate um 35%.'
            }
          ],
          resources: [
            {
              title: '3PL Anbieter-Vergleichstabelle & SLA-Vertragsmuster',
              subtitle: 'Preisstrukturen und Service-Level-Agreements als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Order & Logistics Sync',
              subtitle: 'Bestellungen und Sendungsverfolgungs-Links im CRM synchronisieren',
              type: 'tool',
              iconName: 'package',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur moderner E-Commerce Logistik

Konzentriere dich auf Marketing und Produktentwicklung – überlasse den Kartonversand spezialisierten Robotern.

#### Die Schritte zur 3PL-Integration:
1. **API-Anbindung**: Verbinde deinen Shop via Webhook mit dem Warehouse-Management-System (WMS).
2. **Warenanlieferung**: Sende Paletten direkt vom Hersteller an das 3PL-Zentrallager.
3. **Automatischer Tracking-Versand**: Der Kunde erhält die Trackingnummer sofort per E-Mail und SMS.`
        },
        understandContent: {
          coreTakeaway: 'Wer Logistik voll automatisiert, kann 10.000 Pakete am Tag mit einem 3-Personen-Kernteam versenden.',
          keyPrinciples: [
            'SLA-Verträge mit Strafzahlungen bei Lieferverzögerungen durch das Lager vereinbaren',
            'Sicherheitsbestand von mindestens 30 Tagen einplanen, um Out-of-Stock Situationen zu vermeiden'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deine 3PL-Schnittstelle im Mara CRM:',
          inputType: 'checklist',
          checklistItems: [
            '3PL Fulfillment-Partner ausgewählt und Schnittstelle angebunden',
            'Unboxing-Konzept (Karton-Branding, Beileger) im Lager hinterlegt',
            'Automatischer E-Mail-Workflow für Tracking-Nummern aktiviert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '74.2',
        stageId: 74,
        stageTitle: '74. Zoll & Globale Frachtoptimierung',
        title: 'See- & Luftfracht: Incoterms (DDP vs. FOB), Zollabwicklung & HS-Codes',
        durationMinutes: 29,
        description: 'Wie du Zolltarifnummern (HS-Codes) richtig einstufst, Seefracht-Container konsolidierst und teure Standgelder im Hafen verhinderst.',
        learnContent: {
          videoTitle: 'Masterclass: Globale Fracht, Zollabwicklung & Supply Chain',
          videoDuration: '29:45',
          summaryText: 'Ein falscher HS-Code kann dazu führen, dass dein Container wochenlang beim Zoll beschlagnahmt wird. Lerne, wie du mit DDP-Spediteuren arbeitest, Zolltarife optimierst und Frachtkosten um 40% senkst.',
          bulletPoints: [
            'Incoterms 2020: DDP (Delivered Duty Paid) vs. FOB (Free on Board) – warum DDP für Einsteiger am sichersten ist',
            'HS-Code Klassifizierung: Den passenden Zolltarif für minimale Abgaben legal auswählen',
            'Container-Konsolidierung (LCL vs. FCL): Wann sich ein voller 40-Fuß Container gegenüber Stückgut rechnet',
            'EORI-Nummer & ATLAS-Zollsystem: Die Pflicht-Registrierungen für europäische Importeure'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'DDP SHIPPING',
              description: 'Spediteur übernimmt alle Zollformalitäten und liefert direkt an dein Lager.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'HS-CODE COMPLIANCE',
              description: 'Exakte Zolltarif-Zuordnung verhindert Strafzölle und Hafenblockaden.'
            }
          ],
          resources: [
            {
              title: 'Incoterms 2020 Spickzettel & Zoll-Berechnungs-Tabelle',
              subtitle: 'Übersicht über Gefahrenübergang & Zollkosten als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Inventory Forecasting Engine',
              subtitle: 'Waren-Nachbestellzeitpunkte basierend auf Lieferzeiten kalkulieren',
              type: 'tool',
              iconName: 'trending_up',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Das Regelwerk des internationalen Warenverkehrs

Reibungslose Supply Chains sind der geheime Wettbewerbsvorteil erfolgreicher E-Commerce Marken.

#### Die wichtigsten Schritte beim Warenimport:
- **EORI-Nummer**: Beantrage deine EORI-Nummer vor dem ersten Import beim Zoll.
- **Produktsicherheit**: CE-Kennzeichnung, Konformitätserklärungen und Laborprüfberichte bereithalten.
- **Lead-Time Kalkulation**: Plane 6-8 Wochen für Seefracht inklusive Zollabfertigung ein.`
        },
        understandContent: {
          coreTakeaway: 'Wer Incoterms und Zollformalitäten beherrscht, importiert Waren stressfrei und zu minimalen Stückkosten.',
          keyPrinciples: [
            'Immer 100% Endkontrolle (Pre-Shipment Inspection) in der Fabrik vor der Restzahlung durchführen',
            'Transportversicherung für alle See- und Luftfracht-Sendungen ist Pflicht'
          ]
        },
        actionTask: {
          instruction: 'Prüfe deine Import-Dokumente auf Vollständigkeit:',
          inputType: 'checklist',
          checklistItems: [
            'EORI-Nummer beim Zollamt registriert und im System hinterlegt',
            'HS-Codes für alle Produktvarianten mit Zollexperten abgestimmt',
            'DDP-Speditionsvertrag mit verbindlichen Lieferzeiträumen geschlossen'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 75,
    title: '75. Family Office & Generationen-Vermögenssicherung',
    subtitle: 'Single Family Office, Familienstiftungen, Asset Allocation & Generationen-Wealth',
    color: 'from-amber-700 via-yellow-800 to-slate-900',
    badgeIcon: '🏛️',
    description: 'Lerne die Grundzüge von Family Offices, Familienstiftungen und diversifizierter Vermögensstrukturierung kennen. Rechts-, Steuer- und Anlagerisiken unterscheiden sich je nach Land und persönlicher Situation.',
    lessons: [
      {
        id: '75.1',
        stageId: 75,
        stageTitle: '75. Familienstiftungen & Vermögensschutz',
        title: 'Die Familienstiftung: Chancen, Grenzen und rechtliche Pflichten',
        durationMinutes: 34,
        description: 'Wie Familienstiftungen in Deutschland, Österreich und Liechtenstein grundsätzlich funktionieren, wem das Stiftungsvermögen rechtlich zugeordnet ist und wie Begünstigte versorgt werden können.',
        learnContent: {
          videoTitle: 'Masterclass: Familienstiftungen & Generationen-Vermögensschutz',
          videoDuration: '34:20',
          summaryText: 'Eine Familienstiftung kann Vermögen langfristig nach einem festgelegten Zweck verwalten. Ob sie steuerlich oder erbrechtlich sinnvoll ist, hängt von Rechtsordnung, Ausgestaltung und Einzelfall ab; Pflichtteils-, Gläubiger- und Steuerfragen müssen Fachleute prüfen.',
          bulletPoints: [
            'Das Stiftungs-Prinzip: Vermögen wird verselbstständigt und dient ausschließlich dem Stiftungszweck (Familienversorgung)',
            'Erbersatzsteuer in Deutschland: Grundprinzip und mögliche Belastung in der langfristigen Planung berücksichtigen',
            'Grenzüberschreitende Stiftungen: Steuerpflichten, Transparenzregeln und Anerkennung in allen betroffenen Ländern prüfen',
            'Destinatäre: Wie Kinder und Enkel monatliche Zuwendungen erhalten, ohne Zugriff auf das Stammvermögen zu haben'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'GENERATIONAL ASSET VAULT',
              description: 'Eine eigenständige Vermögensstruktur kann Risiken ordnen, bietet aber keinen pauschalen Schutz vor Ansprüchen.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'PURPOSE-DRIVEN LEGACY',
              description: 'Satzungsregeln geben den Zweck vor; Governance, Kontrolle und rechtliche Grenzen bleiben entscheidend.'
            }
          ],
          resources: [
            {
              title: 'Familienstiftungs-Kompass & Satzungs-Muster',
              subtitle: 'Rechtlicher Leitfaden zu Stiftungsgründungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Family Office Asset Ledger',
              subtitle: 'Gesamtvermögen, Beteiligungen und Immobilien zentral erfassen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Langfristige Vermögensverwaltung mit klaren Regeln

Eine Stiftung ist eine eigenständige Rechtsstruktur. Ihre Wirkung auf Nachfolge, Steuern und Haftung richtet sich nach dem anwendbaren Recht und der konkreten Gestaltung.

#### Die Säulen einer Familienstiftung:
1. **Der Stifter**: Du bringst Unternehmensanteile, Immobilien und Wertpapiere in die Stiftung ein.
2. **Die Satzung**: Legt im Rahmen des geltenden Rechts fest, wie Erträge verwaltet und ausgeschüttet werden.
3. **Der Vorstand**: Verwaltet das Vermögen nach deinen Vorgaben.
4. **Die Begünstigten (Destinatäre)**: Deine Kinder und Enkel, die regelmäßige Ausschüttungen erhalten.`
        },
        understandContent: {
          coreTakeaway: 'Eine Familienstiftung ist eine mögliche, aber komplexe Nachfolgestruktur und sollte nur nach individueller Rechts- und Steuerberatung umgesetzt werden.',
          keyPrinciples: [
            'Die Stiftungssatzung muss mit höchster Sorgfalt formuliert werden, da nachträgliche Änderungen extrem schwierig sind',
            'Stiftungsvorstand mit vertrauenswürdigen Fachleuten und Familienmitgliedern besetzen'
          ]
        },
        actionTask: {
          instruction: 'Skizziere die Satzungs-Ziele für deine Familienstiftung:',
          inputType: 'checklist',
          checklistItems: [
            'Stiftungszweck und Begünstigten-Kreis (Destinatäre) definiert',
            'Vermögenswerte (Unternehmensanteile, Immobilien) für die Stiftungseinbringung gelistet',
            'Erstberatung mit spezialisiertem Stiftungs-Notar/Rechtsanwalt vorbereitet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '75.2',
        stageId: 75,
        stageTitle: '75. Single Family Office & Allokation',
        title: 'Das Single Family Office: Aufgaben, Kosten und individuelle Allokation',
        durationMinutes: 32,
        description: 'Wie du Nutzen, Kosten und Governance eines Family Office prüfst und eine individuelle Vermögensallokation mit qualifizierten Fachleuten entwickelst.',
        learnContent: {
          videoTitle: 'Masterclass: Single Family Office Setup & All-Weather Allokation',
          videoDuration: '32:30',
          summaryText: 'Ob sich ein eigenes oder gemeinschaftliches Family Office eignet, hängt von Vermögen, Komplexität, Familie, Kosten und gewünschter Kontrolle ab. Lerne, Dienstleister zu prüfen und Risiken transparent zu dokumentieren; Kapitalerhalt ist nicht garantiert.',
          bulletPoints: [
            'Allokationsbeispiel: Anlageklassen, Liquiditätsbedarf, Zeithorizont, Kosten und Risikotragfähigkeit gemeinsam betrachten',
            'All-Weather-Ansätze: Annahmen, historische Grenzen und mögliche Verluste in unterschiedlichen Marktphasen prüfen',
            'Governance & Familienverfassung: Werte, Bildung und Regeln für die nächste Generation festlegen',
            'Kostenkontrolle: Gebühren, Interessenkonflikte, Verwahrung, Steuern und Risiken direkter Anlagen vergleichen'
          ],
          coreConcepts: [
            {
              iconName: 'pie-chart',
              title: 'ALL-WEATHER WEALTH',
              description: 'Diversifikation kann Risiken verteilen, schützt aber nicht automatisch vor Verlusten, Inflation oder Währungsschwankungen.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'DIRECT INVESTING',
              description: 'Direktanlagen können bestimmte Gebühren vermeiden, bringen jedoch Prüfungskosten, Illiquidität und Konzentrationsrisiken mit sich.'
            }
          ],
          resources: [
            {
              title: 'Family Office Asset Allocation & Governance Blueprint',
              subtitle: 'Excel-Allokationsmodell & Familienverfassung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Asset Portfolio Dashboard',
              subtitle: 'Vermögensklassen, Cashflows und Renditen in Echtzeit visualisieren',
              type: 'tool',
              iconName: 'pie-chart',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Führung eines Single Family Offices

Ein Family Office koordiniert komplexe Vermögens-, Steuer-, Rechts- und Familienfragen. Auch professionelle Verwaltung kann Verluste oder Fehlentscheidungen nicht ausschließen.

#### Die Kernaufgaben des Family Offices:
- **Vermögensverwaltung**: Disziplinierte Reallokation einmal pro Jahr zur Wiederherstellung der Zielquoten.
- **Recht & Steuern**: Kontinuierliche Prüfung internationaler Gesetzesänderungen.
- **Family Governance**: Vorbereitung der Kinder auf die verantwortungsvolle Verwaltung des Vermögens.`
        },
        understandContent: {
          coreTakeaway: 'Eine passende Governance kann langfristige Entscheidungen strukturieren; Sicherheit und Kaufkrafterhalt bleiben dennoch unsicher.',
          keyPrinciples: [
            'Konzentrationsgrenzen individuell anhand von Zielen, Verpflichtungen und Risikotragfähigkeit festlegen',
            'Liquiditätsreserve anhand persönlicher Ausgaben, Verpflichtungen, Anlagehorizont und Beratung bestimmen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deine 5-Säulen Asset-Allocation Matrix:',
          inputType: 'checklist',
          checklistItems: [
            'Ist-Zustand deines Gesamtvermögens über alle Klassen im Mara CRM erfasst',
            'Ziel-Allokation (Immobilien, Aktien, Private Equity, Edelmetalle, Liquidität) definiert',
            'Jährlichen Rebalancing-Termin für das Portfolio im Kalender fixiert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  }
];

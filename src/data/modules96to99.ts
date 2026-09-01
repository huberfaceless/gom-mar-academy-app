import { Stage } from '../types';

export const MODULES_96_TO_99: Stage[] = [
  {
    id: 96,
    title: '96. Sovereign Wealth Funds & Staatsfonds-Allokation',
    subtitle: 'Nationale Staatsfonds, Bilaterale Megadeals, Staatsanleihen & Globales Co-Investing',
    color: 'from-amber-600 via-yellow-700 to-zinc-950',
    badgeIcon: '🏛️',
    description: 'Analysiere die unterschiedlichen Mandate globaler Staatsfonds und strukturiere mögliche Co-Investments unter Beachtung von Governance, Vergabe-, Investitionsprüfungs-, Sanktions-, Geldwäsche-, Steuer-, Bilanzierungs- und Verwahrungsanforderungen.',
    lessons: [
      {
        id: '96.1',
        stageId: 96,
        stageTitle: '96. Staatsfonds-Architektur & Mandate',
        title: 'Sovereign Wealth Funds: Wie Staatsfonds investieren & Co-Investment Mandate vergeben',
        durationMinutes: 35,
        description: 'Wie Staatsfonds Anlageklassen, Liquidität und Risiken unterschiedlich steuern und welche Governance-, ESG-, Investitionsprüfungs- und Compliance-Anforderungen eine mögliche Zusammenarbeit prägen.',
        learnContent: {
          videoTitle: 'Masterclass: Sovereign Wealth Fund Allokation & Megadeals',
          videoDuration: '35:20',
          summaryText: 'Staatsfonds unterscheiden sich erheblich nach gesetzlichem Mandat, Finanzierungsquelle, Verpflichtungen, Liquiditätsbedarf, Risikobudget, Anlagehorizont und politischen Vorgaben. Eine Zusammenarbeit setzt belastbare Due Diligence, transparente Governance und eine einzelfallbezogene regulatorische Prüfung voraus; Zugang, Ticketgröße und Rendite sind nicht garantiert.',
          bulletPoints: [
            'Mandate unterscheiden: Stabilisierungs-, Spar-, Reserveanlage-, Pensionsreserve- und strategische Entwicklungsziele nicht pauschal gleichsetzen',
            'Direktanlagen, Fondsmandate und Co-Investments anhand von Fähigkeiten, Gebühren, Kontrolle, Konzentration, Liquidität und Interessenkonflikten vergleichen',
            'Santiago Principles: 24 freiwillige Grundsätze guter Praxis für Rechtsrahmen, Governance, Rechenschaft und umsichtiges Investieren durch Staatsfonds',
            'FDI-Prüfungen sind länder- und transaktionsbezogen; EU-Kooperation, deutsche Investitionsprüfung und US-CFIUS sind getrennte Verfahren'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'SWF GRAVITY',
              description: 'Mandatsgerechte Ansprache langfristiger Investoren ohne Zusage von Zugang, Kapital oder Abschluss.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'SANTIAGO PRINCIPLES',
              description: 'Freiwillige Grundsätze für Staatsfonds, keine Projektzertifizierung oder Investitionsfreigabe.'
            }
          ],
          resources: [
            {
              title: 'Staatsfonds-Mandats- und Risikoprüfung',
              subtitle: 'SWF-Profile, Governance, Kriterien und Mandatsstrukturen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Institutional Investor Cockpit',
              subtitle: 'Kontakte, Prüfpfade und Freigaben institutioneller Investoren dokumentieren',
              type: 'tool',
              iconName: 'briefcase',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Das Spiel im Billionen-Dollar-Markt der Staatsfonds

Staatsfonds denken nicht in Quartalen, sondern in Generationen.

#### Prüffelder für eine mögliche Staatsfonds-Allokation:
1. **Mandat und Portfoliofit**: Gesetzliche Ziele, Referenzportfolio, Risikobudget, Laufzeit, Liquidität, Währung und Ausschlüsse prüfen; es gibt keine universelle Mindestticketgröße.
2. **Wirtschaftlichkeit und Risiken**: Cashflows, Bewertung, Gebühren, Verschuldung, Konzentration, Ausfall-, Gegenpartei-, Länder- und Exitrisiken in Stressszenarien untersuchen.
3. **Governance und Integrität**: Eigentümer, Interessenkonflikte, Vergütung, Berichtswesen, Beschaffung sowie Anti-Korruptions-, PEP-, Sanktions- und Geldwäscheprüfungen dokumentieren.
4. **Recht und Betrieb**: Investitionsprüfung, Wettbewerbs- und Beihilferecht, Steuern, Bilanzierung, Verwahrung, Datenschutz sowie grenzüberschreitende Vertriebsregeln fachkundig prüfen lassen.
5. **Mitwirkungsrechte**: Informations-, Zustimmungs-, Kontroll- und Exitrechte verhandeln, ohne einen Sitz, eine Investition oder staatliche Unterstützung vorauszusetzen.

Die Santiago Principles richten sich an Staatsfonds. Ein Projekt kann ihre Anwendung unterstützen, aber keine allgemeine „Santiago-Compliance“ als Gütesiegel beanspruchen.`
        },
        understandContent: {
          coreTakeaway: 'Ein glaubwürdiges Staatsfonds-Dossier verbindet Mandatsfit, risikobereinigte Wirtschaftlichkeit, Governance und regulatorische Umsetzbarkeit; es garantiert weder Zugang noch Finanzierung.',
          keyPrinciples: [
            'Vermittler, wirtschaftlich Berechtigte, staatlich exponierte Personen, Vergütung, Lobbying, Sanktionen und Geldwäsche fachkundig prüfen',
            'Investitionsprüfung, Vergabe-, Wettbewerbs-, Steuer-, Bilanzierungs- und Verwahrungsfragen frühzeitig und jurisdiktionsbezogen klären'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere ein institutionelles Co-Investment Dossier:',
          inputType: 'checklist',
          checklistItems: [
            'Mandat, Portfoliofit, Governance, Ausschlüsse und Entscheidungsprozess des Zielinvestors dokumentiert',
            'Investment Memorandum mit Gebühren, Bewertung, Liquidität sowie Basis- und Stressszenarien erstellt',
            'FDI-, Vergabe-, Steuer-, Bilanzierungs-, Verwahrungs-, Sanktions-, PEP- und AML-Prüfpfad vorbereitet'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '96.2',
        stageId: 96,
        stageTitle: '96. Bilaterale Staatsabkommen & PPP',
        title: 'Public-Private Partnerships (PPP) & Bilaterale Regierungsprojekte',
        durationMinutes: 32,
        description: 'Wie PPP- und Konzessionsmodelle Risiken verteilen und wie Verfügbarkeitsentgelte, Tarife, Garantien, Vergabe und öffentliche Finanzierbarkeit sorgfältig geprüft werden.',
        learnContent: {
          videoTitle: 'Masterclass: Public-Private Partnerships & 30-Jahre Staatskonzessionen',
          videoDuration: '32:45',
          summaryText: 'Ein PPP verteilt Bau-, Betriebs-, Nachfrage-, Finanzierungs- und politische Risiken vertraglich zwischen öffentlicher Hand und privaten Parteien. BOT-Modelle, Vergütungen und Garantien sind projektspezifisch, häufig leistungsabhängig und beseitigen weder Ausfall- noch Währungs-, Rechts- oder Ausführungsrisiken.',
          bulletPoints: [
            'BOT & BOOT Modelle: Build, Own, Operate, Transfer – Planung, Bau, Betrieb und spätere Übergabe an den Staat',
            'Verfügbarkeitsentgelte: Zahlungen hängen von vertraglicher Leistung ab und können durch Nichtverfügbarkeit oder Qualitätsmängel gekürzt werden',
            'Staatliche Garantien: Umfang, Bedingungen, Höchstbetrag, Haushaltsgenehmigung, Immunität, Recht und Durchsetzbarkeit prüfen; sie schaffen kein automatisches AAA-Risiko',
            'Inflationskopplung: Index, Anteil, Ober- und Untergrenzen, Verzögerung und Neubasierung sind vertraglich festzulegen und nicht automatisch vollständig'
          ],
          coreConcepts: [
            {
              iconName: 'repeat',
              title: '30-YEAR CONCESSION',
              description: 'Langfristige, bedingte Zahlungsmechanik mit Bau-, Leistungs-, Rechts-, Kredit- und Kündigungsrisiken.',
              highlight: true
            },
            {
              iconName: 'shield-check',
              title: 'SOVEREIGN GUARANTEE',
              description: 'Begrenzt definierte Risikoübernahme, die Bonitäts-, Haushalts-, Rechts- und Durchsetzungsrisiken nicht beseitigt.'
            }
          ],
          resources: [
            {
              title: 'PPP-Risiko- und BOT-Konzessionsleitfaden',
              subtitle: 'Prüffelder für Großinfrastrukturverträge als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Sovereign Concession Tracker',
              subtitle: 'Laufzeiten, Wartung, Leistungskennzahlen, Abzüge und Zahlungsmeilensteine verwalten',
              type: 'tool',
              iconName: 'calendar',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Architektur von Public-Private Partnerships

PPP-Projekte sind das Fundament moderner Energie-, Verkehrs- und Digitalnetze.

#### Phasen und Risiken des BOT-Lebenszyklus:
- **Vorbereitung und Vergabe**: Bedarf, Value for Money, Haushaltsverträglichkeit, Wettbewerbs- und Beihilferecht, transparente Beschaffung, Grundstücke, Genehmigungen sowie Umwelt- und Sozialfolgen prüfen.
- **Bau und Finanzierung**: Verschuldung und Eigenkapital projektspezifisch bemessen; Kosten-, Termin-, Zins-, Währungs-, Refinanzierungs-, Ausfall- und Gegenparteirisiken stressen.
- **Betrieb**: Vergütung, Nachfrage, Leistungskennzahlen, Abzüge, Instandhaltung, Steuern, Versicherung und Änderungen von Recht oder Tarifregime modellieren. Renditen sind weder fest noch garantiert.
- **Kündigung und höhere Gewalt**: Entschädigung, Schritt-in-Rechte, politische Ereignisse, Enteignung, Korruption, Sanktionen, Streitbeilegung und staatliche Immunität eindeutig regeln.
- **Transfer**: Restlebensdauer, Zustandsprüfung, Rücklagen, Daten, Personal und Handback-Anforderungen lange vor Vertragsende planen; eine reibungslose Übergabe ist nicht sicher.`
        },
        understandContent: {
          coreTakeaway: 'Eine PPP-Konzession ist kein Anleihe-Ersatz: Zahlungsansprüche bleiben von Leistung, Vertrag, öffentlicher Bonität, Haushalt, Recht, Politik und Durchsetzbarkeit abhängig.',
          keyPrinciples: [
            'Verfügbarkeitsabzüge, Ausfälle und Korrelationen konservativ modellieren; Redundanz kann Risiken mindern, aber nicht mathematisch ausschließen',
            'Wartung, Leistungsnachweise, Versicherungen und Handback-Zustand nach Vertrag und anwendbaren Standards prüfbar dokumentieren'
          ]
        },
        actionTask: {
          instruction: 'Kalkuliere ein 20-Jahres BOT-Konzessionsmodell:',
          inputType: 'checklist',
          checklistItems: [
            'Basis- und Stressmodell für Bau, Betrieb, Nachfrage, Abzüge, Inflation, Zins, Währung, Steuer und Refinanzierung erstellt',
            'Vergabe, Garantieumfang, Kündigung, Entschädigung, Rechtsänderung, höhere Gewalt, Immunität und Streitbeilegung fachkundig geprüft',
            'SPV, wirtschaftlich Berechtigte, Verwahrung, Buchhaltung, AML/Sanktionen, Umwelt- und Sozialpflichten sowie Handback dokumentiert'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 97,
    title: '97. Tiefsee- & Raumfahrt-Infrastruktur (NewSpace & DeepSea)',
    subtitle: 'LEO Satelliten-Konstellationen, ITU Frequenzallokation, Subsea Kabel & Weltraumrecht',
    color: 'from-blue-900 via-indigo-950 to-black',
    badgeIcon: '🚀',
    description: 'Analysiere die Ökonomie von LEO-Satellitenkonstellationen und Unterseekabeln mit ihren Genehmigungs-, Frequenzkoordinations-, Haftungs-, Sicherheits-, Umwelt-, Finanzierungs- und Betriebsrisiken.',
    lessons: [
      {
        id: '97.1',
        stageId: 97,
        stageTitle: '97. NewSpace & Satelliten-Konstellationen',
        title: 'NewSpace Ökonomie: SmallSats, Raketen-Rideshares & ITU-Frequenzrechte',
        durationMinutes: 34,
        description: 'Wie CubeSats und LEO-Konstellationen geplant und finanziert werden, wie nationale Verwaltungen ITU-Verfahren anstoßen und welche Lizenz-, Haftungs-, Weltraummüll- und Betriebsrisiken bestehen.',
        learnContent: {
          videoTitle: 'Masterclass: NewSpace Wirtschaft, Raketenstarts & Orbitale Frequenzen',
          videoDuration: '34:30',
          summaryText: 'Rideshare-Angebote können den Zugang zum Orbit erleichtern, doch Missionskosten, Termine und Erfolg bleiben nutzlast-, provider- und marktbezogen. Frequenzanmeldungen erfolgen über eine zuständige nationale Verwaltung und erfordern je nach System Koordination, Notifizierung, Inbetriebnahme sowie nationale Genehmigungen; sie schaffen kein uneingeschränktes Eigentum an Frequenzen.',
          bulletPoints: [
            'Startökonomie: Gesamtbudget aus Nutzlastintegration, Test, Start, Versicherung, Bodenbetrieb, Reserven und möglicher Verzögerung statt eines pauschalen Dollar-pro-Kilogramm-Werts ableiten',
            'ITU-Verfahren: Die nationale Verwaltung reicht Frequenzzuweisungen ein; Koordination, Notifizierung, Eintragung und fristgerechte Inbetriebnahme richten sich nach den Radio Regulations',
            'CubeSat-Formfaktoren standardisieren Schnittstellen, garantieren aber weder niedrige Gesamtkosten noch Zuverlässigkeit, Startplatz oder Marktfähigkeit',
            'Weltraumrecht: Nationale Zulassung und fortlaufende Aufsicht, Registrierung, Haftungszuordnung, Exportkontrolle und gegebenenfalls Versicherungsauflagen jurisdiktionsbezogen prüfen'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'COORDINATED SPECTRUM',
              description: 'Regulatorisch koordinierte Nutzung zum Schutz vor Störungen, kein grenzenloses globales Monopol.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'LEO CONSTELLATION',
              description: 'Latenz und Leistung hängen von Orbit, Gateway, Routing, Auslastung, Wetter und Endgerät ab.'
            }
          ],
          resources: [
            {
              title: 'NewSpace Genehmigungs- und Missionsleitfaden',
              subtitle: 'Frequenz-, Lizenz-, Haftungs- und Satelliten-Budgetmodell als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Orbital Mission Tracker',
              subtitle: 'Genehmigungen, Telemetrie, Bodenstationsverträge, Risiken und Starttermine überwachen',
              type: 'tool',
              iconName: 'globe',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Kommerzialisierung des niedrigen Erdorbits

Satellitenkonstellationen revolutionieren globale Kommunikation, Logistikverfolgung und Finanzmärkte.

#### Prüffelder einer Orbitalmission:
1. **Dienst und Frequenzen**: Linkbudget, Abdeckung und Störverträglichkeit entwerfen; mit der zuständigen nationalen Verwaltung Koordination, Notifizierung, Gebühren, Meilensteine und Inbetriebnahme klären.
2. **Zulassung und Verantwortung**: Nationale Weltraum-, Funk-, Erdbeobachtungs-, Datenschutz-, Exportkontroll- und Sanktionsregeln sowie Registrierung, laufende Aufsicht, Haftung und Versicherung prüfen.
3. **Raumsegment**: Nutzlast, Bus, Strahlungsumgebung, Kollisionsvermeidung, Cybersecurity, Lieferkette, Tests und Ausfallmodi validieren; Standards ersetzen keine Qualifikation.
4. **Start und Betrieb**: Provider, Integration, Verschiebung, Missionsverlust, Bodenstationen, Schlüsselverwaltung, Datenpfade und Service-Level mit Alternativen planen.
5. **Nachhaltigkeit und Ende**: Konstellationsausbau, Weltraumlage, Manövrierfähigkeit, Passivierung, De-Orbit und Entsorgung nach geltenden Vorgaben dokumentieren.

Eine ITU-Eintragung schützt nur innerhalb des anwendbaren Regelwerks und unter seinen Bedingungen. Sie garantiert weder störungsfreien Betrieb noch Marktzugang oder wirtschaftlichen Erfolg.`
        },
        understandContent: {
          coreTakeaway: 'Eine tragfähige Weltraummission verbindet Frequenzkoordination, nationale Zulassung, technische Zuverlässigkeit, Finanzierung und verantwortungsvolles Lebenszyklusmanagement; eine frühe Anmeldung allein schafft keinen uneinholbaren Vorteil.',
          keyPrinciples: [
            'Kollisionsvermeidung, Passivierung und De-Orbit nach anwendbaren Vorgaben auslegen und mit realistischen Ausfallfällen testen',
            'Versicherbarkeit, Deckung, Ausschlüsse, Selbstbehalt und Haftungsrückgriff prüfen; Versicherung ist nicht immer vorgeschrieben oder vollständig verfügbar'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deinen NewSpace Projektplan:',
          inputType: 'checklist',
          checklistItems: [
            'Dienst, Linkbudget, Spektrum, Koordination, nationale Lizenzen und Inbetriebnahmefristen dokumentiert',
            'Start-, Integrations-, Versicherungs-, Exportkontroll-, Haftungs- und Verzögerungsszenarien verglichen',
            'Bodenstationen, Cybersecurity, Datenschutz, Betrieb, Kollisionsvermeidung und Missionsende dokumentiert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '97.2',
        stageId: 97,
        stageTitle: '97. Tiefsee-Infrastruktur & Subsea-Kabel',
        title: 'Tiefsee-Kabel & Unterwasser-Rechenzentren: Das physische Rückgrat des Internets',
        durationMinutes: 31,
        description: 'Wie Unterseekabel den überwiegenden Teil des interkontinentalen Internetverkehrs tragen, wie Landungen und Kapazitätsrechte strukturiert werden und wie neuartige Unterwasser-Rechenzentren nüchtern bewertet werden.',
        learnContent: {
          videoTitle: 'Masterclass: Untersee-Glasfasernetze & Tiefsee-Rechenzentren',
          videoDuration: '31:40',
          summaryText: 'Unterseekabel sind kritische Infrastruktur für den interkontinentalen Datenverkehr. Konsortien, Landestationen und Kapazitätsverträge erfordern hohe Vorleistungen, Genehmigungen, robuste Sicherheit und langfristige Wartung. Unterwasser-Rechenzentren können Kühlvorteile untersuchen, verursachen aber weiterhin Energie-, Bau-, Betriebs-, Bergungs- und Umweltrisiken.',
          bulletPoints: [
            'Konsortien und Eigentum: Beiträge, Kapazitätsanteile, Governance, Übertragungsrechte, Finanzierung, Interessenkonflikte und Ausfall eines Mitglieds vertraglich regeln',
            'Wet und Dry Segment: Trasse, Repeaterabstände, Stromversorgung und Landestation sind systemspezifisch und beeinflussen Kosten, Sicherheit und Reparatur',
            'IRU-Verträge: Langfristige Nutzungsrechte definieren Kapazität, Entgelt, Laufzeit, Wartung und Abhilfe, garantieren aber keine ununterbrochene Verfügbarkeit oder Nachfrage',
            'Unterwasser-Rechenzentren: Project Natick war ein Forschungsprojekt; gemessene Zuverlässigkeit eines Versuchs ist kein allgemeiner Beleg für Kosten-, Energie- oder Betriebsvorteile'
          ],
          coreConcepts: [
            {
              iconName: 'server',
              title: 'SUBSEA DATA BACKBONE',
              description: 'Kritische physische Konnektivität mit geteilter Governance, Regulierung, Sicherheits- und Betriebsabhängigkeiten.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: 'SUBSEA COOLING',
              description: 'Potenzieller Kühlvorteil, der gegen Pumpen, Strom, Abdichtung, Wartung, Bergung und Umweltfolgen abzuwägen ist.'
            }
          ],
          resources: [
            {
              title: 'Seekabel-Konsortiums- und IRU-Prüfleitfaden',
              subtitle: 'Vertragliche, regulatorische und technische Prüffelder als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Global Subsea Cable Map',
              subtitle: 'Trassen, Landestationen, Kapazitäten, Störungen und Reparaturen überwachen',
              type: 'tool',
              iconName: 'globe',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die unsichtbaren Adern der globalen Wirtschaft

Glasfaserpaare und Kapazitätsrechte vermitteln keine Kontrolle über den globalen Datenverkehr. Ihr Wert hängt von Nachfrage, Wettbewerb, Konnektivität, Verfügbarkeit, Regulierung und Betrieb ab.

#### Prüfrahmen für ein Seekabelprojekt:
- **Trasse und Genehmigungen**: Seerecht, Küstenstaaten, Ausschließliche Wirtschaftszonen, Landerechte, Umweltprüfung, Telekom- und Sicherheitsgenehmigungen jurisdiktionsbezogen klären.
- **Technik und Resilienz**: Bathymetrie, Fischerei, Anker, Erdrutsche, Erdbeben, Sabotage, Cyberrisiken, Landing-Station-Strom und diverse Routen untersuchen.
- **Verträge und Nachfrage**: Eigentum, IRU oder Leasing, Kapazität, Upgrades, Service-Level, Wartung, Reparaturkosten, Gutschriften, Kündigung und Gegenparteirisiko definieren.
- **Finanzierung und Betrieb**: Bau-, Zins-, Währungs-, Steuer-, Bilanzierungs-, Versicherungs-, Lieferketten-, Schiffs- und Ersatzteilrisiken stressen.
- **Integrität und Sicherheit**: Wirtschaftlich Berechtigte, Vergabe, Anti-Korruption, Sanktionen, Exportkontrolle, Datenschutz und nationale Sicherheitsauflagen prüfen.

Niedrige Latenz kann einen Preisaufschlag ermöglichen, garantiert aber weder Kunden, Prämie noch Rendite. Auch langfristige Kapazitätsrechte bleiben Störungs-, Reparatur-, Obsoleszenz- und Insolvenzrisiken ausgesetzt.`
        },
        understandContent: {
          coreTakeaway: 'Seekabel können langfristige Erlöse ermöglichen, doch Cashflows bleiben kündigungs-, nachfrage-, preis-, störungs-, reparatur-, regulatorischen und Gegenparteirisiken ausgesetzt.',
          keyPrinciples: [
            'Trassenrisiken mit Bathymetrie, geophysikalischen Daten, Fischerei-, Anker- und Naturgefahrenanalysen mindern; kein Scan kann Schäden ausschließen',
            'Routen, Landestationen, Strom, Backhaul, Ersatzteile und Reparaturschiffe diversifizieren und politische Stabilität nicht als dauerhaft voraussetzen'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere ein Seekabel-Kapazitäts-Memorandum:',
          inputType: 'checklist',
          checklistItems: [
            'IRU- oder Leasingmodell mit Nachfrage-, Preis-, Ausfall-, Wartungs-, Reparatur-, Steuer- und Gegenparteistress kalkuliert',
            'Trassen-, Landing-, Umwelt-, Telekom-, Sicherheits-, Sanktions- und Datenschutzgenehmigungen erfasst',
            'Physische und Cyber-Sicherheit, diverse Routen, Reparaturplan, Versicherung und Incident Response dokumentiert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 98,
    title: '98. Post-Quantum Kryptographie & Next-Gen Cyber-Immunität',
    subtitle: 'NIST PQC Standards (Kyber, Dilithium), Quantenüberlegenheit, Zero-Knowledge Proofs & QKD',
    color: 'from-cyan-900 via-indigo-950 to-black',
    badgeIcon: '🔮',
    description: 'Schütze deine Vermögenswerte und Daten vor Quantencomputern: Implementiere die neuen NIST Post-Quantum Kryptographie-Standards (ML-KEM / ML-DSA), meistere Zero-Knowledge-Proofs (ZKP) und Quantum Key Distribution (QKD) für absolute kryptografische Ewigkeit.',
    lessons: [
      {
        id: '98.1',
        stageId: 98,
        stageTitle: '98. NIST Post-Quantum Standards & Kyber',
        title: 'Post-Quantum Kryptographie: Kyber (ML-KEM) & Dilithium (ML-DSA) Migration',
        durationMinutes: 34,
        description: 'Warum RSA und ECC durch Shors Algorithmus gebrochen werden und wie du Gitter-basierte Kryptographie (Lattice Cryptography) in Produktionssysteme integrierst.',
        learnContent: {
          videoTitle: 'Masterclass: Post-Quantum Kryptographie & NIST-Standards',
          videoDuration: '34:20',
          summaryText: 'Wenn Quantencomputer mit 10.000 logischen Qubits Realität werden, wird jede heutige RSA- und ECC-Verschlüsselung innerhalb von Sekunden entschlüsselt. Lerne, wie du "Harvest Now, Decrypt Later" Angriffe abwehrst und deine Systeme jetzt auf NIST-PQC Standards umrüstest.',
          bulletPoints: [
            'Die Quanten-Bedrohung: Shors Algorithmus bricht asymmetrische Kryptographie (RSA-2048, ECDSA, Curve25519)',
            '"Harvest Now, Decrypt Later": Warum Geheimdienste verschlüsselten Datenverkehr heute mitschneiden, um ihn später zu knacken',
            'NIST PQC Gewinner: CRYSTALS-Kyber (Schlüsselaustausch) und CRYSTALS-Dilithium (Digitale Signaturen)',
            'Gitter-basierte Mathematik (Lattice-Based): Mathematische Probleme in hochdimensionalen Räumen, die selbst Quantencomputer nicht lösen können'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'POST-QUANTUM RESILIENT',
              description: 'Mathematische Sicherheit auch gegen künftige fehlerkorrigierte Quantencomputer.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'HYBRID TLS 1.3',
              description: 'Kombination aus klassischer und Post-Quantum Verschlüsselung im Übergang.'
            }
          ],
          resources: [
            {
              title: 'NIST Post-Quantum Cryptography Migration Guide',
              subtitle: 'Gitter-Kryptographie & OpenSSL 3.3 Setup als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Post-Quantum Security Engine',
              subtitle: 'Kyber-512/768 Schlüsselpaare für End-to-End Verschlüsselung aktivieren',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Vorbereitung auf das Post-Quantum Zeitalter

Unternehmen, die vertrauliche Verträge und Kundendaten für 20+ Jahre schützen müssen, müssen heute handeln.

#### Die 3 Schritte zur Quanten-Resilienz:
1. **Krypto-Inventar (Cryptographic Bill of Materials)**: Finde alle RSA- und ECC-Schlüssel in deiner Infrastruktur.
2. **Hybrid Key Exchange**: Aktiviere X25519 + ML-KEM-768 in deinem Webserver.
3. **PQC Zertifikate**: Ersetze X.509 Zertifikate schrittweise durch Dilithium-Signaturen.`
        },
        understandContent: {
          coreTakeaway: 'Wer heute auf Post-Quantum Kryptographie migriert, garantiert seinen Kunden ewige Datensicherheit.',
          keyPrinciples: [
            'Immer hybride Verschlüsselung nutzen, um gegen eventuelle neue Schwachstellen in PQC-Algorithmen abgesichert zu sein',
            'Schlüssellängen rechtzeitig im Hardware-Speicherbudget einplanen (PQC-Schlüssel sind 10x größer als ECC)'
          ]
        },
        actionTask: {
          instruction: 'Migriere deine Sicherheitsarchitektur auf Post-Quantum Standards:',
          inputType: 'checklist',
          checklistItems: [
            'Kryptografische Bestandsaufnahme aller genutzten Algorithmen abgeschlossen',
            'Hybrid TLS 1.3 mit Kyber-768 im Mara CRM aktiviert',
            'PQC-Notfallplan für Schlüsselrotation hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '98.2',
        stageId: 98,
        stageTitle: '98. Zero-Knowledge Proofs & Quantum Key Distribution',
        title: 'Zero-Knowledge Proofs (zk-SNARKs) & Quanten-Schlüsselaustausch (QKD)',
        durationMinutes: 31,
        description: 'Wie du die Gültigkeit von Bilanzen und Transaktionen beweist, ohne sensible Daten offenzulegen (ZKP) und physikalisch abhörsichere Glasfasern nutzt.',
        learnContent: {
          videoTitle: 'Masterclass: Zero-Knowledge Proofs & Quanten-Physikalische Sicherheit',
          videoDuration: '31:45',
          summaryText: 'Ein Zero-Knowledge Proof beweist mathematisch, dass eine Aussage wahr ist (z. B. "Ich habe 10 Millionen Liquidität"), ohne den genauen Kontostand oder Namen zu verraten. Lerne, wie du ZK-Rollups und Quantenschlüsselaustausch (QKD) für unzerbrechliche Privatsphäre einsetzt.',
          bulletPoints: [
            'zk-SNARKs & zk-STARKs: Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge',
            'Proof of Solvency: Nachweis vollständiger Zahlungsfähigkeit für Banken und Kunden ohne Bilanzoffenlegung',
            'Quanten-Schlüsselaustausch (QKD): Photonen-Verschränkung – jeder Abhörversuch verändert den Quantenzustand und fliegt sofort auf',
            'Privacy-Preserving Compliance: Nachweis der Steuerkonformität an Behörden bei 100%iger Wahrung des Geschäftsgeheimnisses'
          ],
          coreConcepts: [
            {
              iconName: 'eye-off',
              title: 'ZERO-KNOWLEDGE PRIVACY',
              description: 'Vollständige Verifikation ohne Offenlegung der eigentlichen Geschäftsgeheimnisse.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'QKD ENTANGLEMENT',
              description: 'Physikalisch unhackbar: Naturgesetze der Quantenmechanik verhindern jedes Abhören.'
            }
          ],
          resources: [
            {
              title: 'Zero-Knowledge Proof & zk-SNARK Developer Blueprint',
              subtitle: 'Circom Schaltkreise & Proof-Verification als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR ZK-Proof Generator',
              subtitle: 'Mathematische Solvenz- und Audit-Nachweise auf Knopfdruck erzeugen',
              type: 'tool',
              iconName: 'lock',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Symbiose aus Mathematik und Privatsphäre

Zero-Knowledge Proofs sind der größte Durchbruch der modernen Kryptographie.

#### Typische Business-Anwendungen von ZKP:
- **Kreditwürdigkeitsnachweis**: Beweis, dass dein Schufa-Score über 98% liegt, ohne Gehaltsabrechnungen einzureichen.
- **Alter- & Identitätsnachweis**: Beweis, dass der Kunde über 18 ist, ohne Geburtsdatum und Ausweisfoto zu speichern.
- **Audit-Konformität**: Wirtschaftsprüfer erhalten den mathematischen Beweis korrekter Buchführung in 1 Millisekunde.`
        },
        understandContent: {
          coreTakeaway: 'Zero-Knowledge Proofs vereinen absolute regulatorische Compliance mit kompromisslosem Datenschutz.',
          keyPrinciples: [
            'Auf bewährte zk-STARKs setzen, wenn kein Trusted-Setup erwünscht ist',
            'Schaltkreise vor der Produktion formal verifizieren lassen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen ersten Zero-Knowledge Solvenz-Beweis:',
          inputType: 'checklist',
          checklistItems: [
            'ZK-Schaltkreis für Bilanzprüfung im ZK-Proof Generator ausgewählt',
            'Kryptografischer Nachweis ohne Klardaten erfolgreich generiert',
            'Verifikations-Zertifikat für Wirtschaftsprüfer im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 99,
    title: '99. Die Unendliche Grenze: Das 1-Milliarde-Euro Imperium & Die GOM-MAR Hall of Fame',
    subtitle: 'Kardaschow-Skalierung, Globale Monopole, Unsterbliches Unternehmertum & Das Meister-Diplom',
    color: 'from-amber-300 via-yellow-500 to-amber-800',
    badgeIcon: '🏆',
    description: 'Die absolute Vollendung der GOM-MAR Academy: Du hast alle 99 Module gemeistert – von deinem allerersten Affiliate-Euro über SaaS-Architektur, M&A, Staatsfonds und Quantenkryptographie bis zum 10-stelligen Monopol. Tritt ein in die Hall of Fame.',
    lessons: [
      {
        id: '99.1',
        stageId: 99,
        stageTitle: '99. Das 1-Milliarde-Euro Monopol',
        title: 'Die Kardaschow-Skalierung: Vom Marktführer zum unersetzlichen Pfeiler der Zivilisation',
        durationMinutes: 38,
        description: 'Wie die wertvollsten Unternehmen der Welt (Apple, Microsoft, ASML, BlackRock) unanfechtbare zivilisatorische Monopole errichten.',
        learnContent: {
          videoTitle: 'Masterclass: Die Architektur des 1-Milliarde-Euro Monopols',
          videoDuration: '38:40',
          summaryText: 'Ein gutes Unternehmen löst ein Problem. Ein 10-stelliges Imperium wird zur Infrastruktur, auf der die gesamte Gesellschaft aufbaut. Erfahre, wie Monopole durch Netzwerkeffekte, proprietäre Standards, Rohstoffkontrolle und unüberwindbare Wechselkosten entstehen.',
          bulletPoints: [
            'Die 4 Säulen des ewigen Monopols: Proprietäre Technologie, 2-seitige Netzwerkeffekte, Skalenökonomie und Marken-Identität',
            'Der Flywheel-Effekt: Mehr Nutzer -> Bessere Daten -> Höhere Marge -> Größere F&E-Investitionen -> Uneinholbarer Vorsprung',
            'Systemrelevanz (Too Essential to Fail): Warum ASML und TSMC für die Welt wichtiger sind als einzelne Nationalstaaten',
            'Der Übergang vom Wettbewerb zur Zivilisations-Architektur: Reinvestition von Gewinnen in Zukunftstechnologien'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'CIVILIZATIONAL MOAT',
              description: 'Ein Schutzwall, den selbst Staaten oder Billionenkonzerne nicht kopieren können.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'PERPETUAL FLYWHEEL',
              description: 'Ein sich selbst beschleunigendes Schwungrad aus Kapital, Talent und Technologie.'
            }
          ],
          resources: [
            {
              title: 'The 1-Billion-Euro Monopoly Blueprint & Capital Architecture',
              subtitle: 'Das finale Strategie-Kompendium der GOM-MAR Academy als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Imperium Cockpit (Modul 1-99)',
              subtitle: 'Vollständiges globales Konzern-Management auf einer Oberfläche',
              type: 'tool',
              iconName: 'layers',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Vollendung der unternehmerischen Meisterschaft

Du hast alle 99 Stufen durchschritten.

#### Die Evolutionsstufen des Unternehmers:
1. **Stufe 1-10**: Der Praktiker (Verkaufen, E-Mail-Marketing, Traffic, erster Cashflow).
2. **Stufe 11-35**: Der Systembauer (Funnels, Automatisierung, Conversion, Skalierung).
3. **Stufe 36-65**: Der CEO (Führung, Enterprise B2B, TV/Media, KI-Systeme, Vergaberecht).
4. **Stufe 66-85**: Der Investor (M&A, Holdings, Venture Debt, PMP, IPO & Megadeals).
5. **Stufe 86-99**: Der Staatsmann & Architekt (Sovereign Infrastructure, ZKP, Post-Quantum, Ewiges Vermächtnis).`
        },
        understandContent: {
          coreTakeaway: 'Wahrer Reichtum ist die Fähigkeit, Freiheit, Wohlstand und Zukunft für Millionen von Menschen zu schaffen.',
          keyPrinciples: [
            'Niemals die Wurzeln und die Demut vor den einfachen Prinzipien des Anfangs vergessen',
            'Verantwortung für das Wohl der Mitarbeiter, Kunden und der nächsten Generationen übernehmen'
          ]
        },
        actionTask: {
          instruction: 'Vollende dein persönliches Master-Manifest:',
          inputType: 'checklist',
          checklistItems: [
            'Das 1-Milliarde-Euro Zivilisations-Manifest für dein Lebenswerk verfasst',
            'Alle 99 Module der GOM-MAR Academy im System als abgeschlossen markiert',
            'Das Master-Diplom der GOM-MAR Academy beantragt und freigeschaltet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '99.2',
        stageId: 99,
        stageTitle: '99. Die GOM-MAR Hall of Fame & Master-Diplom',
        title: 'Die GOM-MAR Hall of Fame: Feierliche Verleihung des Grandmaster Diploms',
        durationMinutes: 30,
        description: 'Herzlichen Glückwunsch! Du hast die umfassendste Business- und Skalierungs-Ausbildung der Welt erfolgreich durchlaufen.',
        learnContent: {
          videoTitle: 'Abschluss-Gala: Die feierliche Aufnahme in die GOM-MAR Hall of Fame',
          videoDuration: '30:00',
          summaryText: 'Von Lektion 1.1 bis Lektion 99.2 hast du hunderte Stunden hochkonzentriertes Praxiswissen verinnerlicht. Du gehörst nun zur absoluten Welt-Elite der Unternehmer, Strategen und Systembauer.',
          bulletPoints: [
            'Das GOM-MAR Grandmaster Zertifikat: Auszeichnung mit verifizierter ID und On-Chain Verankerung',
            'Lebenslanger Zugang zum Hall-of-Fame Beirat: Exklusiver Kreis der Absolventen aller 99 Module',
            'Mentoring & Weitergabe: Wie du dein Wissen nutzt, um die nächste Generation von Gründern zu fördern',
            'Der Beginn deiner wahren Reise: Wissen ist nur Potenzial – die Exekution in der echten Welt ist dein Meisterwerk'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'GRANDMASTER CERTIFICATE',
              description: 'Das höchste und umfassendste Ausbildungs-Diplom im modernen Unternehmertum.',
              highlight: true
            },
            {
              iconName: 'users',
              title: 'HALL OF FAME CIRCLE',
              description: 'Lebenslange Mitgliedschaft im globalen Beiratskreis der 99er Absolventen.'
            }
          ],
          resources: [
            {
              title: 'Offizielles GOM-MAR Grandmaster Diplom (PDF & Urkunde)',
              subtitle: 'Druckfähige Urkunde mit Signatur und Siegellack-Prägung',
              type: 'pdf',
              iconName: 'award',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Hall of Fame Lifetime Dashboard',
              subtitle: 'Dauerhafter unbegrenzter Zugang zu allen Tools, CRM & KI-Engines',
              type: 'tool',
              iconName: 'star',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Herzlichen Glückwunsch, Grandmaster!

Du hast etwas vollbracht, was weniger als 0,01% aller Unternehmer jemals erreichen: Die lückenlose Beherrschung aller 99 Disziplinen des Geschäftslebens.

#### Dein ewiger Werkzeugkasten:
- **Mara CRM & KI-Engines**: Deine digitale Schaltzentrale für alle Lebens- und Unternehmenslagen.
- **Die GOM-MAR Community**: Ein unzerbrechliches Netzwerk gleichgesinnter Titanen.
- **Dein Geist**: Geschärft durch 99 Module kompromissloser Exzellenz.

*Gehe hinaus, baue Großes und präge die Welt zum Besseren.*`
        },
        understandContent: {
          coreTakeaway: 'Du bist nun bereit für jede Herausforderung des globalen Marktes. Herzlichen Glückwunsch zum Abschluss von Modul 99!',
          keyPrinciples: [
            'Bleibe immer wissbegierig, diszipliniert und prinzipientreu',
            'Nutze deine unternehmerische Macht stets zum Guten und zur Erschaffung von echtem Wert'
          ]
        },
        actionTask: {
          instruction: 'Feiere deinen Abschluss und aktiviere deinen Grandmaster Status:',
          inputType: 'checklist',
          checklistItems: [
            'Offizielles Grandmaster Diplom heruntergeladen und gerahmt',
            'Profil in der GOM-MAR Hall of Fame verewigt',
            'Vollständige Freischaltung aller 99 Module im Hauptmenü gefeiert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  }
];

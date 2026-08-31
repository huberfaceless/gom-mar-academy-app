import { Stage } from '../types';

export const MODULES_86_TO_95: Stage[] = [
  {
    id: 86,
    title: '86. Sovereign Cloud & On-Premises LLM Deployments',
    subtitle: 'VLLM, Ollama Enterprise, Air-Gapped KI-Cluster & DSGVO-Datensouveränität',
    color: 'from-slate-700 via-blue-900 to-zinc-950',
    badgeIcon: '💽',
    description: 'Plane kontrollierte On-Premises- oder souveräne LLM-Deployments für sensible Umgebungen. Prüfe Modelllizenzen, Datenschutzrollen, Rechtsgrundlage, Sicherheit, Betrieb und Datenflüsse; lokale Verarbeitung garantiert keine DSGVO-Konformität.',
    lessons: [
      {
        id: '86.1',
        stageId: 86,
        stageTitle: '86. On-Premises LLM Serving & VLLM',
        title: 'Air-Gapped LLM Serving: VLLM, Tensor-Parallelismus & Quantisierung (AWQ/GPTQ)',
        durationMinutes: 35,
        description: 'Wie du Modelle anhand realer Workloads benchmarkst, Hardware und Quantisierung auswählst sowie Latenz, Durchsatz, Qualität, Verfügbarkeit und Kosten abwägst.',
        learnContent: {
          videoTitle: 'Masterclass: On-Premises LLM Serving & Hardware-Dimensionierung',
          videoDuration: '35:20',
          summaryText: 'Regulierte Organisationen müssen Cloud-Nutzung und internationale Datentransfers fallbezogen prüfen. On-Premises kann Kontrolle erhöhen, erfordert aber weiterhin Datenschutz-, Sicherheits-, Beschaffungs- und Betriebsnachweise; Vertragswerte sind nicht garantiert.',
          bulletPoints: [
            'PagedAttention & Continuous Batching: Speicherverwaltung und Durchsatz anhand der verwendeten vLLM-Version und Workload benchmarken',
            'Quantisierung (z. B. AWQ/GPTQ): Kompatibilität, Speicherbedarf, Ausführungsunterstützung und Qualitätsverlust je Modell und Hardware messen',
            'Tensor-Parallelismus: Modellgewichte über mehrere GPUs hinweg parallel ausführen',
            'Air-Gapped Betrieb: Datenwege, Updates, Lieferkette, Wechseldatenträger und Wartungszugänge kontrollieren; Isolation schließt Datenabfluss nicht vollständig aus'
          ],
          coreConcepts: [
            {
              iconName: 'server',
              title: 'PAGED ATTENTION',
              description: 'Drastische Reduzierung der Speicherfragmentierung für maximale parallele Anfragen.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'AIR-GAPPED SOVEREIGNTY',
              description: 'Lokales Deployment kann externe API-Abhängigkeit reduzieren; Datenabfluss bleibt über Betrieb, Benutzer, Lieferkette und Schnittstellen möglich.'
            }
          ],
          resources: [
            {
              title: 'On-Premises LLM Hardware & Deployment Whitepaper',
              subtitle: 'GPU-Dimensionierung, VLLM Docker-Compose & Benchmarks als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Local Inference Gateway',
              subtitle: 'CRM an lokale On-Premises LLM Server anbinden',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur europäischer KI-Souveränität

Datenschutz und Unabhängigkeit sind für Banken und den Mittelstand die wichtigsten Kaufkriterien.

#### Der 4-Stufen Hardware-Stack für On-Premises KI:
1. **Server-Dimensionierung**: Dual-Socket AMD EPYC CPUs mit 512GB ECC RAM.
2. **GPU-Cluster**: 4x bis 8x NVIDIA H100/L40S oder Dual RTX 4090 für KMU-Setups.
3. **Serving-Layer**: VLLM Container mit PagedAttention und OpenAI-kompatibler REST-API.
4. **Monitoring & Tracing**: Prometheus & Grafana für GPU-Temperatur, VRAM und Token-Throughput.`
        },
        understandContent: {
          coreTakeaway: 'On-Premises-Kompetenz kann ein Differenzierungsmerkmal sein, schafft aber weder ein Monopol noch garantierte Aufträge.',
          keyPrinciples: [
            'Niemals unberechtigte Modellgewichte ohne Lizenzprüfung für kommerzielle Zwecke einsetzen',
            'Verfügbarkeitsziele definieren und Redundanz, Ersatzteile, Failover sowie Wiederanlauf regelmäßig testen'
          ]
        },
        actionTask: {
          instruction: 'Dimensioniere dein lokales KI-Cluster:',
          inputType: 'checklist',
          checklistItems: [
            'Hardware-Kalkulation (GPU, VRAM, Throughput) für 50 gleichzeitige Nutzer erstellt',
            'Docker-Compose Konfiguration mit VLLM und PagedAttention hinterlegt',
            'OpenAI-kompatible Schnittstelle im Mara CRM erfolgreich getestet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '86.2',
        stageId: 86,
        stageTitle: '86. Enterprise RAG & Vektordatenbanken On-Prem',
        title: 'Sovereign Enterprise RAG: Qdrant, Milvus & Hybrid-Search mit Reranking',
        durationMinutes: 32,
        description: 'Wie du Millionen vertraulicher Dokumente (PDFs, Verträge, E-Mails) lokal indexierst und mit BM25 + Vektor-Hybridsuche sekundenschnell abrufst.',
        learnContent: {
          videoTitle: 'Masterclass: Lokale Vektordatenbanken & Enterprise RAG',
          videoDuration: '32:40',
          summaryText: 'Lokales RAG kann freigegebenes Unternehmenswissen nutzbar machen. Lerne Retrieval, Chunking, Metadaten, Berechtigungen, Reranking und Evaluation; Reranker reduzieren Fehlabrufe, eliminieren Halluzinationen aber nicht.',
          bulletPoints: [
            'Lokale Embedding-Modelle: BGE-M3 und E5-Mistral lokal auf GPU ohne OpenAI-API berechnen',
            'Hybrid-Search: Kombination aus dichter Vektorsuche (Dense) und exakter Stichwortsuche (BM25)',
            'Cross-Encoder Reranking: Kandidatenzahl, Modell, Hardware, Latenz und Qualitätsgewinn mit repräsentativen Anfragen messen',
            'Access-Control-List (ACL) RAG: Dokumenten-Rechte des Nutzers direkt im Vektor-Filter berücksichtigen'
          ],
          coreConcepts: [
            {
              iconName: 'database',
              title: 'HYBRID RETRIEVAL',
              description: 'Exakte Treffer durch Verschmelzung semantischer und stichwortbasierter Suche.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'ACL VECTOR FILTERING',
              description: 'Berechtigungsfilter müssen vor Retrieval und bei Zitaten konsistent durchgesetzt, getestet und überwacht werden.'
            }
          ],
          resources: [
            {
              title: 'Enterprise Sovereign RAG Architecture Blueprint',
              subtitle: 'Chunking-Strategien & Qdrant Konfiguration als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Sovereign Knowledge Vault',
              subtitle: 'Interne Wissensdatenbanken lokal indexieren und durchsuchen',
              type: 'tool',
              iconName: 'database',
              actionUrl: 'content'
            }
          ],
          fullArticleGuide: `### Enterprise Knowledge Intelligence

Lokal gehostetes RAG kann eine kontrollierte Schnittstelle zwischen freigegebenem Firmenwissen und Sprachmodell bilden.

#### Eine evaluierbare RAG-Pipeline:
- **Semantisches Chunking**: Dokumente nach Überschriften und Absätzen trennen, nicht starr nach Zeichenanzahl.
- **Vektor-Index**: HNSW-Parameter, Filter und Latenz mit realem Datenvolumen benchmarken.
- **Reranker-Modell**: Modellwahl anhand domänenspezifischer Relevanz, Latenz und Ressourcen testen.`
        },
        understandContent: {
          coreTakeaway: 'Hybride Suche mit Reranking kann die Retrieval-Qualität verbessern; der Nutzen muss mit domänenspezifischen Datensätzen gemessen werden.',
          keyPrinciples: [
            'Niemals Dokumente ohne Metadaten (Autor, Erstellungsdatum, Berechtigungsgruppe) indexieren',
            'Antworten immer mit direkten Quellenangaben und Seitenzahlen im Zitat versehen'
          ]
        },
        actionTask: {
          instruction: 'Richte deine On-Premises RAG-Pipeline ein:',
          inputType: 'checklist',
          checklistItems: [
            'Lokaler Vektor-Cluster (Qdrant oder Milvus) konfiguriert',
            'Chunking- und Embedding-Pipeline mit BGE-M3 aufgesetzt',
            'Quellenverweis-Zitierung im Mara Knowledge Vault aktiviert'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  {
    id: 87,
    title: '87. Global Cross-Border E-Commerce, Customs & IOSS',
    subtitle: 'Zollabwicklung, IOSS (EU), US-Sales-Tax (Nexus), Lokalisierte Währungen & Retouren-Hubs',
    color: 'from-amber-600 via-orange-600 to-zinc-900',
    badgeIcon: '🚢',
    description: 'Skaliere deinen physischen Handel weltweit: Meistere das Import-One-Stop-Shop (IOSS) System der EU, US Economic Nexus Steuergesetze, zollfreie Zolllager (Bonded Warehouses) und globale Retouren-Konsolidierung.',
    lessons: [
      {
        id: '87.1',
        stageId: 87,
        stageTitle: '87. EU-IOSS & Globale Zollabwicklung',
        title: 'Cross-Border Zoll-Architektur: IOSS, HS-Code Klassifizierung & DDP Versand',
        durationMinutes: 33,
        description: 'Wie IOSS die Umsatzsteuer für geeignete Fernverkäufe bis 150 € vereinfacht, wie du Waren korrekt klassifizierst und aktuelle Zollabgaben sowie Zuständigkeiten transparent behandelst.',
        learnContent: {
          videoTitle: 'Masterclass: Cross-Border E-Commerce, IOSS & DDP Logistik',
          videoDuration: '33:30',
          summaryText: 'Wenn der Kunde an der Haustür Nachzoll und Bearbeitungsgebühren zahlen muss, explodieren deine Retouren und Stornos. Erfahre, wie du mit IOSS und DDP (Delivered Duty Paid) weltweiten Versand so reibungslos wie Inlandsbestellungen gestaltest.',
          bulletPoints: [
            'IOSS: Monatliche Erklärung über den Mitgliedstaat der Identifizierung für geeignete importierte B2C-Sendungen bis 150 €; seit 1. Juli 2026 gilt zusätzlich die vorübergehende EU-Abgabe von 3 € je Artikel',
            'DDP vs. DAP/DPU: Kosten, Importeur-Rolle, Registrierung, Risiko und Eignung je Route und Geschäftsmodell prüfen',
            'HS-Code Zolltarifierung: Die 6- bis 11-stellige Warennummer zur exakten Ermittlung von Zollsätzen',
            'Präferenzursprung und Freihandelsabkommen: Nur bei erfüllten Ursprungsregeln und gültigem Nachweis können niedrigere Zollsätze gelten'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'IOSS COMPLIANCE',
              description: 'Vereinfachte Erklärung und Zahlung der Einfuhrumsatzsteuer für geeignete Sendungen; Zollkontrollen und Verzögerungen bleiben möglich.',
              highlight: true
            },
            {
              iconName: 'truck',
              title: 'DDP SHIPPING',
              description: 'DDP kann Importabgaben in den Verkäuferpreis einbeziehen, wenn Rollen, Registrierung, Brokerdaten und tatsächliche Kosten korrekt umgesetzt sind.'
            }
          ],
          resources: [
            {
              title: 'Global Customs & IOSS Registration Master-Guide',
              subtitle: 'HS-Code Verzeichnis & DDP Versand-SOP als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Cross-Border Tax Engine',
              subtitle: 'Automatisierte Mehrwertsteuer- und Zollberechnung im Checkout',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Der Schlüssel zum weltweiten E-Commerce Erfolg

Ein transparenter internationaler Checkout kann Kaufabbrüche und Überraschungen reduzieren; Reichweite und Umsatz bleiben markt- und umsetzungsabhängig.

#### Der 3-Schritte Cross-Border Standard:
1. **Automatisierte HS-Code Zuweisung**: Jedes Produkt im Katalog erhält die exakte Zolltarifnummer.
2. **Landed-Cost-Schätzung**: Zoll, Einfuhrumsatzsteuer, vorübergehende Abgaben, Fracht und Gebühren mit Versionierung und Abweichungsregeln berechnen.
3. **Elektronische Vorab-Zolldaten**: Digitale Übermittlung der CN22/CN23 Zolldeklaration an die Fluggesellschaft.`
        },
        understandContent: {
          coreTakeaway: 'Transparente Gesamtkosten können unerwartete Gebühren und vermeidbare Retouren reduzieren; die Wirkung muss mit eigenen Daten gemessen werden.',
          keyPrinciples: [
            'Niemals falsche Warenwerte deklarieren – Zollprüfungen führen zu empfindlichen Strafen und Kontensperrungen',
            'IOSS-Nummer vertraulich über das vorgesehene elektronische Zollverfahren übermitteln und nicht offen auf Paket oder Rechnung drucken'
          ]
        },
        actionTask: {
          instruction: 'Richte deine grenzüberschreitende Versandkonfiguration ein:',
          inputType: 'checklist',
          checklistItems: [
            'IOSS-Nummer im zentralen Versandsystem registriert',
            'HS-Codes für alle Kernprodukte im Sortiment hinterlegt',
            'DDP Versand-Integration im Checkout aktiviert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '87.2',
        stageId: 87,
        stageTitle: '87. US Economic Nexus & Global Returns',
        title: 'US Sales Tax (Economic Nexus) & Lokale Retouren-Konsolidierung',
        durationMinutes: 31,
        description: 'Wie der US Supreme Court Fall Wayfair die US-Steuerpflicht regelt und wie du Retouren über lokale 3PL-Hubs in den USA, UK und Asien bündelst.',
        learnContent: {
          videoTitle: 'Masterclass: US-Sales-Tax & Internationale Retouren-Logistik',
          videoDuration: '31:45',
          summaryText: 'Wer in die USA verkauft, muss ab gewissen Umsatzschwellen (Economic Nexus) in einzelnen Bundesstaaten Sales Tax abführen. Lerne, wie du Nexus-Schwellen mit Anvalara/TaxJar überwachst und teure Rücksendungen nach Übersee vermeidest.',
          bulletPoints: [
            'Economic Nexus: Definition, Schwelle, Zeitraum, einbezogene Umsätze und Registrierungsfrist je Bundesstaat aktuell prüfen; viele Staaten haben Transaktionsschwellen geändert oder entfernt',
            'Automatisierte Tax-Berechnung: Postleitzahlen-genaue Berechnung von State-, County- und City-Steuern',
            'Lokale Retouren-Hubs: US-Kunden senden Retouren an ein lokales Lager in den USA, wo Waren geprüft und wiederverkauft werden',
            'Duty Drawback: mögliche Erstattung bestimmter Abgaben bei qualifizierenden Ausfuhren oder Vernichtungen mit strengen Nachweis- und Verfahrensregeln'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'ECONOMIC NEXUS',
              description: 'Automatisierte Hinweise unterstützen die Überwachung; Registrierung, Steuerbarkeit, Marketplace-Regeln und Fristen müssen fachlich geprüft werden.',
              highlight: true
            },
            {
              iconName: 'repeat',
              title: 'LOCAL RETURNS HUB',
              description: 'Vermeidung teurer Rückflüge durch lokale Aufbereitung und Wiederverkauf.'
            }
          ],
          resources: [
            {
              title: 'US Sales Tax Nexus State-by-State Übersicht',
              subtitle: 'Schwellenwerte & Registrierungsfristen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Global Returns Portal',
              subtitle: 'Kundenfreundliche Rücksende-Etiketten für 40+ Länder generieren',
              type: 'tool',
              iconName: 'truck',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Skalierung im US-amerikanischen Markt

Der US-Markt umfasst zahlreiche staatliche und lokale Sales-Tax-Regeln; Pflichten hängen von Nexus, Produkten, Käufern, Marktplätzen und Bundesstaat ab.

#### Die Retouren-Optimierung:
- **Keine Rücksendung nach Europa**: Das Porto übersteigt oft den Warenwert.
- **Lokale B-Ware Auktion**: Leicht beschädigte Artikel über lokale Liquidationskanäle in den USA verwerten.`
        },
        understandContent: {
          coreTakeaway: 'Sales-Tax-Automatisierung kann Berechnung und Meldung unterstützen, beseitigt aber keine Registrierungs-, Daten-, Steuerbarkeits- oder Prüfungsrisiken.',
          keyPrinciples: [
            'Vor dem ersten steuerpflichtigen Verkauf nach Eintritt einer Pflicht Registrierungszeitpunkt, Collecting-Regeln und Marketplace-Facilitator-Anrechnung je Staat klären',
            'Lokales Fulfillment nach Kosten, Servicegebiet, Bestandsrisiko, Produktregeln, Nexus-Folgen und gemessenen Lieferzeiten bewerten'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deine US-Nexus-Überwachung:',
          inputType: 'checklist',
          checklistItems: [
            'Umsatzüberwachung nach US-Bundesstaaten im CRM aktiviert',
            'Schnittstelle zu automatisiertem Tax-Provider (TaxJar/Avalara) eingerichtet',
            'Lokale Retourenadresse für US- und UK-Kunden hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 88,
    title: '88. Corporate Governance, Beiräte & Aufsichtsräte',
    subtitle: 'Advisory Boards, Aufsichtsratsvergütung, Organhaftung (D&O Versicherung) & ESG Reporting',
    color: 'from-slate-800 via-zinc-800 to-stone-900',
    badgeIcon: '⚖️',
    description: 'Entwickle eine zur Rechtsform und Unternehmensgröße passende Governance. Kläre Beirats- und Organrollen, Entscheidungsprozesse, D&O-Deckung sowie aktuelle gesetzliche oder freiwillige Nachhaltigkeitsberichterstattung.',
    lessons: [
      {
        id: '88.1',
        stageId: 88,
        stageTitle: '88. Beiratsaufbau & Organhaftung',
        title: 'Der Strategische Beirat (Advisory Board): Top-Entscheider als Sparringspartner',
        durationMinutes: 32,
        description: 'Wie du qualifizierte und unabhängige Beiratsmitglieder auswählst, Interessenkonflikte und Vergütung regelst sowie D&O-Bedarf, Deckung und Ausschlüsse prüfst.',
        learnContent: {
          videoTitle: 'Masterclass: Strategischer Beirat, Organhaftung & Governance',
          videoDuration: '32:30',
          summaryText: 'Ein geeigneter Beirat kann Entscheidungen verbessern, schafft aber weder automatisch Glaubwürdigkeit noch Aufträge. Lerne Mandat, Auswahl, Unabhängigkeit, Vergütung, Vertraulichkeit und Versicherungsschutz sorgfältig zu gestalten.',
          bulletPoints: [
            'Der Beiratsvertrag: Beratungsbeirat vs. Kontrollbeirat – warum Startups mit unverbindlichen Beratungsbeiräten starten',
            'Vergütungsstrukturen: Marktvergleich, Zeitaufwand, Verantwortung, Unabhängigkeit, Steuer- und Gesellschaftsrecht sowie Vesting fallbezogen prüfen',
            'D&O-Versicherung: Claims-made-Prinzip, versicherte Personen, Deckung, Selbstbehalt, Ausschlüsse, Nachmeldefrist und Interessenkonflikte prüfen',
            'Business Judgment Rule: Anwendbarkeit nach Rechtsform und Jurisdiktion prüfen; Entscheidung auf angemessener Informationsgrundlage und zum Unternehmenswohl dokumentieren'
          ],
          coreConcepts: [
            {
              iconName: 'users',
              title: 'ADVISORY GRAVITY',
              description: 'Beiräte können Expertise und Kontrolle stärken; Wirkung hängt von Mandat, Unabhängigkeit, Qualität und tatsächlicher Arbeit ab.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'D&O ASSET SHIELD',
              description: 'D&O kann bestimmte Ansprüche decken, enthält aber Grenzen, Ausschlüsse, Selbstbehalte und Deckungsrisiken.'
            }
          ],
          resources: [
            {
              title: 'Beiratsvertrag & D&O Haftungs-Checkliste',
              subtitle: 'Musterverträge und Geschäftsordnungen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Boardroom Portal',
              subtitle: 'Sitzungsprotokolle, Beschlussvorlagen und Kennzahlen-Dashboards für Beiräte',
              type: 'tool',
              iconName: 'file-text',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Professionelle Unternehmensführung für Wachstumsunternehmen

Corporate Governance ist kein bürokratischer Selbstzweck, sondern der beste Schutz vor strategischer Betriebsblindheit.

#### Die 4 Quartalssitzungen des Beirats:
1. **Q1 (Audit & Review)**: Jahresabschluss und Strategieüberprüfung.
2. **Q2 (Wachstum & M&A)**: Akquisitionsziele und neue Produktlinien.
3. **Q3 (Budgetierung)**: Finanzplanung und Personalressourcen für das Folgejahr.
4. **Q4 (Vergütung & Governance)**: Zielerreichung der Geschäftsführung und Boni-Freigabe.`
        },
        understandContent: {
          coreTakeaway: 'Der Nutzen eines Beirats muss an klaren Zielen, Beiträgen, Entscheidungen und Kosten regelmäßig bewertet werden.',
          keyPrinciples: [
            'Immer eine klare Geschäftsordnung für den Beirat verfassen, um Kompetenzstreitigkeiten zu verhindern',
            'Wesentliche Entscheidungen mit Zuständigkeit, Interessen, Informationen, Alternativen, Risiken und Unternehmenswohl angemessen dokumentieren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deinen Unternehmens-Beirat:',
          inputType: 'checklist',
          checklistItems: [
            'Geschäftsordnung für den strategischen Beirat verfasst',
            'D&O Versicherungspolice mit adäquater Deckungssumme abgeschlossen',
            'Quartals-Reporting-Template für Beiratsmitglieder im Mara CRM erstellt'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '88.2',
        stageId: 88,
        stageTitle: '88. ESG Reporting & CSRD Compliance',
        title: 'ESG & CSRD Nachhaltigkeitsberichterstattung: Vorgaben für den Mittelstand',
        durationMinutes: 30,
        description: 'Wie du prüfst, ob und wann CSRD/ESRS gelten, freiwillige Standards nutzt, Treibhausgasdaten kontrolliert erhebst und Kundenanforderungen ohne Greenwashing beantwortest.',
        learnContent: {
          videoTitle: 'Masterclass: ESG-Compliance & CSRD Berichterstattung',
          videoDuration: '30:45',
          summaryText: 'Es gibt kein allgemeines Gesetz, das Großkonzernen jede Zusammenarbeit ohne ESG-Offenlegung verbietet. Berichtspflichten und Lieferkettenanfragen hängen von aktueller Regulierung, Vertrag, Branche und Wesentlichkeit ab.',
          bulletPoints: [
            'CSRD/ESRS: aktuellen Anwendungsbereich, Übergangsregeln und doppelte Wesentlichkeit zum jeweiligen Berichtsjahr prüfen',
            'Scope 1, 2 und 3 Emissionen: Direkte Emissionen, Energiebezug und Lieferketten-Emissionen bilanzieren',
            'Externe ESG-Ratings: Methodik, Nachweise, Gültigkeitszeitraum, Vergleichbarkeit und kommerzielle Interessen prüfen',
            'Greenwashing-Vermeidung: geltendes Verbraucher-, Wettbewerbs- und sektorspezifisches Recht prüfen; Gesetzesvorschläge nicht als geltendes Recht darstellen'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'ECOVADIS GOLD',
              description: 'Ratings können Beschaffung unterstützen, garantieren aber weder Qualifikation noch Auftrag.',
              highlight: true
            },
            {
              iconName: 'file-text',
              title: 'DOUBLE MATERIALITY',
              description: 'Ganzheitliche Prüfung der Umweltauswirkungen und finanziellen Klimarisiken.'
            }
          ],
          resources: [
            {
              title: 'CSRD Mittelstands-Leitfaden & Scope 1-3 Rechner',
              subtitle: 'Excel-Template für Treibhausgasbilanzen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR ESG Sustainability Dashboard',
              subtitle: 'Nachhaltigkeitskennzahlen und Diversitäts-Reports exportieren',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Nachhaltigkeit als härtester Wettbewerbsvorteil

Belastbare Nachhaltigkeitsdaten können Kundenanfragen unterstützen, garantieren aber keinen Wettbewerbsvorteil oder Lieferantenstatus.

#### Die 3 Säulen des ESG-Dashboards:
- **Environmental**: Strom aus erneuerbaren Energien, Reduzierung von Verpackungsmüll.
- **Social**: Faire Bezahlung, Mitarbeitergesundheit und Weiterbildungsbudgets.
- **Governance**: Whistleblower-System, Antikorruptionsrichtlinien und transparente Eigentümerstrukturen.`
        },
        understandContent: {
          coreTakeaway: 'ESG-Daten können Teil der Lieferantenprüfung sein; langfristige Verträge hängen von vielen Leistungs-, Risiko- und Einkaufsfaktoren ab.',
          keyPrinciples: [
            'Niemals mit ungeprüften "Klimaneutral"-Aussagen werben – Green Claims erfordern wissenschaftliche Nachweise',
            'Ein digitales Hinweisgebersystem (Whistleblower Protection) gesetzeskonform einrichten'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen ersten ESG-Nachhaltigkeitsbericht:',
          inputType: 'checklist',
          checklistItems: [
            'Scope 1 und Scope 2 CO2-Emissionen für das abgelaufene Geschäftsjahr berechnet',
            'Hinweisgebersystem (Whistleblower Tool) im Unternehmen implementiert',
            'ESG-Lieferantenerklärung für Großkunden im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 89,
    title: '89. Globale Public Relations, Diplomatie & Regierungsbeziehungen',
    subtitle: 'Public Affairs, Lobbying-Transparenzregister, Botschaftsempfänge & Geopolitische Positionierung',
    color: 'from-indigo-950 via-slate-900 to-black',
    badgeIcon: '🌐',
    description: 'Vertrete Unternehmensinteressen transparent und evidenzbasiert. Prüfe Register- und Offenlegungspflichten, dokumentiere Kontakte und Beiträge und nutze Außenwirtschaftsangebote ohne privilegierten Zugang oder Einfluss zu behaupten.',
    lessons: [
      {
        id: '89.1',
        stageId: 89,
        stageTitle: '89. Public Affairs & Transparenzregister',
        title: 'Public Affairs: Wie Unternehmen Gesetze und Regulierungen aktiv mitgestalten',
        durationMinutes: 34,
        description: 'Wie parlamentarische Anhörungen funktionieren, wie du Positionspapiere schreibst und rechtssicher im Lobbyregister eingetragen bist.',
        learnContent: {
          videoTitle: 'Masterclass: Public Affairs, Politikberatung & Gesetzgebungsprozesse',
          videoDuration: '34:15',
          summaryText: 'Legitime Interessenvertretung kann Fachwissen in Konsultationen einbringen. Lerne Prozesse früh zu beobachten, Quellen und Interessen offenzulegen und Kontakte nach geltendem Register-, Integritäts-, Antikorruptions- und Datenschutzrecht zu führen.',
          bulletPoints: [
            'Das Gesetzgebungsverfahren: Referentenentwurf, Kabinettsbeschluss, 1./2./3. Lesung im Bundestag',
            'Lobbyregister: Anwendungsbereich, Ausnahmen, Eintragung, Auftraggeber, Regelungsvorhaben, Stellungnahmen, finanzielle Angaben und Aktualisierungspflichten prüfen',
            'Das Positionspapier (Policy Brief): 2-seitige Entscheidungsvorlage für Politiker mit konkreten Formulierungsvorschlägen',
            'Verbände & Wirtschaftsräte: Wie du Arbeitskreise in BDI, Bitkom oder Handelskammern leitest'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'POLICY BRIEFING',
              description: 'Prägnante Entscheidungshilfen für Abgeordnete und Ministerialbeamte.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'LOBBY REGISTER COMPLIANCE',
              description: 'Transparenz reduziert Risiken, garantiert aber weder Compliance noch Schutz vor Reputationsschäden.'
            }
          ],
          resources: [
            {
              title: 'Public Affairs Leitfaden & Policy Brief Template',
              subtitle: 'Formulierungshilfen für parlamentarische Eingaben als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Stakeholder & Policy Map',
              subtitle: 'Politische Entscheidungsträger, Ausschüsse und Kontakte verwalten',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Praxis strategischer Regierungsbeziehungen

Unternehmen und Verbände können nachvollziehbare Daten und Positionen in offene demokratische Verfahren einbringen.

#### Die Phasen verantwortungsvoller Interessenvertretung:
1. **Frühwarnsystem**: Gesetzesinitiativen auf EU- und Bundesebene bereits in der Konsultationsphase monitoren.
2. **Allianzen bilden**: Mit anderen Marktführern und Verbänden gemeinsame Stellungnahmen verfassen.
3. **Parlamentarischer Abend**: Diskussionsrunde im politischen Berlin oder Brüssel ausrichten.`
        },
        understandContent: {
          coreTakeaway: 'Politische Entscheidungsträger berücksichtigen unterschiedliche gesellschaftliche Perspektiven; Unternehmensangaben müssen überprüfbar und als Interessenposition erkennbar sein.',
          keyPrinciples: [
            'Niemals parteipolitisch einseitig agieren – gute Kontakte zu allen demokratischen Fraktionen pflegen',
            'Stets die Verhaltensregeln des Bundestages und Transparenzgesetze peinlich genau einhalten'
          ]
        },
        actionTask: {
          instruction: 'Erstelle dein erstes politisches Positionspapier:',
          inputType: 'checklist',
          checklistItems: [
            '2-seitiges Positionspapier zu einem aktuellen Regulierungsthema deiner Branche verfasst',
            'Eintragung im Transparenzregister/Lobbyregister geprüft oder vorgenommen',
            'Stakeholder-Mapping der relevanten Ausschussmitglieder im Mara CRM angelegt'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '89.2',
        stageId: 89,
        stageTitle: '89. Diplomatische Delegationen & Botschaften',
        title: 'Wirtschaftsdiplomatie: Auslandsreisen mit Wirtschaftsdelegationen & Botschaften',
        durationMinutes: 31,
        description: 'Wie du Eignung und Bedingungen offizieller Delegationen prüfst, Außenwirtschaftskontakte verantwortungsvoll nutzt und Chancen ohne Auftragsgarantie bewertest.',
        learnContent: {
          videoTitle: 'Masterclass: Wirtschaftsdiplomatie & Internationale Delegationsreisen',
          videoDuration: '31:50',
          summaryText: 'Delegationsreisen können Marktzugang und Gespräche erleichtern, schaffen aber keinen Anspruch auf politische Kontakte, staatliche Unterstützung oder Aufträge. Lerne Auswahl, Protokoll, Compliance und Nachbereitung.',
          bulletPoints: [
            'Delegationsreisen des Bundesministeriums (BMDV / BMWK): Bewerbungsprozess und Kriterien für Unternehmer',
            'Die Rolle der Auslandshandelskammern (AHK): Weltweites B2B-Matchmaking in 140+ Standorten',
            'Diplomatisches Protokoll: Sitzordnungen, Geschenk-Etikette und formale Anrede bei Botschaftern',
            'Investitionsschutz: Anwendbarkeit, geschützte Investition, Ausnahmen, Verfahren und Durchsetzbarkeit mit Spezialisten prüfen'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'MINISTERIAL DELEGATION',
              description: 'Offizielle Reiseformate mit festgelegten Teilnahmebedingungen; Unternehmen bleiben für Sorgfalt, Sicherheit, Compliance und Verträge verantwortlich.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'DIPLOMATIC PROTOCOL',
              description: 'Souveränes Auftreten auf internationalem diplomatischen Parkett.'
            }
          ],
          resources: [
            {
              title: 'Wirtschaftsdiplomatie & Delegationsreisen Leitfaden',
              subtitle: 'AHK-Kontakte & Protokoll-Handbuch als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR International Trade Directory',
              subtitle: 'Botschaftskontakte und bilaterale Handelskammern verwalten',
              type: 'tool',
              iconName: 'globe',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Der Hebel staatlicher Außenwirtschaftsförderung

Nutze Außenwirtschaftsangebote zur Information und Kontaktanbahnung, ohne Risiken oder staatliche Absicherung zu unterstellen.

#### Die Vorbereitung einer Delegationsreise:
- **AHK-Erstbriefing**: Marktanalyse und individuelle B2B-Gesprächstermine vor Ort vereinbaren.
- **Letter of Intent (LOI)**: Vorbereitung von Kooperationsverträgen, die feierlich im Beisein des Ministers unterzeichnet werden.`
        },
        understandContent: {
          coreTakeaway: 'Offizielle Formate können Sichtbarkeit schaffen; Vertrauen entsteht durch Eignung, Integrität, Leistung und lokale Sorgfalt.',
          keyPrinciples: [
            'Kulturelle Besonderheiten und Gastgeschenke des Ziellandes vorab mit der Botschaft abstimmen',
            'Nachbereitung der Kontakte innerhalb von 5 Werktagen mit persönlichem Dankschreiben durchführen'
          ]
        },
        actionTask: {
          instruction: 'Bereite deine Bewerbung für eine Auslandshandels-Delegation vor:',
          inputType: 'checklist',
          checklistItems: [
            'Unternehmensprofil auf Englisch nach AHK-Standard aufbereitet',
            'Bewerbung für eine ministerielle Delegationsreise eingereicht',
            'Kontakt zu den Handelsreferenten der Zielbotschaft im CRM erfasst'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 90,
    title: '90. Die Quantum-Leap Holding & Das 100M€ Vermächtnis',
    subtitle: 'Konzernarchitektur, Asset-Immunität, Ewige Dynastien & Das 100-Millionen-Euro Lebenswerk',
    color: 'from-amber-400 via-yellow-500 to-amber-700',
    badgeIcon: '👑',
    description: 'Prüfe, ob eine Holding-, Gruppen- oder Nachfolgestruktur zu Strategie, Rechtsform, Steuerlage, Finanzierung und Familie passt. Keine Struktur ist unzerstörbar, vollständig automatisiert oder garantiert ein bestimmtes Vermögen.',
    lessons: [
      {
        id: '90.1',
        stageId: 90,
        stageTitle: '90. Die Holding-Schaltzentrale',
        title: 'Die Master-Holding: Zentrales Treasury, Intercompany-Finanzierung & Asset-Schutz',
        durationMinutes: 36,
        description: 'Wie Beteiligungserträge, Veräußerungsgewinne, Ausschüttungen, Cash-Pooling und Intercompany-Finanzierung rechtlich, steuerlich und wirtschaftlich geprüft werden.',
        learnContent: {
          videoTitle: 'Masterclass: Die Holding-Schaltzentrale & Konzern-Finanzströme',
          videoDuration: '36:30',
          summaryText: 'Eine Holding kann Kapitalallokation und Risikotrennung unterstützen, erzeugt aber Kosten, Pflichten und neue Risiken. Die Steuerwirkung von § 8b KStG hängt unter anderem von Ertragsart, Beteiligung, Ausnahmen und Gewerbesteuer ab und ist nicht pauschal 1,5 %.',
          bulletPoints: [
            '§ 8b KStG: unterschiedliche Regeln für Bezüge und Veräußerungsgewinne, 5-%-Hinzurechnung sowie Beteiligungs-, Gewerbesteuer- und Sonderausnahmen prüfen',
            'Zentrales Cash-Pooling: Wie die Muttergesellschaft Liquidität intern an schwächere Töchter verleiht',
            'IP- und Lizenzgesellschaft: wirtschaftliche Substanz, Fremdvergleich, Verrechnungspreise, Rechtekette, Insolvenz- und Steuerfolgen prüfen',
            'Rollenentkopplung: Governance, Delegation, Kontrollen und Notfallvertretung schrittweise aufbauen'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: 'HOLDCO CAPITAL HUB',
              description: 'Reinvestition auf Gesellschaftsebene kann private Besteuerung aufschieben; Körperschaft-, Gewerbe-, Kapitalertrag- und weitere Steuern bleiben fallabhängig.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'LIABILITY FIREWALL',
              description: 'Rechtstrennung kann Risiken begrenzen, aber Garantien, Cash-Pooling, Beherrschung, Pflichtverletzungen, Anfechtung und Insolvenz können Verbindungen schaffen.'
            }
          ],
          resources: [
            {
              title: 'Master-Holding Gesellschaftsvertrag & Cash-Pooling Vertrag',
              subtitle: 'Rechtlich geprüfte Holding-Statuten als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Conglomerate Treasury Portal',
              subtitle: 'Finanzströme, Dividenden und Intercompany-Darlehen aller Töchter überwachen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Vollendung der unternehmerischen Architektur

Eine Holding ist ein Organisationsinstrument und kein Status- oder Erfolgsgarant.

#### Das 3-Ebenen Modell:
1. **Oberste Ebene**: Familienstiftung oder Eigentümer-Holding (Vermögensaufbau & Schutz).
2. **Mittlere Ebene**: Management-Holding mit Shared Services (HR, IT, Marketing, Finanzen).
3. **Untere Ebene**: Operative Tochtergesellschaften (Ausführung & Kundenkontakt).`
        },
        understandContent: {
          coreTakeaway: 'Kapitalbündelung kann Reinvestition unterstützen; Nettoeffekt hängt von Steuern, Kosten, Rendite, Risiko und Ausschüttungen ab.',
          keyPrinciples: [
            'Darlehen zwischen Holding und Töchtern immer mit marktüblichen Zinsen und schriftlichen Verträgen ausstatten',
            'Niemals operative Risiken (wie Mietverträge oder Mitarbeiter) in der vermögensverwaltenden Holding eingehen'
          ]
        },
        actionTask: {
          instruction: 'Zeichne das Organigramm deiner zukünftigen Master-Holding:',
          inputType: 'checklist',
          checklistItems: [
            '3-Ebenen Organigramm mit Muttergesellschaft, Lizenz-GmbH und operativen Töchtern gezeichnet',
            'Cash-Pooling und Intercompany-Darlehensverträge mit Steuerberater vorbereitet',
            'Konzern-Treasury Dashboard im Mara CRM eingerichtet'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '90.2',
        stageId: 90,
        stageTitle: '90. Das 100M€ Lebenswerk & Dynastie-Building',
        title: 'Das Lebenswerk: Stiftungsverfassung, Nachfolgeplanung & Ewige Werte',
        durationMinutes: 34,
        description: 'Wie du Nachfolgeziele, Familie, Eigentum, Governance, Pflichtteils-, Steuer- und Stiftungsfragen mit Spezialisten planst, ohne ewigen Schutz zu versprechen.',
        learnContent: {
          videoTitle: 'Masterclass: Das 100-Millionen-Euro Lebenswerk & Generationen-Dynastien',
          videoDuration: '34:40',
          summaryText: 'Langfristige Nachfolge erfordert anpassungsfähige Governance, geeignete Nachfolger und regelmäßige rechtliche, steuerliche und familiäre Überprüfung. Stiftung und Familiencharta sind mögliche Instrumente, keine Ewigkeitsgarantie.',
          bulletPoints: [
            'Stiftungssatzung: Zweck, Vermögen, Organe und Änderungsregeln nach geltendem Stiftungsrecht; Satzungsänderung, Zulegung, Zusammenlegung oder Auflösung können möglich sein',
            'Der Familienrat: Spielregeln für Nachkommen – keine Versorgung ohne Leistung',
            'Philanthropie & Stiftungszwecke: Wie unternehmerisches Vermögen gesellschaftlichen Wandel und Bildung antreibt',
            'Die Vollendung von Modul 90: Der Übergang vom aktiven Macher zum weisen Schirmherrn eines Imperiums'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'ETERNAL LEGACY',
              description: 'Langfristige Zweck- und Governance-Struktur mit gesetzlichen Änderungs-, Aufsichts-, Insolvenz- und Auflösungsregeln.',
              highlight: true
            },
            {
              iconName: 'heart',
              title: 'PURPOSE & IMPACT',
              description: 'Gezielter Einsatz von Kapital zur Lösung der drängendsten Probleme der Menschheit.'
            }
          ],
          resources: [
            {
              title: 'Stiftungsverfassung & Familien-Charta Musterbuch',
              subtitle: 'Leitfaden für ewige Generationen-Sicherung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Academy Master-Diplom (Modul 1-90)',
              subtitle: 'Offizielles Abschlusszertifikat & Auszeichnung anfordern',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Krönung deines Weges in der GOM-MAR Academy

Du hast den gesamten Weg von deinem allerersten Online-Euro bis zum 100-Millionen-Konzern durchdrungen.

#### Das Gesetz der ewigen Dynastie:
- **Demut vor dem Erfolg**: Große Vermögen verpflichten zu außergewöhnlicher Verantwortung.
- **Systeme statt Personen**: Ein übertragbares Unternehmen braucht dokumentierte Prozesse, Führung und Kontrollen; Wert und Fortbestand bleiben unsicher.`
        },
        understandContent: {
          coreTakeaway: 'Das größte Kunstwerk eines Unternehmers ist ein System, das Menschen ermächtigt, Generationen überdauert und die Welt positiv prägt.',
          keyPrinciples: [
            'Werte und Prinzipien an die nächste Generation weitergeben, nicht nur reines Geld',
            'Niemals aufhören zu lernen – jede Vollendung ist der Beginn des nächsten großen Kapitels'
          ]
        },
        actionTask: {
          instruction: 'Schreibe deine persönliche Unternehmer-Verfassung:',
          inputType: 'checklist',
          checklistItems: [
            'Persönliche Werte-Charta und 10-Jahres-Vision für dein Imperium niedergeschrieben',
            'Familien- und Nachfolge-Vorsorgekonzept im Safe hinterlegt',
            'Modul 1 bis 90 erfolgreich absolviert und im System als Master abgeschlossen'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 91,
    title: '91. Quantitatives Trading, Krypto-Arbitrage & Automatisiertes Treasury',
    subtitle: 'Market Making, Triangular Arbitrage, Flash Loans, On-Chain Hedging & Risk-Parity Treasury',
    color: 'from-emerald-800 via-teal-900 to-black',
    badgeIcon: '⚡',
    description: 'Automatisiere dein Unternehmens-Treasury mit algorithmischem Trading: Nutze Krypto-Arbitrage, Delta-Neutral Hedging, Flash Loans und quantitative Risikoparitäts-Modelle, um Firmenüberschüsse mit minimalem Markt-Beta zu verzinsen.',
    lessons: [
      {
        id: '91.1',
        stageId: 91,
        stageTitle: '91. Delta-Neutral Hedging & Arbitrage',
        title: 'Delta-Neutral Yield Farming & Krypto-Zinsarbitrage',
        durationMinutes: 32,
        description: 'Wie du Krypto-Bestände gegen Preisschwankungen per Short-Perpetual absicherst und 8-15% risikofreie Zinserträge (Funding Rates) erwirtschaftest.',
        learnContent: {
          videoTitle: 'Masterclass: Delta-Neutral Hedging & Algorithmische Arbitrage',
          videoDuration: '32:15',
          summaryText: 'Ein Unternehmen darf seine Liquidität keinen 50%igen Krypto-Crashs aussetzen. Durch Delta-Neutral Hedging (Spot kaufen + 1x Short auf Perpetual Futures) eliminierst du das Preisrisiko zu 100% und kassierst kontinuierlich die positiven Funding-Rates von Spekulanten.',
          bulletPoints: [
            'Die Delta-Neutral Mechanik: Spot Long + Futures Short = Null Richtungsrisiko',
            'Funding Rate Arbitrage: Wie Long-Trader in Bullenmärkten bis zu 25% p.a. an Short-Positionen zahlen',
            'Triangular Arbitrage: Blitzschnelle Währungs-Dreiecke auf dezentralen Börsen (DEX) nutzen',
            'Smart Contract Risiko-Audits: Wie du Protokolle vor der Kapitalallokation auf Sicherheitslücken prüfst'
          ],
          coreConcepts: [
            {
              iconName: 'trending-up',
              title: 'DELTA-NEUTRAL CASHFLOW',
              description: 'Stabile Zinserträge ohne Risiko durch fallende oder steigende Kurse.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'FUNDING RATE HARVESTING',
              description: 'Automatischer Einzug von Halteprämien spekulativer Marktakteure.'
            }
          ],
          resources: [
            {
              title: 'Delta-Neutral Hedging & Treasury Blueprint',
              subtitle: 'Kalkulationstabellen & API-Bots als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Automated Treasury Dashboard',
              subtitle: 'Unternehmensliquidität und Renditeflüsse in Echtzeit überwachen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Praxis des modernen Unternehmens-Treasury

Bankguthaben verlieren durch Inflation an Kaufkraft. Algorithmische Treasury-Strategien schützen das Firmenkapital.

#### Die 3 Säulen des sicheren Krypto-Treasury:
1. **Delta-Zero**: Niemals ungesicherte Krypto-Positionen im Firmenvermögen halten.
2. **Multi-Exchange Diversifikation**: Kapital auf mindestens 4 regulierte Handelsplätze aufteilen.
3. **Cold Storage Backing**: 70% der Mittel bleiben auf Hardware-Multisig-Wallets (Gnosis Safe).`
        },
        understandContent: {
          coreTakeaway: 'Wer das Kursrisiko mathematisch neutralisiert, verwandelt Krypto in eine unübertroffene Cash-Maschine.',
          keyPrinciples: [
            'Positionen bei extremen Marktschwankungen stündlich automatisch rebalancieren',
            'Niemals auf unregulierten Offshore-Börsen ohne Insolvenzschutz handeln'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere deine Delta-Neutral Treasury-Strategie:',
          inputType: 'checklist',
          checklistItems: [
            'Berechnung der aktuellen Funding Rates auf Top-Börsen durchgeführt',
            'Gnosis Safe Multisig-Wallet für Firmenkrypto eingerichtet',
            'Automatischer Rebalancing-Trigger im Treasury Dashboard aktiviert'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '91.2',
        stageId: 91,
        stageTitle: '91. Flash Loans & Liquidity Provision',
        title: 'Flash Loans & Automated Market Making (AMM) Liquiditäts-Pools',
        durationMinutes: 30,
        description: 'Wie unbesicherte Flash-Kredite in einer einzigen Transaktions-Blockzeit ablaufen und wie du Handelsgebühren auf Uniswap v3 kassierst.',
        learnContent: {
          videoTitle: 'Masterclass: Flash Loans & Konzentrierte Liquidität',
          videoDuration: '30:45',
          summaryText: 'Ein Flash Loan leiht dir 10 Millionen Dollar für exakt 12 Sekunden ohne Sicherheiten – solange der Kredit im selben Block mit Zinsen zurückgezahlt wird. Erfahre, wie Arbitrage-Bots diese Mechanismen nutzen und wie du konzentrierte Liquidität auf Uniswap v3 bereitstellst.',
          bulletPoints: [
            'Flash Loan Atomarität: Wenn der Arbitrage-Gewinn die Gebühren nicht deckt, rollt die Blockchain die Transaktion automatisch zurück',
            'Uniswap v3 Konzentrierte Liquidität: Bereitstellung von Kapital in engen Preisspannen für 5x höhere Gebühreneinnahmen',
            'Impermanent Loss Mitigation: Wie du unbeständigen Verlust durch Stablecoin-Paare (USDC/USDT) auf null reduzierst',
            'MEV (Maximal Extractable Value) Schutz: Private RPC-Endpunkte (Flashbots) gegen Sandwich-Attacken nutzen'
          ],
          coreConcepts: [
            {
              iconName: 'repeat',
              title: 'ATOMIC ARBITRAGE',
              description: 'Null Ausfallrisiko: Transaktion wird nur ausgeführt, wenn der Gewinn garantiert ist.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'CONCENTRATED AMM',
              description: 'Maximale Gebührenausbeute durch gezielte Preisband-Liquidität.'
            }
          ],
          resources: [
            {
              title: 'Flash Loan Smart Contract Templates & Uniswap v3 Guide',
              subtitle: 'Solidity Vorlagen & MEV-Schutz als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Flashbots Private Node Connector',
              subtitle: 'Transaktionen vor Mempool-Frontrunning schützen',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Dezentrale Finanzarchitektur für Institutionelle

Flash Loans und konzentrierte AMM-Pools sind die modernsten Instrumente des dezentralen Bankwesens.

#### Die Vorteile für das Firmen-Treasury:
- **Keine Zinskosten bei Fehlschlag**: Null Risiko von Kreditausfällen.
- **Passiver Gebührenstrom**: Tägliche Ausschüttung von Tauschgebühren direkt in deine Firmen-Wallet.`
        },
        understandContent: {
          coreTakeaway: 'Wer private RPC-Nodes nutzt, schützt seine Handelsgewinne vor räuberischen MEV-Bots.',
          keyPrinciples: [
            'Konzentrierte Liquidität nur in hochliquiden Paaren mit extrem stabiler Korrelation einsetzen',
            'Smart Contracts vor dem Live-Einsatz immer auf Testnets simulieren'
          ]
        },
        actionTask: {
          instruction: 'Richte eine konzentrierte Liquiditäts-Position ein:',
          inputType: 'checklist',
          checklistItems: [
            'Stablecoin-Liquiditätspool auf Uniswap v3 analysiert',
            'Flashbots RPC-Endpunkt im Browser-Wallet hinterlegt',
            'Gebühren-Tracking im Mara CRM Treasury Portal aktiviert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 92,
    title: '92. Satelliten-Daten, IoT-Infrastruktur & Geodaten-Monetarisierung',
    subtitle: 'Erdbeobachtung, LoRaWAN Sensor-Netzwerke, Predictive Maintenance & Supply-Chain Tracing',
    color: 'from-sky-800 via-blue-900 to-zinc-950',
    badgeIcon: '🛰️',
    description: 'Monetarisiere die physische Welt über Satelliten- und IoT-Daten: Baue LoRaWAN-Sensornetzwerke für Industrieanlagen auf, analysiere Satellitenbilder per Computer Vision und verkaufe Predictive-Maintenance-Daten an Versicherungen und Agrarkonzerne.',
    lessons: [
      {
        id: '92.1',
        stageId: 92,
        stageTitle: '92. Satellitendaten & Computer Vision',
        title: 'Geodaten-Intelligence: Sentinel- & Planet-Satellitenbilder automatisiert auswerten',
        durationMinutes: 33,
        description: 'Wie du optische Satellitenbilder (SAR / Multispektral) per KI analysierst, Parkplatz-Füllstände für Hedgefonds misst und Ernteerträge vorhersagst.',
        learnContent: {
          videoTitle: 'Masterclass: Satelliten-Geodaten & KI-Bildanalyse',
          videoDuration: '33:10',
          summaryText: 'Satelliten fotografieren jeden Quadratmeter der Erde täglich. Hedgefonds zahlen 50.000€ im Monat für Daten über die Auslastung von Fabrikparkplätzen oder Öltank-Füllständen. Lerne, wie du freie ESA/NASA-Daten und kommerzielle Feeds in profitable Datenabonnements verwandelst.',
          bulletPoints: [
            'Sentinel-2 (Copernicus) & Planet Labs APIs: Kostenlose vs. hochauflösende Satelliten-Feeds (50cm Auflösung)',
            'Multispektrale Indexe: NDVI (Vegetationsgesundheit) und NDWI (Wasserindex) automatisiert berechnen',
            'SAR (Synthetic Aperture Radar): Durchdringung von Wolken und Nacht zur 24/7-Schiffsortung',
            'Alternative Data für Finanzmärkte: Wie Hedgefonds Rohstoff-Lieferketten vor den offiziellen Quartalsberichten handeln'
          ],
          coreConcepts: [
            {
              iconName: 'eye',
              title: 'ALTERNATIVE DATA',
              description: 'Handelsentscheidungen basierend auf Echtzeit-Satellitenbeobachtungen.',
              highlight: true
            },
            {
              iconName: 'globe',
              title: 'SAR RADAR VISION',
              description: 'Wetterunabhängige Überwachung von globalen Frachthäfen und Baustellen.'
            }
          ],
          resources: [
            {
              title: 'Satellite Geospatial AI Pipeline & API-Guide',
              subtitle: 'Python-Skripte für Copernicus & QGIS Anbindung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Geospatial Intelligence Hub',
              subtitle: 'Geodaten-Reports und Kundenabonnements verwalten',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'content'
            }
          ],
          fullArticleGuide: `### Das Geschäft mit alternativen Satellitendaten

Wer Veränderungen auf der Erde vor allen anderen sieht, besitzt unvergleichliche Informationsvorsprünge.

#### Anwendungsfelder für Geodaten-Services:
- **Agrar-Versicherungen**: Automatische Schadensregulierung nach Dürren oder Hagel ohne Gutachter vor Ort.
- **Supply-Chain-Tracking**: Wartezeiten von Containerschiffen vor Großhäfen in Echtzeit messen.
- **Immobilien-Entwicklung**: Zersiedelung und Neubaugebiete per Algorithmus aufspüren.`
        },
        understandContent: {
          coreTakeaway: 'Satellitendaten verwandeln physische Realität in skalierbare Software-Subskriptionen.',
          keyPrinciples: [
            'Immer offene Daten der ESA (Copernicus) als Basis nutzen und nur bei Bedarf teure kommerzielle Feeds zukaufen',
            'Ergebnisse in intuitiven PDF-Reports oder API-Endpunkten für Analysten bereitstellen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle einen Prototyp für einen Satellitendaten-Report:',
          inputType: 'checklist',
          checklistItems: [
            'Kostenlosen Zugang zur Copernicus Data Space API registriert',
            'NDVI-Vegetationsindex für eine Testregion berechnet',
            'Automatisierter Monatsbericht im Mara CRM hinterlegt'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '92.2',
        stageId: 92,
        stageTitle: '92. LoRaWAN & Industrial IoT',
        title: 'Industrial IoT: LoRaWAN Netzwerke für vorausschauende Wartung (Predictive Maintenance)',
        durationMinutes: 31,
        description: 'Wie du energieautarke Funksensoren (LoRaWAN) in Industrieanlagen installierst, Maschinenvibrationen überwachst und Stillstände verhinderst.',
        learnContent: {
          videoTitle: 'Masterclass: LoRaWAN IoT-Infrastruktur & Predictive Maintenance',
          videoDuration: '31:40',
          summaryText: 'Ein ungeplanter Fabrikstillstand kostet 50.000€ pro Stunde. Mit LoRaWAN-Sensoren überwachst du Vibrationen, Temperaturen und Druckabfälle über 15 Kilometer Funkreichweite bei 10 Jahren Batterielaufzeit. Erfahre, wie du Hardware-as-a-Service (HaaS) an Industriebetriebe verkaufst.',
          bulletPoints: [
            'Das LoRaWAN-Protokoll: 868 MHz Frequenzband, extreme Reichweite und minimale Sendeleistung',
            'Hardware-as-a-Service (HaaS): Sensoren + Gateway + Dashboard für 499€ monatlich pro Maschine vermieten',
            'Schwingungsanalyse (FFT Fast Fourier Transform): Kugellager-Verschleiß 6 Wochen vor dem Bruch erkennen',
            'MQTT & InfluxDB Pipeline: Tausende Sensordatenpunkte pro Sekunde zeitreihenbasiert visualisieren'
          ],
          coreConcepts: [
            {
              iconName: 'wifi',
              title: 'LORAWAN RANGE',
              description: '15km Reichweite ohne SIM-Karten oder teure Verkabelung in Werkhallen.',
              highlight: true
            },
            {
              iconName: 'activity',
              title: 'PREDICTIVE REPAIR',
              description: 'Reparaturwarnung vor dem Ausfall spart Kunden Millionen an Stillstandskosten.'
            }
          ],
          resources: [
            {
              title: 'Industrial IoT Deployment Blueprint & Sensor-Katalog',
              subtitle: 'LoRaWAN Netzwerkarchitektur & MQTT-Brücke als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR IoT Telemetry Engine',
              subtitle: 'Echtzeit-Sensordaten und Alarm-Schwellenwerte im Dashboard visualisieren',
              type: 'tool',
              iconName: 'settings',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Vernetzung der Industrie

Industriebetriebe suchen nach einfachen Nachrüstlösungen (Retrofit), um alte Maschinen fit für die Industrie 4.0 zu machen.

#### Die HaaS-Geschäftsmodell-Kalkulation:
- **Hardware-Kosten**: 150€ pro Sensorik-Knoten (einmalig).
- **Monatliche Abogebühr**: 49€ bis 149€ pro Messpunkt für Cloud-Dashboard und SMS-Alarmierung.
- **Marge**: Über 80% Bruttomarge ab Monat 3.`
        },
        understandContent: {
          coreTakeaway: 'Wer Industrieanlagen digital nachrüstet, bindet B2B-Kunden über 5- bis 10-jährige Rahmenverträge.',
          keyPrinciples: [
            'Sensoren immer mit Magnet- oder Klebebefestigung ohne Eingriff in die Maschinensteuerung montieren',
            'Alarmschwellen immer mit SMS- und E-Mail-Eskalation an den Schichtleiter koppeln'
          ]
        },
        actionTask: {
          instruction: 'Konstruiere dein Industrial IoT Angebot:',
          inputType: 'checklist',
          checklistItems: [
            'Retrofit Sensor-Paket für Maschinen-Vibrationsüberwachung kalkuliert',
            'MQTT-Telemetrie Dashboard im GOM-MAR System eingerichtet',
            'HaaS-Mietvertrag mit 36 Monaten Mindestlaufzeit entworfen'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 93,
    title: '93. Bio-Tech, Longevity-Kliniken & Präzisionsmedizin-Funnels',
    subtitle: 'Epigenetische Uhren, Ganzkörper-MRTs, NAD+ Infusionen & VIP-Langlebigkeits-Mitgliedschaften',
    color: 'from-emerald-700 via-teal-800 to-zinc-950',
    badgeIcon: '🧬',
    description: 'Betritt den 600-Milliarden-Dollar Zukunftsmarkt der Langlebigkeit (Longevity): Baue hochpreisige Funnels für präventive Ganzkörper-MRTs, biologische Altersbestimmungen (Horvath Clock), Peptid-Therapien und 50.000€ Concierge-Health-Mitgliedschaften.',
    lessons: [
      {
        id: '93.1',
        stageId: 93,
        stageTitle: '93. Longevity-Diagnostik & VIP-Gesundheitspässe',
        title: 'Präventive Diagnostik: Ganzkörper-MRT, Epigenetik & 10.000€ Health-Audits',
        durationMinutes: 34,
        description: 'Wie du wohlhabende Unternehmer für präventive Früherkennung gewinnst, epigenetische Tests vertreibst und medizinische Partnerkliniken anbindest.',
        learnContent: {
          videoTitle: 'Masterclass: Longevity-Funnels & Präventivmedizin-Marketing',
          videoDuration: '34:20',
          summaryText: 'Gesundheit ist das einzige Gut, das Milliardäre nicht direkt kaufen können – aber sie zahlen jeden Preis für die Verlängerung ihrer gesunden Lebensspanne (Healthspan). Lerne, wie du VIP-Health-Audits mit Ganzkörper-MRT, DNA-Methylierung und Kardio-Scans als hochrentable Funnels aufsetzt.',
          bulletPoints: [
            'Der Ganzkörper-MRT Funnel: 2.500€ bis 5.000€ für 60-minütige Krebs- und Aneurysmen-Früherkennung',
            'Epigenetische Altersmessung (DNAm PhenoAge / GrimAge): Das biologische Alter vor und nach der Therapie beweisen',
            'Blutpanel mit 120 Biomarkern: ApoB, Lp(a), hs-CRP, Homocystein und hormonelle Optimierung',
            'Arzt-Kooperationsmodell: Du lieferst Marketing und Funnels, akkreditierte Privatärzte führen die Diagnostik durch'
          ],
          coreConcepts: [
            {
              iconName: 'activity',
              title: 'PREVENTIVE MRI',
              description: 'Vollständige Früherkennung als ultimatives Statussymbol für High-Performers.',
              highlight: true
            },
            {
              iconName: 'heart',
              title: 'EPIGENETIC CLOCK',
              description: 'Biologische Verjüngung durch messbare Laborwerte schwarz auf weiß belegen.'
            }
          ],
          resources: [
            {
              title: 'Longevity Diagnostics & 120-Biomarker Master-Guide',
              subtitle: 'Labor-Referenzwerte & Partnerklinik-Verträge als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Longevity Health Record',
              subtitle: 'Patienten-Biomarker und Terminbuchungen datenschutzkonform führen',
              type: 'tool',
              iconName: 'user-check',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Revolution der Präventionsmedizin

Die Schulmedizin behandelt Krankheiten, wenn es zu spät ist. Longevity-Medizin optimiert Gesundheit Jahrzehnte im Voraus.

#### Die 4 Stufen des VIP-Health-Audits:
1. **Bildgebung**: Ganzkörper-MRT + CT-Kalk-Score (CAC) des Herzens.
2. **Molekular-Diagnostik**: DNA-Methylierungstest zur Bestimmung der biologischen Alterungsrate.
3. **Kognitiver Scan**: Neuro-Assessment und Reaktionszeit-Mapping.
4. **Das Executive Dossier**: Ein 50-seitiger personalisierter Optimierungsplan mit Arzt-Besprechung.`
        },
        understandContent: {
          coreTakeaway: 'Wer das biologische Alter messbar senkt, gewinnt lebenslang treue Kunden mit höchster Zahlungsbereitschaft.',
          keyPrinciples: [
            'Diagnostik und Therapie immer streng durch approbierte Ärzte nach dem Heilmittelwerbegesetz durchführen lassen',
            'Sensible Gesundheitsdaten auf isolierten, nach ISO 27799 zertifizierten Servern speichern'
          ]
        },
        actionTask: {
          instruction: 'Konzipiere dein Executive Longevity Diagnostic Angebot:',
          inputType: 'checklist',
          checklistItems: [
            'Leistungskatalog (MRT, Epigenetik, Blutpanel) mit Partnerarzt definiert',
            'Bewerbungs-Landingpage für Health-Audits im Mara CRM aufgesetzt',
            'Datenschutzerklärung für Gesundheitsdaten nach DSGVO Art. 9 hinterlegt'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '93.2',
        stageId: 93,
        stageTitle: '93. Concierge Health & Langlebigkeits-Clubs',
        title: 'Concierge Medicine: 50.000€ Jahres-Mitgliedschaften für private Langlebigkeits-Betreuung',
        durationMinutes: 31,
        description: 'Wie private Longevity-Clubs (wie Fountain Life oder Biograph) funktionieren, NAD+ Protokolle integriert werden und 24/7 Arzt-Zugänge skaliert werden.',
        learnContent: {
          videoTitle: 'Masterclass: Private Longevity Clubs & Concierge Medicine',
          videoDuration: '31:45',
          summaryText: 'Ein einmaliger Checkup reicht nicht. Wohlhabende Kunden wollen eine kontinuierliche 365-Tage Begleitung durch ein Team aus Ernährungsberatern, Sportwissenschaftlern und Ärzten. Erfahre, wie du exklusive Longevity-Memberships aufbaust.',
          bulletPoints: [
            'Das 50k€ Concierge Modell: Vierteljährliche Bluttests, ständige Oura/Whoop-Überwachung und maßgeschneiderte Infusionen',
            'Peptid- & NAD+ Protokolle: Infusionstherapien zur zellulären Regeneration und Mitochondrien-Verjüngung',
            'Der persönliche Health-Navigator: Ein dedizierter medizinscher Concierge koordiniert alle Spezialisten-Termine weltweit',
            'Exklusive Langlebigkeits-Lounges: Kältekammern (-110°C), hyperbare Sauerstofftherapie (HBOT) und Rotlicht-Betten'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'CONCIERGE HEALTH',
              description: '24/7 medizinische Betreuung auf Abruf für Spitzenunternehmer und Familien.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'HBOT & CRYOTHERAPY',
              description: 'Hyperbare Sauerstofftherapie beschleunigt Zellreparatur und Stammzell-Aktivität.'
            }
          ],
          resources: [
            {
              title: 'Concierge Medicine Club Member Agreement & SOPs',
              subtitle: 'Mitgliedschaftsverträge & Geräte-Leasingpläne als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Bio-Telemetry Sync',
              subtitle: 'Wearable-Daten (Oura, CGM Glukose, Whoop) mit Kundenakten synchronisieren',
              type: 'tool',
              iconName: 'activity',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Architektur privater Longevity-Kliniken

Kombiniere modernste High-Tech Diagnostik mit luxuriösem Hospitality-Ambiente.

#### Der Jahreszyklus einer VIP-Health-Membership:
- **Monat 1**: Tiefendiagnostik & Erstellung des individuellen Longevity-Protokolls.
- **Monat 2-11**: Wöchentliche Kälte-/HBOT-Sessions, monatliche Infusionen, kontinuierliches Biomarker-Tracking.
- **Monat 12**: Re-Testing aller 120 Biomarker und Berechnung der biologischen Verjüngung.`
        },
        understandContent: {
          coreTakeaway: 'Kontinuierliche Begleitung und messbare Verbesserungen erzeugen 90%+ Verlängerungsquoten bei 5-stelligen Jahresverträgen.',
          keyPrinciples: [
            'Niemals Heilversprechen abgeben – immer auf präventive Optimierung und Leistungssteigerung fokussieren',
            'Die Lounge-Atmosphäre wie ein 5-Sterne Boutique-Hotel gestalten – keine sterile Krankenhaus-Optik'
          ]
        },
        actionTask: {
          instruction: 'Entwirf deinen privaten Longevity Concierge Club:',
          inputType: 'checklist',
          checklistItems: [
            'Mitgliedschaftspakete (Silber, Gold, Black Card 50k€) kalkuliert',
            'Wearable-Datenanbindung (Oura/Apple Health) im Mara CRM getestet',
            'Schnittstelle zu privaten Fachärzten und Notfall-Kliniken vertraglich fixiert'
          ],
          toolboxCategory: 'crm'
        }
      }
    ]
  },
  {
    id: 94,
    title: '94. Rüstungsgüter, Dual-Use Tech & Globale Sicherheits-Funnels',
    subtitle: 'BAFA Exportkontrolle, ITAR, NATO-Lieferanten-Codes (NCAGE) & Cyber-Defense Ausschreibungen',
    color: 'from-zinc-900 via-stone-900 to-black',
    badgeIcon: '🛡️',
    description: 'Navigiere den sicherheitsrelevanten Hochtechnologie-Markt: Verstehe Dual-Use Exportkontrollen (BAFA/ITAR), erwirbe NATO-Lieferanten-Codes (NCAGE), sichere kritische Infrastrukturen (KRITIS) und schließe mehrjährige Rüstungs- und Cyber-Defense Verträge ab.',
    lessons: [
      {
        id: '94.1',
        stageId: 94,
        stageTitle: '94. Dual-Use & BAFA Exportkontrolle',
        title: 'Dual-Use Technologien & BAFA Exportgenehmigungen',
        durationMinutes: 34,
        description: 'Wie Drohnen-, Krypto- und Optik-Software als Dual-Use Güter eingestuft werden, wie Genehmigungsverfahren ablaufen und Sanktionslisten geprüft werden.',
        learnContent: {
          videoTitle: 'Masterclass: Dual-Use Compliance & BAFA Exportkontrolle',
          videoDuration: '34:25',
          summaryText: 'Moderne KI-, Drohnen- und Überwachungstechnologien fallen unter die europäische Dual-Use-Verordnung. Ein Export ohne BAFA-Genehmigung ist eine Straftat mit bis zu 5 Jahren Haft. Lerne, wie du Güterlisten prüfst, Endverbleibserklärungen (EVE) einholst und rechtskonform weltweit lieferst.',
          bulletPoints: [
            'Die EU Dual-Use Verordnung (EG 2021/821): Kategorien für Elektronik, Sensoren, Laser und Telekommunikation',
            'Das ELAN-K2 Portal des BAFA: Elektronische Einreichung von Ausfuhranträgen und Voranfragen',
            'Endverbleibserklärung (End-User Certificate EUC): Rechtliche Absicherung, dass die Technologie nicht für verbotene Zwecke missbraucht wird',
            'Automatisches Sanktionslisten-Screening: Abgleich aller Kunden gegen EU-, US-OFAC- und UN-Embargolisten'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'DUAL-USE COMPLIANCE',
              description: 'Lückenlose Ausfuhrgenehmigungen schützen vor drakonischen Außenwirtschaftsstrafen.',
              highlight: true
            },
            {
              iconName: 'user-check',
              title: 'SANCTION SCREENING',
              description: 'Echtzeit-Prüfung gegen weltweite Antiterror- und Embargolisten im CRM.'
            }
          ],
          resources: [
            {
              title: 'Dual-Use Exportkontrolle & BAFA Handbuch',
              subtitle: 'Güterlisten-Prüfschema & Endverbleibsmuster als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Sanction & Embargo Screener',
              subtitle: 'Automatisierte Kundenprüfung gegen globale Sanktionsdatenbanken',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Spielregeln im Hochsicherheits-Export

Technologieunternehmen im Bereich Drohnen, KI und Verschlüsselung müssen höchste Compliance-Standards erfüllen.

#### Die 4 Prüfschritte vor jeder Ausfuhr:
1. **Güterklassifizierung**: Ist die Software oder Hardware in Anhang I der Dual-Use Verordnung gelistet?
2. **Länder-Embargo**: Gilt für das Zielland ein Waffen- oder Technologie-Embargo?
3. **Personenprüfung**: Steht der Endkunde oder Vermittler auf einer Sanktionsliste?
4. **Verwendungsprüfung**: Liegen Hinweise auf militärische Endverwendung in sanktionierten Staaten vor?`
        },
        understandContent: {
          coreTakeaway: 'Wer eine lückenlose Exportkontrolle vorweisen kann, wird zum bevorzugten Partner westlicher Sicherheitsbehörden.',
          keyPrinciples: [
            'Niemals Lieferungen ohne unterzeichnete Original-Endverbleibserklärung (EUC) freigeben',
            'Alle Exportkontroll-Prüfungen mindestens 10 Jahre manipulationssicher archivieren'
          ]
        },
        actionTask: {
          instruction: 'Richte deinen automatisierten Sanktionslisten-Filter ein:',
          inputType: 'checklist',
          checklistItems: [
            'Güterklassifizierung deiner Software/Hardware nach Ausfuhrliste geprüft',
            'Automatisches Sanktionslisten-Screening im Mara CRM aktiviert',
            'Standardisierte Endverbleibserklärung (EUC) als Vorlage hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      },
      {
        id: '94.2',
        stageId: 94,
        stageTitle: '94. NATO NCAGE & KRITIS-Ausschreibungen',
        title: 'Verteidigungsaufträge: NATO-Code (NCAGE), CAGE & KRITIS-Sicherheitsverträge',
        durationMinutes: 32,
        description: 'Wie du einen NCAGE-Code für NATO-Lieferanten beantragst, Sicherheitsüberprüfungen (SÜG) meisterst und mehrjährige Verteidigungsbudgets gewinnst.',
        learnContent: {
          videoTitle: 'Masterclass: NATO-Ausschreibungen & KRITIS-Infrastrukturprojekte',
          videoDuration: '32:30',
          summaryText: 'Verteidigungs- und Sicherheitsbudgets sind krisenresistent und umfassen hunderte Milliarden Euro. Erfahre, wie du als IT- oder Technologie-Dienstleister den NCAGE-Code erhältst, Sicherheitsüberprüfungen für Mitarbeiter durchführst und Aufträge der NSPA (NATO Support and Procurement Agency) gewinnst.',
          bulletPoints: [
            'Der NCAGE-Code (NATO Commercial and Government Entity): Die offizielle Kennung für Rüstungs- und Regierungszulieferer',
            'Sicherheitsüberprüfungsgesetz (SÜG): Ü1, Ü2 und Ü3 Sicherheitsüberprüfungen für sicherheitsempfindliche Mitarbeiter',
            'NSPA Beschaffungsportal: Zugang zu internationalen Ausschreibungen aller 32 NATO-Mitgliedsstaaten',
            'KRITIS-Dachgesetz: Spezielle Schutzanforderungen für Energieversorger, Telekommunikation und Transport'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'NCAGE CERTIFICATION',
              description: 'Die weltweite Zulassung als gelisteter NATO- und Regierungslieferant.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'SECURITY CLEARANCE',
              description: 'Überprüfte Mitarbeiter ermöglichen den Zugriff auf geheime Großprojekte.'
            }
          ],
          resources: [
            {
              title: 'NATO Procurement & NCAGE Registration Guide',
              subtitle: 'Bewerbungsunterlagen für das NSPA-Portal als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Classified Project Vault',
              subtitle: 'Verschlüsselte Projektkommunikation für sicherheitsrelevante Verträge',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Der Einstieg in den institutionellen Sicherheitsmarkt

Die NATO und nationale Verteidigungsministerien suchen gezielt nach agilen Tech-Startups und KMUs.

#### Die Schritte zur NATO-Lieferanten-Zulassung:
1. **NCAGE-Beantragung**: Registrierung beim Logistikzentrum der Bundeswehr (LogZBw).
2. **SAM.gov Registrierung**: Eintragung in das US-Regierungs-Zentralregister mit Unique Entity ID (UEI).
3. **NSPA-Portal Listing**: Hinterlegung der Produkt- und Dienstleistungskataloge für weltweite Abrufe.`
        },
        understandContent: {
          coreTakeaway: 'Ein NCAGE-Code ist der Eintrittsausweis in die solventesten und stabilsten Beschaffungsmärkte der westlichen Welt.',
          keyPrinciples: [
            'Strikte Einhaltung von Geheimschutz-Vorschriften und keine öffentliche Prahlerei mit Regierungsverträgen',
            'Regelmäßige Re-Zertifizierung der Firmen- und Mitarbeiterfreigaben sicherstellen'
          ]
        },
        actionTask: {
          instruction: 'Bereite deine Registrierung als NATO-Zulieferer vor:',
          inputType: 'checklist',
          checklistItems: [
            'Antrag auf Zuweisung eines NCAGE-Codes vorbereitet',
            'Profil für das SAM.gov US-Regierungsregister angelegt',
            'Sicherheitskonzept für sensible Projektdaten im GOM-MAR Vault aktiviert'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  },
  {
    id: 95,
    title: '95. Mega-Infrastruktur, Immobilienfonds & Private Real Estate Syndication',
    subtitle: 'REITs, Immobilien-Tokenisierung, Mezzanine-Bauträgerkredite & 100M€ Portfolio-Asset-Management',
    color: 'from-amber-700 via-yellow-800 to-stone-950',
    badgeIcon: '🏙️',
    description: 'Baue gigantische Sachwert-Vermögen auf: Meistere gewerbliche Immobilien-Syndizierungen, strukturiere Real Estate Investment Trusts (REITs), tokenisiere Großimmobilien auf der Blockchain und verwalte 9-stellige Immobilien-Portfolios mit 10x Hebelwirkung.',
    lessons: [
      {
        id: '95.1',
        stageId: 95,
        stageTitle: '95. Real Estate Syndication & GP/LP Struktur',
        title: 'Immobilien-Syndizierung: 20M€ Eigenkapital von Co-Investoren für Großprojekte einsammeln',
        durationMinutes: 35,
        description: 'Wie General Partner (GP) / Limited Partner (LP) Strukturen funktionieren, Preferred Returns berechnet werden und Projektentwicklungen gehebelt werden.',
        learnContent: {
          videoTitle: 'Masterclass: Commercial Real Estate Syndication & GP/LP Modelle',
          videoDuration: '35:10',
          summaryText: 'Niemand kauft ein 50-Millionen-Bürogebäude oder Logistikzentrum alleine mit eigenem Geld. Lerne, wie du als General Partner (GP) Großprojekte strukturierst, 10-20 Millionen Eigenkapital von wohlhabenden Co-Investoren (LPs) einsammelst und durch die "Waterfall"-Gewinnverteilung überproportional verdienst.',
          bulletPoints: [
            'Die GP/LP Architektur: Der General Partner managt das Projekt, Limited Partners stellen passives Eigenkapital',
            'Preferred Return (z. B. 7-8%): Die LPs erhalten zuerst ihre Mindestverzinsung, bevor der GP am Gewinn beteiligt wird',
            'Der "Promote" (Carried Interest): Nach Erreichen der Hurdle Rate erhält der GP 20% bis 40% des verbleibenden Übergewinns',
            'Private Placement Memorandum (PPM): Rechtssicherer Wertpapierprospekt nach § 506(c) oder VermAnlG'
          ],
          coreConcepts: [
            {
              iconName: 'pie-chart',
              title: 'WATERFALL DISTRIBUTIONS',
              description: 'Stufenweise Gewinnverteilung belohnt den Projektentwickler mit massiven Performance-Gebühren.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'GP PROMOTE LEVERAGE',
              description: 'Überproportionale Rendite auf minimales eigenes eingesetztes Kapital.'
            }
          ],
          resources: [
            {
              title: 'Real Estate Syndication PPM & Waterfall Model',
              subtitle: 'Excel-Finanzmodell für Großimmobilien & Prospektmuster als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Real Estate Investor Portal',
              subtitle: 'Co-Investoren, Zeichnungsscheine und vierteljährliche Ausschüttungen verwalten',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Hohe Schule der Immobilien-Syndizierung

Durch Syndizierung hebelst du dein Know-how mit dem Kapital wohlhabender Anleger.

#### Das 4-Stufen Waterfall Modell:
1. **Rückzahlung des LP-Kapitals**: 100% der Ausschüttungen gehen an die Anleger.
2. **Preferred Return**: 8% jährliche Vorzugsverzinsung für die LPs.
3. **Catch-up Phase**: Der GP holt seine anteilige Vergütung auf.
4. **Finaler Split (70/30 oder 60/40)**: Der verbleibende Millionengewinn wird zwischen LPs und GP geteilt.`
        },
        understandContent: {
          coreTakeaway: 'Als General Partner baust du 8-stellige Sachwerte auf, indem du die Deals findest und das Kapital orchestrierst.',
          keyPrinciples: [
            'Immer mindestens 5% "Skin in the Game" (eigenes Kapital) investieren, um das Vertrauen der LPs zu sichern',
            'Konservative Mietsteigerungs- und Zinsszenarien kalkulieren – niemals auf Schönwetterprognosen verlassen'
          ]
        },
        actionTask: {
          instruction: 'Modelliere eine Immobilien-Syndizierung im Waterfall-Kalkulator:',
          inputType: 'checklist',
          checklistItems: [
            'Finanzierungsmodell für ein 10M€ Gewerbeobjekt mit 70% Bankkredit und 30% LP-Kapital erstellt',
            '8% Preferred Return und 30% GP-Promote Waterfall durchgerechnet',
            'Investoren-Onboarding Strecke im Mara CRM eingerichtet'
          ],
          toolboxCategory: 'crm'
        }
      },
      {
        id: '95.2',
        stageId: 95,
        stageTitle: '95. Real Estate Tokenization & REITs',
        title: 'Immobilien-Tokenisierung & REIT-Strukturen: Handelbare digitale Anteile',
        durationMinutes: 32,
        description: 'Wie Immobilien per ERC-3643 Security Token fraktioniert werden, wie REIT-Steuerprivilegien funktionieren und globale Liquidität erschlossen wird.',
        learnContent: {
          videoTitle: 'Masterclass: Immobilien-Tokenisierung & REIT-Architektur',
          videoDuration: '32:35',
          summaryText: 'Klassische Immobilien sind illiquide und mit hohen Notarkosten verbunden. Durch Security Token Offerings (STOs) nach dem ERC-3643 Standard machst du Anteile an Wolkenkratzern und Logistikzentren digital handelbar und sammelst Kapital ab 500€ weltweit ein.',
          bulletPoints: [
            'ERC-3643 Permissioned Tokens: Eingebaute On-Chain Identitätsprüfung (KYC/AML) vor jedem Transfer',
            'REIT (Real Estate Investment Trust) Vorteile: Steuerbefreiung auf Gesellschaftsebene bei Ausschüttung von 90% der Gewinne',
            'Sekundärmarkt-Liquidität: Anleger können ihre Immobilienanteile 24/7 über regulierte Krypto-Börsen verkaufen',
            'Automatisierte Mietdividenden: Smart Contracts schütten Mieteinnahmen sekundengenau und automatisiert an Token-Halter aus'
          ],
          coreConcepts: [
            {
              iconName: 'lock',
              title: 'ERC-3643 SECURITY TOKEN',
              description: 'Regulierte Wertpapier-Tokenisierung mit lückenloser Anleger-Legitimation.',
              highlight: true
            },
            {
              iconName: 'repeat',
              title: 'STREAMING DIVIDENDS',
              description: 'Automatisierte tägliche oder monatliche Miet-Auszahlungen per Smart Contract.'
            }
          ],
          resources: [
            {
              title: 'Real Estate Tokenization Whitepaper & Smart Contract Audits',
              subtitle: 'BaFin-konforme STO Prospektstruktur als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Asset Tokenization Engine',
              subtitle: 'Digitale Wertpapier-Tokens für Sachwert-Portfolios emittieren',
              type: 'tool',
              iconName: 'award',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Zukunft der Immobilienfinanzierung

Die Tokenisierung demokratisiert den Zugang zu erstklassigen institutionellen Immobilien.

#### Die Vorteile für Emittenten:
- **Globale Investorenbasis**: Kapitalaufnahme über Ländergrenzen hinweg ohne Bankenmonopol.
- **Keine Notarkosten bei Weitergabe**: Digitale Übertragung im Bruchteil einer Sekunde.
- **Transparente Eigentümerstruktur**: Unveränderliches Grundbuch-Mapping auf der Blockchain.`
        },
        understandContent: {
          coreTakeaway: 'Wer Immobilien tokenisiert, vereint die Wertstabilität von Beton mit der Liquidität von Aktien.',
          keyPrinciples: [
            'Immer ein BaFin-gebilligtes Wertpapier-Informationsblatt (WIB) oder Prospekt erstellen',
            'Die physische Immobilie in einer separaten Zweckgesellschaft (SPV) insolvenzfest absichern'
          ]
        },
        actionTask: {
          instruction: 'Konfiguriere dein erstes Immobilien-Tokenisierungs-Projekt:',
          inputType: 'checklist',
          checklistItems: [
            'Zweckgesellschaft (SPV) Struktur für die Zielimmobilie definiert',
            'ERC-3643 Smart Contract Parameter und KYC-Whitelist konfiguriert',
            'Ausschüttungs-Intervall für Mietrenditen im Mara Token Portal hinterlegt'
          ],
          toolboxCategory: 'settings'
        }
      }
    ]
  }
];

import { Stage, Campaign, PromptTemplate } from '../types';

export const ACADEMY_STAGES: Stage[] = [
  {
    id: 1,
    title: '1. Dein Start',
    subtitle: '🟢 START',
    color: 'emerald',
    badgeIcon: 'Zap',
    description: 'Wie funktioniert Online-Einkommen? Welche Möglichkeiten gibt es und was brauchst du wirklich?',
    lessons: [
      {
        id: '1.1',
        stageId: 1,
        stageTitle: '1. Dein Start',
        title: 'Wie funktioniert Online-Einkommen?',
        durationMinutes: 8,
        description: 'Verstehe das Grundprinzip von digitalem Mehrwert, automatisierter Wertschöpfung und Skalierbarkeit.',
        learnContent: {
          videoTitle: 'Einführung: Das Fundament von Online-Einkommen',
          videoDuration: '7:45',
          summaryText: 'Online-Einkommen entsteht nicht durch Glück oder Magie, sondern indem du bestehende Probleme von Menschen löst. Du platzierst dich als Bindeglied zwischen einem Menschen mit einem Wunsch/Problem und der passenden Lösung.',
          bulletPoints: [
            'Angebot & Nachfrage: Mensch sucht Lösung -> Du lieferst die Empfehlung oder das Produkt.',
            'Automatisierung: Dein System arbeitet 24/7, auch wenn du schläfst.',
            'Ortsunabhängigkeit: Dein Laptop ist deine Zentrale.'
          ],
          fullArticleGuide: `### Das fundamentale Gesetz des Online-Einkommens

Geld im Internet zu verdienen ist kein mysteriöser Trick und erfordert keine vererbtes Talent. Es basiert auf einem einfachen universellen Gesetz: **Wertschöpfung durch Problemlösung**.

Wenn jemand im Alltag ein drängendes Problem hat – sei es der Wunsch nach einem Nebeneinkommen, mehr Fitness, besserem Schlaf oder beruflichem Erfolg –, sucht er aktiv nach einer Abkürzung. Wenn du diese Abkürzung bereitstellst oder empfiehlst, wirst du dafür entlohnt.

#### Die 3 Säulen der digitalen Skalierbarkeit

1. **Geringe Grenzkosten**: Ein digitales Produkt oder eine Empfehlungs-Landingpage kostet in der Erstellung einmalig Zeit, kann danach aber an 10, 100 oder 10.000 Menschen gleichzeitig ausgeliefert werden.
2. **Automatisierte Abläufe**: Dank moderner E-Mail-Automation und digitaler Verkaufssysteme läuft die Ansprache und Auslieferung 24 Stunden am Tag – völlig unabhängig von deiner persönlichen Arbeitszeit.
3. **Ortsunabhängigkeit**: Dein gesamtes Geschäft befindet sich auf deinem Laptop oder Smartphone. Du benötigst keine Geschäftsräume, kein Lager und kein Personal.

#### Wie du als Affiliate funktionierst

Du musst dein Rad nicht neu erfinden oder eigene Produkte entwickeln. Als Affiliate Marketing Partner verbindest du Angebot und Nachfrage. Du empfiehlst erprobte, qualitativ hochwertige Produkte etablierter Hersteller und erhältst für jeden erfolgreichen Verkauf eine attraktive Provision (oft 30% bis 70%).`,
          practicalExamples: [
            'Beispiel Nebeneinkommen: Ein Angestellter sucht nach Wegen, sich monatlich 500€ nebenbei aufzubauen. Du empfiehlst ihm eine erprobte Schritt-für-Schritt Anleitung und erhältst 50% Provision.',
            'Beispiel Automatisierung: Ein Interessent trägt sich um 23:00 Uhr auf deiner Landingpage ein. Die Mail Automation sendet ihm sofort den Ratgeber und verweist auf das Partnerangebot. Der Verkauf findet statt, während du schläfst.'
          ],
          videoChapters: [
            { time: '0:00', title: 'Willkommen in der GOM-MAR Academy' },
            { time: '2:15', title: 'Das Prinzip von Wertschöpfung' },
            { time: '4:30', title: 'Warum Affiliate Marketing ideal für Einsteiger ist' },
            { time: '6:50', title: 'Zusammenfassung & erste Aufgabe' }
          ]
        },
        understandContent: {
          coreTakeaway: 'Du musst nicht dein eigenes Produkt erfinden – du kannst bestehende, funktionierende Lösungen empfehlen (Affiliate Marketing).',
          keyPrinciples: [
            'Fokus auf Problemlösung statt Verkaufsdruck',
            'Ein einfaches System schlägt ein kompliziertes Chaos',
            'Konsistenz in den ersten 30 Tagen entscheidet über Erfolg'
          ]
        },
        actionTask: {
          instruction: 'Verpflichte dich selbst: Welches Ziel möchtest du in den nächsten 90 Tagen erreichen?',
          inputType: 'choice',
          placeholder: 'Wähle dein Hauptziel...'
        }
      },
      {
        id: '1.2',
        stageId: 1,
        stageTitle: '1. Dein Start',
        title: 'Welche Möglichkeiten gibt es?',
        durationMinutes: 10,
        description: 'Ein Überblick über Affiliate Marketing, Digitale Infoprodukte und automatisierte Empfehlungssysteme.',
        learnContent: {
          videoTitle: 'Modellvergleich: Welcher Weg passt zu dir?',
          videoDuration: '9:12',
          summaryText: 'Es gibt viele Wege online Geld zu verdienen. Für Einsteiger ist Affiliate Marketing das mit Abstand risikoärmste Modell: Kein Kundenservice, keine Produktentwicklung, keine Logistik.',
          bulletPoints: [
            'Affiliate Marketing: 30% bis 70% Provision pro Verkauf.',
            'Eigene Digitale Produkte: Hohe Marge, aber viel Vorarbeit.',
            'Dienstleistungen/Coaching: Schnelles Geld, aber nicht zeitunabhängig.'
          ],
          fullArticleGuide: `### Die gängigsten Online-Geschäftsmodelle im direkten Vergleich

Wer im Internet starten möchte, wird oft von der Fülle an Möglichkeiten erschlagen. Doch nicht jedes Modell ist für Einsteiger ohne hohes Startkapital oder Fachwissen geeignet.

#### 1. Affiliate Marketing (Die GOM-MAR Empfehlung)
* **Funktionsweise**: Du empfiehlst Produkte anderer Hersteller über deinen persönlichen Partnerlink.
* **Vorteile**: Kein eigenes Produkt nötig, kein Kundenservice, keine Abwicklung, sofortiger Start möglich, hohe Provisionen bei Infoprodukten (30–70%).
* **Nachteile**: Du baust nicht primär eine eigene Herstellermarke auf (was für Einsteiger jedoch ein großer Vorteil ist!).

#### 2. Eigene Digitale Infoprodukte (E-Books, Videokurse)
* **Funktionsweise**: Du erstellst eigene Kurse oder Anleitungen und verkaufst sie direkt.
* **Vorteile**: 100% Marge, volle Kontrolle über Preise und Funnels.
* **Nachteile**: Enormer Zeitaufwand bei Erstellung, Aktualisierung und Kundensupport.

#### 3. E-Commerce & Dropshipping
* **Funktionsweise**: Verkauf physischer Waren über einen Onlineshop.
* **Vorteile**: Hohe Nachfrage nach physischen Dingen.
* **Nachteile**: Hohes Risiko durch Retouren, Lieferzeiten, Zoll und oft geringe Marge (10–20%).

#### Fazit für deinen Start
In der GOM-MAR Academy fokussieren wir uns auf **Affiliate Marketing mit automatisierter E-Mail-Begleitung**. Dies vereint das geringste Risiko mit dem schnellsten Weg zu den ersten echten Einnahmen.`,
          practicalExamples: [
            'Beispiel Affiliate vs. Shop: Im Dropshipping musst du defekte Produkte umtauschen und E-Mails von verärgerten Kunden beantworten. Im Affiliate Marketing übernimmt der Produkthersteller 100% dieser Aufgaben für dich.'
          ],
          videoChapters: [
            { time: '0:00', title: 'Übersicht der digitalen Geschäftsmodelle' },
            { time: '3:20', title: 'Affiliate Marketing im Detail' },
            { time: '6:45', title: 'Vergleich: Zeitaufwand vs. Ertrag' }
          ]
        },
        understandContent: {
          coreTakeaway: 'Affiliate Marketing ist der schnellste und sicherste Weg zu deinem ersten Online-Nebeneinkommen.',
          keyPrinciples: [
            'Null Risiko durch vorgefertigte Verkaufsprozesse der Hersteller',
            'Sofortiger Start ohne Gewerbekomplexität am Tag 1',
            'Skalierbar durch automatisierte Lead-Generierung'
          ]
        },
        actionTask: {
          instruction: 'Wähle das Modell, auf das wir uns in der GOM-MAR Academy fokussieren werden.',
          inputType: 'checklist',
          checklistItems: [
            'Ich starte mit Affiliate Marketing',
            'Ich nutze automatisierten E-Mail-Verkauf',
            'Ich erstelle ein einfaches Schritt-für-Schritt System'
          ]
        }
      },
      {
        id: '1.3',
        stageId: 1,
        stageTitle: '1. Dein Start',
        title: 'Was brauchst du wirklich?',
        durationMinutes: 7,
        description: 'Das absolute Minimal-Setup für deinen erfolgreichen Start ohne unnötigen Ballast.',
        learnContent: {
          videoTitle: 'Das 3-Bausteine-Startsystem',
          videoDuration: '6:30',
          summaryText: 'Lass dich nicht verwirren von 50 verschiedenen Marketing-Tools. Für deinen Start brauchst du exakt 3 Dinge: Eine Domain/Landingpage, einen E-Mail-Autoresponder und ein Partnerangebot.',
          bulletPoints: [
            '1. Domain & Landingpage (Deine digitale Visitenkarte)',
            '2. Autoresponder (Deine automatische Verkaufs-Mail-Maschine)',
            '3. Partnerangebot (Dein funktionierendes Produkt mit Provision)'
          ],
          fullArticleGuide: `### Das Schlanke 3-Bausteine-System der GOM-MAR Academy

Viele Anfänger verheddern sich in endlosen Software-Vergleichen, Grafikprogrammen und technischen Details. Sie verbringen Wochen damit, Einstellungen vorzunehmen, ohne jemals einen einzigen Interessenten zu kontaktieren.

Wir reduzieren dein System auf das **absolute Minimum**, das für nachweisbare Resultate erforderlich ist:

#### Baustein 1: Eine simple Landingpage (Opt-In Seite)
Eine einzige Webseite, auf der Besucher ihre E-Mail-Adresse eintragen können, um einen wertvollen Gratis-Ratgeber (Lead Magnet) zu erhalten. Kein Schnickschnack, keine 10 Unterseiten.

#### Baustein 2: Ein automatisierter E-Mail Autoresponder
Sobald sich ein Besucher einträgt, übernimmt deine E-Mail Automation. Sie liefert den Ratgeber aus und sendet in den folgenden Tagen vorgefertigte, vertrauensbildende Nachrichten mit deinen Empfehlungslinks.

#### Baustein 3: Ein geprüftes Partnerangebot (Affiliate Produkt)
Ein erprobtes Produkt von Marktplätzen wie Digistore24 oder Copecart, das ein echtes Problem deiner Zielgruppe löst und dir pro Verkauf 30% bis 70% Provision einbringt.

Alles, was darüber hinausgeht (Logo, Visitenkarten, komplizierte Funnels), ist am Anfang reine Zeitverschwendung!`,
          practicalExamples: [
            'Das Minimal-Setup in Aktion: Besucher gibt E-Mail auf Landingpage ein -> E-Mail System sendet automatisch Willkommens-Mail + Empfehlungslink -> Interessent kauft -> Du erhältst die Benachrichtigung "Du hast eine Provision erhalten!".'
          ]
        },
        understandContent: {
          coreTakeaway: 'Weniger ist mehr. Je einfacher dein System am Anfang aufgebaut ist, desto schneller machst du deinen ersten Euro.',
          keyPrinciples: [
            '3 Kernkomponenten genügen für ein 4-stelliges Nebeneinkommen',
            'GOM-MAR stellt dir die Mail Automation und Tools direkt bereit',
            'Perfektion ist der Feind von Fortschritt'
          ]
        },
        actionTask: {
          instruction: 'Bestätige deine Minimal-Checkliste für den Systemstart.',
          inputType: 'checklist',
          checklistItems: [
            'Verstanden: Ich brauche nur 3 Komponenten',
            'Bereit, die GOM-MAR Mail Automation zu nutzen',
            'Fokus auf sofortige Umsetzung gesetzt'
          ]
        }
      },
      {
        id: '1.4',
        stageId: 1,
        stageTitle: '1. Dein Start',
        title: 'Was brauchst du NICHT?',
        durationMinutes: 6,
        description: 'Vermeide die 5 teuersten Fehler und Zeitfresser von Anfängern.',
        learnContent: {
          videoTitle: 'Typische Zeitfresser & Anfängerfallen vermeiden',
          videoDuration: '5:50',
          summaryText: '90% aller Einsteiger scheitern, weil sie Wochen mit Logodesign, Gewerbeamt-Bürokratie oder der Suche nach der "perfekten" Software verschwenden.',
          bulletPoints: [
            '❌ Kein teures Gewerbe-Giga-Setup an Tag 1 erforderlich',
            '❌ Kein perfektes Logo oder Wochen für Farbpaletten verschwenden',
            '❌ Keine 100 Videos vorproduzieren',
            '❌ Keine teuren monatlichen 200€ Tool-Abonnements'
          ],
          fullArticleGuide: `### Die 5 teuersten Zeitfresser für Online-Einsteiger

Warum schaffen es manche Menschen in 14 Tagen zu ihren ersten Einnahmen, während andere nach 6 Monaten immer noch am selben Fleck stehen? Die Antwort liegt in den Dingen, die du **BEWUSST WEGLÄSST**.

#### 1. Perfektionismus bei Logos & Grafiken
Niemand kauft ein Produkt, weil dein Logo grün oder blau ist. Am Anfang reicht schlichter Text und ein sauberes, professionelles Design.

#### 2. Komplexe Software-Abonnements
Kaufe keine teuren All-In-One Tools für hunderte Euro im Monat. Nutze die integrierten Tools der GOM-MAR Academy, um deine Fixkosten bei nahezu 0€ zu halten.

#### 3. Das Erstellen von 50 Social Media Accounts
Konzentriere dich auf genau **EINE** Haupt-Trafficquelle (z.B. Facebook Gruppen oder Instagram Reels), anstatt dich auf 10 Plattformen zu verzetteln.

#### 4. Endlose Recherchen ohne Umsetzung ("Tutorial-Hölle")
Wissen ohne Handlung bringt 0€. Lerne jeweils nur den nächsten Schritt und setze ihn sofort um, bevor du die nächste Lektion startest.`,
          practicalExamples: [
            'Erfolgsbeispiel: Markus hat kein Logo, keine Visitenkarten und nutzt nur ein einfaches Profilbild. Er generiert 15 Leads pro Woche und macht seine ersten Sales. Stefan hat 3 Wochen ein Logo designt und 0€ verdient.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Vermeide "Overthinking". Deine einzige Aufgabe ist es, Interessenten auf deine Landingpage zu bringen.',
          keyPrinciples: [
            'Sichtbarkeit schlägt Perfektionismus',
            'Erst Leads gewinnen, dann feinschleifen',
            'Inspiration nutzen, statt das Rad neu zu erfinden'
          ]
        },
        actionTask: {
          instruction: 'Eliminiere deine Ablenkungen. Welche Falle wirst du ab heute bewusst meiden?',
          inputType: 'text',
          placeholder: 'z.B. Stundenlanges Herumprobieren an Logos oder Farben...'
        }
      }
    ]
  },
  {
    id: 2,
    title: '2. Deine Richtung',
    subtitle: '🔵 FUNDAMENT',
    color: 'blue',
    badgeIcon: 'Compass',
    description: 'Nische finden, Zielgruppe bestimmen, Problem identifizieren und das richtige Angebot auswählen.',
    lessons: [
      {
        id: '2.1',
        stageId: 2,
        stageTitle: '2. Deine Richtung',
        title: 'Nische finden',
        durationMinutes: 12,
        description: 'Finde eine tragfähige Nische in etablierten Märkten und prüfe ihre tatsächliche Nachfrage.',
        learnContent: {
          videoTitle: 'Die Profitabilitäts-Formel für deine Nische',
          videoDuration: '10:15',
          summaryText: 'Bestehende Nachfrage ist ein wichtiges Signal, aber noch kein Verkaufsversprechen. Prüfe Zielgruppe, Problem, Wettbewerb und Zahlungsbereitschaft mit echten Daten.',
          bulletPoints: [
            '1. Finanzen & Nebeneinkommen (Online Geld verdienen, Sparen, Investieren)',
            '2. Gesundheit & Fitness (Abnehmen, Muskelaufbau, Vitalität, Schlaf)',
            '3. Beziehungen & Persönlichkeit (Dating, Partnerschaft, Selbstbewusstsein)'
          ],
          fullArticleGuide: `### Drei große Märkte mit anhaltender Nachfrage

Eine "Nische" ist ein gezielter Ausschnitt eines Gesamtmarktes. Ein Thema ohne erkennbare Nachfrage ist schwerer zu vermarkten. Nutze bestehende Ausgaben deshalb als Ausgangspunkt und validiere deine konkrete Idee zusätzlich.

#### Die Top 3 Evergreen-Märkte:

1. **Finanzen, Karriere & Nebeneinkommen**:
   * Themen: Online-Business, Passive Einnahmen, Sparen, Krypto, Karriereaufstieg.
   * Warum rentabel? Menschen investieren gerne Geld, wenn sie dadurch mehr Geld oder Freiheit gewinnen können.

2. **Gesundheit, Fitness & Wohlbefinden**:
   * Themen: Abnehmen ohne Hungern, Rückenschmerzen lindern, Besser schlafen, Muskelaufbau ab 40.
   * Warum rentabel? Gesundheit ist das höchste Gut; Schmerzen wollen sofort gelöst werden.

3. **Beziehungen, Dating & Persönlichkeit**:
   * Themen: Ex zurückgewinnen, Traumpartner finden, Hundeerziehung, Selbstbewusstsein stärken.
   * Warum rentabel? Emotionale Themen lösen starkes Handlungsbedürfnis aus.

#### So wählst du deine Sub-Nische
Wähle eine spitzere Ausrichtung innerhalb eines Megamarktes. Statt "Geld verdienen allgemein" wählst du "Online-Nebeneinkommen für Angestellte in Teilzeit".`,
          practicalExamples: [
            'Spitze Positionierung: Markt = Gesundheit -> Sub-Nische = Gesundes Abnehmen für berufstätige Mütter ohne stundenlanges Kochen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Erfinde keinen Markt. Gehe dorthin, wo das Geld bereits fließt!',
          keyPrinciples: [
            'Große Märkte haben viel Konkurrenz = BEWEIS für viel Geld',
            'Positioniere dich in einer klaren Sub-Nische (z.B. "Nebeneinkommen für Berufstätige")',
            'Nutze KI-Unterstützung für Ideen'
          ]
        },
        actionTask: {
          instruction: 'Nutze die GOM-MAR Toolbox (Nischen-Finder) oder trage hier deine gewählte Nische ein:',
          inputType: 'link_toolbox',
          toolboxCategory: 'affiliate',
          placeholder: 'z.B. Online-Nebeneinkommen für Angestellte'
        }
      },
      {
        id: '2.2',
        stageId: 2,
        stageTitle: '2. Deine Richtung',
        title: 'Zielgruppe bestimmen',
        durationMinutes: 10,
        description: 'Erstelle deinen Wunschkunden-Avatar: Wer ist deine Zielgruppe und was bewegt sie?',
        learnContent: {
          videoTitle: 'Zielgruppen-Analyse: Wer ist dein Traumkunde?',
          videoDuration: '8:40',
          summaryText: 'Je genauer du eine spezifische Person vor Augen hast, desto wirkungsvoller klingen deine Texte, Landingpages und E-Mails.',
          bulletPoints: [
            'Demografie: Alter, Beruf, Lebenssituation (z.B. 30-50 Jahre, angestellt)',
            'Wünsche: Mehr Freiheit, finanzielles Polster, mehr Zeit mit der Familie',
            'Ängste: Inflation, fehlende Rente, Abhängigkeit vom Chef'
          ],
          fullArticleGuide: `### Der Wunschkunden-Avatar (Persona)

Wer jeden ansprechen will, spricht am Ende niemanden an. Wenn du deine E-Mails "An alle" schreibst, wirken sie kalt und anonym. Wenn du sie so schreibst, als würdest du mit einem konkreten Bekannten sprechen, entsteht sofort Vertrauen.

#### Die 4 Schlüsselfragen für deinen Avatar:

1. **Wer ist die Person?**: Alter, Beruf, Familienstand (z.B. Thomas, 42 Jahre, Industrie-Angestellter, verheiratet, 2 Kinder).
2. **Was ist die aktuelle Frustration?**: Zu wenig Zeit für Hobbys, steigende Lebenshaltungskosten, Hamsterrad-Gefühl am Sonntagabend.
3. **Was ist der größte Wunsch?**: Monatlich 500€ bis 1.000€ nebenbei verdienen, um der Familie Urlaub zu ermöglichen und finanzielle Sorgen abzubauen.
4. **Welche Zweifel hat die Person?**: "Habe ich genug Zeit?", "Funktioniert das auch ohne Vorkenntnisse?", "Ist das seriös?".

Deine Texte müssen diese Zweifel entkräften und den Wunsch greifbar machen!`,
          practicalExamples: [
            'Schlechter Text: "Unser System bietet hervorragende Syndizierungsmethoden für digitale Reseller." -> Unverständlich.',
            'Guter Text: "Wie du dir ohne Vorkenntnisse in 30 Minuten am Tag ein zweites Standbein aufbaust." -> Trifft den Avatar genau.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Wer jeden ansprechen will, spricht am Ende niemanden an.',
          keyPrinciples: [
            'Schreibe deine Mails so, als würdest du einem guten Freund schreiben',
            'Verwende die genauen Worte deiner Zielgruppe',
            'Löse exakt das drängendste Alltagsproblem'
          ]
        },
        actionTask: {
          instruction: 'Formuliere in 1-2 Sätzen, wer deine Zielgruppe ist:',
          inputType: 'text',
          placeholder: 'z.B. Berufstätige zwischen 30 und 50, die sich ohne Vorkenntnisse 500-1000€ nebenbei aufbauen wollen.'
        }
      },
      {
        id: '2.3',
        stageId: 2,
        stageTitle: '2. Deine Richtung',
        title: 'Problem identifizieren',
        durationMinutes: 9,
        description: 'Finde das "Burning Problem" deiner Zielgruppe, für das sie sofort nach einer Lösung sucht.',
        learnContent: {
          videoTitle: 'Schmerzpunkte finden & verständlich aufdecken',
          videoDuration: '7:20',
          summaryText: 'Menschen kaufen emotional und begründen es rational. Das stärkste Kaufmotiv ist die Vermeidung von Schmerz oder das Erreichen eines sehnlichsten Wunsches.',
          bulletPoints: [
            'Schmerz: "Zu wenig Geld am Ende des Monats trotz Vollzeitjob"',
            'Wunsch: "Ortsunabhängig von zuhause 500€ extra verdienen"',
            'Hürde: "Keine Ahnung von Technik, zu wenig Zeit"'
          ],
          fullArticleGuide: `### Das "Burning Problem" als Kaufauslöser

Verkäufe geschehen nicht durch Zufall, sondern weil eine Lücke zwischen dem **IST-Zustand** (Schmerz/Frustration) und dem **SOLL-Zustand** (Wunsch/Ziel) geschlossen wird.

#### Die "Vorher-Nachher" Transformation:

* **Vorher (Schmerz)**: Thomas hat am Monatsende kaum noch Geld auf dem Konto. Er sorgt sich um die Inflation und fühlt sich im Job gefangen. Er hat wenig Zeit und keine Lust auf komplizierte Programmiersprachen.
* **Nachher (Traumzustand)**: Thomas hat ein einfaches System aufgesetzt. Jeden Monat fließen automatisch 600€ extra aufs Konto. Er blickt entspannt in die Zukunft und verbringt die Wochenenden ohne Geldsorgen.

Deine Aufgabe als Affiliate ist es, die Brücke von "Vorher" zu "Nachher" zu bauen!`,
          practicalExamples: [
            'Formel für Angebote: "Erreiche [Wunschergebnis], ohne [größte Befürchtung/Schmerz]."'
          ]
        },
        understandContent: {
          coreTakeaway: 'Dein System nimmt der Zielgruppe die Hürde und führt sie vom Schmerz zum Wunsch.',
          keyPrinciples: [
            'Mache das Problem sichtbar',
            'Zeige auf, warum bisherige Versuche gescheitert sind',
            'Präsentiere deinen Weg als die einfachste Abkürzung'
          ]
        },
        actionTask: {
          instruction: 'Was ist das Hauptproblem, das dein System für deine Zielgruppe löst?',
          inputType: 'text',
          placeholder: 'z.B. Fehlende Zeit & fehlendes technisches Wissen für den Online-Start'
        }
      },
      {
        id: '2.4',
        stageId: 2,
        stageTitle: '2. Deine Richtung',
        title: 'Angebot auswählen',
        durationMinutes: 11,
        description: 'Wähle dein hochkonvertierendes Affiliate-Angebot auf Marktplätzen wie Digistore24 oder Copecart.',
        learnContent: {
          videoTitle: 'Das perfekte Partnerangebot finden & bewerten',
          videoDuration: '9:50',
          summaryText: 'Ein gutes Partnerangebot zeichnet sich aus durch: Hohe Conversion-Rate (mind. 5-10%), geringe Stornoquote, gute Provision (mind. 30-50%) und professionelle Verkaufsseite.',
          bulletPoints: [
            'Digistore24 / Copecart Marktplatz durchsuchen',
            'Achte auf die Verkaufsseite: Ist das Video überzeugend?',
            'Prüfe, ob Werbemittel (E-Mail-Vorlagen, Banner) bereitstehen'
          ],
          fullArticleGuide: `### Die Kriterien für ein Top-Affiliate-Produkt

Nicht jedes Produkt auf Marktplätzen wie Digistore24 oder CopeCart verdient deine Zeit. Bevor du ein Produkt auswählst, solltest du folgende Checkliste prüfen:

#### Die 5 Gütekriterien:
1. **Verkaufsseite mit starkem VSL (Video Sales Letter)**: Schau dir die Seite selbst an. Würdest du hier kaufen? Ist das Video professionell?
2. **Provision**: Für digitale Kurse sollten es mindestens **30% bis 50%** sein (oder wiederkehrende Monats-Provisionen).
3. **Stornoquote**: Liegt die Stornoquote unter 10%? Das spricht für hohe Kundenzufriedenheit.
4. **Bereitgestellte Werbemittel**: Gute Vendoren (Hersteller) stellen E-Mail-Vorlagen, Grafiken und Banner zur Verfügung.
5. **Eigener Promolink**: Du erhältst nach der Anmeldung einen Link mit deiner Affiliate-ID. Dieser speichert Cookies, damit dir jeder Verkauf zugeordnet wird.`,
          practicalExamples: [
            'Praxis-Tipp: Melde dich kostenlos bei Digistore24 an, suche in der Kategorie "Internetmarketing & Business" nach Bestsellern und kopiere deinen Promolink in deine Notizen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Empfehle nur Produkte, von deren Qualität und Nutzen du selbst überzeugt bist.',
          keyPrinciples: [
            'Vertrauen ist deine wichtigste Währung im Online Business',
            'Sichere dir deinen Affiliate-Promolink',
            'Teste den Verkaufsprozess als Kunde'
          ]
        },
        actionTask: {
          instruction: 'Wie heißt dein gewähltes Partnerangebot / Produkt?',
          inputType: 'text',
          placeholder: 'z.B. GOM-MAR Online-Kicker Kurs / Digistore Produkt ID'
        }
      }
    ]
  },
];

export const INITIAL_CAMPAIGN: Campaign = {
  id: 'camp-1',
  title: 'Mein erster Online-Euro',
  targetAudience: 'Einsteiger auf der Suche nach einem Nebeneinkommen',
  description: 'Geführte 5-Stufen Willkommens- & Empfehlungssequenz für neue Leads.',
  leadsCount: 37,
  status: 'active',
  createdAt: '2026-08-01',
  emails: [
    {
      id: 'mail-1',
      campaignId: 'camp-1',
      dayOffset: 0,
      title: 'Mail 1 (Sofort)',
      subject: '🎉 Hier ist deine 5-Schritte Checkliste + Willkommen!',
      previewText: 'Dein Download steht bereit. Schön, dass du dabei bist...',
      content: `Hallo [NAME],

vielen Dank für dein Vertrauen!

Hier ist wie versprochen dein Download-Link zu deiner Checkliste für dein Online-Nebeneinkommen:
👉 [LINK ZUM LEAD MAGNETEN]

In den nächsten Tagen zeige ich dir Schritt für Schritt, wie du ohne Vorkenntnisse dein eigenes System aufbaust.

Beste Grüße,
[DEIN NAME]`,
      status: 'sent',
      opensCount: 34,
      clicksCount: 28
    },
    {
      id: 'mail-2',
      campaignId: 'camp-1',
      dayOffset: 1,
      title: 'Mail 2 (Nach 1 Tag)',
      subject: '💡 Warum 90% der Anfänger scheitern (und wie du es vermeidest)',
      previewText: 'Als ich vor einigen Monaten gestartet bin, habe ich genau diesen Fehler gemacht...',
      content: `Hallo [NAME],

gestern hast du dir die Checkliste heruntergeladen. 

Weißt du, was der Hauptgrund ist, warum die meisten Menschen online nie Geld verdienen?
Sie versuchen, das Rad neu zu erfinden und verschwenden Wochen mit komplizierter Technik.

Morgen zeige ich dir die einfachste Abkürzung, die für mich alles verändert hat.

Viele Grüße,
[DEIN NAME]`,
      status: 'sent',
      opensCount: 29,
      clicksCount: 19
    },
    {
      id: 'mail-3',
      campaignId: 'camp-1',
      dayOffset: 2,
      title: 'Mail 3 (Nach 2 Tagen)',
      subject: '🛠️ Mein wichtigstes Werkzeug für automatisierte Einnahmen',
      previewText: 'Heute zeige ich dir das System, das im Hintergrund für mich arbeitet...',
      content: `Hallo [NAME],

wie versprochen zeige ich dir heute mein wichtigstes Werkzeug.

Es kombiniert eine einfache Landingpage mit automatisiertem E-Mail-Versand.
Hier kannst du dir das System in Ruhe ansehen:
👉 [AFFILIATE LINK ZUM SYSTEM]

Schau dir das kurze Erklärvideo an!

Herzliche Grüße,
[DEIN NAME]`,
      status: 'scheduled',
      requiredLessonId: '3.3',
      opensCount: 12,
      clicksCount: 8
    },
    {
      id: 'mail-4',
      campaignId: 'camp-1',
      dayOffset: 4,
      title: 'Mail 4 (Nach 4 Tagen)',
      subject: '🔒 Schritt-für-Schritt: So startet dein erstes Angebot',
      previewText: 'Hast du dir das System bereits angesehen? Hier sind 3 Praxis-Tipps...',
      content: `Hallo [NAME],

viele fragen mich: "Brauche ich eigene Produkte?"
Die klare Antwort lautet: NEIN!

Du kannst fertige, hochkonvertierende Angebote nutzen und sofort loslegen.
Schau dir hier die Schritt-für-Schritt Anleitung an:
👉 [AFFILIATE LINK ZUM ANGEBOT]

Beste Grüße,
[DEIN NAME]`,
      status: 'locked',
      requiredLessonId: '5.4'
    },
    {
      id: 'mail-5',
      campaignId: 'camp-1',
      dayOffset: 7,
      title: 'Mail 5 (Nach 7 Tagen)',
      subject: '🚀 Letzte Chance: Dein Start-Bonus wartet',
      previewText: 'Wenn du jetzt startest, lege ich meinen exklusiven KI-Prompt Guide oben drauf...',
      content: `Hallo [NAME],

wir sind jetzt seit einer Woche im Austausch. 

Wenn du heute den nächsten Schritt gehst und dein System aktivierst, schenke ich dir meinen exklusiven KI-Prompt Guide als Spezial-Bonus dazu!

Sichere dir das Angebot und deinen Bonus hier:
👉 [AFFILIATE LINK MIT BONUS]

Lass uns gemeinsam durchstarten!

Dein [DEIN NAME]`,
      status: 'locked',
      requiredLessonId: '6.2'
    }
  ]
};

export const PROMPT_LIBRARY: PromptTemplate[] = [
  {
    id: 'p1',
    category: 'Nische',
    title: 'Nischen-Profitabilitäts-Analyse',
    description: 'Analysiere eine Nische auf Kaufkraft, Probleme und Eignung für Affiliate Marketing.',
    prompt: 'Ich möchte im Markt für [NISCHE] starten. Analysiere für mich 3 konkrete Probleme dieser Zielgruppe, für die sie bereit sind, Geld auszugeben. Gib mir 3 Produktideen, die ich als Affiliate empfehlen kann.'
  },
  {
    id: 'p2',
    category: 'Content',
    title: 'Facebook Value-Post Generator',
    description: 'Erstelle einen packenden Story-Beitrag für Facebook-Gruppen, der Neugier erweckt.',
    prompt: 'Schreibe einen Facebook-Gruppen-Beitrag zum Thema [THEMA]. Nutze die Formel: Hook (Neugier) -> Kurze persönliche Story -> 3 konkrete Tipps -> sanfter Call to Action (Kommentiere "INFO" für die Checkliste). Tonfall: Ehrlich, hilfsbereit, nahbar.'
  },
  {
    id: 'p3',
    category: 'E-Mail',
    title: 'Storytelling Follow-Up Mail',
    description: 'Generiere eine E-Mail mit Aha-Moment, die Vertrauen aufbaut und zum Link führt.',
    prompt: 'Schreibe eine E-Mail für meine E-Mail-Liste in der Nische [NISCHE]. Das Ziel ist es, Vertrauen aufzubauen und neugierig auf das Produkt [PRODUKTNAME] zu machen. Erzähle eine kurze Geschichte über [SCHMERZ/AHA-MOMENT] und ende mit einem klaren Link-Button.'
  },
  {
    id: 'p4',
    category: 'Landingpage',
    title: 'High-Converting Headline Generator',
    description: 'Erhalte 5 unwiderstehliche Headlines nach der "Wie du X ohne Y"-Formel.',
    prompt: 'Generiere 5 neugierweckende Headlines für eine Lead-Landingpage. Mein Angebot ist ein kostenloser Guide zum Thema [THEMA]. Verwende die Formel: "Wie du [WUNSCHERGEBNIS] erreichst, ohne [HÄUFIGES HINDRERNIS]".'
  },
  {
    id: 'p5',
    category: 'Mindset',
    title: '30-Tage Umsetzungs-Fokussierer',
    description: 'Befreie dich von Overthinking und erhalte deine 3 wichtigsten Tages-Aufgaben.',
    prompt: 'Ich befinde mich gerade bei Lektion [LEKTION] in der GOM-MAR Academy. Mein Ziel ist es, [ZIEL] aufzubauen. Gib mir exakt 3 überschaubare Aufgaben für heute, die mich in unter 30 Minuten direkt weiterbringen.'
  }
];

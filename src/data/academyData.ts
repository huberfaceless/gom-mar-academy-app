import { Stage, Campaign, PromptTemplate } from '../types';
import { MODULES_36_TO_45 } from './modules36to45';
import { MODULES_46_TO_55 } from './modules46to55';
import { MODULES_56_TO_65 } from './modules56to65';
import { MODULES_66_TO_75 } from './modules66to75';
import { MODULES_76_TO_85 } from './modules76to85';
import { MODULES_86_TO_95 } from './modules86to95';
import { MODULES_96_TO_99 } from './modules96to99';

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
        description: 'Finde eine hochrentable Nische in den Top-3 Märkten: Gesundheit, Finanzen oder Beziehungen.',
        learnContent: {
          videoTitle: 'Die Profitabilitäts-Formel für deine Nische',
          videoDuration: '10:15',
          summaryText: 'Ein Produkt verkauft sich nur, wenn Menschen bereits aktiv nach Lösungen suchen und Geld ausgeben. Die Top-3 Evergreen-Märkte haben immer zahlungsbereite Kunden.',
          bulletPoints: [
            '1. Finanzen & Nebeneinkommen (Online Geld verdienen, Sparen, Investieren)',
            '2. Gesundheit & Fitness (Abnehmen, Muskelaufbau, Vitalität, Schlaf)',
            '3. Beziehungen & Persönlichkeit (Dating, Partnerschaft, Selbstbewusstsein)'
          ],
          fullArticleGuide: `### Die 3 Megamärkte für garantierte Nachfrage

Eine "Nische" ist ein gezielter Ausschnitt eines Gesamtmarktes. Wenn du versuchst, ein Thema zu besetzen, nach dem niemand sucht, wirst du scheitern. Gehe dorthin, wo bereits Geld ausgegeben wird!

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
  {
    id: 3,
    title: '3. Dein erstes System',
    subtitle: '🟣 AUFBAU',
    color: 'purple',
    badgeIcon: 'Cpu',
    description: 'Domain, Landingpage, Affiliate-Angebot Verknüpfung und das technische Grundgerüst.',
    lessons: [
      {
        id: '3.1',
        stageId: 3,
        stageTitle: '3. Dein erstes System',
        title: 'Domain & Markenname',
        durationMinutes: 8,
        description: 'Wähle einen einprägsamen Namen für deine Landingpage und dein System.',
        learnContent: {
          videoTitle: 'Der perfekte Domain- & Markenname',
          videoDuration: '6:45',
          summaryText: 'Deine Domain sollte kurz, verständlich und vertrauenerweckend sein. Vermeide komplizierte Schreibweisen oder Sonderzeichen.',
          bulletPoints: [
            'Beispiele: dein-nebeneinkommen.de, erfolg-mit-system.com',
            'Nutze vertrauenswürdige Endungen (.de, .com, .net)',
            'Keine Markenrechte anderer Firmen verletzen'
          ],
          fullArticleGuide: `### So wählst du eine Vertrauenswürdige Domain

Deine Domain ist die Webadresse deiner Opt-In Seite. Sie muss professionell klingen und leicht zu merken sein.

#### Regelwerk für gute Domainnamen:
1. **Verständlich & sprechend**: Der Name sollte andeuten, worum es geht (z.B. \`freiheits-formel.de\` oder \`smarter-start.de\`).
2. **Kurz halten**: Maximal 2–3 Wörter.
3. **Endungen**: In Deutschland ist \`.de\` ungeschlagener Marktführer beim Vertrauen. Für internationale Angebote wählst du \`.com\`.
4. **Keine fremden Marken**: Verwende keine geschützten Begriffe wie "Facebook", "Digistore" oder geschützte Markennamen in deiner Domain.`,
          practicalExamples: [
            'Gute Beispiele: \`starter-funnel.de\`, \`dein-online-weg.de\`, \`erfolgs-kompass.com\`.',
            'Schlechte Beispiele: \`geld-verdienen-schnell-und-reich-werden-1234.info\`.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein sauberer Domainname schafft sofortiges Erstvertrauen bei Besuchern.',
          keyPrinciples: ['Einfach zu tippen', 'Verständlich am Telefon', 'Keine Bindestrich-Orgien']
        },
        actionTask: {
          instruction: 'Trage deinen Wunschnamen oder deine Domain ein:',
          inputType: 'text',
          placeholder: 'z.B. mein-online-weg.de'
        }
      },
      {
        id: '3.2',
        stageId: 3,
        stageTitle: '3. Dein erstes System',
        title: 'Landingpage Grundlagen',
        durationMinutes: 12,
        description: 'Der Aufbau einer extrem hochkonvertierenden Opt-In Seite für die Lead-Gewinnung.',
        learnContent: {
          videoTitle: 'Anatomie einer 50%+ Opt-In Landingpage',
          videoDuration: '10:30',
          summaryText: 'Eine Lead-Landingpage hat nur EIN EINZIGES ZIEL: Die E-Mail-Adresse des Besuchers gegen deinen wertvollen Lead Magneten einzutauschen. Keine Ablenkungen, keine Fußzeilen-Links im Blickfeld.',
          bulletPoints: [
            '1. Starke Neugier-Headline (Was bekommt der Nutzer?)',
            '2. Core Benefits (3 kurze Stichpunkte)',
            '3. Opt-In Formular (E-Mail Eingabe + Button)'
          ],
          fullArticleGuide: `### Die Anatomie einer 50%+ Conversion Landingpage

Warum tragen sich auf manchen Webseiten 50 von 100 Besuchern ein, während es auf anderen nur 2 von 100 sind? Der Unterschied liegt in der Einfachheit und der psychologischen Führung.

#### Die 4 Elemente einer hochkonvertierenden Opt-In Seite:

1. **Die Haupt-Headline (Neugier-Hook)**:
   * Sie muss innerhalb von 3 Sekunden klarmachen, welchen Vorteil der Besucher hat.
   * Beispiel: *"Kostenlose Checkliste: Wie du dir in 30 Minuten am Tag dein erstes Online-Standbein aufbaust."*

2. **3 prägnante Vorteilspunkte (Bullet Points)**:
   * Zeige exakt, was im Gratis-Guide enthalten ist.
   * Beispiel: *"✓ Inklusive Schritt-für-Schritt Anleitung"*, *"✓ Ohne Vorkenntnisse verständlich"*, *"✓ Sofort als PDF zum Download"*.

3. **Das übersichtliche Formularfeld**:
   * Abfrage von Name (optional) & E-Mail-Adresse.
   * Button mit aktiver Aufforderung: *"Jetzt kostenlos herunterladen ➔"*.

4. **Vertrauens-Elemente**:
   * Hinweis: *"100% Kostenlos & Jederzeit abbestellbar. Kein Spam."*`,
          practicalExamples: [
            'Tipp: Nutze die GOM-MAR Toolbox (Landingpage Assistant), um deine Formulierungen automatisch zu optimieren.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Entferne alle Ablenkungen. 1 Seite = 1 Ziel.',
          keyPrinciples: [
            'Verwende klare Kontraste für den Button',
            'Formuliere die Headline nach der "Wie du [Wunsch] ohne [Schmerz]"-Formel',
            'Nutze die GOM-MAR Toolbox für knackige Headlines'
          ]
        },
        actionTask: {
          instruction: 'Nutze den GOM-MAR Landingpage Assistant in der Toolbox oder erstelle deine Headline:',
          inputType: 'link_toolbox',
          toolboxCategory: 'landingpage',
          placeholder: 'z.B. Wie du dir in 30 Min am Tag dein erstes Online-Nebeneinkommen aufbaust'
        }
      },
      {
        id: '3.3',
        stageId: 3,
        stageTitle: '3. Dein erstes System',
        title: 'Affiliate-Angebot Verknüpfung',
        durationMinutes: 10,
        description: 'So verbindest du dein Opt-In Formular direkt mit der Dankeseite und deinem Affiliate Link.',
        learnContent: {
          videoTitle: 'Die Weiterleitungs-Strategie (Bridge Page)',
          videoDuration: '8:15',
          summaryText: 'Sobald sich der Besucher in dein Formular einträgt, schickst du ihn auf die Dankeseite mit deinem Affiliate-Link. So verdient dein System sofort Geld, während im Hintergrund die Mails laufen!',
          bulletPoints: [
            'Eintragung -> Weiterleitung zur Dankeseite',
            'Dankeseite bestätigt Lead Magnet & zeigt sofortiges Partnerangebot',
            'Provisionen bereits ab Tag 1 möglich'
          ],
          fullArticleGuide: `### Die "Bridge Page" Strategie für sofortige Einnahmen

Der Moment direkt nach der Eintragung ist der wertvollste Augenblick im gesamten Funnel. Der Interessent ist gerade am PC oder Smartphone aufmerksam und hat Vertrauen bewiesen.

#### Der 2-Schritte Weiterleitungs-Prozess:

1. **Schritt 1 (Formular-Eintragung)**:
   * Der Nutzer gibt seine E-Mail-Adresse ein und klickt auf "Absenden".
   * Im Hintergrund wird der Kontakt in deine E-Mail Automation eingetragen.

2. **Schritt 2 (Die intelligente Dankeseite / Weiterleitung)**:
   * Anstatt nur ein trockenes "Vielen Dank" anzuzeigen, leitest du ihn auf eine Dankeseite um.
   * Dort steht: *"Vielen Dank! Dein Gratis-Guide wird gerade per E-Mail zugestellt (in 2 Minuten in deinem Postfach). Während du wartest, schau dir dieses kurze Empfehlungsvideo an:"*
   * Darunter befindet sich dein Affiliate-Button. Ein Teil der eintragenen Nutzer schaut sich das Video an und kauft direkt!`,
          practicalExamples: [
            'Effekt: Von 100 eingetragenen Leads schauen 40 das Video und 2-4 kaufen sofort das Affiliate Produkt. Du erzielst sofortige Einnahmen, noch bevor die erste Follow-Up E-Mail gesendet wurde!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Hole den Interessenten in dem Moment ab, in dem seine Aufmerksamkeit am höchsten ist.',
          keyPrinciples: [
            'Nie direkt ohne E-Mail-Eintragung auf den Affiliate Link verlinken',
            'Erst Lead sichern, dann Empfehlung aussprechen',
            'Der Lead gehört ab jetzt DIR'
          ]
        },
        actionTask: {
          instruction: 'Bestätige, dass du die Weiterleitungs-Logik verstanden hast.',
          inputType: 'checklist',
          checklistItems: [
            'Besucher trägt E-Mail ein',
            'Lead landet in GOM-MAR Mail Automation',
            'Besucher wird auf Affiliate-Dankeseite weitergeleitet'
          ]
        }
      },
      {
        id: '3.4',
        stageId: 3,
        stageTitle: '3. Dein erstes System',
        title: 'Tracking & Testdurchlauf',
        durationMinutes: 9,
        description: 'Prüfe dein gesamtes System auf Herz und Nieren, bevor du den ersten Traffic schickst.',
        learnContent: {
          videoTitle: 'System-Audit: Funktioniert alles perfekt?',
          videoDuration: '7:10',
          summaryText: 'Testen ist der Schlüssel zum Erfolg. Trage dich selbst als Test-Lead in deine Landingpage ein und prüfe, ob die Willkommens-Mail ankommt.',
          bulletPoints: [
            'Formular-Test auf Smartphone & Desktop',
            'Kontrolliere den Maileingang & Spamordner',
            'Prüfe, ob der Affiliate-Link korrekt trackt'
          ],
          fullArticleGuide: `### Die Pre-Launch Test-Checkliste

Bevor du Besucher auf deine Seite schickst, musst du sicherstellen, dass das System lückenlos funktioniert. Ein kaputter Link oder ein fehlerhaftes Formular kostet dich wertvolle Leads.

#### Teste folgende 4 Schritte selbst durch:

1. **Opt-In Test**: Öffne deine Landingpage auf dem Handy und auf dem PC. Trage eine eigene Test-E-Mail-Adresse ein.
2. **Weiterleitungs-Check**: Öffnet sich nach der Eintragung sofort deine Dankeseite/Affiliate-Seite?
3. **E-Mail Auslieferungs-Check**: Prüfe dein Postfach. Kommt die Willkommens-E-Mail innerhalb von 1–3 Minuten an? Funktionsfähig sind auch die enthaltenen Links?
4. **Affiliate-Tracking Check**: Klicke in der E-Mail auf deinen Partnerlink und prüfe in deiner Adresszeile, ob deine Affiliate-ID übergeben wird.`,
          practicalExamples: [
            'Merke: Ein 5-minütiger Test spart Ärger und garantiert, dass jeder zukünftige Besucher sauber verarbeitet wird.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein funktionierendes System gibt dir 100% Selbstbewusstsein für die Traffic-Phase.',
          keyPrinciples: ['Einmal sauber aufbauen = jahrelang nutzen', 'Fehler beim Testen finden, nicht beim Kunden']
        },
        actionTask: {
          instruction: 'Führe einen vollständigen Testlauf deines Opt-In Prozesses durch.',
          inputType: 'checklist',
          checklistItems: [
            'Test-Eintragung erfolgreich durchgeführt',
            'Dankeseite öffnet sich wie geplant',
            'GOM-MAR Mail Automation hat den Lead erfasst'
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: '4. Menschen erreichen',
    subtitle: '🟠 TRAFFIC',
    color: 'amber',
    badgeIcon: 'Share2',
    description: 'Facebook, Instagram, Pinterest & YouTube: Kostenlose Traffic-Strategien ohne Werbebudget.',
    lessons: [
      {
        id: '4.1',
        stageId: 4,
        stageTitle: '4. Menschen erreichen',
        title: 'Facebook Nischengruppen',
        durationMinutes: 11,
        description: 'Gewinne täglich 5-15 hochwertige Leads aus bestehenden Facebook-Gruppen.',
        learnContent: {
          videoTitle: 'Organischer Mehrwert-Traffic in Facebook Gruppen',
          videoDuration: '9:30',
          summaryText: 'Suche gezielt nach Gruppen, in denen deine Zielgruppe bereits aktiv diskutiert. Beantworte Fragen mit ehrlichem Mehrwert und verweise auf deinen kostenlosen Lead Magneten.',
          bulletPoints: [
            'Finde 5-10 relevante Gruppen in deiner Nische',
            'Biete echten Mehrwert statt reiner Werbe-Spam-Posts',
            'Nutze Storytelling: "Wie ich mein Problem gelöst habe..."'
          ],
          fullArticleGuide: `### Organische Lead-Gewinnung in Facebook Nischengruppen

In Facebook-Gruppen halten sich täglich Millionen Menschen auf, die sich über spezifische Themen austauschen. Du musst diese Menschen nicht suchen – sie sind bereits in Gruppen versammelt!

#### Die Mehrwert-Formel für Gruppen-Posts:

1. **Kein stumpfer Werbe-Spam**: Posts wie *"Geld verdienen hier klicken link.de"* werden sofort gelöscht und führen zu Sperrungen.
2. **Die "Story + Mehrwert" Strategie**:
   * Erzähle eine persönliche Erfahrung oder Beobachtung.
   * Teile 3 nützliche Tipps zu deiner Nische.
   * Ende mit einer neugierweckenden Frage: *"Ich habe dazu eine kompakte Übersicht als PDF zusammengestellt. Wer sie haben möchte, schreibt einfach 'INFO' in die Kommentare."*
3. **Die Kommentar-Strategie**:
   * Jeder, der kommentiert, erhält von dir eine freundliche Direktnachricht mit dem Link zu deiner Landingpage!`,
          practicalExamples: [
            'Beispiel-Post: "Hi zusammen! Ich habe lange gekämpft, um berufsbegleitend Zeit für mein Nebeneinkommen zu finden. Hier sind die 3 Routinen, die mir geholfen haben... Wenn jemand die Checkliste dazu möchte, gerne melden!" -> Generiert 20-40 Kommentare.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Gute Beiträge lösen Diskussionen aus und ziehen Interessenten automatisch auf dein Profil.',
          keyPrinciples: [
            'Helfer-Syndrom nutzen: Hilf zuerst, verkaufe danach',
            'Optimiere dein eigenes Profil als Landingpage',
            'Nutze den GOM-MAR Content Generator für Beitrags-Ideen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen ersten Gruppen-Beitrag mit der GOM-MAR Toolbox:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'z.B. Facebook Mehrwert-Post entworfen'
        }
      },
      {
        id: '4.2',
        stageId: 4,
        stageTitle: '4. Menschen erreichen',
        title: 'Instagram Reels & Storys',
        durationMinutes: 12,
        description: 'Reichweite aufbauen mit kurzen, knackigen Reels und Interaktions-Storys.',
        learnContent: {
          videoTitle: 'Das 3-Sekunden Reel Rezept für Reichweite',
          videoDuration: '10:15',
          summaryText: 'Instagram liefert mit Reels enorme kostenlose Reichweite. Der Aufbau ist immer: 1. Hook (Neugier-Aufhänger), 2. Mehrwert (3 Tipps), 3. Call-To-Action ("Kommentiere STARTE für die Anleitung").',
          bulletPoints: [
            'Visuelle Hook in den ersten 3 Sekunden',
            'Nutze Trend-Audios & verständliche Untertitel',
            'Nutze automatisierte DMs (z.B. Kommentare schicken Link)'
          ],
          fullArticleGuide: `### Kurzvipdeor-Reichweite mit Instagram Reels

Instagram belohnt kurze Videos (Reels), die die Aufmerksamkeit von Nutzern fesseln. Du musst dafür nicht einmal dein Gesicht zeigen ("Faceless Channels" nutzen Bildschirmaufnahmen, Naturaufnahmen oder Ästhetik-Videos).

#### Die 3 Bausteine eines erfolgreichen Reels:

1. **Hook (0-3 Sekunden)**: Ein starker Text im Video. Z.B.: *"3 Dinge, die dir niemand über Online-Nebeneinkommen verrät."*
2. **Mehrwert (3-12 Sekunden)**: Kurze, prägnante Stichpunkte im Textbereich oder der Caption.
3. **Call-To-Action (Ende)**: *"Schreibe 'START' in die Kommentare und ich sende dir die kostenlose Anleitung per DM!"*`,
          practicalExamples: [
            'Faceless-Reel: Du filmst, wie du am Schreibtisch einen Kaffee eingießt. Auf dem Bild steht der Hook-Text. In der Bildunterschrift stehen 3 Tipps und der Link-Hinweis.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Reels ziehen neue Zuschauer an, Storys verwandeln Follower in dankbare Leads.',
          keyPrinciples: ['Kürzer ist besser (7-15 Sekunden)', 'Neugier vor Fachchinesisch', 'Regelmäßigkeit schlägt Einzellust']
        },
        actionTask: {
          instruction: 'Entwirf eine Reel-Idee für deine Nische:',
          inputType: 'text',
          placeholder: 'z.B. 3 Dinge, die du über Online-Einkommen nicht gewusst hast'
        }
      },
      {
        id: '4.3',
        stageId: 4,
        stageTitle: '4. Menschen erreichen',
        title: 'Pinterest & YouTube Evergreen',
        durationMinutes: 10,
        description: 'Suchmaschinen-Traffic aufbauen, der auch nach Monaten noch kontinuierlich Klicks bringt.',
        learnContent: {
          videoTitle: 'Passiver Traffic durch Visuelle Suchmaschinen',
          videoDuration: '8:50',
          summaryText: 'Im Gegensatz zu Social Media, wo Posts nach 24 Std verschwinden, sind Pinterest und YouTube visuelle Suchmaschinen. Ein guter Pin bringt über Jahre hinweg tägliche Besucher auf deine Landingpage.',
          bulletPoints: [
            'Pinterest Pins verlinken direkt auf deine Landingpage',
            'Nutze relevante Keywords im Titel & Beschreibung',
            'YouTube Shorts als Beschleuniger nutzen'
          ],
          fullArticleGuide: `### Nachhaltiger "Evergreen" Traffic

Während Instagram-Posts schnell im Feed nach unten rutschen, funktionieren **Pinterest** und **YouTube** wie Suchmaschinen (ähnlich wie Google). Ein Beitrag, den du heute veröffentlichst, kann dir noch in 12 Monaten täglich neue Besucher bringen.

#### Pinterest Marketing in 3 Schritten:
1. Erstelle vertikale Grafiken (1080x1920 px) in Canva.
2. Schreibe Keyword-reiche Titel (z.B. *"Anleitung: Nebeneinkommen von zuhause aufbauen"*).
3. Verlinke den Pin direkt mit deiner Opt-In Landingpage.`,
          practicalExamples: [
            'Ergebnis: Ein einziger erfolgreicher Pin kann über Monate hinweg 300-500 Klicks jeden Monat erzeugen, ohne dass du täglich neue Posts erstellen musst.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Evergreen Traffic baut dir dein digitales Fundament für langfristigen Erfolg auf.',
          keyPrinciples: ['Erstelle Canva-Vorlagen für schnelle Pins', 'Keywords sind der Schlüssel zum Ranking']
        },
        actionTask: {
          instruction: 'Plane deine ersten 3 Pinterest Pins mit Unterstützung der Toolbox.',
          inputType: 'checklist',
          checklistItems: [
            'Konto auf Pinterest erstellt/eingerichtet',
            '3 Keyword-Phrasen identifiziert',
            'Pins erstellt und mit Landingpage verlinkt'
          ]
        }
      },
      {
        id: '4.4',
        stageId: 4,
        stageTitle: '4. Menschen erreichen',
        title: 'Dein 7-Tage Traffic-Plan',
        durationMinutes: 8,
        description: 'Bringe Struktur in deinen Alltag: Nur 30 Minuten tägliche Umsetzung für stetige Leads.',
        learnContent: {
          videoTitle: 'Der 30-Minuten Tages-Workflow',
          videoDuration: '6:40',
          summaryText: 'Erfolg kommt nicht von einmaligen Aktionen, sondern von täglichen Routinen. 30 Minuten pro Tag genügen vollkommen.',
          bulletPoints: [
            'Tag 1-3: Facebook Value Posts & Kommentare',
            'Tag 4-5: Instagram Reel + Story Interaktion',
            'Tag 6-7: Pinterest Pins veröffentlichen & Ergebnisse auswerten'
          ],
          fullArticleGuide: `### Der strukturiere 30-Minuten-Tagesplan

Erfolg im Online-Business erfordert keine 8 Stunden Arbeit täglich. Es erfordert Disziplin bei kleinen, täglichen Schritten.

#### Dein Wochenplan:
* **Montag bis Mittwoch (15 Min)**: 1 Mehrwert-Post in 2 Facebook-Gruppen teilen & Fragen beantworten.
* **Donnerstag bis Freitag (15 Min)**: 1 Kurzvideo (Reel/Short) veröffentlichen und DMs beantworten.
* **Samstag (15 Min)**: 3 Pinterest Pins planen.
* **Sonntag**: Ruhe-Tag & Auswertung deiner eingegangenen Leads!`,
          practicalExamples: [
            'Nach 30 Tagen: Du hast 20 Gruppenposts, 10 Reels und 15 Pins veröffentlicht. Dein System hat 50–150 Leads generiert und deine ersten Verkäufe erzielt!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Mach den Traffic-Plan zu deiner täglichen Gewohnheit.',
          keyPrinciples: ['Feste Zeiten einplanen', 'Fokus auf Lead-Anzahl statt Follower-Zahl']
        },
        actionTask: {
          instruction: 'Verpflichte dich auf deine wöchentliche Traffic-Zeit:',
          inputType: 'choice',
          placeholder: '30 Minuten täglich fest einplanen'
        }
      }
    ]
  },
  {
    id: 5,
    title: '5. Interessenten gewinnen',
    subtitle: '🟡 LEADS',
    color: 'yellow',
    badgeIcon: 'Mail',
    description: 'E-Mail Autoresponder, Lead Magneten, Opt-in Seiten & automatisierte Follow-up Serien.',
    lessons: [
      {
        id: '5.1',
        stageId: 5,
        stageTitle: '5. Interessenten gewinnen',
        title: 'Autoresponder Grundlagen',
        durationMinutes: 10,
        description: 'Deine E-Mail Liste ist dein wertvollstes Kapital. So baust du Vertrauen auf Vorrat auf.',
        learnContent: {
          videoTitle: 'Warum die E-Mail Liste unbezahlbar ist',
          videoDuration: '8:20',
          summaryText: 'Social Media Kanäle können dein Konto von heute auf morgen sperren. Deine E-Mail-Liste hingegen gehört DIR. Sie ist eine direkte Pipeline zu deinen Interessenten.',
          bulletPoints: [
            '100% Unabhängigkeit von Algorithmen',
            'Hohe Kaufabsicht bei E-Mail-Lesern',
            'Automatisierter Versand rund um die Uhr'
          ],
          fullArticleGuide: `### Warum die E-Mail Liste die "Geld-Druckmaschine" im Online-Business ist

So gut wie alle erfolgreichen Digital-Unternehmer teilen dieselbe Erkenntnis: **"The Money is in the List"** (Das Geld liegt in der Liste).

#### Die Gründe für die Überlegenheit von E-Mail Marketing:

1. **Eigentum statt Miete**: Ein Social-Media Account gehört der Plattform. Eine E-Mail-Liste (CSV-Datei deiner Kontakte) gehört zu 100% dir.
2. **Direkte Zustellung**: Während Social Media Posts nur an 5-10% deiner Follower ausgespielt werden, landet deine E-Mail direkt im persönlichen Postfach deines Lesers.
3. **Hohe Kaufbereitschaft**: E-Mail-Empfänger haben sich freiwillig eingetragen. Sie wollen deine Tipps und Empfehlungen lesen!`,
          practicalExamples: [
            'Rechenbeispiel: Bei 500 E-Mail-Abonnenten und einer monatlichen Empfehlung, die von 3% gekauft wird (15 Verkäufe x 40€ Provision) verdienst du 600€ monatlich – wiederkehrend!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Pro E-Mail-Abonnent rechnet man im Schnitt mit 1€ bis 3€ wiederkehrendem Monatsumsatz.',
          keyPrinciples: [
            'Schütze die Beziehung zu deiner Liste',
            'Echte Hilfe in jeder einzelnen Mail',
            'Nutze die integrierte GOM-MAR Mail Automation'
          ]
        },
        actionTask: {
          instruction: 'Öffne die GOM-MAR Mail Automation und erstelle deine erste Kampagne "Mein erster Online-Euro":',
          inputType: 'checklist',
          checklistItems: [
            'GOM-MAR Mail Automation geöffnet',
            'Kampagne angelegt',
            'Sequenz-Übersicht bereitgestellt'
          ]
        }
      },
      {
        id: '5.2',
        stageId: 5,
        stageTitle: '5. Interessenten gewinnen',
        title: 'Lead Magneten erstellen',
        durationMinutes: 11,
        description: 'Entwickle ein unwiderstehliches Mini-Geschenk (Checkliste, PDF, Spickzettel) in unter 30 Minuten.',
        learnContent: {
          videoTitle: 'Der perfekte Lead Magnet in 3 Steps',
          videoDuration: '9:15',
          summaryText: 'Niemand will ein 200-Seiten E-Book lesen. Menschen wollen schnelle, sofort anwendbare Lösungen: Eine 1-Seitige Checkliste, ein Cheat-Sheet oder eine Vorlage.',
          bulletPoints: [
            'Schneller Konsum (in unter 5 Minuten durchgearbeitet)',
            'Beseitigt genau 1 konkretes Einstiegsproblem',
            'Macht Lust auf das weiterführende Affiliate-Produkt'
          ],
          fullArticleGuide: `### Die Formel für unwiderstehliche Lead Magneten

Ein Lead Magnet (Gratis-Geschenk) dient als Tauschmittel: E-Mail-Adresse gegen schnellen Mehrwert.

#### Die besten Formate für Einsteiger:
* **Die 1-Seitige Checkliste**: "Die 5-Punkte Checkliste für den Start ins Online-Nebeneinkommen".
* **Das Spickzettel / Cheat-Sheet**: "Die 10 besten KI-Prompts für Facebook Beiträge".
* **Die Vorlage / Template**: "E-Mail Vorlage für den ersten Kundenkontakt".

Halte es kurz! Ein Lead Magnet, der in 3 Minuten gelesen und angewendet werden kann, erzeugt sofort Begeisterung.`,
          practicalExamples: [
            'Erstellung mit Canva: Wähle eine Din-A4 Vorlage, trage deine 5 Schritte ein und lade sie als PDF herunter. Dauer: 20 Minuten.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Der Lead Magnet gibt die Kostprobe – das Affiliate Produkt ist das Hauptgericht.',
          keyPrinciples: ['Kompakt & wertvoll', 'Gutmütig gestaltet', 'Sofort als PDF lieferbar']
        },
        actionTask: {
          instruction: 'Wie lautet der Titel deines Lead Magneten?',
          inputType: 'text',
          placeholder: 'z.B. Die 5-Schritte Checkliste für dein erstes Online-Nebeneinkommen'
        }
      },
      {
        id: '5.3',
        stageId: 5,
        stageTitle: '5. Interessenten gewinnen',
        title: 'Opt-In & Willkommens-Mail',
        durationMinutes: 9,
        description: 'Mail 1 der Sequenz: Wie du sofort Begeisterung auslöst und den Lead Magneten auslieferst.',
        learnContent: {
          videoTitle: 'Anatomie der perfekten Welcome-Mail',
          videoDuration: '7:40',
          summaryText: 'Die Welcome-Mail wird von über 70% der Leser geöffnet! Nutze diesen Moment: liefere das Geschenk sofort, bedanke dich und stelle eine Neugier-Frage für Mail 2.',
          bulletPoints: [
            'Betreff: "Deine Checkliste + Wichtige Info für dich [Download]"',
            'Direkter Link zum PDF/Geschenk im ersten Absatz',
            'Ankündigung, was in den nächsten Tagen spannendes folgt'
          ],
          fullArticleGuide: `### Aufbau der Willkommens-E-Mail (Mail 1)

Deine erste E-Mail hat die höchste Öffnungsrate (oft über 60–70%). Verfehle diesen Moment nicht durch lange Monologe!

#### Der ideale Mail-Aufbau:
1. **Betreffzeile**: Klare Ankündigung (z.B. *"[Download] Hier ist deine Checkliste + wichtige Info"*).
2. **Geschenk-Auslieferung**: Direkt im ersten Absatz den Download-Link platzieren.
3. **Erwartungshaltung aufbauen**: Teile kurz mit, wer du bist und kündige an, dass du morgen eine wichtige Entdeckung mit dem Leser teilst.`,
          practicalExamples: [
            'Nutze das vorgefertigte E-Mail Template in der GOM-MAR Mail Automation!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Der erste Eindruck entscheidet darüber, ob deine zukünftigen Mails gelesen oder ignoriert werden.',
          keyPrinciples: ['Versand sofort nach Eintragung', 'Klare Betreffzeile', 'Freundlicher Ton auf Augenhöhe']
        },
        actionTask: {
          instruction: 'Nutze den E-Mail Generator in der Toolbox und füge Mail 1 in deine Mail Automation ein:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Welcome Mail vorbereitet'
        }
      },
      {
        id: '5.4',
        stageId: 5,
        stageTitle: '5. Interessenten gewinnen',
        title: 'Automatisierte Follow-Up Serie',
        durationMinutes: 13,
        description: 'Der 5-Tage E-Mail Sequenzer: So baust du automatisch Vertrauen auf und empfiehlst Angebote.',
        learnContent: {
          videoTitle: 'Die 5-Mails Verkaufs-Formel',
          videoDuration: '11:00',
          summaryText: 'Die meisten Verkäufe entstehen erst zwischen der 3. und 7. E-Mail! Durch die GOM-MAR Mail Automation läuft diese Serie vollautomatisch ab.',
          bulletPoints: [
            'Mail 1 (Sofort): Willkommen & Lead Magnet Download',
            'Mail 2 (+1 Tag): Die Geschichte dahinter / Dein Aha-Moment',
            'Mail 3 (+2 Tage): Der größte Fehler deiner Zielgruppe',
            'Mail 4 (+4 Tage): Die Lösung vorstellen + Affiliate Link',
            'Mail 5 (+7 Tage): Häufige Fragen & finale Empfehlung'
          ],
          fullArticleGuide: `### Die 5-Stufen Follow-Up Formel für automatisierte Sales

Ein Interessent kauft selten beim ersten Kontakt. Es braucht Vertrauen und mehrfache Berührungspunkte. Eine automatisierte Sequenz erledigt das für dich.

#### Die 5 E-Mails im Überblick:
* **Mail 1 (Tag 0)**: Willkommen + Gratis Download.
* **Mail 2 (Tag 1)**: Story & Identifikation ("Warum ich damals am selben Punkt stand...").
* **Mail 3 (Tag 2)**: Aufklärung über den Denkfehler ("Warum Fleiß allein nicht reicht...").
* **Mail 4 (Tag 4)**: Vorstellung des Empfehlungssystems + Affiliate-Link ("Hier ist die Abkürzung...").
* **Mail 5 (Tag 7)**: Beantwortung von Fragen & Erinnerung an den Bonus.`,
          practicalExamples: [
            'Alle 5 E-Mails sind in der GOM-MAR Mail Automation bereits als Vorlage enthalten und müssen nur noch angepasst werden!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Automatisierte Mails verkaufen für dich, während du mit Freunden unterwegs bist.',
          keyPrinciples: [
            'Echte Storys verpacken',
            '80% Mehrwert & Vertrauen, 20% Kaufempfehlung',
            'Automatische Abstände einhalten'
          ]
        },
        actionTask: {
          instruction: 'Aktiviere alle 5 E-Mails in deiner GOM-MAR Mail Automation:',
          inputType: 'checklist',
          checklistItems: [
            'Mail 1 eingerichtet (Sofort)',
            'Mail 2 eingerichtet (Tag 1)',
            'Mail 3 eingerichtet (Tag 2)',
            'Mail 4 eingerichtet (Tag 4)',
            'Mail 5 eingerichtet (Tag 7)'
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: '6. Aus Besuchern Kunden machen',
    subtitle: '🔴 MONETARISIERUNG',
    color: 'red',
    badgeIcon: 'TrendingUp',
    description: 'Affiliate Marketing Psychologie, Conversion-Steigerung & langfristige Vertrauensbildung.',
    lessons: [
      {
        id: '6.1',
        stageId: 6,
        stageTitle: '6. Aus Besuchern Kunden machen',
        title: 'E-Mail Monetarisierung',
        durationMinutes: 10,
        description: 'Verwandle interessierte Leser schrittweise in begeisterte Käufer ohne Druck.',
        learnContent: {
          videoTitle: 'Verkaufen durch ehrliche Empfehlung',
          videoDuration: '8:45',
          summaryText: 'Menschen hassen es, etwas verkauft zu bekommen, aber sie LIEBEN es zu kaufen! Zeige ehrlich auf, warum du das Produkt selbst schätzt und welchen konkreten Nutzen es bringt.',
          bulletPoints: [
            'Erkläre den "Vorher-Nachher" Effekt',
            'Zeige echte Resultate oder Demos',
            'Platziere den Call To Action Link gut sichtbar'
          ],
          fullArticleGuide: `### Ehrlich Verkaufen durch Empfehlungs-Marketing

Echte Monetarisierung entsteht durch Vertrauen. Wenn deine Leser merken, dass du ihnen wirklich helfen willst, folgen sie deinen Empfehlungen gerne.

#### Die 3 Grundregeln der Monetarisierung:
1. **Framing als Abkürzung**: Zeige auf, dass das Produkt dem Leser Zeit und Fehlversuche erspart.
2. **Klarer Call To Action (CTA)**: Der Link-Button muss eindeutig beschriftet sein (z.B. *"👉 Hier klicken und das System freischalten"*).
3. **Einwandbehandlung**: Gehe proaktiv auf Zweifel ein ("Brauche ich Vorkenntnisse? Nein, weil...").`,
          practicalExamples: [
            'Nutze die E-Mail Vorlagen im GOM-MAR E-Mail Generator.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein guter Verkäufer ist ein Berater, der dem Kunden hilft, die beste Entscheidung für sich zu treffen.',
          keyPrinciples: ['Keine falschen Versprechungen', 'Verständliche Sprache', 'Klarer Nutzen']
        },
        actionTask: {
          instruction: 'Erstelle eine Verkaufs-Mail mit dem E-Mail Generator in der Toolbox:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Verkaufs-Mail generiert'
        }
      },
      {
        id: '6.2',
        stageId: 6,
        stageTitle: '6. Aus Besuchern Kunden machen',
        title: 'Conversion Booster & Boni',
        durationMinutes: 11,
        description: 'Vervielfache deine Verkäufe durch exklusive Zusatzboni und sanfte Verknappung.',
        learnContent: {
          videoTitle: 'Der Bonus-Hebel für Affiliate Verkäufe',
          videoDuration: '9:20',
          summaryText: 'Warum sollte jemand ausgerechnet über DEINEN Affiliate-Link kaufen? Weil du ihm einen unschlagbaren Extra-Bonus dazu schenkst (z.B. deine persönliche Checkliste oder KI-Prompt Sammlung)!',
          bulletPoints: [
            'Erstelle einen einfachen Zusatz-Bonus',
            'Nutze Verknappung (z.B. "Nur für die ersten 20 Käufer")',
            'Erhöht die Kaufquote oft um 200-300%'
          ],
          fullArticleGuide: `### Der Bonus-Hebel für maximale Verkaufszahlen

Wenn 10 Affiliates dasselbe Produkt bewerben, warum kaufen Interessenten bei DIR? Die Antwort heißt: **Exklusiver Bonus**.

#### Was eignet sich als Bonus?
* Eine persönliche Checkliste.
* Ein kurzes 5-Minuten Erklärvideo.
* Deine persönliche Prompts-Sammlung.

Wer über deinen Link kauft, schickt dir den Kaufbeleg per Mail und erhält sofort deinen exklusiven Bonus zugesendet!`,
          practicalExamples: [
            'Beispiel: "Kaufe den Kurs über meinen Link und du erhältst meine 10 erprobten KI-Prompts gratis dazu!"'
          ]
        },
        understandContent: {
          coreTakeaway: 'Boni sind der stärkste Grund für Interessenten, nicht beim Hersteller direkt, sondern über DICH zu kaufen.',
          keyPrinciples: ['Bonus muss zum Hauptprodukt passen', 'Einfache Auslieferung per Mail']
        },
        actionTask: {
          instruction: 'Welchen Bonus könntest du deinen Käufern anbieten?',
          inputType: 'text',
          placeholder: 'z.B. Meine 10 besten KI-Prompts für Facebook Posts als PDF'
        }
      },
      {
        id: '6.3',
        stageId: 6,
        stageTitle: '6. Aus Besuchern Kunden machen',
        title: 'Vertrauen & Social Proof',
        durationMinutes: 9,
        description: 'Nutze Erfahrungsberichte, Kundenstimmen und Transparenz für maximale Glaubwürdigkeit.',
        learnContent: {
          videoTitle: 'Social Proof im E-Mail Marketing einbinden',
          videoDuration: '7:35',
          summaryText: 'Menschen orientieren sich am Verhalten anderer. Zitate, Kundenstimmen oder kurze Erfahrungsberichte nehmen die allerletzten Zweifel.',
          bulletPoints: [
            'Binde kurze Zitate in deine Follow-up Mails ein',
            'Teile eigene Etappen-Erfolge ehrlich mit deiner Community',
            'Beantworte häufige Einwände proaktiv'
          ],
          fullArticleGuide: `### Social Proof als Überzeugungs-Booster

Menschen vertrauen den Erfahrungen anderer Kunden mehr als jeder Werbeanzeige.

#### Formen von Social Proof:
* **Zitate & Screenshots**: Echte Rückmeldungen anderer Absolventen.
* **Fallstudien**: "Wie Markus in 14 Tagen seine ersten 3 Leads gewann".
* **Transparenz**: Zeige ehrlich, was funktioniert und was nicht.`,
          practicalExamples: [
            'Binde Zitate anderer erfolgreicher Kursteilnehmer direkt in deine Verkaufs-Mails ein.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Vertrauen ist unbezahlbar. Wer einmal ehrlich beraten wird, kauft auch in Zukunft bei dir.',
          keyPrinciples: ['Glaubwürdigkeit vor Angeberei', 'Echte Stories schlagen Werbesprüche']
        },
        actionTask: {
          instruction: 'Bestätige, dass du Einwandbehandlung & Vertrauensaufbau in deine Sequenz integriert hast.',
          inputType: 'checklist',
          checklistItems: [
            'Häufige Kundenfragen identifiziert',
            'In E-Mail 5 eingebaut',
            'Echtes Feedback/Demos verlinkt'
          ]
        }
      },
      {
        id: '6.4',
        stageId: 6,
        stageTitle: '6. Aus Besuchern Kunden machen',
        title: 'Erste Einnahmen & Auswertung',
        durationMinutes: 10,
        description: 'Analysiere deine Kennzahlen (Öffnungsrate, Klickrate, Sales) und feiere deinen ersten Erfolg!',
        learnContent: {
          videoTitle: 'Deine ersten Provisionen & Datenanalyse',
          videoDuration: '8:10',
          summaryText: 'Sobald die ersten Leads dein System durchlaufen, entstehen erste Provisionen. Analysiere, welche Mails am besten geöffnet und geklickt werden.',
          bulletPoints: [
            'Ziel Öffnungsrate: > 30-40%',
            'Ziel Klickrate: > 5-10%',
            'Provisionen im Affiliate Dashboard überprüfen'
          ],
          fullArticleGuide: `### Kennzahlen verstehen & erste Provisionen feiern

Gratulation zu deinen ersten Resultaten! Jetzt geht es darum, die Zahlen zu verstehen.

#### Die 3 wichtigsten Metriken:
1. **Öffnungsrate (Open Rate)**: Wie viele Empfänger öffnen deine Mail? (Ziel: 30%+).
2. **Klickrate (CTR)**: Wie viele Leser klicken auf den enthaltenen Link? (Ziel: 5%+).
3. **Conversion Rate**: Wie viele Leser kaufen auf der Zielseite? (Ziel: 1–3%).`,
          practicalExamples: [
            'Wenn eine Mail eine niedrige Öffnungsrate hat, verbessere die Betreffzeile!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Was gemessen wird, kann verbessert werden!',
          keyPrinciples: ['A/B Testing von Betreffzeilen', 'Feinschliff an den Schwachstellen']
        },
        actionTask: {
          instruction: 'Was tust du mit deinem allerersten verdienten Online-Euro?',
          inputType: 'text',
          placeholder: 'z.B. Reinvestieren in Domain / Feiern gehen!'
        }
      }
    ]
  },
  {
    id: 7,
    title: '7. Dein System läuft',
    subtitle: '🟢 AUTOMATISIERUNG',
    color: 'emerald',
    badgeIcon: 'Sparkles',
    description: 'Vollständige Automatisierung, KI-Nutzung, Skalierung & das Upgrade zum Online Entrepreneur.',
    lessons: [
      {
        id: '7.1',
        stageId: 7,
        stageTitle: '7. Dein System läuft',
        title: 'Vollständige Automatisierung',
        durationMinutes: 12,
        description: 'Lass KI und automatisierte Workflows 90% der täglichen Arbeit für dich erledigen.',
        learnContent: {
          videoTitle: 'Der 100% Automations-Stack',
          videoDuration: '10:00',
          summaryText: 'Dein System ist nun komplett eingerichtet. Traffic fließt auf die Landingpage, Leads tragen sich ein, GOM-MAR Mail Automation versendet die Mails, und Käufe werden automatisch abgewickelt.',
          bulletPoints: [
            'KI generiert wöchentlich neuen Content in Sekunden',
            'E-Mail Sequenzen laufen monatelang ohne manuelles Zutun',
            'Du musst nur noch wöchentlich Kennzahlen prüfen'
          ],
          fullArticleGuide: `### Der 100% Automatisierungs-Modus

Du hast den Gipfel der GOM-MAR Academy erreicht! Dein digitales System läuft nun wie ein Schweizer Uhrwerk.

#### Der automatisierte Ablauf:
1. **Traffic**: Läuft über erstellte Reels, Facebook Posts und Pins dauerhaft weiter.
2. **Opt-In**: Interessenten tragen sich auf deiner Landingpage ein.
3. **Mail-Versand**: GOM-MAR Mail Automation übernimmt die Ansprache & Verkäufe.
4. **Provisionen**: Werden direkt auf dein Konto gutgeschrieben.`,
          practicalExamples: [
            'Deine Hauptaufgabe beschränkt sich nun auf 30 Minuten wöchentliches Monitoring und Content-Updates mit der GOM-MAR KI Toolbox.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Du hast dir ein echtes, funktionierendes Online-Nebeneinkommen-System aufgebaut.',
          keyPrinciples: ['System schlägt Arbeitszeit', 'Skalierung durch Mehr-Traffic']
        },
        actionTask: {
          instruction: 'Bestätige die Aktivierung aller System-Komponenten:',
          inputType: 'checklist',
          checklistItems: [
            'Landingpage ist live',
            'GOM-MAR Mail Automation läuft',
            'Traffic-Quellen sind eingerichtet',
            'KI-Tools zur Unterstützung aktiv'
          ]
        }
      },
      {
        id: '7.2',
        stageId: 7,
        stageTitle: '7. Dein System läuft',
        title: 'Skalierung & Zweites Angebot',
        durationMinutes: 11,
        description: 'Binde weitere passende Partnerangebote ein und steigere deinen Customer Lifetime Value.',
        learnContent: {
          videoTitle: 'Vom ersten Euro zu vierstelligen Monatseinnahmen',
          videoDuration: '9:15',
          summaryText: 'Wenn dein System für 1 Lead funktioniert, funktioniert es auch für 100 oder 1000 Leads. Du kannst deinen Abonnenten nun in Folge-Mails weitere nützliche Tools & Kurse empfehlen.',
          bulletPoints: [
            'Erweitere deine E-Mail Sequenz um weitere Mails',
            'Empfehle weiterführende Ergänzungsprodukte',
            'Baue eine langfristige Marke in deiner Nische auf'
          ],
          fullArticleGuide: `### Skalierung & Vervielfachung deiner Einnahmen

Ein Kunde, der einmal über deinen Link gekauft hat und zufrieden ist, wird auch deine nächsten Empfehlungen schätzen.

#### Wie du deine Einnahmen verdoppelst:
* Füge nach Tag 14 der E-Mail Sequenz ein zweites passendes Partnerprodukt ein.
* Sende einmal pro Woche einen manuellen "Broadcast Newsletter" mit aktuellen KI-News oder Tipps.`,
          practicalExamples: [
            'Beispiel: Nach dem Kicker-Kurs empfiehlst du im Monat 2 ein passendes E-Mail-Tool oder ein KI-Software-Abo mit wiederkehrender monatlicher Provision.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Bestehende Kontakte zu bespielen ist 5x günstiger als neue Kontakte zu gewinnen.',
          keyPrinciples: ['Erweitere deinen E-Mail Funnel', 'Regelmäßige Newsletter versenden']
        },
        actionTask: {
          instruction: 'Gehe in die Toolbox & erstelle eine Folge-Mail für ein zweites Produkt:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Folge-Mail erstellt'
        }
      },
      {
        id: '7.3',
        stageId: 7,
        stageTitle: '7. Dein System läuft',
        title: 'Online Entrepreneur Meilenstein',
        durationMinutes: 8,
        description: 'Herzlichen Glückwunsch! Du hast die sieben Kernetappen abgeschlossen und einen wichtigen Lernmeilenstein erreicht.',
        learnContent: {
          videoTitle: 'Dein neuer Weg als Online Entrepreneur',
          videoDuration: '6:30',
          summaryText: 'Du hast die Grundlagen eines Online-Einkommenssystems erarbeitet und getestet. Bleibe am Ball, prüfe deine Ergebnisse und entwickle dein System Schritt für Schritt weiter.',
          bulletPoints: [
            'Alle sieben Kernetappen abgeschlossen',
            'Integrierte Mail-Automation & KI-Tools einsatzbereit',
            'Zugang zur GOM-MAR Pro Community freigeschaltet'
          ],
          fullArticleGuide: `### Herzlichen Glückwunsch, Online Entrepreneur! 🎉

Du hast den Kernpfad der GOM-MAR Academy durchgearbeitet und wichtige Grundlagen in der Praxis umgesetzt.

Du hast nun wichtige Bausteine für ein digitales Nebeneinkommenssystem vorbereitet:
* **Eine glasklare Nische & Zielgruppe**
* **Eine funktionsfähige Opt-In Landingpage**
* **Eine automatisierte GOM-MAR Mail-Automation**
* **Laufende Traffic-Routinen & KI-Unterstützung**

Halte das Rad am Laufen, bleibe fokussiert und genieße deinen Weg zu mehr finanzieller und zeitlicher Freiheit!`,
          practicalExamples: [
            'Prüfe, ob die Voraussetzungen für deinen GOM-MAR-Abschlussnachweis erfüllt sind.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Glückwunsch zu diesem Lernmeilenstein. Nachhaltiger Fortschritt entsteht durch weitere Umsetzung, Messung und Verbesserung.',
          keyPrinciples: ['Niemals aufhören zu lernen', 'Community nutzen & Erfahrungen teilen']
        },
        actionTask: {
          instruction: 'Schließe das letzte Kernmodul ab und dokumentiere deine nächste Überprüfung:',
          inputType: 'checklist',
          checklistItems: [
            'Ich habe alle Kernaufgaben abgeschlossen',
            'Ich habe geprüft, wie mein System funktioniert und was noch verbessert werden muss',
            'Ich habe die nächste sichere und realistische Verbesserung dokumentiert'
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: '8. Bonus & Mastermind',
    subtitle: 'Exklusive Skalierung & VIP Strategien',
    color: 'from-amber-500 to-orange-600',
    badgeIcon: 'workspace_premium',
    description: 'Fortgeschrittene Wachstums-Hacks, High-Ticket Funnels & exklusive VIP-Ressourcen für maximale Resultate.',
    lessons: [
      {
        id: '8.1',
        stageId: 8,
        stageTitle: '8. Bonus & Mastermind',
        title: 'Die 10x Skalierungs-Formel',
        durationMinutes: 14,
        description: 'Vom organischen Nebeneinkommen zum skalierbaren Business mit bezahltem Traffic & Re-Investment.',
        learnContent: {
          videoTitle: 'Skalieren ohne Risiko: Der Re-Investment Kreislauf',
          videoDuration: '11:20',
          summaryText: 'Sobald deine ersten organischen Verkäufe erzielt wurden, investierst du einen Teil der Einnahmen gezielt in bezahlte Werbeanzeigen (Meta Ads, Google Search) oder Kooperationen.',
          bulletPoints: [
            'Re-Investiere 30-50% deiner ersten Einnahmen',
            'Skaliere Gewinne mit gezielten Meta & Google Ads',
            'Automatisiere Content mit fortgeschrittenen KI-Pipelines'
          ],
          fullArticleGuide: `### Die 10x Skalierungs-Formel für fortgeschrittene Marketer

Sobald dein organisches System kontinuierlich Leads und Verkäufe generiert, hast du ein bewiesenes Angebot. Nun geht es darum, die Schlagzahl zu erhöhen.

#### Die 3 Säulen der Skalierung:
1. **Bezahlter Traffic (Paid Ads):** Nutze Facebook, Instagram oder TikTok Ads, um zielgerichtet exakt deine Wunschkunden auf deine Opt-In Seite zu leiten.
2. **Höhere Conversions:** Optimiere deine Headlines, E-Mail Betreffzeilen und Buttons A/B-Test-basiert.
3. **Erweiterter Customer Lifetime Value:** Biete Folgeprodukte, Software-Abonnements oder VIP-Kurse im E-Mail Funnel an.`,
          practicalExamples: [
            'Beispiel: Du investierst 50€ in Meta Ads, gewinnst 25 Leads und erzielst daraus 2 Verkäufe à 60€ Provision = 120€ Umsatz (70€ Reingewinn).'
          ]
        },
        understandContent: {
          coreTakeaway: 'Skalierung bedeutet: Reinvestieren von Gewinnen in Systeme, die berechenbar mehr Ertrag bringen.',
          keyPrinciples: ['Zahlen kennen (CAC & CLV)', 'Schrittweise testen & skalieren']
        },
        actionTask: {
          instruction: 'Nutze die GOM-MAR Toolbox für deinen ersten Skalierungs-Post oder Ad-Script:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Skalierungs-Script erstellt'
        }
      },
      {
        id: '8.2',
        stageId: 8,
        stageTitle: '8. Bonus & Mastermind',
        title: 'High-Ticket Backends & VIP Angebote',
        durationMinutes: 12,
        description: 'Wie du mit hochpreisigen Beratungs- und Mentoring-Angeboten vierstellige Einzelprovisionen erzielst.',
        learnContent: {
          videoTitle: 'High-Ticket Affiliate & eigene Premium-Angebote',
          videoDuration: '10:15',
          summaryText: 'Mit High-Ticket Angeboten benötigst du nur wenige Verkäufe pro Monat, um ein volles Haupteinkommen zu erzielen. Lerne, wie du solche Angebote empfiehlst.',
          bulletPoints: [
            'High-Ticket Affiliate Programme mit 300€ - 1.000€+ Provision',
            'Anwendung von B2B-Qualifizierungsfragen im Chat',
            'Nutze automatisierte Terminbuchungs-Funnel'
          ],
          fullArticleGuide: `### Das High-Ticket Geheimnis

Während Einsteiger-Produkte für den schnellen Einstieg sorgen, bringen High-Ticket Angebote die echten großen Hebel.

#### Warum High-Ticket?
* 1 Verkauf à 500€ Provision bringt dir mehr als 25 Verkäufe à 20€.
* Käufer von High-Ticket Angeboten sind extrem umsetzungsstark und wertschätzen die Vorarbeit.
* Du kannst individuelle Betreuung anbieten oder auf bestehende Partner-Masterminds weiterleiten.`,
          practicalExamples: [
            'Beispiel: Integriere in deine E-Mail Sequenz an Tag 10 eine Einladung zu einem kostenlosen Strategiegespräch für ein High-Ticket Partner-Coaching.'
          ]
        },
        understandContent: {
          coreTakeaway: 'High-Ticket ist der schnellste Hebel zu fünfstelligen Monatsumsätzen.',
          keyPrinciples: ['Vertrauen ist die Währung', 'Wertstiftende Beratungsgespräche']
        },
        actionTask: {
          instruction: 'Erstelle eine High-Ticket E-Mail Vorlage im E-Mail Editor:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'High-Ticket Mail bereit'
        }
      },
      {
        id: '8.3',
        stageId: 8,
        stageTitle: '8. Bonus & Mastermind',
        title: 'GOM-MAR VIP Community & Partner-Programm',
        durationMinutes: 10,
        description: 'Werde Teil unseres exklusiven Partner-Netzwerks, erhalte Empfehlungs-Provisionen & tausche dich im VIP Raum aus.',
        learnContent: {
          videoTitle: 'Das GOM-MAR Partner- & Mastermind-Netzwerk',
          videoDuration: '8:45',
          summaryText: 'Nutze das GOM-MAR Partner-Programm, um die Academy selbst zu empfehlen und lebenslange wiederkehrende Provisionen auf Pro-Mitgliedschaften zu erhalten.',
          bulletPoints: [
            'Attraktive wiederkehrende Provisionen auf Pro-Abos',
            'VIP Mastermind Austausch mit erfolgreichen Absolventen',
            'Direkter Draht zu neuen KI-Tools & exklusiven Beta-Features'
          ],
          fullArticleGuide: `### Herzlich Willkommen im GOM-MAR VIP Inner Circle!

Als Absolvent aller Module hast du die seltene Fähigkeit erworben, digitale Systeme aufzubauen.

#### Dein exklusiver VIP-Vorteil:
* Empfehle die GOM-MAR Academy über deinen persönlichen Affiliate-Link weiter.
* Nutze unsere fertigen High-Converting Prompts, Vorlagen und Marketing-Materialien aus der Toolbox.
* Tausche dich regelmäßig in der VIP Community mit Top-Performern aus.`,
          practicalExamples: [
            'Nutze den KI-Assistenten Mara, um individuelle Partner-Kampagnen zu planen!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Netzwerk ist King – Gemeinsam skaliert es sich schneller und nachhaltiger.',
          keyPrinciples: ['Erfahrungen teilen', 'Wiederkehrende Einnahmen aufbauen']
        },
        actionTask: {
          instruction: 'Schließe das Mastermind-Modul ab & aktiviere dein VIP-Abzeichen:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die Skalierungs-Strategien mit Paid Ads',
            'Ich verstehe das Prinzip von High-Ticket Backends',
            'Ich bin bereit für die GOM-MAR VIP Mastermind'
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: '9. KI-Agenten & Autonome Workflows',
    subtitle: 'Hyper-Automatisierung mit KI & Prompts',
    color: 'from-emerald-500 to-teal-700',
    badgeIcon: 'psychology',
    description: 'Lerne, wie du fortgeschrittene KI-Agenten für automatisierte Marktforschung, Content-Erstellung, Bildgenerierung und 24/7 Kunden-Interaktion einsetzt.',
    lessons: [
      {
        id: '9.1',
        stageId: 9,
        stageTitle: '9. KI-Agenten & Autonome Workflows',
        title: 'Autonome KI-Prompts & Multi-Agenten Workflows',
        durationMinutes: 15,
        description: 'Erstelle verkettete KI-Prompts, die aus einer einzigen Nischen-Idee ein vollständiges Marketing-Bundle generieren.',
        learnContent: {
          videoTitle: 'Multi-Prompt Verknüpfung für maximale Effizienz',
          videoDuration: '12:40',
          summaryText: 'Durch die Kombination zielgerichteter KI-Prompts erzeugst du Headlines, Landingpage-Texte, Social Media Skripte und E-Mail-Sequenzen in einem einzigen automatisierten Workflow.',
          bulletPoints: [
            'Erstelle strukturierte Master-Prompts für deine spezifische Nische',
            'Verkette Zielgruppen-Analyse mit sofortiger Text-Generierung',
            'Spart bis zu 90% der manuellen Erstellungszeit'
          ],
          fullArticleGuide: `### Das Multi-Agenten Prinzip für Marketing-Automation

Moderne KI-Systeme entfalten ihre maximale Kraft, wenn du sie nicht wie ein einzelnes Frage-Antwort-Tool nutzt, sondern wie ein spezialisiertes Team.

#### Die 3 Rollen deines KI-Teams:
1. **Der Researcher-Agent:** Analysiert Probleme, Wünsche und Einwände deiner Zielgruppe.
2. **Der Copywriter-Agent:** Verwandelt die Erkenntnisse in hochkonvertierende Headlines und E-Mail-Texte.
3. **Der Designer-Agent:** Erstellt Bildideen, Ad-Visuals und Social-Media Karussell-Konzepte.`,
          practicalExamples: [
            'Beispiel: Übergib dem KI-Tutor Mara deine Zielgruppen-Idee und fordere mit einem Klick ein komplettes 5-Teile E-Mail Bundle an.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Präzise Prompts liefern präzise Verkaufs-Texte – automatisieren spart wertvolle Zeit.',
          keyPrinciples: ['Klarer Kontext & Persona', 'Schritt-für-Schritt Prompting']
        },
        actionTask: {
          instruction: 'Nutze die GOM-MAR KI Mara für deinen ersten autonomen Marketing-Prompt:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'KI-Prompt ausführt'
        }
      },
      {
        id: '9.2',
        stageId: 9,
        stageTitle: '9. KI-Agenten & Autonome Workflows',
        title: 'KI-Bild- & Visual-Generierung für Content-Funnels',
        durationMinutes: 14,
        description: 'Erzeuge virale Visuals, Thumbnails und Social-Media Grafiken mit KI-Generatoren in Sekunden.',
        learnContent: {
          videoTitle: 'High-Converting Visuals ohne Grafikdesigner',
          videoDuration: '11:10',
          summaryText: 'Lerne, wie du mit Bild-Prompts aufmerksamkeitsstarke Thumbnails, Beitragsbilder und Werbegrafiken im professionellen Corporate-Look erstellst.',
          bulletPoints: [
            'Generiere stimmige Bildwelten passend zu deinem Farb-Schema',
            'Erstelle Hooks & Visuals für Instagram Reels & Pinterest Pins',
            'Kein teurer Designer oder komplexe Photoshop-Kenntnisse nötig'
          ],
          fullArticleGuide: `### Visuelle Anziehungskraft durch KI-Grafiken

In sozialen Medien entscheidet das Bild innerhalb von 0,5 Sekunden darüber, ob ein Interessent stoppt oder weiter-scrollt.

#### Das 3-Komponenten Bild-Rezept:
* **Fokus-Subjekt:** Ein klares Hauptmotiv (z.B. erfolgreicher Entrepreneur, moderne Technologie).
* **Farb-Harmonie:** Nutze Markenfarben (Indigo, Deep Navy, Accent Gold) für hohen Wiedererkennungswert.
* **Atmosphäre:** Hell, klar, professionell und frei von visuellem Rauschen.`,
          practicalExamples: [
            'Beispiel: Nutze den Bild-Prompt Assistenten in der Toolbox für deine ersten Ad-Grafiken.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Visuals schaffen Aufmerksamkeit – die Headline sichert den Klick.',
          keyPrinciples: ['Konsistente Markenfarben', 'Starke Bild-Hooks']
        },
        actionTask: {
          instruction: 'Generiere eine Bildidee mit dem KI-Prompter in der Toolbox:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Bild-Prompt generiert'
        }
      },
      {
        id: '9.3',
        stageId: 9,
        stageTitle: '9. KI-Agenten & Autonome Workflows',
        title: 'Automatisiertes 24/7 Lead-Nurturing mit KI',
        durationMinutes: 12,
        description: 'Richte intelligente KI-Antwortsysteme ein, die Anfragen automatisch qualifizieren und Conversions steigern.',
        learnContent: {
          videoTitle: 'Intelligente Kunden-Interaktion rund um die Uhr',
          videoDuration: '9:50',
          summaryText: 'Verbinde deine E-Mail-Sequenzen und Chat-Kanäle mit KI-Assistenten, um Fragen von Interessenten sofort präzise und vertrauensvoll zu beantworten.',
          bulletPoints: [
            '24/7 Antworten auf Produkt- & Kursfragen',
            'Automatische Lead-Qualifizierung für High-Ticket Termine',
            'Maximales Vertrauen durch blitzschnelle Reaktionen'
          ],
          fullArticleGuide: `### Der 24/7 Autopilot für Kunden-Anfragen

Jede unbeantwortete Frage auf deiner Landingpage oder in deinen DMs ist ein potenziell verlorener Verkauf.

#### Warum KI-Nurturing funktioniert:
* Sofortige Antwort ohne Wartezeit erhöht die Kaufwahrscheinlichkeit um bis zu 400%.
* Die KI greift auf deine hinterlegten FAQ & Modul-Informationen zurück.
* Du sparst täglich Stunden im Kundensupport und kannst dich voll auf Strategie konzentrieren.`,
          practicalExamples: [
            'Nutze Mara im KI-Chat, um häufig gestellte Einwände deiner Zielgruppe automatisch in Verkaufsargumente umzuwandeln.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Geschwindigkeit schlägt Perfektion – automatische Antworten sichern Verkäufe.',
          keyPrinciples: ['Sofortige Reaktionszeit', 'Wertorientierte Hilfestellung']
        },
        actionTask: {
          instruction: 'Schließe das KI-Agenten Modul ab & aktiviere deinen KI-Mastery Status:',
          inputType: 'checklist',
          checklistItems: [
            'Ich verstehe das Prinzip verknüpfter KI-Prompts',
            'Ich kann aufmerksamkeitsstarke KI-Visuals planen',
            'Ich kenne die Vorteile von 24/7 KI-Lead-Nurturing'
          ]
        }
      }
    ]
  },
  {
    id: 10,
    title: '10. E-Mail Copywriting & KI-Generator',
    subtitle: 'High-Converting Texte & Verkaufs-Launches',
    color: 'from-indigo-600 to-purple-700',
    badgeIcon: 'mail_lock',
    description: 'Meistere die Kunst des verkaufsstarken E-Mail Copywritings. Nutze KI-Vorlagen für unwiderstehliche Betreffzeilen, Hooks & Launches.',
    lessons: [
      {
        id: '10.1',
        stageId: 10,
        stageTitle: '10. E-Mail Copywriting & KI-Generator',
        title: 'Anatomie einer High-Converting E-Mail',
        durationMinutes: 14,
        description: 'Die 5 Bausteine jeder erfolgreichen Verkaufs-E-Mail: Betreffzeile, Opening Hook, Story, Pitch und glasklarer Call-to-Action.',
        learnContent: {
          videoTitle: 'Die AIDA-Formel für E-Mail Marketer',
          videoDuration: '11:35',
          summaryText: 'Lerne, wie du E-Mails strukturierst, die geöffnet, mit Begeisterung gelesen und mit Klicks belohnt werden.',
          bulletPoints: [
            'Hohe Öffnungsraten durch neugierweckende Betreffzeilen',
            'Emotionale Hooks für sofortiges Leseinteresse',
            'Glasklares Angebot ohne künstlich aufdringliche Sprache'
          ],
          fullArticleGuide: `### Die 5 unumstößlichen Bausteine einer Top-E-Mail

1. **Die Betreffzeile (50% des Erfolgs):** Halte sie kurz (3-6 Wörter), persönlich und neugierig (z.B. *„Hast du das gewusst?“* oder *„Ein kleiner Fehler mit großer Wirkung…“*).
2. **Der Opening Hook:** Hole den Leser in den ersten 2 Zeilen direkt in seiner Lebensrealität ab.
3. **Die Story / Der Mehrwert:** Verbinde ein Alltagsproblem mit einer überraschenden Erkenntnis.
4. **Der Pitch:** Präsentiere dein Angebot als die einfachste logische Lösung.
5. **Der Call to Action (CTA):** Ein einzelner, unmissverständlicher Link-Button.`,
          practicalExamples: [
            'Beispiel: Statt „Unser neues Produkt ist da“ nutze „Warum 90% an dieser einen Hürde scheitern (und wie du sie überspringst)“.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Menschen kaufen wegen Emotionen und rechtfertigen mit Logik. Schreibe für Menschen!',
          keyPrinciples: ['Klarheit schlägt Cleverness', 'Ein CTA pro E-Mail']
        },
        actionTask: {
          instruction: 'Nutze den E-Mail Generator in der GOM-MAR Toolbox für deine erste Betreffzeile:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Betreffzeile erstellt'
        }
      },
      {
        id: '10.2',
        stageId: 10,
        stageTitle: '10. E-Mail Copywriting & KI-Generator',
        title: 'Der KI-E-Mail Generator mit Mara',
        durationMinutes: 12,
        description: 'Erstelle in wenigen Sekunden zielgruppengenaue E-Mail-Entwürfe mit dem integrierten GOM-MAR KI-Generator.',
        learnContent: {
          videoTitle: 'Schritt-für-Schritt Briefing für perfekte KI-Mails',
          videoDuration: '9:40',
          summaryText: 'Gib Ziel, Zielgruppe und Hauptvorteile ein – Mara generiert dir sofort Betreff, Vorschautext und den fertigen Mail-Inhalt.',
          bulletPoints: [
            'Automatische Texterstellung für Welcome- & Sales-Mails',
            'Vordefinierte Tonalitäten: Professionell, Begeisternd, Direkt',
            '1-Klick Übernahme in deinen E-Mail-Editor'
          ],
          fullArticleGuide: `### KI-unterstütztes Copywriting auf Knopfdruck

Mit dem GOM-MAR E-Mail Generator gehört die Angst vor dem leeren Blatt der Vergangenheit an.

#### So nutzt du den Generator optimal:
* **Ziel definieren:** Wähle zwischen Welcome, Promo, Newsletter oder Re-Engagement.
* **Stichpunkte eingeben:** Gib 2-3 Kernfakten zu deinem Produkt oder Angebot an.
* **Feinschliff:** Personalisiere Platzhalter wie [NAME] und füge deine persönlichen Anmerkungen hinzu.`,
          practicalExamples: [
            'Teste den E-Mail Generator direkt aus und erstelle eine Promo-Mail für deinen Rabattcode!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Die KI ist dein persönlicher Copywriter – du gibst die Richtung vor, die KI liefert den Rohentwurf.',
          keyPrinciples: ['Klare Vorgaben machen', 'Anschließend persönlich verfeinern']
        },
        actionTask: {
          instruction: 'Öffne den E-Mail Generator und erstelle einen Entwurf:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'E-Mail Entwurf generiert'
        }
      },
      {
        id: '10.3',
        stageId: 10,
        stageTitle: '10. E-Mail Copywriting & KI-Generator',
        title: 'Der 5-Tage Produkt-Launch-Flow',
        durationMinutes: 15,
        description: 'Die bewährte E-Mail-Kampagne für Launches, Aktionen & Sonderangebote mit maximalem Ertrag.',
        learnContent: {
          videoTitle: 'Der 5-Tage Verkaufs-Blueprint',
          videoDuration: '12:15',
          summaryText: 'Baue Spannung auf, präsentiere das Angebot, liefere Social Proof und schließe die Aktion mit gezielter Dringlichkeit ab.',
          bulletPoints: [
            'Tag 1: Ankündigung & Teaser (Neugier säen)',
            'Tag 2: Offizieller Verkaufsstart & Haupt-Vorteile',
            'Tag 3: Kundenerfolge & Social Proof',
            'Tag 4: Einwandbehandlung & FAQ',
            'Tag 5: Letzte Chance (Urgency & Deadline)'
          ],
          fullArticleGuide: `### Der Fünftage-Launch-Plan für maximale Conversions

Ein strukturierter Launch nutzt psychologische Hebel, um unentschlossene Leser in glückliche Käufer zu verwandeln.

#### Die Phasen des Launch-Flows:
1. **Pre-Launch (Tag 1):** Mach neugierig auf das Thema, ohne sofort zu verkaufen.
2. **Launch-Day (Tag 2):** Eröffne das Angebot mit einem klaren Vorteil für Schnellentschlossene.
3. **Proof-Day (Tag 3):** Zeige Testimonials, Fallstudien und reale Resultate.
4. **FAQ-Day (Tag 4):** Beantworte die häufigsten Bedenken vorab.
5. **Close-Day (Tag 5):** Erinnere an den Ablauf der Aktion (Letzte Chance!).`,
          practicalExamples: [
            'Lade den 5-Tage Launch-Flow in den Sequenz-Editor, um deine nächste Aktion vorzubereiten!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Eine gute Verkaufs-Kampagne ist wie eine gute Geschichte: Spannung, Höhepunkt & klarer Abschluss.',
          keyPrinciples: ['Echte Deadlines setzen', 'Durchgehend Mehrwert bieten']
        },
        actionTask: {
          instruction: 'Schließe das E-Mail Copywriting Modul ab & erhalte dein Copywriting Zertifikat:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die 5 Bausteine einer High-Converting E-Mail',
            'Ich kann den KI-E-Mail Generator effektiv einsetzen',
            'Ich kenne die Struktur des 5-Tage Launch-Flows'
          ]
        }
      }
    ]
  },
  {
    id: 11,
    title: '11. Funnel Analytics & Performance Skalierung',
    subtitle: 'Datengetriebene Entscheidungen & KPI-Optimierung',
    color: 'from-blue-600 to-indigo-800',
    badgeIcon: 'analytics',
    description: 'Analysiere deine Funnel-Kennzahlen (Conversion Rate, CTR, CPL), eliminiere Engpässe und verdopple deinen Ertrag durch datenbasierte A/B-Tests.',
    lessons: [
      {
        id: '11.1',
        stageId: 11,
        stageTitle: '11. Funnel Analytics & Performance Skalierung',
        title: 'Die 4 Kern-KPIs eines gewinnbringenden Funnels',
        durationMinutes: 15,
        description: 'Verstehe Opt-In Rate, E-Mail Öffnungsrate, Click-Through-Rate (CTR) und Sales Conversion Rate für maximale Kontrolle.',
        learnContent: {
          videoTitle: 'Funnel-Analyse: Zahlen lesen wie ein Profi',
          videoDuration: '12:10',
          summaryText: 'Wer seine Zahlen kennt, kann sein Business gezielt steuern. Lerne die 4 entscheidenden Leistungskennzahlen (KPIs) kennen und sofort bewerten.',
          bulletPoints: [
            'Opt-In Rate (Ziel: 35%+ auf der Landingpage)',
            'E-Mail Öffnungsrate (Ziel: 35-50%+ bei der Willkommens-Serie)',
            'Click-Through-Rate (CTR) auf Verkaufs-Links (Ziel: 8-15%+)',
            'Sales Conversion Rate (Ziel: 2-5%+ aller Leads)'
          ],
          fullArticleGuide: `### Die 4 Säulen deiner Funnel-Analytics

Gutes Marketing basiert nicht auf Bauchgefühl, sondern auf Daten. Wenn du weißt, an welcher Stelle im Funnel Leads verloren gehen, kannst du diesen Engpass gezielt beheben.

#### Die KPI-Formel zur Profitabilität:
1. **Opt-In Rate:** Wie viele Besucher werden zu Leads? *(Besucher ÷ Leads)*
2. **Open Rate:** Wie viele Abonnenten öffnen deine Mails? *(Öffnungen ÷ Gesendete Mails)*
3. **Click-Through-Rate (CTR):** Wie viele Leser klicken auf den Link? *(Klicks ÷ Öffnungen)*
4. **Sales Conversion Rate:** Wie viele Klicks führen zum Kauf? *(Verkäufe ÷ Klicks)*`,
          practicalExamples: [
            'Beispiel: Wenn deine Öffnungsrate hoch (45%), aber die Klickrate niedrig (2%) ist, liegt das Problem nicht am Betreff, sondern am Hook oder Call-to-Action im Mail-Inhalt.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Zahlen lügen nicht – identifiziere den größten Engpass und behebe ihn zuerst.',
          keyPrinciples: ['Immer nur eine Variable gleichzeitig ändern', 'Daten über mindestens 100 Interaktionen sammeln']
        },
        actionTask: {
          instruction: 'Analysiere deine Kampagnen-Metriken im GOM-MAR KI-Dashboard:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Funnel-Metriken überprüft'
        }
      },
      {
        id: '11.2',
        stageId: 11,
        stageTitle: '11. Funnel Analytics & Performance Skalierung',
        title: 'A/B-Testing & Engpass-Analyse mit Mara',
        durationMinutes: 13,
        description: 'So testest du Headlines, Betreffzeilen & Button-Texte systematisch gegeneinander für höhere Renditen.',
        learnContent: {
          videoTitle: 'Systematisches A/B-Testing im Online Marketing',
          videoDuration: '10:45',
          summaryText: 'Erfahre, wie du zwei Versionen einer Headline oder E-Mail gegeneinander testest und die Gewinner-Variante automatisch zum Standard machst.',
          bulletPoints: [
            'Testen von Betreffzeilen: Emotional vs. Zahlenbasiert',
            'Button-Texte: „Jetzt testen“ vs. „Hier Checkliste sichern“',
            'Nutze die KI Mara für schnelle Varianten-Generierung'
          ],
          fullArticleGuide: `### Die Kunst des A/B-Testings

Schon kleine Anpassungen bei einer Headline können die Opt-In Rate von 20% auf 40% verdoppeln – was deine Werbekosten halbiert!

#### Die A/B-Testing Regel:
* **Regel 1:** Teste immer nur EINE Änderung pro Testaufbau (z.B. nur die Headline oder nur die Button-Farbe).
* **Regel 2:** Lass den Test laufen, bis statistisch relevante Daten vorliegen (mindestens 50-100 Conversions).
* **Regel 3:** Übernimm den Sieger und starte den nächsten Test.`,
          practicalExamples: [
            'Nutze den KI-Chat Mara, um dir 3 alternative Betreffzeilen für deinen nächsten A/B-Test vorschlagen zu lassen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'A/B-Testing ist der Schlüssel von gutem Marketing zu exzellentem Marketing.',
          keyPrinciples: ['Testen statt vermuten', 'Der Markt entscheidet immer']
        },
        actionTask: {
          instruction: 'Erstelle eine Test-Variante deiner Betreffzeile mit der GOM-MAR KI:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'A/B-Test Variante erstellt'
        }
      },
      {
        id: '11.3',
        stageId: 11,
        stageTitle: '11. Funnel Analytics & Performance Skalierung',
        title: 'Die Re-Targeting & Profit-Maximierungs-Strategie',
        durationMinutes: 14,
        description: 'Hole inaktive Leads zurück & steigere deinen Customer Lifetime Value durch automatisierte Nachfass-Aktionen.',
        learnContent: {
          videoTitle: 'Maximize CLV: Das Beste aus deiner E-Mail-Liste herausholen',
          videoDuration: '11:20',
          summaryText: 'Ein Großteil der Verkäufe entsteht nicht beim ersten Kontakt, sondern beim 5. bis 7. Kontaktpunkt. Baue automatisierte Re-Engagement Funnels auf.',
          bulletPoints: [
            'Re-Engagement Sequenzen für inaktive Abonnenten nach 30 Tagen',
            'Upsell- & Cross-Sell Automationen nach dem Erstkauf',
            'Nutze automatisierte Umfragen zur kontinuierlichen Optimierung'
          ],
          fullArticleGuide: `### Der Customer Lifetime Value (CLV) Hebel

Die profitabelsten Marketer machen ihren Hauptgewinn nicht beim ersten Produkt, sondern durch die langfristige Betreuung ihrer Abonnenten.

#### Die 3 Schritte zur Profit-Maximierung:
1. **Re-Engagement:** Schicke inaktiven Kontakten exklusive Geschenke oder Umfragen (*„Bist du noch dabei?“*).
2. **Cross-Selling:** Empfehle bestehenden Kunden ergänzende Tools und Kurse mit wiederkehrender Provision.
3. **Listen-Hygiene:** Entferne dauerhaft inaktive Kontakte einmal im Quartal, um deine Zustellrate hoch zu halten.`,
          practicalExamples: [
            'Nutze die Re-Engagement Vorlage im E-Mail Editor, um unentschlossene Kontakte zu aktivieren.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Das echte Geld liegt im Follow-up und in der langfristigen Kundenbeziehung.',
          keyPrinciples: ['Regelmäßiger Mehrwert', 'Automatisierte Nachfass-Systeme']
        },
        actionTask: {
          instruction: 'Schließe das Analytics & Skalierungs-Modul ab & schalte deinen Analytics-Pro Status frei:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die 4 Kern-KPIs meines Online-Funnels',
            'Ich verstehe die Regeln für erfolgreiches A/B-Testing',
            'Ich kenne die Strategie zur Steigerung des Customer Lifetime Value'
          ]
        }
      }
    ]
  },
  {
    id: 12,
    title: '12. High-Converting Landingpages & No-Code Builder',
    subtitle: 'Professioneller Webseiten-Bau in Rekordzeit',
    color: 'from-violet-600 to-indigo-900',
    badgeIcon: 'web',
    description: 'Erstelle optisch ansprechende, extrem schnelle Landingpages ohne Programmieren. Lerne Conversion-Psychologie, Mobile-Optimization und Tracking.',
    lessons: [
      {
        id: '12.1',
        stageId: 12,
        stageTitle: '12. High-Converting Landingpages & No-Code Builder',
        title: 'Die Anatomie einer 40%+ Opt-In Landingpage',
        durationMinutes: 15,
        description: 'Hero-Section, fesselnde Sub-Headline, minimalistisches Opt-In Formular & Vertrauens-Elemente für maximale Lead-Eingänge.',
        learnContent: {
          videoTitle: 'Landingpage Aufbau für maximale Conversions',
          videoDuration: '12:00',
          summaryText: 'Lerne den perfekten Vorlagen-Aufbau für Squeeze Pages und Opt-In Seiten, die Besucher sofort in Kontakte verwandeln.',
          bulletPoints: [
            'Glasklare Above-the-Fold Hero Section',
            'Fokus auf ein einziges Handlungs-Ziel (Keine Ablenkungen)',
            'Mobile-First Layout für 80%+ Smartphone-Nutzer'
          ],
          fullArticleGuide: `### Der perfekte Landingpage-Aufbau

Eine erfolgreiche Opt-In Seite hat genau ein einziges Ziel: Die E-Mail-Adresse des Besuchers zu gewinnen.

#### Die wichtigsten Elemente:
1. **Klarer Header:** Logo & Vertrauens-Badge.
2. **Hero-Headline:** Löst das Hauptproblem deiner Zielgruppe.
3. **Sub-Headline:** Zeigt den konkreten Vorteil deines Lead-Magneten.
4. **Formular & CTA:** Auffälliger Button in Kontrastfarbe.`,
          practicalExamples: [
            'Nutze den Landingpage Generator in der GOM-MAR Toolbox, um das Grundgerüst in 60 Sekunden zu erstellen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Weniger Ablenkung bedeutet mehr Conversions – halte deine Opt-In Seite extrem fokussiert.',
          keyPrinciples: ['Glasklarer Nutzen', 'Minimalistisches Formular']
        },
        actionTask: {
          instruction: 'Konfiguriere deine Landingpage im GOM-MAR Generator:',
          inputType: 'link_toolbox',
          toolboxCategory: 'landingpage',
          placeholder: 'Landingpage konfiguriert'
        }
      },
      {
        id: '12.2',
        stageId: 12,
        stageTitle: '12. High-Converting Landingpages & No-Code Builder',
        title: 'Mobile Optimization & Blitz-Ladezeiten',
        durationMinutes: 12,
        description: 'Optimiere deine Seite für Smartphones, verkürze Ladezeiten auf unter 1 Sekunde & vermeide Absprünge.',
        learnContent: {
          videoTitle: 'Speed & Mobile UX Optimization',
          videoDuration: '9:30',
          summaryText: 'Über 80% deines Traffics kommt vom Smartphone. Erfahre, wie du Buttons daumenfreundlich platzierst und Grafiken komprimierst.',
          bulletPoints: [
            'Daumenfreundliche Formular- und Button-Größen',
            'Komprimierung aller Visuals für Ladezeiten unter 1.5s',
            'Sicheres HTTPS SSL-Zertifikat & DSGVO-Datenschutz'
          ],
          fullArticleGuide: `### Mobile-First: Der Schlüssel zu mehr Leads

Jede zusätzliche Sekunde Ladezeit kostet dich bis zu 20% deiner Conversion-Rate!

#### Checkliste für mobile Perfektion:
* Schriftgrößen mindestens 16px für optimale Lesbarkeit.
* Formularfelder ausreichend hoch und einfach anzutippen (min. 44px).
* Keine störenden Popups, die den gesamten Bildschirm blockieren.`,
          practicalExamples: [
            'Überprüfe die mobile Vorschau deiner Seite im GOM-MAR Builder vor dem Veröffentlichen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Speed ist Conversion – schnelle Ladezeiten sorgen für zufriedene Nutzer und mehr Leads.',
          keyPrinciples: ['Bilder komprimieren', 'Mobile-First Design']
        },
        actionTask: {
          instruction: 'Prüfe die mobile Vorschau im Landingpage Generator:',
          inputType: 'link_toolbox',
          toolboxCategory: 'landingpage',
          placeholder: 'Mobile-Check abgeschlossen'
        }
      },
      {
        id: '12.3',
        stageId: 12,
        stageTitle: '12. High-Converting Landingpages & No-Code Builder',
        title: 'Automatisierte Verknüpfung & Go-Live',
        durationMinutes: 14,
        description: 'Verbinde deine Landingpage mit deiner Domain, dem E-Mail Autoresponder und Starte dein System.',
        learnContent: {
          videoTitle: 'Landingpage Go-Live & Tracking Einbindung',
          videoDuration: '11:15',
          summaryText: 'Schließe den Kreis: Verbinde dein Formular direkt mit deiner E-Mail-Willkommens-Sequenz und schalte deine Domain frei.',
          bulletPoints: [
            'Formular-Schnittstelle zur GOM-MAR Mail Automation aktivieren',
            'Eigene Domain verbinden oder GOM-MAR Subdomain nutzen',
            'Test-Eintragung durchführen und Willkommens-Mail prüfen'
          ],
          fullArticleGuide: `### Der finale Schritt zum funktionierenden Funnel

Jetzt fügen sich alle Bausteine deiner GOM-MAR Academy Ausbildung zu einem geschlossenen System zusammen.

#### Dein Go-Live Ablauf:
1. **Formular verbinden:** Wähle deine vorbereitete E-Mail-Liste aus.
2. **Danke-Seite festlegen:** Leite neue Leads auf die Bestätigungs- oder Bridge-Page weiter.
3. **Testdurchlauf:** Trage deine eigene E-Mail-Adresse ein und überprüfe den Erhalt des Lead Magneten.`,
          practicalExamples: [
            'Veröffentliche deine Landingpage mit einem Klick und mache den ersten Live-Test!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Dein System ist jetzt startklar – kontinuierlicher Traffic bringt dir ab jetzt automatisierte Leads.',
          keyPrinciples: ['Einen vollständigen Testdurchlauf machen', 'Freudig durchstarten']
        },
        actionTask: {
          instruction: 'Schließe das Landingpage-Modul ab & schalte deinen Master-Status frei:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne den Aufbau einer 40%+ Opt-In Landingpage',
            'Ich verstehe die Bedeutung von Mobile-First & Ladezeiten',
            'Ich habe meine Landingpage mit der E-Mail-Automation verbunden'
          ]
        }
      }
    ]
  },
  {
    id: 13,
    title: '13. Community, Evergreen Funnels & Business Mastery',
    subtitle: 'Nachhaltiger Erfolg & Wiederkehrende Einnahmen',
    color: 'from-rose-600 to-pink-800',
    badgeIcon: 'hub',
    description: 'Baue eine treue Community auf, erstelle automatisierte Evergreen-Webinare und sichere dir ein skalierbares, wiederkehrendes Einkommen.',
    lessons: [
      {
        id: '13.1',
        stageId: 13,
        stageTitle: '13. Community, Evergreen Funnels & Business Mastery',
        title: 'Der Aufbau einer eigenen Brand & VIP-Community',
        durationMinutes: 15,
        description: 'Verwandle Einmalkäufer in loyale Markenbotschafter durch exklusive Gruppen, Masterminds & Community-Events.',
        learnContent: {
          videoTitle: 'Community Building: Von Abonnenten zu echten Fans',
          videoDuration: '12:20',
          summaryText: 'Eine engagierte Community ist das stärkste Fundament für langfristigen Business-Erfolg. Lerne, wie du VIP-Gruppen aufbaust und Vertrauen schaffst.',
          bulletPoints: [
            'Aufbau von exklusiven VIP-Gruppen (Skool, Telegram oder Discord)',
            'Regelmäßige Interaktion durch Umfragen, Q&As und Erfolgs-Spotlights',
            'Hohe Kundenbindung durch sichtbare Resultate anderer Mitglieder'
          ],
          fullArticleGuide: `### Warum Community die Zukunft von Digital Business ist

Kunden kaufen nicht nur Produkte, sondern die Zugehörigkeit zu einer Gemeinschaft von Gleichgesinnten.

#### Die 3 Stufen des Community-Aufbaus:
1. **Onboarding:** Begrüße jedes Mitglied persönlich und gib ihm eine klare Orientierung.
2. **Engagement:** Stelle wöchentliche Fragen, feiere Erfolge und fördere den gegenseitigen Austausch.
3. **Wertschätzung:** Belohne besonders aktive Mitglieder mit exklusiven Boni oder VIP-Status.`,
          practicalExamples: [
            'Beispiel: Biete deinen E-Mail-Abonnenten den Zugang zu einer exklusiven VIP-Mastermind-Gruppe als Bonus für ihre Treue an.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Eine starke Community schützt dein Business vor Wettbewerb und sorgt für organische Weiterempfehlungen.',
          keyPrinciples: ['Vertrauen durch Echtheit', 'Gemeinsame Ziele feiern']
        },
        actionTask: {
          instruction: 'Erstelle ein Community-Konzept mit dem KI-Tutor Mara:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Community-Konzept erstellt'
        }
      },
      {
        id: '13.2',
        stageId: 13,
        stageTitle: '13. Community, Evergreen Funnels & Business Mastery',
        title: 'Evergreen-Webinare & Automatisierte VSL Funnels',
        durationMinutes: 14,
        description: 'Richte automatische Video-Verkaufs-Präsentationen ein, die rund um die Uhr Leads qualifizieren und Verkäufe generieren.',
        learnContent: {
          videoTitle: 'Evergreen-Funnels: Verkaufen auf Autopilot',
          videoDuration: '11:40',
          summaryText: 'Ein Evergreen-Webinar läuft rund um die Uhr und präsentiert dein Angebot vollautomatisch – inklusive Countdown und Live-Chat Simulation.',
          bulletPoints: [
            'Struktur einer 15-minütigen VSL (Video Sales Letter) Präsentation',
            'Automatisierte Termin-Auswahl für Webinar-Teilnehmer',
            'E-Mail Erinnerungen vor und nach der Präsentation'
          ],
          fullArticleGuide: `### Das Prinzip des Evergreen-Webinars

Ein Evergreen-Webinar vermittelt das Gefühl eines Live-Events, läuft aber vollautomatisch ab.

#### Die perfekten Bausteine einer VSL:
* **Hook (Minute 0-2):** Wecke sofort neugieriges Interesse.
* **Story (Minute 2-5):** Erzähle von deiner eigenen Reise und deinen Rückschlägen.
* **Lösung (Minute 5-10):** Zeige das System und die Beseitigung der Hürden.
* **Call to Action (Minute 10-15):** Präsentiere das Angebot mit befristeter Prämie.`,
          practicalExamples: [
            'Nutze die GOM-MAR Toolbox, um ein Skript für deine Video-Verkaufsseite zu erstellen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein funktionierendes Evergreen-Webinar ist wie dein bester Verkäufer, der 24 Stunden am Tag arbeitet.',
          keyPrinciples: ['Glasklare Struktur', 'Fokus auf den Kundennutzen']
        },
        actionTask: {
          instruction: 'Generiere ein VSL-Skript im E-Mail & Content Generator:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'VSL-Skript generiert'
        }
      },
      {
        id: '13.3',
        stageId: 13,
        stageTitle: '13. Community, Evergreen Funnels & Business Mastery',
        title: 'Der Mastermind Blueprint & Skalierungs-Zertifikat',
        durationMinutes: 16,
        description: 'Strukturiere deine Angebote für maximalen Kundennutzen, sichere dir dein GOM-MAR Mastermind Zertifikat und dominiere deinen Markt.',
        learnContent: {
          videoTitle: 'Dein Weg zum etablierten Digital Entrepreneur',
          videoDuration: '13:10',
          summaryText: 'Herzlichen Glückwunsch! Du hast das fundamentale und fortgeschrittene Wissen der GOM-MAR Academy gemeistert.',
          bulletPoints: [
            'Überprüfung deines gesamten Funnel-Systems',
            'Freischaltung deines offiziellen GOM-MAR Business Mastery Zertifikats',
            'Zugang zur exklusiven Absolventen-Mastermind'
          ],
          fullArticleGuide: `### Willkommen an der Spitze!

Du besitzt jetzt alle Werkzeuge, Strategien und Systeme, um nachhaltig digitale Produkte und Dienstleistungen zu vermarkten.

#### Deine nächsten Meilensteine:
1. **System sichern:** Führe regelmäßige Backups und Optimierungen durch.
2. **Weiteres Skalieren:** Erhöhe Schritt für Schritt dein Werbebudget.
3. **Erfolge teilen:** Inspiriere andere Absolventen in unserer Community!`,
          practicalExamples: [
            'Herzlichen Glückwunsch! Lade dein offizielles Absolventen-Zertifikat herunter.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Du bist jetzt ein vollständiger Digital Entrepreneur – dein Erfolg liegt in deinen Händen.',
          keyPrinciples: ['Kontinuierliche Umsetzung', 'Niemals aufhören zu lernen']
        },
        actionTask: {
          instruction: 'Schließe das Finale der GOM-MAR Academy ab & erhalte dein Business Mastery Zertifikat:',
          inputType: 'checklist',
          checklistItems: [
            'Ich verstehe die Prinzipien des Community-Aufbaus',
            'Ich kenne die Struktur von Evergreen VSL Funnels',
            'Ich bin bereit als zertifizierter GOM-MAR Business Marketer'
          ]
        }
      }
    ]
  },
  {
    id: 14,
    title: '14. Legal, Compliance & DSGVO',
    subtitle: 'Rechtssicherheit für Online Marketer & Gründer',
    color: 'from-slate-600 to-cyan-800',
    badgeIcon: 'gavel',
    description: 'Mache dein Online Business 100% rechtssicher: DSGVO-konformes Impressum, Datenschutzerklärung, Double-Opt-In (DOI) & Gewerbeanmeldung.',
    lessons: [
      {
        id: '14.1',
        stageId: 14,
        stageTitle: '14. Legal, Compliance & DSGVO',
        title: 'DSGVO & E-Mail-Marketing Rechtssicherheit',
        durationMinutes: 14,
        description: 'Double-Opt-In (DOI) Pflicht, Datenschutz-Einbindung auf Landingpages & rechtssichere E-Mail-Kommunikation.',
        learnContent: {
          videoTitle: 'Rechtssicheres E-Mail Marketing nach DSGVO',
          videoDuration: '11:10',
          summaryText: 'Wer E-Mail-Adressen sammelt, muss das rechtssichere Double-Opt-In (DOI) Verfahren nutzen und einen Datenschutz-Link bereitstellen.',
          bulletPoints: [
            'Automatischer Versand der DOI-Bestätigungsmail mit Einmal-Link',
            'Einbindung von Datenschutzerklärung & Checkbox im Opt-In Formular',
            'Jederzeitige Abmeldemöglichkeit (Unsubscribe-Link) in jeder Mail'
          ],
          fullArticleGuide: `### Die 3 Säulen rechtssicheren E-Mail Marketings

Datenschutz ist im europäischen Raum keine Hürde, sondern stärkt das Vertrauen deiner Kontakte.

#### Die wichtigsten Vorgaben:
1. **Double-Opt-In (DOI):** Jeder Lead muss seine E-Mail-Adresse durch Klick auf einen Bestätigungslink verifizieren.
2. **Abmelde-Link:** Jede Nachricht benötigt am Ende einen gut sichtbaren Unsubscribe-Button.
3. **Einwilligung:** Im Anmeldeformular muss klar angegeben werden, wofür die E-Mail-Adresse genutzt wird.`,
          practicalExamples: [
            'Alle Formulare in der GOM-MAR Toolbox sind automatisch DSGVO-konform mit DOI und Datenschutz-Links ausgestattet.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Transparenz schafft Vertrauen – DSGVO-Konformität schützt dein Business und stärkt die Kundenbindung.',
          keyPrinciples: ['DOI Pflicht beachten', 'Keine Mails ohne Abmelde-Link']
        },
        actionTask: {
          instruction: 'Überprüfe deine DOI-Einstellungen im GOM-MAR E-Mail Editor:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'DOI-Einstellungen überprüft'
        }
      },
      {
        id: '14.2',
        stageId: 14,
        stageTitle: '14. Legal, Compliance & DSGVO',
        title: 'Impressum, AGB & Abmahnfallen vermeiden',
        durationMinutes: 13,
        description: 'So erstellst du ein abmahnsicheres Impressum, AGB und Widerrufsbelehrungen für deine Landingpages & Social Media Profile.',
        learnContent: {
          videoTitle: 'Impressumspflicht & Abmahn-Prävention',
          videoDuration: '10:20',
          summaryText: 'Jede geschäftliche Webseite und jedes Social-Media Profil im deutschsprachigen Raum benötigt ein leicht erreichbares Impressum (2-Klick-Regel).',
          bulletPoints: [
            'Pflichtangaben im Impressum: Name, Ladungsfähige Adresse, Kontakt (E-Mail/Tel)',
            'Transparenter Werbe-Hinweis bei Affiliate-Links (*Werbung / Affiliate Link)',
            'Nutze kostenlose Generatoren für Datenschutz & Impressum'
          ],
          fullArticleGuide: `### Das perfekte Impressum für Online Marketer

Fehlende oder unvollständige Impressumsangaben sind die häufigste Ursache für vermeidbare Abmahnungen.

#### Die 2-Klick-Regel:
Dein Impressum und deine Datenschutzerklärung müssen von jeder Unterseite deiner Website aus mit maximal 2 Klicks erreichbar sein. Ideal ist ein Footer-Link auf deiner Landingpage.`,
          practicalExamples: [
            'Verlinke dein Impressum und deine Datenschutzerklärung direkt im Footer deiner Landingpage im Generator.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein vollständiges Impressum schützt dich vor rechtlichen Risiken und wirkt hochprofessionell.',
          keyPrinciples: ['2-Klick-Erreichbarkeit', 'Transparente Kennzeichnung']
        },
        actionTask: {
          instruction: 'Binde dein Impressum im Landingpage Generator ein:',
          inputType: 'link_toolbox',
          toolboxCategory: 'landingpage',
          placeholder: 'Impressum eingebunden'
        }
      },
      {
        id: '14.3',
        stageId: 14,
        stageTitle: '14. Legal, Compliance & DSGVO',
        title: 'Gewerbeanmeldung, Steuern & EÜR für Einsteiger',
        durationMinutes: 15,
        description: 'Der einfache Leitfaden für Gewerbeanmeldung, Kleinunternehmerregelung (§ 19 UStG) & geordnete Belegbuchhaltung.',
        learnContent: {
          videoTitle: 'Gewerbe & Steuern einfach erklärt',
          videoDuration: '12:00',
          summaryText: 'Sobald du die Absicht hast, dauerhaft Gewinne zu erzielen, meldest du ein Gewerbe an. Lerne die Vorteile der Kleinunternehmerregelung kennen.',
          bulletPoints: [
            'Gewerbeanmeldung beim örtlichen Gewerbeamt (Kosten ca. 15–40€)',
            'Kleinunternehmerregelung (§ 19 UStG): Keine Umsatzsteuer auf Rechnungen bis 22.000€/Jahr',
            'Einfache Einnahmen-Überschuss-Rechnung (EÜR) für deine Steuererklärung'
          ],
          fullArticleGuide: `### Gewerbe & Steuern ohne Stress

Die Gewerbeanmeldung ist ein unkomplizierter Verwaltungsakt, der meist online erledigt werden kann.

#### Schritt-für-Schritt Fahrplan:
1. **Gewerbeanmeldung:** Online beim Gewerbeamt ausfüllen (Tätigkeit z.B. „Online Marketing & digitale Dienstleistungen“).
2. **Fragebogen zur steuerlichen Erfassung:** Beim Finanzamt einreichen & ggf. Kleinunternehmerregelung wählen.
3. **Belege sammeln:** Speichere alle Einnahmen und Ausgaben geordnet im Ordner.`,
          practicalExamples: [
            'Nutze ein simples Excel-Sheet oder Lexoffice für deine wöchentliche Belegübersicht.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Gewerbe & Buchhaltung sind einfach, wenn man von Anfang an Ordnung hält.',
          keyPrinciples: ['Belege sofort ablegen', 'Kleinunternehmerregelung nutzen']
        },
        actionTask: {
          instruction: 'Schließe das Legal & Compliance Modul ab & sichere dir deinen Rechts-Check Status:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die Pflichten von Double-Opt-In (DOI)',
            'Ich verstehe die Anforderungen an Impressum & Datenschutz',
            'Ich kenne die Schritte zur einfachen Gewerbeanmeldung'
          ]
        }
      }
    ]
  },
  {
    id: 15,
    title: '15. KI-Automatisierte Skalierung & Globale Märkte',
    subtitle: 'Internationale Funnels & High-Ticket Systeme',
    color: 'from-amber-500 to-orange-700',
    badgeIcon: 'rocket',
    description: 'Skaliere dein Business auf internationale Märkte mit multilingualen KI-Systemen, High-Ticket Funnels & automatisiertem Ad-Buying.',
    lessons: [
      {
        id: '15.1',
        stageId: 15,
        stageTitle: '15. KI-Automatisierte Skalierung & Globale Märkte',
        title: 'Multilinguale KI-Expansion & Globale Märkte',
        durationMinutes: 15,
        description: 'Nutze KI-Übersetzung & Lokalisierung, um deine Funnels, E-Mails & Landingpages in englische & internationale Märkte zu skalieren.',
        learnContent: {
          videoTitle: 'Internationalisierung durch KI-Lokalisierung',
          videoDuration: '12:15',
          summaryText: 'Erfahre, wie du deine funktionierenden deutschen Funnels mit KI nahtlos in den englischsprachigen und weltweiten Markt überträgst.',
          bulletPoints: [
            'Verfünffache deinen Zielmarkt durch weltweite Ansprache',
            'KI-gestützte Übersetzung unter Beibehaltung der Verkaufspsychologie',
            'Integrierter KI-Sprachwechsler für Landingpages und Kurse'
          ],
          fullArticleGuide: `### Warum globale Skalierung mit KI kinderleicht ist

Der englischsprachige Markt ist mehr als 10-mal größer als der D-A-CH Raum. Mit modernen KI-Systemen benötigst du keine teuren Übersetzungsagenturen mehr.

#### Die 3 Schritte zur weltweiten Expansion:
1. **Content-Lokalisierung:** Übersetze deine E-Mail-Sequenzen und Landingpages in fließendes Englisch mit kaufanregender Tonalität.
2. **Kulturelle Anpassung:** Passe Beispiele, Währungen ($ USD statt € EUR) und Referenzen an die Zielregion an.
3. **Multilinguales Feedback:** Nutze die GOM-MAR KI, um Anfragen aus verschiedenen Ländern in Echtzeit zu beantworten.`,
          practicalExamples: [
            'Testen Sie die Sprachumstellung im Landingpage Generator und der GOM-MAR Academy für globale Kampagnen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Globale Märkte vervielfachen deinen adressierbaren Kundenkreis – KI nimmt dir die Sprachbarriere.',
          keyPrinciples: ['Kulturelle Tonalität anpassen', 'Englisch als zweiter Hauptmarkt']
        },
        actionTask: {
          instruction: 'Testen Sie die Sprachumstellung im Landingpage Generator und der Academy:',
          inputType: 'link_toolbox',
          toolboxCategory: 'landingpage',
          placeholder: 'Lokalisierung geprüft'
        }
      },
      {
        id: '15.2',
        stageId: 15,
        stageTitle: '15. KI-Automatisierte Skalierung & Globale Märkte',
        title: 'High-Ticket Funnels & Automatisierte Qualifizierung',
        durationMinutes: 14,
        description: 'Transformiere Einmalkäufe in hochpreisige Coaching-, Agentur- oder Beratungspakete mit KI-gestützter Lead-Qualifizierung.',
        learnContent: {
          videoTitle: 'High-Ticket Systems: 4-stellige Conversions auf Autopilot',
          videoDuration: '11:30',
          summaryText: 'Lerne, wie du durch Qualifizierungs-Fragebögen und automatisierte Kalender-Funnelei High-Ticket Angebote verkaufst.',
          bulletPoints: [
            'Qualifizierungs-Formulare zum Filtern von Traumkunden',
            'Automatisierte Terminbuchung für Beratungsgespräche',
            'Maximale Marge durch Premium-Positionierung'
          ],
          fullArticleGuide: `### Das Prinzip des High-Ticket Funnels

Ein einziger High-Ticket Kunde (z.B. 1.000€ bis 3.000€) bringt denselben Ertrag wie 50 kleine Einzelverkäufe.

#### Die Qualifizierungs-Kette:
1. **Anfrage-Formular:** Der Interessent beantwortet 3-5 gezielte Fragen zu Budget und Zielen.
2. **KI-Vorqualifizierung:** Das System prüft die Eignung des Leads automatisch.
3. **Terminbuchung:** Geeignete Kandidaten buchen direkt einen Strategie-Call in deinem Kalender.`,
          practicalExamples: [
            'Erstelle mit Mara in der Toolbox ein Qualifizierungsskript für deine High-Ticket Strategiegespräche.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein High-Ticket Kunde bringt den Ertrag von 50 Standard-Kunden bei geringerem Betreuungsaufwand.',
          keyPrinciples: ['Vorqualifizierung ist Pflicht', 'Wert vor Preis stellen']
        },
        actionTask: {
          instruction: 'Erstelle ein High-Ticket Qualifizierungsskript mit Mara:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'High-Ticket Skript generiert'
        }
      },
      {
        id: '15.3',
        stageId: 15,
        stageTitle: '15. KI-Automatisierte Skalierung & Globale Märkte',
        title: 'Automatisierte Traffic-Skalierung & KI-Ad-Campaigns',
        durationMinutes: 16,
        description: 'Setze KI-generierte Werbeanzeigen auf Meta, TikTok & Google ein, um dein System mit planbarem Neukunden-Traffic zu füttern.',
        learnContent: {
          videoTitle: 'Paid Traffic Autopilot: KI-Ads auf Meta & Google',
          videoDuration: '13:45',
          summaryText: 'Generiere mit KI hochkonvertierende Ad-Creatives, Copy-Varianten & Werbetexte für maximale ROAS (Return on Ad Spend).',
          bulletPoints: [
            'KI-gestützte Erstellung von Bild- & Video-Ad-Skripten',
            'Automatisches A/B-Testing verschiedener Anzeigenmotive',
            'Skalierung profitabler Kampagnen bei positivem Return on Ad Spend (ROAS)'
          ],
          fullArticleGuide: `### Die Formel für planbaren Paid Traffic

Mit bezahlter Werbung musst du nicht mehr darauf warten, dass Kunden dich zufällig finden – du ziehst sie gezielt an.

#### Die 3 Säulen erfolgreicher Ads:
* **Der Visual-Hook:** Das erste Bild/Video entscheidet, ob der Nutzer im Feed anhält.
* **Die Ad-Copy:** Bringt das Hauptproblem der Zielgruppe auf den Punkt und verspricht die Lösung.
* **Der Match zur Landingpage:** Versprechen in der Anzeige muss 1:1 zur Überschrift auf der Landingpage passen.`,
          practicalExamples: [
            'Verwende die KI-Prompt Bibliothek, um 5 reichweitenstarke Ad-Hooks für deine Kampagne zu generieren.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Bezahlter Traffic verwandelt dein Business von Zufallseinnahmen in eine planbare Wachstumsmaschine.',
          keyPrinciples: ['Systematische Ad-Tests', 'Positiven ROAS sichern']
        },
        actionTask: {
          instruction: 'Schließe das Skalierungs-Modul ab & schalte deinen Global Growth Status frei:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die Strategie zur internationalen Funnel-Skalierung',
            'Ich verstehe das Prinzip von High-Ticket Qualifizierungs-Funnels',
            'Ich kenne den Aufbau von KI-gestützten Paid-Ad-Kampagnen'
          ]
        }
      }
    ]
  },
  {
    id: 16,
    title: '16. KI-Automatisierung, Prozesse & Business Autopilot',
    subtitle: 'Maximale Effizienz durch intelligente Workflows & System-Integration',
    color: 'from-emerald-600 to-teal-900',
    badgeIcon: 'settings_suggest',
    description: 'Automation pur: Verknüpfe CRM, E-Mail-Systeme, Payment-Provider und KI-Agenten zu einer vollautomatischen Business-Architektur.',
    lessons: [
      {
        id: '16.1',
        stageId: 16,
        stageTitle: '16. KI-Automatisierung, Prozesse & Business Autopilot',
        title: 'Integrierte KI-Workflows & Webhook-Systeme',
        durationMinutes: 15,
        description: 'Verbinde Lead-Quellen, E-Mail-Marketing, CRM und Zahlungsanbieter über automatische Schnittstellen für nahtlosen Datenfluss.',
        learnContent: {
          videoTitle: 'Workflow Automation: Schnittstellen & Webhooks verstehen',
          videoDuration: '12:30',
          summaryText: 'Lerne, wie du verschiedene digitale Tools miteinander vernetzt, sodass Daten ohne manuelles Eingreifen in Echtzeit synchronisiert werden.',
          bulletPoints: [
            'Automatische Lead-Übertragung von der Landingpage ins E-Mail-System',
            'Echtzeit-Synchronisierung von Verkäufen mit Kundenkonto & Rechnungsstellung',
            'Webhook-Trigger zur Auslösung individueller KI-Aktionen'
          ],
          fullArticleGuide: `### Das Fundament eines vollautomatisierten Business

Ein echtes Online-Business zeichnet sich dadurch aus, dass Prozesse im Hintergrund fehlerfrei und ohne manuelles Eingreifen ablaufen.

#### Die 3 Säulen der Workflow-Automation:
1. **Trigger (Auslöser):** Ein Nutzer trägt sich auf der Landingpage ein oder kauft ein Produkt.
2. **Filter & Transformation:** Daten werden auf Vollständigkeit geprüft und im richtigen Format aufbereitet.
3. **Action (Aktion):** Das System versendet die Willkommens-Mail, schaltet den Kursbereich frei und legt die Kundenakte an.`,
          practicalExamples: [
            'Verwende die vorbereiteten Automations-Triggers im GOM-MAR Dashboard, um deinen Lead-Prozess zu testen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Automatisierte Prozesse sparen hunderte Arbeitsstunden und eliminieren menschliche Fehlerquellen.',
          keyPrinciples: ['Einmal aufbauen, dauerhaft profitieren', 'Fehlerfreie Datenübertragung']
        },
        actionTask: {
          instruction: 'Prüfe deine aktiven Automations-Trigger im GOM-MAR Dashboard:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Automations-Workflows geprüft'
        }
      },
      {
        id: '16.2',
        stageId: 16,
        stageTitle: '16. KI-Automatisierung, Prozesse & Business Autopilot',
        title: 'KI-Kundensupport & Automatisierter Service',
        durationMinutes: 14,
        description: 'Baue KI-gestützte Support-Chatbots und Mail-Antwortsysteme auf, die Kundenfragen rund um die Uhr präzise beantworten.',
        learnContent: {
          videoTitle: '24/7 Support-Automation mit KI-Assistenten',
          videoDuration: '11:45',
          summaryText: 'Richte automatische Antworten für häufig gestellte Fragen (FAQ), Passwort-Resets und Zugangsprobleme ein.',
          bulletPoints: [
            'KI-Support-Bot Trainings auf Basis deines Wissensbereichs',
            'Automatische Priorisierung & Kategorisierung von Kundenanfragen',
            'Nahtlose Übergabe an menschlichen Support bei komplexen Fällen'
          ],
          fullArticleGuide: `### Der 24/7 KI-Kundenservice

Kunden erwarten heute schnelle Antworten – auch abends oder am Wochenende. Ein trainierter KI-Assistent löst bis zu 80% aller Anfragen in Sekundenschnelle.

#### So baust du deinen KI-Support auf:
* **Knowledge Base füttern:** Stelle der KI deine FAQs, Kursinhalte und Richtlinien bereit.
* **Persönliche Tonalität:** Lege fest, wie höflich und professionell die KI antwortet.
* **Eskalationspfad:** Bei heiklen Themen leitet die KI das Ticket direkt an deine E-Mail-Adresse weiter.`,
          practicalExamples: [
            'Nutze den KI-Tutor Mara, um Antworten auf die 5 häufigsten Kundenfragen für dein Support-System zu verfassen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Exzellenter 24/7 Support begeistert deine Kunden und hält deinen Kopf frei für das Kurswachstum.',
          keyPrinciples: ['Schnelligkeit begeistert Kunden', 'Klare Eskalationsregeln']
        },
        actionTask: {
          instruction: 'Erstelle FAQ-Antworten mit dem KI-Tutor Mara:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'FAQ-Antworten generiert'
        }
      },
      {
        id: '16.3',
        stageId: 16,
        stageTitle: '16. KI-Automatisierung, Prozesse & Business Autopilot',
        title: 'Der Business Autopilot & Das Ultimate Scalability Framework',
        durationMinutes: 16,
        description: 'Übergib operative Routinetätigkeiten an die GOM-MAR KI und leite dein digitales Unternehmen als strategischer Architekt.',
        learnContent: {
          videoTitle: 'Business Autopilot: Vom Operator zum Strategen',
          videoDuration: '13:50',
          summaryText: 'Füge alle Automations-Bausteine, KI-Tools und Marketing-Systeme der GOM-MAR Academy zu deinem unschlagbaren Gesamt-Setup zusammen.',
          bulletPoints: [
            'Kontinuierliche Überwachung deines Systems im GOM-MAR KI-Dashboard',
            'Verbindung aller Module von Angebot, Landingpage, Mails bis KI-Support',
            'Regelmäßige Wochen-Routinen für nachhaltiges Wachstum mit minimaler Arbeitszeit'
          ],
          fullArticleGuide: `### Dein Ziel: Das selbstständig laufende Business-System

Du hast die gesamte Ausbildung gemeistert. Du arbeitest jetzt nicht mehr IN deinem Business, sondern AN deinem Business.

#### Dein wöchentliches Autopilot-Dashboard Checklist:
1. **Montag:** Check der Kampagnen-KPIs (Opt-In Rate & Conversion) im KI-Dashboard.
2. **Mittwoch:** A/B-Test Sieger auswerten & neue Hooks/Text-Varianten generieren.
3. **Freitag:** Auszahlung der Einnahmen prüfen & Community-Erfolge feiern.`,
          practicalExamples: [
            'Herzlichen Glückwunsch! Du hast das komplette System aufgebaut und den Business-Autopilot freigeschaltet.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Du hast ein vollwertiges, automatisierte Business-System geschaffen. Genieße die Freiheit und skaliere nachhaltig.',
          keyPrinciples: ['Fokus auf Strategie', 'Systeme arbeiten für dich']
        },
        actionTask: {
          instruction: 'Schließe das Master-Modul ab & erhalte dein finales Autopilot-Diplom:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne den Aufbau integrierter KI-Workflows & Webhooks',
            'Ich verstehe die Funktionsweise von 24/7 KI-Kundensupport',
            'Ich habe mein gesamtes Business-System auf Autopilot gestellt'
          ]
        }
      }
    ]
  },
  {
    id: 17,
    title: '17. Omnichannel Marketing, AI Media & Future Technologies',
    subtitle: 'Content-Dominanz über alle Kanäle mit KI-Video & Audio',
    color: 'from-purple-600 to-indigo-900',
    badgeIcon: 'movie',
    description: 'Sichere dir maximale Sichtbarkeit: Erstelle KI-Shorts, Reels, Podcasts und automatisiere die Verteilung über alle relevanten Plattformen.',
    lessons: [
      {
        id: '17.1',
        stageId: 17,
        stageTitle: '17. Omnichannel Marketing, AI Media & Future Technologies',
        title: 'KI-Video & Faceless Short-Form Content (TikTok, Reels, Shorts)',
        durationMinutes: 15,
        description: 'Generiere fesselnde Kurzvideos, Faceless-Avatare und automatisierte Skripte für explosive organische Reichweite.',
        learnContent: {
          videoTitle: 'Faceless Video Magic: KI-Shorts in Minuten erstellen',
          videoDuration: '12:45',
          summaryText: 'Kurzvideos sind der schnellste Hebel für organische Leads. Lerne, wie du ohne Gesicht vor der Kamera virale Videos mit KI produzierst.',
          bulletPoints: [
            'Verwendung von KI-Avataren & Voiceover für professionelle Videos',
            'Automatisierte Skripterstellung mit der GOM-MAR KI Mara',
            'Optimierte Hooks für die ersten 3 Sekunden zur Maximierung der Watchtime'
          ],
          fullArticleGuide: `### Die Kraft von Faceless Short-Form Content

Du musst nicht persönlich vor der Kamera stehen, um tausende Aufrufe und qualifizierte Leads zu generieren.

#### Die Anatomie eines viralen KI-Shorts:
1. **Visual Hook (0-3 Sek):** Dynamischer B-Roll oder KI-Animation mit auffälligen Untertiteln.
2. **Value (3-20 Sek):** Ein konkreter Tipp, der sofort ein Problem löst.
3. **Call to Action (20-30 Sek):** Aufforderung, den Link in der Bio für den Lead-Magneten zu klicken.`,
          practicalExamples: [
            'Generiere mit Mara in der Content-Toolbox 3 Hooks für deine nächsten TikToks & Instagram Reels.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Short-Form Content bringt dir konstanten organischen Gratis-Traffic ohne Werbebudget.',
          keyPrinciples: ['Die ersten 3 Sekunden entscheiden', 'Regelmäßigkeit schlägt Perfektion']
        },
        actionTask: {
          instruction: 'Generiere Short-Video Hooks mit der GOM-MAR KI Mara:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Video Hooks generiert'
        }
      },
      {
        id: '17.2',
        stageId: 17,
        stageTitle: '17. Omnichannel Marketing, AI Media & Future Technologies',
        title: 'AI Voice Cloning, Podcasts & Audio-Marketing',
        durationMinutes: 14,
        description: 'Erstelle automatisierte Audio-Inhalte, Voice-Over für Erklärvideos und deinen eigenen KI-gestützten Podcast.',
        learnContent: {
          videoTitle: 'Audio-Revolution: KI-Sprachklonung & Podcast-Automation',
          videoDuration: '11:20',
          summaryText: 'Nutze KI-Audio-Tools, um geschriebene Artikel und E-Mails in hochwertige Audiosignale und Podcasts zu verwandeln.',
          bulletPoints: [
            'KI-Voice Cloning für konsistente Markenstimmen',
            'Verwandlung von Blogbeiträgen & Newslettern in Podcast-Episoden',
            'Einbindung von Audio-Playern auf Landingpages zur Erhöhung der Verweildauer'
          ],
          fullArticleGuide: `### Audio Marketing als Vertrauensbooster

Audio-Inhalte schaffen eine besonders intime Verbindung zu deiner Zielgruppe, da Nutzer sie unterwegs beim Sport oder Autofahren konsumieren.

#### Der KI-Podcast Workflow:
* **Text als Basis:** Verwende eine erfolgreiche E-Mail-Sequenz.
* **KI-Voice Generation:** Generiere eine glasklare Audio-Spur in deiner gewünschten Tonalität.
* **Syndikation:** Lade die Episode automatisch auf Spotify und Apple Podcasts hoch.`,
          practicalExamples: [
            'Füge deiner Landingpage im Generator ein Audio-Intro hinzu, um die Conversion-Rate weiter zu steigern.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Audio schafft persönliche Nähe und erreicht deine Zielgruppe in Alltagssituationen.',
          keyPrinciples: ['Mehrkanallernen fördern', 'Inhalte im Audioformat wiederverwenden']
        },
        actionTask: {
          instruction: 'Plane dein Audio-Intro im E-Mail & Content Editor:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Audio-Konzept erstellt'
        }
      },
      {
        id: '17.3',
        stageId: 17,
        stageTitle: '17. Omnichannel Marketing, AI Media & Future Technologies',
        title: 'Omnichannel Content-Syndikation & Das Content-Imperium',
        durationMinutes: 16,
        description: 'Erstelle einen einzigen Kern-Inhalt und verwandle ihn mit KI automatisch in 10+ Formate für alle Netzwerke.',
        learnContent: {
          videoTitle: 'Content Multiplication: 1 Idee = 10 Formate',
          videoDuration: '13:10',
          summaryText: 'Lerne das Repurposing-Framework kennen: Aus einer einzigen Idee entstehen Blogartikel, E-Mails, Short-Videos, Pins & Carousel-Posts.',
          bulletPoints: [
            'Das 1-zu-10 Content Repurposing Prinzip',
            'Automatisierte Terminierung von Social-Media Posts über Kalender-Tools',
            'Sicherung der Markenidentität über alle Kanäle hinweg'
          ],
          fullArticleGuide: `### Das Omnichannel Content-Imperium

Arbeite intelligenter, nicht härter. Mit KI musst du nicht für jede Plattform neue Inhalte erfinden.

#### Das Repurposing Schema:
1. **Haupt-Content (z.B. Lektion/E-Mail):** Der inhaltliche Anker.
2. **Transformierung durch Mara:**
   - 1x Short-Video Skript
   - 3x Social Media Posts (LinkedIn / Facebook)
   - 1x Infografik-Text für Pinterest / Instagram Carousel
   - 1x Zitat-Grafik für Storys`,
          practicalExamples: [
            'Nutze die Content-Multiplikationsfunktion in der GOM-MAR KI, um deine nächste Nachricht in 5 Formate zu verwandeln.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Durch KI-Syndikation erreichst du maximale Präsenz auf allen Kanälen mit minimalem Zeitaufwand.',
          keyPrinciples: ['1-zu-10 Repurposing', 'Kanaladäquater Aufbau']
        },
        actionTask: {
          instruction: 'Schließe das Omnichannel-Modul ab & erhalte deinen Multi-Channel Master-Status:',
          inputType: 'checklist',
          checklistItems: [
            'Ich kenne die Strategie für Faceless Short-Form Content',
            'Ich verstehe die Potenziale von KI-Audio & Podcasts',
            'Ich beherrsche das 1-zu-10 Content Repurposing Framework'
          ]
        }
      }
    ]
  },
  {
    id: 18,
    title: '18. KI-Agenten, Autonome Systeme & Enterprise Mastery',
    subtitle: 'Vollautonome Business-Agenten & Skalierung auf Enterprise-Niveau',
    color: 'from-cyan-600 to-blue-900',
    badgeIcon: 'psychology',
    description: 'Setze autonom agierende KI-Agenten ein, baue KI-gestützte Multi-Agenten-Netzwerke auf und skaliere dein Unternehmen auf Enterprise-Niveau.',
    lessons: [
      {
        id: '18.1',
        stageId: 18,
        stageTitle: '18. KI-Agenten, Autonome Systeme & Enterprise Mastery',
        title: 'Autonome KI-Agenten & Task-Execution',
        durationMinutes: 15,
        description: 'Verstehe das Prinzip von autonom agierenden KI-Agenten, die komplexe Aufgaben selbstständig planen, ausführen und optimieren.',
        learnContent: {
          videoTitle: 'Autonome KI-Agenten: Die nächste Generation der Automation',
          videoDuration: '12:50',
          summaryText: 'Lerne, wie autonome KI-Agenten nicht nur einfache Anweisungen befolgen, sondern eigenständig Zielvorgaben analysieren, Teilaufgaben erstellen und ausführen.',
          bulletPoints: [
            'Funktionsweise autonomer Agenten-Schleifen (Goal - Plan - Execute - Evaluate)',
            'Einsatzmöglichkeiten für Marktforschung, Content-Planung und Datenanalyse',
            'Integration von KI-Agenten in bestehende Business-Tools'
          ],
          fullArticleGuide: `### Die Evolution von KI: Von Prompts zu autonomen Agenten

Klassische KI reagiert auf Prompts. Autonome KI-Agenten hingegen erhalten ein übergeordnetes Ziel und erarbeiten den Weg dorthin eigenständig.

#### Der 4-Stufen-Agenten-Prozess:
1. **Zieldefinition:** Gib dem Agenten ein klares Ziel (z.B. „Recherchiere die 5 besten Conversion-Trends für Landingpages“).
2. **Aufgabenzerlegung:** Der Agent unterteilt die Aufgabe in logische Arbeitsschritte.
3. **Ausführung:** Er ruft Daten ab, analysiert Ergebnisse und erstellt Dokumente.
4. **Selbstkorrektur:** Der Agent überprüft seine Arbeitsergebnisse und korrigiert Fehler selbstständig.`,
          practicalExamples: [
            'Nutze die GOM-MAR KI Mara als deinen persönlichen Forschungs- und Content-Agenten in der Toolbox.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Autonome Agenten agieren wie hochspezialisierte digitale Mitarbeiter, die rund um die Uhr Resultate liefern.',
          keyPrinciples: ['Klare Zielvorgaben definieren', 'Ergebnisse systematisch validieren']
        },
        actionTask: {
          instruction: 'Starte deinen ersten KI-Agenten-Task in der GOM-MAR KI Mara:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'KI-Agenten Task ausgeführt'
        }
      },
      {
        id: '18.2',
        stageId: 18,
        stageTitle: '18. KI-Agenten, Autonome Systeme & Enterprise Mastery',
        title: 'Multi-Agenten-Netzwerke & KI-Orchestrierung',
        durationMinutes: 14,
        description: 'Baue ein Team aus spezialisierten KI-Agenten auf (Research, Copywriting, Design, Support), die nahtlos zusammenarbeiten.',
        learnContent: {
          videoTitle: 'Multi-Agenten-Orchestrierung: Dein digitales KI-Team',
          videoDuration: '11:40',
          summaryText: 'Ein einzelner Agent ist stark – ein Orchester aus spezialisierten Agenten baut ganze Kampagnen in Minuten auf.',
          bulletPoints: [
            'Rollenverteilung: Research-Agent, Copy-Agent, Designer-Agent & QA-Agent',
            'Nahtloser Informationsfluss zwischen den Spezial-Agenten',
            'Menschliche Qualitätskontrolle (Human-in-the-Loop) für perfekte Endergebnisse'
          ],
          fullArticleGuide: `### Das digitale KI-Unternehmen

Statt alle Aufgaben selbst zu erledigen, fungierst du als Director eines Teams virtueller Spezialisten.

#### Das Multi-Agenten-Rollenschema:
* **Agent 1 (Strategie):** Analysiert den Markt und definiert die Ausrichtung.
* **Agent 2 (Texter):** Schreibt die Werbetexte, E-Mails und Landingpage-Inhalte.
* **Agent 3 (Reviewer):** Prüft alle Texte auf Tonalität, Grammatik und DSGVO-Konformität.`,
          practicalExamples: [
            'Orchestriere dein KI-Team über das GOM-MAR KI Dashboard zur automatischen Erstellung einer vollständigen Kampagne.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Multi-Agenten-Systeme multiplizieren deine Produktivität um das Zehnfache bei gleichbleibend hoher Qualität.',
          keyPrinciples: ['Spezialisierte Agenten-Rollen nutzen', 'Human-in-the-Loop Kontrolle behalten']
        },
        actionTask: {
          instruction: 'Konfiguriere ein Multi-Agenten Briefing im KI Dashboard:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Multi-Agenten Briefing erstellt'
        }
      },
      {
        id: '18.3',
        stageId: 18,
        stageTitle: '18. KI-Agenten, Autonome Systeme & Enterprise Mastery',
        title: 'Enterprise Business Mastery & Exzellenz-Zertifizierung',
        durationMinutes: 16,
        description: 'Schließe die höchste Ausbildungsstufe der GOM-MAR Academy ab, validiere dein vollautonomes Business-Setup & erhalte den Enterprise Master Status.',
        learnContent: {
          videoTitle: 'Enterprise Mastery: Dein Platz an der Marktspitze',
          videoDuration: '13:30',
          summaryText: 'Herzlichen Glückwunsch! Du hast die gesamte GOM-MAR Academy von den Grundlagen bis zu autonom arbeitenden Enterprise-Systemen gemeistert.',
          bulletPoints: [
            'Finale Validierung deines automatisierten Business-Setups',
            'Freischaltung deines offiziellen GOM-MAR Enterprise Mastery Zertifikats',
            'Aufnahme in den exklusiven GOM-MAR Enterprise Circle'
          ],
          fullArticleGuide: `### Willkommen an der absolute Spitze der Digitalen Ökonomie!

Du verfügst nun über das modernste Wissen, die fortschrittlichsten Tools und ein vollintegriertes KI-Business-System.

#### Deine Erfolgs-Prinzipien für die Zukunft:
1. **Fokus auf Innovation:** Nutze neue KI-Technologien frühzeitig für Wettbewerbsvorteile.
2. **Skalierung ohne Stress:** Lasse deine Systeme wachsen, während deine persönliche Freiheit erhalten bleibt.
3. **Leadership:** Werde zum Vorbild und Mentor in der GOM-MAR Community.`,
          practicalExamples: [
            'Lade dein offizielles GOM-MAR Enterprise Mastery Zertifikat herunter und feiere deinen Erfolg!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Du besitzt die Fähigkeiten und Systeme der Top 1% der digitalen Unternehmer. Setze dein Wissen täglich um.',
          keyPrinciples: ['Kontinuierliche Exzellenz', 'Autonome Skalierung']
        },
        actionTask: {
          instruction: 'Schließe das Finale der Enterprise-Ausbildung ab & sichere dir dein Zertifikat:',
          inputType: 'checklist',
          checklistItems: [
            'Ich beherrsche das Prinzip autonomer KI-Agenten',
            'Ich kenne die Funktionsweise von Multi-Agenten-Netzwerken',
            'Ich habe die höchste Stufe der GOM-MAR Academy erfolgreich gemeistert'
          ]
        }
      }
    ]
  },
  {
    id: 19,
    title: '19. Data Analytics, Conversion-Optimierung & AI-Insights',
    subtitle: 'Datengetriebene Performance-Steigerung & KI-Prädiktion',
    color: 'from-violet-600 to-indigo-950',
    badgeIcon: 'analytics',
    description: 'Nutze präzise Datenanalysen, A/B-Testing & prädiktive KI-Insights, um deinen Customer Lifetime Value zu maximieren und Streuverluste zu minimieren.',
    lessons: [
      {
        id: '19.1',
        stageId: 19,
        stageTitle: '19. Data Analytics, Conversion-Optimierung & AI-Insights',
        title: 'A/B-Testing & Landingpage Conversion-Tracking',
        durationMinutes: 15,
        description: 'Optimiere Headlines, CTA-Buttons und Layouts mit systematischem A/B-Testing für maximale Opt-In und Verkaufsraten.',
        learnContent: {
          videoTitle: 'Conversion-Optimierung: Wissenschaftlich mehr Verkäufe erzielen',
          videoDuration: '12:40',
          summaryText: 'Lerne, wie du durch systematische A/B-Tests auf deiner Landingpage herausfindest, welche Headlines und visuellen Elemente die höchsten Conversion-Raten erzielen.',
          bulletPoints: [
            'Einrichtung von A/B-Split-Tests für Headlines, Farben und CTA-Buttons',
            'Messung statistischer Signifikanz für verlässliche Entscheidungen',
            'Vermeidung typischer Testfehler durch isolierte Variablenänderungen'
          ],
          fullArticleGuide: `### Das Prinzip der kontinuierlichen Conversion-Optimierung

Schon eine Steigerung deiner Opt-In-Rate von 20% auf 30% bedeutet 50% mehr Leads bei gleichem Werbeaufwand.

#### Der 3-Schritte A/B-Testing Zyklus:
1. **Hypothese aufstellen:** „Eine kürzere, lösungsorientierte Headline erhöht die Anmelderate.“
2. **Split-Test starten:** 50% des Traffics sieht Variante A (Original), 50% sieht Variante B (Neuer Text).
3. **Gewinner wählen:** Nach Erreichen von statistischer Signifikanz (mind. 100 Konversionen) wird die bessere Variante Standard.`,
          practicalExamples: [
            'Analysiere deine Kampagnen-Ergebnisse im GOM-MAR Dashboard, um erste A/B-Test-Hypothesen zu formulieren.'
          ]
        },
        understandContent: {
          coreTakeaway: 'A/B-Testing verwandelt Vermutungen in messbare Fakten und steigert deinen Umsatz ohne zusätzliche Werbekosten.',
          keyPrinciples: ['Immer nur eine Variable gleichzeitig testen', 'Auf statistische Signifikanz warten']
        },
        actionTask: {
          instruction: 'Prüfe deine aktuellen Conversion-Metriken im GOM-MAR Analytics Dashboard:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Analytics-Metriken überprüft'
        }
      },
      {
        id: '19.2',
        stageId: 19,
        stageTitle: '19. Data Analytics, Conversion-Optimierung & AI-Insights',
        title: 'Funnel-Analyse & Key Performance Indicators (KPIs)',
        durationMinutes: 14,
        description: 'Analysiere Drop-off Raten, Customer Acquisition Costs (CAC) und Return on Ad Spend (ROAS) zur gezielten System-Optimierung.',
        learnContent: {
          videoTitle: 'Funnel Analytics: Die wichtigsten Zahlen im Griff',
          videoDuration: '11:50',
          summaryText: 'Verstehe deine Funnel-Zahlen im Detail: Wo verlieren wir Interessenten und welche Stufen erwirtschaften den höchsten Deckungsbeitrag?',
          bulletPoints: [
            'Berechnung von Customer Acquisition Cost (CAC) und Return on Ad Spend (ROAS)',
            'Identifikation von Funnel-Engpässen (Drop-off Analysis)',
            'Gezielte Hebelansätze zur Verdopplung des Profit-Margins'
          ],
          fullArticleGuide: `### Die wichtigsten Funnel-Kennzahlen für Unternehmer

Wer seine Zahlen nicht kennt, steuert sein Business im Blindflug. Lerne die 4 mathematischen Säulen deines Erfolgs kennen.

#### Die Kern-KPIs im Überblick:
* **Opt-In Rate:** Prozentsatz der Besucher, die zu Leads werden (Ziel: >30%).
* **E-Mail Click-Through-Rate (CTR):** Prozentsatz der Leser, die auf Links klicken (Ziel: >15%).
* **Customer Acquisition Cost (CAC):** Kosten, um einen neuen Kunden zu gewinnen.
* **ROAS (Return on Ad Spend):** Erzielter Umsatz geteilt durch eingesetztes Werbebudget (Ziel: >2.0).`,
          practicalExamples: [
            'Nutze die KI Mara, um deinen aktuellen Funnel-Gesundheitswert basierend auf deinen Kennzahlen zu ermitteln.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Kenne deine Zahlen: Wer seine KPIs beherrscht, kann gezielt an den ertragsreichsten Stellschrauben drehen.',
          keyPrinciples: ['Engpässe im Funnel zuerst beheben', 'CAC stets unter dem Kundenwert halten']
        },
        actionTask: {
          instruction: 'Führe eine KI-Funnel-Analyse mit der GOM-MAR KI Mara durch:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Funnel-Analyse abgeschlossen'
        }
      },
      {
        id: '19.3',
        stageId: 19,
        stageTitle: '19. Data Analytics, Conversion-Optimierung & AI-Insights',
        title: 'Prädiktive KI-Analytik & Customer Lifetime Value (LTV)',
        durationMinutes: 16,
        description: 'Prognostiziere Kundenverhalten mit KI-Analyse, maximiere den Wiederkaufswert und erhalte den GOM-MAR Data Mastery Status.',
        learnContent: {
          videoTitle: 'Predictive Analytics: Kundenverhalten voraussehen',
          videoDuration: '13:10',
          summaryText: 'Setze prädiktive KI-Modelle ein, um Abwanderungsrisiken frühzeitig zu erkennen und den Customer Lifetime Value durch automatisierte Upsells zu maximieren.',
          bulletPoints: [
            'Einsatz von KI zur Prognose des Customer Lifetime Value (LTV)',
            'Automatische Auslösung von Rückgewinnungs-Aktionen bei inaktiven Kontakten',
            'Gezielte Upsell-Angebote zum optimalen Kaufzeitpunkt'
          ],
          fullArticleGuide: `### Maximale Profitabilität durch Customer Lifetime Value

Der eigentliche Gewinn im Digital Business entsteht nicht beim Erstkauf, sondern durch wiederkehrende Käufe zufriedener Stammkunden.

#### Die LTV-Maximierungs-Strategie:
1. **Verhaltens-Scoring:** Die KI bewertet Interaktionen (Öffnungen, Clicks, Kursfortschritt).
2. **Predictive Timing:** Angebote werden genau dann versendet, wenn die Kaufwahrscheinlichkeit am höchsten ist.
3. **Retention Automations:** Inaktive Nutzer erhalten automatisierte Re-Engagement Anreize.`,
          practicalExamples: [
            'Aktiviere die prädiktiven KI-Insights im Dashboard, um Empfehlungen für deine Kampagnen zu erhalten.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein hoher Customer Lifetime Value erlaubt dir höhere Werbeausgaben als die Konkurrenz und sichert deine Marktführerschaft.',
          keyPrinciples: ['Bestandskundenpflege vor Neukundenakquise', 'KI-Empfehlungen nutzen']
        },
        actionTask: {
          instruction: 'Schließe das Analytics-Modul ab & schalte deinen Data Mastery Status frei:',
          inputType: 'checklist',
          checklistItems: [
            'Ich verstehe die Methodik von A/B-Split-Tests',
            'Ich kenne die wichtigsten Funnel-KPIs (CAC, ROAS, LTV)',
            'Ich kann prädiktive KI-Insights zur Erhöhung des Kundenwerts nutzen'
          ]
        }
      }
    ]
  },
  {
    id: 20,
    title: '20. KI-Ökosysteme, Ethik & Zukunftssicheres Growth-Mastery',
    subtitle: 'Zukunftssichere Systeme, Ethische KI & Dauerhafter Wohlstand',
    color: 'from-amber-400 to-yellow-600',
    badgeIcon: 'stars',
    description: 'Baue zukunftssichere KI-Ökosysteme auf, nutze ethische KI-Standards für langfristiges Markenvertrauen und vollende dein digitales Gesamtkunstwerk.',
    lessons: [
      {
        id: '20.1',
        stageId: 20,
        stageTitle: '20. KI-Ökosysteme, Ethik & Zukunftssicheres Growth-Mastery',
        title: 'Ethische KI & Transparenz im Online-Marketing',
        durationMinutes: 15,
        description: 'Lerne, wie du KI verantwortungsvoll einsetzt, Markenvertrauen aufbaust und echte Beziehungen zu deinen Kunden pflegst.',
        learnContent: {
          videoTitle: 'Ethische KI: Vertrauen als stärkste Währung im Netz',
          videoDuration: '12:10',
          summaryText: 'In einer Welt voller automatisierter Inhalte gewinnt Transparenz, Authentizität und ethischer KI-Einsatz massiv an Wert.',
          bulletPoints: [
            'Transparenter Umgang mit KI-generierten Inhalten und Kundendaten',
            'Vermeidung von irreführenden Versprechungen und KI-Halluzinationen',
            'Aufbau einer unverwechselbaren menschlichen Kernmarke'
          ],
          fullArticleGuide: `### Warum Ethik dein größter Wettbewerbsvorteil ist

Technologie verändert sich rasant, aber menschliches Vertrauen bleibt die Grundlage jedes erfolgreichen Geschäfts.

#### Die 3 Grundsätze ethischen KI-Marketings:
1. **Authentischer Mehrwert:** KI dient als Verstärker deines Expertenwissens, nicht als billiger Ersatz.
2. **Kundenorientierte Transparenz:** Sei ehrlich darüber, wie automatisierte Systeme deinen Kundenservice unterstützen.
3. **Qualitätssicherung:** Überprüfe KI-Ergebnisse stets auf Richtigkeit und emotionale Angemessenheit.`,
          practicalExamples: [
            'Nutze die GOM-MAR KI Mara, um deine Kampagnen-Texte auf authentische Marken-Tonalität zu prüfen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ethische KI schafft unerschütterliches Kundenvertrauen und unterscheidet dich nachhaltig vom Wettbewerb.',
          keyPrinciples: ['Menschliche Note bewahren', 'Transparenz als Stärke nutzen']
        },
        actionTask: {
          instruction: 'Führe einen Tonalitäts- & Ethik-Check in der GOM-MAR KI Mara durch:',
          inputType: 'link_toolbox',
          toolboxCategory: 'content',
          placeholder: 'Ethik-Check durchgeführt'
        }
      },
      {
        id: '20.2',
        stageId: 20,
        stageTitle: '20. KI-Ökosysteme, Ethik & Zukunftssicheres Growth-Mastery',
        title: 'Plattformunabhängigkeit & Zukunftssichere Ökosysteme',
        durationMinutes: 14,
        description: 'Schütze dein Business vor Algorithmus-Änderungen durch den Aufbau eigener Daten-Assets (E-Mail, Community, eigene Plattform).',
        learnContent: {
          videoTitle: 'Plattformunabhängigkeit: Dein eigenes digitales Ökosystem',
          videoDuration: '11:30',
          summaryText: 'Baue ein digitales Fundament auf, das unabhängig von einzelnen Social-Media-Netzwerken oder Werbeplattformen funktioniert.',
          bulletPoints: [
            'Die Gefahr von Plattform-Abhängigkeit (Rent-vs-Own Prinzip)',
            'E-Mail-Liste & Community als unpfändbare Kern-Assets',
            'Diversifikation deiner Lead- und Traffic-Quellen'
          ],
          fullArticleGuide: `### Das Prinzip des unzerstörbaren Ökosystems

Gemietetes Publikum auf Social Media kann durch Algorithmus-Änderungen über Nacht schrumpfen. Deine eigene E-Mail-Liste gehört hingegen zu 100% dir.

#### Die 3 Säulen deines eigenen Ökosystems:
* **Eigene E-Mail-Liste:** Direkter Kanal zu deinen Leads ohne Zwischenhändler.
* **Eigene Plattform & Kurse:** Volle Kontrolle über deine Inhalte und Kundenerlebnisse.
* **Mehrere Traffic-Kanäle:** Organisch, Paid, Empfehlungen & Partnerschaften.`,
          practicalExamples: [
            'Exportiere und sichere deine Daten regelmäßig im GOM-MAR Dashboard.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Baue dein Business auf eigenem Grund und Boden – deine E-Mail-Liste ist dein wertvollstes Asset.',
          keyPrinciples: ['Eigene Daten-Assets bevorzugen', 'Risiken diversifizieren']
        },
        actionTask: {
          instruction: 'Überprüfe deine Daten-Backups & Ökosystem-Strategie:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Ökosystem-Backup geprüft'
        }
      },
      {
        id: '20.3',
        stageId: 20,
        stageTitle: '20. KI-Ökosysteme, Ethik & Zukunftssicheres Growth-Mastery',
        title: 'Das Grand Finale: Das GOM-MAR Ultimate Excellence Diplom',
        durationMinutes: 18,
        description: 'Vollende die 20 Module der GOM-MAR Academy, erhalte dein offizielles Ultimate Excellence Diplom & feiere deinen Aufstieg zum Top-Performer.',
        learnContent: {
          videoTitle: 'Grand Finale: Dein Meisterwerk ist vollbracht',
          videoDuration: '14:20',
          summaryText: 'Ein historischer Meilenstein! Du hast alle 20 Module der GOM-MAR Academy durchlaufen und besitzt ein vollfunktionsfähiges, skaliertes KI-Business-System.',
          bulletPoints: [
            'Abschluss-Rückblick über alle 20 Meilensteine deiner Transformation',
            'Freischaltung deines exklusiven GOM-MAR Ultimate Excellence Diploms',
            'Lebenslanger Zugang zur Hall of Fame & Premium Alumni-Netzwerk'
          ],
          fullArticleGuide: `### Herzlichen Glückwunsch zum Ultimate Excellence Diplom!

Du hast Unglaubliches geleistet. Von der ersten Nischenidee über Landingpages, E-Mail-Sequenzen, KI-Agenten, Analytics bis hin zu zukunftssicheren Ökosystemen hast du das gesamte Spektrum des modernen KI-Marketings gemeistert.

#### Dein dauerhaftes Erfolgs-Set:
1. **Sei stolz auf deinen Weg:** Du hast mehr Wissen und praxiserprobte Systeme als 99% aller Marktteilnehmer.
2. **Nutze dein System täglich:** Halte deine Routinen aufrecht und skaliere in deinem eigenen Tempo.
3. **Inspiriere andere:** Dein Erfolg ist der beste Beweis für die Kraft von fokussierter Umsetzung.`,
          practicalExamples: [
            'Lade jetzt dein offizielles GOM-MAR Ultimate Excellence Diplom herunter und feiere deinen grandiosen Erfolg!'
          ]
        },
        understandContent: {
          coreTakeaway: 'Du bist nun zertifizierter GOM-MAR Ultimate Excellence Marketer. Die Zukunft gehört dir!',
          keyPrinciples: ['Gelerntes konsequent anwenden', 'Niemals aufhören zu wachsen']
        },
        actionTask: {
          instruction: 'Schließe das finale Modul 20 ab & fordere dein Ultimate Excellence Diplom an:',
          inputType: 'checklist',
          checklistItems: [
            'Ich verstehe die Prinzipien ethischen KI-Marketings',
            'Ich besitze ein plattformunabhängiges digitales Ökosystem',
            'Ich habe alle 20 Module der GOM-MAR Academy erfolgreich gemeistert'
          ]
        }
      }
    ]
  },
  {
    id: 21,
    title: '21. Advanced CRM, Pipeline Management & Lead Scoring',
    subtitle: 'Intelligentes Kontaktmanagement & Hochkonvertierende Sales Pipelines',
    color: 'from-blue-600 to-indigo-900',
    badgeIcon: 'contacts',
    description: 'Baue ein automatisiertes CRM-System auf: Lead Scoring (z.B. Hot Leads mit 85/100), lückenlose Interaktions-Historie, Tagging-Segmente und Pipeline-Management.',
    lessons: [
      {
        id: '21.1',
        stageId: 21,
        stageTitle: '21. Advanced CRM, Pipeline Management & Lead Scoring',
        title: 'Lead Scoring & Automatische Kontakt-Qualifizierung',
        durationMinutes: 15,
        description: 'Bewerte Leads automatisch nach Kaufbereitschaft: Punktesystem für Webinar-Anmeldungen, Landingpage-Aufrufe & Mail-Öffnungen.',
        learnContent: {
          videoTitle: 'Lead Scoring: Die heißesten Kaufinteressenten sofort erkennen',
          videoDuration: '12:30',
          summaryText: 'Ein Lead Score (z.B. 85/100) zeigt dir auf einen Blick, welche Kontakte abschlussbereit sind und jetzt kontaktiert werden sollten.',
          bulletPoints: [
            'Punktevergabe nach Nutzeraktivität (z.B. +20 Punkte für Webinar-Teilnahme, +15 für Preisseite)',
            'Automatische Zuweisung von Status-Badges wie „Hot Lead“ oder „Kunde (Aktiv)“',
            'Fokus auf die 20% der Leads, die für 80% des Umsatzes sorgen'
          ],
          fullArticleGuide: `### Warum Lead Scoring den Vertrieb revolutioniert

Nicht jeder Kontakt auf deiner Liste ist sofort kaufbereit. Mit einem automatischen Lead-Score filterst du sofort heraus, wer echtes Kaufinteresse zeigt.

#### Die Punkte-Matrix im GOM-MAR CRM:
* **Webinar-Anmeldung & Teilnahme:** +25 Punkte
* **Besuch der Pricing-/Angebotsseite (>3 Min):** +20 Punkte
* **Öffnen von 3+ E-Mails in Folge:** +15 Punkte
* **Inaktivität über 30 Tage:** -10 Punkte (Abkühlung)`,
          practicalExamples: [
            'Überprüfe das CRM-Profil von Hot Leads wie Anna Müller im CRM-Bereich und plane den nächsten Schritt.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Lead Scoring spart wertvolle Vertriebszeit, indem du dich gezielt auf die abschlussstärksten Kontakte konzentrierst.',
          keyPrinciples: ['Aktivitätsbasierte Punktewerte', 'Schnelles Follow-Up bei Hot Leads']
        },
        actionTask: {
          instruction: 'Prüfe den Lead-Score deiner Kontakte im CRM:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Lead-Scores überprüft'
        }
      },
      {
        id: '21.2',
        stageId: 21,
        stageTitle: '21. Advanced CRM, Pipeline Management & Lead Scoring',
        title: 'Aktivitäts-Historie, Interaktions-Tracking & CRM-Notizen',
        durationMinutes: 14,
        description: 'Lückenlose Dokumentation aller Berührungspunkte: Webseiten-Besuche, Mail-Verläufe, Anrufe & strukturierte Gesprächsnotizen.',
        learnContent: {
          videoTitle: 'Der perfekte Interaktionsverlauf im modernen CRM',
          videoDuration: '11:45',
          summaryText: 'Verfolge jeden Schritt deiner Kontakte in einer chronologischen Timeline und halte Notizen für dein Team oder dein eigenes Follow-Up fest.',
          bulletPoints: [
            'Chronologische Zeitleiste aller Interaktionen (Webinar, Landingpage, Mails)',
            'Festhalten von Team-Notizen mit Budget, Teamgröße und Zeithorizont',
            'Schnellaktionen: Direkter E-Mail-Versand oder Anruf-Vorbereitung mit einem Klick'
          ],
          fullArticleGuide: `### Die Kraft des lückenlosen Interaktionsverlaufs

Kunden schätzen persönliche Wertschätzung. Wenn du genau weißt, welche Seiten der Lead besucht hat und welches Thema ihn interessiert, wird dein Verkaufsgespräch zum Kinderspiel.

#### Best Practices für CRM-Notizen:
1. **Konkrete Daten festhalten:** Budget, Teamgröße, Schmerzpunkt.
2. **Nächste Aktion festlegen:** Z.B. „Folgetermin im November vereinbaren“.
3. **Kontext nutzen:** Vor jedem Anruf die letzten 3 Timeline-Ereignisse kurz scannen.`,
          practicalExamples: [
            'Füge eine Notiz zu einem bestehenden Kontakt im CRM hinzu, um den nächsten Folgeschritt zu dokumentieren.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Ein gepflegter Interaktionsverlauf macht deine Kundenbetreuung hochprofessionell und verhindert verlorene Leads.',
          keyPrinciples: ['Notizen direkt nach dem Kontakt anlegen', 'Timeline vor Kontaktaufnahme prüfen']
        },
        actionTask: {
          instruction: 'Erstelle eine Follow-Up Notiz in deinem CRM:',
          inputType: 'link_toolbox',
          toolboxCategory: 'email',
          placeholder: 'Notiz im CRM angelegt'
        }
      },
      {
        id: '21.3',
        stageId: 21,
        stageTitle: '21. Advanced CRM, Pipeline Management & Lead Scoring',
        title: 'Segmentierung, Tagging & High-Conversion Sales Pipelines',
        durationMinutes: 16,
        description: 'Strukturiere deine Kontakte mit Tags (z.B. B2B, Interessiert, Newsletter) und steuere Deals durch transparente Pipeline-Phasen.',
        learnContent: {
          videoTitle: 'Segmentierung & Pipeline-Phasen für maximale Abschlussraten',
          videoDuration: '13:15',
          summaryText: 'Lerne, wie du Kontakte in messerscharfe Zielgruppen unterteilst und sie systematisch von der Erstqualifizierung bis zum Kaufabschluss führst.',
          bulletPoints: [
            'Tag-basiertes Segmentieren (z.B. #B2B, #Interessiert, #VIP-Kunde)',
            'Pipelines mit Phasen: Lead erfasst -> Qualifiziert -> Angebot -> Gewonnen',
            'Automatisierte Aktionen beim Wechsel einer Pipeline-Phase'
          ],
          fullArticleGuide: `### Systematisches Pipeline-Management

Ein chaotisches Notizbuch kostet bares Geld. Mit klaren Phasen in deiner Pipeline behältst du immer den Überblick über alle offenen Abschlüsse.

#### Die 4 Phasen einer High-Conversion Pipeline:
1. **Lead erfasst:** Der Kontakt hat sich eingetragen oder ein Webinar gebucht.
2. **Qualifiziert:** Der Lead Score liegt über 60 und das Budget passt.
3. **Angebot präsentiert:** Demo oder Beratungsgespräch hat stattgefunden.
4. **Gewonnen / Onboarding:** Der Vertrag ist geschlossen, Willkommenssequenz startet.`,
          practicalExamples: [
            'Erstelle Segmente im GOM-MAR CRM für zielgerichtete E-Mail-Kampagnen.'
          ]
        },
        understandContent: {
          coreTakeaway: 'Klare Pipeline-Phasen und Segmente stellen sicher, dass kein einziger potenzieller Kunde in Vergessenheit gerät.',
          keyPrinciples: ['Konsistentes Tagging nutzen', 'Deals aktiv durch Phasen bewegen']
        },
        actionTask: {
          instruction: 'Schließe das CRM- & Pipeline-Modul ab & schalte deinen CRM-Master Status frei:',
          inputType: 'checklist',
          checklistItems: [
            'Ich verstehe das Prinzip von Lead Scoring (z.B. Hot Leads)',
            'Ich kenne die Bedeutung des Interaktionsverlaufs & strukturierter Notizen',
            'Ich kann Segmente und Pipeline-Phasen im CRM sicher anwenden'
          ]
        }
      }
    ]
  },
  {
    id: 22,
    title: '22. Conversion Rate Optimierung & Landingpage Masterclass',
    subtitle: 'Der perfekte Landingpage-Aufbau: Von Besuchern zu treuen Kunden',
    color: 'from-blue-600 via-indigo-600 to-violet-600',
    badgeIcon: '🚀',
    description: 'Meistere die essenziellen psychologischen und strukturellen Bausteine einer hochkonvertierenden Landingpage, um Traffic verlässlich in Umsatz zu verwandeln.',
    lessons: [
      {
        id: '22.1',
        stageId: 22,
        stageTitle: '22. Modul 3: Conversion Rate Optimierung',
        title: 'Der perfekte Landingpage-Aufbau',
        durationMinutes: 35,
        description: 'Lerne die essenziellen psychologischen und strukturellen Bausteine einer hochkonvertierenden Landingpage kennen, um aus Besuchern Kunden zu machen.',
        learnContent: {
          videoTitle: 'Der perfekte Landingpage-Aufbau (Masterclass)',
          videoDuration: '35:20',
          summaryText: 'Lerne die essenziellen psychologischen und strukturellen Bausteine einer hochkonvertierenden Landingpage kennen, um aus Besuchern Kunden zu machen.',
          bulletPoints: [
            'Headline: Klarheit vor Cleverness – Wertversprechen in < 3 Sekunden verständlich machen.',
            'Der Hook: Besucher visuell und textlich durch offene Fragen und Überraschungs-Fakten fesseln.',
            'Social Proof: Sofortiges Vertrauen durch echte Testimonials, Partner-Logos und Nutzerzahlen schaffen.',
            'Call to Action (CTA): Klare Handlungsaufforderung, farblich als stärkster Kontrastpunkt der Seite.'
          ],
          coreConcepts: [
            {
              iconName: 'title',
              title: 'HEADLINE',
              description: 'Klarheit vor Cleverness. Dein Wertversprechen muss in unter 3 Sekunden verstanden werden. Beantworte die Frage: "Was habe ich davon?"',
              highlight: true
            },
            {
              iconName: 'anchor',
              title: 'DER HOOK',
              description: 'Ziehe den Besucher visuell und inhaltlich in den Text. Nutze offene Fragen oder überraschende Fakten in der Subheadline.'
            },
            {
              iconName: 'stars',
              title: 'SOCIAL PROOF',
              description: 'Baue sofortiges Vertrauen auf. Nutze echte Testimonials, Logos bekannter Partner oder konkrete Nutzerzahlen ("Über 10.000 Kunden").'
            },
            {
              iconName: 'touch_app',
              title: 'CALL TO ACTION (CTA)',
              description: 'Eine klare, logische Handlungsaufforderung. Der Button muss farblich der kontrastreichste Punkt der Seite sein.'
            }
          ],
          resources: [
            {
              title: 'Landingpage Generator',
              subtitle: 'Interaktives Tool starten',
              type: 'tool',
              iconName: 'construction',
              actionUrl: 'landingpage'
            },
            {
              title: 'Checkliste Landingpage',
              subtitle: 'PDF, 1.2 MB',
              type: 'pdf',
              iconName: 'picture_as_pdf'
            }
          ],
          fullArticleGuide: `### Der psychologische Aufbau einer High-Conversion Landingpage

Eine Landingpage hat genau eine einzige Aufgabe: Einen Besucher ohne Ablenkung zu einer konkreten Handlung (Kauf, Opt-In, Demo-Buchung) zu führen.

#### 1. Die Headline (Das 3-Sekunden-Gesetz)
Deine Überschrift muss sofort den Nutzen auf den Punkt bringen. Vermeide abstrakte Kunstbegriffe. Der Besucher fragt sich im ersten Moment: *"Was bringt mir das und warum sollte ich hier bleiben?"*

#### 2. Der Hook & Emotionaler Einstieg
Unter der Headline sitzt der Hook. Hier sprichst du den größten Engpass deiner Zielgruppe an und zeigst auf, wie dein Angebot diesen Schmerz löst.

#### 3. Glaubwürdiger Social Proof
Menschen kaufen von Menschen, denen sie vertrauen. Zeige konkrete Kundenstimmen mit echtem Foto, Vor- und Nachnamen und messbaren Ergebnissen.

#### 4. Unmissverständlicher Call to Action (CTA)
Formuliere deinen CTA-Button immer aktivierend (z.B. *"Jetzt kostenlose Checkliste sichern"* statt bloß *"Absenden"*).`,
          practicalExamples: [
            'Schlechte Headline: „Innovative Synergien für modernes Wachstum.“',
            'Gute Headline: „Gewinne 5-10 qualifizierte B2B-Leads pro Woche – komplett automatisiert.“'
          ]
        },
        understandContent: {
          coreTakeaway: 'Klarheit schlägt Cleverness: Wenn dein Besucher in 3 Sekunden nicht versteht, was du anbietest, verlässt er deine Seite für immer.',
          keyPrinciples: [
            'Headline beantwortet: Was habe ich davon?',
            'Social Proof mit echten Zahlen & Gesichtern hinterlegen',
            'Nur EIN zentrales Ziel pro Landingpage verfolgen'
          ]
        },
        actionTask: {
          instruction: 'Deine Aufgabe – Prüfe deine Landingpage anhand dieser Checkliste:',
          inputType: 'checklist',
          checklistItems: [
            'Headline auf absolute Klarheit geprüft?',
            'Subheadline verstärkt das Hauptversprechen?',
            'Mindestens 3 glaubwürdige Testimonials eingebunden?',
            'CTA-Button farblich maximal kontrastierend?'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '22.2',
        stageId: 22,
        stageTitle: '22. Conversion Rate Optimierung & Landingpage Masterclass',
        title: 'A/B-Testing & Heatmap-Analyse',
        durationMinutes: 20,
        description: 'Lerne, wie du mit datengetriebenen Splittests und Scroll-Heatmaps Schwachstellen auf deiner Landingpage aufdeckst.',
        learnContent: {
          videoTitle: 'Conversion-Optimierung durch systematische Splittests',
          videoDuration: '18:40',
          summaryText: 'Verdopple deine Conversion Rate durch strukturierte Tests von Headlines, Hero-Images und Call-to-Action Buttons.',
          bulletPoints: [
            'Immer nur eine Variable pro Splittest ändern (Headlines vs. Buttons)',
            'Scroll-Tiefe und Drop-Off-Punkte analysieren',
            'Mobile First Optimierung für maximale Ladegeschwindigkeit'
          ],
          coreConcepts: [
            {
              iconName: 'compare',
              title: 'A/B-TESTING',
              description: 'Lasse 2 Versionen gegeneinander antreten. Teste zuerst die Headline, da sie 80% des Erfolgs ausmacht.',
              highlight: true
            },
            {
              iconName: 'thermostat',
              title: 'HEATMAPS',
              description: 'Analysiere, wie weit Besucher scrollen und wohin sie klicken, um Reibungspunkte sofort zu beseitigen.'
            }
          ],
          resources: [
            {
              title: 'A/B Test Rechner',
              subtitle: 'Statistische Signifikanz berechnen',
              type: 'tool',
              iconName: 'calculate'
            }
          ],
          fullArticleGuide: `### Datengetriebene Conversion-Optimierung

Erfolgreiche Marketer raten nicht – sie messen. Mit A/B-Tests findest du verlässlich heraus, welche Formulierungen bei deinen Besuchern am besten ankommen.`
        },
        understandContent: {
          coreTakeaway: 'Kleine Änderungen an Headline und CTA-Farbe können deine Eintragungsrate oft um 50% bis 150% steigern.',
          keyPrinciples: ['Statistische Signifikanz abwarten', 'Immer mit der Headline starten']
        },
        actionTask: {
          instruction: 'Führe eine A/B Test Vorbereitung für deine Landingpage durch:',
          inputType: 'checklist',
          checklistItems: [
            '2 verschiedene Headline-Varianten formuliert',
            'Mobil-Ansicht auf Ladezeit und Lesbarkeit geprüft',
            'Tracking und Conversion-Events scharf geschaltet'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 23,
    title: '23. E-Mail Marketing Masterclass: Betreffzeilen & Automation',
    subtitle: 'Die Kunst der Betreffzeile: Maximale Öffnungsraten & Klickraten',
    color: 'from-indigo-600 via-purple-600 to-pink-600',
    badgeIcon: '✉️',
    description: 'Lerne, wie du Betreffzeilen schreibst, die deine Öffnungsraten durch die Decke gehen lassen. Der erste Eindruck entscheidet über Erfolg oder Papierkorb.',
    lessons: [
      {
        id: '23.1',
        stageId: 23,
        stageTitle: '23. Modul 4: E-Mail Marketing',
        title: 'Die Kunst der Betreffzeile',
        durationMinutes: 25,
        description: 'Lerne, wie du Betreffzeilen schreibst, die deine Öffnungsraten durch die Decke gehen lassen. Der erste Eindruck zählt.',
        learnContent: {
          videoTitle: 'Die Anatomie hochkonvertierender Betreffzeilen',
          videoDuration: '24:15',
          summaryText: 'Die Betreffzeile ist der Türsteher deines E-Mail-Marketings. Sie entscheidet innerhalb von Millisekunden, ob deine sorgfältig formulierte E-Mail gelesen wird oder im Papierkorb landet.',
          bulletPoints: [
            'Urgent (Dringend): Warum muss die E-Mail jetzt sofort gelesen werden?',
            'Unique (Einzigartig): Was hebt diese E-Mail von Hunderten anderen im Posteingang ab?',
            'Ultra-specific (Ultra-spezifisch): Exakte Zahlen, Prozente und greifbare Fakten nennen.',
            'Useful (Nützlich): Welchen unmittelbaren Mehrwert und Nutzen hat der Leser?'
          ],
          coreConcepts: [
            {
              iconName: 'zap',
              title: 'URGENT (DRINGEND)',
              description: 'Warum muss die E-Mail jetzt sofort geöffnet werden? Echte Deadlines und Aktualität treiben die Öffnungsrate.',
              highlight: true
            },
            {
              iconName: 'sparkles',
              title: 'UNIQUE (EINZIGARTIG)',
              description: 'Was hebt diese E-Mail von hunderten anderen im Posteingang ab? Nutze überraschende Metaphern oder Fragen.'
            },
            {
              iconName: 'target',
              title: 'ULTRA-SPECIFIC',
              description: 'Nenne exakte Zahlen und Fakten: "Wie Anna 3.420 € in 14 Tagen erzielte" schlägt allgemeine Floskeln um Längen.'
            },
            {
              iconName: 'gift',
              title: 'USEFUL (NÜTZLICH)',
              description: 'Welchen konkreten Mehrwert hat der Leser? Ein klares Nutzenversprechen schützt vor dem schnellen Löschen.'
            }
          ],
          actionBanner: {
            title: 'Keine Idee für den nächsten Newsletter?',
            description: 'Nutze unseren KI-gestützten Generator, um in Sekunden 10 hochkonvertierende Betreffzeilen zu erstellen.',
            buttonText: 'Zum E-Mail Generator',
            actionUrl: 'email',
            iconName: 'auto_awesome'
          },
          resources: [
            {
              title: 'E-Mail Generator (KI-Tool)',
              subtitle: '10 Betreffzeilen in Sekunden erstellen',
              type: 'tool',
              iconName: 'smart_toy',
              actionUrl: 'email'
            },
            {
              title: '50 High-Converting Betreffzeilen Vorlagen',
              subtitle: 'PDF, 1.4 MB',
              type: 'pdf',
              iconName: 'picture_as_pdf'
            }
          ],
          fullArticleGuide: `### Warum die Betreffzeile alles entscheidet

Die Betreffzeile ist der Türsteher deines E-Mail-Marketings. Sie entscheidet innerhalb von Millisekunden, ob deine sorgfältig formulierte E-Mail gelesen wird oder im Papierkorb landet.

Eine gute Betreffzeile weckt Neugier, verspricht einen klaren Nutzen oder erzeugt ein Gefühl von Dringlichkeit (FOMO). In dieser Lektion analysieren wir die Anatomie der perfekten Betreffzeile anhand echter Daten.

#### Die 4 U's einer perfekten Betreffzeile:
- **Urgent (Dringend):** Warum muss die E-Mail jetzt sofort gelesen werden?
- **Unique (Einzigartig):** Was hebt diese E-Mail von den hunderten anderen im Posteingang ab?
- **Ultra-specific (Ultra-spezifisch):** Welche genauen Zahlen oder Fakten kannst du nennen?
- **Useful (Nützlich):** Welchen konkreten Mehrwert hat der Leser?

#### Best Practices für maximale Öffnungsraten:
- **Länge:** Maximal 40–50 Zeichen, damit auf Smartphones nichts abgeschnitten wird.
- **Preheader / Vorschautext:** Nutze die zweite Zeile als zweiten Hook.
- **Spam-Vermeidung:** Verzichte auf übermäßige Großbuchstaben (CAPS) oder zu viele Ausrufezeichen (!!!).`,
          practicalExamples: [
            'Schwach: „Unser neuer Newsletter ist da!“ (0% Neugier, 0% Nutzen)',
            'Stark: „[Fallstudie] Wie Thomas seine Öffnungsrate um 42% verdoppelte“ (Spezifisch + Nützlich)',
            'Stark mit Neugier: „Machst du auch diesen 1 Fehler beim E-Mail Versand?“ (Open Loop)'
          ]
        },
        understandContent: {
          coreTakeaway: '80% des Erfolgs einer E-Mail-Kampagne hängen an der Betreffzeile. Erst wenn geöffnet wird, kann dein Angebot verkaufen.',
          keyPrinciples: [
            'Die 4 U-Formel konsequent anwenden (Urgent, Unique, Ultra-specific, Useful)',
            'Smartphone-Ansicht (unter 50 Zeichen) immer als Referenz nehmen',
            'Den Preheader als zweiten Teaser strategisch einsetzen'
          ]
        },
        actionTask: {
          instruction: 'Pre-Send Checkliste – Prüfe deine Betreffzeile und E-Mail vor dem Absenden:',
          inputType: 'checklist',
          checklistItems: [
            'Maximal 50 Zeichen lang?',
            'Keine Spam-Wörter verwendet?',
            'Vorschautext (Preheader) optimiert?',
            'A/B Test aufgesetzt?',
            'Personalisierung geprüft?'
          ],
          toolboxCategory: 'email'
        }
      },
      {
        id: '23.2',
        stageId: 23,
        stageTitle: '23. Modul 4: E-Mail Marketing',
        title: 'Automatisierte Nurture-Sequenzen',
        durationMinutes: 30,
        description: 'Baue automatisierte 5-Stufen E-Mail-Sequenzen auf, die aus kalten Leads treue Käufer und Empfehler machen.',
        learnContent: {
          videoTitle: 'Der Aufbau einer konvertierenden Welcome- & Nurture-Strecke',
          videoDuration: '28:30',
          summaryText: 'Automatisiere den Vertrauensaufbau: Mit einer strukturierten Willkommenssequenz verkaufst du rund um die Uhr, ohne manuell Mails schreiben zu müssen.',
          bulletPoints: [
            'E-Mail 1: Sofortige Zustellung des Lead-Magneten + Erwartungsmanagement',
            'E-Mail 2: Deine persönliche Story & größter Wendepunkt',
            'E-Mail 3: Konkreter Mehrwert & Beseitigung des größten Einwands',
            'E-Mail 4: Social Proof & Fallstudie eines erfolgreichen Nutzers',
            'E-Mail 5: Das unschlagbare Kernangebot & zeitlich limitierter CTA'
          ],
          coreConcepts: [
            {
              iconName: 'mail',
              title: 'WELCOME-FLOW',
              description: 'Liefere sofort das versprochene Freebie und setze die Erwartungen für die kommenden Tage.',
              highlight: true
            },
            {
              iconName: 'user_check',
              title: 'STORYTELLING',
              description: 'Zeige deine menschliche Seite. Warum machst du, was du tust und wie hilft es dem Leser?'
            }
          ],
          resources: [
            {
              title: 'E-Mail Automation Workflow',
              subtitle: 'Vorlagen im Automation-Editor öffnen',
              type: 'tool',
              iconName: 'mail',
              actionUrl: 'email'
            }
          ],
          fullArticleGuide: `### Die 5-Stufen Welcome-Sequenz

Eine strukturierte Begrüßungssequenz erzielt die höchsten Öffnungsraten (oft über 60%). Nutze dieses Momentum, um sofort eine echte Beziehung aufzubauen.`
        },
        understandContent: {
          coreTakeaway: 'Wer nicht automatisiert, verliert Leads. Ein durchdachter Welcome-Flow konvertiert bis zu 3x mehr Kunden als unregelmäßige Newsletter.',
          keyPrinciples: ['Zustellbarkeit & SPF/DKIM prüfen', 'Klare Call to Actions setzen']
        },
        actionTask: {
          instruction: 'Erstelle deine erste 5-teilige Welcome-Sequenz im E-Mail & CRM Editor:',
          inputType: 'checklist',
          checklistItems: [
            'Lead-Magnet E-Mail mit Download-Link erstellt',
            'Story-E-Mail mit persönlichem Einblick formuliert',
            'Zeitverzögerungen (1 Tag Wartezeit) eingerichtet'
          ],
          toolboxCategory: 'email'
        }
      }
    ]
  },
  {
    id: 24,
    title: '24. Mara CRM: Lead Insights & KI-Vertrieb',
    subtitle: 'Verhaltensanalyse, Lead-Scoring & automatisierte Follow-up Sequenzen',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeIcon: '✨',
    description: 'Verwandle rohe Kontaktdaten mit KI-gestützten Verhaltensanalysen in qualifizierte Abschlüsse.',
    lessons: [
      {
        id: '24.1',
        stageId: 24,
        stageTitle: '24. Mara CRM - Lead Insights',
        title: 'Lead-Scoring & KI-Verhaltensanalyse',
        durationMinutes: 25,
        description: 'Lerne, wie Mara CRM das Verhalten deiner Interessenten analysiert, Abschluss-Wahrscheinlichkeiten berechnet und automatisierte Follow-up Zeitpläne erstellt.',
        learnContent: {
          videoTitle: 'Mara KI Lead Insights & Automated Scoring',
          videoDuration: '24:10',
          summaryText: 'Mara CRM analysiert Klicks, E-Mail-Öffnungen und Webseitenbesuche in Echtzeit, um die Abschluss-Wahrscheinlichkeit zu berechnen und maßgeschneiderte E-Mail-Entwürfe zu generieren.',
          bulletPoints: [
            'Abschluss-Wahrscheinlichkeit in % basierend auf Intent-Signalen',
            'Empfohlene nächste Aktion mit KI-generiertem E-Mail-Entwurf',
            'Verhaltensanalyse: Öffnungsraten, Klicks auf Pricing & beste Kontaktzeit',
            'Automatisierter Follow-up Zeitplan (Tag 1, 3, 7)'
          ],
          coreConcepts: [
            {
              iconName: 'sparkles',
              title: 'MARA INSIGHTS',
              description: 'KI-gestützte Signalanalyse für maximale Konversion bei High-Intent Leads.',
              highlight: true
            },
            {
              iconName: 'trending_up',
              title: 'TIMING OPTIMIERUNG',
              description: 'Erreiche Leads genau in ihrem persönlichen Aktivitäts-Zeitfenster.'
            }
          ],
          resources: [
            {
              title: 'Mara CRM Lead Insights öffnen',
              subtitle: 'Lead Julia Weber (#8492) im CRM anzeigen',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Mara Lead Insights Guide
          
Mit Mara CRM erhalten Vertriebler und Marketer sekundenschnelle Einblicke in das Nutzerverhalten. Statt kalter Akquise nutzt du automatisierte Entwürfe und zeitlich abgestimmte Follow-ups.`
        },
        understandContent: {
          coreTakeaway: 'Leads mit hoher Abschlusswahrscheinlichkeit (90%+) sollten innerhalb von 4 Stunden mit personalisierten Vorlagen kontaktiert werden.',
          keyPrinciples: ['Verhaltensbasierte Ansprache statt Standard-Mails', 'Follow-up Zeitplan konsequent einhalten']
        },
        actionTask: {
          instruction: 'Öffne das CRM und teste die Mara Insights von Julia Weber:',
          inputType: 'checklist',
          checklistItems: [
            'Lead Julia Weber (#8492) mit 92% Wahrscheinlichkeit geöffnet',
            'Mara Insights Tab und Bento-Grid analysiert',
            'E-Mail-Entwurf übernommen oder Kampagne gestartet'
          ],
          toolboxCategory: 'email'
        }
      }
    ]
  },
  {
    id: 25,
    title: '25. Die Masterclass: Omnipräsenz & Skalierungs-System',
    subtitle: 'Multi-Channel Traffic, Retargeting-Funnels & Automatisierte High-Ticket Conversion',
    color: 'from-purple-600 via-indigo-600 to-blue-600',
    badgeIcon: '🚀',
    description: 'Bringe dein gesamtes Online-System auf das nächste Level: Omnipräsenz über alle Kanäle, 3-Ebenen Retargeting und vollautomatisierte Funnel-Skalierung.',
    lessons: [
      {
        id: '25.1',
        stageId: 25,
        stageTitle: '25. Die Masterclass: Omnipräsenz',
        title: 'Das Omnipräsenz-System: Multi-Channel & Retargeting',
        durationMinutes: 28,
        description: 'Lerne, wie du mit intelligentem Retargeting und Content-Repurposing für deine Zielgruppe allgegenwärtig wirst, ohne dein Werbebudget zu verbrennen.',
        learnContent: {
          videoTitle: 'Masterclass: Das Omnipräsenz- & Retargeting-System',
          videoDuration: '28:35',
          summaryText: 'Ein einzelner Kontaktpunkt reicht im modernen B2B- und B2C-Marketing nicht mehr aus. In dieser Masterclass lernst du die 3-Ebenen-Retargeting-Strategie kennen, mit der du Interessenten vom ersten Seitenbesuch bis zum finalen Kauf begleitest.',
          bulletPoints: [
            'Die 3 Ebenen des Retargetings: Bekanntheit (Ebene 1), Vertrauen & Case Studies (Ebene 2), Verknappung & Angebot (Ebene 3)',
            'Content-Repurposing: Wie 1 Master-Content in 7 plattformgerechte Formate transformiert wird',
            'Frequenz-Kappen & Burnout-Vermeidung: Warum weniger Ads mit hoher Relevanz mehr Umsatz bringen',
            'Automatisierte Tracking-Pixel & UTM-Parameter für lückenlose Conversion-Messung'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: '3-STUFEN RETARGETING',
              description: 'Zeige Interessenten je nach Funnel-Phase genau den passenden Content statt nerviger Dauerwerbung.',
              highlight: true
            },
            {
              iconName: 'trending_up',
              title: 'OMNIPRÄSENZ MATRIX',
              description: 'Meta, LinkedIn, YouTube & E-Mail synchronisiert für maximale Markenautorität.'
            },
            {
              iconName: 'sparkles',
              title: 'SMART REPURPOSING',
              description: 'Aus 1 Video entstehen 5 Shorts/Reels, 1 Newsletter, 3 LinkedIn-Posts und 1 Whitepaper.'
            }
          ],
          resources: [
            {
              title: 'Retargeting Funnel Blueprints',
              subtitle: 'Kampagnen-Vorlagen & Budget-Kalkulator',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'E-Mail & CRM Kampagnen',
              subtitle: 'Follow-up Sequenz mit Retargeting synchronisieren',
              type: 'tool',
              iconName: 'mail',
              actionUrl: 'email'
            }
          ],
          fullArticleGuide: `### Die Omnipräsenz-Architektur der GOM-MAR Masterclass

Im Skalierungsstadium entscheidet nicht mehr nur das beste Produkt, sondern wer im Gedächtnis der Zielgruppe die unangefochtene Nummer 1 ist.

#### Die 3 Ebenen der Omnipräsenz:
1. **Top of Funnel (Discovery)**: Organischer Content und gezielte Lead-Magnet Ads ziehen neue Kontakte an.
2. **Middle of Funnel (Nurturing & Trust)**: Case Studies, Kundeninterviews und tiefgehende Tutorials überzeugen Unentschlossene.
3. **Bottom of Funnel (Conversion)**: Direkte Termineinladungen, limitierte Boni und klare Call-to-Actions führen zum Abschluss.

Kombiniere diese Kanäle mit deiner Mara CRM Datenbank, um Retargeting-Listen tagesaktuell zu synchronisieren.`
        },
        understandContent: {
          coreTakeaway: 'Omnipräsenz bedeutet nicht, überall aktiv zu sein, sondern dort unübersehbar zu sein, wo sich deine kaufkräftigste Zielgruppe aufhält.',
          keyPrinciples: [
            'Pixel-Tracking und Custom Audiences vor dem ersten Ad-Euro einrichten',
            'Relevanz schlägt Frequenz: Immer Mehrwert vor harter Verkaufsbotschaft'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen Omnipräsenz- und Retargeting-Plan:',
          inputType: 'checklist',
          checklistItems: [
            'Pixel- & Event-Tracking auf allen Landingpages überprüft',
            '3-Stufen Retargeting Kampagne strukturiert (Warm / Hot / Close)',
            'Content-Repurposing Workflow für die nächsten 4 Wochen definiert'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '25.2',
        stageId: 25,
        stageTitle: '25. Die Masterclass: Skalierung',
        title: 'Funnel-Skalierung & Automatisierte High-Ticket Conversion',
        durationMinutes: 32,
        description: 'Vom Erstkontakt zum 5-stelligen Kunden: Wie du deinen Sales-Funnel auf maximale Konversion und planbare Skalierbarkeit optimierst.',
        learnContent: {
          videoTitle: 'Masterclass: High-Ticket Funnel & Conversion-Architektur',
          videoDuration: '32:15',
          summaryText: 'Erfahre, wie du hochpreisige Angebote automatisiert vorqualifizierst, No-Shows in Verkaufsgesprächen minimierst und deine Abschlussquote über 40% hebst.',
          bulletPoints: [
            'Der 2-Stufen Application Funnel mit dynamischen Qualifizierungsfragen',
            'Automatisierte SMS- & E-Mail-Erinnerungen zur Senkung der Ausfallquote',
            'Value-Drop-Sequenz: Vorbereitungsvideos, die vor dem Erstgespräch Einwände auflösen',
            'Skalierungs-Metriken: CAC (Customer Acquisition Cost) vs. LTV (Customer Lifetime Value)'
          ],
          coreConcepts: [
            {
              iconName: 'target',
              title: 'VORQUALIFIZIERUNG',
              description: 'Filtere unpassende Leads automatisch heraus und spare wertvolle Vertriebszeit.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'SHOW-UP BOOSTER',
              description: 'Hebe die Termineinhaltung mit automatisierten Mehrwert-Sequenzen auf über 85%.'
            }
          ],
          resources: [
            {
              title: 'High-Ticket Qualifizierungs-Fragebogen',
              subtitle: 'Template für Typeform / Tally / Funnel',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Lead-Scoring',
              subtitle: 'High-Value Leads im CRM priorisieren',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Das High-Ticket Skalierungs-System

Ein funktionierender Funnel ist eine Maschine zur Vertrauensbildung. Je höher der Preis deines Angebots, desto wichtiger ist ein strukturierter Onboarding- und Qualifizierungsprozess.

#### Die 4 Phasen des High-Ticket Funnels:
1. **Der Lead-Filter**: Potenzielle Kunden beantworten 3-5 gezielte Fragen zu Budget, Dringlichkeit und Zielen.
2. **Die Vorbereitungs-Seite**: Unmittelbar nach der Terminbuchung erhält der Interessent ein 5-Minuten-Video mit Kunden-Erfolgen.
3. **Das Mara CRM Lead-Routing**: Hochqualifizierte Leads werden sofort markiert und an den passenden Closer übergeben.
4. **Die Post-Call Automation**: Follow-up Angebote und Verträge werden in Echtzeit generiert.`
        },
        understandContent: {
          coreTakeaway: 'Wer qualifiziert, dominiert: Führe Gespräche nur noch mit Leads, die echtes Budget, echten Bedarf und echte Kaufabsicht mitbringen.',
          keyPrinciples: [
            'Keine Termine ohne Vorqualifizierungsfragen',
            'Nutze automatisierte Case-Studies vor dem ersten Call'
          ]
        },
        actionTask: {
          instruction: 'Implementiere deinen High-Ticket Qualifizierungs-Flow:',
          inputType: 'checklist',
          checklistItems: [
            'Qualifizierungs-Fragebogen mit Budget- & Zielabfrage eingerichtet',
            'Automatisierte Termin-Erinnerungssequenz aktiviert',
            'Mara CRM Routing-Regeln für High-Value Leads getestet'
          ],
          toolboxCategory: 'email'
        }
      }
    ]
  },
  {
    id: 26,
    title: '26. Community-Building, Retention & Lifetime Value Maximierung',
    subtitle: 'Vom Einmalkäufer zum loyalen Markenbotschafter & Dauerabonnenten',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    badgeIcon: '💎',
    description: 'Verwandle Kunden in lebenslange Fans: Baue hochaktive Communities auf, steigere den Customer Lifetime Value (CLV) und senke Churn durch Gamification und VIP-Events.',
    lessons: [
      {
        id: '26.1',
        stageId: 26,
        stageTitle: '26. Community & Retention',
        title: 'Die Community-Retention Engine: Engagement & Gamification',
        durationMinutes: 26,
        description: 'So baust du eine florierende Community auf Skool, Circle oder Discord auf, die sich selbst moderiert und durch gegenseitige Erfolge trägt.',
        learnContent: {
          videoTitle: 'Masterclass: Community-Architektur & Gamification',
          videoDuration: '26:40',
          summaryText: 'Ein Produkt verkauft man einmal – eine Community bindet Kunden über Jahre. In dieser Lektion lernst du die Hebel kennen, die eine passive Gruppe in einen lebendigen Schmelztiegel für Kundenerfolge verwandeln.',
          bulletPoints: [
            'Die 4 Säulen einer aktiven Community: Status, Anerkennung, exklusiver Zugang und gemeinsame Rituale',
            'Gamification-Level & Leaderboards: Wie Punkte und Level-Ups die Interaktionsrate verfünffachen',
            'Automatisierte Community-Onboarding-Flows: Der 7-Tage-Aktivierungsplan',
            'Super-User & Botschafter-Programme: Wie engagierte Mitglieder den Support entlasten'
          ],
          coreConcepts: [
            {
              iconName: 'users',
              title: 'COMMUNITY HOOKS',
              description: 'Wöchentliche Fragerunden, Win-Shoutouts und Live-Hot-Seats für permanente Aktivität.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'STATUS & LEVELS',
              description: 'Sichtbare Auszeichnungen für erreichte Meilensteine fördern gesunden Ehrgeiz.'
            },
            {
              iconName: 'heart',
              title: 'CHURN VORBEUGUNG',
              description: 'Früherkennung inaktiver Mitglieder durch automatisierte Re-Engagement-Triggern.'
            }
          ],
          resources: [
            {
              title: 'Community Engagement Roadmap',
              subtitle: 'Monatsplan & Vorlagen für tägliche/wöchentliche Posts',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'VIP E-Mail Retention Vorlagen',
              subtitle: 'Reaktivierungs-Sequenzen für inaktive Mitglieder',
              type: 'tool',
              iconName: 'mail',
              actionUrl: 'email'
            }
          ],
          fullArticleGuide: `### Die Anatomie einer florierenden Member-Community

Eine starke Community ist der beste Schutz gegen Kundenabwanderung. 

#### Die 3 Phasen des Community-Lebenszyklus:
1. **Phase 1: Das Welcome-Ritual**: Jeder Neuzugang wird persönlich begrüßt und aufgefordert, sein größtes Ziel in 2 Sätzen zu teilen.
2. **Phase 2: Die Win-Kultur**: Ein dedizierter Kanal für Erfolge ("Wins & Breakthroughs") schafft Social Proof aus den eigenen Reihen.
3. **Phase 3: Exklusive Masterminds**: Top-Performer erhalten Zugang zu vertraulichen Roundtables, was den Anreiz für alle Mitglieder steigert.`
        },
        understandContent: {
          coreTakeaway: 'Kunden kommen wegen des Inhalts, aber sie bleiben wegen der Menschen und des Status in der Gemeinschaft.',
          keyPrinciples: [
            'Erfolge der Mitglieder öffentlich zelebrieren',
            'Inaktive Mitglieder innerhalb von 14 Tagen proaktiv kontaktieren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deine Community-Retention-Strategie:',
          inputType: 'checklist',
          checklistItems: [
            'Wöchentlichen Rhythmus für Live-Calls und Fragerunden festgelegt',
            'Gamification-Level & Meilenstein-Belohnungen definiert',
            'Re-Engagement E-Mail Sequenz für inaktive Nutzer eingerichtet'
          ],
          toolboxCategory: 'email'
        }
      },
      {
        id: '26.2',
        stageId: 26,
        stageTitle: '26. Lifetime Value Maximierung',
        title: 'Maximierung des Customer Lifetime Value (LTV) & Upsell-Ökosysteme',
        durationMinutes: 30,
        description: 'Entwickle eine Produkt-Treppe (Value Ladder), die den durchschnittlichen Kundenwert kontinuierlich und organisch vervielfacht.',
        learnContent: {
          videoTitle: 'Masterclass: Value Ladder & Upsell-Psychologie',
          videoDuration: '30:15',
          summaryText: 'Dein lukrativster Neukunde ist dein bestehender Kunde. Erfahre, wie du Back-End-Angebote, exklusive Masterminds und 1:1 Beratungen nahtlos an dein Kernprodukt anknüpfst.',
          bulletPoints: [
            'Die perfekte Value Ladder: Vom Freebie über das Einstiegsprodukt bis zum 5-stelligen VIP-Mentoring',
            'Timing ist alles: Wann der perfekte Moment für den nächsten Upsell-Vorschlag ist',
            'NPS (Net Promoter Score) Tracking zur Identifikation heißer Upsell-Kandidaten',
            'Automatisierte Empfehlungs- & Affiliate-Provisionen für bestehende Kunden'
          ],
          coreConcepts: [
            {
              iconName: 'trending_up',
              title: 'BACK-END PROFIT',
              description: '80% deines Nettogewinns entstehen in der 2. und 3. Stufe deiner Wertschöpfungskette.',
              highlight: true
            },
            {
              iconName: 'gift',
              title: 'ONE-CLICK UPGRADES',
              description: 'Reibungslose Upgrades ohne erneute Dateneingabe für maximale Kaufbereitschaft.'
            }
          ],
          resources: [
            {
              title: 'Value Ladder Architektur Blueprint',
              subtitle: 'Preisfindung & Paket-Strukturierung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Kunden-Segmentierung',
              subtitle: 'Kaufhistorie & LTV-Filter im CRM nutzen',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kunst der Value Ladder Maximierung

Ein einmaliger Produktverkauf deckt oft nur die Kundenakquisitionskosten (CAC). Echte Profitabilität entsteht im Back-End.

#### Die 4 Stufen der Value Ladder:
1. **Entry-Level (Front-End)**: Niedrigschwelliges Produkt zur Vertrauensbildung.
2. **Core-Offer (Das Herzstück)**: Das Hauptprogramm, das das zentrale Problem löst.
3. **Continuity (Abo / Community)**: Monatliche Begleitung für fortlaufende Resultate.
4. **High-Ticket VIP (Back-End)**: Exklusive Implementierungs- oder 1:1 Mastermind-Betreuung.`
        },
        understandContent: {
          coreTakeaway: 'Wer seinen Kunden den nächsten logischen Schritt vorenthält, verschenkt Umsatz und bremst den Kundenerfolg aus.',
          keyPrinciples: [
            'Jedes gelöste Problem erzeugt das nächste, höherwertige Problem',
            'Back-End Angebote immer an der Zufriedenheit des Kernprodukts ausrichten'
          ]
        },
        actionTask: {
          instruction: 'Baue dein Upsell- & LTV-Ökosystem auf:',
          inputType: 'checklist',
          checklistItems: [
            '4-stufige Value Ladder mit klaren Preispunkten skizziert',
            'Upsell-Trigger nach Erreichen des ersten Kundenerfolgs definiert',
            'Empfehlungs- & Partnerprogramm für Bestandskunden aktiviert'
          ],
          toolboxCategory: 'affiliate'
        }
      }
    ]
  },
  {
    id: 27,
    title: '27. KI-Agenten, Automatisierungs-Workflows & System-Effizienz',
    subtitle: 'Autonome Lead-Qualifizierung, KI-Copywriting & Prozess-Automatisierung mit Make / Zapier',
    color: 'from-blue-600 via-indigo-600 to-violet-600',
    badgeIcon: '🤖',
    description: 'Automatisiere 80% deiner operativen Aufgaben: Baue intelligente KI-Agenten, verbinde dein CRM nahtlos mit Webhooks und automatisiere die Content- und Lead-Erfassung.',
    lessons: [
      {
        id: '27.1',
        stageId: 27,
        stageTitle: '27. KI-Workflows & Automation',
        title: 'Autonome KI-Lead-Qualifizierung & Chat-Assistenten',
        durationMinutes: 27,
        description: 'Wie du Chatbots und Voice-Agenten einrichtest, die rund um die Uhr eingehende Anfragen qualifizieren und direkt Termine in deinen Kalender buchen.',
        learnContent: {
          videoTitle: 'Masterclass: Autonome KI-Assistenten im Vertrieb',
          videoDuration: '27:50',
          summaryText: 'Geschwindigkeit ist im modernen Vertrieb der stärkste Conversion-Hebel. In dieser Masterclass lernst du, wie KI-Agenten Kundenanfragen in unter 60 Sekunden beantworten, qualifizieren und an dein CRM übergeben.',
          bulletPoints: [
            'Die 60-Sekunden Lead-Response Regel: Warum die Abschlusschance nach 5 Minuten um 80% sinkt',
            'Prompt-Engineering für Vertriebs-Agenten: Tonalität, Leitfäden und Einwandbehandlung',
            'Automatischer Abgleich mit dem Mara CRM Kalender zur Vermeidung von Doppelbuchungen',
            'Fallback-Prozesse: Wann die KI menschliche Unterstützung anfordern muss'
          ],
          coreConcepts: [
            {
              iconName: 'bot',
              title: 'SPEED-TO-LEAD',
              description: 'Reaktionszeiten unter 1 Minute verdoppeln die Termin-Erscheinungsrate messbar.',
              highlight: true
            },
            {
              iconName: 'cpu',
              title: 'INTELLIGENTE FILTER',
              description: 'KI analysiert Lead-Daten vorab und kategorisiert Leads in A-, B- und C-Kunden.'
            },
            {
              iconName: 'calendar',
              title: 'AUTO-BOOKING',
              description: 'Vollautomatisierte Terminvereinbarung ohne lästiges Hin- und Herschreiben.'
            }
          ],
          resources: [
            {
              title: 'KI-Vertriebs-Prompt Library',
              subtitle: 'System-Prompts für Qualifizierung & Support als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR KI Assistent',
              subtitle: 'KI-Toolbox für automatisiertes Texten & Lead-Scoring',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Autonome KI-Vertriebs-Agenten in der Praxis

Interessenten wollen heute sofort Antworten. Wenn ein Lead erst am nächsten Tag eine Rückmeldung erhält, hat er sich meist schon beim Wettbewerber informiert.

#### Die 3 Stufen des KI-Vertriebs:
1. **Stufe 1: Begrüßung & Bedürfnisanalyse**: Die KI stellt offene Fragen zum aktuellen Engpass des Kunden.
2. **Stufe 2: Qualifizierungs-Matrix**: Prüfung der Kriterien (Budget, Entscheidungsbefugnis, Zeitrahmen).
3. **Stufe 3: Kalender-Übergabe**: Bei Match wird direkt ein Timeslot im Kalender gebucht und im Mara CRM hinterlegt.`
        },
        understandContent: {
          coreTakeaway: 'KI ersetzt nicht den Verkäufer, sondern nimmt ihm das zeitraubende Vorsortieren und Nachfassen ab.',
          keyPrinciples: [
            'Klare Guardrails und Fallback-Regeln für die KI definieren',
            'Jeder Lead-Kontakt muss im CRM protokolliert werden'
          ]
        },
        actionTask: {
          instruction: 'Richte deinen ersten autonomen Qualifizierungs-Workflow ein:',
          inputType: 'checklist',
          checklistItems: [
            'System-Prompt für KI-Leadqualifizierung formuliert und getestet',
            'Kalender-Schnittstelle mit automatischer Verfügbarkeitsprüfung verknüpft',
            'Automatisierte E-Mail-Bestätigung mit Mara CRM synchronisiert'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '27.2',
        stageId: 27,
        stageTitle: '27. System-Effizienz',
        title: 'End-to-End Automatisierung: CRM, Webhooks & No-Code Pipelines',
        durationMinutes: 31,
        description: 'Verknüpfe Landingpages, Zahlungsanbieter (Stripe/Copecart), E-Mail-Marketing und Buchhaltung zu einem reibungslos laufenden Gesamtsystem.',
        learnContent: {
          videoTitle: 'Masterclass: End-to-End No-Code Automatisierung',
          videoDuration: '31:20',
          summaryText: 'Ein skalierbares Business läuft auf Systemen, nicht auf manueller Fleißarbeit. Lerne, wie du Webhooks und Multi-Step-Automationen erstellst, die Fehler eliminieren und hunderte Stunden pro Monat einsparen.',
          bulletPoints: [
            'Webhooks verstehen und einsetzen: Echtzeit-Datenübertragung zwischen Apps',
            'Die perfekte Kauf-Pipeline: Checkout $\rightarrow$ CRM-Tagging $\rightarrow$ Mitgliederbereich-Freischaltung $\rightarrow$ Rechnungserstellung',
            'Fehlerbehandlung & Retry-Mechanismen bei API-Ausfällen',
            'Automatisierte KPI-Dashboards für tägliche Performance-Reports'
          ],
          coreConcepts: [
            {
              iconName: 'zap',
              title: 'ZERO DATA ENTRY',
              description: 'Keine manuellen Kundendatenübertragungen mehr – alles synchronisiert sich in Echtzeit.',
              highlight: true
            },
            {
              iconName: 'git-branch',
              title: 'MULTI-STEP PIPELINES',
              description: 'Verzweigte Workflows basierend auf Kundenverhalten, Warenkorbwert und Tags.'
            }
          ],
          resources: [
            {
              title: 'No-Code Automation Blueprint Pack',
              subtitle: 'Fertige Make / Zapier Szenarien zum Importieren',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Webhook-Konfiguration',
              subtitle: 'Live-Schnittstellen für deinen Funnel verwalten',
              type: 'tool',
              iconName: 'link',
              actionUrl: 'email'
            }
          ],
          fullArticleGuide: `### Die Architektur der No-Code Automatisierung

Jeder manuelle Schritt in deinem Verkaufsprozess ist eine potenzielle Fehlerquelle und ein Wachstums-Flaschenhals.

#### Die 4 Kern-Pipelines jedes Online-Unternehmens:
1. **Lead-Pipeline**: Formular-Eintrag $\rightarrow$ CRM-Eintrag $\rightarrow$ Willkommens-Sequenz $\rightarrow$ Notification an Team.
2. **Kauf-Pipeline**: Zahlungseingang $\rightarrow$ Zugangsdaten per Mail $\rightarrow$ Discord/Skool Freischaltung $\rightarrow$ SevDesk/Lexoffice Rechnung.
3. **Fulfillment-Pipeline**: Onboarding-Fragebogen $\rightarrow$ Projekt-Board Erstellung $\rightarrow$ Kickoff-Termin.
4. **Retention-Pipeline**: Tag 14 Check-in $\rightarrow$ NPS-Abfrage $\rightarrow$ Review-Anfrage bei 5 Sternen.`
        },
        understandContent: {
          coreTakeaway: 'Automatisiere alles, was mehr als zweimal getan werden muss, damit du dich voll auf Strategie und Kundenresultate konzentrieren kannst.',
          keyPrinciples: [
            'Immer Testdaten durch die gesamte Pipeline schicken vor Livegang',
            'Logs und Fehlerbenachrichtigungen auf Slack/Telegram einrichten'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deine lückenlose Kauf- und Onboarding-Pipeline:',
          inputType: 'checklist',
          checklistItems: [
            'Webhook zwischen Zahlungsanbieter und CRM eingerichtet',
            'Automatisierte Zugangsdaten-Zustellung getestet',
            'Benachrichtigungs-Bot für Neukundenverkäufe aktiviert'
          ],
          toolboxCategory: 'email'
        }
      }
    ]
  },
  {
    id: 28,
    title: '28. Team-Aufbau, Delegieren & Skalierbare Unternehmensstrukturen',
    subtitle: 'SOPs erstellen, Virtuelle Assistenten (VAs) führen & Closer/Setter einstellen',
    color: 'from-amber-600 via-orange-600 to-rose-600',
    badgeIcon: '👥',
    description: 'Transformiere dich vom Selbstständigen zum Unternehmer: Erstelle wasserdichte Standard Operating Procedures (SOPs), stelle A-Player ein und baue ein profitables Vertriebs- und Fulfillment-Team auf.',
    lessons: [
      {
        id: '28.1',
        stageId: 28,
        stageTitle: '28. Team-Aufbau & Delegation',
        title: 'SOP-Architektur: Prozesse dokumentieren & Aufgaben abgeben',
        durationMinutes: 29,
        description: 'Wie du dein gesamtes Expertenwissen in klare Checklisten und Video-SOPs übersetzt, damit Aufgaben ohne Qualitätsverlust delegiert werden können.',
        learnContent: {
          videoTitle: 'Masterclass: Die SOP- und Delegations-Formel',
          videoDuration: '29:45',
          summaryText: 'Wenn dein Business nur funktioniert, solange du arbeitest, hast du einen Job – kein Unternehmen. Lerne die Loom-SOP-Methode kennen, mit der du operative Routineaufgaben in Rekordzeit an VAs übergibst.',
          bulletPoints: [
            'Die 80/20-Analyse deiner Zeit: Welche Aufgaben kosten dich Energie und bringen keinen Umsatz?',
            'Die Loom-SOP-Formel: In 5 Minuten eine fehlerfreie Schritt-für-Schritt-Anleitung aufnehmen',
            'Das 3-Stufen Einarbeitungsmodell: Zuschauen $\rightarrow$ Unter Aufsicht machen $\rightarrow$ Autonom ausführen',
            'Qualitätskontrolle & Fehlertoleranz-Matrix: Wie du Vertrauen aufbaust, ohne blind zu kontrollieren'
          ],
          coreConcepts: [
            {
              iconName: 'file-text',
              title: 'LOOM-SOP SYSTEM',
              description: 'Aufgaben einmal auf Video aufzeichnen, transkribieren und als Standard etablieren.',
              highlight: true
            },
            {
              iconName: 'user-check',
              title: 'VA ONBOARDING',
              description: 'Strukturierte Einarbeitung von Virtuellen Assistenten in unter 48 Stunden.'
            },
            {
              iconName: 'shield-check',
              title: 'QA CHECKLISTEN',
              description: 'Fehlerfreie Ausführung durch klare Abnahme-Kriterien vor dem Kundenkontakt.'
            }
          ],
          resources: [
            {
              title: 'SOP Template & Delegations-Matrix',
              subtitle: 'Fertige Notion & Google Docs Vorlagen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Rollen- & Rechtemanagement',
              subtitle: 'Sichere Team-Zugänge für Mitarbeiter anlegen',
              type: 'tool',
              iconName: 'shield',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur der Unternehmens-Delegation

Wachstum scheitert fast nie an fehlenden Kunden, sondern an operativer Überlastung des Gründers.

#### Die 4 Schritte zum erfolgreichen Delegieren:
1. **Identifikation**: Führe 5 Tage lang ein Zeittagebuch und markiere alle administrativen Aufgaben rot.
2. **Dokumentation**: Nimm jede rote Aufgabe einmal per Bildschirmaufnahme auf und erstelle eine 1-Seiten-Checkliste.
3. **Rekrutierung**: Finde spezialisierte VAs auf OnlineJobs.ph oder Upwork mit praktischen Probeaufgaben.
4. **Graduelle Übergabe**: Übertrage Verantwortung schrittweise mit täglichen 5-Minuten Check-ins.`
        },
        understandContent: {
          coreTakeaway: 'Wer nicht delegiert, wird selbst zum Flaschenhals seines eigenen Wachstums.',
          keyPrinciples: [
            'Niemals eine Aufgabe abgeben, die nicht vorher definiert und messbar gemacht wurde',
            'Ergebnisse kontrollieren, nicht jeden Handgriff mikromanagen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deine erste operative Standard-Prozess-Anleitung (SOP):',
          inputType: 'checklist',
          checklistItems: [
            'Zeittagebuch geführt und die 3 zeitraubendsten Routineaufgaben identifiziert',
            'Erste Video-SOP mit Schritt-für-Schritt Checkliste aufgenommen',
            'Eingeschränkte Mitarbeiter-Rechte im Mara CRM eingerichtet'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '28.2',
        stageId: 28,
        stageTitle: '28. Vertriebs-Team & Skalierung',
        title: 'Setter & Closer System: Vertrieb planbar skalieren',
        durationMinutes: 33,
        description: 'Baue ein schlagkräftiges Vertriebsteam auf: Wie du Telefon-Setter und Closer rekrutierst, vergütest und mit Skripten zu Höchstleistungen führst.',
        learnContent: {
          videoTitle: 'Masterclass: Vertriebsteam-Aufbau & Closer-Führung',
          videoDuration: '33:10',
          summaryText: 'Ein eingespieltes Vertriebs-Duo aus Setter und Closer verdoppelt deine Schlagzahl im High-Ticket Segment. In dieser Lektion erfährst du, wie du Provisionsmodelle gestaltest und Call-Reviews zur Qualitätssteigerung durchführst.',
          bulletPoints: [
            'Die Rollentrennung: Setter (Terminierung & Vorqualifizierung) vs. Closer (Strategiegespräch & Abschluss)',
            'Attraktive & faire Vergütungsmodelle: Fixum, Provision und Staffel-Boni',
            'Tägliche Call-Reviews: Wie du Verkaufsaufnahmen analysierst und Einwandbehandlung trainierst',
            'Pipeline-Management im Mara CRM: Deal-Stages, Conversion-Raten pro Vertriebler und Forecasts'
          ],
          coreConcepts: [
            {
              iconName: 'phone-call',
              title: 'SETTER-SYSTEM',
              description: 'Qualifiziert Leads aus Chats und Social Media an und füllt den Kalender des Closers.',
              highlight: true
            },
            {
              iconName: 'target',
              title: 'CLOSING SKRIPTE',
              description: 'Strukturierte Leitfäden, die Kundenbedürfnisse aufdecken und Einwände auflösen.'
            }
          ],
          resources: [
            {
              title: 'High-Ticket Closing Skript & Leitfaden',
              subtitle: 'Wort-für-Wort Einwandbehandlungs-Guide als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Deal-Pipeline',
              subtitle: 'Lead-Stages und Abschlussquoten im CRM monitoren',
              type: 'tool',
              iconName: 'trending_up',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Vertriebs-Skalierungs-Architektur

Wenn du als Gründer alle Verkaufsgespräche selbst führst, ist deine monatliche Umsatzgrenze bei ca. 15-20 Terminen pro Woche erreicht.

#### Die Vertriebs-Eskalations-Stufen:
1. **Stufe 1 (Gründer-Closing)**: Führe die ersten 30 Verkaufsgespräche selbst, um den Zielkunden in- und auswendig zu verstehen.
2. **Stufe 2 (Setter-Einsatz)**: Ein Setter übernimmt Chat-Nachrichten, Inbound-Anrufe und Terminkoordination.
3. **Stufe 3 (Junior-Closer)**: Ein Closer übernimmt zunächst Angebote im mittleren Preissegment.
4. **Stufe 4 (Full Sales Team)**: Mehrere Setter und Closer arbeiten synchronisiert im Mara CRM Pipeline-Board.`
        },
        understandContent: {
          coreTakeaway: 'Ein funktionierendes Vertriebsteam braucht keine Glückstreffer, sondern messbare KPIs und tägliches Training.',
          keyPrinciples: [
            'Jedes Verkaufsgespräch zur Qualitätsanalyse aufzeichnen (DSGVO-konform)',
            'Provisionsmodelle müssen sowohl Umsatzhöhe als auch Kundenzufriedenheit belohnen'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deine Vertriebs-Pipeline und Rollenverteilung:',
          inputType: 'checklist',
          checklistItems: [
            'Vertriebs-Skript für Erstgespräche und Einwandbehandlung finalisiert',
            'Provisions- und Staffelmodell für Setter/Closer festgelegt',
            'Deal-Pipeline im Mara CRM für Team-Tracking eingerichtet'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 29,
    title: '29. Finanzen, Cashflow-Management & Rechtssichere Skalierung',
    subtitle: 'Steueroptimierung, Liquiditätsplanung, Verträge & DSGVO-Wachstumssicherheit',
    color: 'from-slate-700 via-zinc-700 to-stone-800',
    badgeIcon: '⚖️',
    description: 'Sichere dein Unternehmenswachstum rechtlich und finanziell ab: Beherrsche das 4-Konten-Modell, optimiere deinen Cashflow und schütze dein Business mit wasserdichten AGB, Verträgen und DSGVO-Standards.',
    lessons: [
      {
        id: '29.1',
        stageId: 29,
        stageTitle: '29. Finanzen & Cashflow',
        title: 'Cashflow-Architektur: Das 4-Konten-System & Liquiditätssteuerung',
        durationMinutes: 28,
        description: 'Wie du deine Unternehmensfinanzen strukturierst, um Steuernachzahlungen für immer zu vermeiden und stets liquide für Wachstumsinvestitionen zu bleiben.',
        learnContent: {
          videoTitle: 'Masterclass: Cashflow-Management & Profit First',
          videoDuration: '28:15',
          summaryText: 'Umsatz ist Eitelkeit, Gewinn ist Vernunft, aber Cashflow ist die Realität. In dieser Lektion erfährst du, wie du das bewährte Profit-First-System in deinem digitalen Business implementierst.',
          bulletPoints: [
            'Das 4-Konten-Modell: Einnahmen, Steuerrücklagen (Festgeld/Tagesgeld), Betriebskosten (OpEx) und Unternehmergewinn',
            'Die Liquiditäts-Reserve: Warum du mindestens 3 Monate Fixkosten als Puffer vorhalten musst',
            'Automatisierte Überweisungs-Routinen zum 1. und 15. jedes Monats',
            'Deckungsbeitrags-Rechnung: Welche Produkte und Kanäle werfen echten Nettogewinn ab?'
          ],
          coreConcepts: [
            {
              iconName: 'landmark',
              title: 'PROFIT FIRST',
              description: 'Gewinn und Steuern werden VOR den Ausgaben auf separate Konten verteilt.',
              highlight: true
            },
            {
              iconName: 'wallet',
              title: '4-KONTEN SYSTEM',
              description: 'Einnahmen, Steuern (40%), OpEx (30%) und Gewinn (30%) strikt trennen.'
            },
            {
              iconName: 'pie-chart',
              title: 'ROAS & MARGEN KPI',
              description: 'Exakte Berechnung aller Werbe- und Transaktionsgebühren für maximale Nettomargen.'
            }
          ],
          resources: [
            {
              title: 'Liquiditäts- & Steuer-Kalkulator',
              subtitle: 'Excel / Google Sheets Vorlage zur monatlichen Verteilung',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Rechnungs-Übersicht',
              subtitle: 'Monatsumsätze und offene Posten im CRM überwachen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Cashflow-Formel für digitale Unternehmen

Viele wachsende Unternehmen scheitern nicht an mangelnder Nachfrage, sondern an plötzlichen Liquiditätsengpässen oder unvorhergesehenen Steuernachzahlungen.

#### Die 4 Konten im Detail:
1. **Konto 1: Einnahmen-Sammelbecken**: Hier laufen alle Stripe-, PayPal- und Banküberweisungen ein.
2. **Konto 2: Steuer-Rücklage (40-45%)**: Unantastbar für Umsatzsteuer und Ertragssteuern.
3. **Konto 3: Betriebsausgaben (OpEx)**: Software, Werbebudget, VAs und Freelancer.
4. **Konto 4: Unternehmerlohn & Gewinn**: Dein monatliches Geschäftsführer-Gehalt plus Quartalsgewinn.`
        },
        understandContent: {
          coreTakeaway: 'Betrachte Steuerrücklagen niemals als dein Geld – trenne sie sofort am Tag des Geldeingangs.',
          keyPrinciples: [
            'Ausgaben wachsen mit den Einnahmen, wenn sie nicht durch feste Kontolimits gebremst werden',
            'Monatliche Fixkosten schlank halten und regelmäßig auf ungenutzte Abos prüfen'
          ]
        },
        actionTask: {
          instruction: 'Implementiere dein Cashflow- und Kontenmodell:',
          inputType: 'checklist',
          checklistItems: [
            '4 getrennte Unterkonten bei der Geschäftsbank eingerichtet',
            'Feste prozentuale Verteilungsregel für Geldeingänge definiert',
            'Monatliche Fixkosten-Tabelle mit allen laufenden Tools & Abos bereinigt'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '29.2',
        stageId: 29,
        stageTitle: '29. Recht & DSGVO',
        title: 'Rechtssicherheit: Verträge, AGB, Widerruf & DSGVO-Compliance',
        durationMinutes: 26,
        description: 'Schütze deine Marke und dein Vermögen vor Abmahnungen: Rechtssichere Verträge, B2B-Widerrufsausschluss und korrekte Cookie-Einbindungen.',
        learnContent: {
          videoTitle: 'Masterclass: Rechtssichere Skalierung & Vertragsgestaltung',
          videoDuration: '26:50',
          summaryText: 'Ein rechtliches Fundament gibt dir die Freiheit, aggressiv zu werben und zu wachsen. Lerne, wie du B2B-Kaufverträge gestaltest, Haftungsrisiken minimierst und deinen Funnel DSGVO-konform machst.',
          bulletPoints: [
            'B2B vs. B2C: Warum B2B-Verträge kein gesetzliches 14-Tage-Widerrufsrecht haben und wie du das vertraglich absicherst',
            'Digitale Signatur-Prozesse: Verträge per DocuSign / SignWell in unter 2 Minuten abschließen',
            'AGB-Essentials für Agenturen, Coaches und Plattformbetreiber',
            'DSGVO-Checkliste: Cookie-Banner, AVV-Verträge mit US-Dienstleistern und datenschutzkonforme E-Mail-Double-Opt-Ins'
          ],
          coreConcepts: [
            {
              iconName: 'shield',
              title: 'B2B VERTRAGSSCHUTZ',
              description: 'Klare Zahlungsbedingungen, Zahlungsziele und Haftungsausschlüsse.',
              highlight: true
            },
            {
              iconName: 'lock',
              title: 'DSGVO KONFORMITÄT',
              description: 'Lückenloses Double-Opt-In und rechtssichere Auftragsverarbeitungsverträge (AVV).'
            }
          ],
          resources: [
            {
              title: 'B2B Dienstleistungsvertrag Muster',
              subtitle: 'Rechtlich geprüfte Vertragsvorlage als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Datenschutz & Impressum Generator',
              subtitle: 'Mustertexte für Funnels und Landingpages',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Das juristische Schutzschild deines Wachstums

Rechtssicherheit ist keine Bürokratie, sondern Risikomanagement zur Sicherung deines Unternehmenswertes.

#### Die wichtigsten Compliance-Bausteine:
1. **Kaufbestätigung & AGB**: Die Einbindung der AGB mit Checkbox vor der Bezahlung ist im deutschen und europäischen Recht Pflicht.
2. **Double-Opt-In Protokollierung**: Jeder Newsletter-Kontakt muss mit Timestamp und IP-Hash nachweisbar sein.
3. **Mitarbeiter-Vertraulichkeit**: NDAs (Geheimhaltungsvereinbarungen) für alle VAs und Freelancer vor Projektstart.
4. **Marken- & Urheberrecht**: Überprüfung von Markennamen beim DPMA/EUIPO vor großen Ad-Launches.`
        },
        understandContent: {
          coreTakeaway: 'Ein klarer Vertrag schützt beide Seiten und schafft von Tag 1 an professionelle Klarheit.',
          keyPrinciples: [
            'Niemals ein Projekt ohne unterschriebenen Vertrag und geleistete Anzahlung starten',
            'Double-Opt-In Nachweise im E-Mail System revisionssicher archivieren'
          ]
        },
        actionTask: {
          instruction: 'Überprüfe und härte deine rechtlichen Vorlagen:',
          inputType: 'checklist',
          checklistItems: [
            'B2B-Vertragsvorlage und AGB für das Kernangebot finalisiert',
            'Impressum und Datenschutzerklärung auf allen Funnels aktualisiert',
            'Double-Opt-In Bestätigungsmails im E-Mail Tool auf Rechtskonformität geprüft'
          ],
          toolboxCategory: 'email'
        }
      }
    ]
  },
  {
    id: 30,
    title: '30. Das 7-Figure Exit & Asset-Mindset: Unternehmenswert & Freiheit',
    subtitle: 'Vom Betreiber zum Investor: Unternehmensbewertung, Recurring Revenue & Ultimative Skalierung',
    color: 'from-amber-500 via-yellow-500 to-amber-600',
    badgeIcon: '👑',
    description: 'Das krönende Finale: Baue ein Unternehmen auf, das unabhängig von dir floriert, maximalen Unternehmenswert generiert und dir echte finanzielle sowie persönliche Freiheit schenkt.',
    lessons: [
      {
        id: '30.1',
        stageId: 30,
        stageTitle: '30. Unternehmenswert & Asset-Building',
        title: 'Die Asset-Architektur: Wie Unternehmensbewertungen funktionieren',
        durationMinutes: 30,
        description: 'Wie M&A-Investoren digitale Unternehmen bewerten: Multiple-Faktoren, Churn-Raten, EBIT und die Beseitigung des Schlüsselpersonen-Risikos.',
        learnContent: {
          videoTitle: 'Masterclass: Unternehmensbewertung & 7-Figure Exit Vorbereitung',
          videoDuration: '30:45',
          summaryText: 'Ein Unternehmen ist nur dann ein echtes Vermögens-Asset, wenn es ohne den Gründer wächst. In dieser Lektion erfährst du, wie Bewertungs-Multiples (3x-8x EBIT) berechnet werden und welche Faktoren den Wert deines Geschäfts vervielfachen.',
          bulletPoints: [
            'Die EBITDA / EBIT-Formel für digitale Geschäftsmodelle und Agenturen',
            'Multiple-Treiber: Wiederkehrende Einnahmen (MRR/ARR), niedrige Kundenabwanderung und diversifizierte Traffic-Quellen',
            'Eliminierung des "Key-Person Risk": Warum Investoren Unternehmen meiden, deren Gesicht der einzige Verkaufskanal ist',
            'Due-Diligence Readiness: Die Vorbereitung deines Datenraums mit Verträgen, Finanzberichten und Kundenkohorten'
          ],
          coreConcepts: [
            {
              iconName: 'trending_up',
              title: 'MULTIPLE BOOSTER',
              description: 'Vertraglich gesicherte Abos (MRR) verdoppeln das Bewertungs-Multiple im Vergleich zu Einmalverkäufen.',
              highlight: true
            },
            {
              iconName: 'users',
              title: 'AUTONOMES MANAGEMENT',
              description: 'Ein eingesetzter General Manager (COO) macht das Business 100% gründerunabhängig.'
            },
            {
              iconName: 'file-check',
              title: 'DATA ROOM READY',
              description: 'Lückenlose Dokumentation aller IP-Rechte, Verträge und Bilanzen.'
            }
          ],
          resources: [
            {
              title: 'Business Valuation & Exit Scorecard',
              subtitle: 'Bewertungs-Rechner & Due-Diligence Checkliste als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Kohorten- & MRR-Analyse',
              subtitle: 'Wiederkehrende Einnahmen und Kunden-Lebenszeit tracken',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Asset-Transformation deines Unternehmens

Das Endziel unternehmerischer Meisterschaft ist es, Systeme zu schaffen, die Wert produzieren, ohne dass deine persönliche Zeit gebunden ist.

#### Die 4 Hebel für maximale Unternehmensbewertung:
1. **MRR/ARR Anteil**: Je höher der Anteil planbar wiederkehrender Einnahmen, desto wertvoller das Unternehmen.
2. **Systematisiertes Marketing**: Kein Verlass auf einen einzelnen Kanal – ein gesunder Mix aus Ads, SEO, E-Mail und Partnerschaften.
3. **Dokumentierte Prozesse**: Jede Rolle im Unternehmen verfügt über eine erprobte SOP-Bibliothek.
4. **Klare Markenidentität**: Die Kunden kaufen die Marke und das Resultat, nicht eine einzelne Person.`
        },
        understandContent: {
          coreTakeaway: 'Baue dein Unternehmen von Tag 1 an so auf, als würdest du es morgen für 10 Millionen Euro verkaufen – auch wenn du es behalten willst.',
          keyPrinciples: [
            'Gründerabhängigkeit schrittweise auf null reduzieren',
            'Transparente, monatliche Finanzberichte führen'
          ]
        },
        actionTask: {
          instruction: 'Führe deine Unternehmenswert- und Exit-Readiness Analyse durch:',
          inputType: 'checklist',
          checklistItems: [
            'EBIT- und Multiple-Kalkulation für dein aktuelles Jahresergebnis durchgeführt',
            'Schlüsselpersonen-Abhängigkeiten in Marketing & Vertrieb identifiziert und minimiert',
            'Zentralen digitalen Datenraum für Verträge und Bilanzen angelegt'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '30.2',
        stageId: 30,
        stageTitle: '30. Das Meister-Mindset',
        title: 'Das Meister-Mindset: Skalierung, Zeitautonomie & Nachhaltige Vision',
        durationMinutes: 35,
        description: 'Die Kunst, unternehmerischen Erfolg mit persönlicher Erfüllung, mentaler Stärke und nachhaltiger Wirkung zu verbinden.',
        learnContent: {
          videoTitle: 'Abschluss-Masterclass: Das Meister-Mindset & Deine 10-Jahres-Vision',
          videoDuration: '35:20',
          summaryText: 'Herzlichen Glückwunsch zum Erreichen des 30. Moduls der GOM-MAR Academy! In dieser Abschlusslektion fassen wir alle 30 Stufen zusammen und richten deinen inneren Kompass auf langfristige Exzellenz und echte Zeitautonomie aus.',
          bulletPoints: [
            'Die 5 Phasen der unternehmerischen Reife: Vom Starter zum Handwerker, Manager, Visionär und Investor',
            'Mentale Resilienz: Wie du in Krisen und Marktveränderungen fokussiert bleibst',
            'Das 10-Jahres-Manifest: Wie du langfristige Ziele setzt, die dich täglich inspirieren',
            'Die GOM-MAR Absolventen-Zertifizierung: Dein nächster Schritt in das Alumni- & Mastermind-Netzwerk'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'MASTER CERTIFICATE',
              description: 'Vollständiger Abschluss aller 30 Meilensteine des GOM-MAR Gesamtsystems.',
              highlight: true
            },
            {
              iconName: 'compass',
              title: 'ZEITAUTONOMIE',
              description: 'Freiheit über Ort, Zeit und Menschen, mit denen du arbeitest.'
            }
          ],
          resources: [
            {
              title: 'Das GOM-MAR 10-Jahres-Vision Workbook',
              subtitle: 'Strategie-Leitfaden für Gründer als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR Mastermind Alumni Zugang',
              subtitle: 'Exklusiver Austausch mit Top-Gründern',
              type: 'link',
              iconName: 'award',
              actionUrl: 'progress'
            }
          ],
          fullArticleGuide: `### Die GOM-MAR Meisterklasse: Dein Fundament für die Zukunft

Du hast alle 30 Module durchlaufen – von den ersten Grundlagen, Angebotspositionierung, Funnel-Architektur, E-Mail-Automatisierung, Traffic-Generierung, KI-Systemen bis hin zu Unternehmensführung und Asset-Building.

#### Die 3 goldenen Gesetze für die nächsten Jahre:
1. **Gib niemals auf zu lernen**: Märkte verändern sich, aber fundamentale Prinzipien menschlicher Psychologie und solider Betriebswirtschaft bleiben bestehen.
2. **Kundenresultate stehen immer an 1. Stelle**: Zufriedene Kunden sind deine beste Akquise und die stärkste Absicherung gegen Wettbewerber.
3. **Schütze deine Energie**: Gesundheit, Familie und Klarheit sind das Fundament, auf dem dein gesamtes Imperium ruht.`
        },
        understandContent: {
          coreTakeaway: 'Wahre Meisterschaft ist keine Ziellinie, sondern eine tägliche Hingabe zu Exzellenz und Mehrwert.',
          keyPrinciples: [
            'Erfolge feiern, aber stets hungrig und lernbereit bleiben',
            'Wissen an die nächste Generation weitergeben'
          ]
        },
        actionTask: {
          instruction: 'Schließe die Masterclass mit deinem persönlichen Abschluss-Manifest ab:',
          inputType: 'checklist',
          checklistItems: [
            'Gesamtfortschritt der GOM-MAR Academy auf 100% gebracht',
            '10-Jahres-Vision im Workbook schriftlich fixiert',
            'Zertifikat im Profil generiert und geteilt'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  {
    id: 31,
    title: '31. Internationalisierung, Cross-Border E-Commerce & Globale Expansion',
    subtitle: 'Markteintritt in DACH, US & EU: Mehrsprachige Funnels, Währungsumrechnung & Lokalisierung',
    color: 'from-blue-600 via-sky-600 to-teal-500',
    badgeIcon: '🌍',
    description: 'Skaliere über Grenzen hinweg: Erschließe internationale Märkte mit mehrsprachigen Funnels, länderspezifischer Besteuerung (OSS/VAT), globalem Stripe-Routing und lokalisierter Werbeansprache.',
    lessons: [
      {
        id: '31.1',
        stageId: 31,
        stageTitle: '31. Globale Expansion & Marktforschung',
        title: 'Internationale Marktanalyse: Produkt-Markt-Fit in neuen Ländern',
        durationMinutes: 29,
        description: 'Wie du neue Zielmärkte datenbasiert evaluierst, Kaufkraft-Unterschiede kalkulierst und kulturelle Kaufbarrieren systematisch überwindest.',
        learnContent: {
          videoTitle: 'Masterclass: Globale Markterschließung & Cross-Border Strategie',
          videoDuration: '29:30',
          summaryText: 'Ein bewährtes Angebot im DACH-Raum lässt sich oft mit minimalen Anpassungen auf den englischsprachigen, skandinavischen oder südeuropäischen Markt übertragen. Lerne die Schritte zur Validierung neuer Länder ohne großes Vorab-Investment.',
          bulletPoints: [
            'Markt-Scoring-Matrix: Marktgröße, Wettbewerbsintensität und durchschnittlicher Warenkorbwert',
            'Lokalisierung vs. Übersetzung: Warum reines Übersetzen scheitert und kulturelle Nuancen über den Kauf entscheiden',
            'Multi-Currency Pricing: Dynamische Preisgestaltung nach Kaufkraftparität (PPP)',
            'Compliance im Ausland: US-Sales-Tax, EU-One-Stop-Shop (OSS) und lokale Zahlungspräferenzen (z. B. iDEAL, Bancontact, Klarna)'
          ],
          coreConcepts: [
            {
              iconName: 'globe',
              title: 'CROSS-BORDER FUNNEL',
              description: 'Landingpages mit automatischer Währungsumrechnung und Geo-IP-Spracherkennung.',
              highlight: true
            },
            {
              iconName: 'credit-card',
              title: 'LOKALE PAYMENT-METHODS',
              description: 'Bis zu 40% mehr Conversion durch länderspezifische Bezahlmethoden an der Kasse.'
            },
            {
              iconName: 'file-text',
              title: 'EU-OSS / VAT MATRIX',
              description: 'Rechtssichere Steuerabwicklung für digitale Produkte im gesamten europäischen Raum.'
            }
          ],
          resources: [
            {
              title: 'Global Expansion & Market Scoring Sheet',
              subtitle: 'Bewertungs-Template für neue Länder & Zielgruppen',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Multi-Währungs-Setup',
              subtitle: 'Währungs- und Sprachfilter im CRM einstellen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur der Internationalisierung

Die Expansion in neue Länder vervielfacht dein Marktpotenzial um den Faktor 5 bis 10.

#### Die 4 Phasen des internationalen Rollouts:
1. **Markt-Testphase (Micro-Testing)**: Schalte englischsprachige Test-Ads mit kleinem Budget (20-50€/Tag), um Klickpreise und Lead-Kosten zu ermitteln.
2. **Kulturelle Lokalisierung**: Passe Testimonials, Währungen, Maßeinheiten und rechtliche Pflichtangaben an die Zielregion an.
3. **Payment-Optimierung**: Integriere lokale Zahlungsmethoden (z. B. Klarna in Deutschland/Schweden, iDEAL in den Niederlanden, EPS in Österreich).
4. **Fulfillment & Support-Routing**: Etabliere KI-Übersetzungstools und englischsprachigen Support über Mara CRM.`
        },
        understandContent: {
          coreTakeaway: 'Wer lokal denkt und global handelt, erschließt ungesättigte Märkte mit geringeren Werbekosten.',
          keyPrinciples: [
            'Testen vor dem Übersetzen: Immer erst die Nachfrage mit einer Test-Landingpage validieren',
            'Zahlungsanbieter müssen lokale Währungen ohne horrende Wechselkursverluste unterstützen'
          ]
        },
        actionTask: {
          instruction: 'Erstelle deinen ersten internationalen Markteintritts-Plan:',
          inputType: 'checklist',
          checklistItems: [
            'Markt-Scoring für die 2 vielversprechendsten Ziel-Länder durchgeführt',
            'Stripe- / Checkout-Einstellungen für Multi-Currency und EU-OSS überprüft',
            'Englische Version der Kern-Landingpage vorbereitet und auf kulturelle Relevanz geprüft'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '31.2',
        stageId: 31,
        stageTitle: '31. Globale Skalierung & Paid Media',
        title: 'Global Paid Ads: Internationale Skalierung auf Meta, Google & TikTok',
        durationMinutes: 31,
        description: 'Wie du internationale Ad-Accounts strukturierst, Kampagnen über mehrere Zeitzonen optimierst und Skalierungs-Funnels weltweit ausrollst.',
        learnContent: {
          videoTitle: 'Masterclass: Globale Performance-Kampagnen & Ad-Scaling',
          videoDuration: '31:15',
          summaryText: 'Internationale Werbekampagnen bieten oft deutlich günstigere CPMs als der gesättigte Heimatmarkt. Lerne, wie du globale Zielgruppen-Cluster bildest und mehrsprachige Creatives automatisiert skalierst.',
          bulletPoints: [
            'Account-Struktur für internationale Kampagnen: Weltweite CBOs vs. Länder-spezifische Ad-Sets',
            'Creative-Lokalisierung mit KI-Voice-Over und länderspezifischen Untertiteln',
            'Zeitzonen-Management bei automatisierten Ad-Regeln und Tagesbudgets',
            'ROAS-Benchmark-Vergleich: Tier-1-Länder (US/UK/CA/AU) vs. Emerging Markets'
          ],
          coreConcepts: [
            {
              iconName: 'target',
              title: 'GEO-TARGETING CLUSTER',
              description: 'Gruppierung von Ländern nach Kaufkraft und CPM-Niveau für maximale Ad-Effizienz.',
              highlight: true
            },
            {
              iconName: 'video',
              title: 'AI MULTI-LINGUAL ADS',
              description: 'Automatisierte Übersetzung von Video-Creatives in 10+ Sprachen per KI.'
            }
          ],
          resources: [
            {
              title: 'International Ad-Scaling Playbook',
              subtitle: 'Kampagnen-Struktur & Budget-Verteilung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR KI Voice & Übersetzungs-Toolbox',
              subtitle: 'Ad-Texte und Video-Skripte mehrsprachig übersetzen',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Die globale Ad-Scaling Formel

Wer Werbekampagnen weltweit ausspielt, profitiert von günstigeren Klickpreisen und riesigen Zielgruppen-Pools.

#### Die Tier-Aufteilung im internationalen Paid-Marketing:
1. **Tier 1 (High Buying Power)**: USA, UK, Kanada, Australien, Schweiz, Deutschland. Höchste Kaufkraft, aber höhere CPMs.
2. **Tier 2 (Medium Buying Power)**: Skandinavien, Benelux, Spanien, Italien. Sehr gute Marge bei oft günstigeren Klickpreisen.
3. **Tier 3 (Emerging High Volume)**: Lateinamerika, Südostasien. Enorm günstiger Traffic, ideal für volumenbasierte Low-Ticket Angebote.`
        },
        understandContent: {
          coreTakeaway: 'Globale Ad-Skalierung ist der schnellste Weg, den Algorithmen maximale Daten zum Lernen bereitzustellen.',
          keyPrinciples: [
            'Länder mit unterschiedlichen CPMs niemals in derselben Anzeigengruppe mischen',
            'Tracking-Events über Zeitzonengrenzen hinweg sauber im Attribution-Tool synchronisieren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deine internationale Werbekampagne:',
          inputType: 'checklist',
          checklistItems: [
            'Zielgruppen-Cluster nach Kaufkraft (Tier 1 / Tier 2) eingeteilt',
            'Englische Ad-Creatives mit KI-Voiceover und Untertiteln gerendert',
            'Attribution und Pixel-Events für internationale Besucher getestet'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 32,
    title: '32. Podcast-, PR- & Media-Dominanz: Brand-Authority aufbauen',
    subtitle: 'Gastauftritte in Top-Podcasts, Presseberichte, TV & Digitale Markenbekanntheit',
    color: 'from-fuchsia-600 via-pink-600 to-rose-600',
    badgeIcon: '🎙️',
    description: 'Werde zur unangefochtenen Branchen-Ikone: Sichere dir Gastauftritte in den größten Branchen-Podcasts, generiere kostenlose PR in Fachmedien und baue unkopierbare Markenautorität auf.',
    lessons: [
      {
        id: '32.1',
        stageId: 32,
        stageTitle: '32. Podcast-Gastauftritte & PR',
        title: 'Die Podcast-Tour-Strategie: Kostenlose Reichweite & High-Trust Leads',
        durationMinutes: 28,
        description: 'Wie du als gefragter Experte in etablierten Podcasts platziert wirst und Hörer ohne Werbekosten in hochqualifizierte Kunden verwandelst.',
        learnContent: {
          videoTitle: 'Masterclass: Die Podcast-Tour & Medien-Pitching-Strategie',
          videoDuration: '28:40',
          summaryText: 'Ein 60-minütiger Podcast-Auftritt erzeugt mehr Vertrauen als tausende Euro an Werbeanzeigen. Lerne das Pitch-System kennen, mit dem du Podcast-Hosts von deinem Mehrwert überzeugst.',
          bulletPoints: [
            'Die 3-Punkte Pitch-Formel: Relevanz, kontroverser Blickwinkel und konkreter Mehrwert für die Hörer',
            'Der Podcast-Funnel: Wie du Hörer über eine maßgeschneiderte Landingpage (z. B. domain.com/podcastname) einsammelst',
            'Equipment & Audio-Standards: Professioneller Auftritt mit minimalem Setup',
            'Content-Recycling: Wie du Podcast-Snippets in reichweitenstarke Social-Media-Clips verwandelst'
          ],
          coreConcepts: [
            {
              iconName: 'mic',
              title: 'PODCAST FUNNEL',
              description: 'Exklusive Freebie-Landingpages für jeden Podcast-Auftritt für maximale Lead-Konversion.',
              highlight: true
            },
            {
              iconName: 'mail',
              title: 'HOST PITCH SYSTEM',
              description: 'Personalisierte Outreach-Vorlagen, die von Hosts sofort geöffnet und beantwortet werden.'
            },
            {
              iconName: 'video',
              title: 'SNIPPET RECYCLING',
              description: 'Die stärksten 60-Sekunden-Momente als Viral-Reels & TikToks zweitverwerten.'
            }
          ],
          resources: [
            {
              title: 'Podcast Pitching Vorlagen & Media-Kit Template',
              subtitle: 'Anschreiben für Podcast-Hosts & One-Pager als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Lead-Quellen Tracking',
              subtitle: 'Podcast-spezifische UTM-Tags im CRM auswerten',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Anatomie der erfolgreichen Podcast-Tour

Podcasts sind das reichweitenstärkste Format für tiefes Vertrauen im B2B- und B2C-Markt.

#### Die 4 Schritte zur Medien-Dominanz:
1. **Recherche**: Erstelle eine Liste der Top 30 Podcasts in deiner Nische mit Hörerzahlen und Host-Kontakten.
2. **Der Haken (The Angle)**: Finde ein Thema, über das noch niemand gesprochen hat – vermeide Standardfloskeln.
3. **Der Lead-Magnet**: Biete am Ende der Folge ein spezielles Geschenk an, das exklusiv für diese Hörerschaft erstellt wurde.
4. **Follow-up**: Teile die fertige Folge aktiv auf deinen Kanälen und markiere den Host für maximale Reichweite.`
        },
        understandContent: {
          coreTakeaway: 'Verkaufe im Podcast niemals dein Produkt – verkaufe deine Philosophie und lade auf deine Landingpage ein.',
          keyPrinciples: [
            'Hosts lieben Gäste, die interessante Geschichten erzählen statt Verkaufsmonologe zu halten',
            'Jeder Podcast-Auftritt braucht eine eigene Tracking-URL zur Messung der Neukunden'
          ]
        },
        actionTask: {
          instruction: 'Plane deine erste Podcast-Tour:',
          inputType: 'checklist',
          checklistItems: [
            'Liste mit 15 relevanten Nischen-Podcasts und Host-Kontakten angelegt',
            'Individuelles One-Pager Media-Kit mit Themenvorschlägen erstellt',
            'Spezifische Podcast-Landingpage im Funnel-Builder eingerichtet'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '32.2',
        stageId: 32,
        stageTitle: '32. Presse & Digitale PR',
        title: 'Presse-Artikel & Fachmedien: Gratis-Coverage & Authority-Badges',
        durationMinutes: 27,
        description: 'Wie du Pressemitteilungen schreibst, von Journalisten zitiert wirst und "Bekannt aus..."-Siegel für deine Landingpage sicherst.',
        learnContent: {
          videoTitle: 'Masterclass: Digitale PR & Journalisten-Outreach',
          videoDuration: '27:20',
          summaryText: 'Ein Zitat in einem bekannten Wirtschaftsmagazin hebt die Konversionsrate deiner Landingpage sofort an. Lerne, wie du Storys kreierst, die von Journalisten dankbar aufgegriffen werden.',
          bulletPoints: [
            'Was Journalisten wirklich wollen: Daten, Studien, Trends und menschliche Erfolgsgeschichten',
            'HARO & Fachportale: Wie du täglich Presseanfragen beantwortest und Backlinks sicherst',
            'Rechtssichere Nutzung von Medien-Logos ("Bekannt aus...") auf deiner Website',
            'SEO-Vorteile: Hochwertige DoFollow-Backlinks von etablierten News-Portalen'
          ],
          coreConcepts: [
            {
              iconName: 'newspaper',
              title: 'PRESS COVERAGE',
              description: 'Gastbeiträge und Expertenzitate in führenden Branchen- und Wirtschaftsmedien.',
              highlight: true
            },
            {
              iconName: 'award',
              title: 'TRUST BADGES',
              description: 'Medienlogos platzieren, um Kaufskepsis bei kalten Besuchern sofort aufzulösen.'
            }
          ],
          resources: [
            {
              title: 'Pressemitteilungs-Muster & PR-Leitfaden',
              subtitle: 'Formate & Formulierungen für Redaktionen als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR PR-Text Generator',
              subtitle: 'Pressemitteilungen per KI nach journalistischen Standards verfassen',
              type: 'tool',
              iconName: 'cpu',
              actionUrl: 'tools'
            }
          ],
          fullArticleGuide: `### Die Kunst der Digitalen PR

Journalisten suchen täglich nach Expertenmeinungen zu aktuellen Branchentrends.

#### Die 3 Säulen der PR-Arbeit:
1. **Der Newswert**: Verknüpfe deine Dienstleistung mit aktuellen wirtschaftlichen oder gesellschaftlichen Entwicklungen.
2. **Die Pressemitteilung**: Headline, Lead-Absatz, Zitat und Kontaktdaten – kurz, prägnant und werbefrei formuliert.
3. **Die Trust-Integration**: Platziere Presseerwähnungen prominent im Header und über dem Checkout deiner Landingpage.`
        },
        understandContent: {
          coreTakeaway: 'Gute PR ersetzt keine Verkaufsstrategie, aber sie macht jeden Verkaufs- und Marketingkanal doppelt so effektiv.',
          keyPrinciples: [
            'Pressemitteilungen müssen wie Nachrichtenartikel klingen, niemals wie Werbeanzeigen',
            'Alle Berichte sofort auf Social Media und im E-Mail Newsletter als Social Proof teilen'
          ]
        },
        actionTask: {
          instruction: 'Starte deine PR- und Medien-Kampagne:',
          inputType: 'checklist',
          checklistItems: [
            'Pressemitteilung zu einem aktuellen Branchentrend verfasst',
            'Verteiler mit 10 relevanten Fachjournalisten und Redaktionen recherchiert',
            'Presse-Bereich und Medien-Badges auf der Landingpage integriert'
          ],
          toolboxCategory: 'landingpage'
        }
      }
    ]
  },
  {
    id: 33,
    title: '33. High-End Live-Events, Masterminds & Exklusive Retreats',
    subtitle: 'Event-Organisation, Ticket-Sales-Funnels, Sponsoring & VIP-Fulfillment',
    color: 'from-amber-600 via-orange-500 to-yellow-500',
    badgeIcon: '🎟️',
    description: 'Erschaffe unvergessliche Live-Erlebnisse: Wie du profitabel 2- bis 3-tägige Mastermind-Events, Workshops und exklusive VIP-Retreats planst, vermarktest und vor Ort hochpreisige Upgrades abschließt.',
    lessons: [
      {
        id: '33.1',
        stageId: 33,
        stageTitle: '33. Live-Event-Architektur & Funnels',
        title: 'Der Live-Event-Funnel: Ticket-Verkauf & Sponsoring-Akquise',
        durationMinutes: 31,
        description: 'Wie du Event-Tickets profitabel über Multi-Tier-Funnels verkaufst (General / VIP / Diamond) und Sponsoren gewinnst, die deine Fixkosten vorab decken.',
        learnContent: {
          videoTitle: 'Masterclass: Live-Event-Vermarktung & Sponsoring-Strategie',
          videoDuration: '31:30',
          summaryText: 'Live-Events sind der stärkste Beschleuniger für Community-Bindung und High-Ticket Verkäufe. In dieser Lektion lernst du, wie du eine Event-Location kalkulierst, Ticket-Stufen strukturierst und Sponsorenpakete schnürst.',
          bulletPoints: [
            'Das 3-Stufen Ticket-Modell: General Admission (Einstieg), VIP (Networking Dinner) und Diamond (Private Mastermind)',
            'Sponsoring-Pakete: Wie externe Partner deine Raum- und Cateringkosten finanzieren',
            'Die Early-Bird Launch-Welle: Ticket-Knappheit und zeitlich limitierte Preisnachlässe',
            'No-Show-Minimierung: Vorbereitungs-Boxen und WhatsApp-Gruppen für Ticketinhaber'
          ],
          coreConcepts: [
            {
              iconName: 'ticket',
              title: 'TIERED TICKETING',
              description: 'General, VIP und Diamond Tickets zur optimalen Abschöpfung der Zahlungsbereitschaft.',
              highlight: true
            },
            {
              iconName: 'dollar-sign',
              title: 'SPONSORING DECKS',
              description: 'Partner gewinnen, die Standflächen und Goodie-Bag Platzierungen buchen.'
            },
            {
              iconName: 'calendar',
              title: 'EVENT LAUNCH WAVE',
              description: '3-Phasen-Ticket-Launch: Early Bird $\rightarrow$ Standard $\rightarrow$ Last Minute.'
            }
          ],
          resources: [
            {
              title: 'Live-Event Budget & Sponsoring Pitch-Deck',
              subtitle: 'Kalkulationstabelle & Sponsoren-Präsentation als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Event-Teilnehmer-Tracking',
              subtitle: 'Ticket-Käufer im CRM taggen und Onboarding-Nachrichten automatisieren',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Anatomie eines hochprofitablen Live-Events

Ein physisches Event bringt Kunden von der digitalen Welt in den direkten persönlichen Kontakt.

#### Die Phasen der Event-Organisation:
1. **Kalkulation & Location**: Wähle eine Location mit modernster Technik und exzellentem Catering. Plane die Fixkosten so, dass sie durch 50% der Ticketverkäufe gedeckt sind.
2. **Die Sponsoring-Offensive**: Biete Partnern Bühnenzeit, Messestände und Logo-Platzierungen an.
3. **Der Ticket-Funnel**: Erstelle eine conversionstarke Landingpage mit Agenda, Speaker-Vorstellung und Video-Rückblicken vergangener Events.
4. **Pre-Event Experience**: Sende den Teilnehmern 10 Tage vor Eventstart ein exklusives Begrüßungspaket per Post.`
        },
        understandContent: {
          coreTakeaway: 'Das Geld wird bei Live-Events nicht durch den Ticketverkauf verdient, sondern durch die Upgrades und Angebote vor Ort.',
          keyPrinciples: [
            'Fixkosten durch Sponsoren oder Early-Bird-Tickets vorab absichern',
            'Jeder Teilnehmer muss mit einem Wow-Gefühl und klaren Erkenntnissen nach Hause gehen'
          ]
        },
        actionTask: {
          instruction: 'Plane dein erstes Mastermind- oder Live-Event:',
          inputType: 'checklist',
          checklistItems: [
            'Event-Kalkulation mit Raummiete, Catering und Ticketpreisen aufgestellt',
            'Sponsoring-Pakete (Gold / Silber / Bronze) definiert und bepreist',
            'Ticket-Sales-Funnel mit Early-Bird Countdown eingerichtet'
          ],
          toolboxCategory: 'landingpage'
        }
      },
      {
        id: '33.2',
        stageId: 33,
        stageTitle: '33. Bühnen-Verkauf & VIP-Fulfillment',
        title: 'Stage-Selling & Back-of-the-Room Closing: Angebote auf Live-Events',
        durationMinutes: 34,
        description: 'Die Kunst des ethischen Bühnenverkaufs: Wie du eine mitreißende Keynote hältst und am Ende 30-50% des Raumes in dein exklusivstes High-Ticket Angebot abschließt.',
        learnContent: {
          videoTitle: 'Masterclass: Stage-Selling & Back-of-the-Room Conversion',
          videoDuration: '34:15',
          summaryText: 'Die Energie im Raum nach einem 3-tägigen Event ist unvergleichlich hoch. Erfahre, wie du ein unwiderstehliches Event-Only-Angebot präsentierst, Einwände von der Bühne aus entkräftest und Kaufverträge direkt vor Ort schließt.',
          bulletPoints: [
            'Die dramaturgische Kurve einer Keynote: Vom Problem über die Transformation zum logischen nächsten Schritt',
            'Das Event-Only-Angebot: Boni, Ratenzahlungsmodelle und exklusive Mastermind-Plätze',
            'Back-of-the-Room Logistik: Verträge, Kartenterminals und Beratungstische für schnelle Abwicklung',
            'Post-Event Follow-up: Wie du unentschlossene Teilnehmer in den 48 Stunden nach dem Event abschließt'
          ],
          coreConcepts: [
            {
              iconName: 'award',
              title: 'STAGE PITCH ARCHITEKTUR',
              description: 'Fließender Übergang von purem Mehrwert zum exklusiven Weiterbildungs-Angebot.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'EVENT-ONLY VALUE STACK',
              description: 'Einzigartige Boni, die es nur für Buchungen direkt vor Ort gibt.'
            }
          ],
          resources: [
            {
              title: 'Stage-Pitch Keynote Template & Folien-Set',
              subtitle: 'Erprobtes Präsentations-Framework als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Schnell-Auftragserfassung',
              subtitle: 'Vor-Ort-Bestellungen und Verträge live im CRM erfassen',
              type: 'tool',
              iconName: 'dollar-sign',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Kunst des Bühnen-Verkaufs

Auf der Bühne verkaufst du nicht durch Druck, sondern durch Inspiration und die logische Konsequenz der gemeinsamen Weiterarbeit.

#### Die 4 Schritte des perfekten Bühnen-Pitches:
1. **Der Reality-Check**: Führe den Teilnehmern vor Augen, wie schwer die Umsetzung ohne begleitendes Mentoring nach dem Event wird.
2. **Die Lösungsvision**: Stelle deine Jahres-Mastermind oder das 1:1 VIP-Programm als Beschleuniger vor.
3. **Der Value Stack**: Zeige den immensen Gesamtwert auf und überrasche mit einem exklusiven Vor-Ort-Sonderpreis.
4. **Der Call-to-Action**: Lade die Teilnehmer ein, direkt am Back-of-the-Room Tisch ihren Platz zu sichern.`
        },
        understandContent: {
          coreTakeaway: 'Wer auf der Bühne begeistert und einen glasklaren Mehrwert bietet, gibt den Teilnehmern die Chance auf nachhaltigen Erfolg.',
          keyPrinciples: [
            'Kein harter Verkaufsdruck – das Angebot muss sich wie eine exklusive Einladung anfühlen',
            'Zahlungsterminals und Bestellformulare vor Ort müssen einwandfrei funktionieren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere deinen Bühnen-Pitch und die Vor-Ort-Abwicklung:',
          inputType: 'checklist',
          checklistItems: [
            'Keynote-Präsentation mit dramaturgischem Pitch-Aufbau erstellt',
            'Exklusiver Event-Only Value Stack mit Vor-Ort-Boni kalkuliert',
            'Back-of-the-Room Auftragsformulare und Kartenzahlung vorbereitet'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  {
    id: 34,
    title: '34. Lizenzierung, Franchise-Modelle & White-Label Skalierung',
    subtitle: 'Systeme lizenzieren, Agentur-Partnernetzwerke & Wiederkehrende Lizenzgebühren',
    color: 'from-emerald-600 via-teal-600 to-indigo-600',
    badgeIcon: '📜',
    description: 'Vervielfache dein Geschäftsmodell ohne zusätzliches Fulfillment: Lizenziere deine erprobten Systeme, erstelle White-Label-Lösungen für Agenturen und baue ein globales Partner-Netzwerk mit monatlichen Lizenzgebühren auf.',
    lessons: [
      {
        id: '34.1',
        stageId: 34,
        stageTitle: '34. Lizenz-Architektur & White-Label',
        title: 'Die White-Label & Lizenz-Formel: Systeme gewinnbringend vermieten',
        durationMinutes: 30,
        description: 'Wie du deine Workflows, Templates und Software-Setups in ein schlüsselfertiges Lizenz-Paket für andere Dienstleister und Agenturen verwandelst.',
        learnContent: {
          videoTitle: 'Masterclass: Das Lizenzierungs- & White-Label-Modell',
          videoDuration: '30:25',
          summaryText: 'Warum jedes Projekt selbst umsetzen, wenn hunderte Agenturen für dein erprobtes System Lizenzgebühren zahlen wollen? Lerne, wie du IP-Rechte schützt, Lizenzpakete schnürst und monatliche wiederkehrende Lizenzerträge generierst.',
          bulletPoints: [
            'Die 3 Lizenz-Modelle: Exklusiv-Lizenz (Territorium), Franchise-Lizenz (Systempartnerschaft) und White-Label (Rebranding)',
            'IP-Schutz & Marken-Asset-Absicherung: Was darf der Lizenznehmer verändern und was bleibt geschützt?',
            'Lizenz-Pricing: Setup-Fee (einmalig 5.000€ - 25.000€) + monatliche Lizenzgebühr / Umsatzbeteiligung (Royalty)',
            'Das schlüsselfertige Partner-Portal: Trainings, Marketing-Materialien und Support-Ressourcen für Lizenzpartner'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: 'IP LICENSING',
              description: 'Verkauf von Nutzungsrechten deines Gesamtsystems ohne eigenes Fulfillment.',
              highlight: true
            },
            {
              iconName: 'repeat',
              title: 'ROYALTY STREAM',
              description: 'Monatliche Lizenzgebühren und Umsatzbeteiligungen von jedem Partner.',
              highlight: false
            },
            {
              iconName: 'shield-check',
              title: 'TERRITORY LOCK',
              description: 'Gebietsschutz für Partner zur Steigerung des wahrgenommenen Werts.'
            }
          ],
          resources: [
            {
              title: 'White-Label & Lizenzvertrag Muster',
              subtitle: 'Rechtlich geprüfte Lizenzvereinbarung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Partner- & Sub-Account Verwaltung',
              subtitle: 'Lizenznehmer-Accounts und Zugriffsrechte im CRM steuern',
              type: 'tool',
              iconName: 'users',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Architektur der System-Lizenzierung

Ein Lizenzmodell ist die profitabelste Art der Skalierung, da die operative Umsetzung komplett vom Lizenznehmer getragen wird.

#### Die 4 Säulen des erfolgreichen Lizenz-Ökosystems:
1. **Das Standard Operating Package (SOP-Vault)**: Alle Vorlagen, Skripte, Funnels und E-Mail-Sequenzen in einem zentralen Vault.
2. **Die Partnertraining-Akademie**: Ein interner Schulungsbereich, den jeder Mitarbeiter des Lizenznehmers vorab durchläuft.
3. **Qualitätssicherung & Audits**: Quartalsweise Überprüfung der Arbeitsqualität zur Wahrung des Markenstandards.
4. **Zentrales CRM- & Tool-Routing**: Lizenzpartner nutzen deine Software-Infrastruktur gegen monatliche Software-Gebühren.`
        },
        understandContent: {
          coreTakeaway: 'Verkaufe nicht deine Zeit für Ergebnisse – verkaufe die Lizenz zu dem System, das die Ergebnisse garantiert.',
          keyPrinciples: [
            'Niemals ein System lizenzieren, das nicht mindestens 20 Mal erfolgreich in der Praxis getestet wurde',
            'Klare vertragliche Regelungen für Kündigung, Gebietsschutz und Wettbewerbsverbote vereinbaren'
          ]
        },
        actionTask: {
          instruction: 'Strukturiere dein erstes White-Label- oder Lizenzpaket:',
          inputType: 'checklist',
          checklistItems: [
            'Kernsystem und Vorlagen-Assets für Lizenznehmer gebündelt',
            'Preispunkte für Setup-Gebühr und monatliche Lizenzgebühr kalkuliert',
            'Muster-Lizenzvertrag mit rechtlichen Schutzklauseln vorbereitet'
          ],
          toolboxCategory: 'affiliate'
        }
      },
      {
        id: '34.2',
        stageId: 34,
        stageTitle: '34. Partner-Netzwerke & Skalierung',
        title: 'Partner-Netzwerk aufbauen: Akquise & Onboarding von B2B-Lizenznehmern',
        durationMinutes: 32,
        description: 'Wie du aktiv B2B-Partner, Agenturen und Berater gewinnst, die dein System in ihren Kundenstamm einführen und skalieren.',
        learnContent: {
          videoTitle: 'Masterclass: B2B-Partnerakquise & Lizenzpartner-Führung',
          videoDuration: '32:40',
          summaryText: 'Ein Netzwerk aus 20 aktiven Lizenzpartnern generiert oft mehr Umsatz als ein 50-köpfiges Inhouse-Team. Lerne, wie du Partner ansprichst, qualifizierst und erfolgreich in dein System einarbeitest.',
          bulletPoints: [
            'Der B2B-Partner Funnel: Wie du etablierte Dienstleister gezielt auf Messen und LinkedIn ansprichst',
            'Der Partnerschafts-Pitch: Wie du zeigst, dass dein System ihren Kundenwert sofort verdoppelt',
            'Das 14-Tage Onboarding-Programm: Schnelle erste Erfolge für maximale Motivation des Partners',
            'Partner-Leaderboard & Quartals-Conventions: Den Wettbewerbsgeist und die Loyalität im Netzwerk fördern'
          ],
          coreConcepts: [
            {
              iconName: 'users',
              title: 'PARTNER FUNNEL',
              description: 'Gezielte Akquise von bestehenden Marktteilnehmern mit eigenem Kundenstamm.',
              highlight: true
            },
            {
              iconName: 'zap',
              title: 'FAST-START ONBOARDING',
              description: 'Erster Partner-Umsatz innerhalb von 14 Tagen sichert langfristige Treue.'
            }
          ],
          resources: [
            {
              title: 'B2B Partner Pitch-Deck & Onboarding-Leitfaden',
              subtitle: 'Präsentation & Einarbeitungs-Fahrplan als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM Partner-Umsatz-Tracking',
              subtitle: 'Lizenzgebühren und Partner-Abschlüsse in Echtzeit tracken',
              type: 'tool',
              iconName: 'bar-chart-2',
              actionUrl: 'crm'
            }
          ],
          fullArticleGuide: `### Die Partner-Akquise & Skalierungs-Strategie

Der größte Vorteil bei der Partnerakquise ist, dass deine Zielpartner bereits über einen bestehenden Kundenstamm und Vertriebskapazitäten verfügen.

#### Der 3-Stufen Partner-Gewinnungs-Zyklus:
1. **Der Synergie-Check**: Finde Dienstleister, deren Angebot deinem vor- oder nachgelagert ist (z. B. Webdesigner für dein Conversion-System).
2. **Die Live-Demo**: Zeige dem Inhaber live, wie viel Zusatzgewinn er pro Bestandskunde mit deiner Lizenz erwirtschaftet.
3. **Der Pilot-Kunde**: Setze das System gemeinsam beim ersten Kunden des Partners um, um Vertrauen und Routine aufzubauen.`
        },
        understandContent: {
          coreTakeaway: 'Deine Partner sind keine Kunden – sie sind Multiplikatoren, die gemeinsam mit dir den Markt dominieren.',
          keyPrinciples: [
            'Partner-Support muss höchste Priorität im Unternehmen haben',
            'Erfolge der Top-Partner öffentlich im Netzwerk feiern'
          ]
        },
        actionTask: {
          instruction: 'Starte deine B2B-Partnerakquise-Kampagne:',
          inputType: 'checklist',
          checklistItems: [
            'Liste von 20 potenziellen Partner-Agenturen und Dienstleistern erstellt',
            'Partner-Pitch-Deck mit Wirtschaftlichkeitsberechnung finalisiert',
            'Partner-Onboarding Sequenz im Mara CRM angelegt'
          ],
          toolboxCategory: 'affiliate'
        }
      }
    ]
  },
  {
    id: 35,
    title: '35. Vertikale Integration, Software & SaaS-Erweiterungen',
    subtitle: 'Vom Service-Provider zum Software-Inhaber: Micro-SaaS, Add-Ons & Plattform-Ökosysteme',
    color: 'from-violet-600 via-purple-600 to-indigo-700',
    badgeIcon: '⚡',
    description: 'Erreiche die höchste Stufe der digitalen Wertschöpfung: Ergänze deine Dienstleistungen und Infoprodukte um proprietäre Software-Tools, Micro-SaaS-Lösungen und automatisierte Plattform-Ökosysteme.',
    lessons: [
      {
        id: '35.1',
        stageId: 35,
        stageTitle: '35. Software & Micro-SaaS',
        title: 'Micro-SaaS Architektur: Eigene Tools für dein Kunden-Ökosystem',
        durationMinutes: 32,
        description: 'Wie du einfache, hochspezifische Software-Tools (Micro-SaaS oder No-Code Apps) entwickelst, die deine Kunden täglich nutzen und die Abwanderungsrate gegen Null drücken.',
        learnContent: {
          videoTitle: 'Masterclass: Service-to-Software Transformation & Micro-SaaS',
          videoDuration: '32:15',
          summaryText: 'Software-Unternehmen erzielen die höchsten Bewertungs-Multiples und binden Kunden über Jahre. In dieser Lektion lernst du, wie du typische Kundenprobleme identifizierst, die sich durch ein schlankes Tool lösen lassen.',
          bulletPoints: [
            'Die Service-to-Product Formel: Manuelle Excel-Tabellen & Workflows in interaktive Web-Apps verwandeln',
            'No-Code & KI-Entwicklung: Wie du mit modernen Tools funktionale Web-Apps in unter 30 Tagen baust',
            'SaaS-Pricing Modelle: Freemium vs. Flatrate vs. Usage-Based (Nutzungsbasierte Abrechnung)',
            'Sticky Features: Welche Funktionen dafür sorgen, dass Nutzer die Software täglich öffnen'
          ],
          coreConcepts: [
            {
              iconName: 'cpu',
              title: 'MICRO-SAAS ENGINE',
              description: 'Schlanke Tools mit einer einzigen, perfekten Kernfunktion für deine Nische.',
              highlight: true
            },
            {
              iconName: 'database',
              title: 'DATA RETENTION',
              description: 'Kundendaten im eigenen Tool binden Kunden langfristig an dein Ökosystem.',
              highlight: false
            },
            {
              iconName: 'trending_up',
              title: 'MRR STICKINESS',
              description: 'Churn-Raten unter 2% durch tiefe Integration in den Arbeitsalltag des Nutzers.'
            }
          ],
          resources: [
            {
              title: 'Micro-SaaS Spezifikations- & Wireframe Template',
              subtitle: 'Feature-Priorisierung & UX-Planung als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'Mara CRM API & Webhook Entwicklerbereich',
              subtitle: 'Eigene Tools direkt an die Mara CRM Schnittstellen anbinden',
              type: 'tool',
              iconName: 'code',
              actionUrl: 'settings'
            }
          ],
          fullArticleGuide: `### Die Transformation vom Dienstleister zum Software-Anbieter

Software löst das größte Problem klassischer Agenturen: Die lineare Abhängigkeit von menschlicher Arbeitszeit.

#### Die 4 Schritte zum erfolgreichen Micro-SaaS:
1. **Engpass-Identifikation**: Welches Tool oder welche Berechnung führen deine Kunden heute noch umständlich manuell durch?
2. **Das Minimum Viable Product (MVP)**: Baue nur die eine Kernfunktion, die das Problem in Sekunden löst – keine Feature-Überladung.
3. **Beta-Testing mit Bestandskunden**: Gib deinen bestehenden Coaching- oder Agenturkunden exklusiven Vorabzugang für direktes Feedback.
4. **Standalone Vermarktung**: Biete die Software als Ergänzung zu deinen Kursen oder als eigenständiges Monatsabo an.`
        },
        understandContent: {
          coreTakeaway: 'Wer die Software kontrolliert, auf der Kunden arbeiten, kontrolliert die gesamte Kundenbeziehung.',
          keyPrinciples: [
            'Einfachheit schlägt Funktionsvielfalt – ein Tool muss in 60 Sekunden verstanden sein',
            'Software-Updates und Stabilität haben Vorrang vor neuen Marketing-Features'
          ]
        },
        actionTask: {
          instruction: 'Konzipiere dein erstes Micro-SaaS Feature:',
          inputType: 'checklist',
          checklistItems: [
            'Das dringendste repetitive Kundenproblem für eine Tool-Lösung definiert',
            'MVP-Funktionsumfang und Wireframe auf 1 Seite skizziert',
            'Schnittstelle (API) zur Synchronisation mit Mara CRM geplant'
          ],
          toolboxCategory: 'content'
        }
      },
      {
        id: '35.2',
        stageId: 35,
        stageTitle: '35. Plattform-Ökosysteme & Skalierung',
        title: 'Das Plattform-Ökosystem: Software, Services & Community vereinen',
        durationMinutes: 34,
        description: 'Die ultimative Geschäftsarchitektur: Wie du Software, Akademie-Inhalte, CRM-Services und eine Community zu einem unschlagbaren Gesamterlebnis verschmilzt.',
        learnContent: {
          videoTitle: 'Masterclass: Die Plattform-Ökosystem-Architektur',
          videoDuration: '34:50',
          summaryText: 'Wenn Software, Weiterbildung und Community nahtlos ineinandergreifen, entsteht ein unzerstörbarer Burggraben (Economic Moat) um dein Unternehmen. Erfahre, wie echte Marktführer ihr gesamtes Angebot zu einer All-in-One Plattform verweben.',
          bulletPoints: [
            'Der Ökosystem-Flywheel-Effekt: Mehr Software-Nutzer $\rightarrow$ Mehr Akademie-Käufer $\rightarrow$ Höhere Community-Aktivität $\rightarrow$ Mehr Software-Upgrades',
            'Single-Sign-On (SSO): Ein einziger Login für alle Kurse, Tools, CRM und Community-Bereiche',
            'Gamifizierte Lern- und Anwendungs-Pfade: Wie Theorie direkt im Software-Tool in die Praxis umgesetzt wird',
            'Monetarisierungs-Architektur: All-in-One Bundle-Pricing für maximalen wahrgenommenen Wert'
          ],
          coreConcepts: [
            {
              iconName: 'layers',
              title: 'ECOSYSTEM FLYWHEEL',
              description: 'Jede Komponente stärkt und vermarktet die anderen Komponenten automatisch.',
              highlight: true
            },
            {
              iconName: 'shield',
              title: 'ECONOMIC MOAT',
              description: 'Ein unkopierbares Ökosystem schützt dauerhaft vor neu aufkommenden Konkurrenten.'
            }
          ],
          resources: [
            {
              title: 'Plattform-Ökosystem Architektur Blueprint',
              subtitle: 'Verzahnung von Content, Tooling & Community als PDF',
              type: 'pdf',
              iconName: 'file-text',
              actionUrl: 'tools'
            },
            {
              title: 'GOM-MAR All-in-One Dashboard',
              subtitle: 'Das Gesamtsystem aus CRM, E-Mail, Landingpage & Akademie nutzen',
              type: 'tool',
              iconName: 'layout',
              actionUrl: 'progress'
            }
          ],
          fullArticleGuide: `### Die Architektur des digitalen Plattform-Ökosystems

Einzelne Kurse oder isolierte Tools sind austauschbar. Ein vollständiges Ökosystem ist unersetzlich.

#### Die 3 Ebenen des Ökosystems:
1. **Die Wissensebene (Akademie)**: Vermittelt das mentale Modell, Strategien und Best Practices.
2. **Die Werkzeugebene (Software & CRM)**: Stellt die Infrastruktur bereit, um das Gelernte ohne Hürden umzusetzen.
3. **Die Beziehungsebene (Community & Netzwerk)**: Hält den Kunden emotional engagiert und inspiriert ihn durch den Erfolg anderer.`
        },
        understandContent: {
          coreTakeaway: 'Kunden kaufen keine einzelnen Bausteine – sie suchen nach der einen ganzheitlichen Lösung für ihr Problem.',
          keyPrinciples: [
            'Alle Berührungspunkte des Kunden müssen über eine einheitliche Markenführung laufen',
            'Reibungslose Übergänge zwischen Lernen (Akademie) und Anwenden (Tools) schaffen'
          ]
        },
        actionTask: {
          instruction: 'Verknüpfe deine Angebote zu einem ganzheitlichen Ökosystem:',
          inputType: 'checklist',
          checklistItems: [
            'All-in-One Bundle-Angebot (Akademie + Software-Zugang + Community) geschnürt',
            'Zentrales Dashboard für alle Kundenzugänge eingerichtet',
            'Onboarding-Workflow für die nahtlose Nutzung aller 3 Ökosystem-Ebenen aktiviert'
          ],
          toolboxCategory: 'content'
        }
      }
    ]
  },
  ...MODULES_36_TO_45,
  ...MODULES_46_TO_55,
  ...MODULES_56_TO_65,
  ...MODULES_66_TO_75,
  ...MODULES_76_TO_85,
  ...MODULES_86_TO_95,
  ...MODULES_96_TO_99
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

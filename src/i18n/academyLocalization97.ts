import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '97': {
      title: '97. Space & Subsea Infrastructure',
      subtitle: 'LEO constellations, ITU spectrum coordination, submarine cables and space law',
      description: 'Analyse the economics of LEO satellite constellations and submarine cables together with their licensing, spectrum-coordination, liability, security, environmental, financing and operating risks.',
      lessons: {
        '97.1': {
          stageTitle: '97. NewSpace & Satellite Constellations',
          title: 'NewSpace Economics: SmallSats, Rideshares & ITU Spectrum Procedures',
          description: 'Learn how CubeSats and LEO constellations are planned and financed, how administrations initiate ITU procedures and which licensing, liability, debris and operating risks apply.',
          learnContent: {
            videoTitle: 'Masterclass: NewSpace Economics, Launches & Orbital Spectrum',
            summaryText: 'Rideshare offerings may improve access to orbit, but mission cost, schedule and success remain payload-, provider- and market-specific. Frequency filings are submitted through a competent national administration and may require coordination, notification, bringing into use and national licences; they do not create unrestricted ownership of spectrum.',
            bulletPoints: [
              'Launch economics: build the total budget from payload integration, testing, launch, insurance, ground operations, reserves and possible delays rather than a universal price per kilogram',
              'ITU procedures: the national administration submits assignments; coordination, notification, recording and timely bringing into use follow the Radio Regulations',
              'CubeSat form factors standardise interfaces but guarantee neither low total cost nor reliability, launch access or commercial viability',
              'Space law: assess national authorisation and continuing supervision, registration, liability allocation, export controls and any insurance requirements by jurisdiction'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'COORDINATED SPECTRUM', description: 'Regulated use coordinated against interference, not an unrestricted global monopoly.', highlight: true },
              { iconName: 'zap', title: 'LEO CONSTELLATION', description: 'Latency and performance depend on orbit, gateways, routing, load, weather and user equipment.' }
            ],
            resources: [
              { title: 'NewSpace Licensing & Mission Guide', subtitle: 'PDF model for spectrum, licensing, liability and satellite budgeting', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Orbital Mission Tracker', subtitle: 'Track licences, telemetry, ground-station contracts, risks and launch dates', type: 'tool', iconName: 'globe', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Commercialising low Earth orbit

Satellite constellations can support communications, tracking and Earth observation, but deployment and demand are uncertain.

#### Review areas for an orbital mission:
1. **Service and spectrum**: Design the link budget, coverage and interference tolerance; address coordination, notification, fees, milestones and bringing into use with the competent national administration.
2. **Authorisation and responsibility**: Review national space, radio, Earth-observation, privacy, export-control and sanctions rules plus registration, continuing supervision, liability and insurance.
3. **Space segment**: Validate payload, bus, radiation environment, collision avoidance, cybersecurity, supply chain, testing and failure modes; standards do not replace qualification.
4. **Launch and operations**: Plan alternatives for provider, integration, delay, mission loss, ground stations, key management, data paths and service levels.
5. **Sustainability and end of life**: Document constellation deployment, space awareness, manoeuvrability, passivation, de-orbit and disposal under applicable requirements.

An ITU recording provides protection only within the applicable framework and subject to its conditions. It guarantees neither interference-free operation nor market access or commercial success.`,
          },
          understandContent: {
            coreTakeaway: 'A viable space mission combines spectrum coordination, national authorisation, technical reliability, financing and responsible lifecycle management; an early filing alone creates no unbeatable advantage.',
            keyPrinciples: [
              'Design collision avoidance, passivation and de-orbiting to applicable requirements and test realistic failure cases',
              'Review insurability, coverage, exclusions, deductibles and liability recourse; insurance is not always mandatory or fully available'
            ]
          },
          actionTask: {
            instruction: 'Configure a NewSpace project plan:',
            checklistItems: [
              'Document service, link budget, spectrum, coordination, national licences and bringing-into-use deadlines',
              'Compare launch, integration, insurance, export-control, liability and delay scenarios',
              'Document ground stations, cybersecurity, privacy, operations, collision avoidance and end of mission'
            ]
          }
        },
        '97.2': {
          stageTitle: '97. Subsea Infrastructure & Cables',
          title: 'Submarine Cables & Underwater Data Centres: The Physical Internet Backbone',
          description: 'Understand how submarine cables carry most intercontinental internet traffic, how landing and capacity rights are structured and how novel underwater data centres should be assessed.',
          learnContent: {
            videoTitle: 'Masterclass: Submarine Fibre Networks & Underwater Data Centres',
            summaryText: 'Submarine cables are critical infrastructure for intercontinental data traffic. Consortia, landing stations and capacity contracts require substantial capital, permits, strong security and long-term maintenance. Underwater data centres may explore cooling benefits but still involve energy, construction, operating, recovery and environmental risks.',
            bulletPoints: [
              'Consortia and ownership: define contributions, capacity shares, governance, transfer rights, financing, conflicts and member default',
              'Wet and dry segments: route, repeater spacing, power feed and landing-station design are system-specific and affect cost, security and repair',
              'IRU contracts: long-term use rights define capacity, price, term, maintenance and remedies but do not guarantee uninterrupted availability or demand',
              'Underwater data centres: Project Natick was research; one trial’s reliability result is not general proof of cost, energy or operating advantages'
            ],
            coreConcepts: [
              { iconName: 'server', title: 'SUBSEA DATA BACKBONE', description: 'Critical physical connectivity with shared governance, regulation, security and operating dependencies.', highlight: true },
              { iconName: 'activity', title: 'SUBSEA COOLING', description: 'A potential cooling benefit to weigh against pumping, power, sealing, maintenance, recovery and environmental impacts.' }
            ],
            resources: [
              { title: 'Submarine-Cable Consortium & IRU Review Guide', subtitle: 'PDF covering contractual, regulatory and technical review areas', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Global Subsea Cable Map', subtitle: 'Track routes, landing stations, capacity, incidents and repairs', type: 'tool', iconName: 'globe', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### The invisible arteries of the global economy

Fibre pairs and capacity rights do not confer control over global data traffic. Their value depends on demand, competition, connectivity, availability, regulation and operations.

#### Submarine-cable project review:
- **Route and permits**: Address law of the sea, coastal states, exclusive economic zones, landing rights, environmental assessment, telecom and security approvals by jurisdiction.
- **Technology and resilience**: Assess bathymetry, fishing, anchors, landslides, earthquakes, sabotage, cyber risk, landing-station power and route diversity.
- **Contracts and demand**: Define ownership, IRU or lease, capacity, upgrades, service levels, maintenance, repair costs, credits, termination and counterparty risk.
- **Finance and operations**: Stress construction, interest-rate, currency, tax, accounting, insurance, supply-chain, vessel and spare-parts risks.
- **Integrity and security**: Review beneficial owners, procurement, anti-bribery, sanctions, export controls, privacy and national-security restrictions.

Low latency may command a premium but guarantees neither customers, pricing nor returns. Long-term capacity rights remain exposed to outage, repair, obsolescence and insolvency risks.`,
          },
          understandContent: {
            coreTakeaway: 'Submarine cables may support long-term revenue, but cash flows remain exposed to termination, demand, pricing, outage, repair, regulatory and counterparty risks.',
            keyPrinciples: [
              'Mitigate route risk with bathymetric, geophysical, fishing, anchoring and natural-hazard analysis; no survey can eliminate damage',
              'Diversify routes, landing stations, power, backhaul, spares and repair vessels and never assume permanent political stability'
            ]
          },
          actionTask: {
            instruction: 'Prepare a submarine-cable capacity memorandum:',
            checklistItems: [
              'Model an IRU or lease under demand, pricing, outage, maintenance, repair, tax and counterparty stress',
              'Map route, landing, environmental, telecom, security, sanctions and privacy approvals',
              'Document physical and cyber security, diverse routing, repair plan, insurance and incident response'
            ]
          }
        }
      }
    }
  },
  pl: {
    '97': {
      title: '97. Infrastruktura kosmiczna i podmorska',
      subtitle: 'Konstelacje LEO, koordynacja widma ITU, kable podmorskie i prawo kosmiczne',
      description: 'Analizuj ekonomikę konstelacji satelitarnych LEO i kabli podmorskich wraz z ryzykiem zezwoleń, koordynacji widma, odpowiedzialności, bezpieczeństwa, środowiska, finansowania i eksploatacji.',
      lessons: {
        '97.1': {
          stageTitle: '97. NewSpace i konstelacje satelitarne',
          title: 'Ekonomika NewSpace: małe satelity, wspólne starty i procedury widmowe ITU',
          description: 'Poznaj planowanie i finansowanie CubeSatów i konstelacji LEO, procedury ITU inicjowane przez administracje oraz ryzyko zezwoleń, odpowiedzialności, śmieci kosmicznych i eksploatacji.',
          learnContent: {
            videoTitle: 'Masterclass: ekonomika NewSpace, starty i widmo orbitalne',
            summaryText: 'Oferty wspólnych startów mogą ułatwiać dostęp do orbity, lecz koszt, termin i powodzenie misji zależą od ładunku, dostawcy i rynku. Zgłoszenia częstotliwości składa właściwa administracja krajowa; mogą wymagać koordynacji, notyfikacji, rozpoczęcia użytkowania i zezwoleń krajowych, a nie tworzą nieograniczonej własności widma.',
            bulletPoints: [
              'Ekonomika startu: buduj pełny budżet z integracji ładunku, testów, startu, ubezpieczenia, segmentu naziemnego, rezerw i możliwych opóźnień zamiast jednej ceny za kilogram',
              'Procedury ITU: administracja krajowa zgłasza przydziały; koordynacja, notyfikacja, rejestracja i terminowe rozpoczęcie użytkowania podlegają Regulaminowi Radiokomunikacyjnemu',
              'Formaty CubeSat standaryzują interfejsy, lecz nie gwarantują niskiego kosztu całkowitego, niezawodności, miejsca na rakiecie ani opłacalności',
              'Prawo kosmiczne: analizuj według jurysdykcji krajowe zezwolenie i stały nadzór, rejestrację, podział odpowiedzialności, kontrolę eksportu oraz ewentualne wymogi ubezpieczeniowe'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'SKOORDYNOWANE WIDMO', description: 'Regulowane użytkowanie koordynowane pod kątem zakłóceń, a nie nieograniczony globalny monopol.', highlight: true },
              { iconName: 'zap', title: 'KONSTELACJA LEO', description: 'Opóźnienie i wydajność zależą od orbity, bram, trasowania, obciążenia, pogody i terminala.' }
            ],
            resources: [
              { title: 'Przewodnik po zezwoleniach i misji NewSpace', subtitle: 'Model PDF dla widma, zezwoleń, odpowiedzialności i budżetu satelity', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Rejestr misji orbitalnych Mara CRM', subtitle: 'Śledzenie zezwoleń, telemetrii, umów stacji naziemnych, ryzyka i dat startów', type: 'tool', iconName: 'globe', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Komercjalizacja niskiej orbity okołoziemskiej

Konstelacje satelitarne mogą wspierać komunikację, śledzenie i obserwację Ziemi, lecz wdrożenie i popyt są niepewne.

#### Obszary analizy misji orbitalnej:
1. **Usługa i widmo**: Zaprojektuj bilans łącza, zasięg i odporność na zakłócenia; uzgodnij z właściwą administracją koordynację, notyfikację, opłaty, kamienie milowe i rozpoczęcie użytkowania.
2. **Zezwolenia i odpowiedzialność**: Zbadaj krajowe przepisy kosmiczne, radiowe, obserwacji Ziemi, prywatności, kontroli eksportu i sankcji oraz rejestrację, stały nadzór, odpowiedzialność i ubezpieczenie.
3. **Segment kosmiczny**: Zweryfikuj ładunek, platformę, promieniowanie, unikanie kolizji, cyberbezpieczeństwo, łańcuch dostaw, testy i tryby awarii; normy nie zastępują kwalifikacji.
4. **Start i eksploatacja**: Zaplanuj alternatywy dla dostawcy, integracji, opóźnienia, utraty misji, stacji naziemnych, zarządzania kluczami, przepływu danych i poziomów usług.
5. **Zrównoważenie i koniec misji**: Udokumentuj rozmieszczenie konstelacji, świadomość sytuacyjną, manewrowanie, pasywację, zejście z orbity i utylizację zgodnie z właściwymi wymogami.

Wpis ITU zapewnia ochronę wyłącznie w granicach właściwego systemu i pod jego warunkami. Nie gwarantuje działania bez zakłóceń, dostępu do rynku ani sukcesu gospodarczego.`,
          },
          understandContent: {
            coreTakeaway: 'Wykonalna misja łączy koordynację widma, krajowe zezwolenia, niezawodność techniczną, finansowanie i odpowiedzialne zarządzanie cyklem życia; samo wczesne zgłoszenie nie daje niepokonanej przewagi.',
            keyPrinciples: [
              'Projektuj unikanie kolizji, pasywację i zejście z orbity według właściwych wymogów oraz testuj realistyczne awarie',
              'Sprawdź możliwość ubezpieczenia, zakres, wyłączenia, udział własny i regres; ubezpieczenie nie zawsze jest obowiązkowe ani w pełni dostępne'
            ]
          },
          actionTask: {
            instruction: 'Skonfiguruj plan projektu NewSpace:',
            checklistItems: [
              'Udokumentuj usługę, bilans łącza, widmo, koordynację, zezwolenia krajowe i terminy rozpoczęcia użytkowania',
              'Porównaj scenariusze startu, integracji, ubezpieczenia, kontroli eksportu, odpowiedzialności i opóźnień',
              'Udokumentuj stacje naziemne, cyberbezpieczeństwo, prywatność, eksploatację, unikanie kolizji i koniec misji'
            ]
          }
        },
        '97.2': {
          stageTitle: '97. Infrastruktura i kable podmorskie',
          title: 'Kable podmorskie i podwodne centra danych: fizyczny szkielet internetu',
          description: 'Poznaj rolę kabli w przesyle większości międzykontynentalnego ruchu internetowego, strukturę praw lądowania i przepustowości oraz ocenę nowatorskich podwodnych centrów danych.',
          learnContent: {
            videoTitle: 'Masterclass: podmorskie sieci światłowodowe i podwodne centra danych',
            summaryText: 'Kable podmorskie są infrastrukturą krytyczną dla międzykontynentalnego ruchu danych. Konsorcja, stacje lądowania i umowy przepustowości wymagają znacznego kapitału, zezwoleń, silnych zabezpieczeń i wieloletniego utrzymania. Podwodne centra danych mogą badać korzyści chłodzenia, lecz nadal wiążą się z ryzykiem energii, budowy, eksploatacji, wydobycia i środowiska.',
            bulletPoints: [
              'Konsorcja i własność: określ wkłady, udziały przepustowości, ład, prawa przeniesienia, finansowanie, konflikty i niewykonanie przez członka',
              'Odcinek mokry i suchy: trasa, odstępy wzmacniaczy, zasilanie i projekt stacji lądowania zależą od systemu oraz wpływają na koszt, bezpieczeństwo i naprawę',
              'Umowy IRU: długoterminowe prawa użytkowania określają przepustowość, cenę, okres, utrzymanie i środki naprawcze, lecz nie gwarantują ciągłej dostępności ani popytu',
              'Podwodne centra danych: Project Natick był projektem badawczym; wynik niezawodności jednego testu nie dowodzi ogólnej przewagi kosztowej, energetycznej ani operacyjnej'
            ],
            coreConcepts: [
              { iconName: 'server', title: 'PODMORSKI SZKIELET DANYCH', description: 'Krytyczna łączność fizyczna zależna od wspólnego ładu, regulacji, bezpieczeństwa i eksploatacji.', highlight: true },
              { iconName: 'activity', title: 'CHŁODZENIE POD WODĄ', description: 'Potencjalną korzyść chłodzenia należy porównać z pompowaniem, energią, szczelnością, utrzymaniem, wydobyciem i wpływem na środowisko.' }
            ],
            resources: [
              { title: 'Przewodnik po konsorcjum kablowym i IRU', subtitle: 'Obszary analizy umownej, regulacyjnej i technicznej w PDF', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Globalna mapa kabli podmorskich GOM-MAR', subtitle: 'Śledzenie tras, stacji lądowania, przepustowości, incydentów i napraw', type: 'tool', iconName: 'globe', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Niewidoczne arterie światowej gospodarki

Pary włókien i prawa przepustowości nie zapewniają kontroli nad globalnym ruchem danych. Ich wartość zależy od popytu, konkurencji, łączności, dostępności, regulacji i eksploatacji.

#### Analiza projektu kabla podmorskiego:
- **Trasa i zezwolenia**: Uwzględnij prawo morza, państwa nadbrzeżne, wyłączne strefy ekonomiczne, prawa lądowania, ocenę środowiskową oraz zezwolenia telekomunikacyjne i bezpieczeństwa w każdej jurysdykcji.
- **Technologia i odporność**: Oceń batymetrię, rybołówstwo, kotwice, osuwiska, trzęsienia ziemi, sabotaż, cyberzagrożenia, zasilanie stacji lądowania i różnorodność tras.
- **Umowy i popyt**: Określ własność, IRU lub najem, przepustowość, modernizacje, poziomy usług, utrzymanie, koszt napraw, ulgi, rozwiązanie i ryzyko kontrahenta.
- **Finanse i eksploatacja**: Testuj ryzyko budowy, stóp, walut, podatków, rachunkowości, ubezpieczenia, łańcucha dostaw, statków i części.
- **Uczciwość i bezpieczeństwo**: Sprawdź beneficjentów rzeczywistych, zamówienia, przeciwdziałanie korupcji, sankcje, kontrolę eksportu, prywatność i ograniczenia bezpieczeństwa narodowego.

Niskie opóźnienie może uzasadniać wyższą cenę, lecz nie gwarantuje klientów, premii ani zwrotu. Długoterminowe prawa przepustowości nadal podlegają ryzyku awarii, napraw, starzenia technologii i niewypłacalności.`,
          },
          understandContent: {
            coreTakeaway: 'Kable podmorskie mogą wspierać długoterminowe przychody, lecz przepływy pozostają narażone na rozwiązanie, popyt, ceny, awarie, naprawy, regulacje i ryzyko kontrahenta.',
            keyPrinciples: [
              'Ograniczaj ryzyko trasy analizą batymetryczną, geofizyczną, rybołówstwa, kotwic i zagrożeń naturalnych; żadne badanie nie usuwa możliwości szkody',
              'Dywersyfikuj trasy, stacje lądowania, zasilanie, sieć dosyłową, części i statki naprawcze oraz nie zakładaj trwałej stabilności politycznej'
            ]
          },
          actionTask: {
            instruction: 'Przygotuj memorandum przepustowości kabla podmorskiego:',
            checklistItems: [
              'Modeluj IRU lub najem przy stresie popytu, ceny, awarii, utrzymania, naprawy, podatków i kontrahenta',
              'Zmapuj zezwolenia dotyczące trasy, lądowania, środowiska, telekomunikacji, bezpieczeństwa, sankcji i prywatności',
              'Udokumentuj bezpieczeństwo fizyczne i cyfrowe, różne trasy, plan napraw, ubezpieczenie i reagowanie na incydenty'
            ]
          }
        }
      }
    }
  }
};

export const localizeAcademyStage97 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['97'];
  if (!patch) return stages;
  return stages.map(stage => stage.id !== 97 ? stage : ({
    ...stage,
    ...patch,
    lessons: stage.lessons.map(lesson => {
      const lessonPatch = patch.lessons?.[lesson.id];
      return !lessonPatch ? lesson : ({
        ...lesson,
        ...lessonPatch,
        learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent },
        understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent },
        actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask }
      });
    })
  }));
};

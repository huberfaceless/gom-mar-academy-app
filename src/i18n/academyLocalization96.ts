import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '96': {
      title: '96. Sovereign Wealth Funds & Public-Sector Allocation',
      subtitle: 'National funds, bilateral projects, public debt and global co-investment',
      description: 'Analyse the different mandates of global sovereign wealth funds and structure potential co-investments with appropriate governance, procurement, investment-screening, sanctions, AML, tax, accounting and custody review.',
      lessons: {
        '96.1': {
          stageTitle: '96. Sovereign-Fund Architecture & Mandates',
          title: 'Sovereign Wealth Funds: Investment Models & Co-Investment Mandates',
          description: 'Understand how sovereign funds manage asset allocation, liquidity and risk differently and how governance, ESG, investment screening and compliance shape a potential relationship.',
          learnContent: {
            videoTitle: 'Masterclass: Sovereign Wealth Fund Allocation & Major Transactions',
            summaryText: 'Sovereign wealth funds differ materially in statutory mandate, funding source, liabilities, liquidity needs, risk budget, investment horizon and policy constraints. A relationship requires robust due diligence, transparent governance and transaction-specific regulatory review; access, ticket size and returns are never assured.',
            bulletPoints: [
              'Distinguish stabilisation, savings, reserve-investment, pension-reserve and strategic-development mandates rather than treating all funds alike',
              'Compare direct investments, fund mandates and co-investments by capability, fees, control, concentration, liquidity and conflicts',
              'Santiago Principles: 24 voluntary principles and practices covering legal framework, governance, accountability and prudent investment by sovereign funds',
              'FDI screening is jurisdiction- and transaction-specific; EU cooperation, German investment review and US CFIUS are separate regimes'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'SWF MANDATE FIT', description: 'Engage long-term investors on mandate without promising access, capital or execution.', highlight: true },
              { iconName: 'shield', title: 'SANTIAGO PRINCIPLES', description: 'Voluntary principles for sovereign funds, not a project certificate or investment approval.' }
            ],
            resources: [
              { title: 'Sovereign-Fund Mandate & Risk Review', subtitle: 'PDF covering fund profiles, governance, criteria and mandate structures', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Institutional Investor Cockpit', subtitle: 'Document contacts, review paths and approvals for institutional investors', type: 'tool', iconName: 'briefcase', actionUrl: 'crm' }
            ],
            fullArticleGuide: `### Operating in the sovereign-fund market

Sovereign funds may invest over generations, but their mandates and constraints differ.

#### Review areas for a potential allocation:
1. **Mandate and portfolio fit**: Review statutory objectives, reference portfolio, risk budget, horizon, liquidity, currency and exclusions; there is no universal minimum ticket.
2. **Economics and risk**: Test cash flows, valuation, fees, leverage, concentration, default, counterparty, country and exit risks under stress.
3. **Governance and integrity**: Document ownership, conflicts, remuneration, reporting, procurement and anti-bribery, PEP, sanctions and AML checks.
4. **Law and operations**: Obtain expert review of investment screening, competition and state-aid rules, tax, accounting, custody, privacy and cross-border distribution.
5. **Participation rights**: Negotiate information, consent, control and exit rights without assuming a board seat, investment or public support.

The Santiago Principles address sovereign wealth funds. A project may support their application but cannot claim universal “Santiago compliance” as a seal of approval.`,
          },
          understandContent: {
            coreTakeaway: 'A credible sovereign-fund dossier combines mandate fit, risk-adjusted economics, governance and regulatory feasibility; it guarantees neither access nor funding.',
            keyPrinciples: [
              'Review intermediaries, beneficial owners, politically exposed persons, remuneration, lobbying, sanctions and AML with qualified advisers',
              'Address investment screening, procurement, competition, tax, accounting and custody early and by jurisdiction'
            ]
          },
          actionTask: {
            instruction: 'Prepare an institutional co-investment dossier:',
            checklistItems: [
              'Document the target investor’s mandate, portfolio fit, governance, exclusions and decision process',
              'Prepare an investment memorandum covering fees, valuation, liquidity, base case and stress cases',
              'Prepare the FDI, procurement, tax, accounting, custody, sanctions, PEP and AML review path'
            ]
          }
        },
        '96.2': {
          stageTitle: '96. Bilateral Projects & PPPs',
          title: 'Public-Private Partnerships & Bilateral Government Projects',
          description: 'Understand how PPP and concession models allocate risk and how availability payments, tariffs, guarantees, procurement and public affordability should be reviewed.',
          learnContent: {
            videoTitle: 'Masterclass: Public-Private Partnerships & Long-Term Concessions',
            summaryText: 'A PPP contractually allocates construction, operating, demand, financing and political risks between public and private parties. BOT structures, payment mechanisms and guarantees are project-specific, often performance-dependent and do not eliminate default, currency, legal or execution risk.',
            bulletPoints: [
              'BOT and BOOT structures: build, own where applicable, operate and transfer, with responsibilities defined across the full lifecycle',
              'Availability payments depend on contractual performance and may be reduced for unavailability or service deficiencies',
              'Public guarantees: review scope, conditions, cap, budget approval, immunity, governing law and enforceability; they do not automatically create AAA risk',
              'Inflation linkage: the index, indexed share, caps, floors, lag and rebasing must be agreed and need not provide full protection'
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'LONG-TERM CONCESSION', description: 'A conditional long-term payment mechanism exposed to construction, performance, legal, credit and termination risk.', highlight: true },
              { iconName: 'shield-check', title: 'PUBLIC GUARANTEE', description: 'A defined risk undertaking that does not remove credit, budget, legal or enforcement risk.' }
            ],
            resources: [
              { title: 'PPP Risk & BOT Concession Guide', subtitle: 'PDF review framework for major infrastructure contracts', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Sovereign Concession Tracker', subtitle: 'Track terms, maintenance, performance metrics, deductions and payment milestones', type: 'tool', iconName: 'calendar', actionUrl: 'crm' }
            ],
            fullArticleGuide: `### The architecture of public-private partnerships

PPPs can support energy, transport and digital infrastructure, but outcomes depend on procurement, risk allocation and execution.

#### BOT lifecycle phases and risks:
- **Preparation and procurement**: Review need, value for money, fiscal affordability, competition and state-aid rules, transparent procurement, land, permits and environmental and social impacts.
- **Construction and financing**: Size debt and equity for the project; stress cost, schedule, interest-rate, currency, refinancing, default and counterparty risks.
- **Operation**: Model payment, demand, performance metrics, deductions, maintenance, tax, insurance and changes in law or tariff regime. Returns are neither fixed nor guaranteed.
- **Termination and force majeure**: Define compensation, step-in rights, political events, expropriation, corruption, sanctions, dispute resolution and sovereign immunity.
- **Transfer**: Plan residual life, condition surveys, reserves, data, staff and handback requirements well before expiry; a seamless transfer is not assured.`,
          },
          understandContent: {
            coreTakeaway: 'A PPP concession is not a bond substitute: payment claims remain dependent on performance, contract, public credit, budgets, law, politics and enforceability.',
            keyPrinciples: [
              'Model availability deductions, failures and correlations conservatively; redundancy can mitigate but never mathematically eliminate risk',
              'Maintain auditable records of maintenance, performance evidence, insurance and handback condition under the contract and applicable standards'
            ]
          },
          actionTask: {
            instruction: 'Evaluate a 20-year BOT concession model:',
            checklistItems: [
              'Prepare base and stress cases for construction, operation, demand, deductions, inflation, rates, currency, tax and refinancing',
              'Obtain expert review of procurement, guarantee scope, termination, compensation, change in law, force majeure, immunity and dispute resolution',
              'Document the SPV, beneficial owners, custody, accounting, AML and sanctions, environmental and social duties and handback'
            ]
          }
        }
      }
    }
  },
  pl: {
    '96': {
      title: '96. Państwowe fundusze majątkowe i alokacja publiczna',
      subtitle: 'Fundusze narodowe, projekty dwustronne, dług publiczny i globalne współinwestycje',
      description: 'Analizuj zróżnicowane mandaty państwowych funduszy majątkowych i przygotowuj potencjalne współinwestycje z uwzględnieniem ładu, zamówień, kontroli inwestycji, sankcji, AML, podatków, rachunkowości i przechowywania aktywów.',
      lessons: {
        '96.1': {
          stageTitle: '96. Architektura i mandaty funduszy państwowych',
          title: 'Państwowe fundusze majątkowe: modele inwestowania i mandaty współinwestycyjne',
          description: 'Poznaj różnice w alokacji aktywów, płynności i zarządzaniu ryzykiem oraz wpływ ładu, ESG, kontroli inwestycji i zgodności na potencjalną współpracę.',
          learnContent: {
            videoTitle: 'Masterclass: alokacja funduszy państwowych i duże transakcje',
            summaryText: 'Państwowe fundusze majątkowe istotnie różnią się mandatem ustawowym, źródłem finansowania, zobowiązaniami, potrzebami płynnościowymi, budżetem ryzyka, horyzontem i ograniczeniami polityki. Współpraca wymaga rzetelnego badania, przejrzystego ładu i indywidualnej analizy regulacyjnej; dostęp, wielkość inwestycji i zwrot nie są zapewnione.',
            bulletPoints: [
              'Rozróżniaj mandaty stabilizacyjne, oszczędnościowe, rezerwowe, emerytalne i rozwojowe zamiast traktować wszystkie fundusze jednakowo',
              'Porównuj inwestycje bezpośrednie, mandaty funduszowe i współinwestycje pod względem kompetencji, opłat, kontroli, koncentracji, płynności i konfliktów',
              'Zasady z Santiago: 24 dobrowolne zasady i praktyki dotyczące ram prawnych, ładu, odpowiedzialności i ostrożnego inwestowania przez fundusze państwowe',
              'Kontrola BIZ zależy od kraju i transakcji; współpraca UE, niemiecka kontrola inwestycji i amerykański CFIUS to odrębne systemy'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'ZGODNOŚĆ Z MANDATEM', description: 'Rozmowa z inwestorem długoterminowym bez obietnicy dostępu, kapitału ani finalizacji.', highlight: true },
              { iconName: 'shield', title: 'ZASADY Z SANTIAGO', description: 'Dobrowolne zasady dla funduszy państwowych, a nie certyfikat projektu lub zgoda inwestycyjna.' }
            ],
            resources: [
              { title: 'Analiza mandatu i ryzyka funduszu państwowego', subtitle: 'PDF o profilach funduszy, ładzie, kryteriach i strukturach mandatów', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Panel inwestorów instytucjonalnych Mara CRM', subtitle: 'Dokumentowanie kontaktów, ścieżek kontroli i zatwierdzeń inwestorów', type: 'tool', iconName: 'briefcase', actionUrl: 'crm' }
            ],
            fullArticleGuide: `### Działanie na rynku funduszy państwowych

Fundusze państwowe mogą inwestować przez pokolenia, lecz ich mandaty i ograniczenia są różne.

#### Obszary analizy potencjalnej alokacji:
1. **Mandat i dopasowanie do portfela**: Zbadaj cele ustawowe, portfel odniesienia, budżet ryzyka, horyzont, płynność, walutę i wyłączenia; nie istnieje uniwersalna minimalna kwota inwestycji.
2. **Ekonomika i ryzyko**: Testuj przepływy, wycenę, opłaty, zadłużenie, koncentrację oraz ryzyko niewykonania, kontrahenta, kraju i wyjścia w warunkach skrajnych.
3. **Ład i uczciwość**: Udokumentuj właścicieli, konflikty, wynagrodzenia, raportowanie, zamówienia oraz kontrole antykorupcyjne, PEP, sankcyjne i AML.
4. **Prawo i operacje**: Zleć ekspertom analizę kontroli inwestycji, konkurencji i pomocy publicznej, podatków, rachunkowości, przechowywania, prywatności i dystrybucji transgranicznej.
5. **Prawa udziałowe**: Negocjuj prawa do informacji, zgody, kontroli i wyjścia bez zakładania miejsca w organie, inwestycji lub wsparcia państwa.

Zasady z Santiago są skierowane do państwowych funduszy majątkowych. Projekt może wspierać ich stosowanie, lecz nie może przedstawiać „zgodności z Santiago” jako powszechnego certyfikatu.`,
          },
          understandContent: {
            coreTakeaway: 'Wiarygodne dossier łączy zgodność z mandatem, ekonomikę skorygowaną o ryzyko, ład i wykonalność regulacyjną; nie gwarantuje dostępu ani finansowania.',
            keyPrinciples: [
              'Z pomocą specjalistów sprawdź pośredników, beneficjentów rzeczywistych, PEP, wynagrodzenia, lobbing, sankcje i AML',
              'Kontrolę inwestycji, zamówienia, konkurencję, podatki, rachunkowość i przechowywanie analizuj wcześnie i osobno dla każdej jurysdykcji'
            ]
          },
          actionTask: {
            instruction: 'Przygotuj dossier współinwestycji instytucjonalnej:',
            checklistItems: [
              'Udokumentuj mandat inwestora, dopasowanie do portfela, ład, wyłączenia i proces decyzyjny',
              'Przygotuj memorandum obejmujące opłaty, wycenę, płynność oraz scenariusz bazowy i skrajne',
              'Przygotuj ścieżkę kontroli BIZ, zamówień, podatków, rachunkowości, przechowywania, sankcji, PEP i AML'
            ]
          }
        },
        '96.2': {
          stageTitle: '96. Projekty dwustronne i PPP',
          title: 'Partnerstwa publiczno-prywatne i dwustronne projekty rządowe',
          description: 'Poznaj podział ryzyka w PPP i koncesjach oraz analizę opłat za dostępność, taryf, gwarancji, zamówień i możliwości finansowych sektora publicznego.',
          learnContent: {
            videoTitle: 'Masterclass: partnerstwa publiczno-prywatne i koncesje długoterminowe',
            summaryText: 'PPP rozdziela umownie ryzyko budowy, eksploatacji, popytu, finansowania i polityki między stronę publiczną i prywatną. Modele BOT, płatności i gwarancje są właściwe dla danego projektu, często zależne od wyników i nie eliminują ryzyka niewykonania, walutowego, prawnego ani wykonawczego.',
            bulletPoints: [
              'Modele BOT i BOOT: budowa, ewentualna własność, eksploatacja i przekazanie z podziałem odpowiedzialności w całym cyklu życia',
              'Opłaty za dostępność zależą od wykonania umowy i mogą być obniżane z powodu niedostępności lub braków jakościowych',
              'Gwarancje publiczne: sprawdź zakres, warunki, limit, zgodę budżetową, immunitet, prawo właściwe i wykonalność; nie tworzą automatycznie ryzyka klasy AAA',
              'Indeksacja inflacyjna: indeks, udział, limity, opóźnienie i zmiana bazy wymagają uzgodnienia i nie muszą zapewniać pełnej ochrony'
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'KONCESJA DŁUGOTERMINOWA', description: 'Warunkowy mechanizm płatności obciążony ryzykiem budowy, wykonania, prawa, kredytu i rozwiązania.', highlight: true },
              { iconName: 'shield-check', title: 'GWARANCJA PUBLICZNA', description: 'Określone przejęcie ryzyka, które nie usuwa ryzyka kredytowego, budżetowego, prawnego ani egzekucyjnego.' }
            ],
            resources: [
              { title: 'Przewodnik po ryzyku PPP i koncesjach BOT', subtitle: 'Ramy analizy dużych kontraktów infrastrukturalnych w PDF', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Rejestr koncesji publicznych GOM-MAR', subtitle: 'Śledzenie okresów, utrzymania, wskaźników, potrąceń i terminów płatności', type: 'tool', iconName: 'calendar', actionUrl: 'crm' }
            ],
            fullArticleGuide: `### Architektura partnerstw publiczno-prywatnych

PPP może wspierać infrastrukturę energetyczną, transportową i cyfrową, ale wynik zależy od zamówienia, podziału ryzyka i wykonania.

#### Etapy i ryzyka cyklu BOT:
- **Przygotowanie i zamówienie**: Zbadaj potrzebę, korzyść publiczną, zdolność budżetową, konkurencję i pomoc publiczną, przejrzyste zamówienie, grunty, pozwolenia oraz skutki środowiskowe i społeczne.
- **Budowa i finansowanie**: Dopasuj dług i kapitał własny do projektu; testuj koszty, terminy, stopy, waluty, refinansowanie, niewykonanie i kontrahentów.
- **Eksploatacja**: Modeluj płatności, popyt, wskaźniki, potrącenia, utrzymanie, podatki, ubezpieczenia oraz zmiany prawa lub taryf. Zwroty nie są stałe ani gwarantowane.
- **Rozwiązanie i siła wyższa**: Określ odszkodowanie, prawa wstąpienia, zdarzenia polityczne, wywłaszczenie, korupcję, sankcje, spory i immunitet państwa.
- **Przekazanie**: Zaplanuj pozostałą żywotność, badanie stanu, rezerwy, dane, personel i wymogi przekazania na długo przed końcem; bezproblemowe przekazanie nie jest pewne.`,
          },
          understandContent: {
            coreTakeaway: 'Koncesja PPP nie zastępuje obligacji: roszczenia płatnicze nadal zależą od wykonania, umowy, wiarygodności i budżetu państwa, prawa, polityki oraz wykonalności.',
            keyPrinciples: [
              'Konserwatywnie modeluj potrącenia za niedostępność, awarie i korelacje; redundancja ogranicza ryzyko, lecz nie może go matematycznie wyeliminować',
              'Prowadź audytowalną dokumentację utrzymania, wykonania, ubezpieczeń i stanu przy przekazaniu zgodnie z umową i właściwymi normami'
            ]
          },
          actionTask: {
            instruction: 'Oceń model 20-letniej koncesji BOT:',
            checklistItems: [
              'Przygotuj scenariusz bazowy i skrajne dla budowy, eksploatacji, popytu, potrąceń, inflacji, stóp, walut, podatków i refinansowania',
              'Zleć analizę zamówienia, zakresu gwarancji, rozwiązania, odszkodowania, zmiany prawa, siły wyższej, immunitetu i sporów',
              'Udokumentuj SPV, beneficjentów, przechowywanie, rachunkowość, AML i sankcje, obowiązki środowiskowe i społeczne oraz przekazanie'
            ]
          }
        }
      }
    }
  }
};

export const localizeAcademyStage96 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['96'];
  if (!patch) return stages;
  return stages.map(stage => stage.id !== 96 ? stage : ({
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

import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: { "85": {
    title: "85. Major Liquidity Transactions: IPOs, SPACs & Private Equity",
    subtitle: "Public offerings, registration statements, investor marketing, LBO structures and secondary liquidity",
    description: "Understand key processes, disclosures and risks in IPOs, de-SPAC transactions and private-equity acquisitions. Securities filings and transactions require qualified legal, financial and audit professionals.",
    lessons: {
      "85.1": {
        stageTitle: "85. IPO Readiness & Registration",
        title: "Preparing for a Public Offering: Registration, Underwriters & Investor Marketing",
        description: "Learn how public offerings differ across jurisdictions and how governance, due diligence, disclosure, pricing and investor marketing fit together.",
        learnContent: {
          videoTitle: "Masterclass: IPO Readiness, Disclosure & Listing Process",
          summaryText: "An IPO is one possible financing and liquidity route, with substantial cost, disclosure obligations and market risk. Understand the roles of the issuer, banks, counsel, auditors, exchange and regulator, plus registration, due diligence, bookbuilding and roadshows.",
          bulletPoints: [
            "Adviser group: issuer, board, underwriters, counsel, auditors and specialists with defined duties, conflicts and fees",
            "US Form S-1: registration statement and prospectus covering business, risks, MD&A, audited financials and offering terms",
            "Bookbuilding: indications of interest inform price and allocation but do not guarantee the highest price or stable trading",
            "Lock-ups: contractual restrictions, often around 180 days, whose scope, exceptions and release rights must be read in the prospectus"
          ],
          coreConcepts: [
            { iconName: "trending-up", title: "BOOKBUILDING", description: "A demand-informed pricing and allocation process subject to conduct rules, judgement and market conditions.", highlight: true },
            { iconName: "lock", title: "CONTRACTUAL LOCK-UP", description: "Duration, holders, exceptions and waiver rights vary; it is not a universal statutory 180-day rule." }
          ],
          resources: [
            { title: "IPO Readiness Roadmap & Disclosure Checklist", subtitle: "PDF workbook for governance, reporting, advisers, risks and transaction planning", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Investor Relations Portal", subtitle: "Manage approved shareholder, reporting and disclosure workflows", type: "tool", iconName: "bar-chart-2", actionUrl: "crm" }
          ],
          fullArticleGuide: `### A controlled public-offering readiness process

Timelines and requirements depend on jurisdiction, exchange, issuer status, financial reporting and regulatory review.

1. **Clarify objectives and alternatives**: Compare IPO, private capital, strategic sale and remaining private.
2. **Select jurisdiction and route**: A US Form S-1 is not the filing for every market; local counsel must identify the regime.
3. **Build governance and controls**: Board oversight, reporting, internal controls, policies and disclosure committees.
4. **Prepare financial information**: Required audited statements, accounting conversion, controls and non-GAAP governance.
5. **Run due diligence**: Business, legal, tax, financial, cyber, privacy and material-contract review.
6. **Draft disclosures**: Balanced business description, material risks, use of proceeds, dilution, ownership and conflicts.
7. **Manage communications**: Follow publicity and securities-law restrictions; train speakers and approve materials.
8. **Price and allocate**: Evaluate demand, dilution, proceeds, investor mix and allocation conduct.
9. **Review lock-ups and stabilisation**: Understand contractual terms, exceptions, waivers and permitted market activities.
10. **Operate as public**: Reporting, controls, investor relations and incident-ready disclosure continue after listing.

SPAC and de-SPAC routes involve distinct sponsor incentives, redemption, dilution and disclosure risks. They are not simply faster or safer IPO substitutes.`
        },
        understandContent: {
          coreTakeaway: "Listed shares can support financing and acquisitions, but remain volatile, dilutive and subject to continuing regulation.",
          keyPrinciples: [
            "Use supportable, balanced disclosures and controlled forward-looking information; no forecast or valuation is guaranteed",
            "Create an experienced cross-functional team and keep responsibility with the issuer and board"
          ]
        },
        actionTask: {
          instruction: "Assess public-offering readiness:",
          checklistItems: [
            "Identify the intended jurisdiction and obtain a requirements gap assessment from qualified advisers",
            "Assess audited reporting, governance, controls, disclosure, cyber and privacy readiness",
            "Model fees, dilution, proceeds, downside scenarios and ongoing public-company costs"
          ]
        }
      },
      "85.2": {
        stageTitle: "85. Private Equity Buyouts & Rollover Equity",
        title: "Private Equity Transactions: LBO Financing, Control & Seller Liquidity",
        description: "Learn how acquisitions may combine equity, debt, governance, management incentives and seller rollover; leverage and proceeds are transaction-specific and never guaranteed.",
        learnContent: {
          videoTitle: "Masterclass: Leveraged Buyouts & Private Equity Transactions",
          summaryText: "A private-equity sale can be an alternative to an IPO but introduces financing, control, liability, tax and execution risks. Review purchase price, financing, rollover equity, warranties, management terms and exit scenarios with independent advisers.",
          bulletPoints: [
            "LBO financing: transaction-specific debt and equity sized against cash flow, security, covenants and market conditions",
            "Rollover equity: possible upside alongside loss, illiquidity, dilution, subordination and limited-control risks",
            "Management incentives: definitions, vesting, leaver terms, dilution, hurdle mechanics and tax treatment",
            "Exit scenarios: strategic sale, secondary buyout, recapitalisation or IPO without a guaranteed date or return"
          ],
          coreConcepts: [
            { iconName: "pie-chart", title: "ROLLOVER EQUITY", description: "Continuing equity can participate in later value but may be diluted or lose some or all value.", highlight: true },
            { iconName: "dollar-sign", title: "NET PROCEEDS", description: "Debt, tax, escrow, adjustments, warranties, fees and closing conditions determine actual liquidity." }
          ],
          resources: [
            { title: "LBO & Rollover Scenario Workbook", subtitle: "PDF model for financing, returns, dilution, covenants and downside cases", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Transaction Pipeline", subtitle: "Manage controlled diligence, bids, approvals and negotiation records", type: "tool", iconName: "briefcase", actionUrl: "crm" }
          ],
          fullArticleGuide: `### Reviewing a private-equity transaction

Debt can amplify equity returns and also default, refinancing and restructuring risk.

1. **Establish objectives**: Liquidity, growth, succession, control and risk tolerance.
2. **Prepare reliable information**: Quality of earnings, working capital, debt, tax, legal, cyber and commercial diligence.
3. **Create valuation ranges**: Use several methods, comparable evidence and sensitivities rather than one fixed EBITDA multiple.
4. **Compare bids on total terms**: Price, certainty, financing, conditions, timing, governance, rollover and liabilities.
5. **Model the capital structure**: Interest, amortisation, covenants, liquidity and downside cash-flow cases.
6. **Analyse rollover documents**: Security class, ranking, dilution, transfer, information, exit and drag/tag rights.
7. **Review seller exposure**: Warranties, indemnities, escrow, earn-out, restrictive covenants and insurance.
8. **Negotiate management terms separately**: Role, removal, incentives, leaver terms and conflicts.
9. **Plan tax and proceeds**: Model entity and personal consequences with qualified advisers.
10. **Prepare for no second exit**: Test delayed, lower-value and restructuring outcomes.

No adviser can promise a multiple, leverage ratio, cash percentage or second payout.`
        },
        understandContent: {
          coreTakeaway: "A PE transaction may create liquidity and growth capacity but changes control, risk and obligations; outcomes remain uncertain.",
          keyPrinciples: [
            "Use independent M&A, legal, tax and financial advisers and preserve decision ownership",
            "Negotiate governance, information, dilution, transfer, leaver, warranty and downside protections explicitly"
          ]
        },
        actionTask: {
          instruction: "Model a PE transaction with rollover equity:",
          checklistItems: [
            "Build a valuation range from multiple methods, evidence and sensitivities",
            "Compare cash, rollover, debt, escrow, tax, fees and downside net proceeds",
            "Review governance, dilution, exit, leaver, warranty and covenant scenarios"
          ]
        }
      }
    }
  } },
  pl: { "85": {
    title: "85. Duże transakcje płynnościowe: IPO, SPAC i private equity",
    subtitle: "Oferty publiczne, dokumenty rejestracyjne, marketing inwestorski, LBO i secondary liquidity",
    description: "Poznaj procesy, ujawnienia i ryzyka IPO, de-SPAC oraz przejęć private equity. Dokumenty i transakcje wymagają kwalifikowanych prawników, doradców finansowych i audytorów.",
    lessons: {
      "85.1": {
        stageTitle: "85. Gotowość do IPO i rejestracja",
        title: "Przygotowanie oferty publicznej: rejestracja, banki i marketing inwestorski",
        description: "Poznaj różnice między jurysdykcjami oraz rolę governance, due diligence, ujawnień, wyceny i roadshow.",
        learnContent: {
          videoTitle: "Masterclass: gotowość do IPO, ujawnienia i listing",
          summaryText: "IPO to jedna z opcji finansowania i płynności, z dużymi kosztami, obowiązkami i ryzykiem rynku. Poznaj role emitenta, banków, prawników, audytorów, giełdy i regulatora.",
          bulletPoints: [
            "Zespół: emitent, rada, underwriters, prawnicy, audytorzy i specjaliści z określonymi obowiązkami, konfliktami i opłatami",
            "US Form S-1: registration statement i prospekt z biznesem, ryzykiem, MD&A, audytowanymi finansami i warunkami",
            "Bookbuilding: popyt wspiera cenę i alokację, ale nie gwarantuje maksimum ani stabilnego kursu",
            "Lock-up: ograniczenia umowne, często około 180 dni; zakres, wyjątki i zwolnienie sprawdza się w prospekcie"
          ],
          coreConcepts: [
            { iconName: "trending-up", title: "BOOKBUILDING", description: "Proces ceny i alokacji oparty na popycie, regułach, ocenie i warunkach rynku.", highlight: true },
            { iconName: "lock", title: "UMOWNY LOCK-UP", description: "Czas, osoby, wyjątki i waiver różnią się; nie istnieje uniwersalny ustawowy termin 180 dni." }
          ],
          resources: [
            { title: "Roadmap gotowości IPO i lista ujawnień", subtitle: "PDF dla governance, raportowania, doradców, ryzyk i planu transakcji", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Investor Relations Portal", subtitle: "Zarządzaj zatwierdzonymi workflow akcjonariuszy, raportów i ujawnień", type: "tool", iconName: "bar-chart-2", actionUrl: "crm" }
          ],
          fullArticleGuide: `### Kontrolowany proces gotowości do oferty

Czas i wymogi zależą od jurysdykcji, giełdy, emitenta, rachunkowości i przeglądu regulatora.

1. **Cele i alternatywy**: Porównaj IPO, kapitał prywatny, sprzedaż strategiczną i pozostanie prywatnym.
2. **Jurysdykcja**: US Form S-1 nie służy każdemu rynkowi; właściwy reżim wskazuje lokalny prawnik.
3. **Governance i kontrole**: Nadzór rady, raportowanie, internal controls, polityki i disclosure committee.
4. **Finanse**: Wymagane audyty, rachunkowość, kontrole i zasady non-GAAP.
5. **Due diligence**: Biznes, prawo, podatki, finanse, cyber, privacy i ważne umowy.
6. **Ujawnienia**: Zrównoważony opis, istotne ryzyka, proceeds, dilution, własność i konflikty.
7. **Komunikacja**: Przestrzegaj ograniczeń publicity i prawa papierów wartościowych.
8. **Cena i alokacja**: Oceniaj popyt, dilution, proceeds, inwestorów i reguły alokacji.
9. **Lock-up i stabilizacja**: Rozumiej warunki, wyjątki, waivers i dozwolone działania.
10. **Po listingu**: Raportowanie, kontrole, IR i ujawnienia incydentów trwają dalej.

SPAC/de-SPAC ma odrębne ryzyka sponsora, redemption, dilution i ujawnień; nie jest po prostu szybszym lub bezpieczniejszym IPO.`
        },
        understandContent: {
          coreTakeaway: "Akcje giełdowe mogą wspierać finansowanie i przejęcia, lecz są zmienne, rozwadniające i regulowane.",
          keyPrinciples: [
            "Stosuj uzasadnione, zrównoważone ujawnienia i kontroluj prognozy; żadna wycena nie jest gwarantowana",
            "Zbuduj doświadczony zespół, pozostawiając odpowiedzialność emitentowi i radzie"
          ]
        },
        actionTask: {
          instruction: "Oceń gotowość do oferty publicznej:",
          checklistItems: [
            "Wskaż jurysdykcję i uzyskaj gap assessment od kwalifikowanych doradców",
            "Oceń audyt, governance, kontrole, ujawnienia, cyber i privacy",
            "Modeluj opłaty, dilution, proceeds, downside i stałe koszty spółki publicznej"
          ]
        }
      },
      "85.2": {
        stageTitle: "85. Wykup private equity i rollover equity",
        title: "Transakcje private equity: finansowanie LBO, kontrola i płynność sprzedającego",
        description: "Poznaj łączenie equity, długu, governance, zachęt i rollover; leverage i proceeds są indywidualne i niegwarantowane.",
        learnContent: {
          videoTitle: "Masterclass: leveraged buyouts i transakcje private equity",
          summaryText: "Sprzedaż do PE może zastąpić IPO, lecz tworzy ryzyko finansowania, kontroli, odpowiedzialności, podatków i wykonania. Z niezależnymi doradcami oceń cenę, finansowanie, rollover, warranties, zarządzanie i exit.",
          bulletPoints: [
            "LBO: indywidualny miks debt/equity zależny od cash flow, zabezpieczeń, covenants i rynku",
            "Rollover equity: możliwy upside oraz ryzyko straty, illiquidity, dilution, subordination i ograniczonej kontroli",
            "Management incentives: definicje, vesting, leaver terms, dilution, hurdle i podatki",
            "Exit: sprzedaż strategiczna, secondary buyout, recapitalisation lub IPO bez gwarancji daty i zwrotu"
          ],
          coreConcepts: [
            { iconName: "pie-chart", title: "ROLLOVER EQUITY", description: "Udział może uczestniczyć w późniejszej wartości, lecz może ulec dilution lub stracić część albo całość wartości.", highlight: true },
            { iconName: "dollar-sign", title: "NET PROCEEDS", description: "Dług, podatki, escrow, korekty, warranties, opłaty i closing określają faktyczną płynność." }
          ],
          resources: [
            { title: "Workbook LBO i scenariuszy rollover", subtitle: "PDF dla finansowania, zwrotów, dilution, covenants i downside", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Transaction Pipeline", subtitle: "Zarządzaj diligence, ofertami, zgodami i negocjacjami", type: "tool", iconName: "briefcase", actionUrl: "crm" }
          ],
          fullArticleGuide: `### Ocena transakcji private equity

Dług może zwiększyć stopę zwrotu oraz ryzyko default, refinancing i restructuring.

1. Ustal cele: płynność, wzrost, sukcesja, kontrola i tolerancja ryzyka.
2. Przygotuj wiarygodne dane: quality of earnings, working capital, debt, tax, legal, cyber i commercial.
3. Zbuduj zakres wyceny z kilku metod i sensitivity.
4. Porównuj oferty według ceny, pewności, finansowania, warunków, governance, rollover i liabilities.
5. Modeluj kapitał: interest, amortisation, covenants, liquidity i downside.
6. Analizuj rollover: klasa, ranking, dilution, transfer, informacja, exit oraz drag/tag.
7. Oceń warranties, indemnities, escrow, earn-out, zakazy i ubezpieczenie.
8. Osobno negocjuj rolę managementu, removal, incentives i leaver terms.
9. Modeluj podatki i net proceeds z doradcami.
10. Przygotuj się na brak drugiego exitu lub niższą wartość.

Nikt nie może obiecać multiple, leverage, procentu gotówki ani drugiej wypłaty.`
        },
        understandContent: {
          coreTakeaway: "PE może dać płynność i wzrost, lecz zmienia kontrolę, ryzyko i obowiązki; wynik pozostaje niepewny.",
          keyPrinciples: [
            "Korzystaj z niezależnych doradców M&A, prawnych, podatkowych i finansowych oraz zachowaj własność decyzji",
            "Wyraźnie negocjuj governance, informację, dilution, transfer, leaver, warranties i downside"
          ]
        },
        actionTask: {
          instruction: "Modeluj transakcję PE z rollover equity:",
          checklistItems: [
            "Zbuduj zakres wyceny z wielu metod, danych i sensitivity",
            "Porównaj cash, rollover, debt, escrow, tax, fees i downside net proceeds",
            "Oceń governance, dilution, exit, leaver, warranties i covenants"
          ]
        }
      }
    }
  } }
};

export const localizeAcademyStage85 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.["85"];
  if (!patch) return stages;
  return stages.map((stage) => {
    if (stage.id !== 85) return stage;
    return {
      ...stage,
      ...patch,
      lessons: stage.lessons.map((lesson) => {
        const lessonPatch = patch.lessons?.[lesson.id];
        if (!lessonPatch) return lesson;
        return { ...lesson, ...lessonPatch, learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent }, understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent }, actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask } };
      }),
    };
  });
};

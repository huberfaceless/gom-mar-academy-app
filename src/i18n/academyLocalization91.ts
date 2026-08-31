import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '91': {
      title: '91. Quantitative Trading, Crypto Arbitrage & Automated Treasury',
      subtitle: 'Hedging, funding, flash loans, market making and controlled treasury risk',
      description: 'Evaluate algorithmic trading, crypto arbitrage, hedging and DeFi for corporate treasury under conservative limits. Address market, basis, funding, liquidation, counterparty, custody, smart-contract, regulatory and tax risks.',
      lessons: {
        '91.1': {
          stageTitle: '91. Delta-Neutral Hedging & Arbitrage',
          title: 'Delta-Neutral Strategies & Crypto Funding Arbitrage',
          description: 'Learn how spot and derivative positions may offset some directional exposure and why funding strategies retain substantial loss risks.',
          learnContent: {
            videoTitle: 'Masterclass: Delta-Neutral Hedging & Algorithmic Arbitrage',
            summaryText: 'Combining a spot position with a short perpetual may reduce immediate delta exposure, but it does not remove risk. Basis moves, changing or negative funding, liquidation, slippage, exchange and counterparty failure, stablecoin risk and custody failures can cause material losses.',
            bulletPoints: [
              'Delta hedging: assess hedge ratio, basis, margin, liquidation distance, rebalancing cost and stress scenarios together',
              'Funding rates are variable, may change sign and do not support a fixed or guaranteed annual return',
              'Arbitrage: model fees, slippage, latency, MEV, liquidity, execution failure and tax or regulatory consequences',
              'Governance: independently review counterparties, custody, smart contracts, accounting, tax, sanctions and anti-money-laundering duties',
            ],
            coreConcepts: [
              { iconName: 'trending-up', title: 'CONDITIONAL DELTA HEDGE', description: 'Lower directional sensitivity with continuing basis, funding, liquidation and counterparty risks.', highlight: true },
              { iconName: 'zap', title: 'VARIABLE FUNDING', description: 'Funding payments can become negative and may be outweighed by fees, basis losses or failure.' },
            ],
            resources: [
              { title: 'Delta-Neutral Treasury Risk Workbook', subtitle: 'PDF scenarios for basis, funding, margin, custody, compliance and exits', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Treasury Risk Dashboard', subtitle: 'Monitor approved exposures, limits, counterparties and review events', type: 'tool', iconName: 'dollar-sign', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### A defensible treasury assessment

Delta-neutral describes sensitivity at a point in time, not a risk-free product. The hedge ratio changes as prices, collateral, contract specifications and market liquidity change.

#### Review process
1. Define the legitimate treasury objective, decision owner and maximum loss.
2. Compare holding cash, insured deposits, money-market instruments and other regulated alternatives.
3. Map spot, derivative, collateral, stablecoin, exchange and custodian exposures.
4. Model basis, funding sign changes, fees, slippage, latency and rebalancing.
5. Stress gaps, outages, depegs, liquidations, withdrawal freezes and insolvency.
6. Verify legal authority, accounting classification, tax treatment and reporting.
7. Screen providers, wallets and flows for sanctions and anti-money-laundering requirements.
8. Separate proposal, approval, execution, custody and reconciliation roles.
9. Set concentration limits, liquidity buffers, kill switches and tested exits.
10. Use independent legal, tax, accounting, security and investment expertise before deployment.

No backtest, funding history or mathematical hedge guarantees capital preservation or return.`,
          },
          understandContent: {
            coreTakeaway: 'Delta neutrality is a monitored risk position, not a risk-free yield or return guarantee.',
            keyPrinciples: ['Approve loss limits, liquidation buffers, counterparties, custody and emergency procedures before allocation', 'Review regulation, accounting, tax, sanctions and AML duties with qualified specialists'],
          },
          actionTask: {
            instruction: 'Prepare an independent risk and feasibility review before deploying capital:',
            checklistItems: ['Document basis, funding, liquidation, slippage and default scenarios', 'Obtain legal, tax, accounting, custody, sanctions and AML review', 'Define approved limits, responsibilities, monitoring and emergency exit'],
          },
        },
        '91.2': {
          stageTitle: '91. Flash Loans & Liquidity Provision',
          title: 'Flash Loans & Automated-Market-Maker Liquidity',
          description: 'Understand how flash loans and concentrated liquidity work and how gas, MEV, execution, smart contracts, price ranges and token risks can create losses.',
          learnContent: {
            videoTitle: 'Masterclass: Flash Loans & Concentrated Liquidity Risk',
            summaryText: 'Flash loans are borrowed and repaid within an atomic transaction; amount, block time and cost are not fixed. Reversion does not remove gas, development, oracle, MEV, smart-contract or execution risk. Concentrated liquidity may increase fee density while amplifying out-of-range exposure and impermanent loss.',
            bulletPoints: [
              'Atomicity: state changes may revert, but gas and development costs are not necessarily recovered',
              'Concentrated liquidity: narrower ranges change capital use, fees, rebalancing needs and the loss profile without a fixed multiplier',
              'Stablecoin pairs may reduce some relative volatility, but depeg, issuer, reserve, liquidity and smart-contract risks remain',
              'MEV protection is incomplete; private submission may reduce some attacks while adding relay and execution dependencies',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'ATOMIC, NOT RISK-FREE', description: 'Atomic execution limits certain state risks but guarantees neither profit nor a cost-free failure.', highlight: true },
              { iconName: 'dollar-sign', title: 'CONCENTRATED EXPOSURE', description: 'Targeted ranges combine fee potential with greater management and loss potential.' },
            ],
            resources: [
              { title: 'Flash-Loan & AMM Risk Review', subtitle: 'PDF framework for code, gas, MEV, ranges, tokens, custody and compliance', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR DeFi Scenario Monitor', subtitle: 'Model approved test scenarios without storing live credentials', type: 'tool', iconName: 'shield', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Evaluate DeFi mechanisms without promising profit

Atomic settlement does not make an economic strategy safe. A reverted transaction may still consume gas, while code, oracle, relay and integration failures can create costs or unintended exposures.

#### Controlled review
1. Document the protocol, chain, contracts, administrators, oracles and upgrade rights.
2. Reproduce the complete transaction path in a forked or isolated test environment.
3. Model gas spikes, slippage, failed bundles, latency, MEV and liquidity changes.
4. Assess audit scope, unresolved findings, dependencies and incident history.
5. Stress stablecoin depegs, token freezes, bridge failures and governance attacks.
6. Model AMM fees against impermanent loss, range exits and rebalancing costs.
7. Protect keys through approved custody, segregation, access control and recovery.
8. Review legal form, regulation, tax, accounting, sanctions and AML obligations.
9. Require independent approval, strict test limits and a documented shutdown path.
10. Never move live treasury funds on the strength of a template or simulation alone.

Private transaction channels, audits and testnets reduce selected risks; none guarantees execution, security or profit.`,
          },
          understandContent: {
            coreTakeaway: 'Flash loans, private transaction paths and AMMs transform risk; they do not eliminate it or guarantee trading profit.',
            keyPrinciples: ['Stress token, depeg, oracle, range, fee, MEV and smart-contract risks together', 'Treat tests and audits as controls, not substitutes for limits, approvals or qualified review'],
          },
          actionTask: {
            instruction: 'Create a documented DeFi risk review without deploying live capital:',
            checklistItems: ['Model gas, slippage, MEV, oracle, smart-contract, depeg and impermanent-loss scenarios', 'Document legal, tax, accounting, custody, sanctions and AML questions', 'Design approval, testing, monitoring, loss-limit and emergency procedures'],
          },
        },
      },
    },
  },
  pl: {
    '91': {
      title: '91. Trading ilościowy, arbitraż krypto i zautomatyzowany treasury',
      subtitle: 'Hedging, funding, flash loans, market making i kontrola ryzyka treasury',
      description: 'Oceniaj trading algorytmiczny, arbitraż krypto, hedging i DeFi dla treasury spółki przy konserwatywnych limitach. Uwzględniaj ryzyko rynku, basis, funding, likwidacji, kontrahenta, custody, smart contract, regulacji i podatków.',
      lessons: {
        '91.1': {
          stageTitle: '91. Hedging delta-neutral i arbitraż',
          title: 'Strategie delta-neutral i arbitraż funding krypto',
          description: 'Poznaj, jak pozycje spot i derywaty mogą ograniczać część ekspozycji kierunkowej oraz jakie istotne ryzyka strat pozostają.',
          learnContent: {
            videoTitle: 'Masterclass: hedging delta-neutral i arbitraż algorytmiczny',
            summaryText: 'Połączenie spot z krótkim perpetual może zmniejszyć bieżącą deltę, ale nie usuwa ryzyka. Zmiana basis, ujemny funding, likwidacja, slippage, awaria giełdy lub kontrahenta, depeg stablecoina i błędy custody mogą powodować znaczne straty.',
            bulletPoints: [
              'Hedging delta: oceniaj hedge ratio, basis, margin, odległość od likwidacji, koszt rebalancingu i stres',
              'Funding jest zmienny, może zmienić znak i nie daje stałej ani gwarantowanej rocznej stopy zwrotu',
              'Arbitraż: modeluj opłaty, slippage, latency, MEV, płynność, błąd wykonania oraz skutki podatkowe i regulacyjne',
              'Governance: niezależnie sprawdź kontrahentów, custody, smart contracts, księgowość, podatki, sankcje i AML',
            ],
            coreConcepts: [
              { iconName: 'trending-up', title: 'WARUNKOWY HEDGE DELTA', description: 'Mniejsza wrażliwość kierunkowa przy dalszym ryzyku basis, funding, likwidacji i kontrahenta.', highlight: true },
              { iconName: 'zap', title: 'ZMIENNY FUNDING', description: 'Płatności mogą być ujemne i zostać przewyższone przez opłaty, straty basis lub awarie.' },
            ],
            resources: [
              { title: 'Workbook ryzyka treasury delta-neutral', subtitle: 'Scenariusze PDF dla basis, funding, margin, custody, compliance i exit', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Treasury Risk Dashboard', subtitle: 'Monitoruj zatwierdzone ekspozycje, limity, kontrahentów i przeglądy', type: 'tool', iconName: 'dollar-sign', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Obronna ocena treasury

Delta-neutral opisuje wrażliwość w określonym momencie, a nie produkt bez ryzyka. Hedge ratio zmienia się wraz z ceną, collateral, specyfikacją kontraktu i płynnością.

#### Proces przeglądu
1. Określ uzasadniony cel treasury, właściciela decyzji i maksymalną stratę.
2. Porównaj gotówkę, ubezpieczone depozyty, money-market i regulowane alternatywy.
3. Zmapuj spot, derivatives, collateral, stablecoin, giełdę i custody.
4. Modeluj basis, zmianę znaku funding, opłaty, slippage, latency i rebalancing.
5. Stresuj gaps, outage, depeg, likwidację, blokadę wypłat i insolvency.
6. Zweryfikuj umocowanie prawne, księgowość, podatki i raportowanie.
7. Sprawdź dostawców, wallets i przepływy pod kątem sankcji i AML.
8. Rozdziel proposal, approval, execution, custody i reconciliation.
9. Ustal limity koncentracji, bufory płynności, kill switch i przetestowane exit.
10. Uzyskaj niezależną poradę prawną, podatkową, księgową, security i inwestycyjną.

Backtest, historia funding ani matematyczny hedge nie gwarantują ochrony kapitału lub zwrotu.`,
          },
          understandContent: {
            coreTakeaway: 'Delta-neutral to monitorowana pozycja ryzyka, nie yield bez ryzyka ani gwarancja zwrotu.',
            keyPrinciples: ['Zatwierdź limity strat, bufory likwidacji, kontrahentów, custody i procedury awaryjne przed alokacją', 'Sprawdź regulacje, księgowość, podatki, sankcje i AML ze specjalistami'],
          },
          actionTask: {
            instruction: 'Przygotuj niezależny przegląd ryzyka i wykonalności przed użyciem kapitału:',
            checklistItems: ['Udokumentuj basis, funding, likwidację, slippage i default', 'Uzyskaj przegląd prawa, podatków, księgowości, custody, sankcji i AML', 'Zdefiniuj limity, role, monitoring i awaryjny exit'],
          },
        },
        '91.2': {
          stageTitle: '91. Flash loans i liquidity provision',
          title: 'Flash loans i płynność automated market maker',
          description: 'Zrozum mechanikę flash loans i concentrated liquidity oraz ryzyko gas, MEV, wykonania, smart contracts, zakresu ceny i tokenów.',
          learnContent: {
            videoTitle: 'Masterclass: ryzyko flash loans i concentrated liquidity',
            summaryText: 'Flash loan jest pobierany i spłacany w atomowej transakcji; kwota, czas bloku i koszt nie są stałe. Revert nie usuwa ryzyka gas, development, oracle, MEV, smart contract ani wykonania. Concentrated liquidity może zwiększyć gęstość opłat, ale też out-of-range exposure i impermanent loss.',
            bulletPoints: [
              'Atomowość: zmiany stanu mogą zostać cofnięte, ale gas i koszty development nie muszą być odzyskane',
              'Concentrated liquidity: węższy zakres zmienia użycie kapitału, opłaty, rebalancing i profil straty bez stałego mnożnika',
              'Pary stablecoin mogą ograniczyć część zmienności, lecz pozostaje depeg, issuer, reserves, liquidity i smart-contract risk',
              'Ochrona MEV jest niepełna; private submission może zmniejszać część ataków i dodawać zależność od relay i execution',
            ],
            coreConcepts: [
              { iconName: 'repeat', title: 'ATOMOWE, NIE BEZ RYZYKA', description: 'Atomowość ogranicza część ryzyka stanu, lecz nie gwarantuje zysku ani bezkosztowej porażki.', highlight: true },
              { iconName: 'dollar-sign', title: 'SKONCENTROWANA EKSPOZYCJA', description: 'Zakres ceny łączy potencjał opłat z większą potrzebą zarządzania i możliwością straty.' },
            ],
            resources: [
              { title: 'Przegląd ryzyka flash loan i AMM', subtitle: 'PDF dla code, gas, MEV, ranges, tokens, custody i compliance', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR DeFi Scenario Monitor', subtitle: 'Modeluj zatwierdzone testy bez przechowywania live credentials', type: 'tool', iconName: 'shield', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Oceniaj DeFi bez obietnic zysku

Atomic settlement nie czyni strategii bezpieczną. Cofnięta transakcja może zużyć gas, a błędy kodu, oracle, relay i integracji powodować koszty lub niezamierzoną ekspozycję.

#### Kontrolowany przegląd
1. Udokumentuj protokół, chain, contracts, administratorów, oracle i prawa upgrade.
2. Odtwórz pełną ścieżkę w forked lub izolowanym środowisku testowym.
3. Modeluj gas spike, slippage, failed bundle, latency, MEV i zmianę liquidity.
4. Oceń zakres audytu, otwarte findings, dependencies i historię incydentów.
5. Stresuj depeg, token freeze, bridge failure i governance attack.
6. Porównaj AMM fees z impermanent loss, range exit i kosztem rebalancingu.
7. Chroń klucze przez zatwierdzone custody, segregation, access i recovery.
8. Sprawdź prawo, regulacje, podatki, księgowość, sankcje i AML.
9. Wymagaj niezależnej zgody, ścisłych limitów testu i shutdown path.
10. Nie przenoś live treasury funds na podstawie template lub symulacji.

Private transaction channel, audit i testnet ograniczają wybrane ryzyka; nie gwarantują wykonania, bezpieczeństwa ani zysku.`,
          },
          understandContent: {
            coreTakeaway: 'Flash loans, private transaction paths i AMM zmieniają ryzyko; nie usuwają go ani nie gwarantują zysku.',
            keyPrinciples: ['Stresuj wspólnie token, depeg, oracle, range, fees, MEV i smart-contract risk', 'Traktuj testy i audyty jako kontrole, nie zamiennik limitów, zgód lub fachowego przeglądu'],
          },
          actionTask: {
            instruction: 'Utwórz udokumentowany przegląd ryzyka DeFi bez użycia live capital:',
            checklistItems: ['Modeluj gas, slippage, MEV, oracle, smart contract, depeg i impermanent loss', 'Udokumentuj pytania prawa, podatków, księgowości, custody, sankcji i AML', 'Zaprojektuj approval, testing, monitoring, limit straty i emergency procedure'],
          },
        },
      },
    },
  },
};

export const localizeAcademyStage91 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['91'];
  if (!patch) return stages;
  return stages.map((stage) => stage.id !== 91 ? stage : ({
    ...stage,
    ...patch,
    lessons: stage.lessons.map((lesson) => {
      const lessonPatch = patch.lessons?.[lesson.id];
      return !lessonPatch ? lesson : ({
        ...lesson,
        ...lessonPatch,
        learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent },
        understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent },
        actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask },
      });
    }),
  }));
};

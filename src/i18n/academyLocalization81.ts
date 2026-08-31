import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: { "81": {
  "title": "81. Programmatic Advertising & Private Marketplace (PMP) Deals",
  "subtitle": "DSPs, SSPs, real-time bidding, first-party data, clean rooms and direct deals",
  "description": "Learn how programmatic buying works across DSPs, SSPs, private marketplaces and direct deals. Evaluate inventory quality, privacy, measurement, fraud risk and commercial terms before spending.",
  "lessons": {
    "81.1": {
      "stageTitle": "81. DSPs, SSPs & Real-Time Bidding",
      "title": "Programmatic Bidding: Demand-Side Platforms, Supply-Side Platforms & OpenRTB",
      "description": "Understand real-time bidding, DSP campaign setup and inventory buying across websites, streaming services and apps.",
      "learnContent": {
        "videoTitle": "Masterclass: Programmatic Advertising & DSP Campaign Management",
        "summaryText": "Programmatic platforms can expand media buying beyond individual ad networks, but access, minimum spend, inventory and service models vary. Learn how auctions, targeting, measurement and quality controls fit together—and why independent validation remains necessary.",
        "bulletPoints": [
          "The ecosystem: DSPs for buyers, SSPs for publishers, ad exchanges, ad servers and verification providers",
          "OpenRTB: bid requests, identifiers, auction logic and delivery within fractions of a second",
          "Targeting: context, geography, device, time and consented first-party segments under careful data governance",
          "Quality controls: invalid-traffic detection, allowlists, blocklists, viewability, brand suitability and reconciliation"
        ],
        "coreConcepts": [
          {
            "iconName": "cpu",
            "title": "DEMAND-SIDE PLATFORM",
            "description": "A platform for planning, bidding, activation and measurement across participating inventory sources.",
            "highlight": true
          },
          {
            "iconName": "shield-check",
            "title": "INVALID-TRAFFIC MITIGATION",
            "description": "Layered controls can reduce bot and fraud exposure, but no tool guarantees complete elimination."
          }
        ],
        "resources": [
          {
            "title": "Programmatic Media Buying Guide",
            "subtitle": "PDF guide to auctions, campaign setup, measurement and quality controls",
            "type": "pdf",
            "iconName": "file-text",
            "actionUrl": "tools"
          },
          {
            "title": "Mara CRM Audience Planning Hub",
            "subtitle": "Prepare consented first-party audience definitions and activation records",
            "type": "tool",
            "iconName": "share-2",
            "actionUrl": "marketing"
          }
        ],
        "fullArticleGuide": "### Entering the programmatic media market\n\nProgrammatic buying can broaden inventory access, but it does not remove commercial, privacy or measurement risk.\n\n#### A defensible workflow\n1. **Define the objective**: Select reach, qualified traffic, leads or sales and set decision thresholds.\n2. **Confirm access and economics**: Verify eligibility, minimum spend, platform, agency and data fees.\n3. **Map the supply path**: Identify exchanges, resellers and publisher relationships; prefer transparent routes.\n4. **Govern data**: Document consent, lawful basis, retention, vendor roles and regional restrictions.\n5. **Set quality controls**: Use exclusions, brand-suitability settings, allowlists, blocklists and proportionate verification.\n6. **Control frequency**: Set caps and review actual cross-device exposure without assuming perfect identity matching.\n7. **Validate measurement**: Define attribution, deduplication and incrementality tests; reported conversions are not automatically causal.\n8. **Reconcile delivery**: Compare invoices, logs, viewability, invalid traffic and business outcomes before scaling.\n\nPricing, identifiers, privacy rules and platform features change. Verify current terms and obtain specialist advice where needed."
      },
      "understandContent": {
        "coreTakeaway": "Programmatic buying scales responsibly only when inventory, data permissions, measurement and fraud controls are monitored.",
        "keyPrinciples": [
          "Use brand-suitability controls and review placements; automated filters reduce risk but cannot guarantee safe adjacency",
          "Update supply-path, publisher and app lists using transparent delivery and business outcomes"
        ]
      },
      "actionTask": {
        "instruction": "Prepare a controlled programmatic pilot:",
        "checklistItems": [
          "Document objective, budget, audience basis, consent requirements and success thresholds",
          "Create an initial inventory allowlist and exclusion list with review ownership",
          "Set frequency, viewability, invalid-traffic and attribution reporting requirements"
        ]
      }
    },
    "81.2": {
      "stageTitle": "81. PMP Deals & Data Clean Rooms",
      "title": "Private Marketplace Deals, Programmatic Guaranteed & Data Clean Rooms",
      "description": "Learn how private deals are negotiated and how privacy-enhancing data collaboration is assessed without assuming anonymity or automatic legal compliance.",
      "learnContent": {
        "videoTitle": "Masterclass: PMP Deals & Privacy-Aware Data Collaboration",
        "summaryText": "Premium inventory may be offered through private auctions, preferred deals or programmatic guaranteed arrangements. Deal IDs carry agreed parameters into a DSP, but delivery and quality still require monitoring. Data clean rooms can limit raw-data exposure; they do not by themselves make every use lawful, anonymous or risk-free.",
        "bulletPoints": [
          "Deal structures: private auctions, preferred deals and programmatic guaranteed, with different price and volume commitments",
          "Deal-ID activation: verify buyer seat, inventory, format, price, dates, targeting and troubleshooting ownership",
          "Data clean rooms: controlled matching and aggregate analysis with access, query, output, retention and re-identification safeguards",
          "Post-cookie planning: contextual targeting, consented first-party data and identity products that require current legal and technical review"
        ],
        "coreConcepts": [
          {
            "iconName": "lock",
            "title": "PRIVATE MARKETPLACE",
            "description": "Controlled access to selected inventory under negotiated auction or direct terms.",
            "highlight": true
          },
          {
            "iconName": "shield",
            "title": "DATA CLEAN ROOM CONTROLS",
            "description": "Technical and contractual controls can reduce exposure but do not replace privacy governance."
          }
        ],
        "resources": [
          {
            "title": "PMP Deal Review Guide & Deal Brief",
            "subtitle": "PDF checklist for inventory, pricing, delivery, data and measurement terms",
            "type": "pdf",
            "iconName": "file-text",
            "actionUrl": "tools"
          },
          {
            "title": "GOM-MAR Privacy-Safe Audience Workspace",
            "subtitle": "Document audience inputs, permissions, matching rules and aggregate outputs",
            "type": "tool",
            "iconName": "settings",
            "actionUrl": "settings"
          }
        ],
        "fullArticleGuide": "### Structuring a private marketplace deal\n\nA private deal combines negotiated access with programmatic execution. It is a media contract and technical configuration—not a performance guarantee.\n\n#### A controlled PMP process\n1. **Select publishers**: Compare audience fit, inventory transparency, brand suitability and outcomes.\n2. **Write the brief**: Specify formats, devices, geography, dates, price, volume, viewability, invalid traffic and reporting.\n3. **Choose the type**: Distinguish private auction, preferred deal and programmatic guaranteed commitments.\n4. **Verify the Deal ID**: Test buyer seat, DSP, SSP, targeting, creative approval, bid response and delivery.\n5. **Run a proportionate pilot**: Base budget on campaign economics; a fixed €2,000 test is not suitable for every case.\n6. **Review data governance**: Define roles, lawful basis, consent where required, permitted queries, output thresholds, retention and deletion.\n7. **Measure carefully**: Agree viewability definitions and context-specific targets; universal thresholds are not automatically optimal.\n8. **Reconcile and decide**: Compare contracted and delivered inventory, fees, quality, reach and incremental results.\n\nIdentity technologies and platform policies evolve. Never call an identifier future-proof; verify availability, interoperability and regional compliance."
      },
      "understandContent": {
        "coreTakeaway": "PMPs can improve inventory control and clean rooms can reduce exposure; neither replaces contract, privacy and outcome review.",
        "keyPrinciples": [
          "Use a pilot budget matched to campaign economics and negotiate exit, underdelivery and make-good terms before volume commitments",
          "Treat viewability, invalid traffic, audience matching and privacy as measurable obligations rather than vendor assurances"
        ]
      },
      "actionTask": {
        "instruction": "Prepare your first private-deal brief:",
        "checklistItems": [
          "Shortlist five publishers or inventory partners and document selection criteria",
          "Draft terms for format, price, volume, quality, reporting, data use and cancellation",
          "Complete privacy and technical review before activating any identity or clean-room workflow"
        ]
      }
    }
  }
} },
  pl: { "81": {
  "title": "81. Reklama programatyczna i umowy Private Marketplace (PMP)",
  "subtitle": "DSP, SSP, aukcje w czasie rzeczywistym, dane first-party, clean roomy i umowy bezpośrednie",
  "description": "Poznaj zakup mediów programatycznych przez DSP, SSP, private marketplace i direct deals. Przed wydatkiem oceń jakość inventory, prywatność, pomiar, ryzyko fraudu i warunki handlowe.",
  "lessons": {
    "81.1": {
      "stageTitle": "81. DSP, SSP i Real-Time Bidding",
      "title": "Programmatic bidding: DSP, SSP i OpenRTB",
      "description": "Zrozum aukcje w czasie rzeczywistym, strukturę kampanii DSP oraz zakup inventory na stronach, w streamingu i aplikacjach.",
      "learnContent": {
        "videoTitle": "Masterclass: reklama programatyczna i prowadzenie kampanii DSP",
        "summaryText": "Platformy programatyczne poszerzają zakup mediów poza pojedyncze sieci reklamowe, lecz dostęp, minimalny budżet, inventory i obsługa różnią się. Poznaj aukcje, targetowanie, pomiar i kontrolę jakości oraz potrzebę niezależnej weryfikacji.",
        "bulletPoints": [
          "Ekosystem: DSP dla kupujących, SSP dla wydawców, ad exchanges, ad serwery i dostawcy weryfikacji",
          "Proces OpenRTB: bid request, identyfikatory, logika aukcji i emisja w ułamku sekundy",
          "Targetowanie: kontekst, geografia, urządzenie, czas i segmenty first-party używane za zgodą i pod kontrolą",
          "Kontrola jakości: invalid traffic, allowlisty, blocklisty, viewability, brand suitability i rozliczenie kampanii"
        ],
        "coreConcepts": [
          {
            "iconName": "cpu",
            "title": "DEMAND-SIDE PLATFORM",
            "description": "Platforma do planowania, licytacji, aktywacji i pomiaru inventory z wielu źródeł.",
            "highlight": true
          },
          {
            "iconName": "shield-check",
            "title": "OGRANICZANIE INVALID TRAFFIC",
            "description": "Warstwowe zabezpieczenia zmniejszają ekspozycję na boty i fraud, lecz nie gwarantują pełnej eliminacji."
          }
        ],
        "resources": [
          {
            "title": "Przewodnik po programmatic media buying",
            "subtitle": "PDF o aukcjach, konfiguracji, pomiarze i kontroli jakości",
            "type": "pdf",
            "iconName": "file-text",
            "actionUrl": "tools"
          },
          {
            "title": "Mara CRM Audience Planning Hub",
            "subtitle": "Przygotuj definicje grup first-party i dokumentację aktywacji",
            "type": "tool",
            "iconName": "share-2",
            "actionUrl": "marketing"
          }
        ],
        "fullArticleGuide": "### Wejście na rynek programmatic\n\nProgrammatic daje szerszy dostęp do inventory i precyzyjne sterowanie, ale nie usuwa ryzyka handlowego, prywatności ani pomiaru.\n\n#### Odpowiedzialny workflow kampanii\n1. **Określ cel**: Wybierz zasięg, wartościowy ruch, leady lub sprzedaż i ustal regułę decyzji.\n2. **Sprawdź dostęp i koszty**: Zweryfikuj kwalifikację, minimum spend, opłaty seat/agency, dane i wsparcie.\n3. **Mapuj supply path**: Ustal exchanges, resellerów i relacje wydawców; preferuj przejrzyste ścieżki.\n4. **Zarządzaj danymi**: Udokumentuj zgodę, podstawę prawną, retencję, role dostawców i ograniczenia regionalne.\n5. **Ustaw jakość**: Stosuj wykluczenia kontekstowe, brand suitability, allowlisty, blocklisty i proporcjonalną weryfikację.\n6. **Kontroluj częstotliwość**: Ustaw limity, potem sprawdzaj realną ekspozycję cross-device bez zakładania idealnego dopasowania.\n7. **Waliduj pomiar**: Zdefiniuj atrybucję, deduplikację i testy incrementality; raportowane konwersje nie muszą być przyczynowe.\n8. **Rozlicz emisję**: Porównaj faktury, logi, viewability, invalid traffic i wyniki biznesowe przed skalowaniem.\n\nCeny, identyfikatory, przepisy i funkcje platform zmieniają się. Sprawdzaj aktualne warunki i w razie potrzeby korzystaj z porady prawnej."
      },
      "understandContent": {
        "coreTakeaway": "Programmatic skaluje się odpowiedzialnie, gdy inventory, uprawnienia do danych, pomiar i fraud są niezależnie monitorowane.",
        "keyPrinciples": [
          "Stosuj brand suitability i kontroluj placements; filtry zmniejszają ryzyko, lecz nie gwarantują bezpiecznego sąsiedztwa",
          "Aktualizuj supply path, listy wydawców i aplikacji według przejrzystości emisji oraz wyników biznesowych"
        ]
      },
      "actionTask": {
        "instruction": "Przygotuj kontrolowany pilotaż programmatic:",
        "checklistItems": [
          "Udokumentuj cel, budżet, podstawę grupy, wymogi zgody i progi sukcesu",
          "Utwórz początkową allowlistę i listę wykluczeń z właścicielem procesu przeglądu",
          "Ustal wymogi raportowania frequency, viewability, invalid traffic i atrybucji"
        ]
      }
    },
    "81.2": {
      "stageTitle": "81. Umowy PMP i Data Clean Rooms",
      "title": "Private Marketplace, Programmatic Guaranteed i Data Clean Rooms",
      "description": "Poznaj negocjowanie private deals i ocenę bezpieczniejszej współpracy na danych bez zakładania anonimowości lub automatycznej zgodności prawnej.",
      "learnContent": {
        "videoTitle": "Masterclass: PMP i współpraca na danych z ochroną prywatności",
        "summaryText": "Premium inventory może trafiać do private auctions, preferred deals lub programmatic guaranteed. Deal ID przenosi uzgodnione parametry do DSP, ale emisja i jakość nadal wymagają kontroli. Clean room ogranicza ujawnienie surowych danych, lecz sam nie czyni każdego użycia legalnym, anonimowym ani pozbawionym ryzyka.",
        "bulletPoints": [
          "Struktury: private auction, preferred deal i programmatic guaranteed z różnymi cenami i zobowiązaniami wolumenowymi",
          "Aktywacja Deal ID: sprawdź buyer seat, inventory, format, cenę, daty, targetowanie i odpowiedzialność za troubleshooting",
          "Data clean rooms: kontrolowane dopasowanie i analiza agregatów z limitami dostępu, zapytań, wyników, retencji i reidentyfikacji",
          "Plan post-cookie: kontekst, dane first-party za zgodą i produkty identity wymagające oceny dostępności oraz prawa"
        ],
        "coreConcepts": [
          {
            "iconName": "lock",
            "title": "PRIVATE MARKETPLACE",
            "description": "Kontrolowany dostęp do wybranego inventory na uzgodnionych warunkach aukcji lub direct.",
            "highlight": true
          },
          {
            "iconName": "shield",
            "title": "KONTROLE DATA CLEAN ROOM",
            "description": "Kontrole techniczne i umowne ograniczają ekspozycję danych, lecz nie zastępują privacy governance."
          }
        ],
        "resources": [
          {
            "title": "Przewodnik przeglądu PMP i szablon briefu",
            "subtitle": "PDF dla inventory, ceny, emisji, danych i pomiaru",
            "type": "pdf",
            "iconName": "file-text",
            "actionUrl": "tools"
          },
          {
            "title": "GOM-MAR Privacy-Safe Audience Workspace",
            "subtitle": "Dokumentuj dane wejściowe, uprawnienia, reguły dopasowania i agregaty",
            "type": "tool",
            "iconName": "settings",
            "actionUrl": "settings"
          }
        ],
        "fullArticleGuide": "### Struktura umowy private marketplace\n\nPrivate deal łączy negocjowany dostęp z wykonaniem programatycznym. To umowa mediowa i konfiguracja techniczna, nie gwarancja wyniku.\n\n#### Kontrolowany proces PMP\n1. **Wybierz wydawców**: Oceń dopasowanie odbiorców, przejrzystość inventory, brand suitability i wcześniejsze wyniki.\n2. **Napisz brief**: Określ format, urządzenia, geografię, termin, cenę, wolumen, viewability, invalid traffic i raporty.\n3. **Wybierz typ**: Rozróżnij private auction, preferred deal i programmatic guaranteed przed przyjęciem minimum.\n4. **Zweryfikuj Deal ID**: Testuj seat, DSP, SSP, targeting, akceptację kreacji, bid response i emisję.\n5. **Uruchom proporcjonalny pilot**: Dopasuj budżet do ekonomiki; stałe 2 000 EUR nie pasuje każdemu reklamodawcy.\n6. **Sprawdź governance danych**: Ustal role, podstawę prawną, zgodę, dozwolone zapytania, progi wyników, retencję i usunięcie.\n7. **Mierz ostrożnie**: Uzgodnij definicję viewability i cele zależne od formatu; uniwersalny próg nie jest automatycznie optymalny.\n8. **Rozlicz i zdecyduj**: Porównaj umowę z emisją, opłatami, jakością, zasięgiem i incremental results.\n\nTechnologie identity oraz zasady przeglądarek i platform ewoluują. Nie nazywaj identyfikatora future-proof; sprawdzaj dostępność, interoperacyjność i zgodność regionalną."
      },
      "understandContent": {
        "coreTakeaway": "PMP może zwiększyć kontrolę inventory, a clean room ograniczyć ekspozycję; żadne nie zastępuje umowy, privacy review i walidacji wyników.",
        "keyPrinciples": [
          "Dobierz budżet pilota do ekonomiki i uzgodnij exit, underdelivery oraz make-good przed zobowiązaniem wolumenowym",
          "Traktuj viewability, invalid traffic, matching i prywatność jako mierzalne obowiązki, nie zapewnienia dostawcy"
        ]
      },
      "actionTask": {
        "instruction": "Przygotuj brief pierwszego private deal:",
        "checklistItems": [
          "Wybierz pięciu wydawców lub partnerów inventory i udokumentuj kryteria",
          "Zapisz warunki formatu, ceny, wolumenu, jakości, raportów, danych i anulowania",
          "Wykonaj privacy i technical review przed aktywacją identity lub clean-room workflow"
        ]
      }
    }
  }
} },
};

export const localizeAcademyStage81 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.["81"];
  if (!patch) return stages;
  return stages.map((stage) => {
    if (stage.id !== 81) return stage;
    return {
      ...stage,
      ...patch,
      lessons: stage.lessons.map((lesson) => {
        const lessonPatch = patch.lessons?.[lesson.id];
        if (!lessonPatch) return lesson;
        return {
          ...lesson,
          ...lessonPatch,
          learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent },
          understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent },
          actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask },
        };
      }),
    };
  });
};

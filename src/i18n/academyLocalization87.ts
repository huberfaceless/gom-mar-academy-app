import { Stage } from '../types';
import { LanguageCode } from './translations';
type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
 en: { "87": {
  title:"87. Cross-Border E-Commerce, Customs & IOSS", subtitle:"EU IOSS, customs classification, US sales-tax nexus, landed cost and returns", description:"Plan cross-border trade using current tax, customs, product, carrier and returns requirements. Validate each route and jurisdiction with qualified advisers.",
  lessons:{
   "87.1":{stageTitle:"87. EU IOSS & Customs",title:"EU Import Architecture: IOSS, Classification & Delivery Terms",description:"Understand how IOSS simplifies VAT for eligible distance sales up to €150, classify goods responsibly and disclose current duties, fees and responsibilities.",
    learnContent:{videoTitle:"Masterclass: EU IOSS, Customs & Landed Cost",summaryText:"IOSS simplifies collection and reporting of VAT for eligible imported B2C consignments up to €150; it does not eliminate customs declarations, controls or every charge. Since 1 July 2026, the EU applies a temporary €3 customs duty per item to low-value consignments up to €150.",
     bulletPoints:["IOSS: monthly return through the Member State of identification for eligible consignments, with secure electronic transmission of the identifier","Delivery terms: compare DDP, DAP and DPU by importer role, registrations, control, cost and route","Classification: determine HS/CN/TARIC codes using product facts and binding guidance where risk justifies it","Origin: preferential rates apply only when rules of origin and valid proof are satisfied"],
     coreConcepts:[{iconName:"globe",title:"IOSS SCOPE",description:"A VAT simplification for eligible distance sales; it is not a customs-duty exemption or universal import solution.",highlight:true},{iconName:"truck",title:"LANDED COST",description:"Show taxes, duties, temporary fees, freight and service charges with assumptions and adjustment rules."}],
     resources:[{title:"EU IOSS & Customs Working Guide",subtitle:"PDF checklist for scope, classification, origin, declarations and delivery terms",type:"pdf",iconName:"file-text",actionUrl:"tools"},{title:"Mara CRM Cross-Border Tax Workspace",subtitle:"Maintain versioned tax, customs and landed-cost rules",type:"tool",iconName:"dollar-sign",actionUrl:"settings"}],
     fullArticleGuide:`### Controlled EU low-value imports

1. Identify seller, marketplace, importer, declarant and carrier roles.
2. Confirm IOSS eligibility: imported B2C distance sale, intrinsic value not exceeding €150 and no excluded excise goods.
3. Apply destination VAT at checkout and report through the correct IOSS arrangement.
4. Transmit the IOSS number securely in the electronic customs declaration; do not print it openly on the parcel or invoice.
5. Include the temporary €3-per-item customs duty effective from 1 July 2026 and monitor later rule changes.
6. Classify each product from composition, function, origin and current tariff data.
7. Claim preferences only with valid origin evidence.
8. Choose delivery terms only after confirming legal capacity to act as importer and meet registrations.
9. Reconcile checkout estimates with carrier and customs outcomes.
10. Retain evidence, correct errors and obtain customs or tax advice for uncertain cases.`},
    understandContent:{coreTakeaway:"Transparent landed costs can reduce surprises, but return-rate improvement must be measured rather than promised.",keyPrinciples:["Never understate value, origin, quantity or classification","Transmit IOSS credentials only through approved electronic channels and restrict access"]},
    actionTask:{instruction:"Prepare one EU shipping lane:",checklistItems:["Document IOSS eligibility, roles, VAT, €3 item duty and customs-data flow","Validate classification and origin evidence for core products","Test checkout, carrier declaration, delivery charges and reconciliation"]}
   },
   "87.2":{stageTitle:"87. US Sales Tax & Returns",title:"US Economic Nexus & Local Returns Operations",description:"Monitor state-specific nexus, registration and marketplace rules and design local returns without assuming one national threshold.",
    learnContent:{videoTitle:"Masterclass: US Sales Tax & International Returns",summaryText:"Wayfair allows states to impose duties on remote sellers, but thresholds, periods, included sales, transaction counts, registrations and marketplace rules differ and change. Automation supports calculations; it does not replace legal and tax review.",
     bulletPoints:["Nexus: evaluate physical presence plus each state's current economic threshold, measurement period and included sales","Registration and collection: follow state timing rather than assuming tax starts only after year end","Marketplace facilitators: determine what the marketplace collects and what seller reporting remains","Returns and drawback: local processing can reduce logistics cost; customs refunds require qualifying facts and evidence"],
     coreConcepts:[{iconName:"file-text",title:"STATE-BY-STATE NEXUS",description:"Versioned monitoring should flag exposure; professionals confirm registration, taxability and filing duties.",highlight:true},{iconName:"repeat",title:"LOCAL RETURNS",description:"Compare inspection, restocking, resale, recycling, fraud, tax and inventory consequences."}],
     resources:[{title:"US Remote-Seller Nexus Review",subtitle:"PDF state-by-state evidence and registration checklist",type:"pdf",iconName:"file-text",actionUrl:"tools"},{title:"GOM-MAR Global Returns Portal",subtitle:"Manage approved return routes, labels and dispositions",type:"tool",iconName:"truck",actionUrl:"settings"}],
     fullArticleGuide:`### A controlled US sales-tax workflow

1. Map sales channels, inventory, employees, contractors and other physical nexus.
2. Track each state's current economic-nexus rule, lookback period and sales definition.
3. Separate marketplace and direct sales according to state rules.
4. Review product and customer taxability and exemption certificates.
5. Register at the required time before collecting where applicable.
6. Configure jurisdictions and effective dates, then test sample addresses.
7. Reconcile platform, tax engine, returns and ledger data.
8. File returns and maintain notices, registrations and evidence.
9. Review fulfilment decisions for added physical nexus and income/franchise-tax implications.
10. Treat duty drawback as a specialised customs claim, not an automatic refund.

Threshold summaries become stale. Verify official state guidance and qualified advice before acting.`},
    understandContent:{coreTakeaway:"Automation can support US sales-tax compliance but does not make expansion risk-free.",keyPrinciples:["Do not rely on a universal $100,000-or-200-transaction rule","Assess registrations, marketplace rules, product taxability and fulfilment nexus before launch"]},
    actionTask:{instruction:"Prepare US compliance and returns monitoring:",checklistItems:["Create versioned state nexus and marketplace evidence","Validate registration, collection, filing and exemption workflows with a specialist","Model local returns and fulfilment including tax, customs, fraud and inventory effects"]}
   }
  }
 } },
 pl: { "87": {
  title:"87. Transgraniczny e-commerce, cło i IOSS",subtitle:"EU IOSS, klasyfikacja, US sales-tax nexus, landed cost i zwroty",description:"Planuj handel według aktualnych wymogów podatkowych, celnych, produktowych, przewoźnika i zwrotów. Każdą trasę weryfikuj ze specjalistą.",
  lessons:{
   "87.1":{stageTitle:"87. EU IOSS i cło",title:"Import do UE: IOSS, klasyfikacja i warunki dostawy",description:"Poznaj IOSS dla kwalifikowanych sprzedaży do 150 EUR, poprawną klasyfikację oraz aktualne cła, opłaty i role.",
    learnContent:{videoTitle:"Masterclass: EU IOSS, cło i landed cost",summaryText:"IOSS upraszcza VAT dla kwalifikowanych przesyłek B2C do 150 EUR, lecz nie usuwa deklaracji, kontroli ani wszystkich opłat. Od 1 lipca 2026 UE stosuje czasowe cło 3 EUR za artykuł w przesyłkach do 150 EUR.",
     bulletPoints:["IOSS: miesięczna deklaracja przez państwo identyfikacji i bezpieczne elektroniczne przekazanie numeru","DDP, DAP, DPU: porównaj importer role, rejestracje, kontrolę, koszt i trasę","Klasyfikacja: ustal HS/CN/TARIC z faktów o produkcie i wiążących informacji, gdy ryzyko tego wymaga","Pochodzenie: preferencja tylko po spełnieniu reguł i z ważnym dowodem"],
     coreConcepts:[{iconName:"globe",title:"ZAKRES IOSS",description:"Uproszczenie VAT, nie zwolnienie celne ani uniwersalne rozwiązanie importowe.",highlight:true},{iconName:"truck",title:"LANDED COST",description:"Pokaż podatki, cła, opłaty czasowe, fracht i koszty wraz z założeniami."}],
     resources:[{title:"Przewodnik roboczy IOSS i cła",subtitle:"PDF dla zakresu, klasyfikacji, pochodzenia, deklaracji i dostawy",type:"pdf",iconName:"file-text",actionUrl:"tools"},{title:"Mara CRM Cross-Border Tax Workspace",subtitle:"Zarządzaj wersjami reguł podatku, cła i landed cost",type:"tool",iconName:"dollar-sign",actionUrl:"settings"}],
     fullArticleGuide:`### Kontrolowany import niskiej wartości
1. Ustal role sprzedawcy, marketplace, importera, deklaranta i przewoźnika.
2. Potwierdź IOSS: B2C distance sale, intrinsic value do 150 EUR i brak wyłączonych wyrobów akcyzowych.
3. Pobierz VAT kraju przeznaczenia i zgłoś go prawidłowo.
4. Przekaż numer IOSS bezpiecznie elektronicznie; nie drukuj go jawnie.
5. Uwzględnij czasowe 3 EUR za artykuł od 1 lipca 2026.
6. Klasyfikuj z composition, function, origin i aktualnej taryfy.
7. Stosuj preferencję tylko z dowodem pochodzenia.
8. Wybierz Incoterm po sprawdzeniu importer role i rejestracji.
9. Uzgadniaj estimate z wynikiem przewoźnika i cła.
10. Zachowuj dowody i korzystaj z porady przy niepewności.`},
    understandContent:{coreTakeaway:"Przejrzyste koszty mogą ograniczać niespodzianki, lecz efekt na zwroty trzeba mierzyć.",keyPrinciples:["Nie zaniżaj wartości, pochodzenia, ilości ani klasyfikacji","Numer IOSS przekazuj wyłącznie zatwierdzonym kanałem i ogranicz dostęp"]},
    actionTask:{instruction:"Przygotuj jedną trasę do UE:",checklistItems:["Udokumentuj IOSS, role, VAT, opłatę 3 EUR i przepływ danych","Zweryfikuj klasyfikację oraz pochodzenie","Testuj checkout, deklarację, opłaty przy dostawie i reconciliation"]}
   },
   "87.2":{stageTitle:"87. US Sales Tax i zwroty",title:"US Economic Nexus i lokalna obsługa zwrotów",description:"Monitoruj stanowe nexus, rejestracje i marketplace rules bez zakładania jednego progu krajowego.",
    learnContent:{videoTitle:"Masterclass: US Sales Tax i zwroty międzynarodowe",summaryText:"Wayfair pozwala stanom nakładać obowiązki na remote sellers, lecz progi, okresy, rodzaje sprzedaży, rejestracje i marketplace rules różnią się. Automatyzacja nie zastępuje tax review.",
     bulletPoints:["Nexus: oceń physical presence i aktualny próg, okres oraz rodzaj sprzedaży każdego stanu","Registration i collection: stosuj timing stanu, nie zakładaj poboru dopiero po końcu roku","Marketplace facilitator: ustal pobór platformy i pozostałe raportowanie sprzedawcy","Returns i drawback: lokalna obsługa może obniżyć koszt; zwrot cła wymaga kwalifikacji i dowodów"],
     coreConcepts:[{iconName:"file-text",title:"NEXUS STANOWY",description:"Monitoring sygnalizuje ekspozycję; specjalista potwierdza rejestrację, taxability i filing.",highlight:true},{iconName:"repeat",title:"LOKALNE ZWROTY",description:"Porównaj inspection, restocking, resale, recycling, fraud, tax i inventory."}],
     resources:[{title:"Przegląd US Remote-Seller Nexus",subtitle:"PDF z dowodami i checklistą rejestracji stanowej",type:"pdf",iconName:"file-text",actionUrl:"tools"},{title:"GOM-MAR Global Returns Portal",subtitle:"Zarządzaj trasami, etykietami i disposition zwrotów",type:"tool",iconName:"truck",actionUrl:"settings"}],
     fullArticleGuide:`### Kontrolowany workflow US sales tax
1. Mapuj kanały, inventory, employees, contractors i physical nexus.
2. Śledź aktualny próg, lookback i definicję sales każdego stanu.
3. Oddziel marketplace i direct sales.
4. Oceń taxability produktów i klientów oraz certificates.
5. Rejestruj się we właściwym terminie przed poborem.
6. Konfiguruj jurisdictions i effective dates oraz testuj adresy.
7. Uzgadniaj dane platformy, tax engine, zwrotów i księgi.
8. Składaj returns i zachowuj notices oraz evidence.
9. Oceń fulfillment pod kątem physical nexus i innych podatków.
10. Duty drawback traktuj jako specjalistyczny claim, nie automatyczny refund.

Zestawienia progów szybko się starzeją; przed działaniem sprawdź oficjalne źródła.`},
    understandContent:{coreTakeaway:"Automatyzacja wspiera compliance, ale nie czyni ekspansji bezpieczną od ryzyka.",keyPrinciples:["Nie polegaj na uniwersalnym progu 100 000 USD lub 200 transakcji","Przed startem oceń registrations, marketplace, taxability i fulfilment nexus"]},
    actionTask:{instruction:"Przygotuj monitoring USA:",checklistItems:["Utwórz wersjonowane evidence nexus i marketplace","Zweryfikuj registration, collection, filing i exemptions","Modeluj lokalne returns i fulfilment wraz z tax, customs, fraud i inventory"]}
   }
  }
 } }
};
export const localizeAcademyStage87=(stages:Stage[],language:LanguageCode):Stage[]=>{const patch=translations[language]?.["87"];if(!patch)return stages;return stages.map(stage=>stage.id!==87?stage:({...stage,...patch,lessons:stage.lessons.map(lesson=>{const p=patch.lessons?.[lesson.id];return !p?lesson:({...lesson,...p,learnContent:{...lesson.learnContent,...p.learnContent},understandContent:{...lesson.understandContent,...p.understandContent},actionTask:{...lesson.actionTask,...p.actionTask}})})}))};

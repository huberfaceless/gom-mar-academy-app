import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '99': {
      title: '99. The Next Frontier: Responsible Growth & Academy Completion',
      subtitle: 'Durable value, competition, responsibility, completion records and next steps',
      description: 'Complete the GOM-MAR Academy with an honest review: summarise insights, evidence, unresolved risks and your next responsible learning and implementation plan.',
      lessons: {
        '99.1': {
          stageTitle: '99. Durable Value & Responsibility',
          title: 'From Product to Resilient Company: Scaling Without Monopoly Promises',
          description: 'Understand how technology, network effects, economies of scale and brand may create advantages and why competition, regulation, dependencies, renewal and social responsibility continue.',
          learnContent: {
            videoTitle: 'Masterclass: The Architecture of a Resilient, Responsible Company',
            summaryText: 'A durable company solves relevant problems, earns trust and renews its capabilities. Network effects, standards, scale and switching costs may create advantages but guarantee neither leadership nor valuation, returns or survival and may increase competition, consumer and regulatory risks.',
            bulletPoints: [
              'Sources of advantage: assess technology, network effects, scale, brand, processes and customer value alongside cost, imitability and decay',
              'Flywheels are hypotheses: more usage may improve data and products but may also increase costs, privacy, security, moderation and concentration risks',
              'Critical dependencies: systemic importance increases responsibility, oversight, resilience, supply-chain and contingency duties rather than invulnerability',
              'Capital allocation: weigh reinvestment, distributions, reserves, research, workforce, security and social effects against explicit criteria'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'DURABLE VALUE', description: 'Customer value and capabilities reviewed repeatedly against competition, change and harm.', highlight: true },
              { iconName: 'zap', title: 'RESPONSIBLE FLYWHEEL', description: 'A measurable growth hypothesis with boundaries, counter-indicators and stop criteria.' }
            ],
            resources: [
              { title: 'Responsible Growth & Capital Allocation Guide', subtitle: 'PDF completion workbook for strategy, risk, governance and impact', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Academy Review Cockpit (Stages 1–99)', subtitle: 'Document learning progress, evidence, open questions and future reviews', type: 'tool', iconName: 'layers', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Completion as a starting point

Completing 99 stages is a learning milestone, not proof of practical mastery of every subject.

#### The responsible completion review:
1. **Learning outcomes**: Record what you can explain, apply or cannot yet assess. Separate course completion from professional experience, licensing and demonstrated competence.
2. **Evidence and assumptions**: Link each important proposition to dated data, tests and sources. Mark uncertainty, contrary evidence and issues requiring qualified advice.
3. **Risks and boundaries**: Summarise financial, legal, tax, accounting, privacy, cyber, employment, environmental, sanctions, AML, custody and reputation risks.
4. **Strategy and governance**: Define customer value, fair competition, accountability, conflicts, complaints, contingency plans and stop criteria.
5. **The next 90 days**: Select small, reversible experiments with limits on budget, time and loss instead of a fixed billion-euro or monopoly target.
6. **Long-term responsibility**: Plan health, relationships, employee welfare, succession, resilience and social impact alongside growth.

No course guarantees revenue, funding, market leadership or business success. Regulated activities and material decisions require the relevant qualified professionals and approvals.`,
          },
          understandContent: {
            coreTakeaway: 'Durable value combines customer benefit, economic viability, fair competition, verifiable governance and responsibility to affected people.',
            keyPrinciples: [
              'Never treat growth, market position or social importance as an entitlement or guarantee',
              'Measure, disclose and correct effects on workers, customers, partners, the environment and future generations'
            ]
          },
          actionTask: {
            instruction: 'Complete a responsible graduation and implementation plan:',
            checklistItems: [
              'Summarise learning outcomes, evidence, assumptions, open questions and required professional advice',
              'Plan 90-day experiments with owners, budget limits, metrics and stop criteria',
              'Review long-term strategy for governance, resilience, succession and stakeholder effects'
            ]
          }
        },
        '99.2': {
          stageTitle: '99. Completion Record & Next Learning Cycle',
          title: 'Completing the GOM-MAR Academy: Record Achievement Honestly and Keep Learning',
          description: 'Recognise your learning progress, check the actual completion criteria and describe any credential without rank, success, accreditation or access promises.',
          learnContent: {
            videoTitle: 'Completion: Review, Learning Record & Responsible Next Step',
            summaryText: 'Completion records the Academy requirements actually fulfilled. It is not a state-recognised diploma, professional licence, guarantee of competence, income or success, or automatic membership. What matters is what you can evidence that you understood, implemented and continued to improve responsibly.',
            bulletPoints: [
              'Completion record: state the issuer, criteria, date, scope and verification route clearly and promise only features that actually exist',
              'Privacy: make any publication, profile, badge or on-chain record voluntary, data-minimised, secure and supported by understandable consequences',
              'Mentoring and sharing: state your limits, cite sources, do not imply regulated advice and provide a route for feedback',
              'Next learning cycle: deepen knowledge through small tests, real evidence, reflection, updates and qualified supervision where appropriate'
            ],
            coreConcepts: [
              { iconName: 'award', title: 'COMPLETION RECORD', description: 'Evidence of defined Academy requirements, not external accreditation or professional licensing.', highlight: true },
              { iconName: 'users', title: 'CONTINUOUS LEARNING', description: 'Voluntary exchange only under the access, privacy and community terms that actually apply.' }
            ],
            resources: [
              { title: 'GOM-MAR Academy Completion Record', subtitle: 'PDF template with criteria, scope, date and accurate context', type: 'pdf', iconName: 'award', actionUrl: 'tools' },
              { title: 'GOM-MAR Learning Progress & Review Dashboard', subtitle: 'Manage available progress, evidence and future reviews under current product terms', type: 'tool', iconName: 'star', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Congratulations on the learning milestone

Completion deserves recognition. It does not mean flawless mastery of every business discipline.

#### A responsible completion:
- **Check the criteria**: Issue or share a record only where the defined requirements and a reliable verification process actually exist.
- **Explain its meaning**: State the course, scope, issuer and date without implying state recognition, professional authority, market rank or practical mastery.
- **Protect privacy**: Keep learning progress private by default. Public profiles, leaderboards, wallets or permanent registers require voluntary, informed consent and data minimisation.
- **Describe access accurately**: Present community, tool or alumni access only under the currently published terms, duration, pricing and technical availability.
- **Keep learning**: Update sources and assumptions, measure results, record errors and involve qualified professionals in regulated or material decisions.

*Celebrate the progress—and take the next step with curiosity, evidence and responsibility.*`,
          },
          understandContent: {
            coreTakeaway: 'Completion marks a learning milestone, not the end of learning or a guarantee of readiness for every market challenge.',
            keyPrinciples: [
              'Describe learning status, credentials, access and outcomes truthfully and verifiably',
              'Stay curious, correct errors and use knowledge to create demonstrable value without avoidable harm'
            ]
          },
          actionTask: {
            instruction: 'Document completion and plan the next learning cycle:',
            checklistItems: [
              'Check fulfilled criteria, open tasks and the actual scope of any completion record',
              'Make a privacy and consent decision for each optional public profile or badge',
              'Plan the next 90-day learning cycle with a practical project, review date and update sources'
            ]
          }
        }
      }
    }
  },
  pl: {
    '99': {
      title: '99. Kolejna granica: odpowiedzialny wzrost i ukończenie Akademii',
      subtitle: 'Trwała wartość, konkurencja, odpowiedzialność, potwierdzenie ukończenia i dalsze kroki',
      description: 'Zakończ Akademię GOM-MAR uczciwym podsumowaniem: zbierz wnioski, dowody, nierozwiązane ryzyka oraz kolejny odpowiedzialny plan nauki i wdrożenia.',
      lessons: {
        '99.1': {
          stageTitle: '99. Trwała wartość i odpowiedzialność',
          title: 'Od produktu do odpornej firmy: skalowanie bez obietnicy monopolu',
          description: 'Poznaj możliwe przewagi z technologii, efektów sieciowych, skali i marki oraz trwałe znaczenie konkurencji, regulacji, zależności, odnowy i odpowiedzialności społecznej.',
          learnContent: {
            videoTitle: 'Masterclass: architektura odpornej i odpowiedzialnej firmy',
            summaryText: 'Trwała firma rozwiązuje istotne problemy, zdobywa zaufanie i odnawia swoje zdolności. Efekty sieciowe, standardy, skala i koszty zmiany mogą tworzyć przewagi, ale nie gwarantują przywództwa, wyceny, zwrotu ani przetrwania i mogą zwiększać ryzyko konkurencji, konsumentów oraz regulacji.',
            bulletPoints: [
              'Źródła przewagi: oceniaj technologię, efekty sieciowe, skalę, markę, procesy i wartość dla klienta wraz z kosztem, możliwością skopiowania i utratą znaczenia',
              'Koła zamachowe są hipotezami: większe użycie może poprawiać dane i produkt, lecz może też zwiększać koszty oraz ryzyko prywatności, bezpieczeństwa, moderacji i koncentracji',
              'Krytyczne zależności: znaczenie systemowe zwiększa odpowiedzialność, nadzór oraz wymogi odporności, łańcucha dostaw i planów awaryjnych zamiast zapewniać nietykalność',
              'Alokacja kapitału: porównuj reinwestycje, wypłaty, rezerwy, badania, pracowników, bezpieczeństwo i skutki społeczne według jawnych kryteriów'
            ],
            coreConcepts: [
              { iconName: 'globe', title: 'TRWAŁA WARTOŚĆ', description: 'Wartość dla klienta i zdolności regularnie oceniane wobec konkurencji, zmian i możliwych szkód.', highlight: true },
              { iconName: 'zap', title: 'ODPOWIEDZIALNE KOŁO ZAMACHOWE', description: 'Mierzalna hipoteza wzrostu z granicami, wskaźnikami przeciwnymi i kryteriami zatrzymania.' }
            ],
            resources: [
              { title: 'Przewodnik odpowiedzialnego wzrostu i alokacji kapitału', subtitle: 'Końcowy skoroszyt PDF dla strategii, ryzyka, ładu i wpływu', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Panel przeglądu Akademii Mara CRM (etapy 1–99)', subtitle: 'Dokumentowanie postępu, dowodów, otwartych pytań i kolejnych przeglądów', type: 'tool', iconName: 'layers', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Ukończenie jako punkt wyjścia

Przejście 99 etapów jest kamieniem milowym nauki, a nie dowodem praktycznego opanowania każdego tematu.

#### Odpowiedzialny przegląd końcowy:
1. **Efekty nauki**: Zapisz, co potrafisz wyjaśnić, zastosować lub czego nie umiesz jeszcze ocenić. Oddziel ukończenie kursu od doświadczenia, uprawnień i wykazanych kompetencji.
2. **Dowody i założenia**: Połącz każdą ważną tezę z datowanymi danymi, testami i źródłami. Zaznacz niepewność, dowody przeciwne i kwestie wymagające porady specjalisty.
3. **Ryzyka i granice**: Podsumuj ryzyko finansowe, prawne, podatkowe, księgowe, prywatności, cybernetyczne, pracownicze, środowiskowe, sankcji, AML, przechowywania i reputacji.
4. **Strategia i ład**: Określ wartość dla klienta, uczciwą konkurencję, odpowiedzialność, konflikty, skargi, plany awaryjne i kryteria zatrzymania.
5. **Kolejne 90 dni**: Wybierz małe, odwracalne eksperymenty z limitami budżetu, czasu i straty zamiast stałego celu miliarda lub monopolu.
6. **Długoterminowa odpowiedzialność**: Planuj zdrowie, relacje, dobro pracowników, sukcesję, odporność i wpływ społeczny wraz ze wzrostem.

Żaden kurs nie gwarantuje przychodu, finansowania, przywództwa rynkowego ani sukcesu firmy. Działalność regulowana i istotne decyzje wymagają właściwych specjalistów i zezwoleń.`,
          },
          understandContent: {
            coreTakeaway: 'Trwała wartość łączy korzyść dla klienta, wykonalność ekonomiczną, uczciwą konkurencję, weryfikowalny ład i odpowiedzialność wobec osób dotkniętych działaniem firmy.',
            keyPrinciples: [
              'Nigdy nie traktuj wzrostu, pozycji rynkowej ani znaczenia społecznego jako prawa lub gwarancji',
              'Mierz, ujawniaj i koryguj wpływ na pracowników, klientów, partnerów, środowisko i przyszłe pokolenia'
            ]
          },
          actionTask: {
            instruction: 'Uzupełnij odpowiedzialny plan ukończenia i wdrożenia:',
            checklistItems: [
              'Podsumuj efekty nauki, dowody, założenia, otwarte pytania i potrzebne porady specjalistów',
              'Zaplanuj eksperymenty na 90 dni z właścicielami, limitami budżetu, miernikami i kryteriami zatrzymania',
              'Oceń strategię długoterminową pod kątem ładu, odporności, sukcesji i wpływu na interesariuszy'
            ]
          }
        },
        '99.2': {
          stageTitle: '99. Potwierdzenie ukończenia i kolejny cykl nauki',
          title: 'Ukończenie Akademii GOM-MAR: uczciwie dokumentuj osiągnięcie i ucz się dalej',
          description: 'Doceń postęp, sprawdź rzeczywiste kryteria ukończenia i opisuj poświadczenie bez obietnic rangi, sukcesu, akredytacji lub dostępu.',
          learnContent: {
            videoTitle: 'Ukończenie: przegląd, zapis nauki i odpowiedzialny kolejny krok',
            summaryText: 'Ukończenie dokumentuje wymagania Akademii, które faktycznie spełniono. Nie jest dyplomem uznanym przez państwo, licencją zawodową, gwarancją kompetencji, dochodu lub sukcesu ani automatycznym członkostwem. Liczy się to, czego zrozumienie, wdrożenie i dalsze odpowiedzialne doskonalenie można wykazać.',
            bulletPoints: [
              'Potwierdzenie ukończenia: jasno podaj wystawcę, kryteria, datę, zakres i sposób weryfikacji oraz obiecuj wyłącznie funkcje, które rzeczywiście istnieją',
              'Prywatność: publikacja, profil, odznaka lub zapis w łańcuchu mają być dobrowolne, oszczędne w danych, bezpieczne i poprzedzone zrozumiałym wyjaśnieniem skutków',
              'Mentoring i dzielenie się: określ swoje granice, podawaj źródła, nie sugeruj regulowanego doradztwa i umożliwiaj informację zwrotną',
              'Kolejny cykl nauki: pogłębiaj wiedzę małymi testami, rzeczywistymi dowodami, refleksją, aktualizacją i właściwym nadzorem specjalistów'
            ],
            coreConcepts: [
              { iconName: 'award', title: 'POTWIERDZENIE UKOŃCZENIA', description: 'Dowód spełnienia określonych wymagań Akademii, a nie zewnętrzna akredytacja lub licencja zawodowa.', highlight: true },
              { iconName: 'users', title: 'CIĄGŁA NAUKA', description: 'Dobrowolna wymiana wyłącznie zgodnie z rzeczywistymi zasadami dostępu, prywatności i społeczności.' }
            ],
            resources: [
              { title: 'Potwierdzenie ukończenia Akademii GOM-MAR', subtitle: 'Szablon PDF z kryteriami, zakresem, datą i rzetelnym opisem', type: 'pdf', iconName: 'award', actionUrl: 'tools' },
              { title: 'Panel postępu i przeglądu nauki GOM-MAR', subtitle: 'Zarządzanie dostępnym postępem, dowodami i przeglądami według aktualnych warunków produktu', type: 'tool', iconName: 'star', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Gratulacje z okazji osiągnięcia edukacyjnego

Ukończenie zasługuje na uznanie. Nie oznacza bezbłędnego opanowania wszystkich dziedzin biznesu.

#### Odpowiedzialne ukończenie:
- **Sprawdź kryteria**: Wystawiaj lub udostępniaj potwierdzenie tylko wtedy, gdy określone wymagania i wiarygodna weryfikacja naprawdę istnieją.
- **Wyjaśnij znaczenie**: Podaj kurs, zakres, wystawcę i datę bez sugerowania uznania państwowego, uprawnień zawodowych, rangi rynkowej lub praktycznego mistrzostwa.
- **Chroń prywatność**: Domyślnie zachowaj postęp jako prywatny. Profile publiczne, rankingi, portfele lub trwałe rejestry wymagają dobrowolnej, świadomej zgody i minimalizacji danych.
- **Dokładnie opisuj dostęp**: Przedstawiaj dostęp do społeczności, narzędzi lub grupy absolwentów wyłącznie zgodnie z aktualnymi warunkami, czasem trwania, ceną i dostępnością techniczną.
- **Ucz się dalej**: Aktualizuj źródła i założenia, mierz wyniki, zapisuj błędy i angażuj specjalistów w sprawach regulowanych lub istotnych.

*Świętuj postęp i zrób kolejny krok z ciekawością, dowodami oraz odpowiedzialnością.*`,
          },
          understandContent: {
            coreTakeaway: 'Ukończenie oznacza etap nauki, a nie jej koniec ani gwarancję gotowości na każde wyzwanie rynkowe.',
            keyPrinciples: [
              'Opisuj stan wiedzy, poświadczenia, dostęp i wyniki prawdziwie oraz weryfikowalnie',
              'Zachowuj ciekawość, poprawiaj błędy i używaj wiedzy do tworzenia możliwej do wykazania wartości bez szkód, których można uniknąć'
            ]
          },
          actionTask: {
            instruction: 'Udokumentuj ukończenie i zaplanuj kolejny cykl nauki:',
            checklistItems: [
              'Sprawdź spełnione kryteria, otwarte zadania i rzeczywisty zakres potwierdzenia ukończenia',
              'Podejmij decyzję o prywatności i zgodzie dla każdego opcjonalnego profilu publicznego lub odznaki',
              'Zaplanuj kolejny 90-dniowy cykl z projektem praktycznym, terminem przeglądu i źródłami aktualizacji'
            ]
          }
        }
      }
    }
  }
};

export const localizeAcademyStage99 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['99'];
  if (!patch) return stages;
  return stages.map(stage => stage.id !== 99 ? stage : ({
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

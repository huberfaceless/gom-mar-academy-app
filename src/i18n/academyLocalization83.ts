import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: { "83": {
    title: "83. Vertical B2B Publishing & Independent Media Brands",
    subtitle: "Trade portals, industry awards, print magazines, lead programs and sponsorship packages",
    description: "Build a credible digital trade publication and transparent industry awards. Develop suitable sponsorship packages without guaranteeing market leadership, audience size or revenue.",
    lessons: {
      "83.1": {
        stageTitle: "83. Trade-Publication Architecture & Sponsorship",
        title: "The Vertical Media Brand: From Service Provider to Trusted Industry Voice",
        description: "Learn how to build a digital trade portal, curate expert content and price sponsorship packages based on verified audience, deliverables and commercial value.",
        learnContent: {
          videoTitle: "Masterclass: Vertical B2B Publishing & Responsible Media Positioning",
          summaryText: "A well-run trade publication can support visibility, trust and new partnerships. Learn how to establish an editorially independent industry portal and offer sponsorship transparently, measurably and in compliance with applicable rules.",
          bulletPoints: [
            "Media and service businesses: separate editorial decisions from the commercial interests of your main company",
            "Guest contributions: agree rights, compensation, disclosure, editing and withdrawal terms in writing",
            "Sponsorship catalogue: labelled native articles, newsletter placements, podcast sponsorship and permission-based lead programs",
            "Paywall or sponsored access: test revenue models against audience needs, costs, data and editorial independence"
          ],
          coreConcepts: [
            { iconName: "globe", title: "MEDIA CREDIBILITY", description: "A trade publication can shape useful debate when sources, corrections and conflicts of interest are handled transparently.", highlight: true },
            { iconName: "dollar-sign", title: "SPONSORSHIP GOVERNANCE", description: "Recurring sponsorship requires defined deliverables, substantiated audience data, clear labelling and outcome reporting." }
          ],
          resources: [
            { title: "B2B Media Kit & Sponsorship Catalogue", subtitle: "PDF template for packages, pricing, verified audience data and disclosure rules", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Media Publishing Portal", subtitle: "Manage contributors, editorial workflows, rights and sponsorship agreements", type: "tool", iconName: "file-text", actionUrl: "content" }
          ],
          fullArticleGuide: `### Building a trustworthy vertical media publication

A specialist publication can become a useful industry hub when its reporting is accurate, its commercial model is visible and its editorial decisions remain independent.

#### Eight foundations
1. **Audience and purpose**: Define who the publication serves and what evidence-based value it provides.
2. **Editorial charter**: Publish standards for sourcing, fact-checking, corrections, conflicts and complaints.
3. **Contributor agreements**: Document rights, licences, compensation, disclosure and AI-use rules.
4. **Commercial separation**: Label advertising and sponsored content clearly; sponsors do not buy editorial outcomes.
5. **Privacy-aware audience building**: Obtain required consent and minimise personal data in newsletters and lead programs.
6. **Verified media kit**: Distinguish audited results, platform analytics and forecasts; never present projections as achieved reach.
7. **Fair contracts**: Specify inventory, timing, price, taxes, cancellation, make-goods, reporting and brand-safety limits.
8. **Pilot and review**: Test packages, measure delivery and renew only where both parties receive documented value.

Legal, advertising, tax, privacy and press requirements vary by market. Obtain specialist advice where appropriate.`
        },
        understandContent: {
          coreTakeaway: "A credible trade publication can concentrate attention, but it neither owns nor controls the market.",
          keyPrinciples: [
            "Keep editorial content, advertising and sponsored contributions clearly separated and labelled",
            "Agree scope, duration, payment, cancellation, refunds, data use and reporting in proportion to the risk"
          ]
        },
        actionTask: {
          instruction: "Prepare the media kit for your trade portal:",
          checklistItems: [
            "Define the audience using verified data and label forecasts explicitly",
            "Price three sponsorship packages with deliverables, exclusions and measurement rules",
            "Document contributor, disclosure, correction, privacy and complaint policies"
          ]
        }
      },
      "83.2": {
        stageTitle: "83. Industry Awards & Gala Events",
        title: "The Industry Award: Building a Credible Competition and Gala",
        description: "Learn how to establish an award with transparent criteria, an independent jury, fair entry terms and a financially responsible event plan.",
        learnContent: {
          videoTitle: "Masterclass: Credible Industry Awards, Judging & Event Economics",
          summaryText: "A serious industry award can highlight achievements and convene specialists. Learn how to design transparent criteria, recruit an independent jury, charge fair fees and plan a financially sustainable gala without implying that payment buys recognition.",
          bulletPoints: [
            "Award categories: specific eligibility, evidence and scoring rules for innovation, employment or sustainability claims",
            "Independent jury: written roles, consent, expertise, conflicts, recusals, confidentiality and compensation",
            "Entry fees: cost-based, disclosed before entry and explicitly independent from nomination or winning",
            "Gala and sponsorship: transparent packages, realistic capacity, accessibility, cancellation and contingency planning"
          ],
          coreConcepts: [
            { iconName: "award", title: "AWARD INTEGRITY", description: "Recognition is credible only when eligibility, evidence, scoring, conflicts and results are documented.", highlight: true },
            { iconName: "users", title: "FAIR JUDGING", description: "Independent reviewers follow a consistent rubric and recuse themselves where conflicts arise." }
          ],
          resources: [
            { title: "Industry Award Guide & Entry Rules", subtitle: "PDF template for eligibility, scoring, conflicts, appeals and gala planning", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Award Submission Portal", subtitle: "Manage consented entries, evidence, jury scoring and gala tickets", type: "tool", iconName: "award", actionUrl: "crm" }
          ],
          fullArticleGuide: `### Designing a defensible industry award

An award earns trust gradually. Prestige must follow a fair process; it cannot be manufactured through entry fees, sponsorship or promotional claims.

#### A controlled award cycle
1. **Governance**: Establish an organiser, decision rights, finances and separation between sponsors and judging.
2. **Rules**: Publish eligibility, categories, evidence, scoring, timelines, fees, withdrawal, privacy and licence terms.
3. **Jury**: Verify expertise and consent; record conflicts, recusals, confidentiality and compensation.
4. **Submissions**: Collect only necessary data, secure sensitive evidence and provide confirmations and deadlines.
5. **Assessment**: Use a consistent rubric, moderation and audit trail; define tie and disqualification rules.
6. **Challenges**: Provide a limited correction or appeal route without promising that every decision is legally unchallengeable.
7. **Communications**: Substantiate claims, obtain permissions and never imply that entry or sponsorship increases the chance of winning.
8. **Event delivery**: Budget conservatively and plan accessibility, safety, supplier, cancellation and refund contingencies.
9. **Marks and seals**: License award badges with category, year, scope, expiry and misuse rules.
10. **Post-event review**: Publish methodology and appropriate results, retain data only as necessary and document improvements.`
        },
        understandContent: {
          coreTakeaway: "Credibility comes from transparent criteria and independent evaluation—not from claiming a position above competitors.",
          keyPrinciples: [
            "Document judging, privacy, conflicts, complaints and appeals; no process should be described as unchallengeable",
            "License winner seals with clear year, category, permitted claims, duration and enforcement rules"
          ]
        },
        actionTask: {
          instruction: "Plan the foundations of your industry award:",
          checklistItems: [
            "Define three to five categories with eligibility, evidence and scoring criteria",
            "Prepare a diverse jury shortlist and conflict-of-interest process",
            "Build a conservative entry, ticket, sponsorship, accessibility and contingency budget"
          ]
        }
      }
    }
  } },
  pl: { "83": {
    title: "83. Wertykalne wydawnictwo B2B i niezależne marki medialne",
    subtitle: "Portale branżowe, nagrody, magazyny drukowane, programy leadowe i sponsoring",
    description: "Zbuduj wiarygodne cyfrowe medium branżowe i przejrzysty konkurs. Opracuj sponsoring bez gwarantowania pozycji lidera, zasięgu ani przychodów.",
    lessons: {
      "83.1": {
        stageTitle: "83. Architektura portalu branżowego i sponsoring",
        title: "Wertykalna marka medialna: od usługodawcy do wiarygodnego głosu branży",
        description: "Poznaj budowę portalu, kurację treści eksperckich i wycenę sponsoringu na podstawie zweryfikowanego audytorium, świadczeń i wartości.",
        learnContent: {
          videoTitle: "Masterclass: wertykalne wydawnictwo B2B i odpowiedzialne pozycjonowanie",
          summaryText: "Dobrze prowadzone medium branżowe może wspierać widoczność, zaufanie i partnerstwa. Naucz się tworzyć niezależny redakcyjnie portal oraz oferować sponsoring przejrzyście, mierzalnie i zgodnie z prawem.",
          bulletPoints: [
            "Media i usługi: oddziel decyzje redakcyjne od interesów handlowych głównej firmy",
            "Treści gościnne: pisemnie uzgodnij prawa, wynagrodzenie, oznaczenia, redakcję i wycofanie",
            "Katalog sponsoringu: oznaczone artykuły native, newsletter, podcast i leady oparte na zgodzie",
            "Paywall lub dostęp sponsorowany: testuj modele względem potrzeb odbiorców, kosztów, danych i niezależności"
          ],
          coreConcepts: [
            { iconName: "globe", title: "WIARYGODNOŚĆ MEDIÓW", description: "Medium może kształtować debatę, gdy przejrzyście zarządza źródłami, korektami i konfliktami.", highlight: true },
            { iconName: "dollar-sign", title: "ZASADY SPONSORINGU", description: "Sponsoring wymaga zakresu świadczeń, potwierdzonych danych, oznaczeń i raportowania." }
          ],
          resources: [
            { title: "Media kit B2B i katalog sponsoringu", subtitle: "Szablon PDF pakietów, cen, zweryfikowanych danych i zasad oznaczania", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Media Publishing Portal", subtitle: "Zarządzaj autorami, redakcją, prawami i umowami sponsorskimi", type: "tool", iconName: "file-text", actionUrl: "content" }
          ],
          fullArticleGuide: `### Budowa wiarygodnego medium wertykalnego

Specjalistyczne medium może stać się użytecznym punktem branży, gdy informacje są rzetelne, model komercyjny widoczny, a decyzje redakcyjne niezależne.

#### Osiem fundamentów
1. **Odbiorcy i cel**: Określ, komu służy portal i jaką opartą na dowodach wartość dostarcza.
2. **Karta redakcyjna**: Opublikuj zasady źródeł, fact-checkingu, korekt, konfliktów i skarg.
3. **Umowy z autorami**: Ustal prawa, licencje, wynagrodzenie, ujawnienia i użycie AI.
4. **Rozdział komercyjny**: Wyraźnie oznacz reklamy i sponsoring; sponsor nie kupuje wyniku redakcyjnego.
5. **Prywatność**: Zbieraj wymagane zgody i minimalizuj dane w newsletterze oraz leadach.
6. **Zweryfikowany media kit**: Oddziel wyniki, analitykę i prognozy; prognoz nie przedstawiaj jako osiągnięć.
7. **Uczciwe umowy**: Ustal zakres, termin, cenę, podatki, anulowanie, rekompensaty i raporty.
8. **Pilotaż i przegląd**: Testuj pakiety i odnawiaj je tylko przy udokumentowanej wartości.

Wymogi prasowe, reklamowe, podatkowe i prywatności zależą od rynku. W razie potrzeby zasięgnij porady specjalisty.`
        },
        understandContent: {
          coreTakeaway: "Wiarygodne medium może skupiać uwagę, ale nie posiada ani nie kontroluje rynku.",
          keyPrinciples: [
            "Wyraźnie oddzielaj i oznaczaj treści redakcyjne, reklamy oraz materiały sponsorowane",
            "Ustal zakres, czas, płatność, anulowanie, zwroty, dane i raporty proporcjonalnie do ryzyka"
          ]
        },
        actionTask: {
          instruction: "Przygotuj media kit portalu:",
          checklistItems: [
            "Zdefiniuj odbiorców przez zweryfikowane dane i wyraźnie oznacz prognozy",
            "Wyceń trzy pakiety sponsorskie z zakresem, wyłączeniami i pomiarem",
            "Udokumentuj zasady autorów, oznaczeń, korekt, prywatności i skarg"
          ]
        }
      },
      "83.2": {
        stageTitle: "83. Nagrody branżowe i gale",
        title: "Nagroda branżowa: wiarygodny konkurs i gala",
        description: "Poznaj tworzenie nagrody z przejrzystymi kryteriami, niezależnym jury, uczciwymi warunkami i odpowiedzialnym planem finansowym.",
        learnContent: {
          videoTitle: "Masterclass: wiarygodne nagrody, ocena jury i ekonomika wydarzenia",
          summaryText: "Rzetelna nagroda może pokazać osiągnięcia i połączyć ekspertów. Zaplanuj kryteria, niezależne jury, uczciwe opłaty i trwałą finansowo galę bez sugerowania, że płatność kupuje wyróżnienie.",
          bulletPoints: [
            "Kategorie: precyzyjne warunki, dowody i punktacja dla innowacji, zatrudnienia lub zrównoważonego rozwoju",
            "Niezależne jury: role, zgoda, kompetencje, konflikty, wyłączenia, poufność i wynagrodzenie",
            "Opłaty: uzasadnione kosztami, ujawnione przed zgłoszeniem i niezależne od nominacji lub wygranej",
            "Gala i sponsoring: jasne pakiety, realistyczna pojemność, dostępność, anulowanie i plan awaryjny"
          ],
          coreConcepts: [
            { iconName: "award", title: "INTEGRALNOŚĆ NAGRODY", description: "Wyróżnienie jest wiarygodne, gdy warunki, dowody, punktacja, konflikty i wyniki są udokumentowane.", highlight: true },
            { iconName: "users", title: "UCZCIWA OCENA", description: "Niezależni jurorzy stosują wspólną skalę i wyłączają się przy konflikcie interesów." }
          ],
          resources: [
            { title: "Przewodnik po nagrodzie i regulamin zgłoszeń", subtitle: "PDF z warunkami, punktacją, konfliktami, odwołaniami i planem gali", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Award Submission Portal", subtitle: "Zarządzaj zgłoszeniami za zgodą, dowodami, oceną i biletami", type: "tool", iconName: "award", actionUrl: "crm" }
          ],
          fullArticleGuide: `### Projektowanie wiarygodnej nagrody branżowej

Zaufanie powstaje stopniowo. Prestiż musi wynikać z uczciwego procesu, a nie z opłat, sponsoringu lub deklaracji promocyjnych.

#### Kontrolowany cykl
1. **Governance**: Ustal organizatora, decyzje, finanse i rozdział sponsorów od oceny.
2. **Regulamin**: Opublikuj warunki, kategorie, dowody, punktację, terminy, opłaty, prywatność i licencje.
3. **Jury**: Zweryfikuj kompetencje i zgodę; rejestruj konflikty, wyłączenia, poufność i wynagrodzenie.
4. **Zgłoszenia**: Zbieraj tylko potrzebne dane i chroń dowody.
5. **Ocena**: Stosuj wspólną skalę, moderację i ślad audytowy; ustal remisy i dyskwalifikacje.
6. **Zastrzeżenia**: Zapewnij ograniczoną korektę lub odwołanie bez twierdzenia, że decyzji nie można zakwestionować.
7. **Komunikacja**: Uzasadniaj twierdzenia i nie sugeruj, że opłata lub sponsoring zwiększa szanse.
8. **Gala**: Planuj budżet, dostępność, bezpieczeństwo, dostawców, anulowanie i zwroty.
9. **Znaki**: Licencjonuj godła z kategorią, rokiem, zakresem, terminem i zasadami nadużyć.
10. **Przegląd**: Opublikuj metodologię, ogranicz retencję danych i zapisz ulepszenia.`
        },
        understandContent: {
          coreTakeaway: "Wiarygodność wynika z kryteriów i niezależnej oceny, nie z deklarowanej pozycji ponad konkurencją.",
          keyPrinciples: [
            "Dokumentuj ocenę, prywatność, konflikty, skargi i odwołania; nie nazywaj procesu niepodważalnym",
            "Licencjonuj godła ze wskazaniem roku, kategorii, dozwolonych twierdzeń, czasu i egzekwowania"
          ]
        },
        actionTask: {
          instruction: "Zaplanuj podstawy nagrody branżowej:",
          checklistItems: [
            "Zdefiniuj trzy do pięciu kategorii, warunki, dowody i punktację",
            "Przygotuj zróżnicowaną listę jury i proces konfliktu interesów",
            "Utwórz ostrożny budżet zgłoszeń, biletów, sponsoringu, dostępności i rezerwy"
          ]
        }
      }
    }
  } }
};

export const localizeAcademyStage83 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.["83"];
  if (!patch) return stages;
  return stages.map((stage) => {
    if (stage.id !== 83) return stage;
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

import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: { "86": {
    title: "86. Sovereign Cloud & On-Premises LLM Deployments",
    subtitle: "vLLM, isolated AI infrastructure, model governance and privacy-aware data control",
    description: "Plan controlled on-premises or sovereign LLM deployments for sensitive environments. Review model licences, privacy roles, lawful basis, security, operations and data flows; local processing does not guarantee GDPR compliance.",
    lessons: {
      "86.1": {
        stageTitle: "86. On-Premises LLM Serving & vLLM",
        title: "Controlled LLM Serving: vLLM, Parallelism & Quantisation",
        description: "Benchmark models on representative workloads and balance hardware, quantisation, latency, throughput, quality, availability and cost.",
        learnContent: {
          videoTitle: "Masterclass: On-Premises LLM Serving & Capacity Planning",
          summaryText: "Regulated organisations must assess cloud use and international transfers case by case. On-premises deployment can increase control, but still requires privacy, security, procurement, licensing and operational evidence. Performance and contract values are never guaranteed.",
          bulletPoints: [
            "PagedAttention and continuous batching: benchmark memory use and throughput for the deployed vLLM version and workload",
            "Quantisation such as AWQ or GPTQ: validate model compatibility, execution support, memory savings and quality impact",
            "Parallel execution: choose tensor, pipeline or data-parallel patterns according to model, hardware and reliability needs",
            "Isolated operation: govern updates, supply chain, removable media, maintenance access, telemetry and approved data paths"
          ],
          coreConcepts: [
            { iconName: "server", title: "WORKLOAD BENCHMARKING", description: "Measure latency percentiles, throughput, memory, quality and failure behaviour under representative load.", highlight: true },
            { iconName: "lock", title: "CONTROLLED DATA FLOWS", description: "Local deployment reduces some dependencies but does not eliminate exfiltration, insider, interface or supply-chain risk." }
          ],
          resources: [
            { title: "On-Premises LLM Architecture & Benchmark Guide", subtitle: "PDF workbook for model, licence, hardware, security, capacity and acceptance testing", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Local Inference Gateway", subtitle: "Connect approved local inference endpoints with access and audit controls", type: "tool", iconName: "cpu", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Designing controlled local inference

Architecture begins with requirements rather than a fixed server recipe.

1. **Classify use and data**: Identify purpose, users, sensitivity, legal basis, retention and prohibited inputs.
2. **Check model rights**: Review licence, acceptable-use terms, provenance, export and sector restrictions.
3. **Create an evaluation set**: Measure task quality and safety before choosing model size or quantisation.
4. **Benchmark the workload**: Record time to first token, inter-token latency, throughput, concurrency and memory.
5. **Size capacity**: Include context length, peak demand, redundancy, maintenance, growth and power/cooling.
6. **Secure identities and endpoints**: Least privilege, strong authentication, secrets, encryption and network policy.
7. **Control isolation**: Document every update, import, export, telemetry and maintenance route.
8. **Operate safely**: Patch, scan, monitor, back up configuration, test failover and maintain rollback.
9. **Validate outputs**: Add use-case safeguards, human review and incident handling.
10. **Document compliance**: On-premises location alone does not establish GDPR or sector compliance.`
        },
        understandContent: {
          coreTakeaway: "On-premises capability can differentiate a provider but creates neither a monopoly nor guaranteed enterprise contracts.",
          keyPrinciples: [
            "Verify licences, model provenance, dependencies and commercial-use conditions before deployment",
            "Define service levels and test redundancy, spare capacity, failover, restart and recovery"
          ]
        },
        actionTask: {
          instruction: "Design a local inference pilot:",
          checklistItems: [
            "Create a model, licence, data-flow, security and acceptance-requirements register",
            "Benchmark representative prompts across quality, latency, throughput, memory and failure cases",
            "Test an authenticated local endpoint plus monitoring, failover and rollback"
          ]
        }
      },
      "86.2": {
        stageTitle: "86. Enterprise RAG & Local Retrieval",
        title: "Sovereign Enterprise RAG: Hybrid Retrieval, Reranking & Access Control",
        description: "Index authorised documents locally and combine lexical and semantic retrieval with metadata, permission filters, reranking, citations and evaluation.",
        learnContent: {
          videoTitle: "Masterclass: Local Retrieval Systems & Enterprise RAG",
          summaryText: "Local RAG can connect approved organisational knowledge to an LLM. Design ingestion, chunking, metadata, access control, hybrid retrieval, reranking and evaluation carefully. Reranking may reduce irrelevant retrieval but cannot eliminate hallucinations.",
          bulletPoints: [
            "Local embeddings: compare multilingual, domain, dimension, licence, latency and update behaviour",
            "Hybrid search: combine lexical and dense retrieval where evaluation shows complementary value",
            "Reranking: tune candidate count, model, hardware and latency using representative queries",
            "Authorisation-aware retrieval: enforce current document permissions before retrieval and again when rendering citations"
          ],
          coreConcepts: [
            { iconName: "database", title: "EVALUATED RETRIEVAL", description: "Measure recall, precision, ranking, citation support and end-to-end answer quality by use case.", highlight: true },
            { iconName: "shield", title: "SECURITY TRIMMING", description: "Permission metadata, identity mapping and filters require consistent enforcement, testing and monitoring." }
          ],
          resources: [
            { title: "Enterprise RAG Architecture Blueprint", subtitle: "PDF workbook for ingestion, retrieval, permissions, evaluation and operations", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Sovereign Knowledge Vault", subtitle: "Index and search approved internal knowledge with source controls", type: "tool", iconName: "database", actionUrl: "content" }
          ],
          fullArticleGuide: `### An evaluable enterprise RAG pipeline

Retrieval quality depends on the corpus, queries, permissions and scoring—not on a universal configuration.

1. **Govern the corpus**: Define owners, classification, purpose, retention, deletion and legal holds.
2. **Enforce ingestion rights**: Verify source access, copyright, personal data and allowed uses.
3. **Parse with traceability**: Preserve document, version, page, section and permission metadata.
4. **Design chunks experimentally**: Compare structure-aware and fixed strategies on real questions.
5. **Build retrieval baselines**: Test lexical, dense and hybrid approaches before adding complexity.
6. **Add reranking when justified**: Measure gain against latency, cost and operational burden.
7. **Apply security trimming**: Filter by current identity and source permissions; prevent metadata leakage.
8. **Generate with evidence**: Require citations and allow abstention when support is insufficient.
9. **Evaluate continuously**: Track retrieval relevance, groundedness, access violations and regressions.
10. **Operate the lifecycle**: Re-index changes, delete expired content and audit access.

No pipeline guarantees 99.9% correct answers. High-risk decisions require validated sources and appropriate human review.`
        },
        understandContent: {
          coreTakeaway: "Hybrid retrieval and reranking can improve results, but the gain must be measured on domain-specific data.",
          keyPrinciples: [
            "Store authoritative provenance, version, timestamps, classification and permissions with indexed content",
            "Show direct source references and verify that citations actually support the generated claim"
          ]
        },
        actionTask: {
          instruction: "Build a controlled RAG pilot:",
          checklistItems: [
            "Create an approved test corpus with provenance, versions and permission groups",
            "Compare lexical, dense, hybrid and reranked retrieval on a labelled query set",
            "Test access denial, citation support, abstention, deletion and re-indexing"
          ]
        }
      }
    }
  } },
  pl: { "86": {
    title: "86. Sovereign Cloud i lokalne wdrożenia LLM",
    subtitle: "vLLM, izolowana infrastruktura AI, governance modeli i kontrola danych",
    description: "Planuj kontrolowane lokalne lub sovereign wdrożenia LLM. Sprawdź licencje, role prywatności, podstawę prawną, bezpieczeństwo, operacje i przepływy; lokalność nie gwarantuje zgodności z RODO.",
    lessons: {
      "86.1": {
        stageTitle: "86. Lokalne serving LLM i vLLM",
        title: "Kontrolowane serving LLM: vLLM, równoległość i kwantyzacja",
        description: "Benchmarkuj modele na realnych workloadach i równoważ hardware, kwantyzację, latency, throughput, jakość, dostępność i koszt.",
        learnContent: {
          videoTitle: "Masterclass: lokalne serving LLM i capacity planning",
          summaryText: "Organizacje regulowane oceniają chmurę i transfery indywidualnie. On-premises może zwiększyć kontrolę, lecz nadal wymaga dowodów prywatności, bezpieczeństwa, licencji, procurement i operacji. Wyniki i umowy nie są gwarantowane.",
          bulletPoints: [
            "PagedAttention i continuous batching: mierz pamięć i throughput dla wersji vLLM oraz workloadu",
            "AWQ/GPTQ: sprawdź kompatybilność, wykonanie, oszczędność pamięci i wpływ na jakość",
            "Równoległość: dobierz tensor, pipeline lub data parallel do modelu, hardware i niezawodności",
            "Izolacja: kontroluj updates, supply chain, nośniki, maintenance, telemetry i zatwierdzone data paths"
          ],
          coreConcepts: [
            { iconName: "server", title: "BENCHMARK WORKLOADU", description: "Mierz percentyle latency, throughput, pamięć, jakość i awarie pod reprezentatywnym obciążeniem.", highlight: true },
            { iconName: "lock", title: "KONTROLOWANE PRZEPŁYWY", description: "Lokalność ogranicza część zależności, lecz nie usuwa exfiltration, insider, interface ani supply-chain risk." }
          ],
          resources: [
            { title: "Architektura i benchmark lokalnego LLM", subtitle: "PDF dla modelu, licencji, hardware, bezpieczeństwa, capacity i acceptance", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Local Inference Gateway", subtitle: "Łącz zatwierdzone endpointy z kontrolą dostępu i audytu", type: "tool", iconName: "cpu", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Projektowanie kontrolowanej inferencji lokalnej

Architekturę zaczyna się od wymagań, nie od stałej recepty sprzętowej.

1. Sklasyfikuj cel, użytkowników, dane, podstawę prawną, retencję i zakazane inputs.
2. Sprawdź licencję, provenance, acceptable use, export i ograniczenia sektorowe.
3. Utwórz evaluation set dla jakości i safety.
4. Mierz TTFT, inter-token latency, throughput, concurrency i pamięć.
5. Uwzględnij peak, redundancję, maintenance, wzrost, zasilanie i chłodzenie.
6. Chroń identity, endpointy, secrets, szyfrowanie i network policy.
7. Dokumentuj update, import, export, telemetry i maintenance paths.
8. Patchuj, skanuj, monitoruj, testuj failover i rollback.
9. Dodaj safeguards, human review i incident handling.
10. Dokumentuj compliance; sama lokalizacja nie ustanawia zgodności.`
        },
        understandContent: {
          coreTakeaway: "Kompetencje on-premises mogą wyróżniać, ale nie tworzą monopolu ani gwarantowanych umów.",
          keyPrinciples: [
            "Sprawdź licencję, pochodzenie modelu, zależności i warunki użycia komercyjnego",
            "Zdefiniuj SLA i testuj redundancję, capacity, failover, restart i recovery"
          ]
        },
        actionTask: {
          instruction: "Zaprojektuj pilotaż lokalnej inferencji:",
          checklistItems: [
            "Utwórz rejestr modelu, licencji, data flow, security i acceptance",
            "Benchmarkuj realne prompty pod kątem jakości, latency, throughput, memory i failures",
            "Testuj uwierzytelniony endpoint, monitoring, failover i rollback"
          ]
        }
      },
      "86.2": {
        stageTitle: "86. Enterprise RAG i lokalne retrieval",
        title: "Sovereign Enterprise RAG: hybrid retrieval, reranking i kontrola dostępu",
        description: "Indeksuj zatwierdzone dokumenty lokalnie i łącz lexical oraz semantic retrieval z metadanymi, permission filters, rerankingiem, cytatami i ewaluacją.",
        learnContent: {
          videoTitle: "Masterclass: lokalne systemy retrieval i Enterprise RAG",
          summaryText: "Lokalny RAG może łączyć zatwierdzoną wiedzę z LLM. Starannie projektuj ingestion, chunking, metadata, access control, hybrid retrieval, reranking i evaluation. Reranking nie eliminuje halucynacji.",
          bulletPoints: [
            "Embeddings: porównaj multilingual, domenę, dimension, licencję, latency i aktualizacje",
            "Hybrid search: łącz lexical i dense tylko tam, gdzie ewaluacja wykazuje wartość",
            "Reranking: dobierz candidates, model, hardware i latency na realnych queries",
            "Authorisation-aware retrieval: egzekwuj aktualne prawa przed retrieval i przy cytatach"
          ],
          coreConcepts: [
            { iconName: "database", title: "EWALUOWANE RETRIEVAL", description: "Mierz recall, precision, ranking, citation support i jakość odpowiedzi dla use case.", highlight: true },
            { iconName: "shield", title: "SECURITY TRIMMING", description: "Permission metadata, identity mapping i filtry wymagają spójnego egzekwowania, testów i monitoringu." }
          ],
          resources: [
            { title: "Blueprint architektury Enterprise RAG", subtitle: "PDF dla ingestion, retrieval, permissions, evaluation i operations", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Sovereign Knowledge Vault", subtitle: "Indeksuj i przeszukuj zatwierdzoną wiedzę ze źródłami", type: "tool", iconName: "database", actionUrl: "content" }
          ],
          fullArticleGuide: `### Ewaluowalna pipeline Enterprise RAG

Jakość zależy od korpusu, queries, permissions i scoringu, nie od uniwersalnej konfiguracji.

1. Określ owners, classification, purpose, retention, deletion i legal holds.
2. Sprawdź dostęp, copyright, personal data i allowed uses.
3. Zachowaj document, version, page, section i permission metadata.
4. Porównaj structure-aware oraz fixed chunks.
5. Testuj lexical, dense i hybrid baseline.
6. Dodaj reranking po pomiarze gain względem latency i cost.
7. Filtruj według aktualnej identity oraz source permissions.
8. Wymagaj cytatów i abstention przy braku dowodów.
9. Mierz relevance, groundedness, access violations i regressions.
10. Reindeksuj zmiany, usuwaj wygasłe treści i audytuj dostęp.

Żaden RAG nie gwarantuje 99,9% poprawności. Decyzje wysokiego ryzyka wymagają źródeł i human review.`
        },
        understandContent: {
          coreTakeaway: "Hybrid retrieval i reranking mogą poprawić wynik, lecz zysk trzeba mierzyć na danych domenowych.",
          keyPrinciples: [
            "Zapisuj provenance, version, timestamps, classification i permissions",
            "Pokazuj bezpośrednie źródła i sprawdzaj, czy cytaty wspierają twierdzenie"
          ]
        },
        actionTask: {
          instruction: "Zbuduj kontrolowany pilotaż RAG:",
          checklistItems: [
            "Utwórz zatwierdzony corpus testowy z provenance, versions i permission groups",
            "Porównaj lexical, dense, hybrid i reranked retrieval na labelled queries",
            "Testuj access denial, citations, abstention, deletion i re-indexing"
          ]
        }
      }
    }
  } }
};

export const localizeAcademyStage86 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.["86"];
  if (!patch) return stages;
  return stages.map((stage) => stage.id !== 86 ? stage : ({ ...stage, ...patch, lessons: stage.lessons.map((lesson) => {
    const lessonPatch = patch.lessons?.[lesson.id];
    return !lessonPatch ? lesson : ({ ...lesson, ...lessonPatch, learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent }, understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent }, actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask } });
  }) }));
};

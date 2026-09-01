import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '98': {
      title: '98. Post-Quantum Cryptography & Crypto Agility',
      subtitle: 'NIST PQC standards, quantum risk, zero-knowledge proofs and QKD',
      description: 'Plan a risk-based migration to NIST’s ML-KEM, ML-DSA and SLH-DSA standards and assess zero-knowledge proofs and quantum key distribution without absolute security claims.',
      lessons: {
        '98.1': {
          stageTitle: '98. NIST Post-Quantum Standards',
          title: 'Post-Quantum Cryptography: Migration to ML-KEM, ML-DSA & SLH-DSA',
          description: 'Understand why sufficiently capable fault-tolerant quantum computers could threaten current public-key schemes and how to prepare a controlled migration to standardised post-quantum cryptography.',
          learnContent: {
            videoTitle: 'Masterclass: Post-Quantum Cryptography & NIST Standards',
            summaryText: 'A cryptographically relevant quantum computer could attack widely used RSA and elliptic-curve schemes, but its arrival, resource requirements and running times remain uncertain. Organisations should prioritise long-lived data, inventory cryptography and plan interoperable, tested migrations to final standards.',
            bulletPoints: [
              'Quantum risk: Shor’s algorithm threatens RSA, Diffie–Hellman and elliptic curves on a sufficiently capable fault-tolerant quantum computer, not on current devices',
              'Harvest now, decrypt later: data sensitivity and required secrecy lifetime determine priority; do not make blanket claims about attacker identity or capability',
              'Final NIST standards: FIPS 203 ML-KEM for key establishment and FIPS 204 ML-DSA plus FIPS 205 SLH-DSA for signatures',
              'Security assumptions: no efficient classical or quantum attacks are currently known against the standardised schemes, while implementation flaws and new cryptanalysis remain possible'
            ],
            coreConcepts: [
              { iconName: 'lock', title: 'POST-QUANTUM MIGRATION', description: 'Standards, inventory, testing and crypto agility rather than a guarantee of future security.', highlight: true },
              { iconName: 'shield', title: 'HYBRID TRANSITION', description: 'An optional construction requiring a specified combiner, compatible protocols and reviewed implementations.' }
            ],
            resources: [
              { title: 'NIST PQC Migration & Crypto-Inventory Guide', subtitle: 'PDF covering ML-KEM, ML-DSA, SLH-DSA, dependencies and test planning', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Post-Quantum Readiness Register', subtitle: 'Document crypto dependencies, vendor roadmaps, tests and exceptions', type: 'tool', iconName: 'shield', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Preparing for the post-quantum era

Organisations with data that must remain confidential for many years should begin a risk-based transition now.

#### The migration path:
1. **Cryptographic inventory**: Record algorithms, keys, certificates, protocols, libraries, hardware, data flows, vendors and protection periods, including shadow and embedded cryptography.
2. **Prioritisation**: Rank long-lived confidential data, signatures, identities, code signing, firmware, operational technology and hard-to-replace systems by impact and migration lead time.
3. **Target architecture**: Select appropriate standards, protocol profiles and validated products; use hybrid schemes only where the specification, combiner and peers support them.
4. **Testing and rollout**: Test performance, message sizes, certificate chains, HSMs, backups, interoperability, side channels, error handling and rollback in stages.
5. **Crypto agility**: Prepare ownership, approvals, key rotation, telemetry, supplier obligations, incident response and future algorithm replacement.

PQC reduces particular quantum risks but does not prevent compromised endpoints, weak randomness, stolen keys, implementation defects or future cryptanalytic advances.`,
          },
          understandContent: {
            coreTakeaway: 'Post-quantum migration is an ongoing risk programme: standards, crypto agility and secure implementation improve protection but cannot guarantee permanent data security.',
            keyPrinciples: [
              'Use hybrid schemes only under an applicable specification and with interoperability; added complexity can introduce new defects',
              'Measure key, ciphertext, signature and certificate sizes for each algorithm and parameter set instead of applying one universal multiplier'
            ]
          },
          actionTask: {
            instruction: 'Prepare a post-quantum security migration:',
            checklistItems: [
              'Create a crypto inventory with data lifetime, system owners, suppliers and dependencies',
              'Define target profiles using final standards and test compatibility, performance, HSM and side-channel behaviour',
              'Document staged migration, key rotation, rollback, telemetry, incident response and supplier roadmap'
            ]
          }
        },
        '98.2': {
          stageTitle: '98. Zero-Knowledge Proofs & Quantum Key Distribution',
          title: 'Zero-Knowledge Proofs & Quantum Key Distribution',
          description: 'Learn how zero-knowledge proofs can verify selected statements with limited disclosure and why QKD retains implementation, endpoint and operating risks despite its quantum properties.',
          learnContent: {
            videoTitle: 'Masterclass: Zero-Knowledge Proofs & Quantum-Security Limits',
            summaryText: 'A correct zero-knowledge system can prove that committed inputs satisfy a precisely defined relation without revealing every input. It does not automatically prove the origin, completeness or legal meaning of the data. QKD may reveal interception on the quantum channel but is neither unbreakable nor a substitute for authentication, endpoint security and conventional encryption.',
            bulletPoints: [
              'zk-SNARKs and zk-STARKs: compare assumptions, setup, proof size, performance, recursion and implementation characteristics',
              'Proof of reserves or solvency: only the encoded statement is proven; hidden liabilities, valuation, ownership and data completeness require additional controls',
              'QKD: quantum-channel disturbance may be statistically detectable, while devices, implementation, authentication, key management, endpoints and availability remain attackable',
              'Selective-disclosure evidence: disclosure may be reduced, but tax, accounting, audit, AML, sanctions, privacy and retention duties remain context-specific'
            ],
            coreConcepts: [
              { iconName: 'eye-off', title: 'ZERO-KNOWLEDGE PRIVACY', description: 'Verification of a defined relation with limited disclosure and explicit assumptions.', highlight: true },
              { iconName: 'zap', title: 'QKD LIMITS', description: 'Quantum-based key generation with device, authentication, distance, endpoint and availability risks.' }
            ],
            resources: [
              { title: 'Zero-Knowledge Architecture & Review Guide', subtitle: 'PDF covering statement, data commitment, circuit, setup and verification', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR ZK-Proof Sandbox', subtitle: 'Model test proofs without presenting them as complete solvency or financial audits', type: 'tool', iconName: 'lock', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Combining mathematics and privacy

Zero-knowledge proofs are useful privacy-enhancing tools whose result is only as meaningful as the statement, inputs and system assumptions.

#### Review areas for ZKP and QKD:
- **Statement and data binding**: Define exactly what is proven, who attests the source data and how time, completeness, liabilities, valuation and revocation are handled.
- **Proof system**: Compare trust assumptions, setup, curves or hashes, post-quantum needs, circuit compiler, proof size, runtime and recursion.
- **Implementation**: Independently review circuits, libraries, randomness, keys, parameters, hardware, side channels, upgrades and verifier; formal verification does not cover every system assumption.
- **Law and audit**: Determine with regulators, auditors and privacy specialists which records must be disclosed or retained. A proof does not replace a statutory financial, tax or identity audit.
- **QKD boundary**: Weigh authenticated classical channel, device trust, key hand-off, distance, loss, repeaters, denial of service, endpoints and cost against standardised PQC alternatives.

An age or attribute proof may minimise data when a trusted issuer and suitable credential system exist. A solvency proof is only as complete as the included assets, liabilities, valuations and data sources.`,
          },
          understandContent: {
            coreTakeaway: 'Zero-knowledge proofs can reduce disclosure but prove only the defined statement under their assumptions; compliance, data quality and system security remain separate tasks.',
            keyPrinciples: [
              'Select a proof system by statement, trust model, performance, maturity, post-quantum requirement and interoperability; no type is universally superior',
              'Review the circuit and whole system independently, including data binding, setup, keys, compiler, verifier and operations in the threat model'
            ]
          },
          actionTask: {
            instruction: 'Design a zero-knowledge solvency proof:',
            checklistItems: [
              'Document the statement, data sources, liabilities, valuation, reference time and excluded matters',
              'Review the proof system, setup, circuit, libraries, keys, verifier and side-channel risks',
              'Confirm legal recognition, required disclosure, privacy, retention and independent assurance'
            ]
          }
        }
      }
    }
  },
  pl: {
    '98': {
      title: '98. Kryptografia postkwantowa i zwinność kryptograficzna',
      subtitle: 'Standardy PQC NIST, ryzyko kwantowe, dowody z wiedzą zerową i QKD',
      description: 'Zaplanuj opartą na ryzyku migrację do standardów NIST ML-KEM, ML-DSA i SLH-DSA oraz oceń dowody z wiedzą zerową i kwantową dystrybucję klucza bez bezwzględnych obietnic bezpieczeństwa.',
      lessons: {
        '98.1': {
          stageTitle: '98. Standardy postkwantowe NIST',
          title: 'Kryptografia postkwantowa: migracja do ML-KEM, ML-DSA i SLH-DSA',
          description: 'Poznaj zagrożenie obecnych schematów klucza publicznego przez dostatecznie wydajne, odporne na błędy komputery kwantowe oraz przygotowanie kontrolowanej migracji do standardowej kryptografii postkwantowej.',
          learnContent: {
            videoTitle: 'Masterclass: kryptografia postkwantowa i standardy NIST',
            summaryText: 'Komputer kwantowy istotny dla kryptografii mógłby zaatakować powszechne schematy RSA i krzywych eliptycznych, lecz termin jego powstania, potrzebne zasoby i czas obliczeń są niepewne. Organizacje powinny nadać priorytet długowiecznym danym, zinwentaryzować kryptografię i zaplanować interoperacyjną, przetestowaną migrację do finalnych standardów.',
            bulletPoints: [
              'Ryzyko kwantowe: algorytm Shora zagraża RSA, Diffiemu–Hellmanowi i krzywym eliptycznym na dostatecznie wydajnym komputerze kwantowym odpornym na błędy, a nie na obecnych urządzeniach',
              'Zbieraj teraz, odszyfruj później: wrażliwość danych i wymagany czas poufności wyznaczają priorytet; nie przypisuj każdemu napastnikowi tych samych możliwości',
              'Finalne standardy NIST: FIPS 203 ML-KEM do uzgadniania klucza oraz FIPS 204 ML-DSA i FIPS 205 SLH-DSA do podpisów',
              'Założenia bezpieczeństwa: obecnie nie są znane wydajne klasyczne ani kwantowe ataki na standardowe schematy, lecz błędy wdrożenia i nowa kryptoanaliza pozostają możliwe'
            ],
            coreConcepts: [
              { iconName: 'lock', title: 'MIGRACJA POSTKWANTOWA', description: 'Standardy, inwentaryzacja, testy i zwinność zamiast gwarancji przyszłego bezpieczeństwa.', highlight: true },
              { iconName: 'shield', title: 'PRZEJŚCIE HYBRYDOWE', description: 'Opcjonalna konstrukcja wymagająca określonego łącznika, zgodnych protokołów i sprawdzonego wdrożenia.' }
            ],
            resources: [
              { title: 'Przewodnik migracji PQC i inwentaryzacji kryptografii', subtitle: 'PDF o ML-KEM, ML-DSA, SLH-DSA, zależnościach i planie testów', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Rejestr gotowości postkwantowej Mara CRM', subtitle: 'Dokumentowanie zależności, planów dostawców, testów i wyjątków', type: 'tool', iconName: 'shield', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Przygotowanie do ery postkwantowej

Organizacje z danymi wymagającymi wieloletniej poufności powinny już teraz rozpocząć przejście oparte na ryzyku.

#### Ścieżka migracji:
1. **Inwentaryzacja kryptografii**: Zapisz algorytmy, klucze, certyfikaty, protokoły, biblioteki, sprzęt, przepływy danych, dostawców i okresy ochrony, w tym kryptografię ukrytą i wbudowaną.
2. **Priorytetyzacja**: Uporządkuj długowieczne dane poufne, podpisy, tożsamości, podpisywanie kodu, oprogramowanie układowe, technikę operacyjną i trudno wymienialne systemy według wpływu i czasu migracji.
3. **Architektura docelowa**: Wybierz właściwe standardy, profile protokołów i zweryfikowane produkty; używaj schematów hybrydowych tylko wtedy, gdy wspierają je specyfikacja, łącznik i strony komunikacji.
4. **Testy i wdrożenie**: Etapami sprawdź wydajność, rozmiary komunikatów, łańcuchy certyfikatów, HSM, kopie zapasowe, interoperacyjność, kanały boczne, obsługę błędów i wycofanie.
5. **Zwinność kryptograficzna**: Przygotuj właścicieli, zatwierdzenia, rotację kluczy, telemetrię, obowiązki dostawców, reagowanie na incydenty i kolejną zmianę algorytmów.

PQC ogranicza określone ryzyko kwantowe, lecz nie zapobiega przejętym urządzeniom końcowym, słabej losowości, kradzieży kluczy, błędom wdrożenia ani przyszłym postępom kryptoanalizy.`,
          },
          understandContent: {
            coreTakeaway: 'Migracja postkwantowa jest ciągłym programem ryzyka: standardy, zwinność i bezpieczne wdrożenie poprawiają ochronę, lecz nie gwarantują trwałego bezpieczeństwa danych.',
            keyPrinciples: [
              'Stosuj schematy hybrydowe tylko zgodnie z właściwą specyfikacją i przy interoperacyjności; dodatkowa złożoność może tworzyć nowe błędy',
              'Mierz rozmiary kluczy, szyfrogramów, podpisów i certyfikatów dla każdego algorytmu i zestawu parametrów zamiast używać jednego mnożnika'
            ]
          },
          actionTask: {
            instruction: 'Przygotuj migrację bezpieczeństwa postkwantowego:',
            checklistItems: [
              'Utwórz inwentarz kryptografii z czasem życia danych, właścicielami systemów, dostawcami i zależnościami',
              'Określ profile docelowe z finalnymi standardami i przetestuj zgodność, wydajność, HSM i kanały boczne',
              'Udokumentuj migrację etapową, rotację kluczy, wycofanie, telemetrię, reakcję na incydenty i plan dostawców'
            ]
          }
        },
        '98.2': {
          stageTitle: '98. Dowody z wiedzą zerową i kwantowa dystrybucja klucza',
          title: 'Dowody z wiedzą zerową i kwantowa dystrybucja klucza',
          description: 'Poznaj weryfikację wybranych twierdzeń przy ograniczonym ujawnieniu za pomocą ZKP oraz ryzyko wdrożenia, urządzeń końcowych i eksploatacji QKD pomimo właściwości kwantowych.',
          learnContent: {
            videoTitle: 'Masterclass: dowody z wiedzą zerową i granice bezpieczeństwa kwantowego',
            summaryText: 'Poprawny system z wiedzą zerową może dowieść, że związane dane wejściowe spełniają ściśle określoną relację, bez ujawniania wszystkich danych. Nie potwierdza automatycznie ich pochodzenia, kompletności ani znaczenia prawnego. QKD może ujawnić ingerencję w kanał kwantowy, lecz nie jest niezniszczalne i nie zastępuje uwierzytelniania, ochrony urządzeń ani zwykłego szyfrowania.',
            bulletPoints: [
              'zk-SNARK i zk-STARK: porównuj założenia, przygotowanie, rozmiar dowodu, wydajność, rekursję i cechy wdrożenia',
              'Dowód rezerw lub wypłacalności: potwierdza tylko zakodowane twierdzenie; ukryte zobowiązania, wycena, własność i kompletność danych wymagają dalszych kontroli',
              'QKD: zakłócenie kanału kwantowego może być wykrywalne statystycznie, lecz urządzenia, wdrożenie, uwierzytelnianie, klucze, końcówki i dostępność nadal podlegają atakom',
              'Dowody z ograniczonym ujawnieniem: można zmniejszyć zakres danych, lecz obowiązki podatkowe, księgowe, audytowe, AML, sankcyjne, prywatności i retencji zależą od sytuacji'
            ],
            coreConcepts: [
              { iconName: 'eye-off', title: 'PRYWATNOŚĆ Z WIEDZĄ ZEROWĄ', description: 'Weryfikacja określonej relacji przy ograniczonym ujawnieniu i jawnych założeniach.', highlight: true },
              { iconName: 'zap', title: 'OGRANICZENIA QKD', description: 'Kwantowe wytwarzanie klucza z ryzykiem urządzeń, uwierzytelniania, odległości, końcówek i dostępności.' }
            ],
            resources: [
              { title: 'Przewodnik architektury i oceny wiedzy zerowej', subtitle: 'PDF o twierdzeniu, związaniu danych, obwodzie, przygotowaniu i weryfikacji', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Piaskownica dowodów ZK GOM-MAR', subtitle: 'Modelowanie testowych dowodów bez przedstawiania ich jako pełnego audytu wypłacalności lub sprawozdania', type: 'tool', iconName: 'lock', actionUrl: 'settings' }
            ],
            fullArticleGuide: `### Połączenie matematyki i prywatności

Dowody z wiedzą zerową są użytecznym narzędziem ochrony prywatności, lecz ich wynik jest tak znaczący, jak twierdzenie, dane i założenia systemu.

#### Obszary analizy ZKP i QKD:
- **Twierdzenie i związanie danych**: Określ dokładnie, czego dowodzisz, kto potwierdza dane źródłowe i jak obsługujesz czas, kompletność, zobowiązania, wycenę oraz odwołanie.
- **System dowodowy**: Porównaj założenia zaufania, przygotowanie, krzywe lub funkcje skrótu, potrzeby postkwantowe, kompilator obwodu, rozmiar dowodu, czas i rekursję.
- **Wdrożenie**: Niezależnie oceń obwody, biblioteki, losowość, klucze, parametry, sprzęt, kanały boczne, aktualizacje i weryfikator; formalna weryfikacja nie obejmuje wszystkich założeń systemu.
- **Prawo i audyt**: Ustal z organami, biegłymi rewidentami i ekspertami prywatności, które dokumenty trzeba ujawnić lub zachować. Dowód nie zastępuje ustawowego badania finansowego, podatkowego ani tożsamości.
- **Granice QKD**: Porównaj uwierzytelniony kanał klasyczny, zaufanie do urządzeń, przekazanie klucza, odległość, straty, wzmacniacze, odmowę usługi, końcówki i koszt ze standardowymi alternatywami PQC.

Dowód wieku lub atrybutu może ograniczać dane, jeśli istnieje zaufany wystawca i odpowiedni system poświadczeń. Dowód wypłacalności jest tak kompletny, jak uwzględnione aktywa, zobowiązania, wyceny i źródła danych.`,
          },
          understandContent: {
            coreTakeaway: 'Dowody z wiedzą zerową mogą ograniczać ujawnienie, lecz potwierdzają tylko zdefiniowane twierdzenie przy danych założeniach; zgodność, jakość danych i ochrona systemu pozostają odrębnymi zadaniami.',
            keyPrinciples: [
              'Wybieraj system według twierdzenia, modelu zaufania, wydajności, dojrzałości, potrzeby odporności postkwantowej i interoperacyjności; żaden typ nie jest zawsze najlepszy',
              'Niezależnie oceń obwód i cały system, uwzględniając związanie danych, przygotowanie, klucze, kompilator, weryfikator i eksploatację w modelu zagrożeń'
            ]
          },
          actionTask: {
            instruction: 'Zaprojektuj dowód wypłacalności z wiedzą zerową:',
            checklistItems: [
              'Udokumentuj twierdzenie, źródła danych, zobowiązania, wycenę, moment odniesienia i wyłączenia',
              'Oceń system dowodowy, przygotowanie, obwód, biblioteki, klucze, weryfikator i ryzyko kanałów bocznych',
              'Potwierdź uznanie prawne, wymagane ujawnienie, prywatność, retencję i niezależne poświadczenie'
            ]
          }
        }
      }
    }
  }
};

export const localizeAcademyStage98 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['98'];
  if (!patch) return stages;
  return stages.map(stage => stage.id !== 98 ? stage : ({
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

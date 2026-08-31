import { Stage } from '../types';
import { LanguageCode } from './translations';

type StagePatch = any;
const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: { "84": {
    title: "84. Enterprise Cybersecurity & Ransomware Resilience",
    subtitle: "Zero Trust, isolated immutable backups, authorised security testing and GDPR incident governance",
    description: "Strengthen cyber resilience with risk-based Zero Trust, separated immutable backups, authorised security tests and documented privacy governance. No control prevents every attack or eliminates liability.",
    lessons: {
      "84.1": {
        stageTitle: "84. Zero Trust & Ransomware Resilience",
        title: "Zero Trust Security: Remove Implicit Trust and Verify Access",
        description: "Introduce Zero Trust principles, phishing-resistant authentication, segmentation and tested recovery capabilities to reduce ransomware risk.",
        learnContent: {
          videoTitle: "Masterclass: Zero Trust Architecture & Ransomware Resilience",
          summaryText: "A compromised account or device can disrupt an organisation. Zero Trust shifts protection toward users, devices and resources without assuming that network location is trustworthy. It is an architecture and operating model, not a product or guarantee.",
          bulletPoints: [
            "Zero Trust: authenticate and authorise access to resources using identity, device posture, context and least privilege",
            "Phishing-resistant authentication: prefer FIDO2/WebAuthn for administrators and other high-risk accounts, with governed recovery",
            "Segmentation: restrict permitted paths and monitor activity to limit lateral movement and blast radius",
            "Separated immutable backups: protect copies with independent credentials, retention controls and tested recovery procedures"
          ],
          coreConcepts: [
            { iconName: "lock", title: "ZERO TRUST", description: "Remove implicit trust and make access decisions from current identity, device, resource and risk signals.", highlight: true },
            { iconName: "database", title: "RECOVERABLE BACKUPS", description: "Immutable copies support recovery only when scope, integrity, keys, dependencies and restoration are tested." }
          ],
          resources: [
            { title: "Zero Trust & Recovery Blueprint", subtitle: "PDF workbook for identity, access, segmentation, backup and recovery controls", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Security & Access Control Cockpit", subtitle: "Configure MFA, sessions, roles and access review workflows", type: "tool", iconName: "shield", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Building ransomware resilience

Security controls reduce likelihood and impact; they do not make ransomware mathematically impossible.

#### A practical control sequence
1. **Inventory critical services**: Map owners, identities, data, dependencies and recovery priorities.
2. **Protect identities**: Enforce least privilege, phishing-resistant MFA for high-risk accounts and controlled recovery.
3. **Harden and patch**: Maintain secure configurations, exposure management and prioritised remediation.
4. **Segment resources**: Restrict administrative paths and unnecessary east-west communication.
5. **Detect and respond**: Centralise useful logs, alerts and rehearsed incident procedures.
6. **Protect backups**: Use multiple copies, separate credentials, immutability or offline separation and monitored retention.
7. **Test restoration**: Test representative systems against RTO and RPO; record failures and dependencies.
8. **Exercise continuity**: Practise technical recovery, business workarounds and crisis communications.

The 3-2-1-1-0 model is a useful planning heuristic, not a universal compliance rule or guarantee. Adapt frequency and architecture to risk.`
        },
        understandContent: {
          coreTakeaway: "Phishing-resistant authentication and tested, separated backups reduce risk and impact but cannot prevent every form of extortion.",
          keyPrinciples: [
            "Prefer phishing-resistant MFA for privileged and exposed accounts; govern exceptions, recovery and device lifecycle",
            "Test recovery at a risk-based frequency and verify data, keys, applications, dependencies and business operations"
          ]
        },
        actionTask: {
          instruction: "Strengthen your organisation's security baseline:",
          checklistItems: [
            "Identify high-risk accounts and deploy phishing-resistant MFA with tested recovery",
            "Create separated immutable or offline backups with independent administration and retention controls",
            "Run and document a restoration and incident-response exercise against defined objectives"
          ]
        }
      },
      "84.2": {
        stageTitle: "84. Security Testing & GDPR Incident Governance",
        title: "Penetration Testing and Red Teaming: Authorised Testing, Remediation & Accountability",
        description: "Learn how authorised security testing identifies weaknesses and how organisations document technical, organisational and legal responsibilities. Documentation alone does not eliminate liability.",
        learnContent: {
          videoTitle: "Masterclass: Security Testing, Incident Response & GDPR Accountability",
          summaryText: "Use vulnerability assessment, penetration testing or red teaming according to risk and maturity. Define written authority, scope, safety, data handling and stop conditions. Technical and organisational measures must be implemented and evidenced; paperwork alone does not guarantee compliance or prevent penalties.",
          bulletPoints: [
            "Choose the method: scanning, penetration testing and red teaming answer different questions and have different operational risks",
            "Written authorisation: scope, rules of engagement, data handling, social-engineering consent, emergency contacts and safe stopping",
            "GDPR Article 82: compensation concerns controllers and processors; any personal director liability requires separate legal analysis",
            "GDPR Article 33: assess every personal-data breach and notify the competent authority where required, where feasible within 72 hours after awareness"
          ],
          coreConcepts: [
            { iconName: "shield-alert", title: "AUTHORISED TESTING", description: "Controlled tests may reveal weaknesses; remediation, retesting and risk acceptance remain necessary.", highlight: true },
            { iconName: "file-text", title: "ACCOUNTABILITY", description: "Evidence supports accountability but does not replace effective controls, breach assessment or legal advice." }
          ],
          resources: [
            { title: "Security-Test & GDPR Incident Workbook", subtitle: "PDF working template for rules of engagement, remediation, TOM records and notification assessment", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Audit Log & Compliance Tracker", subtitle: "Manage access logs with integrity, access and retention controls", type: "tool", iconName: "settings", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Governing security testing and personal-data breaches

Testing and documentation form part of a broader risk-management system; neither creates automatic legal protection.

#### Security-test lifecycle
1. **Define the objective** and choose a proportionate assessment.
2. **Authorise in writing** the systems, dates, techniques, providers and contacts.
3. **Protect operations and data** with backups, stop conditions, minimisation and secure evidence handling.
4. **Triage findings** by likelihood, impact and exposure rather than headline severity alone.
5. **Remediate and retest**; record accepted residual risks with owners and deadlines.
6. **Separate bug bounty from open permission**; publish a clear safe-harbour and disclosure policy before inviting researchers.

#### GDPR incident decisions
- Determine whether an event is a personal-data breach.
- Record facts, effects and remedial action under Article 33(5).
- Notify the competent supervisory authority unless the breach is unlikely to risk people's rights and freedoms.
- Where notification is required, act without undue delay and, where feasible, within 72 hours after awareness; explain delay.
- Assess communication to affected people separately under Article 34.
- Coordinate legal, privacy, security, insurance and communications specialists.

GDPR fines and compensation have distinct legal tests. Obtain jurisdiction-specific advice rather than promising complete protection.`
        },
        understandContent: {
          coreTakeaway: "Leadership must implement and evidence appropriate measures; complete exoneration is never guaranteed by documentation alone.",
          keyPrinciples: [
            "Assess every incident promptly; notify under Article 33 only when its legal threshold is met and document the decision",
            "Use qualified external testing, written rules of engagement, remediation owners and proportionate retesting"
          ]
        },
        actionTask: {
          instruction: "Prepare your security and privacy accountability dossier:",
          checklistItems: [
            "Update the record of technical and organisational measures with owners and evidence",
            "Document the personal-data-breach assessment, escalation, notification and communication workflow",
            "Archive an authorised assessment plus remediation and retest evidence"
          ]
        }
      }
    }
  } },
  pl: { "84": {
    title: "84. Cyberbezpieczeństwo przedsiębiorstwa i odporność na ransomware",
    subtitle: "Zero Trust, odseparowane kopie immutable, autoryzowane testy i zarządzanie incydentami RODO",
    description: "Wzmacniaj odporność przez Zero Trust oparty na ryzyku, oddzielone kopie, autoryzowane testy i udokumentowane zarządzanie prywatnością. Żadna kontrola nie zapobiega wszystkim atakom ani nie wyłącza odpowiedzialności.",
    lessons: {
      "84.1": {
        stageTitle: "84. Zero Trust i odporność na ransomware",
        title: "Zero Trust Security: usuń domyślne zaufanie i weryfikuj dostęp",
        description: "Wprowadź zasady Zero Trust, uwierzytelnianie odporne na phishing, segmentację i testowane odtwarzanie, aby ograniczać ryzyko ransomware.",
        learnContent: {
          videoTitle: "Masterclass: architektura Zero Trust i odporność na ransomware",
          summaryText: "Przejęte konto lub urządzenie może zakłócić organizację. Zero Trust skupia ochronę na użytkownikach, urządzeniach i zasobach bez ufania lokalizacji sieciowej. To architektura i model operacyjny, nie produkt ani gwarancja.",
          bulletPoints: [
            "Zero Trust: uwierzytelniaj i autoryzuj dostęp według tożsamości, stanu urządzenia, kontekstu i least privilege",
            "Uwierzytelnianie odporne na phishing: preferuj FIDO2/WebAuthn dla administratorów i kont wysokiego ryzyka",
            "Segmentacja: ogranicz dozwolone ścieżki i monitoruj aktywność, aby zmniejszyć lateral movement",
            "Oddzielone kopie immutable: chroń je niezależnymi poświadczeniami, retencją i testowanym odtwarzaniem"
          ],
          coreConcepts: [
            { iconName: "lock", title: "ZERO TRUST", description: "Usuń domyślne zaufanie i oceniaj dostęp z aktualnych sygnałów tożsamości, urządzenia, zasobu i ryzyka.", highlight: true },
            { iconName: "database", title: "ODTWARZALNE KOPIE", description: "Kopie wspierają odtwarzanie tylko wtedy, gdy testujesz zakres, integralność, klucze i zależności." }
          ],
          resources: [
            { title: "Blueprint Zero Trust i odtwarzania", subtitle: "PDF dla tożsamości, dostępu, segmentacji, kopii i recovery", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "Mara CRM Security & Access Control Cockpit", subtitle: "Konfiguruj MFA, sesje, role i przeglądy dostępów", type: "tool", iconName: "shield", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Budowa odporności na ransomware

Kontrole ograniczają prawdopodobieństwo i skutki, lecz nie czynią ransomware matematycznie niemożliwym.

#### Praktyczna sekwencja
1. **Inwentaryzuj usługi**: Mapuj właścicieli, tożsamości, dane, zależności i priorytety.
2. **Chroń tożsamości**: Least privilege, MFA odporne na phishing i kontrolowane recovery.
3. **Utwardzaj i aktualizuj**: Zarządzaj konfiguracją, ekspozycją i poprawkami.
4. **Segmentuj zasoby**: Ogranicz ścieżki administracyjne i zbędną komunikację.
5. **Wykrywaj i reaguj**: Centralizuj użyteczne logi, alerty i procedury.
6. **Chroń kopie**: Kilka kopii, oddzielne poświadczenia, immutability lub offline i retencja.
7. **Testuj odtwarzanie**: Weryfikuj reprezentatywne systemy względem RTO i RPO.
8. **Ćwicz ciągłość**: Testuj recovery, obejścia biznesowe i komunikację.

Model 3-2-1-1-0 jest użyteczną wskazówką, nie uniwersalną normą ani gwarancją.`
        },
        understandContent: {
          coreTakeaway: "MFA odporne na phishing i testowane, oddzielone kopie zmniejszają ryzyko i skutki, ale nie zapobiegają każdemu wymuszeniu.",
          keyPrinciples: [
            "Preferuj phishing-resistant MFA dla kont uprzywilejowanych i narażonych; zarządzaj wyjątkami oraz recovery",
            "Testuj odtwarzanie zależnie od ryzyka i sprawdzaj dane, klucze, aplikacje, zależności oraz działanie biznesu"
          ]
        },
        actionTask: {
          instruction: "Wzmocnij bazowy poziom bezpieczeństwa:",
          checklistItems: [
            "Wskaż konta wysokiego ryzyka i wdroż phishing-resistant MFA z testowanym recovery",
            "Utwórz oddzielone kopie immutable lub offline z niezależną administracją i retencją",
            "Przeprowadź i udokumentuj ćwiczenie odtwarzania oraz reakcji na incydent"
          ]
        }
      },
      "84.2": {
        stageTitle: "84. Testy bezpieczeństwa i incydenty RODO",
        title: "Pentest i red teaming: autoryzowane testy, naprawa i rozliczalność",
        description: "Poznaj wykrywanie słabości przez autoryzowane testy oraz dokumentowanie odpowiedzialności technicznej, organizacyjnej i prawnej. Dokumentacja sama nie wyłącza odpowiedzialności.",
        learnContent: {
          videoTitle: "Masterclass: testy bezpieczeństwa, reakcja i rozliczalność RODO",
          summaryText: "Dobierz skan, pentest lub red teaming do ryzyka i dojrzałości. Określ pisemną zgodę, zakres, bezpieczeństwo, dane i warunki zatrzymania. TOM muszą być wdrożone i potwierdzone; dokumenty nie gwarantują zgodności ani braku kar.",
          bulletPoints: [
            "Dobór metody: skan, pentest i red teaming odpowiadają na inne pytania oraz tworzą inne ryzyka",
            "Pisemna autoryzacja: zakres, rules of engagement, dane, zgoda na social engineering, kontakty i bezpieczne zatrzymanie",
            "Art. 82 RODO: odszkodowanie dotyczy administratorów i procesorów; odpowiedzialność osobista organów wymaga osobnej analizy",
            "Art. 33 RODO: oceń każde naruszenie i zgłoś je organowi, gdy jest to wymagane, w miarę możliwości w 72 godziny od stwierdzenia"
          ],
          coreConcepts: [
            { iconName: "shield-alert", title: "AUTORYZOWANE TESTY", description: "Kontrolowane testy mogą ujawnić luki; nadal potrzebne są naprawa, retest i decyzja o ryzyku.", highlight: true },
            { iconName: "file-text", title: "ROZLICZALNOŚĆ", description: "Dowody wspierają rozliczalność, lecz nie zastępują skutecznych kontroli, oceny incydentu ani porady prawnej." }
          ],
          resources: [
            { title: "Workbook testów i incydentów RODO", subtitle: "PDF dla zasad testu, napraw, TOM i oceny obowiązku zgłoszenia", type: "pdf", iconName: "file-text", actionUrl: "tools" },
            { title: "GOM-MAR Audit Log & Compliance Tracker", subtitle: "Zarządzaj logami z kontrolą integralności, dostępu i retencji", type: "tool", iconName: "settings", actionUrl: "settings" }
          ],
          fullArticleGuide: `### Zarządzanie testami i naruszeniami danych

Testy i dokumentacja są częścią systemu ryzyka; nie tworzą automatycznej ochrony prawnej.

#### Cykl testu
1. Określ cel i proporcjonalną ocenę.
2. Pisemnie autoryzuj systemy, terminy, techniki, dostawców i kontakty.
3. Chroń operacje i dane przez kopie, stop conditions, minimalizację i bezpieczne dowody.
4. Oceniaj ustalenia według prawdopodobieństwa, wpływu i ekspozycji.
5. Napraw i wykonaj retest; zapisz zaakceptowane ryzyko.
6. Przed bug bounty opublikuj zakres, safe harbour i disclosure policy.

#### Decyzje RODO
- Ustal, czy zdarzenie jest naruszeniem ochrony danych osobowych.
- Zapisz fakty, skutki i działania zgodnie z art. 33 ust. 5.
- Zgłoś organowi, chyba że ryzyko dla praw i wolności jest mało prawdopodobne.
- Jeśli zgłoszenie jest wymagane, działaj bez zbędnej zwłoki i, gdy możliwe, w 72 godziny od stwierdzenia; wyjaśnij opóźnienie.
- Osobno oceń zawiadomienie osób na podstawie art. 34.

Kary i odszkodowanie mają różne testy prawne. Korzystaj z porady właściwej dla jurysdykcji.`
        },
        understandContent: {
          coreTakeaway: "Kierownictwo musi wdrażać i wykazywać odpowiednie środki; sama dokumentacja nigdy nie gwarantuje pełnego zwolnienia.",
          keyPrinciples: [
            "Szybko oceń każdy incydent; zgłaszaj na mocy art. 33 tylko po spełnieniu progu i dokumentuj decyzję",
            "Stosuj kwalifikowane testy, pisemne rules of engagement, właścicieli napraw i proporcjonalny retest"
          ]
        },
        actionTask: {
          instruction: "Przygotuj dossier bezpieczeństwa i prywatności:",
          checklistItems: [
            "Zaktualizuj TOM wraz z właścicielami i dowodami wdrożenia",
            "Udokumentuj ocenę naruszenia, eskalację, zgłoszenie i komunikację",
            "Zarchiwizuj autoryzowaną ocenę, naprawy i dowody retestu"
          ]
        }
      }
    }
  } }
};

export const localizeAcademyStage84 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.["84"];
  if (!patch) return stages;
  return stages.map((stage) => {
    if (stage.id !== 84) return stage;
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

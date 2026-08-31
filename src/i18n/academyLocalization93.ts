import { Stage } from '../types';
import { LanguageCode } from './translations';
type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '93': {
      title: '93. Biotechnology, Longevity Clinics & Precision-Medicine Pathways',
      subtitle: 'Evidence, informed consent, diagnostic limits and safe membership governance',
      description: 'Build responsible information and patient pathways for clinician-led prevention. Separate established care from experimental services and address professional rules, health advertising, medical products, consent and protected health data.',
      lessons: {
        '93.1': {
          stageTitle: '93. Preventive Diagnostics & Health Assessments',
          title: 'Preventive Diagnostics: Evidence, Consent & Responsible Patient Pathways',
          description: 'Explain benefits, limitations, incidental findings, follow-up and costs transparently while separating marketing from clinical indication.',
          learnContent: {
            videoTitle: 'Masterclass: Preventive Diagnostics, Evidence & Health Advertising',
            summaryText: 'Prevention marketing must not exploit fear or wealth. Whole-body MRI, epigenetic clocks and broad biomarker panels have use-specific evidence and risks of false positives and incidental findings. Selection and interpretation require clinical responsibility and shared decision-making.',
            bulletPoints: [
              'Whole-body MRI: review target group, evidence, contraindications, incidental findings, false positives and follow-up before advertising',
              'Epigenetic clocks are research or risk markers and do not prove individual rejuvenation or treatment success',
              'Offer biomarkers only for a clinical question, through a validated laboratory, with reference ranges and clinician interpretation',
              'Control clinical independence, fees, conflicts, referral rules and advertising claims in partner agreements',
            ],
            coreConcepts: [
              { iconName: 'activity', title: 'INFORMED DIAGNOSTICS', description: 'Potential benefit and harm must be explained; no complete-detection claim.', highlight: true },
              { iconName: 'heart', title: 'MARKER, NOT PROOF', description: 'Epigenetic estimates carry methodological uncertainty and do not prove rejuvenation.' },
            ],
            resources: [
              { title: 'Preventive-Diagnostics Governance Workbook', subtitle: 'PDF for evidence, indication, consent, incidental findings, advertising and follow-up', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Clinical-Pathway Register', subtitle: 'Record approved pathways and permissions without replacing a clinical record system', type: 'tool', iconName: 'user-check', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Responsible preventive medicine

Established care and emerging longevity services should not be presented as opposites. Individual indication, evidence, benefit-risk assessment and informed consent remain central.

1. Clinically review history, guidelines, contraindications and existing results.
2. Explain benefits, limits, false positives, incidental findings, radiation where relevant, follow-up and cost.
3. Use validated methods and quality-assured laboratories for defined questions.
4. Separate educational marketing, appointment intake and clinical decision-making.
5. Document consent, interpretation, referral, communication and complaint routes.
6. Review every claim under health-advertising, consumer and professional rules.
7. Process health data under an Article 9 GDPR condition plus an Article 6 basis where required, with purpose limitation and minimisation.
8. Apply role-based access, security, retention, deletion, breach and patient-rights procedures.

Do not promise cancer detection, biological rejuvenation, improved lifespan or a particular result.`,
          },
          understandContent: {
            coreTakeaway: 'Medical communication must support informed decisions and must not promise rejuvenation or successful early detection.',
            keyPrinciples: ['Qualified clinicians own indication, consent, interpretation and follow-up', 'Protect health data through a lawful basis, minimisation, access, retention, deletion and security controls'],
          },
          actionTask: {
            instruction: 'Prepare governance for a clinician-led preventive service:',
            checklistItems: ['Clinically review evidence, population, exclusions, risks, incidental findings and follow-up', 'Approve all claims under health advertising, professional and consumer law', 'Document Article 9 condition, consent, access, retention, deletion and incident response'],
          },
        },
        '93.2': {
          stageTitle: '93. Concierge Health & Longevity Memberships',
          title: 'Concierge Medicine: Scope, Evidence & Safe Memberships',
          description: 'Define memberships without cure, rejuvenation, availability or outcome guarantees and keep emergency care boundaries explicit.',
          learnContent: {
            videoTitle: 'Masterclass: Concierge-Care Governance & Evidence',
            summaryText: 'Continuity may support coordination and prevention, but scope, response times, emergency boundaries, qualifications and evidence must be clear. Price or exclusivity does not establish quality or guarantee an outcome.',
            bulletPoints: [
              'Separate clinical and non-clinical services, availability, emergencies, extra cost, termination and liability',
              'Assess NAD+ and peptide services by authorisation, evidence, quality, contraindications and clinician benefit-risk review without regeneration claims',
              'Define the navigator role without misrepresenting emergency access or practising beyond qualification',
              'Use cryotherapy, HBOT or light devices only for justified indications with suitable equipment, trained staff, screening and emergency plans',
            ],
            coreConcepts: [
              { iconName: 'award', title: 'DEFINED ACCESS', description: 'Contracted coordination and availability do not replace emergency services.', highlight: true },
              { iconName: 'zap', title: 'INDICATION-SPECIFIC EVIDENCE', description: 'Devices and treatments have use-specific evidence and risks, not universal rejuvenation effects.' },
            ],
            resources: [
              { title: 'Concierge-Care Membership & Safety Workbook', subtitle: 'PDF for scope, evidence, consent, emergency limits, complaints and termination', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR Health-Data Permission Register', subtitle: 'Track wearable permissions and revocation without creating an emergency monitor', type: 'tool', iconName: 'activity', actionUrl: 'crm' },
            ],
            fullArticleGuide: `### Safe concierge-care architecture

A premium environment may improve experience but never replaces clinical governance, hygiene, accessibility, qualification or evidence.

1. Define medical and hospitality services, responsibility and professional qualifications.
2. State response times, out-of-hours limits and emergency escalation prominently.
3. Review every medicine, device and procedure for authorisation, evidence and contraindications.
4. Do not describe wearables as continuous diagnosis or emergency monitoring.
5. Obtain granular consent and minimise wearable and health-data collection.
6. Define extra charges, cancellation, refunds, complaints, liability and continuity of care.
7. Monitor adverse events, complaints, conflicts and claim accuracy.
8. Reassess the programme as evidence, law, products and patient needs change.

Do not guarantee rejuvenation, longevity, cellular repair, 24/7 physician response or renewal rates.`,
          },
          understandContent: {
            coreTakeaway: 'A membership is defensible only when care, evidence, data use, emergency limits and contract terms are transparent.',
            keyPrinciples: ['Optimisation, performance and rejuvenation claims may also be misleading and require evidence review', 'Hospitality must not displace hygiene, accessibility, clinical safety, consent or professional boundaries'],
          },
          actionTask: {
            instruction: 'Design a medically and legally reviewed membership:',
            checklistItems: ['Define scope, exclusions, response time, emergencies, extra cost, cancellation and complaints', 'Design lawful, minimal and revocable wearable and health-data processing', 'Review clinical ownership, authorisation, evidence, devices, medicines, liability and emergency handover'],
          },
        },
      },
    },
  },
  pl: {
    '93': {
      title: '93. Biotechnologia, kliniki longevity i ścieżki precision medicine',
      subtitle: 'Evidence, informed consent, granice diagnostyki i bezpieczne membership',
      description: 'Buduj odpowiedzialne ścieżki informacji i pacjenta dla profilaktyki prowadzonej przez lekarza. Oddziel opiekę uznaną od usług eksperymentalnych i uwzględnij prawo zawodowe, reklamę zdrowotną, medical products, consent i dane zdrowotne.',
      lessons: {
        '93.1': {
          stageTitle: '93. Diagnostyka prewencyjna i health assessment',
          title: 'Diagnostyka prewencyjna: evidence, consent i odpowiedzialna ścieżka pacjenta',
          description: 'Wyjaśniaj benefit, limitations, incidental findings, follow-up i koszty, oddzielając marketing od wskazania klinicznego.',
          learnContent: {
            videoTitle: 'Masterclass: diagnostyka, evidence i reklama zdrowotna',
            summaryText: 'Marketing profilaktyki nie może wykorzystywać strachu ani zamożności. Whole-body MRI, epigenetic clocks i szerokie panels mają różną evidence oraz ryzyko false positives i incidental findings. Wybór i interpretacja wymagają odpowiedzialności klinicznej i shared decision-making.',
            bulletPoints: ['Whole-body MRI: sprawdź population, evidence, contraindications, incidental findings, false positives i follow-up','Epigenetic clocks nie dowodzą indywidualnego odmłodzenia ani skuteczności terapii','Biomarkers oferuj dla pytania klinicznego, w validated lab, z reference ranges i interpretacją lekarza','Kontroluj clinical independence, fees, conflicts, referral rules i advertising claims'],
            coreConcepts: [{ iconName:'activity',title:'ŚWIADOMA DIAGNOSTYKA',description:'Wyjaśnij możliwy benefit i harm; bez obietnicy pełnej detekcji.',highlight:true },{ iconName:'heart',title:'MARKER, NIE DOWÓD',description:'Szacunki epigenetyczne mają uncertainty i nie dowodzą odmłodzenia.' }],
            resources: [{ title:'Workbook governance diagnostyki',subtitle:'PDF dla evidence, indication, consent, incidental findings, advertising i follow-up',type:'pdf',iconName:'file-text',actionUrl:'tools' },{ title:'Mara CRM Clinical-Pathway Register',subtitle:'Rejestruj approved pathways i permissions bez zastępowania dokumentacji medycznej',type:'tool',iconName:'user-check',actionUrl:'crm' }],
            fullArticleGuide:`### Odpowiedzialna profilaktyka

Uznanej opieki i nowych usług longevity nie należy przedstawiać jako przeciwieństw. Liczą się indication, evidence, benefit-risk i informed consent.

1. Lekarz ocenia history, guidelines, contraindications i wyniki.
2. Wyjaśnij benefit, limits, false positives, incidental findings, radiation, follow-up i cost.
3. Używaj validated methods i quality-assured labs dla konkretnego pytania.
4. Oddziel marketing edukacyjny, intake i decyzję kliniczną.
5. Dokumentuj consent, interpretation, referral i communication.
6. Sprawdź claims według health advertising, consumer i professional rules.
7. Przetwarzaj health data na warunku art. 9 GDPR i podstawie art. 6, gdy wymagana.
8. Stosuj access, security, retention, deletion, breach i patient-rights procedures.

Nie obiecuj wykrycia raka, odmłodzenia biologicznego, dłuższego życia ani wyniku.`,
          },
          understandContent:{coreTakeaway:'Komunikacja medyczna ma wspierać świadomą decyzję, bez obietnicy odmłodzenia lub skutecznej wczesnej detekcji.',keyPrinciples:['Qualified clinicians odpowiadają za indication, consent, interpretation i follow-up','Chroń health data przez lawful basis, minimisation, access, retention, deletion i security']},
          actionTask:{instruction:'Przygotuj governance usługi prowadzonej przez lekarza:',checklistItems:['Sprawdź evidence, population, exclusions, risks, incidental findings i follow-up','Zatwierdź claims według health advertising, professional i consumer law','Udokumentuj art. 9, consent, access, retention, deletion i incident response']},
        },
        '93.2': {
          stageTitle:'93. Concierge health i longevity membership',title:'Concierge medicine: zakres, evidence i bezpieczne membership',description:'Definiuj membership bez gwarancji cure, rejuvenation, availability lub outcome i jasno podaj emergency boundaries.',
          learnContent:{videoTitle:'Masterclass: governance concierge care i evidence',summaryText:'Ciągłość może wspierać koordynację, lecz scope, response times, emergency limits, qualifications i evidence muszą być jasne. Cena i ekskluzywność nie dowodzą jakości ani wyniku.',
            bulletPoints:['Oddziel clinical i non-clinical services, availability, emergencies, extra cost, termination i liability','NAD+ i peptides oceniaj przez authorisation, evidence, quality, contraindications i clinician review bez regeneration claims','Zdefiniuj navigator role bez obietnicy emergency access i przekraczania kwalifikacji','Cryotherapy, HBOT i light devices tylko dla uzasadnionej indication, z odpowiednim sprzętem, personelem, screening i emergency plan'],
            coreConcepts:[{iconName:'award',title:'ZDEFINIOWANY DOSTĘP',description:'Umowna koordynacja nie zastępuje emergency services.',highlight:true},{iconName:'zap',title:'EVIDENCE ZALEŻNA OD WSKAZANIA',description:'Treatments mają use-specific evidence i risks, nie uniwersalne rejuvenation.'}],
            resources:[{title:'Workbook membership i safety concierge care',subtitle:'PDF dla scope, evidence, consent, emergency, complaints i termination',type:'pdf',iconName:'file-text',actionUrl:'tools'},{title:'GOM-MAR Health-Data Permission Register',subtitle:'Śledź wearable permissions i revocation bez emergency monitoring',type:'tool',iconName:'activity',actionUrl:'crm'}],
            fullArticleGuide:`### Bezpieczna architektura concierge care

Premium environment nie zastępuje clinical governance, hygiene, accessibility, qualification ani evidence.

1. Zdefiniuj medical i hospitality services, responsibility i qualifications.
2. Jasno podaj response times, out-of-hours limits i emergency escalation.
3. Sprawdź medicines, devices i procedures pod kątem authorisation, evidence i contraindications.
4. Nie opisuj wearables jako continuous diagnosis lub emergency monitor.
5. Uzyskaj granular consent i minimalizuj health-data collection.
6. Zdefiniuj charges, cancellation, refunds, complaints, liability i continuity.
7. Monitoruj adverse events, complaints, conflicts i claim accuracy.
8. Aktualizuj program wraz z evidence, prawem, products i needs.

Nie gwarantuj rejuvenation, longevity, cellular repair, 24/7 physician response ani renewal rates.`},
          understandContent:{coreTakeaway:'Membership jest defensible tylko przy transparent care, evidence, data use, emergency limits i contract terms.',keyPrinciples:['Claims o optimisation, performance i rejuvenation także wymagają evidence review','Hospitality nie może wypierać hygiene, accessibility, clinical safety, consent i boundaries']},
          actionTask:{instruction:'Zaprojektuj medycznie i prawnie sprawdzone membership:',checklistItems:['Zdefiniuj scope, exclusions, response, emergency, extra cost, cancellation i complaints','Zaprojektuj lawful, minimal i revocable processing wearable i health data','Sprawdź clinical ownership, authorisation, evidence, devices, medicines, liability i emergency handover']},
        },
      },
    },
  },
};

export const localizeAcademyStage93=(stages:Stage[],language:LanguageCode):Stage[]=>{const p=translations[language]?.['93'];if(!p)return stages;return stages.map(s=>s.id!==93?s:({...s,...p,lessons:s.lessons.map(l=>{const q=p.lessons?.[l.id];return !q?l:({...l,...q,learnContent:{...l.learnContent,...q.learnContent},understandContent:{...l.understandContent,...q.understandContent},actionTask:{...l.actionTask,...q.actionTask}})})}))};

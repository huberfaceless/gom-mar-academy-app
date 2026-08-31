import { Stage } from '../types';
import { LanguageCode } from './translations';
type StagePatch = any;

const translations: Partial<Record<LanguageCode, Record<string, StagePatch>>> = {
  en: {
    '92': {
      title: '92. Satellite Data, IoT Infrastructure & Geospatial Services',
      subtitle: 'Earth observation, LoRaWAN, predictive maintenance and supply-chain evidence',
      description: 'Develop satellite and IoT data services with verifiable quality, clear usage rights and secure operation. Review privacy, geodata licences, radio rules, cybersecurity, workplace safety, sector requirements and prediction limits.',
      lessons: {
        '92.1': {
          stageTitle: '92. Satellite Data & Computer Vision',
          title: 'Geospatial Intelligence: Validating Optical, Multispectral & SAR Data',
          description: 'Process optical, multispectral and SAR data separately and validate them for lawful agriculture, logistics or infrastructure use cases.',
          learnContent: {
            videoTitle: 'Masterclass: Satellite Geodata, AI & Evidence Quality',
            summaryText: 'Coverage, revisit, resolution, cloud, latency and licence vary by mission, sensor and region. Open and commercial data can support decisions, but demand, price and predictive accuracy are not guaranteed. Financial-market uses also require market-abuse, privacy and data-rights review.',
            bulletPoints: [
              'Compare sources by licence, spatial and temporal resolution, coverage, latency, cloud masking, availability and total cost',
              'Calculate NDVI and NDWI with documented preprocessing, atmospheric correction, quality masks and reference validation',
              'Treat SAR as radar rather than optical imagery; night and cloud capability does not remove orbit, geometry or interpretation limits',
              'For alternative data, verify provenance, rights, reproducibility, model error, market-abuse controls, privacy and fair claims',
            ],
            coreConcepts: [
              { iconName: 'eye', title: 'EVIDENCE, NOT OMNISCIENCE', description: 'Additional decision signals with latency, uncertainty, licence and compliance boundaries.', highlight: true },
              { iconName: 'globe', title: 'SAR WITH LIMITS', description: 'Radar capture at night and through cloud, constrained by orbit, resolution, geometry and analysis.' },
            ],
            resources: [
              { title: 'Geospatial Data Quality & Licence Workbook', subtitle: 'PDF framework for provenance, validation, uncertainty, privacy and permitted use', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Geospatial Evidence Hub', subtitle: 'Manage source versions, validation records, reports and customer permissions', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'content' },
            ],
            fullArticleGuide: `### Build a defensible geospatial service

Satellite data is sampled evidence. It is not continuous, universal or automatically accurate. A credible service explains what was observed, when, at which resolution, under which licence and with what uncertainty.

#### Review process
1. Define the customer decision and whether satellite data is fit for it.
2. Compare sensors, bands, revisit, latency, coverage, resolution and cost.
3. Record licences, attribution, redistribution, derived-work and retention terms.
4. Separate optical, multispectral, thermal and SAR processing assumptions.
5. Version preprocessing, masks, models, thresholds and reference datasets.
6. Validate against independent ground truth across seasons and locations.
7. Measure false positives, false negatives, drift and confidence calibration.
8. Assess privacy, sensitive locations, security, export and sector restrictions.
9. For financial uses, obtain specialist review of market-abuse and communications rules.
10. Publish provenance, timestamp, confidence, limitations and human-review status.

Do not promise real-time global visibility, automatic claims settlement, certain forecasts or investment advantage.`,
          },
          understandContent: {
            coreTakeaway: 'A reliable geodata service sells traceable uncertainty and validated decision support, not omniscient real-time observation.',
            keyPrinciples: ['Choose sources by fitness, licence, quality, availability and total cost', 'Deliver results with provenance, confidence, validation, freshness and permitted-use boundaries'],
          },
          actionTask: {
            instruction: 'Create a governed prototype for a satellite-data report:',
            checklistItems: ['Document source licence, privacy, permitted use and retention', 'Validate an index or classification against independent reference data', 'Produce a report with provenance, confidence, limits and human approval'],
          },
        },
        '92.2': {
          stageTitle: '92. LoRaWAN & Industrial IoT',
          title: 'Industrial IoT: Safe LoRaWAN Retrofit & Condition-Based Maintenance',
          description: 'Plan, radio-test, safely integrate and operate LoRaWAN retrofits as condition-based maintenance without promising failure prevention.',
          learnContent: {
            videoTitle: 'Masterclass: LoRaWAN, Industrial IoT Security & Maintenance Evidence',
            summaryText: 'Downtime cost, radio range, battery life and warning lead time depend on the asset, building, installation, interval, radio design and failure mode. LoRaWAN may support retrofit telemetry but does not replace machine protection or qualified maintenance and cannot guarantee avoided failures.',
            bulletPoints: [
              'Plan regional frequency band, duty cycle, link budget, building loss, interference, gateway redundancy and radio compliance',
              'Cost HaaS across hardware, installation, calibration, connectivity, cloud, support, replacement, liability and termination',
              'Validate vibration analytics through sensor placement, sampling, FFT, baselines, false alarms and expert confirmation',
              'Secure devices and data with identity, key management, encryption, updates, segmentation, logging and minimisation',
            ],
            coreConcepts: [
              { iconName: 'wifi', title: 'MEASURED RADIO DESIGN', description: 'Range depends on the site and must be supported by radio planning and field measurements.', highlight: true },
              { iconName: 'activity', title: 'DECISION SUPPORT', description: 'Condition alerts may support maintenance; lead time, accuracy and savings remain uncertain.' },
            ],
            resources: [
              { title: 'Industrial IoT Pilot & Safety Workbook', subtitle: 'PDF for radio, mounting, calibration, security, privacy, SLA and acceptance', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR IoT Telemetry Test Console', subtitle: 'Review approved test data, alert evidence and device health without safety control', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Retrofit telemetry without creating new hazards

An IoT sensor is not a certified machine-protection system unless expressly designed and approved for that function. Treat telemetry as decision support and retain existing safety controls.

#### Controlled pilot
1. Define the failure mode, decision, baseline and measurable acceptance criteria.
2. Obtain owner, manufacturer, maintenance, safety and IT/OT approval.
3. Review machinery, radio, electrical, workplace and explosion-protection requirements.
4. Survey coverage and interference at representative locations and operating states.
5. Select mounting and calibration without weakening guards, warranties or asset integrity.
6. Threat-model devices, gateways, brokers, APIs, cloud, users and update paths.
7. Provision unique identities and keys; segment networks and restrict privileges.
8. Validate alerts against inspections, record missed events and manage false alarms.
9. Define uptime, support, data rights, retention, liability, replacement and exit terms.
10. Scale only after technical, safety, security and economic review.

Do not promise a fixed range, battery life, warning period, margin, contract duration or downtime saving.`,
          },
          understandContent: {
            coreTakeaway: 'Industrial IoT creates value only through proven measurement quality, secure integration, clear responsibility and economic validation.',
            keyPrinciples: ['Have qualified people approve mounting, calibration, machinery, radio, electrical and safety requirements', 'Test risk-based alerts and connect them to existing safe maintenance processes'],
          },
          actionTask: {
            instruction: 'Design a safe pilot and transparent commercial offer:',
            checklistItems: ['Define use case, baseline, radio test, safety approval and success metrics', 'Document device, key, update, network, privacy and incident controls', 'Cost price, SLA, liability, data rights, support, replacement, term and exit'],
          },
        },
      },
    },
  },
  pl: {
    '92': {
      title: '92. Dane satelitarne, infrastruktura IoT i usługi geospatial',
      subtitle: 'Obserwacja Ziemi, LoRaWAN, predictive maintenance i dowody supply chain',
      description: 'Rozwijaj usługi satelitarne i IoT z weryfikowalną jakością, prawami użycia i bezpiecznym operowaniem. Sprawdź privacy, licencje geodata, radio, cybersecurity, BHP, reguły branżowe i granice prognoz.',
      lessons: {
        '92.1': {
          stageTitle: '92. Dane satelitarne i computer vision',
          title: 'Geospatial intelligence: walidacja danych optical, multispectral i SAR',
          description: 'Przetwarzaj oddzielnie dane optical, multispectral i SAR oraz waliduj je dla zgodnych z prawem zastosowań rolniczych, logistycznych i infrastrukturalnych.',
          learnContent: {
            videoTitle: 'Masterclass: geodata satelitarne, AI i jakość dowodów',
            summaryText: 'Coverage, revisit, resolution, cloud, latency i licence zależą od misji, sensora i regionu. Dane open i commercial mogą wspierać decyzje, ale popyt, cena i accuracy nie są gwarantowane. Zastosowania finansowe wymagają oceny market abuse, privacy i data rights.',
            bulletPoints: [
              'Porównaj źródła według licence, spatial/temporal resolution, coverage, latency, cloud mask, availability i total cost',
              'Licz NDVI i NDWI z udokumentowanym preprocessing, atmospheric correction, quality masks i reference validation',
              'Traktuj SAR jako radar, nie obraz optyczny; noc i chmury nie usuwają ograniczeń orbit, geometry i interpretation',
              'Dla alternative data sprawdź provenance, rights, reproducibility, model error, market abuse, privacy i claims',
            ],
            coreConcepts: [
              { iconName: 'eye', title: 'DOWÓD, NIE WSZECHWIEDZA', description: 'Dodatkowy sygnał decyzji z latency, uncertainty, licence i compliance boundaries.', highlight: true },
              { iconName: 'globe', title: 'SAR Z OGRANICZENIAMI', description: 'Radar działa nocą i przez chmury, lecz zależy od orbit, resolution, geometry i analizy.' },
            ],
            resources: [
              { title: 'Workbook jakości i licencji geodata', subtitle: 'PDF dla provenance, validation, uncertainty, privacy i permitted use', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'Mara CRM Geospatial Evidence Hub', subtitle: 'Zarządzaj source versions, walidacją, reports i permissions', type: 'tool', iconName: 'bar-chart-2', actionUrl: 'content' },
            ],
            fullArticleGuide: `### Zbuduj defensible geospatial service

Dane satelitarne są próbkowanym dowodem, a nie ciągłą i automatycznie dokładną obserwacją. Wiarygodna usługa wyjaśnia co, kiedy, w jakiej rozdzielczości, na jakiej licencji i z jaką niepewnością zaobserwowano.

#### Proces
1. Zdefiniuj decyzję klienta i fitness danych.
2. Porównaj sensors, bands, revisit, latency, coverage, resolution i cost.
3. Zapisz licence, attribution, redistribution, derived works i retention.
4. Oddziel assumptions dla optical, multispectral, thermal i SAR.
5. Wersjonuj preprocessing, masks, models, thresholds i reference data.
6. Waliduj względem independent ground truth w różnych sezonach i miejscach.
7. Mierz false positives, false negatives, drift i confidence calibration.
8. Oceń privacy, sensitive locations, security, export i sector restrictions.
9. Dla finansów uzyskaj specialist review market abuse i communications.
10. Publikuj provenance, timestamp, confidence, limitations i human review.

Nie obiecuj global real-time visibility, automatycznej likwidacji szkód, pewnej prognozy ani przewagi inwestycyjnej.`,
          },
          understandContent: {
            coreTakeaway: 'Wiarygodna usługa geodata sprzedaje traceable uncertainty i validated decision support, nie wszechwiedzącą obserwację.',
            keyPrinciples: ['Wybieraj źródła według fitness, licence, quality, availability i total cost', 'Dostarczaj provenance, confidence, validation, freshness i permitted-use boundaries'],
          },
          actionTask: {
            instruction: 'Utwórz governed prototype raportu satelitarnego:',
            checklistItems: ['Udokumentuj licence, privacy, permitted use i retention', 'Zweryfikuj indeks lub klasyfikację względem independent reference data', 'Utwórz report z provenance, confidence, limits i human approval'],
          },
        },
        '92.2': {
          stageTitle: '92. LoRaWAN i Industrial IoT',
          title: 'Industrial IoT: bezpieczny retrofit LoRaWAN i condition-based maintenance',
          description: 'Planuj, testuj radiowo, bezpiecznie integruj i eksploatuj retrofit LoRaWAN bez obietnicy zapobiegania awarii.',
          learnContent: {
            videoTitle: 'Masterclass: LoRaWAN, security Industrial IoT i maintenance evidence',
            summaryText: 'Koszt downtime, radio range, battery life i warning lead time zależą od maszyny, budynku, instalacji, interwału, radio design i failure mode. LoRaWAN może wspierać telemetry, lecz nie zastępuje ochrony maszyny ani fachowej maintenance i nie gwarantuje uniknięcia awarii.',
            bulletPoints: [
              'Planuj regional frequency band, duty cycle, link budget, building loss, interference, gateway redundancy i radio compliance',
              'Kalkuluj HaaS: hardware, installation, calibration, connectivity, cloud, support, replacement, liability i termination',
              'Waliduj vibration analytics przez sensor placement, sampling, FFT, baseline, false alarms i expert confirmation',
              'Zabezpiecz devices i data przez identity, key management, encryption, updates, segmentation, logging i minimisation',
            ],
            coreConcepts: [
              { iconName: 'wifi', title: 'ZMIERZONY RADIO DESIGN', description: 'Range zależy od miejsca i wymaga radio planning oraz field measurements.', highlight: true },
              { iconName: 'activity', title: 'WSPARCIE DECYZJI', description: 'Condition alerts mogą wspierać maintenance; lead time, accuracy i savings są niepewne.' },
            ],
            resources: [
              { title: 'Workbook pilota i bezpieczeństwa Industrial IoT', subtitle: 'PDF dla radio, mounting, calibration, security, privacy, SLA i acceptance', type: 'pdf', iconName: 'file-text', actionUrl: 'tools' },
              { title: 'GOM-MAR IoT Telemetry Test Console', subtitle: 'Przeglądaj approved test data, alert evidence i device health bez safety control', type: 'tool', iconName: 'settings', actionUrl: 'settings' },
            ],
            fullArticleGuide: `### Retrofit telemetry bez nowych zagrożeń

Sensor IoT nie jest certyfikowanym systemem ochrony maszyny, chyba że został do tego zaprojektowany i zatwierdzony. Traktuj telemetry jako decision support i zachowaj istniejące safety controls.

#### Kontrolowany pilot
1. Zdefiniuj failure mode, decision, baseline i measurable acceptance criteria.
2. Uzyskaj zgodę owner, manufacturer, maintenance, safety i IT/OT.
3. Sprawdź machinery, radio, electrical, workplace i explosion protection.
4. Zmierz coverage i interference w reprezentatywnych warunkach.
5. Wybierz mounting i calibration bez osłabiania guards, warranty lub asset integrity.
6. Threat-model devices, gateways, brokers, APIs, cloud, users i updates.
7. Nadaj unique identities i keys; segmentuj network i ogranicz privileges.
8. Waliduj alerts względem inspections, zapisuj misses i false alarms.
9. Zdefiniuj uptime, support, data rights, retention, liability, replacement i exit.
10. Skaluj dopiero po review technical, safety, security i economics.

Nie obiecuj stałego range, battery life, warning period, margin, contract term ani downtime saving.`,
          },
          understandContent: {
            coreTakeaway: 'Industrial IoT tworzy wartość tylko przez proven measurement quality, secure integration, jasną odpowiedzialność i economic validation.',
            keyPrinciples: ['Niech specjaliści zatwierdzą mounting, calibration, machinery, radio, electrical i safety', 'Testuj risk-based alerts i łącz je z istniejącymi safe maintenance processes'],
          },
          actionTask: {
            instruction: 'Zaprojektuj bezpieczny pilot i transparentną ofertę:',
            checklistItems: ['Zdefiniuj use case, baseline, radio test, safety approval i success metrics', 'Udokumentuj device, key, update, network, privacy i incident controls', 'Kalkuluj price, SLA, liability, data rights, support, replacement, term i exit'],
          },
        },
      },
    },
  },
};

export const localizeAcademyStage92 = (stages: Stage[], language: LanguageCode): Stage[] => {
  const patch = translations[language]?.['92'];
  if (!patch) return stages;
  return stages.map((stage) => stage.id !== 92 ? stage : ({
    ...stage, ...patch,
    lessons: stage.lessons.map((lesson) => {
      const lessonPatch = patch.lessons?.[lesson.id];
      return !lessonPatch ? lesson : ({ ...lesson, ...lessonPatch,
        learnContent: { ...lesson.learnContent, ...lessonPatch.learnContent },
        understandContent: { ...lesson.understandContent, ...lessonPatch.understandContent },
        actionTask: { ...lesson.actionTask, ...lessonPatch.actionTask },
      });
    }),
  }));
};

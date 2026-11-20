import React from 'react';
import type { ProjectSettings } from '../../types/contentEngine';
import { isAcademyPriceCampaign } from '../../utils/academyCampaignPricing';
import { useProContract } from '../../hooks/useProContract';
import { useLanguage } from '../../context/LanguageContext';
import { ProPriceNotice } from '../ProPriceNotice';

export function AcademyCampaignPricingPanel({ settings, targetUrl }: { settings: ProjectSettings; targetUrl?: string }) {
  if (!isAcademyPriceCampaign(settings, targetUrl)) return null;
  return <PricingDetails />;
}
function PricingDetails() {
  const contract = useProContract();
  const { language } = useLanguage();
  const copy = {
    de: { title: 'Preisgrundlage für GOM MAR Academy', body: 'Diese Preisänderung und Preisgarantie werden automatisch für neue und erneut erzeugte Kampagneninhalte berücksichtigt: Blog, Pinterest, Instagram, YouTube, Shorts und E-Mails.', warning: 'Gespeicherte Entwürfe, CRM-Kampagnen und eingeplante Aufträge werden nicht automatisch geändert. Vor Jänner erstellte Einstiegswerbung für Termine ab 1. Jänner 2027 bitte mit der neuen Preisphase erneut erstellen und vor Veröffentlichung prüfen.', loading: 'Preisgrundlage wird geladen …' },
    en: { title: 'Pricing facts for GOM MAR Academy', body: 'The price change and price protection are automatically included when creating or regenerating campaign content: blog, Pinterest, Instagram, YouTube, Shorts and emails.', warning: 'Saved drafts, CRM campaigns and scheduled jobs are not changed automatically. Regenerate introductory promotions created before January for publication from 1 January 2027 using the new pricing phase, and review before publishing.', loading: 'Loading pricing facts …' },
    pl: { title: 'Podstawa cenowa GOM MAR Academy', body: 'Zmiana ceny i ochrona dotychczasowej ceny są automatycznie uwzględniane przy tworzeniu i ponownym generowaniu treści: blog, Pinterest, Instagram, YouTube, Shorts i e-maile.', warning: 'Zapisane szkice, kampanie CRM i zaplanowane zadania nie zmieniają się automatycznie. Reklamy starej ceny utworzone przed styczniem na terminy od 1 stycznia 2027 należy wygenerować ponownie według nowej ceny i sprawdzić przed publikacją.', loading: 'Wczytywanie podstawy cenowej …' },
  }[language];
  return <section className="space-y-3 rounded-2xl border border-indigo-200 bg-white p-5">
    <h2 className="font-bold text-indigo-900">{copy.title}</h2>
    <p className="text-sm text-slate-700">{copy.body}</p>
    {contract ? <ProPriceNotice contract={contract} /> : <p role="status" className="text-sm text-slate-600">{copy.loading}</p>}
    <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{copy.warning}</p>
  </section>;
}

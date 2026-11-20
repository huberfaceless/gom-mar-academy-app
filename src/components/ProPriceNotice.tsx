import React from 'react';
import type { ProContract } from '../services/stripePaymentService';
import { proPrice } from '../config/proPricing';
import { useProContract } from '../hooks/useProContract';
import { useLanguage } from '../context/LanguageContext';

export function ProPriceNotice({ contract, existingMember = false, publicPage = false }: { contract: ProContract | null; existingMember?: boolean; publicPage?: boolean }) {
  const { language } = useLanguage();
  if (!contract?.sixMonthContract || !contract.offer) return null;
  const { offer } = contract;
  const amount = proPrice(offer.monthlyCents, language);
  const total = proPrice(offer.minimumTotalCents, language);
  const text = {
    de: {
      title: offer.introductory ? 'Ab 1. Jänner 2027: PRO für 49,90 € monatlich' : 'GOM-MAR Academy PRO für 49,90 € monatlich',
      body: offer.introductory ? 'Starte deinen PRO-Checkout bis 31. Dezember 2026, 23:59 Uhr (Wien), noch für 29,90 € monatlich. Deinen vereinbarten Monatspreis behältst du bei durchgehend bestehendem, kostenpflichtigem PRO-Abo.' : 'Für neue PRO-Abschlüsse gilt der neue Preis. Bestehende 29,90-€-Abos behalten ihren Preis bei durchgehendem Fortbestand. Nach Vertragsende und späterem Wiedereinstieg gilt der dann aktuelle Preis.',
      detail: `Monatlicher Gesamtpreis: ${amount} · 6 Monate Mindestlaufzeit · Mindestgesamtpreis: ${total}.`,
      quote: 'Ein im Dezember gestarteter Stripe-Checkout bleibt 31 Minuten gültig, auch über Mitternacht hinaus. Eine kostenlose Registrierung allein sichert den Preis nicht. Bei nicht abgeschlossenem Checkout ist eine neue Buchung zum dann aktuellen Preis erforderlich.',
      member: 'Die vereinbarten Preise laufender Abos bleiben bestehen. Eine vorgemerkte Kündigung beendet den Preisbestandsschutz erst mit dem tatsächlichen Vertragsende.',
      cta: 'Jetzt kostenlos kennenlernen', terms: 'Vertragsbedingungen und Preisgarantie',
    },
    en: {
      title: offer.introductory ? 'From 1 January 2027: PRO for €49.90 per month' : 'GOM-MAR Academy PRO for €49.90 per month',
      body: offer.introductory ? 'Start your PRO checkout by 31 December 2026, 23:59 Vienna time, for €29.90 per month. Keep your agreed monthly price while your paid PRO subscription continues without interruption.' : 'The new price applies to new PRO subscriptions. Existing €29.90 subscriptions keep their price while continuing without interruption. After the contract ends, a later new subscription uses the price then in effect.',
      detail: `Monthly total: ${amount} · 6-month minimum term · Minimum total: ${total}.`,
      quote: 'A Stripe checkout started in December remains valid for 31 minutes, including across midnight. Free registration alone does not secure the price. An unfinished checkout must be restarted at the price then in effect.',
      member: 'Agreed prices for ongoing subscriptions remain unchanged. Scheduling cancellation ends price protection only when the contract actually ends.',
      cta: 'Explore for free', terms: 'Contract terms and price protection',
    },
    pl: {
      title: offer.introductory ? 'Od 1 stycznia 2027: PRO za 49,90 € miesięcznie' : 'GOM-MAR Academy PRO za 49,90 € miesięcznie',
      body: offer.introductory ? 'Rozpocznij zakup PRO do 31 grudnia 2026, godz. 23:59 czasu wiedeńskiego, za 29,90 € miesięcznie. Zachowasz uzgodnioną cenę przy nieprzerwanej, płatnej subskrypcji PRO.' : 'Nowa cena dotyczy nowych subskrypcji PRO. Istniejące subskrypcje za 29,90 € zachowują cenę przy nieprzerwanym trwaniu. Po zakończeniu umowy ponowny zakup odbywa się po aktualnej cenie.',
      detail: `Cena całkowita miesięcznie: ${amount} · Minimum 6 miesięcy · Minimalna cena całkowita: ${total}.`,
      quote: 'Zakup w Stripe rozpoczęty w grudniu jest ważny przez 31 minut, także po północy. Bezpłatna rejestracja nie zabezpiecza ceny. Niedokończony zakup wymaga ponownego rozpoczęcia po aktualnej cenie.',
      member: 'Uzgodnione ceny trwających subskrypcji pozostają bez zmian. Zlecone wypowiedzenie kończy ochronę ceny dopiero z rzeczywistym zakończeniem umowy.',
      cta: 'Poznaj bezpłatnie', terms: 'Warunki umowy i ochrona ceny',
    },
  }[language];
  return <aside className="space-y-3 rounded-2xl border border-indigo-300 bg-indigo-50 p-5 text-left text-slate-900">
    <h2 className="text-lg font-bold">{existingMember ? ({ de: 'Dein laufender PRO-Vertrag', en: 'Your ongoing PRO subscription', pl: 'Twoja trwająca subskrypcja PRO' })[language] : text.title}</h2>
    <p className="text-sm">{existingMember ? text.member : text.body}</p>
    {!existingMember && <p className="text-sm font-semibold">{text.detail}</p>}
    {offer.introductory && !existingMember && <p className="text-xs text-slate-600">{text.quote}</p>}
    {publicPage && <a href="#register-form" className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 font-bold text-white">{text.cta}</a>}
    <a href="/terms/" className="block text-xs underline">{text.terms}</a>
  </aside>;
}
export function PublicProPriceNotice() {
  const contract = useProContract();
  return <ProPriceNotice contract={contract} publicPage />;
}

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Cookie,
  FileText,
  Building,
  GraduationCap,
  ChevronUp,
} from 'lucide-react';
import gommarLogo from '../assets/images/gommar_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { LegalDocType } from './LegalModal';

const footerCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    mission: 'Eine Lernplattform für den strukturierten Aufbau digitaler Fähigkeiten, Online-Marketing und automatisierte Arbeitsabläufe.',
    privacyBadge: 'Transparente Datenschutzinformationen',
    securityBadge: 'HTTPS-verschlüsselte Verbindung',
    areas: 'Academy-Bereiche',
    curriculum: 'Schritt-für-Schritt-Lehrplan',
    email: 'E-Mail-Marketing & Funnels',
    toolbox: 'GOM-MAR Toolbox & Vorlagen',
    mentor: 'KI-Mentor „Frag GOM-MAR“',
    legal: 'Rechtliches & Richtlinien',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    privacyShort: 'Datenschutz',
    cookies: 'Cookie-Richtlinie & Einstellungen',
    cookiesShort: 'Cookies',
    privacyNote: 'Informationen zur Verarbeitung und zum Schutz personenbezogener Daten findest du in der Datenschutzerklärung.',
    rights: 'Alle Rechte vorbehalten.',
    scrollTop: 'Nach oben scrollen',
  },
  en: {
    mission: 'A learning platform for building digital skills, online marketing knowledge, and automated workflows in a structured way.',
    privacyBadge: 'Transparent privacy information',
    securityBadge: 'HTTPS-encrypted connection',
    areas: 'Academy sections',
    curriculum: 'Step-by-step curriculum',
    email: 'Email marketing & funnels',
    toolbox: 'GOM-MAR Toolbox & templates',
    mentor: '“Ask GOM-MAR” AI mentor',
    legal: 'Legal information & policies',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
    privacyShort: 'Privacy',
    cookies: 'Cookie policy & settings',
    cookiesShort: 'Cookies',
    privacyNote: 'See the privacy policy for information about how personal data is processed and protected.',
    rights: 'All rights reserved.',
    scrollTop: 'Scroll to top',
  },
  pl: {
    mission: 'Platforma edukacyjna do uporządkowanego rozwijania umiejętności cyfrowych, wiedzy o marketingu online i automatyzacji pracy.',
    privacyBadge: 'Przejrzyste informacje o prywatności',
    securityBadge: 'Połączenie szyfrowane przez HTTPS',
    areas: 'Obszary Academy',
    curriculum: 'Program krok po kroku',
    email: 'E-mail marketing i lejki',
    toolbox: 'GOM-MAR Toolbox i szablony',
    mentor: 'Mentor AI „Zapytaj GOM-MAR”',
    legal: 'Informacje prawne i zasady',
    imprint: 'Nota prawna',
    privacy: 'Polityka prywatności',
    privacyShort: 'Prywatność',
    cookies: 'Polityka plików cookie i ustawienia',
    cookiesShort: 'Cookies',
    privacyNote: 'Informacje o przetwarzaniu i ochronie danych osobowych znajdziesz w polityce prywatności.',
    rights: 'Wszelkie prawa zastrzeżone.',
    scrollTop: 'Przewiń na górę',
  },
};

interface FooterProps {
  theme?: string;
  onOpenLegal: (docType: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme = 'clean-light',
  onOpenLegal,
}) => {
  const { language } = useLanguage();
  const copy = footerCopy[language];
  const isLight = theme === 'clean-light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`mt-auto w-full border-t transition-colors ${
      isLight
        ? 'bg-slate-900 border-slate-800 text-slate-400'
        : 'bg-slate-950 border-slate-800/80 text-slate-400'
    } pt-10 pb-20 md:pb-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={gommarLogo}
                alt="GOM-MAR Academy"
                className="w-8 h-8 rounded-xl object-contain shadow-sm ring-1 ring-white/10"
              />
              <span className="text-base font-black tracking-tight text-white">
                GOM-MAR <span className="text-indigo-400">Academy</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {copy.mission}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {copy.privacyBadge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
                <Lock className="w-3 h-3 text-amber-400" />
                {copy.securityBadge}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              {copy.areas}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  {copy.curriculum}
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">
                  {copy.email}
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">
                  {copy.toolbox}
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">
                  {copy.mentor}
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              {copy.legal}
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={() => onOpenLegal('imprint')}
                className="text-left text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center gap-2 cursor-pointer group"
              >
                <Building className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
                <span>{copy.imprint}</span>
              </button>

              <button
                onClick={() => onOpenLegal('privacy')}
                className="text-left text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center gap-2 cursor-pointer group"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
                <span>{copy.privacy}</span>
              </button>

              <button
                onClick={() => onOpenLegal('cookies')}
                className="text-left text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center gap-2 cursor-pointer group"
              >
                <Cookie className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
                <span>{copy.cookies}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              {copy.privacyNote}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} GOM-MAR Academy. {copy.rights}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal('imprint')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {copy.imprint}
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {copy.privacyShort}
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {copy.cookiesShort}
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title={copy.scrollTop}
              aria-label={copy.scrollTop}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  X, 
  Check, 
  ExternalLink, 
  Lock, 
  Building, 
  Mail, 
  Globe, 
  CheckCircle2, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

export type LegalDocType = 'imprint' | 'privacy' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc = 'imprint',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);
  
  // Cookie settings state
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });
  const [cookieSaved, setCookieSaved] = useState(false);

  // Sync activeTab when initialDoc changes
  React.useEffect(() => {
    if (initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [initialDoc]);

  if (!isOpen) return null;

  const handleSaveCookiePreferences = () => {
    setCookieSaved(true);
    setTimeout(() => {
      setCookieSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  Rechtliche Angaben
                </span>
                <span className="text-xs text-slate-400 font-semibold">GOM-MAR Academy</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {activeTab === 'imprint' && 'Impressum'}
                {activeTab === 'privacy' && 'Datenschutzerklärung (DSGVO)'}
                {activeTab === 'cookies' && 'Cookie-Richtlinie & Einstellungen'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('imprint')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'imprint'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Impressum</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Datenschutz</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie-Richtlinie</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* ================= 1. IMPRESSUM ================= */}
          {activeTab === 'imprint' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Angaben gemäß § 5 ECG / § 5 TMG / § 25 Mediengesetz</h3>
                <p className="text-slate-600 font-medium">
                  <strong>Stefan Gomolka</strong><br />
                  GOM-MAR Academy • Digitale Bildungsplattform & Marketing-Systeme<br />
                  Tullnerstraße<br />
                  2000 Stockerau<br />
                  Österreich
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1.5">
                  <span className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Kontakt & Support
                  </span>
                  <p className="text-slate-700">
                    <strong>E-Mail:</strong> huber@gomo-marketing.at<br />
                    <strong>Web:</strong> https://gomo-marketing.at
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1.5">
                  <span className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> Vertretungsberechtigt
                  </span>
                  <p className="text-slate-700">
                    <strong>Inhaber & Verantwortlicher für den Inhalt:</strong><br />
                    Stefan Gomolka<br />
                    Tullnerstraße, 2000 Stockerau, Österreich
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">EU-Streitschlichtung & Verbraucherstreitbeilegung</h4>
                <p className="text-slate-600 text-xs">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline ml-1 font-semibold">
                    https://ec.europa.eu/consumers/odr
                  </a>.
                  Unsere E-Mail-Adresse findest du oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Haftung für Inhalte und Links</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG bzw. § 5 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                </p>
              </div>
            </div>
          )}

          {/* ================= 2. DATENSCHUTZ ================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">DSGVO-konforme Datenverarbeitung</h4>
                  <p className="text-emerald-800 text-xs mt-0.5">
                    Wir verarbeiten personenbezogene Daten stets nach den Grundsätzen der europäischen Datenschutz-Grundverordnung (DSGVO) und des österreichischen Datenschutzgesetzes (DSG).
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">1. Verantwortliche Stelle</h4>
                <p className="text-slate-600 text-xs">
                  Verantwortlich für die Datenverarbeitung auf dieser Plattform ist <strong>Stefan Gomolka</strong>, Tullnerstraße, 2000 Stockerau, Österreich (E-Mail: <strong>huber@gomo-marketing.at</strong>).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">2. Erfassung und Speicherung personenbezogener Daten</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>Registrierung & Mitgliedskonto:</strong> Bei Erstellung eines Accounts erfassen wir Name, E-Mail-Adresse und den gewählten Academy-Status (FREE, PRO, VIP).</li>
                  <li><strong>Lernfortschritt & Quizzes:</strong> Um deinen Fortschritt zu speichern und Zertifikate auszustellen, speichern wir abgeschlossene Lektionen und XP-Punkte.</li>
                  <li><strong>E-Mail-Marketing-Modul:</strong> Wenn du Kampagnen oder Test-Mails anlegst, werden diese Entwürfe in deinem persönlichen Speicher abgelegt.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">3. Rechtsgrundlagen der Verarbeitung (Art. 6 DSGVO)</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die Verarbeitung deiner Daten erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragserfüllung und Bereitstellung der Bildungsplattform) sowie <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung bei Newslettern und freiwilligen Aufgaben) und <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse an der Systemsicherheit).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">4. YouTube-Verbindung und YouTube API Services</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die optionale YouTube-Verbindung nutzt die <strong>YouTube API Services</strong> und Google OAuth. Nach deiner ausdrücklichen Zustimmung erhält die GOM-MAR Academy Berechtigungen, Videos in deinem YouTube-Konto hochzuladen und den Sichtbarkeitsstatus eines von der Academy hochgeladenen Videos zum geplanten Zeitpunkt zu ändern.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>Verarbeitete Daten:</strong> Google-/YouTube-Konto-Zuordnung, verschlüsselte OAuth-Zugangsdaten, Verbindungszeitpunkt, YouTube-Video-ID, Videolink, Upload-, Planungs- und Veröffentlichungsstatus.</li>
                  <li><strong>Zweck:</strong> Authentifizierung, Upload als „Nicht gelistet“, zeitgesteuerte Veröffentlichung sowie Anzeige des Veröffentlichungsstatus.</li>
                  <li><strong>Speicherung und Schutz:</strong> OAuth-Aktualisierungstokens werden verschlüsselt und serverseitig gespeichert. Zugangsdaten werden nicht an andere Nutzer oder unbeteiligte Dritte weitergegeben und nicht für Werbung verwendet.</li>
                  <li><strong>Speicherdauer:</strong> Verbindungsdaten werden nur so lange gespeichert, wie sie für die YouTube-Funktion erforderlich sind oder bis du die Verbindung trennst beziehungsweise ihre Löschung verlangst. Gesetzliche Aufbewahrungspflichten bleiben unberührt.</li>
                  <li><strong>Widerruf und Löschung:</strong> Du kannst die Verbindung in der Academy über „Verbindung trennen“ entfernen und den Zugriff zusätzlich in den <a href="https://security.google.com/settings/security/permissions" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Sicherheitseinstellungen deines Google-Kontos</a> widerrufen. Löschanfragen kannst du an <strong>huber@gomo-marketing.at</strong> richten.</li>
                </ul>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die Nutzung und Übertragung von Daten aus Google APIs erfolgt gemäß der <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Google API Services User Data Policy</a>, einschließlich der Anforderungen zur eingeschränkten Nutzung („Limited Use“). Ergänzend gelten die <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">YouTube-Nutzungsbedingungen</a> und die <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Datenschutzerklärung von Google</a>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">5. Pinterest-Verbindung</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die optionale Pinterest-Verbindung nutzt Pinterest OAuth und die Pinterest API. Nach deiner ausdrücklichen Zustimmung kann die Academy deine Boards anzeigen, Boards erstellen und die von dir ausgewählten oder geplanten Pins veröffentlichen.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>Verarbeitete Daten:</strong> verschlüsselte OAuth-Zugangsdaten, Verbindungszeitpunkt, Board- und Pin-Daten sowie Veröffentlichungsstatus.</li>
                  <li><strong>Speicherung:</strong> OAuth-Aktualisierungstokens werden verschlüsselt und serverseitig gespeichert und nicht für Werbung oder Profilbildung verwendet.</li>
                  <li><strong>Widerruf und Löschung:</strong> Du kannst die Verbindung jederzeit über „Verbindung trennen“ entfernen. Löschanfragen kannst du an <strong>huber@gomo-marketing.at</strong> richten.</li>
                </ul>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Ergänzend gelten die <a href="https://policy.pinterest.com/de/terms-of-service" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Pinterest-Nutzungsbedingungen</a> und die <a href="https://policy.pinterest.com/de/privacy-policy" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Pinterest-Datenschutzerklärung</a>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">6. Deine Rechte als Betroffener</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Du hast jederzeit das Recht auf <strong>Auskunft (Art. 15 DSGVO)</strong>, <strong>Berichtigung (Art. 16 DSGVO)</strong>, <strong>Löschung (Art. 17 DSGVO)</strong>, Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht auf <strong>Widerspruch (Art. 21 DSGVO)</strong>. Kontaktiere uns dazu einfach unter <strong>huber@gomo-marketing.at</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ================= 3. COOKIE-RICHTLINIE & EINSTELLUNGEN ================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-500" />
                  Cookie-Richtlinie & Präferenzen
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Wir setzen Cookies und lokale Speichertechnologien ein, um dir ein optimales Lernerlebnis zu ermöglichen, Lektionsfortschritte zu sichern und unsere Plattform kontinuierlich zu verbessern.
                </p>
              </div>

              {/* Cookie Categories Selector */}
              <div className="space-y-3 pt-2">
                
                {/* 1. Essential */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Technisch notwendige Cookies</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">Immer aktiv</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Erforderlich für Authentifizierung, Sitzungsspeicherung, Admin-PIN-Gate und das Abspeichern deines Lernfortschritts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 rounded accent-indigo-600 cursor-not-allowed shrink-0 mt-1"
                  />
                </div>

                {/* 2. Functional */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Funktionale Cookies & Komfort</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Speichern deine Theme-Einstellungen (Hell/Dunkel), Videoplayer-Präferenzen und Notizblock-Zustände.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.functional}
                    onChange={(e) => setCookiePreferences({ ...cookiePreferences, functional: e.target.checked })}
                    className="w-5 h-5 rounded accent-indigo-600 cursor-pointer shrink-0 mt-1"
                  />
                </div>

                {/* 3. Analytics */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Analyse & Performance (Anonymisiert)</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Hilft uns zu verstehen, welche Lektionen besonders gut verständlich sind und wo Teilnehmer Unterstützung benötigen.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) => setCookiePreferences({ ...cookiePreferences, analytics: e.target.checked })}
                    className="w-5 h-5 rounded accent-indigo-600 cursor-pointer shrink-0 mt-1"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <span className="text-xs text-slate-500">
                  Deine Einstellungen werden lokal gespeichert und können jederzeit geändert werden.
                </span>

                <button
                  onClick={handleSaveCookiePreferences}
                  disabled={cookieSaved}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {cookieSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Einstellungen gespeichert!</span>
                    </>
                  ) : (
                    <>
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Einstellungen speichern</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bottom Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Stand: September 2026 • GOM-MAR Academy
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};

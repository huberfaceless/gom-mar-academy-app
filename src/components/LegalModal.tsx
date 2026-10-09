import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  X, 
  Building, 
  Mail
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
  
  // Sync activeTab when initialDoc changes
  React.useEffect(() => {
    if (initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [initialDoc]);

  if (!isOpen) return null;

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
                {activeTab === 'cookies' && 'Cookies & lokaler Speicher'}
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
            <span>Cookies & Speicher</span>
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
                  GomMar • GOM-MAR Academy • Digitale Bildungsplattform & Marketing-Systeme<br />
                  Hammerskjoeldgasse 1<br />
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
                    Stefan Gomolka (GomMar)<br />
                    Hammerskjoeldgasse 1, 2000 Stockerau, Österreich
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Verbraucherstreitbeilegung</h4>
                <p className="text-slate-600 text-xs">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
                  Verantwortlich für die Datenverarbeitung auf dieser Plattform ist <strong>Stefan Gomolka (GomMar)</strong>, Hammerskjoeldgasse 1, 2000 Stockerau, Österreich (E-Mail: <strong>huber@gomo-marketing.at</strong>).
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
                <h4 className="font-bold text-slate-900 text-sm">Zahlung, Aboverwaltung und Widerruf</h4>
                <p className="text-slate-600 text-xs">E-Mail, Mitgliedskennung, Tarif und Vertragsfassung werden für kostenpflichtige Mitgliedschaften an Stripe übermittelt. Die Academy speichert Kunden-, Checkout- und Abokennungen, Vertragsannahme und Kündigungsstatus. Für bestehende Managed-Payments-Abos erfolgt der Verkauf über Link; bei neuen Standard-Billing-Verträgen ist GomMar der Verkäufer. Rechtsgrundlagen sind Vertragserfüllung und gesetzliche Pflichten (Art. 6 Abs. 1 lit. b und c DSGVO).</p>
                <p className="text-slate-600 text-xs">Widerrufserklärungen mit Name, E-Mail, Vertragsangaben und Eingangszeitpunkt werden serverseitig in Firebase/Google Cloud gespeichert. Bestätigungen werden über Twilio SendGrid versandt. Diese Vertragsnachrichten erfordern keine Marketingeinwilligung. Weitere Angaben stehen in der <a href="/privacy/" className="underline text-indigo-600">öffentlichen Datenschutzerklärung</a>.</p>
                <a href="/withdrawal/" className="inline-block rounded-lg bg-indigo-600 px-3 py-2 font-semibold text-white">Vertrag widerrufen</a>
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
                <h4 className="font-bold text-slate-900 text-sm">6. Instagram-Verbindung</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die optionale Instagram-Verbindung nutzt Instagram Business Login und die Instagram API von Meta. Nach deiner ausdrücklichen Zustimmung kann die Academy von dir geprüfte Grafiken und Beschreibungen in deinem professionellen Instagram-Konto veröffentlichen.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>Verarbeitete Daten:</strong> Instagram-Konto-ID, Benutzername, Kontotyp, verschlüsselte OAuth-Zugangsdaten, Verbindungszeitpunkt sowie die von dir zur Veröffentlichung ausgewählten Medien und Texte.</li>
                  <li><strong>Speicherung und Schutz:</strong> Zugriffstokens werden verschlüsselt und serverseitig gespeichert, automatisch erneuert und nicht für Werbung oder Profilbildung verwendet.</li>
                  <li><strong>Widerruf und Löschung:</strong> Du kannst die Verbindung jederzeit über „Verbindung trennen“ entfernen. Löschanfragen kannst du an <strong>huber@gomo-marketing.at</strong> richten.</li>
                </ul>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Ergänzend gelten die <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Datenschutzrichtlinie von Instagram</a> und die <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-semibold">Bedingungen von Meta</a>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">7. Deine Rechte als Betroffener</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Du hast jederzeit das Recht auf <strong>Auskunft (Art. 15 DSGVO)</strong>, <strong>Berichtigung (Art. 16 DSGVO)</strong>, <strong>Löschung (Art. 17 DSGVO)</strong>, Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht auf <strong>Widerspruch (Art. 21 DSGVO)</strong>. Kontaktiere uns dazu einfach unter <strong>huber@gomo-marketing.at</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ================= 3. COOKIES UND LOKALER SPEICHER ================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900 text-base">Cookies & lokaler Speicher</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die Academy verwendet Browser-Speicher für die Anmeldung und für lokal gespeicherte Einstellungen, Projekte und Inhaltsentwürfe. Nicht alle diese Daten sind Cookies; je nach Funktion kommen auch andere Speichertechnologien zum Einsatz.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Anmeldung und gespeicherte Inhalte</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Die Speicherung unterstützt deine Anmeldung und das Wiederherstellen deiner Arbeit. Wenn du Website-Daten im Browser löschst, kann eine erneute Anmeldung erforderlich sein. Nur lokal gespeicherte, noch nicht synchronisierte Entwürfe können dabei verloren gehen.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Keine Auswahl wird hier gespeichert</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Dieser Bereich informiert über die Speicherung. Er enthält keine Schalter für Analyse- oder Marketingdienste und erteilt keine Einwilligung. Angaben zu verbundenen Plattformen und zur Verarbeitung personenbezogener Daten findest du in der Datenschutzerklärung.
                </p>
                <button type="button" onClick={() => setActiveTab('privacy')} className="text-xs font-bold text-indigo-700 underline">Datenschutzerklärung öffnen</button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Deine Einwilligung für Marketing-E-Mails kannst du separat im Profil verwalten oder über den Abmeldelink in einer Marketing-E-Mail widerrufen.
              </p>
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

import React, { useState } from 'react';
import { PromptTemplate } from '../types';
import { PROMPT_LIBRARY } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { 
  Wrench, 
  Sparkles, 
  FileText, 
  Mail, 
  Layout, 
  ShoppingBag, 
  Copy, 
  Check, 
  Bot, 
  Loader2, 
} from 'lucide-react';

const toolboxCopy = {
  de: {
    badge: 'GOM-MAR KI-Werkzeuge', title: '🧰 Die GOM-MAR Toolbox', description: 'Spezialisierte KI-Generatoren und geprüfte KI-Prompts, um Landingpages, E-Mails und Social-Media-Beiträge zu erstellen.', toolsTab: '🛠️ KI-Generatoren', promptsTab: '📖 Prompt-Bibliothek', chooseTool: 'Wähle ein KI-Werkzeug:', generator: 'GOM-MAR KI-Generator',
    contentTitle: 'Content-Generator', contentDesc: 'Facebook-Beitrag, Instagram-Beitrag, Pinterest-Pin, Reel-Idee', emailTitle: 'E-Mail-Generator', emailDesc: 'Willkommensmail, Follow-up, Verkaufs-E-Mail', landingTitle: 'Landingpage-Assistent', landingDesc: 'Überschrift, Vorteile, Handlungsaufforderung', affiliateTitle: 'Affiliate-Assistent', affiliateDesc: 'Angebot, Zielgruppe und Werbebotschaft analysieren',
    socialFormat: 'Social-Media-Format:', facebook: 'Facebook-Beitrag (Gruppen und Profil)', instagram: 'Instagram-Beitrag / Bildunterschrift', pinterest: 'Pinterest-Pin-Idee und Beschreibung', reel: 'Reel-/Short-Skript (15–30 Sek.)', emailType: 'E-Mail-Typ:', welcome: 'E-Mail 1: Willkommen und Lead-Magnet-Download', followup: 'E-Mail 2/3: Storytelling und Problemlösung', sales: 'E-Mail 4/5: Verkaufsargument und Angebot', topic: 'Thema / Hauptaussage:', topicPlaceholder: 'z. B. Wie du dir in 30 Minuten täglich dein erstes Online-Nebeneinkommen aufbaust', niche: 'Deine Nische:', audience: 'Deine Zielgruppe:', generating: 'KI generiert den Inhalt...', generate: 'Inhalt jetzt generieren →', result: 'Generiertes Ergebnis:', copied: 'Kopiert!', copy: 'Text kopieren', usePrompt: 'In Frag GOM-MAR nutzen →',
    all: 'Alle', categoryNiche: 'Nische', categoryContent: 'Content', categoryEmail: 'E-Mail', categoryLanding: 'Landingpage', categoryMindset: 'Mindset', generationError: 'Fehler beim Generieren. Bitte versuche es erneut.', connectionError: 'Ein Verbindungsfehler ist aufgetreten.', defaultTopic: 'Online-Nebeneinkommen ohne Vorkenntnisse', defaultAudience: 'Angestellte auf der Suche nach zeitlicher Freiheit', defaultNiche: 'Online-Nebeneinkommen', defaultOffer: 'GOM-MAR Starter-System',
  },
  en: {
    badge: 'GOM-MAR AI tools', title: '🧰 The GOM-MAR Toolbox', description: 'Specialised AI generators and reviewed AI prompts for creating landing pages, emails, and social media posts.', toolsTab: '🛠️ AI generators', promptsTab: '📖 Prompt library', chooseTool: 'Choose an AI tool:', generator: 'GOM-MAR AI generator',
    contentTitle: 'Content generator', contentDesc: 'Facebook post, Instagram post, Pinterest pin, reel idea', emailTitle: 'Email generator', emailDesc: 'Welcome email, follow-up, sales email', landingTitle: 'Landing page assistant', landingDesc: 'Headline, benefits, call to action', affiliateTitle: 'Affiliate assistant', affiliateDesc: 'Analyse the offer, audience, and promotional message',
    socialFormat: 'Social media format:', facebook: 'Facebook post (groups and profile)', instagram: 'Instagram post / caption', pinterest: 'Pinterest pin idea and description', reel: 'Reel / short script (15–30 sec.)', emailType: 'Email type:', welcome: 'Email 1: Welcome and lead magnet download', followup: 'Email 2/3: Storytelling and problem solving', sales: 'Email 4/5: Sales pitch and offer', topic: 'Topic / key message:', topicPlaceholder: 'e.g. How to build your first online side income in 30 minutes a day', niche: 'Your niche:', audience: 'Your target audience:', generating: 'AI is generating the content...', generate: 'Generate content now →', result: 'Generated result:', copied: 'Copied!', copy: 'Copy text', usePrompt: 'Use in Ask GOM-MAR →',
    all: 'All', categoryNiche: 'Niche', categoryContent: 'Content', categoryEmail: 'Email', categoryLanding: 'Landing page', categoryMindset: 'Mindset', generationError: 'The content could not be generated. Please try again.', connectionError: 'A connection error occurred.', defaultTopic: 'Online side income without prior experience', defaultAudience: 'Employees seeking more control over their time', defaultNiche: 'Online side income', defaultOffer: 'GOM-MAR Starter System',
  },
  pl: {
    badge: 'Narzędzia AI GOM-MAR', title: '🧰 Narzędzia GOM-MAR', description: 'Specjalistyczne generatory AI i sprawdzone prompty do tworzenia stron docelowych, e-maili oraz postów w mediach społecznościowych.', toolsTab: '🛠️ Generatory AI', promptsTab: '📖 Biblioteka promptów', chooseTool: 'Wybierz narzędzie AI:', generator: 'Generator AI GOM-MAR',
    contentTitle: 'Generator treści', contentDesc: 'Post na Facebooku i Instagramie, pin na Pinterest, pomysł na rolkę', emailTitle: 'Generator e-maili', emailDesc: 'E-mail powitalny, follow-up, e-mail sprzedażowy', landingTitle: 'Asystent strony docelowej', landingDesc: 'Nagłówek, korzyści, wezwanie do działania', affiliateTitle: 'Asystent afiliacyjny', affiliateDesc: 'Analiza oferty, grupy docelowej i przekazu reklamowego',
    socialFormat: 'Format mediów społecznościowych:', facebook: 'Post na Facebooku (grupy i profil)', instagram: 'Post na Instagramie / opis', pinterest: 'Pomysł i opis pina na Pinterest', reel: 'Skrypt rolki / shorta (15–30 sek.)', emailType: 'Typ e-maila:', welcome: 'E-mail 1: Powitanie i pobranie lead magnetu', followup: 'E-mail 2/3: Storytelling i rozwiązanie problemu', sales: 'E-mail 4/5: Argument sprzedażowy i oferta', topic: 'Temat / główny przekaz:', topicPlaceholder: 'np. Jak zbudować pierwszy dodatkowy dochód online w 30 minut dziennie', niche: 'Twoja nisza:', audience: 'Twoja grupa docelowa:', generating: 'AI generuje treść...', generate: 'Wygeneruj treść →', result: 'Wygenerowany wynik:', copied: 'Skopiowano!', copy: 'Kopiuj tekst', usePrompt: 'Użyj w Zapytaj GOM-MAR →',
    all: 'Wszystkie', categoryNiche: 'Nisza', categoryContent: 'Treści', categoryEmail: 'E-mail', categoryLanding: 'Strona docelowa', categoryMindset: 'Mindset', generationError: 'Nie udało się wygenerować treści. Spróbuj ponownie.', connectionError: 'Wystąpił błąd połączenia.', defaultTopic: 'Dodatkowy dochód online bez doświadczenia', defaultAudience: 'Pracownicy szukający większej swobody czasu', defaultNiche: 'Dodatkowy dochód online', defaultOffer: 'System startowy GOM-MAR',
  },
} satisfies Record<LanguageCode, Record<string, string>>;

const promptCopy: Record<LanguageCode, Record<string, Pick<PromptTemplate, 'title' | 'description' | 'prompt'>>> = {
  de: {
    p1: { title: 'Nischen-Profitabilitätsanalyse', description: 'Analysiere eine Nische auf Kaufkraft, Probleme und Eignung für Affiliate-Marketing.', prompt: 'Ich möchte im Markt für [NISCHE] starten. Analysiere drei konkrete Probleme dieser Zielgruppe, für deren Lösung sie bereit ist, Geld auszugeben. Nenne drei passende Produktideen, die ich als Affiliate prüfen kann.' },
    p2: { title: 'Facebook-Mehrwertbeitrag', description: 'Erstelle einen hilfreichen Story-Beitrag für Facebook-Gruppen, der Interesse weckt.', prompt: 'Schreibe einen Facebook-Gruppenbeitrag zum Thema [THEMA]. Nutze diese Struktur: Hook, kurze persönliche Geschichte, drei konkrete Tipps und eine sachliche Handlungsaufforderung. Tonfall: ehrlich, hilfreich und nahbar.' },
    p3: { title: 'Storytelling-Follow-up-E-Mail', description: 'Erstelle eine vertrauensbildende E-Mail mit einem klaren nächsten Schritt.', prompt: 'Schreibe eine E-Mail für meine Liste in der Nische [NISCHE]. Sie soll Vertrauen aufbauen und sachlich auf das Produkt [PRODUKTNAME] hinführen. Erzähle eine kurze Geschichte über [PROBLEM/AHA-MOMENT] und ende mit einem klar gekennzeichneten Link.' },
    p4: { title: 'Landingpage-Überschriften', description: 'Erstelle fünf klare Überschriften nach der Formel „Wie du X ohne Y“.', prompt: 'Erstelle fünf verständliche Überschriften für eine Lead-Landingpage. Mein Angebot ist ein kostenloser Guide zum Thema [THEMA]. Verwende die Struktur: „Wie du [WUNSCHERGEBNIS] erreichst, ohne [HÄUFIGES HINDERNIS]“.' },
    p5: { title: '30-Tage-Umsetzungsfokus', description: 'Reduziere Grübeln und bestimme drei überschaubare Tagesaufgaben.', prompt: 'Ich bin bei Lektion [LEKTION] der GOM-MAR Academy. Mein Ziel ist [ZIEL]. Nenne genau drei überschaubare Aufgaben für heute, die jeweils sicher und realistisch in insgesamt höchstens 30 Minuten begonnen werden können.' },
  },
  en: {
    p1: { title: 'Niche profitability analysis', description: 'Analyse a niche for purchasing power, customer problems, and affiliate suitability.', prompt: 'I want to enter the [NICHE] market. Analyse three specific problems this audience may pay to solve. Suggest three relevant product ideas I could evaluate as an affiliate.' },
    p2: { title: 'Facebook value-post generator', description: 'Create a useful story-led post for Facebook groups that builds interest.', prompt: 'Write a Facebook group post about [TOPIC]. Use this structure: hook, short personal story, three practical tips, and a factual call to action. Tone: honest, helpful, and approachable.' },
    p3: { title: 'Storytelling follow-up email', description: 'Create a trust-building email with a clear next step.', prompt: 'Write an email for my list in the [NICHE] niche. Build trust and introduce [PRODUCT NAME] factually. Tell a short story about [PROBLEM/AHA MOMENT] and finish with a clearly labelled link.' },
    p4: { title: 'Landing page headline generator', description: 'Create five clear headlines using the “How to X without Y” structure.', prompt: 'Create five clear headlines for a lead-generation landing page. My offer is a free guide about [TOPIC]. Use this structure: “How to achieve [DESIRED RESULT] without [COMMON OBSTACLE]”.' },
    p5: { title: '30-day action focus', description: 'Reduce overthinking and identify three manageable daily tasks.', prompt: 'I am currently on Lesson [LESSON] in the GOM-MAR Academy. My goal is [GOAL]. Give me exactly three manageable tasks for today that I can safely and realistically begin within 30 minutes in total.' },
  },
  pl: {
    p1: { title: 'Analiza rentowności niszy', description: 'Przeanalizuj niszę pod kątem siły nabywczej, problemów klientów i przydatności w afiliacji.', prompt: 'Chcę wejść na rynek [NISZA]. Przeanalizuj trzy konkretne problemy tej grupy, za których rozwiązanie może być gotowa zapłacić. Zaproponuj trzy odpowiednie produkty, które mogę ocenić jako afiliant.' },
    p2: { title: 'Generator wartościowego posta na Facebooku', description: 'Utwórz pomocny post oparty na historii, który wzbudzi zainteresowanie w grupie na Facebooku.', prompt: 'Napisz post do grupy na Facebooku na temat [TEMAT]. Zastosuj strukturę: hook, krótka osobista historia, trzy praktyczne wskazówki i rzeczowe wezwanie do działania. Ton: szczery, pomocny i przystępny.' },
    p3: { title: 'Storytellingowy e-mail follow-up', description: 'Utwórz e-mail budujący zaufanie i wskazujący jasny następny krok.', prompt: 'Napisz e-mail do mojej listy w niszy [NISZA]. Zbuduj zaufanie i rzeczowo przedstaw produkt [NAZWA PRODUKTU]. Opowiedz krótką historię o [PROBLEMIE/MOMENCIE AHA] i zakończ wyraźnie oznaczonym linkiem.' },
    p4: { title: 'Generator nagłówków strony docelowej', description: 'Utwórz pięć jasnych nagłówków według schematu „Jak osiągnąć X bez Y”.', prompt: 'Utwórz pięć jasnych nagłówków dla strony pozyskującej leady. Oferuję bezpłatny poradnik na temat [TEMAT]. Użyj schematu: „Jak osiągnąć [POŻĄDANY REZULTAT] bez [CZĘSTEJ PRZESZKODY]”.' },
    p5: { title: '30-dniowy plan działania', description: 'Ogranicz nadmierne analizowanie i wybierz trzy wykonalne zadania na dziś.', prompt: 'Jestem przy lekcji [LEKCJA] w GOM-MAR Academy. Mój cel to [CEL]. Podaj dokładnie trzy niewielkie zadania na dziś, które mogę bezpiecznie i realistycznie rozpocząć łącznie w ciągu 30 minut.' },
  },
};

interface ToolboxViewProps {
  initialCategory?: string;
  onOpenFragGommar: (prompt?: string) => void;
}

export const ToolboxView: React.FC<ToolboxViewProps> = ({
  initialCategory = 'content',
  onOpenFragGommar,
}) => {
  const { language } = useLanguage();
  const copy = toolboxCopy[language];
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts'>('tools');
  const [selectedTool, setSelectedTool] = useState<string>(initialCategory || 'content');

  // Input states for AI generation
  const [topicInput, setTopicInput] = useState<string>('');
  const [targetAudienceInput, setTargetAudienceInput] = useState<string>(copy.defaultAudience);
  const [nicheInput, setNicheInput] = useState<string>(copy.defaultNiche);
  const [offerInput] = useState<string>(copy.defaultOffer);
  const [formatInput, setFormatInput] = useState<string>('Facebook');

  // AI Output state
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [promptCategoryFilter, setPromptCategoryFilter] = useState<'Alle' | PromptTemplate['category']>('Alle');

  const toolsList = [
    { id: 'content', title: copy.contentTitle, icon: FileText, desc: copy.contentDesc },
    { id: 'email', title: copy.emailTitle, icon: Mail, desc: copy.emailDesc },
    { id: 'landingpage', title: copy.landingTitle, icon: Layout, desc: copy.landingDesc },
    { id: 'affiliate', title: copy.affiliateTitle, icon: ShoppingBag, desc: copy.affiliateDesc },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedResult('');
    try {
      const response = await fetch('/api/toolbox/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: selectedTool,
          format: formatInput,
          topic: topicInput || copy.defaultTopic,
          targetAudience: targetAudienceInput,
          niche: nicheInput,
          offer: offerInput,
          language,
        }),
      });

      const data = await response.json();
      if (data.result) {
        setGeneratedResult(data.result);
      } else {
        setGeneratedResult(copy.generationError);
      }
    } catch (err) {
      console.error(err);
      setGeneratedResult(copy.connectionError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const filteredPrompts = promptCategoryFilter === 'Alle'
    ? PROMPT_LIBRARY
    : PROMPT_LIBRARY.filter((p) => p.category === promptCategoryFilter);

  const promptCategories: Array<{ value: 'Alle' | PromptTemplate['category']; label: string }> = [
    { value: 'Alle', label: copy.all },
    { value: 'Nische', label: copy.categoryNiche },
    { value: 'Content', label: copy.categoryContent },
    { value: 'E-Mail', label: copy.categoryEmail },
    { value: 'Landingpage', label: copy.categoryLanding },
    { value: 'Mindset', label: copy.categoryMindset },
  ];

  const categoryLabels: Record<PromptTemplate['category'], string> = {
    Nische: copy.categoryNiche,
    Content: copy.categoryContent,
    'E-Mail': copy.categoryEmail,
    Landingpage: copy.categoryLanding,
    Mindset: copy.categoryMindset,
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5 text-indigo-600" />
            {copy.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{copy.title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            {copy.description}
          </p>
        </div>

        {/* Tab Toggle: KI Tools vs Prompt Library */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>{copy.toolsTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prompts'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>{copy.promptsTab}</span>
          </button>
        </div>
      </div>

      {activeTab === 'tools' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tool Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-[80px] lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              {copy.chooseTool}
            </p>
            <div className="space-y-2">
              {toolsList.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{tool.title}</p>
                        <p className="text-[11px] text-slate-500">{tool.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generator Input & Result Box (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
                  {copy.generator}
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-0.5">
                  {toolsList.find((t) => t.id === selectedTool)?.title}
                </h3>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                {selectedTool === 'content' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {copy.socialFormat}
                    </label>
                    <select
                      value={formatInput}
                      onChange={(e) => setFormatInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    >
                      <option value="Facebook">{copy.facebook}</option>
                      <option value="Instagram">{copy.instagram}</option>
                      <option value="Pinterest">{copy.pinterest}</option>
                      <option value="Reel">{copy.reel}</option>
                    </select>
                  </div>
                )}

                {selectedTool === 'email' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {copy.emailType}
                    </label>
                    <select
                      value={formatInput}
                      onChange={(e) => setFormatInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    >
                      <option value="Welcome-Mail">{copy.welcome}</option>
                      <option value="Follow-up">{copy.followup}</option>
                      <option value="Verkaufs-Mail">{copy.sales}</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {copy.topic}
                  </label>
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder={copy.topicPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {copy.niche}
                    </label>
                    <input
                      type="text"
                      value={nicheInput}
                      onChange={(e) => setNicheInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {copy.audience}
                    </label>
                    <input
                      type="text"
                      value={targetAudienceInput}
                      onChange={(e) => setTargetAudienceInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{copy.generating}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{copy.generate}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result Preview Box */}
              {generatedResult && (
                <div className="mt-6 space-y-4 pt-6 border-t border-slate-100 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      {copy.result}
                    </span>

                    <button
                      onClick={() => handleCopy(generatedResult)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                    >
                      {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSuccess ? copy.copied : copy.copy}</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                    {generatedResult}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Prompt Library View */
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {promptCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setPromptCategoryFilter(category.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  promptCategoryFilter === category.value
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrompts.map((p) => {
              const localizedPrompt = promptCopy[language][p.id] ?? p;
              return (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                      {categoryLabels[p.category]}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">{localizedPrompt.title}</h4>
                  <p className="text-xs text-slate-600">{localizedPrompt.description}</p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800">
                    "{localizedPrompt.prompt}"
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(localizedPrompt.prompt)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copy.copy}</span>
                  </button>

                  <button
                    onClick={() => onOpenFragGommar(localizedPrompt.prompt)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{copy.usePrompt}</span>
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

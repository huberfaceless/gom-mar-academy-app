import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ChatMessage } from '../types';
import gommarLogo from '../assets/images/gommar_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { authenticatedFetch } from '../services/authenticatedFetch';
import { 
  Bot, 
  Send, 
  X, 
  Loader2, 
  ArrowRight, 
  Lightbulb,
  Copy,
  Check,
  RotateCcw,
  MessageSquarePlus
} from 'lucide-react';

const mentorCopy = {
  de: {
    name: '🤖 Frag GOM-MAR', welcome: 'Hallo {name}! 👋 Ich bin dein KI-Mentor „Frag GOM-MAR“.\n\nIch kenne deinen Lernstand: Du bist gerade bei Etappe {stage}.\n\nWie kann ich dir bei deiner nächsten Aufgabe oder deinem Online-System helfen?', mentor: 'KI-Mentor', guided: 'Geführtes Systemwissen • Etappe {stage}', newChat: 'Neuer Chat', close: 'Frag GOM-MAR schließen', confirmNew: 'Möchtest du den bisherigen Chatverlauf wirklich löschen und einen neuen Chat starten?', retry: 'Erneut versuchen', copyAnswer: 'Antwort kopieren', copied: 'Kopiert', copy: 'Kopieren', thinking: 'GOM-MAR denkt nach...', frequent: 'Häufige Fragen:', placeholder: 'Frage GOM-MAR nach Hilfe zu deinem System...', send: 'Nachricht senden', timeout: 'Die Antwort dauert ungewöhnlich lange. Bitte versuche es erneut.', rateLimit: 'Der KI-Mentor erhält gerade sehr viele Anfragen. Bitte versuche es in einem Moment erneut.', serverError: 'Der KI-Mentor ist vorübergehend nicht erreichbar. Bitte versuche es gleich erneut.', invalidResponse: 'Die Antwort konnte nicht richtig verarbeitet werden. Bitte versuche es erneut.', requestError: 'Die Anfrage konnte nicht gesendet werden. Prüfe deine Verbindung und versuche es erneut.', q1: 'Ich weiß nicht, welche Nische ich wählen soll.', q2: 'Meine Landingpage ist fertig. Was ist der nächste Schritt?', q3: 'Hilf mir, einen Lead-Magneten zu entwickeln.', q4: 'Schreibe eine Betreffzeile für meine Willkommens-E-Mail.',
  },
  en: {
    name: '🤖 Ask GOM-MAR', welcome: 'Hello {name}! 👋 I am your AI mentor, “Ask GOM-MAR”.\n\nI know your learning progress: you are currently on Stage {stage}.\n\nHow can I help with your next task or online system?', mentor: 'AI mentor', guided: 'Guided system knowledge • Stage {stage}', newChat: 'New chat', close: 'Close Ask GOM-MAR', confirmNew: 'Do you really want to delete the current conversation and start a new chat?', retry: 'Try again', copyAnswer: 'Copy answer', copied: 'Copied', copy: 'Copy', thinking: 'GOM-MAR is thinking...', frequent: 'Common questions:', placeholder: 'Ask GOM-MAR for help with your system...', send: 'Send message', timeout: 'The answer is taking unusually long. Please try again.', rateLimit: 'The AI mentor is receiving many requests. Please try again in a moment.', serverError: 'The AI mentor is temporarily unavailable. Please try again shortly.', invalidResponse: 'The answer could not be processed correctly. Please try again.', requestError: 'The request could not be sent. Check your connection and try again.', q1: 'I do not know which niche to choose.', q2: 'My landing page is ready. What is the next step?', q3: 'Help me develop a lead magnet.', q4: 'Write a subject line for my welcome email.',
  },
  pl: {
    name: '🤖 Zapytaj GOM-MAR', welcome: 'Cześć {name}! 👋 Jestem twoim mentorem AI „Zapytaj GOM-MAR”.\n\nZnam twój postęp: jesteś obecnie na etapie {stage}.\n\nJak mogę pomóc w następnym zadaniu lub rozwoju systemu online?', mentor: 'Mentor AI', guided: 'Prowadzenie po systemie • Etap {stage}', newChat: 'Nowy czat', close: 'Zamknij Zapytaj GOM-MAR', confirmNew: 'Czy na pewno chcesz usunąć dotychczasową rozmowę i rozpocząć nowy czat?', retry: 'Spróbuj ponownie', copyAnswer: 'Kopiuj odpowiedź', copied: 'Skopiowano', copy: 'Kopiuj', thinking: 'GOM-MAR przygotowuje odpowiedź...', frequent: 'Częste pytania:', placeholder: 'Zapytaj GOM-MAR o pomoc w swoim systemie...', send: 'Wyślij wiadomość', timeout: 'Odpowiedź trwa wyjątkowo długo. Spróbuj ponownie.', rateLimit: 'Mentor AI otrzymuje teraz wiele zapytań. Spróbuj ponownie za chwilę.', serverError: 'Mentor AI jest chwilowo niedostępny. Spróbuj ponownie za moment.', invalidResponse: 'Nie udało się prawidłowo przetworzyć odpowiedzi. Spróbuj ponownie.', requestError: 'Nie udało się wysłać zapytania. Sprawdź połączenie i spróbuj ponownie.', q1: 'Nie wiem, którą niszę wybrać.', q2: 'Moja strona docelowa jest gotowa. Jaki jest następny krok?', q3: 'Pomóż mi opracować lead magnet.', q4: 'Napisz temat mojego e-maila powitalnego.',
  },
} satisfies Record<LanguageCode, Record<string, string>>;

interface FragGommarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  initialPrompt?: string;
  currentStageTitle?: string;
  currentLessonTitle?: string;
  onNavigate: (view: string, stageId?: number, lessonId?: string) => void;
}

type SuggestedAction = NonNullable<ChatMessage['suggestedAction']>;

const parseSuggestedAction = (value: unknown): SuggestedAction | undefined => {
  if (typeof value !== 'object' || value === null) return undefined;
  const action = value as Partial<SuggestedAction>;
  const allowedViews: SuggestedAction['view'][] = ['academy', 'email', 'toolbox', 'profile'];

  if (
    typeof action.label !== 'string'
    || !action.label.trim()
    || !action.view
    || !allowedViews.includes(action.view)
  ) {
    return undefined;
  }

  return {
    label: action.label.trim(),
    view: action.view,
    ...(typeof action.stageId === 'number' && Number.isInteger(action.stageId)
      ? { stageId: action.stageId }
      : {}),
    ...(typeof action.lessonId === 'string' && action.lessonId.trim()
      ? { lessonId: action.lessonId }
      : {}),
  };
};

const createWelcomeMessage = (
  user: UserProfile,
  language: LanguageCode,
): ChatMessage => ({
  id: `welcome-${Date.now()}`,
  sender: 'gommar',
  text: mentorCopy[language].welcome
    .replace('{name}', user.name)
    .replace('{stage}', String(user.currentStageId)),
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
});

const isStoredChatMessage = (value: unknown): value is ChatMessage => {
  if (typeof value !== 'object' || value === null) return false;
  const message = value as Partial<ChatMessage>;
  return typeof message.id === 'string'
    && (message.sender === 'user' || message.sender === 'gommar')
    && typeof message.text === 'string'
    && typeof message.timestamp === 'string'
    && (message.suggestedAction === undefined || parseSuggestedAction(message.suggestedAction) !== undefined);
};

const renderInlineMarkdown = (text: string): React.ReactNode[] => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-indigo-700">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-950">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
};

const MarkdownMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3);
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += index < lines.length ? 1 : 0;
      blocks.push(
        <pre key={`code-${index}`} className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
          <code className={language ? `language-${language}` : undefined}>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      blocks.push(<hr key={`divider-${index}`} className="border-0 border-t border-slate-200" />);
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingClasses = level === 1
        ? 'text-base font-extrabold text-slate-950'
        : level === 2
          ? 'text-sm font-bold text-slate-950'
          : 'text-xs font-bold uppercase tracking-wide text-slate-700';
      blocks.push(
        <div key={`heading-${index}`} className={headingClasses}>
          {renderInlineMarkdown(headingMatch[2])}
        </div>
      );
      index += 1;
      continue;
    }

    const listMatch = line.match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = Boolean(listMatch[2]);
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = lines[index].match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!itemMatch || Boolean(itemMatch[2]) !== ordered) break;
        items.push(itemMatch[3]);
        index += 1;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(
        <ListTag
          key={`list-${index}`}
          className={`space-y-1 pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="pl-0.5 marker:text-indigo-500">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].startsWith('> ')) {
        quoteLines.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`} className="border-l-4 border-indigo-300 pl-3 italic text-slate-600">
          {quoteLines.map((quoteLine, quoteIndex) => (
            <React.Fragment key={quoteIndex}>
              {quoteIndex > 0 && <br />}
              {renderInlineMarkdown(quoteLine)}
            </React.Fragment>
          ))}
        </blockquote>
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length
      && lines[index].trim()
      && !/^(#{1,3})\s+/.test(lines[index])
      && !/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[index])
      && !lines[index].trim().startsWith('```')
      && !/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(lines[index])
      && !lines[index].startsWith('> ')
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`}>
        {paragraphLines.map((paragraphLine, paragraphIndex) => (
          <React.Fragment key={paragraphIndex}>
            {paragraphIndex > 0 && <br />}
            {renderInlineMarkdown(paragraphLine)}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return <div className="space-y-3">{blocks}</div>;
};

export const FragGommarDrawer: React.FC<FragGommarDrawerProps> = ({
  isOpen,
  onClose,
  user,
  initialPrompt,
  currentStageTitle = '1. Dein Start',
  currentLessonTitle = '1.1 Wie funktioniert Online-Einkommen?',
  onNavigate,
}) => {
  const { language } = useLanguage();
  const copy = mentorCopy[language];
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createWelcomeMessage(user, language),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [failedPrompts, setFailedPrompts] = useState<Record<string, string>>({});
  const [loadedStorageKey, setLoadedStorageKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storageKey = `frag-gommar-chat:${language}:${(user.email || user.name || 'guest').trim().toLowerCase()}`;

  // Quick suggestion chips
  const quickQuestions = [
    copy.q1,
    copy.q2,
    copy.q3,
    copy.q4,
  ];

  useEffect(() => {
    if (initialPrompt && loadedStorageKey === storageKey) {
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt, loadedStorageKey, storageKey]);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (!storedValue) {
        setMessages([createWelcomeMessage(user, language)]);
      } else {
        const parsedValue: unknown = JSON.parse(storedValue);
        if (Array.isArray(parsedValue) && parsedValue.length > 0 && parsedValue.every(isStoredChatMessage)) {
          setMessages(parsedValue);
        } else {
          window.localStorage.removeItem(storageKey);
          setMessages([createWelcomeMessage(user, language)]);
        }
      }
    } catch (err) {
      console.warn('Chatverlauf konnte nicht geladen werden:', err);
      setMessages([createWelcomeMessage(user, language)]);
    } finally {
      setFailedPrompts({});
      setLoadedStorageKey(storageKey);
    }
  }, [language, storageKey]);

  useEffect(() => {
    if (loadedStorageKey !== storageKey) return;

    const persistentMessages = messages
      .filter((message) => !failedPrompts[message.id])
      .slice(-100);

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(persistentMessages));
    } catch (err) {
      console.warn('Chatverlauf konnte nicht gespeichert werden:', err);
    }
  }, [failedPrompts, loadedStorageKey, messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleStartNewChat = () => {
    if (isLoading) return;
    const confirmed = window.confirm(
      copy.confirmNew,
    );
    if (!confirmed) return;

    window.localStorage.removeItem(storageKey);
    setMessages([createWelcomeMessage(user, language)]);
    setFailedPrompts({});
    setCopiedMessageId(null);
    setInputPrompt('');
  };

  const handleSendPrompt = async (customText?: string, retryMessageId?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    if (retryMessageId) {
      setMessages((prev) => prev.filter((message) => message.id !== retryMessageId));
      setFailedPrompts((prev) => {
        const next = { ...prev };
        delete next[retryMessageId];
        return next;
      });
    } else {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
    }
    setInputPrompt('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await authenticatedFetch('/api/ask-gommar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          prompt: textToSend,
          currentStageId: user.currentStageId,
          currentLessonId: user.currentLessonId,
          currentStageTitle,
          currentLessonTitle,
          niche: user.niche,
          targetAudience: user.targetAudience,
          language,
          history: messages
            .filter((message) => message.id !== retryMessageId)
            .slice(-6)
            .map((message) => ({ sender: message.sender, text: message.text })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error('RATE_LIMIT');
        if (response.status >= 500) throw new Error('SERVER_ERROR');
        throw new Error('REQUEST_FAILED');
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch {
        throw new Error('INVALID_RESPONSE');
      }

      const answer = typeof data === 'object'
        && data !== null
        && 'answer' in data
        && typeof data.answer === 'string'
        ? data.answer.trim()
        : '';
      const suggestedAction = typeof data === 'object' && data !== null && 'suggestedAction' in data
        ? parseSuggestedAction(data.suggestedAction)
        : undefined;

      if (!answer) throw new Error('EMPTY_ANSWER');

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gommar',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error asking Frag GOM-MAR:', err);
      const errorCode = err instanceof Error ? err.message : '';
      const errorText = err instanceof DOMException && err.name === 'AbortError'
        ? copy.timeout
        : errorCode === 'RATE_LIMIT'
          ? copy.rateLimit
          : errorCode === 'SERVER_ERROR'
            ? copy.serverError
            : errorCode === 'INVALID_RESPONSE' || errorCode === 'EMPTY_ANSWER'
              ? copy.invalidResponse
              : copy.requestError;
      const errorMessageId = (Date.now() + 1).toString();
      const errorMessage: ChatMessage = {
        id: errorMessageId,
        sender: 'gommar',
        text: errorText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setFailedPrompts((prev) => ({ ...prev, [errorMessageId]: textToSend }));
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };
const handleCopyMessage = async (message: ChatMessage) => {
  try {
    await navigator.clipboard.writeText(message.text);
    setCopiedMessageId(message.id);
    window.setTimeout(() => setCopiedMessageId(null), 2000);
  } catch (err) {
    console.error('Kopieren fehlgeschlagen:', err);
  }
};
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Frag GOM-MAR ${copy.mentor}`}
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Drawer Body */}
      <div className="relative z-10 flex h-[100dvh] w-full max-w-lg flex-col overflow-hidden border-l border-slate-200 bg-white text-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm sm:h-10 sm:w-10 sm:rounded-2xl">
              <img 
                src={gommarLogo} 
                alt="GOM-MAR" 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="whitespace-nowrap text-sm font-extrabold text-slate-950 sm:text-base">{copy.name}</h3>
                <span className="hidden rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700 sm:inline-flex">
                  {copy.mentor}
                </span>
              </div>
              <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                {copy.guided.replace('{stage}', String(user.currentStageId))}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleStartNewChat}
              disabled={isLoading}
              className="inline-flex h-11 w-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-3"
              aria-label={copy.newChat}
              title={copy.newChat}
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span className="hidden text-[11px] font-bold sm:inline">{copy.newChat}</span>
            </button>
            <button
              onClick={onClose}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
              aria-label={copy.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-slate-50/50 px-3 py-4 scroll-pb-4 sm:p-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'gommar' && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs sm:h-8 sm:w-8 sm:rounded-xl">
                  <img 
                    src={gommarLogo} 
                    alt="GOM-MAR" 
                    className="w-full h-full object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className={`max-w-[90%] rounded-2xl p-3 text-sm leading-relaxed space-y-1 sm:max-w-[85%] sm:p-4 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-indigo-600/20'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-line shadow-xs'
              }`}>
                {msg.sender === 'gommar' ? <MarkdownMessage text={msg.text} /> : <p>{msg.text}</p>}
                {msg.sender === 'gommar' && msg.suggestedAction && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(
                        msg.suggestedAction!.view,
                        msg.suggestedAction!.stageId,
                        msg.suggestedAction!.lessonId,
                      );
                      onClose();
                    }}
                    className="mt-3 inline-flex w-full items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-left text-xs font-bold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                )}
                {failedPrompts[msg.id] && (
                  <button
                    type="button"
                    onClick={() => handleSendPrompt(failedPrompts[msg.id], msg.id)}
                    disabled={isLoading}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-[11px] font-bold text-indigo-700 transition-colors hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {copy.retry}
                  </button>
                )}
               <div className="mt-2 flex items-center justify-between gap-3">
  {msg.sender === 'gommar' ? (
    <button
      type="button"
      onClick={() => handleCopyMessage(msg)}
      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
      aria-label={copy.copyAnswer}
    >
      {copiedMessageId === msg.id ? (
        <>
          <Check className="w-3.5 h-3.5" />
          {copy.copied}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {copy.copy}
        </>
      )}
    </button>
  ) : (
    <span />
  )}

  <span className={`block text-[10px] text-right ${
    msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
  }`}>
    {msg.timestamp}
  </span>
</div>
              </div>

              {msg.sender === 'user' && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-slate-700 sm:h-8 sm:w-8 sm:rounded-xl">
                  {user.name.substring(0, 1)}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-slate-700">{copy.thinking}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Chips */}
        <div className="shrink-0 space-y-2 border-t border-slate-200 bg-white px-3 py-2.5 sm:px-6 sm:py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            {copy.frequent}
          </p>
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(q)}
                className="min-h-10 shrink-0 snap-start cursor-pointer whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div
          className="shrink-0 border-t border-slate-200 bg-white px-3 pt-3 sm:px-4 sm:pt-4"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onFocus={() => {
                window.setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 150);
              }}
              placeholder={copy.placeholder}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-600 focus:bg-white focus:outline-none sm:px-4 sm:text-sm"
            />
            <button
              type="submit"
              aria-label={copy.send}
              disabled={isLoading || !inputPrompt.trim()}
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

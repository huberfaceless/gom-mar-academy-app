import { Component, type ReactNode } from 'react';
import { reportBrowserError } from '../services/browserErrorMonitoring';

const copy = {
  de: {
    title: 'Dieser Bereich konnte nicht angezeigt werden.',
    description: 'Bitte lade die Seite neu. Falls das Problem erneut auftritt, versuche es später noch einmal.',
    reload: 'Seite neu laden', home: 'Zur Übersicht',
  },
  en: {
    title: 'This section could not be displayed.',
    description: 'Please reload the page. If the problem happens again, try again later.',
    reload: 'Reload page', home: 'Go to overview',
  },
  pl: {
    title: 'Nie udało się wyświetlić tej sekcji.',
    description: 'Odśwież stronę. Jeśli problem wystąpi ponownie, spróbuj jeszcze raz później.',
    reload: 'Odśwież stronę', home: 'Przejdź do przeglądu',
  },
};

const fallbackLanguage = (): keyof typeof copy => {
  try {
    const language = window.localStorage.getItem('gommar-language') || document.documentElement.lang;
    if (language === 'en' || language === 'pl') return language;
  } catch { /* Recovery must also work when browser storage is blocked. */ }
  return 'de';
};

export class AppErrorBoundary extends Component<{
  children: ReactNode;
  view: string;
  language?: keyof typeof copy;
  onHome?: () => void;
}, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { reportBrowserError('render_error', this.props.view); }

  render() {
    if (!this.state.failed) return this.props.children;
    const language = this.props.language || fallbackLanguage();
    const text = copy[language];
    return (
      <section role="alert" lang={language} className="mx-auto my-8 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
        <h1 className="text-xl font-bold">{text.title}</h1>
        <p className="mt-3 text-sm text-slate-600">{text.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-indigo-700 px-4 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">{text.reload}</button>
          {this.props.onHome ? <button type="button" onClick={() => {
            this.setState({ failed: false });
            this.props.onHome?.();
          }} className="rounded-xl border border-slate-300 px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-indigo-700">{text.home}</button> : null}
        </div>
      </section>
    );
  }
}

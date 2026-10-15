import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import type { CentralContentProject } from '../../types/contentEngine';

interface BlogArticleLibraryProps {
  projects: CentralContentProject[];
  projectName: string;
  selectedId?: string;
  isGenerating: boolean;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export const BlogArticleLibrary: React.FC<BlogArticleLibraryProps> = ({ projects, projectName, selectedId, isGenerating, onSelect, onCreate }) => {
  const articles = projects.filter(project => project.blogArticle)
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  return (
    <section aria-label="Blogartikel im Projekt" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900"><BookOpen className="h-4 w-4 text-emerald-600" />Blogartikel in {projectName} ({articles.length})</h2>
          <p className="mt-1 text-xs text-slate-600">Erstelle weitere Artikel zu eigenen Themen und wähle deine gespeicherten Artikel aus.</p>
        </div>
        <button type="button" onClick={onCreate} disabled={isGenerating}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50">
          <Plus className="h-4 w-4" />{isGenerating ? 'Erstellung läuft…' : 'Neuer Blogartikel'}
        </button>
      </div>
      {articles.length > 0 && (
        <div>
          <label htmlFor="saved-blog-article" className="mb-1 block text-xs font-semibold text-slate-700">Gespeicherten Blogartikel öffnen</label>
          <select id="saved-blog-article" value={articles.some(article => article.id === selectedId) ? selectedId : ''}
            onChange={event => onSelect(event.target.value)} className="w-full min-w-0 rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900">
            <option value="" disabled>Artikel auswählen</option>
            {articles.map(project => <option key={project.id} value={project.id}>{project.blogArticle?.title || project.topic} · {Number.isFinite(Date.parse(project.createdAt)) ? new Date(project.createdAt).toLocaleString('de-DE') : 'Gespeicherter Artikel'}</option>)}
          </select>
        </div>
      )}
    </section>
  );
};

import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useEffect, useState } from 'react';
import { X, Save, Plus, Trash2, Globe, Sparkles, Building2 } from 'lucide-react';
import { resolvePinterestTargetUrl } from '../../utils/pinterestTargetUrl';
import { ProjectSettings } from '../../types/contentEngine';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectSettings;
  onSave: (updated: ProjectSettings) => void;
}

export const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const { language, hubText } = useContentHubCopy();
  const [formData, setFormData] = useState<ProjectSettings>({ ...project });
  const [newTopic, setNewTopic] = useState('');
  const [linkError, setLinkError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...project, coreTopics: [...project.coreTopics] });
      setNewTopic('');
      setLinkError('');
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleAddTopic = () => {
    if (!newTopic.trim()) return;
    if (!formData.coreTopics.includes(newTopic.trim())) {
      setFormData({
        ...formData,
        coreTopics: [...formData.coreTopics, newTopic.trim()],
      });
    }
    setNewTopic('');
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setFormData({
      ...formData,
      coreTopics: formData.coreTopics.filter((t) => t !== topicToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let defaultTargetUrl: string;
    try { defaultTargetUrl = resolvePinterestTargetUrl(formData.defaultTargetUrl); }
    catch (error) { setLinkError((error as Error).message); return; }
    onSave({ ...formData, defaultTargetUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{hubText("Projekt-Einstellungen bearbeiten")}</h2>
              <p className="text-xs text-slate-500">{hubText("Zentrale Marken- und Zielgruppen-Parameter für die KI-Generierung")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-sm text-slate-600">{hubText("Passe diese Vorlage an dein eigenes Business an. Trage deine Website, Zielseite und Kanalnamen ein. Wenn du noch keine Website hast, kannst du das Feld leer lassen.")}</p>
          <div>
            <label htmlFor="content-project-language" className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText('Inhaltssprache')}</label>
            <select id="content-project-language" value={formData.language || 'de'}
              onChange={event => setFormData({ ...formData, language: event.target.value as ProjectSettings['language'] })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
              <option value="de">{hubText('Deutsch')}</option>
              <option value="en">{hubText('Englisch')}</option>
              <option value="pl">{hubText('Polnisch')}</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">{hubText('Diese Sprache gilt für neu erzeugte Inhalte. Gespeicherte Inhalte werden nicht automatisch übersetzt.')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Projektname")}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Website URL
              </label>
              <input
                type="url"
                placeholder={hubText("https://deine-website.at")}
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Zielgruppe & Persona")}</label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Kernthemen & Nischen")}</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={hubText("Neues Thema hinzufügen...")}
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-hidden focus:bg-white focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTopic}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.coreTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/80 text-emerald-800 rounded-lg text-xs font-semibold"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(topic)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Projekt-Zieladresse für alle Inhalte")}</label>
              <input
                type="url"
                maxLength={2048}
                aria-label={hubText("Projekt-Zieladresse für alle Inhalte")}
                aria-invalid={Boolean(linkError)}
                aria-describedby="project-link-help"
                placeholder={hubText("https://deine-zielseite.at (optional)")}
                value={formData.defaultTargetUrl || ''}
                onChange={(e) => { setFormData({ ...formData, defaultTargetUrl: e.target.value }); setLinkError(''); }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
              <p id="project-link-help" className="mt-2 text-xs text-slate-600">{hubText("Diese Adresse ist die Vorgabe für Briefing, Blog, Pinterest, YouTube und Shorts. Beim Erstellen kannst du gezielt eine andere Adresse wählen. Bestehende Inhalte behalten ihren bisherigen Link.")}</p>
              {linkError && <p role="alert" className="mt-1 text-xs text-rose-700">{linkError}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Standard Call to Action (CTA)")}</label>
              <input
                type="text"
                value={formData.defaultCta}
                onChange={(e) => setFormData({ ...formData, defaultCta: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Brand Voice & Tonalität")}</label>
            <textarea
              rows={2}
              value={formData.brandVoice}
              onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("Standard Pinterest Board Name")}</label>
              <input
                type="text"
                value={formData.pinterestBoardDefault || ''}
                onChange={(e) => setFormData({ ...formData, pinterestBoardDefault: e.target.value })}
                placeholder={hubText("Name deiner Pinterest-Pinnwand (optional)")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{hubText("YouTube Kanal Name")}</label>
              <input
                type="text"
                value={formData.youtubeChannelName || ''}
                onChange={(e) => setFormData({ ...formData, youtubeChannelName: e.target.value })}
                placeholder={hubText("Name deines YouTube-Kanals (optional)")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >{hubText("Abbrechen")}</button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{hubText("Einstellungen speichern")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

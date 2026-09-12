import React, { useEffect, useState } from 'react';
import { X, Save, Plus, Trash2, Globe, Sparkles, Building2 } from 'lucide-react';
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
  const [formData, setFormData] = useState<ProjectSettings>({ ...project });
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...project, coreTopics: [...project.coreTopics] });
      setNewTopic('');
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
    onSave(formData);
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
              <h2 className="text-lg font-bold text-slate-900">Projekt-Einstellungen bearbeiten</h2>
              <p className="text-xs text-slate-500">Zentrale Marken- und Zielgruppen-Parameter für die KI-Generierung</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Projektname
              </label>
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
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Zielgruppe & Persona
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Kernthemen & Nischen
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Neues Thema hinzufügen..."
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
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Standard Ziel-URL (Landingpage/Lead Magnet)
              </label>
              <input
                type="text"
                value={formData.defaultTargetUrl}
                onChange={(e) => setFormData({ ...formData, defaultTargetUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Standard Call to Action (CTA)
              </label>
              <input
                type="text"
                value={formData.defaultCta}
                onChange={(e) => setFormData({ ...formData, defaultCta: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Brand Voice & Tonalität
            </label>
            <textarea
              rows={2}
              value={formData.brandVoice}
              onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Standard Pinterest Board Name
              </label>
              <input
                type="text"
                value={formData.pinterestBoardDefault || ''}
                onChange={(e) => setFormData({ ...formData, pinterestBoardDefault: e.target.value })}
                placeholder="z.B. Vitalität 50+"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                YouTube Kanal Name
              </label>
              <input
                type="text"
                value={formData.youtubeChannelName || ''}
                onChange={(e) => setFormData({ ...formData, youtubeChannelName: e.target.value })}
                placeholder="z.B. Vital50 Kanal"
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
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Einstellungen speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

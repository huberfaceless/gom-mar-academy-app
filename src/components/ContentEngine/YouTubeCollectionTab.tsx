import React, { useState } from 'react';
import type { CentralContentProject } from '../../types/contentEngine';
import { youtubeVideosFor, updateYouTubeVideo } from '../../utils/additionalSocialContent';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import { YouTubeScriptTab } from './YouTubeScriptTab';

export function YouTubeCollectionTab({ project, onChange, onGenerate, onGoToCalendar, busy }: {
  project: CentralContentProject; onChange: (project: CentralContentProject) => unknown; onGenerate: () => void; onGoToCalendar: () => void; busy: boolean;
}) {
  const { hubText } = useContentHubCopy();
  const [selectedId, setSelectedId] = useState('yt_video_main');
  const videos = youtubeVideosFor(project);
  const selected = videos.find(item => item.id === selectedId) || videos[0];
  return <div className="space-y-4">
    <div className="grid min-w-0 gap-3 rounded-2xl border bg-white p-4">
      {selected && <label className="block w-full min-w-0 text-sm font-bold">{hubText('YouTube-Skript auswählen')}
        <select value={selected.id} onChange={event => setSelectedId(event.target.value)} className="mt-1 w-full rounded-xl border p-2">
          {videos.map((item, index) => <option key={item.id} value={item.id}>{index + 1}. {item.video.title}</option>)}
        </select>
      </label>}
      <button type="button" disabled={busy} onClick={onGenerate} className="justify-self-start rounded-xl bg-red-700 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? hubText('Inhalte werden ergänzt…') : hubText('Weiteres YouTube-Skript + 3 Shorts erstellen')}</button>
    </div>
    <YouTubeScriptTab key={selected?.id || 'empty'} video={selected?.video} shorts={project.youtubeShorts}
      onChangeVideo={video => selected && onChange(updateYouTubeVideo(project, selected.id, video))}
      onChangeShorts={youtubeShorts => onChange({ ...project, youtubeShorts })}
      onGoToCalendar={onGoToCalendar}
      topic={project.topic} projectSettings={project.projectSettings} />
  </div>;
}

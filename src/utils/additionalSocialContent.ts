import { attachCampaignSource } from './articleCampaign';
import type { CentralContentProject, PinterestPin, YouTubeVideoData, YouTubeShort } from '../types/contentEngine';

export const instagramPostsFor = (project: Pick<CentralContentProject, 'instagramPosts' | 'pinterestPins'>): PinterestPin[] =>
  project.instagramPosts ?? project.pinterestPins ?? [];
export const youtubeVideosFor = (project: Pick<CentralContentProject, 'youtubeVideo' | 'youtubeAdditionalVideos'>) => [
  ...(project.youtubeVideo ? [{ id: 'yt_video_main', video: project.youtubeVideo }] : []),
  ...(project.youtubeAdditionalVideos || []),
];
export function assertGenerationSource(current: CentralContentProject | null, source: CentralContentProject): asserts current is CentralContentProject {
  if (!current || current.id !== source.id || current.projectSettings.id !== source.projectSettings.id
    || current.topic !== source.topic || JSON.stringify(current.contentBrief) !== JSON.stringify(source.contentBrief)
    || current.blogArticle?.contentMarkdown !== source.blogArticle?.contentMarkdown) {
    throw new Error('Die Artikelgrundlage wurde inzwischen geändert. Bitte die zusätzlichen Inhalte erneut erstellen.');
  }
}
export function appendSocialPins(project: CentralContentProject, channel: 'pinterest' | 'instagram', pins: PinterestPin[], batchId: string = crypto.randomUUID()): CentralContentProject {
  if (!pins.length) throw new Error('Es wurden keine neuen Beiträge geliefert.');
  const added = pins.map((pin, index) => ({ ...pin, id: `${channel}_${batchId}_${index}`, status: 'ai_generated' as const }));
  if (channel === 'instagram') return { ...project, instagramPosts: [...instagramPostsFor(project), ...added] };
  return { ...project,
    ...(project.instagramPosts || project.pinterestPins.length ? { instagramPosts: instagramPostsFor(project) } : {}),
    pinterestPins: [...project.pinterestPins, ...added],
  };
}
export function appendYouTubeContent(project: CentralContentProject, video: YouTubeVideoData, shorts: YouTubeShort[], batchId: string = crypto.randomUUID()): CentralContentProject {
  if (!shorts.length) throw new Error('Es wurden keine neuen Kurzvideos geliefert.');
  const { videoId: _id, videoUrl: _url, scheduledDate: _date, ...script } = video;
  const fresh = { ...script, status: 'ai_generated' as const };
  return { ...project,
    ...(project.youtubeVideo
      ? { youtubeAdditionalVideos: [...(project.youtubeAdditionalVideos || []), { id: `yt_video_${batchId}`, video: fresh }] }
      : { youtubeVideo: fresh }),
    youtubeShorts: [...(project.youtubeShorts || []), ...shorts.map((short, index) => {
      const { videoId: _id, videoUrl: _url, scheduledDate: _date, ...text } = short;
      return { ...text, id: `short_${batchId}_${index}`, shortNumber: (project.youtubeShorts?.length || 0) + index + 1, status: 'ai_generated' as const };
    })],
  };
}
export const updateYouTubeVideo = (project: CentralContentProject, id: string, video: YouTubeVideoData): CentralContentProject =>
  id === 'yt_video_main' ? { ...project, youtubeVideo: video } : { ...project, youtubeAdditionalVideos: project.youtubeAdditionalVideos?.map(item => item.id === id ? { ...item, video } : item) };

export function briefForSocial(project: CentralContentProject) {
  if (!project.contentBrief) throw new Error('Bitte zuerst ein Inhaltsbriefing erstellen.');
  const brief = project.blogArticle?.longTailKeywords === undefined ? project.contentBrief
    : { ...project.contentBrief, longTailKeywords: project.blogArticle.longTailKeywords };
  if (!project.blogArticle?.publishedUrl) return brief;
  try {
    return attachCampaignSource(brief, {
      title: project.blogArticle.title,
      contentMarkdown: project.blogArticle.contentMarkdown,
      url: project.blogArticle.publishedUrl,
    });
  } catch { return brief; }
}

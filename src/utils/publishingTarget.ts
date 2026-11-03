import type { CentralContentProject, PublishingJob } from '../types/contentEngine';

type PublishingTarget = Pick<PublishingJob, 'contentId' | 'platform' | 'contentType' | 'payload'>;

/** A replacement upload has a different publication identity, even in the same project slot. */
export const matchesPublishingTarget = (job: PublishingTarget, target: PublishingTarget): boolean => {
  if (job.contentId !== target.contentId || job.platform !== target.platform || job.contentType !== target.contentType) return false;
  if (target.platform !== 'YOUTUBE') return true;
  const videoId = target.payload?.metadata?.videoId;
  return typeof videoId === 'string' && videoId.length > 0 && job.payload?.metadata?.videoId === videoId;
};

const uploadedVideoId = (video?: { videoId?: string; videoUrl?: string }): string | undefined => {
  if (video?.videoId) return video.videoId;
  try {
    const url = new URL(video?.videoUrl || '');
    return url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || undefined;
  } catch { return undefined; }
};

/** Historical job outcomes must not overwrite a replacement video's status or calendar link. */
export const matchesCurrentYouTubeUpload = (job: PublishingJob, project: Pick<CentralContentProject, 'youtubeVideo' | 'youtubeShorts'>): boolean => {
  if (job.platform !== 'YOUTUBE') return true;
  const video = job.contentId === 'yt_video_main' ? project.youtubeVideo
    : project.youtubeShorts?.find((short, index) => (short.id || `short_${index}`) === job.contentId);
  const videoId = uploadedVideoId(video);
  return !!videoId && job.payload?.metadata?.videoId === videoId;
};

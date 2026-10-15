import type { BlogArticle, CentralContentProject, ContentBrief, ProjectSettings } from '../types/contentEngine';

export const createBlogArticleProject = (
  topic: string,
  settings: ProjectSettings,
  brief: ContentBrief,
  article: BlogArticle,
  affiliateLink: string | null,
  previous?: CentralContentProject,
): CentralContentProject => {
  const now = new Date().toISOString();
  // A first article may fill an existing topic. An existing article is never overwritten.
  const base: CentralContentProject = previous && !previous.blogArticle ? previous : {
    id: `content_proj_${crypto.randomUUID()}`,
    projectId: settings.id,
    projectSettings: settings,
    topic,
    contentBrief: brief,
    pinterestPins: [],
    calendarItems: [],
    createdAt: now,
  };
  return { ...base, blogArticle: article, affiliateLink, updatedAt: now };
};

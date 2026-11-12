import type { BlogArticle, ContentBrief, ProjectSettings } from '../types/contentEngine';
import { normalizeSeoGeo, seoText } from './blogSeoGeo';
import { hasKeyword, applyKeywordHeading, keywordDescriptionProposal, suggestedBlogSlug } from './blogSeoCheck';
import { suggestVital50Category } from './vital50BlogCategories';

export interface ProjectBlogDefaults {
  keywordChecks: boolean;
  shortUrls: boolean;
  geoSummary: boolean;
  internalLinks: boolean;
  verifiedSources: boolean;
  imageAsFeatured: boolean;
}
export function resolveProjectBlogDefaults(settings?: Pick<ProjectSettings, 'websiteUrl' | 'blogDefaults'>): ProjectBlogDefaults {
  let vital50 = false;
  try { vital50 = new URL(settings?.websiteUrl || '').origin === 'https://vital50.gomo-marketing.at'; } catch { /* Projects without WordPress keep their own content. */ }
  const value = settings?.blogDefaults;
  return {
    keywordChecks: typeof value?.keywordChecks === 'boolean' ? value.keywordChecks : true,
    shortUrls: typeof value?.shortUrls === 'boolean' ? value.shortUrls : true,
    geoSummary: typeof value?.geoSummary === 'boolean' ? value.geoSummary : true,
    internalLinks: typeof value?.internalLinks === 'boolean' ? value.internalLinks : true,
    verifiedSources: typeof value?.verifiedSources === 'boolean' ? value.verifiedSources : vital50,
    imageAsFeatured: value?.imageAsFeatured === true,
  };
}
/** Applied only to newly generated articles, never silently to existing articles. */
export function applyProjectBlogDefaults(input: BlogArticle, brief: Partial<ContentBrief>, settings?: Pick<ProjectSettings, 'websiteUrl' | 'blogDefaults'>): BlogArticle {
  const defaults = resolveProjectBlogDefaults(settings);
  const fields = normalizeSeoGeo(input as unknown as Record<string, unknown>, input, brief);
  const keyword = seoText(brief.mainKeyword, 150) || fields.focusKeyword;
  let article: BlogArticle = { ...input, ...fields, focusKeyword: keyword, answerSummary: defaults.geoSummary ? fields.answerSummary : '' };
  // Selection-dependent fields must never be copied from a model response or the previous article.
  delete article.wordpressImage;
  delete article.referenceIds;
  delete article.wordpressSlug;
  delete article.wordpressCategorySlug;
  if (defaults.keywordChecks && keyword) {
    if (!hasKeyword(article.seoTitle || '', keyword)) article.seoTitle = `${keyword}: ${article.seoTitle || article.title}`.slice(0, 200);
    article.metaDescription = keywordDescriptionProposal(article.metaDescription || '', keyword);
    article = applyKeywordHeading(article, keyword);
  }
  if (defaults.shortUrls) article.wordpressSlug = suggestedBlogSlug(keyword || article.title);
  try {
    if (new URL(settings?.websiteUrl || '').origin === 'https://vital50.gomo-marketing.at') {
      const category = suggestVital50Category(article.title, '', brief.mainKeyword);
      if (category) article.wordpressCategorySlug = category;
    }
  } catch { /* No category mapping for unconnected sites. */ }
  return article;
}

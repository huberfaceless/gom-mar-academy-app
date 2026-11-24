import { normalizeLongTailKeywords } from './longTailKeywords';
import { selectedBlogReferences, isWordPressImageUrl } from './blogReferences';
import type { BlogArticle, ContentBrief } from '../types/contentEngine';

export type WordPressSeoProvider = 'rank-math' | 'seopress';
export const SEOPRESS_KEYS = ['_seopress_titles_title', '_seopress_titles_desc', '_seopress_analysis_target_kw'] as const;
export const wordpressSeoKeys = (provider: WordPressSeoProvider) => provider === 'seopress' ? SEOPRESS_KEYS : RANK_MATH_KEYS;
export const RANK_MATH_KEYS = ['rank_math_title', 'rank_math_description', 'rank_math_focus_keyword'] as const;
export const seoText = (value: unknown, limit: number): string => typeof value === 'string'
  ? value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, limit) : '';
export function articleSeoDefaults(article: Pick<BlogArticle, 'title' | 'metaDescription' | 'seoTitle' | 'focusKeyword' | 'answerSummary'>, brief?: Partial<ContentBrief>) {
  return {
    seoTitle: article.seoTitle === undefined ? seoText(article.title, 200) : article.seoTitle,
    metaDescription: article.metaDescription === undefined ? seoText(brief?.metaDescription, 500) : article.metaDescription,
    focusKeyword: article.focusKeyword === undefined ? seoText(brief?.mainKeyword, 150) : article.focusKeyword,
    answerSummary: article.answerSummary || '',
  };
}
export function rankMathMeta(article: BlogArticle, brief?: Partial<ContentBrief>): Record<string, string> | null {
  const value = articleSeoDefaults(article, brief);
  if ([value.seoTitle, value.metaDescription, value.focusKeyword].some(v => typeof v !== 'string' || !v.trim())) return null;
  if (value.seoTitle.length > 200 || value.metaDescription.length > 500 || value.focusKeyword.length > 150) throw new Error('Die SEO-Daten sind zu lang. Bitte die Felder im Artikel prüfen.');
  const meta = { rank_math_title: seoText(value.seoTitle, 200), rank_math_description: seoText(value.metaDescription, 500), rank_math_focus_keyword: seoText(value.focusKeyword, 150) };
  return Object.values(meta).every(Boolean) ? meta : null;
}
// SEOPress 10.4 exposes these registered text metas to authenticated editors
// through the core posts API. Preserve the plugin's own role restrictions.
export function wordpressSeoMeta(provider: WordPressSeoProvider, article: BlogArticle, brief?: Partial<ContentBrief>): Record<string, string> | null {
  const meta = rankMathMeta(article, brief);
  if (!meta || provider === 'rank-math') return meta;
  return { _seopress_titles_title: meta.rank_math_title, _seopress_titles_desc: meta.rank_math_description, _seopress_analysis_target_kw: meta.rank_math_focus_keyword };
}
export function normalizeSeoGeo(value: Record<string, unknown>, article: BlogArticle, brief?: Partial<ContentBrief>) {
  const fallback = articleSeoDefaults(article, brief);
  return {
    seoTitle: seoText(value.seoTitle, 200) || fallback.seoTitle,
    metaDescription: seoText(value.metaDescription, 500) || fallback.metaDescription,
    focusKeyword: seoText(value.focusKeyword, 150) || fallback.focusKeyword,
    answerSummary: seoText(value.answerSummary, 1200) || fallback.answerSummary,
    longTailKeywords: normalizeLongTailKeywords(value.longTailKeywords ?? article.longTailKeywords ?? brief?.longTailKeywords),
  };
}
export function blogMarkdownWithSummary(article: Pick<BlogArticle, 'contentMarkdown' | 'answerSummary' | 'wordpressImage' | 'referenceIds'>, language = 'de'): string {
  const summary = seoText(article.answerSummary, 1200);
  const escape = (text: string) => text.replace(/[\\`*_[\]<>]/g, '\\$&').replace(/[\r\n]+/g, ' ');
  let content = article.contentMarkdown;
  if (article.wordpressImage && isWordPressImageUrl(article.wordpressImage.url)) content = `![${escape(article.wordpressImage.alt)}](<${article.wordpressImage.url}>)\n\n${content}`;
  const sources = selectedBlogReferences(article.referenceIds).filter(source => !content.includes(source.url));
  if (sources.length) content += `\n\n## ${language === 'en' ? 'Sources' : language === 'pl' ? 'Źródła' : 'Quellen'}\n\n${sources.map(source => `- [${escape(source.publisher + ': ' + source.title)}](<${source.url}>)`).join('\n')}`;
  if (!summary) return content;
  const heading = language === 'en' ? 'Key points at a glance' : language === 'pl' ? 'Najważniejsze informacje' : 'Das Wichtigste in Kürze';
  const escaped = summary.replace(/[\\`*_[\]<>]/g, '\\$&');
  return `> **${heading}**\n>\n> ${escaped}\n\n${content}`;
}

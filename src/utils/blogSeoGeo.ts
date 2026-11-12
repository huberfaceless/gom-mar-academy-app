import type { BlogArticle, ContentBrief } from '../types/contentEngine';

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
export function normalizeSeoGeo(value: Record<string, unknown>, article: BlogArticle, brief?: Partial<ContentBrief>) {
  const fallback = articleSeoDefaults(article, brief);
  return {
    seoTitle: seoText(value.seoTitle, 200) || fallback.seoTitle,
    metaDescription: seoText(value.metaDescription, 500) || fallback.metaDescription,
    focusKeyword: seoText(value.focusKeyword, 150) || fallback.focusKeyword,
    answerSummary: seoText(value.answerSummary, 1200) || fallback.answerSummary,
  };
}
export function blogMarkdownWithSummary(article: Pick<BlogArticle, 'contentMarkdown' | 'answerSummary'>, language = 'de'): string {
  const summary = seoText(article.answerSummary, 1200);
  if (!summary) return article.contentMarkdown;
  const heading = language === 'en' ? 'Key points at a glance' : language === 'pl' ? 'Najważniejsze informacje' : 'Das Wichtigste in Kürze';
  const escaped = summary.replace(/[\\`*_[\]<>]/g, '\\$&');
  return `> **${heading}**\n>\n> ${escaped}\n\n${article.contentMarkdown}`;
}

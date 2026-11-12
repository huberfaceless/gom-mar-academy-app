import type { BlogArticle } from '../types/contentEngine';
import { articleSeoDefaults } from './blogSeoGeo';
import { selectedBlogReferences } from './blogReferences';
const fold = (value: string) => value.normalize('NFKC').toLocaleLowerCase('de').replace(/\s+/g, ' ').trim();
export const hasKeyword = (value: string, keyword: string) => Boolean(keyword.trim()) && fold(value).includes(fold(keyword));
const nonCode = (value: string) => value.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, block => block.replace(/[^\n]/g, ' '));
export function suggestedBlogSlug(keyword: string): string {
  const slug = keyword.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/ł/g, 'l').normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (slug.length <= 40) return slug;
  const trimmed = slug.slice(0, 41); return trimmed.includes('-') ? trimmed.slice(0, trimmed.lastIndexOf('-')) : slug.slice(0, 40);
}
export function inspectBlogSeo(article: BlogArticle, mainKeyword?: string) {
  const fields = articleSeoDefaults(article, { mainKeyword });
  const content = nonCode(article.contentMarkdown);
  const headings = [...content.matchAll(/^#{2,4}\s+(.+)$/gm)].map(match => match[1]);
  const visible = fold((article.answerSummary || '') + ' ' + content.replace(/!?(\[[^\]]*\])\([^)]*\)/g, '$1').replace(/https?:\/\/\S+/g, ''));
  const keyword = fold(fields.focusKeyword);
  let occurrences = 0, position = 0;
  if (keyword) while ((position = visible.indexOf(keyword, position)) !== -1) { occurrences++; position += keyword.length; }
  return {
    keyword: fields.focusKeyword,
    title: hasKeyword(fields.seoTitle, fields.focusKeyword),
    description: hasKeyword(fields.metaDescription, fields.focusKeyword),
    heading: headings.some(heading => hasKeyword(heading, fields.focusKeyword)),
    occurrences,
    image: Boolean(article.wordpressImage?.id && article.wordpressImage.alt.trim()),
    references: selectedBlogReferences(article.referenceIds).length,
    suggestedSlug: suggestedBlogSlug(fields.focusKeyword || article.title),
  };
}
export function keywordHeadingProposal(article: BlogArticle, keyword: string): string | null {
  if (!keyword.trim() || /[\r\n]/.test(keyword)) return null;
  const heading = nonCode(article.contentMarkdown).match(/^(#{2,4})\s+(.+)$/m);
  if (!heading) return null;
  if (hasKeyword(heading[2], keyword)) return null;
  return `${heading[1]} ${keyword}: ${heading[2]}`;
}
export function applyKeywordHeading(article: BlogArticle, keyword: string): BlogArticle {
  const proposal = keywordHeadingProposal(article, keyword);
  const heading = nonCode(article.contentMarkdown).match(/^(#{2,4})\s+(.+)$/m);
  if (!proposal || !heading) return article;
  return { ...article, contentMarkdown: article.contentMarkdown.slice(0, heading.index!) + proposal + article.contentMarkdown.slice(heading.index! + heading[0].length) };
}
export function keywordDescriptionProposal(description: string, keyword: string): string {
  if (!keyword.trim() || hasKeyword(description, keyword)) return description;
  const proposed = `${keyword}: ${description}`.trim();
  if (proposed.length <= 160) return proposed;
  const end = proposed.lastIndexOf(' ', 157); return `${proposed.slice(0, end > keyword.length ? end : 157)}…`;
}

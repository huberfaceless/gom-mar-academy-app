import { ACADEMY_STAGES } from '../src/data/academyData';

type Finding = {
  lessonId: string;
  lessonTitle: string;
  category: 'video' | 'marketing';
  detail: string;
};

const findings: Finding[] = [];
const riskyClaims: Array<[RegExp, string]> = [
  [/\bgarantiert(?:e[rsnm]?)?\b|\bohne\s+risiko\b|\brisikofrei\b/giu, 'Garantie- oder Risikofreiheitsversprechen'],
  [/\bgaranteed\b|\bguaranteed\b|\brisk[ -]?free\b/giu, 'Guarantee or risk-free claim'],
  [/\bgwarantowan(?:y|a|e)\b|\bbez\s+ryzyka\b/giu, 'Obietnica gwarancji lub braku ryzyka'],
  [/\b\d+(?:[.,]\d+)?\s*%\s*(?:rendite|return|zwrot)\b/giu, 'Konkretes Renditeversprechen'],
  [/\b(?:verdien(?:e|st)|earn|zar[oó]b)\w*\s+[^.!?]{0,40}\b\d+[\d.,]*\s*(?:€|eur|\$|usd)\b/giu, 'Konkretes Einkommensversprechen'],
];

const collectStrings = (value: unknown, result: string[] = []): string[] => {
  if (typeof value === 'string') result.push(value);
  else if (Array.isArray(value)) value.forEach(item => collectStrings(item, result));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => collectStrings(item, result));
  return result;
};

const isNegatedOrTechnicalClaim = (text: string, matchIndex: number, match: string): boolean => {
  const before = text.slice(Math.max(0, matchIndex - 80), matchIndex).toLowerCase();
  const after = text.slice(matchIndex + match.length, Math.min(text.length, matchIndex + match.length + 80)).toLowerCase();
  const context = `${before}${match.toLowerCase()}${after}`;

  return /(?:nicht|kein(?:e[rsnm]?)?|weder|ohne)[^.!?\n]{0,60}$/iu.test(before)
    || /^[^.!?\n]{0,60}(?:nicht|kein(?:e[rsnm]?)?|weder|ohne)/iu.test(after)
    || /(?:not|no|neither|without)[^.!?\n]{0,60}$/iu.test(before)
    || /^[^.!?\n]{0,60}(?:not|no|neither|without)/iu.test(after)
    || /(?:nie|bez)[^.!?\n]{0,60}$/iu.test(before)
    || /^[^.!?\n]{0,60}(?:nie|bez)/iu.test(after)
    || context.includes('programmatic guaranteed')
    || /sichtbarkeitsrat|viewability/iu.test(context);
};

let lessonCount = 0;
let lessonsWithRealVideo = 0;

for (const stage of ACADEMY_STAGES) {
  for (const lesson of stage.lessons) {
    lessonCount += 1;
    const videoUrl = lesson.learnContent.videoUrl?.trim() || '';
    const hasSupportedVideo = /^(https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/iu.test(videoUrl);

    if (!videoUrl) {
      findings.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: 'video',
        detail: 'Keine Video-URL hinterlegt; der aktuelle Player verwendet die simulierte Wiedergabe.',
      });
    } else if (!hasSupportedVideo) {
      findings.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: 'video',
        detail: `Nicht unterstützte oder prüfbedürftige Video-URL: ${videoUrl}`,
      });
    } else {
      lessonsWithRealVideo += 1;
    }

    const lessonText = collectStrings(lesson).join('\n');
    for (const [pattern, description] of riskyClaims) {
      pattern.lastIndex = 0;
      const matches = [...lessonText.matchAll(pattern)]
        .filter(match => !isNegatedOrTechnicalClaim(lessonText, match.index, match[0]))
        .map(match => match[0]);
      if (matches.length > 0) {
        findings.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          category: 'marketing',
          detail: `${description}: ${[...new Set(matches)].join(', ')}`,
        });
      }
    }
  }
}

const videoFindings = findings.filter(finding => finding.category === 'video');
const marketingFindings = findings.filter(finding => finding.category === 'marketing');

console.log(`Geprüfte Lektionen: ${lessonCount}`);
console.log(`Lektionen mit unterstützter echter Video-URL: ${lessonsWithRealVideo}`);
console.log(`Video-Prüfhinweise: ${videoFindings.length}`);
console.log(`Marketing-Prüfhinweise: ${marketingFindings.length}`);

for (const finding of findings) {
  console.log(`\n[${finding.category.toUpperCase()}] Lektion ${finding.lessonId}: ${finding.lessonTitle}`);
  console.log(`  ${finding.detail}`);
}

if (lessonCount === 0) {
  throw new Error('Lektionsaudit fehlgeschlagen: Es wurden keine Lektionen gefunden.');
}

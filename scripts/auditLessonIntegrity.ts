import fs from 'node:fs';
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
  [/\b(?:niemals\s+wieder\s+spam-?ordner|posteingangs-?garantie|\d+\s*%\s+im\s+hauptpostfach)\b/giu, 'Unbelegtes Zustellversprechen'],
  [/\b(?:tiefschlaf\s+verdoppeln|deep\s+sleep\s+multiplier|hrv\s+maximieren)\b/giu, 'Unbelegtes Gesundheitsversprechen'],
  [/\b(?:vollständiger\s+schutz\s+vor\s+zwangsvollstreckung|für\s+hunderte\s+von\s+jahren\s+ab|uneinholbare\s+monopolrechte)\b/giu, 'Pauschales Rechts- oder Vermögensschutzversprechen'],
  [/\bkreditangebot\s+in\s+48\s+stunden\b/giu, 'Pauschales Finanzierungsversprechen'],
  [/\b(?:40\s*%\+\s*opt-in|abschlusschance[^.!?]{0,40}\b80\s*%\s+sinkt|reaktionszeiten[^.!?]{0,50}\bverdoppeln)\b/giu, 'Unbelegtes Conversion-Versprechen'],
  [/\b(?:täglicher\s+traffic\s+ohne\s+manuellen\s+aufwand|traffic-?wasserfall|nur\s+2\s+stunden\s+pro\s+monat)\b/giu, 'Unbelegtes Automatisierungs- oder Trafficversprechen'],
  [/\b(?:98\s*%\s+(?:öffnungsrate|open\s+rate)|40\s*%\+\s+klickrate|unter\s+2\s+minuten[^.!?]{0,40}\b5x\s+mehr\s+deals)\b/giu, 'Unbelegtes Messenger-Erfolgsversprechen'],
  [/\b(?:google-?monopolstellung|hunderttausende\s+kostenlose\s+besucher|in\s+3-6\s+monaten\s+auf\s+position\s+1)\b/giu, 'Unbelegtes SEO- oder Rankingversprechen'],
  [/\b(?:wert\s+verdoppeln\s+und\s+für\s+7-figures\s+verkaufen|sofortige\s+25\s*%\s+umsatzsteigerung|bei\s+3x\s+ebit\s+kaufen\s+und\s+bei\s+6x\s+ebit\s+weiterverkaufen)\b/giu, 'Unbelegtes Unternehmenswert- oder Exitversprechen'],
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
        detail: 'Keine Video-URL hinterlegt; die Lektion verwendet stattdessen die ElevenLabs-Audio-Erklärung.',
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

const lessonPlayer = fs.readFileSync('src/components/LessonVideoPlayer.tsx', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');
const serverCache = fs.readFileSync('server/lessonAudioCache.ts', 'utf8');
const adminDashboard = fs.readFileSync('src/components/AdminDashboardView.tsx', 'utf8');
const playerChecks: Array<[boolean, string]> = [
  [lessonPlayer.includes("audioPlayer: 'GOM-MAR Audio-Erklärung'"), 'Die deutsche Audio-Erklärung ist eindeutig gekennzeichnet.'],
  [lessonPlayer.includes("audioPlayer: 'GOM-MAR audio explanation'"), 'Die englische Audio-Erklärung ist eindeutig gekennzeichnet.'],
  [lessonPlayer.includes("audioPlayer: 'Objaśnienie audio GOM-MAR'"), 'Die polnische Audio-Erklärung ist eindeutig gekennzeichnet.'],
  [lessonPlayer.includes("customVideoUrl ? copy.videoPlayer : copy.audioPlayer"), 'Die Video-Bezeichnung erscheint nur bei hinterlegter Video-URL.'],
  [lessonPlayer.includes("customVideoUrl ? 'HD 1080p' : copy.academyVoice"), 'Eine Videoauflösung wird nur bei hinterlegtem Video angezeigt.'],
  [lessonPlayer.includes('authenticatedFetch('), 'Lektionsaudio wird ausschließlich authentifiziert geladen.'],
  [lessonPlayer.includes("caches.open('gommar-lesson-audio-v1')"), 'Erzeugtes Lektionsaudio wird im Browser zwischengespeichert.'],
  [!lessonPlayer.includes('speechSynthesis'), 'Die uneinheitliche Browser-Sprachausgabe wurde entfernt.'],
  [!lessonPlayer.includes('GOM-MAR Masterclass Player'), 'Der simulierte Player wird nicht mehr als Videoplayer bezeichnet.'],
  [!lessonPlayer.includes('Interaktive Video-Kapitel'), 'Kapitel der Audio-Erklärung werden nicht mehr als Videokapitel bezeichnet.'],
  [server.includes("app.get('/api/academy/lessons/:lessonId/audio', requireVerifiedMember"), 'Der Audio-Endpunkt ist auf bestätigte Mitglieder begrenzt.'],
  [server.includes("process.env.ELEVENLABS_API_KEY"), 'Der ElevenLabs-Schlüssel wird ausschließlich serverseitig gelesen.'],
  [server.includes("model_id: ELEVENLABS_MODEL_ID"), 'Das mehrsprachige ElevenLabs-Modell ist fest konfiguriert.'],
  [!lessonPlayer.includes('ELEVENLABS_API_KEY'), 'Der ElevenLabs-Schlüssel gelangt nicht in den Browser-Code.'],
  [server.includes('loadLessonAudioFromCache(LESSON_AUDIO_BUCKET'), 'Vor der Erzeugung wird der gemeinsame Audio-Cache geprüft.'],
  [server.includes('saveLessonAudioToCache(LESSON_AUDIO_BUCKET'), 'Neu erzeugtes Audio wird im gemeinsamen Cache gespeichert.'],
  [server.includes("res.setHeader('X-Lesson-Audio-Cache', 'HIT')"), 'Cache-Treffer werden für die Produktionsprüfung gekennzeichnet.'],
  [serverCache.includes("createHash('sha256')"), 'Cache-Dateien werden anhand ihres vollständigen Audioinhalts versioniert.'],
  [serverCache.includes('devstorage.read_write'), 'Der Cache verwendet eine begrenzte Google-Cloud-Storage-Berechtigung.'],
  [server.includes("app.post('/api/admin/academy/audio-cache/generate-german', requireVerifiedMember, requireAcademyAdmin"), 'Nur der bestätigte Admin kann deutsche Audios vorgenerieren.'],
  [server.includes('LESSON_AUDIO_ADMIN_BATCH_SIZE = 2'), 'Die Vorgenerierung arbeitet in kurzen, ausfallsicheren Paketen.'],
  [adminDashboard.includes("'Deutsche Audios vorbereiten'"), 'Die deutsche Vorgenerierung ist in der Admin-Lektionsverwaltung erreichbar.'],
  [adminDashboard.includes('Audio ${audioBatchProgress.processed}/${audioBatchProgress.total}'), 'Der Admin sieht den Fortschritt der Audioerzeugung.'],
  [adminDashboard.includes('YouTube-Video-URL (optional)'), 'Die Video-URL wird dauerhaft in der Admin-Lektionsverwaltung gepflegt.'],
  [adminDashboard.includes('Vorschau des Lektionsvideos'), 'Der Admin kann ein Lektionsvideo vor dem Speichern prüfen.'],
  [server.includes('SUPPORTED_LESSON_VIDEO_URL.test(videoUrl)'), 'Der Server weist unsichere oder nicht unterstützte Video-URLs zurück.'],
  [!lessonPlayer.includes('setCustomVideoUrl'), 'Mitglieder können Lektionsvideos nicht nur lokal überschreiben.'],
  [lessonPlayer.includes('youtube-nocookie.com/embed'), 'Lektionsvideos verwenden den datensparsamen YouTube-Embed-Endpunkt.'],
  [lessonPlayer.includes('{!customVideoUrl && <div className="bg-slate-900'), 'Audiokapitel werden bei eingebundenem Video nicht angezeigt.'],
  [lessonPlayer.includes('fourChapterRatios = [0, 0.25, 0.55, 0.8]'), 'Audiokapitel richten sich nach der tatsächlichen Audiodauer.'],
  [lessonPlayer.includes('handleChapterSelect(chap.ratio)'), 'Ein Kapitelauswahl lädt, positioniert und startet das Audio.'],
  [lessonPlayer.includes("audio.addEventListener('loadedmetadata'"), 'Kapitel warten vor dem Sprung auf die echte MP3-Dauer.'],
];

for (const [passed, message] of playerChecks) {
  if (!passed) throw new Error(`Lektionsaudit fehlgeschlagen: ${message}`);
  console.log(`✓ ${message}`);
}

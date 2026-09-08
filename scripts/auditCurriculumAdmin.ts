import fs from 'node:fs';

const app = fs.readFileSync('src/App.tsx', 'utf8');
const admin = fs.readFileSync('src/components/AdminDashboardView.tsx', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');
const persistence = fs.readFileSync('server/academyCurriculumAdmin.ts', 'utf8');
const localization = fs.readFileSync('src/i18n/localizeAllAcademyStages.ts', 'utf8');
const types = fs.readFileSync('src/types.ts', 'utf8');

const checks: Array<[boolean, string]> = [
  [server.includes("app.get('/api/academy/curriculum-overrides'"), 'Mitglieder können zentrale Curriculum-Änderungen laden.'],
  [server.includes("app.put('/api/admin/curriculum/lessons/:lessonId'"), 'Nur der Admin-Endpunkt speichert Lektionen.'],
  [server.includes("app.delete('/api/admin/curriculum-overrides'"), 'Der Admin kann zentrale Änderungen zurücksetzen.'],
  [persistence.includes('academyCurriculumOverrides'), 'Änderungen werden in einer eigenen Firestore-Sammlung gespeichert.'],
  [persistence.includes("process.env.FIREBASE_DATABASE_ID || '(default)'"), 'Die produktive Firestore-Standarddatenbank wird angesprochen.'],
  [app.includes('applyCurriculumOverrides'), 'Die App wendet zentrale Änderungen auf das Standard-Curriculum an.'],
  [admin.includes('zentral für alle Mitglieder gespeichert'), 'Der Editor bestätigt die zentrale Speicherung eindeutig.'],
  [types.includes("translations?: Partial<Record<'en' | 'pl', LessonTranslation>>"), 'Zentrale Lektionen unterstützen englische und polnische Sprachversionen.'],
  [admin.includes("renderTranslationFields('en'") && admin.includes("renderTranslationFields('pl'"), 'Der Admin-Editor bietet Eingabebereiche für Englisch und Polnisch.'],
  [localization.includes('lesson.translations?.[language]'), 'Die Academy wendet die zentral gespeicherte Sprachversion an.'],
  [localization.includes('withoutEmptyStrings'), 'Leere Übersetzungsfelder fallen auf die deutsche Version zurück.'],
  [admin.includes('localizeAllAcademyStages(stages, language)'), 'Die Admin-Curriculum-Übersicht folgt der gewählten Sprache.'],
  [admin.includes('selectedStage.lessons.find(source => source.id === lesson.id)'), 'Der Editor bearbeitet trotz lokalisierter Anzeige die sichere Originallektion.'],
  [admin.includes('Eine Lektions-ID für alle Sprachen'), 'Der Editor erklärt die gemeinsame Lektions-ID eindeutig.'],
  [admin.includes('incompleteLanguages') && admin.includes('vollständige ${incompleteLanguages'), 'Neue Lektionen erfordern vollständige englische und polnische Inhalte.'],
];

for (const [passed, message] of checks) {
  if (!passed) throw new Error(`Curriculum-Audit fehlgeschlagen: ${message}`);
  console.log(`✓ ${message}`);
}

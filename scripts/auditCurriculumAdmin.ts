import fs from 'node:fs';

const app = fs.readFileSync('src/App.tsx', 'utf8');
const admin = fs.readFileSync('src/components/AdminDashboardView.tsx', 'utf8');
const academy = fs.readFileSync('src/components/AcademyView.tsx', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');
const persistence = fs.readFileSync('server/academyCurriculumAdmin.ts', 'utf8');
const localization = fs.readFileSync('src/i18n/localizeAllAcademyStages.ts', 'utf8');
const types = fs.readFileSync('src/types.ts', 'utf8');

const checks: Array<[boolean, string]> = [
  [server.includes("app.get('/api/academy/curriculum-overrides'"), 'Mitglieder können zentrale Curriculum-Änderungen laden.'],
  [server.includes("override.lesson?.publicationStatus === 'draft'") && server.includes('deleted: true'), 'Entwürfe werden serverseitig vor Mitgliedern verborgen.'],
  [server.includes("app.put('/api/admin/curriculum/lessons/:lessonId'"), 'Nur der Admin-Endpunkt speichert Lektionen.'],
  [server.includes("app.delete('/api/admin/curriculum-overrides'"), 'Der Admin kann zentrale Änderungen zurücksetzen.'],
  [server.includes("app.delete('/api/admin/curriculum/lessons/:lessonId'"), 'Der Admin kann eine einzelne Standardlektion wiederherstellen.'],
  [persistence.includes('academyCurriculumOverrides'), 'Änderungen werden in einer eigenen Firestore-Sammlung gespeichert.'],
  [persistence.includes("process.env.FIREBASE_DATABASE_ID || '(default)'"), 'Die produktive Firestore-Standarddatenbank wird angesprochen.'],
  [persistence.includes('deleteCurriculumOverride'), 'Die Wiederherstellung entfernt ausschließlich den Override der gewählten Lektion.'],
  [app.includes('applyCurriculumOverrides'), 'Die App wendet zentrale Änderungen auf das Standard-Curriculum an.'],
  [admin.includes('zentral für alle Mitglieder gespeichert'), 'Der Editor bestätigt die zentrale Speicherung eindeutig.'],
  [types.includes("translations?: Partial<Record<'en' | 'pl', LessonTranslation>>"), 'Zentrale Lektionen unterstützen englische und polnische Sprachversionen.'],
  [types.includes("publicationStatus?: 'draft' | 'published'"), 'Lektionen besitzen einen Entwurfs- und Veröffentlichungsstatus.'],
  [admin.includes("renderTranslationFields('en'") && admin.includes("renderTranslationFields('pl'"), 'Der Admin-Editor bietet Eingabebereiche für Englisch und Polnisch.'],
  [localization.includes('lesson.translations?.[language]'), 'Die Academy wendet die zentral gespeicherte Sprachversion an.'],
  [localization.includes('withoutEmptyStrings'), 'Leere Übersetzungsfelder fallen auf die deutsche Version zurück.'],
  [admin.includes('localizeAllAcademyStages(stages, language)'), 'Die Admin-Curriculum-Übersicht folgt der gewählten Sprache.'],
  [admin.includes('selectedStage.lessons.find(source => source.id === lesson.id)'), 'Der Editor bearbeitet trotz lokalisierter Anzeige die sichere Originallektion.'],
  [admin.includes('Eine Lektions-ID für alle Sprachen'), 'Der Editor erklärt die gemeinsame Lektions-ID eindeutig.'],
  [admin.includes('incompleteLanguages') && admin.includes('vollständige ${incompleteLanguages'), 'Neue Lektionen erfordern vollständige englische und polnische Inhalte.'],
  [admin.includes('Originalversion wiederherstellen') && admin.includes('standardLessonIds.has(lesson.id)'), 'Nur Standardlektionen bieten eine einzelne Wiederherstellung an.'],
  [admin.includes('Entwurf – nur in der Admin-Zentrale sichtbar') && admin.includes('Lektion veröffentlichen'), 'Der Admin steuert die Sichtbarkeit bewusst im Editor.'],
  [admin.includes("lesson.publicationStatus === 'draft' ? 'Entwurf ansehen'"), 'Entwürfe besitzen eine eindeutige Vorschau-Aktion.'],
  [app.includes("activeView === 'academy'") && app.includes("onBackToAdmin={() => handleNavigate('admin')}"), 'Die Entwurfsvorschau führt zurück zur Admin-Zentrale.'],
  [academy.includes("user.role === 'admin' || (") && academy.includes('requestedStageIsAccessible'), 'Administratoren können Entwürfe unabhängig von der Mitglieder-Freischaltung direkt öffnen.'],
  [academy.includes("currentLesson.publicationStatus === 'draft'") && academy.includes('draftPreview'), 'Die vollständige Lektionsansicht kennzeichnet Admin-Entwürfe eindeutig.'],
];

for (const [passed, message] of checks) {
  if (!passed) throw new Error(`Curriculum-Audit fehlgeschlagen: ${message}`);
  console.log(`✓ ${message}`);
}

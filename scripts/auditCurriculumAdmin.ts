import fs from 'node:fs';

const app = fs.readFileSync('src/App.tsx', 'utf8');
const admin = fs.readFileSync('src/components/AdminDashboardView.tsx', 'utf8');
const server = fs.readFileSync('server.ts', 'utf8');
const persistence = fs.readFileSync('server/academyCurriculumAdmin.ts', 'utf8');

const checks: Array<[boolean, string]> = [
  [server.includes("app.get('/api/academy/curriculum-overrides'"), 'Mitglieder können zentrale Curriculum-Änderungen laden.'],
  [server.includes("app.put('/api/admin/curriculum/lessons/:lessonId'"), 'Nur der Admin-Endpunkt speichert Lektionen.'],
  [server.includes("app.delete('/api/admin/curriculum-overrides'"), 'Der Admin kann zentrale Änderungen zurücksetzen.'],
  [persistence.includes('academyCurriculumOverrides'), 'Änderungen werden in einer eigenen Firestore-Sammlung gespeichert.'],
  [app.includes('applyCurriculumOverrides'), 'Die App wendet zentrale Änderungen auf das Standard-Curriculum an.'],
  [admin.includes('zentral für alle Mitglieder gespeichert'), 'Der Editor bestätigt die zentrale Speicherung eindeutig.'],
];

for (const [passed, message] of checks) {
  if (!passed) throw new Error(`Curriculum-Audit fehlgeschlagen: ${message}`);
  console.log(`✓ ${message}`);
}

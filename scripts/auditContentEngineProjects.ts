import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const hub = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');
const modal = readFileSync('src/components/ContentEngine/ProjectSettingsModal.tsx', 'utf8');
const server = readFileSync('server.ts', 'utf8');

assert.match(hub, /GOM-MAR Online Business/, 'Eine Online-Business-Projektvorlage fehlt.');
assert.match(hub, /Neues Content-Projekt anlegen/, 'Neue Content-Projekte müssen über die Oberfläche anlegbar sein.');
assert.match(hub, /exists[\s\S]*?\[\.\.\.projects, updatedSettings\]/, 'Neue Projekte müssen zusätzlich zu Vital50 gespeichert werden.');
assert.match(modal, /useEffect\([\s\S]*?setFormData/, 'Das Einstellungsformular muss beim Projektwechsel aktualisiert werden.');
assert.doesNotMatch(server, /projectSettings\?\.name \|\| 'Vital50'/, 'Server-Prompts dürfen nicht auf Vital50 zurückfallen.');
assert.doesNotMatch(server, /projectSettings\?\.targetAudience \|\| 'Menschen 50\+'/, 'Server-Prompts dürfen keine Vital50-Zielgruppe erzwingen.');

console.log('Content-Engine-Projekte geprüft: Vital50 und frei konfigurierbare Themenwelten bleiben getrennt.');

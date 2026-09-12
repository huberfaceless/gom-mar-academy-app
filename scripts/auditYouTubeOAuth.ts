import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/youtubeConnectionAdmin.ts', 'utf8');
const service = readFileSync('src/services/youtubeService.ts', 'utf8');
const view = readFileSync('src/components/ContentEngine/YouTubeScriptTab.tsx', 'utf8');

assert.match(server, /app\.post\('\/api\/youtube\/oauth\/start', requireVerifiedMember, requireProMember/, 'YouTube OAuth muss eine bestätigte PRO-Anmeldung verlangen.');
assert.match(server, /app\.get\('\/api\/youtube\/oauth\/callback'/, 'Der YouTube OAuth Callback fehlt.');
assert.match(server, /HttpOnly; Secure; SameSite=Lax/, 'Der OAuth-Status muss an eine sichere Browsersitzung gebunden sein.');
assert.match(storage, /https:\/\/www\.googleapis\.com\/auth\/youtube\.upload/, 'Es darf nur der erforderliche YouTube-Upload-Scope angefordert werden.');
assert.match(storage, /createHmac\('sha256'/, 'Der OAuth-Status muss kryptografisch signiert sein.');
assert.match(storage, /createCipheriv\('aes-256-gcm'/, 'YouTube Refresh Tokens müssen verschlüsselt gespeichert werden.');
assert.match(storage, /academyYouTubeConnections/, 'YouTube-Verbindungen müssen serverseitig gespeichert werden.');
assert.doesNotMatch(service, /client_secret|refresh_token/i, 'OAuth-Geheimnisse dürfen nicht in den Browser gelangen.');
assert.match(service, /authenticatedFetch\('\/api\/youtube\/oauth\/start'/, 'Der Browser muss den geschützten OAuth-Startpunkt verwenden.');
assert.match(view, /YouTube verbinden/, 'Die Content Engine muss die YouTube-Verbindung anbieten.');
const emptyState = view.slice(view.indexOf('if (!video)'), view.indexOf('// Word count'));
assert.match(emptyState, /youtubeConnectionButton/, 'Die YouTube-Verbindung muss auch ohne generiertes Skript sichtbar sein.');

console.log('YouTube OAuth geprüft: PRO-geschützt, sitzungsgebunden und verschlüsselt gespeichert.');

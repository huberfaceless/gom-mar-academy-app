import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/youtubeConnectionAdmin.ts', 'utf8');
const service = readFileSync('src/services/youtubeService.ts', 'utf8');
const view = readFileSync('src/components/ContentEngine/YouTubeScriptTab.tsx', 'utf8');
const hub = readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8');

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
assert.match(hub, /!activeContentProject[\s\S]*?<YouTubeScriptTab/, 'Die YouTube-Verbindung muss auch ohne Content-Projekt erreichbar sein.');
assert.match(server, /app\.post\('\/api\/youtube\/uploads', requireVerifiedMember, requireAcademyAdmin/, 'YouTube-Uploads müssen auf Administratoren begrenzt sein.');
assert.match(storage, /privacyStatus: 'unlisted'/, 'Neue YouTube-Videos müssen standardmäßig nicht gelistet sein.');
assert.match(storage, /uploadType=resumable/, 'Große Videos müssen über eine resumierbare YouTube-Sitzung hochgeladen werden.');
assert.match(view, /Dieses Video jetzt als „Nicht gelistet“ zu YouTube hochladen\?/, 'Der Upload muss bewusst bestätigt werden.');
assert.doesNotMatch(service, /refresh_token|client_secret/i, 'YouTube-Geheimnisse dürfen nicht in den Browser gelangen.');
assert.match(server, /app\.put\([\s\S]*?'\/api\/youtube\/uploads\/content'[\s\S]*?requireAcademyAdmin[\s\S]*?express\.raw\(\{ type: 'video\/\*', limit: '30mb' \}\)/, 'Videodaten müssen admin-geschützt und größenbegrenzt über die Academy übertragen werden.');
assert.match(server, /allowedHosts = new Set\(\['www\.googleapis\.com', 'upload\.youtube\.com'\]\)/, 'Der Upload-Proxy muss fremde Zieladressen gegen SSRF sperren.');
assert.match(service, /request\.open\('PUT', '\/api\/youtube\/uploads\/content'\)/, 'Der Browser muss Videodaten über den geschützten Academy-Endpunkt übertragen.');

console.log('YouTube OAuth geprüft: PRO-geschützt, sitzungsgebunden und verschlüsselt gespeichert.');

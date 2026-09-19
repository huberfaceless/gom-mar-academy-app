import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/pinterestConnectionAdmin.ts', 'utf8');
const worker = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
const client = readFileSync('src/services/pinterestService.ts', 'utf8');

assert.match(server, /app\.post\('\/api\/pinterest\/oauth\/start', requireVerifiedMember, requireProMember/, 'Der Pinterest OAuth-Start muss geschützt sein.');
assert.match(server, /app\.get\('\/api\/pinterest\/oauth\/callback'/, 'Der Pinterest OAuth-Callback muss verfügbar sein.');
assert.match(storage, /createCipheriv\('aes-256-gcm'/, 'Pinterest-Tokens müssen verschlüsselt gespeichert werden.');
assert.match(storage, /academyPinterestConnections/, 'Pinterest-Verbindungen müssen serverseitig gespeichert werden.');
assert.match(storage, /grant_type: 'refresh_token'/, 'Pinterest-Zugriffstokens müssen automatisch erneuert werden.');
assert.match(storage, /encryptedRefreshToken/, 'Der Pinterest Refresh-Token muss verschlüsselt gespeichert werden.');
assert.match(storage, /createHmac\('sha256'/, 'Der Pinterest OAuth-State muss signiert sein.');
assert.match(worker, /loadPinterestAccessToken[\s\S]*claimedJob\.userId/, 'Der Scheduler muss die gespeicherte Pinterest-Verbindung laden.');
assert.doesNotMatch(worker, /claimedJob\.payload\?\.accessToken/, 'Pinterest-Tokens dürfen nicht in Warteschlangenaufträgen liegen.');
assert.match(client, /JSON\.stringify\(\{ \.\.\.config, accessToken: '' \}\)/, 'Der Browser darf Pinterest-Tokens nicht dauerhaft speichern.');
assert.match(client, /window\.location\.assign\(data\.authorizationUrl\)/, 'Der Browser muss zur Pinterest-Anmeldung weiterleiten.');
assert.match(server, /app\.delete\('\/api\/pinterest\/connection'/, 'Pinterest muss getrennt werden können.');

console.log('Pinterest-Automatisierung geprüft: OAuth, verschlüsselte Refresh-Tokens und serverseitiger Scheduler sind aktiv.');

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const storage = readFileSync('server/pinterestConnectionAdmin.ts', 'utf8');
const worker = readFileSync('src/services/serverSchedulerWorker.ts', 'utf8');
const client = readFileSync('src/services/pinterestService.ts', 'utf8');

assert.match(server, /app\.post\('\/api\/pinterest\/connect', requireVerifiedMember, requireProMember/, 'Die Pinterest-Verbindung muss geschützt sein.');
assert.match(storage, /createCipheriv\('aes-256-gcm'/, 'Pinterest-Tokens müssen verschlüsselt gespeichert werden.');
assert.match(storage, /academyPinterestConnections/, 'Pinterest-Verbindungen müssen serverseitig gespeichert werden.');
assert.match(worker, /loadPinterestAccessToken[\s\S]*claimedJob\.userId/, 'Der Scheduler muss die gespeicherte Pinterest-Verbindung laden.');
assert.doesNotMatch(worker, /claimedJob\.payload\?\.accessToken/, 'Pinterest-Tokens dürfen nicht in Warteschlangenaufträgen liegen.');
assert.match(client, /JSON\.stringify\(\{ \.\.\.config, accessToken: '' \}\)/, 'Der Browser darf Pinterest-Tokens nicht dauerhaft speichern.');
assert.match(server, /app\.delete\('\/api\/pinterest\/connection'/, 'Pinterest muss getrennt werden können.');

console.log('Pinterest-Automatisierung geprüft: verschlüsselte Verbindung und serverseitiger Scheduler sind aktiv.');

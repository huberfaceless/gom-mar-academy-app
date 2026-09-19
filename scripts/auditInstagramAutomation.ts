import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server = readFileSync('server.ts', 'utf8');
const connection = readFileSync('server/instagramConnectionAdmin.ts', 'utf8');
const client = readFileSync('src/services/instagramService.ts', 'utf8');
const modal = readFileSync('src/components/ContentEngine/InstagramPublishModal.tsx', 'utf8');
const pins = readFileSync('src/components/ContentEngine/PinterestPinsTab.tsx', 'utf8');
const legal = readFileSync('src/components/LegalModal.tsx', 'utf8');
const publicPrivacy = readFileSync('public/privacy/index.html', 'utf8');

assert.match(server, /app\.post\('\/api\/instagram\/oauth\/start', requireVerifiedMember, requireProMember/, 'Instagram OAuth muss geschützt sein.');
assert.match(server, /app\.get\('\/api\/instagram\/oauth\/callback'/, 'Der Instagram OAuth-Callback fehlt.');
assert.match(server, /app\.post\('\/api\/instagram\/publish-image', requireVerifiedMember, requireProMember/, 'Instagram-Veröffentlichungen müssen geschützt sein.');
assert.match(connection, /createCipheriv\('aes-256-gcm'/, 'Instagram-Tokens müssen verschlüsselt gespeichert werden.');
assert.match(connection, /academyInstagramConnections/, 'Instagram-Verbindungen müssen serverseitig gespeichert werden.');
assert.match(connection, /ig_exchange_token/, 'Kurzlebige Instagram-Tokens müssen in langlebige Tokens umgewandelt werden.');
assert.match(connection, /ig_refresh_token/, 'Instagram-Tokens müssen automatisch erneuert werden.');
assert.match(connection, /instagram_business_content_publish/, 'Die Veröffentlichungsberechtigung fehlt.');
assert.match(connection, /media_publish/, 'Die echte Instagram-Veröffentlichung fehlt.');
assert.match(client, /authenticatedFetch\('\/api\/instagram\/oauth\/start'/, 'Der Browser muss den geschützten OAuth-Start verwenden.');
assert.doesNotMatch(client, /client_secret|access_token/i, 'Instagram-Geheimnisse dürfen nicht in den Browser gelangen.');
assert.match(modal, /Instagram verbinden/, 'Die Oberfläche muss eine Instagram-Verbindung anbieten.');
assert.match(pins, /Auf Instagram posten/, 'Generierte Grafiken müssen an Instagram übergeben werden können.');
assert.match(legal, /Instagram-Verbindung/, 'Die interne Datenschutzerklärung muss Instagram erläutern.');
assert.match(publicPrivacy, /Instagram-Verbindung/, 'Die öffentliche Datenschutzerklärung muss Instagram erläutern.');

console.log('Instagram-Automatisierung geprüft: OAuth, verschlüsselte Tokens und echte Bildveröffentlichung sind vorbereitet.');

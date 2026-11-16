import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { wordpressSeoBridgeSource } from '../server/wordpressSeoBridge';
export const schemaHarness = readFileSync('scripts/fixtures/wordpressSeoBridgeHarness.php', 'utf8').replace('/* Academy plugin injected here */', wordpressSeoBridgeSource.replace(/^<\?php\s*/, ''));
const result = spawnSync('php', [], { input: schemaHarness, encoding: 'utf8' });
if (result.error && 'code' in result.error && result.error.code === 'ENOENT') {
  console.log('PHP-CLI nicht installiert: PHP-Ausführung separat prüfen.');
} else {
  assert.equal(result.status, 0, result.stderr + result.stdout);
  assert.match(result.stdout, /exclusions passed/);
  console.log(result.stdout.trim());
}

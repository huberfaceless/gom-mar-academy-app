import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync('.github/workflows/ci.yml', 'utf8');
const server = readFileSync('server.ts', 'utf8');
const dockerfile = readFileSync('Dockerfile', 'utf8');

assert.match(workflow, /needs: quality/, 'Deployment muss die Qualitätsprüfung abwarten.');
assert.match(workflow, /google-github-actions\/auth@v3/, 'Workload-Identity-Authentifizierung fehlt.');
assert.match(workflow, /google-github-actions\/deploy-cloudrun@v3/, 'Cloud-Run-Deployment fehlt.');
assert.match(workflow, /id-token: write/, 'GitHub OIDC-Berechtigung fehlt.');
assert.match(workflow, /source: \./, 'Deployment muss den geprüften Repository-Stand verwenden.');
assert.match(workflow, /flags: --clear-base-image/, 'Die frühere AI-Studio-Basisbildverwaltung muss beim Deployment deaktiviert werden.');
assert.match(workflow, /env_vars_update_strategy: merge/, 'Bestehende Cloud-Run-Konfiguration muss erhalten bleiben.');
assert.match(workflow, /APP_COMMIT_SHA=\$\{\{ github\.sha \}\}/, 'Commit-Nachweis fehlt.');
assert.doesNotMatch(workflow, /credentials_json|GCP_SA_KEY/, 'Dauerhafte Service-Account-Schlüssel sind nicht zulässig.');

for (const variable of [
  'GCP_PROJECT_ID',
  'GCP_REGION',
  'CLOUD_RUN_SERVICE',
  'GCP_WORKLOAD_IDENTITY_PROVIDER',
  'GCP_SERVICE_ACCOUNT',
]) {
  assert.match(workflow, new RegExp(`vars\\.${variable} != ''`), `${variable} muss vor dem Deployment geprüft werden.`);
}

assert.match(server, /process\.env\.K_REVISION \|\| null/, 'Cloud-Run-Revision fehlt im Health-Check.');
assert.match(server, /process\.env\.APP_COMMIT_SHA \|\| null/, 'Commit fehlt im Health-Check.');
assert.match(dockerfile, /RUN bun install --frozen-lockfile/, 'Reproduzierbare Installation im Docker-Build fehlt.');
assert.match(dockerfile, /CMD \["node", "dist\/server\.js"\]/, 'Produktionsstart im Dockerfile fehlt.');

console.log('Cloud-Run-Deployment geprüft: Qualitätstor, OIDC, Konfigurationserhalt und Revisionsnachweis sind aktiv.');

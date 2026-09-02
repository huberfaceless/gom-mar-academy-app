import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync('.github/workflows/ci.yml', 'utf8');
const server = readFileSync('server.ts', 'utf8');
const dockerfile = readFileSync('Dockerfile', 'utf8');

assert.match(workflow, /needs: quality/, 'Deployment muss die Qualitätsprüfung abwarten.');
assert.match(workflow, /google-github-actions\/auth@v3/, 'Workload-Identity-Authentifizierung fehlt.');
assert.match(workflow, /google-github-actions\/setup-gcloud@v3/, 'Google Cloud CLI fehlt.');
assert.match(workflow, /gcloud run deploy/, 'Cloud-Run-Deployment fehlt.');
assert.match(workflow, /id-token: write/, 'GitHub OIDC-Berechtigung fehlt.');
assert.match(workflow, /--source="\."/, 'Deployment muss den geprüften Repository-Stand verwenden.');
assert.match(workflow, /--container="app-container"[\s\S]*--source="\."[\s\S]*--update-env-vars=[\s\S]*--no-automatic-updates/, 'Containerschalter und Quellparameter müssen in Cloud-Run-kompatibler Reihenfolge stehen.');
assert.doesNotMatch(workflow, /--clear-base-image/, 'Quellbereitstellungen dürfen keine verwaiste Quellenreferenz durch --clear-base-image erzeugen.');
assert.match(workflow, /--update-env-vars=/, 'Bestehende Cloud-Run-Konfiguration muss per Update erhalten bleiben.');
assert.match(workflow, /APP_COMMIT_SHA=\$\{GITHUB_SHA\}/, 'Commit-Nachweis fehlt.');
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

# Cloud-Run-Bereitstellung

Nach erfolgreicher Projektprüfung kann GitHub Actions den geprüften Stand automatisch nach Cloud Run deployen. Die Anmeldung verwendet kurzlebige OpenID-Connect-Tokens über Workload Identity Federation; ein dauerhafter Service-Account-Schlüssel gehört nicht in GitHub.

## Repository-Variablen

Unter `Settings → Secrets and variables → Actions → Variables` werden diese fünf Variablen benötigt:

| Variable | Wert |
| --- | --- |
| `GCP_PROJECT_ID` | `gen-lang-client-0943155541` |
| `GCP_REGION` | `us-west1` |
| `CLOUD_RUN_SERVICE` | `gom-mar-academy` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | vollständiger Providername aus Google Cloud |
| `GCP_SERVICE_ACCOUNT` | E-Mail des Deployment-Servicekontos |

Solange eine Variable fehlt, bleibt der Deployment-Job sicher übersprungen. Die Qualitätsprüfung läuft weiterhin vollständig.

## Einmalige Google-Cloud-Einrichtung

Die folgenden Namen sind Vorschläge; bestehende gleichwertige Ressourcen können wiederverwendet werden.

```bash
PROJECT_ID="gen-lang-client-0943155541"
PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')"
REGION="us-west1"
SERVICE="gom-mar-academy"
POOL="github"
PROVIDER="gom-mar-academy"
DEPLOYER="github-cloud-run-deployer"
REPOSITORY="huberfaceless/gom-mar-academy-app"

gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  --project="${PROJECT_ID}"

gcloud iam service-accounts create "${DEPLOYER}" \
  --project="${PROJECT_ID}" \
  --display-name="GitHub Cloud Run Deployment"

gcloud iam workload-identity-pools create "${POOL}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions"

gcloud iam workload-identity-pools providers create-oidc "${PROVIDER}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL}" \
  --display-name="GOM-MAR Academy GitHub" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository == '${REPOSITORY}' && assertion.ref == 'refs/heads/main'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

gcloud iam service-accounts add-iam-policy-binding \
  "${DEPLOYER}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL}/attribute.repository/${REPOSITORY}"

for ROLE in roles/run.sourceDeveloper roles/serviceusage.serviceUsageConsumer; do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${DEPLOYER}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="${ROLE}"
done

RUNTIME_SERVICE_ACCOUNT="$(gcloud run services describe "${SERVICE}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(spec.template.spec.serviceAccountName)')"
RUNTIME_SERVICE_ACCOUNT="${RUNTIME_SERVICE_ACCOUNT:-${PROJECT_NUMBER}-compute@developer.gserviceaccount.com}"

gcloud iam service-accounts add-iam-policy-binding "${RUNTIME_SERVICE_ACCOUNT}" \
  --project="${PROJECT_ID}" \
  --member="serviceAccount:${DEPLOYER}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/run.builder"

gcloud iam roles create academyMembershipManager \
  --project="${PROJECT_ID}" \
  --title="Academy Membership Manager" \
  --description="Darf Academy-Tarife in Firebase Auth lesen und aktualisieren" \
  --permissions="firebaseauth.users.get,firebaseauth.users.update" \
  --stage="GA"

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="projects/${PROJECT_ID}/roles/academyMembershipManager"
```

Danach werden die beiden von Google ausgegebenen Werte als Repository-Variablen eingetragen:

```bash
gcloud iam workload-identity-pools providers describe "${PROVIDER}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL}" \
  --format='value(name)'

echo "${DEPLOYER}@${PROJECT_ID}.iam.gserviceaccount.com"
```

Nach dem Speichern der fünf Variablen wird unter `Actions → Projektpruefung → Run workflow` einmalig ein manueller Lauf auf `main` gestartet. Danach deployt jeder erfolgreiche Push auf `main` automatisch.

## Kontrolle

Der Deployment-Job übergibt den exakten Git-Commit als `APP_COMMIT_SHA`. Anschließend ruft er `/api/health` auf und akzeptiert die Bereitstellung nur, wenn Cloud Run genau diesen Commit meldet. `--container=app-container --clear-base-image` übernimmt bei der ersten Migration den bestehenden AI-Studio-Containernamen und beendet anschließend die frühere Basisbildverwaltung, damit der Dockerfile-Container ohne veraltete Quellen-Markierungen übernommen wird. Bestehende Cloud-Run-Umgebungsvariablen und Secret-Manager-Zuordnungen werden durch die Merge-Strategie beibehalten.

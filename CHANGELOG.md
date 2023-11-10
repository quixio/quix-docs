# Quix product changelog

## Latest release

### 2023-11-01-brokers | 2nd November 2023

`IMPROVEMENTS`

* Disabled billing/prices for BYOC users
* Updated behavior of ***run*** button in applications for ungated users
* Code samples progression stepper updated
* Brokers
    * Updated copies of broker setup guides
    * Added default cluster sizes for Redpanda and Aiven
    * Added new toggle to config panel for managed and self-hosted Redpanda connections
    * Added file validation to only allow users to upload zip, pem, or cert files for the CA certificate
    * Re-enabled cluster size toggles for Redpanda and Aiven
    * New default values for topic configuration based on broker types
* Redacted logs that contain secrets
* Made the PAT token field skinnier

`BUG FIXES`

* Data explorer
    * Search field was clearing when switching to live
    * Removed redundant query to telemetry
* Applications
    * Run config was out of sync with env variables
    * “Branch to edit” button was selecting the wrong commit
    * Converting a hidden variable to a secret was not displaying in redeploy deployment dialogue
    * Output topic was visually missing in deployment dialogue
* Deployment details
    * Lineage disappears when websocket connections fail
* YAML
    * -1 retention in topics was setting as -60000.
* Platform
    * Workspaces were stuck in “creating”/”updating” status
    * Topic quota logic caused external topics and topics that failed to create to count towards organisation quotas
    * StreamPackageType changed so icons for data types in messages weren’t being displayed correctly
    * Changing to a locally-created branch was not displaying backend errors
    * Resolved various console errors caused by Front-End component interactions

## Changelog archives

* [2023](./changelogs/2023-archive.md)
* [2022](./changelogs/2022-archive.md)

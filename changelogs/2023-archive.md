# 2023 changelog archive

## 2023-11-01-brokers | 2 NOVEMBER 2023

`IMPROVEMENTS`

- Disabled billing/prices for BYOC users
- Updated behavior of *run* button in applications for ungated users
- Code samples progression stepper updated
- Brokers
    - Updated copies of broker setup guides
    - Added default cluster sizes for Redpanda and Aiven
    - Added new toggle to config panel for managed and self-hosted Redpanda connections
    - Added file validation to only allow users to upload zip, pem, or cert files for the CA certificate
    - Re-enabled cluster size toggles for Redpanda and Aiven
    - New default values for topic configuration based on broker types
- Redacted logs that contain secrets
- Made the PAT token field skinnier

`BUG FIXES`

- Data explorer
    - Search field was clearing when switching to live
    - Removed redundant query to telemetry
- Applications
    - Run config was out of sync with env variables
    - “Branch to edit” button was selecting the wrong commit
    - Converting a hidden variable to a secret was not displaying in redeploy deployment dialogue
    - Output topic was visually missing in deployment dialogue
- Deployment details
    - Lineage disappears when websocket connections fail
- YAML
    - -1 retention in topics was setting as -60000.
- Platform
    - Workspaces were stuck in “creating”/”updating” status
    - Topic quota logic caused external topics and topics that failed to create to count towards organisation quotas
    - StreamPackageType changed so icons for data types in messages weren’t being displayed correctly
    - Changing to a locally-created branch was not displaying backend errors
    - Resolved various console errors caused by Front-End component interactions

## 2023-10-04-redpanda | 25 OCTOBER 2023

`NEW FEATURES`

- Environments
    - Brand new RedPanda and Aiven broker settings setup on the environment creation

`BUG FIXES`

- Environments
    - Fixed a bug where the High-Performance selection was forcing users to Enter payment for non-trial tiers
- Data Explorer
    - Adding new parameters in the persisted data query was cleaning Table view incorrectly.
- Pipeline
    - Fixed a bug where the Deployments URLs were not working on the Pipeline view

## 2023-10-03-byoc-hf | 19 OCTOBER 2023

`BUG FIXES`

- Replay Service
    - Tags present in a Parameter and Event at the same time were not replayed correctly on the Events side.
- Data Explorer
    - Fixed exception “The channel has been closed” in some race conditions during Topic closing.
    - Tags on events were not returned correctly when there were duplicate tag names

## 2023-10-02-byoc | 18 OCTOBER 2023

`NEW FEATURES`

- Onboarding
    - Project/environment creation
        - 1 step onboarding auto-creates a project and environment and sends user directly to pipeline with 1 click
        - optional advanced setup takes users to regular project & environment creation flow
    - “Upgrade” button on premium storage to allow users to sign up to serverless and select premium storage during onboarding

`IMPROVEMENTS`

- Environment creation
    - Improved copy of storage settings → “Data and streaming services” and introductory text
        - Tooltips on storage option cards to add usage context
        - “Premium storage” → “High performance”
    - Behaviour of ***tab*** key-press on input fields
- Data explorer
    - Live view now preserves previously selected options
    - Improved general performance and stability of underlying Live data services to support high volumes of data and subscriptions.
- Applications
    - Branch dropdown UX improvements
    - Improved overall performance of commit history component
- Deployments
    - Escaping Build arguments coming from environment variables to remove vulnerabilities
    - Delete deployment dialogue alignment
- Topics
    - Topic configuration can be updated now via YAML file.
- Secrets
    - General UX enhancements on secrets management panel
    - Conflict error handling to prevent users from overriding each other’s changes
    - Secret key on YAML is now called “SecretKey” instead of usual “Value”
- Projects
    - Removed “retry” button in YAML for failed syncs, and replaced with “roll back” or “sync to latest” (the latter for when a user corrects their yaml and wants to sync again)
    - Improved YAML parsing to maintain the order of elements during merging and syncronization.
    - YAML variables definition in the code can now be composed by a combination of text or multiple variables. (ex: “{variable1}-sometext-{variable2}”)
    - Loader on branch dropdown when switching branches for an environment
    - New organisation homepage Projects/Environments counters
- Other
    - Autofocus behavior improvements to input fields on onboarding
    - Improved FE performance by changing the way angular components are interacted with
    - Topic component now saves input if a user clicks away from field (previously changes were cleared and confusing users)
    - Added advanced configuration to the Replay service API allowing special reading and writing tunning for some specific use cases.
- Internal:
    - Several improvements to enable BYOC releases
    - Social signup removed for BYOC users
    - Improved Build Service startup time
    - Upgraded service base images to remove vulnerabilities
    - Removed some spammy logs on Deployment service and Workspace service.
    - Improved Git error handling during merges
    - Attached metadata information to the list of files returned by Git service
    
`BUG FIXES`

- Pipeline
    - Fixed a bug where topic metrics were frozen in certain stressed situations.
- Applications
    - Run button in run configuration was not running the application if there were no changes to topics
    - Branch dropdown is now disabled when an operation is in progress to avoid branch-switching issues
    - Cross button during add/rename file was not saving changes
- Deployments
    - Fixed UI crashes when deployment metrics are broken
    - Fixed a bug that was preventing to edit state management configuration
    - Replica warnings were not updating when changing topics
    - Edit deployment modal was showing latest commit regardless of version deployed
    - Fixed a bug where topic metrics were not unsubscribed when switching environments
    - Variables of type Secret that are not Required are no longer raising an exception if the secret is missing in the environment.
- Replays
    - Replay configurations are now persisted in the platform reloading them automatically after service shutdown.
- Projects
    - Don’t stop project deletion if the repo has already been deleted
- Data Explorer
    - Messages were disappearing when a filter was applied on Live data
    - Some data explorer timestamps were being displayed 1/1000th of a second behind
- Other
    - Various fixes to external URLs on platform
    - Fixed some incorrectly handled errors on Streaming Writer service
    - Fixed an issue causing “Exceeded memory limit for $group" exception when querying persisted data with a big number of parameters (>3000).
- Internal
    - Fixed some issues related to tokens and permissions of the platform
    - Fixed some CORS issues on Portal backend
    - Fixed an issue in the Update versions service where the workspace update was failing during Creation or Deletion of the workspace.

## 2023-10-01-deployment-hf | 3 OCTOBER 2023

`IMPROVEMENTS`

- Added unsaved changes dialogue to YAML variables
- Pipeline cards for deployments now show number of replicas

`BUG FIXES`

- Deployment dialogue was overwriting deployment config with default values when editing
- “+ New environment” for users whose trials have run out was not showing correct dialogue
- Fixed enable buttons on organization homepage for:
    - environment cards
    - project card context menus
- Removed unnecessary calls to secrets endpoint
- Messages in data explorer were looking like they were disappearing

Second release under tag release/2023-10-01-deployment-hf-2:

- Settings page was broken for V1 workspaces



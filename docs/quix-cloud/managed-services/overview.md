# Overview

Managed services are Quix-provided applications built from Quix-maintained container images. You deploy them like any other application; the difference is you set `deploymentType: Managed`, choose a supported `application`, and pick a `version`. Quix manages the image lifecycle (versions and updates).

Note

- In the Quix UI, some managed services are also available from the side panel as Connectors or Services. You can add them from there or reference them directly in YAML as shown below.

## Why use managed services?

- Pre-built and supported by Quix – no code to maintain
- Versioned images managed by Quix (use `latest` or pin a version)
- Security patches, bug fixes, and feature improvements shipped by Quix as new image versions (you choose when to adopt)

## Available managed services

- Dynamic Configuration Manager (`DynamicConfiguration`)
- Quix Lake - Sink (`DataLake.Sink`)
- Quix Lake - Replay (`DataLake.Replay`)

## Quick example

Here’s an example managed service definition you can add to your pipeline YAML in:

```yaml
deployments:
- name: Dynamic Configuration Manager
  application: DynamicConfiguration
  version: latest
  deploymentType: Managed
  resources:
   cpu: 200
   memory: 500
   replicas: 1
  configuration:
   topic: config-updates
   mongoDatabase: quix
   mongoCollection: configuration-api
   mongoHost: mongodb
   mongoPort: 27017
   mongoUser: admin
   mongoPasswordSecret: mongoPasswordSecret
```

Notes

- `application` selects the managed app to run. Use one of the supported identifiers listed above.
- `version` can be `latest` or a specific version that Quix publishes for that application.
- `configuration` keys are specific to each managed service. See each service page for details.

## Configuration (simplified)

Managed services introduce a `configuration` section to make deployments easier to read and maintain. Instead of defining a large set of environment variables, you provide a small number of descriptive keys. At deploy time, Quix resolves these into the underlying environment variables and wiring needed by the managed image. This keeps your YAML concise while still allowing you to use secrets and advanced settings when needed. See each service page for the supported configs.

## Versioning and upgrades

- Use `version: latest` to automatically receive the newest compatible image maintained by Quix.
- Pin to an explicit version to control upgrade timing. You can later change the version and redeploy to upgrade.
- Same behavior as normal applications: if you use `latest` and Quix publishes a new image, your deployment will show as out of sync. Redeploy/sync to adopt the new image. If you pin a version, it stays stable until you change it.

## Service pages

- Dynamic Configuration Manager: `quix-cloud/managed-services/dynamic-configuration.md`

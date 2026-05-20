---
title: Portal API overview
description: The Portal API is the REST API that drives the Quix Cloud portal — use it to script everything you can do in the UI.
---

# Portal API overview

The Portal API is the REST API behind the Quix Cloud portal. Anything you can do through the UI — provision environments, manage applications, deploy services, configure topics, manage users — you can do programmatically through the Portal API.

It is account-wide (unlike the per-environment Streaming Reader API), so the base URL is the same regardless of which environment you are targeting:

```
https://portal-api.cloud.quix.io/
```

Most endpoints scope themselves to an environment via a request parameter or body field rather than via the host name.

## What you can do with it

The Portal API covers the same resource model as the portal. The main resource groups are:

- **Organizations, workspaces (environments), and repositories** — the project / environment / Git layout.
- **Applications and deployments** — create, configure, deploy, redeploy, scale, and inspect services and jobs.
- **Topics, data tiers, and Quix Lake** — manage streams, tiered storage, and historic data access.
- **Library, templates, and plugins** — the Code Samples catalog and reusable building blocks.
- **Variables, secrets, container registries, blob storage** — pipeline configuration and supporting infrastructure.
- **Users, profiles, sessions, and auth** — identity and access.
- **Auditing and CLI analytics** — operational telemetry.

The full set of endpoints, with request and response schemas, lives in the [Swagger reference](https://portal-api.cloud.quix.io/swagger/index.html){target=_blank}. Use the `Select a definition` dropdown there to switch between API versions.

## Authentication

All Portal API requests use a [Personal Access Token (PAT)](../../access-security/personal-access-token.md) as a bearer token:

```http
Authorization: bearer <your-pat>
```

A missing or invalid token returns `401 Unauthorized`. See [HTTP requests](./http-requests.md) for full request conventions.

## When to use the Portal API

- Automating environment or deployment lifecycle (CI/CD, infrastructure-as-code).
- Building internal tooling on top of Quix — dashboards, custom admin UIs, onboarding flows.
- Bulk operations that would be tedious through the portal (creating many topics, updating variables across deployments, etc.).
- Integrating Quix into another platform's control plane.

For day-to-day local development you usually want the [Quix CLI](../../quix-cli/overview.md), which calls the Portal API under the hood and handles authentication, environment selection, and YAML syncing for you.

## Next steps

- [Setup](./setup.md) — get a PAT and find your environment ID.
- [HTTP requests](./http-requests.md) — request headers, endpoint URLs, and conventions.
- [Swagger reference](https://portal-api.cloud.quix.io/swagger/index.html){target=_blank} — the full endpoint catalog.

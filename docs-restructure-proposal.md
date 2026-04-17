# Quix Cloud Docs Restructure Proposal

**Ticket:** [sc-70306](https://app.shortcut.com/quix/story/70306/improve-quix-cloud-docs-structure)  
**Date:** 2026-04-17  
**Status:** Proposed — awaiting approval

---

## Problem

The current "Quix Cloud" docs section has several structural issues identified by reading every file:

1. **"Quix Cloud Tour" is a misnomer** — it holds the entire platform reference (~45 pages) inside a "tour" wrapper with numbered sections that imply a rigid sequence nobody follows
2. **Security is duplicated** — `quix-cloud/security.md` and `manage/security.md` cover the same topic with different wording
3. **`deploying-connectors.md` exists but is missing from the nav** — it's invisible to users
4. **Blob storage is under Managed Services** but it's actually Quix Lake configuration (where Lake stores data)
5. **APIs are split** — Streaming Reader API lives inside "Develop", Portal API inside "Manage", but both files are in `apis/` 
6. **Authentication lives under `develop/`** but is needed by APIs, integrations, and external sources too
7. **`create/`, `develop/`, `deploy/`, `manage/` sit at the docs root**, disconnected from `quix-cloud/`, making the filesystem and nav completely different mental models
8. **Quix Lake and Managed Services have duplicate pages** — `sink.md` and `replay.md` appear in both nav sections

---

## Proposed Structure (Option 3 — Product-area co-location)

Reorganize around **what users are working with**, so related files live together and the filesystem mirrors the nav.

```
Quix Cloud
├── Get Started
│   ├── Overview
│   ├── Why Quix Cloud
│   ├── Quickstart
│   └── Hosting Options
│
├── Projects                        → quix-cloud/projects/
│   ├── Projects & Environments     (concept: monorepo model, terminology)
│   ├── Project Structure & YAML    (project-structure.md + yaml cross-ref)
│   ├── Topics & Data Tiers
│   ├── Create a Project
│   ├── Create an Environment
│   ├── Clone a Project
│   ├── Fork a Project
│   ├── Scratchpads
│   ├── Linked Projects
│   ├── Protected Environments
│   ├── Syncing an Environment
│   └── Git Submodules
│
├── Applications                    → quix-cloud/applications/
│   ├── Create an Application
│   ├── Code Samples
│   ├── Shared Folders
│   ├── Dev Sessions
│   │   ├── Overview
│   │   ├── VS Code
│   │   └── Marimo
│   ├── Authentication
│   │   ├── Personal Access Token
│   │   ├── Streaming Token
│   │   └── Authenticating Quix Streams
│   ├── Integrate Data
│   │   ├── Overview
│   │   ├── Sources (connectors, CSV, polling, webhooks, external source,
│   │   │           Quix Streams, web app, compressed data, IoT/MessagePack)
│   │   └── Sinks (prebuilt destination, external destination)
│   └── Process Data
│       ├── Overview
│       ├── Types of Processing
│       ├── Types of Transform
│       └── Generating Events
│
├── Deployments                     → quix-cloud/deployments/
│   ├── Deploy Overview
│   ├── Deploy a Public Service
│   ├── Deploy an External Image
│   ├── Private Container Registries
│   ├── Environment Variables
│   ├── Secrets Management
│   ├── Quix Variables (reference)
│   ├── YAML Variables
│   ├── Configuring Network Ports
│   └── State Management
│
├── Quix Lake                       → quix-cloud/quix-lake/  (single place, no duplicates)
│   ├── What is Quix Lake
│   ├── Open Format
│   ├── User Interface
│   ├── API
│   ├── Blob Storage                (moved from Managed Services — it's Lake config)
│   ├── DataLake.Sink
│   └── DataLake.Replay
│       └── Message Transformations
│
├── Platform Services               → quix-cloud/services/
│   ├── Managed Services Overview
│   ├── Deploying Connectors        (currently missing from nav — now surfaced!)
│   ├── Dynamic Configuration
│   └── Plugin System               (moved from top-level singleton)
│
├── Operations                      → quix-cloud/operations/
│   ├── Security & Compliance       (merged: quix-cloud/security.md + manage/security.md)
│   ├── Roles & Permissions
│   ├── Troubleshooting
│   ├── MLOps
│   └── Testing Environments
│
├── APIs                            → quix-cloud/apis/
│   ├── Overview
│   ├── Portal API
│   │   ├── Overview
│   │   ├── Setup
│   │   └── HTTP Requests
│   └── Streaming Reader API
│       ├── Overview
│       ├── Setup
│       ├── Reading Data
│       └── Subscriptions & Events
│
└── Integrations                    → integrations/ (stays in place)
    ├── Brokers
    ├── Databases
    └── Vector Databases
```

---

## File Moves Summary

| Current path | New path |
|---|---|
| `create/*.md` | `quix-cloud/projects/*.md` |
| `develop/**.md` | `quix-cloud/applications/**.md` |
| `deploy/*.md` | `quix-cloud/deployments/*.md` |
| `manage/*.md` | `quix-cloud/operations/*.md` |
| `manage/security.md` | merged into `quix-cloud/security.md` |
| `apis/**.md` | `quix-cloud/apis/**.md` |
| `quix-cloud/managed-services/blob-storage.md` | `quix-cloud/quix-lake/blob-storage.md` |
| `quix-cloud/plugin.md` | `quix-cloud/services/plugin.md` |
| `quix-cloud/deploying-connectors.md` | `quix-cloud/services/deploying-connectors.md` |
| `hosting/overview.md` | `quix-cloud/get-started/hosting.md` |
| `quix-cloud/quixlake/` | `quix-cloud/quix-lake/` (rename folder) |

Redirects needed for all old URLs. ~60 file moves total.

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Blob storage → Quix Lake | It configures where Lake stores data — it's Lake setup, not a separate service |
| Authentication → Applications | Developers encounter auth when building apps, but it's also pulled out as a standalone section for API users |
| Security merged | Two pages covering the same topic (encryption, RBAC, compliance) — merge into one authoritative page |
| deploying-connectors.md surfaced | The file exists but was never added to the nav |
| APIs promoted to top-level section | Currently split across Develop and Manage by accident of history |
| Plugin System → Platform Services | It's about extending the platform, not a standalone product |
| Numbers removed from sections | "1. Create your project" implies a required sequence; users are not following a tour |

---

## What Stays the Same

- `integrations/` directory — already well-structured, stays at root
- `quix-cloud/quixtour/` example pages — can be addressed separately (potential tutorial section)
- All page content — no content changes, only reorganization

---
title: Dev Sessions
description: Write, run, and debug Python code in your browser — no local setup required. Dev Sessions give you a live coding environment connected to your Quix project and Git repository.
---

# Dev Sessions

Dev Sessions give you a live, browser-based coding environment directly in your Quix project — no local setup required. Write code, install packages, explore data, and get AI assistance while your changes commit back to Git automatically. Sessions are private to the user who created them.

To create a dev session, open your environment in Quix and click **Dev Sessions** in the left sidebar.

Under the hood, each session runs as an ephemeral Kubernetes pod in your Quix Cloud cluster, preconfigured with Python tooling and connected to your project's Git repository.

Quix offers two session types:

- **[VS Code](./vscode-devsessions.md)** -- a full code-server IDE with terminal access, devcontainer customization, and local Git integration. Use this when you're building an application: editing multiple files, running commands, installing packages, or debugging.
- **[Marimo](./marimo-devsessions.md)** -- a reactive Python notebook linked to a specific deployment. Use this when you want to explore data or prototype logic in a notebook that auto-commits back to your deployment's Git folder.

Both types come with Python and common dev tools preinstalled. See each page for the full list and how to add your own dependencies.

## Session lifecycle

Sessions have distinct states, shown as a status chip in the session list and detail views:

- **Starting** — the session container is being scheduled and launched.
- **Initializing** — the session is running setup steps (installing dependencies, running lifecycle hooks). This can take up to a minute on first start.
- **Running** — the session is ready to use.
- **Stopping / Stopped** — the session has been stopped; your files are preserved.
- **Failed** — the session could not start. Check the session logs for details.

**Stop vs Terminate** -- these are different actions:

- **Stop** shuts down the session but **keeps your files**. Your code, Python environment, and uncommitted changes are preserved. You can start the session again later and pick up where you left off.
- **Terminate** (or Delete) shuts down the session **and permanently deletes all your local files**. Any changes you have already committed are safe in Git; only uncommitted work is lost.

If your session has no persistent storage configured, stopping and terminating have the same effect -- both destroy all session state.

## Environment variables and secrets

You can pass environment variables and secret references to any session type. Set them when you create the session (in the Advanced tab) or edit them later. Variables defined in your application's `app.yaml` are also loaded automatically.

**Environment variables** are plain key-value pairs passed directly to your session.

**Secret keys** reference secrets stored in Quix. The key is the environment variable name exposed in the session, and the value is the name of the secret in your Quix project. This keeps sensitive values out of your session configuration.

## Auto-commit settings

Both session types support auto-commit, which watches your application folder for file changes and pushes them to Git automatically. You can configure this when creating or editing a session:

- **Auto-commit toggle** -- enabled by default. Turn it off if you prefer to commit manually.
- **Commit interval** -- how long the session waits after your last edit before committing (default: 5 seconds, range: 1--3600 seconds). A shorter interval commits more frequently; a longer one batches more changes together.

See each session type's page for details on how auto-commit works.

## Session logs

Every session streams its logs in real time. You can view logs from the session detail page or from the session list's action menu. Logs are available while the session is running and during startup — useful for diagnosing startup failures or dependency install errors. You can also download logs for offline review.

## Version updates

Quix tracks whether a newer version of the dev session software is available. When an update exists, the session shows an **Outdated** badge. You can update by choosing **Start & update** (for stopped sessions) or **Restart & update** (for running sessions). This updates the session software without losing your files.

For Marimo sessions, updates come from the linked deployment. For VS Code sessions, they come from the platform's base session image.

## Organization-level management

Organization admins can view all dev sessions across all environments from **Organization Settings > Dev Sessions**. This view supports filtering by user, session type, environment, and project -- useful for monitoring resource usage or cleaning up abandoned sessions.

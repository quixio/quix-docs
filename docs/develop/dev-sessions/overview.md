---
title: Dev Sessions
description: Browser-based cloud development environments for building and testing stream processing applications.
---

# Dev Sessions

Dev sessions are ephemeral, browser-based development environments that run as Kubernetes pods in your Quix Cloud cluster. Each session connects to your project's Git repository and comes preconfigured with Python tooling and AI assistance. Each session is private to the user who created it. To create a dev session, open your environment in Quix and click **Dev Sessions** in the left sidebar.

Quix offers two session types:

- **[VS Code](./vscode-devsessions.md)** -- a full code-server IDE with terminal access, devcontainer customization, and local Git integration. Use this when you're building an application: editing multiple files, running commands, installing packages, or debugging.
- **[Marimo](./marimo-devsessions.md)** -- a reactive Python notebook linked to a specific deployment. Use this when you want to explore data or prototype logic in a notebook that auto-commits back to your deployment's Git folder.

Both types come with Python and common dev tools preinstalled. See each page for the full list and how to add your own dependencies.

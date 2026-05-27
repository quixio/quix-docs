---
title: Marimo dev sessions
description: Explore data and prototype Python logic in a reactive notebook linked to your Quix deployment — changes commit to Git automatically.
---

# Marimo dev sessions

[Marimo](https://marimo.io){target=_blank} is an open source Python notebook where cells re-execute automatically when their dependencies change — no hidden state, no manual re-runs. Marimo dev sessions give you this reactive notebook experience directly in your browser, linked to a specific deployment in your project. For a comparison with VS Code sessions, see the [overview](./overview.md).

## What's preinstalled

The Marimo base image includes:

- **Marimo** (latest) -- the reactive notebook runtime.
- **Python packages** -- `fsspec`, `httpx`, `pydantic`, and the Quix SDK.
- **Claude Sonnet AI assistant** -- Marimo's built-in AI features, powered by Claude Sonnet.

!!! note
    To use Marimo's built-in AI assistant, set `ANTHROPIC_API_KEY` as a secret in your deployment's variables.

You do not need to add these to your `requirements.txt`. To add more packages, list them in `requirements.txt` -- they install on session start.

System packages cannot be installed in Marimo sessions — the notebook runs in a single-process environment without shell access. If you need system-level dependencies (C libraries, command-line tools), use a VS Code session instead.

## Linked deployment

Every Marimo session must be linked to a deployment that was **created from the Marimo code sample**. The create dialog only shows eligible deployments — if you don't see any in the dropdown, you need to create a Marimo deployment first from **Services** in the sidebar.

You can also create a Marimo session directly from a deployment's detail page if it's a Marimo deployment.

You select the deployment when you create the session, and it cannot be changed afterward. If you need to link to a different deployment, delete the session and create a new one — your notebook code is preserved in Git. The linked deployment determines:

- **Application folder** -- the Git subdirectory where auto-commits are written.
- **Environment variables** -- variables and secrets defined in `app.yaml` are available in your notebook.
- **Data lineage panel** -- shows upstream and downstream connections for the deployment.
- **Messages panel** -- displays live messages flowing through the deployment's topics.

## Auto-commit behavior

Auto-commit is enabled by default. You can disable it or change the commit interval when creating or editing the session -- see [Auto-commit settings](./overview.md#auto-commit-settings).

When enabled, a file watcher detects changes in your application folder and starts a short delay (default: **5 seconds**). Each subsequent change resets the delay. Once it expires, all pending files are committed in a single batch with the message `[AutoCommit] Updated <file list>`.

When a config file changes (`app.yaml` or `quix.yaml`), a banner prompts you to redeploy the linked deployment. The session also pulls remote changes every 5 seconds, so edits made elsewhere (for example, through the Quix online code editor) appear automatically. If you're actively editing, your local version takes priority over any incoming remote changes for 10 seconds.

## Python dependencies

The session sets up a Python environment on first startup. If a `requirements.txt` file exists in your application folder, its packages are installed automatically before Marimo launches.

Running `pip install` inside a notebook cell works for the current session. The venv persists across restarts, but to ensure a dependency is always available, add it to `requirements.txt`. Dependencies from `requirements.txt` are re-installed on every session start.

The base image includes `fsspec`, `httpx`, `pydantic`, and the Quix SDK, so you do not need to add those to your requirements file.

## Storage and persistence

Each session has **1 GB of persistent storage** (configurable when you create the session, but not resizable afterward) where your notebook files and Python environment are kept between restarts.

**What persists across restarts:** notebook files, `/app/venv`, and `requirements.txt` changes.

**What is lost on restart:** `/tmp` contents and process state.

Stopping a session preserves your files. Terminating a session permanently deletes your local files — any changes already committed are safe in Git. See [Session lifecycle](./overview.md#session-lifecycle) for the difference.

## Resource defaults

Each Marimo session starts with **2000m CPU** and **4096 MB memory**. The minimum you can set is 50m CPU / 100 MB memory. Both are configurable when you create or edit the session.

## Troubleshooting

**No deployments in the dropdown** -- The Marimo create dialog only lists deployments created from the Marimo code sample. If the dropdown is empty, create a Marimo deployment first from **Services** in the sidebar, then come back to create the session.

**pip install failures** -- Check `requirements.txt` for syntax errors. Malformed entries can fail silently during startup. Review the session logs if packages are missing at runtime.

**Changes not appearing in deployment** -- Auto-commit saves your changes, but the deployment does not automatically redeploy. After the banner appears, trigger a redeployment from the Quix UI for your changes to take effect.

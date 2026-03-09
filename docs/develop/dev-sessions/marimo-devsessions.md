---
title: Marimo dev sessions
description: Reactive Python notebook sessions linked to a deployment, with auto-commit and dependency management.
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

System packages (`apt-get`) are not available at runtime in Marimo sessions.

## Linked deployment

Every Marimo session must be linked to a deployment that was **created from the Marimo code sample**. The create dialog only shows eligible deployments — if you don't see any in the dropdown, you need to create a Marimo deployment first from **Services** in the sidebar.

You can also create a Marimo session directly from a deployment's detail page if it's a Marimo deployment.

You select the deployment when you create the session, and it cannot be changed afterward. The linked deployment determines:

- **Application folder** -- the Git subdirectory where auto-commits are written.
- **Environment variables** -- variables and secrets defined in `app.yaml` are available in your notebook.
- **Data lineage panel** -- shows upstream and downstream connections for the deployment.
- **Messages panel** -- displays live messages flowing through the deployment's topics.

## Auto-commit behavior

A file watcher detects changes in your application folder and starts a **60-second debounce timer**. Each subsequent change resets the timer. After 60 seconds of inactivity, all pending files are committed in a single batch. The commit message is prefixed with `[AutoCommit]`.

When a config file changes (`app.yaml` or `quix.yaml`), a banner prompts you to redeploy the linked deployment. The session also pulls remote changes every 5 seconds, so edits made elsewhere (for example, through the Quix online code editor) appear automatically. Local edits take priority over remote changes during a 10-second guard window.

## Python dependencies

The session creates a virtual environment at `/app/venv` on first startup. If a `requirements.txt` file exists in your application folder, its packages are installed automatically before Marimo launches.

Running `pip install` inside a notebook cell works for the current session. The venv persists across restarts, but to ensure a dependency is always available, add it to `requirements.txt`. Dependencies from `requirements.txt` are re-installed on every session start.

The base image includes `fsspec`, `httpx`, `pydantic`, and the Quix SDK, so you do not need to add those to your requirements file.

## Storage and persistence

Each session gets a persistent volume mounted at `/app/`. The default size is **1 GB**, configurable when you create the session. Storage cannot be resized after creation.

**What persists across restarts:** notebook files, `/app/venv`, and `requirements.txt` changes.

**What is lost on restart:** `/tmp` contents and process state.

Terminating a session deletes the volume and everything in it.

## Resource defaults

Each Marimo session starts with **2000m CPU** and **4096 MB memory**. The minimum you can set is 50m CPU / 100 MB memory.

## Troubleshooting

**No deployments in the dropdown** -- The Marimo create dialog only lists deployments created from the Marimo code sample. If the dropdown is empty, create a Marimo deployment first from **Services** in the sidebar, then come back to create the session.

**pip install failures** -- Check `requirements.txt` for syntax errors. Malformed entries can fail silently during startup. Review the session logs if packages are missing at runtime.

**Changes not appearing in deployment** -- Auto-commit saves your changes, but the deployment does not automatically redeploy. After the banner appears, trigger a redeployment from the Quix UI for your changes to take effect.

---
title: VS Code dev sessions
description: Devcontainer configuration, auto-commit behavior, and Python environment details for VS Code dev sessions.
---

# VS Code dev sessions

VS Code dev sessions run a full code-server IDE in your browser. For a comparison with Marimo sessions and general concepts, see the [overview](./overview.md).

## What's preinstalled

The base image includes:

- **Python 3** with pip and venv
- **Dev tools** (installed in the venv): ruff (linter/formatter), pytest
- **Node.js 22** (used by Claude Code and available for JS tooling)
- **Quix CLI** (preconfigured with your project context)
- **Claude Code** AI assistant (available from the terminal)
- **VS Code extensions**: Python, Jupyter, Ruff, Error Lens, RunOnSave

To add Python packages, put them in `requirements.txt` or `pyproject.toml` in your application folder. They install automatically on session start. The RunOnSave extension also re-runs `pip install` when you save either file, so you don't need to restart.

!!! tip
    To install system packages, use a lifecycle hook: `onCreateCommand: "sudo apt-get update && sudo apt-get install -y <package>"`. This runs once on first session start and persists on storage.

## Customizing with devcontainer.json

Quix parses the following fields from `devcontainer.json`:

- `customizations.vscode.settings` -- editor and extension settings.
- `customizations.vscode.extensions` -- extension IDs to install from [Open VSX](https://open-vsx.org/){target=_blank} (code-server uses Open VSX, not the Microsoft marketplace).
- `onCreateCommand`, `updateContentCommand`, `postCreateCommand`, `postStartCommand` -- lifecycle hooks (see [below](#lifecycle-hooks)).

JSONC syntax is supported -- you can use `//` line comments, `/* */` block comments, and trailing commas, just like in VS Code's own settings files.

All other fields (`image`, `features`, `mounts`, `forwardPorts`, `dockerComposeFile`) are ignored. For full spec details, see the [Dev Containers specification](https://containers.dev/){target=_blank}.

Settings and extensions merge from three layers, applied in order:

1. **Base image** -- built-in defaults baked into the container (Python, Ruff, Claude Code, dark theme, format-on-save).
2. **`/.devcontainer/devcontainer.json`** -- at the root of your repo. Applies to all applications in the project.
3. **`/your-app/.devcontainer/devcontainer.json`** -- inside a specific application folder. Overrides root settings for that app only.

Each layer's `customizations.vscode.settings` overrides the previous layer's values. Extensions from all layers are deduplicated (case-insensitive) and installed once.

!!! warning
    Changes to `devcontainer.json` require a session restart to take effect.

```json title=".devcontainer/devcontainer.json"
{
  "customizations": {
    "vscode": {
      "settings": {
        "python.analysis.typeCheckingMode": "strict",
        "editor.rulers": [120]
      },
      "extensions": ["tamasfe.even-better-toml"]
    }
  },
  "postStartCommand": "echo 'Session ready'"
}
```

### Lifecycle hooks

Hooks run from the application folder as the `coder` user. Each hook has a **300-second timeout** (configurable via `DEVCONTAINER_LIFECYCLE_TIMEOUT`).

| Hook | Runs when | Re-runs on restart |
|---|---|---|
| `onCreateCommand` | First session start (fresh storage) | No |
| `updateContentCommand` | First session start, after `onCreateCommand` | No |
| `postCreateCommand` | First session start, after `updateContentCommand` | No |
| `postStartCommand` | Every session start | Yes |

A marker file on persistent storage tracks whether create hooks have already run. Only `postStartCommand` executes on subsequent restarts.

To run tasks in parallel, use the object format -- each key runs as a separate process:

```json
{
  "postStartCommand": {
    "migrate": "python manage.py migrate",
    "seed": "python scripts/seed_data.py"
  }
}
```


### UI scaling

The base image sets a default UI zoom of **1.2x** to match the Quix platform's visual density. This scales the entire code-server interface uniformly -- fonts, icons, sidebar, tabs, menus, and status bar.

To override the zoom level, set `quix.ui.zoom` in your `devcontainer.json`:

```json title=".devcontainer/devcontainer.json"
{
  "customizations": {
    "vscode": {
      "settings": {
        "quix.ui.zoom": 1.0  // disable zoom (native code-server size)
      }
    }
  }
}
```

The `quix.*` settings are a custom Quix namespace -- the entrypoint extracts them and applies them as CSS before code-server starts. They don't appear in VS Code's settings UI and won't trigger "unknown setting" warnings.

You can combine `quix.ui.zoom` with native VS Code font settings for fine-tuning:

| Setting | What it controls |
|---|---|
| `quix.ui.zoom` | Entire UI scale (fonts, icons, spacing) |
| `editor.fontSize` | Editor font size only |
| `terminal.integrated.fontSize` | Terminal font size only |
| `window.zoomLevel` | Not supported in code-server (use `quix.ui.zoom` instead) |

## Auto-commit

A file watcher monitors your application folder for changes. It uses the `watchdog` library (inotify on Linux) for instant detection, falling back to `git status` polling or mtime scanning if watchdog is unavailable. When changes are detected, a **5-second debounce timer** starts. Each subsequent edit resets the timer. After the timer expires, the session:

1. Stashes uncommitted changes.
2. Runs `git pull --rebase` to incorporate remote changes.
3. Restores the stash (on conflict, local changes win).
4. Stages and commits all pending files with the message `[AutoCommit] Updated <file list>`.
5. Pushes to the remote branch.

Auto-commit batches all changes within the debounce window into a single commit. You can also commit manually from the terminal or VS Code's source control panel. Manual commits use a git hook that auto-generates the message in the same `[AutoCommit] Updated <file list>` format, so you can commit from VS Code's source control panel without typing a message.

## Python environment

The session creates a virtual environment at `.venv` inside your application folder on first start. The venv is stored on persistent storage and survives restarts. It comes pre-installed with `pip`, `ruff`, and `pytest`.

If a `requirements.txt` exists, dependencies install automatically on session start. A `pyproject.toml` triggers an editable install (`pip install -e .`) instead. A RunOnSave extension re-runs `pip install` whenever you save either file, keeping the environment in sync as you edit dependencies.

If the base image Python version changes between sessions, the entrypoint detects the broken symlink in `.venv/bin/python` and recreates the environment automatically.

## Storage and persistence

Each session gets a persistent volume mounted at `/state/`. The default size is **1 GB**, configurable when you create the session but not resizable afterward.

**What persists across restarts:** your git repo, `.venv`, uncommitted file changes, and Claude Code configuration.

**What's lost on restart:** terminal state, open editor tabs, and anything in `/tmp`.

**What's lost on terminate:** everything -- the persistent volume is deleted when the session is terminated.

You can pass environment variables and secret references to your session when you create or edit it. Variables defined in your application's `app.yaml` are also loaded automatically. If you edit `app.yaml` inside the session, updated values are picked up without a restart.

### Resource limits

Sessions default to **2000m CPU / 2048 MB memory**. The minimum is 50m CPU / 100 MB memory. Both are configurable at creation time.

## Troubleshooting

**Stale venv after image rebuild** -- If packages fail to import despite being in `requirements.txt`, delete the `.venv` folder and restart the session. The entrypoint recreates it on next start.

**Session stuck in Starting** -- Check the session logs for lifecycle hook output. A hook exceeding the 300-second timeout is terminated and logged as a warning. Cluster resource pressure (CPU/memory limits) can also delay pod scheduling.

**Environment variables not updating** -- The session polls `app.yaml` for configuration changes, but some environment variables require a full session restart to take effect. If you update variables in the Quix UI, restart the session to pick up the new values.

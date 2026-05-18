---
title: VS Code dev sessions
description: A full browser-based IDE for building, editing, and debugging your Quix applications — with a terminal, AI assistance, and automatic Git commits.
---

# VS Code dev sessions

VS Code dev sessions give you a full browser-based IDE for building and debugging your Quix applications — no local install needed. You get a terminal, file explorer, AI assistance via Claude Code, and automatic commits back to your project's Git repository. Use this session type when you're editing multiple files, running commands, installing packages, or stepping through code. For a comparison with Marimo sessions and general concepts, see the [overview](./overview.md).

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

A `devcontainer.json` file lets you customize your session's editor settings, install extra VS Code extensions, and run setup commands automatically on start. Place one in your repo and Quix picks it up when the session starts.

Supported fields:

- `customizations.vscode.settings` -- editor and extension settings.
- `customizations.vscode.extensions` -- extension IDs to install from [Open VSX](https://open-vsx.org/){target=_blank} (code-server uses Open VSX, not the Microsoft marketplace).
- `onCreateCommand`, `updateContentCommand`, `postCreateCommand`, `postStartCommand` -- lifecycle hooks (see [below](#lifecycle-hooks)).

JSONC syntax is supported -- you can use `//` line comments, `/* */` block comments, and trailing commas, just like in VS Code's own settings files.

All other fields (`image`, `features`, `mounts`, `forwardPorts`, `dockerComposeFile`) are ignored. For full spec details, see the [Dev Containers specification](https://containers.dev/){target=_blank}.

Settings and extensions are applied in order, with more specific configurations overriding broader ones:

1. **Base image** -- defaults included in every session (Python, Ruff, Claude Code, dark theme, format-on-save).
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

Use lifecycle hooks to run setup commands automatically when a session starts — for example, installing system packages, running database migrations, or seeding test data. Each hook has a **300-second timeout**. To change it, set `DEVCONTAINER_LIFECYCLE_TIMEOUT` (in seconds) as an environment variable in the session's Advanced settings.

| Hook | Runs when | Re-runs on restart |
|---|---|---|
| `onCreateCommand` | First session start (fresh storage) | No |
| `updateContentCommand` | First session start, after `onCreateCommand` | No |
| `postCreateCommand` | First session start, after `updateContentCommand` | No |
| `postStartCommand` | Every session start | Yes |

Once-only hooks (`onCreateCommand`, `updateContentCommand`, `postCreateCommand`) run on first start and are skipped on subsequent restarts. Only `postStartCommand` runs every time.

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

The session editor is zoomed in slightly by default (**1.2x**) so it fits comfortably alongside the Quix platform UI. This scales the entire interface uniformly — fonts, icons, sidebar, tabs, menus, and status bar.

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

The `quix.*` settings are a custom Quix namespace applied before the editor loads. They don't appear in VS Code's settings UI and won't trigger "unknown setting" warnings.

You can combine `quix.ui.zoom` with native VS Code font settings for fine-tuning:

| Setting | What it controls |
|---|---|
| `quix.ui.zoom` | Entire UI scale (fonts, icons, spacing) |
| `editor.fontSize` | Editor font size only |
| `terminal.integrated.fontSize` | Terminal font size only |
| `window.zoomLevel` | Not supported in code-server (use `quix.ui.zoom` instead) |

## Auto-commit

Auto-commit is enabled by default. You can disable it or change the commit interval when creating or editing the session -- see [Auto-commit settings](./overview.md#auto-commit-settings).

When enabled, a file watcher monitors your application folder for changes. After your last edit, a short delay starts (default: **5 seconds**); each new edit resets it. Once the delay expires, all pending changes are bundled into a single commit, any remote edits are merged in (your local changes win on conflict), and the result is pushed to your branch.

Auto-commit batches all changes within the delay window into a single commit. You can also commit manually from the terminal at any time with a message of your choosing. Committing from VS Code's source control panel (without typing a message) auto-generates a message in the same `[AutoCommit] Updated <file list>` format — type a message in the panel if you want something more descriptive.

## Python environment

The session creates a virtual environment at `.venv` inside your application folder on first start. The venv is stored on persistent storage and survives restarts. It comes pre-installed with `pip`, `ruff`, and `pytest`.

If a `requirements.txt` exists, dependencies install automatically on session start. A `pyproject.toml` triggers an editable install (`pip install -e .`) instead. A RunOnSave extension re-runs `pip install` whenever you save either file, keeping the environment in sync as you edit dependencies.

If a session update changes the Python version, the environment is automatically recreated on next start — you don't need to do anything.

## Storage and persistence

Each session has **1 GB of persistent storage** (configurable when you create the session, but not resizable afterward) where your files and Python environment are kept between restarts.

**What persists across restarts:** your git repo, `.venv`, uncommitted file changes, and Claude Code configuration.

**What's lost on restart:** terminal state, open editor tabs, and anything in `/tmp`.

**What's lost on terminate:** everything — all your files are permanently deleted. See [Session lifecycle](./overview.md#session-lifecycle) for the difference between stop and terminate.

You can pass environment variables and secret references to your session when you create or edit it -- see [Environment variables and secrets](./overview.md#environment-variables-and-secrets). Variables defined in your application's `app.yaml` are also loaded automatically. If you edit `app.yaml` inside the session, updated values are picked up without a restart.

When a config file changes (`app.yaml` or `quix.yaml`), a banner prompts you to redeploy the linked deployment so your changes take effect.

### Resource limits

Sessions default to **2000m CPU / 2048 MB memory**. The minimum is 50m CPU / 100 MB memory. Both are configurable when you create or edit the session.

## Troubleshooting

**Stale venv after image rebuild** -- If packages fail to import despite being in `requirements.txt`, delete the `.venv` folder and restart the session. The environment is recreated automatically on next start.

**Session stuck in Starting** -- Check the session logs for lifecycle hook output. A hook exceeding the 300-second timeout is cancelled and logged as a warning. If no hook is running, the cluster may be under resource pressure — wait a moment and try again.

**Environment variables not updating** -- The session polls `app.yaml` for configuration changes, but some environment variables require a full session restart to take effect. If you update variables in the Quix UI, restart the session to pick up the new values.

"""
Local docs preview for Windows.

Why this exists: the `multirepo` plugin shells out to `/bin/bash` to clone the
Quix Streams / Quix CLI sub-docs, and that path handling is broken on native
Windows. This script builds a preview config with multirepo (and the Cairo-based
social-card renderer) stripped out, then serves the rest of the docs locally so
you can preview theme/branding changes without Docker.

Usage (from anywhere):
    python tools/serve_preview.py

Then open http://127.0.0.1:8000/docs/  (Ctrl+C to stop).

For a FULL build including Quix Streams / Quix CLI, use Docker instead:
    docker compose up --build
"""
import os
import re
import sys
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_PACKAGES = os.path.join(ROOT, "venv", "Lib", "site-packages")
SRC = os.path.join(ROOT, "mkdocs.yml")
PREVIEW = os.path.join(ROOT, "mkdocs.preview.yml")
ADDR = "127.0.0.1:8000"

# Plugins to drop for the native preview build.
DROP_PLUGINS = ("- multirepo:", "- social:")


def regenerate_preview_config():
    """Copy mkdocs.yml -> mkdocs.preview.yml, removing the plugins and the two
    !import nav entries that can't run natively on Windows. Text-based so the
    custom YAML tags (!import, !!python/name:) stay intact."""
    lines = open(SRC, encoding="utf-8").read().split("\n")
    out, skip = [], False
    for ln in lines:
        s = ln.strip()
        if "!import " in ln:  # the Quix Streams / Quix CLI nav imports
            continue
        if skip:
            # Stop skipping at the next top-level list item or a dedent.
            if re.match(r"^  - \S", ln) or (ln and not ln.startswith(" ")):
                skip = False
            else:
                continue
        if any(s == p or s.startswith(p) for p in DROP_PLUGINS):
            skip = True
            continue
        out.append(ln)
    open(PREVIEW, "w", encoding="utf-8").write("\n".join(out))
    print("[serve_preview] regenerated mkdocs.preview.yml from mkdocs.yml")


def main():
    if not os.path.isdir(SITE_PACKAGES):
        sys.exit(f"[serve_preview] venv packages not found at {SITE_PACKAGES}")
    regenerate_preview_config()
    env = dict(os.environ,
               PYTHONPATH=SITE_PACKAGES,
               PYTHONUTF8="1",
               PYTHONIOENCODING="utf-8")
    print(f"[serve_preview] serving at http://{ADDR}/docs/   (Ctrl+C to stop)")
    subprocess.run(
        [sys.executable, "-m", "mkdocs", "serve", "-f", PREVIEW, "-a", ADDR],
        env=env, cwd=ROOT,
    )


if __name__ == "__main__":
    main()

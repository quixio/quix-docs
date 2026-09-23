# CLAUDE.md

## What this repo is

Source for the public Quix developer documentation, built with Material for MkDocs and published at https://quix.io/docs. Pages are Markdown under `docs/`; navigation, plugins, and redirects all live in `mkdocs.yml`. The repo is public: every page, commit, and PR is world-readable.

- **Nav**: `mkdocs.yml` → `nav:`. A page without a nav entry doesn't appear in the sidebar.
- **Quix Cloud layout** (restructured May 2026, #544): `docs/quix-cloud/projects/` (was `create/`), `docs/quix-cloud/applications/` (was `develop/`), `docs/quix-cloud/deployments/` (was `deploy/` and `manage/`).
- **Redirects**: `mkdocs.yml` → `plugins` → `redirects` → `redirect_maps`, old path → new path. Moving or renaming a page means adding an entry.
- **Imported sections**: `mkdocs-multirepo-plugin` clones two nav entries from other repos at build time. Both refs are pinned; the Quix Streams tag is bumped in "Docs Release" PRs such as #565:

  ```yaml
  # pins as of Sep 2026; mkdocs.yml is authoritative
  - 'Quix Streams': '!import https://github.com/quixio/quix-streams?branch=v3.26.0'
  - 'Quix CLI': '!import https://github.com/quixio/quix-cli/?branch=1.6.2-docs'
  ```

  The `quix-cli/yaml-reference/*` pages in the Projects nav come from the CLI import.
- **Generated pages**: `docs/connect/` holds ~260 `kafka-to-<tech>.md` landing pages produced by `code-to-generate-connect-pages/`; they're excluded from search.

## Build & test commands

There is no test suite: verify with a clean build and a look at each changed page. Install dependencies with `pip install -r requirements.txt`.

**Windows: native `mkdocs build` fails** inside `mkdocs-multirepo-plugin`, not in your pages. Its emoji progress output raises `UnicodeEncodeError` under cp1252. Past that, it runs `sparse_clone.sh` through `bash` with a Windows path; when `bash` resolves to WSL's `System32\bash.exe`, the backslashes are stripped and the clone fails. Working recipe (Git Bash, repo root, ~2.5 min):

```bash
sed -e '/!import /d' -e '/^  - multirepo:$/,+1d' mkdocs.yml > mkdocs-local.yml
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 mkdocs build -f mkdocs-local.yml -d <dir-outside-the-repo>/site
rm mkdocs-local.yml
```

- The temp config drops both `!import` nav lines and the two-line `- multirepo:` plugin block. Keep it in the repo root: paths in it resolve relative to the config file.
- Expected warnings on a clean `main`: the social plugin's missing `cairosvg` (one per page), links and redirects into `quix-streams/` or `quix-cli/` pages (not imported in this build), and a MkDocs 2.0 banner. Treat anything else as real.

## How to run the app for `/verify`

- Full fidelity, imports and social cards included: `docker compose up --build` (see `RUNNING-DOCS-LOCALLY.md`). It serves with live reload at http://localhost:8000/docs/; stop it with `docker compose down`. No env vars needed: both imported repos are public.
- Every PR gets a CI build (`.github/workflows/build-commit-subfolder.yaml`) that comments a preview URL, `https://quixdocsdev.blob.core.windows.net/pr<N>/index.html`, on the PR.

## Conventions specific to this repo

- `WRITING-STYLE.md`: International English (US spelling, Americanisms removed), second person, present tense, active voice, sentence-case headings, and its Quix terminology list. Don't call a docs section a "topic" (clashes with Kafka topics). External links get `{target=_blank}`.
- `BEST-PRACTICE.md`: topic-based pages (concept, how-to, reference, tutorial), one `h1`, nothing below `h3`, and a closing "Next steps" section.
- New pages open with `title:` and `description:` frontmatter; `docs/quix-cloud/projects/overview.md` is the model.
- Images go in `docs/images/<topic>/`, referenced relatively (`../../images/variables/pv-panel.png`). Sections that already keep a local `images/` folder (tutorials, `quix-lake/data-lake/`, `services/`) keep using it.
- `CHANGELOG.md` is the Quix Cloud product changelog: one `## <release-slug> | DD MMM YYYY` entry per product release, past years in `changelogs/`. Add an entry only for a shipped product change, never for a docs-only edit. It links to published `https://quix.io/docs/...html` URLs, so check it when a page moves.

## Accuracy

- Document only shipped behavior, proven against the product source at its default branch. A ticket, PR, or another docs page is a lead, never proof.
- Never document a known defect as design, and never document intended behavior that has not shipped. Scope each claim to the cases the code proves and report the defect for a ticket instead.
- Evidence ledgers cite internal source paths, so they stay out of this repo (pages and commits) and out of PR text.

## Pull requests

- GitHub via `gh`, base `main`. `README.md` and `CONTRIBUTING.md` still say `dev`, but origin has no `dev` branch.
- Open PRs as drafts by default.
- Title `Quix-<ticket>: <description>` for ticket work (compare `gh pr list --state merged --limit 10`). Release PRs use `Docs Release YYYY-MM-NNN`; non-ticket PRs use a plain description.

## Things NOT to do here

- Don't commit `temp_dir/` (the multirepo clone cache that full builds leave behind), `site/`, or `mkdocs-local.yml`. The first two are gitignored; the temp config isn't.
- Don't edit Quix Streams or Quix CLI content here. Change it in `quixio/quix-streams` or `quixio/quix-cli`, then bump the pinned ref in `mkdocs.yml`.
- Don't delete or repoint `redirect_maps` entries: old URLs stay in use (the Portal still links to `deploy/variable-groups`).

## Deployment notes

Merging to `main` doesn't publish. `.github/workflows/sync-build-deploy.yaml` builds `main` and deploys it to GitHub Pages on manual dispatch or the Quix CLI's `cli_docs_updated` event.

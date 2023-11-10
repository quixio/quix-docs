# Docs internal processes

This document describes some processes used internally for:

1. Updating **product** changelogs
2. Performing a docs release

Each of these is described in the following sections.

## Product changelogs

The latest changelog entry is located in `CHANGELOG.md`.

> **Note:** `CHANGELOG.md` is the product changelog, not the docs changelog. The docs changelog can be found [here](https://github.com/quixio/quix-docs/wiki/Docs-Releases).

At the bottom of this file are links to archived changelogs. There is one file of changelogs per year.

The archived changelogs are stored in the `changelogs` folder.

### Updating the changelog

To update the changelog:

1. Create a PR in the [docs repo](https://github.com/quixio/quix-docs) on the `dev` branch.

    > **Important:** The PR **MUST** be raised on the `dev` branch as we check for broken builds by building a preview site based on this branch. We avoid raising PRs on `main` for this reason.

2. Copy your changelog entry to the top of the relevant archive file. For example, if you're updating an entry for 2023 the file to update is `changelogs/2023-archive`.

3. Copy this entry to the `CHANGELOG.md` file, to **replace** the current entry. Only one entry is stored in this file to make it easier for the customer to see exactly what the latest changes were.

4. When ready, submit your PR for review. The changes will be reviewed and merged to the `dev` branch.

> **Note:** Merges are only periodically made from `dev` to `main` (typically for a docs release). For this reason the latest version of the changelog should be considered to be the one stored on the `dev` branch.

Note, unlike for the main docs, a docs release is not required for the changelog, because the changelog is a Markdown file, not a file rendered by the docs system. 

### Changelog location

The latest product changelog file is always located at:

https://github.com/quixio/quix-docs/blob/dev/CHANGELOG.md

## Docs release

To do a docs release the process is:

1. Do development.
2. Merge your changes to `dev` branch.
3. When ready for a release, create a PR to merge `dev` to `main`, use release naming convention for PR title, for example, `Docs Release 2023-04-001`. The format used is `YYYY-MM-NNN`, where `NNN` is the release number for the month.
4. Seek review and approval for the above PR to merge `dev` to `main`.
5. Create a merge commit, adding comments stating the changes. See the [docs changelog](https://github.com/quixio/quix-docs/wiki/Docs-Releases) for examples.
6. Go to `Actions` in the docs repo on GitHub. Trigger the deployment GitHub action.
7. Update the [docs release wiki page](https://github.com/quixio/quix-docs/wiki/Docs-Releases).

You can also add a announcement to the `#general` channel in Slack, with a link to the release notes. 

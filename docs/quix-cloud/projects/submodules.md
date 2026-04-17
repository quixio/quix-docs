---
title: Git submodules
description: Learn how Quix handles Git submodules in your projects.
---

# Git submodules

If your Git repository includes submodules, Quix supports them automatically. Submodules enable you to include external Git repositories within your main project repository. This helps you share common code or dependencies across multiple projects.

## How Quix handles submodules

When you connect a repository that contains submodules to Quix, Quix automatically initializes and updates them. You do not need to configure anything. Quix clones your repository and fetches the content of all first-level submodules.

Files and applications within submodules appear alongside your main repository files, with no visual distinction. You can view their contents directly in Quix.

## Authentication requirements

Submodules must be accessible using one of the following methods:

- **Same SSH key**: You can access the submodule repository using the same SSH key configured for your main project repository.
- **Public repository**: The submodule repository is public and requires no authentication.

!!! note

    If a submodule uses a private repository, ensure that the SSH key you configured for your project also has access to that submodule repository. Quix uses the same credentials for all submodule operations.

## Limitations

### Read-only access

Files within submodules are read-only in Quix. You can view and browse submodule content, but you cannot modify, delete, or move files that reside within a submodule.

!!! important

    To modify content within a submodule, make changes directly in the submodule's own repository. Quix reflects those changes the next time it updates the submodule.

### No recursive submodules

Quix supports first-level submodules only. If a submodule itself contains submodules (nested submodules), Quix does not initialize or display them.

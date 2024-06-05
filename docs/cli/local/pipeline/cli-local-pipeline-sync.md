# quix local pipeline sync

## Overview

Synchronize your local pipeline to Quix Cloud.

**Aliases:**  sync, deploy

**Usage:**
 
```
quix local pipeline sync [options]
```

**Options:**

- `--workspace-id <workspace-id>`:          Select a concrete workspace-id to sync to
- `--directory <directory>`:                Base directory (defaults to current directory)
- `-u, --update`:                         Update 'quix.yaml' with the new local applications and update the variables of the existing deployments
- `-m, --commit-message <commit-message>`:  The message used for the commit if using `--push`
- `-v, --verbose, --verbosity`:           Display the verbose output
- `-?, -h, --help`:                       Show help and usage information

## Example usage

### Basic Synchronization

To synchronize your local pipeline to Quix Cloud without any additional options:

```
$ quix local pipeline sync
Sending all changes to git ...
Executing commit ...
✓ Sync completed
```

If the remote contains changes that you don't have, a message is displayed preventing you from continuing:

```
✗ Your local repository is out of sync with the remote, please push your changes manually"
```

### Synchronization with Update

To update `quix.yaml` with the new local applications and update the variables of existing deployments before synchronizing:

```
$ quix local pipeline sync --update
```

This command is shorthand for performing both the update and synchronization in one step. Specifically, it executes:

```
$ quix local pipeline update
$ quix local pipeline sync
```

### Synchronization with Commit Message:

To provide a specific commit message for the synchronization process:

```
$ quix local pipeline sync --commit-message "Initial deployment to Quix Cloud"
```
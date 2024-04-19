# CLI Reference guide

---
title: Quix CLI Reference Guide
description: The Quix Command-Line Interface reference guide.
---

# Quix CLI Reference Guide

This is the reference guide for the Quix CLI.

## Installation

Read the latest [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

## Login

You can authenticate by either logging into Quix Cloud:

```
quix login
```

You can also log in using a [Personal Access Token (PAT)](../develop/authentication/personal-access-token.md):

```
quix login <your-pat>
```

## Workspace ID

You're required to specify `workspaceId` for some commands. 

There are two ways to obtain this:

1. Log into Quix Cloud

    You can log into Quix Cloud, and check the address bar in your browser, for example, after clicking on topics, you would see similar to the following in the address bar:

    ```
    https://portal.platform.quix.io/topics?workspace=your-workspace-id
    ```

    In this case the workspace is `your-workspace-id`.

2. Using the CLI

    Run the following command:

    ```
    quix workspaces list
    ```

    This lists all workspaces in the organization, and displays the workspace ID, along with the following:

    * Name
    * Broker
    * Storage
    * Status
    * Version

    !!! note

        Workspaces are currently version 1 or version 2. Version 1 workspaces should be considered deprecated.

Note that some Quix CLI commands are global, but some are specific to an environment, and require a workspace ID to be specified.

## Terminology

The CLI currently uses some terminology that is different to the current UI. The following table compares CLI and UI terminology:

| CLI | UI |
|----|----|
| Repositories | Projects |
| Workspaces | Environments |

## Getting help

Typing just `quix` results in basic usage information being displayed. You can also receive help by typing `quix --help`.

To obtain more help on a specific command use the `--help` option, for example:

```
quix permissions --help
```

This displays the subcommands available. There is also help for subcommands:

```
quix permissions set --help
```

This displays the options for the `set` subcommand.

## Examples

The general form of the CLI usage is:

```
quix command [subcommand] [options]
```

### Listing deployments

To list all your deployments you would use:

```
quix deployments list your-workspace-id
```

The information returned includes:

* DeploymentId
* WorkspaceId
* Name
* Memory
* CPU
* Replicas
* Status

### Listing applications

To list all your applications (in your environment):

```
quix applications list your-workspace-id
```

## Obtaining output in JSON format

You can return your results as JSON, rather than in tabular form. For example, to return a list of topics in an environment in JSON format:

```
quix topics list your-workspace-id --output json
```

With some practice, you will find the usage follows a similar pattern for most commands.

!!! tip

    The JSON output displays additional information not available in the table view. This is done to make the table view simpler. For full information use the JSON output option.

## Context

A context defines which system your CLI connects to - by default this is the Quix production cloud. If you are using BYOC, you need to `add` and then `use` a context. 

A context has a URL associated with it. For example, the URL associated with the default context is `portal-api.platform.quix.io`.

For example, to create a context `byoc`, you would use:

```
quix contexts add byoc https://your-byoc.domain.com
```

To then use that context you would use:

```
quix contexts use byoc
```

To list your available contexts, use the following:

```
quix contexts list
```

## Managing permissions

You can manage permissions for a user in a Quix organization using the CLI.

### Scope

Scope can be one of:

* `Organisation`
* `Repository`
* `Workspace`

Scope is hierarchical. For example, if you assign a user a role at the `Organisation` level, it will also apply to all repositories and workspaces in that organization. If you assign a user a role at the `Repository` level, it will also apply to all workspaces in that repository.

### Role

Role can be one of:

* `Admin` - complete control
* `Manager` - complete control except editing users, billing and organisation
* `Editor` - same as `Manager` without permissions of create or delete Repositories and Workspaces
* `Viewer` - read only permissions
  
Roles are assigned to specific users.

### Users

Users of Quix have assigned roles and scopes, which can be changed using the CLI.

To get the current user (yourself), you can use:

```
quix users current
```

This returns your:

* User ID
* Email
* First name
* Last name
* Status

To obtain a complete list of users in an organization, use the following command:

```
quix users list
```

To narrow down the returned list:

```
quix users list | grep tony
```

This returns:

```
ebf47187-ed00-4190-bc34-f0054e8b2640 │ tony@do │ Tony  │ Bedfo │ Activ │ 01/09
```

This shows the User ID.

### Users - permissions

You can also use the CLI to explore permissions.

To get a complete list of users and their permissions:

```
quix permissions list
```

You can reduce the list using:

```
quix permissions list | grep tony
```

This returns:

```
ebf47187-ed00-4190-bc34-f0054e8b2640 │ tony@domain.com  │ Organisation │ Admin
```

You can then explore the user:

```
quix permissions get ebf47187-ed00-4190-bc34-f0054e8b2640
```

This returns:

```
Scope                 │ Role   
──────────────────────┼─────── 
Organisation:quixdev  │ Admin
```

The scope and role are clearly displayed. 

You can also obtain the raw permissions string, which can ease the process of later setting new permissions. To do this use the `--raw` option:

```
quix permissions get ebf47187-ed00-4190-bc34-f0054e8b2640 --raw
```

This returns permissions in the raw format, rather than the tabular format:

```
[{ Repository:53d7ee3c-7a8c-4ddc-97b2-e3cd2484d7b1, Viewer }, { Workspace:quixdev-test, Viewer }]
```

### Setting permissions

To edit a user's permissions you can use the `edit` command. For example:

```
quix permissions edit ebf47187-ed00-4190-bc34-f0054e8b2640 --scope Organisation:quixdev --role Admin
```

You can also remove a permission using `quix permissions delete`, for example:

```
quix permissions delete ebf47187-ed00-4190-bc34-f0054e8b2640 --scope Workspace:quixdev-test 
```

!!! note

    Note that a Permission is {Scope, Role}, where `Scope` can be considered the key. When using `delete`, `Scope` is used as the key to identify the permission to be removed.  

You can also set permissions for a user using the `quix permissions set` command. You need to specify the permission assignments using the `-p` option.

Note the format of the permission assignments generally is:

```
[{Scope, Role}, {Scope, Role}, ...]
```

For example:

```
quix permissions set ebf47187-ed00-4190-bc34-f0054e8b2640 -p "[{ Repository:53d7ee3c-7a8c-4ddc-97b2-e3cd2484d7b1, Viewer }, { Workspace:quixdev-test, Viewer }]"
```

This sets the following permissions for the specified repository and workspace:

| Scope | Role |
|---|---|
| Repository | Viewer |
| Workspace | Viewer |

!!! tip

    Repository IDs can be found by typing `quix repositories list`.






---
title: Quix CLI Reference Guide
description: The Quix Command-Line Interface reference guide.
---

# Quix CLI Reference Guide

This is the reference guide for the Quix CLI.

!!! warning "Quix CLI is in development"

    Quix CLI is currently Beta, and is under development. This documentation may not be completely up to date, as the CLI is updated frequently, with new commands added, some commands removed, and changes to command syntax. Please use the Quix CLI built-in help for the very latest information.

## Installation

Read the latest [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

You can then update Quix CLI with the command:

```
quix update
```

## Login

You can authenticate by logging into Quix Cloud with the following command:

```
quix login
```

You will be prompted to confirm the authentication code in the device confirmation dialog.

You can also log in using a [Personal Access Token (PAT)](../develop/authentication/personal-access-token.md):

```
quix login <your-pat>
```

## Terminology

The CLI currently uses some terminology that is different to the current UI. The following table compares CLI and UI terminology:

| CLI | UI |
|----|----|
| Repositories | Projects |
| Workspaces | Environments |

## Getting help

Typing just `quix` results in basic usage information being displayed. You can also receive help by typing `quix --help`.

!!! tip

    For less typing you can use the `-h` option, rather than the `--help` option.

To obtain more help on a specific command use the `--help` option, for example:

```
quix permissions --help
```

This displays the subcommands available. There is also help for subcommands:

```
quix permissions set --help
```

This displays the options for the `set` subcommand.

## Command aliases

Most commands have an alias. These are indicated in the alias section of the help. For example, `quix context -h` displays the help for `context`. This shows the `Alias` section: 

```
Aliases:
  contexts, context, ctx
```

Any of the aliases can be used.

## Interactive commands

Some commands are interactive, in that once you type them you will be taken into an interactive menu where you can select further information. For example, if you type `quix use` and hit enter, you are provided with a list of environments, and you can then select the one you want to connect to.

!!! tip

    All commands without mandatory arguments are interactive. 

## Examples

The general form of the CLI usage is:

```
quix command [subcommand] [options]
```

### Listing deployments

To list all your deployments you would use:

```
quix deployments list
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

To list all your applications (in your default environment):

```
quix applications list
```

### Listing projects

To list out all your projects:

```
quix projects list
```

This lists useful information such as the project ID and the link to the project repository.

## Obtaining output in JSON format

You can return your results as JSON, rather than in tabular form. For example, to return a list of topics in an environment in JSON format:

```
quix topics list your-workspace-id --output json
```

With some practice, you will find the usage follows a similar pattern for most commands.

!!! tip

    The JSON output displays additional information not available in the table view. This is done to make the table view simpler. For full information use the JSON output option.

## CLI Context

A context defines which system your CLI connects to - by default this is the Quix production cloud. If you are using BYOC, you need to `create` and then `use` a context. 

A context has a URL associated with it. For example, the URL associated with the default context is `portal-api.platform.quix.io`.

For example, to create a context `byoc`, you would use:

```
quix contexts create byoc https://your-byoc.domain.com
```

To then use that context you would use:

```
quix contexts use byoc
```

To list your available contexts, use the following:

```
quix contexts list
```

## Selecting an environment

You can select an environment interactively by typing:

```
quix use
```

You can use the cursor to navigate the list of environments, to select the one you want to use as the default for your context.

## Setting a local broker

A typical setup includes both a remote and local broker. The local broker is used for local development and testing, before the tested applications are pushed up to the project repo, and then synched with Quix Cloud.

To set a local broker:

```
quix context broker set <broker_address>
```

You can then toggle between using the remote broker and the local broker with:

```
quix context broker toggle
```

## Pushing your code to the project repo

You can push your locally modified code to the remote repository by using:

```
quix local pipeline sync --update
```

You can optionally provide a commit message with the `-m` option. You are also prompted if changes outside of you current application have been made. You can optionally push these changes too.

The `--update` option makes sure your `quix.yaml` file is updated.

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






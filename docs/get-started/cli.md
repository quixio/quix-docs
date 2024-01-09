---
status: new
---

# Quix Command-Line Interface (CLI)

The [Quix CLI](https://github.com/quixio/quix-cli){target=_blank} is a powerful command-line companion for seamlessly managing and interacting with the features of Quix Cloud. While Quix offers a robust UI for a user-friendly experience, the CLI empowers you with efficiency and flexibility, enabling you to streamline your workflow, and take control from the command line.

* Effortless Control: Execute commands effortlessly to manage various aspects of your Quix organization.

* Script Automation: Integrate Quix operations into your scripts for automated workflows and enhanced productivity.

* Accessibility: Access and manipulate Quix features directly from the command line, providing an alternative interface for users who prefer terminal-based interactions.

* Scalability: Seamlessly scale your Quix operations, whether you are working on a single instance or orchestrating tasks across multiple environments.

View information about the CLI in the [GitHub repository](https://github.com/quixio/quix-cli){target=_blank}.

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
    quix workspaces get
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

## Examples

The general form of the CLI usage is:

```
quix command [subcommand] [options]
```

Typing just `quix` results in basic usage information being displayed. You can also receive help by typing `quix --help`.

### Listing deployments

To list all your deployments you would use:

```
quix deployments get --workspaceId your-workspace-id
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
quix applications get your-workspace-id
```

## Obtaining output in JSON format

You can return your results as JSON, rather than in tabular form. For example, to return a list of topics in an environment in JSON format:

```
quix topic get your-workspace-id --output json
```

With some practice, you will find the usage follows a similar pattern for most commands.

## Context

A context defines which system your CLI connects to - by default this is the Quix production cloud. If you are using BYOC, you need to `add` and then `use` a context. 

A context has a URL associated with it. For example, the URL associated with the default context is `portal-api.quix.io`.

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
quix contexts get
```

## Managing permissions

You can manage permissions for a user in a Quix organization using the CLI.

### Scope

Scope can be one of:

* `organisation`
* `repository`
* `workspace`

Scope is hierarchical. For example, if you assign a user a role at the `organisation` level, it will also apply to all repositories and workspaces in that organization. If you assign a user a role at the `repository` level, it will also apply to all workspaces in that repository.

Note that in v2 terminology, a project corresponds to a repository, and an environment corresponds to a workspace.

### Role

Role can be one of:

* Admin - complete control
* Editor - sync, permissions, logs, start/stop deployments
* Viewer - View only

Roles are assigned to specific users.

### Users

Users of Quix have assigned roles and scopes, which can be changed using the CLI.

To obtain a complete list of users in an organization, use the following command:

```
quix users get
```

To narrow down the returned list:

```
quix users get | grep tony
```

This returns:

```
ebf47187-ed00-4190-bc34-f0054e8b2640 │ tony@ │ Tony  │ B │ Activ │ 01/09
```

This shows the User ID.

### Users - permissions

You can also use the CLI to explore permissions.

To get a complete list of users and their permissions:

```
quix permissions get
```

You can reduce the list using:

```
quix permissions get | tony
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
   Scope               │ Role   
 ──────────────────────┼─────── 
  Organisation:quixdev │ Admin
```

The scope and role are clearly displayed.

### Setting permissions

You can set permissions for a user using the `quix permissions set` command. You need to specify the permission assignments using the `-p` option.

Note the format of the permission assignments generally is:

```
[{Scope, Role}, {Scope, Role}, ...]
```

For example:

```
quix permissions set ebf47187-ed00-4190-bc34-f0054e8b2640 -p "[{ Repository:53d7ee3c-7a8c-4ddc-97b2-e3cd2484d7b1, Viewer }, { Workspace:quixdev-tony-testio, Viewer }]"
```

This sets the following permissions:

| Scope | Role |
|---|---|
| Repository | Viewer |
| Workspace | Viewer |

!!! tip

    Repository IDs can be found by typing `quix repositories get`.






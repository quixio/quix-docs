# Quix Command-Line Interface (CLI)

The [Quix CLI](https://github.com/quixio/quix-cli){target=_blank} is a powerful command-line companion for seamlessly managing and interacting with the features of our Quix Cloud product. While Quix offers a robust UI for a user-friendly experience, the CLI empowers you with efficiency and flexibility, enabling you to streamline your workflow, and take control from the command line.

* Effortless Control: Execute commands effortlessly to manage various aspects of your Quix environment.

* Script Automation: Integrate Quix operations into your scripts for automated workflows and enhanced productivity.

* Accessibility: Access and manipulate Quix features directly from the command line, providing an alternative interface for users who prefer terminal-based interactions.

* Scalability: Seamlessly scale your Quix operations, whether you are working on a single instance or orchestrating tasks across multiple environments.

View information about the CLI in the [GitHub repository](https://github.com/quixio/quix-cli){target=_blank}.

## Installation

Read the latest [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

You can authenticate by either logging into Quix Cloud, or using a [Personal Access Token (PAT)](../develop/authentication/personal-access-token.md).

## Workspace ID

You're required to specify `workspaceId` for some commands. To obtain this, you can log into Quix Cloud, and check the address bar in your browser, for example, after clicking on topics, you would see similar to the following in the address bar:

```
https://portal.platform.quix.io/topics?workspace=myorg-myproject-myenv
```

Note the workspace is a concatenation of three things:

* Your organization
* Your project
* Your environment

Note that some commands are global, but some are specific to an environment, and require a workspace ID.

## Examples

The general form of the CLI usage is:

```
quix command [subcommand] [options]
```

Typing just `quix` results in basic usage information being displayed.

### Listing deployments

To list all your deployments you would use:

```
quix deployment get --workspaceId myorg-myproject-myenv
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
quix application get myorg-myproject-myenv
```

## Obtaining output in JSON format

You can return your results as JSON, rather than in tabular form. For example to return a list of topics in an environment in JSON format:

```
quix topic get myorg-myproject-myenv --output json
```

With some practice, you will find the usage follows a similar pattern for most commands.

## Managing permissions

TBD










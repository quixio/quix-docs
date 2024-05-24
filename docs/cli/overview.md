---
title: Quix CLI
description: The Quix Command-Line Interface. A powerful command-line companion for developing locally, and deploying to local brokers, hosted brokers, or Quix Cloud.
---

# Quix Command-Line Interface (CLI)

The [Quix CLI](https://github.com/quixio/quix-cli){target=_blank} is a powerful command-line interface that enables you to develop stream processing pipelines and manage your Quix Cloud account. 

Quix CLI offers three groups of functionality:

1. Local development commands
2. Manage Quix Cloud commands
3. Utility commands

Using the local commands, you develop your pipeline using predefined samples, or write your code from scratch in Python, leveraging the power of Quix Streams. Using the CLI you can run these pipelines locally in Docker containers, for testing and debugging. You can then deploy to Cloud for scalability and observability.

Using the cloud commands, you can manage your Quix Cloud account, and all the pipelines within, as the CLI offers feature parity with the Quix Cloud UI. For example, you can manage:

* Your organization
* Projects
* Environments
* Applications
* Deployments
* Topics
* Users

There are some Quix Cloud functionaly that is only available from the CLI currently, such as:

* Permissions - Management of user permissions against the resources
* Auditing - Users auditing data

With the utility commands you can do things such as check your status, update the CLI, check version, use interactive help, and manage contexts (the environment the CLI is connected to).

## Development status

!!! warning "Quix CLI is in development"

    Quix CLI is currently Beta, and is under development. This documentation may not be completely up to date, as the CLI is updated frequently, with new commands added, some commands removed, and changes to command syntax. Please use the Quix CLI built-in help for the very latest information.

## GitHub repository

View additional information about the CLI in the [GitHub repository](https://github.com/quixio/quix-cli){target=_blank}.

## Next step

* [Step through the CLI Quickstart](./cli-quickstart.md)

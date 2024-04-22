---
title: Projects and environments
description: Quix projects represent Git repositories and environments branches.
---

# Projects and environments

This section of the documentation covers **creating your project and environments**.

In previous versions of Quix, each service was developed independently and had its code in its own Git repository. The problem with this approach was it was not possible to manage a complete pipeline with revision control. For the pipeline you could not have different branches for development or production, for example. 

Quix now introduces the concept of a "monorepo" known as a **project**, where all the code and configuration for the pipeline is stored in a single repository. 

The monorepo (project) contains all the branches for the project, and all revision history for all services that make up the pipeline. This enables you to manage the complete pipeline development with full revision history, and use branches to develop features that are then merged after testing, as is usual for development processes based around Git.

With these changes, you now start your pipeline development by creating a project. A project is an entity that corresponds to a Git repository. That Git repository can be hosted for you on Quix, or you can use another provider such as GitHub or Bitbucket. 

A project contains one or more environments (which is mapped to a Git branch), so typically you create an environment as part of the project creation workflow, and then create additional environments as required.

## Environments

An environment can be thought of as an entity that encapsulates a branch in your project, that contains the code for your applications. For example, you could have an environment called "production" that references a `main` branch. You could also have an environment called "develop" that references a `dev` branch.

While environments share a repository, they are logically isolated. Each environment can use Kafka hosted by Quix, self-hosted Kafka, or Confluent Cloud, independently of each other. For example, your "develop" environment could use Quix-hosted Kafka, and your "production" environment could use Confluent Cloud.

Let’s look at an example, Project Alpha, which has a Git repository hosted on Bitbucket:

| Environment | Branch | Kafka Hosting |
| ---|---|---|
| Production | main | Confluent Cloud |
| Staging | staging | Quix |
| Develop | dev | Quix |

You can see that while the project is hosted in Bitbucket, each environment can use a different Kafka hosting option as required for the use case.

!!! note

    In previous versions of Quix, the main entity most closely corresponding to an environment was the workspace. In some circumstances you may still see the term workspace used in some places, such as URLs. Simply bear in mind that workspaces are now environments, and very much enhanced in their capabilities.

## Legacy workspaces

To protect your investment in Quix, legacy workspaces will be supported for some time to come. 

!!! important

    Quix **strongly** advises that your event streaming solutions use the new project-based approach, with environments aligned with your development processes. Simply click `+ New project` to build your first project and environment.

If you already have a legacy workspace, or you wish to create one for some reason, such as to follow some old content, then this is still supported. You can create a legacy workspace by clicking `+ New workspace`, as shown in the following screenshot:

![Legacy Workspace](../images/legacy-workspaces.png)

!!! tip

    Legacy workspaces now map to [environments](#environments). In the dashboard you can see that your legacy workspaces are simply counted as environments.

## New and legacy terminology comparison

The key terminology changes are shown in the following table:

| New | Legacy | New meaning |
|---|---|---|
| Project | N/A | Git repository |
| Environment | Workspace | Git branch plus Kafka hosting and storage options |
| Branch | N/A | Represents a Git branch, such as main or dev |
| Application | Project | The files for the implementation of a source, transform, or destination |

## Topics

Typically, topics are automatically created for you when you need them. They are created with default settings. However, you can [manually create a topic](./create-topic.md), if you want to specify more advanced settings for the topic, such as the number of partitions to allocate to a topic.

## 🏃‍♀️ Next step

[Create your project :material-arrow-right-circle:{ align=right }](./create-project.md)

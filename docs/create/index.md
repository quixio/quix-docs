# Overview

In previous versions of Quix, each service was developed independently and had its code in its own Git repository. The problem with this approach was it was not possible to manage a complete pipeline with revision control. For the pipeline you could not have different branches for development or production, for example. 

Quix now introduces the concept of a "monorepo" known as a **project**, where all the code and configuration for the pipeline is stored in a single repository. 

The monorepo (project) contains all the branches for the project, and all revision history for all services that make up the pipeline. This enables you to manage the complete pipeline development with full revision history, and use branches to develop features that are then merged after testing, as is usual for development processes based around Git.

With these changes, you now start your pipeline development by creating a project. A project is an entity that corresponds to a Git repository. That Git repository can be hosted for you on Quix, or you can use another provider such as GitHub or Bitbucket. 

A project contains one or more environments (which is mapped to a Git branch), so typically you create an environment as part of the project creation workflow, and then create additional environments as required.

* [Watch a video on how to Create a project](https://www.loom.com/share/b4488be244834333aec56e1a35faf4db?sid=a9aa124a-a2b0-45f1-a756-11b4395d0efc){target=_blank}

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

[Watch a video on how to create an environment](https://www.loom.com/share/877ae703f0cf458f8827341549adce6c?sid=5cacebef-659f-45cd-b4eb-c2e3f7104ccb){target=_blank}

## Protected environments

When you create a branch, it is possible to make it protected. This means that you can’t change the branch directly. You can’t commit changes directly into a protected branch. To modify a protected branch you would need to create a pull request, which would need to be reviewed, approved, and then merge in the usual way for the Git workflow. 

!!! tip

    Note that as all code and configuration for an environment is stored in its corresponding branch, you will not be able to directly change an environment that has a protected branch.

Consider a simple example where you have a protected `main` branch, and a `dev` branch. You would carry out normal development work in the `dev` branch, and then when satisfied that the changes are fully correct and tested, you could create a merge pull request to merge `dev` into `main`. The pull request would appear in your Git provider (Gitea if using the Quix-hosted Git solution), where it could be reviewed by other developers, approved, and then merged into `main`. 

If you then view the pipeline in the production environment, it is now marked as “out of sync”. This is because the view of the pipeline in the Quix environment is now different to what is in the `main` branch of the repository. If you then “sync” the environment, you can see the changes you merged from dev to main are reflected in the production pipeline.

If you make changes to an unprotected environment in the Quix "view", then the environment differs from the configuration and code in the corresponding repository branch. Quix will detect this and you will again be notified that the environment is now out of sync. You can simply click `Sync environment` to have the changes in the Quix view reflected in the corresponding branch.

[Watch a video on merging changes](https://www.loom.com/share/b2f2115fba014473aac072bb61609160?sid=22ddf07f-fa40-4ed8-a5ae-1a6eb0420465){target=_blank}

## Syncing an environment

You can think of your environment as consisting of two parts: the Quix view, and what's in the Git repository. Sometimes these become out of sync. For example, if you make changes in the Quix view, such as adding an application to your pipeline, those changes need to be synchronized to the repository. Mostly this is done automatically for you. 

Sometimes you will need to sync your environments manually. For example, if you have merged a pull request from dev to production, then the contents of the repository branch corresponding to the production environment  will now differ from the Quix view of the environment. This will be detected, and you are offered the option to synchronize between the corresponding branch in the Git repository, and the Quix view of the environment. 

You can always review the changes that will be made to your `quix.yaml` file, before you perform the synchronization.

The rules around manual and automatic synchronization are:

1. Operations performed in the Quix portal should not cause "out of sync", as those operations are automatically saved to the Git repository. This is the case for both Quix-managed and third-party hosted Git.
2. The exception to this is the case of YAML variables. When variables are created, if those are included in the `quix.yaml`, you will need to perform manual synchronization. You are prompted if this is required.
3. If you change the `quix.yaml` in the Git repository, then you may get "out of sync". The `quix.yaml` file currently only includes topics and deployments.

!!! important

    Quix always notifies you if manual synchronization is required. You can then click `Sync environment` and you are shown the changes that will be made on synchronization. If you are happy with the changes that are to be made, then you can proceed with the synchronization.

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

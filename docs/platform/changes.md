# Recent changes to Quix

The Quix Platform has recently undergone some substantial changes. These changes introduce some new terminology, and may also impact the way you currently work. This page provides an overview of the main changes. Other parts of this documentation will be updated in due course.

## Main features of the update

Quix now supports the ability to: 

* Host a complete pipeline in one branch of your Git repository
* Build a complete pipeline from a single YAML file
* Automatically synchronize changes in the Git repository with the pipeline view
* Easily manage multiple environments such as production, staging and development
* Host projects with Quix-hosted Git or using a third-party provider
* Enable environments to leverage Quix-hosted Kafka, self-hosted Kafka, or Confluent Cloud
* Customized resource variables, so you can allocate different resources to different environments - for example, automatically allocate more CPU cores to production

These new features introduced significant changes to the Quix UI and workflow. The rest of this documentation describes the new terminology, features, and workflow. 

## Watch a video

Watch a video demonstrating the new features, UI and workflow:

1. Creating a project and the first environment
2. Creating an additional environment
3. Creating an application
4. Merging environments
5. YAML variable for deployment configuration

## Projects

With these changes, you now start by creating a Project. A project is an entity that corresponds to a Git repository. That Git repository can be hosted for you on Quix, or you can use another provider such as GitHub or Bitbucket. 

A project contains one or more environments, so typically you create an environment as part of the project creation workflow, and then create additional environments as required.

## Environment

An environment can be thought of as an entity that encapsulates a branch in your project, that contains the code for your applications. Each environment can use Kafka hosted by Quix, self-hosted Kafka, or on Confluent Cloud.

Let’s look at an example, Project Alpha, which has a Git repository hosted on Bitbucket:

| Environment | Branch | Kafka Hosting |
| ---|---|---|
| Production | main | Confluent Cloud |
| Staging | staging | Quix |
| Develop | dev | Quix |

You can see that while the project is hosted in Bitbucket, each environment can use different Kafka hosting options as required for your use case.

!!! note

    In previous versions of Quix, the main entity most closely corresponding to an environment was the workspace. In some circumstances you may still see the term workspace used in some places, such as URLs. Simply bear in mind that workspaces are now environments, and very much enhanced in their capabilities.

## Applications

With a branch you develop your Applications, typically in Python. Each application represents the implementation of a source, transform, or destination.

For example, you might create a new source component to retrieve data from an external service, a transform to process this data, and then perhaps a destination, which could store data in a Postgres database. You might have another destination to display the data on a Streamlit dashboard. 

These applications are connected together to form your pipeline. It is important to note the pipeline is contained within a branch.

For example, a pipeline on the develop branch of Project Alpha might be:

| Application name | Type | Notes |
|---|---|---|
| Inbound data | Source | Fetch data from REST API |
| IP to geo | Transform | Converts IP address to Geolocation |
| Archive data | Destination | Write to Postgres relational database |
| Dashboard | Destination | Streamlit dashboard |

## Pipeline

An entire Quix pipeline can be described by a `quix.yaml` file. This file is also used to configure resources used by the deployment.

This allows Quix to quickly replicate an entire pipeline and configuration. For example, a pipeline created and tested in one branch, can be quickly duplicated in another branch. 

It is also possible to use YAML variables in the YAML file to configure resources differently depending on the environment.

## Protected branches

When you create a branch, it is possible to make it protected. This means that you can’t change the branch directly. You can’t commit changes directly into a protected branch. To modify a protected branch you would need to create a pull request, which would need to be reviewed, approved, and then merge in the usual way for the Git workflow. 

Consider a simple example where you have a protected main branch, and a develop branch. You would carry out normal development work in the develop branch, and then when satisfied that the changes are fully correct and tested, you could create a merge pull request to merge develop with main. The pull request would appear in your Git provider (Gitea if using the Quix-hosted Git solution), where it could be reviewed by other developers, approved, and then merged into main. 

If you view the pipeline in the production environment, it is now marked as “out of sync”. This is because the view of the pipeline in the Quix environment is now different to what is in the main branch of the repository. If you then “sync” the environment, you can see the changes you merged from dev to main are reflected in the production pipeline.

## New and legacy terminology comparison

The key terminology changes are shown in the following table:

| New | Legacy | New meaning |
|---|---|---|
| Project | N/A | Git repository |
| Environment | Workspace | Git branch plus Kafka hosting option |
| Branch | N/A | Represents a Git branch, such as main or dev |
| Application | Project | The files for the implementation of a source, transform, or destination |

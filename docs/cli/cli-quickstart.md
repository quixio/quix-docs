# Quix CLI Quickstart

In this guide you create a simple project on the command line, test it locally, and sync it with your Quix Cloud pipeline view.

## Prerequisites

This guide assumes you have installed [Quix Streams](../get-started/install.md).

!!! tip

    Make sure you install Quix Streams with `python3 -m pip install quixstreams` if you haven't already done so. If you have Quix Streams installed, make sure you are using the latest version with `python -m pip install quixstreams -U` or `python3 -m pip install quixstreams -U`, depending on how your system is set up. 

## Step 1: Install Quix CLI

To install Quix CLI:

```
curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | sudo bash
```

For further details on installation, including instructions for Microsoft Windows, see the [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

!!! tip

    To update Quix CLI just run `quix update` to get the latest version of Quix CLI.

## Step 2: Create a Git repository

Create a Git repo in your Git provider's service, where you are going to store your project files. For example, you could create a repository on GitHub. Create a repo initialized with a `README.md` file, so it can be cloned more easily. You can add a `.gitignore` (the Python one is a good choice), and a licence as required.

## Step 3: Clone your Git repo into your local project directory

Copy your Git repository URL from your Git provider.

Now, clone the repository using the URL. For example:

```
git clone <url-to-git-repository>
```

Change into your project directory. For example, if your project is called `cli-app`:

```
cd cli-app
```

## Step 4: Initialize your project as a Quix project

In your Git project directory, enter:

```
quix local init
```

This initializes your Quix project with a `quix.yaml` file, which describes your Quix project.

## Step 5: Create your application locally

Now create a sample application:

```
quix local app create starter-source
```

This creates a starter source for you. You can explore the files created locally for you. 

## Step 6: In Quix Cloud create a project

In this step you create a project in Quix Cloud from your Git repository.

1. Return to Quix Cloud.
2. Select `Quix advanced configuration` to continue creation of your project.
3. Select your Git provider.
4. Link the project to your Git repository using the guide provided for your chosen Git provider.
4. Sync Quix Cloud to your project by clicking the `Sync environment` button.

## Step 7: Sync your application

To sync your application, change into the `Starter transformation` directory and enter:

```
quix local pipeline sync --update
```

This updates your `quix.yaml` project file, and pushes all changes to your Git repository. It also synchronizes your Git repository with Quix Cloud.

## Step 8: See your pipeline running in Quix Cloud

Go to pipeline view, and see your pipeline running, with your Starter transformation.

![Pipeline running](../images/starter-transform.png)

## Next step

* [Step through a tutorial](../cli/cli-template.md)

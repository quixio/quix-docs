---
title: Create a project
description: You install the Quix CLI and create a simple project, with a pipeline consisting of one data source application, which you then sync up with Quix Cloud.
---

# Create a project

In previous sections of the documentation you explored using Quix Streams. You now continue your journey on the command line by installing the Quix CLI, and then using it to connect with Quix Cloud. From your Git repository, you create a simple project on the command line, add a data source application, and then sync it with your Quix Cloud pipeline view.

## Step 1: Create a Git repository

Create a Git repo where you can store your files, for example you could use GitHub. Create a repo initialized with a `README.md` file, so it can be cloned more easily. 

## Step 2: Clone your Git repo into your local project directory

For example, if your GitHub repo is named `cli-app`:

```
git clone <url-to-git>/cli-app
cd cli-app
```

## Step 3: Install Quix CLI

```
curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | sudo bash
```

For further details on installation, including instructions for Microsoft Windows, see the [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

## Step 4: Initialize your project as a Quix project

In your Git project directory, enter:

```
quix local init
```

This initializes your Quix project with a `quix.yaml` file, which describes your Quix project.

## Next step

* [Add a source](./cli-add-source.md)

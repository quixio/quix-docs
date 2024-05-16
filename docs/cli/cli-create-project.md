---
title: Create a Git project
description: You create a Git project, clone it locally, and initialize it to use Quix.
---

# Create a Git project

In previous sections of the documentation you explored using Quix Streams. You now continue your journey on the command line by installing the Quix CLI, and then using it to connect with Quix Cloud. 

From your Git repository, you create a simple project on the command line, add a data source application, along with a transform and destination, test it, and then sync it with your Quix Cloud pipeline view.

## Step 1: Create a Git repository

Create a Git repo with a Git provider, where you can store your project files. For example, you could use GitHub or GitLab. Create a repo initialized with a `README.md` file, so it can be cloned more easily. Add a `.gitignore` such as the standard one for Python, and a license.

## Step 2: Clone your Git repo into your local project directory

Clone your Git repository:

```
git clone <url-to-git-repo>
```

The change into your project directory. For example, if your GitHub repo is named `cli-app`:

```
cd cli-app
```

## Step 3: Initialize your project as a Quix project

In your Git project directory, enter:

```
quix local init
```

This initializes your Quix project with a `quix.yaml` file, which describes your Quix project.

## Next step

* [Sign up to Cloud](./cli-cloud-signup.md)

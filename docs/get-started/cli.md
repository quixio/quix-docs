# Using the Quix CLI

In previous sections of the documentation you explored using Quix Streams. You now continue on your command-line journey by installing the Quix CLI, and then using it to connect with Quix Cloud.

## Step 1: Install Quix CLI

```
curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | sudo bash
```

For fruther details on installation see the [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

## Step 2: Sign up to Quix Cloud for free

Sign up [here](https://portal.platform.quix.io/self-sign-up){target=_blank}.

## Step 3: Obtain a personal Access Token (PAT)

Log into Quix Cloud and obtain a PAT. To do this click on your profile icon in Quix Cloud. Then generate a token and copy it to the clipboard using the button provided.

## Step 4: Log in using the CLI

```
quix login <your-pat>
```

## Step 5: Create a Git repository

Create a Git repo where you can store your files, for example you could use GitHub. Create a repo initialized with a `README.md` file, so it can be cloned more easily. 

## Step 6: Clone your Git repo into your local project directory

For example, if your project is `cli-app`:

```
git clone <url-to-git-repo>/cli-app
cd cli-app
```

## Step 7: Initialize your project as a Quix project

In your Git project directory, enter:

```
quix local init
```

This initializes your Quix project with a `quix.yaml` file, which describes your Quix project.


## Step 8: Create your application locally

Now create a sample application:

```
quix local app create
```

This creates a starter transformation for you. You can explore the files created locally for you. The `main.py` code will look familiar to you if you've tried the [previous sections](./welcome.md) of the documentation.


## Step 9: Sync your application

To sync your application, change into the `Starter transformation` directory and enter:

```
quix local deploy --push --sync
```

This updates your `quix.yaml` project file, and pushes all changes to your Git repository.

## Step 10: In Quix Cloud create a project

In this step you create a project in Quix Cloud from your Git repository.

1. Enter Quix Cloud.
2. Create a new project.
3. Link the project to your Git repository using the guide.
4. Sync Quix Cloud to your project by clicking the `Sync environment` button.

## Step 11: See your pipeline running

Go to pipeline view, and see your pipeline, with your Starter transformation.

![Pipeline running](../images/starter-transform.png)

## Next steps

* 
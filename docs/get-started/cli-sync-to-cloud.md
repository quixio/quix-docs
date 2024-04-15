# Sync to Quix Cloud

## Step 1: Sign up to Quix Cloud for free

Sign up [here](https://portal.platform.quix.io/self-sign-up){target=_blank}.

When you log into Quix Cloud, you'll be prompted to create a project.

## Step 2: In Quix Cloud create a project

In this step you create a project in Quix Cloud based on your Git repository.

1. Select `Quix advanced configuration` to continue creation of your project.
2. Select your Git provider (for example, GitHub).
3. Link the project to your Git repository using the guide provided for your chosen Git provider.
4. Use PROD for your environment, and make sure the main branch is selected.

If you need help on creating a project, you can [read the documentation](../create/create-project.md).

When you've created the project, switch back to the command line.


## Step 3: Log in using the CLI

Log into Quix Cloud using the CLI using the following command:

```
quix login
```

If you're not logged into Cloud, you'll be prompted to log in.

## Step 4: Sync your application

To sync your application, change into the `F1 demo data` directory and enter:

```
quix local deploy --push --sync --override-with-default-values
```

This updates your `quix.yaml` project file, and pushes all changes to your Git repository. This also makes sure your Quix environment is synched with the corresponding Git repository, and that your changes to default values in the local `app.yaml` files are also reflected in the Quix environment.

## Step 5: See your pipeline running

In Quix Cloud, go to pipeline view, and see your pipeline running, with your F1 demo data source running.

![CLI pipeline](../images/cli-pipeline.png)

## Next steps

* []()
* []()
* []()

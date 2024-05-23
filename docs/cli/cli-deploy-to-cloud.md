# Deploy to Quix Cloud

You can now level up by deploying your pipeline to Quix Cloud.

## Step 1: Sign up to Quix Cloud

It's free to [sign up to Quix Cloud](https://portal.platform.quix.io/self-sign-up){target=_blank}.

After signing up using the method of your choice, you'll be taken to the `Welcome to Quix` dialog, where you can create a new project, as shown in the next step.

## Step 2: Create your first project

You're now ready to create your first project. 

1. Give your project a suitable name, such as "CLI Pipeline".
2. Select the `Quix advanced configuration` option.
3. Click `Let's get started`.
4. Select your Git provider from the `Connect to your own Git repo`.
5. Link the project to your Git repository using the setup guide provided for your chosen Git provider.
6. Click `Validate` to make sure everything is good and then click `Done`.
7. Click `Create project`.
8. Now create an environment. Enter an environment name of "PRODUCTION".
9. Make sure the `main` branch is selected.
10. Click `Continue`.
11. Select the Quix managed broker (which is the default option).
12. Click `Create environment`. After the environment is fully created you are taken to your pipeline view.

## Step 3: Synchronize your Quix environment 

To synchronize your pipeline view with your Git repository click the `Sync environment` button, which is located in the top right of your pipeline view.

You'll be shown the `Sync to this commit` dialog. View the changes that are to be made and then click `Sync to this commit`.

Now click `Go to pipeline`.

## Step 4: See your pipeline running in Quix Cloud

In the pipeline view you can see your pipeline running:

![CLI Pipeline running](../images/cli/pipeline-quix-cloud.png)

## Step: 

TBD
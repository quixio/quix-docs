# Fork a project

In this section you to learn how to fork a project, and get it up and running in your own Quix account. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your copy of the project. 

With a fork of the repository, you can also receive upstream bug fixes and improvements if you want to, by syncing your fork with the upstream repository. 

In the following sections you learn how to:

1. Fork an existing project repository.
2. Create a new project (and environment) in Quix, linked to your forked repository.

## Watch a video

This video shows you how to fork a template project and create your project in Quix:

<div style="position: relative; padding-bottom: 49.61664841182914%; height: 0;"><iframe src="https://www.loom.com/embed/f1a462a7db8a44429261df1c03b26c48?sid=1e9fbaef-0961-4ccb-a597-d823e3a08b64" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Note, this is for the computer vision template project, but the process is the same.

## Fork the project repository

Quix provides the template project as a public GitHub repository. 

!!! tip

    Search the Quix GitHub repositories for projects with `template` in them, or see the [project gallery](https://quix.io/templates){target=_blank}. 

If you want to use this template as a starting point for your own project, then you can fork the project. 

Using fork enables you to create a complete copy of the project, but also benefit from future bug fixes and improvements by using the upstream changes.

To fork the repository:

1. Navigate to the template's [GitHub repository](https://github.com/quixio?q=template&type=all&language=&sort=){target=_blank}.

2. Click the `Fork` button to fork the repo into your GitHub account (or equivalent Git provider if you don't have a GitHub account). 

    !!! important
    
        With template repositories, by default the `tutorial` branch is selected for you when you fork. If not, make sure you deselect the `fork main only` checkbox, so you fork all branches, as the `tutorial` branch is desgined to work with the free Quix account.

!!! tip 

    If you don't have GitHub account you can use another Git provider, such as GitLab or Bitbucket. If using Bitbucket, for example, you could import the repository - this would act as a clone (a static snapshot) of the repository. This is a simple option for Bitbucket, but you would not receive upstream changes from the original repository once the repository has been imported. You would however have a copy of the project you could then modify to suit your use case. Other providers support other options, check the documentation for your Git provider.

## Create your Quix project

Now that you have a forked copy of the repository in your GitHub account, you can now link your Quix account to it. Doing this enables you to build and deploy the project in your Quix account, and examine the pipeline much more closely.

To link Quix to this forked repository:

1. Log into your Quix account.

2. Click `+ Create project`.

3. Give your project a name. For example, "My Project".

4. Select `Connect to your own Git repo`, and follow the setup guide for your provider.

    !!! tip

        A setup guide is provided for each of the common Git providers. Other Git providers are supported, as long as they support SSH keys.

    The setup guide for GitHub is shown here:
            
    ![Git seup guide](../images/git-setup-guide.png)

5. Assuming you are connecting to a GitHub account, you'll now need to copy the SSH key provided by Quix into your GitHub account. See the setup guide for further details.

    !!! important

        It is recommended that you create a new user in your Git provider for managing your Quix projects. You are reminded of this when you create a project (the notice is shown in the following screenshot).

    ![Create new user](../images/create-new-github-user.png)

6. Click `Validate` to test the connection between Quix and GitHub. 

    !!! tip
    
        If errors occur you need to address them before continuing. For example, make sure you have the correct link to the repository, and you have have added the provided SSH key to your provider account, as outlined in the setup guide for that provider.

7. Click `Done` to proceed.

You now need to add an environment to your project. This is explained in the following section.

## Create your environment

You now need to create an environment. See the [create environment documentation](create-environment.md) for details.

## Configure secrets

You'll need to [create any secrets](../deploy/secrets-management.md) the project requires, for example, for external services such as InfluxDB Cloud.

Once you've added your secrets, you can Synchronize and then go to the completed pipeline and monitor all services as they start.

# Get the project

While you can see the [deployed project running in Quix](TODO){target=_blank}, it can be useful to learn how to get a project up and running in Quix. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your forked copy of the project. 

With a forked copy of the repository, you can also receive upstream bug fixes and improvements if you want to, by syncing the fork with the upstream repository. 

In the following sections you learn how to:

1. Fork an existing project repository, in this case the computer vision template project.
2. Create a new project (and environment) in Quix linked to your forked repository.

In later parts of the tutorial you explore the project pipeline using the Quix data explorer and other tools, viewing code, examining data structures, and getting a practical feel for Quix.

## 💡 Key ideas

The key ideas on this page:

* Forking a public template project repository
* Connecting Quix to an external Git repository, in this case the forked repository
* Quix projects, environments, and applications
* Pipeline view of project
* Synchronizing an environment

## Watch a video

This video shows you how to fork the template project and create your project in Quix:

<div style="position: relative; padding-bottom: 49.61664841182914%; height: 0;"><iframe src="https://www.loom.com/embed/f1a462a7db8a44429261df1c03b26c48?sid=1e9fbaef-0961-4ccb-a597-d823e3a08b64" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Fork the project repository

Quix provides the Clickstream template project as a [public GitHub repository](https://github.com/quixio/template-clickstream){target="_blank"}. If you want to use this template as a starting point for your own project, then the best way to accomplish this is to fork the project. Using fork enables you to create a complete copy of the project, but also benefit from future bug fixes and improvements by using the upstream changes.

To fork the repository:

1. Navigate to the [Quix GitHub repository](https://github.com/quixio/template-clickstream){target="_blank"}.

2. Click the `Fork` button to fork the repo into your GitHub account (or equivalent Git provider if you don't have a GitHub account). 

    !!! important
    
        With this repository, by default the `tutorial` branch is selected for you when you fork. If not, make sure you deselect the `fork main only` checkbox, so you fork all branches, as in this tutorial you will be working with the `tutorial` branch.

!!! tip 

    If you don't have GitHub account you can use another Git provider, such as GitLab or Bitbucket. If using Bitbucket, for example, you could import the repository - this would act as a clone (a static snapshot) of the repository. This is a simple option for Bitbucket, but you would not receive upstream changes from the original repository once the repository has been imported. You would however have a copy of the project you could then modify to suit your use case. Other providers support other options, check the documentation for your Git provider.

## Create your Quix project

You can watch a video on how to create the project

Now that you have a forked copy of the repository in your GitHub account, you can now link your Quix account to it. Doing this enables you to build and deploy the project in your Quix account, and examine the pipeline much more closely.

To link Quix to this forked repository:

1. Log into your Quix account.

2. Click `+ Create project`.

3. Give your project a name. For example, "Clickstream".

4. Select `Connect to your own Git repo`, and follow the setup guide for your provider.

    !!! tip

        A setup guide is provided for each of the common Git providers. Other Git providers are supported, as long as they support SSH keys.

    The setup guide for GitHub is shown here:
            
    ![Git seup guide](../../images/git-setup-guide.png)

5. Assuming you are connecting to a GitHub account, you'll now need to copy the SSH key provided by Quix into your GitHub account. See the setup guide for further details.

    !!! important

        It is recommended that you create a new user in your Git provider for managing your Quix projects. You are reminded of this when you create a project (the notice is shown in the following screenshot).

    ![Create new user](../../images/create-new-github-user.png)


6. Click `Validate` to test the connection between Quix and GitHub. 

    !!! tip
    
        If errors occur you need to address them before continuing. For example, make sure you have the correct link to the repository, and you have have added the provided SSH key to your provider account, as outlined in the setup guide for that provider.

7. Click `Done` to proceed.

You now need to add an environment to your project. This is explained in the following section.

## Create your environment

A Quix project contains at least one branch. For the purposes of this tutorial you will examine the `tutorial` branch of the project. In a Quix project a branch is encapsulated in an environment. You'll create a `Tutorial` environment mapped to the `tutorial` branch of the repository.

Now create an environment called `Tutorial` which uses the `tutorial` branch:

1. Enter the environment name `Tutorial`.

2. Select the `tutorial` branch from the dropdown.

3. Click `Continue` and then select the Quix Broker and Standard storage options to complete creation of the environment, and the project.

4. Go to the pipeline view. You will see that Quix is out of sync with the repository.

5. Click the `Sync` button to synchronize the environment, and then click `Go to pipeline`. You will see the pipeline building.

At this point you can wait a few minutes for the pipeline services to completely build and start running.

## Configure credentials

| Environment Variable (secret) | Service(s) | Description|
|---|---|---|
| `redis_host` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Host URL for Redis Cloud database |
| `redis_port` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Port for the Redis Cloud database |
| `redis_username` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Username for the Redis Cloud database - typically `default`|
| `redis_password` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Password for the Redis Cloud database - found from Security section |
| `bearer_token` | Webshop frontend | A [PAT](../../develop/authentication/personal-access-token.md) that the web app uses to authenticate the Streaming Reader and Streaming Writer APIs |

You need to [create secrets](../../deploy/secrets-management.md) for these and then assign them to the appropriate [environment variables](../../deploy/environment-variables.md).

### Other services

Other optional services may require similar configuration, for example, the Quix Amazon S3 connector service requires your S3 credentials if you want to use it.

## 🏃‍♀️ Next step

[Part 2 - TODO :material-arrow-right-circle:{ align=right }](TODO)

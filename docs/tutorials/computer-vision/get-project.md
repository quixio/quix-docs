# Get the project

While you can see the [deployed project running in Quix](https://portal.platform.quix.io/pipeline?workspace=demo-computervisiondemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg){target=_blank}, it can be useful to learn how to get a project up and running in Quix. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your forked copy of the project. With a forked copy of the repository, you can also receive upstream bug fixes and improvements if you want to, by syncing the fork with the upstream repository. 

In the following sections you learn how to:

1. Fork an existing project repository, in this case the computer vision template project.
2. Create a new project (and environment) in Quix linked to your forked repository.

In later parts of the tutorial you explore the project pipeline using the Quix data explorer and other tools, viewing code, examining data structures, and getting a practical feel for the Quix Portal.

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

Quix provides the computer vision template project as a [public GitHub repository](https://github.com/quixio/computer-vision-demo){target="_blank"}. If you want to use this template as a starting point for your own project, then the best way to accomplish this is to fork the project. Using fork enables you to create a complete copy of the project, but also benefit from future bug fixes and improvements by using the upstream changes.

To fork the repository:

1. Navigate to the [Quix GitHub repository](https://github.com/quixio/computer-vision-demo){target="_blank"}.

2. Click the `Fork` button to fork the repo into your GitHub account (or equivalent Git provider if you don't have a GitHub account). Make sure you fork all branches, as you will be looking at the `tutorial` branch.

    !!! tip 

        If you don't have GitHub account you can use another Git provider, such as GitLab or Bitbucket. If using Bitbucket, for example, you could import the repository - this would act as a clone (a static snapshot) of the repository. This is a simple option for Bitbucket, but you would not receive upstream changes from the original repository once the repository has been imported. You would however have a copy of the project you could then modify to suit your use case. Other providers support other options, check the documentation for your Git provider.

## Create your Quix project

You can watch a video on how to create the project

Now that you have a forked copy of the repository in your GitHub account, you can now link your Quix account to it. Doing this enables you to build and deploy the project in your Quix account, and examine the pipeline much more closely.

To link Quix to this forked repository:

1. Log into your Quix account.

2. Click `+ Create project`.

3. Give your project a name. For example, "Computer Vision".

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

As the project uses Quix API credentials, you'll now need to configure your credentials for the services that require API keys. The main ones are:

* TfL camera feed - TfL API key
* Web UI - a bearer token ([PAT](../../apis/streaming-reader-api/setup.md#personal-access-token-pat)) 

You need to [create secrets](../../deploy/secrets-management.md) for these and then assign them to the appropriate [environment variables](../../deploy/environment-variables.md).

### TfL camera feed

To get this service to run, you'll need to configure it with your TfL API key.

Create a new secret that contains your TfL API key. Now link that secret to the `tfl_api_key` environment variable in the TfL camera feed service.

[Read more about environment variables and secret management](../../deploy/environment-variables.md).

Watch the video:

<div style="position: relative; padding-bottom: 50.11160714285714%; height: 0;"><iframe src="https://www.loom.com/embed/11baa3bdaf1c4c4cb4d2589f7f778a10?sid=199727a5-e12d-4b6f-a63e-732ff4690496" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Web UI service

Note if you just want to try out the UI without performing the following steps, you can do that in the [demo](https://app-demo-computervisiondemo-prod.deployments.quix.io/){target=_blank}.

You'll need a [PAT](../../apis/streaming-reader-api/setup.md#personal-access-token-pat) for the UI as it uses the Streaming ReaderAPI which needs to be authenticated. 

Once you have your PAT copied to the clipboard, create a new secret to contain it. Then link that secret to `bearerToken` environment variable for the UI.

[Read more about environment variables and secret management](../../deploy/environment-variables.md).

Watch the video:

<div style="position: relative; padding-bottom: 50.44843049327354%; height: 0;"><iframe src="https://www.loom.com/embed/ac276c49b5144102a364b9f1c04bedcf?sid=903a04cd-e5f7-4c97-a80e-27281a49c9dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

#### Google Maps API key

When testing the UI you see "For development purposes only" displayed on the map. Optionally, if you have a Google Maps API key, you can avoid this.

To add your own Google Maps API key you need to edit `src/app/app.module.ts` and modify the `apiKey` field in `AgmCoreModule.forRoot` to include your Google Maps API key:

``` typescript
AgmCoreModule.forRoot({apiKey: '<your_google_maps_api_key>'}),
```

### Other services

Other optional services may require similar configuration, for example, the Quix Amazon S3 connector service requires your S3 credentials if you want to use it.

## 🏃‍♀️ Next step

[Part 2 - TfL camera feed :material-arrow-right-circle:{ align=right }](tfl-camera-feed.md)

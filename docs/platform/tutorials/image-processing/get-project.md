# Get the project

While you can try out the live demo, or experiement using the ungated product experience, it can be useful to learn how to get a project up and running in Quix. Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your forked copy of the project. You can also receive upstream bug fixes and improvements if you want to, by syncing the fork with the upstream repository. 

In the following sections you learn how to:

1. Fork the project repository.
2. Create a new project in Quix linked to your forked repository.

In later parts of the tutorial you explore the project pipeline using the Quix data explorer and other tools, viewing code, examining data structures, and getting a practical feel for the Quix Portal.

## 💡 Key ideas

The key ideas on this page:

* Connecting Quix to an external Git repository
* Quix projects, environments, and applications
* Pipeline view of project
* Synchronizing an environment

## Fork the project repository

1. Navigate to the [Quix GitHub repository](https://github.com/quixio/computer-vision-demo){target="_blank"}.

2. Click the `Fork` button to fork the repo into your GitHub account (or equivalent Git provider if you don't have a GitHub account). Make sure you fork all branches, as you will be looking at the `develop` branch.

    !!! tip 

        If you don't have GitHub account you can use another Git provider, such as Bitbucket. On Bitbucket you could import the repository.

## Create your Quix project

To link to this forked repository from Quix:

1. Log into your Quix account.

2. Click `+ Create project`.

3. Give your project a name. For example, "Computer Vision".

4. Select `Connect to your own Git repo`.

5. Assuming you are connecting to a GitHub account, you'll now need to copy the SSH key provided into your GitHub account.

    !!! tip

        It is recommended that you create a new GitHub user for managing your Quix projects.

6. Click `Validate` to test the connection between Quix and GitHub.

7. Click `Done` to proceed.

## Create your environment

Now create an environment called `Develop` which uses the `develop` branch:

1. Enter the environment name `Develop`.

2. Select the `develop` branch from the dropdown.

3. Click `Continue` and then select the Quix Broker and Standard storage options to complete creation of the environment, and the project.

4. Go to the pipeline view. You will see that Quix is out of sync with the repository.

5. Click the `Sync` button to synchronize the environment, and then click `Go to pipeline`. You will see the pipeline building.

At this point you can wait a few minutes for the pipeline services to completely build and start running.

## See also

If you are new to Quix it is worth reviewing the [recent changes page](../../changes.md), as that contains very useful information about the significant recent changes, and also has a number of useful videos you can watch to gain familiarity with Quix.

## 🏃‍♀️ Next step

[Part 2 - TfL camera feed :material-arrow-right-circle:{ align=right }](../image-processing/tfl-camera-feed.md)

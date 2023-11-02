# How to create a project

This page describes how to create a new project, and populate it with two environments: `Production` and `Develop`. The `Production` environment is protected. Development work is done in the `Develop` environment, and then reflected in the `Production` environment through a merge request.

!!! note

    You can create as many environments in a project as you need. You can mark them as protected, and name them as needed, to align with your own development processes. This how-to simply shows one example project.

## Watch a video

<div style="position: relative; padding-bottom: 51.839080459770116%; height: 0;"><iframe src="https://www.loom.com/embed/b4488be244834333aec56e1a35faf4db?sid=13c128de-df05-46b5-bb1f-03f6af3e7777" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Creating a project

To do anything useful with Quix, you'll need at least one project, and one environment. You can think of a project as corresponding to a Git repository, and an environment as corresponding to Git branch within that repository. 

1. [Sign up](https://portal.platform.quix.ai/self-sign-up){target=_blank} and log into Quix.

2. Click on `+ New project`.

    ![+ New project](../images/create-project/create-project.png)

3. Give your project a name, such as `My project`.

4. Select either Quix-hosted Git, or a third-party Git provider. The third-party provider must support SSH keys.

5. Click `Create project`.

You are taken automatically into the `Environment settings` wizard to create your first environment.

## Creating the `Production` environment

The environment corresponds with a branch in your project. Typically you'll have multiple environments. As well as correpsonding to a branch, an environment contains your selected Kafka hosting options, and also the storage requirements.

1. Enter the environment name, `Production`. Note: it can be named anything that suits your own development processes.

2. Select the repository branch. By default this is `main`. Leave this as the default value.

3. Check the `This branch is protected` checkbox. This prevents modifications directly to your production environment.

4. Click `Continue`.

5. You can now select your broker settings for the environment. The options are Quix-hosted Kafka, Self-hosted Kafka, and Confluent Cloud. Select `Quix Broker` and then click `Continue`.

6. Select the `Standard` storage option, and then click `Create environment`.

## Creating the `Develop` environment

You'll now create an environment in which you can do your development work (remember, the production environment is protected in this example, so you can't change it directly).

1. There are various ways to add an environment. One way is to click the kebab menu next to the panel that displays your environments:

    ![+ New project](../images/create-project/add-environment.png)

2. Now click `+ New environment`.

3. Enter the environment name, `Develop`. Note: it can be named anything that suits your own development processes.

4. Select the repository branch. Activate the repository branch dropdown menu, and click `+ New branch`. 

5. In the `New branch` dialog enter `dev` as the branch name. In this case you want to branch from `main`. Note: again, values entered here can be anything that suits your development process, for example, you may create branches from branches if required.

6. Click `Create branch`.

7. As you are going to do development work here, leave the `This branch is protected` checkbox clear.

8. Click `Continue`.

9. You can now select your broker settings for the environment. The options are Quix-hosted Kafka, Self-hosted Kafka, and Confluent Cloud. Select `Quix Broker` and then click `Continue`.

10. Select the `Standard` storage option, and then click `Create environment`.

You have now created your `Develop` environment.

## Performing a merge request

Once you have carried out development work, you will want to have those changes reflected in production. As your `Production` environment is protected you have to do this by creating a merge request.

1. Click the kebab menu next to the panel that displays your environments.

2. Select `Merge request`.

3. Select a source and target environment. In this example the source is `Develop` and the target is `Production`.

4. Click `Create pull request`.

    At this point, you will be taken into your Git provider where you can review the merge commit. Use your usual development processes to review and approve the merge.

    !!! tip

        If using the Quix-hosted Git provider and you are asked to log into Gitea, you need to obtain your Git credentials. To do this click on your profile image in Quix, and then select `Manage Git credentials`. Generate a password, and use the email and generated password to log into Gitea.

## Syncing your environment

When you select your `Production` environment, you will see that it is now flagged as `out of sync` with the Git repository. You now need to synchronize the environment to have the changes submitted using the merge commit reflected in the Quix view of the environment. To do this:

1. In the top right corner click the blue `Sync environment` button. The `Sync environment` dialog is displayed.

2. Review the changes that will be made to the `quix.yaml` file. Note: the `quix.yaml` file is an important file that defines the entire pipeline in your environment. Your pipeline view in Quix is built from this file.

3. Click `Sync environment`. You also have the options of editing the YAML or exiting the sync process.

4. Once synchronized, click the `Go to pipeline` button. 

The pipeline in `Production` now reflects the work that was done in the `Develop` environment.

## Next steps

Here are some suggested next steps to help you continue your Quix learning journey:

* Read about Quix projects, environments, and other terminology in the [Quix glossary](../get-started/glossary.md).
* Go on the [Quix Tour](../get-started/quixtour/index.md).

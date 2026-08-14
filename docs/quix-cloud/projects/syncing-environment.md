# Syncing an environment

You can think of your environment as consisting of two parts: the Quix view, and what's in the Git repository. Sometimes these become out of sync. For example, if you make changes in the Quix view, such as adding an application to your pipeline, those changes need to be synchronized to the repository. Mostly this is done automatically for you. 

Sometimes you will need to sync your environments manually. For example, if you have merged a pull request from dev to production, then the contents of the repository branch corresponding to the production environment  will now differ from the Quix view of the environment. This will be detected, and you are offered the option to synchronize between the corresponding branch in the Git repository, and the Quix view of the environment. 

You can always review the changes that will be made to your `quix.yaml` file, before you perform the synchronization.

The rules around manual and automatic synchronization are:

1. Operations performed in Quix should not cause "out of sync", as those operations are automatically saved to the Git repository. This is the case for both Quix-managed and third-party hosted Git.
2. The exception to this is [project variables](../deployments/project-variables.md) and [global variables](../deployments/global-variables.md). When a `{{ }}`-referenced project variable or global-variable group member changes, you need to perform manual synchronization to apply the new value — the *committed* `quix.yaml` keeps the `{{ }}` token itself, never the resolved value. You are prompted if this is required. See [Variables in quix.yaml](../deployments/variables/index.md) for why this substitution is sync-time, not deploy-time.
3. If you change the `quix.yaml` in the Git repository, then you may get "out of sync". The `quix.yaml` file currently only includes topics and deployments.

!!! important

    Quix always notifies you if manual synchronization is required. You can then click `Sync environment` and you are shown the changes that will be made on synchronization. If you are happy with the changes that are to be made, then you can proceed with the synchronization.

# Protected environments

When you create a branch, it is possible to make it protected. This means that you can’t change the branch directly. You can’t commit changes directly into a protected branch. To modify a protected branch you would need to create a pull request, which would need to be reviewed, approved, and then merge in the usual way for the Git workflow. 

!!! tip

    Note that as all code and configuration for an environment is stored in its corresponding branch, you will not be able to directly change an environment that has a protected branch.

Consider a simple example where you have a protected `main` branch, and a `dev` branch. You would carry out normal development work in the `dev` branch, and then when satisfied that the changes are fully correct and tested, you could create a merge pull request to merge `dev` into `main`. The pull request would appear in your Git provider (Gitea if using the Quix-hosted Git solution), where it could be reviewed by other developers, approved, and then merged into `main`. 

If you then view the pipeline in the production environment, it is now marked as “out of sync”. This is because the view of the pipeline in the Quix environment is now different to what is in the `main` branch of the repository. If you then “sync” the environment, you can see the changes you merged from dev to main are reflected in the production pipeline.

If you make changes to an unprotected environment in the Quix "view", then the environment differs from the configuration and code in the corresponding repository branch. Quix will detect this and you will again be notified that the environment is now out of sync. You can simply click `Sync environment` to have the changes in the Quix view reflected in the corresponding branch.

<div style="position: relative; padding-bottom: 51.839080459770116%; height: 0;"><iframe src="https://www.loom.com/embed/b2f2115fba014473aac072bb61609160?sid=546f27fa-4cc5-4470-b19f-27593b0c6830" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

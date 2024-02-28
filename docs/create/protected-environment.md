# Protected environments

When you create a branch, it is possible to make it protected. This means that you can’t change the branch directly. You can’t commit changes directly into a protected branch. To modify a protected branch you would need to create a pull request, which would need to be reviewed, approved, and then merge in the usual way for the Git workflow. 

!!! tip

    Note that as all code and configuration for an environment is stored in its corresponding branch, you will not be able to directly change an environment that has a protected branch.

Consider a simple example where you have a protected `main` branch, and a `dev` branch. You would carry out normal development work in the `dev` branch, and then when satisfied that the changes are fully correct and tested, you could create a merge pull request to merge `dev` into `main`. The pull request would appear in your Git provider (Gitea if using the Quix-hosted Git solution), where it could be reviewed by other developers, approved, and then merged into `main`. 

If you then view the pipeline in the production environment, it is now marked as “out of sync”. This is because the view of the pipeline in the Quix environment is now different to what is in the `main` branch of the repository. If you then “sync” the environment, you can see the changes you merged from dev to main are reflected in the production pipeline.

If you make changes to an unprotected environment in the Quix "view", then the environment differs from the configuration and code in the corresponding repository branch. Quix will detect this and you will again be notified that the environment is now out of sync. You can simply click `Sync environment` to have the changes in the Quix view reflected in the corresponding branch.

<div style="position: relative; padding-bottom: 51.839080459770116%; height: 0;"><iframe src="https://www.loom.com/embed/b2f2115fba014473aac072bb61609160?sid=546f27fa-4cc5-4470-b19f-27593b0c6830" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "Transcript"

    0:01 Hi, welcome back to another video. In this video we're going to have a look at merging the changes we've made in the develop environment into the production environment.

    0:13 But before I do that I need to demonstrate that my application is running as expected. So I go in here I just check the logs, make sure that's as expected.

    0:26 I can check that messages are appearing in real time, which they are. I can also go into topics and look at the live data.

    0:38 That takes me into the data. Explorer, I can select topic. We only have one in this case. I can select the stream and then I can select some parameters to take a look at.

    0:50 So I'll select break, RPM and maybe speed. And you can see those parameters are displayed in the waveform view of the.

    1:00 Data Explorer. I can also look at the table view, make sure the data is appearing in there. And there's also a message view where I can look at the JSON of the individual messages.

    1:14 So that all looks good. So I want to go ahead and merge those changes into production. Now to do that, I'm going to need to create a pull request because if you remember the production environment is hasn't protected branch in it.

    1:30 So we have to make changes to that through the get workflow of creating a pull request, reviewing it, approving it and then merging it.

    1:39 So I'm going to click. Here on merge request and we're going from the death branch to the main branch. So I'll select the main branch here and then click create pull request.

    1:53 Take a few seconds for that to work and you can. See we have four a four here. That's because I've not yet logged into GITI.

    2:07 So I need to sign in. You'll notice that a password is required. So I'm also an email address. So where do we get the credentials from to log in here?

    2:20 Well, if you go back to the quick. Environment and you click on your profile information, then you can see one of the menu options here is manage GIT credentials.

    2:32 So if you click on that. You have the username, which in this case, my email address and. There's a placeholder for a password.

    2:45 So I'm going to use that email address and you'll need to click generate password. That password is not stored, so I'm going to copy that to the clipboard.

    2:58 And go back to GITTY. Just going to paste in the password while I have that my clipboard and type in my email address.

    3:12 And then sign in. Now you can see that that's taken me. Into Giddy and you can see that the changes that I made when I created my application are all here.

    3:32 And this is the pull request that we're looking at here. And you can see that it wants to merge these commits from dev.

    3:41 Into main. So we would review this in the normal way. Add a reviewer, they would go through check the commits, check everything works as expected.

    3:54 And we could then go ahead and create the merge commit. Assuming that's all. All good. So this, this is a work flow that you're going to be quite familiar with.

    4:07 So we can see now that those changes have be merged onto the main branch. If I just quickly look at the code.

    4:19 You can see from here that we have. Because we have two environments and each of those environments corresponds to a branch.

    4:27 We have our two branches in here. So this is for the production environment. And the dev branch here is for the develop environment.

    4:36 Okay, so if I go back into here and go to my production. So we have the production environment. Now we can see a couple of things.

    4:49 And in particular we can see this message here saying production is out of sync. We also get this icon over here.

    4:56 If we hover over it, we get the tool tip that says the production environment is out of sync. Now, what does that mean?

    5:06 Well, it means that Quicks has recognized that what's in this pipeline does not correspond to what's in the corresponding branch in the Git repository.

    5:18 So it knows that the pipeline view and the Git repository are not, that now out of sync. So the question is, how do we synchronize this view so that it reflects what's in the Git repository?

    5:32 So we can do that by clicking this button over here called Sync Environment. So if I click that, it will show me change, is to a special file that we'll talk about in another video.

    5:48 And you can see that there's various information being added in. Now, as I say, I will cover this information in much more detail when we look at this yaml file.

    6:00 There'll be a video dedicated to this yaml file. Because it's key to understanding this new environment that we're working in.

    6:08 But for now, I'm going to click sync environment. Those changes will be applied. Now, if I go to my pipeline, you can see that the production environment.

    6:24 It's now building the application. It's reflecting what we had in the develop pipeline in the development environment. So it's going to take a little while for that to build.

    6:41 Then it will start running. And then we can test that everything is good in production as well. You can see it's created a topic already.

    6:51 And if we hang around for a couple of minutes or so, we can see that we'll build and start running.

    6:57 So what I will do is I'm going to pause the video and then continue once everything is done. It's running.

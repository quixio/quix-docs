# Configure deployments using YAML variables

YAML variables enable you to create variables that can have different values across different environments. For example, if you want to allocate more memory for a deployment in your production environment, you could have a variable `MEMORY` that has a value of 500 in the development environment and 1000 in production.

## Watch a video

You can watch a video on YAML variables here:

<div style="position: relative; padding-bottom: 51.728110599078335%; height: 0;"><iframe src="https://www.loom.com/embed/c66029f67b8747bbb28c0605f5ea3fad?sid=ce696556-b98d-4231-8282-a4bbfdf9795c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "Transcript"

    00:01 Hello again, sorry about the glitch at the end of the last video, apologies for that. What I'll do is I'll just go through what I was going to show you at the end of the previous video and then we're going to get into the main content of this video which is talking about something called YAML variable

    00:21 . So you can see now that the application that we merged from developed to production is running. We can check it in normal way, everything looks good, we can check it in the data explorer.

    00:37 So everything seems to be working. Perfectly fine there. Now one thing that I noticed in the pipeline view here is that if we look at the resources we're using in production.

    00:52 I may it perhaps a little bit unhappy with that because while these values were fun. I'm fine for the development environment.

    01:03 I might want to increase the CPU cores and memory for the production environment. So the question is how can I have one set of deployment variables for develop and a different set of deployment variables for.

    01:21 A production. And that's what we're going to look at in this video. We're going to look at something called yaml variables.

    01:28 Now remember we can't make changes to the production environment directly. So we'll need to make our changes in develop and then merge them across.

    01:39 So let's do that. I'm going to go back to develop. Now a very key point in Quix in this iteration of Quix is the idea of a yaml file, a Quix yaml file.

    01:52 The Quix yaml file, which we're going to have a look at in a second, basically defines the entire pipeline. So with the, if you just have that single yaml file, Quix yaml file, you can reproduce the complete pipeline.

    02:10 So all the applications in the pipeline configurations and so on. So in this video, we're just going to look at some of the yaml variables.

    02:21 And we'll look at the yaml file, the Quix yaml file in much more detail in subsequent videos. But for now, let's focus on these variables that we can use to differently configure different environments.

    02:38 So I'm going to click on yaml. And I can see here the quicks.yaml file and you can see from the comment here that it says this file describes the data pipeline and configuration of resources of a Quix project.

    02:55 So it's essentially everything in this pipeline is. It's all defined here. Now the other thing that we can look at here is the yaml variables.

    03:13 We don't have any variables at the moment, but we can soon fix that. We can just create a new variable.

    03:22 And what I'm going to do is I'm going to have a variable called cpa count. Now you can see here I have my different environments.

    03:38 So I have production here. You can see and develop. Over here. This is highlighted because we're currently in the develop environment.

    03:51 So let's say I would like a cpa count. Oh, let's make it 800 in the production environment. And 200 in the develop environment.

    04:09 So let's just have a look at what that has done. So you can see that it's created this variable here.

    04:20 If I look in the. The code here, you can see that. My CPU count is specified here and my memory is also specified.

    04:36 This is actually half a gig. And this is point two of a call. So what. Well, what I'm also going to do is edit my variables and I want to add another one called memory.

    04:53 And in the develop environment that's currently 500. And for the production environment, I want it to be 1000. So I'm going to save that variable as well and get back here.

    05:13 So you can see for the develop environment, CPU count is 200 and memory is 500. Now, how do I get my YAML file to actually use those variables?

    05:29 Well, I'll need to edit the code to specify where to use those variables instead of hard coded values. And in this case, it's going to be in here.

    05:44 Now, you'll notice I'm using a syntax of double braces and then the variable name. So that's my CPU count and my memory.

    05:56 So now what will happen is the variable will be used depending on the environment. That I'm in. So for the development environment, the values of 200 and 500, but for production, they were, I think, 800 and 1000.

    06:15 So let's commit that change. Now, what we've got here is we've now got this coming up. We're saying develop is behind.

    06:32 It's out of sync. What's it out of sync with? Well, if you remember from our previous video, we said that any difference between the quick view of the pipeline and what's.

    06:43 It's actually in the repository. That's going to be notice. So previously, when we saw this happen, we had changed the repository by doing a pull request and merging that commit into the main branch.

    06:59 But this time, it's the other way around. We've changed the quick view. Things in, in the pipeline, we've changed the ammo code.

    07:06 And we need to sync that up with the repository. So because this isn't a protected repository, we don't need to do it through a pull request.

    07:16 So I can just click sync environment. And go to the pipeline. And now everything should be synced up. Now, if I go back to production.

    07:43 We can see that nothing in production has changed. We changed develop and we, we synced the quick view of the pipeline.

    07:58 The changes we made in the quick view with the repository. But nothing's changed in production. Of course, that's because we haven't merged the changes from the development environment to the production environment.

    08:12 Let's quickly go and have a look in, in here and look at the dev branch. Now the question is did our.

    08:23 Changes get synced up to here when we synchronize the develop environment. Let's have a look. So we're going to the quicks, yammer file and here you can see the changes that I made.

    08:34 I'll synced up. But as yet, if I look in the main branch. Those changes have not been reflected in in.

    08:43 Here in the main branch. So we need to do that. Now you already know how to do that because we saw it before.

    08:51 We're just going to create a merge request. And we're going from develop environment. To the production environment. So. Step branch to main branch.

    09:05 We create pull request. So we can see the pull request here. We can review that. We can make sure everything is good.

    09:26 Let's have a look at the commit. You can see the change here. So that looks good. So I'll go ahead.

    09:53 I'm happy with that. So I'll create the merge commit to merge that into main. And now that. That's merged. If we check.

    10:08 Main. Check the animal. We can see the change has been reflected. So now let's go back to the quick view of things and see what's going on there.

    10:23 So I'll go into. So the production environment. And now you can see that Quix has detected all I'm out of sync with what's in the get repository.

    10:33 So it knows that this environment needs to be synced with get repository because we just merged some changes from dev to main.

    10:41 So let's go ahead and sync the environment. You can see that it's using the variables that we created to now populate these values here.

    10:53 So you may remember for the production environment, we'll be using values of 800 and 1000. Whereas in the dev environment, these values were 200 and.

    11:05 500. So let's sync this up. And go to pipeline. Now you can see that we've now gone to the point eight calls, which corresponds to the 800 value.

    11:24 And. The memory has gone from 500 or half a gig to one gig, which corresponds to 1000. Okay, so now if we go back to the develop environment, we can check that this is still using the values that we set.

    11:45 Of.2 calls and.5, but in production we're using.8 and 1 gigabyte. Okay, so that's it for this video. Thanks for watching.

    11:57 See you in the next video.

## Example Workflow

### View the `quix.yaml` File

To configure a deployment, start by accessing the YAML file in the pipeline view. Click on the service you want to configure and select the `YAML` button in the top right. For example:

```yaml
# Quix Project Descriptor
# This file describes the data pipeline and configuration of resources of a Quix Project.

metadata:
  version: 1.0

# This section describes the Deployments of the data pipeline
deployments:
  - name: CPU Threshold
    application: Starter transformation
    deploymentType: Service
    version: transform-v2
    resources:
      cpu: {{CPU}}
      memory: {{MEMORY}}
      replicas: {{REPLICAS}}
    desiredStatus: Stopped
    disabled: {{DISABLED}}
    variables:
      - name: input
        inputType: InputTopic
        description: Name of the input topic to listen to.
        required: false
        value: cpu-load
      - name: output
        inputType: OutputTopic
        description: Name of the output topic to write to.
        required: false
        value: transform
```

### Add and Use Variables

1. **Create Variables:**
   - Navigate to the `Variables` tab and click `+ New variable`.
   - In the dialog, define a variable (e.g., `MEMORY`, `REPLICAS`, `DISABLED`, `CPU`). You can specify a default value during this step, which will be used if environment-specific values are not provided. For instance:
     - Default: `MEMORY` = 750, `REPLICAS` = 2, `CPU` = 500, `DISABLED` = `false`
     - Development: `MEMORY` = 500, `REPLICAS` = 1, `CPU` = 200, `DISABLED` = `true`
     - Production: `MEMORY` = 1000, `REPLICAS` = 3, `CPU` = 800, `DISABLED` = `false`

2. **Update the YAML File:**
   - Replace hard-coded values with variable placeholders. For instance:

   ```yaml
   resources:
     cpu: 200
     memory: 500
     replicas: 1
   ```

   Becomes:

   ```yaml
   resources:
     cpu: {{CPU}}
     memory: {{MEMORY}}
     replicas: {{REPLICAS}}
   ```

   Similarly, for disabling deployments:

   ```yaml
   deployments:
     - name: CPU Threshold
       disabled: true
   ```

   Becomes:

   ```yaml
   deployments:
     - name: CPU Threshold
       disabled: {{DISABLED}}
   ```

   !!! note
       Curly braces are required to denote YAML variables.

   This approach is particularly useful when deployments have different scalability needs based on the environment. For example:
   - A production deployment might require higher CPU, memory, and more replicas to handle larger workloads.
   - In contrast, a development environment can operate with lower values for cost efficiency.

   YAML variables allow you to define these resource requirements for each environment dynamically, with default values ensuring consistency where specific configurations are not provided.

   The `disabled` property can also be useful for testing scenarios where you may have deployments producing mocked or dummy data instead of real production data. For example, in a staging environment, you could set `DISABLED` to `true` to disable a production-like deployment that simulates real-world conditions with test data. This helps to validate the system without impacting live environments.

3. **Sync the Environment:**
   - After making changes in the development environment, merge these changes into the production environment and sync it. This ensures that the production YAML file reflects the updated variable configurations.
   - **Note:** When variables are updated or changed, the corresponding environment may enter an "out-of-sync" state. You will need to manually sync the environment to apply these changes. This ensures that all updated variable values are correctly reflected in the deployment pipeline.

### Validate Changes

Once synced, verify the deployment configurations:
- Check that the appropriate values are applied based on the environment (e.g., `CPU: 800`, `MEMORY: 1000`, `REPLICAS: 3`, and `DISABLED: false` in production, `CPU: 200`, `MEMORY: 500`, `REPLICAS: 1`, and `DISABLED: true` in development).
- Ensure the pipeline reflects the desired resource allocations.

By leveraging YAML variables, you streamline the process of managing environment-specific configurations, reducing manual edits and ensuring consistency across deployments.

# Deploy to Quix Cloud

You can now level up by deploying your pipeline to Quix Cloud.

??? "Why use Quix Cloud?"

    This provides a bullet point list of why you should use Quix Cloud:

    - Quix Cloud - Deploy, Collaborate and Observe your pipelines in the Cloud
    - Pipelines - Observe and manage the status of your pipeline
        - Pipeline view
        - Data metrics in real-time between your deployments
        - Add/Edit/Delete deployments to your pipeline
        - Start/stop deployments
    - CI/CD - Manage multiple environments in the same project using Git branches
        - Git integrations to any Git provider
        - Multiple environments tied to Git branches
        - Pipelines as code using YAML files
        - YAML variables per environment
        - Secrets management
        - CLI commands to synchronize your changes using GitHub actions
    - Users - Collaborate on multiple Projects in your organization
        - Invite users into your organization
        - Assign visibility and permissions to your Projects and Environments
    - Develop - Code editors with a hands off Build and Deploy system
        - Online code editors to modify your applications and Yaml files
        - Scale your pipeline just editing replicas, cpu and memory
        - Synchronize the changes to your pipeline with a single operation
        - Code samples templates
        - Connectors to main relevant sources and sinks
        - Dev Containers support (coming soon)
    - Data Explorer - Query and explore the data and consumers of your topics
        - Waveform and Table data explorer
        - Messages visualizer
        - Consumers lag and metrics
    - Monitoring - Logs and Metrics in real-time to check the status of your pipeline running in the cloud
        - Realtime logs
        - Build logs
        - Topic data metrics
        - Deployment metrics CPU/Memory
    - Dedicated /BYOC - Dedicated and private infrastructure with some add-ons like Historical logs and metrics, SLA, and more
        - SLA
        - Dedicated infrastructure to collaborate and run your pipelines
        - Historical logs (Loki)
        - Historical metrics (Prometheus)
        - Grafana dashboards
        - Private code samples library - ready-to-use application deployable samples specific to your organization

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
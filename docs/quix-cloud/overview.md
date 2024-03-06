# Quix Cloud

Quix Cloud provides everything a developer needs to build industrial-strength stream processing applications. 

The components that make up the Quix Cloud enable developers to:

* Use a full web-based IDE with version control and logging, to build, deploy, and monitor their Python stream processing applications. 
* Have abstracted access to underlying broker infrastructure, including fully-managed Kafka topics.
* Single-click deployment to the Quix serverless compute environment for hosting your web-based real-time streaming applications.
* Connect existing web applications and IoT clients.

In addition to providing a complete solution, Quix also enables you to leverage third-party providers if your use case requires it. For example, while Quix can host all your Git repositories, you can also configure your environments to use third-party providers for this purpose, such as GitHub, Bitbucket, and Azure DevOps. 

Similarly, Quix provides Quix-hosted Kafka, but you can also use third-party solutions such as Confluent Cloud, Redpanda, Aiven, or self-hosted Kafka options.

## Developing your stream processing application

The basic process for developing your stream processing pipeline is as follows:

1. Create a **project** with at least one **environment**.
2. Develop your application using the online IDE and [Quix Streams](https://quix.io/docs/quix-streams/introduction.html). You can also develop locally if you prefer.
3. Deploy your **application**.
4. Manage your **pipeline**.

A simplified guide to Quix terminology:

| Term | Description|
|----|----|
| Project | This corresponds to a Git repository that contains all the code and configuration for your solution |
| Environment | This corresponds to a branch within the project, along with your selected Kafka hosting option |
| Quix Streams | The client library you can use to implement your application |
| Application | An application is deployed as a service in your processing pipeline |
| Pipeline | A pipeline consists of a sequence of stream processing services |

Use the following tiles to easily jump to the relevant section of this documentation.

<div class="grid cards" markdown>

- __1. Create your project__

    ---

    Create a project (Git repository) with at least one environment (branch). You can optionally copy or fork a template project to get started more quickly with a specific use case.

    [Create a project :octicons-arrow-right-24:](../create/overview.md)

- __2. Develop your application__

    ---

    Use Quix Streams and Python to develop your application (service).

    [Develop your application :octicons-arrow-right-24:](../develop/overview.md)

- __3. Deploy your application__

    ---
    
    Deploy your application as a service in your stream processing pipeline.

    [Deploy your application :octicons-arrow-right-24:](../deploy/overview.md)

- __4. Manage your pipeline__

    ---
    
    Once all the services in a pipeline are deployed, your stream proecessing solution is fully operational

    [Manage your pipeline :octicons-arrow-right-24:](../manage/overview.md)

</div>





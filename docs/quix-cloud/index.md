---
title: Quix Cloud
description: Quix Cloud provides everything a developer needs to build industrial-strength stream processing applications.
icon: material/cloud-outline
---

**Quix Cloud** is a comprehensive cloud-based platform designed for deploying, collaborating, and observing real-time data pipelines, providing everything a developer needs to build industrial-strength stream processing applications.

The components that make up the Quix Cloud enable developers to:

1. **Streamline Development and Deployment**:
    - Simplify the development and deployment of data pipelines with integrated online code editors and CI/CD tools.
    - Use YAML synchronization features to define pipelines and environment variables as code (IaC).

2. **Enhance Collaboration**:
    - Efficiently collaborate with multiple users through organization and permission management.
    - Increase project visibility and assign permissions to various projects and environments.

3. **Monitor and Observe in Real-Time**:
    - Gain deep insights into pipeline performance with real-time logs, metrics, and data explorers.
    - Monitor real-time data metrics, consumer lag, and other critical metrics.

4. **Scale and Manage Flexibly**:
    - Easily scale resources, adjust replicas, and manage CPU and memory for pipelines.
    - Handle multiple environments and link them to Git branches for streamlined environment management.

5. **Ensure Security and Compliance**:
    - Securely manage secrets and sensitive information.
    - Ensure compliance with dedicated infrastructure options and Service Level Agreements (SLAs).

6. **Access Development Tools**:
    - Utilize online code editors, code templates, and connectors for relevant data sources and sinks.
    - Leverage support for DevContainers for enhanced development workflows.

7. **Explore and Visualize Data**:
    - Use data explorers to query and explore data using waveform and table views.
    - Visualize messages in data topics and track metrics with real-time data monitoring.

8. **Implement Robust CI/CD Processes**:
    - Integrate with any Git provider (e.g., GitHub, Bitbucket, Azure DevOps) for seamless CI/CD processes.
    - Synchronize changes using GitHub actions and CLI commands.

9. **Leverage Quix-Hosted and Third-Party Kafka Options**:
    - Use Quix-hosted Kafka for seamless integration.
    - Alternatively, leverage third-party solutions such as Confluent Cloud, Redpanda, Aiven, or self-hosted Kafka options.

10. **Leverage Dedicated/BYOC Options**:
    - Run pipelines on dedicated, private infrastructure with historical logs and metrics.
    - Visualize metrics using Grafana dashboards and access private code samples specific to your organization.


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
| Application | An application is deployed as a service in your processing pipeline |
| Pipeline | A pipeline consists of a sequence of stream processing services |
| Quix Streams | The client library you can use to implement your application |

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





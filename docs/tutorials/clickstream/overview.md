# Clickstream analysis

In this tutorial you learn about a project template that analyzes a clickstream in real time, and generates events based on behavior. You use Python, rather than kSQL to perform aggregations and implement event logic based on user behavior.

This tutorial uses the [Quix Clickstream analysis template project](https://github.com/quixio/template-clickstream){target=_blank}.

![Clickstream analysis pipeline](./images/clickstream-pipeline.png)

You'll fork the complete project from GitHub, and then create a Quix project from the forked repo, so you have a copy of the full application code running in your Quix account. You then examine the data flow through the project's pipeline, using tools provided by Quix.

<div>
<a class="md-button md-button--primary" href="https://portal.platform.quix.io/pipeline?workspace=demo-clickstreamanalysis-prod&token=pat-b88b3caf912641a1b0fa8b47b262868b" target="_blank" style="margin-right:.5rem;">See the project running in Quix</a>

<a class="md-button md-button" href="https://demo-webshop-frontend-demo-clickstreamanalysis-prod.deployments.quix.ai/" target="_blank" style="margin-right:.5rem;">See the deployed project</a>

<br/>
</div>

## Technologies used

Some of the technologies used by this template project are listed here.

**Infrastructure:** 

* [Quix](https://quix.io/){target=_blank}
* [Docker](https://www.docker.com/){target=_blank}
* [Kubernetes](https://kubernetes.io/){target=_blank}

**Backend:** 

* [Redpanda Cloud](https://redpanda.com/redpanda-cloud){target=_blank}
* [Quix Streams](https://github.com/quixio/quix-streams){target=_blank}
* [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/){target=_blank}
* [RocksDB](https://rocksdb.org/){target=_blank}

**Frontend:** 

* [Streamlit](https://streamlit.io/){target=_blank}

## GitHub repository

The complete code for this project can be found in the [Quix GitHub repository](https://github.com/quixio/template-clickstream){target="_blank"}.

## Getting help

If you need any assistance while following the tutorial, we're here to help in the [Quix Community](https://quix.io/slack-invite){target="_blank"}.

## Prerequisites

To get started make sure you have a [free Quix account](https://portal.platform.quix.ai/self-sign-up).

## Redis Cloud

If you want to run the project in your own Quix account, so you can customize it, then you'll need a free [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/){target=_blank} account. You'll need the following credentials:

* Hostname (can be found in the `General` section for the database)
* Port (can be found in the `General` section for the database)
* Username (can be found in the `Security` section for the database)
* Password (can be found in the `Security` section for the database)

### Git provider

You also need to have a Git account. This could be GitHub, Bitbucket, GitLab, or any other Git provider you are familar with, and that supports SSH keys. The simplest option is to create a free [GitHub account](){target=_blank}.

!!! tip

    While this tutorial uses an external Git account, Quix can also provide a Quix-hosted Git solution using Gitea for your own projects. You can watch a video on [how to create a project using Quix-hosted Git](https://www.loom.com/share/b4488be244834333aec56e1a35faf4db?sid=a9aa124a-a2b0-45f1-a756-11b4395d0efc){target=_blank}.

## The pipeline

There are several *main* stages in the [pipeline](https://portal.platform.quix.io/pipeline?workspace=demo-clickstreamanalysis-prod&token=pat-b88b3caf912641a1b0fa8b47b262868b){target=_blank}:

1. *Clickstream producer* - loads clickstream data from a CSV file. This represents user interactions with a shopping website over a period of 15 days. This runs as a service and the CSV file is automatically read repeatedly.
2. *Data aggregation* - this service reads enriched data, performs various aggregations, and writes the results to Redis Cloud. These aggregations are then consumed by a Streamlit dashboard for visualization and analysis.
3. *Data enrichment* - this service enriches the click data with additional data read from Redis Cloud. This data includes the product category, and the visitor's gender, birthday and age.
4. *Data ingestion* - loads details of products in the web store and users from JSON files, and writes to Redis Cloud.
5. *Event detection* - a simple state machine that triggers a product offer event when conditions have been met. The offer is tailored to the demographic of the user.
6. *Webshop frontend* - this implements the online store.
7. *Real-time dashboard* - A Streamlit dashboard service displaying real-time data about the clickstream. It reads its data from Redis Cloud.

More details are provided on all these services later in the tutorial.

## Topics

The following Kafka topics are present in the project:

| Topic | Description | Producer service | Consumer service(s)
|---|---|---|---|
| `click-data` | The raw clickstream data loaded fro a CSV file | Clickstream generator | Data enrichment, Personalization demo |
| `enriched-click-data` | Adds product catgory and user data to clickstream data | Data enrichment | Data aggregation, Behavior detection |
| `special-offers` | Offers generated by Behavior detection - these are customized to the user demographic | Behavior detection | Personalization demo |

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. [Get the project](get-project.md) - you get the project up and running in your Quix account. 
2. [Clickstream producer](clickstream-producer.md) - take a look at the clickstream producer service.
3. [Data ingestion](./data-ingestion.md) - data ingestion job. Loads products and users from JSON files into Redis Cloud.
4. [Data enrichment](./data-enrichment.md) - this service enriches the clickstream data with product category, and additional user information.
5. [Data aggregation](./data-aggregation.md) - performs various aggregations on the data and adds them to Redis Cloud. RocksDB is used to hold state.
6. [Event detection](./event-detection.md) - implements a simple state machine that detects when conditions for an offer have been met.
7. [Webshop frontend](./webshop-frontend.md) - the UI for the online shop.
8. [Real-time dashboard](./realtime-dashboard.md) - a very useful real-time dashboard implementation using Streamlit.
9. [Lab: change offer](./change-offer.md) - in this part you customize the event detection service.
10. [Summary](summary.md). In this concluding part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about Quix.

## 🏃‍♀️ Next step

[Part 1 - Get the project :material-arrow-right-circle:{ align=right }](get-project.md)

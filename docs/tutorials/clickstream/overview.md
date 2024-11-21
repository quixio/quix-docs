# Clickstream analysis

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

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

You'll need a Quix Cloud account.

??? info "Start for free"
    [Book a session](https://quix.io/book-a-demo) with us to start for free.
    
    We will create a time-limited free account for you, and our experts will help you get started with your specific use case. 

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

??? "Transcript"

    0:01 Hi there, welcome to this video on creating a quick project. I should point out before I get into this video that I'm using the beta development environment at Quix and so what you see may be slightly different when you're testing Quicks.

    0:21 Okay, so having said that I'll get straight into creating a new project. You can see this button over here. I'm going to click that to create a new project.

    0:33 The new workflow in Quix starts with creating a project. Everything is done inside a project. Generally speaking, I'm simplifying it quite a lot.

    0:44 A project corresponds to a Git repository. So everything that you create, including your pipeline configuration and so on, will be stored in a Git repository.

    0:59 So I'll give my project a name and I'll call it video project. And the first thing I need to do is specify where this Git repository is going to be.

    1:12 Now, the simplest option is to get quick to do all the work for you and just create the Git repository.

    1:21 And the second thing I need to do is a product called gitty to host the Git repository. So we can do that for you.

    1:27 It all happens in the background. And as you'll see in later videos, you have complete control about what happens in that repository.

    1:37 You can review pull requests and do, merges and all of those normal things that you would do in a Git workflow.

    1:47 The other option is to use an external provider. So for example, you could use GitLab, GitHub, Bitbucket and so on.

    1:57 You can use any provider that supports the use of an SS. H key. For the purposes of this video, I'm going to keep it simple for now and just use the Quix manage Git.

    2:11 So I'm now ready to create the project. Now every project will have at least one environment and usually several environments.

    2:28 So what is an environment? An environment roughly corresponds to a branch in your Git repository, but there's a specific for an environment.

    2:41 As well as you'll see as we go through this dialogue. But the first thing we need to do is give our environment a name.

    2:52 So I'm going to name it. Based on the typical development workflow, so usually we'd have production. Branch or environment and you might have staging and development.

    3:09 So I'm going to create the production environment and as I was saying earlier, that's going to roughly correspond to a branch.

    3:17 So in this next section, we're going to specify the, ,branch that this environment corresponds to and I want production to correspond to the main branch.

    3:30 And so there's nothing really I need to do here. I could create a new branch if I wanted to, ,but I want to use the default branch which is main.

    3:41 The other, thing that I can do here is protect this branch and what that means is that prevents developers from merging or committing content, making changes directly to the main branch.

    3:58 In order to change the main branch you'll have to raise, a pull request, a git pull request and that would have to be reviewed and approved and then merged in the usual way.

    4:13 So we definitely want that because for production we don't want changes being made directly. So I'm protecting that and you'll, We'll see later how we go about taking changes that we've made and say the develop branch or the dev branch and merge those into the main branch.

    4:32 I'll cover that in another video. So for now let's just click continue. Now for each environment that you create you can specify how you want to host Kafka.

    4:45 Now as you probably know Quix uses Kafka as its broker. And you have several options here. You if you want the simplest option and most convenient option is to just let Quix do all the hard work for you.

    5:01 We will create them. Kafka broker and you don't need to do any configuration. We just do it all for you.

    5:08 We make sure that scales nicely as well. We use Kubernetes and you know as I say it's the least. It's it's the quickest option especially.

    5:22 If you're testing things out, but there are other options as you can see here. You can use your own self hosted Kafka or you can connect to a Confluent Cloud and we'll cover those options in later videos.

    5:39 So for now, I'm just going to go with the simplest option and click. Continue. The other thing that you'll need to do here is specify the storage option for the environment.

    5:51 So the key thing to point out at this point is we were talking about environments as corresponding to a branch in get.

    6:02 That is true, but it's also these other things like the Kafka options that you select and also the storage options.

    6:11 Now the storage option that you're selecting here is for any data that you might possess. So in Quix it's possible to persist the data that's published to topics.

    6:27 You can store that using our something called the data catalog and if you store, if you persist your topics and store the messages that are in the topics.

    6:43 In our storage facilities, then there's a small charge associated with that. However, you don't have to persist topics. You can use external database solutions for storage of your data.

    7:01 So you can use. Some of our standard connectors or even write your own connector to connect to more or less any database technology that you want.

    7:11 The other thing that's stored here is metadata associated with messages. So for now, I'm just going to choose the standard option and create.

    7:23 The environment. Okay, that's it. We'll wait for the project and the environment to be created. And then we'll have a look at what's in there in subsequent videos.

    7:42 Okay, thanks for watching. And see you in the next video.

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

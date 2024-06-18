---
title: "How to build a powerful project free with Quix"
date: 2023-07-19
authors: [mike-rosam]
slug: build-a-powerful-project-free-with-quix
description: >
  Build fast, powerful and free with Quix. We built a Twitter sentiment analysis tool that can process 4 million tweets for month free. Plus, detailed and transparent pricing for when you’re ready to go bigger.
categories:
  - use-cases
---

# How to build a powerful project free with Quix

Build fast, powerful and free with Quix. We built a Twitter sentiment analysis tool that can process 4 million tweets for month free. Plus, detailed and transparent pricing for when you’re ready to go bigger.

<!-- more -->

**Alert: This post includes details about Quix that are no longer accurate. We
have a similar demo with updated
information**[**here**](https://www.youtube.com/watch?v=aybpec6I1ZE&t=13s)**.**

## We used Quix’s free plan to deliver a POC that processes millions of tweets

Twitter remains one of the best ways to take the world’s pulse on topics from
Olympic sports to political activism. But analyzing millions of tweets
consumes a lot of technical resources.

We took on the challenge to build a Twitter sentiment analysis tool to
demonstrate just how much value you can get out of Quix’s platform with its
free offering to developers. And in this blog, we broke down the costs in
nitty-gritty detail so you can see what the platform costs at scale.  

> _“Our rapid development environment enables developers and data scientists
> to jump straight into coding without spending more than a few seconds
> configuring infrastructure.”_

Quix is a complete streaming data platform that helps build real-time data-
driven products faster and more efficiently than self-building infrastructure.
Our rapid development environment enables developers and data scientists to
jump straight into coding without configuring infrastructure for a few
seconds. Quix includes:

  * a serverless and managed Kafka for building scalable and reusable pipelines
  * a serverless and managed compute environment for executing code
  * a managed metadata catalog for recording data streams in your business context
  * a simple, efficient client library supporting native Python and DataFrames
  * extensive APIs to connect to your data sources and sinks
  * software to support the application development lifecycle

As a developer-first platform, we offer a free account so you can kick the
tires without having to input credit card details. The free account includes
200 credits (worth $20) that renew every month. This allows you to build a
solution and keep it running.

Building a solution that consumes less than $240 per year in technical
resources doesn’t sound like much, but Quix is surprisingly efficient, with
tight integration of best-in-class infrastructure. We’re confident you’ll be
able to build and run something very cool. This example streams and processes
4 million tweets every month for less than 200 credits.  

## How we built it: Streaming data analytics

We created an automated system that notifies you when the sentiment of a tweet
hashtag changes. The solution includes:

  * a service that listens for Dogecoin tweets
  * an ML model that processes each tweet to create a sentiment score
  * a real-time notification service that sends messages to Slack when sentiment changes
  * a web app that prints the rolling average sentiment over the last 24 hours

We chose Dogecoin because it currently has a high volume of tweets. However,
you could monitor any hashtag you are interested in and build an app that acts
on information in real time.

The project builds a pipeline of raw and processed data. All the data (both
raw and processed) are persisted in our data catalog, so you can use them in
developing iterations of your ML models.  

> _“Our goal was to demonstrate how much data you can stream, process and
> store on Quix at low cost.”_

It’s a simple implementation — we’re sure you can do better — but our goal was
to demonstrate how much data you can stream, process and store on Quix at low
cost due to our tightly integrated infrastructure, rather than demonstrating
the quality of the services, ML model, or app.  

## Real-time streaming data architecture

The architecture (figure 1) consists of a stream processing pipeline built
using two topics and three deployments and a web frontend built using data
persisted in the data catalog.  

![Real-time streaming data architecture.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be787b7b1cd77bf88480c8_diagram-
data-streaming.webp)

Figure 1. The solution contains two topics with persistence enabled and four
deployments

## Streaming data cost management

Now that you’ve got a sense of the solution let’s dive into each element’s
configurations and costs. Quix offers a fully transparent, controllable and
flexible cost model that ensures you only pay for what you use and helps you
use resources as efficiently as possible.

Perhaps the most critical cost comparison is the Quix platform versus a DIY
solution or a collection of services (cloud compute, managed Kafka, storage,
etc.). The expensive development time needed to set up infrastructure or
configure multiple services to work together quickly runs up a project’s cost.

Our example project would cost 259.54 credits per month to run in production.
In figure 2, we’ve broken down each significant component into costs in
credits and dollars per million messages.  

![Solution breakdown by cost category.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be78cf6dfcbe1963baf13f_Solution-
breakdown-by-cost.webp)

Figure 2. Solution breakdown by cost category

As you can see, it costs 2.78 credits (just under 28 cents) to stream 1
million messages, 61.65 credits ($6.17) to process one million messages across
four deployments, and 0.42 credits (4 cents) to store 1 million messages.

Storage is particularly cheap here because a fixed cost of 71 credits ($7.10)
per month for a workspace is required, including an 8GB HDD, so you’re only
paying for the read, write and query costs. Beyond the workspace cost, you
have 129 credits remaining to stream and process data.

Quix workspaces group all the components of one project (topics, projects,
deployments and data) into one environment that is secured with a unique key.
The workspace includes essential resources for operating your data
infrastructure.

> _“Everything on Quix is usage based, and Quix lets you monitor all costs in
> real time so you can make the most of your resources.”_

Like everything on Quix, workspaces are usage based, so if you only create a
workspace for a day, you’ll only pay for one day (about 24 cents). Quix lets
you monitor all costs in real time to make the most of your resources and
avoid costly surprises.

Now, let’s take a closer look at how the platform components work together.

## Organizing and streaming data topics

At the heart of the solution is the Quix managed Kafka message broker, which
is serverless, so you can create topics in a few clicks without provisioning
any clusters. Topics let you stream data and build data pipelines.

Quix costs 5.9 credits per month for each topic and 2.6 credits to stream 1GB
of data in that topic (together, that’s 85 cents). Charges are fractional down
to the millisecond and byte of data, so if you only create a topic for a
minute, you’ll only pay a fraction.

We created two topics (Figure 3) for this solution:

  1. An input topic (sentimentanalysis-twitter-stream) for streaming raw data from Twitter
  2. An output topic (sentimentanalysis-sentimentstats) for streaming the results of the SentimentAnalysis ML model

Both topics are persisted, meaning every message streamed on each topic is
written to our data catalog with its metadata. You can change this storage
option with a toggle switch to further control data storage costs, which we’ll
cover later.  

![Create topic screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be79087010b67112110f91_screenshot-
of-topics.webp)

Figure 3. Topics deployed and persisted

## Efficiently streaming to conserve data use

This example streams 2.75 million tweets into the input topic. Every tweet is
processed by the ML model in a pub/sub pattern by reading raw data from the
input topic, processing it, and writing results to the output topic. This
means the output topic is also streaming 2.75 million tweets for a total of
5.5 million tweets streamed across the solution.

Each tweet is streamed using one ParameterData message in this SDK. This is
very efficient, so 5.5 million tweets require only 1.27GB of data. The charge
for two topics and 5.5 million messages would be roughly 15.36 credits, or
$1.54:  

![Table of monthly charges for streaming 5.5 million messages using
ParameterData format.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be7952ba96eb88c8fdeded_monthly-
charge-streaming.webp)

Figure 4. Monthly charges for streaming 5.5 million messages using
ParameterData format

## Data processing on elastic resources

The solution has four deployments:

  * a Twitter connector (TwitterData)
  * an ML model (SentimentAnalysis)
  * a notification service (SlackAlerting); and
  * a web UI (dashboard)

Quix only charges for the exact CPU and memory resources consumed in your
application. Figure 5 shows all deployments in action. As you can see, the CPU
and memory are elastic resources, which are billed per millicore/millisecond
and Mb/millisecond, respectively.  

![Create deployment table screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be79ea302ddd7fd82abc96_deployments-
elastic-resources.webp)

Figure 5. Deployments are elastic resources charged on a usage-based model

Let’s take a closer look at each deployment:  

### Twitter connector

This service connects to the Twitter API, gets each tweet with #doge, converts
it to the Quix SDK ParameterData format, and streams it to the input topic.
Each record contains the tweet text, tweet ID and a tag value (the Twitter
search term #doge).  

### Sentiment analysis ML model

The model is pre-trained on historical data. It reads data from the input
topic, does its magic, and writes a sentiment score for each tweet to the
output topic in real time.  

### Slack notification service

This service processes the results of the ML model to calculate when the score
varies by a configured percentage. It sends a message to your Slack channel
when that threshold is met.  

### Web UI

This is a Quix deployment with a public DNS. It uses the Catalogue API to plot
a rolling average sentiment over the last 24 hours on page load. You can also
build real-time web apps using the Streaming Reader API, but we chose to
demonstrate using the Data Catalogue.  

## Processing costs for compute and storage

As mentioned, the data processing charges are entirely elastic. Figure 5 shows
a snapshot in time, and as the load goes up or down, so will your costs — you
only pay when you are getting value.

In the example, 2.75 million tweets are processed by each deployment. The
project would consume 74.71 core hours of CPU and 643.59 GB hours of memory
per month. In that case, the charge for the four deployments would be 170.39
credits ($17.04), with the CPU/memory split highlighted in figure 6.  

![Monthly compute charges split by CPU and memory.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be7a38fa8827b980a37999_monthly-
computer-charges.webp)

Figure 6. Monthly compute charges split by CPU and memory

## Persisting and storing data from a stream

Quix provides a data catalog to store your data streams for later use in the
model development lifecycle. Turn on persistence to permanently store data
streamed in each topic (see the right-hand column’s toggle switch in figure
3).

With persistence, Quix writes each message into the optimal storage technology
for that data type and wraps it in a stream so you can still make sense of the
data. Persistence is enabled for both topics in this example, so the catalog
has two streams (figure 7), one for each topic.  

![Two streams of persisted data in the catalog.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be7a70a2ad02d6848e25fc_two-streams-
of-data.webp)

Figure 7. Two streams of persisted data in the catalog

## Optimizing data storage to improve efficiency

Data storage is very efficient in Quix because we’ve optimized each data type
and tightly integrated Kafka and the data catalog using the SDK.

We store 2.03GB of data per month (figure 8). It costs 2.18 credits (22 cents)
to write 0.52GB of data to the catalog, zero credits to query data in the
catalog (because the web UI is making such a small query), and 0.13 credits (1
cent) to read data from the catalog (again, a tiny amount, because the web UI
is using a minimal amount of data).  

![Breakdown of storage charges.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be7add543c3d8cff9386ec_breakdown-
of-storage-charges.webp)

Figure 8. Breakdown of storage charges

In this example, catalog usage costs nothing because it consumes only 2.03GB
of disk space, while the free tier workspace includes 8GB of HDD capacity. It
costs 7.45 credits per month for each additional GB of data if you exceed the
8GB allowance.

Quix helps you control storage costs by letting you:

  * choose not to persist data
  * choose which data to persist on a topic-by-topic basis
  * choose which data to persist in your model with downsampling; and
  * delete historical streams that are no longer required.

## From idea to POC: What will you build with Quix?

You can build any data application or data processing pipeline in Quix.
Combine topics and deployments in a solution architecture that solves your
problems — bring your code and domain expertise.  

> _“Combine topics and deployments in a solution architecture that solves your
> problems — just bring your code and domain expertise.”_

Quix’s developer-first platform is designed for speed and efficiency, offering
managed infrastructure that lets you focus immediately on building your
project and powerful, tightly integrated technology to make the most of your
resources.

We should also add that when you build on Quix, your code is always yours,
your data is always yours, and we protect you with encryption, authorization,
and authentication. It’s a production-ready infrastructure designed to bring
your projects to life faster.

Our example project took just hours to build because Quix already set up the
underlying infrastructure. It delivered an effective and efficient project to
stream, process, and store millions of tweets — free.

Ready to experiment with your own project? [Sign up
now](https://quix.io/signup) and get $20 per month in free Quix credits. We’d
also love to hear more about what you build on our community [Slack
channel](http://quix.io/slack-invite).






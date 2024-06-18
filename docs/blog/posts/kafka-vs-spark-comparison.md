---
title: "Kafka vs Spark - a comparison of stream processing tools"
date: 2024-02-19
authors: [tun-shwe]
slug: kafka-vs-spark-comparison
description: >
  This comparison specifically focuses on Kafka and Spark's streaming extensions — Kafka Streams and Spark Structured Streaming. Kafka Streams excels in per-record processing with a focus on low latency, while Spark Structured Streaming stands out with its built-in support for complex data processing tasks, including advanced analytics, machine learning and graph processing.
categories:
  - ecosystem
---

# Kafka vs Spark - a comparison of stream processing tools

This comparison specifically focuses on Kafka and Spark's streaming extensions — Kafka Streams and Spark Structured Streaming. Kafka Streams excels in per-record processing with a focus on low latency, while Spark Structured Streaming stands out with its built-in support for complex data processing tasks, including advanced analytics, machine learning and graph processing.

<!-- more -->

## Introduction

Kafka vs Spark: it’s one of the big data processing questions. And that’s
because the applications we build today rely on a constant flow of data from
diverse data sources. How to move and process that data is now a key
architectural decision.

Of course, that also means that there are many different ways to do the job.
And, although they were initially created to solve different problems, both
Kafka and Spark offer an answer to processing data in near real-time. For
Kafka, that’s Kafka Streams and for Spark it’s Spark Structured Streaming.

In this article, we’re going to look at how Kafka Streams and Spark Structured
Streaming compare, with particular focus on their relative advantages and
disadvantages and the types of use case they suit best.

## What is Apache Kafka?

Originally developed at LinkedIn and later donated to the Apache Software
Foundation, Apache Kafka is an open source, distributed streaming platform
built around a publish-subscribe model. At its heart is an append-only log,
divided into topics. Data publishers, or producers in Kafka parlance, send
events into Kafka topics and subscribers, or consumers, read events from those
topics.

One of the key benefits of Kafka is that it is both horizontally scalable and
fault tolerant. Typically, Kafka runs as a cluster of at least three nodes.
That append-only log is partitioned and replicated for distribution across the
Kafka cluster. If failure takes out a node, or scaling adds more, then Kafka
automatically redistributes the partitions across the available nodes.
Similarly, consumers can pick any point in time to start reading from a topic.
If a consumer goes offline, it can pick back up from where it left off.

### What is Kafka Streams?

Kafka Streams is an open source Java and Scala client library for building
applications and microservices where the input and output data are stored in
Kafka topics. It allows you to transform and enrich data in-flight using a
[high level, declarative, domain specific language
(DSL)](https://kafka.apache.org/20/documentation/streams/developer-guide/dsl-
api.html) or, if you want more control, there’s also a [lower level
API](https://kafka.apache.org/21/documentation/streams/developer-
guide/processor-api.html), too.

So, let’s take a look at the key facts you need to know when considering Kafka
Streams:

  * **Your Kafka Streams code is just another part of your application:** The code you write with Kafka Streams runs on your infrastructure and not on your Kafka brokers. That means you can deploy it wherever you choose and it can be part of your usual build process.
  * **Per-record processing:** Kafka Streams processes each event as it is fetched, rather than batching records together. Combined with very low latencies, that allows you to build real-time applications.
  * **Types:** Unlike standard Kafka, where the records in streams are untyped, Kafka Streams asks you to define a schema up-front. That allows you to process richer data structures, as well as simplifying error handling and guaranteeing type safety.
  * **Stateless and stateful processing:** Kafka Streams supports both stateless operations, like filtering invalid sensor readings and stateful operations that use tables to maintain state. Examples include aggregations, such as calculating average temperature over an hour, or joins to combine sensor data with weather forecasts.
  * **Window operations:** Many of your operations are likely to focus on events that occurred within a particular time frame. For example, calculating daily fuel usage for a trucking fleet. [Windowing](https://quix.io/blog/windowing-stream-processing-guide) gives you different ways to timebox the events you process, such as by fixed periods (e.g. a 24 hour period), periods relative to particular events, or periods defined by inactivity on either side.
  * **Exactly-once processing:** Using Kafka transactions and Kafka Streams’ state management, Kafka Streams guarantees that each record is processed once and only once, even when faced with node crashes, message redeliveries, or consumer restarts.
  * **Automatic scaling and fault tolerance:** As your needs grow, you can add more instances of your Kafka Streams application code. Kafka Streams automatically partitions the data and workload across your application instances. Similarly, Kafka Streams ensures resilience by distributing data across the Kafka cluster and automatically rebalancing when failure occurs.

## What is Apache Spark?

[Apache Spark](https://spark.apache.org/) is a large-scale distributed data
processing engine that offers a set of tools to help you to write code that
transforms data, as well as a framework for distributing those workloads
across multiple machines in a cluster.

Unlike Kafka with its focus on moving data, Spark started out as a tool for
fast, iterative data preparation for machine learning, graph processing and
complex analytics over large datasets. As a result, its strength lies in
efficient in-memory computation, which is why it is particularly well-suited
to those tasks that require fast, iterative processing. However, Spark is not
strictly speaking a real-time tool. Instead, it processes data in batches,
working with a batch interval in either time or size, balancing responsiveness
with the resources available.

### What is Spark Structured Streaming?

Spark Structured Streaming is an API offered as part of Apache Spark that
overcomes the limitations of batch processing. It offers micro-batch
processing, where the time window between batches is tunable but can be as low
as a few milliseconds and also continuous near real-time data processing with
latencies as low as 1 millisecond.

But Spark Streaming isn’t only about reducing latency. It offers a high level
API on top of Spark SQL and DataFrames that enables you to query data in Spark
as though it were static data, regardless of whether you’re actually dealing
with micro-batches or continuous real-time data streams.

It’s worth taking a moment to look at DataFrames. You can think of them as
table-like data structures over which the Spark SQL and Spark Structured
Streaming queries run. They’re effectively snapshots of the unbounded data
stream, with a schema imposed to enable querying.

In micro-batch mode, a DataFrame encapsulates a set of records ingested during
a specified time window, which Spark then processes in sequence. In continuous
mode, the DataFrame represents the continuously evolving flow of data into the
system, allowing Spark to run queries without needing to use micro-batches.
Which you choose will depend on the trade-off you’re happy to make between
latency and resource usage.

To better understand if Spark Structured Streaming is the right choice for
you, here’s a rundown of its key characteristics:

  * **Available in multiple languages:** You can use Scala, Java, Python and R to write Spark Structured Streaming programs. 
  * **Processing runs within the Spark cluster:** Although you trigger queries from within your own code, which could be running in a notebook or on your application infrastructure, the actual processing runs on the server-side Spark cluster.
  * **Event-time processing:** You can choose to process events in order of their timestamp, rather than when they entered Spark. That allows you to get accurate results even where network latencies and other issues cause data to arrive out of order.
  * **Schemas:** Where type safety and other elements of data quality are essential, you can specify the streaming data’s schema up-front using native data structures in your chosen programming language. For quick experimentations or where you can’t easily anticipate the shape of the inbound data, Spark can also infer the schema from the first few records in a stream.
  * **Integrates with other parts of the**[**Spark ecosystem**](https://spark.apache.org/third-party-projects.html)**:** Part of the attraction of Spark is its rich ecosystem. You can use the DataFrames API and Spark SQL alongside Spark Structured Streaming, as well as MLlib for machine learning and graph computation with GraphX.
  * **Stateless and**[**stateful stream processing**](https://quix.io/blog/navigating-stateful-stream-processing)**:** Spark Structured Streaming supports both stateless transformations, such as filtering and stateful operations, such as aggregations. You can maintain state across different events in a stream, enabling you to implement complex event processing patterns like detecting sequences of events or tracking session activity.
  * **Window operations:** Like Kafka, you can focus operations on a particular time window.
  * **Exactly-once processing:** Each operation happens only once, avoiding duplicate data when recovering from failure scenarios.
  * **Automatic scaling and fault tolerance:** Built on Spark's distributed architecture, Spark Structured Streaming applications can automatically scale out or in to match workload demands. The framework is also designed to recover gracefully from node failures, ensuring continuous operation and data processing by redistributing workloads and recovering state from checkpoints.

## Should you use Kafka Streams or Spark Structured Streaming?

Kafka Streams and Spark Structured Streaming do similar jobs but they each
take a different approach. The choice you make depends, ultimately, on how
well either tool meets the needs of your project.

Whether you choose Kafka Streams or Spark Structured Streaming comes down to
the nuances of your case. So, what do you need to take into account when
evaluating the two?

  * **Programming languages:** You can write Kafka Streams applications in Java and Scala, whereas Spark Structured Streaming is available using Scala, Java, Python and R.
  * **When is data processed?** Both Spark Structured Streaming and Kafka Streams process data more or less as it arrives, but even Spark Structured Streaming’s continuous batch processing mode has somewhat higher latencies than Kafka Streams.
  * **Processing capabilities:** Spark has more sophisticated processing capabilities out of the box. With Kafka Kafka Streams you might be more reliant on your own application code to achieve similar processing or need to integrate with other tools, even including Spark.
  * **Workload complexity:** For simpler, more linear data processing, Kafka Streams works well. Spark Structured Streaming can handle more complex workflows and analytics, including joining data streams, iterative algorithms and machine learning.
  * **Integrations and ecosystem:** Both Kafka and Spark have rich ecosystems that enable you to ingest data from multiple sources and sink to many external processors and storage options. **‍**
  * **Application deployment and resource management:** Kafka Streams applications run on your infrastructure, rather than directly on the Kafka cluster. Although Kafka Streams manages the distribution of workload across your application instances, you’ll need to initiate and remove capacity as required. Spark Structured Streaming workloads similarly run on the Spark cluster itself. Both Spark and Kafka are known to be somewhat operationally complex, although there are managed services that take care of the DevOps side for you.

### Use cases for Kafka Streams and Spark Structured Streaming

## Kafka Streams vs Spark Structured Streaming in summary

Choosing between Kafka Streams and Spark Structured Streaming comes down to
balancing the sheer processing speed of Kafka against the richer computation
and data analysis possible with Spark.

Kafka Streams, with its per-record processing, is well suited to scenarios
that demand low latency and event-driven reactions. However, its reliance on
custom Java or Scala code for sophisticated processing might mean you have to
do more work when it comes to more complex workloads.

On the other hand, Spark Structured Streaming stands out for its ability to
handle complex data processing tasks, including advanced analytics, machine
learning and graph processing without needing third-party tools. It also
offers you greater flexibility in terms of the languages that you use, with
support for R and Python in addition to Java and Scala.

There are, of course, also other options for stream processing. Quix Streams
is an open source Python library for building applications with Streaming
DataFrames and Docker. Quix Cloud provides tooling to quickly build, deploy
and monitor streaming data pipelines without having to manage infrastructure.
If you’d like to try Quix, [you can get started in just a few
minutes](https://quix.io/#get-started).




## Guide to the Event-Driven, Event Streaming Stack
Practical insights into event-driven technologies for developers and software architects

[Get the guide](https://www.quix.io/event-driven-event-streaming-guide)



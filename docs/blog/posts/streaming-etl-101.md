---
title: "Streaming ETL 101"
date: 2024-02-05
authors: [tun-shwe]
slug: streaming-etl-101
description: >
  Read about the fundamentals of streaming ETL: what it is, how it works and how it compares to batch ETL. Discover streaming ETL technologies, architectures and use cases. 
categories:
  - industry-insights
---

# Streaming ETL 101

Read about the fundamentals of streaming ETL: what it is, how it works and how it compares to batch ETL. Discover streaming ETL technologies, architectures and use cases. 

<!-- more -->

## Introduction

ETL (Extract, Transform, Load) has been a foundational element in data
processing and analytics since the early days of computing. Historically, ETL
has been pivotal in business intelligence, with applications spanning sectors
such as finance, healthcare, retail, manufacturing and many others. ETL
enables businesses to consolidate data from disparate systems, cleanse and
organize it for analysis and gain insights for decision-making.

Traditional ETL processes are batch-oriented, handling data at scheduled
intervals. However, the modern data landscape is characterized by the
emergence of real-time, always-on data sources like IoT devices, social media
and mobile applications. This evolving data ecosystem has given rise to a new
breed of ETL: streaming ETL.

## What is streaming ETL?

Streaming ETL is a continuous data integration approach that involves
capturing and transforming (processing) [streaming data](/blog/data-streaming-
faq). Once transformed, data is immediately loaded into a downstream system
(typically a database, a data warehouse or a data lake) for analysis and long-
term storage. You may also hear streaming ETL being referred to as real-time
ETL or event-driven ETL.

The key benefits of streaming ETL include improved decision-making speed,
improved insights based on current data, enhanced operational efficiency and
the ability to continually collect, process, store and analyze large volumes
of data with minimal latency.

Up to a point, streaming ETL is similar to streaming applications. In both
cases, data is collected and transformed as soon as it becomes available,
often using the same tech stack. However, streaming ETL and streaming
applications serve different purposes. The goal of streaming ETL is to
integrate data to prepare it for analysis and it’s achieved through a series
of steps in a pipeline. Data integration and preparation are done in real
time, but analysis doesn’t necessarily have to happen right away. Meanwhile,
streaming applications use data immediately after it’s been transformed, in
real time (e.g., to trigger actions, alerts or updates in a UI).

## The streaming ETL process

Streaming ETL is a repeatable, automated and continuous process. It consists
of three interlinked steps:

  1. Extracting (ingesting) streaming data from sources as soon as it becomes available.
  2. Transforming data on the fly; this is often done using a stream processing platform/technology.
  3. Loading transformed data into one or more destination systems for long-term storage and analysis.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65c0d41bbb317aa26840f1db_Streaming%20ETL.png)

### Step 1: Extract data from sources

Various sources can generate streaming data. Examples include readings from
IoT devices, clickstreams from web and mobile apps, e-commerce transactions,
live video and audio streams and real-time GPS data from transportation
systems.

Extracting data from these sources can be a daunting task. That’s because it
involves continuously collecting data from a variety of high-volume, high-
velocity streams. To successfully deal with these streams, the underlying
infrastructure must be high-performance (low latency and high throughput),
highly scalable and fault-tolerant.

**Note:** Streaming data platforms like Apache Kafka are frequently used to
ingest data from streaming data sources.  

### Step 2: Transform data (stream processing)

As soon as streaming data is extracted from sources, it goes through a
transformation phase. This may entail activities like:

  * Joining data from different sources.
  * Removing or correcting inconsistencies, filling missing values and handling anomalies to validate data and ensure its quality.
  * Filtering, [windowing](https://quix.io/blog/windowing-stream-processing-guide), sorting and aggregating data.
  * Data enrichment and normalization.
  * Encoding or decoding data.
  * Adding metadata or associating key-value pairs to the data.
  * Upsampling/downsampling to improve data quality and accuracy for time series data and machine learning.
  * Deriving calculated values based on the raw data. 

Continuously processing streams of data is not without its challenges. Here
are just a few of them:

  * Efficiently allocating computing resources for optimal performance and cost-effectiveness.
  * Managing and maintaining state. 
  * Scaling the system to handle fluctuating data loads without performance degradation.
  * The need to introduce observability or improve monitoring and alerting.
  * Managing system failures without losing data or interrupting the continuous data flow.
  * Ensuring data is accurate and consistent, especially when integrating multiple streaming sources. 

**Note:**[Stream processing](/blog/what-is-stream-processing) technologies
such as Kafka Streams or Quix Streams (which work seamlessly in tandem with
streaming data platforms like Kafka) are commonly used to perform real-time
transformations on streaming data.

### Step 3: Load data to destinations

Once transformed, data is immediately loaded into a destination system —
usually a database, a data warehouse, or a data lake — for long-term storage,
analysis and onward processing.

As an aside, in addition to databases and warehouses (which are the
traditional ETL destinations), you could also send the transformed data to
other types of systems, some of which may need to consume it in real time. For
instance, machine learning models, real-time business dashboards showing
operational metrics, microservices, message queues, alerting and notification
services, data analytics services, or even web and mobile apps.

And that’s usually the case with any modern architecture that leverages a
streaming data pipeline: data is generally consumed by multiple different
systems. For example, a bank could collect, process and load transaction data
into a warehouse for storage (this is a classic example of streaming ETL). The
data in the warehouse can be later used for risk assessment, analyzing
customer behavior, understanding transaction patterns and for regulatory
reporting purposes. At the same time, transaction data could be served to an
ML model that’s capable of analyzing it in real time to predict fraudulent
transactions.

## Streaming ETL vs batch ETL

Batch ETL is the traditional way of performing ETL. With this approach,
batches of data are extracted from sources like files, databases, websites and
applications at regular, scheduled intervals (e.g., every minute/hour, or at
the end of each day). The data from each batch is then transformed — this step
can involve activities like cleansing, validating, encoding, deriving new
values and joining data from multiple sources. Finally, the processed data is
loaded into a repository such as a data warehouse, a big data platform or a
database, so it’s ready to be used for reporting, historical analysis and
decision-making.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65c0d4367b1de1b3b06bfd7b_Batch%20ETL.png)

Batch ETL pipelines are a good choice for use cases where you need to handle
large datasets to find historical insights/patterns and there’s no urgency to
process and analyze them in real time. For example, a retailer can use batch
ETL for daily sales reporting. Data on orders, returns and payments can be
collected every 24 hours and then processed to produce comprehensive sales
metrics for the previous day.

Similar to batch ETL, streaming ETL is also a three-step process, which
consists of extracting data, transforming it and serving it to target systems
for storage and analysis. However, unlike batch ETL, streaming ETL doesn’t
operate on a scheduled basis. Instead, the streaming ETL model is used to
continuously ingest, transform and load data streams in real time.

Due to its characteristics, streaming ETL unlocks use cases that you can’t
implement with batch ETL. For instance, the retailer I mentioned earlier could
use streaming ETL for real-time inventory management. How? By continuously
ingesting data from point-of-sale systems, online transactions and inventory
databases, instantaneously processing it, and then quickly loading it to a
target system for storage and analysis. This enables the retailer to gain
real-time, always up-to-date insight into stock levels across its products.

Here are some other key differences between batch ETL and streaming ETL to
have in mind:

  * Batch ETL is for handling large volumes of data at once. It's an efficient approach for processing vast datasets that have been accumulated over a period of time. Meanwhile, streaming ETL processes data in small sizes (record-by-record,  event-by-event or micro-batches) as it flows into the system. It's designed to handle continuous, high-volume, high-velocity data streams.
  * Batch ETL is generally simpler and less resource-intensive compared to streaming ETL. It's easier to implement and maintain for routine, scheduled data workflows. In comparison, streaming ETL architectures tend to be more complex. A robust and scalable infrastructure is needed to handle continuous data flow and real-time processing. 
  * Fault tolerance is easier to manage with batch ETL — you can reprocess data from the last batch in case of failure. In contrast, streaming ETL requires more sophisticated mechanisms for fault tolerance and recovery due to continuous processing.
  * Streaming ETL is the only viable option for real-time applications where low latency and data freshness are paramount. On the other hand, the batch ETL approach introduces latency by design and isn’t suitable for use cases where data needs to be processed and analyzed on the fly. 

## Streaming ETL use cases

Here are streaming ETL’s main applications:

  * Integrating and transforming data from various sources and then loading it into a destination system like a data warehouse to power real-time analytics and business intelligence.  
  * Keeping multiple databases or data stores in sync by continuously extracting changes from one database and updating another.
  * Powering [real-time machine learning](/blog/fundamentals-real-time-machine-learning) pipelines (i.e., streaming data is continuously extracted from a data source, transformed, stored and then “fed” to an ML algorithm for training or inference).
  * Real-time business dashboards rely on an underlying streaming ETL pipeline. 
  * Aggregating customer data from various touchpoints (E-Commerce website, customer support, social media) into a centralized repository for a unified customer view.

Streaming ETL is a prerequisite/foundation for numerous use cases, spanning
various industries. Here are some common examples:

  * In finance and banking, streaming ETL underpins real-time fraud detection. Transaction data is enriched with other data such as profile information and historical transactions before being applied to a fraud detection algorithm that returns a probability/score.
  * Factories and manufacturers use streaming ETL to optimize efficiency, update factory schedules based on machine performance, make better [predictions for failure and maintenance](https://quix.io/blog/build-deploy-predictive-maintenance-app) and detect issues in production lines. 
  * In cybersecurity, streaming ETL is used in SIEM (security information and event management) to continuously monitor network traffic and detect potential security threats or breaches.
  * In transportation and logistics, streaming ETL is leveraged to [monitor and determine congestion levels](https://app-demo-computervisiondemo-prod.deployments.quix.io/), optimize route planning, and analyze traffic patterns for operational decision-making. 
  * Online retailers rely on streaming ETL to [collect, process and analyze clickstream data](https://quix.io/blog/analyze-clickstream-data-real-time-trigger-events) from users. This enables retailers to offer personalized recommendations to shoppers, manage inventory in real time, predict shopping behavior and adjust prices dynamically. 
  * Businesses use streaming ETL to track brand mentions and [perform sentiment analysis on chat apps](https://quix.io/templates/chat-sentiment-analysis) and social media, so they can address customer concerns and emerging trends.

## Streaming ETL technologies

There are numerous tools available that can help you implement streaming ETL.
We’d need a whole book to cover all of them; for brevity, the table below only
lists some of the most popular, commonly used ones.

## Streaming ETL architecture

We will now discuss two of the most popular architectures used to implement
streaming ETL: Lambda and Kappa.  

Lambda is a hybrid architecture for processing large amounts of data. It
combines both batch processing and real-time data processing (stream
processing). The real-time layer (or speed layer) transforms data with minimal
latency, while the batch layer processes larger datasets at intervals,
ensuring comprehensive and accurate results. There’s also a serving layer
(often a database or data warehouse), which is responsible for merging and
storing the output from the real-time and batch layers to provide a
comprehensive and queryable view of the data (note that there’s also a
variation of the Lambda architecture where there are two separate serving
layers — one for real-time consumption, and the other one for batch
consumption).

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65c0c44ffcb92bb69bc479a8_Lambda-
Architecture-with-Unified-Serving-Layer.png)

_Lambda architecture._[_Source_](https://www.kai-
waehner.de/blog/2021/09/23/real-time-kappa-architecture-mainstream-replacing-
batch-lambda/) _._

Lambda architecture is scalable, flexible and fault-tolerant. And while these
advantages are not at all negligible, Lambda also has its limitations. These
stem from the fact that you have to manage two separate codebases, one for
each data processing layer (and keep them in sync too). This can significantly
increase the system's complexity, costs and operational overhead.

Meanwhile, Kappa is an alternative to Lambda architecture that allows you to
perform both real-time and batch data transformations with a single technology
stack. Kappa treats all data as a stream, eliminating the distinct batch layer
found in Lambda. Kappa architectures are usually built around event streaming
platforms like Apache Kafka.

In a Kappa architecture, data is continuously ingested from sources and stored
by the event streaming platform in topics. From there, it is processed by the
real-time layer (a stream processing component). The output can be stored in
topics (separate from the ones that hold raw data from sources) — this is
common in scenarios where applications and services need to consume the
transformed data immediately and perhaps further process or react to it in
real time. The output can also be sent to a database or a data storage
solution. This approach is more common for scenarios where data needs to be
persisted for longer periods, subjected to complex queries, or consumed by
batch applications. In practice, a combination of both approaches is often
used.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65c0c2f77c1be9993d4fbe1c_Kappa-
Architecture-with-one-Pipeline-for-Real-Time-and-Batch.png)

_Kappa architecture._[_Source_](https://www.kai-
waehner.de/blog/2021/09/23/real-time-kappa-architecture-mainstream-replacing-
batch-lambda/).

Similar to Lambda, Kappa architecture is scalable, fault-tolerant and capable
of handling massive volumes of data. However, in contrast to Lambda, Kappa is
simpler overall and leads to inherently lower latency (no batch processing
layer and only one codebase to manage instead of two). Due to its simplicity
compared to Lambda, Kappa is becoming more and more popular.

Let’s look at a real-world example to better understand the Kappa architecture
(and where streaming ETL fits in).

[CloudNC](https://www.cloudnc.com/manufacturing), a pioneer in the precision
manufacturing industry, uses a streaming Kappa architecture to enhance its
manufacturing operations.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65c24b93b98dac0518f83e3c_Cloud%20NC%20solution%20architecture%20\(revised\).jpg)

_CloudNC’s Kappa architecture. Powered by_[ _Quix_](https://quix.io/) _._

CloudNC collects high-frequency [time series](https://quix.io/blog/time-
series-analysis) data from the [CNC machines](https://cncmachines.com/what-is-
a-cnc-machine) in its factory. Data is collected and processed in real time,
with results immediately consumed by downstream systems and applications. For
example, a strong indicator of something going wrong in a CNC machine is
vibration. It can suggest the machine is about to break down, or perhaps a
defective piece of metal is being machined. By ingesting streams of vibration
data and using stream processing, real-time value is generated: CloudNC is
able to implement vibration detection and monitoring. This way, the CloudNC
team is instantly notified if something is amiss with any of the CNC machines,
and corrective actions can be quickly taken.

In addition to real-time use cases, CloudNC stores transformed (and raw) time
series data collected from machines in a database (this is the streaming ETL
component of the architecture). This way, data can also be used for batch
processing and analytics (e.g., reporting on production performance and
machine utilization) and to power web-based dashboards. To learn more about
CloudNC’s use case, [check out this blog post](https://quix.io/blog/case-
study-manufacturing-cloudnc).

## Simplify real-time streaming ETL pipelines with Quix

Streaming ETL (Extract, Transform, Load) is crucial in modern data management,
as it enables real-time processing and integration of large volumes of data,
ensuring that businesses can make timely, informed decisions based on the most
current information. I can’t think of an industry that couldn’t benefit from
streaming ETL pipelines.

While it brings significant advantages and unlocks real-time use cases that
simply wouldn’t be possible with traditional, batch ETL, streaming ETL is not
without its challenges. For instance, [streaming data is notoriously hard to
handle](https://quix.io/blog/why-is-streaming-data-so-hard-to-handle), while
[scaling stream processing infrastructure is an onerous
job](https://quix.io/blog/scaling-stream-processing).

But don’t be discouraged. Solutions like Quix simplify the process of
collecting, transforming and extracting value from streaming data in real
time. First, we have [Quix Streams](https://github.com/quixio/quix-streams),
an open source Python library for building containerized stream processing
applications with Apache Kafka. Wrapping Quix Streams is [Quix
Cloud](https://quix.io/), a serverless CaaS (Container-as-a-Service) platform
that provides fully managed containers, Kafka and observability tools,
enabling you to build, deploy and monitor streaming ETL pipelines and
streaming applications without the headache of managing the underlying
infrastructure.

To learn more about Quix and how it can help you with your streaming ETL use
cases, [see it in action](https://quix.io/templates) and [explore the official
documentation](https://quix.io/docs/get-started/welcome.html).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



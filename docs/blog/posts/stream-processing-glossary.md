---
title: "The stream processing glossary"
date: 2023-07-12
authors: [kiersten-thamm]
slug: stream-processing-glossary
description: >
  Connector? Confluent? Cluster? Keep this article nearby to define tricky and emerging terms in stream processing.
categories:
  - industry-insights
hide:
  - navigation  
---

# The stream processing glossary

Connector? Confluent? Cluster? Keep this article nearby to define tricky and emerging terms in stream processing.

<!-- more -->

A go-to list of definitions for stream processing

## Introduction

The world of [stream processing](https://www.quix.io/blog/what-is-stream-
processing) and analytics includes a mountain of concepts, tools and
technologies. Components and processes may be unfamiliar, and the abundance of
terms used with them adds to the chaos.

We’ve collected definitions to some of the most common concepts to clear up
the confusion. Make your life a little easier and keep this glossary handy;
you never know when you’ll need to look up the meaning of “real-time
processing” or “time series data.”  

### Apache Flink

Apache Flink is an open source, **real-time processing** library developed by
the Apache Software Foundation. It can process both unbounded and bounded
streams, which enables both **data streaming** and **batch processing**.

Flink is a good choice for Java-based applications of the following types:

  * **Event-driven:** fraud detection and social networking are both types of apps that can use an [event-driven model](/blog/what-why-how-of-event-driven-programming) for better performance
  * **Data analytics:** [Uber has used streaming analytics](https://eng.uber.com/athenax/) to monitor its app and react to changes in traffic and weather
  * **Data pipelines:** real-time search indexing is vital for a large [ecommerce site like Alibaba](https://www.ververica.com/blog/blink-flink-alibaba-search)

### Apache Spark

Apache Spark is an open source framework for large-scale data processing.
Spark Streaming batches data into small groups with tight time windows. This
micro-batching is a compromise between infrequent batch processing and genuine
real-time stream processing. It’s a good approach for a corporate dashboard
that refreshes every 15 minutes.  

Read our [Flink vs Spark](/blog/compare-client-libraries-spark-flink-quix) vs
Quix Streams comparison article.

### Batch processing

Batch processing involves working with a fixed set of data that is analyzed at
a certain point. It does not take any action on the data in real time. Batch
processing often occurs at repeated intervals with a fixed frequency, on a
regular schedule. But a batch process can usually be run on demand when
required.

Updating analytics for a web application is a typical use of batch processing.
Such a system might update user statistics once a day by reading through all
log files from the previous day. In this context, batch processing is more
suitable than **real-time processing** when:

  * Visitors are more interested in daily analytics than real-time data.
  * Analytics require a broader view of the data and consider it in the context of days or months of statistics.

### Broker

See [message broker](/blog/stream-processing-glossary).

### Client library

A client library, sometimes called a helper library, is a set of code that
application developers can add to their development projects. It typically
interfaces with an API but is written in a specific language. This allows
programmers to write code in their preferred language to access the API. It
also tends to simplify common operations.

A client library is often distributed as part of an SDK, which also includes
documentation and sample code. The [Quix SDK](https://quix.io/docs/client-
library-intro.html) provides client libraries for **Python** and C#.

### Cluster

In the Kafka context, a cluster refers to one or more servers running a Kafka
**Broker**. Running a cluster is optional, but it conveys benefits from higher
performance to data replication. A Kafka cluster is highly scalable and
**fault tolerant** because if one server fails, another in the cluster can
take its place.

### Compute cluster

A compute cluster is a set of computers operating to appear as one. In a
cluster, each computer is referred to as a node. By parallelizing processing,
clusters provide an excellent way of achieving fast performance for a lower
price. Work involved in managing a cluster increases the overall complexity of
a system.

### Confluent

[Confluent](https://www.confluent.io/) is a real-time **data streaming**
platform that uses Apache Kafka. It is available in a self-managed version or
as a cloud-native service. Confluent simplifies the use of Kafka for small
teams and for those without sufficient expertise in managing Kafka.

### Connector

A connector is a software module that focuses entirely on transferring control
and data between other components. It does so in an application-independent
manner, which makes connectors highly portable and reusable.

Connectors simplify the work involved in integrating multiple systems quickly
because they encapsulate the inner workings of those systems. They remove the
need for each system to know about the inner workings of the others.

One of the Quix sample projects is a sentiment analysis applied to tweets. The
analysis uses a connector to stream data from the Twitter API. The remaining
components do not need to know the details of the Twitter API and can focus on
the data this connector provides.

### Consumer

A consumer is a system component that reads **events** from a **topic**. A
consumer aids concurrency since it can act alongside other consumers, but
independently of them.

When a consumer is ready to carry out some work, it typically fetches a
**message** from a **broker**. An individual consumer isn’t concerned with
other consumers or how many producers are involved. It just deals with its own
task: fetching messages and processing them.

For example, a **producer** may sense air temperature and write values to a
topic. A consumer might read from that topic and present real-time values on a
chart.

### Consumer group

A consumer group is a collection of **consumers** assigned to a **topic**.
Each consumer in the group can be assigned to one or more **partitions**. A
group leader (one of the group’s consumers) assigns **partitions** to
consumers. If a consumer needs to leave or join the group, the leader is
responsible for assigning **partitions**.

The consumer group concept enables fault tolerance. If a consumer drops out,
another is ready to take its place.

### Data lake

A data lake is a central repository that can store, process and secure large
amounts of data. The data within a lake can be binary (e.g., an image),
unstructured (e.g., an email) or structured (e.g., a JSON data file). Some of
the data in a lake may be raw, straight from an input device. But it may also
be transformed from raw data into other forms useful for reporting, **machine
learning,** etc. This transformation can occur before it is stored in the lake
or on demand.

### Data streaming

A data stream is a continuous flow of data that is processed and analyzed as
it moves from a source to a destination. Stock market prices and traffic
behavior exemplify data that can be collected continuously and processed
immediately.  
Data streaming is the act of working with a stream of data. It’s often
contrasted with **batch processing** , which analyzes a set of data at a fixed
time or interval, usually hours or even days after it was produced.

We’ve answered [frequently asked questions about data streaming](/blog/data-
streaming-faq).

### Data warehouse

A data warehouse is a centralized, canonical storage of data. Large
applications usually use them to consolidate and integrate vast amounts of
data from many sources. Data warehouses often improve the overall quality of
data within an organization.

### Decoupling

**Tightly coupled** components can be challenging to work with independently.
Decoupling refers to the elimination of interdependences between pieces of
software. When decoupled components communicate with each other, they can
easily be swapped out, removed or modified without impacting the behavior of
others.

A typical **consumer-producer** model uses a **message broker** to handle
communication between components. The message brokers enable individual
consumers and **producers** to carry out their tasks without worrying about
the other.

### Extract, load, transform (ELT)

ELT is a method for adding data to a **data lake** , **data warehouse** or
database. It prioritizes loading over transforming. Data is added to the lake
in its raw state, then later transformed on demand. This is in contrast to
extract, transform, load (ETL), which transforms data before it is loaded.

ELT puts more responsibility on the data store and less on the source(s) of
that data. It’s optimized for cases where a lot of diverse data is frequently
produced or generated.

### Event

An event is an activity of interest. It’s a single data point in a stream that
represents a value at a specific moment. An event includes a **key** ,
**value** , **timestamp** and optional **metadata** in the form of headers. An
event might describe car model A (key) traveling at 80 MPH (value) at 12:35 PM
on 1st Feb 2022 (timestamp).

A **producer** publishes events while a **consumer** reads and processes them.
In an event-streaming model, the **topics** that events are written to and
read from are referred to as **streams**.

### Fault tolerant

A system is fault tolerant if it continues operating when one or more of its
components fail. Fault tolerance is a scale rather than a binary property. A
system’s standard “final resort” is reverting to a previous state, which is
possible if backups exist; however, it is not the preferred first course of
action since it is time consuming and will nevertheless result in some data
loss. Decoupling components, graceful degradation and redundancy achieve
better fault tolerance.

### Header

A header is part of an **event** that contains metadata in addition to the
event’s primary data. In contrast to the actual value that the event
represents, a header may include a name, timestamp and type. Headers vary by
implementation. Some streaming platforms consider the timestamp part of the
header, while others represent it as a fixed event field.

### In-memory processing

In-memory processing refers to the processing of data in RAM rather than
reading it from disk and writing it back to disk again. Data stored in memory
incurs far lower latency than on disk. As a result, in-memory processing is
much more efficient. With decreased cost over time, even large quantities of
data can be stored and processed in memory.

### Kafka

Apache [Kafka](https://quix.io/docs/sdk/kafka.html) is an open-source
**stream-processing** platform written in Scala and Java. Engineers at
LinkedIn originally developed Kafka before the Apache Software Foundation
adopted it. Some of the biggest companies use Kafka in industries heavily
involved in data streaming: banking, insurance and telecoms.

Kafka is either self-managed or hosted in the cloud.

### Kafka (hosted)

Kafka is a complicated technology, one that requires dedicated engineers to
configure and manage. There are various factors to consider, from how Kafka is
distributed to ensure availability to how data is stored securely. Handling
all this infrastructure is a considerable task on its own, regardless of the
challenges associated with application development on top of that.

A hosted service mitigates this effort. Running Kafka in the cloud means a
third party takes care of provisioning and building the Kafka part of your
architecture. You concentrate on the application. Confluent’s Cloud product is
a popular example of a cloud-based streaming platform with Apache Kafka at its
core. Quix is another example.

### Key

An **event’s** key is an identifier used to access that event. The key usually
stores data about the **message** itself rather than the values within it, so
is typically used for partitioning, logging or related tasks. In cases where
the key contains even less data relating to the message, a **header** may be
used to store and transmit metadata instead.

### Machine learning

Machine learning is a programming method that automates analytical model
building. With machine learning (ML), algorithms improve through experience
and data analysis. Machine learning is a branch of artificial intelligence.

**Stream processing** helps enable machine learning by making data analysis a
real-time process. A system can then feed the insights it’s gained back into
its processing of future data. For example, a chess computer can continuously
analyze its opponent’s moves to improve its responses.

Read more: [How machine learning and AI are improving
cybersecurity](/blog/cyber-security-machine-learning-ai)

### Message

A message is a **record** of an **event**.

### Message broker

A message broker is a component responsible for message-based communication
between systems. It routes messages between a sender and its recipients,
transforms messages between forms for reliable consumption, composes complete
messages from partial ones and ensures reliable storage.

In a data-streaming architecture, the message broker plays a similar role to
that of a database in a batch-processing model. Adopting a message broker is
one of the major [paradigm shifts when moving to stream
processing](https://quix.io/blog/3-paradigm-shifts-in-streaming-data-
processing/).

Apache Kafka is commonly used as a message broker. RabbitMQ is a popular
alternative.

### Notebook

A Jupyter Notebook combines source code with other resources to provide an
interactive document. For example, code can be embedded alongside Markdown-
formatted text. The code can then be executed or modified by somebody reading
the document.

Jupyter Notebooks can be written in various languages including Ruby, Go and
PHP. The default option is **Python**. Jupyter Notebooks can even integrate
with big data tools like **Apache Spark** and can be used with **Python**
libraries like **pandas**.

The Quix platform is [fully compatible with Jupyter
Notebooks](https://quix.io/docs/platform/how-to/jupyter-nb.html).

### Pandas

Pandas is an open-source data-science Python library for analysis and
manipulation. The library is over a decade old and has a strong global
community.  
Pandas’s features include:

  * A DataFrame structure that represents two-dimensional data. The Quix SDK supports [pandas DataFrames](https://quix.io/docs/sdk/features/data-frames.html) for [reading](https://quix.io/docs/client-library/subscribe.html) and [writing](https://quix.io/docs/client-library/publish.html) data.
  * Tools for converting data between file formats.
  * Aggregation of data via grouping.
  * Date tools for expressing offset or date ranges.

Pandas uses the NumPy package for numerical computing. It also uses Cython to
help integrate C code, which supports processing-intensive features of pandas.

### Parameter data

Parameter data is a means of extending the information sent as part of a
**message** alongside its main value. It consists of further measurements that
directly relate to **event** data. In particular, parameter data typically
varies with time and has a direct relation with a message’s timestamp.
Parameter data may be part of the message **header**.

Quix represents most **time series** data as
[parameters](https://quix.io/docs/platform/definitions.html#_parameters).

### Partition

A partition is a subdivision of a **topic**. Messages belong to individual
partitions that distribute the responsibility for handling them across a
consumer group. Dividing a topic into smaller, manageable parts means that
**consumers** can work more efficiently and can be assigned to individual
partitions as required.

Messages within a partition are ordered, but that order is not guaranteed
across parallel partitions. **Producers** and consumers can connect to
specific partitions if necessary. But if they are written in a way that means
record order is irrelevant, the partition can be overlooked. In that case, the
**broker** can assign partitions.

Partitions increase the Fault Tolerance of the overall system. Partitions also
provide for scalability since the system can distribute them amongst multiple
brokers.

### Persistent

A message (or other forms of data) is persistent if it exists until it’s read.
If a data stream is persistent, it will survive a shutdown of the data-
streaming service, typically by the system writing it to disk. Persistent data
allows a system to hold larger amounts of historical data than a stream alone.
Persistent data can also be useful in a recovery from a catastrophic event or
for correcting historical inaccuracies caused by bugs.

Quix offers persistence at the topic level. If you persist a topic, you’ll be
able to explore data streamed to it via the data explorer.

### Pipeline

A pipeline enables data to flow from one point to another. It’s software that
manages the process of transporting that data. A pipeline is responsible for
routing data as a domain-agnostic process and remains separate from other
components of an application.

A streaming pipeline is one that continuously moves data from one point to
another. A streaming pipeline typically handles many more events than a non-
streaming data pipeline. For example, [Twitter uses data
streaming](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2021/processing-
billions-of-events-in-real-time-at-twitter-) to process hundreds of billions
of events every day.

### Producer

A producer is a component that creates **messages** representing **events**
and sends them to a **topic**.

A producer is not concerned with what happens to the data once it’s sent it.
In the **decoupled** producer-**consumer** model, a producer’s responsibility
ends when it releases data to the consumer.

### Python

Python is an object-oriented language with a preference for readability. Data
scientists often use Python, and in 2018 [two-thirds reported using
Python](https://www.kdnuggets.com/2018/05/poll-tools-analytics-data-science-
machine-learning-results.html), more so than any competing software.

Several high-profile Python libraries deal with data analysis, including NumPy
and **pandas**.

### Real-time processing

In contrast to **batch processing** , real-time processing handles data
continuously, ideally as soon as it is created. Data is processed in
isolation, meaning that one data **record** is not influenced by another. This
allows for parallelization of the process since the order of processing is
irrelevant.

### Record

Sometimes called a **message** , a record includes details about an **event**.
These include the time it happened (**timestamp**), the value it represents
and additional metadata in **headers**.

### Scalability problem

When components in a system are **tightly coupled** , communication between
them becomes more complicated the more components there are. Each new
component adds a requirement for every other component to be able to
interoperate with it effectively. Changes to one component may affect many
more. The more components there are, the worse this problem gets.

The **producer-consumer** model alleviates this problem by loosening the
coupling and allowing components to be independent while maintaining
communication.

Quix’s architecture makes [developing a scalable application much
easier](/blog/scaling-stream-processing), both technically and in terms of
managing your team and its resources.

### SDK

An SDK — Software Development Kit — is a collection of client libraries,
documentation, and sample code designed to ease the use of an API.

The [Quix SDK](https://quix.io/docs/sdk/introduction.html) is available to all
customers. It simplifies the development of a streaming application by
handling [stream contexts](https://quix.io/docs/sdk/features/streaming-
context.html) and managing tasks such as in-memory processing and data
buffering.

### Sources/sink

A data source produces data which it then passes to other components in a
system. A data sink receives data and stores it for future use. Many devices
or components act as both a source and a sink.

Examples of data sources range from those that do a lot of processing
themselves — e.g., a mainframe writing system logs — to specialist devices
that primarily generate data, such as a video recorder or medical instrument.

A data sink often stores data over a long period. An archival device, such as
a tape backup or a cloud-storage solution such as Amazon S3, can act as a data
sink.

### SQL

SQL stands for Structured Query Language, a language defined by a standard and
used to interact with a database, primarily for storing and retrieving data.
SQL is traditionally paired with a relational database, although some
relational data streaming systems also use SQL.

SQL support for streaming data is present in Kafka and **Apache Spark** via
materialized views.

### Stream

Typical streams are unbound data sets that continuously update; they carry a
series of **events.** Streams are analogous with topics, although the term
clarifies and emphasizes that the data involved is produced in real time.

In Quix, a stream represents a session of one data set that has a beginning
and an (optional) ending, such as the journey of a single car during a race or
one run-through of a game. Read more about Quix streams in our
[documentation](https://quix.io/docs/apis/streaming-writer-api/intro.html).

### Streaming analytics

Streaming analytics refers to the processing and analysis of real-time data
**records** in a continuous process. Data may originate from a wide range of
sources, including other computer systems and real-world sensors such as
thermometers.

Time-sensitive data can be out of date if analyzed using a batch process. The
streaming analytics process ensures such data is used at the earliest possible
point to guarantee maximum accuracy.

### Stream processing

Stream processing is the processing of data in real time, when it is produced,
as opposed to **batch processing** , which strictly separates data creation
from its analysis. Stream processing enables a form of parallel processing.

Real-time data processing also benefits from in-memory processing. A series of
operations ([kernel functions](https://en.wikipedia.org/wiki/Compute_kernel))
is applied to each element in a data **stream**.

**Related reading:**[**What is stream
processing?**](https://quix.io/blog/what-is-stream-processing)

### Tightly coupled

Two components or systems are tightly coupled when they strongly depend on
each other to operate. Changes to one may affect the other, even to the extent
of breaking its operation. Tightly coupled components can be costly since
changes to them are laborious. If you change one tightly coupled component, it
can cause unwanted behavior in the other, so every change needs to take the
dependent component into account.

### Time series data

Time series data refers to a group of data points indexed in time order. Such
data can be described by a series of values taken at fixed points in time.
Time series data is discrete rather than continuous. Time series data is
usually sampled at equally spaced points in time; this is often the easiest
and results in the most meaningful data since it can be compared at like-for-
like intervals.

### Timestamp

A timestamp is a value representing a point in time. A typical example is
[Unix time](https://en.wikipedia.org/wiki/Unix_time), which is a count of the
seconds since 1 January 1970. Other formats and standards exist with varying
support for complex factors such as time zones and leap seconds. An
**event’s** timestamp is normally the exact time at which the event took
place.

A timestamp’s value can be as granular as required. It can represent a
specific second or a year. Quix supports nanosecond precision, so you can use
it to build the most demanding, data-intensive applications.

### Topic

A topic is a durable store of **events**. In a streaming **pipeline** ,
**messages** are placed in a **stream** , which can be persisted as a topic.
In such a case, the topic is essentially a stream at rest.

Topics collect related events; you can think of a topic as a file system
directory that contains associated files. When **producers** and **consumers**
interact with a stream, they specify a topic to write to and read from. Topics
are typically split into separate **partitions**.

### Value

A value is anything that you might want to record and analyze. A value could
be the speed of an object, the temperature, the number of arms something has,
etc. In data streaming, values may fluctuate considerably in a very short
period of time.

## What else are you curious about?

Do you have any lingering questions about streaming data? No worries! [Join
our Slack community](http://quix.io/slack-invite) and ask away. You’ll find a
group of people eager to support you and your projects.






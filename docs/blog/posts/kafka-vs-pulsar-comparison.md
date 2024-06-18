---
title: "Kafka vs Pulsar: Streaming data platforms compared"
date: 2023-08-09
authors: [alex-diaconu]
slug: kafka-vs-pulsar-comparison
description: >
  An in-depth comparison of Apache Kafka and Pulsar, covering criteria such as architectural differences, operational attributes, developer experience, ecosystems, deployment options, and security.
categories:
  - ecosystem
---

# Kafka vs Pulsar: Streaming data platforms compared

An in-depth comparison of Apache Kafka and Pulsar, covering criteria such as architectural differences, operational attributes, developer experience, ecosystems, deployment options, and security.

<!-- more -->

## Introduction

Apache Kafka and Apache Pulsar are often compared as they are both data
platforms known for their ability to handle high-throughput, low-latency [data
streaming](/blog/data-streaming-faq). They enable organizations to build
scalable, fault-tolerant data pipelines and real-time processing applications.
Their architectures are built on producer-consumer patterns, meaning they are
both suitable for diverse use cases and seamless integration with modern data
ecosystems.

I've put together this article to help you understand the key differences and
similarities between these two solutions. We'll compare Apache Kafka and
Apache Pulsar, focusing on these aspects:

  * Architecture
  * Operational attributes like scalability, latency, and durability
  * Developer experience, community, and ecosystem
  * Licensing, deployment options, and managed offerings

By the end, I hope you'll have a clearer understanding of the distinctive
features of each platform, and which one would best fit your organization's
needs.

If you’re here because you’re planning to build an event-driven application, I
recommend the “[**Guide to the Event-Driven, Event Streaming
Stack**](https://www.quix.io/event-driven-event-streaming-
guide?_ga=2.244169030.299408049.1706024281-1054807313.1689840321),” which
talks about all the components of EDA and walks you through a reference use
case and decision tree to help you understand where each component fits in.

## A brief overview of Apache Kafka

Apache Kafka is a distributed event streaming platform designed to handle
high-velocity, high-volume, and fault-tolerant data streams. It was originally
developed by LinkedIn and later donated to the Apache Software Foundation.
Kafka has quickly become a popular choice for building real-time data
pipelines, [event-driven](/blog/what-why-how-of-event-driven-programming)
architectures, and microservices applications.

**Core capabilities**

  * Publish and subscribe to streams of records.
  * Store streams of records in a fault-tolerant and durable way.
  * Works with complimentary services to process streams of records as they occur (Kafka Streams and ksqlDB).

**Key features**

  * High-throughput, low-latency messaging for real-time data streaming.
  * Scalable architecture that supports data partitioning and replication.
  * Strong durability guarantees with a distributed and fault-tolerant design.
  * Stream processing capabilities with complementary services from the Kafka ecosystem (Kafka Streams and ksqlDB).
  * Rich ecosystem of connectors and integrations through Kafka Connect.
  * Active open source community and support for numerous programming languages.

## A brief overview of Apache Pulsar

Apache Pulsar is a distributed messaging system designed to handle high-
performance and low-latency messaging and data streaming. Originally created
by Yahoo and later donated to the Apache Software Foundation, Pulsar is
emerging as a strong option for building real-time data pipelines and event-
driven architectures.

**Core capabilities**

  * Supports pub/sub messaging and message queueing.
  * Retains streams of messages in a fault-tolerant and durable way.
  * Native support for multi-tenancy.

**Key features**

  * High-throughput, low-latency messaging suitable for real-time data streaming.
  * Scalable, multi-tiered architecture that separates the message storage layer from the serving layer.
  * Ensures data durability with a fault-tolerant design (including geo-replication).
  * Basic built-in stream processing capabilities (Pulsar Functions).
  * Decently-sized ecosystem of connectors and integrations via Pulsar IO.
  * Supports a good range of programming languages through official and third-party client libraries.

## Pulsar vs. Kafka: comparing architectures

We’ll now review Pulsar’s and Kafka’s architectures to understand their
similarities and differences.

### Apache Kafka architecture

At a high level, a Kafka architecture consists of multiple consumers,
producers and brokers. Producers generate data and send it to brokers, while
consumers read the data ingested by the brokers.

![Kafka cluster diagram.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64d371af0f0624bc64515042_Kafka-
cluster-diagram-02.png)

_Fig. 1. Kafka's architecture_

Brokers run on a Kafka cluster, while producers and consumers are entirely
decoupled from the system. Each message broker stores the actual data sent by
producers in topics, collections of messages belonging to the same
group/category. These topics can be divided into multiple partitions for
optimization. Partitioning data offers benefits like fault tolerance,
scalability, and parallelism. Additionally, each broker may only contain parts
of the partitions of a topic, distributing the rest across other brokers. This
approach helps balance the workload between brokers. To improve reliability,
the Kafka cluster can be configured to have replicas for different topics,
limiting downtime if a broker becomes unavailable.

In the diagram above, you can also notice a ZooKeeper component. Historically,
Apache Kafka has relied on ZooKeeper for:

  * Storing metadata about the Kafka cluster — for instance, information about topics, partitions, brokers, and replicas.
  * Managing and coordinating Kafka brokers, including leader election.
  * Maintaining access control lists (ACLs) for security purposes.

But there’s an ongoing effort to incrementally remove the ZooKeeper dependency
and replace it with [KRaft](https://kafka.apache.org/documentation/#kraft),
which moves metadata management into Kafka itself. This simplifies the
architecture, reduces operational complexity and improves scalability.

KRaft has been production-ready for new Kafka clusters since October 2022.
With the [release of Apache Kafka
v3.6](https://kafka.apache.org/blog#apache_kafka_360_release_announcement),
it’s even possible to upgrade ZooKeeper-based clusters to KRaft. Meanwhile,
ZooKeeper was deprecated in v3.5, and its complete removal is planned for
Apache Kafka v4.0.

There’s also a plan to [introduce a tiered storage approach for
Kafka](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage),
with two tiers: local and remote. The local tier will use local disks on Kafka
brokers to store data. It’s designed to retain data for short periods (e.g., a
few hours). Meanwhile, remote storage will use systems like the Hadoop
Distributed File System (HDFS) and Amazon S3 for long-term storage of data
(days, months, etc.).

Finally, an initiative is underway to introduce [message queues for
Kafka](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka),
which would make Kafka suitable for traditional message queuing scenarios
(right now, using Kafka as a conventional message queue comes with limitations
— [see this article for details](https://medium.com/@andrew_schofield/queues-
for-kafka-29afa8aeed86)).

### Apache Pulsar architecture

Similar to Kafka, Apache Pulsar’s architecture includes multiple servers
(brokers), producers, and consumers. Brokers operate on a Pulsar cluster,
while producers and consumers are entirely decoupled from the system. Each
broker manages the actual data sent by producers in topics. Just like in
Kafka’s case, these topics can be divided into numerous partitions, which
offers advantages like fault tolerance, scalability, and parallelism.

ZooKeeper is also present in Pulsar’s architecture. It’s used for a variety of
tasks, including configuration management, coordination between nodes, and
maintaining metadata about the Pulsar cluster. As previously mentioned, Kafka
is moving away from ZooKeeper, replacing it with KRaft. Pulsar isn’t retiring
ZooKeeper from its architecture, but it does offer alternative solutions you
can use instead: local memory, [RocksDB](https://rocksdb.org/), and
[etcd](https://etcd.io/) (note that the first two are only applicable to
standalone Pulsar or single-node Pulsar clusters).  

![Pulsar cluster diagram.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64d371afdb9400b4c73c7252_Pulsar-
cluster-diagram-02.png)

_Fig. 2. Pulsar's architecture_

The biggest difference compared to Kafka is that Apache Pulsar separates the
storage and serving layers. In Pulsar’s architecture, brokers handle message
routing and delivery, while Apache BookKeeper handles long-term storage.
Specifically, every message that a producer sends is written to a BookKeeper
bookie for retention. This tiered storage approach means Pulsar’s architecture
is more complex than Kafka’s — there are more components to manage (at least
for the time being; but, as previously mentioned, Kafka will also be
introducing a tiered storage approach). On the flip side, this decoupling
means you can scale the storage and serving layers independently.

## Kafka vs. Pulsar: operational attributes

How do Pulsar and Kafka compare in terms of storage and message consumption
models, latency, throughput, durability, and scalability?

### Storage and message consumption

There are **significant differences between the two solutions regarding
message consumption and storage model**.

Kafka's [log-based storage model](https://www.confluent.io/blog/kafka-streams-
tables-part-2-topics-partitions-and-storage-fundamentals/) uses a single,
append-only log file for each topic partition, where messages are written
sequentially and stored on disk. Reads are sequential, starting from an offset
(note that consumers are responsible for managing their offsets). Writes are
appended to the end of the log. For message consumption, Kafka's pull model
involves consumers polling for new messages from the broker.

In contrast, Apache Pulsar's tiered storage model divides messages into
smaller segments and stores them across multiple BookKeeper ledgers (bookies).
It’s important to note that segments can also be [offloaded to long-term
storage solutions](https://pulsar.apache.org/docs/3.0.x/concepts-tiered-
storage/) like Amazon S3 or Google Cloud Storage. Messages are consumed via a
push-based model.

A few comments about these differences:

  * While Pulsar’s tiered architecture can increase network utilization and requires messages to be written to disk twice, it also enables data to be segmented, managed efficiently, and potentially retrieved faster in certain scenarios. 
  * Compared to Kafka’s simpler architecture, Pulsar’s tiered architecture may increase operational complexity (more components to manage). 
  * Both the Kafka and Pulsar models may lead to cache-flushing issues when dealing with lagging consumers. Pulsar’s approach arguably exacerbates this problem due to extra network hops and I/O operations.
  * Pulsar’s push model could reduce latency and resource consumption compared to Kafka. On the other hand, with Kafka, consumers pull messages, which allows them to manage their own flow control.

### Performance

Make no mistake, **Kafka and Pulsar are both high-performance distributed
streaming and messaging platforms**. It’s hard (impossible, even) to say which
one wins in terms of latency and throughput. [Some
benchmarks](https://streamnative.io/blog/apache-pulsar-vs-apache-
kafka-2022-benchmark#) indicate that Pulsar performs better, while [other
benchmarks](https://www.confluent.io/blog/kafka-fastest-messaging-system/)
show that Kafka has the upper hand.

Nevertheless, a push-based message delivery system and a tiered storage model
(like Pulsar’s) can indeed contribute to steadier latencies because they
facilitate data organization, promote efficient use of storage resources, and
can lead to faster data retrieval.

Conversely, Kafka relies on a continuous polling process, where clients
repeatedly ask for data at a set interval. During periods of low message
volume, this can lead to higher latency since the client could be waiting idly
between poll intervals.

However, whether Pulsar's theoretical advantage over Kafka holds true in
practice would depend on the specific workload and usage patterns. It's better
to perform your own benchmarking tests to be certain about this aspect.

### Scalability and durability

**Kafka and Pulsar provide durability features to ensure high availability and
system resilience**. Both solutions allow you to store messages indefinitely,
which is essential for recovery and continuity in case of failures or
disasters. Furthermore, Kafka and Pulsar support geo-replication (between
different datacenters and even different regions). Kafka supports replication
at a topic level; meanwhile, Pulsar offers replication at both topic and
namespace levels. It’s important to note that when geo-replicating data,
Pulsar requires an additional “global” ZooKeeper cluster compared to Kafka,
which adds complexity.

**Both Kafka and Pulsar are highly scalable platforms**. Pulsar's segmented,
tiered architecture could potentially confer a degree of added flexibility and
improved scalability compared to Kafka (as Pulsar’s data and serving layers
scale independently).

So far, Kafka’s biggest bottleneck in terms of scalability has been the use of
Apache ZooKeeper. ZooKeeper stores Kafka's metadata, including information
about topics, partitions, replicas, and their configurations. ZooKeeper limits
the maximum size of data that can be stored within a znode (a data node in
ZooKeeper). This data size limitation indirectly limits the number of
partitions that can be managed within Kafka (roughly ~ 500K partitions per
cluster).

However, as previously mentioned, Kafka is removing its dependency on
ZooKeeper, replacing it with KRaft. In other words, the 500K partitions per
cluster limit imposed by ZooKeeper is going away. KRaft also also brings other
benefits — for instance, it makes controller failover almost instantaneous,
and it simplifies Kafka’s architecture, deployment, and configuration.

With or without KRaft, Kafka can be scaled for the vast majority of use cases
without any difficulty. Pulsar is also extremely well-equipped to handle high-
scale scenarios. In fact, unless you’re dealing with a hyper-scale scenario
(petabytes of data and trillions of messages per day), you’re unlikely to hit
serious scalability issues with any of these two tools. Even then, it’s
doubtful you couldn’t get past these issues by re-architecting or optimizing
your Kafka or Pulsar deployment.

## Kafka vs. Pulsar: DevEx and ecosystem

So far, we've seen that Kafka and Pulsar are high-performance, highly
scalable, and durable solutions. However, when it comes to choosing a data
streaming platform, it's not all about latency and scale. With that in mind,
let's compare Kafka and Pulsar's developer experience and ecosystem.

### GitHub stats, online resources, community and documentation, learning and
training

You'll need some context to fully understand the differences between the
communities and online resources available for Kafka and Pulsar.

Kafka became a fully-fledged Apache Software Foundation project in 2012, while
Pulsar achieved the same milestone four years later, in 2016. Moreover,
Kafka's open source nature facilitated its [rapid
adoption](https://www.eweek.com/big-data-and-analytics/apache-kafka/) as
demand for real-time event streaming solutions skyrocketed.

This largely explains Kafka's advantage over Pulsar in terms of [community
size, documentation, and available online
resources](https://kafka.apache.org/project). That being said, [Pulsar's
community](https://pulsar.apache.org/community/) is experiencing growth, which
is always a good indicator of the future of a project.

In summary, it's undeniable that **Kafka has the edge over Pulsar when it
comes to documentation, online resources, and community. Kafka is also more
popular** (judging by GitHub stats), and **has an easier learning curve**
(although both Kafka and Pulsar are difficult to master).

### CLIs and clients

**Overall, Kafka and Pulsar seem rather evenly matched when it comes to CLI
tools**. Both offer CLIs that allow you to manage and interact with your
Kafka/Pulsar deployments. Of course, there are some differences in what you
can do with these CLIs (some of these differences stem from the fact that
Kafka and Pulsar are different platforms, with some different features). For
example, [Kafka CLIs](https://docs.confluent.io/confluent-cli/current/command-
reference/overview.html) offer better and more detailed commands for managing
consumer groups, while [Pulsar’s
CLI](https://pulsar.apache.org/reference/#/3.0.x/cli) tools allow you to
manage packages (which you can’t do with Kafka’s CLIs).

**Both Kafka and Pulsar support a variety of programming languages through
their client libraries**. Kafka has a slight edge in terms of the number of
languages supported, mainly due to its longer existence and wider adoption,
which has led to more third-party client libraries being developed. See the
next section for more details.

### Language support

Kafka offers official client libraries in Java and Scala. Confluent (founded
by the creators of Apache Kafka) provides some other officially-supported
clients, targeting C/C++, C#/.NET, Python, Go, and Node.js. Similarly, Pulsar
has official client libraries for Java, C/C++, C#/.NET, Python, Go, and
Node.js. **In essence, Pulsar and Kafka target the same programming languages
through their official client libraries (the only notable difference is that
there’s an official Kafka client for Scala, which is something Pulsar doesn’t
provide)**.  

In addition to these official clients, there are **numerous third-party Pulsar
and Kafka client libraries, most of them open source projects**. Kafka has a
slight advantage, as you will find Kafka clients for PowerShell, Perl, and
Swift (there are no Pulsar client libraries for these languages).  

Note that Kafka and Pulsar also offer some language-agnostic clients. For
example, Pulsar provides REST and WebSocket clients, while Kafka offers
several HTTP proxy clients (both official and community-made). Learn more
about [Kafka
clients](https://cwiki.apache.org/confluence/display/KAFKA/Clients#) and
[Pulsar clients](https://pulsar.apache.org/docs/3.0.x/client-libraries/).

### Ecosystem

**Kafka has a larger ecosystem compared to Pulsar**. Through connectors, the
[Kafka Connect framework](https://kafka.apache.org/documentation/#connect)
allows you to easily ingest data from other systems into Kafka, and stream
data from Kafka topics to various destinations. There are hundreds of existing
connectors for different types of systems, such as databases (e.g., MongoDB),
storage systems (like Azure Blob Storage), messaging systems (RabbitMQ, JMS),
and many more.  

Meanwhile, although less mature than Kafka's, Pulsar's ecosystem still offers
a good number and variety of connectors and integrations with other systems
like Aerospike, Datadog, and RabbitMQ, to name just a few.

**When it comes to built-in stream processing, Kafka has the upper hand over
Pulsar**. The [Kafka Streams
library](https://kafka.apache.org/documentation/streams/) allows you to build
[real-time stream processing apps](/blog/what-is-real-time-stream-processing)
with features like joins, aggregations,
[windowing](https://quix.io/blog/windowing-stream-processing-guide), and
exactly-once processing. In comparison, Pulsar only provides basic
functionality for stream processing through the [Pulsar
Functions](https://pulsar.apache.org/docs/3.0.x/functions-overview/)
interface, which is suitable for simple callbacks. Beyond their built-in
stream processing capabilities, both Kafka and Pulsar integrate with stream
processing solutions like Apache Flink, Apache Storm, and Apache Beam.

## Kafka vs. Pulsar: licensing and deployment options

This section compares Kafka and Pulsar’s licensing terms, commercial support
options, deployment models, and managed service offerings.

### Licensing and commercial support

As you can see,**there is no difference between Kafka and Pulsar regarding
licensing.** Both platforms are open source — they use the [Apache License
version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

That being said,**if you don’t want to manage Kafka/Pulsar yourself, there are
third party-vendors offering commercial support**. However, it’s worth
pointing out that commercial support for Kafka is more mature and widespread
compared to Pulsar. More about this in the following section.

### Deployment models and managed offerings

**Kafka and Apache can be flexibly deployed in various ways, such as on-
premise, in the cloud, using Docker or Kubernetes**. In addition, **Kafka and
Pulsar are supported by a number of managed service providers** , which can
simplify the deployment, scaling, and management of these systems. Note,
however, that the **Kafka vendors are more numerous (and better known)**. This
is not a surprise — after all, Kafka has been around for longer, and benefits
from earlier (and widespread) adoption compared to Pulsar.

## Pulsar vs. Kafka: security

Security is often top of mind when choosing a data streaming platform. So how
do Pulsar and Kafka compare?

**Both Kafka and Pulsar provide solid security features, such as encryption
and strong authentication and authorization mechanisms**.

In some regards, **Pulsar has an advantage** : for instance, it natively
supports end-to-end encryption and has built-in audit logs. This is not to say
that Pulsar is inherently more secure than Kafka or that Kafka lacks key
security features, but it's worth noting that Pulsar provides some extra
security mechanisms which might come in handy.

## What next?

It is ultimately up to you to decide if Kafka or Pulsar is the best choice for
your use case. Or, perhaps you’re looking to see if other data streaming
platforms (or even traditional messaging systems) are a better fit for your
needs. If that’s the case, check out some other comparisons:

  * [ActiveMQ vs Kafka](https://quix.io/blog/activemq-vs-kafka-comparison)
  * [Kafka vs RabbitMQ](https://quix.io/blog/apache-kafka-vs-rabbitmq-comparison)
  * [Redpanda vs Kafka](https://quix.io/blog/redpanda-vs-kafka-comparison?_ga=2.192256298.1692268617.1704615615-1380534647.1684734075&_gl=1*hnvra3*_ga*MTM4MDUzNDY0Ny4xNjg0NzM0MDc1*_ga_BFBHQ33YP1*MTcwNDgwMzQxMS40ODQuMS4xNzA0ODA3NTAyLjAuMC4w)
  * [Kafka vs Kinesis](https://quix.io/blog/kafka-kinesis-comparison)

If you conclude that Kafka is indeed the right solution for you, and you want
to pair it with a Python stream processing solution, I invite you to give
[Quix](https://quix.io/) a try. As a serverless CaaS (Container-as-a-Service)
platform, Quix enables you to develop, release, and observe event streaming
applications powered by Kafka, Docker, Git, and containerized microservices.
With Quix, there's no need for you to deal with the operational complexity of
deploying, scaling and managing Kafka, containers, and stream processing
infrastructure. [Check out these interactive
examples](https://quix.io/templates?_ga=2.192256298.1692268617.1704615615-1380534647.1684734075&_gl=1*hnvra3*_ga*MTM4MDUzNDY0Ny4xNjg0NzM0MDc1*_ga_BFBHQ33YP1*MTcwNDgwMzQxMS40ODQuMS4xNzA0ODA3NTAyLjAuMC4w)
to see what’s possible by combining Kafka as the streaming transport and Quix
as the stream processing engine.




## Guide to the Event-Driven, Event Streaming Stack
Practical insights into event-driven technologies for developers and software architects

[Get the guide](https://www.quix.io/event-driven-event-streaming-guide)



---
title: "Implementing stream processing: my experience using Python libraries"
date: 2023-07-19
authors: [ales-saska]
slug: implementing-stream-processing-python
description: >
  I tested three Python client libraries — Apache Spark, Apache Flink, and Quix — on performance, scalability and ease of use. Here’s what I learned.
categories:
  - industry-insights
---

# Implementing stream processing: my experience using Python libraries

I tested three Python client libraries — Apache Spark, Apache Flink, and Quix — on performance, scalability and ease of use. Here’s what I learned.

<!-- more -->

## Apache Spark on Databricks vs. DIY Apache Flink vs. Quix.ai

When I set out to answer the question of which data stream processing system
is best, it seemed like a simple experiment: take a randomly generated string
of lorem ipsum text and calculate various metrics over a sliding window of
time. But this simple experiment quickly revealed the complexities associated
with working with streaming data.

**TL;DR:** the system you choose will significantly impact ease of use,
performance, and cost.

This blog shares my experience with the pros and cons of each platform —
Apache Spark on Databricks, a DIY Apache Flink install, and Quix — so you can
make the best decision for your application. My colleague Tomas Neubauer (Quix
CTO) details our results in full in [his blog post](/blog/compare-client-
libraries-spark-flink-quix).

I’m also eager to hear about your experiences. [Jump on our
Slack](http://quix.io/slack-invite) to chat with my colleagues and me.  

## Stream processing with Apache Spark

In Databricks, it’s easy to configure Kafka as a streaming source, and you can
create a table from plain text messages. But despite its large user base,
[Spark’s documentation](https://spark.apache.org/docs/latest/streaming-
programming-guide.html) doesn’t provide enough information for
troubleshooting. As a result, developers must frequently rely on community
support via Stack Overflow and other forums.

In particular, the Databricks platform file storage is not adequately
documented. A file is needed for the Kafka broker to store its internal
variables in the checkpoint location. However, the file storage directory
(/FileStorage) seems hidden from the user or undocumented. Since this
directory is not accessible from the UI, the only way to reset a Kafka
checkpoint file is to create a new file and leave the old file on the system.
Erasing the Spark state is done illogically via the SQL >>RESET;<< command.

Spark DataFrame functionality is limited when working on the streaming data,
which, combined with insufficient documentation, makes development difficult.
There is no straightforward way that the developer can debug the data being
processed.

Spark’s CPU utilization averaged 14%, but the system could not process more
than 133,000 messages per second — a fraction of what Flink and Quix were
capable of handling. This is a problem, especially when working on Databricks,
where I had to provision a whole cluster for a month.

It cost nearly $1,000 to build, set up, run and optimize this experiment
across the month, so it’s disappointing to know that effectively, only 14% of
that cost was spent wisely.  

## Stream processing with Apache Flink

Recognized as the industry standard, [Apache Flink](https://flink.apache.org/)
is a scalable data stream processing library with a mature code and user base.
Its Table API is easy to use and understand, it provides many types of rolling
windows out of the box, and it scales nodes adequately so that it can process
a high volume of data.

However, the Table API is not very flexible as it’s really a SQL wrapper
compiled to Java runtime. As a developer, I can’t implement my own classes,
methods, etc., or use external libraries in my project.

There is a pure Python API, but it is incomplete, and the associated
DataStream features are unsupported and undocumented. Additionally, there is
no straightforward way for a developer to debug data that is being processed.
The Flink Kafka connector requires you to include the JAR manually. And you
can’t load the plaintext to the single-column table — you must create a
specific generator just for Flink (we used JSON).

[Setting up a Flink cluster](https://nightlies.apache.org/flink/flink-docs-
release-1.13/) isn’t easy. The self-managed nature of Flink requires knowledge
of setting up the server by yourself. In our case, we created Docker images
supporting the execution of Flink Python code and deployed them into Azure
VMs. The default Docker image from the Docker hub does not have support for
Python, which needs to be manually installed into the container.  

## Stream processing with Quix Streams

As the newest data stream processing platform, Quix sets itself apart by
solving many of the problems that plague Spark and Flink while introducing new
techniques that provide greater performance and efficiency.

Quix has tightly coupled compute with the broker and database, providing a
platform that’s easy to use and set up while also delivering very high
performance. It took me **less than a day** to run the tests on Quix, compared
to multiple weeks to run them properly on Flink and Spark.  

> _“It took me less than a day to run the tests on Quix, compared to multiple
> weeks to run them properly on Flink and Spark.”_

Quix offers many out-of-the-box capabilities. For example, the visualize
feature allows developers to see the incoming data from the message broker and
quickly debug running code. This, together with a built-in IDE with Git
versioning system, ensure that you can iterate and develop very quickly.

The [Quix Streams client library](https://quix.io/docs/sdk/introduction.html)
is simple to use, supports any Python code, offers very high performance, and
enables you to stream and process data in various formats, such as RAW/binary,
numeric, and strings and types, such as events and parameters (time-series
scalar values like XYZ position).

[Quix’s documentation](https://quix.io/docs/) is also the easiest to use and
includes many ready-to-use examples. Support for the [Pandas
DataFrames](https://quix.io/docs/sdk/features/data-frames.html) makes
development easy because the in-memory implementation inside the Pandas is
done for you.

Python implementation is a dream for data scientists. It provides a simple API
to access data, either in batched chunks to improve performance or immediately
as data arrives from the broker to achieve the lowest latency.

Quix’s limitations include some elements that Flink already has established,
such as an out-of-the-box rolling window; auto scaling for parallelism in the
nodes (currently, it’s manual with a slider in the UX); shared state (this
must be created manually by adding topics); and internal state management
(implemented manually using the feature in the client library).

These limitations are all being addressed by Quix on the roadmap, and, for
now, the performance, ease of use, [Python
API](https://quix.io/docs/apis/index.html), and managed infrastructure more
than make up for the limitations.  

## Which stream processing platform is best?

I’m a big fan of trying things before you buy them. That’s why this seemingly
simple experiment helped me dig deep into the pros and cons of each system.
It’s clear from the performance results that Apache Spark is a library that
can’t handle the demands of real-time data stream processing. At the same
time, Databricks is expensive and difficult to use for stream processing
applications.

Both Quix and Flink have their advantages, depending on your use case, but
Flink is tough to use and a 100% DIY solution. Considering **efficiency**
(read: cost savings) and the **ease of use** for setup and troubleshooting, I
believe Quix is the compelling choice.

Developers waste hours troubleshooting and debugging when they could be
writing fresh new code. The cost of their time, and the opportunity cost of
bringing new products to market, are often underestimated. Quix removes all of
this pain, allowing developers to focus on their code and data from day one.

See our full breakdown if you’d like to read more about my experiment and the
performance results. Also, on the blog, my CEO gives a [very, very detailed
comparison](/blog/performance-limitations-python-client-libraries) of each of
these client libraries. You can also [visit my GitHub
repository](https://github.com/saskaale/streaming-comparison) to see the
attached codebase. If you’d like to try the Quix platform free, you can [get
immediate access](https://quix.io/signup).






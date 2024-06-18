---
title: "A very detailed comparison of Python stream processing libraries"
date: 2023-07-19
authors: [mike-rosam]
slug: performance-limitations-python-client-libraries
description: >
  Dive deep into the performance and limitations of Python client libraries to choose the best stream processing solution for your data.
categories:
  - ecosystem
---

# A very detailed comparison of Python stream processing libraries

Dive deep into the performance and limitations of Python client libraries to choose the best stream processing solution for your data.

<!-- more -->

## Performance and limitations of Spark, Flink, Kafka and Quix

You’ve got data streaming in from dozens of data sources or sensors, but
dumping it all in a data lake is just going to create bigger problems. Worse,
the investment you’ve made in capturing and storing data is going to waste if
you don’t set up the resources, data scientists and ML models necessary to
process and act on the data when it’s relevant.

This is the problem facing thousands of companies now, and stream processing
could be both the solution and another big headache if it isn’t set up right.
(See the post from Quix software architect Ales Saska for [more on usability …
or lack thereof](/blog/implementing-stream-processing-python)). That’s why I’m
diving deep into each Python stream processing client library to uncover the
performance and limitations associated with each architecture.

And I’m pulling no punches. Stream processing is leading-edge tech — it hasn’t
yet been abstracted into tidy, easy-to-use software. It’s usually messy, DIY,
and resource-intensive. That’s why you’ve got to know what your data science
and development teams are up against when you decide to harness the power of
stream processing.  

## Why is stream processing in Python difficult?

Stream processing with Python presents a massive challenge due to two
conflicting requirements: provide data scientists with infrastructure that is
both technically complex and also easy for them to use.

But the infrastructure is getting easier. After all, the major components are
all freely available on the market, so all you need to do is choose an
architecture and build it.

So what’s the problem? There are so many components that choosing and
integrating the best ones and making them work for your developers is the
problem — as Mathieu Dumoulin summarizes in [his
blog](https://developer.hpe.com/blog/performance-tuning-of-an-apache-
kafkaspark-streaming-system/) for Hewlett Packard about performance tuning an
Apache Kafka / Spark streaming system:

  * “Including many ‘bleeding-edge’ OSS components (Apache Ignite and Mesos) with expectations of very high reliability is unrealistic.”
  * “A better architecture design could have simplified the system tremendously.”
  * “Tuning a Kafka/Spark Streaming application requires a holistic understanding of the entire system. It’s not simply about changing the parameter values of Spark; it’s a combination of the data flow characteristics, the application goals and value to the customer, the hardware and services, the application code, and then playing with Spark parameters.”
  * “The requirements for this project show the real-world business need for a state-of-the-art converged platform with a fast distributed files system, high-performance key-value store for persistence, and real-time streaming capabilities.”

Your choice of client libraries (Kafka Streams and Spark in this example) is
very important to the integration effort. And there aren’t many good options
for data engineers who are looking to enable the Python developers in their
organizations.  

> _“there aren’t many good options for data engineers who are looking to
> enable the Python developers in their organizations.”_

## What Python libraries exist for stream processing?

There are currently two processing libraries (Apache Spark and Apache Flink)
and one streaming library (Apache Kafka Streams) worth talking about. There’s
also Apache Beam, but we won’t cover it here because it’s really an
ETL/pipeline tool that still relies on Spark or Flink for executing the Python
code.

We’re also going to show you a newer, better way to get started with real time
machine learning in Python by using [Quix
Streams](https://quix.io/docs/sdk/introduction.html).  

## Performance and limitations of Spark Structured Streaming

[Apache Spark](https://spark.apache.org/) is an open-source framework written
in Scala for large-scale data processing. Spark Core is the poster child for
big data, having gained popularity over the last seven years — alongside the
growth in popularity of data lakes — for its ability to read huge, petabyte-
scale datasets from disk, parallelize them, and serve them to distributed
clusters for processing.

Spark Structured Streaming uses Spark Core’s scheduling capability to stream
data in mini batches. It is available with a Python API and provides standard
operators like map, filter, count and join, together with more advanced
features like windowing, checkpointing, and caching.

Importantly for data scientists, Spark Streaming also supports MLlib and
DataFrames, allowing them to do more complex processing workloads. However,
there are many downsides to the framework for streaming applications:

  * Spark Streaming is a client library for use on the compute cluster (your ML model) only. Teams must configure and manage separate streaming and compute environments to build a stream processing solution. Each environment needs a different client library (for example, Kafka Streams on the message broker and Spark on the compute cluster), which makes the two worlds less compatible.
  * Spark Streaming uses micro-batching to get data to your model. It’s designed to group messages into chunks that are tens of seconds to minutes in size, which introduces huge latency (chunk size) and performance problems (falling behind the leading edge) when working with live data in the seconds to milliseconds domain.
  * A new low-latency processing mode called Continuous Processing has been available since Spark 2.3. It supports 1 millisecond latencies; however, it is mainly suitable for simple operators like grouping and filtering, and we found the efficiency to be poor compared to Flink.
  * Support for complex processing workloads such as running real time ML models is not well documented. Basically, a data scientist must access the raw RDD data structures to run Python code by catching and collecting data with DataFrame operations.
  * Spark Streaming is extremely technical. There are many options for performance tuning memory, batches, serialization, parallelism and out-of-order data. This is hard to digest for most data scientists and ML engineers who’d prefer to focus on the math and science.
  * Spark Streaming is expensive to run at small scale because you need to provision an entire cluster to host the processing engine.

The easy way to get started with Apache Spark is to use Databricks as a
compute environment. The problem is that you will only get roughly one-third
of the infrastructure you need to deploy a production-ready data streaming
analytics solution.  

> _“The problem with Apache Spark is that you only get one-third of the
> infrastructure you need to deploy a production-ready data streaming
> analytics solution.”_

Your team will still have to design, build, and manage the rest: both a
message broker such as Kafka and data storage. This requires a significant
investment of time, human resources and infrastructure costs before you can
build new real time product features. [Mathieu Dumoulin’s
post](https://developer.hpe.com/blog/performance-tuning-of-an-apache-
kafkaspark-streaming-system/) goes into greater detail on this.  

## Performance and limitations of Apache Flink

[Apache Flink](https://flink.apache.org/) is the current standard in real time
processing libraries. It is a true, message-by-message distributed processing
engine for streaming that lets you parallelize applications for concurrent
execution on a cluster.

Flink is a mature technology, with many APIs and helper features including
support for autoscaling (distributed parallel processing), state management,
bounded and unbounded streams, time management, and support for both Table and
SQL data transformations.

Flink is written in Java and Scala, so the primary DataStream API is only
available in those languages. There is support for Python in the PyFlink Table
API and PyFlink DataStream API, however there are many limitations:

  * Flink is a client library for use on the compute cluster (your ML model) only. There are APIs to read and write messages to and from a message broker, however they are converted into the broker message library formats.
  * Flink is very complex, with many advanced streaming features for data scientists to learn.
  * The Python wrappers are complex and the documentation is thin.
  * The PyFlink Table API is effectively a query language which is executing standard operations by compiling them to Java at runtime. This is very limiting to Python developers who won’t be free to use theor own classes, methods, or external libraries.
  * The PyFlink Table API is limited to simple operators such as group, filter, join, count, map and reduce.
  * The PyFlink DataStream API allows you to execute dependencies such as third-party Python libraries and ML models, however the documentation is incredibly weak and it’s very difficult to understand how to make use of the capability. Basically, you can create a user-defined function to execute your ML model in a SQL-style query, but it’s not intuitive.
  * It’s hard to build a Flink cluster. It requires a deep understanding of DevOps practices to provision a multi-node cluster, then you must optimize the performance across the nodes.
  * The distributed processing engine requires a lot of memory to host, regardless of the actual processes in operation. The result is that it’s not cost effective to scale because you need to provision and pay for additional nodes in stepped increments, rather than taking advantage of modern elastic approaches enabled by serverless architectures.

Flink is a 100% DIY solution, so there’s no easy way to start with a managed
service. Instead, you must provision clusters to host the distributed data-
flow engine (consisting of a primary node and multiple operator nodes) to run
any stream processing workloads. On top of this — and just like Spark on
Databricks — there is no streaming or storage infrastructure, so you’ll have
to build these, too.  

> _“To successfully use Flink in production you must invest serious resources
> … estimate more than 18 months.”_

Therefore, to successfully use Flink in production you must invest in a
serious project with serious resources. That means, in addition to data
scientists, you’ll need experts in multiple other fields including software,
data, architecture, infrastructure and security. You’ll also need a lot of
time to get it right: estimate more than 18 months, which is the current going
rate for a dedicated team.  

## Performance and limitations of Kafka Streams

[Apache Kafka Streams](https://kafka.apache.org/documentation/streams/) is a
stream processing library written in Java and Scala. Unlike Spark and Flink,
it is not a server-side distributed processing engine. Instead, it is a client
library that allows your apps to publish streams of records (messages) to the
Kafka broker and subscribe to those records. This is typically called the pub-
sub pattern.

In this way, Kafka Streams, together with the Apache Kafka message broker,
allows you to build real time distributed applications. The combination is
very powerful for software engineering, however, it’s not at all suitable for
data science and machine learning users because the data is unstructured and
there is no Python support. The limitations of Kafka Streams in this regard
are:

  * Kafka Streams is a library for streaming data onto the Kafka message broker only.
  * There is no structure to the data, each message is a unique record with no relationship to the other records.
  * It does not natively support Python at all, however, there are some open source implementations like Faust. This makes it all but useless for data science and machine learning workloads, unless you ask your data engineer to write the data to a database for you.
  * Kafka Streams allows you to process streaming data on the client, but only offers high-level operators such as filter, map, grouping, windowing, aggregations and joins; and only in Java and Scala.
  * You can implement custom operators, but only if you know Java or Scala.
  * The framework only supports key-value messages. You can put any value you like in the pair, however the resulting messages become very messy, requiring significant data cleaning and preprocessing to make the data useful for data scientists.

An easy way to get started is to head to the [Apache Kafka
website](https://kafka.apache.org/) and follow the [Quick Start
Guide](https://kafka.apache.org/quickstart). This will install a Kafka
environment on your local host where you can create topics to stream and
process messages — if you are comfortable with Java.

To put this into production and do ML on streaming data you’ll need to:

  1. Host Kafka on a cluster or use a managed service from the likes of Confluent, Azure or AWS;
  2. Use the Java-based Kafka Streams library to stream messages from your sources to your topics;
  3. Build a compute environment on a VM and install Spark or Flink, or use the Databricks managed service or similar
  4. Hook up a data store
  5. Get busy managing, optimizing and scaling all that infrastructure; and
  6. Do all of the above before writing a single line of value-added code.

## Performance and limitations of Quix Streams

[Quix Streams](https://quix.io/docs/sdk/introduction.html) is a streaming
library built by McLaren F1 engineers. It’s designed to be used for high-
performance streaming applications where you need to process huge volumes of
data with a nanosecond response time.  

> _“Quix’s tight integration makes in-memory data processing extremely
> efficient, fast and scalable.”_

Unlike Spark, Flink or Kafka Streams, Quix Streams is a unified library for
both streaming data on the message broker (pub-sub) and processing data in the
compute environment. This tight integration makes in-memory data processing
extremely efficient, fast and scalable.

Quix Streams is written in C# and supports Python natively on win-x64/x86,
Linux-x64 and OSX-x64 systems. You can use any Python library for stream
processing (NumPy, Scikit Learn, Flask, TensorFlow, etc.), which opens up
stream processing to real time machine learning applications and online
training.

It is also supported by [streaming APIs](https://quix.io/docs/apis/index.html)
(HTTP) for applications where Quix Streams isn’t suitable, such as streaming
click data from a browser.

Uniquely, Quix Streams provides a ParameterData format (a record with a
timestamp and a Number or String only) alongside the more traditional
EventData format. The ParamaterData format supports high frequency time series
values such as those from IoT devices, while also allowing you to attach raw
binary data so you can send images or videos alongside your time series data.

Quix Streams also provides several useful features to help solve common
challenges when developing real time stream processing applications. These
include a streams context to wrap data into one scope (such as one customer),
buffers to balance efficiency and costs, message splitting, serialization and
compression to increase efficiency and performance, broker configurations,
authorization and encryption, checkpointing and APIs for integrations with
historic and live data.  

## Next-generation technology for the stream processing era

As a leading-edge technology, Quix Streams is the least mature format among
those discussed above, so it doesn’t yet support features like out-of-the box
operators, exact once processing (it supports at least once processing), or
shared state. All these have work arounds (operators are easily implemented in
Python, checkpointing helps with exact once, and state can be written to a
topic easily) and are on the roadmap for implementation in 2021.

The best thing about Quix Streams is that it’s really easy to get started with
stream processing using Python. It provides everything you need to get started
quickly, and with the Quix portal you get serverless infrastructure so you can
scale your pipelines as your application grows in success.

**Want to give Quix a try?** [Sign up for a free
trial](https://quix.io/signup) and get immediate access plus $240 in Quix
credit every year for your own projects (no credit card required), or join our
community in [Slack.](http://quix.io/slack-invite)






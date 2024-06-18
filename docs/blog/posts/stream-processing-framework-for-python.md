---
title: "Real time stream processing with Python"
date: 2023-07-18
authors: [steve-rosam]
slug: stream-processing-framework-for-python
description: >
  Python is the primary language for machine learning applications, but it isn’t easily compatible with streaming data — until now. Introducing the Quix SDK made for Python developers.
categories:
  - tutorials
---

# Real time stream processing with Python

Python is the primary language for machine learning applications, but it isn’t easily compatible with streaming data — until now. Introducing the Quix SDK made for Python developers.

<!-- more -->

## An introduction to Python stream processing frameworks

[Stream processing](/blog/what-is-stream-processing) is becoming increasingly
crucial to the success of organizations in every industry. The volume and
velocity of data are increasing rapidly:

  * [Volume:](https://www.idc.com/getdoc.jsp?containerId=prAP46737220) By 2025, IDC estimates there will be 55.7B connected devices worldwide, creating 73.1ZB of data per year.
  * [Velocity:](https://www.slideshare.net/AmazonWebServices/abd321dont-wait-until-tomorrow-how-to-use-streaming-data-to-gain-realtime-insights-into-your-business) Speed is a competitive advantage in the digital economy. Organizations that can act on their data in milliseconds gain the most valuable insights.

It’s simply impossible for humans to understand data at this volume and
velocity, much less act on it. This is where stream processing becomes most
valuable — automating responses to take near real-time action.

Companies that wish to take advantage of machine learning and automation are
hiring data scientists rapidly, leading to an explosion of demand for the
practice. But the tools supporting data scientists are centered around batch
processing of historical data, making it hard for them to work with streaming
data.

This is where Quix comes in. We’ve created a Python-friendly client library
that enables data scientists to process streaming data and deploy their
machine learning models and data products without intervention from developers
and other technical specialists.

This article will discuss the options for developing on streaming data with
Python, introduce the Quix Python client library for stream processing, and
show you how to use it.  

## What Python libraries exist for stream processing?

There are currently [four libraries that support stream
processing](/blog/performance-limitations-python-client-libraries) (Apache
Spark, Apache Flink, Kafka, and the Quix SDK) worth investigating. There’s
also Beam, but we won’t cover it here because it’s an ETL (extract, transform
and load) pipeline tool that still relies on Spark or Flink for executing the
Python code.  

### Spark structured streaming

Apache Spark is a library for processing data on the compute cluster (your ML
model). Written in Scala, it streams data in micro batches that are typically
tens of seconds to minutes in size. This can introduce latency (think of
latency as the chunk size of data processing) and performance problems
(falling behind the leading edge of data as it is created) when working with
live data. [We explain these problems in depth in our test of client
libraries](/blog/compare-client-libraries-spark-flink-quix).

Spark has a Python API that provides operators like map, filter, count and
join with more advanced features such as windowing, checkpointing, and
caching. Importantly for data scientists, Spark also supports MLlib and
DataFrames (to enable complex processing). However, they cannot write results
back to a message broker, making it hard to build streaming pipelines.

### Apache Flink

Flink is also designed for processing data on the compute cluster. Written in
Java and Scala, it supports “true stream” (message-by-message) processing.
There are APIs to read and write messages between a message broker. However,
data is converted to broker message formats, which adds complexity.

The PyFlink Table API supports simple operators like group, filter, join,
count, map, reduce, and the DataStream API allows you to execute dependencies
such as third-party Python libraries. This is good news for data scientists,
but the documentation is challenging. [Our software developer catalogs his
trial of client library usability, including a documentation
assessment.](/blog/implementing-stream-processing-python)

### Kafka Streams

Unlike Spark and Flink, Kafka Streams isn’t a server-side processing engine.
Instead, it allows you to publish streams of records (messages) to the Kafka
broker, subscribe to those records, and perform stateful stream processing
(only high-level operators like filter, map, grouping, windowing, aggregations
and joins) on the broker itself.

Kafka with Kafka Streams is compelling for software engineering. However, it’s
not suitable for data science and machine learning users. That’s because it
does not support Python natively, although there are some open-source
implementations like Faust.

## Stream processing in Python with the Quix SDK

Built by former McLaren Formula One engineers, the Quix Streaming SDK is
designed for high-performance streaming applications when you need to process
vast volumes of data with nanosecond response time.

The [Quix SDK](https://quix.io/docs/sdk/introduction.html) was built with four
unique benefits in mind.  

### Performance

The Quix SDK is a unified library for streaming data on the message broker and
processing that data in the compute environment. This [data
processing](https://quix.io/docs/client-library-intro.html#library-features)
and out-of-the-box message splitting, compression, and serialization
techniques make your application extremely efficient, fast, and scalable. As a
guide, the Quix SDK is so efficient that we have measured over 145 million
values per GB of data during internal tests.

### Context

The create_stream method lets you wrap data into a single scope, such as
defining a dataset based on one customer. This allows you to manage, discover
and work with your data more efficiently.

The [streams context](https://quix.io/docs/sdk/features/streaming-
context.html) also allows you to process vast volumes of data by automatically
parallelizing streams across many model instances (horizontal auto-scaling)
without any additional implementation.

### Application agnostic

The [ParameterData
format](https://quix.io/docs/sdk/write.html#_writing_parameter_data) is a
record with a timestamp and a number or string. It supports high-frequency
time series values, such as those flowing in from IoT devices and raw binary
data. Meanwhile, the [EventData
format](https://quix.io/docs/sdk/write.html#_writing_events) supports
traditional key-value pairs with a timestamp.

These formats let you work on any streaming data application, whether [event-
driven](/blog/what-why-how-of-event-driven-programming) apps, real-time IoT
data, images or audio.

### Easy to use

The best thing about the Quix SDK is that it’s straightforward. This is for
three reasons:

  * It’s written in C# with a natural language structure (read, write, open, close, etc.)
  * It takes care of many complex aspects of stream processing, such as the broker security configuration, authentication and authorization, message encryption, checkpointing and buffering. You don’t have to worry about them.
  * It supports any Python code. You can use any Python library, including NumPy, Scikit Learn, Flask, TensorFlow, etc. This enables any application like real-time machine learning and online training.

## Tutorial for stream processing with Python

We’ll look at just how easy it is to work with the Quix SDK. To demonstrate a
typical data streaming application, we’ll use a simple model that reads from
an input topic, processes the data, and writes to an output topic. The SDK
will help minimize the amount of code we need to write.  

### How to connect to Quix

First, you’ll need an instance of a `StreamingClient`. This is the main class
interface with the SDK, and you’ll use it to communicate with Topics.

These details are specific to each workspace. Using sample code from the Quix
library will be pre-filled with particular workspace, topic, and user
credentials needed to access the platform. This out-of-the-box feature saves
you time and hassle, so you don’t have to start from scratch each time you
start writing new project code.  

#### How to read data from a Kafka Topic

With an `INPUT_TOPIC_ID` representing an existing Topic, you can use the
`StreamingClient` object to fetch an `InputTopic` instance via the
`open_input_topic` method:

Passing a fixed value for a consumer group as the second argument allows
horizontal scalability. You can now use the `on_stream_received` event hook to
watch for the arrival of new data. Once you’re watching the event, it’s time
to initiate everything with the `start_reading` method:  

The callback that we set up for the event hook in the previous step takes the
following form:  

This callback function accepts a StreamReader instance, which provides
functionality for reading. To provide high performance, we can use the built-
in Buffer class to fetch data:  

The SDK provides a variety of configurations for this buffer so that you can
tune it to your exact needs. We have set the buffer to 100 milliseconds in the
code above, so you’ll get data in 100ms chunks.  

### How to process data on Kafka with Python

Whatever you do with your data is up to you — the Quix SDK makes it more
accessible. The SDK has native support for the popular
[pandas](https://pandas.pydata.org/) library, which makes data processing in
Python a breeze. The parameter data handler has the following signature:  

This example showcased the
[‘DataFrame’](https://pandas.pydata.org/docs/reference/frame.html) object,
which is helpful for Data Science and Machine Learning tasks.

This object represents a two-dimensional array of data, much like a table
containing rows and columns. The pandas library provides lots of functionality
to support data processing. This is a simple way of deriving new data based on
data you read from the input topic. For example, you can apply a function
along each row of the data:

### How to write processed data to a Kafka Topic

Using the `StreamingClient` helper, we can open an output topic in the same
way we opened an input topic:

Next, create a stream where you want to send data:  

Now, when processing data in `on_parameter_data_handler`, we can write the
modified data to an output stream. Each time we process an incoming
`DataFrame`, we’ll copy the entire “time” column, unchanged. We’ll also store
the result of our derived data in the output `DataFrame`:  

Note how we can write the `DataFrame` directly to the output topic’s stream.
The SDK covers all the minor details relating to type conversion, buffering,
etc.  

## Test stream processing with Python

Here’s the core code that we’ve detailed above, organized as it would be in a
real-world program. It demonstrates the simplicity of reading, processing, and
writing time-series data.  

This code purposefully omits specific details such as buffer configuration or
setting up a handler for the input stream closing. [A complete code example
can be found on GitHub](https://github.com/quixio/car-data-model).

Ready to try it for yourself? [Quix offers a free
trial](https://quix.io/signup), no credit card needed. Happy (Python) coding!
If you have any questions, join us in [Slack](http://quix.io/slack-invite)!






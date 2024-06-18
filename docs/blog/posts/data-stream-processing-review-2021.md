---
title: "ICYMI: The 7 most impactful stream processing insights of 2021"
date: 2023-07-13
authors: [kiersten-thamm]
slug: data-stream-processing-review-2021
description: >
  Dig into our most-read, most-shared content from 2021: our best data stream processing tutorials, explainers and research.
categories:
  - announcements
---

# ICYMI: The 7 most impactful stream processing insights of 2021

Dig into our most-read, most-shared content from 2021: our best data stream processing tutorials, explainers and research.

<!-- more -->

## Our best tutorials, explainers and stream processing research from 2021

You may already be backsliding on New Year’s resolutions, but it’s not too
late to do a “cleanse” … just close all the tabs you’ve left open, full of
articles you’ve been meaning to read. Your tabs can safely go away because
I’ve got you covered with a speedy, scannable digest of our best content from
2021.

Here at Quix, we’re writing a lot — explainers and tutorials and strategy
guides, oh my! — but we always take the time to look at data. It keeps us
pointed in the right direction.

I wanted to know:

  * What tutorials have been most helpful to our users?
  * Which explainers best answered your questions?
  * What insights from our stream processing market research were most intriguing?
  * What use cases were worth reading, top to bottom, with your morning coffee?

I’ve pulled highlights from our most popular and most shared content for you
below, with the posts summed up by the big questions they sought to answer.  

![Shiny colorful lines.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92145e7ffc183dd5fd903_Shiny-
colorful-lines.webp)

## How can you do real-time stream processing with Kafka and Python?

Python gets the most love from data scientists and other data-friendly
developers, but Python receives the cold shoulder when it comes to Kafka.

Our head of platform, Peter Nagy, dug into some of the burning questions
associated with this conundrum, including, “Why is a Python library needed for
Kafka?” and “Why can’t you use Python on Kafka?” (hint: with Quix, you can!).

This tutorial takes you through the basics and the benefits, including:

  * Processing data streams in real time
  * Enable your data scientists
  * Build reusable pipelines
  * Perform advanced processing with open source projects such as TensorFlow, NumPy, SciPy or Matplotlib.

Read more from Peter in [Real-time stream processing with Kafka and
Python](/blog/kafka-python-example).  

![Streaming data hard to handle image.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b923e4031bd8c2c2b2b335_Streaming-
data-hard-to-handle.webp)

## Why is streaming data so hard to handle?

Two things are complicated in the world of data: streaming architecture and
building projects that use machine learning. And the highest degree of
difficulty — the engineering equivalent of gymnast Simone Biles’s Yurchenko
double pike vault — combines these.

Tomas Neubauer, our chief technology officer, explains just what makes these
so tricky in terms a less-technical business leader can understand. With a
series of engaging analogies that ground an ephemeral technology in the real
world, he explains why organizations struggle with streaming data and how to
harness the power of this next-generation approach to data.  

> _Key quote: “Ease of use is not an issue for massive organizations. For the
> rest of us, it’s a nightmare.”_

**Key question:** Why aren’t the difficulties associated with streaming data
already solved?

**Key insight:** The people expected to transform industries with data science
and machine learning models are hampered by complex infrastructure. Putting
power back in their hands with Python and smart, simple packaging of the Kafka
broker means they can get from A to B to C faster, with fewer resources and
less hassle.

Read more from Tomas in [Why is streaming data so hard to handle?](/blog/why-
is-streaming-data-so-hard-to-handle)  

![Flink, Quix, Spark and Kafka icons.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b924eaef442a3dc0a0f8f5_Python-
library-best-for-stream-processing.webp)

## Which Python library is best for stream processing?

You’re probably considering the options if you’ve got a data stream processing
problem to solve. Apache Spark? (Spoiler: whole subreddits are devoted to the
frustrations created by Spark.) Apache Flink? (Difficult is as difficult
does.) Or another solution?  

> _“The problem with Apache Spark is that you only get one-third of the
> infrastructure you need to deploy a production-ready data streaming
> analytics solution.”_

Quix CEO Mike Rosam wrote an exhaustive report comparing Python stream
processing libraries to understand our marketplace and users’ frustrations. He
wasn’t the only one curious. This blog post gained sizable attention as we
revealed Quix’s performance head-to-head against the other platforms.

**Key findings:**

  * “The problem with Apache Spark is that you only get one-third of the infrastructure you need to deploy a production-ready data streaming analytics solution.”
  * “Flink is a 100% DIY solution, so there’s no easy way to start with a managed service. To successfully use Flink in production, you must invest serious resources […] estimate more than 18 months.”

Dive into Mike’s blog: [A very detailed comparison of Python stream processing
libraries](/blog/performance-limitations-python-client-libraries).  

![Python icon in desktop window.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92960b31916643ca878a1_Python-icon-
in-desktop-window.webp)

## How to use Python to process streaming data on the Kafka broker?

Why does anyone need stream processing? The simplest answer is that the volume
and velocity of data increase so rapidly that traditional database
architectures can’t keep pace.

Enter the Kafka message broker, which can process data in-memory — that is,
processing data in the pipeline as it flows in, rather than in the warehouse
after it’s stored. Quix eliminates the clunky ETL/ELT (extract, transform and
load) steps, delivering stream processing in Python, the language beloved by
data scientists and data engineers.

Steve Rosam, our developer advocate, takes you on a tutorial on data stream
processing in Python with the Quix SDK. This includes:

  * How to read data from a Kafka Topic
  * How to process data on Kafka with Python
  * How to write processed data to a Kafka Topic

Try out Steve’s tutorial: [Real-time stream processing with
Python](/blog/stream-processing-framework-for-python).  

![Quix vs Spark and Flink.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b929c2ef442a3dc0a6da44_Quix-vs-
Spark-and-Flink.webp)

## Which Python client library is best for data stream processing?

Quix CTO Tomas Neubauer conducted a head-to-head comparison of the client
libraries of Apache Spark, Apache Flink and Quix Streams (both Python and C#).
Through a series of tests, he defined “best” in four ways: performance,
scalability, ease of use and efficiency.

**Key takeaways:**

  * Data stream processing works faster and more efficiently on Quix compared to industry incumbents Apache Spark and Apache Flink. Quix was proven to be up to 50x more performant than these industry incumbents.
  * The Quix Streams Python library has 157% greater CPU efficiency than Spark but didn’t quite achieve the performance of Flink. This isn’t surprising because the PyFlink table API executes instructions in Java runtime.
  * The Quix Streams Python library is much more versatile than Flink, enabling the user to write any application, but the trade-off is some performance degradation.
  * Spark couldn’t handle high loads due to non-linear behavior caused by auto-scale features. Its performance reveals that Spark streaming doesn’t scale well.

Read Tomas’s results from the full test: [Benchmarking stream processing
client libraries.  
](/blog/compare-client-libraries-spark-flink-quix)

![Blurry blue light streak on black background.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92cf53d2721b99e543423_Shiny-
sparkling-lights.webp)

## How difficult is it to install and run stream processing on a Python client
library?

For developers just digging into the world of data stream processing, there
are lots of hidden potholes. Fortunately for you, Quix software architect Aleš
Saska hit a lot of them when he tested Spark and Flink and used Quix for
comparison.  

> _“It took me less than a day to run the tests on Quix, compared to multiple
> weeks to run them properly on Flink and Spark.”_

“It took me less than a day to run the tests on Quix, compared to multiple
weeks to run them properly on Flink and Spark,” he writes. “Both Quix and
Flink have their advantages, depending on your use case, but Flink is tough to
use and a 100% DIY solution. Considering efficiency (read: cost savings) and
the ease of use for setup and troubleshooting, I believe Quix is the
compelling choice.”

He adds, “It’s clear from the performance results that Apache Spark is a
library that just can’t handle the demands of real-time data stream
processing, while Databricks is expensive and difficult to use for stream
processing applications.”

Check out Aleš’s candid experience: [Implementing stream processing: My
experience using Python libraries](/blog/implementing-stream-processing-
python).  

![Group of people standing in a large building.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b925d5cb28e20392d65d81_Kafka-for-
real-time-stream-processing.webp)

## How does Kafka work? What makes it better than other brokers?

It’s time to get technical, but not with tutorials and code snippets. In this
post, Peter Nagy, our head of platform, dives deep into explaining Kafka in a
way that’s still accessible to business leaders who don’t spend their days
coding.

Peter answers a series of rapid-fire questions, including:

  * What makes Kafka different — and faster — than other data stream services?  
Is Kafka real time? Why is it so fast?

  * When should I use Kafka?
  * What are Kafka topics?
  * What are partitions?
  * What are consumer groups?
  * What can Kafka uniquely do that other message brokers cannot?

> _“A lot of companies hire data scientists for transformational projects.
> They give the data scientists access to their data set, then (womp, womp —
> sad trombone) the data set is useless, because it has been gathered or
> stored in a way that data scientists can’t easily use.”_

**Key takeaways:**

  * Kafka likes bite-size pieces. We found a way to cut up data, send it in efficient parcels and bring it back together at its destination, ready to go.
  * A lot of companies hire data scientists for transformational projects. They give the data scientists access to their data set, then (womp, womp — sad trombone) the data set is useless because it has been gathered or stored in a way that data scientists can’t easily use.

Peter explained that the Quix SDK includes a feature called “streams,” which
makes sense of the data flowing through Kafka by wrapping it into a business
context. That led to my favorite quote: “It’s possible to do this yourself by
building identifiers to parse your data stream, but I’d ask my fellow
developers, why would you want to? It’s a bit like growing your own cotton for
a T-shirt when your ultimate goal is to just get dressed and get on with your
day.”

Get all of your burning Kafka questions answered by Peter: [Set up Kafka for
real time stream processing in the real world.](/blog/set-up-kafka-for-real-
time-stream-processing)  

* * *

There were many more highlights from 2021 (hidden song lyrics throughout one
blog post, for example), including great use cases for stream processing. We
featured industry leaders that are at the forefront of stream processing
adoption such as Netflix, Goldman Sachs, Levis and John Deere. (Did you know
that the tractor company employs more software engineers than mechanical
engineers?)

If you’d like to stay on top of what’s happening, including product updates,
tutorials, case studies and stream processing industry news, sign up for our
newsletter and [join our Slack community.](http://quix.io/slack-invite)






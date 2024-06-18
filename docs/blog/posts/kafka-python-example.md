---
title: "Real time stream processing with Kafka and Python"
date: 2023-07-19
authors: [peter-nagy]
slug: kafka-python-example
description: >
  Start processing real-time data in Python in 10 minutes with Quix. This quick start guide with source code shows how. 
categories:
  - tutorials
---

# Real time stream processing with Kafka and Python

Start processing real-time data in Python in 10 minutes with Quix. This quick start guide with source code shows how. 

<!-- more -->

Python gets lots of love from data scientists and other data-friendly
developers, but Python receives the cold shoulder when it comes to Kafka. We
developed a short tutorial to help you start processing real-time data in
Python in just 10 minutes with Quix. This quick start guide with source code
shows how to use Quix’s Python library, serverless compute environment and
hosted Kafka infrastructure.  

## Why are there so many non-Python libraries for streaming data?

Software engineers initially developed streaming technologies for software
engineering applications, such as at LinkedIn, where it was developed
internally as a real-time backend to process very high volumes of interactions
between users. It aimed to solve a problem created by other message brokering
solutions such as Rabbit MQ, which could not scale while maintaining real-time
latency.

Since software engineers wrote Kafka’s client library (Kafka Streams) for
ultimate performance, they naturally wrote it in Java, a high-performance
software engineering language.

Kafka Streams supports Python, but it’s only suitable for software engineering
applications such as publishing, subscribing to messages on the broker, and
performing simple operations such as grouping and joining on the client.  

## Why is a Python library needed for Kafka?

In contrast to Java and Scala, Python is becoming very popular for Data
Science and machine learning (ML) because it’s easy to use and supported by a
massive community of open source frameworks to help with every aspect of data
processing.

Python has become popular because:

  * **Python is easy to learn and use:** It is one of the most accessible programming languages available to newcomers or beginners because of its simplified syntax. It emphasizes more on natural language.
  * **Python in data science and machine learning:** Python is a popular language for its data science capability. Its libraries, such as [NumPy](https://numpy.org/), [SciPy](https://www.scipy.org/), and [Matplotlib](https://matplotlib.org/), make it easy for data scientists to operate with their data and obtain definitive conclusions.
  * **Community and support:** Python has a mature community ranging from beginner to expert level, with plenty of documentation guides. This saves you a lot of time and effort on the initial development.
  * **Python flexibility:** The language allows the developers to try something new. Python is flexible because it is a primarily interpreted, weakly (or dynamically) typed language, allowing for rapid development (this can sometimes lead to bad practices, so watch out!).

## Why can’t you use Python on Kafka?

You actually can, but the two main libraries that support stream processing,
[Spark and Flink](/blog/compare-client-libraries-spark-flink-quix), are not
very Python-friendly. This makes life hard for data scientists who need to
grapple with their processing code and connect it to data streaming on the
broker.

Until now, one trade-off for ease of use has been performance, with many
organizations rewriting Python code into other languages like GO for
production implementations. This leads to a slow and discontinuous development
lifecycle. Quix fixed this problem by creating a user-friendly, high-
performance Python library for stream processing.  

## A Python and Kafka mini-tutorial

Quix provides a client library that supports working with streaming data in
Kafka using Python. The Quix Python library is easy to use and efficient,
processing up to 39 times more messages than Spark Streaming.

Let’s look at a mini-demo on integrating your external data source to Quix by
streaming data to Kafka using Python.  

### 1\. Write data to Quix

```py

r = requests.get('https://reqres.in/api/users')
x = r.json()
df = pandas.DataFrame(x['data'])

# Add TAG__ prefix to column email to use this column as a tag (index).
df = df.rename(columns={"email": "TAG__email"})

# Write data frame to output topic.
print("Writing data")
stream.parameters.write(df)
# note: setting up stream is ommitted for abbreviation

```

### 2\. Process the data with a simple model

```py

output_df = pandas.DataFrame()
output_df["time"] = df["time"]
output_df["IsCharles"] = df.apply(lambda row: "True" if row.first_name == "Charles" else "False", axis=1)

```

Using Quix, you can have a fully hosted data project up and running in minutes
instead of months or even years of development setup and at a fraction of the
cost.

To see how quickly you can get up and running, you can [sign up for a free
account](https://quix.io/signup) and see it for yourself. Take a look at the
Kafka-Python example library and start exploring by creating workspaces and
topics.

## Benefits of a native Python library for stream processing on Kafka

Data received in real time is referred to as streaming data because it flows
in as it is created. Data processed in real time is referred to as stream
processing. Combining the two is the next wave in the analytics and machine
learning landscape, as it allows organizations to build automated systems
through real-time analytics.

However, currently streaming data and stream processing are separate worlds. A
native Python library for stream processing on Kafka unifies them. The
benefits of this are:

  1. **Process data streams in real time:** Instantly take action on insights from real-time data streaming platforms like Kafka.
  2. **Enable your data scientists:** They become more self-sufficient throughout the development lifecycle by connecting to the broker to explore data, train models, deploy them to production, monitor them, and re-train them on new data quickly.
  3. **Build reusable pipelines:** Easily combine topics and deployments into a processing pipeline. Both data and models are reusable, so you can extend or replace processing steps effortlessly.
  4. **Perform advanced processing:** Use any open source project such as TensorFlow, NumPy, SciPy, or Matplotlib, making it easy to run machine learning models on streaming data.
  5. **Unlock the power of Python:** The standard Python library is enormous, so you will likely find all the functions needed for your task.

By combining the power of streaming from Kafka and easy-to-use code from
Python, you’ll be able to make the most of your data and empower your team of
data scientists. What’s more, by using Quix’s complete, ready-to-use platform,
you’ll also make the most of your development team’s time. The Kafka Python
example is just the tip of the iceberg, but it gives you a peek into the rapid
time to value this platform delivers.

If you’re as excited about Quix as we are, we’d love to hear from you. [Sign
up for a free Quix account](https://quix.io/signup), build an integration to
your data source and [join the Slack community](http://quix.io/slack-invite)
to say hello.




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



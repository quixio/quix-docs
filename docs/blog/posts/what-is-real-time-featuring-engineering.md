---
title: "What is real-time feature engineering?"
date: 2024-03-14
authors: [tun-shwe]
slug: what-is-real-time-featuring-engineering
description: >
  Pre-computing features for real-time machine learning reduces the precision of the insights you can draw from data streams. In this guide, we'll look at what real-time feature engineering is and show you a simple example of how you can do it yourself.
categories:
  - industry-insights
---

# What is real-time feature engineering?

Pre-computing features for real-time machine learning reduces the precision of the insights you can draw from data streams. In this guide, we'll look at what real-time feature engineering is and show you a simple example of how you can do it yourself.

<!-- more -->

Real-time machine learning can be transformative. Working with live data not
only enables timely analysis and predictions but also allows us to
incrementally adapt ML models in response to new data.__ But, like any form of
real-time computing, [real-time machine
learning](https://quix.io/blog/fundamentals-real-time-machine-learning) is
substantially more complex to execute than the batch equivalent.

If you’re looking to build a real-time [ML pipeline](https://quix.io/blog/the-
anatomy-of-a-machine-learning-pipeline), one aspect you’ll need to consider is
how to handle real-time feature engineering. In this article, we’ll look at
what real-time/online feature engineering is and how it differs from offline
feature engineering. We’ll also run through a simple, practical example that
you can build yourself.

Let’s start with the fundamentals before we get into real-time feature
engineering itself

## What is feature engineering?

The comparison between data and oil might be something of a cliche but it does
offer a useful analogy when it comes to feature engineering. Raw source data
occupies a similar role to crude oil. It meets its potential only after some
processing. In oil’s case, that’s refinement into gasoline, diesel, kerosene
and so on.

For data, the equivalent is feature engineering. Feature engineering follows
data cleaning and involves identifying meaningful, relevant and measurable
characteristics within raw data. Features are the columns in your table of
data, while the rows are individual instances of data.

We can illustrate it with a simple example. Let’s say your raw data comes from
a fleet of vehicles. Each vehicle reports its fuel efficiency once per minute.
Some vehicles report in miles per gallon, others in how many liters of fuel it
takes to travel 100 kilometers. Our feature engineering steps might be:

  1. **Unit conversion:** Pick a preferred unit. Let’s say litres per 100 km. During feature conversion, identify which units each vehicle is using to report fuel efficiency and then convert data reported in miles per gallon into liters per 100 km. 
  2. **Min-max scaling:** We know that some vehicles are inherently more efficient than others and it’s the same with different fuels. Removing that variation lets us analyse other factors, such as the impact of driving styles or weather on fuel consumption. With min-max scaling, we might use a range of 0 to 1 rather than the actual reported numbers, so as to provide a more level playing field.
  3. **Feature creation:** So far, we’ve prepared the data to make it easier to work with. We can also further enrich the data by creating entirely new features, such as calculating the daily average fuel consumption of each vehicle. Another example might be creating an average level of fuel consumption for specific routes or drivers.

If we were running a batch ML job over this data, then we’d use a snapshot of
this vehicle data to perform our feature engineering. That’s useful for pre-
computing predictions but what if we want to make real-time decisions? Quix’s
CEO, Mike, wrote a [primer on real-time machine
learning](https://quix.io/blog/fundamentals-real-time-machine-learning#what-
is-real-time-machine-learning) if you want a broader view, but here we’ll hone
in on real-time feature engineering.

## Understanding real-time feature engineering

Real-time feature engineering takes a stream of inbound data and then uses it
to extract and compute features at the moment a prediction request is made.
That’s in contrast to batch machine learning where we pre-compute features and
store them for later use.

Pre-computing ML features works well with static data or when real-time
processing is too resource-intensive. However, for data that changes
constantly and where the current context is important, computing features in
advance is not feasible.

In the case of our vehicle data example, each vehicle transmits readings via a
cellular connection. For real-time feature computation, we’d need the
following steps:

  1. **Ingestion:** Accept data from external real-time sources, such as our fleet of vehicles.
  2. **Transformation/feature engineering** : Transform inbound raw data on the fly into meaningful real-time features that our ML model can use. For example, the request might refer to our min-max scaled fuel efficiency numbers and our daily average consumption for each vehicle. Or we might use real-time contextual data, either provided as part of the request or from third-party sources. For example, we might adjust our target fuel efficiency readings according to current traffic data or temperature at the location of each vehicle.
  3. **Serve the request:** Immediately after the features are computed, deliver the requested data.
  4. **Store the features:** We might also choose to save the features we’ve computed for later re-use and analysis, such as in a fleet management dashboard. This is typically done using feature stores, which are specialized storage environments. There are two types of stores: online and offline stores. An offline feature store serves as a repository for precomputed features available for batch processes and extensive analysis. Meanwhile, an online store (or real-time feature store) provides immediate access to features for real-time applications.

## When to use real-time feature engineering

If you’re considering real-time feature engineering as part of your machine
learning infrastructure, you’ll need to carefully weigh the trade-offs and
assess your readiness. There are tools that will do some of the heavy lifting
for you and we’ll look at how you can use Quix shortly, but first, we should
consider some of the things you’ll need to bear in mind.

  * **Latency:** Your infrastructure must be up to the job of ingesting, processing and delivering data to downstream systems with as little latency as possible.
  * **Scalability:** Similarly, as data volumes and velocities increase, your real-time feature engineering pipeline must be able to scale to handle the load.
  * **Data quality:** Everything that you’d do in batch machine learning to clean and validate your inbound data still needs to happen, only now at real-time speeds.

### Real-time feature engineering use cases

Up until now, we've looked at feature engineering through the lens of vehicle
fleet data. But what other use cases lend themselves to real-time feature
engineering in particular? This question ties into the broader decisions you
need to make between real-time and batch machine learning but common scenarios
for real-time machine learning include:

  * **Fraud detection:**
    * **Why real-time?** Batch feature engineering relies on historical data and might miss recent behavioral shifts. Real-time feature engineering assesses risk using live data like location, transaction amounts and retailer types.  
    * **Example scenario:** Imagine someone visiting a new city for the day and making card purchases there. Real-time feature engineering can rapidly respond by computing a geofence feature that includes the new city. In contrast, batch processing might only recognize their usual locations, which could incorrectly trigger fraud alerts.
  * **Personalised recommendations:**
    * **Why real-time?** Tailoring product suggestions can be a useful way to increase transaction values and to help shoppers find what they need. However, an individual’s interests could change rapidly, depending on life events and how their needs change.
    * **Example scenario:** Someone who usually shops for casual clothing might switch to formal wear in anticipation of a professional event. Real-time feature engineering lets us compute item interaction rates as the person browses, rather than relying only on past behaviour and lets us make recommendations based both on current and past purchases. This is particularly relevant for infrequent visitors, where pre-computing features would be inefficient.
  * **Financial trading:**
    * **Why real-time?** Movements in financial markets can take place rapidly and with little warning. Rapid analysis makes it possible to anticipate changes and to react before the rest of the market catches on.
    * **Example scenario:** Ingesting trade data from crypto markets and automating the buying or selling of coins based on whether those trades indicate rises or falls in exchange rates.

## Practical real-time feature engineering example

Let’s use the trading bot example to explore one way of building real-time
feature pipelines. We can use real-time trading data from an API, such as
[Kraken’s trading API](https://www.kraken.com/en-gb/institutions/api), to
analyze trades as they’re made and identify profit opportunities.

However, the raw trading data by itself isn’t particularly helpful by itself.
To prepare it for analysis we’d need to build a real-time feature engineering
pipeline that takes the data from the Kraken API and computes the features our
model needs both at training time and at inference time.

### A three-step pipeline

As we saw earlier, our real-time feature pipeline has at least three steps:

  * **Ingestion:** The real-time trades from Kraken.
  * **Transformation:** The raw trading data needs to be transformed into meaningful features for our machine learning model. When we ingest the trade data, we could perform real-time feature engineering to push a buy/hold/sell recommendation to users who are subscribed to a particular stock or coin. In this case, though, we’re analysing the data in a dashboard and so we’ll store the computed features for late use. In this example, we’ll bucket trades into ten-second intervals to generate [Open-High-Low-Close](https://en.wikipedia.org/wiki/Open-high-low-close_chart) (OHLC) "candles," which we can then use to create trading signals in the dashboard.
  * **Storage:** Save the transformed features to a feature store for querying and building a candlestick chart.

In practice, each of these steps would run as separate services, perhaps in
Docker containers and we’d link them using a data streaming tool such as
Apache Kafka. That modularity is important because it lets us scale each step
of the process independently, with Kafka making sure each message gets to
where it needs to be.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65f3216034e9db05b0a6ecd3_image1.gif)

[_Image by Pau Labarta Bajo_](https://realworldml.xyz/)

But how do we build it in practice? One way is to use [Quix
Streams](https://github.com/quixio/quix-streams), which is an open source
library for building [stream processing](https://www.quix.io/blog/what-is-
stream-processing) applications in pure Python with Docker and Apache Kafka.
Quix Streams allows you to make use of the whole Python ecosystem and gives
you the power of stateful operations and [streaming
data](https://quix.io/blog/data-streaming-faq) transformation with [Streaming
DataFrames](https://quix.io/docs/quix-
streams/v2-0-latest/streamingdataframe.html).

### Implementing the pipeline with Quix Streams

To get started, clone the [GitHub repo](https://github.com/Paulescu/real-time-
data-pipelines-in-python) our friend [Pau Labarta
Bajo](https://realworldml.xyz/) made. The repository includes a [README
file](https://github.com/Paulescu/real-time-data-pipelines-in-
python/blob/main/README.md) with instructions for running the pipeline locally
with Quix Streams, including setting up necessary credentials and building the
Docker containers.

The example in the repo has three pipeline steps, each of them implemented in
Python in their own subdirectory:

  * **trade_producer (ingestion):** Reads the data from Kraken and pushes it into a Kafka topic
  * **trade_to_ohlc (transformation):** Transforms the raw trades into OHLC candles, which are commonly used to derive trading indicators and then pushes them to another Kafka topic
  * **ohlc_to_feature_store (destination):** Saves the final features in the [Hopsworks](https://www.hopsworks.ai/), a solution that can be used as an offline and online feature store.

We also have a containerized [Streamlit](https://streamlit.io/) dashboard that
fetches and plots these features in real time.

The transformation step is where our real-time feature engineering takes
place, so let’s look at it in more detail.

### Transformation step

Transforming real-time data in Quix is straightforward because it’s in pure
Python. If you're familiar with pandas or PySpark, you'll easily adapt to
adding, removing and transforming columns for real-time data with Quix
Streams’ Streaming DataFrames.

To transform raw trades into the OHLC ten-second candles we need, we use
stateful window operators. More precisely, we build [tumbling
windows](https://quix.io/docs/quix-streams/v2-0-latest/windowing.html) to
bucket the trades into ten-second, non-overlapping batches and then compute
bucket-level metrics, such as:

  * **Open:** The first price in the window.
  * **High:** The**** highest price in the window.
  * **Low:** The lowest price in the window.
  * **Close:** The last price in the window.

This way, we’re using Quix Streams to compute features in real time that our
model can use to make trading decisions based on data as it happens. That
should give us an edge when looking to make profitable trades.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65f321b56b86663b1739171a_image3.gif)

[_Image by Pau Labarta Bajo_](https://realworldml.xyz/)

### Try real-time feature engineering with Quix

Real-time feature engineering is an important step in getting the most value
out of real-time data sources for machine learning. You can build your own
real-time feature engineering pipeline using open source tools such as Quix
Streams. In fact, everything in our example repo is based on open source
tools, such as Kafka and Docker. If you are already managing a Kubernetes
cluster and Kafka message broker for your microservices, then you can deploy
your real-time feature pipeline there.

However, designing, building and operating that sort of infrastructure can
divert your engineering focus away from delivering the unique value of your
software if you don’t have a dedicated platform team. Quix Cloud takes care of
CI/CD and hosting your containerised Quix Streams workloads and saves you from
the complexities of infrastructure so that you can focus on building data
pipelines. [Sign up to get started for free
today](https://portal.platform.quix.io/self-sign-up).

‍




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



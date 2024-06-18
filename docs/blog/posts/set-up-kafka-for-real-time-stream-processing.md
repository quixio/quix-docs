---
title: "Kafka for real time stream processing in the real world"
date: 2023-07-19
authors: [peter-nagy]
slug: set-up-kafka-for-real-time-stream-processing
description: >
  Understand key Kafka concepts and how it delivers unparalleled speed and capabilities for real time data stream processing
categories:
  - industry-insights
---

# Kafka for real time stream processing in the real world

Understand key Kafka concepts and how it delivers unparalleled speed and capabilities for real time data stream processing

<!-- more -->

## What makes Kafka different — and faster — than other data stream services?

Kafka is a message broker, first invented by LinkedIn engineers to be used
internally and eventually spun off to create a widely used version with
additional support, backend and features. It aimed to solve a problem present
in other solutions for message brokering, such as
[RabbitMQ](https://quix.io/blog/apache-kafka-vs-rabbitmq-comparison), which
could not scale while maintaining real-time data processing.

Kafka’s protocol is a queue of data stored on a disk that enables multiple
services to read the same messages. It tracks who reads how much of the data
stream and even holds your place so you can come back to it.

In this post, I wanted to dig into common questions about Kafka to help fellow
engineers understand more about this technology and how to best handle it in
the real world.  

## Is Kafka real time?

This is almost an existential question, like “What is the meaning of life?” In
this case, we should ask, “What is real time?” The answer: it depends.

One second is the difference between a crash and a near miss if you’re driving
a car. In Olympic sports, a tenth or hundredth of a second can make the
difference in winning a medal. Kafka is lightning-fast: it blows one second
out of the water because you can harness a real-time data stream that’s one-
hundredth of one second — just ten milliseconds. For context, this is less
than the rate your monitor can refresh, so, therefore, is not detectable by
human standards.

The short answer? Yes, Kafka is as real time as you need it to be.  

## What are Kafka topics?

Imagine having a conversation with your best friend. You might catch up on
family, friends in common, sports and plans to meet up. Kafka topics are like
the elements of this conversation, specific themes or categories that allow
you to filter the mass of data from Kafka into only what’s relevant to your
needs.

This is important because, in its rush to deliver data quickly, Kafka doesn’t
discriminate between the mass of data in a topic — it sends everything. You
bring order to your data by defining topics and grouping certain kinds of data
in each context. This enables you to focus on only the information you’re
interested in, without all the noise.  

> _“Defining topics in Kafka enables you to focus on only the information
> you’re interested in, without all the noise.”_

You can set up hundreds or thousands of topics in Kafka, with varying degrees
of specificity. When you do this, think through how you name them so that you
(and the future forgetful you and your colleagues) can extract meaningful
insights later.  

## What are partitions?

A partition is a small segment of a topic. Partitions are a way of separating
who gets what information from a topic. This is useful both for reading and
writing on a topic.

One of the things that makes Kafka technology great is that you can use
partitions to scale Kafka horizontally within a cluster or scale your
processing horizontally. That means rather than reading and processing a topic
on a single machine, which could become overwhelmed, you can share the load
across multiple machines.

For example, an airport handles hundreds or thousands of planes each day and
thousands or even thousands of passengers. Topics could be “passenger
itineraries” and “luggage transfers,” while the partitions could be a subset
with specific itineraries.

The number of partitions you create should be greater than or equal to the
number of machines processing data. If you have two partitions and four
machines, two machines will process data while the other two effectively sit
idle. And there’s no point sending data in real time if you can’t process it
in real time.  

## What are consumer groups?

A consumer (also known as a subscriber) is anything listening to the topic or
partition of the data. In our airport example, an airline that wants to
consume data about the passengers who have purchased its tickets would listen
to the “ticket sales” topic.

Consumer groups can share the load of data in a topic. Without this
collaboration, each consumer has to read everything. Imagine a gate agent
having to read tickets from every passenger on the flight. You can use a
partition to separate the tickets into two piles, then add another gate agent
as a member of the consumer group, so each agent checks half of the tickets.
As a result, the tickets are processed faster, and the flight boards more
quickly. (Take a look at [this short
video](https://www.youtube.com/watch?v=7KdCf4ZCOqA) for more info on consumer
groups.)  

## Is Kafka overkill?

In some scenarios, Kafka can be overkill. But once an organization scales past
a specific throughput of events, Kafka starts to shine because it can still
provide the near real-time data delivery at scale.

RabbitMQ is an example of technology that can’t scale at the Kafka level. It
can do similar work to Kafka, but the consumers work differently — there are
differences in how you read and acknowledge data — and even if you’re okay
with the difference in acknowledgment, there will still be a limitation on
overall throughput.

## What can Kafka uniquely do that other message brokers cannot?

While many other systems use in-memory data processing, Kafka enables data
persistence, meaning that it can store messages for a defined period or a
defined volume. This allows you to configure the optimal hold time on the data
— such as 24 hours, or a threshold on total data storage.

  

> _“Kafka enables data persistence, so you can configure the optimal hold time
> for your data."_

When an event requires you to go back to the original data stream, if you have
defined a holding period of 24 hours for data persistence, you’ll be able to
go back in time to playback a day-old stream. Many other message queue systems
don’t keep data around. If you miss it, it’s gone for good.

Kafka also allows you to configure this data persistence by topic, a
significant advantage. As a result, you can select some topics to persist for
much longer than others. For example, suppose you have a lower-volume topic
that’s very important. In that case, you might limit its persistence to 100GB
of storage space (a massive amount in this context) to effectively persist
forever. Setting these limits is optional, but it’s still a good practice if
you like your sanity.  

## Why are streams used?

Kafka itself doesn’t have the concept of streams — its function is to take one
message or event and deliver it to all of the topic’s consumers. Kafka doesn’t
care whether the first and second messages it delivers belong together. They
could be as unrelated as “Flight 805 to Kona is departing” and “Mr. Kim’s
luggage just arrived in Portland.”  

![Horizontal scalability using Quix SDK.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be718ea1f629e06a39281a_PN-blog-
diagram.webp)

Horizontal scalability using Quix SDK

The Quix SDK includes a unique feature called “streams.” This makes sense of
the data flowing through Kafka by wrapping it into a context (more info on
this [in our docs](https://quix.io/docs/sdk/features/streaming-context.html)
and [on our YouTube channel](https://www.youtube.com/watch?v=xPDAAIQTATk)), so
you can group all messages related to Flight 805 or all messages associated
with Mr. Kim. It is possible to do this yourself by building identifiers to
parse your data stream, but I’d ask my fellow developers, why would you want
to? It’s like growing your own cotton for a T-shirt when your ultimate goal is
getting dressed and getting on with your day.

We created the Quix SDK to stream data efficiently, which improves overall
system performance. (I don’t want to steal my colleague Ales’s thunder, but
he’s seeing better performance from Quix than from other platforms — watch for
his blog post coming soon.) As a result, you don’t have to spend development
time setting up group contexts.  

> _“We found a way to cut up data, send it in efficient parcels, and bring it
> back together at its destination, ready to go.”_

One of the things Quix’s engineering team has learned as we developed our SDK
is that Kafka likes bite-size pieces. So we found a way to cut up data, send
it in parcels, and bring it back together at its destination, ready to go.
Quix does the [disassembly](https://quix.io/docs/sdk/features/message-
splitting.html), [shipping](https://quix.io/docs/sdk/features/data-
serialization.html) and reassembly for you — you get the benefit of increased
speed and efficiency from our transportation method.  

## Why is Kafka so fast?

Databases have their strengths, but real-time processing is not one of them.
The amount of money and infrastructure you’d have to throw at a database to
provide the speed and throughput equivalent to Kafka would be almost
unimaginable.

One of the reasons that Kafka is so fast is its architecture, built from the
ground up to sync with the kernel, its storage mechanism, and its horizontal
scaling capability. It blends in memory with persisted storage, enabling you
to process data much faster than writing it to your disk and then applying an
algorithm to that stored data.

Kafka can efficiently send chunks of data to the server and the client, and
it’s all configurable. At Quix, we’ve spent a lot of time optimizing this,
which requires hard-won expertise (which we got when working with streaming
live data from 45,000 parameters on Formula One cars) and infrastructure
engineering capabilities.  

## When should I use Kafka?

You should use Kafka if you have large-scale throughput, a need for data
persistence and/or replayability, or multiple consumers on a single topic.
With Kafka, you don’t have to limit yourself to a single consumer reading from
a topic because everyone has the opportunity to read the messages.

Contrast this with RabbitMQ, which only allows you to read messages once. Once
a message is acknowledged as read, no one else gets it, and it’s gone forever.  

## How will Kafka and streaming data evolve in the long term?

The further I look into the future, the more companies I believe will make
real-time data an essential part of their business. Companies always want to
consume more data and use it in new and exciting ways. A proliferation of
connected devices and IoT, coupled with improved networking infrastructure,
virtually assures us that managing data at scale is a problem that will never
go away.  

> _“Real time data will become increasingly important for those who want to
> take immediate action.”_

Real-time data will become increasingly crucial for those who want to take
immediate action. The value of data decreases over time, so organizations are
looking to data science as one solution by building machine learning models
capable of reacting to real-time data insights.

Unfortunately, many companies don’t know how to serve data in a format
friendly to data scientists. We’re seeing many companies hire data scientists
for transformational projects. They give the data scientists access to their
data set, then (womp, womp — sad trombone) the data set is useless, because it
has been gathered or stored in a way that data scientists can’t easily use.

If data scientists were chefs, and Kafka the supplier of ingredients (data),
the chefs would be furious if Kafka simply dumped all of the ingredients on
the kitchen floor, without containers to separate salt, sugar, flour and
spices. We wouldn’t be talking about cluster computing, but another kind of
cluster altogether.

At Quix, we’re working to bring some order to the mess of data Kafka so
speedily delivers and provide context. With the right infrastructure,
contextual streams, and topics and partitions to enable consumers to share the
load, we think real time, streaming data could be the magic ingredient for
transformational new products.

**Want to try Quix for yourself?** [Sign up for free, immediate
access](https://quix.io/signup) and tell me what you think in our [Slack
community](http://quix.io/slack-invite).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



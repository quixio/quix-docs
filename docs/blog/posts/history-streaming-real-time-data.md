---
title: "The (surprisingly) long history of streaming real-time data"
date: 2023-07-12
authors: [kiersten-thamm]
slug: history-streaming-real-time-data
description: >
  Streaming real-time data didn’t magically appear from nowhere. Its long history isn’t just fascinating — it’s full of familiar examples that your family can understand.
categories:
  - industry-insights
---

# The (surprisingly) long history of streaming real-time data

Streaming real-time data didn’t magically appear from nowhere. Its long history isn’t just fascinating — it’s full of familiar examples that your family can understand.

<!-- more -->

## Or, why Stream processing is essential to human existence

We often talk about [stream processing](https://www.quix.io/blog/what-is-
stream-processing) as a cutting-edge system — but is it? This post is likely
the shortest presentation of the surprisingly long history of stream
processing to explain why that history is imperative to the future of
technology.  

## Stream processing in the twenty-first century

Let’s start with what’s most familiar: Stream processing in the twenty-first
century. These events mark a few of the most significant occasions in recent
stream processing.

  * **2022:**[**The Stream Community**](https://thestream.community/)**started.** The welcoming, non-commercial group of developers, engineers and scientists began helping each other figure out the technology and implementation of stream processing in contemporary dashboards and applications.
  * **2011:**[**Apache Kafka is open sourced**](https://www.forbes.com/sites/stevenli1/2020/05/11/confluent-jay-kreps-kafka-4-billion-2020/?sh=f35bd50709dd)**.** The distributed event store and stream processing platform expanded its users from LinkedIn employees to anyone on the internet. Because it’s a unified, high-throughput, low-latency platform, it’s often the base infrastructure for streaming projects.
  * **2008: “**[**Millwheel: Fault-Tolerant Stream Processing at Internet Scale**](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41378.pdf)**” is published.** Employees working at Google released a paper about the framework for building low-latency data processing applications.
  * **2002: “**[**Models and Issues in Data Stream Systems**](https://dl.acm.org/doi/10.1145/543613.543615)**” is published.** The paper from researchers at Stanford defined a new model of “data processing that does not take the form of persistent relations, but rather arrives in multiple, continuous, rapid, time-varying data streams.”

These milestones mark the development and use of stream processing by tech
companies and associated research departments. But this isn’t the beginning of
stream processing.

To access earlier instances of the technology — a history I argue is more than
52,000 years old — we need to first agree on what we mean by stream
processing.  

## What is stream processing?

Companies and individuals have offered definitions of steam processing that
range in size from one sentence to one book.

I propose a simple definition. Stream processing is a system that ingests at
minimum one high-frequency flow of data, transforms that data in some way as
it arrives, and delivers it to a destination that either acts on it
immediately or stores it in a warehouse for later use.  

![Source transformation destination in three columns.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae99885e46a55766dba1fb_Source-
transformation-destination.webp)

Let’s see if that definition holds up by looking at a diagram of a non-
controversial project that all can agree is an example of stream processing.
(Please do [let me know](/community) if you disagree! 😊)

This non-controversial project is a Python service that monitors and analyzes
the sentiment of messages sent to a chat application.  

![Phone communication scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae99cf1c29d1411073b57f_Sentiment-
project-architecture.webp)

The process begins when someone sends a message to the chat application. The
first transformation built on a [HuggingFace](https://huggingface.co/) model
checks the message for abusive language. If it includes inappropriate words or
phrases, the service sends an alert to the writer’s phone, which lets them
know that their message won’t appear in the chat box due to harmful content.

Messages that aren’t abusive go through the sentiment analysis service and
appear in the chat box with markers indicating whether they are positive or
negative.

Each message is processed with a low-enough latency to keep the conversation
going. (There’s nothing worse than having regular five-minute breaks between
texts during a conversation, especially when it’s important or you can’t find
the television remote!)

It’s possible to expand this simple architecture into a more complex example
of stream processing if we apply the framework of source, transformation and
destination.  

![Source, transformation, destination communication scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9a27aef577f81951a20b_Phone-
communication-scheme-destination.webp)

If we changed the source from chat messages to tweets containing specific
hashtags, we could chart public sentiment toward cryptocurrency or particular
stocks. We could change the transformations to add a filter for blue check
marks or a specific language. Rather than a chat box, our destination could be
a database that powers an automated trading app.

But no matter how complex our example becomes, regardless of how many data
streams, nodes, consumers, producers, or clusters are involved, it could
always be broken down into source, transformation, and destination.

**Related reading:**[What is stream processing?](https://quix.io/blog/what-is-
stream-processing)  

## Stream processing before 50,000 BCE

![Horizontal blue line showing timeline.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9a720a9519cf99e19e0a_Stream-
processing-timeline.webp)

Although humans communicate in many ways — such as body language, gestures,
and facial expressions — let’s focus on auditory communication. And even more
specific, verbal communication.

Somewhere between two million years ago — the beginning of the human genus —
and 52,000 years ago, [humans began speaking to one
another](https://www.science.org/content/article/human-language-may-have-
evolved-help-our-ancestors-make-tools). Archaeologists and biologists haven’t
yet agreed on the specific point within this long period. Still, saying stream
processing has been around for more than 52,000 years is quite a claim.  

![Human stream processing illustration.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9abd75e1882ff9ac754f_Human-
stream-processing.webp)

Source: The person on the left is the source that contains the data in its
original state: ideas. Those ideas form a continual source of data that just
keeps going and going.

Transformation: The speaker is busy turning ideas into a speech so that other
humans can understand them. Although we could have a long conversation about
how to map data conventions onto speech, I’ll offer one proposal. We encode
ideas into a specific language, apply that language’s grammar as protocol, and
deliver it through the medium of soundwaves in the air.

Destination: The destination is the person or people who receive those encoded
ideas as they’re produced and decode them back into thoughts. We could also go
to a deeper level and discuss networks and synapses.  

## Stream processing is human

![Four gesture icons on white background.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9b06acb74d64f463580c_Stream-
processing-is-human.webp)

Most human activities involve real-time stream processing. Hearing, seeing,
touching, and moving rely on our understanding of the most up-to-date data,
processing it as it comes, and reacting to it — even if our bodies run these
systems without our conscious awareness.

Imagine going through an entire day with your eyes closed and taking a photo
every five minutes to look over and analyze at the end of the day. How would
it go if you relied on historical data to cross a street? Do you drink
outdated milk based on how it smelled two days ago?

This history of stream processing boils down to the fact that stream
processing is human. It’s not as foreign or confusing as it might seem. Next
time you sit down for a delicious holiday dinner and your cousin asks you to
explain stream processing between bites of bread, please use my analogy. You
don’t even need to credit me. 😉

Even within the tech sector, stream processing has a reputation for
overwhelming practitioners. At Quix, we don’t think it needs to be. Instead,
it’s a human concept that the right stack of integrated tools can address.
Microservices that address your sources, transformations and destinations help
you and your team navigate the process of building stream processing.

Challenges still may be significant — but not so scary.  

## Stream processing enables future technology to operate at the speed of
humans

This history of stream processing also explains why our future technology
needs stream processing to support human societies adequately. We’re bringing
more data-driven applications into our public and private lives, and, for
those products to keep up with us, they need to operate at our speed.






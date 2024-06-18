---
title: "What is real-time stream processing?"
date: 2023-07-19
authors: [steve-rosam]
slug: what-is-real-time-stream-processing
description: >
  You’ve probably heard the buzz about stream processing. You might’ve heard it referred to as event processing and you might’ve also heard about something called real-time analytics. Whilst each of these techniques has subtle differences, they’re all connected.
categories:
  - industry-insights
---

# What is real-time stream processing?

You’ve probably heard the buzz about stream processing. You might’ve heard it referred to as event processing and you might’ve also heard about something called real-time analytics. Whilst each of these techniques has subtle differences, they’re all connected.

<!-- more -->

## “Real-time stream processing” is the analysis of continuous data as soon as
it’s available

You’ve probably heard the buzz about [stream processing](/blog/stream-
processing-glossary). You might’ve heard it referred to as **event
processing,** and you might’ve also heard about something called **real-time
analytics**. While each of these techniques has subtle differences, they’re
all connected. They deal with a single important truth: greater understanding
can come from analyzing as much data as possible, as quickly as possible.

“Real-time stream processing” is a daunting term because it takes an already-
complicated concept — stream processing — and layers another on top. But take
the time to understand each part separately, and the whole becomes less
confusing:

  * “Real-time”: concerned with events taking place now, rather than yesterday or an hour ago
  * “Stream processing”: handling a continuous ‘stream’ of data, rather than working with a defined set of data, then stopping.

Companies that have never thought of themselves as “data handlers” (in the
world of GDPR) are acknowledging their role as data producers and consumers.
By identifying the nature of different data we work with, we can spot
opportunities for real-time processing. Many companies are already working
this way:

  * [Zillow uses Amazon Kinesis](https://aws.amazon.com/solutions/case-studies/zillow-zestimate/) to update home-value estimates in near-real-time.
  * [Pinterest uses Apache Kafka and the Kafka Streams API](https://medium.com/@Pinterest_Engineering/using-kafka-streams-api-for-predictive-budgeting-9f58d206c996) at a large scale to power the real-time, predictive budgeting system of their advertising infrastructure.
  * [Paypal uses Apache Kafka](https://www.youtube.com/watch?v=1loifCT4gTo) and machine learning to identify fraud amongst the 400 billion messages their systems stream daily.

## Real-time streaming in the real world

Take web analytics as an example of data processing. Since the early days of
the web, companies have adopted a ‘batch processing’ approach to analyzing
their site traffic. A traditional system looks like this:

  1. The user requests a page
  2. The web server records details in an access log
  3. Once per day, logs are consolidated and analyzed, with results possibly stored in a database
  4. At various points in time, the data is inspected, conclusions are drawn, and changes to the overall system are made

The problem with this approach is that it’s a one-size-fits-all solution. It
might help us respond retroactively to particular long-running concerns, such
as a specific page driving traffic away from our site. But it doesn’t help us
prevent that potential customer from leaving in the first place. We need
something more proactive.

Now imagine a real-time approach. Our visitor’s journey is analyzed as soon as
it begins, at each step. We discover she’s more likely to take a particular
action when prompted by a specific type of messaging, so our system tweaks
things ever-so-slightly to recommend more of that content. This all happens
behind the scenes; we don’t even need to be aware of it happening, although we
can get in and inspect the underlying data whenever we want.

  1. The user requests a page
  2. Data about the request and response is sent to a stream
  3. This data is immediately processed and used to influence the user journey

## Supporting real-time streaming

The challenge is moving from the old model is one of scale: processing vast
amounts of data in the most efficient manner is not an easy task. If data
processing takes too long, we risk losing the real-time nature. Real-time
stream processing systems tend to utilize certain technologies to help:

  * In-memory processing offers a considerable performance upgrade on disk-based storage, which is far slower. All data is stored in RAM, so it’s always quicker to read/write than on disk.
  * Outsourcing compute tasks to a third party allows a company to focus on data analysis. Cloud computing provides the luxury of not worrying about server upgrades, software compatibility, or other system administration tasks.

Processing data in real-time gives us an enormous, stable foundation on which
to grow. We can still gather together in a meeting room, pouring over our site
traffic to calibrate our website’s user experience. But we can also build
machine learning models to automate some of this analysis on the spot.

Quix is the first company to take this approach at scale by building a
platform as a service to offer both in-memory processing of real-time data and
on-demand compute infrastructure to enable companies to focus on going to
market quicker. The alternative requires large budgets to build teams to
architect, administrate, build, refine and ultimately bring to market the same
offering.  

## How else could we deal with it?

When it comes to dealing with data, we only really have three broad options:

  * Ignore it
  * Process it after the event (batch processing)
  * Process it in real-time

If we **ignore it** , our data go to waste, but at least we’re not spending
too much time understanding what makes our users tick or how we might serve
them better. Ignorance is bliss, right? Hopefully, you’ve already ruled out
this option!

As we’ve seen, **batch processing** can be suitable for some use cases, but it
often results in a slow, lumbering beast of an organization, not the nimble,
cunning creature we’d like to be. Batch processing will never allow us to
respond to our user’s demands as they come into being. If we only have a
fleeting relationship with a potential customer, what’s the use in
understanding them the next morning? They upped and left a long time ago.

**Micro-batch processing** is essentially batch-processing, but more
frequently, with smaller batches of data. It may be appropriate for some use
cases that don’t have real-time needs, as with batch-processings.

**Real-time processing** gives far more scope for automation and a continuous
feedback loop without human intervention. It is not a “one-size-fits-all”
solution if your data needs to be analyzed in greater context or if you have
huge datasets (PB scale).  

## Further reading

  * <https://www.confluent.io/learn/data-streaming/>
  * <https://hazelcast.com/blog/what-is-stream-processing-and-why-is-it-important-to-your-business/>
  * <https://aws.amazon.com/solutions/case-studies/zillow-zestimate/>
  * <https://www.precisely.com/blog/big-data/difference-between-real-time-near-real-time-batch-processing-big-data>

## Conclusion

If real-time stream processing is an unambiguously positive, why isn’t
everyone doing it? It turns out that such a process is not straightforward. It
requires domain expertise to set up, run, and maintain such an architecture.
Additionally, you will need in-house dedicated IT or SysOps resources. Even
using a pre-built platform such as Apache’s Kafka requires effort and
understanding.

Quix is a tool — like Kafka — which enables real-time stream processing. But
Quix sits on top of Kafka, simplifying the process as much as possible. Quix
leverages the power of data-streaming technologies, but it handles the
trickiest aspects of operation and configuration. Developers and Data
Scientists can spend their time focusing on model training or creating first-
class dashboards.

Using Quix, you can have a fully-hosted data project up and running in minutes
instead of a minimum of months or even years in some cases, and at a fraction
of the cost. And the quicker you can get streaming data processing set up, the
faster you can start exploring how your company’s wealth of data can be
exploited.

To see how quickly you can get up and running, you can [sign up for a free
account](https://quix.io/signup) and [ask questions in The Stream
community](http://quix.io/slack-invite).






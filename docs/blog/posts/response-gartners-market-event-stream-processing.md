---
title: "How to choose the right stream processing tools for every team"
date: 2023-07-12
authors: [mike-rosam]
slug: response-gartners-market-event-stream-processing
description: >
  Our CEO summarizes Gartner’s “Market Guide for Event Stream Processing” and offers guidance to business leaders navigating the market of data tools.
categories:
  - industry-insights
---

# How to choose the right stream processing tools for every team

Our CEO summarizes Gartner’s “Market Guide for Event Stream Processing” and offers guidance to business leaders navigating the market of data tools.

<!-- more -->

## What we learned from (and want to add to) Gartner’s “Market Guide for Event
Stream Processing”

To solve the right problems, you want the best possible tools. If your
business ingests and processes data that is always flowing in, you’re probably
looking for an event-stream processing solution.

Event-stream processing — also called data [stream processing](/blog/what-is-
stream-processing), time series data processing, in-memory processing and
real-time data processing — describes a large group of emerging technologies.
It’s easy to get lost in the new (and sometimes conflicting) terminology,
features and functions, which leaves many people wondering how to make the
correct tooling choice for their team.

I’m diving into a recent report by Gartner, the “[Market Guide for Event
Stream Processing](https://www.gartner.com/en/documents/4010467)” by W. Roy
Schulte, Pieter den Hamer and colleagues, to provide **three questions
business leaders should ask when modernizing their data and analytics
platforms**.  

## How are companies using event-stream processing?

Gartner reports that about two-thirds of companies currently use event-stream
processing (ESP) for real-time stream analytics. They’re processing the data
they have to drive dashboards for business intelligence, and to make
decisions, trigger actions and automation, or provide greater product
capabilities. [More use cases exist across sectors, including finance,
mobility and ecommerce](/use-cases).

The other one-third of companies use it for data engineering purposes, called
stream data integration, such as ingesting and storing data for future use or
analysis.

We think both of these categories of use cases are important for
organizations. Whether using data immediately or processing it to make it more
useful in later analysis, event-stream processing helps to calm the chaos of
ever-increasing data.  

## What are the options to adopt event-stream processing technology?

Gartner puts event-stream processing solutions into four categories, noting
that more than half of ESP platform products are open source or open core.

Four categories of event-stream processing solutions

  * Community-supported open source
  * Vendor-supported open core
  * Proprietary ESP platforms
  * Stream data integration platforms

The most accessible event-stream processing solutions are open source projects
such as Apache Flink, Apache Spark Streaming and Apache Kafka Streams. But
these aren’t products that can be used off the shelf. The DIY component
inherent in using any open source project puts a lot of pressure on the
adopting organization to integrate, package and test it. In short, you’ll need
teams of sophisticated people capable of implementing open source components.

On the other end of the spectrum is buying a proprietary streaming platform
from a vendor. These are typically heavy-duty industrial platforms — Gartner
lists Hitachi Streaming Data Platform, IBM Streams, Microsoft Azure Stream
Analytics and StreamInsight, as well as products by Oracle, SAP, SAS, Software
AG and TIBCO.

The problem with these all-in-one solutions is that you can’t access them
without a massive enterprise commitment. You can’t kick the tires. They’re
built so that only a few specialized people can use them — leaving out most of
a team. And legacy systems are unlikely to deliver a good developer
experience, which can impact productivity and retention.

Between the proprietary solutions and the community open source projects are
vendor-supported, open-core products. Examples include Amazon Kinesis, Axual’s
KSML, Cloudera DataFlow, Confluent ksqlDB, and offerings from EsperTech,
Google, Lenses.io, Lightbend and VMware.

These options focus largely on the same persona: software engineers. While
software engineers work comfortably in Java, Scala and SQL, these languages
exclude other personas in your business, including the people who could most
benefit from (and benefit your business by) having access to streaming data.

Data scientists, mechanical engineers and product designers typically work in
Python, the most widely used code language in the world. Still, they can’t
access streaming data except through IT or data engineers with these options.

We think there’s a market gap between the big-industry-oriented proprietary
ESP platforms, the DIY-heavy open source projects, and the software-oriented,
vendor-supported open core options. [And that’s why we built
Quix](/blog/release-pipeline-open-source-library).  

## How difficult is it to adopt event-stream processing technology?

The decision to upgrade your capabilities for ingesting and analyzing data
with stream processing might come down to a question of what engineering
resources you have and how much you’re willing to expend.

Event-stream processing relies on a minimum of three innovative technologies:
container technology like Kubernetes, a message broker like Kafka and stream
processing capability provided by the likes of Spark or Flink. Unlike
databases, which have been around for decades and are now highly commoditized,
stream processing is new enough that it requires a great deal of orchestration
services to make these three complex technologies play nicely together. This
is where a lot of companies get stuck.

At first, lured in by the price tag, companies think it’s realistic to
approach stream processing as a DIY project. They can often solve part of
their problems with the hyperscalers, such as AWS, GCP or Azure for cloud
infrastructure. But this approach can still trip up inexperienced or small
teams.

Orchestration and observability are essential, but they’re not readily
available in the market in an a la carte fashion. These capabilities might be
embedded in an industrial application, but proprietary ESP platforms come with
dependencies and generally prevent you from choosing your infrastructure and
configurations.

This is where Quix sees the market gap. By providing an easy-to-install, easy-
to-use tool for workflow, orchestration and observability, Quix makes it
possible to get the benefits of vendor packaging without vendor lock-in. With
Quix, [companies can choose their infrastructure and install composable
microservices at will](/product).  

## What are the business requirements for event stream processing?

Now, let’s talk about the drivers that fuel the rapid adoption of event-stream
processing and what you should consider before adopting it.

####

#### Event stream processing reduces latency

Do you need real-time access? What does real time mean to you? Some
definitions of real time are near-instantaneous, quantified in microseconds or
milliseconds. Other “business real-time” definitions, such as Gartner’s, put
the window at up to 15 minutes of latency.

For products built on a near-instant need for real-time responses and results
— such as IoT devices, ML-driven automation for fault detection and self-
healing, or digital interactions with customers — millisecond latency can make
the difference in conversions and revenue. You can read for yourself how
[reducing latency impacted revenue for Booking.com and other
brands](/blog/reduce-latency-with-stream-processing).

#### Processing logic requires better workflow transparency

Following the logic associated with a sequence of complex data transformations
can be difficult. This is where workflows can accelerate your team’s
productivity in a big way. With tools to visually represent your data
pipeline, data teams can follow the logic and change or debug it.

While team members without DevOps skills might want to deploy microservices
and chain them together in a data pipeline, they typically don’t have the
skill set to accomplish this alone. Your options are to replace them or give
them better tooling to work in a cloud environment to build the data
topologies (multi-stage processing pipelines) they need.

Quix’s stream processing workflow — develop, test and deploy — encapsulates
DevOps in a product user experience that delivers software engineering best
practices to empower your whole data team.

#### Traditional database solutions fail to scale

The ever-increasing volume and velocity of data flowing into organizations
from digital and connected products has pushed [many traditional batch- and
database-centric methods](/blog/3-paradigm-shifts-in-streaming-data-
processing) of ingesting and analytics past their breaking point.  

> _“To make the right decision on event-stream processing, business leaders
> must consider how much data they need to ingest and process now — and how
> well the solution can scale in the future.”_

The old data architecture pattern of (ingest) → (store) → (clean) → (analyze)
→ (act) must be replaced by (process while ingesting) → (act automatically) →
(store what’s needed). But even some streaming technologies like Apache Spark
can’t handle massive scale. In our test, [Spark couldn’t scale beyond 133,000
messages per second](/blog/compare-client-libraries-spark-flink-quix).

To make the right decision on event-stream processing, business leaders must
consider how much data they need to ingest and process now — and how well the
solution can scale in the future.  

## What types of data benefit from event-stream processing?

As we’ve introduced Quix to the market, we’ve occasionally heard business
leaders say, “Oh, I don’t have time-series data.” But any dataset that records
events as they happen with a time stamp is a candidate for event-stream
processing.

Event-stream processing benefits any product that uses data-in-motion, a term
that refers to data that enters a dataset as it’s created to expand the set
continuously. (The opposite is data-at-rest architecture, which only functions
with a closed dataset.)

Event-stream processing focuses on data-in-motion with event-driven design.
It’s intended to handle a chain of events that happen after an action occurs.
This gets tricky when hundreds (or thousands) of event streams are coming in,
and each needs to be separately managed in its own business context. An
example of this is a large bank that must track and even predict customer
interactions while always keeping each customer’s data and activity separated
from other customers.  

> _“Businesses that master event-stream processing to immediately analyze
> what’s happening with their customers and the market and to automate actions
> that deliver exceptional customer experiences will emerge with a massive
> competitive advantage.”_

Event streams aren’t consistent. They aren’t tidy. They can come out of order
or with faults and changes. And they’re constantly pinging across various
devices, clouds, caches and compute resources. Managing these data streams and
ensuring actions trigger the right reaction is an essential business function.

Businesses that master event-stream processing to immediately analyze what’s
happening with their customers and the market and to automate actions that
deliver exceptional customer experiences will emerge with a massive
competitive advantage.  

## What if my business isn’t ready for a major digital or data architecture
transformation?

While leading systems integrators and consultancies are currently implementing
event-stream processing for customers on contracts worth tens of millions of
dollars, massive projects like those aren’t always a good fit for startups,
scaleups or enterprises attached to certain legacy systems.

What’s more, it’s entirely possible that only a small portion of a large
company’s data and engineering team requires event-stream processing for its
work.

Adopting open source projects will require a huge investment in DIY components
while adopting a proprietary enterprise platform requires a massive contract
and monetary investment. But the middle ground between these, an open-core
platform provided by a vendor, can deliver the benefits of managed and
packaged services without huge costs or vendor lock-in.

Quix doubles down on this market space by providing an [online integrated
development environment (IDE)](/blog/release-stream-processing-online-ide)
that enables companies to spin up separate R&D sandboxes for individuals or
teams without endangering production workloads — and without a massive
investment.

This no-risk experimentation can drive innovation because the cost of trying
new things is just a few hundred dollars rather than a few million. It also
enables companies to experiment using event-stream processing without
retooling their entire organization around a project.

Businesses might also be hesitant to jump into event-stream processing due to
their underlying infrastructure and the contracts and systems that effectively
cement them in place. But by separating the business logic and code from the
infrastructure layer (which Quix does with its workflow tooling), teams can
move forward with event streaming and run on any current or future
infrastructure technology. It’s another benefit to business agility.  

## What’s next in event-stream processing?

While the Gartner market report endeavors to cover the existing landscape
(which, as we’ve seen, has quite a lot of open market opportunities), we’re
always thinking about the next thing. We’re focused on where our customers are
today and where they’re going in the future.

A big topic missing from the discussion is streaming data products. These are
digital products and devices built on top of the new capabilities created by
streaming data. It includes IoT and connected devices, from cars to scooters
to consumer wearables. These generate an enormous volume of raw, time-series
and [telemetry data](/blog/telemetry-data-explained).

While hundreds of companies are innovating to create new Things in IoT, they
all report difficulties enabling these Things with streaming data. Working
with streaming data should be as simple as an engineer using a database to
build an application. It should be business as usual.

Domain-driven design — the breakup of monoliths into microservices — and
event-driven design will also come to the forefront as we see more companies
rearchitect around event-stream processing.

We believe breaking data pipelines down into smaller, functional modules (many
attached to microservices) will ultimately yield cleaner, more reusable and
composable code.

Lastly, while I’ve mentioned the democratization of data above, I can’t
emphasize enough how critical it will be for companies to open greater data
access for their teams. Quix chose to focus our platform on Python users
because it’s the most-used and best-loved language and has become the
preferred language of data scientists, physicists, chemists and engineers of
all kinds. Yet, despite its popularity, vendors largely ignore Python. Indeed,
there’s only one mention of Python in Gartner’s entire 17-page report.

If you’re considering using stream processing in your business, [talk to a
technical
expert](https://share.hsforms.com/1iW0TmZzKQMChk0lxd_tGiw4yjw2?__hstc=175542013.47788df652e6c40c4f592430dcaa100f.1686578338159.1689156848129.1689164747617.14&__hssc=175542013.8.1689164747617&__hsfp=524412920)
about your use case. [Or join The Stream community](http://quix.io/slack-
invite), where you’ll find allies working on all kinds of event-processing
projects.






---
title: "Reliable data products start with resilient data processing"
date: 2023-07-13
authors: [mike-rosam]
slug: resilient-stream-processing
description: >
  How to make data processing more resilient for mission-critical applications: it starts with better (and easier to manage) data pipelines.
categories:
  - industry-insights
---

# Reliable data products start with resilient data processing

How to make data processing more resilient for mission-critical applications: it starts with better (and easier to manage) data pipelines.

<!-- more -->

## How to make data processing more resilient for mission-critical
applications

How much is your data worth? It might be worth more than your entire company,
writes Douglas B. Laney in the Forbes article, “[Your Company’s Data May Be
Worth More Than Your
Company.](https://www.forbes.com/sites/douglaslaney/2020/07/22/your-companys-
data-may-be-worth-more-than-your-company/?sh=3ba0b7d2634c)” Laney, the data &
analytics strategy innovation fellow at West Monroe, cites third-party
appraisals that set the value of United Airlines and American Airlines
customer data at more than double the airlines’ market cap.

Data drives decisions, enables [personalization](/blog/stream-processing-use-
case-personalization) and [trains the machine learning models](/blog/data-
science-mobility-tutorial) behind mission-critical applications. Applications
and products that react to events in real time — self-driving cars, heart
monitors, flight bookings, and more — require a reliable data flow to function
correctly.

When data is critical to your business, you can’t afford for data processing
to break down. Reliable data products need resilient data processing to ensure
that mission-critical data is never lost or interrupted.  

## Resilient data processing is vital to data products

Data that are lost or left unprocessed can have a devastating impact. Think
about the disruptions caused when Facebook, AWS or Slack go down. Or take the
example of an application designed to [monitor electrocardiogram (ECG)
signals](https://granules.cs.colostate.edu/papers/FailureResilient-EEGv7.pdf)
for sudden changes that could signal a heart attack. If the data stream is
interrupted, an erroneous heart attack alert might be generated, or the
warning signs could be missed.

The same logic applies to products that use data to monitor machinery,
[optimize processes](/blog/network-connectivity-and-resiliency) or [detect
behaviors associated with fraud](/blog/fraud-detection-case-study) or [cyber
attacks](/blog/cyber-security-machine-learning-ai). These applications don’t
just rely on data; they rely on a stream of real-time data. It’s hard to trust
a system that cries wolf due to inconsistencies in data processing.  

> _“Resilient data processing is vital to building trust for the end user.
> It’s also critical to the development of data products.”_

Resilient data processing is vital to building trust for the end user. It’s
also critical to the development of data products. Imagine how frustrating it
is to create a game-changing application only to be stymied by the challenge
of reliably getting data into your application?  

## Building a resilient data infrastructure becomes more important (and more
complicated) as data streams in faster

The volume of data streaming into companies and the potential to process that
data in real time open up opportunities and introduce new challenges. The
faster data streams into a system, the more data will be lost if that system
fails and the more challenging it becomes to process that data in real time.  

> _“5G networks promise better flow from the edge, but companies need equally
> powerful and resilient data architecture to reap the full benefits of
> network improvements.”_

5G networks promise better flow from the edge, but companies need equally
robust and resilient data architecture to reap the full benefits of network
improvements. Most companies lack the resources to reliably build or assemble
these sophisticated new data tools in-house.

Building and maintaining a reliable stream processing system requires
experienced developers or a big learning curve. You can read more about [why
streaming data is so challenging here](/blog/why-is-streaming-data-so-hard-to-
handle). Unfortunately, data is a risky place to fail forward. This is where
Quix comes in.  

## The stream processing solution built for resilience

We built Quix to take the complexity out of stream processing so that data
teams and citizen developers can build data products and manage their data
pipelines with confidence. My thought was, **“I want to build a system where I
know it won’t fail.”**

That’s why Quix is built for resiliency.

We started by choosing Kafka as the message broker. Kafka stores data in
memory using multiple nodes to provide a distributed persistence layer for
resiliency. This prevents your data from being lost. Then we built redundancy
into the data processing layer (built with Kubernetes) to ensure that the data
is processed without duplicating or missing a single data point.

Individually, Kafka and Kubernetes are notoriously difficult to configure and
maintain. Things like rebalancing, reconnections, partitioning, and
replication can threaten data flow. Quix manages all this complexity so that
our customers can focus on building data products that work every time with no
data interruptions.

With Quix, you don’t have to worry about building a reliable real-time stream
processing system. We’ve done it already and made it easy to use. You can
[learn about the technical details in our
documentation](https://quix.io/docs/sdk/introduction.html).  

## Control puts Quix to the test with high-speed data

Let’s look at [how Control, a telemetry company specializing in race car data
connectivity, uses Quix](/blog/network-connectivity-and-resiliency). When a
car is zooming around the track, every millisecond counts. Race cars are
outfitted with hundreds of sensors that enable engineers to monitor the car
and optimize performance.  

![Control Porsche Le Mans.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b9195ad09c0bceba9bf295_Control-
Porsche-Le-Mans.webp)

Control provides modems that ensure data flows seamlessly from the devices on
the car to remote race engineers. These modems automatically switch between
cell towers during the race to optimize data flow. Before a race, Control
engineers would configure the modems based on historical data for that
specific track, but historical data can’t factor in the changing conditions
during a race.

Using real-time data would give Control’s modems an edge. The engineers could
deploy a machine learning model that would automatically detect network
performance in real time and optimize connectivity by automatically updating
the device configuration. The problem is that machine learning models can take
months or even years to deploy.

Fortunately, this is the type of roadblock Quix helps companies speed through.
With Quix’s production-ready stream processing platform, Control quickly
built, trained, tested and deployed a fast and resilient ML system.

More precisely, in just two weeks, Control built 82 machine learning models —
one for each venue and transmission mode. This saved a considerable amount of
engineering resources and ensures each customer has the best possible service
every time they go to the track.

“The lightbulb moment happened when we realized how resilient Quix is.
Reliability is a major consideration when building mission-critical products.
We’ve automated a new product feature and Quix’s resilient architecture gives
us confidence it won’t fail,” said Nathan Sanders, technical director and
founder of Control.

Quix enables domain experts such as the engineers at Control to build data
products without worrying about the complexities of data infrastructure. And
Quix technical experts supported this significant leap forward. If you’re
thinking about how to better manage your data pipelines for improved speed and
resiliency, [book a chat](https://calendly.com/clara-quix/30min) or [join our
Slack community](http://quix.io/slack-invite) to talk with us.






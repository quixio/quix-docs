---
title: "Data pipelines done right at the Kafka Summit 2022"
date: 2023-07-12
authors: [kiersten-thamm]
slug: kafka-summit-2022-streaming-data
description: >
  Companies building the modern data stack gathered this week to discuss the challenges, shortcuts and benefits of stream processing. Here’s what you need to know.
categories:
  - industry-insights
---

# Data pipelines done right at the Kafka Summit 2022

Companies building the modern data stack gathered this week to discuss the challenges, shortcuts and benefits of stream processing. Here’s what you need to know.

<!-- more -->

## “Kafka is necessary but not sufficient”: valuable insights on streaming
strategies

Today marks the second and final day of the [Kafka Summit](https://www.kafka-
summit.org/), a conference that gathers the Apache Kafka® community to discuss
code, share best practices and explore the future of streaming data with the
Kafka ecosystem at its center. As Confluent CEO Jay Kreps states, “Kafka is
necessary but not sufficient.”

For people and companies to get the most significant value from data, the
Kafka ecosystem needs to include a wide range of tools built on five core
principles: **streaming** , **decentralization** , **declaration** ,
**developer orientation** , and **observation**.

This post explains these five principles, why they’re valuable and how to
apply them to your projects, according to Kreps and other speakers at the
Kafka Summit.  

## Streaming: it’s not the “faster horse” of batch processing

Humans exist in an unstable reality. Nothing stands still at a cellular level,
not even for a nanosecond. Even a few steps up from the cellular level, humans
continuously process data without latency; it’s a necessary ability for
crossing a street or deciding whether or not to drink that next beer. Kreps
argues that this is the first reason we need stream processing. Streaming
operates at nearly the same speed as its end users, which allows the data
applications that rely on it to have a more considerable real-world impact.  

![Three people talking on a stage.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9c498d4a9a326fe6f3ac_Kafka-in-
space-summit.webp)

Enabling products and teams to respond to data immediately can save lives.
[Michael Debouver](https://www.kafka-summit.org/sessions/kafka-in-space), a
cloud architect at Airbus, shows how his team built a streaming architecture
that ingests, moves and makes sense of satellite data during an environmental
catastrophe — without internet or a few seconds of lag. You can read about
additional examples of how stream processing is applied to help save lives
here: “[Data for good.](/blog/big-data-for-public-good)”

It’s important to distinguish between streaming and batch processing within
this principle. Indeed, the event-based foundation of batch processing is
conceptually incongruent with how humans operate in continuous motion. Kreps
offers the analogy of the automobile industry to explain the difference
between streaming and batch. He shares a phrase often misattributed to Henry
Ford: “[If I had asked people what they wanted, they would have said faster
horses.](https://hbr.org/2011/08/henry-ford-never-said-the-fast)” The point
is: rather than starting a business to raise faster horses, Henry Ford
organized a company that mass manufactured automobiles. He solved the base
challenge by changing his approach.  

## Decentralization: the power of microservices

Decentralization in the form of microservices allows for the production of
complex data applications. A centralized data warehouse and conventional ETL
workflows aren’t feasible for products that ingest from myriad sources,
transform and connect data in various exchanges and deliver in multiple ways.
Microservices lets you and your team orchestrate data tasks using a modern
data stack that accounts for the specificity of your project.

Kafka can anchor streaming architecture and replace database-centric design.
[Soby Chacko](https://www.kafka-summit.org/sessions/walking-through-the-
spring-stack-for-apache-kafka), a software engineer at VMware, presented
common stacks for various use cases and the questions people should ask when
deciding how services should speak to each other. The tradeoffs of each option
typically come down to your priorities between ease of use, speed of
connection and scale of data.  

## Declaration, otherwise known as simplicity

The principle of declaration suggests that everything we build should do what
it says it does in logically consistent ways. [Danica Fine](https://www.kafka-
summit.org/sessions/practical-pipelines-a-houseplant-soil-alerting-system-
with-ksqldb), a senior developer advocate for Confluent, exemplified this
principle in her talk, “Practical Pipelines: A Houseplant Soil Alerting System
with ksqlDB.” She presented an eloquent solution for ingesting and
transforming moisture and temperature readings from her house plants using a
system based on a Raspberry Pi, Kafka and Telegram. It’s a simple design for a
simple (and familiar) task, demonstrating that no job is too small for a
streaming solution.  

![People attending a presentation.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ae9c90136790cbb085ea1d_People-
attending-a-presentation.webp)

## Developer orientation: building for first users

The developer-orientation principle refers to the need to build tools that
developers enjoy using. Modern tools should prioritize the people who use them
the most. Kreps says that creates three guides:

  * **Code is sovereign:** New tools need to fit into and expand existing language ecosystems.
  * **Open platforms win:** Services must seamlessly connect and easily communicate because there’s a large community working, building, and improving tools and products. Open source projects do this on an even larger scale.
  * **Development is about evolution:** Digital products are never finished. That’s their beauty — you can continually improve, grow, and split them. Tools that work with rather than against this fact will expedite development.

## Observation: happy balance between use and security

Last but definitively not least: Observation. This principle refers to the
need for systems that allow for monitoring for governance. It’s the ability to
maintain data security while getting the most value out of the data collected.
Confluent addresses this need with its catalog of data streams, schemas and
lineage. These tools let you observe your data as it flows.  

## Add a strong community, and you’ve got it!

These technologies and application principles work only as well as those who
build and embrace them. Kreps says, “Interaction makes the Kafka community
vibrant.” The Kafka community is, indeed, vibrant — both in-person and
globally. He reports that more than 100,000 organizations use Kafka, and at
least 41,000 people attended Kafka meetups last year. The Quix team certainly
enjoyed the [unofficial conference run](https://rmoff.net/2022/04/05/the-
unofficial-kafka-summit-london-2022-run/walk/), smart presentations, great
conversations in the exhibition hall and magic tricks during the evening
reception.

The Kafka community is expansive. But the stream processing community is even
larger. Quix is thrilled to support the growth of a larger community around
streaming, not just including Kafka. Meetup, keep in touch and get your
questions answered with The Stream.






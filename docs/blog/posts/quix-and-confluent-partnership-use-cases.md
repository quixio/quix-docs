---
title: "Unlocking new use cases: Quix and Confluent partnership"
date: 2023-07-19
authors: [mike-rosam]
slug: quix-and-confluent-partnership-use-cases
description: >
  Explore the AI applications that you can build when connecting Quix with Confluent.
categories:
  - ecosystem
---

# Unlocking new use cases: Quix and Confluent partnership

Explore the AI applications that you can build when connecting Quix with Confluent.

<!-- more -->

Quix is excited to announce it has joined the [Connect with Confluent partner
program](/blog/quix-and-confluent-partnership). This new program helps you
accelerate the development of real-time applications through a native
integration with [Confluent Cloud](https://www.confluent.io/confluent-cloud/).
You now have the best experience for working with data streams within Quix,
paving a faster path to powering next generation customer experiences and
business operations with real-time data.

What kind of applications can you build when you connect your machine learning
teams to real-time data streams in Kafka? Let’s take a look at some production
use cases including [two winners in Confluent’s](https://www.confluent.io/en-
gb/blog/current-2022-event-recap/) inaugural Streaming Data Awards from
Current 2022.

## Optimise cellular networks with machine learning

[Control won the Startup
Award](https://www.datastreamingawards.io/winners/control) for their use of
streaming data to build, test and serve a [real-time machine learning pipeline
on Quix](/blog/network-connectivity-and-resiliency).

The application monitors network performance to automatically optimise quality
of service for each device connected to the cellular network.

The team were able to collect high quality data from vehicles, then train and
test machine learning models, before serving them to production. The end
result was a system that helps Control avoid up to 23% performance
degradation.

> "The lightbulb moment happened when we realised how resilient Quix is. We’ve
> automated a new product feature and Quix’s architecture gives us confidence
> it won’t fail."

> **Nathan Sanders, Technical Director and Founder of Control**

## Manage patient health with machine learning

[Ademen won the Innovation
Award](https://www.datastreamingawards.io/winners/ademen) for developing a
smart stethoscope that uses [high-frequency streaming data and real-time data
processing to connect patients to remote doctors](/blog/case-study-ademen-
smart-stethoscope).

The app uses digital signal processing and data science models to analyse
audio data in real-time. The pattern recognition technology is employed to
determine information about the heart, lungs, bowel, and, in some instances,
blood flow around the body, which is then served to the clinicians in a user-
friendly interface.

The Ademen team is working with several clinical groups to reduce the time and
cost of detecting conditions that would otherwise require patients to have
X-ray or ultrasound scans.

> "The Quix platform has been a key enabler for us to demonstrate our vision
> without the time, cost and risk of developing a streaming application in-
> house."

> **Dr. Alistair Foster, director of Ademen**

## Optimise manufacturing with machine learning

[CloudNC are using streaming data and Python to maximise production
capacity](https://quix.io/blog/case-study-manufacturing-cloudnc/) by building
‘digital twins’ of the factory. They use real-time data in a number of
different ways, including:

  * Continually update factory schedules based on current machine performance
  * Predictive maintenance to prevent breakdowns
  * Real-time reaction to early warning signs
  * Optimizing how parts are created through machine learning

The real-time pipelines ingest data from computers running Linux on the
factory floor using open source OPC-UA agents. The team cleans and processes
this data with Python to count parts and label data for machine learning. They
develop models offline before serving them back to the real-time ingestion
pipelines.

> "Quix has given us the environment to finally manage that [factory]
> information — to look at it, store it, or act on it immediately."

> **Chris Angell-Hicks, Chief Engineer for CloudNC**

## Real-time Generative AI with Kafka and a GPT-4 large language model

[This blog from Confluent ](https://www.confluent.io/blog/chatgpt-and-
streaming-data-for-real-time-generative-
ai/?utm_source=linkedin&utm_medium=organicsocial&utm_campaign=ai-blog-
post)explores a compelling case for using ChatGPT and event streaming to build
a production-ready large language model (LLM) chatbot. With the ability to
process and analyse data streams in real-time, Kafka enables data teams to
build the core elements of the application, including:

  * Integrating customer and company data into a knowledge base using Kafka Connect
  * Stream processing the knowledge base into a vector database
  * Building and serving prompts and embeddings
  * Calling LLM APIs

An event-driven architecture offers several advantages over a RESTful
architecture when building [large language model
(LLM)](https://quix.io/blog/llmops-running-large-language-models-in-
production) applications:

**Real-time responsiveness:** Handle real-time data and respond promptly to
events. With LLM applications, where users expect quick and interactive
responses, an event-driven approach enables faster processing and immediate
reactions to user inputs or external events.

**Scalability and flexibility:** Enable systems to handle a large number of
concurrent events and adapt to varying workloads. This flexibility is crucial
for LLM applications that may experience fluctuations in user traffic or data
input.

**Loose coupling and modularity:** Components communicate through events
rather than direct requests. This loose coupling enables better modularity,
making it easier to develop, test, and maintain individual components of the
LLM application independently.

**Extensibility and integration:** Facilitate seamless integration with other
systems and services. LLM applications often require integration with various
data sources, APIs, or external services. An event-driven approach simplifies
these integrations, allowing the LLM application to consume and react to
events from different sources efficiently.

**Event sourcing and auditing:** Adopt event sourcing, which captures and
persists every event that occurs in the system. This event history enables
auditing, debugging, and replaying of events, which can be valuable for LLM
applications when analysing user interactions or improving model performance.

Overall, an event-driven architecture provides the necessary agility,
responsiveness, scalability, and integration capabilities to effectively build
and operate large language model applications, ensuring a smoother and more
interactive user experience.

## Conclusion

These are just a few examples of production applications that are made
possible when you connect your machine learning teams to real-time data
streams in Kafka. By combining the power of Confluent's industry-leading Kafka
platform with Quix's F1-derived event streaming application framework,
organisations can now unlock the full potential of the AI ecosystem. [Try it
yourself here](https://quix.io/signup).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



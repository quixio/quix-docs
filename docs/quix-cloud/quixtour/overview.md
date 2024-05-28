---
title: Quix Cloud Tour
description: Build a complete pipeline entirely in Quix Cloud.
---

# Quix Cloud Tour

Welcome to the Quix Cloud Tour! 

The Quix Cloud Tour is designed to help you build a complete stream processing pipeline with Quix **in less than 30 minutes**.

## Prerequisites

To complete the Quix Cloud Tour you'll need the following:

* (Optional) A free [Vonage API account](https://developer.vonage.com/sign-up).

## CPU overload detection pipeline

The pipeline you implement in this tour:

1. **Ingest** - you create a source that publishes CPU load data from your source service into a Quix topic, using Quix Streams. 

2. **Process** - in this part, you process your data. Here you create a transform service that performs threshold detection. You publish messages to the transform's output topic. 

3. **Serve** - when you receive a message indicating CPU load has exceeded the threshold you (optionally) send an SMS to the system administrator.

!!! note

    The components in the pipeline are connected together by [Kafka topics](../../kb/what-is-kafka.md).

## 🏃‍♀️ Next step

[Ingest data :material-arrow-right-circle:{ align=right }](./ingest.md)

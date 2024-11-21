---
title: Event detection and alerting
description: How to create a CPU overload alerting pipeline with Quix, Quix Streams, InfluxDB, and PagerDuty.
---

# Event detection and alerting featuring InfluxDB and PagerDuty

In this tutorial you learn how to create a CPU overload alerting pipeline with Quix, Quix Streams, InfluxDB, and PagerDuty.

You gather CPU data from your laptop, and store this directly in InfluxDB. You also add a real-time event detection transform to detect if your CPU exceeds a threshold value, and if so, sends an alert to PagerDuty.

## Technologies used

* [Quix Cloud](https://quix.io/){target=_blank}
* [Quix Streams](https://github.com/quixio/quix-streams){target=_blank}
* [InfluxDB](https://www.influxdata.com/products/influxdb-cloud/serverless/){target=_blank}
* [PagerDuty](https://www.pagerduty.com/){target=_blank}

## Getting help

If you need any assistance while following the tutorial, we're here to help in the [Quix Community](https://quix.io/slack-invite){target="_blank"}.

## Prerequisites

To complete this tutorial you'll need to:

* Get a Quix Cloud account. 

??? info "Start for free"
    [Book a session](https://quix.io/book-a-demo) with us to start for free.
    
    We will create a time-limited free account for you, and our experts will help you get started with your specific use case. 
    
* [Create a project in Quix Cloud](../../create/create-project.md)
* [Install Quix Streams](https://github.com/quixio/quix-streams?tab=readme-ov-file#install-quix-streams){target=_blank}
* Optionally sign up for [PagerDuty](https://www.pagerduty.com/){target=_blank} (to send alerts)

!!! tip

    Completing the [InfluxDB quickstart](../../integrations/databases/influxdb/quickstart.md) before embarking on this tutorial is not essential, but is highly recommended.

Note, you obtain your [Streaming Token (SDK Token)](../../develop/authentication/streaming-token.md) once you have created an environment, as the token is specifically for use with that environment.

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. [Write the Python client](./python-client.md) - you write a command-line program using Quix Streams to get CPU load data into your pipeline.

2. [Add an external source](./external-source.md) - you add an external source - this enables your command-line program to be visible in the pipeline.

3. [Add an InfluxDB destination](./influxdb-destination.md) - you add a Quix InfluxDB destination connector (sink) to your pipeline. CPU load data is stored directly in InfluxDB.

4. [Create a threshold detection transform](./threshold-detection.md) - you develop a threshold detection transform. This determines if a CPU load threshold has been exceeded, and if so publishes a message to the output topic.

5. [Create an alerting sink](./add-alerting.md) - adds alerting using PagerDuty. You add a PagerDuty destination (sink) to the pipeline. If a message is received by the sink, a message is sent to PagerDuty.

6. [Summary](./summary.md) - conclusion and next steps.

## 🏃‍♀️ Next step

[Part 1 - Write the Python client :material-arrow-right-circle:{ align=right }](./python-client.md)

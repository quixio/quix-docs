# Alerting with InfluxDB, Quix Streams and PagerDuty

In this tutorial you learn how to create a CPU overload alerting pipeline with Quix, Quix Streams, InfluxDB, and PagerDuty.

!!! note

    This tutorial uses Quix Streams v2.

## Technologies used

* [Quix Cloud](https://quix.io/){target=_blank}
* [Quix Streams v2](https://github.com/quixio/quix-streams){target=_blank}
* [InfluxDB](https://www.influxdata.com/products/influxdb-cloud/serverless/){target=_blank}
* [PagerDuty](https://www.pagerduty.com/){target=_blank}

## Getting help

If you need any assistance while following the tutorial, we're here to help in the [Quix Community](https://quix.io/slack-invite){target="_blank"}.

## Prerequisites

To complete this tutorial you'll need to:

* [Obtain a free Quix account](https://portal.platform.quix.io/self-sign-up)
* [Create a project in Quix Cloud](../../create/create-project.md)
* [Install Quix Streams v2](https://github.com/quixio/quix-streams?tab=readme-ov-file#install-quix-streams){target=_blank}
* Optionally sign up for [PagerDuty](https://www.pagerduty.com/){target=_blank} (to send alerts)

!!! tip

    Completing the [InfluxDB quickstart](../../integrations/databases/influxdb/quickstart.md) before embarking on this tutorial is not essential, but is highly recommended.

Note, you obtain your [Streaming Token](../../develop/authentication/streaming-token.md) once you have created an environment, as the token is specifically for use with that environment.

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. [Write the Python client](./python-client.md) - you write a command-line program using Quix Streams to get CPU load data into your pipeline.

2. [Create an external source](./external-source.md) - you create an external source - this enables your command-line program to be visible in the pipeline.

3. [Develop a transform](./create-transform.md) - you write a transform to convert inbound JSON data to a Quix format to be compatible with our InfluxDB connector and Quix data explorer.

4. [Examine your data](./data-explorer.md) - you use Quix data explorer to examine the data produced by your transform.

5. [Add an InfluxDB destination](./influxdb-destination.md) - you add a Quix InfluxDB destination connector to your pipeline.

6. [Add an InfluxDB source](./influxdb-source.md) - you add a Quix InfluxDB source connector to your pipeline.

7. [Add threshold detection](./threshold-detection.md) - you add a threshold detection transform.

8. [Downsample your data](./downsampling.md) - you use an aggregation to downsample your data.

9. [Add alerting](./add-alerting.md) - add alerting using PagerDuty.

10. [Summary](./summary.md) - conclusion and next steps.

## 🏃‍♀️ Next step

[Part 1 - Write the Python client :material-arrow-right-circle:{ align=right }](./python-client.md)

---
title: Replacing Kapacitor with Quix
description: Shows how to use Quix to replace Kapacitor. Instead of using Kapacitor to run Flux tasks, use Quix Streams, and Python to implement your tasks, and run them in Quix.
search:
  boost: 3
---

# Replacing Kapacitor

It's possible to replace Kapacitor with Quix. The basic process is:

1. Use Quix's prebuilt connectors to connecto to InfluxDB v2 and v3 databases.
2. Implement your Flux tasks in Python, using the Quix Streams client library. 

The code you create to query and process your InfluxDB data runs in Quix, and has all the flexibility of using Python. Quix Streams also includes many common processing facilities, such as aggregations, windowing, filtering, and so on, reducing the amount of code you need to write.

The following illustrates a typical processing pipeline running in Quix.

![Processing pipeline](../../../tutorials/influxdb-alerting/images/alerting-pipeline.png)

TODO - map Kapacitor features to Quix

## See also

Read the [general overview of Quix](../../../get-started/what-is-quix.md).

If you are new to Quix you could try our [Quickstart](../../../get-started/quickstart.md) and then complete the [Quix Tour](../../../get-started/quixtour/overview.md). This gives you a good overview of how to use Quix, for a minimal investment in your time.

You can read more about [stream processing](../../../get-started/why-stream-processing.md).

You can read the guide on [Replacing Flux with Quix Streams](./replacing-flux.md), which includes some common use case examples.

The [predictive maintenance tutorial](../../../tutorials/predictive-maintenance/overview.md) provides a large scale example of what you can do with Quix, Quix Streams, and InfluxDB.

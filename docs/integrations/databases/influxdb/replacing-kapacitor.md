---
title: Replacing Kapacitor with Quix
description: Shows how to use Quix to replace Kapacitor. Instead of using Kapacitor to run Flux or TICKscript tasks, use Quix Streams, and Python to implement your processing pipeline, and run them it Quix.
search:
  boost: 3
---

# Replacing Kapacitor

It's possible to replace Kapacitor with Quix. The basic process is:

1. Use Quix's prebuilt connectors to connect to InfluxDB v2 or InfluxDB v3 databases, as required.
2. Implement your Flux or TICKscript tasks in Python, using the Quix Streams client library. 

The code you create to query and process your InfluxDB data runs in Quix, and has all the flexibility of using Python. Quix Streams also includes many common processing facilities, such as aggregations, windowing, filtering, and so on, reducing the amount of code you need to write.

The following illustrates a typical processing pipeline running in Quix.

![Processing pipeline](../../../tutorials/influxdb-alerting/images/alerting-pipeline.png)

## Kapacitor / Quix feature comparison

| Feature | Kapacitor | Quix |
|----|----|----|
| Streaming data processing | Kapacitor enables users to process streaming data in real-time, enabling actions to be taken as soon as data is received. | Quix was built from the ground up as a stream processing platform. |
| Data processing tasks | Kapacitor supports a variety of data processing tasks such as downsampling, aggregations, transformations, and anomaly detection. These tasks can be defined using TICKscript, a domain-specific language (DSL) specifically designed for Kapacitor. | Quix uses Python as its main programming language. Code is implemented using the Quix Stream Python stream processing client library. [Quix Streams](https://quix.io/docs/quix-streams/introduction.html) has many built-in stream processing features such as aggregations, windowing, and filtering. |
| Alerting and monitoring | Kapacitor enables users to define alerting rules based on predefined conditions or anomalies detected in the data. Alerts can be sent through various channels such as email, Slack, PagerDuty, etc. | Quix supports alerts by writing code in Python to detect events and determine if thresholds have been crossed. Connectors to alerting services are provided, or can easily be added with minimal code. For a detailed example read the [InfluxDB alerting with Quix Streams and PagerDuty tutorial](../../../tutorials/influxdb-alerting/overview.md). |
| Integration with InfluxDB | Kapacitor seamlessly integrates with InfluxDB, enabling users to perform advanced analytics and processing on the time-series data stored in InfluxDB. | Quix connects to both InfluxDV v2 and InfluxDB v3 using prebuilt connectors. The v3 connectors include both source and sink. For v2 only source is currently available. If you want to migrate data from InfluxDB v2 to InfluxDB v3 then read [the tutorial](../../../tutorials/influxdb-migration/overview.md). |
| Scalability | Kapacitor is designed to be horizontally scalable, enabling it to handle large volumes of data and scale alongside the rest of the TICK Stack components. | Quix was designed to be both vertically and horizontally scalable. It is based on [Kafka](../../../get-started/what-is-kafka.md), using either a Quix-hosted broker, or an externally hosted broker. This means all the horizontal scaling features of Kafka, such as consumer groups, is built into Quix. Quix also enables you to configure RAM and CPU allocations on a per-service basis, for accurate vertical scaling. |
| High availability | Kapacitor supports high availability setups to ensure uninterrupted data processing and alerting even in the case of node failures. | As Quix uses a Kafka broker (including Kafka-compatible brokers such as Redpanda), it has all the high availability features inherent in a Kafka-based solution. In addition, Quix uses Kubernetes to seamlessly distribute and manage containers that execute your service's Python code. |
| Replay and backfilling | Kapacitor enables users to replay historical data or backfill missing data, enabling them to analyze past events or ensure data consistency. | Quix leverages Kafka's persistence capbailities. Once a topic is persisted, you can use Quix's built-in [replay](../../../manage/replay.md) facility, to replay persisted data into topics. This is useful for testing and evaluating processing pipelines. |
| Extensibility | Kapacitor provides an extensible architecture, enabling users to develop and integrate custom functions, connectors, and integrations as per their specific requirements. | Quix is fully extensible using Python. Complex stream processing pipelines can be built out one service at a time, and then deployed with a single click. It is also possible to use a wide range of standard [connectors](../../../connectors/index.md) to connect to a range of third-party services. In addition, powerful [REST and real-time APIs](../../../develop/apis-overview.md) are available for use with any language that supports REST or WebSockets. |

## See also

Read the [general overview of Quix](../../../get-started/what-is-quix.md).

If you are new to Quix you could try our [Quickstart](../../../get-started/quickstart.md) and then complete the [Quix Tour](../../../get-started/quixtour/overview.md). This gives you a good overview of how to use Quix, for a minimal investment in your time.

You can read more about [stream processing](../../../get-started/why-stream-processing.md).

You can read more about Kafka in our [What is Kafka?](../../../get-started/what-is-kafka.md) documentation.

You can read the guide on [Replacing Flux with Quix Streams](./replacing-flux.md), which includes some common use case examples.

The [predictive maintenance tutorial](../../../tutorials/predictive-maintenance/overview.md) provides a large scale example of what you can do with Quix, Quix Streams, and InfluxDB.

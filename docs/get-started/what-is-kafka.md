# What is Kafka?

Kafka is an open-source distributed event streaming platform originally developed by LinkedIn and later open-sourced as an Apache Software Foundation project. It is designed to handle real-time data feeds with high throughput and low latency. Kafka is used for building real-time data pipelines and [stream processing](./why-stream-processing.md) applications.

Kafka is at the heart of Quix, whether hosted by Quix, or integrated with third-party providers. When using Quix, stream processing is built on top of Kafka.

Here are some key features of Kafka:

* **Publish-Subscribe messaging system**: Kafka follows the publish-subscribe model where producers publish messages to topics, and consumers subscribe to these topics to receive messages.

* **Distributed and fault-tolerant**: Kafka is designed to be distributed across multiple nodes, enabling it to scale horizontally. It also provides replication of data across multiple brokers, ensuring fault tolerance and high availability.

* **High throughput and low latency**: Kafka is optimized for high throughput and low latency, making it suitable for real-time stream processing applications.

* **Persistent Storage**: Kafka persists messages to disk, providing durability and enabling message replay in case of failures or system crashes.

* **Stream Processing**: Quix includes the Quix Streams client library that enables developers to build stream processing applications in Python, that leverage Kafka, enabling real-time data processing and analytics.

* **Integration**: Kafka has robust integration capabilities, supporting connectors for integrating with various data sources and sinks such as databases, messaging systems, and analytics platforms.

Overall, Kafka has gained popularity for its ability to handle large volumes of data in real time, making it a foundational component in modern data architectures for applications such as real-time analytics, monitoring, and machine learning.

## Kafka and stream processing

Kafka is extensively used in stream processing due to its ability to handle real-time data streams efficiently. Here's how Kafka is used in stream processing:

* **Input data streams**: Kafka serves as the entry point for streaming data. Various data sources such as application logs, sensors, IoT devices, social media feeds, or transaction systems publish data to Kafka topics. These topics act as the input data streams for stream processing applications.

* **Quix Streams**: Quix provides Quix Streams which is a client library for building real-time stream processing applications using Kafka. It enables developers to consume data from Kafka topics, perform stateful or stateless processing on the data, and publish results back to Kafka topics.

* **Stream processing topologies**: With Quix Streams for Kafka, developers can define stream processing topologies that describe how data flows through the system. Topologies can include operations like filtering, mapping, aggregating, joining, windowing, and more.

* **State Management**: Quix Streams handles state management transparently for developers. It provides mechanisms for managing and updating state within stream processing applications, enabling functionalities such as session windows, windowed aggregations, and joins.

* **Fault tolerance**: Kafka ensures fault tolerance in stream processing applications by providing features such as data replication, partitioning, and consumer group coordination. In case of failures, Kafka automatically rebalances tasks and restores state from Kafka topics.

* **Scalability**: Stream processing applications built with Kafka can scale horizontally by adding more instances of processing nodes. Kafka handles the distribution of data and load balancing across these instances, ensuring scalability without downtime.

* **Integration with external systems**: Kafka integrates seamlessly with external systems, enabling stream processing applications to interact with various data sinks and sources. For example, processed data can be stored in databases, sent to analytics platforms, or used to trigger downstream actions. Quix features a wide variety of [connectors](../connectors/index.md) and [integrations](../integrations/overview.md) to enable this.

Overall, Quix's integration with the Kafka provides a powerful framework for building scalable, fault-tolerant, and real-time stream processing applications, making it a popular choice in the streaming data ecosystem.

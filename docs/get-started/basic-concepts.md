# Basic concepts

This page explains some basic concepts of Quix.

## Streaming

* **Topic** - Quix has Kafka at its heart. Kafka is based around the idea of topics. These can be thought of as pipes in which messages flow.
* **Quix producer** - In Quix, a producer publishes data to a Kafka topic. The data is typically thought of as packaged in messages, containing one or more events. 
* **Quix consumer** - A consumer subscribes to a topic, and typically processes that data it receives from that topic, depending on the use case.

## Stream processing

* **Application** - In Quix, you develop applications that ultimately run as microservices in Docker containers managed in a Kubernetes cluster. Kubernetes manages the lifecycle of the microservice, and handles such aspects as load balancing, service failure and restart, and resource management. Applications are developed using pure Python and the Quix Streams client library. The code of the application typically handles connection to a broker, and then processes each message with the DataFrame you provide it.
* **StreamingDataFrame** - the fundamental class used in the Quix Stream client library. It is a predefined declarative pipeline that processes and transforms incoming messages in a tabular DataFrame. It is similar to a pandas dataframe, but designed specifically for processing streaming data in real time.

## Stream processing pipelines

* **Source connector** - an application using the producer API to produce data to Kafka.
* **Destination connector** - an application using the consumer API to consumer data from Kafka and write it to a destination, such as to persist it to a database, or otherwise be transmitted beyond the Quix system.
* **Transformation** - a stream processing application that consumes data from a Kafka topic, processes it, and publishes it back to a Kafka topic.
* **Quix application template** - description of YAML, docker and env variables etc TODO
* **Quix pipeline template** - description of YAML, apps and topics etc that make up a pipeline TODO
* **Quix Cloud** - a serverless platform for orchestrating and observing streaming data and stream processing applications in a pipeline. It supports multiple projects, with multiple environments, each containing one or more pipelines.

## Next steps

* [Advanced concepts](TODO)
* A detailed description of [Quix concepts](../kb/what-is-quix.md).
* [Glossary](../kb/glossary.md)

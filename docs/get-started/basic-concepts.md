# Basic concepts

This page explains some basic concepts of Quix.

## Streaming

* **Topic** - Quix has Kafka at its heart. Kafka is based around the idea of topics. These can be thought of as pipes in which messages flow. Topics enable data to flow between your dockerized microservices.
* **Quix producer** - In Quix, a producer publishes data to a Kafka topic. The data is typically thought of as packaged in a message, each message containing one or more events. 
* **Quix consumer** - A consumer subscribes to a topic, and typically processes the data it receives from that topic, depending on the use case.

[Read more about Quix](../kb/what-is-quix.md).

## Stream processing

* **Application** - In Quix, you develop applications that ultimately run as microservices in Docker containers managed in a Kubernetes cluster. Kubernetes manages the lifecycle of the microservice, and handles such aspects as load balancing, service failure, and restart, and resource management. Applications are developed using pure Python and the Quix Streams client library. The code of the application typically handles connection to a broker, and then processes each message with the DataFrame you provide it.
* **StreamingDataFrame** - the fundamental class used in the Quix Stream client library. It is a predefined declarative pipeline that processes and transforms incoming messages in a tabular DataFrame. It is similar to a pandas dataframe, but designed specifically for processing streaming data in real time.

[Read about Quix Streams and Streaming DataFrame](http://quix.io/docs/quix-streams/introduction.html).

## Stream processing pipelines

* **Source connector** - an application using the producer API to produce data to a Kafka topic.
* **Destination connector** - an application using the consumer API to consumer data from Kafka and write it to a destination, such as to persist it to a database, or otherwise be transmitted beyond the Quix system.
* **Transformation** - a stream processing application that consumes data from a Kafka topic, processes it, and publishes it back to a Kafka topic.
* **Quix application template** - each application has an `app.yaml` file associated with it that defines the application, including input and output topics, the Docker file used, run entry point and other configuration. These configurations can be changed by editing the file, or more usually using the Quix Cloud UI.  
* **Quix pipeline template** - a Quix project, which corresponds to a Git repository containing the applications that make up the project's pipeline, is described by a `quix.yaml` file. In addition, Quix provides [templates](https://quix.io/templates){target=_blank} that enable you to see what Quix is capable of, or use as a starting point for your own project.
* **Quix Cloud** - a serverless platform for orchestrating and observing streaming data and stream processing applications in a pipeline. It supports multiple projects, with multiple environments, each containing one or more pipelines.

[Read more about connectors](../connectors/index.md).

## Next steps

* A detailed description of [Quix](../kb/what-is-quix.md).
* [Glossary](../kb/glossary.md)

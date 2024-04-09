# Streaming

In streaming, it is important to understand the following terms:

* **Topic** - Quix has Kafka at its heart. Kafka is based around the idea of topics. These can be thought of as pipes in which messages flow. Topics enable data to flow between your dockerized microservices.
* **Quix producer** - In Quix, a producer publishes data to a Kafka topic. The data is typically thought of as packaged in a message, each message containing one or more events. 
* **Quix consumer** - A consumer subscribes to a topic, and typically processes the data it receives from that topic, depending on the use case.

[Read more about Quix](../kb/what-is-quix.md).

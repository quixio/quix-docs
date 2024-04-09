# Stream processing

In stream processing, it is important to understand the following terms:

* **Application** - In Quix, you develop applications that ultimately run as microservices in Docker containers managed in a Kubernetes cluster. Kubernetes manages the lifecycle of the microservice, and handles such aspects as load balancing, service failure, and restart, and resource management. Applications are developed using pure Python and the Quix Streams client library. The code of the application typically handles connection to a broker, and then processes each message with the DataFrame you provide it.
* **StreamingDataFrame** - the fundamental class used in the Quix Stream client library. It is a predefined declarative pipeline that processes and transforms incoming messages in a tabular DataFrame. It is similar to a pandas dataframe, but designed specifically for processing streaming data in real time.

[Read about Quix Streams and Streaming DataFrame](http://quix.io/docs/quix-streams/introduction.html).

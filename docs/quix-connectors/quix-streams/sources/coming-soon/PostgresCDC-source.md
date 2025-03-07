<!--- BEGIN MARKDOWN --->
"
# Integrate Postgres CDC with Kafka using the source Postgres CDC Kafka connector

Quix enables you to publish data from Postgres CDC to Apache Kafka and then process it. All of this in real time, using pure Python, and at any scale.

[Book a demo](https://share.hsforms.com/1iW0TmZzKQMChk0lxd_tGiw4yjw2)

## Move Postgres CDC data to Kafka and process it in two simple steps

1. ### Ingest data from Postgres CDC into Kafka

Use the Quix-made Postgres CDC Kafka source connector to publish data from your Postgres database into Quix-managed Apache Kafka topics. The connector enables you to stream data in a scalable, fault-tolerant manner, with consistently low latencies. 

2. ### Process and transform data with Python

After data is ingested from Postgres CDC, process and transform it on the fly with Quix Streams, an open-source, Kafka-based Python library. Quix Streams offers an intuitive Streaming DataFrame API (similar to pandas DataFrame) for real-time data processing and real time data analytics. It supports aggregations, windowing, filtering, group-by operations, branching, merging, serialization, and more, allowing you to shape your data to fit your needs.

![Diagram](images/PostgresCDC-source_diagram_1.png)

## Quix Kafka connectors — a simpler, better alternative to Kafka Connect

Quix offers a Python-native, developer-friendly approach to data integration that eliminates the complexity associated with Kafka Connect deployment, configuration details, and management. 

With Quix Kafka connectors, there's no need to wrestle with complex connector configurations, worker scaling, or infrastructure management that typically come with Kafka Connect.

Quix fully manages the entire Kafka connectors lifecycle, from deployment to monitoring. This means faster development, easier debugging, and lower operational overhead compared to traditional Kafka Connect implementations.

## Quix, your solution to simplify real-time data integration

As a Kafka-based platform, Quix streamlines real-time data integration across your entire tech stack, empowering you to effortlessly collect data from disparate sources into Kafka, transform and process it with Python, and send it to your chosen destination(s).

By using Quix as your central data hub, you can:

* Accelerate time to insights from your data changes to drive informed business decisions  
* Ensure data accuracy, quality, and consistency across your organization  
* Automate data integration pipelines and eliminate manual tasks  
* Manage and protect sensitive data with robust security measures  
* Handle data in a scalable, fault-tolerant way, with sub-second latencies, and exactly-once processing guarantees  
* Reduce your data integration TCO to a fraction of the typical cost  
* Benefit from managed data integration infrastructure, thus reducing complexity and operational burden  
* Use a flexible, comprehensive toolkit to build data integration pipelines, including CI/CD and IaC support, environment management features, observability and monitoring capabilities, an online code editor, Python code templates, a CLI tool, and 130+ Kafka source and sink connectors

[Explore the Quix platform](https://portal.demo.quix.io/?workspace=demo-dataintegrationdemo-prod)  |  [Book a demo](https://share.hsforms.com/1iW0TmZzKQMChk0lxd_tGiw4yjw2)

## FAQs

### What is Postgres CDC?

Postgres change data capture (CDC) is a technique for detecting and capturing data changes made to a PostgreSQL database. It allows for the continuous capture of insert, update, and delete operations on a Postgres server, facilitating real-time streaming data integration for data analysis and other use cases.

### What is Apache Kafka?

Apache Kafka is a scalable, reliable, and fault-tolerant event streaming platform that enables real-time integration and data exchange between different systems. Kafka’s publish-subscribe model ensures that any source database can write data to a central pipeline, while destination systems can read that data instantly as it arrives. In essence, Kafka acts as a central nervous system for data. It helps organizations unify their data architecture and provide a continuous, real-time flow of information across disparate components.

### What are Kafka connectors?

Kafka connectors are pre-built components that help integrate Apache Kafka with external systems. They allow you to reliably move data in and out of a Kafka cluster without writing custom integration code. There are two main types of Kafka connectors:

* **Source connectors**: These are used to pull data from source systems into Kafka topics.

* **Sink connectors**: These are used to push data from Kafka clusters to destination systems.

### What is real-time data, and why is it important?

Real-time data is information that’s made available for use as soon as it's generated. It’s passed from source to destination systems with minimal latency, enabling rapid decision-making, immediate insights, and instant actions. Real-time data is crucial for industries like finance, logistics, manufacturing, healthcare, game development, information technology, and e-commerce. It empowers businesses to improve operational efficiency, increase revenue, enhance customer satisfaction, quickly respond to changing conditions, and gain a competitive advantage.

### What data can you publish from Postgres CDC to Kafka in real time?

* Transaction logs, e.g., committed or rolled back transactions with timestamps  
* Row-level changes, including inserted, updated, or deleted information  
* Table metadata changes like Search indexes or modified schemas  
* User activity logs, covering login attempts, session durations, and permission changes  
* Time-stamped metrics, including performance counters and error reporting  
* Geospatial data associated with location-based services  
* Domain-specific data tailored for particular applications, such as CRM records or order processing details

### What are key factors to consider when publishing Postgres CDC data to Kafka in real time?

* Implementing PostgreSQL cdc involves configuration changes in the schema registry and the PostgreSQL server, often requiring downtime for initial setup.  
* Network latencies between the Postgres instance and Kafka clusters can impact the timeliness of data streaming, necessitating performance tuning.  
* Managing large volumes of change data with low-latency demands requires robust ETL frameworks and scalable infrastructure solutions.  
* Coordination between the schema registry and other data streaming components is crucial for maintaining data integrity during ongoing schema changes.  
* Handling different authorization and authentication mechanisms between the PostgreSQL database and Kafka topics can introduce complexity.  
* Consistent monitoring and alerting mechanisms must be in place to detect and handle any anomalies in the data streaming pipeline.  
* Ensuring data privacy and compliance while streaming sensitive information is critical, involving encryption and access control implementations.

### How does the Postgres CDC Kafka source connector offered by Quix work?

The source Postgres CDC Kafka connector provided by Quix is fully managed and written in Python. 

The connector continuously retrieves data from Postgres CDC and publishes it to designated Quix-managed Kafka topics.  

The connector provides strong data delivery guarantees (ordering and exactly-once semantics) to ensure data is reliably ingested into Kafka. You can customize its write performance and choose between several serialization formats (such as JSON, Avro, and Protobuf).  

To find out more about the source Postgres CDC Kafka connector offered by Quix, [book a demo](https://share.hsforms.com/1iW0TmZzKQMChk0lxd_tGiw4yjw2).

### Does Quix offer a sink Postgres CDC Kafka connector too?

Yes, Quix also provides a Postgres CDC Kafka sink connector.

[Learn more about it](../../../quix-streams/sinks/coming-soon/PostgresCDC-sink.md).

In fact, Quix offers 130+ Kafka sink and source connectors, enabling you to move data from a variety of sources into Kafka, process it, and then send it to your desired Kafka topic(s). All in real time.

[Explore the library of Quix Kafka connectors](https://quix.io/connectors)
<!--- END MARKDOWN --->
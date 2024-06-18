---
title: "Flink vs Spark: Benchmarking stream processing client libraries"
date: 2023-07-18
authors: [tomas-neubauer]
slug: compare-client-libraries-spark-flink-quix
description: >
  We tested Apache Spark vs Apache Flink vs Quix Streams on performance and flexibility. The results surprised us.
categories:
  - ecosystem
---

# Flink vs Spark: Benchmarking stream processing client libraries

We tested Apache Spark vs Apache Flink vs Quix Streams on performance and flexibility. The results surprised us.

<!-- more -->

The future of big data is real-time stream processing because data is created
in real time. Most data belongs to a stream of sequential records. Processing
records in real time unlocks significant value.

There are hundreds of real-world applications for stream processing,
including:

  * Personalizing digital experiences through user interactions with an app
  * Optimizing physical assets, such as machines manufacturing components
  * Developing vehicle software for cars driving in the real world; and
  * Detect fraudulent payments using machine learning in real time.

In these examples, cost-effective stream processing with low latency is the
key to generating value. Apache Spark and Flink are currently considered best-
in-class technologies (you can read more about them in our [detailed
comparison](/blog/performance-limitations-python-client-libraries)). However,
our team has run into [usability and scalability problems](/blog/implementing-
stream-processing-python) while processing data at scale.

For example, while working as engineers at McLaren, we found that these issues
were compounded by interoperability challenges across the entire solution
architecture. We had to run one protocol on the hardware (it was proprietary),
another protocol on the broker (again proprietary), and Spark or Flink on the
cluster.

Since leaving McLaren in February 2020, my team and I have worked to develop a
solution to these problems. That solution is the [Quix client library: Quix
Streams](https://quix.io/docs/sdk/introduction.html).

Inspired by the paper [Discretized Streams: Fault-Tolerant Streaming
Computation at
Scale](https://people.csail.mit.edu/matei/papers/2013/sosp_spark_streaming.pdf)
by Matei Zaharia and his colleagues, this article aims to benchmark our
solution against Spark and Flink.

## Comparing the client libraries of Apache Spark, Apache Flink and Quix
Streams

We developed an experiment to compare Flink, Spark and [Quix](/product) based
on four criteria:

  * Performance
  * Scalability
  * Easy of use
  * Efficiency

This article won’t cover other aspects such as state management, failure
recovery, and latency. They’re substantial topics by themselves, so we’ll
compare them in future posts. Stay tuned.  

## How to evaluate stream processing client libraries

Like Zaharia and colleagues, we used three stream processing tasks to test
each library:

  * **Grep** to find the number of input strings matching a pattern
  * **Word count** to perform a count over a 30-second sliding window
  * **TopKCount** to find the k most frequent words over the past 30 seconds

We differ from Zaharia because we stream data into Spark, Flink, and Quix from
a Kafka message broker. Each test was carried out on a three-part, end-to-end
infrastructure to best reflect a production environment. It included:

  1. A random [Lorem Ipsum](https://www.lipsum.com/) word generator
  2. [A Kafka broker](/blog/set-up-kafka-for-real-time-stream-processing)
  3. A compute cluster where we ran the stream processing tasks and sampled measurements of CPU and memory

The stream processing results were then streamed back into a Kafka topic, as
they would be in a production solution, where other downstream applications
can consume them.

We recorded CPU and memory measurements at various words-per-second rates,
from 1,000 to 1,000,000 words per second. We used that data to calculate the
number of words each library could process per CPU core and per GB of memory.

We also extrapolated the scalability of each solution by looking at the
difference in CPU and memory performance as the word volume increased.  

## How to set up stream processing infrastructure

We built a bespoke stream processing infrastructure to test each client
library to mimic best-in-class solutions.

### Apache Spark

There is no end-to-end solution for Spark, so we built a Kafka cluster on a VM
and connected it to Databricks, which should give us an optimized way to use
Spark. We built the application using Spark Structured Streaming with the
Python DataFrame API, with this test infrastructure:

  1. **Word generator:** 4 Core / 8GB RAM VM using the librdkafka C++ client library
  2. **Kafka:** 48 Core/96GB RAM across three nodes (using Azure Standard_F16s_v2 nodes) — 1 topic, 16 partitions, 2 replicas
  3. **Spark:** Azure D32SV3 32 Core / 128GB RAM cluster in Databricks

### Apache Flink

Flink has no commercial solutions, so we built the whole stack from scratch.
We built the application using the PyFlink TableAPI with this test
infrastructure:

  1. **Word generator:** 4 Core / 8GB RAM VM using the librdkafka C++ client library
  2. **Kafka:** 48 Core/96GB RAM across three nodes (using Azure Standard_F16s_v2 nodes) — 1 topic, 16 partitions, 2 replicas
  3. **Flink:** 3x Azure D8DS V4 8 Core / 32GB RAM

### Quix Streams

We used our platform to test [Quix
Streams](https://quix.io/docs/sdk/introduction.html). The word generator
(written in our C# client library) was deployed into our serverless compute
environment to stream data to one of our serverless Kafka Topics. We built and
deployed three applications to the Quix serverless environment, one to
evaluate each of our C#, Python and Python Pandas DataFrame libraries, with
this test infrastructure:

  1. **Word generator:** one deployment with eight replicas (consuming one core and one GB RAM in total) using the Quix Streams C# library
  2. **Kafka:** one serverless Quix topic, 16 partitions and two replicas
  3. **Quix:** one deployment with 16 replicas*. Figure 1 shows the CPU and memory listed as a sum of all the replicas for each language (for the avoidance of doubt, each language was tested in isolation).

![Quix deployment table.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbb37e4f60e523ab1b2b5_Quix-
deployments-table.webp)

###### **Figure 1. Serverless compute resources consumed across 16 replicas,
expressed as a sum of CPU and memory for each language tested in isolation.
With Quix, users only pay for the exact resources consumed in their
application, not the entire cluster.**

***Note:** The hardware specification is less relevant with Quix because our
serverless environment abstracts users from cluster management. For the
record, the underlying Kubernetes cluster was using Standard D4s_v4 machines
on Azure.

## Performance, efficiency and scalability results for Spark, Flink and Quix
Streams

### CPU performance

Quix Streams offered the best CPU performance while using its native C#
language — about three times faster than Flink. However, Python matters most
when comparing these client libraries for Machine Learning applications
because Python is the preferred language for most data scientists.  

> _“Python matters most when comparing these client libraries for Machine
> Learning applications, because Python is the preferred language for most
> data scientists.”_

The Quix Streams Python library has 157% greater CPU efficiency than Spark but
doesn’t quite achieve the performance of Flink. This isn’t surprising because
the PyFlink table API executes instructions in Java run-time. In comparison,
the Quix Streams Python library is executing pure Python — this is much more
versatile, enabling the user to write any application, but the trade-off is
some performance degradation.  

![Quix comparison graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbb716e3a5a8036036fc4_Quix-
comparison-graph.webp)

###### Figure 2. The Quix Streams Python library processes 2.5 times more
messages per second per CPU core than Spark. It is also within 25% of Flink in
CPU performance. This is favorable considering that Quix Streams executes pure
Python code (which is much more flexible for developers and data scientists)
while Flink executes SQL instructions in Java run-time.  

We found that Spark has a non-linear behavior caused by auto-scale features in
diagnosing the lower performance. For example, at 50,000 words per second,
Databricks automatically scaled the cluster to add more nodes, resulting in
massive CPU and memory overheads. We struggled to scale Spark any further than
133,000 words per second despite throwing engineering time and compute
resources at the problem. I’m sure it can be done, but the effort reinforces
our belief that Spark streaming is not usable enough for real-world
applications.  

> _“Huge overheads aren’t a problem for Quix Streams, because there is no
> overhead … Quix requires none of the additional data processing
> orchestration needed for Spark and Flink.”_

Huge overheads aren’t a problem for Quix Streams — because there is no
overhead. Quix combines Kafka partitions and consumer group concepts with the
Kubernetes replica system to scale efficiently. This requires no additional
data processing orchestration needed for Spark and Flink.  

### Memory performance

![Quix memory comparison graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbba85ffb564b68db56cd_Quix-
comparison-graph-memory.webp)

###### Figure 3. The Quix Streams Python library is 1,500% more memory
efficient than Flink and 3,800% more memory efficient than Spark streaming.
This is a significant advantage in production workloads because memory is so
expensive.  

The surprising loser in this test is Spark — it does not perform well on
memory and has other feature limitations that reinforce our belief that it is
not the right technology for stream processing. Spark, unfortunately,
demonstrated an extreme memory footprint in the way it redistributes load and
data between the nodes, making it an expensive choice.

Flink is slightly better than Spark but also unacceptably high. Flink’s memory
consumption wasn’t stable because JVM runtime and Garbage Collector were
triggered randomly. That makes Flink somewhat better than Spark but
considerably worse than Quix Streams. There is also a clear trend of
increasing demand for memory as the scale of the application increases.

Quix Streams is the clear winner in memory footprint because the only overhead
to each processing instance is a Linux-based Docker image for the Python
runtime. Memory efficiency is a significant advantage when implementing stream
processing solutions into production, especially at the volume and velocity of
modern applications.  

### Scalability

![Quix CPU scalability raising graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbbd3d7fbd741ab0a5486_CPU-
scalability-graph.webp)

###### Figure 4. Quix Streams and Flink both scale linearly as the size of the
application increases. Spark is difficult to scale beyond 133,000 words per
second, reinforcing our belief that it is not the right technology for stream
processing applications.  

![Quix memory scalability raising graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbc3ff3d0c8f92aa80b82_Memory-
scalability-graph.webp)

###### Figure 5. Performance results for memory scalability show an increase
in resource use. This is most dramatic with Spark (orange) but also massive in
Flink (green). Meanwhile, Quix Streams (blue) is most efficient in memory
consumption by 50x while also being predictably linear.  

Spark had difficulty scaling. Spark only achieved a peak throughput of 133,000
records per second with a CPU utilization of around 14%, with load balancing
enabled. Once the input generator exceeded this limit, the system started to
fall behind in the data processing, and the (micro)batch execution time
exceeded the rolling window time. Due to the greedy nature of Spark’s auto-
scaling algorithm, which includes a vast number of allocated nodes, the memory
consumption of Spark was massive.

Flink scaled from a few hundred records per second up to a high volume of
1,000,000 records per second when adding additional nodes. However, while the
CPU scaled linearly, the memory did not. Instead, Flink automatically adds
memory in chunks with a tendency to overcommit for a given volume of data.
This overhead can be expensive when used in production, especially considering
that you have to oversize your clusters ahead of time.

Quix Streams scaled from zero to 1,000,000 messages per second quite linearly
on CPU and Memory utilization. Memory efficiency is particularly impressive as
there are no overheads with the serverless compute environment. Additionally,
Quix Streams demonstrated a significant advantage in data throughput on the
broker by transporting approximately the same amount of data as Flink with 15
times less bandwidth (for example, the bandwidth was 750KBs at 300k records
per second) due to internal optimization. In production, this bandwidth
efficiency, together with the memory efficiency, would substantially reduce
operating costs.

[**Note:** Some publicly available papers measure the throughput of Spark and
Flink by reading from a database. This can lead them to report higher
throughput than we measured because reading from a database is significantly
easier than processing real-time streams from a Kafka broker and less
efficient in a production system.]  

### User friendliness

A key objective of Quix Streams is being user friendly, especially for data
scientists and developers working in Python. This means having a natural
language structure (Read, Write, Open, Close) and being pure Python so that
developers can build anything they want using external libraries, classes,
functions and dependencies.

By contrast, the Python API for both Spark and Flink are used to call Spark
and Flink functions — not to process data. Just look at the following, which
illustrates the difference between Spark, Flink and Quix Streams code:  

![Kafka code block screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbc7695940d4c80df8169_Code-
block.webp)

###### Figure 6. The Flink code (highlighted in red) is outside the scope of
Python, so IDEs can’t offer autocomplete, syntax checks or any development
support.  

![Spark code block screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbcc8e4f60e523ab3eda0_Spark-code-
block.webp)

###### Figure 7. The Spark code (highlighted in red) is outside the scope of
Python, so IDEs can’t offer autocomplete, syntax checks or any development
support.  

![Quix streams code block screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfbd0dc791453caa38ffd0_Quix-stream-
code-screenshot.webp)

###### Figure 8. The Quix Streams code is pure Python. Here, we use it to
calculate TopK and other functions implemented in the Algo class.  

The lack of native support for Python is very limiting for Spark and Flink
users. Python documentation for these libraries is also limited, forcing users
to browse Stackoverflow and internet forums for support.

Quix Streams makes a difference in user friendliness and freedom, so
developers can quickly write stream processing applications beyond simple SQL
functions.  

## Which streaming processing library is the winner?

Your organization’s best stream processing library ultimately depends on your
use case and the performance you require.

In our experiment, Spark demonstrated the lowest performance among the
libraries we tested, and its documentation was not user-friendly, which will
likely frustrate developers and waste time troubleshooting. If your use cases
rely on low latency stream processing, we believe Spark is an outdated
technology.

Flink is currently considered the industry standard. It’s a relatively mature
technology that offers many out-of-the-box features. It demonstrated
satisfactory performance in our tests and has an active open source community.
However, it isn’t easy to use and not well-suited to more complex stream
processing applications, such as real-time machine learning model deployment.

Quix Streams outperformed Spark and Flink on memory efficiency, processing
225,000 words per second per GB of standard RAM. This is significant
considering Quix Streams is processing data using Python Pandas Dataframes
while Spark and Flink are processing in Java.

The pure Python approach and natural language structure makes Quix Streams
easy to use, giving developers the freedom to write any application code. As a
leading-edge technology, Quix Streams does not yet have some out-of-the-box
features compared to Flink and Spark (such as stateful transformations), but
these are primarily simple logic that can easily be implemented in Python.  

## Seeking contributors for an open-source SDK

Yes, we had a horse in this race. And yes, we wanted it to win. But when we
set up this experiment, we had no idea Quix Streams Python would perform so
well against the incumbents.

That’s exciting because our vision for this high-performance, pure Python
library is to open up stream processing for new applications, products and
industries. And to that end, we’re considering opening our entire codebase to
the open-source community, so more collaborators can make it even better.

For more details comparing Spark, Flink and Quix Streams, look at Quix CEO
Mike Rosam’s [very detailed research comparing each client
library](/blog/performance-limitations-python-client-libraries) or Quix
software engineer Ales Saska’s report of [his experience installing each
client library](/blog/implementing-stream-processing-python).

What applications are you working on? What features would you like to see us
add to the library? [Join us on Slack](http://quix.io/slack-invite) to make
your recommendations.




## Guide to the Event-Driven, Event Streaming Stack
Practical insights into event-driven technologies for developers and software architects

[Get the guide](https://www.quix.io/event-driven-event-streaming-guide)



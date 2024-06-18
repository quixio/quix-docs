---
title: "Navigating stateful stream processing"
date: 2024-03-22
authors: [tim-sawicki]
slug: navigating-stateful-stream-processing
description: >
  Discover what sets stateful stream processing apart from stateless processing and read about its related concepts, challenges and use cases. 
categories:
  - industry-insights
---

# Navigating stateful stream processing

Discover what sets stateful stream processing apart from stateless processing and read about its related concepts, challenges and use cases. 

<!-- more -->

## What is stateful stream processing?  

Similar to stateless stream processing, stateful stream processing involves
continuously processing [streaming data](https://quix.io/blog/data-streaming-
faq). But, going beyond this common denominator, stateful and stateless
processing are fundamentally different. In stateless processing, each piece of
data is processed independently, with no memory of previous events.

Meanwhile, stateful stream processing maintains a memory of past events. This
memory, or "state", allows the processing system to track changes over time or
across different data points. It also enables the system to perform complex
calculations that depend on the sequence or accumulation of data points.

For example, in a ride-sharing application, stateful stream processing can
dynamically match drivers with nearby ride requests by maintaining a
continuously updated state of drivers' locations and their availability
status. This state is crucial for making real-time decisions on the best
driver for each ride based on proximity and driver status.

## Stateless vs. stateful stream processing

Stateful and stateless processing are the two main approaches for processing
streaming data. But how are they different?

As mentioned before, stateless stream processing involves handling each event
in isolation, without considering past (or future) events.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65fd53b1ce612b9a7e20b6a1_Stateless%20stream%20processing.png)

This method is best suited for scenarios where the latest event is the most
important one and there's no need for historical context. For instance,
counting the number of visitors on a website in real time. Or creating real-
time alerts for threshold violations (e.g., temperature spikes).

Stateless stream processing offers some significant benefits:

  * It’s straightforward to implement and easy to scale (i.e., you simply add more workers).
  * Recovery from failures is fast, as there is no state to restore or reconstruct. 
  * Lower latency, computational and memory requirements compared to stateful processing (since there's no need to access or update state information, which can add overhead). 
  * Independent events can be processed in parallel without concern for ordering or state consistency.

However, going beyond its advantages, stateless stream processing has some
serious drawbacks, such as:

  * You can’t join or aggregate data. 
  * Ineffective for use cases where deduplication, event ordering and exactly-once semantics are critical. 
  * Unsuitable for complex computations that require knowledge of past events or state. This means you can’t really use stateless processing to identify patterns. 

In contrast, stateful stream processing maintains information about past
events, enabling operations that rely on the history or state of the data
stream.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65fd53d5f89cf554b75f482c_Stateful%20stream%20processing.png)

This approach is necessary for use cases that require an understanding of
event sequences or cumulative data, such as tracking user sessions on a
website or monitoring stock prices for trend analysis. The stateful approach
brings the following advantages:

  * It enables us to analyze patterns, sequences and relationships within data by leveraging historical context and aggregating events over time.
  * It supports time-based operations such as windowing.

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
  * It allows us to maintain and manipulate state across events, offering deeper insights and more sophisticated data processing capabilities.
  * Allows for real-time decisions and dynamic computations based on the evolving context within a stream, enabling applications to respond to complex patterns or trends as they develop.

That’s not to say that stateful stream processing is without its flaws. State
is notoriously hard to handle, which makes stateful stream processing much
more difficult to implement than stateless processing (I talk more about the
challenges of stateful processing later in this article). On the other hand,
stateful processing unlocks new use cases that you simply can’t achieve with
stateless processing.  

## Managing state in stream processing

Managing state is a vital consideration when dealing with stateful stream
processing. This entails things such as:

  * Keeping track of the current state of the system to maintain continuity and coherence across data interactions.
  * Ensuring that state remains consistent across different components or nodes. This might involve consensus algorithms in distributed systems or synchronization mechanisms in client-server architectures.
  * Handling the update and modification of the state in a controlled and predictable manner, often through well-defined interfaces or functions to prevent unpredictable behavior or inconsistencies.
  * Partitioning or sharding the state across multiple nodes or instances, to improve performance and manageability.
  * Implementing strategies for recovering the state after failures to ensure the system can resume operation with minimal data loss or downtime. This includes checkpointing and log replay mechanisms.
  * Storing state. Many stateful data processing systems often utilize in-memory data structures for fast access and updates, combined with persistent storage solutions (like distributed databases or filesystems) for durability and recovery purposes. This hybrid approach ensures that the state can be quickly accessed and modified while also being recoverable in case of system failures. 

## Key concepts and operations related to stateful stream processing

Now that we’ve defined stateful stream processing (and reviewed how it’s
different from stateless processing), it’s time to review some key concepts
and mechanisms that are tightly related to it.

### Windowing

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```

Windowing is a technique that’s used to divide a continuous data stream into

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
finite chunks (called windows) based on time or other properties (e.g., the
count of events). In essence, windowing helps us turn unbounded data into

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
bounded data streams. This division enables us to apply stateful operations
like joins and aggregations to these smaller, finite sets of events.

There are different types of windows you can use for stateful stream
processing. Here are the most common ones:

  * **Tumbling windows** allow for the processing of data in fixed-size, contiguous, non-overlapping chunks. They are great for calculating moving averages over fixed time intervals.
  * **Hopping windows** enable us to process data in fixed-size segments that overlap and “hop” (advance) forward in time at a specified interval. They are ideal for use cases that require continuous, detailed analysis with overlap to smooth out data variability and ensure no event is missed. 
  * **Sliding windows** are used to group events within an interval that slides over time. They are best suited for use cases that demand continuous, real-time analysis. For example, you could leverage sliding windows to aggregate sensor data from machinery components (such as temperature, vibration, or pressure) to detect patterns or trends that may indicate equipment failure. 
  * **Session windows** group events into dynamic intervals based on activity, filtering out periods of time when nothing happens. They are a great choice for scenarios where you need to analyze user activity (e.g., analyzing browsing sessions to identify paths to purchase and optimize the online shopping experience for online buyers). 

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65f4735f137f90003e1b1793_Hopping%20windows.png)

_Hopping windows example, where each window is one  minute long and the
hopping interval is 30s._

To learn more about the different types of windows, their benefits and use
cases, [check out our guide to windowing in stream

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
processing](https://quix.io/blog/windowing-stream-processing-guide).

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```

### Stateful computations

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```

Unlike stateless computations (where the outcome of a process depends solely
on the current input), stateful computations refer to operations that leverage

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
historical data (previous state) to make decisions or calculate results for
incoming data. There are various types of stateful computations, including

```py
transactions = [100, -50, 200, -100]  # Positive values are deposits, negative values are withdrawals
current_balance = 150 # Initial balance

# Iterate over each transaction
for transaction in transactions:
    current_balance += transaction  # Update the balance with each transaction
    print(f"Current balance: {current_balance}")  # Print the balance after each transaction
```
aggregations (such as running totals and top-N items), joins and windowed
computations (e.g., sliding window averages or tumbling window counts). Let’s
look at a few fictional examples to better put things into perspective.

Here’s a snippet indicating how you can calculate the running total of a
user's transactions over time to display their current balance in a banking
app:

‍

The balance is continually updated each time a new transaction
(deposit/withdrawal) occurs.

For our second example, imagine you want to continuously monitor equipment in
a manufacturing plant. For this purpose, you want to join event streams that
correlate sensor readings with equipment status updates. You’re also aiming to
enrich sensor data with the latest equipment status whenever a status update
occurs. Here’s how you might go about it:

‍

In this snippet above, **latest_status** acts as the state holding the most
recent status update for each machine. Each sensor reading is then joined with
this latest status, providing a continuous, stateful join of the two streams.
The output looks like this:

‍

As our third and final example, here's a snippet showing how to calculate a
moving average of stock prices using a tumbling window:

‍

For each window, the code computes the average of three prices and prints the
result. The tumbling window moves through the **stock_prices** list in steps
equal to the **window_size** , ensuring that each price is only included in
one window.

### Watermarks

Watermarking is a mechanism that allows us to handle late, out-of-order events
(which are quite frequent when it comes to data streams). Note that
watermarking is commonly used when working with windows. In essence, a
watermark specifies a threshold (grace period) that indicates how long the
system waits for late events.

For instance, let’s assume we have a [stream
processing](https://quix.io/blog/what-is-stream-processing) system that
aggregates events in 5-minute windows. If an aggregation window ends at 12:05
and a watermark with a 1-minute buffer is used, the system waits until 12:06
(1 minute after the window technically closes) to start processing data for
the window that ended at 12:05. The watermark guarantees that the system
accommodates events with timestamps indicating they were intended for the
12:05 aggregation window, despite arriving late.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65fd534e57b3635f686a83a6_Watermarks.png)

Watermarks are vital for ensuring accurate data processing, especially in
applications where the order and timeliness of events are paramount.

### Checkpoints

Checkpointing is a mechanism designed to ensure fault tolerance and data
consistency. It works by periodically capturing the state of a stream
processing application at specific points in time. By using checkpoints (also
known as snapshots), the system can recover from failures by restoring the
state to a known good point.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65fd536a44d8761f25fcd9d7_Checkpoints.png)

There are two main types of checkpoints: full checkpoints and incremental
checkpoints. Full checkpoints involve capturing the complete state of the
application at a checkpoint interval. As each checkpoint contains a complete
snapshot of the state, rolling back to a known good state is straightforward.
However, this approach can be resource-intensive due to the volume of data.

In comparison, incremental checkpoints only capture the changes in state since
the last checkpoint. This approach significantly reduces the computational
overhead and storage requirements,  as only changes since the last checkpoint
are stored. On the other hand, using incremental checkpoints can lead to a
more complex recovery process, where you have to reconstruct the state from
multiple snapshots.

## Stateful stream processing use cases

Stateful stream processing often plays a key role in event-driven
applications, streaming applications, streaming data pipelines, [ML
pipelines](https://quix.io/blog/the-anatomy-of-a-machine-learning-pipeline)
and [streaming ETL](https://quix.io/blog/streaming-etl-101) architectures. It
enables complex data interactions and sophisticated data transformations,
helping businesses enhance operational efficiency and real-time decision-
making.

Below, I list some of the features, capabilities and experiences that are
commonly powered by stateful stream processing.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65fd5402c58c926878d5ffa5_Stateful%20stream%20processing%20use%20cases.png)

### **Fraud detection**

Financial institutions employ stateful stream processing to analyze
transactions in real time (and compare them to previous ones) to detect
patterns and anomalies. This allows banks to identify potential fraud as it
happens, reducing losses and enhancing customer trust.

### **Personalization**

In e-commerce, stateful stream processing underpins clickstream analysis. By
analyzing user interactions in real time, online shops can tailor and serve
content and recommendations based on individual preferences, boosting user
engagement and conversion rates.

Related reading:[ Learn how to analyze clickstream data in real time and
trigger special offers based on user behavior ](https://quix.io/blog/analyze-
clickstream-data-real-time-trigger-events)

### **IoT**

Stateful stream processing is essential for managing data from sensors and
devices. It enables real-time monitoring, control and optimization of IoT
ecosystems across smart homes and industrial automation.

### **Monitoring**

Stateful stream processing is crucial for real-time monitoring across
networks, IT systems and applications. It facilitates the detection of
performance issues, security threats and operational anomalies.

### **Predictive maintenance**

Stateful stream processing helps us continuously analyze unbounded streams of
data from machinery and equipment, so we can identify patterns and predict
failures before they occur. This helps reduce downtime and maintenance costs
in industries like manufacturing, energy, and transportation.

Related reading:[ Learn how to predict 3D printer failures in real time
](https://quix.io/blog/build-deploy-predictive-maintenance-app)

### **Time series analysis**

Stateful stream processing is leveraged to analyze sequential time series data
points collected over time, such as financial market data, meteorological data
or user activity logs. Stateful stream processing empowers real-time trend
analysis, anomaly detection and forecasting.

Related reading: [A gentle introduction to time series
analysis](https://quix.io/blog/time-series-analysis)

## Challenges of stateful stream processing

Designing and operating a reliable stateful stream processing system is a
difficult task. Let’s review the main challenges you will encounter.  

### Achieving exactly-once semantics

Exactly-once processing semantics is the golden standard for data integrity
and accuracy. However, achieving exactly-once processing is a formidable
challenge. Due to network failures, software bugs or other disruptions,
messages can be lost or processed multiple times. To prevent this from
happening, you have to resort to mechanisms like:

  * Idempotency, which guarantees that performing the same operation multiple times will yield the same result as if it was executed only once.
  * Transactional state management, which ensures that all changes to the state are committed only if the entire transaction (i.e., the series of operations that make up the transaction) succeeds. 
  * Checkpointing, which allows the system to restart processing from the last checkpoint in case of a failure. This helps avoid data duplication and data loss.

These mechanisms significantly increase the complexity and overhead of the
stream processing system, as they require additional storage, more
sophisticated programming models and careful coordination across distributed
components.

### The complexity of dealing with state

While stateful stream processing enables richer, more dynamic data processing
capabilities, managing state — its creation, updates and cleanup — is
challenging, especially in a distributed system.

There are many related questions to answer and challenges to overcome. Here’s
but a taste:

  * How can I implement replication to maintain state integrity without introducing unacceptable latency? 
  * What are the best practices for balancing in-memory state management with the need for durable, persistent storage? 
  * How can I ensure the atomicity of state updates across distributed components to maintain data consistency? 
  * What consensus algorithm and synchronization mechanism are best for my use case? 
  * What approach should I take to secure state data, particularly in environments with stringent data protection regulations? 
  * How do different serialization/deserialization strategies for state affect performance and system resource usage, and which should I implement? 
  * How can I structure state updates and modifications to allow for both flexibility and predictability in response to evolving data streams?
  * What methods ensure optimal state distribution for performance gains and system manageability in the context of partitioning or sharding?
  * What strategies can I leverage to monitor state health and detect anomalies in real time? 
  * What state store should I use for state persistence, and how do I optimize it so it meets my scalability, speed and consistency requirements?

### Ensuring fault tolerance

Fault tolerance is essential for any stateful stream processing system. The
system must be able to recover from issues like hardware failures, network
disruptions and software errors without losing important data or stopping
operations. To achieve this, reliable safety measures must be implemented,
including saving the system’s state at certain points (checkpointing),
duplicating data (replication) and having backup plans for when something goes
wrong (failover strategies). However, implementing these measures increases
the system's complexity and resource requirements.

### Handling data inconsistency

Techniques like distributed consensus algorithms (e.g., Raft or Paxos) are
often used to maintain state consistency, but they come with trade-offs in
terms of performance and complexity. For instance, these algorithms require
multiple rounds of communication between nodes to agree on the state, which
can increase latency. Additionally, implementing and maintaining these
algorithms increases development and operational overhead.

### Scaling the system

You can easily scale stateless stream processing horizontally by adding more
processors that work independently. However, stateful stream processing is not
as straightforward. You not only have to scale the server layer but also
ensure that the state is consistently updated and accessible across all nodes.
This need for state synchronization and consistency often leads to bottlenecks
that don't exist in stateless architectures. It also makes it difficult to
scale effectively without compromising performance.

### Managing stateful stream processing in-house is difficult

The costs associated with managing a stateful streaming system in-house can be
significant. These include the costs of hardware and storage resources,
operational costs to manage and monitor the system and development costs to
implement the necessary features and make the system scalable and fault
tolerant. For many organizations, these costs can be a major barrier to
adopting stateful stream processing. On top of that, implementing stateful
stream processing can be a lengthy process.

For example, the Contentsquare engineering team worked for a year (!) to
migrate from Apache Spark to another stateful stream processor, Apache Flink.
It was a road riddled with challenges and gotchas they wished they had known
earlier — you can read all about it
[here](https://engineering.contentsquare.com/2021/ten-flink-gotchas/).

## Stateful stream processing technologies

If you’re looking to implement stateful stream processing capabilities, there
are multiple technologies to choose from. First, there are open-source stream
processors like Apache Flink, Kafka Streams, Apache Storm and Apache Spark
Structured Streaming. The main advantage is that you can flexibly customize
and integrate them into diverse environments without licensing costs. The main
downside is that they are challenging to manage in-house.

Related reading:

  * [Learn how Kafka Streams compares to Spark Structured Streaming](https://quix.io/blog/kafka-vs-spark-comparison)
  * [Flink vs Spark vs Quix Streams: benchmarking stream processing client libraries](https://quix.io/blog/compare-client-libraries-spark-flink-quix) 

If you don’t have the time or desire to deal with open source stream
processors, you can resort to managed solutions like Google Cloud DataFlow,
Azure Stream Analytics or Amazon Managed Service for Apache Flink. These
services offer quick deployment and managed infrastructure to simplify the
setup, maintenance and use of stateful stream processing capabilities. The
disadvantage is that they can lock you into a specific vendor's ecosystem and
pricing model.  

A rather recent trend worth mentioning is the emergence of Python-based stream
processing technologies. This is interesting to see, because streaming
technologies have traditionally been Java-centric. But there are good reasons
for merging Python and stateful stream processing: Python is becoming one of
the most popular programming languages in the world (if not the most popular).
It’s also the lingua franca of data science and machine learning, which have
excellent synergy with streaming data and stream processing.

Quix is an example of a Python-based stream processor. Quix comes in two
“flavors”:

  * [Quix Streams](https://github.com/quixio/quix-streams), an open source, cloud-native library for processing data in Kafka using pure Python. It’s designed to give you the power of a distributed processing engine in a lightweight library by combining the low-level scalability and resiliency features of Kafka with an easy-to-use Python interface. [Quix Streams supports stateful operations using RocksDB](https://quix.io/docs/quix-streams/stateful-processing.html). 
  * [Quix Cloud](https://quix.io/docs/quix-cloud/overview.html), a fully managed platform that provides everything you need to build, deploy and manage industrial-strength stream processing applications using Python.

[Check out this gallery of templates](https://quix.io/templates) to see what
kind of stream processing applications you can deliver with Quix.  




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



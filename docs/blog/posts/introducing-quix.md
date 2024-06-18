---
title: "Introducing Quix, a platform that streamlines machine learning on streaming data in real time"
date: 2023-07-19
authors: [mike-rosam]
slug: introducing-quix
description: >
  Today, my co-founders Tomas Neubauer, Peter Nagy, Patrick Mira Pedrol and I are excited to introduce Quix, the cloud data platform we started developing just over a year ago.
categories:
  - announcements
---

# Introducing Quix, a platform that streamlines machine learning on streaming data in real time

Today, my co-founders Tomas Neubauer, Peter Nagy, Patrick Mira Pedrol and I are excited to introduce Quix, the cloud data platform we started developing just over a year ago.

<!-- more -->

Today, my co-founders Tomas Neubauer, Peter Nagy, Patrick Mira Pedrol and I
are excited to introduce [Quix](/product), the cloud data platform we started
developing just over a year ago.

Our mission is to democratize access to data streaming technology in the
cloud. This means making it easy for any Python developer to stream data and
process it with real-time machine learning models so they can build automated
product experiences with the same quality and reliability as the world’s
leading Machine Learning (ML) organizations without any of the hassle, time
and investment needed to set-up the underlying infrastructure.

Our founding team met at McLaren where we built systems that most Formula 1
teams now use to stream and process over a million data points per second in
real-time. This is the ultimate live-data environment where a team’s ability
to connect engineers to streaming data is directly correlated to their
performance on track.

At McLaren, we also consulted on projects to apply real-time ML in the sports,
automotive, transportation and healthcare industries. We helped clients use
real-time data to improve fan engagement, develop electric vehicles faster,
predict tire failures in vehicle fleets, and optimize postoperative outcomes
for patients.

Across these experiences, we kept seeing the same pattern: the rapid adoption
of message broker technologies increasing the value of data-driven operations
in every industry, together with the explosion of people with Python skills,
the language of machine learning. The two trends should be a match made in
heaven, the problem is that [machine learning on streaming data in real-
time](https://huyenchip.com/2020/12/27/real-time-machine-learning.html) is an
order of magnitude more difficult than ML on batch data. And whilst our data
scientists could quickly develop ML models off-line, it took us years to
operationalize machine learning on streaming data infrastructure.

We’ve since met with many companies working on real-time machine learning
projects, and they all have similar problems. ML-first companies like Uber and
Airbnb [invest hundreds of millions](http://www.smbceo.com/2019/09/04/what-
are-the-costs-of-big-
data/#:~:text=Each%20of%20these%20clusters%20is,it%20needs%20about%20200%20nodes.)
to develop bespoke internal solutions, whilst huge legacy organizations in
every industry pay suppliers eye-watering sums for never-ending digital
transformation projects. And whilst broker technology is becoming more
accessible, operationalizing real-time ML on streaming data remains entirely
out of reach to all but the top 1% of ML-first companies.

We founded Quix to solve this problem by helping any Python developer work
with streaming data. Quix is a developer-first platform with the message
broker at the core. It accelerates the development of real-time data-driven
products by providing all the infrastructure, APIs and SDK that Python
developers need to stream, process and store data without support from any IT,
DataOps or DevOps people.

The goal is to make data science on streaming data accessible to any
organization, regardless of size, funding, or industry, by providing a fully
self-service platform that enables Python developers to focus on the business
logic.

## The time value of streaming data

The last decade has seen a groundswell in the adoption of data technologies as
organizations realized their data is an asset worth capitalizing on.
Initially, organizations gained insights into their data after the transaction
took place. This helped with future decision making with companies using the
insights to improve their products and services.

As the value of the insights increased so did the size and complexity of the
data. Organizations raced to double down on competitive advantage by creating
more data and processing it more quickly. A vast ecosystem of tools and
techniques rapidly emerged to help organizations process this big data, with
Machine Learning becoming the holy grail of automated value extraction at
scale.  

![Time-value of data graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be69cfca5cb4b0be2e79f8_Time-value-
of-data-graph.webp)

Time-value of data graph

More recently organizations have realized [there is a time value to their
data](/blog/history-of-data-processing). With the explosive growth of digital
products and services in every industry, organizations quickly learned that
they must identify the insight, and act on it, as quickly as they can.

  1. [In the digital economy](/use-cases/ecommerce), there’s little value in knowing that a customer didn’t purchase yesterday; instead, a business must optimize the customer’s experience whilst they are still experiencing it, otherwise, they’ll go elsewhere.
  2. [In manufacturing](/use-cases/mobility), companies can process machine data in real-time to optimize product quality throughout the supply chain. Previously defects were found at end-of-line testing or worse – when the product entered service with a customer.
  3. [In finance](/use-cases/finance), fingerprinting patterns in real-time allows organizations to identify fraud and block bad actors. Currently, financial crime is costing the global finance sector $180 billion per year.
  4. **Logistics, ride-share and food delivery** companies all need to orchestrate suppliers, delivery drivers and customers whilst using external data (like traffic conditions) to optimize delivery times and efficiency.

The number of opportunities to innovate on product features, customer service
and business optimization is only limited by the creativity and ambition of
each organization. Regardless of the feature, the common value in each
opportunity is the absolute requirement to process the data as fast as
practicable because time is the most important factor – the value of data
decays exponentially with time.  

## Streaming data and Machine Learning are currently opposing forces

Organizations that can automate data processing closest to its time origin
will build lasting competitive advantage. Fortunately, communications
technologies like WiFi, 4G and 5G are reducing the cost and latency of
connectivity towards zero and connected devices are now producing data
constantly. These data streams provide an opportunity to deliver hyper-
personalized solutions to every customer, and hyper-optimized solutions for
every process.

At the same time, Python has overtaken Java to become the second-most popular
development language due to its ubiquity in the growing ML and numerical
computing fields and its simplicity driving adoption by Citizen Developers in
every industry.

On the surface, this looks like the perfect storm for any organization.
However, Machine Learning was built around off-line batch data processing, and
streaming data is very different to batch data.

The streaming revolution is being built on message broker technologies which
are gaining widespread adoption for their ability to power real-time software
applications. Unlike the humble database, message brokers are very difficult
technologies to use. They are written in the Java ecosystem by software
engineers for software engineering applications and require specialist
expertise to implement and maintain.  

![Product, broker, database relationship.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6ab6abfd93bbde2c9282_broker-
architecture.webp)

In contrast, the ecosystem of Machine Learning tools evolved on the foundation
of the simple database. Data scientists are not software engineers, yet it is
very easy for any data scientist to read data from a database, process it with
a notebook or model, and write the model results to another database where an
application can call on those results to power a product feature – it’s almost
impossible for them to do the same with a message broker.  

![Products, broker, database relationship with other apps.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6aedd7f493a4a729bee0_broker-
architecture-connected.webp)

Connecting Python developers to streaming data in a message broker is hard.
Today, the only real solution for organizations looking to implement ML on
streaming data is to stream all their data to a database and increase the
scale of their ETL infrastructure to cope with the increased data volumes
whilst also reducing latency of the write and read operations – this is very
costly in capital, human and environmental resources.  

![Flowchart of a machine learning process.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6b3fd6216bb2918ea012_broker-
architecture-machine-learning.webp)

## Operationalizing ML on streaming data is a software engineering problem

If the story holds true (which it does) that message brokers are technologies
for software engineering, and data scientists are not software engineers, then
we either need to retrain data scientists to build software, or build software
to enable data scientists.

Obviously, it’s far easier to build the software, and the world’s most
innovative businesses already know it. Organizations like
[Amazon](https://aws.amazon.com/), [Uber](https://eng.uber.com/michelangelo-
machine-learning-platform/),
[Spotify](https://engineering.atspotify.com/2019/12/13/the-winding-road-to-
better-machine-learning-infrastructure-through-tensorflow-extended-and-
kubeflow), [Netflix](https://research.netflix.com/research-area/machine-
learning-platform) and [Airbnb](https://airbnb.io/) have all invested hundreds
of millions in low latency, high bandwidth platforms to enable their data
scientists to develop and operationalize machine learning projects.

The investment is not just in cash, but also in people and time. Huge teams of
data engineers, software engineers and DevOps engineers – often exceeding two-
hundred people – must work together for years to create their bespoke ML
platforms from various commercial components, open-source technologies and in-
house applications.

All this effort is dedicated to the same cause: enabling data scientists to
focus their skills on the organization’s data. It’s ironic then that so much
time, effort and capital is allocated to developing the data platform, when
all the value lies in the data science – what if an organization could
reallocate those vast resources to the application layer?

With machine learning on streaming data, there is now an opportunity for
organizations to reconsider the balance between investing in infrastructure
and investing in data science. In the last few years several cloud vendors
have emerged with consolidated product offerings for batch-processing which
democratize access to ML, whilst almost eliminating the costs and – more
importantly for most businesses – the time it takes to build an ML-first
solution.  

![Table of data on the performance of different machine learning
algorithms.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6b9da1f629e06a32ca51_Value-added-
layer.webp)

We’ve met with many data leaders who agree that their organizations are
shifting investments from making ML infrastructure to making ML models. With
no technical debt, ML on stream processing is another opportunity for
organizations to lean on software built by professionals whilst investing more
in activities that add value by increasing the size of their data science
teams and unlocking the potential of their developer community.  

## Quix: A data platform for ML on streaming data

As we’ve got to know many organizations developing data-driven products we’ve
found that teams are struggling with the same problems everywhere: streaming
data operations are an order of magnitude more difficult than historic/batch
data operations, especially for the value creators — Python developers.

Quix is a platform for developers working on streaming data. It is designed to
help teams:

  * **Stream** any data from any source with a few lines of code without thinking about the complex message broker infrastructure underpinning their solution.
  * **Develop** any application code using any Python libraries.
  * **Deploy** their code to the bleeding edge of live data in the broker without support from software engineers or DevOps teams.
  * **Connect** the results of their data processing to their applications, closing the data journey with a round-trip taking 10s of milliseconds.

With Quix we pushed the database to the side, instead, we designed a data
platform natively around the message broker whilst providing all the rigor,
security, resilience, monitoring, and logging expected and needed for
business-critical applications.  

![Diagram of a serverless computing architecture, showing the frontend,
backend, and infrastructure layers.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6c480c8ae74544937a45_Broker-at-
core.webp)

###### Message broker at the core of the Quix platform

The Quix Platform consists of:

  1. [Fully managed multi-tenant Kafka](https://www.quix.io/docs/sdk/kafka.html) for streaming data and building data pipelines.
  2. Truly serverless compute environment for deploying models and services.
  3. A data catalog to record the business context of each data stream, exactly as it was when live-streamed.
  4. [An SDK](https://www.quix.io/docs/sdk/introduction.html) enabling Python and C# developers to work with streaming data.
  5. [API’s](https://www.quix.io/docs/apis/index.html) to integrate Quix with external systems using encrypted HTTP.
  6. A Web SaaS enabling teams to quickly develop models and services on live production data streams, ensuring right first-time every-time principals.

![Quix broker, products, database, flowchart](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be6db79cb78686fcac7b8f_broker-
architecture-Quix-solution.webp)

Quix is built to be an edge-of-cloud solution, integrating between any data
producer (such as apps, machines, wearables), any data broker (like MQTT,
Kafka, Kenesis, Pulsar, Pub/Sub), or any data-hub (such as Azure IoT hub) and
any data sink (such a data lake) to provide teams with an out-of-the-box
solution to process data with low latency and low cost.

We launched Quix to help more organizations access real-time machine learning
capabilities by connecting their Python developers to their streaming data and
providing them with an environment where they can rapidly innovate on new
product ideas. Our journey is only just beginning, but I’m proud that we are
helping everyone from the smallest startups to the largest organizations
accelerate change in this real-time streaming data revolution.






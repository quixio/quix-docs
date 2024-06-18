---
title: "How machine learning and AI are improving cybersecurity"
date: 2023-07-19
authors: [mike-rosam]
slug: cyber-security-machine-learning-ai
description: >
  Playing catch-up to online fraud? Monitor your data in real time. AI + streaming data analytics stops cyberthreats faster.
categories:
  - use-cases
---

# How machine learning and AI are improving cybersecurity

Playing catch-up to online fraud? Monitor your data in real time. AI + streaming data analytics stops cyberthreats faster.

<!-- more -->

## Playing catch-up to online fraud? Monitor your data in real time

Cybercriminals are more sophisticated than ever — infiltrating computers,
servers and [IoT devices](https://www.networkworld.com/article/2976270/smart-
refrigerator-hack-exposes-gmail-login-credentials.html) — yet businesses are
often ill-equipped to protect themselves and their customers. The [global
pandemic](https://www2.deloitte.com/ch/en/pages/risk/articles/impact-covid-
cybersecurity.html) punched even more holes in security protocols, with more
people working from home from unprotected or under-protected networks while
more of life moved online.

The solution to this barrage of security threats and breaches could be machine
learning (ML) and artificial intelligence (AI), programs designed to identify
potential vulnerabilities and thwart fraudulent activities. But this solution
requires a massive amount of real-time data processing and analysis, which is
why [Quix](/product) is helping customers automate cybersecurity solutions
quickly and more efficiently than traditional big data processing.  

## The evolution of ML and AI in cybersecurity and fraud detection

How did ML enter the cybersecurity industry in the first place? Before
computers were powerful enough to crunch through vast data, researchers tried
to incorporate ML into cybersecurity solutions.

In 1987, Dorothy Elizabeth Denning proposed the first [anomaly
detection](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=1702202&casa_token=q97miaoa5f0AAAAA:RjUxJnr1tiKTzQqLuvTr9OsDLQG1XBj5_hxecXZ_9JZIrld7eEQ2x4g7N5dQgSVSDZJAFjsf3Fo&tag=1)
model for intrusion detection systems (IDS). A decade later, the Defense
Advanced Research Projects Agency
([DARPA](https://stumejournals.com/journals/confsec/2019/3/109.full.pdf))
provided one of the oldest IDS datasets in cybersecurity.

These first cybersecurity models were based on unsupervised learning
algorithms, which can look for suspicious, previously unknown patterns among
unlabelled data. Unfortunately, the algorithms also generated many false
positives. More recently, with the rise of big data, IT experts combine both
unsupervised and supervised learning algorithms and train their models on
historical data.

Traditionally, engineers built ML algorithms on batch data processing, meaning
that data is first collected and then fed into an analytics system. With this
method, identifying and containing a breach could take days or weeks — it can
only move as fast as a batch is scheduled for download and processing.

Now, fraud detection needs a much faster system that can catch cyberattacks on
the fly.  

## Time is critical for cybersecurity: from data batching to data streaming

Batch processing entails time latencies of hours or even days. It can work to
[automate payroll processes and invoices](https://www.bmc.com/blogs/batch-
processing-stream-processing-real-time/), but it is not ideal for time-
critical cybersecurity.

The more recent development of micro-batch processing makes data available in
“near real time,” approximately a minute. But can you imagine asking every
person making a transaction to wait a full minute before their credit card is
authorized? The latency is just too slow to deliver actionable, valuable
results.

Modern cybersecurity requires stream processing that can handle latency in
seconds to milliseconds. Imagine how many gigabytes of customer data a cyber-
attacker could steal in a single minute or how many transactions the criminal
could rack up.

To look at the problem facing cybersecurity engineers, we tested Apache Spark,
a popular, open-source analytics engine. Spark was designed for ETL workloads:
to _Extract_ data from a data lake, _Transform_ it, and then _Load_ it into
the target database. We found that Spark is not optimal for real-time
processing, even when connected to real-time data streams.

To be efficient, Spark needs to accumulate data in minutes-long batches — and
in the intervening minutes between each batch processing window,
cybercriminals could do millions of dollars worth of damage.

However, super-fast, real-time stream processing is one of [Quix’s
strengths](https://quix.io/docs/sdk/introduction.html). Our platform processes
data in nanoseconds, making it far more capable than Spark at detecting
cybercrimes.  

## Using real-time data stream processing and machine learning for early
detection

Data streaming is built on message broker technologies such as Apache Kafka.
We found that Kafka’s high-speed technology helps to reduce latency. Still,
its processing capabilities are limited to basic operations such as
aggregation, making the complex effort of detecting fraud more difficult.

Quix solves this problem by [using Kafka for streaming data](/blog/set-up-
kafka-for-real-time-stream-processing) while providing a serverless computing
environment where ML engineers can develop and deploy ML/AI algorithms.

[Quix](https://quix.io/docs/sdk/introduction.html) offers a platform to:

  * Stream data in real time and store it in context to ensure relevance
  * Train ML or AI models on historical data (e.g., past financial transactions)
  * Connect the model directly to the broker so that the deployment can process every live transaction
  * Retrain the model regularly to fight new cyber threats.

## The transition from traditional data warehouses to cloud infrastructure

In 2019, Forbes Technology Council wrote that building AI solutions from
scratch costs [15 times
more](https://www.forbes.com/sites/forbestechcouncil/2019/07/02/good-news-a-
successful-ai-project-will-cost-15-times-more-than-you-think/?sh=7fe21dca474d)
than companies planned. The article highlighted that one of the highest costs
in AI development is infrastructure orchestration and pipeline systems.

This presents a significant hurdle for ML/AI projects, so Quix solves this
problem by providing all of the infrastructure needed in a tightly integrated,
user-friendly package. This enables companies to shift their attention (and
money) from building infrastructure to focusing on building better customer
experience and data science applications.

Let’s dig a bit deeper into resources. All of the use cases we’ve described
require resources to process and store data and people to build, configure and
maintain the systems. An experienced team of 7–10 engineers can create a
minimally viable product (MVP) machine learning infrastructure in a year if
they know what they are doing.

Assuming people cost $100,000 per year, the cost in the first year would be in
the range of $700,000 to $1 million. Growing an MVP to a large-scale
deployment can take years as teams learn and iterate their way to growth.
We’ve seen organizations on five-year journeys that cost tens of millions of
dollars and are still developing.

Operational costs depend on technologies and message volumes. A cheap cloud
virtual machine (VM) costs roughly $61 per month for 2 core CPU/8 GB RAM. To
process 1 million messages per second, [Apache
Spark](https://spark.apache.org/docs/latest/hardware-provisioning.html) would
reach full RAM capacity with approximately 22 VMs, which equals $1,311 per
month. On the other hand, Quix can process the same flow of messages with 4
VMs at the cost of $244 per month. Furthermore, since it is advisable to not
exceed 50% capacity, we’re looking at around 44 VMs for Spark and 8 VMs for
Quix, which makes the pricing comparison even more favorable for Quix.  

## New pressures accelerating the importance of cybersecurity

Cyber attacks cost businesses time and money, and can include the theft of
intellectual property and corporate information. In 2020, the average cost of
a data breach was [$3.86 million
globally](https://www.capita.com/sites/g/files/nginej291/files/2020-08/Ponemon-
Global-Cost-of-Data-Breach-Study-2020.pdf) and $8.64 million in the United
States.

Furthermore, consumers and governments expect companies to adopt increasingly
efficient cybersecurity and privacy measures (e.g. the GDPR law in the EU and
the UK). That means that cybercrimes can ruin companies’ reputations and may
lead to regulatory fines and legal liability.

According to the [MarketsandMarkets 2019
report](https://www.marketsandmarkets.com/Market-Reports/artificial-
intelligence-security-market-220634996.html), AI in the cybersecurity sector
is expected to increase by 23.3% between 2019 and 2026. Another study
published by [Allied Market
Research](https://www.alliedmarketresearch.com/cyber-security-market)
forecasts that the total value of this industry will exceed $300 billion by
2027, and mentions the growing trend of cloud-based security services in place
of traditional hardware farms.

Our mission is to democratize access to data streaming technologies in the
cloud. [Quix](/product) is an easy and affordable platform for real time data
stream processing, and can be used to build a strong cybersecurity defense.

Read a [case study about detecting financial fraud](/blog/fraud-detection-
case-study) in real time, [join our community,](http://quix.io/slack-invite)
or [try Quix for free.](https://quix.io/signup)






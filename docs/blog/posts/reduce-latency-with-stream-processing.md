---
title: "Reducing latency is better for you, better for your customers and cheaper to operate"
date: 2023-07-18
authors: [mike-rosam]
slug: reduce-latency-with-stream-processing
description: >
  Data stream processing delivers faster results and a better user experience — powered by ML and automation.
categories:
  - use-cases
---

# Reducing latency is better for you, better for your customers and cheaper to operate

Data stream processing delivers faster results and a better user experience — powered by ML and automation.

<!-- more -->

## How stream processing cuts latency for business benefits

People have a low tolerance for any delay. Even a few milliseconds of what
[one user](https://www.tenforums.com/general-support/48511-whats-official-
name-spinning-dots-other-curiosities.html) dubbed the “blue circle of
impatience” can make them wonder if it’s worth the wait. With so many things
competing for our time, every second — or millisecond — counts.

That’s why businesses need to reduce latency. Small decreases in latency can
significantly impact user behavior and your bottom line. You can improve both
with data stream processing. As Booking.com found, even small changes in
latency can have a significant impact.

The world’s largest online travel agent, Booking.com, looked at the impact of
latency on user behavior as part of an analysis of about 150 successful
customer-facing applications of machine learning. As you can see in the figure
below, an increase of about 30% in latency can negatively impact the
conversion rate by more than 0.5%.  

![Impact of latency on conversion graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be8bca4cc687e5b6ddccd8_Impact-of-
latency-on-conversion.webp)

Decreasing latency was associated with the increased conversion rates shown in
the upper left quadrant. Source: [Applied Data Science Track Paper: 150
Successful Machine Learning Models: 6 Lessons Learned at
Booking.com](https://blog.kevinhu.me/2021/04/25/25-Paper-Reading-Booking.com-
Experiences/bernardi2019.pdf)

## Streaming data processing, machine learning and automation can make latency
undetectable

Streaming data processing, sometimes called in-memory or real-time data
processing, means processing data as it happens. Unlike batch processing,
streaming data processing enables you to see and use data in near real time.

When people think about real time data, their minds often jump to business
intelligence and real time dashboards. But the applications of stream
processing are much bigger than just delivering information to people in real
time. It’s about automating immediate action.

A16z asked experts to outline three blueprints for modern data infrastructure
based on organization size, sophistication, and target use cases and
applications. The image below shows how more sophisticated organizations move
from analyzing data to operationalizing it with AI and ML tools.  

![Blueprints for building modern data infrastructure.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be8c0a44ad22282e62b758_Blueprints-
for-Building-Modern-Data-Infrastructure.webp)

Source: a16z, “[Emerging Architectures for Modern Data
Infrastructure](https://a16z.com/2020/10/15/the-emerging-architectures-for-
modern-data-infrastructure/#section--9)” by [Matt
Bornstein](https://a16z.com/author/matt-bornstein/), [Martin
Casado](https://a16z.com/author/martin-casado/), and [Jennifer
Li](https://a16z.com/author/jennifer-li/)

## Better for you, better for your customers and cheaper to operate

Operationalizing real-time data to reduce latency for the end user is better
for them and better for you.  

### Automate analysis to reduce time to action

Data is streaming in at a staggering rate. Even with real time dashboards,
people can’t crunch those numbers fast enough to act before new data arrives.
Combining streaming data processing with machine learning and automation
enables you to deliver insights to the point of action faster.  

> _“Combining streaming data processing with machine learning and automation
> enables you to deliver insights to the point of action faster.”_

For example, **real-time data and machine learning cut audit times in half**.
[GoSpotCheck](https://www.gospotcheck.com/resource/what-is-gospotcheck)
provides mobile team management tools for people in field locations, such as
restaurants, retail establishments and vending machine routes.

Its [image recognition app](https://www.gospotcheck.com/product/image-
recognition) uses machine learning algorithms to quickly analyze images from
the field and process insights on brand, category, supplier, SKU count,
assortment, and percentage share. Results are returned to the representative’s
device in under two minutes, cutting audit times in half and improving
compliance, which is worth tens of millions of dollars in incremental sales.  

### Only process the data you need

Real-time processing reduces the need to collect, store and process all the
data you collect in expensive data lakes and warehouses. With data stream
processing, you can process what you need, when you need it, and choose which
data to store.

> _“With data stream processing, you can process what you need, when you need
> it, and choose which data to store.”_

For example, Netflix **focuses processing resources on the moment when
customers are engaged**. It used to use batch processing to generate
recommendations for all its users. This took an enormous amount of data
collection, storage and processing, but only a fraction of the output was ever
used. Users who didn’t log in never saw the recommendations, so the processing
resources used to generate those recommendations were wasted.

With data stream processing, Netflix can generate recommendations the moment a
customer logs in and can base those recommendations on their most current
data. Users get a fresh set of recommendations every time and Netflix is only
processing the data they need.

The same concept can be applied to call centers. They don’t need access to all
customer data. They only need information about the customers who call. With
streaming data processing, systems react to a customer call by sending the
data to the customer representative. The latency is undetectable and that
representative now has the most current info, not yesterday’s batch records.

This translates to cost savings because you’re not processing and sending big
batches of data when you only need a fraction of that information.  

### Automation yields big savings

With streaming data processing, data is processed in memory and corresponding
processes can be automatically adjusted in response.

**A high degree of automation helps Goldman Sachs clients save 30% to 50% of
their costs**. Goldman Sachs is tapping into the power of big data and real
time processing to modernize transactional banking. The relatively new
offerings were built for treasurers who want to upgrade from batched-based,
high-latency files to new features with a high degree of automation and
sophistication.

The impact on cost savings is impressive. Check out [this
video](https://www.linkedin.com/showcase/goldman-sachs-transaction-
banking/videos/) from Hari Moorthy, Partner and Global Head of Transaction
Banking at Goldman Sachs.  

## Traditional data batch processing can’t keep pace with business needs

Even real time dashboards introduce latency, because managers need time to
understand and act on the information. That’s why automation is essential —
machine learning or AI can tap directly into the data stream to monitor and
respond to events as they happen.

For example, a Quix customer with a high-tech manufacturing facility uses Quix
to monitor vibrations from expensive tooling. If a machine starts to vibrate,
it’s a likely indication that a part could break down.  

> _“This is all done with no latency caused by human decision-making — a
> split-second action enabled by stream processing.”_

With [Quix](/), the company can automatically shut off the machine and find
the source of the problem, rather than waiting for a full breakdown that could
put the tool out of commission. This is all done with no latency caused by
human decision-making — a split-second action enabled by stream processing.

Traditional ML architectures put the database in the way of performance. Your
data must be written to disk, extracted to memory, served to compute and the
results consumed and written back to disk. Quix eliminates this long and
costly journey. By moving the database to the side, we connect your models
directly to Kafka, keeping your data in memory for optimal performance with
minimal costs.

Find out how Quix can help you shift from batch processing to streaming data
processing. If you have any questions, join us on our [community
Slack](http://quix.io/slack-invite).






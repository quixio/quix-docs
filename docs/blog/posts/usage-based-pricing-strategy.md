---
title: "The business value of usage-based pricing"
date: 2023-07-13
authors: [mike-rosam]
slug: usage-based-pricing-strategy
description: >
  Move over, subscription pricing. Usage-based pricing maximizes the value of a service for product-led growth, building trust and transparency in the process.
categories:
  - industry-insights
---

# The business value of usage-based pricing

Move over, subscription pricing. Usage-based pricing maximizes the value of a service for product-led growth, building trust and transparency in the process.

<!-- more -->

**Alert: This post includes details about Quix that are no longer accurate. We
have updated information**[**here**](/pricing)**.**

## Maximize value and transparency with real-time, usage-based pricing

Usage-based pricing is going mainstream. Nearly half of all SaaS companies
report using usage-based pricing — that’s a 200% growth in the past four
years. And that number is expected to increase. According to the [2021 State
of Usage-Based pricing](https://openviewpartners.com/blog/2021-state-of-usage-
based-pricing/) survey, 79% of SaaS companies will likely rely on usage-based
pricing in two years.

Quix is among those companies employing a usage-based pricing model to
maximize the value our customers receive and to learn about how they’re using
the Quix product.

We know it can be challenging to execute usage-based pricing, so we’re happy
to share our implementation, experience, and results in this article.  

## What is usage-based pricing?

Usage-based pricing means customers pay for what they get — no more, no less.
A company that uses usage-based pricing derives its revenue directly from how
and to what extent its customers use its products or services.

Two primary types of usage-based pricing exist: subscription and consumption.

### Usage-based subscription pricing

You’re probably pretty familiar with this model. Customers pay at regular
intervals for specific products, features, and services with a subscription
model. A customer might add an extra layer of security to a music subscription
for $5 per month or $500 per year for heated seats in a vehicle they’re
leasing. They’ll keep paying that price even if they never open that app or
car door.

### Usage-based consumption pricing

With usage-based consumption models, customers pay for their active use of the
product or service. A database company might charge a fractional dollar for
each byte of data written to a disk. Some new auto insurance companies charge
by the mile driven. Other interesting examples include [Rolls
Royce](https://www.rolls-royce.com/media/press-releases-
archive/yr-2012/121030-the-hour.aspx), which for nearly 60 years has priced
aircraft engine maintenance based on hours of flying time, and scooter
companies like Voi, which base prices on time and distance. If executed
correctly, consumption-based models create the most value for customers by
letting them pay for the products and services that they use.

### A few considerations: product and resources

Before executing usage-based pricing, companies should look at the structure
of their products and their engineering resources. Products and services need
to be divided into measurable components that are easy to understand. It’s
also helpful to offer customers some educational materials that help them
understand the purpose and value of each element.

Implementing and tracking usage-based consumption pricing can be a daunting
prospect. Thankfully, the rapid adoption of smart technology enables companies
to collect the data they need to adopt one of these pricing models and the
tools they need to process that data. Quix can help, too.  

## Quix’s mix of subscription and consumption usage-based pricing

At Quix, we use a mix of subscription and consumption-based pricing models.
Our monthly subscriptions give smaller customers peace of mind with “all-
inclusive” packages, while our consumption-based model provides elastic
pricing to larger customers with more variable demands for application
infrastructure.

Consumption-based pricing is the jewel in the crown. To keep payment easy,
customers purchase credits that can be spent on any Quix resource.

Here’s a sample breakdown of product resources, credit use, how those credits
are measured per resource, and the period they’re tracked over.  

![Table of data on data streaming, including resources, credits, unit, and
period.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92dbd1a676360626a3cbe_Pricing-
table.webp)

You can see that the units for a
[workspace](https://quix.io/docs/platform/definitions.html) is a month. This
is because the resource (a workspace) is likely durable — we don’t expect
customers to create and destroy them frequently. However, if a customer had
one workspace for one hour, we would calculate and charge for just the hour.

This is because, like CPU and memory, all resources are billed depending on
precise actual consumption. From a business perspective, this approach ensures
customers don’t simply sit on a service. They use everything that they pay
for, no matter the quantity.  

## How we used stream processing to build our usage-based system

Built on Quix, our billing system uses a microservices approach that passes
data down a pipeline of processing nodes. The data is kept in-memory so that
we can process billions of micro-transactions while only using a minimal
amount of compute resources.

This is a mission-critical system. We don’t want to miss any data, as it could
lead to over- or under-charging. Fortunately, Quix guarantees uptime by
replicating data delivery and processing across multiple clusters. It also
handles self-healing and backups in case of problems.

This diagram offers an overview of the billing system’s architecture. If you
want to dig into the details, you can find them in our blog post, “[How to
develop a usage-based pricing system](/blog/how-to-build-usage-based-
pricing).” For now, I’ll just hit the high points.  

![Flowchart showing the pricing system.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92e12ad5a6e90a1e6f3c6_Usage-based-
pricing-diagram.webp)

We start by gathering data, such as CPU usage and disk I/O, from the
underlying Quix platform. Once that’s gathered, it’s sent over HTTP using the
Streaming Writer API gateway. The data is collected in the smallest possible
quantity for each resource (milliseconds, millicores and bytes), which
provides a high level of accuracy. Once the data is collected, it runs through
the stream processing pipeline. This part of the process groups the raw data
according to customer accounts (our business context) and expresses it in the
number of credits used by minute and hour.

Customers can see how much credit they’re using in real time on the Quix
billing page. No need to wait to the end of a month to know how many credits
you’re using.  

![Screenshot of Quix app showing remaining credit of 191.07
credits.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b92eaee7ffc183dd6f0240_Billing-
breakdown.webp)

The billing page uses the Streaming Reader Websocket API, which pushes data to
JavaScript to keep up with the frequent updates. The client uses this API to
read live data from the main pipeline and gives customers a real-time view of
total spend and current consumption rate. This is one of the many benefits of
choosing streaming data processing over batch processing.

This system regulates a set of powerful (yet unwieldy) tools that ultimately
minimizes the number of people we need on our team, and the amount of time
they need to spend learning how to use new products.

Read more about the time Quix saves us maintaining our billing system in our
blog post, “[How to develop a usage-based pricing system](/blog/how-to-build-
usage-based-pricing).”  

## Flexible, transparent pricing that leaves customers and companies happy

Both subscription and consumption models offer a host of benefits to all
involved.

Subscription pricing is a straightforward system that lets customers feel in
control of their spending, and it’s easy for companies to implement and
communicate.

Consumption-based pricing is elastic and focused on value. It eliminates
barriers to adoption and accommodates all levels of users. By removing the
issue of a rigid price tag, people can experiment with a product or maintain
light usage. And, because pricing scales predictably and transparently, it
also fits the heaviest users. Customers are in control of their spending on an
exceptionally granular level.

Providers also benefit from consumption-based models. Implementing the system
helps you discover the usage patterns of your clients and implement dynamic
pricing to ensure all components are as profitable as possible.

A tool like Quix can help your customers feel valued and in control of pricing
while ensuring your team uses their time efficiently. If this sounds like a
use case you’d like to explore, [book a
consultation](https://calendly.com/clara-quix/30min) with me or chat with me
on [our community Slack](http://quix.io/slack-invite) and let’s talk more.






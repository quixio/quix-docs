---
title: "The future of the modern data stack"
date: 2023-07-13
authors: [mike-rosam]
slug: future-of-the-modern-data-stack
description: >
  Five industry experts forecast how our approach to data will be transformed. Batch vs. stream processing? On-prem vs. cloud? Data lake or data mesh?
categories:
  - industry-insights
---

# The future of the modern data stack

Five industry experts forecast how our approach to data will be transformed. Batch vs. stream processing? On-prem vs. cloud? Data lake or data mesh?

<!-- more -->

## What’s next in managing data, according to data industry leaders

What does the Modern Data Stack look like now — and how will it evolve? Some
of the revolutionary data tools that transformed the on-prem warehouse
approach to data a decade ago are now well-established. The trick is to
anticipate where data will need to go next.

I joined other data technology founders and investors at the [Project A
Knowledge Conference (PAKCon)](https://knowledge-conference.project-a.com/) in
Berlin for a roundtable discussion and some thoughtful forecasting. Ole
Boßdorf, VP of Data and Analytics for venture capital firm (and Quix investor)
[Project A](https://www.project-a.com/), led our discussion. I’m sharing some
key points with you here.  

## Batch vs. stream: Is the data warehouse where data goes to die?

Data’s sheer volume and complexity is a common challenge, but the best way to
process that data — in a batch, as a stream, or both — is up for debate. Batch
processing is popular and caters to most use cases, but this will change as
organizations move from using data for reporting to using data to impact
growth and productivity.

The demand for greater immediacy in data is likely to elevate the significance
of stream processing. Ole kicked off our conversation by asking me to explain
my claim, “The data warehouse is where data goes to die.”

I see companies investing vast sums of money in data lakes where they casually
dump data with little thought about how it will be used. Later, sorting
through this data dump becomes someone else’s problem. That someone else is
usually a data engineer tasked with the time-consuming job of identifying,
extracting and analyzing a set of data to produce an executive report.

Data dashboards might feel like state of the art to many organizations, but
the next generation of value is being created by the companies that build data
products — not data dashboards. While there are use cases for data warehouses,
I believe companies need a processing layer before the data gets into the data
lake or warehouse.

Alastair Appleby, founder and CEO of [Gigapipe](https://gigapipe.com/),
weighed in to say that while streaming has a place, not all data goes to die
in the data warehouse. You can combine both batch and stream processing to
achieve different goals within the same company. It’s very context dependent.  

## It’s time for data governance to shine

More data sets and more complex pipelines are shining a light on the need for
better data governance. Now is the age where non-technical users are
increasingly hungry for data and want self-service access, said Leo Lerach of
[Project A](https://www.project-a.com/). It’s essential to understand how data
is being produced and give that access to people who don’t want to read code.

Martin Salhen, a co-founder of [Alvin](https://www.alvin.ai/), said it’s
always time for data governance, which is coming to the fore as more companies
realize that they need to use the data, not just store it.

This shift brings up compliance requirements, including GDPR. Companies need
tools that create more visibility into where data comes from, how data is
being used, and where the pain points and problems are.

Reverse ETL and reverse analytics, which is moving data from the warehouse
back into the tools, also make it hard to track the data’s lineage, Ole noted.  

## Is on-premise dead?

Leo posed the question: Is on-premise dead? Gigapipe sees half on-premise and
half in the cloud, according to Alastair. While on-premise is typically driven
by security and compliance, he sees companies becoming more comfortable with
the cloud.

I agree with this forecast, but while security is the biggest driver for
physical on-premise or private cloud, some companies are reverting to private
servers due to cost. Some organizations revert from the cloud to private
servers because the cloud becomes too expensive.

For example, Airbnb is migrating off the cloud to their own data centers.
Having the tooling that you can port across the environments will be
increasingly important.  

## The data mesh

The data mesh is a concept of decentralized data warehouses or analytical
databases. There’s a lot of skepticism and confusion around this concept and
its potential benefits.

Companies frustrated with a lack of ROI might be interested in a data mesh,
but my fellow panelists generally agreed that other solutions would be more
cost effective. There is concern about the lack of trust in decentralized data
when many companies are looking for a single source of truth.

I believe there are decentralization use cases associated with lowering
latency. For example, data will travel faster from a data center in France to
Berlin than it can from a data center in America. In some cases, those extra
milliseconds will become a problem.

Martin added that you might need decentralized data centers for GDPR
compliance or other regulatory reasons.  

## Company culture or tribal knowledge

Ole asked the group to step out of their comfort zone and talk about some
challenges facing data teams. Specifically, he noted that in between
responding to an endless stream of requests, teams are building really cool
analyses and machine learning products. Unfortunately, these are not well
documented. It feels like they are starting from zero instead of building on
the shoulders of giants.

He asked us: How can teams improve and start building on what they built
previously? Is that a tooling problem or a cultural problem?

I believe it comes down to good behaviors: good documentation, good software
engineering processes, reusable codes, and well-commented codes. Tooling can
facilitate these behaviors, but engineering teams also need good discipline.

Tooling can also solve issues with different systems and different languages.
Alastair said that Gigapipe addresses the challenge of different languages by
distributing teams by the programming language they use, instead of by
function. This enables a higher level of communication and understanding of
the code base they are using.

If this conversation from PAKCon has you intrigued, learn more about
[streaming data use cases ](/use-cases)and [chat with us in our Slack
community](http://quix.io/slack-invite).






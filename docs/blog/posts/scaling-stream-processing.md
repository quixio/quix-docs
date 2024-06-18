---
title: "You got stream processing to work. Now how do you get it to scale?"
date: 2023-07-17
authors: [mike-rosam]
slug: scaling-stream-processing
description: >
  Data scientists and engineers are frustrated by the challenges of scaling data infrastructure. They know what’s needed, but they lack the time, resources and expertise to implement and maintain it.‍
categories:
  - industry-insights
---

# You got stream processing to work. Now how do you get it to scale?

Data scientists and engineers are frustrated by the challenges of scaling data infrastructure. They know what’s needed, but they lack the time, resources and expertise to implement and maintain it.‍

<!-- more -->

Scalable data infrastructure is critical to keeping pace with increasing data
demands across business functions. [This post includes](/blog/scaling-stream-
processing) why leadership often underestimates infrastructure challenges, how
to scale efficiency in data stream processing and scale stream processing
solutions faster with Quix.  

> “Good, better, best. Never let it rest. Until your good is better and your
> better is best.”

> **Tim Duncan**

This simple quote neatly sums up the importance of scalable data
infrastructure. Data never rests. As mountains of data stream in from IoT and
digital apps, companies face the challenge of finding better ways to capture,
extract value and operationalize it.

If you’re currently just doing batch processing, you might also want to add
machine learning and automation. If you already have a machine learning model,
you want it to work faster. As your business grows, you want your data
infrastructure to handle greater volume without losing speed and efficiency.
And when you start combining all that with live data and stream processing,
everyone else in the company will want to know when they can start using that
system.

The question is, who has the time and resources to continuously redesign data
infrastructure to deliver the next best thing? Moving from batch processing to
stream processing or expanding real-time stream processing across business
functions is a big lift.

The [data engineers](/use-cases/data-engineering) I’ve spoken with estimate
that they spend only 30% of their time on what they see as their primary job:
scaling infrastructure. They feel pressure from multiple directions: keeping
up with business needs, leadership demands, and their expectations to scale
sometimes archaic data infrastructure. This can lead to frustration and
failure as they struggle to meet all these demands.

They’re not alone. Keeping up with data demands is challenging. Many companies
lack the infrastructure needed to scale up efficiently. As [Dan
Ariely](https://twitter.com/danariely/status/287952257926971392?lang=en) put
it, “Big data is like teenage sex: everyone talks about it, nobody really
knows how to do it, everyone thinks everyone else is doing it.”  

## Leadership often underestimates infrastructure challenges

Data science is hard to explain and hard to understand. Leadership doesn’t
always know the difference between a [data scientist](/use-cases/data-
science), a data analyst and a [data engineer](/use-cases/data-engineering) —
or which one they need. Eyes are likely to glaze over when you try to explain
why you can’t just plug real-time data streams into the existing
infrastructure and make it work.

In an attempt to describe data quality issues, former data scientist and
engineer Dan Friedman writes in [Data Science: Reality Doesn’t Meet
Expectations](https://dfrieds.com/articles/data-science-reality-vs-
expectations.html), “I’d often compare it to a garbage bag that ripped, had
its content spewed all over the ground, and your partner has asked you to find
a beautiful earring that was accidentally inside.”  

>  _“Companies struggle to hire and retain someone with the skills to solve
> the infrastructure issues and complete the desired project.”_

This is the mess many data engineers and scientists face at the beginning of a
data project. There are common complaints about the lack of quality data,
messy storage methods, and poor data infrastructure. These challenges can
leave a data project stranded as companies struggle to hire and retain someone
with the skills to solve the infrastructure issues _and_ complete the desired
task.  

![Data scientists nd data engineers statistics.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba705c996fdf73d1c0ba2b_Data-
scientist-statisctics.webp)

###### Source: [Stack Overflow, 2020 Developer
survey.](https://insights.stackoverflow.com/survey/2020)  

## Scale and efficiency in data stream processing

> “Through 2020, 80% of AI projects will remain alchemy, run by wizards whose
> talents will not scale in the organization."

> [**Gartner Top Strategic Predictions for 2019 and
> Beyond**](https://www.gartner.com/smarterwithgartner/gartner-top-strategic-
> predictions-for-2019-and-beyond)

Getting data stream processing to work is good, but it’s not good enough. Too
often, successful projects hinge on individual talent and, therefore, won’t
scale. As volume and ambition increase, the underlying architecture must scale
up to keep pace.  

> _“Scalability is a vital part of data stream processing infrastructure and
> something to consider from day one to avoid time-consuming rebuilds”_

Scalability is a vital part of data stream processing infrastructure and
something to consider from day one to avoid time-consuming rebuilds, such as
those needed by companies like Alibaba and Twitter.  

![Real-time data pipeline during 11.11 Global Shopping
Festival.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba70b20c73018fbbcff1a0_Alibaba-
data-pipeline.webp)

Real-time data pipeline during 11.11 Global Shopping Festival. Source:
[Alibaba](https://102.alibaba.com/detail?id=35)  

Retail giant [Alibaba](https://102.alibaba.com/detail?id=35) uses stream
processing to handle peak traffic and provide real-time data for media
displays, business intelligence and live studio products for executives and
customer service representatives. In 2017, the Alibaba streaming computing
team fully upgraded their stream computing architecture with an average of
more than twice the peak stream processing capability and more than five times
processing capability.

The upgrades enabled Alibaba to successfully process 256,000 payments per
second at peak volume during the 2017 Singles Day shopping festival — more
than double the volume processed in 2016. Since then, Alibaba has continued
investing in stream processing infrastructure, [acquiring Apache Flink backer
data Artisans](https://www.datanami.com/2019/01/08/alibaba-acquires-apache-
flink-backer-data-artisans/) in 2019.

Twitter also made significant upgrades to its stream processing
infrastructure. To avoid a lengthy migration process, it opted to build a new
system dubbed “Heron” to replace their existing system, “Storm,” explained Baz
Bhäte in “[Twitter Storm vs Heron. A real-time streaming system
demands.](https://medium.com/@vagrantdev/twitter-storm-vs-heron-12774056f45b)”
Heron latency is 5–15x lower than Storm’s latency and increases more
gradually; throughput is 10–14x higher than that of Storm, according to Bhäte.

Massive companies like Alibaba and Twitter have the resources to build and
rebuild data stream infrastructure from scratch. But there are solutions for
smaller companies that lack the resources to build, scale and maintain their
own stream processing infrastructure.  

## Scale stream processing solutions faster with Quix

I talk to engineers who have solutions but don’t have the time to scale them.
For them, Quix is the rare silver bullet. They can migrate those solutions
into our platform and scale from there.

We’ve [taken care of all the complicated infrastructure](/blog/release-stream-
processing-online-ide) and made it Python-friendly, so developers and data
scientists can get straight to coding or building their models. This is the
type of big win that can erase months of frustration and open up new
opportunities for data-driven products. And teams can do what they do best,
feeling proud of what they accomplish.

Once you start using stream processing, it’s easy to see [more use
cases](/use-cases) and — with Quix — scaling up to meet those needs is as easy
as sliding a switch. Want to learn more? [Book a
demo](https://calendly.com/clara-quix/30min) with one of Quix’s friendly
experts to talk through your technical challenges in scaling your data
infrastructure. We’re here to help, join us in our Slack channel if you have
any questions.






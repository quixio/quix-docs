---
title: "Why is streaming data so hard to handle?"
date: 2023-07-19
authors: [tomas-neubauer]
slug: why-is-streaming-data-so-hard-to-handle
description: >
  Handling streaming data is not for the faint of heart or thin of wallet. In this post, Quix CTO Tomáš Neubauer digs into why streaming data can be so difficult to set up, complicated to manage, and costly for teams.
categories:
  - industry-insights
---

# Why is streaming data so hard to handle?

Handling streaming data is not for the faint of heart or thin of wallet. In this post, Quix CTO Tomáš Neubauer digs into why streaming data can be so difficult to set up, complicated to manage, and costly for teams.

<!-- more -->

In the world of data, two things are very difficult: Streaming architecture
and building projects that use machine learning (ML). And for the highest
degree of difficulty — the engineering equivalent of gymnast Simone Biles’s
Yurchenko double pike vault — combine streaming architecture with ML.

If your development team can handle this, they deserve a gold medal. For
companies that don’t have legions of developers applied to this task (and even
for many that do), getting the two right in combination is nearly impossible.

That’s partly the fault of the architecture itself. With so many microservices
requiring integrations to harness the power of streaming data, you’re
assembling a puzzle with many pieces communicating with each other. It’s too
easy for a piece to go astray.

In this blog, I’ll share my perspective on why organizations struggle with
streaming data and the design-driven approach to building software that can
harness the power of this fundamental, next-generation approach to data.

## Why aren’t the difficulties associated with streaming data already solved?

We’ve found — and our customers confirm — that most of the streaming
technologies available today are hard to use (I’m looking at you, Apache Kafka
and Pulsar). But ease of use is not an issue for massive organizations with
hundreds of developers to apply to the problem. For the rest of us, it’s a
nightmare.  

> _“Ease of use is not an issue for massive organizations. For the rest of us,
> it’s a nightmare.”_

It’s the difference between building a program that takes dozens of people to
operate versus a program that a small crew can run. Ease of use only matters
to a small team: setup, operation and monitoring must not require hours of
intervention.

Even if you have a brilliant crew, we’ve found that most software engineers
don’t have the in-depth expertise to manage streaming data infrastructure. The
best analogy for this comes from my engineering experience handling streaming
data with McLaren’s Formula One team. Standard automotive engineers build cars
that anyone can drive. But racing engineers build controls with 50 buttons —
and none of them labeled.

Why spend the time labelling when just one guy will drive it? When an average
person tries to do a lap in a race car, they have no idea how to drive it.
That’s Kafka. Suitable for experts, impossible for anybody else.  

## Building the first integrated streaming data platform

Our mission at Quix is to democratize access to streaming data by creating a
platform that makes it [easy to work with
Kafka](https://www.quix.io/docs/sdk/kafka.html). My colleagues and I used our
collective years of experience solving streaming data problems for actual race
cars to engineer a platform that makes the metaphorical Kafka race car
available to everyone.

It’s like we gave the race car a dashboard with just three buttons: start,
drive and stop. And a parking space. And a pit crew. We keep thinking up
clever stuff to keep the driver focused on driving while worrying about car
maintenance and monitoring.

For example, sometimes, when we upgrade Kubernetes, the buttons on its
dashboard change places. So we reroute the connections on our dashboard so our
customers don’t notice that change. That’s one small way we make developing on
our platform so much easier.

Sure, some people can build a streaming data solution themselves — the
equivalent of spending months or years making your own car — but we believe
folks prefer to get a car on demand, one that they can be sure is always
maintained and ready for a road trip.  

## Complications ensue: handling real-time streaming data with ML

It’s one challenge to handle streaming architecture and quite another to
handle real-time data. Once again, it raises the degree of difficulty.

The old approach to data was an application with a database in the middle,
connected via APIs to various sources and systems. But when someone decides to
modernize how an organization’s data is processed — transforming it from
database-centric to stream-centric — the team often struggles because most
engineers don’t have this education or experience.

Enabling machine learning in streaming data is even more difficult. An
organization needs a broad spectrum of skills across software disciplines:
infrastructure engineers who focus on brokers, databases and compute resources
to data scientists specializing in modeling and mathematics. In many cases,
the people who turn streaming data into valuable assets with machine learning
models are also the least technically proficient at managing the underlying
infrastructure.  

## Autonomy is essential for transformation

Many industries, such as financial services, healthcare, automotive,
manufacturing and ecommerce, need to transform from static to streaming data
and make use of this data in real time. For the foreseeable future, we believe
this will happen in Python, which is the de facto language for data science
and one of the most-loved programming languages for application development.
But before we built Quix, there were no real-time frameworks that enabled the
use of Python.

This was a point of pain for our customers, especially data scientists, who
required developers as a go-between their models and Kafka. They needed help
to make a new topic in Kafka; help deploy a new model in Kubernetes; help
monitor the model; or if something went wrong, they needed help getting logs
to figure out what’s broken.  

> _“…the people expected to transform industries with data science and machine
> learning models were stymied by complex infrastructure.”_

This meant that the people expected to transform industries with data science
and machine learning models were stymied by complex infrastructure. Putting
power back in their hands with Python and smart, simple packaging of the Kafka
broker means they can get from A to B to C faster, with fewer resources and
less hassle. Back to our race car analogy, these are folks who want to drive
themselves but can’t.

It also gives power to organizations that don’t want to hire legions of
developers (at a minimum, three teams: data infrastructure, data science, and
software engineering). Our mission is to help data scientists create real
value autonomously, like renting them an easy-to-drive race car without
requiring them to staff their own pit crew.  

## Next-level challenge: handling big data at scale

We’ve been talking about why streaming data is so difficult — the message
broker isn’t user-friendly, and Java and Scala (the de facto languages of
broker ecosystems) are not loved by data scientists and ML engineers,
resulting in a technological mismatch.

Now let’s look at the complications associated with data at scale. In a
database-centric architecture, when someone calls the API to, for example,
serve articles to a Facebook newsfeed, Facebook would look at its database and
serve back the articles. That’s easy engineering because it represents a
simple scope.

But with streaming, many messages are coming at you from the broker — you need
to parse these, figure out what’s relevant, and know how to act on the ones
that matter. The benefit of reacting to messages in real time, at a massive
scale, can only be achieved if you stand up a completely different
architecture than the old-fashioned database.

This complexity is one of the big problems with working with brokers — the
signals are buried within the noise. Traditional database requests serve the
content you request. Streaming data fits all of the content you need — plus a
heap of irrelevant information. Sometimes you must process vast volumes of
data to clean it up.  

## Ensuring your data content has the right context in the stream

Let’s look at an example of a data stream for a company like Uber. With old-
fashioned architecture, your queries might include: “Can I get from X to Y
location in Baltimore? Is there a driver available? Is a driver coming?” Each
API query responds with a specific answer.

But this would not scale. There would be too many requests simultaneously,
effectively crashing the system.

With next-generation streaming data, the message broker can handle thousands
of updates that answer the questions above, plus there are lots of services
reacting to these streams and producing additional messages. The developer
needs to ensure that messages about one user remain part of a single,
contextual stream. The message “Mrs. Jones wants to go to Baltimore” is
related to “Anna is on the way to pick up Mrs. Jones” but should remain
separate from “Mr. Duritz was just dropped off on Sullivan Street.”

If you want to estimate how long it will take Anna to reach Mrs. Jones, all
the relative data must remain in the stream. This is not only for the event
messages but also for all the time-series data like vehicle location, speed
and heading. To merge all this data into one stream requires a good deal of
software engineering to deliver and process the data at scale, not just for
Mrs. Jones but also for all other riders and drivers in the ecosystem.  

## Using streams to make data more efficient and effective

One unique feature of Quix is that we make it very easy to use Kafka not just
for crucial value data, but also for scalar values, metadata, and any blob
(like an image) that you want to stream and process. This is important because
a typical Kafka stream is a jumble of unrelated key-value pair messages with
no interdependent context.

[The Quix SDK](https://www.quix.io/docs/sdk/introduction.html) applies special
treatment to each data type, optimizing its delivery to provide a highly
efficient and low latency solution. The SDK also lets you wrap your data in a
[contextual stream](https://www.quix.io/docs/sdk/features/streaming-
context.html) — essentially, a grouping mechanism for data — to gather
information for a particular context (such as one customer) so you can easily
focus on what matters most.  

> _“…the old-fashioned way would require a ton of engineering, but the Quix
> way requires just a couple of lines of code.”_

Then your stream can tell a cohesive story, such as Mrs. Jones’s entire
customer journey. If you want to send both her live location and the trip
events with a common time stamp, the old-fashioned way would require a ton of
engineering, but the Quix way requires just a couple of lines of code. Our
Formula One days gave me and my colleagues years of experience engineering a
way to send data more efficiently.

Data is also stored more efficiently, based on its context. In the old
paradigm, Kafka doesn’t support aggregation or masking, so if you wanted to
visualize high-rate temperature sensor data over the last two months, you’d
need to read millions of rows to plot a waveform. That analysis is slow and
expensive.

Unlike typical Kafka handling, Quix’s SDK standardizes the wrapper for your
data, which is optimized across every aspect of Quix — our managed Kafka,
serverless compute environment, live API endpoints, and data catalogue. This
makes data handling massively more efficient, effectively storing it as nicely
compact, time-series data.

* * *  

You’ve probably already experienced more than your fair share of hassles
handling streaming data. (And if you haven’t yet experienced the horrors I’ve
mentioned, ask a developer working with Kafka.)

There’s no question in my mind that streaming data will transform industries,
much the way cloud services transformed racks of on-premise servers. There’s
simply a better, faster, lower-cost, more hassle-free way of getting what you
want out of your data. We think we’ve harnessed it at Quix, by solving many
problems inherent in streaming data.

**What do you think?** [Sign up to try Quix](https://quix.io/signup) (get
instant access free, no credit card required) and tell me what you think on
our [Slack community](http://quix.io/slack-invite). I’d love to hear how
you’re wrestling with streaming data, too.




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



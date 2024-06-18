---
title: "What you can do with the Quix SDK and why we developed it from scratch"
date: 2023-07-11
authors: [kiersten-thamm]
slug: why-use-quix-streams-sdk-python-kafka
description: >
  Learn what you can do with Quix Streams, the Quix SDK, and why we dedicated more than two years building it.
categories:
  - use-cases
---

# What you can do with the Quix SDK and why we developed it from scratch

Learn what you can do with Quix Streams, the Quix SDK, and why we dedicated more than two years building it.

<!-- more -->

## Everything you’ve ever wanted to know about the Quix SDK

Two years ago, the Quix team set out to build a new SDK that enables data
scientists to work efficiently with time-series data and build streaming data
applications. We learned while working at McLaren Formula 1 that nothing like
this existed — database-centered options created too much latency and SQL fell
short in application development.

We made the wild decision to start from scratch, to invest years into creating
a new SDK around Apache Kafka® for Python and C#. The Streaming SDK now lets
you write simple or complex data processing logic and connect it directly to
any broker; publish and subscribe time-series data to topics, keep data in
order by bundling it into streams, integrate various data sources, and
assemble a microservice data stack with the Streaming SDK. It also abstracts
complexities like learning Java or dealing with buffering, serialization, and
encryption so that you can move more quickly and focus on the interesting
bits.

Our senior developer, Steve Rosam, and head of platform, Peter Nagy, discussed
the ins and outs of the SDK and what people can do with it on The Stream. This
is an edited transcript of their conversation.

## From McLaren to Quix: An SDK for telemetry data and Python

**Steve Rosam:** Welcome to this week’s stream. Today, we’ll talk a bit about
the Quix SDK — why we went to all the effort of creating it and what it does
that no other SDK does.

**Peter Nagy:** The initial idea for the SDK came from our time at McLaren
Formula 1, which has very fast cars and deals with a large volume of high-
frequency telemetry data. We developed an SDK there for telemetry purposes
that was quite efficient at transmitting large volumes of telemetry matrix and
parking in the range of multiple millions of parameter values per minute. It’s
actually quite a significant amount — and that’s just from a single car. We
liked the power behind the SDK, but it wasn’t easy to use. It required a
significant knowledge of the SDK itself, and people often contacted the SDK
engineers to help them use it.

When the idea of Quix came about, we knew that we wanted to have something
similar in terms of throughput and performance. But we knew that if it wasn’t
usable, people simply wouldn’t adopt it.  

> _We made usability the number one goal with the Quix SDK._

Like the SDK at McLaren, we designed ours on top of [Apache
Kafka®](https://www.confluent.io/what-is-apache-
kafka/?utm_medium=sem&utm_source=google&utm_campaign=ch.sem_br.nonbrand_tp.prs_tgt.kafka_mt.xct_rgn.emea_lng.eng_dv.all_con.kafka-
general&utm_term=apache%20kafka&creative=&device=c&placement=&gclid=CjwKCAjwquWVBhBrEiwAt1KmwlUehgYvE80UDLTq679XYE_WbFfWt1mA03_ewh9ekmvGEh_1lfyn7hoCbrMQAvD_BwE),
provided by Confluent. It’s an open-source product, and I’m 100% sure there
are many companies that just use the Confluent Library without any wrapper or
help around it. But when we thought of the SDK, we wanted to make it as
accessible to people as possible.

**Steve:** How similar is the Quix SDK to what you developed at McLaren? I
take it you didn’t smuggle out any USB drives. 😉

**Peter:** Haha, no, no USB drives. We didn’t replicate anything. As I said,
we liked the SDK’s performance, but that’s it. We sat down and came up with a
new system of our own that would be easier to use and maintain. Quix SDK is
built bottom-up from scratch, and there’s no code whatsoever that references
the McLaren SDK.  

## How the Quix SDK and Kafka work together

**Steve:** You mentioned that both SDKs run on Kafka as the underlying message
broker. Why take all of the time to develop an SDK around it? That’s not a
small project.

**Peter:** This requires a long answer. I’ll try to be as quick as possible.

We wanted an SDK that worked with Python and C#. The existing Kafka Libraries
were almost all built on the Java Virtual Machine and had some limitations.
Since then, Robin Hood came out with Faust, a Kafka Streams implementation for
Python, which it abandoned and the community picked up. Many of the services
that we planned were reliant on having a C# library, and our developers asked
for Python and C# in the past.

We also wanted an SDK to use with other broker technologies, those that
currently exist and those that might arrive in the future. All you would have
to change in order to use a different broker is how you connect with it and
how you set it up at the very beginning. Everything else should require no
code change.

Right now, we’ve implemented the SDK with Kafka, which took a significant
amount of time to work around the issues we found through testing. Next, we’re
looking at Pulsar and RabbitMQ, which would make the Quix SDK more versatile.

**Steve:** Could you elaborate on what data types the SDK supports?

**Peter:** Kafka and Kafka Streams basically do event streaming. (An event is
essentially a single encapsulated message that contains all the necessary
information to process that singular event.) You can send either a JSON
message or an event in binary format if you use a schema registry to identify
what kind of schema that matches it.

We needed to efficiently send more complex data. We started with telemetry
data, which included engine temperature, car speed and the driver’s heart
rate. It can be scalar or non-scalar values because, in addition to numerical
values, we also have support for string values and binary values. With binary
values, you can pretty much send whatever your heart desires because
everything can be converted to binary.  

> _We support numeric, string and binary, and our events are string-based, so
> you could put any kind of JSON Payload in them. You can also give some
> metadata that helps the receiving side understand it, be that machine or a
> human._

It’s possible to mark your binary as the audio or video segment, and Quix
could process the information. When you visualize these values in a platform,
which is separate from the SDK.  

## Python, C# and what comes next?

**Steve:** We mentioned Python earlier. Can you talk a bit more about
languages and implementation?

**Peter:** The base goal was to have a library that functions in both C# and
Python with the possibility of extending those language options in the future.
In the current implementation, we have a C# library running on the .NET
runtime. It does bring a .NET runtime today, but from our experience, it’s a
much smaller consumption in terms of CPU and memory compared to the JVM.

The Python library that we currently have today is wrapped around this .NET
runtime, and we are working on doing away with that. We will have a Python
library that does not depend on the .NET runtime. It will be completely self-
sufficient. All you will need is to type in “pip install” and nothing extra
will have to be installed other than having the Kafka binary itself because
that is still a requirement.

**Steve:** That will make it a lot easier to consume for people who want a
pure Python implementation. In terms of other languages, are we planning on
doing native implementations in other languages that would be useful for
stream processing and real-time work?

**Peter:** As of today, we have C# and Python because the people of Quix are
proficient in them. They’ll always be maintained, even for our internal use
and data scientists. The people for whom we created the library primarily use
Python. That’s also always going to be supported. When people ask for more
languages, we’ll look into adding them.

**Steve:** If people want to get in touch and talk about stream processing or
the SDK with you, where’s the best place to come find you?

**Peter:** The best place is The Stream Slack community.

**Steve:** We’ve also got a stream processing meetup on June 29 in London.
Come join us if you’d like to keep chatting about stream processing and SDKs.






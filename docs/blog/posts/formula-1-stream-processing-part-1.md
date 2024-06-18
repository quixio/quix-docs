---
title: "To stream, or not to stream? A conversation about when to use (and how we built) stream processing systems"
date: 2023-07-12
authors: [kiersten-thamm]
slug: formula-1-stream-processing-part-1
description: >
  Behind the scenes building McLaren’s F1 stream processing system, and why the world needed a new stream processing client library.
categories:
  - industry-insights
---

# To stream, or not to stream? A conversation about when to use (and how we built) stream processing systems

Behind the scenes building McLaren’s F1 stream processing system, and why the world needed a new stream processing client library.

<!-- more -->

## Behind the scenes building McLaren’s stream processing, and why the world
needed a new stream processing client library

In this week’s [Coding in
Public](https://www.youtube.com/channel/UCrijXvbQg67m9-le28c7rPA), two of our
co-founders, CEO Mike Rosam and Head of Software Patrick Mira Pedrol, had a
lively conversation about their experience of working with real-time data at
[McLaren](https://www.mclaren.com/). They talked about the different use cases
for batch and [stream processing](/blog/what-is-stream-processing) and the
future of microservices in data tech.

This post is an edited version of that conversation. But don’t worry: If you
want to [watch the original](https://www.youtube.com/watch?v=82t4sFGgDBM), you
still can!  

## The interview

**Mike:** Without further ado, let’s introduce ourselves. My background is in
mechanical engineering. After a career of interesting projects in Ford and
Fiat, I found my way to McLaren, where I became head of innovation. And that’s
where I met you. What’s your background?

**Patrick:** It’s a long story because I’m very old. I started developing when
I was about 10 years old — and that was the end of the ’80s, the beginning of
the ’90s.

**Mike:** Were there computers back then?

**Patrick:** Yes, there were some. Do you remember this Spectrum, MSX
computers?

**Mike:** I had a Commodore 64.

**Patrick:** You had just 64 kilobytes of memory to load your games. That was
when you needed to save an application in binary in a cassette. And that’s
when I started creating applications for fun.

**Patrick:** I went from there to creating a series of applications for
production management and maintenance management systems in factories and
completed a degree in IT. I joined McLaren in 2018 because I’m also passionate
about motorsports. That’s where I started working on a team called Telemetry
Advanced Platform, TAP for short, and I dug into stream processing. We worked
to create a system to process telemetry models and generate results in real
time.  

## The differences and benefits of stream and batch processing

**Mike:** Let’s bring some context to this session — what is stream
processing?

**Patrick:** Batch processing means transforming and delivering data on a
regular schedule that’s slower than the production of data itself. It’s like
taking pictures of your life to record it and putting those pictures into a
photo album once a year. In the last 30 to 40 years, everything has been batch
processing.

With stream processing, you use timestamps as a key to your data and process
each piece of data as it arrives. It’s the equivalent of taking a video
recording of your life and streaming it on a social media app. It records
every event as it happens and immediately acts on that data.

#### Three requirements for stream processing

**Patrick:** If a project has these three requirements, stream processing is
what it needs.

  1. A huge amount of information to ingest
  2. The need for an immediate reaction
  3. The ability to scale horizontally

For example, as consumers, we’re getting less tolerant of delays. When I pick
up my mobile phone and book a cab, I want the app to respond immediately and
send a cab to pick me up quickly. Otherwise, I’ll choose a different app.

**Mike:** Did you see Jay Kreps at the Kafka summit last month? He asked the
audience to imagine crossing a road based on information from two minutes ago.
Of course, people wouldn’t do this; they need to know if the cars are crossing
right now.

**Patrick:** Exactly. You need to stream processing with data that is flowing
in real time.  

> _“In the past, we processed this data in snapshots due to technical
> limitations. Now it’s possible to send more data more quickly than ever
> before. But it’s difficult to save this amount of data in a database and
> process it later. It’s simply too big. This is where stream processing
> helps.”_

**Mike:** But isn’t all data produced in real time?

**Patrick:** Yes. But in the past, we processed this data in snapshots due to
technical limitations. We now have high internet speeds, and it’s possible to
send more data more quickly than ever before. But it’s difficult to save this
amount of data in a database and process it later. It’s simply too big to be
made sense of later. This is where stream processing helps.

**Mike:** Trying to track and predict millions of taxis is [a case where you
need stream processing](/use-cases).

**Patrick:** Exactly. You cannot save location data for that many taxis in a
database for later processing. The taxi will already be gone, its driver is
asleep at home and the customers have given up. Stream processing reduces
latency as much as possible, but your pipeline needs the ability to scale
horizontally to take advantage of this.

To continue the taxi metaphor, think about the variation in demand across a
single day. Your pipeline for landing stream data needs to take the
irregularity of demand that creates an undulating data flow into account.
Otherwise, the end customer won’t benefit from the measures taken to speed up
the data transformation.

#### When is batch processing still the best answer?

**Mike:** Batch isn’t going away, though. Data storage isn’t going away. When
do you use a database to do batch processing?

**Patrick:** You probably don’t want to do streaming processing if the project
is simple enough for batch. Think about the differences between a spreadsheet
application that merges UI and database, and a normal application that has a
separate UI and database. With the spreadsheet application, you can solve most
problems of a small business. And you wouldn’t overcomplicate the tools of a
small business because they likely have a minimal team and financial
resources.

But if you were working with a sophisticated company with extensive data
needs, you’d set them up with a more complex but performant system that has a
separated UI and database. The same considerations come up when deciding
between batch and streaming.

Batch processing is analogous to the spreadsheet application. It’s great for
simple use cases because you read the data, process it and save the result in
the same database. Stream processing separates the data flowing in real time
from wherever you’re saving it. This separation increases at the complexity,
like the separate UI and database of the normal application does.

#### Stream processing and machine learning

**Patrick:** You normally train data through a database that is basically some
data in a lake. When this machine learning model is trained, you can put it in
a batch process. But in some use cases, you want to put this model in real
time. You want this model to receive data, to start receiving data in real
time and react very fast to this data. That’s the beauty of machine learning.

**Mike:** But of course, you can call an ML model with an API, and it will
give you a response fairly quickly. But we don’t use APIs in stream processing
for calling the ML model. Can you talk a little bit about that?

**Patrick:** You can always call an API, or you can have the machine learning
model in another place, but this introduces some latency. An API call and a
response takes a little bit of time, and it consumes a bit of resources. When
you scale that up to a lot, like huge data flows, the API call becomes high
latency and high cost because you have physical infrastructure making those
calls and responses.  

## Telemetry Advanced Platform at McLaren

**Patrick:** At TAP, we created a system to process telemetry data from F1
cars in real time. This requires a huge amount of technology. You need to
create a message broker (we used Kafka), put in place a time-series database
like InfluxDB, and establish a cloud computing system.

We used Kubernetes to run models in the cloud and integrate our technology. We
also needed to organize the teams, people and internal workflows to run this
complex system and facilitate communication. Team members need to learn how to
use new tools and the actual infrastructure needs to be paid for.

**Mike:** I worked as head of innovation at this point, and I thought the
opportunities in real-time data were just incredible. We ended up getting a
project to work with Formula 1 funding and built some fun engagement stuff
that gave fans at home a better experience. We set up a team of people to
build a proof of concept in six months.

**Patrick:** It was a very fun project. Our idea was to take raw telemetry
data from Carlos Sainz’s car and connect it to the F1 Codemasters game in real
time via the cloud. We created a UI to see the final engagement of the system,
how we visualized the machine learning results in real time and connected the
data to the game.

**Mike:** Why did you build your own monitoring solution on top of Kafka?

**Patrick:** Kafka, time series databases and Kubernetes are good
technologies, but they are difficult to monitor and make it difficult to
monitor whatever application you build. You can’t see data in real time out of
the box with an UI. I ended up creating console applications to consume data
from a WebSocket application to accomplish the necessary monitoring. I
couldn’t build a full UI application within the time and resource limitations.
Six months weren’t enough.

**Mike:** What was it like trying to develop the ML models on Kafka?

**Patrick:** This is probably the most difficult part. Data scientists are
extremely skilled with math and data analysis technologies, but they typically
aren’t familiar with Kubernetes, time-series databases or Kafka. It was very
difficult to teach them how to use our software because our software was just
a library; how to send data, and then APIs; how to consume data, how to ingest
data, how to read data from others. The tooling wasn’t easy to use. Just to
query data from a database, for them, it was a nightmare.

To test this machine learning model later with real-time data, we needed to
create a replay system, a system that was taking the data from the database
and replaying this data in real time to the broker if it was in real time. We
need to create all these secondary systems to generate or to support this
development process of the display.

**Mike:** To support machine learning, you created extra things, such as a
data set that they could use to train a model.

**Patrick:** Exactly. The team was providing the tools and the data science
were consuming the tools. The amount of knowledge that we needed to put this
project into production was so huge. It couldn’t be done by one person — at
least not with the tooling that we had at McLaren.  

> _“You’re going to go faster with project development in the long run if you
> take the time to create more user-friendly tooling for data scientists.”_

**Mike:** The ironic thing there is that you’re going to go faster with
project development in the long run if you take the time to create more user-
friendly tooling for data scientists.

I remember you used to talk about models that worked in tests but not when you
deployed them to production. When you deploy them to a live data stream, you’d
get data out of order or gaps in the data or sporadic timestamps. Why was that
happening and how did the team improve it?

**Patrick:** Normally, time series data in a database is sorted automatically
by putting time stamps in order. But in our use case, when you put this in
real time, in a real problem in production, you start receiving data at
irregular intervals, sometimes in real time, sometimes from the past, and sort
it again.

The machine learning model was not prepared to process the data in this order.
The team needed to tweak the machine learning to be able to process time-
series data with unsorted data, or at least be prepared to not fail completely
if they received something that was not ordered.

**Mike:** This is a real-world problem. How did you deal with it?

**Patrick:** You can use a buffer in the ingestion. That buffer can be 10
milliseconds, or it can be 100 milliseconds, or a minute, or whatever you
want. The data is ordered within this buffer. You receive data unsorted but,
at the end, your buffer is producing sorted data.

You can define a buffer for as long as you want, but a very long buffer
introduces latency. A one-minute buffer was already too much latency for
McLaren.  

## From McLaren to Quix: Developing a product users love

**Mike:** This is a great segue. Because we were so excited about streaming,
this whole experience led us to found Quix with two of our other McLaren
colleagues, Tomas Neubauer and Peter Nagy. We wanted to solve the problems we
discovered during this process. Namely, that developers and data scientists
needed to be able to communicate and access the right technologies through
tools designed for them to get the most out of stream processing.

**Patrick:** We also learned that we wanted to create something easy to use in
terms of library, how to ingest and consume data from the blocker. We wanted
to create something easy to use, that with one click generated the whole
infrastructure, and that’s it. You don’t need to ask anybody.

We wanted to create something, you press click and you create a topic. If you
press another click, you delete the database or you create a new database. We
also knew that we wanted to create easy-to-manage infrastructure with a UI, we
wanted to have an easy-to-use SDK, and we wanted to have better monitoring
tools for development, because the whole thing here is to improve the
development experience for somebody that wants to create a new streaming
application.  

> _“Are you completely bananas, or is there some reason why the world needs a
> new client library for stream processing?”_

**Mike:** But you, in all your wisdom, decided for some reason to write a
whole client library from scratch. Why? Are you completely bananas, or is
there some reason why the world needs a new client library for stream
processing?

**Patrick:** The main reason is because we wanted to create an easy-to-use
library. On the existing libraries, if you try any of the Flink or Kafka
streams, or this type of libraries, they are very complex. They are very
restricted in terms of what you can do with these libraries.

In our library, you use the language itself to create any type of processing.
You can use any library. For instance, in Python, there are a huge amount of
data science libraries to use, and you can use any of these libraries to
process your data. It doesn’t need to be embedded in a SQL statement.

**Mike:** I think this topic deserves an entire hour unto itself. We’ll end
there and invite our viewers to keep an eye on our YouTube channel for our
deep dive into the Quix SDK.  

## Try Quix for yourself

If you’re intrigued by what Mike and Patrick discussed, [check out Quix for
yourself](https://quix.io/signup) or play a [fun racing demo](/product/for-
data-processing-pipelines) inspired by the company’s continued love of F1.






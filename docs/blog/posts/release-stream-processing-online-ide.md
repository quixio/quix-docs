---
title: "Announcing Quix’s major product release"
date: 2023-07-17
authors: [tomas-neubauer]
slug: release-stream-processing-online-ide
description: >
  The platform accelerates time to market for live data-driven products. New connectors to live data streams ensure flawless performance in real world production environments.
categories:
  - announcements
---

# Announcing Quix’s major product release

The platform accelerates time to market for live data-driven products. New connectors to live data streams ensure flawless performance in real world production environments.

<!-- more -->

## Accelerate time to market for live data-driven products

In Formula 1, teams spend Monday through Friday fine-tuning a car’s
performance. Then the weekend comes, and they can finally test it on the
track. Does it work in the real world? Do these improvements deliver results?
If projects are built in a dev environment, it’s possible that the code won’t
work. That’s because a fabricated test environment can’t replicate the
messiness of the real world.

Let me give you an example drawn from the experience my co-founders and I had
while working at McLaren. If you work with sample testing data, you’re
essentially testing code against a best-case scenario. In the real world, live
data has faults, time delays and can come in the wrong order. If you haven’t
practiced on real-world data, the results are chaos. That’s why testing any
code against real, live data is essential. It gives you confidence that your
code will work when you show up for race day.

That’s also the thinking the Quix team brought to the problem of developing
with live data in any industry. How can we help developers write and test code
on a real-world data set without breaking the production environment that
companies hold so dear?

In this article, we’ll cover the new features of Quix and the thinking behind
them.

## Build, test and deploy from an online IDE

It’s widely understood that working with a streaming data message broker such
as Kafka is hard. As part of our effort to bring this complex technology to
all developers and data scientists, we’re announcing a major advancement in
the Quix platform: an integrated development environment (IDE), complete with
connections to live data sources.

This solves many problems a user has when writing code that interacts with
Kafka. For example, developers must:

  * Configure code to send and receive messages with Kafka
  * Install client libraries on their local machines, which requires time to install and debug
  * Set up and configure security and encryption between Kafka and the local machine.

You have to go through all of these steps to start writing code. Then, when
you get to coding, you’re working in a distributed architecture that requires
additional integration testing. You must pull back code into your local IDE to
find and solve the problem when you find an error.

From the beginning, Quix has been on a mission to democratize live data by
reducing the complexity and hassle associated with stream processing. Our
latest release now takes care of configuration, and the online IDE is ready to
run the steps above handled for you. This enables you to seamlessly develop,
test and run code without deploying it to your company’s production
environment.  

![Real time Quix dashboard.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7e8df7b31f9065765d22_Quix-online-
IDE.webp)

The new Quix online IDE  

## Why streaming data isn’t more accessible

Message brokers are gaining rapid adoption in companies [across every
industry](/use-cases), thanks mainly to work done by Confluent, which has
accelerated the adoption of Kafka. It’s emerging as an essential component of
the modern data stack, so more people need more access.

But IT creates firewalls around this data, in part because [streaming data is
hard to handle](/blog/why-is-streaming-data-so-hard-to-handle). Some of the
world’s largest organizations, like Audi and BMW, use Kafka in their
enterprise IT architecture, but their automotive engineers don’t have access
to streaming data resources.

Quix is doing for the Kafka message broker [what DBT did for the data
warehouse](https://blog.getdbt.com/analytics-engineering-for-everyone/). The
Quix platform creates a real-time mirror of data streams to provide a safe,
bolt-on environment that anyone with Python skills can use. It doesn’t require
users to have their own CI/CD infrastructure, IDE, Git or Kafka. It’s a
straightforward interface into that complex world.  

> _“Quix is doing for the Kafka message broker what DBT did for the data
> warehouse.”_

This enables people with technical skills in product lines and business units
to access live data, build applications, and automate actions. And it’s not
just [data scientists](/use-cases/data-science) and [data engineers](/use-
cases/data-engineering) who benefit. Applications in [mobility
solutions](/use-cases/mobility) and audio processing enable people with
mechanical, electrical, and electronic engineering skills. Even chemists and
biologists who’ve never heard of Kafka have used Quix to access streaming data
technology.  

## Why CI/CD development takes so long

The traditional CI/CD paradigm for application development requires a long,
iterative process:

  1. Develop code locally in your IDE, build and run unit tests, iterate
  2. Connect your code to fake data, run an integration test, iterate
  3. Deploy your code to a dev environment, test with real people, iterate
  4. Deploy code to a staging environment, run automated tests, iterate
  5. Release code to production, run environment and acceptance tests, deploy

This paradigm is more difficult for developers writing microservices on data
streaming infrastructure — such as Kafka — because of the decentralized nature
of their applications.

It’s even harder for developers of real-time data products. In the current
approach, developers have to ask IT to access production systems. A data
engineer has to prepare a table of data. The data scientist can then use
Jupyter Notebooks to explore and develop a model, but they cannot test it.

So next, they have to ask DevOps to create a test topic, build and deploy
features, and deploy their model artifact as a microservice. After a few
lengthy iterations and some tough meetings with legal and compliance, the team
can finally release their product to production.

Each step requires significant cross-functional collaboration, enablement and
support.  

![Difficult path for data scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7edae0a94b7661280a1e_Difficult-
path.webp)

The difficult path to real-time development  

Quix’s new paradigm safely connects users to the production broker, where they
can self-serve all the resources they need. With one connection, a data
scientist can explore data in Jupyter, then build, test, and deploy features
and models without external teams’ support. When legal and compliance are
happy with the product, it can be hooked up to production in seconds with our
API and SDK.  

![Build faster on streaming data with Quix.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7f155b24857b50e3af48_The-path-
with-Quix.webp)

Build faster on streaming data with Quix  

Our new online IDE enables access to Kafka for new types of developers — let’s
see how.  

## How the Quix IDE works

The Quix online IDE connects your code directly to live data input topics and
runs it against live data or an authentic replay of a historic live stream.

You can compare output variables against input variables and check that
everything performs as intended on real data — with gaps, bursts, data
streamed out of order, and other common faults. Once you’re happy with your
code, deploy it with a click of a button.  

![Rapid development with the Quix IDE.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7f73b1e57aeaddb851c0_Development-
with-Quix-IDE.webp)

Rapid development with the Quix IDE  

Through our Formula 1 experience and our customers’ experiences, we’ve found
that building with real data from day one produces a higher quality product.
It eliminates the risk and hassle of CI/CD development cycles to faster
release new applications to production.  

## Prebuilt connectors to live data streams

We’re particularly excited about Quix’s new connectors — a collection of live
data sources provided out of the box in Quix. This includes financial currency
markets, Twitter, Amazon Kinesis, Google pub/sub, Confluent Kafka, and
historical data sets that you can use to train your model on real-world data.

You can access these connectors directly from our Library, then add that data
source to your project with just a few simple configurations.  

## Visualize and query data

We’ve also introduced an improved data explorer to help you visualize your
data in waveform and table format. This layout should feel more familiar to
people accustomed to SQL queries. There is a code generator to help developers
load data into external systems like Jupyter Notebooks.  

![Waveform view of persisted data explorer.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7fa343c0dfb1733170bf_Waverform-
view.webp)

###### View and query data streams, parameters and events in waveform view  

![Table view of persisted data explorer.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7fcfea0a30cccbc826e7_Table-
view.webp)

###### See the same query in tabular format  

![Code view of persisted data explorer.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64ba7ff5ea0a30cccbc84931_Code-
view.webp)

###### Copy and paste the query to load data into external systems like
Jupyter Notebooks  

## Live preview for real-time data

We introduced a new feature, live preview, which offers a real-time view of
your data using a WebSocket protocol. This allows developers to observe data
flowing through the platform without delay and without requiring you to enable
data persistence.  

## Improved queries, filtering and speed

Under the hood, Quix is faster on all counts, including dramatically improved
startup times for multiple deployments, and deployments spend less time in
build queues.

Our Telemetry Query was also improved with these capabilities:

  * Filter streams by the events they contain, not just a single parameter such as “speed”
  * Filter data by tag
  * Query parameter data and event data in the same call
  * Create queries across various streams without first having to select the stream.

## Getting started is easier than ever

For new Quix users, social sign on is now available when you sign up to try
Quix, so it’s one-click easy to access your workspace. (Goodbye, captcha.) We
also launched further enhancements to our docs and guides.

We’ve wrapped up all of these new features with developer tools including a
[status
page](https://status.quix.ai/?__hstc=175542013.47788df652e6c40c4f592430dcaa100f.1686578338159.1689418230899.1689568336719.24&__hssc=175542013.55.1689568336719&__hsfp=524412920)
and a [changelog](/changelog) to give you the details on each major and minor
release.

If all of these new features get you excited to try Quix, [sign up for a free
Quix account](https://quix.io/signup), complete with free credits to launch
your first project. Join us in the [community Slack](http://quix.io/slack-
invite) if you have any questions.






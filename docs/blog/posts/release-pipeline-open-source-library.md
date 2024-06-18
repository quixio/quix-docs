---
title: "Quix’s new no-code workflow and open source library delivers the benefits of stream processing to teams of all sizes"
date: 2023-07-13
authors: [tomas-neubauer]
slug: release-pipeline-open-source-library
description: >
  Transform big data fast. Now more people can harness the power of data stream processing and develop their own projects.
categories:
  - announcements
---

# Quix’s new no-code workflow and open source library delivers the benefits of stream processing to teams of all sizes

Transform big data fast. Now more people can harness the power of data stream processing and develop their own projects.

<!-- more -->

## Don’t waste your data — enable more people to harness it in real time

More than half of the data that companies invest in collecting and storing
goes unused, [according to Splunk](https://www.splunk.com/pdfs/dark-data/the-
state-of-dark-data-report.pdf), which estimates that 55% of data collected is
simply ignored. All that time and money lost down the drain is really quite
sad.

Companies in sectors from [mobility](/use-cases/mobility) to [finance ](/use-
cases/finance)to [ecommerce](/use-cases/ecommerce) need the most current data
to make decisions that serve their customers and company. This demand for
fresh information reveals the rapidly declining value of unused data. It’s
often not even worth another look.

At Quix, [we know firsthand how difficult it can be](/blog/why-is-streaming-
data-so-hard-to-handle) to keep up with data. Our team started working in
Formula 1, [where we built systems to stream and process more than a million
data points per second, in real time](/blog/introducing-quix). However, few of
the racing team members could use the infrastructure we built without our
help.

That’s why we’re making it possible for more [people with a range of skill
sets](/blog/why-data-scientists-cant-use-streaming-data) to work with
streaming data. Our new workflow lets users build pipelines to process and
apply data without any prior experience with streaming infrastructure. We’re
inviting more developers and engineers into the Quix community with an open-
source library of sources, transformations and destinations that help everyone
turn current data into helpful, profitable products.

In this article, we’ll cover the new [Quix features](/product), why we
developed them and how they benefit you.

## The open-source library: connectors and transformations for every task

The Quix library contains an ever-growing collection of pre-built, open source
code samples that you can use to quickly and seamlessly create a pipeline that
transforms your data while it travels from source to destination in real time.

The library includes three types of samples:

  * **Sources:** out-of-the-box data connectors that you can plug and play. Or add an API gateway to push data. If you have a project in mind but the connector isn’t available, you can develop your own and share the code with Quix users by adding it to the library. You never know what kind of projects you might be supporting.
  * **Transformations:** code samples you can use as-is or modify to make your application more functional. Extract and load, merge, synchronize, enrich, predict or anything else you might want to do with your data — the options are endless since you can extend the samples with any class, method, package or library.
  * **Destinations:** the connectors to analytics dashboards, alerts, data warehouses and any other form of delivery. What’s the good of transforming data if you can’t easily apply it?

You can access the open source library within the Quix platform or
[GitHub](https://github.com/quixio/quix-library).  

![Quix GitHub library screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7c74cdbed93bc00128bea_Quix-GitHub-
screenshot.webp)

We wanted to offer the Quix community an easy shortcut to whatever they’re
building with streaming data. The pre-built connectors in the library cut down
on development time while remaining customizable, so you can make precisely
what you want in a fraction of the time.

Better yet, plug those connectors into our pipeline workflow to really speed
things up.

## Our new no-code transformation workflow

We’ve developed a no-code interface over Quix, which lets people access the
technology without having to fully understand how it functions. Setting up a
streaming pipeline is now as simple as clicking a few buttons, choosing
connectors and filling in fields. Set your sources, transformations and
destinations without writing a single line of code.  

![Quix demo screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7c77f18bead3d78847adb_Deployment-
pipeline-screen.webp)

This feature is a massive leap toward giving everyone access to streaming data
— the whole point of Quix’s existence. Users still get all the benefits of an
efficiently managed pipeline that reliably and quickly processes data from
extraction to load. But the complexities of managing Kafka and Kubernetes now
sit under the hood.

No more need to worry about the infrastructure or work with expensive data
teams. Accomplish more by doing more on your own, faster.  

## Why streaming data quickly can be so challenging yet so valuable

People often assume stream processing is too complicated and resource
intensive to bother. For years it has been the sole domain of tech monoliths.
But with Quix, in-memory processing is simpler, faster and cheaper than in-
database processing. And Quix makes stream processing open to all: you can get
a lot done with Quix in a short amount of time.

You’ll get even more if you plug Quix into a modern data stack. The library
and workflow make it easy to craft the perfect pipeline for your needs and
allow more people to use streaming data.

For one no-code example, you could perform a sentiment analysis on a Tweet
stream by bringing in data from Twitter, choosing the transformations you need
and sending yourself alerts with Twilio or Slack. There is no need to
understand what each tool does, no need to build SQL storage procedures on top
of each other — just line up the tools you need and go.

Put the most current information into more hands to optimize every team. The
pipeline view, coupled with a microservice architecture, unblocks people and
projects.  

## Putting everything together: how to use the new Quix features

Quix’s story begins in Formula 1, so to honor that legacy I’ll use Formula 1
data to demonstrate the ease and power of these new Quix features.

I’ll show you how I use the library and pipeline interface to send alerts to
my phone whenever a race car passes 300 kilometers per hour. I’m keeping it
simple to show off the features — the example only uses one source, one
transformation and one destination — but I hope the ease of it inspires you to
see just how creative you can get with the platform.

### 1\. Getting started with a Quix workspace

The project begins with a workspace that already has all of the necessary
security, reliability and scalability features built in, so you can jump
straight into building a project. You can [sign up for a free
account](https://quix.io/signup/) and build along with me. Feel free to ask
questions in our [Slack community](http://quix.io/slack-invite) while you
build!  

![Quix onboarding window.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7cf0758a3b652926d4451_Quix-
onboarding-window.webp)

### 2\. Add a data source to your project

I’ve saved the time of importing or building data because the library already
contains the data set I need for this project. I click Add new to find it.

For this example, I’ll use Formula 1 Data. I click Set up connector, and the
guide will appear.

The extent of my work on this section is just naming the source. I’ll call it
f1-data and click Connect.  

That’s it — now the source is connected. I can go into the source and check
the data in the live preview of the visualization. It contains more data types
than I need, so I choose to show only speed and RPM by clicking two buttons
under Select parameters or events.  

![Quix window screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7cf4592eeacec8d5c695c_Quix-window-
screenshot.webp)

### 3\. Setting up data transformation

I want my pipeline to look at the data and see when a vehicle goes faster than
300 kilometers per hour. This intent requires me to create an alert, which I
can do with a pre-built connector in the library.

I click Add transformation to open the library and find the appropriate
transformation.

![Quix library transformations.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7cf90e0ae71f71bd9bc3a_Library-
transformations.webp)

I could choose the Threshold transformation and with a single click cover most
of my data transformation. Alternatively, I could use the Quix function
template to develop my own. I’ll do it the second way to demonstrate how
others could contribute to the library by building on it.  

![Quix function window screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7cfc5c9fdf77e1c82a756_Quix-
function.webp)

Working with the template means I’ll write about four lines of code for this
example. But first, I give the project a name (Threshold detection), tell it
to listen to the f1-data topic I just set up and name the result Alerts. I’ll
click “Save as project,” so it is stored in my workspace, again without any
code.

The dev environment automatically installs dependencies before letting me
directly develop code. I only need to add a few lines from this point to set
up the threshold alert.  

![Code closeup screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7cff250c55065a2d20479_Code-
closeup.webp)

This if statement looks at the data and, when the speed exceeds 300 kilometers
per hour, the project sends an event alert.

I deploy the data by clicking the Deploy button, giving it a name in the
dialog box (Alert detection), choosing the Service option and clicking Deploy.  

![Deployment configuration Quix.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7d0213cd5dc368f7d7fcf_Deployment-
configuration.webp)

### 4\. Deliver your data so that someone can consume the results

Now that the data is ready to go, I tell it where to go by clicking Add new
next to Destination on the workplace screen. I’ll use Twilio to send speed
alerts to my phone.

![Library Twilio sink window.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7e2e35c060d5769ae8de1_Library-
Twilio-sink.webp)

I click the Setup button and fill out the requested fields with information
from my Twilio account.  

![Twilio sink setup code:](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7e31b856eed9e419c1fdd_Twilio-sink-
setup-code.webp)

#### 5\. Running the pipeline

Here’s the fun part! The three green dots (one in the upper-right corner of
each card) tell me everything works correctly, and all I need to do is click
Deploy to start receiving notifications on my phone about car speeds.

![Running pipeline Quix window.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b7e3f20c7721ea1f1470a5_Running-
pipeline-Quix.webp)

## Expanding access to stream processing

We’ve seen firsthand the value of stream processing, not only in Formula 1 but
also in [sectors](/use-cases) from manufacturing to [telco](/use-cases/telco)
to [gaming](/use-cases/gaming). We know that stream processing [reduces
latency](/blog/reduce-latency-with-stream-processing) to create [reliable
products](/blog/resilient-stream-processing) and can even [improve pricing
systems](/blog/how-to-build-usage-based-pricing).

Now we’re making it possible for more people to access and benefit from their
organization’s data with the power of stream processing. [Sign
up](https://quix.io/signup/) for a free Quix account and see how effortlessly
you can set up a data project of your own, or [book a technical
consultation](https://calendly.com/clara-quix/30min) to talk through your use
cases.






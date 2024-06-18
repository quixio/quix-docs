---
title: "The race to build with streaming data: Can your dev team keep pace?"
date: 2023-07-19
authors: [tomas-neubauer]
slug: data-stream-processing-example-explained
description: >
  Take Quix for a test drive: we built a no-coding-required driving game using Quix’s stream processing to help you experience the simplest way to handle streaming data.
categories:
  - use-cases
---

# The race to build with streaming data: Can your dev team keep pace?

Take Quix for a test drive: we built a no-coding-required driving game using Quix’s stream processing to help you experience the simplest way to handle streaming data.

<!-- more -->

## Jump inside a driving demo to experience the simplest way to handle
streaming data

Time to value is one of the most important aspects of any development. This is
a hill I’m willing to die on. So to prove my point, my team and I set up a
deceptively simple demo: build an end-to-end system that could immediately
connect to a data source, send high-resolution data from a device, process it,
and control a system with no latency [(view the GitHub page
here)](https://github.com/quixio/data-stream-processing-example).

It looks like a simple driving game. But we know that developers are
frustrated by the complexity and scale of streaming data, which makes building
any project — no matter how simple — very difficult, even for a sophisticated
team.

> _“with Quix, you can build any application using live streaming data —
> without knowledge of Kafka, server-side processing, DNS, or hosting an
> application in Kubernetes.”_

We wanted to prove that with Quix, you can build any application using live
streaming data — without knowledge of Kafka, server-side processing, DNS, or
hosting an application in Kubernetes.

We wondered, how long does it take to build the most straightforward technical
demo of Quix’s data streaming capabilities? And how long would it take to
build an identical demo without Quix’s platform?

We kept the challenge deliberately simple: a driving video game based on data
streaming from your cell phone. Of course, the game needed some key
capabilities:

  * One-click public DNS so you can see your racetrack in your browser
  * Connect your mobile device to the cloud quickly
  * Stream gyroscopic sensor and telemetry information from your phone “steering wheel” to the cloud
  * Process high-frequency data with game logic in the cloud
  * Automatically subscribe to a web socket feed to move the car around your browser
  * Guarantee low latency between the mobile steering wheel and browser-based track so that you have a smooth experience

## A whole lot of headaches: what makes this simple challenge so hard?

Let’s break down the steps to creating this demo and the challenges developers
face that cost valuable time.

For engineers who find themselves providing lengthy justifications to punch
holes in firewalls to expose their excellent work to the world, a one-click
public DNS provision is a minor miracle. How long will it take you to leap
through security hoops? It depends on how rigid your enterprise infrastructure
security protocols (read: red tape) are. **In some organizations, this can
take weeks.**

Another massive headache is configuring the message broker (unless, of course,
you’re the Kafka whisperer). There are enough tricky bits associated with
setting up ports, SASL, SSL, consumer groups access, DNS routing, etc. Kafka
is notoriously hard to configure, and even senior SREs can get burned. This is
especially true if you’re trying to do it securely. Setup for a simple
configuration can take hours if you know what you’re doing, but weeks for a
complex use case.

The next step is setting up cloud compute resources on infrastructure such as
virtual machines or Docker containers and Microsoft Azure or other cloud
services to be ready to crunch the streaming data. Doing this once might take
an hour, but it can take weeks for a one-click deployment and a complete CI/CD
pipeline.

Now that we have a cloud to process our data, we need code to process the game
logic. **This is your true value-add, so it’s worth spending time on it to
develop a good application.**

Finally, we need an API to stream data back to the browser to move the car
around the screen. We set this up so that a QR code automatically connects the
streams to the system’s backend. Building a WebSocket API that is secured,
performant and scalable is not trivial either. Having it out-of-the-box in
Quix is more time saved.

Altogether, developing a real-time application like this demo and its
technical backbone would take a significant amount of time and a broad skill
set on the team.

By contrast, one developer at Quix set up the demo using the Quix platform
(and all of those delightful little shortcuts and pre-built features) in a
couple of days. He only had to design and code the game — not the underlying
infrastructure. You can use [his code in
GitHub](https://github.com/quixio/data-stream-processing-example) and have
your own custom version running in as little as 20 minutes.  

## How to build a simple game with streaming data in 20 minutes

One of the driving forces behind [Quix’s product](/product) vision is that we
want to handle the complex boilerplate code associated with streaming data
that doesn’t add value to the final product. Streaming data requires so much
knowledge just to set up that it can take months of work on infrastructure
before developers even get coding.

It’s like a chef being required to build a restaurant, an oven, and all the
plumbing for sinks and dishwashers before they can even start working on the
food. We abstracted the complexities of streaming data so chefs can turn on
their equipment and make a meal.

So, what do you need to build with streaming data?

First, **build a front end in two web pages with public addresses** (one for
the phone controller and one for the browser view) that people can immediately
access or share with others. Both must be scalable for as many players as you
like. We host these applications in Kubernetes with a template so you can
start building on them immediately. You can customize and deploy your site
name and link address in 60 seconds.

Next, you need to stream **high-resolution data from your phone to Kafka and
back to the browser**. This has plenty more real-world applications, such as
sending the speed of a train or the temperature of its brakes. Kafka isn’t
designed to handle these types of external connections to hundreds of clients
(it’s meant to be internal), so we provide an HTTP and WebSocket endpoint to
overcome this. The G-force data is sent 50 times per second — providing a
latency that is invisible to the human eye.

We need to intercept the streaming data with a real-time model to **process
game logic**. We provide a preconfigured Python template to process data with
78 lines of prewritten code that you can modify with your own logic. This is a
shortcut for developers and data scientists that generates everything needed
to create Python stream processing code ready to run in Docker and deployed in
Kubernetes.

There are three complexities associated with this demo: first, you need to
**transmit high-frequency data efficiently** over public networks at low
latency. We do this with a unique parameterData format in our SDK that takes
care of efficiency while making life easy with a simple API.

You could try using a time-series database, but you will get colossal latency,
and it will not scale. Or you could try a message broker with key-value format
to do this, but your Python processing code will be ugly, and you will need a
software engineer to handle the reading and writing.

The second complexity is efficiently **processing data in the cloud with low
latency**. Using Kafka and our [Quix
SDK](https://quix.io/docs/sdk/introduction.html), building pub and sub service
is easy and introduces little lag. Quix SDK helps with streaming context, so
Python developers can focus on each stream without handling messages from
hundreds of sessions simultaneously.

The third complexity is that you need to build an economically viable
solution, so you need **end-to-end efficiency at any scale**. This is
multifaceted but boils down to optimizing the number of data values streamed
and the number of input-output operations per second (IOPS) across your
processing stack. Our Kafka and SDK work together to optimize all of this,
eliminating IOPS by keeping data in memory across the pipeline so you can
build cost-effective solutions that scale.

You’ll need to **move this data back to the browser** , except Kafka can’t be
easily connected to a browser. So you’ll need a web socket gateway. This
provides a 1:n relationship, giving you great scalability when n is a high
number, such as if 1,000 browsers are reading the data or if 1,000 cars are
generating data. All of this has to move from the platform in real time to the
browser.

Lastly, it’s time to **deploy your project**. You can do that locally for
development or in the cloud for production and scale; you don’t need to change
the code to make that happen.

Often, data scientists and ML engineers need DevOps to help with deployment.
With [Quix](/product), you can do it yourself and use our engineering tools to
validate your data as you work. Want to **debug your stream**? You don’t have
to dig into logs; we help you explore and visualize the data to ensure it’s
arriving correctly and see the consequences of your data processing as it
happens.  

## Accelerating time to value for streaming data products

If you want to build a browser-powered app, operate something with a phone’s
gyroscope over the internet, make it shareable, host it in the cloud, and do
it all in a scalable way, the project could take months. It might not even
happen because most development teams don’t have this depth of expertise.

I’m willing to bet they couldn’t do it even if you assemble a team of
specialists — a data scientist, software engineer, front-end developer,
infrastructure specialist, and maybe an engineering manager or designer — to
create this simple game in a hackathon. I’m willing to bet they couldn’t do it
in a few days. And a hasty solution wouldn’t scale. It would likely take weeks
just to deploy secured, publicly available and encrypted Kafka and Kubernetes.  

> _“With traditional development methods, there are so many hurdles to clear
> just to generate a proof of concept. The time to value is terrible.”_

That’s why I call our demo “deceptively simple.” There are so many hurdles to
clear to generate a proof of concept. The time to value is terrible. With
Quix, the skill set required to make it all happen shrinks from needing deep
knowledge in 15 different technologies to just one or two key skills, like
writing Python code and building a simple frontend in Javascript.

That means [Quix](/product) is a platform that enables you to build an end-to-
end application to the POC level. With it, you can operate a drone or robot or
create a great new digital experience for your customers. It makes you a data
superhero.

**Want to try it for yourself?** Check out the [demo source
code](https://github.com/quixai/data-stream-processing-example), give it your
own twist, then deploy it in less time than it took to read this blog post.
When you’re done, I’d love to hear about your experience on our [Slack
channel](http://quix.io/slack-invite).






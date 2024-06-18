---
title: "Ensuring data speed and resiliency in a mobile IoT application"
date: 2023-07-13
authors: [mike-rosam]
slug: network-connectivity-and-resiliency
description: >
  Find out how 82 ML models — all deployed in just two weeks — significantly improved network connectivity and reduced operating costs for a leader in mobility.
categories:
  - use-cases
---

# Ensuring data speed and resiliency in a mobile IoT application

Find out how 82 ML models — all deployed in just two weeks — significantly improved network connectivity and reduced operating costs for a leader in mobility.

<!-- more -->

## Control guaranteed race-winning connectivity in just two weeks

It’s not enough to connect IoT devices. As these devices become increasingly
mobile, it’s essential to keep them connected — ensuring their data flow and
is captured flawlessly, no matter where they move.

This was the challenge for [Control](https://cntrl.io/), the telemetry company
specializing in race car data connectivity. From Daytona to Le Mans to
Nurburgring, Control engineers ensure that data moves seamlessly from the
devices in the car to race engineers located worldwide.  

![Racing cars in line.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b91a16806237ea74929f05_Racing-cars-
in-line.webp)

## The problem: Automatic network connection was not optimal, and manual
configuration is costly

Control supplies racing teams and manufacturers with race-winning
[telemetry](/blog/telemetry-data-explained) solutions. These cellular devices
contain three modems, allowing the device to be attached to up to three mobile
networks simultaneously. The device can automatically switch between these
modems up to 15 times per second during the race to optimize connectivity.  

> _“The problem: if a modem automatically connects to the first available
> network, instead of the best network, this can degrade performance up to
> 23%.”_

The problem was that when a device arrived at a new racetrack, the modems
automatically connected to the first available network, not the best available
network. This could lead to performance degradation of up to 23% compared to
an optimal condition.

Initially, this problem was solved manually. A Control engineer would log in
to an online portal, review the historical signal quality for the location,
and set a priority network for the device. The problem with manual
configurations:

  * They take significant engineering resources, about an hour per session to configure 30 cars
  * Devices can be missed, leading to support calls and a scramble to reconfigure
  * Customers attending unsupported test days can suffer needless performance degradation, leading to support calls and manual reconfiguration
  * A sudden change in network conditions, such as an operator outage, requires manual remediation mid-session

To improve their product and reduce operational costs, Control needed:

  1. A way to automate the configuration of their IoT devices
  2. A way to monitor, test, optimize and edit the configuration while the device is in operation

## The solution: Machine learning automates network performance detection and
optimizes routing

Control partnered with Quix to build and deploy an ML model that could
automatically detect network performance in real time and optimize
connectivity by automatically updating the device configuration.

However, machine learning models are rarely simple and often take months or
even years to deploy. A
[Dotscience](https://dotscience.com/assets/downloads/Dotscience_Survey-
Report-2019.pdf) report revealed that 64.4% of the organizations surveyed take
7–18 months to develop ML and AI models from idea to production.

Control needed to build and execute this project a whole lot faster. So they
turned to Quix’s production-ready stream processing platform to help them
quickly build, train, test and deploy a fast and resilient ML system.  

![Control case study infrastructure diagram.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b91a4e806237ea7492ea0b_Control-
case-study-infrastructure-diagram.webp)

Quix’s solution called for these steps:

  * Connect Quix to Control’s existing Azure Event Hub infrastructure to receive data streams
  * Transform raw messages into a structured data schema with standard business semantics
  * Contextualize data, so each car is associated with just one data stream
  * Store high-quality data from actual vehicles and train ML models on that data
  * Deploy the models into a stream processing pipeline to rank the best connectivity
  * Automatically update a configuration table in real time to optimize connectivity

Because Control’s devices operate in various locations, Quix’s solution
created 82 machine learning models — one for each venue and transmission mode
— to tailor the solution to each environment. The models rank all available
networks, weigh multiple variables and deliver a single recommendation for the
best network at any point.

This didn’t just work for real-time data. The ML models were also able to
predict real-time network performance using historical data. And when new
venues are added, the ML script alerts engineers that these also must be added
to the set of models.

This result is populated to live streams to enable automation — continuously
ranking the networks to maximize speed and connectivity.  

## The results: Improved performance and reliability while reducing operating
costs

Control’s use of Quix has enabled the company to update each car’s
connectivity automatically. Previously, a Control engineer had to configure
and test each car for each session manually. Now, the vehicles configure
themselves.  

> _“The solution took a massive operational burden off of Control engineers’
> shoulders, while also eliminating the risk of performance degradation.”_

This took a massive operational burden off Control engineers’ shoulders while
eliminating the risk that a customer would needlessly suffer up to 23%
performance degradation.

Control’s journey to developing and deploying ML models seemed, at first, like
an impossibility. The company’s small team leaned heavily toward software
engineers rather than data scientists, and they found it to be too costly and
time consuming to build on Microsoft Azure.  

> _“In partnership with Quix, Control was able to stand up, train, test and
> deploy 82 ML models in just two weeks.”_

In partnership with Quix, Control stood up, trained, tested, and deployed 82
ML models in just two weeks. In addition, Quix provided Control with a more
resilient data pipeline by replicating and sharding the data and the
processing. This gave Control confidence that their new data product would
perform consistently without adding resources to monitor and maintain the
system.  

## The business outcome

By using Quix, Control can take action on live data the moment it is created
rather than waiting until after the race is over.

“We’re always looking for an incremental edge in reliability and performance,”
said Nathan Sanders, technical director and founder of Control. “To guarantee
race-winning connectivity in just two weeks, with machine learning models
performing as well as our expert engineers, lets us build differentiated
products that increase value for our customers.”  

“The lightbulb moment happened when we realized how resilient Quix is. We’ve
automated a new product feature and Quix’s architecture gives us confidence it
won’t fail.”

**Nathan Sanders, Technical Director and Founder of Control**

Sanders continued: “The lightbulb moment happened when we realized how
resilient Quix is. Reliability is a major consideration when building mission-
critical products. We’ve automated a new product feature and Quix’s resilient
architecture gives us confidence it won’t fail.”

Quix CEO Mike Rosam believes Control’s solution has an opportunity to
massively improve connectivity for the mobility and logistics industries,
which require live data from their always-moving assets and would
significantly benefit from ML and automation.

The “last mile” of connectivity — from the cell tower to the IoT device at the
edge of a network — is a persistent problem for mobile IoT device operators.
Whether it’s a rideshare app, autonomous vehicle, drone delivery, or urban
scooter provider, mobility solutions are underpinned by network connectivity.

“Many companies have people who can write Python code — domain experts in
physics, biology and mechanical engineering, for example — and with Quix,
those people gain the ability to build data products,” Rosam explained. “Quix
makes machine learning accessible to all of them by taking care of the complex
data infrastructure while providing a simple user interface. As a result,
domain experts don’t have to waste time fighting with IT, instead they can
start building differentiated products quickly.”

Control’s use case proved three essential cases for Quix:

  * Providing data resiliency through its system design, so not a byte of data is lost
  * Ensuring network performance at scale for moving assets, and
  * Rapidly developing ML models that can be trained on historic data and automatically re-trained to adapt to new conditions in production.

If you’re curious to learn more about how to apply this solution to your
company, [book a consultation](https://calendly.com/clara-quix/30min) with our
technical experts. Or chat with us in [our Slack
community](http://quix.io/slack-invite).






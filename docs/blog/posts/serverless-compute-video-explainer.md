---
title: "How does serverless compute work in stream processing?"
date: 2023-07-17
authors: [steve-rosam]
slug: serverless-compute-video-explainer
description: >
  Learn more about the infrastructure that accelerates building data driven-products. We break it down with a super-speedy explanation and video.
categories:
  - industry-insights
---

# How does serverless compute work in stream processing?

Learn more about the infrastructure that accelerates building data driven-products. We break it down with a super-speedy explanation and video.

<!-- more -->

## With ready-to-use infrastructure, you can jump straight in to writing code

In the journey toward deploying a data-driven product to production, there are
a lot of hurdles that a developer or data scientist must clear.

Our team recently charted these, describing each step in a typical CI/CD
(continuous integration/continuous delivery) development pipeline. Within each
process, we found additional sub-processes that slowed development even more.

Sketching out our customers’ experience with traditional software development
tools energized our team at Quix because we’re working to eliminate the
complexity and hassle associated with stream processing.

That’s why I wanted to bring you a short explainer of Quix’s serverless
compute for stream processing. Our platform integrates Git source code,
Docker, Kafka and Kubernetes — so you can focus on writing code rather than
standing up a development environment.  

## Serverless compute for stream processing with Python

Want to see what that looks like? Here’s a short, 75-second video I made that
walks you through these elements Quix:

A few highlights you’ll see:

  * Quix manages an elastic environment for you. You don’t need to worry about servers, nodes, memory or CPU. Set the limits for your deployment, and Quix will do the rest.
  * You can commit and track changes using GIT as the underlying source code repository
  * Docker integration and the docker file supplied with each project allow you to fine-tune things if needed
  * You can view the build and runtime logs
  * Deploy dashboards and public APIs as part of your application with the public access options

## How to deploy serverless compute for data stream processing

As a next step, you can take a closer look at deploying to the Quix serverless
environment. Here’s an 80-second video to show how I do that for a very simple
website:

To deploy code, select any variables needed, choose the version and desired
resources, and hit deploy. Your code will be built, deployed and run. If you
want to deploy a frontend or any publicly accessible models with API or
application code, you’ll also want to enable Public Access on the Network tab.

Deployments can be either a “job” or a “service.” Jobs are for training ML
models or one-time operations, such as batch importing historic data. Jobs are
marked as completed after the process terminates.

Services are for running application code, ML models or frontends continuously
in production. Services are automatically restarted if the process terminates.

I hope you enjoyed my short walk-throughs. Curious to try it yourself? [Sign
up for free](https://quix.io/signup) or explore our [YouTube
channel](https://www.youtube.com/channel/UCrijXvbQg67m9-le28c7rPA) for more
explainers and video tutorials. If you have any questions, join us on our
[community Slack](http://quix.io/slack-invite).






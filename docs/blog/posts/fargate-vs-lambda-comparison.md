---
title: "Fargate vs Lambda: a comparison of serverless technologies"
date: 2023-11-13
authors: [mike-rosam]
slug: fargate-vs-lambda-comparison
description: >
  The main difference between these two serverless compute platforms is that AWS Fargate takes care of the underlying VMs, networking, and other resources you need to run containers using ECS or EKS, whereas AWS Lambda lets you run standalone, stateless functions without having to consider any of the infrastructure whatsoever.
categories:
  - ecosystem
---

# Fargate vs Lambda: a comparison of serverless technologies

The main difference between these two serverless compute platforms is that AWS Fargate takes care of the underlying VMs, networking, and other resources you need to run containers using ECS or EKS, whereas AWS Lambda lets you run standalone, stateless functions without having to consider any of the infrastructure whatsoever.

<!-- more -->

The past decade has seen huge variety in the ways in which we can deploy,
scale, and manage applications in the cloud. What end-users see as a single
application could mix virtual machines, containerized microservices, and on-
demand serverless solutions, not to mention third-party APIs.

Supporting this variety are tools that not only serve different use cases but
that are built on different assumptions. That can complicate comparisons
between competing solutions.

AWS’s Fargate and Lambda are prime examples. Although they’re both AWS
services that abstract away the VMs and physical servers that execute code in
the cloud, the approach they take varies greatly. Fargate is part of a
container as a service (CaaS) architecture, whereas Lambda is a serverless
compute engine that offers functions as a service (FaaS). Here we’ll compare
Fargate vs Lambda to help you put them in context and know when to use which
serverless technology

If you’re here because you’re planning to build an event-driven application, I
recommend the “[**Guide to the Event-Driven, Event Streaming
Stack**](https://www.quix.io/event-driven-event-streaming-
guide?_ga=2.244169030.299408049.1706024281-1054807313.1689840321),” which
talks about all the components of EDA and walks you through a reference use
case and decision tree to help you understand where each component fits in.

  

### Fargate vs Lambda: key takeaways

Before we get into the detail of comparing AWS Fargate with AWS Lambda, here
are the key takeaways:

  * Fargate automates the provisioning, management, and scaling of the compute resources that power containers managed by Amazon Elastic Compute Service (ECS) and Amazon Elastic Kubernetes Service (EKS).
  * Lambda runs standalone, time limited functions in response to events and with no infrastructure to manage.
  * They both serve different use cases, meaning that you might use both but the key is knowing which to use when.

Let’s dive into the detail of Fargate vs Lambda.

## AWS Fargate overview

Orchestrating containers is one thing but managing the underlying compute
infrastructure is another challenge altogether. AWS Fargate runs containers
without you ever having to think about them. It sets out to abstract away the
compute layer entirely so you can focus on managing your container workloads.

And that’s where the serverless aspect of Fargate comes in. Rather than
spinning up and managing individual virtual machines, you tell Fargate what
compute and memory resources you need and it takes care of the details.

That’s a different type of serverless than what you get with AWS Lambda but
what both tools have in common is that they free you from needing to care
about _how_ your workloads run.

### AWS Fargate’s architecture

As an AWS Fargate user, there’s not that much you need to know about its own
architecture. And that’s sort of the point. It deals with the details so you
can focus on deploying workloads to your containers.

But you can get a better understanding of Fargate’s role by looking at where
it sits in your application architecture:

  1. **Containers:** A container image deployed by a container runtime, such as Docker.
  2. **Container orchestration:** In the AWS ecosystem, that’s Elastic Container Service (ECS) or Elastic Kubernetes Service (EKS).
  3. **The underlying compute resources:** Without Fargate, this means bringing together several tools to configure, monitor, and scale the VMs beneath your containers.

Fargate takes that third layer and makes it essentially invisible to you. You
no longer need to paw through VM configuration details or think about the
trade-offs between EFS and EBS storage. Instead, running workloads in
production is almost easier than running Docker containers locally.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6551fa3b1c615e83dababb04_AWS%20Fargate%20diagram.png)

In fact, you don’t have to give a second’s thought as to how to manage the
infrastructure powering your containers. Instead, you specify your
requirements for compute, memory, storage, networking policies, and Fargate
takes care of all server management. Some of the implementation differs
depending on your chosen container environment. If you’re using ECS, that
comes in the form of task definitions. For EKS, Fargate draws on the pod spec.
Once Fargate has your specifications, it deploys, scales, and manages the
individual components according to the needs of your running containers.

**Related reading** : [ECS vs EKS vs Fargate](/blog/amazon-ecs-vs-eks-vs-
fargate-comparison)

### Fargate features and capabilities

Now that we have a broad overview of where Fargate sits in your application
architecture, let’s look in some more detail at what it can do.

**Automatic scaling:** As demand for your containers changes, Fargate uses AWS
Autoscaling and CloudWatch metrics to adjust the compute resources it gives
them. There are two main ways of doing this: target tracking and step scaling.
With target tracking, you set a desired level for your metrics, like CPU
usage, and Fargate adjusts resources to keep it there. If the actual level is
higher or lower than your target, Fargate responds to bring it back to your
set point. Step scaling, on the other hand, responds to changes in demand by
increasing or decreasing resources in predefined steps. If workload spikes,
Fargate adds more resources in increments, and similarly, scales down in steps
when demand drops. In effect, target tracking is proactive and step scaling is
reactive.

**Simplified security:** Fargate’s security model is based around isolation of
resources. In the ECS Fargate flavor, it assigns each ECS task (a single
container instance), whereas for the EKS version it assigns each EKS pod (a
collection of containers) to its own virtual machine. This isolation ensures
that tasks and pods cannot share key resources such as CPU, memory, operating
system, or local storage. So, if one task or pod is compromised, the risk of
it infecting other workloads is greatly reduced.

**Integration with other AWS services:** Another area where Fargate reduces
your DevOps workload is in how your containers work with other AWS products.
For example, rather than manually configuring the Elastic Load Balancer (ELB),
you can specify which tasks or pods should run behind the ELB and Fargate
takes care of the details. There’s a similar story for IAM management,
integration with AWS CodePipeline/AWS CodeDeploy, and service discovery
through CloudMap.

## AWS Lambda overview

AWS Lambda goes one step further than Fargate. Rather than abstracting away
just one part of the compute stack, Lambda is a serverless compute engine that
takes care of everything. Arguably, it’s serverless computing in its purest
form. That’s the execution environment, the operating system, and the compute
service all taken care of, meaning you can focus on the code, rather than
DevOps tasks. In fact, it can be as simple as uploading a zip file with your
code and then configuring when it should trigger.

But there’s another aspect that distinguishes Lambda from Fargate. While
Fargate simplifies how you deploy and manage long running processes, Lambda is
all about triggering self-contained code in response to events. Usually those
would be microservices that perform one or two tasks in response to events
such as an S3 bucket upload, an SQS message, or an API call made through the
Amazon API Gateway.

### AWS Lambda architecture

If you’re considering AWS Lambda then the likelihood is that you’re planning
to build either an [event-driven](/blog/what-why-how-of-event-driven-
programming) application architecture or microservices; or some combination of
both. In either case, you need to identify those parts of your application
that are suitable to run as AWS Lambda deployments.

There are three questions you can ask to help make the decision:

  1. **Is it self-contained?** Lambda functions are designed to execute in response to events, making them ideal for workflows that are triggered by specific actions or data changes. But they’re not suitable for long running or background processes, such as running the back-end for a chat application or scientific simulations.
  2. **Is demand likely to be spikey?** If a component is prone to peaks and troughs in demand, Lambda scales up and down with demand, meaning you avoid paying for idle infrastructure during quieter times. For consistent demand, though, more traditional infrastructure could be more cost effective.
  3. **Will it run in under 15 minutes?** Bearing in mind that Lambda supports a maximum execution time of 15 minutes, you might need more traditional infrastructure for longer running tasks. However, if you can split that task into smaller components then there’s always the option to use step functions, which involves handing off from one function to the next.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6551fa910ba939be9c7ac0d9_AWS%20Lambda%20diagram.png)

Ultimately, if you’re choosing between AWS Fargate and AWS Lambda, it’s these
questions that will decide which you use. And the likelihood is that you might
choose Lambda for some aspects and containers on top of Fargate for others.

### Lambda features and capabilities

To compare Fargate vs Lambda, you need to know not only where Lambda might fit
in your application’s architecture but also what it can do and what it’s like
to work with.

  * **Language choice:** In theory, you can run Lambda functions in any language. However, Lambda officially supports six programming languages: Node.js, Go, C#, Python, Ruby, and even Powershell. If your preferred language isn't supported natively, the custom runtime API lets you provide a container with your own Lambda runtime to execute your code.
  * **Execution time:** As we’ve seen, Lambda is designed for short running tasks. That maximum execution time of 15 minutes is a fundamental characteristic of the service. The time cap encourages lean, microservice-compatible functions which, typically, finish well under the limit.
  * Memory allocation: Lambda allows your functions between 128MB and 10GB of RAM. That’s in keeping with the overall philosophy that Lambda functions should be lightweight and focused.
  * **Disk space:** Similarly, each function gets 512MB of /tmp disk space, upgradable to 10GB.
  * Concurrency limitations: By default, you can run a maximum of 1,000 Lambda functions at once in a single region. You can request an uplift but there are strategies for reducing concurrency, starting with making sure each function runs as efficiently as possible. That means monitoring Lambda to ensure the most efficient use of limitations will be important.
  * **Function triggers:** You can use a wide variety of events to trigger your functions. Within the AWS ecosystem, that includes SQS and SNS messages, changes to data in DynamoDB, data streamed from Kinesis, and more. With Amazon API Gateway, you can trigger Lambda functions from outside, using a standard REST interface.

**Cold starts:** You’ll need to allow for delays in spinning up your function
if it hasn’t run for a while. That’s to allow AWS to prepare the runtime
environment and it can impact time-sensitive applications.

## Fargate vs Lambda: head to head comparison

## AWS Fargate and AWS Lambda use cases

Thanks to their differences, to some extent AWS Fargate vs AWS Lambda comes
down to the use case you have in mind. However, if you’re committed to the AWS
ecosystem then it’s likely that your application architecture could make use
of both Fargate and Lambda. However, both AWS services lend themselves to
different scenarios. Here we’ll look at Fargate vs Lambda in terms of use case
suitability.

### AWS Fargate use cases

Essentially, Fargate’s use cases are the same as any container-based
architecture. That’s because Fargate is a tool to simplify the management of
containers, rather than a particular way of building applications. Arguably,
though, Fargate is better suited to situations where resource demands are
likely to fluctuate and the associated DevOps burden would be high.

Bearing that in mind, here are some of the use cases that are particularly
well suited to AWS Fargate.

  * **Building a microservices architecture:** This one could be confusing as we’ve already said that AWS Lambda is well suited to microservices architectures. However, whether you use Fargate or Lambda comes down to factors such as whether microservices will be long running. As a tool for enabling container-based architectures, Fargate inherits Docker’s ability to handle isolated environments for each service. What makes Fargate itself especially well suited to microservices is that it can quickly respond to changes in demand without having to manage the underlying servers.
  * **Batch processing jobs:** Typically, these are medium-term applications that will spin up resources to complete one specific task and then scale back to zero or near zero. For example, running a daily sales report for an ecommerce platform.

**Web applications and APIs:** While it is possible to use other AWS services,
such as Amazon API Gateway, ELB, and Lambda, to build a web application
backend from scratch, it’s more common to use web frameworks that require
continuously running components. Fargate’s ability to scale container
infrastructure on demand means that it can respond to the typically spikey
nature of web traffic without over-provisioning resources.

### AWS Lambda use cases

Lambda’s sweet spot is in performing self-contained processing in response to
events. As it’s not a general purpose computing platform, it doesn’t offer the
same flexibility as Fargate. However, within the limitations of its design,
Lambda is very well suited to a number of use cases.

  * **Serverless API back-ends:** With Amazon API Gateway fielding REST requests, you can build an API back-end using Lambda functions and other AWS products, such as Cognito, the AWS identity service, to handle user auth and Step Functions to manage multiple functions serving more complex workflows. 
  * **Event-driven data processing:** The majority of Lambda functions take input from an event, apply some processing, and then return the result. For example, a web app user uploads their profile picture. The triggering event is the picture arriving in a specific S3 bucket. The Lambda function optimizes the image and applies a watermark, returning the altered image file as its output.
  * **Automated back-end tasks:** Using CloudWatch Events, you can schedule Lambda functions to trigger at specific times. That’s ideal for tasks that, otherwise, you might trigger using a cron job, such as database backups, log clean-up, and sending asynchronous notifications to end users.

## Fargate and Lambda total cost of ownership

Although total cost of ownership is something you should consider, whether you
choose Fargate or Lambda is primarily driven by the architectural requirements
of your application and the specific workloads it will handle. And it’s those
same considerations that feed into the pricing for both offerings.

Lambda combines two types of pricing: per request pricing and capacity based
pricing. The first is pretty straightforward. Each time a function runs, that
is a request, and Lambda charges per million requests. Currently, pricing in
most regions is $0.20 for one million requests. The capacity based pricing is
a little more involved, depending on what functionality you use. Every request
is billed for GB-seconds, which multiplies the duration of the function with
the memory allocated. For example, a function that runs for ten seconds and
uses 1GB of RAM would rack up 10 GB-seconds of usage. A GB-second in AWS’s
Ohio region currently costs $0.0001667 and there are free monthly allowances
both for requests and GB-seconds. Other pricing covers ephemeral storage, data
egress, provisioned concurrency, and other fees that are likely to be familiar
to experienced AWS customers.

Fargate pricing is much closer to traditional cloud pricing. The price you pay
depends on the vCPU, memory, operating system, CPU architecture, and storage
that your containers consume. As with Lambda, the price you pay also depends
on the region you choose. For example, in the Ohio region you’ll pay $0.04048
per vCPU hour and $0.004445 per GB per hour of RAM used. Although the pricing
model is the same as EC2, Fargate costs are higher to take account of the
additional value that Fargate offers.

## Conclusion: should you choose Fargate or Lambda?

The decision of Fargate vs Lambda ultimately depends on the application you’re
building and the workloads it needs to run. As we’ve seen, Fargate is ideal
for long running applications where you need full control over the runtime
environment but you want to automate the provisioning and management of the
infrastructure beneath your containers. So, if you need to run container
workloads then the question really becomes one of AWS Fargate vs manual VM
deployments and maintenance. Lambda, on the other hand, is best suited to
short lived and self-contained functions that run only when needed.

In practice, if you’re already working in the AWS ecosystem, it’s likely that
you’ll mix some combination of Lambda and either Fargate or ECS running on top
of VMs that you manage directly. So, it’s less about whether to use Fargate
_or_ Lambda and more a case of how to combine both serverless environments.

Another alternative you could investigate is Quix, a fully managed tool that
enables you to develop, release, and observe event-driven applications powered
by Kafka. With Quix, you can focus entirely on building serverless event
streaming applications instead of dealing with the headache of managing
underlying infrastructure. To learn more, [check out the Quix
docs](https://quix.io/docs/platform/what-is-quix.html).




## Guide to the Event-Driven, Event Streaming Stack
Practical insights into event-driven technologies for developers and software architects

[Get the guide](https://www.quix.io/event-driven-event-streaming-guide)



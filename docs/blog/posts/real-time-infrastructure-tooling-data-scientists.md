---
title: "Real-Time infrastructure tooling for data scientists"
date: 2023-07-17
authors: [tun-shwe]
slug: real-time-infrastructure-tooling-data-scientists
description: >
  Explore the evolution of new tools for real-time pipelines that aim to solve the ongoing problem of data scientists' need for more infrastructure expertise.
categories:
  - industry-insights
---

# Real-Time infrastructure tooling for data scientists

Explore the evolution of new tools for real-time pipelines that aim to solve the ongoing problem of data scientists' need for more infrastructure expertise.

<!-- more -->

## Introduction

In our ongoing series on friction in [feature
engineering](https://quix.io/blog/what-is-real-time-featuring-engineering), we
talked generally about the [impedance gap between data scientists and
engineers](/blog/bridging-the-impedance-gap) and did a deep dive on the
[hassle of translating from Python into Java](/blog/feature-engineering-
language-problem). Here, I want to do another deep dive, but this time on the
subject of infrastructure—another source of friction when getting real-time
feature transformations into production.

Here are the key takeaways:

  * **Developers and data scientists both need to deal with infrastructure—but they need different tools.**
  * **Love it or hate it, demand for “T-shaped” data scientists isn’t going away.**
  * **When it comes to data pipelines, data scientists are used to the “plan and run” approach.**
  * **When moving from batch to real-time, it helps to think in a service-oriented way.**
  * **There are ML and real-time pipeline tools that support both approaches: Metaflow, Bytewax, Confluent Stream Designer and Quix.**
  * **Each tool is strong in different areas such as usability, configurability, scalability and performance.**

This article could be considered a follow-up to Chip Huyen’s hotly-debated
post, [_Why data scientists shouldn’t need to know
Kubernetes_](https://huyenchip.com/2021/09/13/data-science-
infrastructure.html). The discussion around the post is almost as educational
as the post itself.

In [Twitter](https://twitter.com/chipro/status/1437604700115935233) and
[Hacker News](https://news.ycombinator.com/item?id=28649508), debates emerged
about how much of the stack you need to learn.

  * There were data scientists who felt validated, shunning the expectation that they should be “full stack”.
  * There were even developers who admitted that they don’t like using Kubernetes either, preferring to focus on their application logic. 

On the other hand, some commentators seemed less sympathetic and felt that
data scientists should just “suck it up”.

![Long text note on white background.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b4db6a492cef83cc5f79ad_hn_comment_2023-07-07-184520_bwpt.png)

_One of the more_[ _passionate
comments_](https://news.ycombinator.com/item?id=28653098) _in HN._

Of course, it’s not as black and white as the discussion would lead you to
believe.

## The spectrum between “no autonomy” and “complete autonomy”

There is a range of skills that put a data scientist somewhere between “no
autonomy” (getting an engineer to configure and deploy everything for you) and
“complete autonomy” (writing your own Helm charts and Terraform modules). It’s
unrealistic to expect a data scientist to be on the “complete autonomy” end of
the spectrum, but it’s fair to expect them to move as far as possible towards
it, especially if you’re in a small team.

This expectation is common in the startup world; roles are usually more fluid
and employees are expected to take on a wider array of responsibilities. This
is why data scientists at startups tend to perform more data engineering tasks
and spend less time on “pure” data science.

This loosely mirrors the DevOps trend for developers, where developers became
responsible for deploying their own code and relied less on SREs or
infrastructure specialists. Yet, the comparison isn’t entirely fair—doing data
science isn’t the same as developing applications. For one, the developer
learns how to replicate the production environment on their machine from early
on and frequently tests their code in staging environments that are exact
replicas of production. This pattern hasn’t been as easy for data scientists
to copy.

## Data scientists and developers have different ways of working

To understand the difference between these two roles, it helps to look at
another scenario (just like I did in my [language problem
article](/blog/feature-engineering-language-problem)).

Suppose I have two services that both take stock trading data as input.

  * One is a typical service that plots the price movement of a stock and sends its app users alerts when the price has crossed a certain threshold in a specific direction.
  * The second is an online feature transformation service that provides fresh features to an ML model.

The ML model is trained on patterns in historical trading activity coupled
with real-time data. It looks at the trading behaviour in short time windows
such as the last hour or last minute and gives users continually updated
projections on a stock's movement within the current day as well as long term
(this is the same scenario I used in my last article). This is why it relies
on the online feature transformation service.

You could deploy both services using a similar pattern but there will need to
be key differences in the workflow. To understand what I mean let’s look at
how you would deploy a typical service.

## How a developer might deploy a typical service

Let’s say we’re using [AWS Fargate](https://aws.amazon.com/fargate/) to deploy
it. AWS Fargate is a serverless compute engine for containers that simplifies
container deployment and management by automatically handling infrastructure
provisioning, scaling and maintenance. This is what makes it so popular with
developers.

Having said that, the steps to deploy a service are still fairly complex. For
example, look at the steps involved in the tutorials, [_How to deploy a Python
Microservice on Fargate_](https://medium.com/@thehouseofcards/how-to-deploy-a-
python-microservice-on-fargate-part-2-93fcdb483372) _(CLI-based)_ or [_Deploy
Microservices on AWS ECS with Fargate_](https://dev.to/aws-builders/deploy-
microservices-on-aws-ecs-fargate-serverless-16el) _(UI-based)._

Here’s a very rough summary of what you would need to do when starting a new
project.

  * **Preparation.**

First, you would need to have a full development environment set up with
Docker installed as well as the AWS and ECS CLIs.

  * **Dockerise the application.**

Then, after you’ve finished coding the logic for your service, you would need
to Dockerise it. This means writing a Docker file that defines the entry
point, software dependencies, relevant ports to open and so on. Then you run a
build script to actually build a Docker image.

  * **Push the image to a container registry.**

Then you’d push the image to Amazon Elastic Container Registry (ECR). In this
step you need to make sure that you have the correct IAM roles and ensure that
your image is tagged correctly.

  * **Deploy the image to your cluster as a service.**

This is perhaps the most tricky part of the process. Here you need to define
task and service definitions. This involves configuring execution roles, auto
scaling behaviour, load balancing, network settings and inter-service
communication. Then you would rinse and repeat for the other services involved
in your project.

All of this requires some fairly in-depth knowledge of how infrastructure
works in AWS and many development teams have a dedicated DevOps specialist to
help them navigate the intricacies of networking and access management.

However, once it is all set up, it’s usually automated with Infrastructure as
Code (IaC) tools such as Terraform. This enables an automated CI/CD process to
take care of deploying new versions of a service whenever developers push
major changes to the underlying code. However, configuring a tool like
Terraform is also [not a trivial
task](https://engineering.finleap.com/posts/2020-02-20-ecs-fargate-
terraform/).

Anyway, that’s a sketch of the process for a typical back-end developer. Let’s
turn to the other type of task, one that is typically the concern of data
scientists.

## How a ML engineer might deploy an online feature transformation service

Assuming you’re using the same infrastructure as the typical microservice (AWS
Fargate), the deployment steps probably wouldn’t change much. However, you
would need to update your network settings to ensure that the container has
access to the wider internet (for example, access the Coinbase WebSocket feed
to read fresh trading data).

Secondly, you would need to connect the container to an online, in-memory data
store such as Redis. This provides the feature transformation service with a
place to write the calculated features.

Thus, when the ML model needs to make a prediction, it fetches the most recent
features from Redis. This allows the prediction service to access feature data
at very high speed, which can be crucial for latency-sensitive applications.

This of course begs the question—do we really expect data scientists to know
all this too? Probably not. Most big companies have ML engineers to do it for
them. And in companies that have batch-only machine learning processes, i.e.
most companies, data scientists don’t have to think about application __
infrastructure at all.

However, many data scientists do have to provision infrastructure for model
training and run data pipelines internally. Internal pipelines also have their
fair share of infrastructural wrangling, but these processes generally are
“plan and run” workflows which have a start and end. This reduces the
complexity to a small degree, but it’s still typically handled by a data
engineer or a data scientist with a T-shaped skill set, i.e. they have
acquired some data engineering skills.  

It takes another set of skills to deploy a service that runs online and to
automate and test that deployment. This is why there’s usually a handover
process where data scientists pass their work to software or data/ML engineers
to deploy online. However this handover can be a bottleneck as we covered in
our earlier article on the [impedance gap](/blog/bridging-the-impedance-gap).

## The demand for T-shaped data scientists

Let’s revisit that notion of the T-shaped skill set for a moment.

![Two pictures of three people doing the t-shaped posture.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0f4247f03861563ec9a84_t-
pose-v2.webp)

The batch processing world is now full of them. Just search on LinkedIn for
“data scientist” and you’ll often see “/ data engineer” tacked on to the end.
Why is that?

An article from early 2021 might give us a clue. In his article, [_We Don't
Need Data Scientists, We Need Data
Engineers_](https://www.mihaileric.com/posts/we-need-data-engineers-not-data-
scientists/) _,_ engineer Mihail Eric claimed that there were supposedly 70%
more open roles for data engineers than for data scientists (out of the Y
Combinator portfolio companies that he studied). His takeaway point was that
the industry should place more emphasis on engineering skills when training
data professionals.

Also, given the lack of data engineers at the time he was writing, many lone
data scientists acquired some engineering skills out of necessity. Initially,
many companies only hired one data scientist, usually their first data hire,
so they had to learn how to provision their own infrastructure to some degree
(I have data scientist friends that have been in this position and conveyed
their pain). Later, they were also aided by the emergence of new tools that
simplified some infrastructural aspects of running an ML data pipeline.

In the following section, I’ll take a look at one of these tools and identify
some paradigms that are being carried over to tools for real-time data
pipelines. The goal is to show how productivity gains from the batch world can
also be applied to the real-time world.

## Rise of the “Plan and Run” approach

In the batch world, a pipeline is bounded—there is a clear start and end. You
run the pipeline and at some point it is done (until it is triggered again).
In contrast, a real-time unbounded pipeline is usually never done, it runs
continuously for eternity (unless you stop it or it encounters a serious
error).

The bounded nature of batch processing, lends itself to being orchestrated as
a “plan and run” approach. This is the approach used by workflow tools such as
Dagster and Airflow. Both of these tools are designed to connect to a data
integration platform such as Airbyte and run some data processing steps in
sequence.

![Screenshot from Dagster fetching data from Hacker News
APIs.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0f6558519be7a7b32678b_dagster.webp)

_Screenshot from the_[ _Dagster quick start_](https://github.com/dagster-
io/quickstart-etl) _for a job that fetches data from Hacker News’ APIs,
transforms the collected data using Pandas and creates a word cloud based on
trending stories (to visualise popular topics)._

This processing workflow is written locally in a Python workflow file and then
submitted to the workflow tool to run in a specific compute environment (hence
“plan and run”). However, the disadvantage of these tools was that you still
had to provision the infrastructure where the processing code would actually
execute. This problem is especially acute when provisioning the resources to
train memory-hungry machine learning models.

To help solve this problem, Netflix open sourced
[Metaflow](https://metaflow.org/)—originally an internal tool that abstracts
away much of the infrastructure configuration and allows data scientists to
use the same code in both development and production environments. The project
was spun out into a separate startup called Outerbounds who now manage its
development. They also offer a [managed
platform](https://outerbounds.com/blog/announcing-outerbounds-platform/) which
runs Metaflow so you don’t have to worry about setting it up.

In any case, it has some great concepts that can be applied to real-time data
pipelines too, so let's take a closer look.

## Metaflow: infrastructure for ML, AI and data science

You can run Metaflow locally, deploy it to external compute clusters, or use
it in the Outerbounds managed platform. Once you have it set up, you can
define and run your workflows in a cloud IDE. Unsurprisingly, you define your
workflow in a Python file, which consists of steps that are defined with
“@step” decorators. You can also visualise your workflow as a DAG which
illustrates how the workflow will be executed.

![Metaflow infrastructure screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0f73cfac265b196654ccf_metaflow.webp)

The real kicker though, is the ability to provision infrastructure for each
workflow step. Here’s a very simple example, from the Metaflow sandbox.

This example shows how you can provision a container with a specific amount of
memory that goes beyond the defaults. Unlike Airflow, Metaflow allows you to
easily provision different kinds of containers for different steps, so that
each step has the resources that it needs. For more information on how the
Kubernetes configuration works, see Metaflow’s documentation of the
[“@kubernetes” decorator](https://docs.metaflow.org/api/step-
decorators/kubernetes).

Although Metaflow is great for training and retraining models it’s not ideal
for a real-time pipeline that runs continuous feature computations in
production.

Yet, there are other tools that borrow the same “plan and run” approach for
real-time processing. Some key examples are Bytewax and Confluent’s Stream
Designer. Let’s look at Bytewax first.

## Bytewax: Timely Dataflows

[Bytewax](https://bytewax.io/) is a Python native binding to the Rust
implementation of the Timely Dataflow library. Timely Dataflow was first
introduced as a concept in the 2013 Microsoft Research paper “ _Naiad: A
Timely Dataflow System_ ”. The original Rust implementation is described as a
distributed “data-parallel compute engine” that allows you to develop and run
your code locally and then easily scale that code to multiple workers or
processes without changes.

![Bytewax timely dataflow.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c1030fa67c2c1e0e90102e_timelyflow.webp)

Bytewax thus inherits all of these parallel processing features while
providing a more accessible syntax and simplified programming interface, as
well as a powerful CLI that lets you deploy a dataflow to an instance in the
cloud.

In its most basic form a dataflow looks like this, where each step calls a
different function, starting with an input and ending with an output.

_Example taken from the_[ _Bytewax
documentation_](https://bytewax.io/docs/getting-started/simple-example)
_(functions omitted for brevity)._

Dataflows can also contain subflows nested within a function and it’s possible
to run steps concurrently and pass different parameters to various steps. This
allows you run the same flow with different variables (for example, a certain
price threshold or field name).

Here’s how you would pass a threshold value of 10 to a flow:

Sadly, you can’t define your infrastructure requirements in the code of the
flow itself (like you can with Metaflow). However, you can (to a degree)
define it at the command level.

For example, suppose that you want to run individual processes on different
machines in the same network. Specifically, you want to run 2 processes, with
3 workers each on two different machines. The machines are known in the
network as _cluster_one_ and _cluster_two_.

  * You would run the first process on cluster_one as follows:

  * And the second process like this:

To deploy a dataflow to a Kubernetes cluster you would use the
[Waxctl](https://bytewax.io/docs/deployment/waxctl) tool which is Bytewax's
equivalent to Kubernete's
[kubectl](https://kubernetes.io/docs/reference/kubectl/) client.

However, this introduces a little more complexity as you’re required to
configure communication between the different workers yourself. So for example
if you have a cluster that runs [Redpanda](https://redpanda.com/) or [Apache
Kafka](https://kafka.apache.org/) to store the output of intermediate steps,
you’ll have to configure your workers to connect to Redpanda or Kafka.

When you use the Waxctl CLI to deploy a Bytewax dataflow to a Kubernetes
cluster, it will create the following components within the cluster.

![Bytewax dataflow scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c103b3c5ee7abe34de4d89_bytewax-
namespace.webp)

These components are explained in more detail in the [Bytewax
documentation](https://bytewax.io/docs/deployment/k8s-ecosystem), but what's
important to point out there is that Bytewax will provision multiple replicas
for your dataflow (indicated by my-dataflow-0, my-dataflow-1, etc.) based on
your configuration settings. However, it’s not entirely clear how to allocate
more resources to an especially memory-hungry step while letting the other
steps run in low-resource containers. My guess is that you need to [customise
the Bytewax Helm chart](https://github.com/bytewax/helm-charts) first.

As it stands, Bytewax definitely doesn't have the same level of
configurability as Metaflow and there’s no managed version—you have to set up
your own cluster on AWS or GCP. However, as I’ve pointed out before, they are
currently working on a [managed platform](https://bytewax.io/platform) which I
am hopeful will follow in the steps of Metaflow and abstract away more of the
infrastructure headache.

Thus, from the perspective of a data scientist, Bytewax is fantastic for
defining and orchestrating workflows but there's still the requirement of
provisioning the accompanying infrastructure.

## Confluent Stream Designer: real-time streaming pipelines with ksqlDB

Confluent’s [Stream Designer](https://docs.confluent.io/cloud/current/stream-
designer/overview.html) is another tool with a “plan and run” approach to
real-time pipelines. It uses ksqlDB as its processing engine and offers both a
visual pipeline designer and a simple IDE for defining the pipeline in KSQL.

Unlike Metaflow and Bytewax, Stream Designer does not allow you to provision
different resources for different steps in the pipeline. This is by design.
The entire pipeline is designed to run on a single ksqlDB cluster which
handles all the data processing and state management. The processing load is
divided amongst the available nodes in the cluster and if a node is added or
removed, ksqlDB will automatically rebalance the processing workloads.

Let’s look at an example of a pipeline which performs the following tasks:

  * Use the sample Datagen source connector to get basic page view data. This is how the data will look:  
_{ "viewtime": 1702311, "userid": "User_5", "pageid": "Page_39" }_  
_{ "viewtime": 1702411, "userid": "User_6", "pageid": "Page_66" }_  
_{ "viewtime": 1702541, "userid": "User_6", "pageid": "Page_89" }_

  * Write that data to a stream in a topic called “pageviews_topic”.
  * Filter the stream for a specific user ID.
  * Write the the filtered stream back to a downstream topic.

Here’s a screenshot of the finished pipeline that has been wired together in
the Stream Designer UI.

![Wired pipeline in Stream Designer UI.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c1041ed61a1756662a8e90_stream-
designer-UI.webp)

Although the UI is designed to abstract away the process of creating KSQL by
hand, there are some parts of the configuration that require you to know a bit
of KSQL—such as defining column names for a stream (sadly none of the fields
have autocomplete, or defaults that might help a data scientist configure the
steps faster). This is perhaps not possible because a pipeline is designed
offline. It doesn’t yet know about some attributes of the online data.

The following screenshot shows how you define columns for a filter stream:

![Stream window screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c104802b95cbe3c837a9fd_stream-
workspace-screenshot.webp)

If you know a bit of KSQL, it is probably faster to write the steps by hand
which you can also do by clicking “View pipeline graph and source”. This
ability to easily switch back and forth between the code and the visual graph
is a nice touch.

![Test pipeline code block.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c106462b95cbe3c83954e7_stream-code-
block.webp)

Once you have written your pipeline, you click “activate” it to deploy the
whole pipeline at once. This makes it very much in line with the “plan and
run” approach adopted by Metaflow and Bytewax. However, you can also add new
components to an already running pipeline. If you want to change existing
components, you need to deactivate the pipeline first and reactivate it when
you’re done.

One obvious weakness here though, is that workflows are based on KSQL rather
than Python. We’ve already covered the [limitations of ksqlDB
elsewhere](/blog/drawbacks-ksqldb-ml-workflows), especially when it comes to
machine learning. The gist of the article being that if you’re doing real-time
machine learning and need to compute fresh features with complex
transformations, it might not be the best choice.

If you're not doing machine learning and your pipeline consists of fairly
standard processing steps (i.e. filtering, joining, aggregating), Stream
Designer is a great option. For data scientists, the infrastructure problem is
taken care of because everything runs on a managed cluster, which has likely
already been set up by your infrastructure or Confluent support team.

## Quix: serverless data pipelines

Last but not least, we have our own offering which uses many of the paradigms
from the tools above. One difference though is that it works in a serverless
manner. You don’t have to follow the “plan and run” approach (unless you
really want to).

The [Quix platform](https://portal.platform.quix.ai/self-sign-
up?__hstc=175542013.47788df652e6c40c4f592430dcaa100f.1686578338159.1689418230899.1689568336719.24&__hssc=175542013.43.1689568336719&__hsfp=524412920)
has a visual graph which is very similar to Confluent Stream Designer, however
the graph itself can’t be edited in the same way as Stream Designer—you can’t
wire together nodes because it is designed to represent services that have
already been deployed. There is also currently no offline view like you would
get in Confluent’s Stream Designer. However, you can interact with the graph
by clicking different nodes opening their relevant contextual menus.

![Quix deployment settings screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c1068d0ddaab2bd8f5ed2d_quix-
screenshot.webp)

Each individual node represents a deployed project running a specific step in
the pipeline. When you click on a node you can access the deployment settings
that are used to run its process. You can also view the code—stored in your
Git repo—that is running on the node (under the hood, this is handled by one
or more Docker containers running in Kubernetes).

In Quix, the infrastructure and workflow are decoupled from the processing
logic. This means that the processing code is stored separate from the
workflow (rather than one big long flow.py as it would be in Metaflow ) and
they all reside in the same Git repository.

  * The infrastructure settings and workflow steps are written to a YAML file.
  * The processing logic is stored in Python files and committed to the Git repository that you’ve defined for your workspace.

Here’s an example of how the infrastructure and workflow logic is defined in
YAML.

[view raw ](https://gist.github.com/merlin-
quix/afdc537bbd91049324c3303197218025/raw/428a2c95dc47151ee78d3e8c59edfb39d096c665/quix_yaml.yaml)[quix_yaml.yaml
](https://gist.github.com/merlin-quix/afdc537bbd91049324c3303197218025#file-
quix_yaml-yaml)hosted with ❤ by [GitHub](https://github.com/)

This YAML file is stored at the top level of your project. Like Stream
Designer, the editing process is bidirectional. You can edit the YAML file
directly (either locally or in the cloud IDE) or you can use the web UI to
define the steps, which will be synced to the YAML file. Each step is called a
“deployment” and is referenced by a unique name.

Here’s an example of a deployment which contains the processing logic for a
specific step.

![Ride Demuxer screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c10750d8a202f2d34ac963_ride-
demuxer.webp)

Generally, the Quix processing model is quite opinionated about how you store
the data as it flows through your pipeline. Although not visible in the
pipeline visualisation, each step typically outputs the data to a Kafka topic.

Subsequent steps read from the Kafka topic and in turn produce their outputs
to other Kafka topics as illustrated in the following diagram.

![Black and white scheme of data pipeline.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c1079f56896cdab21801df_kafka-
arch.webp)

This means that the steps don’t need to be defined in any specific order in
the YAML file. The order of steps can be determined from the topics that each
step uses as input and output. Thus topics are like the links in a chain of
steps.

## Summary: comparing approaches

Now that I’ve talked you through a few tools, let's compare their approaches.

### Plan and Run approach

The plan and run approach is fundamentally a paradigm from the batch
processing world where a series of jobs are defined and executed all at once.
This approach pushes you towards running the whole pipeline on one machine or
container with a global set of resources. But this doesn’t work for machine
learning workflows where some processing steps need far more resources than
others. Thus, tools like Metaflow evolved to fill this gap.

Similarly, Bytewax and Stream Designer both guide you to run your entire flows
in one compute environment. In Stream Designer it’s simply not possible to do
it any other way and in Bytewax the infrastructure learning curve is
prohibitively complex for a data scientist to manage alone (although it does
provide an easy way to scale horizontally).

Thus, when it comes to provisioning infrastructure, Metaflow strikes the best
balance between simplicity and configurability. Unfortunately it’s not
suitable for real-time pipelines because it doesn't have built-in
functionality to handle streaming data or manage the lower latencies typically
required in real-time systems.

Bytewax looks more promising and it shows a lot of potential. For now, the
better way to work with it would probably be to have a software engineer set
up a staging environment for the data scientists and give them simple command
line tools to deploy their dataflows with the required resources. When the
code is ready, an engineer can deploy it to the production environment. Even
with this setup, Bytewax adds a lot of value, helping to solve the [code
translation problem](/blog/feature-engineering-language-problem) (thus cutting
down time to production).

Confluent’s Stream Designer looks like the simplest real-time solution for
data scientists yet it’s not an easy option for data scientists who use ML
models in their real-time pipelines. However, if Confluent were to release a
version of Stream Designer for their new Apache Flink integration, that would
certainly change the game (as long as they allowed you to write in Python as
well as SQL).

### Decoupled, service-oriented approach

As I hinted at at the start of the article, a decoupled, service-oriented
approach is the default paradigm for any kind of application back-end (which
is always inherently real-time in nature). That’s why I used AWS Fargate to
describe how it works in typical software development.

Online ML models and real-time feature computations are increasingly making
their way into standard back-end architectures and are often deployed using
the same approach. However, this leaves the data scientist with the difficult
choice of trying to learn Docker and AWS Fargate or relying entirely on an ML
engineer to get their code deployed. Most large companies go for the latter
option, but in lean startups, the data scientist has to build up some
infrastructure chops. In a sense, their job security depends on them becoming
more T-shaped. As one Hacker News commenter[ put
it](https://news.ycombinator.com/item?id=28656740):

> “ _The unfortunate truth the school of hard knocks has shown me is that
> someone without the "roll your sleeves up" attitude to learn Docker is
> generally speaking just not going to be that effective when push comes to
> shove. Now if you're using tools to abstract the time of data scientists who
> are CAPABLE of learning Docker, that is a different story._ ”

Indeed this is one of the use cases that Quix was designed to address:
empowering those data scientists who are capable of learning Docker but whose
value is focusing on the processing logic (and algorithms). The Quix platform
is intended to abstract away much of the infrastructure complexity associated
with Docker and Kubernetes. This allows data scientists to develop, deploy and
test their own code in staging environments within containerised services that
interact with Kafka to produce and consume data. This encourages them to write
better code because performance is often a trade off based on the shape of the
data. Better decisions for optimising their code will be made when they can
actually see how system resources deal with production-level data volumes.

In summary, tools like Bytewax and Stream Designer are a good fit if you’re
already familiar with the plan and run approach and are making the first steps
in moving from batch to real-time streams processing. The way you configure
workflows is fairly similar to how you would do it in tools like Dagster and
Airflow.

If you have more complex real-time processing requirements where each step in
your pipeline needs to be scaled separately, then Quix would be a superior
choice to something like Fargate. If you have an army of machine learning
engineers to handle the infrastructure, then by all means go for Fargate, or
even build something in house. But if you want to balance simplicity and
configurability in the same manner as Metaflow, definitely give Quix a try.






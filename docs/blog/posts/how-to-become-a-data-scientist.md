---
title: "How to become a data scientist"
date: 2023-07-19
authors: [javier-blanco]
slug: how-to-become-a-data-scientist
description: >
  How to become a data scientist (or develop your skills if you're already one). Our senior data scientist shares his thoughts on what it takes to start a career in this area.
categories:
  - industry-insights
---

# How to become a data scientist

How to become a data scientist (or develop your skills if you're already one). Our senior data scientist shares his thoughts on what it takes to start a career in this area.

<!-- more -->

## How to keep learning if you’re already a data scientist

I often get asked questions such as:

  * How did you get into data science?
  * How do I transition from industrial engineering into data science?
  * What skills do I need to learn to be a good data scientist?

So I decided to write this blog to share my thoughts on what it takes to start
a career in this area.  

## What is a data scientist?

  * Data scientist (n.): Person who is better at statistics than any software engineer and better at software engineering than any statistician. –[ Josh Wills](https://twitter.com/josh_wills/status/198093512149958656?lang=en)
  * Data scientists apply sophisticated quantitative and computer science skills to both structures and analyze massive stores or continuous streams of unstructured data with the intent to derive insights and prescribe action. – [Burtch Works Data Science Salary Survey, May 2018](https://www.burtchworks.com/wp-content/uploads/2018/05/Burtch-Works-Study_DS-2018.pdf)
  * More than anything, data scientists make discoveries while swimming in data. In a competitive landscape where challenges keep changing and data never stop flowing, data scientists help decision makers shift from ad hoc analysis to an ongoing conversation with data. – [Data Scientist: The Sexiest Job of the 21st Century, Harvard Business Review](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century)

## How to become a data scientist?

The ideal data scientist has these three aspects well covered — Math, MLOps
and domain knowledge — marinated with some valuable soft skills, including
communication, creativity and business acumen.  

![Data science ven diagram.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be7086543c3d8cff877f12_Data-
science-venn-diagram.webp)

## Data scientists need math

You need a sound knowledge of how different algorithms work and how to put
them into practice.  

### As a beginner:

[**DataCamp:** ](https://www.datacamp.com/)Great place to start from scratch
without worrying about downloading libraries, IDEs, importing data, etc. Ideal
for someone starting from zero.

[**Kaggle:** ](https://www.kaggle.com/)Lots of datasets, discussions, courses
and even competitions available!

[**Statquest:** ](https://www.youtube.com/user/joshstarmer)The best Machine
Learning youtube channel out there. From zero to hero philosophy — not just
useful for newbies!  

### As someone with experience:

More practice with different types of problems will get you further, of
course, but if you want to go ahead and look into the next big things in data
science I suggest:

**Causality:** How to create models that don’t just use correlations between
variables but look for actual causal relationships. A great way to understand
why this is important is [this free course](https://www.edx.org/course/causal-
diagrams-draw-your-assumptions-before-your) by HarvardX. After that, you are
ready to dive into Judea Pearl’s great masterpiece “The Book of Why.”

**Online learning: H** ow to create models that update (retrain) themselves
over the air (in production) with the latest data. An excellent way to
introduce yourself to online learning is [this
post](https://huyenchip.com/2020/12/27/real-time-machine-learning.html) by
Standford’s ML lecturer Chip Huyen. A sound Python library to try online
learning is [River](https://github.com/online-ml/river).

## MLOps

The term MLOps (short for ML Operations) is gaining traction to refer to all
the software engineering work organizations are doing to put models into
production or ingest the data to train models.

MLOps is covering all the infrastructure, tooling and software that data
scientists need to be more productive in a professional environment. Broadly
it can include:

  * GIT for version control
  * CI/CD tools and methods
  * Kubernetes and Docker technologies
  * Pipeline tools
  * Monitoring tools
  * API’s
  * Serving tools

MLOps is not covered much in courses that focus more on the theoretical and
practical topics around data preparation and modeling, so you’re going to have
to learn it yourself.

There are two ways to go about this:

  1. **Just learn MLOps.**  
_Duh!_ It’s not so easy, though. Junior data scientists working in a good ML
team will learn what they need on the job, and the best thing you can do is
ask lots of questions. There are limited resources out there for aspiring data
scientists or those in less organized teams, and most require previous
knowledge. Here you can find [some good MLOps
resources](https://towardsdatascience.com/the-3-best-free-online-resources-to-
learn-mlops-54816904f485). This is another [comprehensive
course](https://www.coursera.org/learn/mlops-fundamentals) (limited to Google
Cloud Platform, though).

  2. **Use platforms that do MLOps for you.  
** Several commercial data platforms include MLOps features. You can often
signup for a free trial and do some of their tutorials which will help you
learn some of the MLOps subjects. Some of the free platforms include:

  3. **DataBricks**  
DataBricks is a prevalent Machine Learning platform built by the original
creators of Apache Spark. Spark is a large-scale data processing engine
designed to extract large amounts of data from a disk and serve it to large
compute clusters in parallel. With a database at the core, DataBricks is best
suited to batch historical data processing. The highly scalable Spark Engine
does mean that data can be processed relatively quickly if enough storage and
compute resources are deployed to the project. Spark also has a streaming
library that supports near-real-time by batching data into chunks of seconds
to ten-of-seconds large.  
  
DataBricks provides data scientists with everything they need. You can quickly
get historical data from a database or connect the database to a stream source
like Kafka. There are notebooks for experimentation and clusters for training
or model serving. There are also nice integrations to a managed MLflow (an
open-source project created by teams at DataBricks), which lets you manage
your experiments, models and deployments.  
  
I would check out their [10-minute
tutorials](https://docs.databricks.com/applications/machine-
learning/tutorial/index.html) to get started with their 14-day free trial
(this doesn’t include storage or compute resources).

  4. **Dataiku**  
Dataiku is a platform for data scientists and Data Analysts. Like DataBricks,
it is built around historical data and allows you to connect to just about any
storage technology. Once connected to your data, you can use the platform to
explore your data, prepare it, develop, train and deploy ML models and consume
the results in applications. Dataiku includes many MLOps features like
reusable code blocks that can be re-configured into data pipelines. Like the
other options here, the user is abstracted off the underlying infrastructure,
so they don’t have to worry much about provisioning databases or compute
resources (you still have to do it, but it’s easy).  
  
Dataiku wins on the user experience, taking simplicity and usability to the
next level, providing probably the easiest to use web portal here. The
platform supports developers working in SQL, Python, R and Spark. Dataiku does
not have extensive support for streaming data in Kafka or time-series data
types. Still, it does have outstanding APIs for building applications from the
results of your data processing.  
  
I would start with their [online
tutorial](https://doc.dataiku.com/tutorials/1/#titleid-0) and check out their
free 14-day trial.

  5. **Quix.ai**  
Quix is a platform focused on real-time data streaming applications. It was
built by McLaren Formula 1 engineers who previously developed the systems now
used by most F1 teams to stream and process data live during races. Quix is
unique because it is architected around the Kafka message broker rather than a
database. Kafka is a data storage technology that keeps your data in memory
rather than writing it to disk. This has two benefits. Firstly it results in
almost no latency in your application. Secondly, it is more cost effective
because there are fewer I/O operations on the disk.  
  
Quix allows you to create Kafka topics to where you’ll stream data. It also
provides a code environment with integrated Git and a simple way to serve your
model to a serverless compute environment. You combine topics and projects to
build pipelines by connecting components in a daisy chain; this is also useful
for re-usability.  
  
Under the hood, they are using Docker and Kubernetes, but the data scientist
is abstracted off this, which is an excellent example of good MLOps practice.
Comprehensive APIs will give you experience producing data and consuming your
model results to an application or dashboard.  
  
Quix is a real-time platform, meaning that you can build an application that
will have a round trip latency in the 10s of milliseconds, including
processing time. It is, therefore, an excellent place to experiment with
online learning.

#### A note of caution when reviewing job descriptions

Be aware of any role asking the data scientist to build and maintain any of
the MLOps components previously listed.

MLOps is predominantly a software engineering activity tasked with enabling
data scientists to focus on the data and the code. You need to be aware of the
components and know how to use them (depending on your seniority); you may
even need to input into the design and build of MLOps systems, but you should
not be required to build them yourself.

This is a warning sign of a company and/or team that either doesn’t know what
they’re doing yet or aren’t investing enough resources in their ML effort —
either way, it’s bound to fail.  

## Domain knowledge

Domain knowledge means knowing about your stuff. If you work for a telecoms
company to predict churn, you will need to learn everything about how telecoms
users behave and what triggers them to leave. If you work for an insurance
company that calculates a client’s risk, you will need to spend lots of time
learning about that.

Knowing about the problem you are modeling makes a huge difference, often more
extensive than learning about the latest algorithm. You will be able to create
better feature variables, pick a suitable algorithm better, etc. The
importance of domain knowledge is sometimes underestimated and is one of the
critical requirements of becoming a great data scientist.

However, you cannot do much in advance unless you have a particular industry
in mind. Kaggle is a great place to try specific industry problems if you do.
You could also check out Reddit community groups, where you’ll find like-
minded people with whom you can build domain-specific solutions.  

## Conclusion

Anyhow, no one knows everything.

To become a great data scientist, you need to focus on applying your math
skills to the Domain. Nobody is born with domain expertise, so the best thing
you can do is choose an industry that interests you, then find a remarkable
team where you can learn continually about all the aspects covered in this
blog.

Even among data scientists, some people are focusing on MLOps, mainly because
the industry is just developing. Now, some people differentiate between Type A
data scientists (A for Analyst) and Type B data scientists (B for Builder) to
refer to more robust profiles on math or MLOps, respectively.

Whatever the type, the best organizations will support their data scientists
with other specialists, infrastructure and software so they can focus on
applying their math skills to the domain.

Working in these organizations will mean you will often work on multi-
disciplinary teams, enriching for you and your company. So don’t worry if you
feel stronger in one area or another, find a great team.

You can also find support from the [stream processing
community](http://quix.io/slack-invite) — come join us!






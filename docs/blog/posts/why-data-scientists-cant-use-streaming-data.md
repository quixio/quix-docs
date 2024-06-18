---
title: "Why data scientists can’t take full advantage of real time data streaming"
date: 2023-07-19
authors: [javier-blanco]
slug: why-data-scientists-cant-use-streaming-data
description: >
  Real time data streaming has obvious benefits for data scientists. However, there is a significant obstacle: most libraries come in Java and Scala, while most data scientists work exclusively in Python. Here’s why real-time data streaming has (until now) been an uphill endeavor.
categories:
  - industry-insights
---

# Why data scientists can’t take full advantage of real time data streaming

Real time data streaming has obvious benefits for data scientists. However, there is a significant obstacle: most libraries come in Java and Scala, while most data scientists work exclusively in Python. Here’s why real-time data streaming has (until now) been an uphill endeavor.

<!-- more -->

Science has used data to prove the laws of the universe for centuries.
However, the term data science refers to a specific profession focused on
dissecting and analyzing big data. Spawned from the field of data analysis, a
modern data scientist now wrangles and processes increasingly large data sets
(they call it big data for a reason).

Data science first rose to prominence in the 1990s. Once the business world
realized the hidden value locked within records and statistics — records
they’d spent the previous decade digitizing — data mining (and the data
scientists who can do it) became a must-have resource.

Fast forward to 2021, and big data and data science are worth an estimated
[$64 billion globally](https://www.futurelearn.com/info/insights/data-science-
insights). The focus of today’s data scientists has evolved from mining value
from historical data to increasingly focusing on gaining insight from data at
the time and point of extraction.  

## Why data scientists prefer working with Python

As their focus shifts towards real-time data, many data scientists face the
same obstacle: the libraries they rely on for real-time data streaming were
built for and designed by software engineers to monitor backend metrics. As
such, they all tend to be written in Java or Scala.

There’s one language in almost every data scientist’s toolbox: Python.

Python is a flexible language that can be used for many purposes, from web
development to automation. It is quickly gaining prominence for its usefulness
as a programming language for data scientists.

Data scientists love Python for several reasons, including:

  * **Python is an intuitive language with a gentle learning curve.** This is important because many data scientists approach the field from a background in mathematics or statistical analysis rather than programming or software engineering.
  * **Python doesn’t have hefty system requirements,** meaning that almost any machine can run it with minimal strain on the CPU. Other, less popular data science coding languages such as R eat up comparatively vast amounts of RAM when loading or reading data.
  * **A vast community of Python contributors** and developers have built huge libraries of open source code and use cases. This wealth of free resources means data scientists using Python can spend less time fixing tricky code and more time creating models or building algorithms.

Many Python tools available to data scientists are open source and freely
available. Open source Python notebooks, such as Jupyter, are frequently
required for data scientist jobs.

These libraries are fantastic for working with static data. They create
intuitive, easy-to-explore databases in a tabular format. However, they’re not
designed for real-time streaming. For data in motion, different tools are
needed.  

## Alternatives to Java and Scala for data science

So what options are available to data scientists who want to stream data in
real time but aren’t Java- or Scala-savvy?

A few tools attempt to bridge the gap. Spark and Flink are two popular open-
source examples (both Apache). As well as solid batch processing
functionality, both platforms have stream functionality for massive-scale
distributed computations, data distribution, and fault tolerance.

The [Spark vs. Flink](/blog/compare-client-libraries-spark-flink-quix) debate
has gone on for years. They’re not the only options, but you’re likely to come
across them often. Kafka streams are another real-time data source.

They all support Python, but none are without their issues: Spark is not a
true streaming library, instead of processing data in mini-batches. Kafka
Streams is a streaming library but not a processing engine, and Flink is a
stream processing engine. Still, the Python API and documentation are so bad
that it’s almost unusable.  

## Benefits of using Python with real-time streaming data

So how do we enable data scientists to take advantage of [real-time data
streaming](/blog/what-is-real-time-stream-processing)?

Quix delivers a dedicated Python client library as [part of our
platform](/blog/announcing-quix) so that data scientists can work with high-
performance real-time streaming data without knowledge of Java or Scala. The
time-saving implications of removing the need to rewrite Python code into a
production language are massive.

The platform includes a dedicated library with support for all open-source
frameworks. Quix sits on top of frameworks such as the message broker Kafka,
integrating seamlessly. Whereas Spark, Flink, and others have limited native
Python support, the Quix platform has Python at its core so that users can
work on real-time streams from multiple frameworks with Python alone.

For the data scientists already using the Quix platform, this has meant taking
ownership of the entire data lifecycle. A single user can explore Jupyter
notebooks, develop in PyCharm, and deploy ML to streaming environments single
handedly. This increased agility enables production models to be trained and
updated rapidly without developer intervention. This accelerates workflows and
allows a smooth transition of research into production without the “too many
cooks” scenario often created when IT, software and data engineering teams
have to provide support.

Anything that makes the ML deployment process faster and more efficient is
precious to data scientists. A staggering [87% of ML projects fail to reach
the production stage](https://venturebeat.com/2019/07/19/why-do-87-of-data-
science-projects-never-make-it-into-production/). A significant factor is that
the ML specialist loses ownership once the workflow changes hands from
scientists to engineers.  

## Real-time streaming data capabilities are a business necessity

Coding may be a tool data scientists use, but coding ability isn’t what makes
them valuable. Quix empowers data scientists to take full advantage of real-
time data streaming by making them capable of owning the entire data lifecycle
and working in the language they love. This creates greater efficiency for
organizations that rely on data insights by reducing the workload on both data
scientists and development and engineering teams. Time spent slogging through
user-unfriendly libraries such as Spark, and Flink can now be redeployed,
extracting value from data insights. This increases business agility and cuts
both risk and the time to value needed for new projects. There’s no need for
enterprise-grade coding to manage the infrastructure associated with
enterprise-grade big data streams.

[Gartner](https://www.gartner.com/en/newsroom/press-
releases/2019-02-18-gartner-identifies-top-10-data-and-analytics-technolo)
predicts that by 2022, more than half of major new business systems will
incorporate continuous intelligence that uses real-time context data to
improve decisions. The writing’s on the wall: the importance of real-time
streaming data is moving from nice-to-have to a business necessity. That’s why
it’s so critical to give data scientists ownership of their projects now to
lead the way in ML and analytics projects.

Whether you’re an experienced data scientist or a student itching to [take the
first steps](/blog/how-to-become-a-data-scientist) in their career, the Quix
platform ensures that your workflow stays in your hands no matter how complex
the requirements get. If you’re curious to try it, [bring your questions to
our Slack community](http://quix.io/slack-invite), [sign up for a free
trial](https://quix.io/signup) and enjoy some Quix credits on us.




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



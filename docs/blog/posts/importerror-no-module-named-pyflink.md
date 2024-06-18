---
title: "Debugging PyFlink import issues"
date: 2024-05-23
authors: [steve-rosam]
slug: importerror-no-module-named-pyflink
description: >
  As Apache Flink’s official Python API, PyFlink is meant to make Flink more accessible to data scientists and analysts more comfortable with Python.
categories:
  - ecosystem
---

# Debugging PyFlink import issues

As Apache Flink’s official Python API, PyFlink is meant to make Flink more accessible to data scientists and analysts more comfortable with Python.

<!-- more -->

## Introduction

As Apache Flink’s official Python API, PyFlink is meant to make Flink more
accessible to data scientists and analysts more comfortable with Python.
However, given that it is a thin wrapper around Flink’s native Java API, it
can be tricky for Python users to debug. In this article, we'll tackle a
common issue Python developers face when setting up PyFlink to handle real-
time data.

## The problem

When trying to run Flink’s basic [word count
example](https://nightlies.apache.org/flink/flink-docs-
master/api/python/examples/table/word_count.html), some users reported the
receiving the error

‍

Or the more verbose variant:

## Causes and solutions

This is sometimes caused by installing the wrong module i.e. by running `pip
install pyFlink` instead of the correct install command `python -m pip install
apache-flink`.

When installing PyFlink ensure that you are using a virtual environment that
meets the minimum Python requirements (currently Python versions [3.8, 3.9,
3.10 or 3.11](https://nightlies.apache.org/flink/flink-docs-
release-1.19/docs/dev/python/installation/)).

 To help you set your environment up, the Flink maintainers provide a setup
script: [setup-pyflink-virtual-
env.sh](https://nightlies.apache.org/flink/flink-docs-
release-1.19/docs/dev/python/faq/#preparing-python-virtual-environment).

  * At the time of writing, the link to the convenience script was broken in the current docs, but you can find an older version of it in the [version 1.12 documentation](https://nightlies.apache.org/flink/flink-docs-release-1.12/downloads/).
  * For some users, the issue was fixed when the executed their environments Python using the ‘pyexec’ command like so: '-pyexec /venv/bin/python3’

Another issue can be the casing in the import statement. Imports are case-
sensitive. Remember that the package name is "pyflink", not "pyFlink" so make
sure that you're importing PyFlink correctly:

‍

If you’re trying to run any of the examples from the documentation, also make
sure Flink is running on your local machine. You can start it with start-
cluster.sh. See the [Flink docs](http://start-cluster.sh) for more information
on running Flink locally.

If you’re planning to use Apache Kafka with PyFlink, also make sure that you
download the required [kafka connector JAR
file](https://mvnrepository.com/artifact/org.apache.flink/flink-connector-
kafka) and set the configuration parameters like so.

### If you’d rather not download a Jar file to connect to Kafka, consider a
pure Python alternative

Assuming you’re not yet heavily invested in Flink, you might consider using a
pure Python, client-side stream processing engine rather than a server-side
processing engine (which Flink is). This can significantly simplify debugging,
dependency management and deployment. There aren’t too many Python stream
processing engines to choose from but the ecosystem is growing. [Faust
](https://faust.readthedocs.io/en/latest/)is one option, but its roadmap is
uncertain after it was abandoned by its creator (Robinhood) and picked up by
community maintainers.  Quix Streams is similar in ethos to Faust but
maintained by a Quix, a startup that also provides a cloud-based solution for
hosting stream processing applications.

### How Quix Streams works in a nutshell

Quix Streams uses the concept of a Streaming DataFrame to provide developers
with a familiar Pandas-like API for working with streaming data. Below is an
example of a tumbling window calculation from our documentation. It reads in
raw temperature readings from the input topic and outputs the average of those
readings in 1-hour windows (so you’d get 24 readings per day, one for each
hour). It connects to Kafka via the “Application” class (where you specify the
broker address),

‍

As you can see, the syntax is fairly succinct and easy to read. Other benefits
of Quix streams include:

  * Native Python API for easier debugging and error tracing.
  * No Java Dependency: It simplifies your stack and means you don’t have to debug Java errors
  * Interoperability: It works seamlessly with other Python libraries in the ML and data ecosystem

To learn more about Quix Streams, see the
[documentation](https://quix.io/docs/quix-streams/quickstart.html#getting-
help) and [GitHub repository](https://github.com/quixio/quix-streams).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)



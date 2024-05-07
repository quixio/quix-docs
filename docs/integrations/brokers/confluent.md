---
title: Confluent integration
description: Connect Quix — the Python stream processing platform — to Confluent and leverage your streaming data to build real-time applications and products faster.
---

# Confluent

Confluent Cloud is a resilient, scalable, streaming data service based on Apache Kafka®, delivered as a fully managed service. Confluent Cloud has a web interface called the Confluent Cloud Console, a local command line interface, and REST APIs. 

Quix fully supports using Confluent Cloud for your Kafka broker. Quix adds value by providing powerful, but simple to use, stream processing capabilities in Python.

## Prerequisites

* Log in to your Confluent Cloud account, or [sign up](https://www.confluent.io/confluent-cloud/){target=_blank}.
* Review the Quix [broker settings documentation](./broker-settings.md).

## Quix setup guide

To obtain the API key and API secret:

1. In Confluent Cloud, click the `Data integration` tab, and choose the `API keys` page.

2. Click `Add key` to create a new key and secret.

3. Choose `Global access` and click `Next`.

4. Copy the API key and the API secret.

To obtain the Cluster ID, Bootstrap server and REST endpoint:

1. Click the `Cluster Overview` tab and choose `Cluster Settings`.

2. Copy the information into the Quix `Connect your managed broker` dialog as required.

!!! note

    You can also choose to synchronize topics. This will make any Confluent topics you might have available in your Quix environment.

When all information has been provided click the `Test Connection` button.

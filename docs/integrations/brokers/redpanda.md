---
title: Redpanda integration
description: Connect Quix — the Python stream processing platform — to Redpanda and leverage your streaming data to build real-time applications and products faster.
---

# Redpanda

Redpanda is a powerful, yet simple, and cost-efficient streaming data platform that is compatible with Kafka® APIs while eliminating Kafka complexity.

Quix fully supports using Redpanda for your Kafka broker. Quix adds value by providing powerful, but simple to use, stream processing capabilities in Python.

## Prerequisites

* Log in to your Redpanda account, or [sign up](https://redpanda.com/){target=_blank}.
* Review the Quix [broker settings documentation](./broker-settings.md).

## Quix setup guide

First, select whether you are using a managed or self hosted Redpanda installation.

1. Navigate to the Redpanda console.

2. Locate the Bootstrap server URL in the Overview tab.

3. Set your `Cluster Size`. This number is used to limit the replication factor of the topics. 

    !!! tip

        You'll find it in the `Overview` tab.

To complete the `SASL authentication` section (optional for self-hosted):

1. Locate the `Security` menu. You can manage Redpanda users from here.

2. Copy the user and password, and the SASL mechanism.

To configure the CA certificate (optional for self-hosted):

1. If your server uses a self-signed certificate, you must provide a file (zip, pem or cart) containing the Certification Authority certificate.

!!! note

    You can also choose to synchronize topics. This will make any Redpanda topics you might have available in your Quix environment.

When all information has been provided click the `Test Connection` button.

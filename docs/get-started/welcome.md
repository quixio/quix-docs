---
title: Welcome
description: Welcome to the Quix Developer documentation. This documentation includes guides, tutorials, and API references for using Quix Cloud, Quix Streams, and Quix Bring Your Own Cluster (BYOC).
---

# Welcome

<p style="font-size: 1rem;">Quix is a complete platform for developing, deploying, and monitoring stream processing pipelines. You develop your pipeline services in Python, and deploy them to containers managed in Kubernetes with a single click. You can develop and manage services on the command line, and also manage and visualize your pipelines in Quix Cloud.</p>

To try Quix out by building a simple app, carry out the following steps:

1. [Install Quix Streams](#step-1-install-quix-streams-with-pip)
2. [Connect to Kafka](#step-2-connect-to-kafka)
3. [Process your streaming data](#step-3-process-streaming-data)
4. [Run the code](#step-4-run-the-code)

You'll need to make sure your system has Python 3.10+ available.

## Step 1: Install Quix Streams with pip

```
python3 -m pip install quixstreams
```

## Step 2: Connect to Kafka

``` python
from quixstreams import Application
import uuid

# Connect to the public Quix hosted broker to consume data
app = Application(
    broker_address="publickafka.quix.io:9092",  # Kafka broker address
    consumer_group=str(uuid.uuid4())  # Kafka consumer group
)

# Code continues in step 3
```

## Step 3: Process streaming data

``` python
input_topic = app.topic("demo-onboarding-prod-chat", value_deserializer='json')

sdf = app.dataframe(input_topic)

sdf["tokens_count"] = sdf["message"].apply(lambda message: len(message.split(" ")))
sdf = sdf[["role", "tokens_count"]]

sdf = sdf.update(lambda row: print(row))

app.run(sdf)
```

Save the code for steps 2 and 3 in a file named `qs.py`.

## Step 4: Run the code

```
python3 qs.py
```

You are now consuming data from the `demo-onboarding-prod-chat` topic and processing it in real time.

## Next steps

* [Continue your journey](./explore.md) on the command line.
* Try [Quix Cloud for free](https://portal.platform.quix.io/self-sign-up){target=_blank}.
* Step through the Quix Streams [Quickstart](https://quix.io/docs/quix-streams/quickstart.html).
* Step through the [Quix Streams tutorials](https://quix.io/docs/quix-streams/tutorials/index.html).
* Need help? Join the [Quix Community](https://quix.io/slack-invite){target=_blank}.

---
title: Welcome
description: Welcome to the Quix Developer documentation. This documentation includes guides, tutorials, and API references for using Quix Cloud, Quix Streams, and Quix Bring Your Own Cluster (BYOC).
---

# Welcome

<p style="font-size: 1rem;">Quix is a complete platform for developing, deploying, and monitoring stream processing pipelines.</p>

<div class="grid cards" markdown>

- __Get started with the command line__

    ---

    Get started using Quix, right on your command line.

    [Go! :octicons-arrow-right-24:](#step-1-install-quix-streams)

- __Get started with Quix Cloud__

    ---

    Build a complete Python stream processing application in under 10 minutes in Quix Cloud.

    [Quickstart :octicons-arrow-right-24:](../quix-cloud/quickstart.md)

</div>

## Step 1. Install Quix Streams

```
python3 -m pip install quixstreams
```

## Step 2. Connect to Kafka

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

## Step 3. Process streaming data

``` python
input_topic = app.topic("demo-onboarding-prod-chat", value_deserializer='json')

sdf = app.dataframe(input_topic)

sdf["tokens_count"] = sdf["message"].apply(lambda message: len(message.split(" ")))
sdf = sdf[["role", "tokens_count"]]

sdf = sdf.update(lambda row: print(row))

app.run(sdf)
```

Save the code as qs.py

## Step 4. Run the code

```
python3 qs.py
```

You are now consuming data from the `demo-onboarding-prod-chat` topic.

## Next steps

See more detail about this application in the Quix Streams [Quickstart](https://quix.io/docs/quix-streams/quickstart.html).

<div class="grid cards" markdown>
- __Need some help?__

    ---

    If you need any help, please sign up to the Quix Community Slack channel, and chat with friendly developers.

    [Join the Quix Community :octicons-arrow-right-24:](https://quix.io/slack-invite){target=_blank}
</div>

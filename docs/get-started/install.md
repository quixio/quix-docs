# Install

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

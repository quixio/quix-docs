# Install Quix Streams using pip

You'll now install the Quix Streams client library using `pip`.

You'll need to make sure your system has Python 3.8+ available:

```
python3 --version
```

## Step 1: Install Quix Streams

To install Quix Streams with `pip`:

```
python3 -m pip install quixstreams
```

## Step 2: Create a simple app

You'll now create a simple app to test your installation. You'll connect to a Quix public Kafka broker and consume and print messages.

Create a new file containing the following code:

``` python
from quixstreams import Application
import uuid

# Connect to the public Quix hosted broker to consume data
app = Application(
    broker_address="publickafka.quix.io:9092",  # Kafka broker address
    consumer_group=str(uuid.uuid4())  # Kafka consumer group
)

input_topic = app.topic("demo-onboarding-prod-chat", value_deserializer='json')

sdf = app.dataframe(input_topic)

sdf["tokens_count"] = sdf["message"].apply(lambda message: len(message.split(" ")))
sdf = sdf[["role", "tokens_count"]]

sdf = sdf.update(lambda row: print(row))

app.run(sdf)
```

Save the code in a file named `qs.py`.

## Step 3: Run the code

Now run the code:

```
python3 qs.py
```

You are now consuming data from the `demo-onboarding-prod-chat` topic and processing it in real time.

You have installed Quix and tested that it's working.

## Next step

* [Produce data](./produce.md) - publish data to a Kafka topic.

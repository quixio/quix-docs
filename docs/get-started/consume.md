# Consume data

You'll now write some code that simply consumes data from a topic and prints it out.

## Step 1: Write your consumer code

Write your consumer code:

``` python
from quixstreams import Application
from datetime import timedelta
import json

# connect to your local Kafka broker
app = Application(
    broker_address="localhost:9092",
    consumer_group="consume-v1",
    auto_offset_reset="earliest",
)

# configure the input topic to subscribe to (you'll read data from this topic)
input_topic = app.topic("cpu-load")

# consume (read) messages from the input topic
sdf = app.dataframe(topic=input_topic)

# print every row
sdf = sdf.update(lambda row: print(json.dumps(row)))

if __name__ == "__main__":
    # run the application and process all inbound messages using the sdf pipeline
    app.run(sdf)
```

Save this in a file names `consumer.py`.

## Step 2: Run your consumer

``` python
python3 consumer.py
```

You are now subscribing to data on the `cpu-load` topic.

Each message received is printed out as JSON:

``` json
{
    "cpu_load": 5.7,
    "memory": {
        "total": 0,
        "used": 0,
        "free": 0,
        "percent": 0,
        "sin": 90937131008,
        "sout": 483672064
    },
    "timestamp": 1712238254512946000
}
```

## Next step

* [Process data](./process.md) - process streaming data in a Kafka topic in real time.

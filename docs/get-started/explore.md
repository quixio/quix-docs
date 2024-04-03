# Explore Quix Streams

Continue the journey you already started.

## Set up a local Kafka broker

Set up a local Kafka broker. You can follow [this quickstart](https://kafka.apache.org/quickstart) to install Apache Kafka.

## Write your producer code

``` python
import psutil, time, json
from quixstreams import Application

# Connect to your local Kafka broker
app = Application(broker_address="localhost:9092", consumer_group="producer-v1")

# Define output topic
output_topic = app.topic("cpu-load")

def get_cpu_load():
    """
    Get the current CPU and memory usage
    """
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    return {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }

def main():
    # Create a Producer to send data to the topic
    with app.get_producer() as producer:
        while True:                
            # Get the current CPU and memory usage
            message = get_cpu_load()
            print("CPU load: ", message["cpu_load"])

            # Produce message to the topic
            producer.produce(
            topic=output_topic.name,
                key="server-1-cpu",
                value=json.dumps(message)
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')
```

Save this file as `producer.py`.

## Run your producer code

``` python
python3 producer.py
```

You are now producing data into the `cpu-load` topic.

## Write your consumer code

``` python
from quixstreams import Application

app = Application(
    broker_address="localhost:9092",
    consumer_group="consumer-v1",
    auto_offset_reset="earliest",
)

cpu_topic = app.topic(name="cpu-load", value_deserializer="json")

sdf = app.dataframe(topic=cpu_topic)

sdf = sdf.update(lambda row: print(row))

if __name__ == "__main__":
    app.run(sdf)
```

Save as `consumer.py`.

## Run your consumer code

In a new shell tab, run your consumer code:

```
python3 consumer.py
```

You'll see messages from the `cpu-load` topic:

``` json
{
    "cpu_load": 10.3,
    "memory": {
        "total": 0,
        "used": 0,
        "free": 0,
        "percent": 0,
        "sin": 79110373376,
        "sout": 332414976
    },
    "timestamp": 1712148720884867000
}
```

You'll notice the messages in the topic are in the JSON format.

## Find average CPU load

Change your consumer code to add a tumbling window:

``` python
from quixstreams import Application
import 

app = Application(
    broker_address="localhost:9092",
    consumer_group="consumer-v1",
    auto_offset_reset="earliest",
)

cpu_topic = app.topic(name="cpu-load", value_deserializer="json")

sdf = app.dataframe(topic=cpu_topic)

# calculate average cpu load over 20 seconds tumbling window
sdf = sdf.apply(lambda row: row["cpu_load"]) \
    .tumbling_window(timedelta(seconds=20)).mean().final() \
        .apply(lambda value: {
            'average-cpu-load': value['value'],
            'time': value['end']
            })

sdf = sdf.update(lambda row: print(row))

if __name__ == "__main__":
    app.run(sdf)
```

This will produce messages in the format:

``` json
{
    "average-cpu-load": 14.9,
    "time": 1712149460000
}
```

## Next steps

* Read the [Quix Streams docs](https://quix.io/docs/quix-streams/introduction.html).
* Try [Quix Cloud for free](https://portal.platform.quix.io/self-sign-up){target=_blank}.
* Need help? Join the [Quix Community](https://quix.io/slack-invite){target=_blank}.

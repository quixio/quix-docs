# Explore Quix Streams

Here you'll explore Quix Streams v2 a bit more by creating a producer to publish messages to a topic in your local Kafka broker. You'll then create a processor that subscribes to messages on that topic and processes that data in real time.

The steps are:

1. [Set up a local Kafka broker](#step-1-set-up-a-local-kafka-broker)
2. [Write your producer (source) code](#step-2-write-your-producer-code)
3. [Run your producer code](#step-3-run-your-producer-code)
4. [Process your data](#step-4-process-your-data-in-real-time)
5. [Run your processor (transform) code](#step-5-run-your-processor-transform-code)

## Step 1: Set up a local Kafka broker

Set up a local Kafka broker. You can follow [this quickstart](https://kafka.apache.org/quickstart) to install Apache Kafka.

## Step 2: Write your producer code

``` python
import psutil, time, json
from quixstreams import Application

# connect to your local Kafka broker
app = Application(broker_address="localhost:9092", consumer_group="producer-v1")

# define output topic
output_topic = app.topic("cpu-load")

def get_cpu_load():
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

Save the code to a file named `producer.py`.

## Step 3: Run your producer code

``` python
python3 producer.py
```

You are now producing data into the `cpu-load` topic.

## Step 4: Process your data in real time

The following processor code subscribes to messages on the `cpu-load` topic and processes the data in real time. In this case a tumbling window of twenty seconds is used to calculate the average CPU load:

``` python
from quixstreams import Application
from datetime import timedelta

app = Application(
    broker_address="localhost:9092",
    consumer_group="transform-v1",
    auto_offset_reset="earliest",
)

cpu_topic = app.topic(name="cpu-load", value_deserializer="json")

input_topic = app.topic("cpu-load")
output_topic = app.topic("average-cpu-load")

# read messages from the input topic
sdf = app.dataframe(topic=input_topic)

# calculate average cpu load over 20 seconds tumbling window
sdf = sdf.apply(lambda row: row["cpu_load"]) \
    .tumbling_window(timedelta(seconds=20)).mean().final() \
        .apply(lambda value: {
            'average-cpu-load': value['value'],
            'time': value['end']
            })

# print every row
sdf = sdf.update(lambda row: print(row))

# publish to output topic
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Save the code to a file named `transform.py`.

## Step 5: Run your processor (transform) code

In a **new shell tab**, run your consumer code:

```
python3 transform.py
```

This will produce messages with the format on the putput topic:

``` json
{
    "average-cpu-load": 14.9,
    "time": 1712149460000
}
```

You'll notice the messages in the topic are in the JSON format.

## Next steps

* Continue on the command line by [using the Quix CLI](./cli.md).
* Read the [Quix Streams docs](https://quix.io/docs/quix-streams/introduction.html).
* Try [Quix Cloud for free](https://portal.platform.quix.io/self-sign-up){target=_blank}.
* Need help? Join the [Quix Community](https://quix.io/slack-invite){target=_blank}.

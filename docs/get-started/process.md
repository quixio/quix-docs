# Process data

The following processor code subscribes to messages on the `cpu-load` topic and processes the data in real time. In this case a tumbling window of twenty seconds is used to calculate the average CPU load. It then ublishes the transformed data to its output topic (`average-cpu-load`), where it can be persisted or processed further by additional stages in the pipeline.

This assumes you still have your `producer.py` code running, but have shut down the consumer you ran in the [previous step](./consume.md).

## Step 1: Create your processing code (transform)

Create a new file containing the following code:

``` python
from quixstreams import Application
from datetime import timedelta

# connect to your kafka broker
app = Application(
    broker_address="localhost:9092",
    consumer_group="transform-v1",
    auto_offset_reset="earliest",
)

# consume data from the input topic
input_topic = app.topic("cpu-load")
# publish data to the output topic
output_topic = app.topic("average-cpu-load")

# sdf reads messages from the input topic
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
    # run the application and process all inbound messages using the sdf pipeline
    app.run(sdf)
```

Save the code to a file named `transform.py`.

??? "Explanation of the code"

    A transform subscribes to data from its input topic, processes the data, and then publishes the the transformed data to its output topic. The basic parts of this code are:

    * Connect to the Kafka broker.
    * Configure the input topic to consume data from.
    * Configure the output topic to publish processed data to.
    * Define the Streaming DataFrame (SDF) processing pipeline:
        * Read message from the input topic.
        * Calculate the average CPU load over a 20 seconds tumbling window.
        * Print every row.
        * Write message to the output topic.
    * Run the Quix app, using Streaming DataFrame (SDF) to process messages. 

## Step 2: Run your processor (transform) code

In a **new shell tab**, run your transform code:

```
python3 transform.py
```

This will produce messages with the format on the output topic, `average-cpu-load`:

``` json
{
    "average-cpu-load": 14.9,
    "time": 1712149460000
}
```

You'll notice the messages in the topic are in the JSON format.

## Next step

* [Build a pipeline](../cli/cli-build-pipeline.md) - build a pipeline using the Quix CLI.

---
title: Replacing Flux with Quix Streams
description: Shows how to use Quix Streams and Python to replace Flux to perform filtering, aggregations, downsampling, and conversion of complex data to JSON.
search:
  boost: 3
---

# Replacing Flux with Quix Streams

You can use [Quix Streams](https://quix.io/docs/quix-streams/introduction.html) as a [replacement for Flux](https://docs.influxdata.com/influxdb/v2/process-data/common-tasks/){target=_blank} to process your time series data in conjunction with InfluxDB. 

You can write any transformation logic you need for your use case, using Python, and the Quix Streams library. Quix Streams has many powerful operations built in, including filtering, aggregation, and windowing.

## Downsampling data using Quix Streams

Downsampling data involves performing some type of aggregation. Quix Streams has several [aggregation functions built in](https://quix.io/docs/quix-streams/introduction.html):

* `min()` - to get a minimum value within a window
* `max()` - to get a maximum value within a window
* `mean()` - to get a mean value within a window
* `sum()` - to sum values within a window
* `count()` - to count the number of values within a window
* `reduce()` - to perform custom aggregations using "reducer" and "initializer" functions

For example, you can easily calculate average over tumbling or hopping windows. The following example shows **filtering** and **calculating an average** of vehicle speed using a tumbling window:

``` python
import os
from quixstreams import Application, State
from datetime import timedelta

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])

# Read from input topic
sdf = app.dataframe(input_topic)

# Filter in Speed
sdf = sdf[["Speed"]]

# Calculate mean of speed over 10 second tumbling window
sdf = sdf.tumbling_window(timedelta(seconds=10)).mean().final()

# Print every row
sdf = sdf.update(lambda row: print(row))

# Publish to output topic
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

This would publish average speed to the output topic, and that could then be used as the basis of further processing, or simply stored in InfluxDB.

You could set other time windows, for example to set a time window of ten minutes:

``` python
sdf = sdf.tumbling_window(timedelta(minutes=10)).mean().final()
```

To set a time window of one week:

``` python
sdf = sdf.tumbling_window(timedelta(weeks=1)).mean().final()
```

See the [Quix Streams documentation](https://quix.io/docs/quix-streams/introduction.html) for more information.

## Converting data

Sometimes you need to convert data from one format to another. This can be done with great flexibility in Python. For example, in IoT applications, some smart devices send data in [MessagePack](https://msgpack.org/){target=_blank} format. For example, here's the CPU example from the [Quix Quickstart](../../../get-started/quickstart.md) converted to pack data in MessagePack format:

``` python
import psutil, time, os, msgpack
from quixstreams import Application

from dotenv import load_dotenv
load_dotenv()

app = Application.Quix()

output_topic = app.topic("cpu-load", value_serializer="bytes")
    
def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    return {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }

def main():
    with app.get_producer() as producer:
        while True:                
            message = get_cpu_load()
            packed_message = msgpack.packb(message) # pack data in MessagePack format
            
            producer.produce(
            topic=output_topic.name,
                key="server-1-cpu",
                value=packed_message
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')    
```

Quix Streams is able to handle binary data as bytes. It publishes packed data to the output topic in binary MessagePack format.

In Quix, a transform to convert this data to JSON would be:

``` python
import os
from quixstreams import Application
import msgpack

from dotenv import load_dotenv
load_dotenv()

def unpack(row):
    return msgpack.unpackb(row)

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer="bytes")
output_topic = app.topic(os.environ["output"], value_serializer="json")

sdf = app.dataframe(input_topic)
sdf = sdf.apply(unpack)
sdf = sdf.update(lambda row: print(row))
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    try:
        app.run(sdf)
    except Exception as e:
        logger.exception("An error occurred while running the application.", e)
```

Data is consumed in MessagePack format, and produced in JSON format, for onward processing by the pipeline. This example demonstrates the very flexible approach to data conversion that a fully featured programming language such as Python provides.

## Next steps

* See the [Quix Streams documentation](https://quix.io/docs/quix-streams/introduction.html).

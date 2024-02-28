---
title: Replacing Flux with Quix Streams
description: Shows how to use Quix Streams and Python to replace Flux to perform filtering, aggregations, downsampling, and conversion of complex data to JSON.
search:
  boost: 3
---

# Replacing Flux with Quix Streams

You can use [Quix Streams](../../../quix-streams-intro.md) as a [replacement for Flux](https://docs.influxdata.com/influxdb/v2/process-data/common-tasks/){target=_blank} to process your time series data in conjunction with InfluxDB. 

You can write any transformation logic you need for your use case, using Python, and the Quix Streams library. Quix Streams has many powerful operations built in, including filtering, aggregation, and windowing.

## Downsampling data using Quix Streams

Downsampling data involves performing some type of aggregation. Quix Streams has several [aggregation functions built in](../../../quix-streams-intro.md):

* `min()` - to get a minimum value within a window
* `max()` - to get a maximum value within a window
* `mean()` - to get a mean value within a window
* `sum()` - to sum values within a window
* `count()` - to count the number of values within a window
* `reduce()` - to perform custom aggregations using "reducer" and "initializer" functions

For example, you can easily calculate average over tumbling or hopping windows. The following example shows filtering and calculating an average of vehicle speed using a tumbling window:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, JSONSerializer
from datetime import timedelta

def my_func(row):
    return row['Speed']

app = Application.Quix("transformation-v1", auto_offset_reset="latest")
input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=JSONSerializer())

# Read from input topic
sdf = app.dataframe(input_topic)

# Put transformation logic here.
sdf = sdf.filter(lambda row: 'Speed' in row)
sdf = sdf.filter(lambda row: row['Speed'] != None)
sdf = sdf.apply(my_func)
sdf = sdf.tumbling_window(timedelta(seconds=10)).mean().final()

# Print every row
sdf = sdf.update(lambda row: print(row))

# Publish to output topic
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

The `filter` function is used to filter any rows where `Speed` is not present, or where `Speed` has a value of `None`. This prevents errors when calculating aggregations.

This would publish average speed to the output topic, and that could then be used as the basis of further processing, or simply stored in InfluxDB.

You could set other time windows, for example to set a time window of ten minutes:

``` python
sdf = sdf.tumbling_window(timedelta(minutes=10)).mean().final()
```

To set a time window of one week:

``` python
sdf = sdf.tumbling_window(timedelta(weeks=1)).mean().final()
```

See the [Quix Streams documentation](../../../quix-streams-intro.md) for more information.

## Filtering messages using Quix Streams

You have seen an example of filtering data from the stream of messages using the `filter` function. You can also do this by modifying the `StreamingDataFrame` data structure, rather than using the `filter` function, as shown in the following example:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, JSONSerializer

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=JSONSerializer())

# Read from input topic
sdf = app.dataframe(input_topic)

# Put transformation logic.
sdf = sdf.filter(lambda row: 'Speed' in row)
sdf = sdf.filter(lambda row: row['Speed'] != None)
sdf = sdf[["Timestamp", "Speed", "EngineRPM"]]
sdf = sdf.update(lambda row: print(row))

# Publish to output topic
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

The following code drops all columns in the row, other than those specified:

```python
sdf = sdf[["Timestamp", "Speed", "EngineRPM"]]
```

Only certain data needs to be published to the output topic - just `Timestamp`, `Speed`, and `EngineRPM` are required in this use case. 

## Converting time series data to simple JSON format

In a simple Quix transform you might subscribe to, and publish, data in Quix format, for example:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, QuixTimeseriesSerializer

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=QuixTimeseriesSerializer())

sdf = app.dataframe(input_topic)

# Put transformation logic here. 

# Print every row
sdf = sdf.update(lambda row: print(row))

sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

In this example, data is subscribed to and published using Quix format. 

You can easily convert from the Quix format to a simple JSON format (or the other way around) using serializers and deserializers built into Quix Streams, for example, to convert from Quix format to a simple JSON format, you could modify the above code to the following:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, JSONSerializer

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=JSONSerializer())

sdf = app.dataframe(input_topic)

# Put transformation logic here.    

# Print every row
sdf = sdf.update(lambda row: print(row))

sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Notice that the Quix deserializer has been replaced by the JSON deserializer.

This would read data on the topic in Quix time series format, and publish the data converted to JSON format.

## Next steps

* See the [Quix Streams documentation](../../../quix-streams-intro.md).

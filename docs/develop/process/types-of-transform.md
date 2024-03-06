# Types of transform

[Quix Streams](https://quix.io/docs/quix-streams/introduction.html) enables you to carry out many types of transform on your data.

The examples in the following sections use Quix Streams operating on data in a Streaming Data Frame (SDF) object, `sdf`. Read the [Quix Streams documentation](https://quix.io/docs/quix-streams/introduction.html) for more information.

## Filtering

This pattern involves processing a stream of data and selecting specific records that meet certain criteria. It enables you to filter out irrelevant data and focus on the relevant information.

``` python
# Filter in messages with "cpu_load" > 20
sdf = sdf[sdf["cpu_load"] > 20]
```

``` python
# Filter out all data apart from Timestamp, Speed, and EngineRPM
sdf = sdf[["Timestamp", "Speed", "EngineRPM"]]
```

## Aggregation 

Aggregation involves combining multiple data records from a stream into a single result. It is useful for calculating summary statistics, such as averages, counts, or maximum/minimum values, over a specific time window or key.

``` python
# Aggregate data over a week, returning the mean value when the window closes
sdf = sdf.tumbling_window(timedelta(weeks=1)).mean().final()
```

## Transformation

This pattern involves modifying the structure or content of the data as it flows through the stream. Transformations can include data enrichment, normalization, or any other necessary modifications to prepare the data for downstream processing.

``` python
# Transforms data in (deprecated) Quix format to JSON format (for backwards compatibility with an old source connector)
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, JSONSerializer

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=JSONSerializer())

sdf = app.dataframe(input_topic)
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

## Joining

Joining patterns involve combining data from multiple streams based on a common key or attribute. It enables you to correlate information from different sources and create a unified view of the data.

## Windowing

Windowing involves dividing the data stream into discrete time intervals or windows and performing calculations or aggregations within each window. Windowing enables analysis over a specific period, such as sliding windows, tumbling windows, or session windows.

``` python
# Find the maximum temperature over the last 30 minutes
...
from datetime import timedelta

sdf = app.dataframe(...)

sdf = (
    # Extract the "temperature" field from the record
    sdf.apply(lambda row: row["temperature"])

    # Define a tumbling window of 30 minutes
    .tumbling_window(timedelta(minutes=30))

    # Specify the "max" aggregation function to apply to values of "temperature"
    .max()

    # Emit results only when the window has elapsed
    .final()
)
```

## Deduplication

This pattern removes duplicate records from a stream, ensuring that each event or data point is processed only once. Deduplication is essential for maintaining data integrity and preventing duplicate processing.

## Pattern matching

Pattern matching involves detecting predefined patterns or sequences of events within a stream. It is useful for identifying complex conditions or anomalies based on specific patterns of data.

## Splitting and routing

This pattern involves splitting a single stream into multiple substreams based on defined criteria or conditions. It enables parallel processing and enables different components to handle different subsets of the data.

## Time series analysis

Time series analysis patterns focus on analyzing and extracting insights from time-dependent data streams. Techniques like forecasting, anomaly detection, and trend analysis are commonly used in time series processing.

## Fan-out/Fan-in

This pattern involves duplicating a stream and sending it to multiple processing components in parallel (fan-out) and then aggregating the results back into a single stream (fan-in). It enables scalable and parallel processing of data.

# Create a transform to convert your data to Quix format

You'll now add a transform to convert the JSON data to Quix format. There are two reasons for this: 

1. To be able to display the CPU load waveform (time series data) in the Quix data explorer.
2. To be compatible with the Quix InfluxDB destination connector, which expects messages in Quix format at time of writing.

## Add the transform

Add a transform as you saw in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). In brief:

1. Go to `Code Samples` and locate the `Starter transformation SDF` (this version uses Quix Streams v2).
2. Edit the application code.

Ensure that the input topic is `cpu-load` and the output is `cpu-load-transform`.

## Edit the code

Change the code in `main.py` for the transform to the following:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import JSONDeserializer, QuixTimeseriesSerializer

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=JSONDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=QuixTimeseriesSerializer())

sdf = app.dataframe(input_topic)
sdf = sdf.update(lambda row: print(row))
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

The data on the input topic, from your external Python program, is in simple JSON format. You need to convert it to Quix to be able to display it in the Quix data explorer, and also to be compatible with the current InfluxDB destination connector.

The new transform code reads data from the input topic as JSON, and publishes it to the output topic in Quix format.

Once you've made your changes, tag your code (optional), and then deploy the transform.

## 🏃‍♀️ Next step

[Part 4 - Examine your data :material-arrow-right-circle:{ align=right }](./data-explorer.md)

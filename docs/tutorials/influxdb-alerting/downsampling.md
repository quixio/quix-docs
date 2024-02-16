# Downsampling with an aggregation

While CPU spikes might be acceptable in the short term, they might be more concerning if such levels are sustained over a longer period of time. For detecting such a condition, an aggregation using a tumbling window could be implemented. Let's say you want to raise an alert if the CPU level exceeds a certain average level over some time period. You could use code such as the following:

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, JSONSerializer
from datetime import timedelta

def threshold_detect(row):
    # If average value greater than 10
    if row['value'] > 10:
        print ('CPU average', row['value'])
        return row

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=JSONSerializer())

sdf = app.dataframe(input_topic)
sdf = sdf.apply(lambda row: row["CPULoad"])
sdf = sdf.tumbling_window(timedelta(seconds=10)).mean().final()
sdf = sdf.apply(threshold_detect)
sdf = sdf.filter(lambda row: row != None)
sdf = sdf.update(lambda row: print(row))
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Note the threshold values and time for the tumbling window were chosen as quite low values to make testing easier.

The code has been modified to write take an average of the CPU load over the time span of the tumbling window. If this average is greater than the threshold, then a JSON object containing the start and end times of the window, and the CPU average value. This can be passed to further services as required. The output JSON has the following format:

``` json
{
  "start": 1708014640000,
  "end": 1708014650000,
  "value": 14.5
}
```

The code also filters the case where the function returns a `null` row (the threshold has not been exceeded), using the `filter` function.

## 🏃‍♀️ Next step

[Part 9 - Add alerting :material-arrow-right-circle:{ align=right }](./add-alerting.md)

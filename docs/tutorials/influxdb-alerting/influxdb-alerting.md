# InfluxDB alerting

Create a CPU overload alerting pipeline with Quix, Quix Streams, InfluxDB, and PagerDuty.

![InfluxDB alerting pipeline](./images/influxdb-alerting-pipeline.png)

## Prerequisites

To complete this tutorial you'll need to:

* [Obtain a free Quix account](https://portal.platform.quix.io/self-sign-up)
* [Install Quix Streams v2](https://github.com/quixio/quix-streams?tab=readme-ov-file#install-quix-streams){target=_blank}

!!! tip

    Completing the [InfluxDB quickstart](../../integrations/databases/influxdb/quickstart.md) before embarking on this tutorial is not essential, but is highly recommended.

## Write the client code

In this part you write a command-line program to read the CPU load of your laptop, and publish that data to Quix.

### Set your environment variables

First, in order to use Quix Streams on the command line (as opposed to working in Quix Cloud), you need to set the following environment variables:

* `Quix__Sdk__Token`
* `Quix__Portal__Api`

Note, these variables use **double** underscores.

To obtain these values you can go to `Settings` in your environment, and then click on the `APIs and tokens tab`. You can obtain the `Streaming Token` and the Portal API URL from there.

Set the environment variables using the method recommended for your system, for example on macOS or Unix you could set the variables as follows:

```
#!/usr/bin/env bash                                                                          
export Quix__Sdk__Token="sdk-12345"
export Quix__Portal__Api="portal-api.platform.quix.io"
echo $Quix__Sdk__Token
echo $Quix__Portal__Api
```

You could add these lines (without the shebang) to your Bash or Zsh resource file, for example, `.bash_profile`, so they are always available during development.

### Add the Python code

Using your editor of choice, create a file called `cpu_load.py`. Add the following code:

```python
import psutil
import time
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    return cpu_load

app = Application.Quix(
    consumer_group="cpu_load", 
    auto_create_topics=True,
)

serializer = JSONSerializer()
output_topic = app.topic("cpu-load")
producer = app.get_producer()

def main():
    while True:
        cpu_load = get_cpu_load()
        print("CPU load: ", cpu_load)
        timestamp = int(time.time_ns()) # Quix timestamp is nano seconds
        message = {"Timestamp": timestamp, "CPULoad": cpu_load}
        with producer:
            serialized_value = serializer(
                value=message, ctx=SerializationContext(topic=output_topic.name)
            )
            producer.produce(
                topic=output_topic.name,
                key="server-1-cpu",
                value=serialized_value
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')    
```

Save the file, and run it using a command similar to the following (the exact command you use depends on your Python set up):

```
python3 cpu_load.py
```

When you run this, the topic `cpu-load` is created for you. If your code exits before the topic is created, simply run the code again.

Here, you're creating a simple JSON object containing a Unix timestamp in nano seconds, and the CPU load (as a percentage). This is then published to the output topic.

!!! note

    The timestamp is added here for convenience - it could have been added later in the pipeline. The Quix data format that can optionally be used expects a timestamp in nano seconds.

If you're monitoring many CPUs, you could use the stream ID to identify the source, in this case the stream ID is set to `server-1-cpu`.

## Create an external source

At this point you have an external program sending data into Quix, and it is writing into a Quix topic. However, you can't see this external program in the Pipeline view. To help you visualize what you've created, you can add an external source component, to provide a visual entity in the pipeline view. To do this:

1. Click on `Code Samples`.
2. Select the `Python`, `Source`, and `Basic templates` filters.
3. On the `External Source` sample, click `Add external source`.
4. Give the component a name, such as "Laptop CPU Load".
5. For output topic select `cpu-load`.
6. Click `Add external source`.

This now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic, and you can easily add further pipeline services on the output of this source.

Watch a video on adding an external source:

<div style="position: relative; padding-bottom: 62.24066390041494%; height: 0;"><iframe src="https://www.loom.com/embed/0c9be6ea1f9540618d8bf0c2dabc8533?sid=728b4cad-a224-4ffa-82fe-7f0bbe737779" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Note, this video is for a different project, but the principle is the same.

## Convert your data to Quix format

You'll now add a transform to convert the JSON data to Quix format. There are two reasons for this: 

1. To be able to display the CPU load waveform (time series data) in the Quix data explorer.
2. To be compatible with the Quix InfluxDB destination connector, which expects messages in Quix format at time of writing.

Add a transform as you saw in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). In brief:

1. Go to `Code Samples` and locate the `Starter transformation SDF` (this version uses Quix Streams v2).
2. Edit the application code.

Ensure that the input topic is `cpu-load` and the output is `cpu-load-transform`.

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

## View the output in Quix data explorer

Once your deployed transform is running, you can view the data it publishes in the Quix data explorer. 

In the pipeline view, on the output topic `cpu-load-transform`, click `Explore live data` (or alternatively go to the data explorer). Select the stream you want to view (in this case `server-1-cpu`), and the parameter `CPULoad`. 

The waveform view displays something similar to the following:

![CPU waveform](./images/data-explorer-cpu-waveform.png)

If you examine the format in the `Messages` tab, you'll see the data has the following format:

![Time series raw](./images/timeseries-raw-data.png)

## Add an InfluxDB destination connector

You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). Make sure the input to the destination is the `cpu-load-transform` topic.

![InfluxDB query](./images/influxdb-query.png)

Configure the connector with your InfluxDB credentials. Deploy your connector.

Your pipeline now looks like this:

![InfluxDB alerting pipeline](./images/influxdb-alerting-pipeline.png)

You can now log into your InfluxDB Cloud account and query your bucket for data. The following screenshot shows the results for a typical query:

![InfluxDB query](./images/influxdb-query.png)

You have now concluded the first part of the pipeline, where you learned how to get data into Quix, transform it, and stream that data to InfluxDB. You saw that very little code and configuration was required, and you worked in Python.

In the next part of the tutorial you build a pipline with an InfluxDB source (this queries InfluxDB using polling for new data), add a threshold detection transform, and add an alerting service.

## Add an InfluxDB source connector

You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). Make sure the input to the destination is the `cpu-load-transform` topic. You can reuse your `INFLUXDB_ORG` and `INFLUXDB_TOKEN`secrets, and set the other variables to the same as you used when setting up the InfluxDB destination connector. 

Set is `task_interval` - you can set this to `1s` (one second) to ensure you see any new data promptly (this make testing a little easier as you don't need to wait too long for updates). 

Add a new topic `influxdb-cpu-load` for the configured output topic. This will help avoid confusion with the topics you created in the Quickstart.

When you have completed the configuration, deploy the service.

## Add a threshold detection transform

You now add a transform to detect when CPU threshold is exceeded. Click `Add new` and locate the `Starter transformation SDF` again. 

![Add transform](./images/add-transform-to-source.png)

You can use the defaults, or rename your transform to something like `CPU Threshold`. 

Then click on `Edit code`. You can rename the output topic to `cpu-threshold-transform`.

You'll add new code to `main.py`.

``` python
import os
from quixstreams import Application, State
from quixstreams.models.serializers.quix import QuixDeserializer, QuixTimeseriesSerializer

def threshold_detect(row):
    if row['CPULoad'] > 20:
        print ('CPU overload')

app = Application.Quix("transformation-v1", auto_offset_reset="latest")

input_topic = app.topic(os.environ["input"], value_deserializer=QuixDeserializer())
output_topic = app.topic(os.environ["output"], value_serializer=QuixTimeseriesSerializer())

sdf = app.dataframe(input_topic)
sdf = sdf.update(threshold_detect)
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Here, a very simple function checks if the inbound data contains a CPU load above a fixed limit (set to 20 here for ease of testing).

Note the data is unchanged, it is simply published as is to the output for now.

You can test the application is running by loading some heavy weight apps on your laptop. You'll see messages printed to the console if the threshold is exceeded:

!!! note

    This is a just an example approach. It would perhaps be better to put the threshold detection in the first pipeline, to detect this issue in real time. This code could easily be added to the conversion transform you created earlier. In this case you are querying the database for problematic values, just to show an alternative approach.

## Downsampling with an aggregation

While CPU spikes might be acceptable in the short term, they might be more conncerning if such levels are sustained over a longer period of time. For detecting such a condition, an aggregation using a tumbling window could be implemented. Let's say you want to raise an alert if the CPU level exceeds a certain average level over say five minutes. You could use code such as the following:

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

## Add an alerting service

TBD







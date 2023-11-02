# Generating events from time series data

In some use cases you need to generate events from time series data. This could be, for example, because processing needs to be started and stopped by time series values crossing defined thresholds, thereby generating events of interest. These events could be used to delimit a time window in which averaging, or some other processing takes place. Sometimes the generated events themselves are sufficient for the use case, and can trigger processing in another service in the pipeline.

## Generating events

Take for example an industrial process where the average pressure needs to be determined between two trigger points. These are when the pressure rises above 0, and then when the pressure falls to 0. These two thresholds represent logical events. Quix can also generate actual events on the pipeline, from the logical events, which can be used to trigger additional processing. This is handled in code as follows:

``` python

triggered = False

def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):
    global triggered
    stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)
    pressure = df['Pressure'][0]
    if not triggered:
        if  pressure > 0:
            print('State ON')
            triggered = True
            stream_producer.events \
                .add_timestamp(datetime.datetime.utcnow()) \
                .add_value("PressureState", "ON") \
                .publish()
    else:
        if pressure <= 0 :
            print('State OFF')
            triggered = False
            stream_producer.events \
                .add_timestamp(datetime.datetime.utcnow()) \
                .add_value("PressureState", "OFF") \
                .publish()
```

Here the time series data handler simply detects when the time series values exceeds the trigger thresholds, and in each case publishes an event. This event can be used to trigger processing further along in the pipeline, or the two events can be used to delimit a processing window.

!!! note

    In this simple example, state is not preserved across service restarts.

## Handling events

The above events could be handled in another service in the pipeline with the following example code:

``` python
def on_event_data_received_handler(stream_consumer: qx.StreamConsumer, data: qx.EventData):
    if data.value == "ON":
        print ("Process ON event")
        ...
    if data.value == "OFF":
        print ("Process OFF event")
        ...
    ...
```

For example, you could use these events to create a time window within which you carry out processing.

## Processing within the time window

If you want to carry out some processing in the same service as generates the events, that can also be done. For example, to calculate the average pressure within the events:

``` python
...
topic_consumer = client.get_topic_consumer(os.environ["pressure_values"], consumer_group = "empty-transformation")
topic_producer = client.get_topic_producer(os.environ["pressure_events"])
topic_averages = client.get_topic_producer(os.environ["pressure_averages"])

def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):
    global triggered, average, count, total
    stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)
    stream_averages = topic_averages.get_or_create_stream("pressure_averages")
    pressure = df['Pressure'][0]
    if not triggered:
        if  pressure > 0:
            print('State ON')
            triggered = True
            count = 0
            average = 0
            total = 0
    else:
        count = count + 1
        total = (total + pressure)
        average = total / count
        if pressure <= 0 :
            print('State OFF')
            triggered = False
            print('average : --> {:.2f}'.format(average))
            stream_averages.timeseries.buffer \
                .add_timestamp(datetime.datetime.utcnow()) \
                .add_value("PressureAverage", float(average)) \
                .publish()
```

In the above code, the event generating code has been removed for simplicity. Note that the average pressure for the event window is published to an output stream, so these values can be used by other services in the pipeline.

## Next steps

* [Example code](https://github.com/quixio/tutorial-code/blob/main/generate-events/README.md){target=_blank} - the complete code for the example.
* [Quix Streams](../reference/client-library-intro.md) - documentation on data formats, publishing, and subscribing to topics.
* [Quix Tour](../get-started/quixtour/index.md) - generates processing based on threshold triggering.
* [Currency alerting](../tutorials/currency-alerting/currency-alerting.md) - tutorial on generating events based on a threshold.



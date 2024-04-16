# Downsampling

This service reduces the sampling rate of data from one per second to one per minute.

![Downsampling pipeline segment](./images/downsampling-pipeline-segment.png)

Data is aggreagted using a 10 second tumbling window:

``` python
# create a tumbling window of 10 seconds
# use the reducer and initializer configured above
# get the 'final' values for the window once the window is closed.
sdf = (
    sdf.tumbling_window(timedelta(seconds=10))
    .reduce(reducer=reducer, initializer=initializer)
    .final()
)
```

The initializer and reducxer are shown here:

``` python
def reducer(state: dict, value: dict) -> dict:
    """
    'reducer' will be called for every message except the first.
    We add the values to sum them so we can later divide by the 
    count to get an average.
    """

    state['sum_hotend_temperature'] += value['hotend_temperature']
    state['sum_bed_temperature'] += value['bed_temperature']
    state['sum_ambient_temperature'] += value['ambient_temperature']
    state['sum_fluctuated_ambient_temperature'] += value['fluctuated_ambient_temperature']
    state['sum_count'] += 1
    return state

def initializer(value: dict) -> dict:
    """
    'initializer' will be called only for the first message.
    This is the time to create and initialize the state for 
    use in the reducer funciton.
    """

    return {
        'sum_hotend_temperature': value['hotend_temperature'],
        'sum_bed_temperature': value['bed_temperature'],
        'sum_ambient_temperature': value['ambient_temperature'],
        'sum_fluctuated_ambient_temperature': value['fluctuated_ambient_temperature'],
        'sum_timestamp': value['timestamp'],
        'sum_original_timestamp': value['original_timestamp'],
        'sum_printer': value['printer'],
        'sum_count': 1
    }
```

The result is tyhat the mean is calculated for the temperatures over the period of the tumbling window.

The aggregated data is published to the output topic.

The output topic for the service is `json-downsampled-3d-printer-data`. Other services such as the Forecast service, and the InfluxDB raw data storage service subscribe to this topic.

## 🏃‍♀️ Next step

[Part 4 - Forecast service :material-arrow-right-circle:{ align=right }](./forecast-service.md)

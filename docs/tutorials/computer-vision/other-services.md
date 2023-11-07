# Other services

There are some additional services in the pipeline that provide useful functionality. These range from S3 storage of data to calculation of the maximum vehicles per day in a specific location.

Briefly, these services are:

* *Stream merge* - merges all the traffic cam streams into a single stream to make things easier to process in the UI.

* *Cam vehicles* - calculates the total vehicles, where vehicle is defined as one of: car, 'bus', 'truck', 'motorbike'. This number is fed into the *Max vehicle window* service.

* *Max Vehicle Window* - calculates the maximum vehicles over a time window of one day. This service sends messages to the Data API service.

* *Data buffer* - this provides a one second data buffer. This helps reduce load on the Data API service.

* *Data API* - this REST API service provides the following endpoints:

    * `max_vehicles` - last known maximum vehicle count for each camera. 24 hour rolling window.
    * `detected_objects` - output from the computer vision service for all cameras. excludes images
    * `vehicles` - the last known vehicle count for each camera
    * `image` - the last image from the specified camera

    This API is called by the UI to obtain useful data.

* *S3* - stores objects in Amazon Web Services (AWS) S3. This service enables you to persist any data or results you might like to keep more permanently.

!!! tip

  If you ever need to obtain the stream ID, and it is not in the messsages available to the service, it is available through the stream object by using the `stream_id` property, for example, `stream_id = stream_consumer.stream_id`.

## Stream merge

This service prepares data for ease of processing by the UI. Merges all streams onto a single stream. The input stream is `image-processed`, the output stream is `image-processed-merged`. Note the code also decodes the image and then does a Base64 encode prior to passing to the output topic. The UI uses the Quix Streaming Reader to read the messages from `image-processed-merged`, including the Base64 encoded image data.

The key code:

``` python
  # Callback triggered for each new parameter data.
  def on_dataframe_handler(self, stream_consumer: qx.StreamConsumer, df: pd.DataFrame):

      df["TAG__parent_streamId"] = self.consumer_stream.stream_id
      df['image'] = df["image"].apply(lambda x: str(base64.b64encode(x).decode('utf-8')))

      self.producer_topic.get_or_create_stream("image-feed") \
          .timeseries.buffer.publish(df)
```

## Cam vehicles

This service simply adds together objects of the following types: car, bus, truck, motorbike to obtain a total number of vehicles. It classes these objects as vehicles. The message output to the next stage in the pipeline, max vehicles, is as follows:

``` json
{
  "Epoch": 0,
  "Timestamps": [
    1694077540745375700
  ],
  "NumericValues": {
    "truck": [
      1
    ],
    "car": [
      2
    ],
    "lat": [
      51.4075
    ],
    "lon": [
      -0.19236
    ],
    "delta": [
      -2.177236557006836
    ],
    "vehicles": [
      3
    ]
  },
  "StringValues": {},
  "BinaryValues": {
    "image": [
      "(Binary of 157.97 KB)"
    ]
  },
  "TagValues": {}
}
```

In this example there are 2 cars, and 1 truck giving a `vehicles` count of 3.

The main code is:

``` python
def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):
    # List of vehicle columns
    vehicle_columns = ['car', 'bus', 'truck', 'motorbike']

    # Calculate the total vehicle count based on existing columns
    total_vehicle_count = df.apply(lambda row: sum(row.get(column, 0) for column in vehicle_columns), axis=1)

    # Store vehicle count in the data frame
    df["vehicles"] = total_vehicle_count
    stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)
    # Publish data frame to the producer stream
    stream_producer.timeseries.buffer.publish(df)
```

You can find out more about pandas DataFrames in the [pandas documentation](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html){target=_blank}.

## Max Vehicle Window

The max vehicles service takes the total vehicle count and finds the maximum value over a one day window. This value is made available to the Data API service. The message passed to the Data API has the following format:

``` json
{
  "Epoch": 0,
  "Timestamps": [
    1694088514402644000
  ],
  "NumericValues": {
    "max_vehicles": [
      8
    ]
  },
  "StringValues": {},
  "BinaryValues": {},
  "TagValues": {
    "window_start": [
      "2023-09-06 12:08:12.394372"
    ],
    "window_end": [
      "2023-09-07 12:08:12.394372"
    ],
    "window": [
      "1d 0h 0m"
    ],
    "cam": [
      "JamCams_00001.08959"
    ]
  }
}
```

You can see the exact time window is recorded, along with the maximum vehicle count during that time window. This provides a crude measure of the capacity of the road. This capacity can then be used by the UI to calculate a percentage of capacity. For example, if there are 8 cars on a road, and the maximum seen is 10, then the road is considered to be at 80% capacity, and this is displayed on the UI, as shown in the following screenshot:

![Road capacity](./images/road-capacity.png)

This service uses [state](../../quix-streams/state-management.md), as you need to save the maximum count reached during the time window. 

## Data buffer

This service provides a one second data buffer. This reduces load on the Data API service. There are three input topics to the service, `max-vehicles`, `processed-images`, and `vehicle-counts`: and one output topic, `buffered-data`.

See the documentation on [using buffers](../../quix-streams/publish.md#using-a-buffer).

## Data API

The data service offloads calculations that could be done in the web client, and instead provides key data only when the UI needs it. The UI can request this data when it needs it through the REST API of the Data API service.

The Data API provides the following endpoints:

* max_vehicles
* detected_objects
* vehicles
* image

These are used by the UI to obtain and then display the data on the web interface.

### Max Vehicles 

Returns the maximum number of "vehicles" seen on a camera, where vehicles is one of cars, buses, trucks, or motorbikes.

For a `GET` on the endpoint `/max_vehicles`, the response is a dictionary item per camera:

* Key=camera name
* Value=max vehicle count

Example response JSON:

``` json
{
    "JamCams_00001.01251":2.0,
    "JamCams_00001.01252":1.0
}
```

This service is implemented as a simple [Flask web app](https://flask.palletsprojects.com/en/2.3.x/quickstart/){target=_blank} hosted in Quix.

### Detected Objects 

Returns a dictionary of all the data for a given camera (except for the images as these are quite large to store, even temporarily).

For a `GET` on the endpoint `/detected_objects`, the response is an array of:

* Key=camera name
* Value=dictionary of the data

Where the data dictionary is:

* object counts (car: 3, bus: 11 etc)
* lat
* lon
* timestamp

Using this you can plot/display every camera and its count as soon as you get this data.

Example response JSON:

``` json
[
  "JamCams_00001.01419": {
      "car":{"0":3.0},
      "delta":{"0":-1.0003459453582764},
      "image":{"0":""},"lat":{"0":51.5596},
      "lon":{"0":-0.07424},"person":{"0":3.0},
      "timestamp":{"0":1692471825406959867},
      "traffic light":{"0":1.0},
      "truck":{"0":1.0}
  },
  ...
]
```

### Vehicles

The last known vehicle count for each camera.

See the [README](https://github.com/quixio/computer-vision-demo/tree/main/Data%20API){target=_blank} for more information.

### Image

The last image from the specified camera.

See the [README](https://github.com/quixio/computer-vision-demo/tree/main/Data%20API){target=_blank} for more information.

## S3

This is the standard Quix code sample [AWS S3 destination connector](https://quix.io/docs/library_readmes/connectors/s3-destination.html). It takes messages on the input topic and writes them to S3. There is an optional batching facility whereby you can batch messages and then write them to S3 in a batch - this can be more efficient for higher frequency data. You can control batching based on time interval or message count.

## See also

For more information refer to:

* [Connectors](../../connectors/index.md) - connectors, both source and destination.
* [Quix Streams](../../client-library-intro.md) - the client library.

## 🏃‍♀️ Next step

[Part 7 - Add a new service :material-arrow-right-circle:{ align=right }](add-service.md)

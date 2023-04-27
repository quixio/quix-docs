# 2. Decode images

In this part of the tutorial you decode the base64 encoded images coming from the webcam.

## Create the base64 decoder service

Follow these steps to deploy the **base64 decoder service**:

1.  Navigate to the `Code Samples` and locate the Python `Empty template` transformation.

    !!! tip
        You can use the filters on the left hand side to select `Python` and `Transformation` then select `Empty template` in the resulting filtered items.

2.  Click `Edit code`.

3.  Enter `base64 decoder service` as the name for the project.

4.  Select or enter `image-base64` for the input.

5.  Select or enter `image-raw` for the output.

6.  Click `Save as project`.


## Update the code

The code is now saved to your workspace and you can edit it to perform any actions you need it to.

Using the following steps, update the default code so it decodes the web cam images being received on the `image-base64` topic. Then publish the decoded images to the `image-raw` topic.

1.  Add `import base64` to the imports at the top of `main.py`

2.  Update the `on_dataframe_received_handler` method by adding the following line to base64 decode the images.

    ```py
    df['image'] = df["image"].apply(lambda x: base64.b64decode(x))
    ```

    This should go immediately before this line:

    ```py
    stream_producer.timeseries.buffer.publish(df)
    ```

???- note "The completed `main.py` should look like this"

    ```py
    import quixstreams as qx
    import os
    import pandas as pd
    import base64 # Added import (1)

    client = qx.QuixStreamingClient()

    topic_consumer = client.get_topic_consumer(os.environ["input"], consumer_group = "empty-transformation")
    topic_producer = client.get_topic_producer(os.environ["output"])


    def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):

        # Transform data frame here in this method. You can filter data or add new features.
        # Pass modified data frame to output stream using stream producer.
        # Set the output stream id to the same as the input stream or change it,
        # if you grouped or merged data with different key.
        stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)
        df['image'] = df["image"].apply(lambda x: base64.b64decode(x)) # Added code (2)
        stream_producer.timeseries.buffer.publish(df)


    # Handle event data from samples items that emit event data
    def on_event_data_received_handler(stream_consumer: qx.StreamConsumer, data: qx.EventData):
        print(data)
        # handle your event data here


    def on_stream_received_handler(stream_consumer: qx.StreamConsumer):
        # subscribe to new DataFrames being received
        # if you aren't familiar with DataFrames there are other callbacks available
        # refer to the docs here: https://docs.quix.io/client-library/subscribe.html
        stream_consumer.events.on_data_received = on_event_data_received_handler # register the event data callback
        stream_consumer.timeseries.on_dataframe_received = on_dataframe_received_handler


    # subscribe to new streams being received
    topic_consumer.on_stream_received = on_stream_received_handler

    print("Listening to streams. Press CTRL-C to exit.")

    # Handle termination signals and provide a graceful exit
    qx.App.run()
    ```

    1. Import base64 which will be used to decode the images
    2. Call `base64.b64decode` and store the resulting data in the dataframe


## Deploy

Now it's time to deploy this microservice.

Follow these steps:

1.  Tag the code by clicking `add tag` at the top of the code panel. Enter `v1.0` for your tag.

1. Click `Deploy` near the top right hand corner of the screen.

2. Select the `v1.0` from the verison tag drop down.

3. Click `Deploy`.

    You will be redirected to the homepage and the code will be built and deployed and your microservice will be started.


[Part 3 - Object detection :material-arrow-right-circle:{ align=right }](object-detection.md)
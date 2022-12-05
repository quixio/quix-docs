# 4. Transformation

In the [previous part](tweets.md) of this tutorial you deployed a microservice which subscribes to tweets on a pre-defined topic and publishes them to a topic. 

In order to get the tweets to appear in the Chat App and have their sentiment analyzed you now need to transform the Twitter data into a format that the Chat App can understand.

This service will subscribe to the `twitter-data` topic and publish data to the `messages` topic. It will transform the incoming data to make it compatible with the UI and sentiment scoring service.

## Save the code

Follow these steps to deploy the tweet-to-chat conversion stage:

1. Navigate to the Library and apply the following filters
    
    1. Languages = Python
    
    2. Pipeline Stage = Transformation
    
    3. Type = Basic templates

2. Select `Empty template - Transformation`.

3. Click `Edit code`

4. Change the name to `tweet-to-chat`

5. Change the input to `twitter-data` by either selecting it or typing
    it.

6. Ensure the output is set to `messages`

7. Click `Save as project`
    
    - The code for this transformation is now saved to your workspace

## Edit the code

1. Locate main.py

2. Add `import pandas as pd` to the imports at the top of the file.

3. Locate the line of code that creates the output stream
    
    ``` python
    output_stream = output_topic.create_stream(input_stream.stream_id)
    ```

4. Change this line to get or create a stream called `tweets`
    
    ``` python
    output_stream = output_topic.get_or_create_stream("tweets")
    ```

5. Now locate quix\_function.py
    
    - Alter the on\_pandas\_frame\_handler to match the code below
    
        ``` python
        def on_pandas_frame_handler(self, df: pd.DataFrame):
            for index, row in df.iterrows():
                text = row["text"]
                self.output_stream.events.add_timestamp_nanoseconds(row.time)\
                .add_tag("name", "Twitter") \
                .add_value("chat-message", text) \
                .write()
        ```
    
        !!! info 
            
            This will take `text` from incoming tweets and stream them to the output topics tweets stream as event values with a key of `chat-message` which the other stages of the pipeline will recognize.

## Deploy

You'll now tag the code and deploy the service with these steps:

1. Click the `+tag` button at the top of any code file

2. Enter `v1` and press enter

3. Click `Deploy` near the top right corner

4. In the deployment dialog, select `v1` under the `Version Tag`
    
    a. Click `Service` in `Deployment Settings`. This ensures the service runs continuously 
    b. Use the slider to allocate 1GB of memory for this service.
    c. Click `Deploy`
    
	!!! info 

        Tagging the code means that you can easily locate which version of the code is deployed.

    !!! success
	
		You now have a service that is ready to subscribe tweets and publish them onto the sentiment processing stage.

[View the tweets and test the whole pipeline here :material-arrow-right-circle:{ align=right }](finale.md)


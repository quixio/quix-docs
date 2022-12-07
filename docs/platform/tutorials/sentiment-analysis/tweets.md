# 3. Twitter Data

In the [previous part](sentiment.md) of this tutorial you deployed a microservice to analyze the sentiment of messages in the chat. 

In this section you will deploy a data source subscribing to Twitter messages and publishing them to the same chat app you have already deployed. The sentiment of all the messages will be determined in real-time.

If you're asking "Why Twitter?" it's a good question. We have a great Twitter connector and want to show it off! Plus it allows you to source real world data at volume (if you choose the right search parameters).

There are two parts to this section:

1. Obtaining the tweets
2. Transforming them to ensure they're compatible with the Chat App

## Pre-requisite

To complete this part of the tutorial you'll need a [Twitter developer account](https://developer.twitter.com/en/portal/petition/essential/basic-info){target=_blank}

(You can follow [this tutorial to set up a developer account](https://developer.twitter.com/en/support/twitter-api/developer-account){target=_blank})

## Get Tweets

You are going to be using a pre-built library item for this and the default search parameters look for anything to do with Bitcoin. It's a high traffic subject and great for this demo.

Follow these steps to deploy the Twitter data source:

1. Navigate to the Library and locate `Twitter Data - Source`

2. Click `Setup & deploy`

3. Enter your Twitter bearer token into the appropriate field

4. Click `Deploy`
    
    This service receives data from Twitter and streams it to the `twitter-data` topic. 
    
	You'll need to complete the next page of the tutorial before you see the tweets displayed in the UI.

!!! note 
    The default Twitter search criteria is looking for Bitcoin  tweets, it’s a high traffic subject and great for the demo. Feel free to change this once you’ve got the demo working. 
    

## Transformation

In the first part of this page [`Get Tweets`](#get-tweets) you deployed a microservice which subscribes to tweets on a pre-defined subject and publishes them to a topic. 

In order to get the tweets to appear in the Chat App and have their sentiment analyzed you now need to transform the Twitter data into a format that the Chat App can understand.

This service will subscribe to the `twitter-data` topic and publish data to the `messages` topic. It will transform the incoming data to make it compatible with the UI and sentiment analysis service.

### Save the code

Follow these steps to code and deploy the tweet-to-chat conversion stage:

1. Navigate to the Library and apply the following filters
    
    1. Languages = Python
    
    2. Pipeline Stage = Transformation
    
    3. Type = Basic templates

2. Select `Empty template - Transformation`.

3. Click `Preview code` then `Edit code`

4. Change the name to `tweet-to-chat`

5. Change the input to `twitter-data` by either selecting it or typing it

6. Ensure the output is set to `messages`

7. Click `Save as project`
    
    The code for this transformation is now saved to your workspace

### Edit the code

Once saved, you'll be redirected to the online development environment. This is where you can edit, run and test the code before deploying it to production.

Follow these steps to create the tweet-to-chat service.

1. Locate `main.py`

2. Add `import pandas as pd` to the imports at the top of the file

3. Locate the line of code that creates the output stream
    
    ``` python
    output_stream = output_topic.create_stream(input_stream.stream_id)
    ```

4. Change this line to get or create a stream called `tweets`
    
    ``` python
    output_stream = output_topic.get_or_create_stream("tweets")
    ```

    This will ensure that any messages published by this service go into a stream called `tweets`. You'll use the `tweets` room later on to see all of the tweets and their sentiment.

5. Now locate quix\_function.py
    
    - Alter `on\_pandas\_frame\_handler` to match the code below
    
        ``` python
        def on_pandas_frame_handler(self, df: pd.DataFrame):
            
            df = df.rename(columns={'text': 'chat-message'})
            df["TAG__name"] = "Twitter"
            df["TAG__role"] = "Customer"

            self.output_stream.parameters.write(df)
        ```
          
        This will take `text` from incoming `twitter-data` and stream it to the output topics `tweets` stream as parameter or table values with a column name of `chat-message` which the other stages of the pipeline will recognize.

6. Click `Run` near the top right of the code window.

7. Click the `Messages` tab

    In the default view showing "input" messages you will see the incoming twitter-data messages.

    Select a message and you will see that these have "text" in the string values. This is the Tweet text.

    ```sh
    "StringValues": {
        "tweet_id": ["1600540408815448064"],
        "text": ["Some message about @BTC"]
    }
    ```

8. Select the "output" messages. These are messages being published from the code.

    Select a message and you will see that the output messages have a different structure.

    The string values section of the JSON message now contains "chat-message" instead of "text"

    ```sh
    "StringValues": {
        "tweet_id": ["1600541061583192066"],
        "chat-message": ["Some message about @BTC"]
    }
    ```

9. Stop the running code and proceed to the next section

### Deploy

You'll now tag the code and deploy the service with these steps:

1. Click the `+tag` button at the top of any code file

2. Enter `v1` and press enter

3. Click `Deploy` near the top right corner

4. In the deployment dialog, select `v1` under the `Version Tag`
    
    There is no need to allocate much resource to this service, it is very light weight.

5. Click `Deploy`
    
!!! success

    You now have a service that is able to convert messages from the Twitter data source and make them compatible with the UI and sentiment processing service.

[View the tweets and test the whole pipeline here :material-arrow-right-circle:{ align=right }](finale.md)
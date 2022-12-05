# 2. Sentiment Analysis

In [Part 1](chat-app.md) you deployed a Chat App UI, sent some messages and maybe used your phone or sent the link to a friend or colleague and you saw messages being displayed in the Chat UI in real-time.

Now it's time to analyze the sentiment of the conversation by adding a new node to the processing pipeline.

## 2. Evaluating sentiment

Follow these steps to deploy the sentiment analysis pipeline stage.

1. Navigate to the Library and locate `Sentiment analysis` transformation.

2. Click `Edit code`

3. Click `Save as project`
    
    - The code for this transformation is now saved to your workspace

4. Locate main.py

5. Locate the line of code that creates the output stream
    
    ``` python
    output_stream=output_topic.create_stream(input_stream.stream_id)
    ```

6. Append `-output` to the stream id.
    
    - This will ensure the Web UI is able to locate the sentiment being output by this transformation service.
    
    ``` python
    output_stream=output_topic.create_stream(input_stream.stream_id + "-output")
    ```

## Deploy the service

1. Click the `+tag` button at the top of any code file

2. Enter `v1` and press enter

3. Click `Deploy` near the top right corner

4. In the deployment dialog, select `v1` under the `Version Tag`
    
    - This is the tag you just created

5. Click `Service` in `Deployment Settings`
    
    - This ensures the service runs continuously

6. Click `Deploy`
    
    - This service subscribes to data from the `messages` topic and publishes to the `sentiment` topic.
    
    - You can now once again go to the Web UI project you deployed in [Part 1](chat-app.md). 
    
    - Enter values for `Room` and `Name` and click `CONNECT`.
        
    - You can now enter `chat` messages and see the sentiment being updated each time a message is posted.
    
        ![Positive and negative sentiment chats](../../images/tutorials/sentiment-analysis-media/image2.png){width=250px}
    
        ???- info "About"
            The sentiment analysis service you just deployed will subscribe to the `messages` topic. The sentiment is returned to the Web UI via the `sentiment` topic and displayed both in the chart and next to the comment in the chat window by colorizing the chat user’s name.

!!! success 

	You have added to the pipeline by deploying a microservice to analyze the chat messages in real-time

[Subscribe to Tweets from Twitter by following Part 3 of this tutorial :material-arrow-right-circle:{ align=right }](tweets.md)
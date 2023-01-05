# 2. Analyzing sentiment

In [Part 1](sentiment-demo-ui.md) you deployed the Sentiment Demo UI, interacted with the UI to send messages and view messages of other users, and saw those messages displayed in the UI in real time.

In this part of the tutorial you analyze the sentiment of the conversation by adding a new node to the processing pipeline. 

This sentiment analysis microservice utilizes a prebuilt model from [huggingface.co](https://huggingface.co/){target=_blank} to analyze the sentiment of each message flowing through the microservice.

The microservice subscribes to data from the `messages` topic and publishes sentiment results to the `sentiment` topic.

## Deploying the sentiment analysis service

The sentiment of each message will be evaluated by this new microservice in your message processing pipeline.

Follow these steps to deploy the prebuilt sentiment analysis microservice:

1. Navigate to the Library and search for `Sentiment analysis`.

2. Click the `Setup & deploy` button.

3. Ensure the "input" is set to `messages`. 

    This is the topic that is subscribed to for messages to analyze.

4. Ensure the "output" is set to `sentiment`. 

    This is the topic that sentiment results are published to.

5. Click the `Deploy` button. 

   This deploys the service using the default settings. If you later find that this microservice is not performing as expected, then you can subsequently edit the deployment, and increase the resources allocated.  

6. Navigate to the web page for the UI project you deployed in [Part 1](sentiment-demo-ui.md). 

7. Enter values for `Room` and `Name` and click `CONNECT`, or re-enter the room.

8. Now enter chat messages and see the sentiment being updated in real time each time a message is posted. An example of this is shown in the following screenshot:
    
    ![Positive and negative sentiment chats](./sentiment-analysis-media/image2.png){width=200px}

The sentiment analysis service you just deployed subscribes to the `messages` topic. The sentiment is returned to the UI through the `sentiment` topic, and displayed both in the chart and next to the comment in the chat window by colorizing the chat user's name.

!!! success 

	You have added to the pipeline by building and deploying a microservice to analyze the chat messages in real time.

[Subscribe to Tweets from Twitter by following Part 3 of this tutorial :material-arrow-right-circle:{ align=right }](twitter-data.md)
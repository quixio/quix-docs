# 3. Twitter Data

In the [previous part](sentiment.md) of this tutorial you deployed a microservice to analyze the sentiment of messages in the chat. In this section you will deploy a data source subscribing to Twitter messages and publishing them to the same chat app you have already deployed.  The sentiment of all the messages will be determined in real-time.

There are two parts to this:

1. Obtaining the tweets which this page will guide you through
2. Transforming them to be compatible with the Chat App. See the next page for that!

## Tweets

Follow these steps to deploy the Twitter data source:

1. Navigate to the Library and locate `Twitter Data - Source`.

2. Click `Setup & deploy`

3. Enter your Twitter bearer token into the appropriate field

4. Click `Deploy`
    
    This service receives data from Twitter and streams it to the `twitter-data` topic. 
    
	You'll need to complete the next page of the tutorial before you see the tweets displayed in the UI.

!!! note 
        The default Twitter search criteria is looking for Bitcoin  tweets, it’s a high traffic subject and great for the demo. Feel free to change this once you’ve got the demo working. 
    

[Transform the Twitter data by following Part 4 of this tutorial :material-arrow-right-circle:{ align=right }](transformation.md)
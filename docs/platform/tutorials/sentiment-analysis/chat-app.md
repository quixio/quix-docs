# 1. Chat App

This `Chat App` is the UI for the tutorial and allows the user to see messages from all of the users of the app and, in later parts of this tutorial series, will allow the users to see the sentiment of the chat messages.

This is what you will achieve by the end of this page:

![The sentiment analysis demo page](../../images/tutorials/sentiment-analysis-media/image3.png){width=550px}

## Create gateways

Gateways provide a way for external apps to subscribe and publish to topics and help to visualize those connections in the pipeline view.

![Chat messages webgateway](../../images/tutorials/sentiment-analysis-media/web-gateway.png){width=550px}

In this scenario, the Sentiment Demo UI is the external app since it is using the [Quix websockets API](../../how-to/webapps/read.md).

Follow these steps to create the messages and sentiment web gateways:

1. Navigate to the Library and locate `External Source`

2. Click `Add external source`

3. In the `name` field enter `Chat messages WebGateway` 

4. Select or enter `messages` in the `output` field

1. Navigate to the Library and locate `External Destination`

2. Click `Add external destination`

3. In the `name` field enter `Chat sentiment WebGateway` 

4. Select or enter `sentiment` in the `input` field


## Locate the and deploy the Chat App UI

This stage will guide you through selecting the demo UI Library item and deploying it to your workspace. 

Follow these steps to deploy the prebuilt UI:

1. Navigate to the Library and locate `Sentiment Demo UI`

2. Click `Setup and deploy`

3. Ensure that the `sentiment` input box contains `sentiment`

	- This topic will be subscribed to and will contain the sentiment scores from the sentiment analysis service, you'll deploy this in a later part of this tutorial.

3. Ensure that the `messages` input contains `messages`

	- This topic will contain all the chat messages.
	- The UI will subscribe to this topic, to display new messages, as well as publishing to the topic when a user sends a message using the 'send' button in the UI.
	- Later, the sentiment analysis service will also subscribe to messages on this topic to produce sentiment scores.

3. Click `Deploy` 

## Try it

Now try out the UI you just deployed. Find the URL for the deployed UI by navigating to the homepage and locating the tile representing the deployed UI.

![Deployed UI tile](../../images/tutorials/sentiment-analysis-media/ui-tile.png){width=250px}

Click the 'open in new window' icon ![Open in new window icon](../../images/general/open_in_new_window.png){width=18px}

This is the user interface for the demo. This screenshot shows the view you’ll see after creating a `room` to chat in.

![The sentiment analysis demo page](../../images/tutorials/sentiment-analysis-media/image3.png){width=550px}

Now enter some messages, they'll be shown in the chat list!

To make the demo more entertaining use your phone to scan the QR code or send a link to this page to a friend or colleague, you'll see their chat messages appear in your window in real-time!

!!! success

	You have successfully deployed the UI

[Analyze the sentiment of your messages by following Part 2 of this tutorial :material-arrow-right-circle:{ align=right }](analyze.md)

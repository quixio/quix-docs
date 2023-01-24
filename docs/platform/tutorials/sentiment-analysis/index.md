# Sentiment analysis

In this tutorial you will learn how to build a real-time sentiment analysis pipeline. You'll deploy a UI, a sentiment analysis service, and then connect to Twitter to analyze a high-volume of Twitter data.

This is the message processing pipeline you will build in this tutorial:

![The pipeline being built in this tutorial](./sentiment-analysis-media/pipeline-view.png)

The completed project is capable of the sentiment analysis of a high volume of tweets, or your own chat messages, as illustrated in the following screenshot:

![The completed project. Chats on screen with sentiment and overall sentiment](./sentiment-analysis-media/running-ui.png){width=450px}

There are also optional parts of the tutorial where you can learn how to build your own sentiment analysis service rather than use a prebuilt service, and customize your UI, which all help to enhance your learning of key Quix concepts.

!!! tip 
    If you need any assistance, we’re here to help in [The Stream](https://join.slack.com/t/stream-processing/shared_invite/zt-13t2qa6ea-9jdiDBXbnE7aHMBOgMt~8g){target=_blank}, our free Slack community. Introduce yourself and then ask any questions in `quix-help`.

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. **Build your UI**.You deploy the [Sentiment Demo UI](sentiment-demo-ui.md). This is the UI for the tutorial, it allows the user to see messages from all of the users of the app and, in later parts of the tutorial, allow the users to see the sentiment of the chat messages.

2. **Deploy a sentiment analysis microservice**. You configure and deploy a microservice in your pipeline capable of [Analyzing](analyze.md) the sentiment of the messages sent through the Sentiment Demo UI.

3. **Extend your pipeline to handle Twitter data**. In this part, you can increase the volume of messages by using the [Twitter integration](twitter-data.md). You deploy a data source that subscribes to Twitter messages and then publishes them to the Sentiment Demo UI. Sentiment is then determined in real-time.

4. **Summary**. In this [concluding](conclusion.md) part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about the Quix Platform. These additional items are listed next.

5. **Build a sentiment analysis microservice**. In this optional part, you'll build your own sentiment analysis microservice, rather than use a prebuilt service.

6. **Customize the UI**. In this optional part you learn how to customize the Sentiment Demo UI.

[Deploy the first part of the solution by following step 1 :material-arrow-right-circle:{ align=right }](sentiment-demo-ui.md)

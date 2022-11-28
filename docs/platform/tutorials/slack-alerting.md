# Sending TFL BikePoint availability alerts to Slack

## Aim

In this tutorial you will learn how to use Quix to create event driven notifications in real-time. In this example we’ll connect to the Transport for London BikePoint API and send availability alerts to Slack using Slacks Webhooks.

By the end you will have:

 - Configured Slack to allow external services to send messages via WebHooks

 - Built and deployed a Quix Service that streams data received from the TFL BikePoint API

 - Received messages to your slack channel on the availability of bikes around London


## Project Architecture

![image](../images/tutorials/slack-bikes/architecture.png)
# Currency Alerting

<!-- Output copied to clipboard! -->

<!-- You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 6 -->


## Aim

Build a real time streaming pipeline that sends alerts to your phone when the Bitcoin price reaches a certain threshold.

**_Note: This guide will take you through the steps to start working with Twilio (developer platform for communications) and the CoinAPI (platform that provides data APIs to cryptocurrency) using Quix._**

We’ll be using [CoinAPI](http://coinapi.io) to fetch some trading data from various crypto exchanges, and [Pushover](https://pushover.net/) to send notifications to your phone.

By the end you will have learned how to:

1. **Ingest external data into Quix** 
<br>Use an input connector that receives a stream of trading data from CoinAPI.
<br>

1. **Analyze and Transform the data**
<br>Use a simple algorithm that checks to see if a value has crossed a threshold in either direction.
<br>

1. **Output the data to an external source**
<br>Use an output connector that sends push notifications to a simple test app on your mobile phone.

## Prerequisites

To complete this tutorial, you’ll need to sign up for a couple of different services which hopefully shouldn’t take too long. Each service has a simple signup process. 

* **A Quix account**
    * Hopefully you have this already; otherwise, you can visit the [Quix sign-up page](https://portal.platform.quix.ai/self-sign-up) and sign up with an existing Google, Github, or Microsoft account.
    <br>

* **A CoinAPI API Key**
    * To get a free API key, open the [CoinAPI key application form](https://www.coinapi.io/pricing?apikey), enter your email, name, job title, and company size—you’ll get a key sent to your email address.
    <br>
    
* **A Pushover User key and API token**
    * To get a user token and API token; open the [Pushover sign-up page](https://pushover.net/signup), enter your email, define a password, then verify your email address.

## How Our Final Pipeline Will Look
The goal of this tutorial is to end up with a simple pipeline that resembles the following example:
![Alt text](../images/tutorials/currency-alerting/currency-pipeline.png)
What do those colors mean? They describe the role of the function that is being deployed. The possible roles are as follows:

* **Blue**: an input function (AKA source function)—these are responsible for ingesting data into Quix from any outside source, such as an API or websocket.
* **Purple**: a transformation function—these are responsible for processing data in some way.
* **Orange**: an output function (AKA destination function)—these are responsible for outputting some kind of processed data to an outside destination, such as a database.

Before we get going, lets take a closer look at the input, transformation, and output functions that we'll be using in this example.

### The Input Function
**Purpose:**  _Ingest BTC/USD Exchange Rate Data_

This function connects reads a live stream of updates for the currency pair: `BTC/USD`. We get this data by connecting to the [CoinAPI](https://www.coinapi.io/) [Websocket](https://en.wikipedia.org/wiki/WebSocket) (the free [sandbox version](https://docs.coinapi.io/#endpoints-2)). 

* The function streams the exchange rate data to a topic called `currency-exchange-rates`. 
* Downstream functions can then read fom this topic and process it in different ways. 
* In this case, we're going to check the price against a threshold.

### The Transformation Function
**Purpose:** _Monitor the BTC/USD exchange rate against a specific price threshold_

This function contains a simple algorithm that checks to see if a value has crossed a threshold in either direction.

What's being transformed here? In this case, we're filtering signals from the noise. The raw data is being transformed into 'insights' (in the form of price movement alerts). 

* When the threshold criteria are met, the function writes an alert message to a topic called `currency-rate-alerts`. 
* Downstream functions can then read fom this topic and send alerts and notifications whevever they detect a new message.

### The Output Function
**Purpose:** _Send a push notification when certain conditions are met_

This function reads from the `currency-rate-alerts` topic and whenever a new message arrives, it sends a push notification to the Pushover app on your mobile phone.

It also reads the contents of the message and enriches the notification with details on how the threshold was crossed (specifically, if the price is moving up or down).

## Setting Up The Functions
Now let’s deploy the functions we need to build the pipeline.  Luckily, we don’t have to write any of these functions from scratch. We can import them from the Quix library and adapt a few variables for this tutorial.


!!! note "What is the Quix Library?"

	The Quix library is a repository of useful functions in Python (and other supported languages) categorized by each of the three roles. The library includes connector functions that ingest data or output data. It also includes transformation functions that can process and transform the data in different ways.

Let’s set up each function one by one, starting with our input function.


### Setting Up The CoinAPI Input Function


1. Poll the CoinAPI market data endpoint for the current Bitcoin price (no less than every 15 mins if you’re on the free plan

There’s a CoinAPI ingestion function in the Quix library. You just need to copy it to your workspace and give it the environment variables that it expects. 

Search for "CoinAPI" and click "Setup and Deploy" on the CoinAPI tile.

![CoinAPI library item](../images/tutorials/currency-alerting/coinapi.png "CoinAPI library item")

Fill out the following environment variables:

 * The API key that you use to access CoinAPI.
 * The short code for the base currency that you want to track (e.g. BTC), 
 * The short code for the currency in which prices will be quoted (e.g. USD)
Once you have entered your Coin API key just click Deploy.


**Logs**

Once the connector has deployed it will start automatically and you’ll be redirected to the workspace home page.
You can click on the Coin API card where you will see the logs.
If you see an error you might have to wait a few minutes for your API key to propagate to all of the Coin API servers.


### Setting Up The Threshold Checking Function



1. See if the Bitcoin price has moved beyond the target price threshold in either direction. \


You can click on this


![alt_text](images/image3.png "image_tooltip")


xxx


![alt_text](images/image4.png "image_tooltip")



### Setting Up The Pushover Function


1. Send a message to let you know that the threshold has been met (for example, using an SMS API like Twilio).

Head back to the Quix Library and search for "Twilio" and click "Setup and Deploy" on the Twilio Sink tile.


![alt_text](images/image5.png "image_tooltip")


Just like the Coin API connector, this one also needs some values for it to work. Use the guidance in the connectors setup guide to fill in the required details.


1. 
Ensure the input topic is "coin-data".


2. 
"Numbers" should be the command separated list of phone numbers to send SMS alerts to.


3. 
The account_sid, auth_token and messaging_service_sid can be populated using the values you saved while setting up your Twilio account.


4. 
message_limit can be left at 2 or changed to suit your needs.
Click Deploy and wait for the pre-built connector to be depolyed to your workspace.

**Logs**

Once deployed you will again be redirected to the workspace home page. You can click on the Twilio Sink tile and view the logs if you wish.

**Note**

The logs may display a message similar to "skipped due to message limit reached". It’s just an informational display. Not an error and is due to the per minute message limit we configured for the Twilio connector in the previous stage.


![alt_text](images/image6.png "image_tooltip")


Congratulations-At this point you should be receiving messages to your mobile phone. Congratulations you’ve done it!


## Recap - What did you just do!

* 
[x] You created a real time, always on solution on the Quix serverless compute environment. All for Free!

* 
[x] You deployed two connectors. One to read data from another platform and one to make decisions based on that data and send notifications via SMS. In real time.

* 
[x] You gained some experience of navigating the Quix portal and how to deploy connectors. All without doing any coding!

## What’s Next

What else can you use Quix for?

You can stream any kind of data into the Quix platform, from other apps, websites and services. From hardware, machinery or wearables or from anything you can think of that outputs data. You can then process that data in any imaginable way.

See what you can do with it and please share your experiences with us. In fact, share it with your colleagues, friends and family. Blog, tweet and post about it and tell anyone who will listen about the possibilities.

**Tip **If you run into trouble please reach out to us. We’ll be more than happy to help. We hang out at [The Stream](https://quix.ai/slack-invite). Come and say hi.

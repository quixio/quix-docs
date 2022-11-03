# Quick Start

This quick start gets you up and running with Quix. It shows how to set
up a pipeline that ingests real-time Formula 1 data and sends an alert
to your phone whenever a race car passes 300 kilometers per hour. It
uses one source, one transformation and one destination from the Quix
library along with a Twilio integration.

You’ll learn how to create a topic and how to connect, customize and
write sources, transformations and destinations to set up a stream of
real-time data. In the end, you’ll be more comfortable using the
platform and able to apply it in your own projects.

When you’re done with this quick start guide, your pipeline should look
something like this:

![tutorials/pipeline.png](../images/tutorials/pipeline.png)

**Requirements**

  - [Free Quix account](https://quix.ai/signup/)

  - [GitHub account](https://github.com/)

  - [Twilio account](https://www.twilio.com/)

**Installation**

  - No installations are required for cloud deployment

**In this guide**

1.  Set up a Quix workspace

2.  Add a data source to your project

3.  Set up data transformation

4.  Deliver your data with Twilio

5.  Run the pipeline

## 1\. Set up a Quix workspace

[Sign up for Quix](https://quix.ai/). The free account provides enough
resources to build a single streaming data project. You’ll arrive in a
[workspace](../definitions.md#_workspace) when you sign up.

## 2\. Add a data source to your project from the Quix library

The data sources in the Quix library are out-of-the-box code samples
that you can plug and play or customize. It’s an open source library, so
you can also contribute your own when you’re ready\!

To add a data source to your pipeline, click *Add data source* . This
takes you to the library, which you can also access via
[GitHub](https://github.com/quixai/quix-library).

You’ll use Formula 1 Data for this example. This source includes the
speed, acceleration, brake usage and other detailed data from a real F1
car formatted into real-time data. Find the Formula 1 Data card in the
Quix library and click *Set up connector*. Using the prepared data saves
the time of importing or building data sets. Setting up a connector will
simultaneously create a topic
([topics](../definitions.md#_topics) are channels that carry
real-time data, one per data source) and bring the Formula 1 data
[stream](../definitions.md#_stream) into the topic.

You can use the topic name that automatically populates the field or
re-name it.

Click *Connect*.

Now the source is connected. You can go into the source and check the
data in the live preview visualization. The data source includes more
data types than needed, so you can click the tick boxes next to *Speed*
and *RPM* under *Select parameters or events*.

## 3\. Set up a data transformation using the no-code method

You want your pipeline to look at the data and see when a vehicle goes
faster than 300 kilometers per hour. This requires a threshold alert.

Click *Add transform service* to open the library. Find the *Threshold
transformation* and click *Setup*. This transformation connector
generates an alert when a certain numeric threshold is crossed.

The [Project](../definitions.md#_project) name, Input, Output,
ParameterName and ThresholdValue will auto populate. Change
ThresholdValue to 300 to receive an alert whenever the car passes the
300 milometers per hour point. Save by clicking *Save as a project*.

Click *Deploy*. This brings up a dialog box with options to change
variables, network and state. For this project, you can choose
*[Service](../definitions.md#_service)* and leave the
remaining configuration as is. Click *Deploy*. A service is any
application code that continuously runs in a serverless environment.

## 4\. Deliver your data using the Twilio destination

Now that the data is ready to go, you need to tell it where to go. Click
*Add new* next to “Destinations” on the workplace screen. This is where
Twilio comes in to send speed alerts to your phone.

Click *Setup*. Choose your *threshold-alert-output* as the input. You
can find the *numbers*, *account\_sid*, auth\_token', and
messaging\_service\_sid in your free [Twilio
account](https://www.twilio.com/).

*Message\_limit* refers to the total number of messages you’ll receive.
It’s set at two by default, as some message charges may apply.

Click *Save as project* once you have added the requested Twilio
information.

## 5\. Run the pipeline

Here’s the fun part\! The three dots (one in the upper-right corner of
each card) indicate that everything works correctly. All you need to do
is click *Deploy* to start receiving notifications on your phone
whenever the car you’re tracking goes faster than 300 kilometers per
hour.

**Conclusion**

You’ve successfully built a data pipeline that transforms one stream of
data, which is just the beginning\!

[Speak with a technical
expert](https://calendly.com/mike-quix/quix-demo?) about how to set up
and use Quix in your own projects.

**Additional resources**

  - [The Stream community on Slack](https://quix.ai/slack-invite){target=_blank}

  - [Stream processing glossary](https://quix.ai/stream-processing-glossary/){target=_blank}

  - [Developer docs main navigation](../landing-page.md)

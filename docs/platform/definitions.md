# Definitions

The following is a list of definitions to aid understanding of how to
work with Quix and streaming data.

## Workspace

A Workspace is an instance of a complete streaming infrastructure
isolated from the rest of your Organization in terms of performance and
security. It contains his own dedicated API instances and Quix internal
services.

You can imagine a Workspace as the streaming infrastructure of your
company or your team, where you don’t want other operations except the
ones being developed in that workspace affecting the performance or the
stability of your application.

You can also have different workspaces to separate different stages of
your development process like Development, Staging, and Production.

## Topics

A Topic is a channel of real-time data. You can imagine a topic as the
pipe we use to interconnect our streaming applications.

It is highly recommended to organize the data of a topic with some kind
of grouping context for the telemetry data coming from a single source.
Very simplified, a topic is similar to a folder in a filesystem, the
streams are the files in that folder, and your data is the contents of
each file.

For example:

  - Car engine data

  - Game data

  - Telemetry from one ECU on a Boeing 737

Topics are key for scalability and good data governance. Use them to
organize your data by:

  - Grouping incoming data by type or source

  - Maintaining separate topics for raw, clean or processed data

## Stream

A stream is a collection of data (parameters, events, binary blobs and
metadata) that belong to a single session of a single source. For
example:

  - One journey for one car.

  - One game session for one player.

  - One flight for one aeroplane.

### Timestamp

A timestamp is the primary key for all data in a stream.

We support nanosecond precision; that’s 1 x 10-9 seconds or
one-billionth of a second\!

Nanosecond precision is at the bleeding edge of real-time computing and
is primarily driven by innovation with hardware and networking
technology; kudos to you if you have an application for it\!

## Data Types

We currently support any parameter, event, metadata or blob that consist
of numeric (double precision), string (UTF-8) and binary data (blobs).

### Parameters

Parameters are values that develop over time. The Quix SDK supports
numeric and string values.

For example:

  - Crank revolution and oil temperature are two discrete engine
    parameters that begin to define the engine system.

  - Player position in X, Y and Z are three discreet parameters that
    begin to define the player location in a game.

  - Altitude, GPS LAT, GPS LONG and Speed are four parameters that begin
    to define the location and velocity of a plane in the sky.

  - Referring back to topics as a grouping context: we would recommend
    that each of these examples would be grouped into a single topic to
    maintain context.

### Events

Events are a discrete occurrence of a thing that happens or takes place.

For example:

  - Engine start, engine stop, warning light activated.

  - Game started, match made, kill made, player won the race, lap
    completed, track limits exceeded, task completed.

  - Takeoff, landing, missile launched, fuel low, autopilot engaged,
    pilot ejected.

Events are typically things that occur less frequently. They are
streamed into the same topics as their respective parameters and act to
provide some context to what is happening.

Start and stop events mark the beginning and end of data streams.

### Metadata

Metadata describes additional information or context about a stream.

For example:

  - License plate number, car manufacturer, car model, car engine type,
    driver ID,

  - Game version, player name, game session type, game session settings,
    race car set-up

  - Flight number, destination, airport of origin, pilot ID, airplane
    type

Metadata typically has no time context, rather it exists as a constant
throughout one or more streams. For example, your metadata could be the
configuration of a car that is sold from a dealership (such as engine
size, transmission type, wheel size, tyre model etc); you could create a
stream every time that car is driven by the owner, but the engine size
and transmission type won’t change.

Metadata is key to data governance and becomes very useful in
down-stream data processing and analytics.

### Binary data

Quix also supports any binary blob data.

With this data you can stream, process and store any type of audio,
image, video or lidar data, or anything that isn’t supported with our
parameter, event or metadata types.

## Project

A set of code which can be edited, compiled, executed and deployed as
one Docker image.

## Online IDE

We provide an online integrated development environment for python
projects. When you open any python project, you will see the **Run**
button and a console during runtime in addition to the intellisense for
python files.

## Deployment

An instance of a Project running in the serverless environment.

### Service

Any application code that is continuously running in the serverless
environment. For example, a bridge, a function, a backend operation, or
an integration to a third party service like Twilio.

### Job

Any application code that is run once. For example, use a job to run a
batch import of data from an existing data store (CSV, DB or DataLake
etc).

## SDK

[Quix SDK](../sdk/introduction.md) is the main library we use to send and
receive real-time data in our streaming applications.

## APIs

### Streaming Writer API

A [HTTP API](../apis/streaming-writer-api/intro.md) used to send
telemetry data from any source to a topic in the Quix platform. It
should be used when it is not possible to use directly our
[SDK](../sdk/introduction.md).

### Streaming Reader API

A [WebSockets API](../apis/streaming-reader-api/intro.md) used to
stream any data directly from a topic to an external application. Most
commonly used to read the results of a model or service to a real-time
web application.

### Data Catalogue API

An [HTTP API](../apis/data-catalogue-api/intro.md) used to query
historic data in the Data Catalogue. Most commonly used for
dashboards, analytics and training ML models. Also useful to call
historic data when running an ML model or to call historic data from an
external application.

### Portal API

An [HTTP API](../apis/portal-api.md) used to interact with most
portal-related features such as creation of Workspaces, Users,
Deployments, etc.

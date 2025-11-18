---
title: Integrate your data
description: Integrate your data with Quix.
---

# Integrate your data with Quix

There are various ways to ingest data into Quix, as well as write data out from Quix to external products and services. The main methods are listed here.

To ingest data:

1. Using a prebuilt source connector
2. Read data from a CSV file
3. Polling
4. Inbound webhooks
5. External source
6. Using Quix Streams
8. Using a web app

To publish data:

1. Using a prebuilt destination connector
2. External destination

The particular method you use depends on the nature of the service you're trying to interface with Quix. Each of these methods is described in the following sections.

There are various ways to connect to Quix, and how you do so depends on the nature of the service and data you are connecting. In many cases Quix has a [suitable connector](../../quix-connectors/templates/index.md) you can use with minor configuration. 

If you want some example code you can use as a starting point for connecting your own data, you can use the `External source` and `External destination` samples. Or use one of the existing connectors as a starting point, such as the `Starter Source`, or `Starter Destination`.

Low-frequency data from REST APIs can be polled from Quix using a library such as `requests`. 

Quix also provides the [Streaming Reader API](../../apis/streaming-reader-api/overview.md) for reading data from Quix topics. The Streaming Reader API uses the SignalR interface, which can use WebSockets or Long Polling (depending on client support), providing a continuous connection for real-time data consumption.

## Integrations

There is also a [section](../../integrations/overview.md) in this documentation providing more information on specific integrations you can use for connecting Quix with products such as InfluxDB.

## Installing Quix Streams

To install Quix Streams with `pip`:

```
python3 -m pip install quixstreams
```

!!! tip

    If you already have Quix Streams installed, make sure you are using the latest version with `python -m pip install quixstreams -U` or `python3 -m pip install quixstreams -U`, depending on how your system is set up.

Note that if you're using Quix Cloud, then make sure the latest version of Quix Streams is available by adding it to the `requirements.txt` file, if it's not already been included as part of the code sample you are using.

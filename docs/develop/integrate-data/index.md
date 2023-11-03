# Integrate your data with Quix

There are various ways to ingest data into Quix, as well as write data out from Quix to external products and services. The main methods are listed here:

1. Using a prebuilt connector
2. Read data from a CSV file
3. Polling
4. Inbound webhooks
5. External source
6. External destination
7. Streaming APIs
8. Using Quix Streams
9. Using a web app

The particular method you use depends on the nature of the service you're trying to interface with Quix. Each of these methods is described in the following sections.

There are various ways to connect to Quix, and how you do so depends on the nature of the service and data you are connecting. In many cases Quix has a [suitable connector](../../connectors/index.md) you can use with minor configuration. 

If you want some example code you can use as a starting point for connecting your own data, you can use the `External source` and `External destination` samples. Or use one of the existing connectors as a starting point, such as the `Starter Source`, or `Starter Destination`.

Low-frequency data from REST APIs can be polled from Quix using a library such as `requests`. 

Quix also provides the [Streaming Writer API](../../apis/streaming-writer-api/index.md) and the [Streaming Reader API](../../apis/streaming-reader-api/index.md). 

When using the Streaming Writer API you can use the HTTP interface if a continous connection is not required. Faster data from web servers, browser clients, and IoT devices can interface using the SignalR interface, which can use WebSockets or Long Polling (depending on client support), where a continuous connection is required.

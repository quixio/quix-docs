# Quix APIs Overview

Quix provides several APIs. These are:

* Streaming Writer API
* Streaming Reader API
* Portal API
* Query API

While [Quix Streams](../quix-streams/quix-streams-intro.md) is the main client library for Quix, there are certain use cases where you need an alternative:

* The client uses a language that is not supported by Quix Streams (Quix Streams supports Python only)
* There are resource constraints which mean you can't run Quix Streams
* The nature of the client (for example, a web browser)

In these situations Streaming Reader and Writer APIs can provide an alternative solution - for example, they can easily be accommodated in a modern web browser, or using most modern programming languages with an HTTP or SignalR client. 

Portal API is useful for automating processes normally carried out manually in Quix.

Query API is useful for testing and examining data persisted into the Quix internal database.

Each of these APIs is described in more detail in the following sections.

## Comparing the APIs

Use cases for these APIs are shown in the following table:

| API | Interface | Purpose | Typical use case | Docs link |
|---|---|---|---|----|
| Streaming Writer API | HTTP, SignalR (WebSockets) | Publish data to a Quix topic | External service, command line client | [Streaming Writer API](../apis/streaming-writer-api/overview.md) | 
| Streaming Reader API | SignalR (WebSockets and Long Polling)| Subscribe to a Quix topic | Web browser client, dashboard, command line client | [Streaming Reader API](../apis/streaming-reader-api/overview.md) |
| Portal API | HTTP (REST)| Automate Quix | Creating and monitoring deployments | [Portal API](../apis/portal-api/overview.md) |
| Query API | HTTP (REST) | Retrieve persisted data | Evaluate service is processing data correctly | [Query API](../apis/query-api/overview.md) |

## Streaming Writer API

The [Streaming Writer API](../apis/streaming-writer-api/overview.md) enables you to stream data into a Quix topic. 

Streaming Writer provides both an HTTP interface and a [SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr){target=_blank} interface, with SignalR supporting WebSockets, for real-time data transfer.

* [Read more about Streaming Writer API](../apis/streaming-writer-api/overview.md)

## Streaming Reader API

The [Streaming Reader](../apis/streaming-reader-api/overview.md) API enables you to stream data out of a Quix topic. 

Streaming Reader uses Microsoft's [SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr){target=_blank} technology, which provides both WebSockets and Long Polling, depending on client capabilities.

* [Read more about Streaming Reader API](../apis/streaming-reader-api/overview.md)

## Portal API

The [Portal API](../apis/portal-api/overview.md) gives access to Quix, enabling you to automate your project deployment, management and monitoring. For example, you could build command line tools in any language with an HTTP interface available, to create, deploy, and monitor services.

[Read more about Portal API](../apis/portal-api/overview.md)

## Query API

The [Query API](../apis/query-api/overview.md) enables you to fetch persisted data from Quix. You can use it for exploring Quix, testing, prototyping applications, or working with persisted data in any language with HTTP capabilities.

!!! note

    Query API was previously known as Data Catalogue API. You may still see occasional references to the Data Catalogue API in the UI and docs.

[Read more about Query API](../apis/query-api/overview.md)

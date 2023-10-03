# Quix APIs

The Quix Platform provides several APIs. These are:

* Streaming Writer API
* Streaming Reader API
* Portal API
* Query API

The [Streaming Writer](./streaming-writer-api/index.md) and [Streaming Reader](./streaming-reader-api/index.md) APIs enable you to stream data into and out of a Quix topic. These can use WebSockets for real-time streaming of data, but an HTTP interface is also available and intended for low-frequency applications. The main advantage of these APIs is they can be used from any client that supports HTTP or WebSockets, for examples web browsers, but also clients built from languages other than those supported by the [Quix Streams](../client-library-intro.md) client library, such as Ruby or Rust. Quix Streams only currently supports Python or C#.




## Streaming Writer API

The [Streaming Writer API](streaming-writer-api/index.md) enables you to stream data into the Quix platform using HTTP or WebSockets. It’s an alternative to using the [Quix Streams](../client-library-intro.md) client library. You can use the Streaming Writer API from any HTTP-capable language.

## Streaming Reader API

As an alternative to the client library, the Quix platform supports real-time data streaming over WebSockets, via the [Streaming Reader API](streaming-reader-api/index.md). Clients can receive updates on data and definitions for parameters and events, as they happen. The examples use the Microsoft SignalR JavaScript client library.

## Portal API

The [Portal API](portal-api/index.md) gives access to the Portal interface enabling you to programmatically control projects, environments, applications, and deployments.

## Query API

The [Query API](query-api/index.md) enables you to fetch persisted data from the Quix platform. You can use it for exploring the platform, testing, prototyping applications, or working with stored data in any language with HTTP capabilities.

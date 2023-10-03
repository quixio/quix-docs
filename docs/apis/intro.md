# Quix APIs

The Quix Platform provides several APIs. These are:

* Streaming Writer API
* Streaming Reader API
* Portal API
* Query API

## Streaming Writer and Reader

The [Streaming Writer](./streaming-writer-api/index.md) and [Streaming Reader](./streaming-reader-api/index.md) APIs enable you to stream data into and out of a Quix topic respectively. These can use WebSockets for real-time streaming of data, but an HTTP interface is also available and intended for low-frequency applications. The main advantage of these APIs is they can be used from any client that supports HTTP or WebSockets, for examples web browsers, but also clients built from languages other than those supported by the [Quix Streams](../client-library-intro.md) client library, such as Ruby or Rust. Quix Streams only currently supports Python or C#. Use cases for these APIs are shown in the following table:

| API | Purpose | Typical use case |
|---|---|---|
| Streaming Reader | Subscribe to a Quix topic | Web browser client, dashboard, command line client |
| Streaming Writer | Publish data to a Quix topic | External service, command line client |

* [Read more about Streaming Writer API](./streaming-writer-api/index.md)
* [Read more about Streaming Reader API](./streaming-reader-api/index.md)


## Portal API

The [Portal API](portal-api/index.md) gives access to the Quix Portal interface enabling you to automate your project deployment, management and monitoring. For example, you could build command line tools in any language with an HTTP interface available, to create, deply, and monitor services.

[Read more about Portal API](portal-api/index.md)

## Query API

The [Query API](query-api/index.md) enables you to fetch persisted data from Quix. You can use it for exploring the platform, testing, prototyping applications, or working with persisted data in any language with HTTP capabilities.

[Read more about Query API](query-api/index.md)

# Quix APIs

The Quix Platform provides the following APIs:

## Query

The [Query API](query-api/intro.md) enables you to fetch data stored in the Quix platform. You can use it for exploring the platform, prototyping applications, or working with stored data in any language with HTTP capabilities.

## Streaming Writer

The [Streaming Writer API](streaming-writer-api/intro.md) enables you to stream data into the Quix platform via HTTP. It’s an alternative to using our C\# and Python client libraries. You can use the Streaming Writer API from any HTTP-capable language.

## Streaming Reader

As an alternative to the client library, the Quix platform supports real-time data streaming over WebSockets, via the [Streaming Reader API](streaming-reader-api/intro.md). Clients can receive updates on data and definitions for parameters and events, as they happen. The examples use the Microsoft SignalR JavaScript client library.

## Portal API

The [Portal API](portal-api.md) gives access to the Portal interface enabling you to programmatically control projects, environments, applications, and deployments.

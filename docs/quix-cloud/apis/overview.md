# APIs overview

Quix provides two APIs that complement [Quix Streams](https://quix.io/docs/quix-streams/introduction.html), the main client library, for use cases where Quix Streams isn't a fit — for example a non-Python client, a resource-constrained environment, or a web browser.

## Comparing the APIs

| API | Interface | Purpose | Typical use case | Docs |
|---|---|---|---|----|
| Streaming Reader API | SignalR (WebSockets and Long Polling) | Subscribe to a Quix topic | Web browser client, dashboard, command line client | [Streaming Reader API](streaming-reader-api/overview.md) |
| Portal API | HTTP (REST) | Automate Quix | Creating and monitoring deployments | [Portal API](portal-api/overview.md) |

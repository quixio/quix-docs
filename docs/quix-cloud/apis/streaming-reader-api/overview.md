---
title: Streaming Reader API overview
description: The Streaming Reader API is a SignalR-based push API that streams live topic data to any client over WebSockets.
---

# Streaming Reader API overview

The **Streaming Reader API** is a push API that streams live data from a Quix topic to your client over WebSockets (or Long Polling, depending on what the client supports). It is built on Microsoft SignalR, so any language with a SignalR client can subscribe — typically used when a non-Python client needs live topic data, since [Quix Streams](https://quix.io/docs/quix-streams/introduction.html) is Python-only.

Each environment exposes its own Streaming Reader endpoint:

```
https://reader-<environment-id>.cloud.quix.io/hub
```

Unlike the Portal API, the Streaming Reader is per-environment — the endpoint hostname encodes which environment you are subscribing to.

## What you can subscribe to

Clients connect to a SignalR hub and subscribe to events scoped to a topic, a stream within that topic, or all streams (using `*` as a wildcard):

- **`ParameterData`** — numeric / time-series parameter samples published to the topic.
- **`EventData`** — discrete events with payloads and tags.
- **Parameter and event definitions** — schema-like metadata describing the parameters and events a stream emits.
- **Stream lifecycle** — stream creation, closure, and metadata updates.

See [Subscriptions and events](./subscriptions.md) for the full list of hub methods and event names.

## When to use it

- **Browser dashboards** consuming live data from a topic without sitting on a Kafka client.
- **Mobile or embedded clients** that can't run a full Kafka consumer.
- **Backend services in non-Python languages** (Node.js, C#, Java, Go) that need realtime updates without standing up a Kafka consumer group.
- **Lightweight integrations** where you want a managed, authenticated WebSocket rather than direct broker access.

For Python services, prefer Quix Streams — it gives you a richer programming model (DataFrames, joins, stateful operations) over the same data.

## Authentication

The Streaming Reader uses bearer-token authentication. Pass your [Personal Access Token (PAT)](../../access-security/personal-access-token.md) when constructing the SignalR connection:

```javascript
const options = {
    accessTokenFactory: () => 'YOUR_PAT'
};
```

A missing or invalid token causes the connection to be rejected with an authentication error (`signalrcore.hub.errors.UnAuthorizedHubError` in some clients).

## Next steps

- [Setup](./setup.md) — get a PAT, find your environment ID, install a SignalR client.
- [Reading data](./reading-data.md) — full end-to-end Node.js example.
- [Subscriptions and events](./subscriptions.md) — hub methods, event names, and payload shapes.

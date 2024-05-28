---
title: Overview - Redis
description: This section of the Quix documentation covers how to integrate Redis with Quix.
search:
  boost: 3
---

# Overview - Redis 

[Redis](https://redis.io/docs/latest/get-started/) is an in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. Redis has built-in replication and different levels of on-disk persistence. It supports complex data types (e.g., strings, hashes, lists, sets, sorted sets, and JSON), with atomic operations defined on those data types.

Quix supports both [Redis Source](https://github.com/quixio/quix-samples/tree/release/2024-05-01-cli-beta/python/sources/redis_source) and [Redis Sink](https://github.com/quixio/quix-samples/tree/release/2024-05-01-cli-beta/python/destinations/redis_dest) connectors. You can therefore query a Redis database and produce your data to a Kafka topic, and/or output your transformed data from Quix to Redis itself. 

---
title: Lakehouse Database
description: Internal storage that backs the Quix Lakehouse Catalog.
---

# Lakehouse Database

The **Database** is the Quix-managed storage that backs the [Catalog](./catalog.md). It holds the Iceberg metadata — tables, schemas, snapshots, file statistics — that the Catalog exposes to the rest of the Lakehouse.

You don't interact with the Database directly. It's listed here mostly so you know what it is when you see it alongside the other Lakehouse services. The [Catalog](./catalog.md) is the API surface; everything you need is documented there or on the [Query](./query.md) and [Sink](./sink.md) pages.

## What lives here

* Iceberg table registry, schemas, partition specs
* Snapshot history and the current snapshot pointer per table
* Manifest pointers (paths to manifest files in your blob storage)
* Per-file statistics used for query pruning

## What does *not* live here

* **Your data** — Parquet files live in your blob storage, not in this database.
* Replay-format Avro segments — that's the [Data Lake](../data-lake/overview.md)'s concern.
* Kafka offsets — committed back to Kafka by the [Sink](./sink.md).

## See also

* [Lakehouse overview](./overview.md)
* [Catalog](./catalog.md) — the API surface over this store
* [Lakehouse Sink](./sink.md)
* [Query](./query.md)

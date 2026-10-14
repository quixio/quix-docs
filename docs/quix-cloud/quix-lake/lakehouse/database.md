---
title: Lakehouse Database
description: Internal storage that backs the Quix Lakehouse Catalog.
---

# Lakehouse Database

The **Database** is the Quix-managed Postgres database that backs the [Catalog](./catalog.md). It holds the file index — tables, schemas, files, and file statistics — that the Catalog exposes to the rest of the Lakehouse.

You don't interact with the Database directly. It's listed here mostly so you know what it is when you see it alongside the other Lakehouse services. The [Catalog](./catalog.md) is the API surface; everything you need is documented there or on the [Query](./query.md) and [Sink](./sink.md) pages.

## What lives here

* Table registry, schemas, partition specs, and table properties
* One row for each Parquet file of each table: path, size, row count, and partition values
* Per-file min/max statistics for numeric and timestamp columns, used for query pruning
* Locks that stop two scheduled compactions of the same table at the same time

## What does *not* live here

* **Your data** — Parquet files live in your blob storage, not in this database.
* Replay-format Avro segments — that's the [Data Lake](../data-lake/overview.md)'s concern.
* Kafka offsets — committed back to Kafka by the [Sink](./sink.md).

## See also

* [Lakehouse overview](./overview.md)
* [Catalog](./catalog.md) — the API surface over this store
* [Lakehouse Sink](./sink.md)
* [Query](./query.md)

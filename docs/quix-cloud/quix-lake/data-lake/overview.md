---
title: Data Lake overview
description: Replay-first storage layer of Quix Lake. Persists Kafka topics as raw Avro plus Parquet indexes in your own cloud storage.
---

# Data Lake overview

**Data Lake** is the **replay-first** option in [Quix Lake](../overview.md). It captures Kafka topic data into your blob storage (Amazon S3, Azure Blob, Google Cloud Storage, or MinIO) as **raw Avro segments** alongside lightweight **Parquet index files** — so every message is preserved byte-for-byte and is discoverable without scanning the raw data.

If you're looking for SQL-queryable, columnar storage instead, see **[Lakehouse](../lakehouse/overview.md)**. Not sure which to pick? Read [Choosing between them](../overview.md#choosing-between-them) in the Quix Lake overview.

## What you get

* **Portable** — open Avro and Parquet, readable by DuckDB, Spark, Trino, Athena, BigQuery, and friends
* **Faithful** — Kafka messages persisted exactly as they arrived: timestamps, headers, partitions, offsets, idle gaps
* **Discoverable** — Parquet index summarizes every segment so the UI and API can list and filter without scanning Avro
* **Replayable** — push any persisted dataset back into Kafka with original order and timing preserved or simulated
* **Yours** — data lives in your bucket; you control IAM, keys, encryption, retention, and audit

!!! info "Prerequisites"
    A [blob storage connection](../blob-storage.md) must be configured for the cluster.

## Storage layout

Data is written to your bucket in a predictable, Hive-style layout for easy discovery and external tooling.

```text
Raw Avro:
<bucket>/<workspaceId>/Raw/Topic=csv-data/Key=B/Start=2025-08-21/
  ts_1755776884034_1755776886089_part_0_off_331135_331334.avro.snappy

Parquet index and custom metadata:
<bucket>/<workspaceId>/Metadata/Topic=data-source-json/Key=6/
  index_raw_0_129879.parquet
  metadata_<...>.parquet
```

See **[Open format](./open-format.md)** for the full layout and schemas.

## What you can do

* **Explore datasets** with the [Data Lake UI](./user-interface.md) or [API](./api.md)
* **Replay** persisted datasets back into Kafka with full fidelity — see [Replay](./replay.md)
* **Search and filter** by time ranges, topics, keys, and custom metadata
* **Query externally** using DuckDB, Spark, Trino, Athena, or BigQuery over the raw Avro and Parquet

!!! tip "Cross-environment access"
    With the right permissions, you can browse datasets written by other environments using the Environment switcher in the Data Lake UI.

## How it works

1. **Ingest** — the [Data Lake Sink](./sink.md) writes raw Kafka messages to Avro segments in your storage.
2. **Index** — Parquet index files summarize time, partition, offsets, and sizes for each segment.
3. **Discover** — the UI and APIs read the index to list and filter quickly, never scanning Avro for catalog operations.
4. **Replay** — any discovered dataset can be streamed back to Kafka with original order and timing preserved or simulated.
5. **Use** — build pipelines that mix historical data with live streams, or run queries directly over the open files.

## Operational behavior

* **Soft deletion** — catalog deletions move items to Trash for a short retention window before permanent removal, with restore and delete-forever actions.
* **Security** — you control IAM, keys, encryption, retention, and audit in your own cloud account. Within Quix, each team only sees its own data by default. See the [Storage Access Gateway](../secure-storage-access.md).

## See also

* [Open format](./open-format.md) — Avro and Parquet layout, schemas, columns
* [Data Lake Sink](./sink.md) — persist a topic to your bucket
* [Data Lake UI](./user-interface.md) — explore datasets in the portal
* [Data Lake API](./api.md) — programmatic search, metadata, deletion
* [Replay](./replay.md) — push persisted datasets back into Kafka
* [Blob storage connections](../blob-storage.md) — connect your bucket or container
* [Storage Access Gateway](../secure-storage-access.md): how private-by-default, per-team access works

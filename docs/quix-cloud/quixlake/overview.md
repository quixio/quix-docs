---
title: What is Quix Lake
description: The central storage layer of Quix Cloud for capturing and managing Kafka data in open formats.
---

# What is Quix Lake

**Quix Lake** is the central storage layer of **Quix Cloud**. It captures, organizes, and manages Kafka topic data in an open, file-based format on blob storage systems such as Amazon S3, Azure Blob, Google Cloud Storage, or MinIO.

Instead of relying on proprietary databases, Quix Lake uses open formats and Hive-style partitioning so your data stays:

* **Portable**: readable by tools that support Avro and Parquet
* **Efficient**: optimized for analytics with Parquet plus partitions
* **Flexible**: usable in both real-time and historical pipelines
* **Future-proof**: foundation for Replay, metadata search, and time series queries

!!! info "Prerequisites"
    A blob storage connection must be configured for the environment. See **Blob storage connections** in the related links.

## Why it exists

Earlier persistence options were tied to specific databases and SDKs, which limited replay fidelity and format choice. Quix Lake rethinks this:

* Kafka messages are persisted exactly as they arrive, including timestamps, headers, partitions, offsets, and idle gaps
* Metadata is indexed alongside raw data to enable fast discovery without scanning Avro
* Services like **API**, **Replay**, and **Sink** operate directly on the open files in your bucket
* You keep full control of storage, security, and lifecycle in your own cloud account

## Where your data lives

Data is written to your bucket in a predictable layout for easy discovery and external tooling.

**Examples**

```
Raw Avro:
<bucket>/<workspaceId>/Raw/Topic=csv-data/Key=B/Start=2025-08-21/
  ts_1755776884034_1755776886089_part_0_off_331135_331334.avro.snappy

Parquet index and custom metadata:
<bucket>/<workspaceId>/Metadata/Topic=data-source-json/Key=6/
  index_raw_0_129879.parquet
  metadata_<...>.parquet
```

See **[open format](./open-format.md)** for the full layout and schemas.

## What you can do

* **Explore datasets** with the **Quix Lake** UI or API
* **Replay** persisted datasets back into Kafka with full fidelity
* **Search and filter** by time ranges, topics, keys, and custom metadata
* **Query externally** using DuckDB, Spark, Trino, Athena, or BigQuery over Avro and Parquet

!!! tip "Cross-environment access"
    With the right permissions, you can browse datasets written by other environments using the Environment switcher in the Data Lake UI.

## How it works

1. **Ingest**: a sink writes raw Kafka messages to Avro files in your storage
2. **Index**: Parquet index files summarize time, partition, offsets, and sizes
3. **Discover**: the UI and APIs read the index to list and filter quickly
4. **Replay**: any discovered dataset can be streamed back to Kafka with original order and timing preserved or simulated
5. **Use**: build pipelines that mix historical data with live streams, and run queries over Parquet

## Operational behavior

* **Soft deletion**: catalog deletions move items to Trash for a short retention window before permanent removal, with restore and delete-forever actions
* **Security**: you control IAM, keys, encryption, retention, and audit in your own cloud account

## See also

* [Open format](./open-format.md)
* [Quix Lake - Sink](../managed-services/sink.md)
* [Quix Lake - User Interface](./user-interface.md)
* [Quix Lake - API](./user-interface.md)
* [Quix Lake - Replay](../managed-services/replay.md)
* [Blob storage connections](../managed-services/blob-storage.md)

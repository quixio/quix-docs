---

title: Quix Lake Open format
description: How Quix Lake structures data in Avro and Parquet for portability and performance.
---

# Quix Lake Open format

Quix Lake stores Kafka messages and metadata as **open files** in your blob storage (S3, GCS, Azure Blob, MinIO). The layout favors portability, fast discovery, and full-fidelity replay.

!!! tip "Read with anything"
    Files are standard **Avro** and **Parquet**. Open them with DuckDB, Spark, Trino or Presto, Pandas or PyArrow, Athena, or BigQuery external tables.

## Storage layout (Hive-style)

```text
<bucket>
  <workspaceId>
    Raw
      Topic=<topic>
        Key=<stream-key>
          Start=<yyyy-mm-dd>
            ts_<startTs>_<endTs>_part_<p>_off_<first>_<last>.avro[.codec]

    Metadata/
      Topic=<topic>
        Key=<stream-key>
          index_raw_<partition>_<seq>.parquet   # index files
          metadata_*.parquet                    # optional custom metadata
```

## Schemas and formats

=== "Raw data (Avro)"

    Short description

    - Every Kafka message is persisted as one Avro record.
    - Captures payload, timestamp, partition, offset, headers, and optional gap markers for periods with no messages.

    **Record fields**

    | Field          | Type               | Meaning                                   |
    |----------------|--------------------|-------------------------------------------|
    | `Payload`      | bytes or string    | Serialized message value                  |
    | `TimestampMs`  | long               | Message timestamp in milliseconds         |
    | `Partition`    | int                | Kafka partition number                    |
    | `Offset`       | long               | Kafka offset                              |
    | `Headers`      | map<string, bytes> | Kafka headers (optional)                  |
    | `Gap`          | boolean            | True when the row marks a gap (optional)  |
    | `GapReason`    | string             | Human-readable reason (optional)          |

=== "Index metadata (Parquet)"

    Short description

    - Compact Parquet descriptors summarize where data lives so the Catalog and APIs can discover datasets without scanning Avro.

    **Columns**

    | Column           | Type     | Meaning                                      |
    |------------------|----------|----------------------------------------------|
    | `Path`           | string   | Full object path to the referenced file      |
    | `Topic`          | string   | Kafka topic                                  |
    | `Key`            | string   | Stream key                                   |
    | `Partition`      | int      | Kafka partition number                       |
    | `TimestampStart` | long     | First record timestamp in ms                 |
    | `TimestampEnd`   | long     | Last record timestamp in ms                  |
    | `OffsetStart`    | long     | First Kafka offset in the segment            |
    | `OffsetEnd`      | long     | Last Kafka offset in the segment             |
    | `RecordCount`    | long     | Number of records                            |
    | `FileSizeBytes`  | long     | Size of the referenced file                  |
    | `CreatedAt`      | datetime | Descriptor creation time in UTC              |
    | `DeletedAt`      | datetime | Soft-delete marker (nullable)                |

=== "Custom metadata (Parquet)"

    Short description

    - Optional key or dataset level properties you add, for example experiment id, labels, or business tags. Stored as Parquet and indexed for search.

    **Columns**

    | Column          | Type     | Meaning                                   |
    |-----------------|----------|-------------------------------------------|
    | `Topic`         | string   | Kafka topic                               |
    | `Key`           | string   | Stream key                                |
    | `MetadataKey`   | string   | Property name                             |
    | `MetadataValue` | string   | Property value                            |
    | `UpdatedUtc`    | datetime | When this metadata entry was last updated |


## How it flows

* Ingest: write Avro into partitioned folders ([Quix Lake - Sink](../managed-services/sink.md))
* Index: write Parquet descriptors alongside ([Quix Lake - Sink](../managed-services/sink.md))
* Discover: UI and APIs read Parquet to list and filter your datasets ([Quix Lake - API](./api.md))
* Use: Replay to Kafka, or query with your engines of choice ([Quix Lake - Replay](../managed-services/replay.md))

## Guarantees

* Portability with standard Avro and Parquet
* Replay-ready messages with order, timestamps, headers, partitions, offsets, and gaps preserved
* Fast discovery using Parquet index instead of scanning Avro
* A stable base for time-series and SQL over Parquet

## See also

* [Quix Lake - Sink](../managed-services/sink.md) - persist data from Kafka to your Blob Storage
* [Quix Lake - API](./api.md) - discover datasets programmatically
* [Quix Lake - User Interface](./user-interface.md) - discover datasets using Quix Cloud user interface
* [Quix Lake - Replay](../managed-services/replay.md) - send datasets back to Kafka
* [Blob storage connections](../managed-services/blob-storage.md) - wire up your bucket or container

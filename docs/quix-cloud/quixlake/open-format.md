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

    - Each Kafka message is persisted as **one Avro record**.
    - Preserves **timestamp**, **key**, **headers**, **value**, **partition**, and **offset** exactly as produced by Kafka.
    - `value` is stored as **bytes**; you control the serialization of your payload (e.g., JSON/Avro/Protobuf) before it lands here.

    **Record fields**

    | Field        | Avro type          | Meaning                                                                    |
    |--------------|--------------------|----------------------------------------------------------------------------|
    | `timestamp`  | `long`             | Kafka message timestamp in **milliseconds since Unix epoch**.              |
    | `key`        | `["null","bytes"]` | Kafka message key; `null` if keyless.                                      |
    | `headers`    | `array<Header>`    | Kafka headers as an array of `{ key: string, value: ["string","bytes"] }`. |
    | `value`      | `bytes`            | Message payload as raw bytes (you define the serialization upstream).      |
    | `partition`  | `long`             | Kafka partition number.                                                    |
    | `offset`     | `long`             | Kafka offset.                                                              |

    !!! Note
        `headers.value` supports **either UTF-8 strings or raw bytes**. Values are written exactly as provided by the producer.

=== "Index metadata (Parquet)"

    Compact **Parquet** descriptors summarize where raw Avro files live so UI and APIs can **discover datasets without scanning Avro**.

    **Columns**

    | Column           | Parquet type                    | Meaning                                                     |
    |------------------|---------------------------------|-------------------------------------------------------------|
    | `Path`           | `BYTE_ARRAY (UTF8)`             | Full object path to the referenced Avro file                |
    | `Topic`          | `BYTE_ARRAY (UTF8)`             | Kafka topic                                                 |
    | `Key`            | `BYTE_ARRAY (UTF8)`             | Stream key                                                  |
    | `Partition`      | `INT64`                         | Kafka partition number                                      |
    | `TimestampStart` | `INT64`                         | First record timestamp in **milliseconds since Unix epoch** |
    | `TimestampEnd`   | `INT64`                         | Last record timestamp in **milliseconds since Unix epoch**  |
    | `StartOffset`    | `INT64`                         | First Kafka offset in the segment                           |
    | `EndOffset`      | `INT64`                         | Last Kafka offset in the segment                            |
    | `RecordCount`    | `INT64`                         | Number of records                                           |
    | `FileSizeBytes`  | `INT64`                         | Size of the referenced file (bytes)                         |
    | `CreatedAt`      | `INT64 (TIMESTAMP_MICROS, UTC)` | Descriptor creation time (UTC, microseconds)                |

    !!! Notes

        - Field names are **canonical**: `StartOffset` / `EndOffset` (not `OffsetStart` / `OffsetEnd`).
        - `CreatedAt` uses Parquet logical type **`TimestampMicros`**, adjusted to UTC.
        - Time units for `TimestampStart`/`TimestampEnd` are **milliseconds** for consistency with the Avro message `timestamp`.

=== "Custom metadata (Parquet)"

    Optional dataset/key-level properties stored as **Parquet** and indexed for discovery and filtering.

    **Columns**

    | Column          | Parquet type                    | Meaning                                      |
    |-----------------|---------------------------------|----------------------------------------------|
    | `Topic`         | `BYTE_ARRAY (UTF8)`             | Kafka topic                                  |
    | `Key`           | `BYTE_ARRAY (UTF8)`             | Stream key                                   |
    | `MetadataKey`   | `BYTE_ARRAY (UTF8)`             | Property name                                |
    | `MetadataValue` | `BYTE_ARRAY (UTF8)`             | Property value                               |
    | `DeleteFlag`    | `BYTE_ARRAY (UTF8)`             | Soft-delete marker `True`/`False`            |
    | `UpdatedUtc`    | `INT64 (TIMESTAMP_MICROS, UTC)` | Descriptor creation time (UTC, microseconds) |

    !!! Tip "Querying the latest metadata"
        To resolve the latest metadata per `(Topic, Key, MetadataKey)`, use a “latest” reduction by `UpdatedUtc` (e.g., `max_by`), then filter out `DeleteFlag = TRUE`.

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

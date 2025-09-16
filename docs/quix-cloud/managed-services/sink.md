---
title: "DataLake.Sink"
description: Connector that persists Kafka data into Quix Lake.
---

# Quix Lake - Sink

The Quix Lake Sink writes Kafka topic data to your blob storage in **Avro** (raw messages) and **Parquet** (index and optional custom metadata), enabling fast discovery and high-fidelity **Replay**.

Identifier: `DataLake.Sink`

## Purpose

* Persist raw Kafka messages exactly as they arrive (timestamps, headers, partitions, offsets, and gaps)
* Enable **Replay** and external **Query** over open files
* Maintain a durable, auditable record of streams in your own storage

## How it works

* Consumes from a Kafka topic (single or many sinks per environment)
* Rolls **Avro** segments and writes them under the **Raw** prefix using a stable, partitioned layout (topic, key, partition, date)
* Emits **Parquet** index files under **Metadata** so the **Quix Lake UI and API** can list and filter datasets without scanning Avro
* Optionally accepts **custom metadata** you attach later via the Metadata API

**Example object names**

```text
Raw:
<bucket>/<workspaceId>/Raw/Topic=csv-data/Key=B/Start=2025-08-21/
  ts_<startTs>_<endTs>_part_0_off_<first>_<last>.avro.snappy

Metadata:
<bucket>/<workspaceId>/Metadata/Topic=csv-data/Key=B/
  index_raw_0_<seq>.parquet
  metadata_<...>.parquet         # custom (optional)
```

## Prerequisites

* A **Blob storage connection** is configured for the cluster (one per cluster).
  The sink uses this connection; you do not paste storage credentials into the sink.
* The connection **passes the Test** (write, list, query, delete round-trip).

## How to run (UI)

1. Create or log in to your Quix account.
2. Go to **Connectors → Add connector → Quix Lake - Sink**.
3. Click **Set up connector**, fill the parameters below, then **Test connection & deploy**.

!!! info "Managed service"
    The image is hosted and operated by Quix. You provide configuration only. No Docker, servers, or manual updates required.

## Configuration

You can configure the sink in **YAML** or via the **Quix Cloud UI**.

### Core settings

* **Topic**: source Kafka topic to persist
* **Consumer group**: isolates this sink’s consumption
* **Rolling strategy**: when to close an Avro segment (by size and/or time)
* **Compression**: Avro block compression (for example, Snappy)
* **Parallelism**: number of workers handling upload and indexing

!!! tip "UI mapping"
    The UI fields map to environment variables at deploy time. Names may differ from the examples below but behave equivalently.

### Configuration reference

#### Required

* `topic` - Kafka topic to consume

#### Quix Streams settings

* `commitTimeInterval` - seconds between commits (default: `60`)
* `commitMsgInterval` - messages between commits (default: `0`)
* `consumerGroup` - Kafka consumer group ID (default: `quixstreams-default`)
* `autoOffsetReset` - `latest` or `earliest` (default: `latest`)

#### Sink settings

* `avroCompression` - `snappy` or `gzip` (default: `snappy`)
* `maxWorkers` - threads for uploading (default: `5`)
* `indexRowCount` - checkpoints per index file (default: `1000`)
* `datacatalogRequestTimeout` - seconds (default: `5`)
* `logLevel` - `INFO` or `DEBUG` (default: `INFO`)

### Example YAML (UI-equivalent)

```yaml
deployments:
- name: Quix Lake - Sink
  application: DataLake.Sink
  version: latest
  deploymentType: Managed
  resources:
    cpu: 500
    memory: 1024
    replicas: 1
  configuration:
    # Source
    # sourceTopic in YAML; UI may label this as "topic"
    sourceTopic: csv-data
    consumerGroup: quixlake-sink-v1

    # Quix Streams
    commitTimeInterval: 60
    commitMsgInterval: 0
    autoOffsetReset: latest

    # Rolling
    rollBytes: 134217728          # ~128 MB segments (example)
    rollSeconds: 300              # or every 5 minutes (example)

    # Write & index
    compression: snappy           # Avro block compression
    maxInFlightUploads: 4         # upload concurrency
    avroCompression: snappy       # alias used by some images
    maxWorkers: 5                 # threads for uploading
    indexRowCount: 1000           # checkpoints per index file
    datacatalogRequestTimeout: 5  # seconds
    logLevel: INFO
```

## What it writes

* **Avro (Raw)**
  One record per Kafka message. Fields commonly include `Payload`, `TimestampMs`, `Partition`, `Offset`, `Headers`, and optional gap markers.
* **Parquet (Index)**
  Compact descriptors with `Path`, `Topic`, `Key`, `Partition`, `TimestampStart/End`, `OffsetStart/End`, `RecordCount`, `FileSizeBytes`, `CreatedAt`, `DeletedAt?`.
* **Parquet (Custom metadata, optional)**
  Your key–value annotations (`Topic`, `Key`, `MetadataKey`, `MetadataValue`, `UpdatedUtc`) used for search and grouping in the UI.

See [Open format](../quixlake/open-format.md) for full schemas and layout.

## Operational behavior

* **Ordering**
  Message order is preserved per key and partition. Segment boundaries do not affect replay order.
* **Offset commits**
  The sink commits consumption after data has been safely uploaded and indexed to reduce data loss on restarts.
* **Throughput**
  Upload concurrency and rolling thresholds control steady-state speed. Larger segments improve listing/query performance at the cost of slower “first-byte” availability.
* **Consolidation**
  Background compaction periodically merges small Avro files and compacts index Parquet to reduce file counts and accelerate discovery.
* **Scaling**
  Increase **replicas** to parallelize by partitions and keys. Ordering is still preserved per key/partition.

## Monitoring

* **Logs**: per-segment lifecycle (rolling, upload, index write), retries, and timings
* **Metrics**: records persisted, bytes uploaded, active uploads, average upload speed
* **Data Lake UI*: new datasets appear as index files land; use **Refresh** if you need to surface them sooner

## Security

* Uses the **cluster’s** blob storage connection (scoped credentials; one bucket/container per connection)
* Honor your cloud controls: IAM roles, key rotation, server-side encryption, access logs, retention
* The sink does not delete raw data; deletion flows through **Data Lake API** with soft-delete and trash retention

## Troubleshooting

* **Access denied**
  Verify the blob connection’s permissions: list, read, write, and delete on the bucket/container.
* **Nothing appears in Data Lake UI**
  Check sink logs for successful index writes; click **Refresh** in the UI; ensure time filters include the new data.
* **Small-file explosion**
  Increase `rollBytes` and/or `rollSeconds`, or add a replica to smooth throughput.
* **Slow uploads**
  Increase `maxInFlightUploads`, allocate more CPU/memory, and keep storage in the same region as Kafka.

## See also

* [Open format](../quixlake/open-format.md)
* [Quix Lake - User Interface](../quixlake/user-interface.md)
* [Quix Lake - Replay](./replay.md)
* [Blob storage connections](./blob-storage.md)

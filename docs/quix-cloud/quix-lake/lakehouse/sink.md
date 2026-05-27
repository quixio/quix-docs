---
title: Lakehouse Sink
description: Connector that persists Kafka data as Apache Iceberg tables in Quix Lakehouse.
---

# Lakehouse Sink

The Lakehouse Sink consumes a Kafka topic, writes time-partitioned **Parquet** files to your blob storage, and registers each write as an **Apache Iceberg table** snapshot — so the [Query](./query.md) engine can SQL over the table.

It is a separate connector from the [Data Lake Sink](../data-lake/sink.md). Choose this one when you want SQL access over your topic; choose Data Lake when you want byte-perfect replay.

## Prerequisites

* A [blob storage connection](../blob-storage.md) configured for the cluster
* A [Lakehouse](./overview.md) provisioned for that blob storage

## Configuration

The sink is a managed service. You configure it through the connector UI or in your pipeline YAML.

### Required

| Setting | Notes |
|---|---|
| `topic` | Kafka topic to consume. **The table name in the catalog is derived from the topic name.** |
| `timestampColumn` | Field in the payload used as the Iceberg time partition key |

### Partitioning

| Setting | Notes |
|---|---|
| `hiveColumns` | Additional partition columns (Hive-style) — typically a stream key or another high-cardinality dimension |

### Quix Streams / Kafka

| Setting | Default | Notes |
|---|---|---|
| `consumerGroup` | `quixstreams-default` | Use a unique group per sink |
| `autoOffsetReset` | `latest` | `latest` or `earliest` |
| `commitTimeInterval` | `60` | Seconds between offset commits |
| `commitMsgInterval` | `0` | Messages between commits (0 = disabled) |
| `logLevel` | `INFO` | `INFO` or `DEBUG` |

### Schema

The sink **auto-discovers the schema from incoming Kafka messages**. You don't supply one explicitly. Schema evolution follows Iceberg's standard rules (additive columns and nullable widening).

### Example YAML

```yaml
deployments:
  - name: Lakehouse - Sink
    application: Lakehouse.Sink
    version: latest
    deploymentType: Managed
    resources:
      cpu: 500
      memory: 1024
      replicas: 1
    configuration:
      topic: telemetry
      consumerGroup: lakehouse-sink-telemetry
      autoOffsetReset: latest
      timestampColumn: ts
      hiveColumns: deviceId
```

## What it writes

* **Parquet data files** on your blob storage, partitioned by time and any `hiveColumns` you set
* **Iceberg metadata** — table metadata files (snapshot, manifest list, manifests) committed via the catalog
* **Catalog updates** — each commit registers a new Iceberg snapshot

## Operational behavior

* **Offset commits** — committed after Parquet writes and catalog updates succeed (at-least-once delivery).
* **Ordering** — per Kafka partition.
* **Scaling** — increase replicas to parallelize by Kafka partitions; Iceberg's optimistic concurrency reconciles snapshot writes from multiple replicas.
* **Recovery** — restarts pick up from the last committed offset.

## Monitoring

* **Logs** — per-batch writes, catalog commits, retries
* **Metrics** — records persisted, bytes written, batches/sec
* **Lakehouse UI** — new partitions and snapshots surface immediately after the catalog commit

## Security

* Uses the cluster's [blob storage connection](../blob-storage.md).
* Authenticates against the catalog with a Quix-managed token — you don't configure it.
* Honors workspace boundaries enforced by Quix.

## Running alongside `DataLake.Sink`

The Lakehouse Sink and the [Data Lake Sink](../data-lake/sink.md) are independent connectors. To get both Replay (Data Lake) and SQL (Lakehouse) for the same topic, deploy one of each with **different consumer groups**. Each progresses at its own pace; storage cost roughly doubles for the topic.

## See also

* [Lakehouse overview](./overview.md)
* [Query](./query.md) — SQL engine that reads what this sink writes
* [UI](./ui.md)
* [Data Lake Sink](../data-lake/sink.md) — separate, replay-first alternative
* [Blob storage connections](../blob-storage.md)

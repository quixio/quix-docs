---
title: Lakehouse Sink
description: Connector that persists Kafka data as Parquet tables in Quix Lakehouse.
---

# Lakehouse Sink

The Lakehouse Sink consumes a Kafka topic, writes **Parquet** files in Hive-style `key=value/` folders to your blob storage, and registers each file in the [Catalog](./catalog.md) — so the [Query](./query.md) engine can SQL over the table.

It is a separate connector from the [Data Lake Sink](../data-lake/sink.md). Choose this one when you want SQL access over your topic; choose Data Lake when you want byte-perfect replay.

## Prerequisites

* A [Quix Lake connection](../blob-storage.md) configured for the cluster
* A [Lakehouse](./overview.md) on the main storage of your environment. After a [main storage move](../blob-storage.md#make-a-storage-the-main-storage), the Lakehouse stays on its storage. The sink then gets the Lakehouse variables only from a Lakehouse on the new main storage.

## Deploy the sink

The Lakehouse Sink is a normal deployment from the code sample **Quix Lakehouse Sink** (library item `lakehouse-sink`). It is not a managed application. You can start it in two ways:

* On the **Topics** page, open the menu of a topic and click **Persist topic**. In the dialog, choose **Lakehouse**.
* Open the **Connectors** library and select **Quix Lakehouse Sink**.

The sample binds to your blob storage (`blobStorage: bind: true`). The bind injects the storage credentials and the Catalog connection: `Quix__Lakehouse__Catalog__Url` and `Quix__Lakehouse__Catalog__AuthToken` (a secret). You don't configure these.

## Configuration

You configure the sink with environment variables.

### Required

| Variable | Notes |
|---|---|
| `input` | Kafka topic to consume |

### Table and partitioning

| Variable | Default | Notes |
|---|---|---|
| `TABLE_NAME` | the topic name | Table name in the catalog |
| `HIVE_COLUMNS` | empty (no partitioning) | Comma-separated partition columns. Each column becomes a `key=value/` folder. Use `year`, `month`, `day`, `hour` to partition by time from `TIMESTAMP_COLUMN`. Prefix a column with `~` (for example `~device_id`) to make it a virtual partition: it stays filterable but gets no folder |
| `TIMESTAMP_COLUMN` | `ts_ms` | Column with the timestamp that `year`, `month`, `day`, and `hour` come from |
| `SORT_COLUMN` | `TIMESTAMP_COLUMN` | Column that compaction sorts files by |
| `STATS_COLUMNS` | empty (all numeric and timestamp columns) | Columns to collect per-file min/max statistics for |
| `ROW_GROUP_ROWS` | `1000000` | Maximum rows per Parquet row group |

The sink records `HIVE_COLUMNS`, `TIMESTAMP_COLUMN`, and `SORT_COLUMN` on the table when it creates the table. A change to `HIVE_COLUMNS` on an existing table stops the sink at startup. The table keeps its first `TIMESTAMP_COLUMN` and `SORT_COLUMN`, and the sink ignores a change to them. To change the layout, use a new `TABLE_NAME`.

### Catalog

| Variable | Default | Notes |
|---|---|---|
| `AUTO_DISCOVER` | `true` | Register the table in the catalog on the first write |
| `CATALOG_NAMESPACE` | `default` | Catalog namespace of the table |

### Kafka and performance

| Variable | Default | Notes |
|---|---|---|
| `CONSUMER_GROUP` | `s3_direct_sink_v1.0` | Use a unique group per sink |
| `AUTO_OFFSET_RESET` | `earliest` | `earliest` or `latest` |
| `BATCH_SIZE` | `1000` | Messages per write. The sink also commits offsets after this many messages |
| `COMMIT_INTERVAL` | `30` | Seconds between writes and offset commits |
| `MAX_WRITE_WORKERS` | `10` | Files written to storage in parallel |
| `LOGLEVEL` | `INFO` | `DEBUG`, `INFO`, `WARNING`, `ERROR`, or `CRITICAL` |

### Schema

The sink **auto-discovers the schema from incoming Kafka messages**. You don't supply one explicitly. Each Parquet file keeps its own schema. See [Schema changes](./query.md#schema-changes).

## What it writes

* **Parquet data files** on your blob storage, at `<environment id>/data-lake/time-series/<table>/`, in one `key=value/` folder level for each `HIVE_COLUMNS` entry without a `~` prefix
* **Catalog updates** — after each write, the sink registers the new files with their partition values and min/max statistics

## Operational behavior

* **Offset commits** — committed after Parquet writes and catalog updates succeed (at-least-once delivery).
* **Ordering** — per Kafka partition.
* **Scaling** — increase replicas to parallelize by Kafka partitions. Each replica writes its own files and registers them in the catalog.
* **Recovery** — restarts pick up from the last committed offset.

## Monitoring

* **Logs** — per-batch writes, catalog registrations, retries
* **Metrics** — records persisted, bytes written, batches/sec
* **Lakehouse UI** — new partitions and files show after the sink registers them in the catalog

## Security

* Uses the cluster's [Quix Lake connection](../blob-storage.md).
* Authenticates against the catalog with a Quix-managed token from the blob storage bind — you don't configure it.
* Honors workspace boundaries enforced by Quix.

## Running alongside `DataLake.Sink`

The Lakehouse Sink and the [Data Lake Sink](../data-lake/sink.md) are independent connectors. To get both Replay (Data Lake) and SQL (Lakehouse) for the same topic, deploy one of each with **different consumer groups**. Each progresses at its own pace; storage cost roughly doubles for the topic.

## See also

* [Lakehouse overview](./overview.md)
* [Query](./query.md) — SQL engine that reads what this sink writes
* [UI](./ui.md)
* [Data Lake Sink](../data-lake/sink.md) — separate, replay-first alternative
* [Quix Lake connections and storages](../blob-storage.md)

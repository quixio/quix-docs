---
title: Lakehouse Catalog
description: How Quix Lakehouse tracks Apache Iceberg tables, schemas, snapshots, and statistics.
---

# Lakehouse Catalog

The **Catalog** is the source of truth for what exists in the [Lakehouse](./overview.md) — tables, schemas, partition specs, snapshots, and per-file statistics. The [Query](./query.md) engine uses it to plan SQL efficiently, and the [UI](./ui.md) uses it to list and browse tables without scanning storage.

The Catalog is a Quix-managed service. You don't deploy or configure it directly — it's provisioned alongside the rest of the Lakehouse for your blob storage connection.

## What it tracks

* **Namespaces and tables** — the table registry
* **Schemas** — column names, types, nullability; schema version history
* **Partition specs** — current and historical partitioning rules
* **Snapshots** — every commit creates a new snapshot; queries pin to one for a consistent view
* **File statistics** — per-file row counts, byte sizes, min/max per column (used by Query for file pruning)

The actual Parquet data lives in **your blob storage**. The Catalog only holds the index over it.

!!! info "Iceberg interop"
    Tables on disk are standard Apache Iceberg (Parquet data + manifest/snapshot files). External Iceberg-aware engines (Spark, Trino, DuckDB with the Iceberg extension) can read them directly from the bucket. The Catalog's REST surface is Quix-specific; it's not a drop-in for engines that expect the public Apache Iceberg REST catalog protocol.

## Who writes to it

* The [Lakehouse Sink](./sink.md) — every commit registers a new snapshot with updated files and statistics.

## Who reads it

* The [Query](./query.md) engine — for planning, pruning, and snapshot pinning
* The [UI](./ui.md) — via Query

## Concurrency and consistency

* **Optimistic concurrency** — concurrent sink replicas commit through Iceberg's snapshot mechanism.
* **Snapshot isolation** — readers see a consistent snapshot for the duration of a query.
* **Schema evolution** — Iceberg's standard rules apply (additive columns and nullable widening by default).

## Scope

The Catalog is **shared per blob storage connection**. All workspaces that use that connection share the same Catalog and its tables.

## See also

* [Lakehouse overview](./overview.md)
* [Lakehouse Sink](./sink.md)
* [Query](./query.md)
* [UI](./ui.md)

---
title: Lakehouse Catalog
description: How Quix Lakehouse tracks tables, schemas, files, and per-file statistics.
---

# Lakehouse Catalog

The **Catalog** is the source of truth for what exists in the [Lakehouse](./overview.md) — tables, schemas, partition specs, and the files of each table with their statistics. The [Query](./query.md) engine uses it to plan SQL efficiently, and the [UI](./ui.md) uses it to list and browse tables without scanning storage.

The Catalog is a file index in a Postgres database. It keeps one row for each Parquet file, plus the minimum and maximum values of each numeric and timestamp column in that file.

The Catalog is a Quix-managed service. You don't configure it directly. It is one of the Lakehouse services that an organization admin deploys. See [Deploy the Lakehouse](./overview.md#deploy-the-lakehouse).

## What it tracks

* **Namespaces and tables** — the table registry, with the storage location of each table
* **Schemas** — column names and types
* **Partition specs** — the `key=value/` folder columns of each table
* **Files** — one row for each Parquet file, with its path, size, row count, and partition values
* **File statistics** — min/max per numeric and timestamp column (used by Query for file pruning)

The actual Parquet data lives in **your object storage**. The Catalog only holds the index over it.

!!! info "Open files, not an open table format"
    The Lakehouse stores plain Parquet files in Hive-style `key=value/` folders. It does not write Apache Iceberg metadata, and the Catalog has no Iceberg REST API. Spark, Trino, DuckDB, and other engines cannot read a Lakehouse table as an Iceberg table. They can read the Parquet files directly from the bucket as a Hive-partitioned layout.

## Who writes to it

* The [Lakehouse Sink](./sink.md) — after each write, it registers the new files and their statistics.
* The [Query](./query.md) service — when you insert, delete, compact, or repartition data, it updates the file list.

## Who reads it

* The [Query](./query.md) engine — for planning and pruning
* The [UI](./ui.md) — via Query

## Concurrency and consistency

* **Concurrent writers** — each sink replica writes its own files and registers them in the Catalog. Registration adds rows; it does not replace the file list.
* **No version history** — the Catalog keeps only the current file list. Each query plans against the file list that the Catalog holds when the query starts.
* **Schema changes** — each Parquet file keeps its own schema. See [Schema changes](./query.md#schema-changes).

## Scope

Quix runs one Catalog **for each storage** that you deploy the Lakehouse on. Environments whose main storage is that storage share the same Catalog and its tables.

## See also

* [Lakehouse overview](./overview.md)
* [Lakehouse Sink](./sink.md)
* [Query](./query.md)
* [UI](./ui.md)

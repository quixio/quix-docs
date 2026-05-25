---
title: Lakehouse UI
description: Browse Iceberg tables, inspect schemas, and run SQL queries against Quix Lakehouse from the portal.
---

# Lakehouse UI

The **Lakehouse UI** lets you browse tables in your [Lakehouse](./overview.md), inspect their schemas and partitions, and run SQL queries — without leaving Quix Cloud.

Find it under the **Lakehouse** entry in the workspace sidebar.

## What you can do

* **List tables** registered in the catalog
* **Inspect schemas** — columns, types, nullability, partition specs
* **Browse partitions** — partition layout per table
* **Run SQL** — interactive editor with paged results, powered by the [Query](./query.md) engine (DuckDB dialect)
* **Open API docs** — link to the Query Swagger if you want to integrate from your own apps
* **Refresh** — manually refresh the table list and metadata

## Use cases

* Verify the [Lakehouse Sink](./sink.md) is writing the expected data
* Explore historical data interactively before building a pipeline or dashboard
* Spot-check schema changes after a producer update
* Diagnose slow queries by inspecting partition layout

## See also

* [Lakehouse overview](./overview.md)
* [Query](./query.md) — the SQL surface the UI calls
* [Lakehouse Sink](./sink.md)
* [Data Lake UI](../data-lake/user-interface.md) — replay-first counterpart

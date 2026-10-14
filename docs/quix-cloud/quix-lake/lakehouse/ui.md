---
title: Lakehouse UI
description: Browse tables, inspect schemas, and run SQL queries against Quix Lakehouse from the portal.
---

# Lakehouse UI

The **Lakehouse UI** lets you browse tables in your [Lakehouse](./overview.md), inspect their schemas and partitions, and run SQL queries — without leaving Quix Cloud.

Find it under the **Query Data** entry in the sidebar (route `/query-data`). If your environment uses a Space that curates its modules, the Space can hide this entry.

## What you can do

* **List tables** registered in the catalog
* **Inspect schemas** — columns, types, nullability, partition specs
* **Browse partitions** — partition layout per table
* **Run SQL** — interactive editor with paged results, powered by the [Query](./query.md) engine (DuckDB dialect)
* **Ask the AI chat** — ask questions about your tables in plain language
* **Compact and repartition** — open the menu of a table and click **Compact**, **Compaction schedule**, or **Repartition**. See [Compaction](./overview.md#compaction)
* **Connect** — get the Query API URL and the Python SDK details for your own apps
* **Refresh** — manually refresh the table list and metadata

## Tabs, panels, and dialogs

* **Tabs** — click **+** to open a new tab:
    * **SQL Query** — the SQL editor
    * **AI Chat** — a chat that can query your tables for you
    * **Documentation** — the Lakehouse documentation. The **Docs** button in the header opens it too
* **Panels** — the status bar at the bottom opens two panels:
    * **Tasks** — background tasks, such as a compaction or a repartition, with their progress
    * **Queries** — running and recent SQL queries. You can cancel a running query here
* **Dialogs**:
    * **Compact Files** — merge small files into larger files
    * **Repartition Table** — rewrite a table with new partition columns
    * **Connect** — open it from the status bar

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

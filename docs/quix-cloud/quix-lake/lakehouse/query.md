---
title: Lakehouse Query
description: SQL query engine over Quix Lakehouse Iceberg tables.
---

# Lakehouse Query

The **Query** service executes SQL against Iceberg tables registered in the [Catalog](./catalog.md), reading Parquet files directly from your blob storage. It's the read surface for the [Lakehouse](./overview.md) — used by the [UI](./ui.md) and by your own applications.

The engine is **DuckDB**, so the SQL dialect is standard DuckDB (Postgres-like, with DuckDB extensions).

## REST endpoints

Query exposes a small HTTP API over your Lakehouse's public URL:

| Endpoint | Purpose |
|---|---|
| `GET /tables` | List tables registered in the catalog |
| `GET /schema?table=<name>` | Schema (columns, types) for a table |
| `GET /partitions?table=<name>` | Partition layout for a table |
| `POST /query` | Run a SQL statement (body is SQL); returns rows |
| `GET /swagger` | OpenAPI spec for the above |

All calls require a bearer token; the [UI](./ui.md) handles auth for you. For programmatic access, retrieve your Lakehouse URL and token from the portal.

## SQL dialect

Supported out of the box:

* Standard aggregates and window functions (`AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, `ROW_NUMBER`, `LAG`, `LEAD`, …)
* Time helpers — `date_trunc`, `strftime`, `INTERVAL` arithmetic, `NOW()`
* Multi-table joins
* Aggressive Parquet pruning — DuckDB's columnar reader uses Iceberg statistics from the catalog to skip files that can't match your predicates

Not supported (use the alternatives below):

* TimescaleDB-style `time_bucket`, `gap_fill`, `last` — use `date_trunc` + window functions instead.

### Examples

```sql
-- Last hour of telemetry for one device
SELECT timestamp, temperature, humidity
FROM telemetry
WHERE deviceId = 'sensor-42'
  AND timestamp >= NOW() - INTERVAL '1 hour'
ORDER BY timestamp;

-- 5-minute rollup over a day
SELECT
  date_trunc('minute', timestamp)
    - (EXTRACT(minute FROM timestamp)::INT % 5) * INTERVAL '1 minute' AS bucket,
  AVG(temperature) AS avg_temp,
  MAX(temperature) AS max_temp
FROM telemetry
WHERE timestamp >= DATE '2026-05-20'
  AND timestamp <  DATE '2026-05-21'
GROUP BY bucket
ORDER BY bucket;
```

## How it works

1. Receives a SQL statement on the public URL.
2. Resolves table references against the [Catalog](./catalog.md).
3. Reads the current Iceberg snapshot, applies partition and column-statistics pruning to pick a minimal Parquet file set.
4. Reads Parquet from your blob storage; applies projection and filters at the columnar level.
5. Streams results back to the caller.

## Consistency

Queries see a consistent Iceberg snapshot for their duration. Concurrent sink commits don't change a query mid-flight.

## See also

* [Lakehouse overview](./overview.md)
* [UI](./ui.md) — interactive query editor in the portal
* [Lakehouse Sink](./sink.md)
* [Catalog](./catalog.md)

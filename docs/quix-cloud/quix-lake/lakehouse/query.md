---
title: Lakehouse Query
description: SQL query engine over Quix Lakehouse Parquet tables.
---

# Lakehouse Query

The **Query** service executes SQL against tables registered in the [Catalog](./catalog.md), reading Parquet files directly from your blob storage. It's the read surface for the [Lakehouse](./overview.md) — used by the [UI](./ui.md) and by your own applications.

The engine is **DuckDB**, so the SQL dialect is standard DuckDB (Postgres-like, with DuckDB extensions).

## REST endpoints

Query exposes a small HTTP API over your Lakehouse's public URL:

| Endpoint | Purpose |
|---|---|
| `GET /tables` | List tables registered in the catalog |
| `GET /schema?table=<name>` | Schema (columns, types) for a table |
| `GET /partitions?table=<name>` | Partition layout for a table |
| `GET /partition-values?table=<name>&column=<col>` | Distinct values of one partition column |
| `POST /query` | Run a SQL statement (body is SQL); returns rows as CSV by default |
| `POST /insert?table=<name>` | Insert rows (body is CSV) |
| `DELETE /delete?table=<name>` | Delete rows, partitions, or the table |
| `POST /compact?table=<name>` | Merge small files into larger files |
| `POST /repartition?table=<name>` | Rewrite a table with new partition columns |
| `GET /tasks` | List background tasks (for calls with `async=true`) |
| `GET /queries` | List running and recent queries |
| `GET /files/list`, `GET /files/info`, `GET /files/download`, `POST /files/upload` | Browse, download, and upload the files of a table |
| `GET /connect-info` | The Query API URL and SDK details for external clients |
| `POST /chat` | Send one message to the AI chat |
| `GET /swagger` | OpenAPI spec for the API |

All calls require a bearer token; the [UI](./ui.md) handles auth for you. For programmatic access, open the **Connect** dialog in the [UI](./ui.md) to get your Query API URL. Send a Quix token, for example a personal access token, as the bearer token.

Write calls (`/insert`, `/delete`, `/compact`, `/repartition`, `/files/upload`) also need write access. They work only on tables in your own environments.

### Response format

`POST /query` returns CSV (`text/csv`) by default. To get an Arrow IPC stream, add `?format=arrow` or send the header `Accept: application/vnd.apache.arrow.stream`.

```bash
curl -X POST "$API_URL/query" -H "Authorization: Bearer $TOKEN" \
     -H "Accept: application/vnd.apache.arrow.stream" \
     --data-binary "SELECT * FROM telemetry LIMIT 10" -o result.arrows
```

## SQL dialect

Supported out of the box:

* Standard aggregates and window functions (`AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, `ROW_NUMBER`, `LAG`, `LEAD`, …)
* Time helpers — `date_trunc`, `strftime`, `INTERVAL` arithmetic, `NOW()`
* Multi-table joins
* Aggressive Parquet pruning — the Query service uses partition folders and per-file min/max statistics from the catalog to skip files that can't match your predicates

Not supported:

* TimescaleDB-style `gap_fill` and the two-argument `last(value, time)`. DuckDB has `time_bucket` and a one-argument `last()`. Use `arg_max(value, time)` to get the latest value by time.

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
2. Checks which environments and folders your token can access. The query reads only files in those places. See [Security](./overview.md#security).
3. Resolves table references against the [Catalog](./catalog.md), and applies partition and column-statistics pruning to pick a minimal Parquet file set.
4. Reads Parquet from your blob storage; applies projection and filters at the columnar level.
5. Streams results back to the caller.

## Consistency

Each query plans against the file list that the Catalog holds when the query starts. The Lakehouse keeps no version history of a table.

## Schema changes

Each Parquet file keeps its own schema. When the files of one table have different columns, add `?union_by_name=true` to `POST /query`. A column that a file does not have then reads as `NULL`.

## See also

* [Lakehouse overview](./overview.md)
* [UI](./ui.md) — interactive query editor in the portal
* [Lakehouse Sink](./sink.md)
* [Catalog](./catalog.md)

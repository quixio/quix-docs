---
title: Write to a bridge from a sink
description: Make the bridge storage the main storage of the connection, so the Data Lake Sink, the Lakehouse Sink and your own sinks write to the machine.
---

# Write to a bridge from a sink

A sink binds the **main storage** of the connection. This applies to the managed [Data Lake Sink](../data-lake/sink.md), the [Lakehouse Sink](../lakehouse/sink.md), and a Quix Streams sink in your own deployment with `blobStorage: bind: true`. So a sink writes to a bridge only when the bridge storage is the main storage.

## Steps

1. Set the [bucket root](./shared-folders.md#the-bucket-root) in the bridge console, on the **Folders** tab.
2. In the Portal, open **Settings → Quix Lake** and select the connection.
3. Open the **Storages** tab. On the bridge storage, open the `⋮` menu and click **Make this the main storage**.
4. Deploy the sink. A managed sink uses the connection by itself. For your own service, bind the storage in the **Advanced** tab of the deployment, or in `quix.yaml`:

    ```yaml
    deployments:
      - name: my-sink
        application: my-sink
        blobStorage:
          bind: true
    ```

!!! note "Where the data lands"
    The sink writes into the bucket root folder on the bridge machine, under `<workspaceId>/`. For example, with the bucket root `D:\QuixData`, a Data Lake Sink writes to `D:\QuixData\<workspaceId>\data-lake\raw\...`.

The Portal refuses **Make this the main storage** on a bridge storage until the bridge has a bucket root. The main storage must answer at all times, so keep the bridge machine online. See [Make a storage the main storage](../blob-storage.md#make-a-storage-the-main-storage) for what the move changes.

## Write to a bridge that is not the main storage

A sink cannot do this. Use an S3 client such as boto3, the AWS CLI or DuckDB, and put the storage folder first in the key. See [Write to another storage by key](../s3-endpoint.md#write-to-another-storage-by-key).

## Next steps

* [Data Lake Sink](../data-lake/sink.md) — persist topics as Avro plus a Parquet index
* [Lakehouse Sink](../lakehouse/sink.md) — persist topics as queryable Parquet tables
* [Quix Lake connections and storages](../blob-storage.md) — what a main storage move changes

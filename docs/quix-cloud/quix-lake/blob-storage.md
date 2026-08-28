---
title: Quix Lake connections and storages
description: Connect your cluster to object storage (S3, GCS, Azure Blob, MinIO) to enable Quix Lake, then add more storages behind the same connection.
---

# Quix Lake connections and storages

Connect your cluster to a bucket or container so Quix can enable **[Quix Lake](./overview.md)**, the Data Lake, the Lakehouse, or any other managed service that needs storage. One connection can then hold several storages, and your code still sees a single bucket.

![Connections list](../../images/blob-storage/connections-list-running.png)

!!! important "One connection per cluster"
    Each **cluster** supports **one** Quix Lake connection.
    You can configure different connections for different clusters.
    Both the [Data Lake Sink](./data-lake/sink.md) and the [Lakehouse Sink](./lakehouse/sink.md) use this same connection.

    One shared connection doesn't mean one shared view of the data: each team only sees its own data, and the bucket's keys stay locked away. See the [Storage Access Gateway](./secure-storage-access.md).

???+ info "Quix Lake at a glance"
    Quix Lake is the persistence layer of Quix Cloud. It ships in two flavors that share this connection:

    - **[Data Lake](./data-lake/overview.md)** — raw Kafka messages in Avro plus a Parquet index. Replay-first, byte-perfect.
    - **[Lakehouse](./lakehouse/overview.md)** — columnar Parquet tables registered in a catalog. Query-first, SQL-ready.

    Run one, the other, or both — see the [Quix Lake overview](./overview.md) for how to choose.

## Create a connection

1. Open **Settings → Quix Lake** and click **Create**.
2. Pick **Cluster**, set **Display name**, choose **Provider**, and fill the fields.
3. Click **Test connection**, described below.
4. Click **Save**.

The bucket you name here becomes the **main storage** of the connection. It is the root of everything your code sees.

## Test before saving

![Testing connection](../../images/blob-storage/test-connecting.png)

When you click **Test connection**, Quix runs a short round-trip check to confirm your details are correct and that the platform can both see and use your storage.

Here is what happens:

1. **Connect** — Quix creates a storage client from the details you entered.
2. **Upload** — Quix writes a small temporary file into a `tmp/` folder in your bucket or container.
3. **Check visibility** — Quix confirms the file shows up in the storage listing.
4. **Query** — Quix runs a simple check to confirm the file is discoverable for later Quix Lake operations.
5. **Clean up** — Quix deletes the temporary file, so your storage stays tidy.

The dialog shows each step. A successful step carries a ✓, and you get a confirmation when every step passes.

If a step fails, you see ✗ next to it with the reason, such as "Access denied" or "Wrong region". Use the reason to fix the permissions or correct your settings.

![Access denied example](../../images/blob-storage/test-error.png)

## Providers

=== "Amazon S3"

    1. Log in to the **AWS Management Console**.  
    2. Go to **IAM**.  
    3. Open **Users**.  
    4. Select an existing user or click **Add user** to create a new one.  
    5. **Permissions**  
       - In the **Permissions** tab, attach a policy that allows bucket access.  
    6. **Security credentials**  
       - Open the **Security credentials** tab.  
       - Click **Create access key**.  
    7. **Save credentials**  
       - Copy the **Access Key ID** and **Secret Access Key**. The secret appears only once.  
    8. Copy the information into the Quix S3 form.  
    9. Click **Test Connection**.  

=== "Google Cloud Storage (GCS)"

    1. **Ensure access**  
       - Have Google Cloud project owner or similar permissions where your bucket resides or will be created.  
       - Create a service account and assign it to the bucket with read and write rights, such as `roles/storage.objectAdmin`, or equivalent minimal object roles.  
    2. **Open Cloud Storage settings**  
       - In the Google Cloud Console, go to **Storage → Settings**.  
    3. **Interoperability tab**  
       - Select **Interoperability**.  
       - If disabled, click **Enable S3 interoperability**.  
    4. **Create (or view) keys**  
       - Under **Access keys for service accounts**, click **Create key** and follow the process to assign one to the service account.  
    5. **Save credentials**  
       - Copy the **Access key** and **Secret**. The secret is shown only once.  
       - Paste this information into the Quix S3 connector form.  
    6. Click **Test Connection**.  


=== "Azure Blob Storage"

    1. **Ensure access**  
       - Your Azure user must have at least the **Storage Blob Data Contributor** role, or higher.  
       - Open the **Azure Portal** and go to your **Storage account**.  
    2. **Navigate to credentials**  
       - In the left menu, expand **Security + networking**.  
       - Click **Access keys**.  
    3. **Copy credentials**  
       - Note the **Storage account name**.  
       - Copy **Key1** or **Key2**.  
       - Paste the information into the Quix Azure Blob connector form.  
    4. Click **Test Connection**.  

=== "MinIO (S3-compatible)"

    1. **Ensure access**  
       - Your MinIO user or role must include permissions to create and list access keys, such as `consoleAdmin` or a custom PBAC policy.  
    2. **Log in** to the MinIO Console.  
    3. **Go to Access keys**  
       - Select **Access keys** in the left menu.  
    4. **Create a new key**  
       - Click **Create access key** to generate an **Access Key** and **Secret Key**.  
    5. **Save credentials**  
       - Copy the **Access Key** and **Secret Key**. The secret is shown only once.  
    6. Copy the information into the Quix MinIO connector form.  
    7. Click **Test Connection**.  

## Add a storage

A cluster still holds one connection, but that connection can serve more than one bucket. Each storage you add appears to your code as **one folder at the root of the same bucket**, so nothing on the client side changes: the same endpoint, the same credential, one namespace.

Add a storage when you want data in a different bucket, region, or provider without giving your services a second connection to manage.

To add one:

1. Open **Settings → Quix Lake** and select the connection.
2. Open the **Storages** tab.
3. Click **Add storage**.
4. Set a **Display name**, a **Storage name**, and the **Provider** with its credentials.
5. Click **Test connection**, then **Save**.

The **Storages** tab lists every storage on the connection, with its root folder and its provider. The main storage carries a **Main** badge, shows `/` as its root folder, and you cannot delete it from this tab.

### Storage name rules

The storage name is the folder your code sees at the root of the bucket, so Quix constrains it:

* It starts with a lowercase letter or a digit, then holds only lowercase letters, digits, and `-`.
* It is 1 to 63 characters long.
* It must not take the shape of an environment id. That rule keeps an environment's own folder unambiguous.
* It must be unique on the connection.
* It must not hide a folder that already exists at the root of the main storage. Quix runs that check when you save and rejects a name that would.

!!! note "Quix runs the folder check once"
    Quix checks for a clashing folder at the moment you add the storage. If someone later creates a folder at the bucket root with the same name, the storage answers that path from then on, and the folder stays in your bucket but clients no longer reach it.

!!! warning "The storage name is fixed"
    You cannot change a storage name after you create the storage. To change it, delete the storage and create it again. Every path your code holds carries that name, so pick it with care.

### What your code sees

With a storage named `archive` added to a connection whose bucket is `<bucket>`:

```text
<bucket>/                    one merged listing across every storage
<bucket>/<workspaceId>/      an environment's data in the main storage
<bucket>/archive/            the storage named archive
```

A listing at the bucket root returns keys from every storage, in order, with no duplicates and no gaps. Read [S3-compatible endpoint](./s3-endpoint.md) for the client-side detail, and [Storage Access Gateway](./secure-storage-access.md) for who may see what.

### Delete a storage

Delete a storage from the **Storages** tab. Quix refuses the delete while a service or a credential still uses that storage, and it refuses to delete the main storage while other storages remain. Deleting a storage removes it from the connection. Your data stays in your own bucket.

## Variables injected into bound deployments

When a deployment — or a [dev session](../applications/dev-sessions/overview.md) — binds to this connection, Quix injects the storage as a secret:

| Variable | Description |
|----------|-------------|
| `Quix__BlobStorage__Connection__Json` | The bound storage as a JSON document — the endpoint plus the credentials and the bucket. Injected as a secret, so values stay hidden in logs and the UI. |

Your code reads this one variable and deserializes it to connect to the storage. See [Quix Lake storage](../deployments/blob-storage-and-library.md) for how to read it in Python.

When [Quix Lake](./overview.md) is enabled, Quix injects the Lakehouse endpoints too, so your code reaches the Catalog and Query services without hard-coded URLs:

| Variable | Description |
|----------|-------------|
| `Quix__Lakehouse__Catalog__Url` | The Catalog URL, the preferred name. Quix also injects it as `CATALOG_URL`, the legacy PyIceberg alias, and as `QUIX_LAKE_URL`, the QuixLake and QuixLab alias. |
| `Quix__Lakehouse__Catalog__AuthToken` | Authenticates your code's requests to the Catalog. Pair it with `Quix__Lakehouse__Catalog__Url`. Quix injects it only under the `Quix__` name, as a secret. |
| `Quix__Lakehouse__Query__Url` | The Query URL. |
| `Quix__Lakehouse__Query__AuthToken` | Authenticates your code's requests to the Query service. Pair it with `Quix__Lakehouse__Query__Url`. Injected as a secret. |

See [Quix variables](../deployments/quix-variables.md) for the full list of variables the platform injects into deployments.

## Security and operations

* Use a dedicated principal per storage — an IAM user, a service account, or a MinIO user.
* Scope each credential to **one** bucket or container.
* Rotate keys regularly and store secrets securely.
* Consider server-side encryption and access logging.

## Next steps

* [Storage explorer](./storage-explorer.md) — browse and manage files in the Portal
* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how to choose between Data Lake and Lakehouse
* [Data Lake Sink](./data-lake/sink.md) — persist topics as Avro plus a Parquet index
* [Lakehouse Sink](./lakehouse/sink.md) — persist topics as queryable Parquet tables

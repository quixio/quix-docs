---
title: Quix Lake connections and storages
description: Connect your cluster to object storage (S3, GCS, Azure Blob, MinIO) to enable Quix Lake, then add more storages behind the same connection.
---

# Quix Lake connections and storages

Connect your cluster to a bucket or container so Quix can enable **[Quix Lake](./overview.md)**, the Data Lake, the Lakehouse, or any other managed service that needs storage. One connection can then hold several storages. Your clients address **one bucket**, and each storage is a **folder** inside it.

![Connections list](../../images/blob-storage/connections-list-running.png)

!!! important "One connection per cluster and node group"
    Each **cluster and node group** pair supports **one** Quix Lake connection. The Portal names a connection by that pair.
    You can configure different connections for different pairs.
    One connection still holds as many storages as you need, so a second storage needs no second connection.
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

The page lists every cluster in your organization. A cluster without a connection shows a **Not connected** badge, so you can see at a glance where Quix Lake is still to set up.

The bucket you name here becomes the **main storage** of the connection. Its name becomes the **shared bucket**, the one bucket name your code uses. A storage you add later never moves it, because a new storage becomes a folder inside that same bucket.

You can change both facts later. An administrator can [rename the storage](#rename-a-storage), and an administrator can [make another storage the main storage](#make-a-storage-the-main-storage). The two are separate: a rename moves the folder of one storage, and a main storage move changes no folder at all.

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

## Edit a connection

Open a connection from **Settings → Quix Lake** to change it.

The **Access key** and the **Secret** are optional when you edit. Leave both empty and Quix keeps the keys it already holds. Fill them in only when you rotate the credentials.

Quix asks you to test again only when you change a field that reaches the storage, such as the endpoint, the bucket, or the credentials. A change to a display name saves at once.

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

A cluster still holds one connection, but that connection can serve more than one storage. Your clients keep addressing **one bucket**, the shared bucket, and each storage is a **folder** inside it. The name you give a storage is that folder name. So a client reaches a second storage by putting the folder first in the key, on the same endpoint and with the same credential.

```text
s3://<sharedBucket>/<storage>/<key>
```

Each storage keeps its own bucket or container and its own credentials behind the gateway. One bucket name in your code can therefore hide several providers.

Add a storage when you want data in a different bucket, region, or provider. You give your services no second connection to manage.

To add one:

1. Open **Settings → Quix Lake** and select the connection.
2. Open the **Storages** tab.
3. Click **Add storage**.
4. Set a **Display name**, a **Storage name**, and the **Provider** with its credentials.
5. Click **Test connection**, then **Save**.

The **Storages** tab lists every storage on the connection. Each row shows the folder name your clients use and the provider behind it. The main storage carries a **Main** badge. The `⋮` menu holds **Edit storage** and **Delete storage**.

!!! note "A new storage never moves an old one"
    A storage you add changes nothing about the storages that are already there. The shared bucket keeps its name, and every path to it keeps working. A customer with one storage sees no change at all.

### Storage name rules

The storage name is a folder name at the root of the shared bucket, and Quix applies the bucket rules to it:

* It is 3 to 63 characters long.
* It starts with a lowercase letter or a digit.
* It then holds only lowercase letters, digits, and `-`.
* It is unique on the connection. Two storages cannot share one folder.
* It cannot start with your organization ID and a hyphen. Every environment ID starts that way, and the [environment shortcut](#the-environment-shortcut) needs that shape.

Quix also refuses a name when a folder of that name **already exists** in the main storage. The new storage would hide that folder, and the objects in it could no longer be reached. Pick another name, or move the folder first.

The main storage may sit at the root of the shared bucket, or take a folder of its own. A connection starts with its main storage at the root, so an existing connection needs no change, and an administrator can give it a folder later.

Every storage may take a name of its own, the main storage included. The Portal calls the field the **SAG bucket name**, and the **Storages** tab shows it in a column of that name. The value is the storage's folder in the shared bucket. A storage with no name is not automatically the main storage: the **Main** badge marks the main storage, and nothing else does.

### Rename a storage

You can rename a storage after you create it. Open **Edit storage** from the `⋮` menu on the **Storages** tab. Change the **Storage name** field. The display name is a label for the Portal only, so a change to it moves nothing.

!!! warning "A rename moves the folder every client uses"
    The name is the folder, so a rename moves the whole storage to another folder of the shared bucket. The bucket name does not change. The old folder stops working at once: there is no alias and no grace period.

    ```text
    s3://quixdevbucket/minio/reports/day.csv      before the rename
    s3://quixdevbucket/archive/reports/day.csv    after a rename to archive
    ```

    Quix moves the permissions of the storage with it, in every store that holds them, so nobody loses access and no grant stays behind on the old folder.

    A rename also stops every multipart upload that is still running. Quix shows a warning before it saves the rename. Update your code, your saved paths, and your sink configuration first.

    A deployment needs no redeploy for the bucket name, because the bucket name does not change. It does need a code change, because the folder in its keys changes. Code that still addresses the storage by [its old bucket name](#the-old-per-storage-bucket-name) breaks at once and must redeploy.

### Make a storage the main storage

Any storage on the connection can become the main storage. Open the `⋮` menu on the **Storages** tab and click **Make this the main storage**. Quix asks you to type a word to confirm.

The move changes these things:

* **Every storage keeps its folder.** The promoted storage answers under the same folder name as before, and so does the old main storage. **No running client of either storage breaks.**
* **The shared bucket changes its name.** It takes the name of the bucket or container behind the promoted storage. Quix writes that name into a deployment at deploy time, so a service picks it up on its next deploy.
* **The environment path moves.** `s3://<workspaceId>/` reaches the promoted storage from that moment. See [The environment shortcut](#the-environment-shortcut) below.
* **Your services stay where their data is.** The Data Lake and the Lakehouse keep the storage that holds their tables. Quix never moves a running service to a storage that holds none of its history.

Quix copies **no** data. A read of `s3://<workspaceId>/` answers empty until you copy the environment folders into the new main storage yourself.

!!! warning "Copy the data before you rely on the new main storage"
    A main storage move is a two-part job, and Quix only does the first part. Before you move the main storage:

    1. Announce the change and stop writes.
    2. Copy every environment folder from the old main storage to the new one. Check the file counts and the byte totals.
    3. Move the main storage in the Portal.
    4. Read, write, and list through `s3://<workspaceId>/` to confirm the new main storage answers.
    5. Keep the old storage on the connection until every check passes.

    To go back, make the old storage the main storage again. Quix has no undo button.

### The environment shortcut

An environment's data lives in a folder named after the environment ID, inside the **main storage**:

```text
s3://quixdevbucket/<workspaceId>/    the real location, inside the main storage
s3://<workspaceId>/                  the same data, addressed by the shortcut
```

Both addresses reach the same objects, and every operation answers the same through either one. Use whichever suits your code. A key you read through `s3://<workspaceId>/` drops its `<workspaceId>/` lead.

If an administrator gives the main storage a folder of its own, the folder address works too, and all three reach the same objects:

```text
s3://quixdevbucket/principal/<workspaceId>/   the main storage in the folder principal
s3://quixdevbucket/<workspaceId>/             the same data, without the folder
s3://<workspaceId>/                           the same data, through the environment shortcut
```

The shortcut always follows the main storage. It works only for an environment ID. Any other bucket name that names no storage answers `404 NoSuchBucket`.

A deployment binds the **connection**, not one storage, so its credential always reaches the shortcut. What it may read and write inside the shared bucket still follows the [Storage Access Gateway](./secure-storage-access.md) rules.

### What your code sees

Take a connection whose main storage is the bucket `quixdevbucket`. An administrator adds a MinIO storage, names it `minio`, and points it at the real bucket `archive-bucket`:

```text
s3://quixdevbucket/<workspaceId>/               an environment's data in the main storage
s3://<workspaceId>/                             the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/2026-08.csv    a file in the storage named minio
```

Your clients keep one bucket name, `quixdevbucket`, before the add and after it. The added storage answers under the folder `minio`. Its real bucket name, `archive-bucket`, and its credentials stay hidden from your clients.

The gateway takes the folder off the key before it calls the storage behind it. Everything after the folder travels unchanged, so an object you write to `minio/reports/2026-08.csv` lands at `reports/2026-08.csv` in `archive-bucket`. The [environment shortcut](#the-environment-shortcut) works the same way for the main storage.

A **LIST at the root of the shared bucket** names every storage you may reach, as a folder. The gateway merges the answer across the storages behind it, in key order and with paging, so one listing can cross storages.

!!! warning "ListBuckets now answers one bucket"
    **ListBuckets** used to answer one bucket per storage. It now answers the **one** shared bucket. Any tool you point at the [S3 endpoint](./s3-endpoint.md) sees that change.

    To discover the storages, list the root of the shared bucket with `delimiter=/` and read the folders, browse the [storage explorer](./storage-explorer.md), or ask the Portal API.

#### The old per-storage bucket name

Before this change, each storage was a bucket of its own, and clients addressed a storage by its name as a bucket name. Quix keeps that address working for the change-over, so no code breaks the day an administrator adds a storage.

```text
s3://minio/reports/2026-08.csv                  the old address, kept for now
s3://quixdevbucket/minio/reports/2026-08.csv    the address to use
```

Move your code to the folder address. The old address stays only for the change-over, and a [rename](#rename-a-storage) breaks it at once.

Read [S3-compatible endpoint](./s3-endpoint.md) for the client-side detail. Read [Storage Access Gateway](./secure-storage-access.md) for who may see what.

### Delete a storage

Open **Delete storage** from the `⋮` menu on the **Storages** tab. Quix refuses the delete while a service or a credential still uses that storage. Quix also refuses to delete the main storage while other storages remain. Deleting a storage removes it from the connection. Your data stays in your own bucket.

## Variables injected into bound deployments

When a deployment — or a [dev session](../applications/dev-sessions/overview.md) — binds to this connection, Quix injects the connection as a secret:

| Variable | Description |
|----------|-------------|
| `Quix__BlobStorage__Connection__Json` | The bound connection as a JSON document — the endpoint plus the credentials and the bucket. The bucket is the shared bucket. Injected as a secret, so values stay hidden in logs and the UI. |

The document keeps the shape it always had. Only the bucket name in it can change, and it changes only when an administrator [makes another storage the main storage](#make-a-storage-the-main-storage).

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

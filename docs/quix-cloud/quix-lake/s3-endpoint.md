---
title: S3-compatible endpoint
description: Reach your Quix Lake data from an S3 client with one endpoint, one credential, and one bucket that holds every storage as a folder.
---

# S3-compatible endpoint

The [Storage Access Gateway](./secure-storage-access.md) presents your [Quix Lake](./overview.md) data as an **S3-compatible endpoint**. S3 clients such as boto3, the AWS CLI, `s3fs` and DuckDB read and write through it, with path-style addressing.

The endpoint is the same whichever provider sits behind the connection. Your code targets S3, so the same code works against Amazon S3, Google Cloud Storage, Azure Blob Storage, MinIO, or a [Quix Lake Bridge](./bridge/overview.md).

!!! tip "Reading files in Python?"
    Inside a deployment, the `quixportal` library reads the injected credentials for you and returns a filesystem. See [Quix Lake storage](../deployments/blob-storage-and-library.md).

## Get the endpoint and a credential

You need the endpoint, the Quix Lake bucket, and a credential. There are two ways to get them.

=== "In a deployment or a dev session"

    Bind a [Quix Lake storage](../deployments/blob-storage-and-library.md) to the deployment or the [dev session](../applications/dev-sessions/overview.md). Quix injects the endpoint and a scoped access key as the secret `Quix__BlobStorage__Connection__Json`:

    ```json
    {
      "Provider": "S3Compatible",
      "S3Compatible": {
        "BucketName": "<your_bucket>",
        "AccessKeyId": "<your_access_key_id>",
        "SecretAccessKey": "<your_secret_access_key>",
        "Region": "<region>",
        "ServiceUrl": "https://<your_storage_gateway_endpoint>"
      }
    }
    ```

    `ServiceUrl` is the endpoint, and `BucketName` is the Quix Lake bucket. `Region` is the region of the storage, or `us-east-1` when the storage has none. The key reaches what the deployment may reach, and your real bucket credentials never leave Quix.

=== "From your own machine, with a PAT"

    Use a personal access token (PAT) to reach Quix Lake from your own machine or from a tool outside a deployment.

    1. In the Portal, open the Quix Lake connection page and click the **Connect** row, or the **S3 endpoint** row on the **Quix Lake Services** tab. Both open the **Connect to Quix Lake** dialog. The **S3** tab shows the **Endpoint**, the **Bucket**, the **Region** and your **Access key (your user id)**. It also has snippets for boto3, aws-cli and duckdb. The **Query API** tab shows the query address.
    2. Create a PAT under your user settings. Set a short expiry, and keep the PAT secret. A PAT acts as you, and a PAT with a smaller scope reaches less.
    3. Set three fields on your S3 client:

        | Field | Value |
        |---|---|
        | **Access key** | Your Quix user ID |
        | **Secret key** | Your PAT |
        | **Session token** | The same PAT, again |

    Most S3 clients send the session token by themselves once you set it.

    !!! warning "Set the session token too"
        Without the session token, every call fails with `403 InvalidAccessKeyId`. Set the PAT as the secret key **and** as the session token. In boto3 this is `aws_session_token`. In the AWS CLI this is `AWS_SESSION_TOKEN`. See [Connect a client](#connect-a-client).

## Connect a client

Every client needs **path-style** addressing. The examples use a PAT. In a deployment, use the injected key and leave the session token out.

=== "boto3"

    ```python
    import boto3

    s3 = boto3.client(
        "s3",
        endpoint_url="https://<ENDPOINT>",
        aws_access_key_id="<your-user-id>",
        aws_secret_access_key="<your-pat>",
        aws_session_token="<your-pat>",
        region_name="us-east-1",
        config=boto3.session.Config(s3={"addressing_style": "path"}),
    )

    s3.list_objects_v2(Bucket="<BUCKET>", Prefix="<workspaceId>/")
    ```

=== "AWS CLI"

    ```bash
    export AWS_ACCESS_KEY_ID=<your-user-id>
    export AWS_SECRET_ACCESS_KEY=<your-pat>
    export AWS_SESSION_TOKEN=<your-pat>

    aws s3 ls s3://<BUCKET>/<workspaceId>/ \
      --endpoint-url https://<ENDPOINT> \
      --region us-east-1
    ```

    Set path-style addressing in `~/.aws/config`:

    ```ini
    [default]
    s3 =
        addressing_style = path
    ```

=== "DuckDB"

    ```sql
    INSTALL httpfs;
    LOAD httpfs;

    SET s3_endpoint = '<ENDPOINT>';
    SET s3_region = 'us-east-1';
    SET s3_access_key_id = '<your-user-id>';
    SET s3_secret_access_key = '<your-pat>';
    SET s3_session_token = '<your-pat>';
    SET s3_url_style = 'path';

    SELECT * FROM read_parquet('s3://<BUCKET>/<workspaceId>/<key>');
    ```

The gateway refuses virtual-host-style addressing, such as `https://<your_bucket>.<host>/<key>`, with `400 InvalidRequest`. Use `https://<host>/<your_bucket>/<key>`.

## One bucket, several storages

A connection can hold more than one storage. Your client still addresses **one bucket**, the Quix Lake bucket, and **each storage is a folder** inside it. The **Folder** an administrator sets on a storage is that folder name. Only the **main storage** may sit at the **root** of the bucket, so every other storage has a folder. Put the folder first in every key:

```text
s3://<connectionBucket>/<storage>/<key>
```

Take a connection whose Quix Lake bucket is `quixdevbucket`. An administrator adds a MinIO storage with the folder `minio`, backed by the provider bucket `archive-bucket`:

```text
s3://quixdevbucket/<workspaceId>/               an environment's data in the main storage
s3://<workspaceId>/                             the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/2026-08.csv    a file in the storage minio
```

Your client needs no second bucket and no second credential to reach a second storage. Quix takes the storage folder off the key before it calls the storage behind it, so a PUT to `minio/reports/2026-08.csv` lands at `reports/2026-08.csv` in `archive-bucket`.

The main storage may take a folder of its own too. Both addresses then reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="principal/<workspaceId>/reports/day.csv")
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
```

??? info "The storage name as a bucket name"
    A client can also address a storage by its name as a bucket name, for example `s3://minio/reports/2026-08.csv`. This old address still works, so old code keeps running. Move your code to the folder address. Do not build new code on the old address. A rename breaks it at once.

### The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the main storage. Both addresses reach the same objects, and a key under the shortcut drops its `<workspaceId>/` lead:

```python
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
s3.get_object(Bucket="<workspaceId>",  Key="reports/day.csv")
```

Every object and listing operation answers the same through either address. The shortcut serves objects, not bucket metadata. A request that names the shortcut and carries no key answers `501 NotImplemented` when it asks for bucket metadata. This covers `?acl`, `?location`, another bucket subresource, and a multipart create, complete or abort without a key. Use the full `s3://<mainBucket>/` address for those.

The shortcut takes an environment ID only, and it always points at the current main storage.

### Write to another storage by key

A deployment with `blobStorage: bind: true` gets one credential, scoped to its own environment. That credential reaches every storage of the connection, through the key you write to:

* `<storage>/<workspaceId>/...` writes to the storage whose folder is `<storage>`.
* `<workspaceId>/...`, with no storage name, writes to the main storage.

Your environment folder stays in every case. A key in another environment, such as `<storage>/<otherWorkspaceId>/...`, answers `403 AccessDenied`. An unknown storage name answers `403 AccessDenied` too, and nothing lands in the main storage instead.

This works with an S3 client such as boto3, the AWS CLI or DuckDB. Quix injects the environment ID as `Quix__Workspace__Id`, so your code can build the key:

```python
import os

workspace = os.environ["Quix__Workspace__Id"]
data = b"day,value\n2026-08-01,42\n"

# The main storage, in this environment's folder
s3.put_object(Bucket="<your_bucket>", Key=f"{workspace}/reports/day.csv", Body=data)

# The storage whose folder is archive, in this environment's folder
s3.put_object(Bucket="<your_bucket>", Key=f"archive/{workspace}/reports/day.csv", Body=data)
```

!!! note "A sink writes to the main storage"
    The managed Data Lake Sink, the Lakehouse Sink, and the Quix Streams file sink write to the **main storage** of the connection. They cannot write to another storage by key today. To point a sink at a [Quix Lake Bridge](./bridge/overview.md), make the bridge storage the main storage. See [Write to a bridge from a sink](./bridge/sinks.md).

### List the storages

A LIST at the root of the Quix Lake bucket names every storage you may reach, as a folder. Ask for `delimiter="/"` and read the common prefixes:

```python
answer = s3.list_objects_v2(Bucket="quixdevbucket", Delimiter="/")
for folder in answer.get("CommonPrefixes", []):
    print(folder["Prefix"])          # "minio/", "archive/", ...
```

Drop the delimiter, and Quix merges the storages into **one** listing, in key order and with paging. Pass the `NextContinuationToken` back as you got it.

!!! note "A whole-bucket listing needs every bridge online"
    A LIST of the whole bucket, with no prefix and no delimiter, answers `503 Service Unavailable` while a [Quix Lake Bridge](./bridge/overview.md) that serves one of the storages is away. This is on purpose. A sync tool never takes a short listing as deleted files. List each storage folder with a prefix, such as `Prefix="minio/"`. The root listing with `Delimiter="/"` still works.

!!! warning "A deployment credential cannot list the bucket root"
    A root LIST works with a PAT, in a dev session, and with a credential that holds a grant on the root. The credential of a bound deployment holds a grant on its own environment folder only. So a root LIST answers `403 AccessDenied`. List your own folder instead, such as `Prefix="<workspaceId>/"` or `Prefix="archive/<workspaceId>/"`.

`ListBuckets` answers the **one** Quix Lake bucket. A tool that builds its storage list from `ListBuckets` shows one entry. Use the root listing instead, browse the [File Explorer](./file-explorer.md), or ask the Portal API.

### When an administrator changes a storage

| Change | What your code sees |
|---|---|
| [Rename a storage](./blob-storage.md#rename-a-storage) | The **Folder** changes, and the old folder stops working at once. There is no alias. The bucket name does not change. Quix restarts the deployments bound to that storage, but the folder in your keys changes, so update your code. |
| [Make another storage the main storage](./blob-storage.md#make-a-storage-the-main-storage) | The promoted storage keeps its folder, and the environment shortcut points at it from that moment. When the storage that steps down sat at the bucket root, it takes the folder the administrator names, so its keys need that folder in front of them: `reports/day.csv` becomes `principal/reports/day.csv`. When it already had a folder, nothing moves. |

## Supported operations

* **Objects** — GET, GET with a `Range` header, HEAD, PUT, and DELETE.
* **Copy** — CopyObject inside one storage.
* **Listing** — ListObjectsV2, with `prefix`, `max-keys`, and `continuation-token`. A listing that covers more than one storage is merged for you.
* **Multipart upload** — create, upload part, complete, and abort. The upload stays on the storage it started on. Multipart uploads work on a bridge storage too. The AWS CLI and boto3 use them for files above 8 MB.
* **Batch delete** — up to 1000 keys per request, in one storage.
* **Buckets** — CreateBucket, HeadBucket, DeleteBucket, GetBucketLocation, and ListBuckets. Through the `s3://<workspaceId>/` shortcut, GetBucketLocation answers `501 NotImplemented`.

## What the endpoint refuses

| Request | Answer |
|---|---|
| A copy whose source and destination sit in different storages | `501 NotImplemented`. Download the object, then upload it to the other storage. A copy inside one storage works. |
| A batch delete whose keys span two storages | `501 NotImplemented`. Send one delete request per storage. |
| Virtual-host-style addressing | `400 InvalidRequest` |
| A presigned URL | Rejected. Sign each request instead. |
| A key you may not read | `403 AccessDenied`. A listing hides what you may not see. A credential of a storage that is not the main storage sees only its own storage, so a key of another storage answers `404` for it. |
| Object tagging, ACLs, versioning, lifecycle, CORS, bucket policy, replication, encryption, notification, logging, object lock, legal hold, and retention | Not supported. Most answer `501 NotImplemented`. On an S3 or MinIO storage the request can pass through to the provider. Do not depend on these features. |

User metadata keys (`x-amz-meta-*`) can come back with capital letters, so read them without regard to case. Two keys that differ only by case are not supported.

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake storage](../deployments/blob-storage-and-library.md) — bind a storage and read it in Python
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [Quix Lake Bridge](./bridge/overview.md) — serve folders on your own machine as a storage

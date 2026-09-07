---
title: S3-compatible endpoint
description: Reach your Quix Lake data from any S3 client through the Storage Access Gateway, with one endpoint, one credential, and one bucket for each storage.
---

# S3-compatible endpoint

The [Storage Access Gateway](./secure-storage-access.md) presents your [Quix Lake](./overview.md) data as an **S3-compatible endpoint**. Any client that speaks Amazon S3 can read and write through it: the AWS SDKs, `boto3`, `s3fs`, DuckDB, Spark, and the AWS CLI.

The endpoint is the same whichever provider sits behind the connection. Your code targets S3 and Quix translates, so the same code works against Amazon S3, Google Cloud Storage, Azure Blob Storage, or MinIO.

## Get the endpoint and the credentials

Quix issues the credentials for you. Bind a [Quix Lake storage](../deployments/blob-storage-and-library.md) to a deployment or a [dev session](../applications/dev-sessions/overview.md), and Quix injects the endpoint together with a scoped access key as a secret:

```json
{
  "provider": "S3Compatible",
  "s3Compatible": {
    "bucketName": "<your_bucket>",
    "accessKeyId": "<your_access_key_id>",
    "secretAccessKey": "<your_secret_access_key>",
    "region": "us-east-1",
    "serviceUrl": "https://<your_storage_gateway_endpoint>"
  }
}
```

Your code reads this from `Quix__BlobStorage__Connection__Json`. The `serviceUrl` field is the endpoint, and Quix scopes the key to what the deployment may reach. There is no separate place to create a key by hand, and the gateway never hands out your real bucket credentials.

## Connect a client

The gateway needs **path-style** addressing, so set that flag on your client. Here is `boto3`:

```python
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://<your_storage_gateway_endpoint>",
    aws_access_key_id="<your_access_key_id>",
    aws_secret_access_key="<your_secret_access_key>",
    region_name="us-east-1",
    config=boto3.session.Config(s3={"addressing_style": "path"}),
)

s3.list_objects_v2(Bucket="<your_bucket>", Prefix="<your_prefix>/")
```

The gateway refuses virtual-host-style addressing, such as `https://<your_bucket>.<host>/<key>`, with a `400 InvalidRequest`. Use `https://<host>/<your_bucket>/<key>`.

## One connection, several buckets

A connection can hold more than one storage. **Each storage is its own bucket.** The name an administrator gives a storage is the bucket name your client uses. A storage with no name of its own keeps the bucket name of the bucket behind it.

Take a connection whose main storage is the bucket `quixdevbucket`. An administrator adds a MinIO storage and names it `minio`:

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://<workspaceId>/                  the same data, through the environment shortcut
s3://minio/reports/2026-08.csv       a file in the storage named minio
```

The main storage answers to `quixdevbucket` before the add and after it. A new storage never moves a storage that is already there.

Your client needs no extra configuration and no second credential to reach a second storage. Address the second storage by its own bucket name, on the same endpoint.

The gateway rewrites the bucket name only. Your object keys travel unchanged, so an object you PUT through the gateway lands at the same key it would land at if you wrote it to the bucket directly.

### The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the main storage. Both addresses reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
s3.get_object(Bucket="<workspaceId>",  Key="reports/day.csv")
```

Every operation answers the same through either address, including LIST with `marker`, `continuation-token`, `start-after`, `delimiter`, and `encoding-type=url`. A multipart upload you start at one address finishes at the other. The one difference is the one the example shows: a key under the shortcut drops its `<workspaceId>/` lead, on the way in and on the way out.

This is the only place the gateway changes a key. The shortcut takes an environment ID only, and it always points at the current main storage.

The shortcut needs a credential issued against the **main storage**. A credential issued against another storage reaches only its own bucket, so the shortcut answers `404 NoSuchBucket` for it. Use the full address in that case.

### See every storage with ListBuckets

An S3 LIST covers one bucket, so there is no single listing across every storage. Call **ListBuckets** to see every storage you may reach:

```python
for bucket in s3.list_buckets()["Buckets"]:
    print(bucket["Name"])
```

Each bucket in the answer is one storage. The gateway returns only the storages your credential may reach.

!!! warning "A rename changes the bucket name"
    An administrator can rename a storage. The name replaces the bucket name your client uses, so the old bucket name stops working at once. There is no alias and no grace period. Every deployment bound to that storage must redeploy before it works again. See [Rename a storage](./blob-storage.md#rename-a-storage).

!!! note "A main storage move changes no bucket name"
    An administrator can also make another storage the main storage. That move renames nothing, so every client of both storages keeps working. Only the [environment shortcut](#the-environment-shortcut) moves. See [Make a storage the main storage](./blob-storage.md#make-a-storage-the-main-storage).

## Supported operations

The gateway supports the operations an ordinary storage client needs:

* **Objects** — GET, GET with a `Range` header, HEAD, PUT, and DELETE.
* **Copy** — CopyObject inside one storage.
* **Listing** — ListObjectsV2, with `prefix`, `max-keys`, and `continuation-token`.
* **Multipart upload** — create, upload part, complete, and abort.
* **Batch delete** — up to 1000 keys per request.
* **Buckets** — CreateBucket, HeadBucket, DeleteBucket, GetBucketLocation, and ListBuckets.

## What the gateway refuses

| Request | Answer |
|---|---|
| A copy whose source and destination sit in different buckets | `400 InvalidRequest` |
| A batch delete whose body spans two buckets | `400 InvalidRequest` |
| Virtual-host-style addressing | `400 InvalidRequest` |
| A presigned URL | Rejected. Sign each request instead. |
| Object tagging, ACLs, versioning, lifecycle, CORS, bucket policy, replication, encryption, notification, logging, object lock, legal hold, and retention | `501 NotImplemented` |

The gateway refuses a cross-storage operation because it is a real transfer between two backends, not a change of path. The message says so:

```text
An operation that crosses a storage boundary is not supported. Source and destination must be in the same storage.
```

A copy inside one storage keeps working.

## Limits to design for

**A listing covers one bucket.** An S3 LIST reads one storage. To read two storages, list each bucket in turn. Call `ListBuckets` first to learn which buckets you may reach.

**An operation stays inside one storage.** A copy, a batch delete, and a multipart upload all work inside one bucket. The gateway refuses a request that crosses two storages, because that is a real transfer between two backends.

**A rename breaks the old address at once.** An administrator who renames a storage changes the bucket name every client uses. Redeploy every service bound to that storage.

**Every request is checked.** The gateway applies your folder permissions to each call. A key you may not read answers `403 AccessDenied`, and a listing hides what you may not see. See [Storage Access Gateway](./secure-storage-access.md).

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake storage](../deployments/blob-storage-and-library.md) — bind a storage and read it in Python
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [Storage explorer](./storage-explorer.md) — do the same work in the Portal

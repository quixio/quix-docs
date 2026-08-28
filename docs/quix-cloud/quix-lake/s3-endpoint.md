---
title: S3-compatible endpoint
description: Reach your Quix Lake data from any S3 client through the Storage Access Gateway, with one endpoint, one credential, and one bucket.
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

## One bucket, several storages

Your client sees one bucket, whatever the connection holds behind it. The main storage is the root of that bucket. Every other storage on the connection is one folder at that root, named after the storage:

```text
<bucket>/                    one merged listing across every storage
<bucket>/<workspaceId>/      an environment's data in the main storage
<bucket>/archive/            the storage named archive
```

Your client needs no extra configuration and no second credential to reach a second storage. Address it by its folder name.

A listing at the bucket root merges every storage into one result. Keys come back in order, and a client that pages through a full listing sees every key exactly once, with no duplicates and no gaps.

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
| A copy whose source and destination sit in different storages | `400 InvalidRequest` |
| A batch delete whose body spans two storages | `400 InvalidRequest` |
| Virtual-host-style addressing | `400 InvalidRequest` |
| A presigned URL | Rejected. Sign each request instead. |
| A storage folder addressed as an object, such as `<bucket>/archive` | `404 NoSuchKey` |
| Object tagging, ACLs, versioning, lifecycle, CORS, bucket policy, replication, encryption, notification, logging, object lock, legal hold, and retention | `501 NotImplemented` |

The gateway refuses a cross-storage operation because it is a real transfer between two backends, not a change of path. The message says so:

```text
An operation that crosses a storage boundary is not supported. Source and destination must be in the same storage.
```

A copy inside one storage keeps working.

## Limits to design for

**Keep `max-keys` the same for a whole listing.** The continuation token holds one cursor per storage. If you shrink `max-keys` part-way through a listing, the cursors no longer line up and your client can see the same key twice.

**A storage added during a listing appears in the next listing.** The continuation token names only the storages that still hold unread keys, so a storage an administrator binds part-way through contributes nothing to the rest of that listing. Reading it at once would emit keys that sort before keys you already have. A storage an administrator unbinds simply stops contributing. Neither case is an error.

**A multipart upload stays in one storage.** The upload id is pinned to the storage that holds its parts. If that storage is no longer available, the request fails rather than assembling parts from two backends.

**Every request is checked.** The gateway applies your folder permissions to each call, so a key you may not read answers `403 AccessDenied` and a listing hides what you may not see. See [Storage Access Gateway](./secure-storage-access.md).

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake storage](../deployments/blob-storage-and-library.md) — bind a storage and read it in Python
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [Storage explorer](./storage-explorer.md) — do the same work in the Portal

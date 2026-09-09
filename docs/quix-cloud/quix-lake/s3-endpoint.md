---
title: S3-compatible endpoint
description: Reach your Quix Lake data from any S3 client through the Storage Access Gateway, with one endpoint, one credential, and one bucket that holds every storage as a folder.
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

Your code reads this from `Quix__BlobStorage__Connection__Json`. The `serviceUrl` field is the endpoint, and `bucketName` is the shared bucket of the connection. Quix scopes the key to what the deployment may reach. There is no separate place to create a key by hand, and the gateway never hands out your real bucket credentials.

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

A connection can hold more than one storage. Your client still addresses **one bucket**, the shared bucket, and **each storage is a folder** inside it. The name an administrator gives a storage is that folder name. Put the folder first in every key:

```text
s3://<sharedBucket>/<storage>/<key>
```

Take a connection whose main storage is the bucket `quixdevbucket`. An administrator adds a MinIO storage, names it `minio`, and points it at the real bucket `archive-bucket`:

```text
s3://quixdevbucket/<workspaceId>/               an environment's data in the main storage
s3://<workspaceId>/                             the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/2026-08.csv    a file in the storage named minio
```

Your client keeps the bucket name `quixdevbucket` before the add and after it. A new storage never moves a storage that is already there.

Your client needs no extra configuration, no second bucket, and no second credential to reach a second storage. Each storage keeps its own bucket and its own credentials behind the gateway, so one bucket name in your code can hide several providers.

The gateway takes the storage folder off the key before it calls the storage behind it. Everything after the folder travels unchanged, so a PUT to `minio/reports/2026-08.csv` lands at `reports/2026-08.csv` in `archive-bucket`.

The main storage may sit at the root of the shared bucket, or take a folder of its own. An administrator can change that later, and both addresses then reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="principal/<workspaceId>/reports/day.csv")
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
```

!!! note "The old per-storage bucket name"
    Before this change each storage was a bucket of its own, and a client addressed a storage by its name as a bucket name. Quix keeps `s3://minio/reports/2026-08.csv` working for the change-over, so today's code keeps running. Move it to the folder address: the old address stays only for the change-over, and a rename breaks it at once.

### The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the main storage. Both addresses reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
s3.get_object(Bucket="<workspaceId>",  Key="reports/day.csv")
```

Every object and listing operation answers the same through either address, including LIST with `marker`, `continuation-token`, `start-after`, `delimiter`, and `encoding-type=url`. The first difference is the one the example shows: a key under the shortcut drops its `<workspaceId>/` lead, on the way in and on the way out.

The second difference is that the shortcut serves objects, not bucket metadata. A request that names the shortcut and carries NO key answers `501 NotImplemented` if it asks for bucket metadata: `?acl`, `?location`, any other bucket subresource, and a multipart create, complete or abort that names no key. Such a request describes the main storage as a whole, not your environment, so the gateway refuses it rather than answer for the whole bucket. Use the full `s3://<mainBucket>/` address for bucket metadata. The shortcut still serves LIST, batch delete, and the bucket HEAD, PUT and DELETE, because each of those stays inside your environment's folder. A multipart upload OF A KEY works through either address.

The shortcut takes an environment ID only, and it always points at the current main storage. The gateway changes a key in two places, and only in these two: it drops the `<workspaceId>/` lead under the shortcut, and it drops the storage folder before it calls the storage behind it.

### See every storage with a root listing

A LIST at the root of the shared bucket names every storage you may reach, as a folder. Ask for `delimiter="/"` and read the common prefixes:

```python
answer = s3.list_objects_v2(Bucket="quixdevbucket", Delimiter="/")
for folder in answer.get("CommonPrefixes", []):
    print(folder["Prefix"])          # "minio/", "archive/", …
```

The gateway returns only the storages your credential may reach. You can also browse them in the [storage explorer](./storage-explorer.md), or ask the Portal API.

Drop the delimiter and the gateway merges the storages into **one** listing, in key order and with paging, so a listing can now cross storages. Pass the `NextContinuationToken` back as the gateway gave it to you.

!!! warning "ListBuckets now answers one bucket"
    **ListBuckets** used to answer one bucket for each storage. It now answers the **one** shared bucket, because a storage is no longer a bucket:

    ```python
    for bucket in s3.list_buckets()["Buckets"]:
        print(bucket["Name"])        # one name, the shared bucket
    ```

    Any tool you point at this endpoint sees that change. A tool that builds its storage list from `ListBuckets` shows one entry, so use the root listing above instead.

!!! warning "A rename moves the folder"
    An administrator can rename a storage. The name is the folder, so the old folder stops working at once. There is no alias and no grace period. The bucket name does not change, so a deployment needs no redeploy for it, but the folder in your keys does change. See [Rename a storage](./blob-storage.md#rename-a-storage).

!!! note "A main storage move changes no folder"
    An administrator can also make another storage the main storage. That move renames no folder, so every running client keeps working. The [environment shortcut](#the-environment-shortcut) moves, and the shared bucket takes the bucket name of the promoted storage on your next deploy. See [Make a storage the main storage](./blob-storage.md#make-a-storage-the-main-storage).

## Supported operations

The gateway supports the operations an ordinary storage client needs:

* **Objects** — GET, GET with a `Range` header, HEAD, PUT, and DELETE.
* **Copy** — CopyObject inside one storage.
* **Listing** — ListObjectsV2, with `prefix`, `max-keys`, and `continuation-token`. A listing that covers more than one storage is merged for you.
* **Multipart upload** — create, upload part, complete, and abort. The upload stays on the storage it started on.
* **Batch delete** — up to 1000 keys per request, in one storage.
* **Buckets** — CreateBucket, HeadBucket, DeleteBucket, GetBucketLocation, and ListBuckets. ListBuckets answers the one shared bucket. Through the `s3://<workspaceId>/` shortcut, GetBucketLocation answers `501 NotImplemented`; use the full address.

## What the gateway refuses

| Request | Answer |
|---|---|
| A copy whose source and destination sit in different storages | `501 NotImplemented` |
| A batch delete whose body spans two storages | `501 NotImplemented` |
| Virtual-host-style addressing | `400 InvalidRequest` |
| A presigned URL | Rejected. Sign each request instead. |
| Object tagging, ACLs, versioning, lifecycle, CORS, bucket policy, replication, encryption, notification, logging, object lock, legal hold, and retention | `501 NotImplemented` |

The gateway refuses a cross-storage operation because it is a real transfer between two backends, not a change of path. Two keys sit in one bucket and still sit in two storages, so read the folder at the front of each key before you plan the operation. A copy inside one storage keeps working.

## Limits to design for

**A listing can cross storages, but an operation cannot.** The gateway merges a LIST across the storages the prefix reaches. A copy, a batch delete, and a multipart upload each stay inside one storage.

**Storage discovery is a root listing.** `ListBuckets` answers the one shared bucket, so list the root of that bucket with `delimiter=/` to see the storages.

**A rename breaks the old folder at once.** An administrator who renames a storage changes the folder every client uses. Update the keys in your code and in your saved paths.

**Every request is checked.** The gateway applies your folder permissions to each call. A key you may not read answers `403 AccessDenied`, and a listing hides what you may not see. See [Storage Access Gateway](./secure-storage-access.md).

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake storage](../deployments/blob-storage-and-library.md) — bind a storage and read it in Python
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [Storage explorer](./storage-explorer.md) — do the same work in the Portal

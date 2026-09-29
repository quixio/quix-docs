---
title: S3-compatible endpoint
description: Reach your Quix Lake data from any S3 client through the Storage Access Gateway, with one endpoint, one credential, and one bucket that holds every storage as a folder.
---

# S3-compatible endpoint

The [Storage Access Gateway](./secure-storage-access.md) presents your [Quix Lake](./overview.md) data as an **S3-compatible endpoint**. S3 clients such as `boto3`, `s3fs` and DuckDB can read and write through it, with path-style addressing.

The endpoint is the same whichever provider sits behind the connection. Your code targets S3 and Quix translates, so the same code works against Amazon S3, Google Cloud Storage, Azure Blob Storage, or MinIO.

## Get the endpoint and the credentials

Quix issues the credentials for you. Bind a [Quix Lake storage](../deployments/blob-storage-and-library.md) to a deployment or a [dev session](../applications/dev-sessions/overview.md), and Quix injects the endpoint together with a scoped access key as a secret:

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

Your code reads this from `Quix__BlobStorage__Connection__Json`. The `ServiceUrl` field is the endpoint, and `BucketName` is the Quix Lake bucket. `Region` is the region of the storage, or `us-east-1` when the storage has none. Quix scopes the key to what the deployment may reach, and the gateway never hands out your real bucket credentials.

You can also find the endpoint and the bucket by hand. Open the **Connect to Quix Lake** dialog on the Quix Lake connection page in the Portal. The dialog shows both values.

## Use a personal access token (PAT)

Use a PAT to reach Quix Lake from your own machine or from a tool outside a deployment.

Create a PAT in the Portal, under your user settings. A PAT acts as you. It never reaches more than you can reach, and a PAT with a smaller scope reaches less. Set a short expiry, and keep the PAT secret.

Set these three fields on your S3 client:

* **Access key** — your Quix user ID. The **Connect to Quix Lake** dialog shows it as **Access key (your user id)**.
* **Secret key** — your PAT.
* **Session token** — the same PAT, again.

The gateway reads the session token from the standard S3 field (`x-amz-security-token`, or `aws_session_token` in most SDKs). It uses the PAT there to check your identity, and it uses the same PAT as the secret key to check your request signature. Most S3 clients send the session token on their own once you set it, so you do not sign requests by hand.

Every client below uses **path-style** addressing and the region `us-east-1`.

**boto3:**

```python
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://<ENDPOINT>",
    aws_access_key_id="<USER_ID>",
    aws_secret_access_key="<YOUR_PAT>",
    aws_session_token="<YOUR_PAT>",
    region_name="us-east-1",
    config=boto3.session.Config(s3={"addressing_style": "path"}),
)

s3.list_objects_v2(Bucket="<BUCKET>")
```

**AWS CLI:**

```bash
export AWS_ACCESS_KEY_ID=<USER_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_PAT>
export AWS_SESSION_TOKEN=<YOUR_PAT>

aws s3 ls s3://<BUCKET>/ \
  --endpoint-url https://<ENDPOINT> \
  --region us-east-1
```

Set `addressing_style = path` for the CLI too, in `~/.aws/config`:

```ini
[default]
s3 =
    addressing_style = path
```

**DuckDB:**

```sql
INSTALL httpfs;
LOAD httpfs;

SET s3_endpoint = '<ENDPOINT>';
SET s3_region = 'us-east-1';
SET s3_access_key_id = '<USER_ID>';
SET s3_secret_access_key = '<YOUR_PAT>';
SET s3_session_token = '<YOUR_PAT>';
SET s3_url_style = 'path';

SELECT * FROM read_parquet('s3://<BUCKET>/<key>');
```

**rclone:**

```ini
[quixlake]
type = s3
provider = Other
endpoint = https://<ENDPOINT>
access_key_id = <USER_ID>
secret_access_key = <YOUR_PAT>
session_token = <YOUR_PAT>
region = us-east-1
force_path_style = true
```

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

A connection can hold more than one storage. Your client still addresses **one bucket**, the Quix Lake bucket, and **each storage is a folder** inside it. The **Folder** an administrator sets on a storage is that folder name. Only the **main storage** may sit at the **root** of the bucket, so every other storage has a folder. Put the folder first in every key:

```text
s3://<connectionBucket>/<storage>/<key>
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

The main storage may sit at the root of the Quix Lake bucket, or take a folder of its own. An administrator can give it a folder later, and both addresses then reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="principal/<workspaceId>/reports/day.csv")
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
```

!!! note "The old per-storage bucket name"
    Before this change each storage was a bucket of its own, and a client addressed a storage by its name as a bucket name. `s3://minio/reports/2026-08.csv` still works today, so old code keeps running. Move your code to the folder address. Do not build new code on the old address, and know that a rename breaks it at once.

### The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the main storage. Both addresses reach the same objects:

```python
s3.get_object(Bucket="quixdevbucket", Key="<workspaceId>/reports/day.csv")
s3.get_object(Bucket="<workspaceId>",  Key="reports/day.csv")
```

Every object and listing operation answers the same through either address, including LIST with `marker`, `continuation-token`, `start-after`, `delimiter`, and `encoding-type=url`. The first difference is the one the example shows: a key under the shortcut drops its `<workspaceId>/` lead, on the way in and on the way out.

The second difference is that the shortcut serves objects, not bucket metadata. A request that names the shortcut and carries NO key answers `501 NotImplemented` if it asks for bucket metadata: `?acl`, `?location`, any other bucket subresource, and a multipart create, complete or abort that names no key. Such a request describes the main storage as a whole, not your environment, so the gateway refuses it rather than answer for the whole bucket. Use the full `s3://<mainBucket>/` address for bucket metadata. The shortcut still serves LIST, batch delete, and the bucket HEAD, PUT and DELETE, because each of those stays inside your environment's folder. A multipart upload OF A KEY works through either address.

The shortcut takes an environment ID only, and it always points at the current main storage. The gateway changes a key in two places, and only in these two: it drops the `<workspaceId>/` lead under the shortcut, and it drops the storage folder before it calls the storage behind it.

### Write to another storage by key

A deployment with `blobStorage: bind: true` gets one credential, scoped to its own environment. That credential still reaches every storage of the connection, through the key you write to:

* `<storage>/<workspaceId>/...` writes to the storage whose folder is `<storage>`.
* `<workspaceId>/...`, with no storage name, writes to the main storage, as before.

Your workspace folder stays in every case. The app never reaches another workspace: a key such as `<storage>/<otherWorkspaceId>/...` answers `403 AccessDenied`.

An unknown storage name also answers `403 AccessDenied`, and the gateway writes nothing to the main storage instead. So when an administrator renames a storage, every app that wrote to its old name starts to fail, and you must change the key prefix in the app.

This reach comes from your workspace grant, and it works because the grant names your workspace, not a storage. A grant on a whole storage is different: it stays inside that one storage and gains no reach into a sibling storage.

**boto3**, from a deployment bound to the connection:

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

data = b"day,value\n2026-08-01,42\n"

# Writes to the main storage, in this environment's folder
s3.put_object(Bucket="<your_bucket>", Key="<workspaceId>/reports/day.csv", Body=data)

# Writes to the storage named "archive", in this environment's folder
s3.put_object(Bucket="<your_bucket>", Key="archive/<workspaceId>/reports/day.csv", Body=data)
```

Quix injects the environment ID into every deployment as `Quix__Workspace__Id`, so your code can build the key from it.

!!! note "The Quix Streams file sink cannot write to another storage"
    The Quix Streams `S3FileSink` builds each key as `<directory>/<topic>/<partition>/...`. Its `directory` accepts only letters, digits, spaces, dots, underscores and `/`. An environment ID always holds a hyphen, so the sink cannot put `<workspaceId>/` in the key, and the gateway refuses a key outside your environment folder. Write with boto3, as above, when you need another storage.

### See every storage with a root listing

A LIST at the root of the Quix Lake bucket names every storage you may reach, as a folder. Ask for `delimiter="/"` and read the common prefixes:

```python
answer = s3.list_objects_v2(Bucket="quixdevbucket", Delimiter="/")
for folder in answer.get("CommonPrefixes", []):
    print(folder["Prefix"])          # "minio/", "archive/", …
```

The gateway returns only the storages your credential may reach. You can also browse them in the [storage explorer](./storage-explorer.md), or ask the Portal API.

!!! warning "A deployment credential cannot list the bucket root"
    A root LIST works with a personal access token, in a dev session, and with a credential that holds a grant on the root. The credential of a bound deployment holds a grant on its own environment folder only, so a root LIST answers `403 AccessDenied`. List your own folder instead, such as `Prefix="<workspaceId>/"` or `Prefix="archive/<workspaceId>/"`.

Drop the delimiter and the gateway merges the storages into **one** listing, in key order and with paging, so a listing can now cross storages. Pass the `NextContinuationToken` back as the gateway gave it to you.

!!! warning "ListBuckets now answers one bucket"
    **ListBuckets** used to answer one bucket for each storage. It now answers the **one** Quix Lake bucket, because a storage is no longer a bucket:

    ```python
    for bucket in s3.list_buckets()["Buckets"]:
        print(bucket["Name"])        # one name, the Quix Lake bucket
    ```

    Any tool you point at this endpoint sees that change. A tool that builds its storage list from `ListBuckets` shows one entry, so use the root listing above instead.

!!! warning "A rename moves the folder"
    An administrator can change the **Folder** of a storage. The old folder stops working at once. There is no alias and no grace period. The bucket name does not change. Quix restarts the deployments bound to that storage, but the folder in your keys changes, so update your code. See [Rename a storage](./blob-storage.md#rename-a-storage).

!!! warning "A main storage move can move a folder"
    An administrator can also make another storage the main storage. The promoted storage keeps its folder, so its clients keep working. The [environment shortcut](#the-environment-shortcut) points at it from that moment. The Quix Lake bucket keeps its name.

    Only the main storage may sit at the bucket root. So the storage that steps down must leave the root, and the administrator names a folder for it in the promote dialog. Every key you read for that storage at the bucket root needs that folder in front of it from that moment:

    ```text
    s3://quixdevbucket/reports/day.csv            before the move
    s3://quixdevbucket/principal/reports/day.csv  after the move
    ```

    When the storage that steps down already had a folder, nothing moves. See [Make a storage the main storage](./blob-storage.md#make-a-storage-the-main-storage).

## Supported operations

The gateway supports the operations an ordinary storage client needs:

* **Objects** — GET, GET with a `Range` header, HEAD, PUT, and DELETE.
* **Copy** — CopyObject inside one storage.
* **Listing** — ListObjectsV2, with `prefix`, `max-keys`, and `continuation-token`. A listing that covers more than one storage is merged for you.
* **Multipart upload** — create, upload part, complete, and abort. The upload stays on the storage it started on.
* **Batch delete** — up to 1000 keys per request, in one storage.
* **Buckets** — CreateBucket, HeadBucket, DeleteBucket, GetBucketLocation, and ListBuckets. ListBuckets answers the one Quix Lake bucket. Through the `s3://<workspaceId>/` shortcut, GetBucketLocation answers `501 NotImplemented`; use the full address.

## What the gateway refuses

| Request | Answer |
|---|---|
| A copy whose source and destination sit in different storages | `501 NotImplemented` |
| A batch delete whose body spans two storages | `501 NotImplemented` |
| Virtual-host-style addressing | `400 InvalidRequest` |
| A presigned URL | Rejected. Sign each request instead. |
| Object tagging, ACLs, versioning, lifecycle, CORS, bucket policy, replication, encryption, notification, logging, object lock, legal hold, and retention | Not supported. The gateway answers `501 NotImplemented` for most of these. On an S3 or MinIO storage it can pass the request to the provider. Do not depend on these features. |

The gateway refuses a cross-storage operation because it is a real transfer between two backends, not a change of path. Two keys sit in one bucket and still sit in two storages, so read the folder at the front of each key before you plan the operation. A copy inside one storage keeps working.

## Limits to design for

**A listing can cross storages, but an operation cannot.** The gateway merges a LIST across the storages the prefix reaches. A copy, a batch delete, and a multipart upload each stay inside one storage.

**Storage discovery is a root listing.** `ListBuckets` answers the one Quix Lake bucket, so list the root of that bucket with `delimiter=/` to see the storages.

**A rename breaks the old folder at once.** An administrator who renames a storage changes the folder every client uses. Update the keys in your code and in your saved paths.

**A main storage move can move the old main storage.** A storage that steps down from the bucket root takes a folder. Its keys need that folder in front of them from that moment.

**Every request is checked.** The gateway applies your folder permissions to each call. A key you may not read answers `403 AccessDenied`, and a listing hides what you may not see. A credential of a storage that is not the main storage sees only its own storage, so a key of another storage answers `404` for it. See [Storage Access Gateway](./secure-storage-access.md).

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake storage](../deployments/blob-storage-and-library.md) — bind a storage and read it in Python
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [Storage explorer](./storage-explorer.md) — do the same work in the Portal

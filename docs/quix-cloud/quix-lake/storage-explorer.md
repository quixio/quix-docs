---
title: Storage explorer
description: Browse, search, upload, and manage the files in your Quix Lake storage from the Quix Portal.
---

# Storage explorer

The **storage explorer** is the file browser for [Quix Lake](./overview.md) inside the Quix Portal. It shows the storages your cluster connects to. You work with the files in them without leaving the Portal, and without any storage credentials of your own.

Open it from the **Quix Lake** section of your environment.

!!! info "Prerequisites"
    - A [Quix Lake connection](./blob-storage.md) exists for the cluster.
    - The [Storage Access Gateway](./secure-storage-access.md) is deployed for that connection.

## What you see

The explorer shows every storage on the connection that you may reach. **Each storage is its own bucket**, so you browse one storage at a time. The bucket name is the name an administrator gave the storage. A storage with no name of its own keeps the bucket name of the bucket behind it.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://minio/reports/                  a folder in the storage named minio
```

A storage you add never moves a storage that is already there. The paths you already copied from the main storage keep working. Making another storage the main storage moves no path either, because it changes no bucket name.

You only see what you are allowed to see. The gateway filters every listing, so another team's private folder never appears. See [Storage Access Gateway](./secure-storage-access.md) for the rules.

Switch between the **tree view** and the **file explorer view** with the buttons in the toolbar. Use **Back**, **Forward**, and **Up** to move through folders, and **Refresh** to re-read the current folder.

## What you can do

| Action | What it does |
|---|---|
| **Upload** | Adds one or more files to the folder in view. Upload a zip file and Quix extracts it on the server. |
| **New folder** | Creates an empty folder in the folder in view. |
| **New file** | Creates a file in the folder in view. |
| **Download** | Downloads a file. Download a folder and Quix packs it as a zip. |
| **Rename** | Renames a file or folder. Renaming moves the data to the new path. |
| **Cut**, **Copy**, and paste | Moves or copies a file or folder into the folder you paste it in. A copy keeps the source. |
| **Copy path** | Copies the full path of the entry, so you can use it in your code. |
| **Delete** | Deletes a file or a folder. |
| **Manage visibility** | Sets who in your organization can read or change a folder. |

Search finds files by name from the folder you are in.

!!! note "A copy cannot cross a storage"
    A move or a copy whose source and destination sit in different storages is a real transfer between two backends, so the gateway refuses it. Move or copy inside one storage. You can also download the file and upload it again.

## A storage is not a folder

A storage is a bucket of its own, not an object in another bucket. The explorer turns off the actions that do not apply to it:

* You cannot rename a storage here. Rename it from **Settings → Quix Lake** instead. A rename changes the bucket name every client uses, and it breaks every old address at once.
* You cannot delete a storage. Delete it from **Settings → Quix Lake** instead.
* You cannot cut or copy a storage.
* You cannot set the visibility of a storage. The storage carries its own upstream access rules.

The explorer refuses these actions because they are connection-level facts, not files in your bucket.

Everything **inside** a storage behaves like an ordinary folder. Rename, delete, move, copy, and visibility all work there.

## Visibility

Every folder shows its visibility, and you change it from the row menu. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means |
|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment |
| **Private** | No one in your organization can access it, administrators only |
| **Anyone can read** | Everyone in your organization can read it |
| **Anyone can read & write** | Everyone in your organization can read and change it |

Only Quix administrators, and users with organization write access, can change visibility. Sharing never reaches past your Quix organization, and Quix never exposes a folder to the public internet.

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same files from your code
* [Data Lake UI](./data-lake/user-interface.md) — browse persisted Kafka datasets instead of raw files

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

The explorer opens the **connection bucket**, the one bucket of the connection. Each storage you may reach appears as a **folder** at the root of that bucket, beside the folders of the main storage. Open a folder to browse the storage behind it. The folder name is the name an administrator gave the storage.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://quixdevbucket/minio/reports/    a folder in the storage named minio
```

A storage you add never moves a storage that is already there. The paths you already copied from the main storage keep working. Making another storage the main storage moves no folder either.

You only see what you are allowed to see. The gateway filters every listing, so another team's private folder never appears. See [Storage Access Gateway](./secure-storage-access.md) for the rules.

Switch between **Tree view** and **File explorer** with the buttons in the toolbar. Use **Back**, **Forward**, and **Up** to move through folders, and **Refresh** to re-read the current folder.

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
| **Delete file** and **Delete folder** | Deletes a file or a folder. |
| **Manage visibility** | Sets who in your organization can read or change a folder. |

Search finds files by name from the folder you are in.

!!! note "A copy cannot cross a storage"
    A move or a copy whose source and destination sit in different storages is a real transfer between two backends, so the gateway refuses it. Move or copy inside one storage. You can also download the file and upload it again.

## A storage folder is not an ordinary folder

A storage folder looks like a folder, but it is a whole storage with its own bucket and its own credentials behind it. The explorer turns off the actions that do not apply to it:

* You cannot rename a storage folder here. Rename the storage from **Settings → Quix Lake** instead. A rename moves the folder every client uses, and it breaks every old path at once.
* You cannot delete a storage folder. Delete the storage from **Settings → Quix Lake** instead.
* You cannot cut or copy a storage folder.
* You cannot set the visibility of a storage folder here. The storage carries its own upstream access rules.

The explorer refuses these actions because they are connection-level facts, not files in your bucket.

Everything **inside** a storage behaves like an ordinary folder. Rename, delete, move, copy, and visibility all work there.

## Visibility

Every folder shows its visibility, and you change it from the row menu. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means |
|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment |
| **Private** | No one in your organization can access it, administrators only |
| **Public - Anyone can read** | Everyone in your organization can read it |
| **Public - Anyone can read & write** | Everyone in your organization can read and change it |

Only Quix administrators, and users with organization write access, can change visibility. Sharing never reaches past your Quix organization, and Quix never exposes a folder to the public internet.

## Next steps

* [Storage Access Gateway](./secure-storage-access.md) — who can read and change what
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same files from your code
* [Data Lake UI](./data-lake/user-interface.md) — browse persisted Kafka datasets instead of raw files

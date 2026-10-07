---
title: File Explorer
description: Browse, search, upload, and manage the files in your Quix Lake storage from the Quix Portal.
---

# File Explorer

**File Explorer** is the file browser for [Quix Lake](./overview.md) inside the Quix Portal. It shows the storages your cluster connects to. You work with the files in them without leaving the Portal, and without any storage credentials of your own.

Open **File Explorer** from the **Quix Lake** section of your environment sidebar.

!!! info "Prerequisites"
    - A [Quix Lake connection](./blob-storage.md) exists for the cluster.
    - The [Storage Access Gateway](./secure-storage-access.md#the-storage-access-gateway) is deployed for that connection.

## What you see

File Explorer opens the **Quix Lake bucket**, the one bucket of the connection. Each storage of the connection appears as a **folder** at the root of that bucket. You see every storage folder, also one you cannot read. Open a folder to browse the storage behind it. The folder name is the **Folder** an administrator set on the storage.

Only the **main storage** may sit at the root of the bucket. When it does, its own folders show beside the storage folders. Every other storage has a folder of its own.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://quixdevbucket/minio/reports/    a folder in the storage named minio
```

A storage you add never moves a storage that is already there, so the paths you already copied keep working.

A main storage move is different. Only the main storage may sit at the bucket root, so the storage that steps down must take a folder, and its paths change. The Portal asks the administrator for that folder name before it moves anything. When the storage that steps down already has a folder, nothing moves. See [Make a storage the main storage](./blob-storage.md#make-a-storage-the-main-storage).

You only see what you are allowed to see. The gateway filters every listing, so another team's private folder never appears. A storage folder at the root is the one exception. It always appears, and its contents follow the permissions. See [Storage permissions](./secure-storage-access.md) for the rules.

Switch between **Tree view** and **File explorer view** with the buttons in the toolbar. Use **Back**, **Forward**, and **Up** to move through folders, and **Refresh** to re-read the current folder.

## What you can do

| Action | What it does |
|---|---|
| **Upload** | Adds one or more files to the folder in view. When you upload a zip file, Quix asks what to do. **Extract contents here** extracts the zip on the server and replaces files that have the same names. **Upload as .zip** stores the file as it is. |
| **New folder** | Creates an empty folder in the folder in view. |
| **New file** | Creates a file in the folder in view. |
| **Download** | Downloads a file. Download a folder and Quix packs it as a zip. |
| **Rename** | Renames a file or folder. Renaming moves the data to the new path. |
| **Cut**, **Copy**, and paste | Moves or copies a file or folder into the folder you paste it in. A copy keeps the source. |
| **Copy path** | Copies the full path of the entry, so you can use it in your code. |
| **Delete file** and **Delete folder** | Deletes a file or a folder. |
| **Default Permissions** | Opens the **Default Permissions** tab of the connection. Only organization administrators and Quix administrators see this button. |

Search finds files whose path contains the text you type. It searches from the root of the Quix Lake bucket, not from the folder in view. On a large bucket it reads only part of the bucket, so the result can be incomplete.

!!! note "A copy cannot cross a storage"
    File Explorer refuses a move or a copy whose source and destination sit in different storages. Move or copy inside one storage, or download the file and upload it again.

## A storage folder is not an ordinary folder

A storage folder looks like a folder, but it is a whole storage with its own bucket and its own credentials behind it. File Explorer turns off the actions that do not apply to it:

* You cannot rename a storage folder here. Rename the storage from **Settings → Quix Lake** instead. A rename moves the folder every client uses, and it breaks every old path at once.
* You cannot delete a storage folder. Delete the storage from **Settings → Quix Lake** instead.
* You cannot cut or copy a storage folder.
* You cannot set the **Default Permissions** of any folder here. Set them on the storage's row in the **Default Permissions** tab of the connection.

Everything **inside** a storage behaves like an ordinary folder. Rename, delete, move, and copy all work there.

## Folders you cannot read

When you can see a folder but cannot read it, the **Access** column shows a lock and **No Access**. This happens in these cases:

- An organization administrator sees a folder that is not an environment folder. There, the administrator can only list.
- No user, group or Default Permission opens a storage folder itself.

Open, download, upload, delete and new folder follow the storage permissions. File Explorer turns off the actions that you cannot do:

- Without write access, **Upload**, **New folder**, **New file** and the menu actions that write are off. The tooltip says **You can only read this folder.** or **You can only read this file.**
- A file that you cannot read shows grey, and **Download** is off. The tooltip tells you how to get access: ask an administrator for a storage permission or for a role on the environment.
- When a preview fails, File Explorer names the cause. The cause is one of these: you have no read access, the file is not found, the [bridge](./bridge/overview.md) did not answer, the server could not load the file, or there is no network.

The gateway also refuses a request that the permissions do not allow.

## Access

<a id="visibility"></a>

The **Access** column uses the same words as the **Storage permissions** tables:

| Access | What it means |
|---|---|
| **No Access** | You cannot read or change the folder |
| **Read Access** | You can read the folder |
| **Read-Write Access** | You can read and change the folder |

An environment folder shows the access your [project role](./secure-storage-access.md#the-project-role) gives you.

The tooltip starts with **Your access:**, because the column shows what you can do. On a storage folder, it shows what you can do with a file directly inside that folder. A folder inside it can show more, for example your own environment folder.

Organization administrators and Quix administrators open the **Default Permissions** tab with the **Default Permissions** button in the toolbar. Sharing never reaches past your Quix organization, and Quix never exposes a folder to the public internet.

## Next steps

* [Storage permissions](./secure-storage-access.md) — who can read and change what
* [Quix Lake connections and storages](./blob-storage.md) — connect a bucket and add a storage
* [How to connect](./s3-endpoint.md) — reach the same files from your code
* [Data Lake UI](./data-lake/user-interface.md) — browse persisted Kafka datasets instead of raw files

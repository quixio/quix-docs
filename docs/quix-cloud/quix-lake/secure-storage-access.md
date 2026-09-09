---
title: Storage Access Gateway
description: How Quix keeps your Quix Lake data private by default, so each team only sees its own data although the whole organization shares one connection.
---

# Storage Access Gateway

Every cluster connects to object storage for [Quix Lake](./overview.md), and your whole organization shares that storage. The **Storage Access Gateway** controls who can see and change what inside it, so each team only works with the data it is meant to.

The gateway sits between the platform and your object storage. It checks every request. It confirms who is asking and which data the caller may reach, then passes through only what the caller may see.

!!! info "Nothing to set up"
    The gateway starts automatically once a [Quix Lake connection](./blob-storage.md) exists for the cluster. You manage no keys and configure no settings.

## Each storage is a folder of one bucket

A connection holds one main storage and any number of extra storages that an administrator adds. Your clients address **one bucket**, its bucket, and **each storage is a folder** inside it. The name of a storage is that folder name. The main storage may sit at the root of the bucket, or take a folder of its own.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://<workspaceId>/                  the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/    a folder in the storage named minio
```

The gateway routes each request on the folder at the front of the key. Each storage keeps its own bucket and its own credentials behind the gateway, so one bucket name hides several backends. A new storage never moves a storage that is already there, so a customer with one storage sees no change. See [Quix Lake connections and storages](./blob-storage.md) for how you add a storage.

**The gateway takes the storage folder off the key and changes nothing else.** Everything after the folder travels unchanged, so an object you write lands at the same key it would land at if you wrote it to the bucket behind the storage directly.

A LIST at the root of the connection bucket names every storage the caller may reach, as a folder, and the gateway merges the answer across the storages behind it. **ListBuckets** answers that one bucket, so a client discovers the storages with that root listing.

## The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the **main storage**. It is a shortcut to the real address, and both reach the same objects:

```text
s3://quixdevbucket/<workspaceId>/x   the real address, inside the main storage
s3://<workspaceId>/x                 the shortcut — the same object
```

Every operation answers the same through either address, and a multipart upload you start at one address finishes at the other. The one difference you see is that a key read through the shortcut drops its `<workspaceId>/` lead.

The shortcut takes an environment ID only. Any other bucket name that names no storage answers `404 NoSuchBucket`. An environment ID can never be a storage name, so the two never clash.

!!! note "The shortcut follows the main storage"
    When an administrator [makes another storage the main storage](./blob-storage.md#make-a-storage-the-main-storage), the shortcut points at that storage from that moment. No storage changes its folder, and no running client breaks. Quix copies no data, so the shortcut answers empty until someone copies the environment folders across.

## Two kinds of folders

How a folder behaves by default depends on its kind. You see and change this in the **Default Permissions** tab, where every folder shows its current visibility.

**Environment folders.** Each environment keeps its lake data in its own folder, shown with a people icon. Its default visibility is **User Permissions**: members get the same read and write access they have in that environment. If you can view the environment you can read its data, and if you can edit the environment you can write to it. Other teams cannot see it unless someone shares it.

**Other folders.** Any folder that is not tied to an environment is shown with a lock icon. A folder you create yourself is one example. Its default visibility is **Private**: only organization administrators can reach it. It becomes available to others only when someone shares it.

## Folder visibility

You set a folder's visibility from the menu on its row in the **Default Permissions** tab. Opening a folder past its default is called *sharing*. There are two sharing levels: **Public - Anyone can read** and **Public - Anyone can read & write**. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means | Default for |
|---|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment | Environment folders |
| **Private** | No one in your organization can access it, administrators only | Other folders |
| **Public - Anyone can read** | Everyone in your organization can read it | Opt-in |
| **Public - Anyone can read & write** | Everyone in your organization can read and change it | Opt-in |

!!! warning "A permission on the bucket root reaches every storage"
    Every storage is a folder of one bucket, so a permission you set on the **bucket root** reaches every folder of every storage on the connection. To open one storage alone, set the permission on that storage's folder instead.

!!! note "A rename carries the permissions with it"
    When an administrator [renames a storage](./blob-storage.md#rename-a-storage), Quix moves the permissions of that folder to the new folder, in every store that holds them. Nobody loses access, and no permission stays behind on the old folder for a later storage to inherit.

!!! note "Sharing stays within your organization"
    Sharing only ever opens a folder to people signed in to your Quix organization. Quix never exposes it to the public internet.

## What the gateway does

**Keeps each team's data to itself.** Only that environment's members see the data an environment writes. Other teams in the organization do not see it.

**Keeps storage keys protected.** The credentials for your bucket stay inside the gateway. The gateway never hands them to the rest of the platform.

**Leaves your data in place.** The gateway only governs access. Your files stay in your own object storage, untouched.

## Who can read and write

Your access to the data matches your access to the environment:

| What you can do in the environment | What you can do with its data |
|---|---|
| **View** it | **Read** it |
| **Edit** it | **Read and change** it |
| **Nothing** | **Nothing**, unless someone has shared it |

The same applies to things acting on your behalf:

* A **dev session** can do exactly what you can.
* A **deployed application** acts as its own environment. It reads its own data and anything shared, and changes its own data. It does not see another team's private data.

## Where it applies

You work with the lake exactly as before. The gateway only determines what appears:

* **[Storage explorer](./storage-explorer.md):** you see the storages, environments, and folders you are allowed to see.
* **[Data Lake](./data-lake/user-interface.md):** when you browse, you only see the environments and folders you are allowed to see.
* **[Lakehouse](./lakehouse/overview.md):** SQL queries return results only from environments you belong to, or that someone shared with you.
* **[S3-compatible endpoint](./s3-endpoint.md):** the gateway applies the same rules to every S3 request your code makes.

## Examples

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither sees the other's when browsing the lake. If the analytics team sets a folder of reference data to **Public - Anyone can read**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While it stays **Private**, only administrators reach it. Set it to **Public - Anyone can read & write**, and anyone in the organization can read and write to it.

**A second storage for archives.** An administrator adds a storage named `archive` to the connection. Clients then reach it as the folder `archive/` of its bucket. A permission on that folder opens that storage alone. A permission on the bucket root opens every storage, the main storage included, so set it on the folder when you mean one storage.

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — connect the bucket and add a storage
* [Storage explorer](./storage-explorer.md) — browse and manage files in the Portal
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how the Data Lake and Lakehouse fit together

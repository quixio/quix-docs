---
title: Storage Access Gateway
description: How Quix keeps your Quix Lake data private by default, so each team only sees its own data although the whole organization shares one connection.
---

# Storage Access Gateway

Every cluster connects to object storage for [Quix Lake](./overview.md), and your whole organization shares that storage. The **Storage Access Gateway** controls who can see and change what inside it, so each team only works with the data it is meant to.

The gateway sits between the platform and your object storage. It checks every request. It confirms who is asking and which data the caller may reach, then passes through only what the caller may see.

!!! info "Nothing to set up"
    The gateway starts automatically once a [Quix Lake connection](./blob-storage.md) exists for the cluster. You manage no keys and configure no settings.

## Each storage is its own bucket

A connection holds one main storage and any number of extra storages that an administrator adds. **Each storage is its own bucket.** The name of a storage is the bucket name your clients use. A storage with no name of its own keeps the bucket name of the bucket behind it, and the main storage always works this way.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://minio/reports/                  a folder in the storage named minio
```

The gateway routes each request on the bucket. A new storage never moves a storage that is already there, so a customer with one storage sees no change. Inside a bucket, the gateway treats the keys as one blob store for routing, listing, and permissions. See [Quix Lake connections and storages](./blob-storage.md) for how you add a storage.

There is no listing across storages, because an S3 LIST covers one bucket. A client calls **ListBuckets** to see every storage it may reach.

## Two kinds of folders

How a folder behaves by default depends on its kind. You see and change this in the **Default Permissions** tab, where every folder shows its current visibility.

**Environment folders.** Each environment keeps its lake data in its own folder, shown with a people icon. Its default visibility is **User Permissions**: members get the same read and write access they have in that environment. If you can view the environment you can read its data, and if you can edit the environment you can write to it. Other teams cannot see it unless someone shares it.

**Other folders.** Any folder that is not tied to an environment is shown with a lock icon. A folder you create yourself is one example. Its default visibility is **Private**: only organization administrators can reach it. It becomes available to others only when someone shares it.

## Folder visibility

You set a folder's visibility from the menu on its row in the **Default Permissions** tab. Opening a folder past its default is called *sharing*. There are two sharing levels: **Anyone can read** and **Anyone can read & write**. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means | Default for |
|---|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment | Environment folders |
| **Private** | No one in your organization can access it, administrators only | Other folders |
| **Anyone can read** | Everyone in your organization can read it | Opt-in |
| **Anyone can read & write** | Everyone in your organization can read and change it | Opt-in |

!!! warning "A grant on a bucket root reaches one storage only"
    Each storage is its own bucket, so a permission you set on the root of a bucket applies to that storage alone. To open a second storage, set a permission on that storage too.

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

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither sees the other's when browsing the lake. If the analytics team sets a folder of reference data to **Anyone can read**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While it stays **Private**, only administrators reach it. Set it to **Anyone can read & write**, and anyone in the organization can read and write to it.

**A second storage for archives.** An administrator adds a storage named `archive` to the connection. Clients then reach it as the bucket `archive`. A grant on the root of `archive` opens that storage alone. It opens nothing in the main storage, because the main storage is a different bucket.

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — connect the bucket and add a storage
* [Storage explorer](./storage-explorer.md) — browse and manage files in the Portal
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how the Data Lake and Lakehouse fit together

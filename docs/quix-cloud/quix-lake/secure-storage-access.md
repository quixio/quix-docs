---
title: Storage Access Gateway
description: How Quix keeps your lake data private by default, with each team seeing only its own data even though the whole organization shares one storage bucket.
---

# Storage Access Gateway

Every cluster connects to a single storage bucket for [Quix Lake](./overview.md), and that bucket is shared across your whole organization. The **Storage Access Gateway** controls who can see and change what inside it, so each team only works with the data it is meant to.

It sits between the platform and your storage and checks every request. It confirms who is asking and which data they are allowed to reach, then lets through only what they are permitted to see.

!!! info "Nothing to set up"
    The gateway is active automatically once a [blob storage connection](./blob-storage.md) exists for the cluster. There are no keys to manage and no settings to configure.

## Two kinds of folders

How a folder behaves by default depends on its kind. You can see and change this in the **Storage permissions** panel, where every folder shows its current visibility.

**Environment folders.** Each environment keeps its lake data in its own folder, shown with a people icon. Its default visibility is **User Permissions**: members get the same read and write access they have in that environment. If you can view the environment you can read its data, and if you can edit the environment you can write to it. Other teams cannot see it unless it is shared.

**Other folders.** Any folder that is not tied to an environment, such as one you create yourself in the bucket, is shown with a lock icon. Its default visibility is **Private**: no one in the organization can access it, only organization administrators. It becomes available to others only when someone shares it.

## What it does

**Keeps each team's data to itself.** The data an environment writes is visible only to that environment's members. Other teams in the organization cannot see it.

**Keeps storage keys protected.** The credentials for your bucket stay inside the gateway and are never handed to the rest of the platform.

**Leaves your data in place.** The gateway only governs access. Your files stay in your own cloud storage, untouched.

## Folder visibility

You set a folder's visibility from the menu on its row in the **Storage permissions** panel. Opening a folder past its default is called *sharing*, and there are two sharing levels: **Anyone can read** and **Anyone can read & write**. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means | Default for |
|---|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment | Environment folders |
| **Private** | No one in your organization can access it (administrators only) | Other folders |
| **Anyone can read** | Everyone in your organization can read it | Opt-in |
| **Anyone can read & write** | Everyone in your organization can read and change it | Opt-in |

!!! note "Sharing stays within your organization"
    Sharing only ever opens a folder to people signed in to your Quix organization. It is never exposed to the public internet.

## Who can read and write

You get the same access to an environment's data as you already have to the environment itself:

| Your access to the environment | What you can do with its data |
|---|---|
| **Can view** | Read it |
| **Can edit** | Read it and change it |
| **No access** | Nothing, unless the data has been shared |

The same applies to things acting on your behalf:

* A **dev session** can do exactly what you can.
* A **deployed application** acts as its own environment: it can read its own data and anything shared, and change its own data. It cannot see another team's private data.

## Where it applies

You work with the lake exactly as before. The gateway only determines what appears:

* **[Data Lake](./data-lake/user-interface.md):** when you browse, you only see the environments and folders you are allowed to see.
* **[Lakehouse](./lakehouse/overview.md):** SQL queries return results only from environments you belong to or that have been shared with you.
* **[Blob storage](./blob-storage.md):** the bucket is still connected once per cluster, and access to its contents is now governed per folder.

## Examples

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither can see the other's when browsing the lake. If the analytics team sets a folder of reference data to **Anyone can read**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While it stays **Private**, only administrators can reach it. Set it to **Anyone can read & write**, and anyone in the organization can read and write to it.

## See also

* [Quix Lake overview](./overview.md): how the Data Lake and Lakehouse fit together
* [Blob storage connections](./blob-storage.md): connect the bucket this sits in front of
* [Data Lake user interface](./data-lake/user-interface.md): browse your datasets
* [Lakehouse](./lakehouse/overview.md): run SQL over your data

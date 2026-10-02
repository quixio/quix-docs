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

A connection holds one main storage and any number of extra storages that an administrator adds. Your clients address **one bucket**, the Quix Lake bucket, and **each storage is a folder** inside it. The **Folder** of a storage is that folder name.

Only the **main storage** may sit at the **root** of the bucket. Every other storage has a folder. The main storage may take a folder of its own too.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://<workspaceId>/                  the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/    a folder in the storage named minio
```

Each storage keeps its own bucket and its own credentials behind the gateway, so one bucket name hides several providers. A new storage never moves a storage that is already there. See [Quix Lake connections and storages](./blob-storage.md) for how you add a storage.

The gateway takes the storage folder off the key and changes nothing else. So an object you write lands at the same key in the bucket behind the storage.

A LIST at the root of the Quix Lake bucket names every storage the caller may reach, as a folder. The gateway merges the answer across the storages behind it. **ListBuckets** answers that one bucket, so a client discovers the storages with that root listing. A deployment credential that holds only its environment grant cannot list the root. It gets `403 AccessDenied`.

## The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the **main storage**. It always follows the main storage, so a [main storage move](./blob-storage.md#make-a-storage-the-main-storage) points it at the new one. Quix copies no data, so the shortcut answers empty until someone copies the environment folders across. See [The environment shortcut](./s3-endpoint.md#the-environment-shortcut).

## Two kinds of folders

How a folder behaves by default depends on its kind. You see and change this in the **Default Permissions** tab, where every folder shows its current visibility.

**Environment folders.** Each environment keeps its lake data in its own folder, which carries the **Environment** badge. While it keeps its default, the **Effective access** column shows a people icon and **User Permissions**. Its default visibility is **User Permissions**: members get the same read and write access they have in that environment. If you can view the environment you can read its data, and if you can edit the environment you can write to it. Other teams cannot see it unless someone shares it.

**Other folders.** Any folder that is not tied to an environment shows a lock icon and **Private** in the **Effective access** column while it keeps its default. A folder you create yourself is one example. Its default visibility is **Private**: only its members and the people you share it with can reach it. Organization administrators can list it, but they need permission to read or write it. It becomes available to others only when someone shares it.

## What administrators can do

An organization administrator can list every folder in every storage. This is the only permission an administrator bypasses. Open, download, upload, delete and new folder follow the storage permissions, like for any user. An administrator who has an explicit grant on a folder, or who meets a public folder, gets that access there. An administrator who is also a direct member of an environment keeps that member access.

The File Explorer follows the same rule as the S3 endpoint. A folder an administrator can list but cannot read shows a lock and **No access**.

## Set permissions for a user or a group

Open the **Storage permissions** tab of a user or of a group. The tab shows a folder tree. Each folder has an **Access** list and an **Effective access** column.

The **Storage permission source** banner says where a user gets storage permissions from:

| Source | What it does |
|---|---|
| **User specific** | The folder permissions you set on this tab apply to the user. The permissions of the user's group also reach the user. On a group page, this reads **Group specific**. |
| **Group** | The permissions of the user's group apply. The folder permissions of the user stay suspended. The option is off when the user is not in a group. |
| **Organization default** | Only the [Default Permissions](#folder-visibility) of the organization apply. The folder permissions of the user and of the group stay suspended. |

While the source is **Group** or **Organization default**, the **Access** lists of the user are read only. A change of source can take up to one minute to apply.

When you change a folder, a bar shows **Cancel** and **Save changes**. Nothing changes until you click **Save changes**. Only administrators can edit permissions.

### Effective access

**Effective access** shows what the user gets on the folder. The labels are **No Access**, **Read Access**, **Write Access** and **Read-Write Access**. A pill says where the value comes from: **Assigned** (set on this folder), **Inherited (from ...)** or **Override**. A group page shows **Environment Access** on an environment folder, because the result differs for each member.

A permission on a folder for a user or a group is a ceiling. For example, an editor with a **Read Access** grant gets read access only.

!!! note "No Access wins over public visibility"
    A **No Access** grant on a folder denies access, even when the folder is public. A read only grant does not block a public write.

## Folder visibility

You set a folder's visibility in the **Access** list on its row in the **Default Permissions** tab, and then click **Save**. **Inherited** removes the folder's own setting, so the parent folder decides. Opening a folder past its default is called *sharing*. There are two sharing levels: **Public - Anyone can read** and **Public - Anyone can read & write**. A folder's setting applies to everything beneath it, unless a deeper folder overrides it.

| Visibility | What it means | Default for |
|---|---|---|
| **User Permissions** | Members get the same read and write access they have in that environment | Environment folders |
| **Private** | No one can access it without permission. Administrators can only list it. | Other folders |
| **Public - Anyone can read** | Everyone in your organization can read it | Opt-in |
| **Public - Anyone can read & write** | Everyone in your organization can read and change it | Opt-in |

!!! warning "A permission on the bucket root reaches every storage"
    Every storage is a folder of one bucket. So a permission you set on the **bucket root** reaches every folder of every storage on the connection. To open one storage alone, set the permission on that storage's folder instead. The tab shows a **Bucket root** row only while the main storage sits at the root of the bucket.

!!! note "A rename carries the permissions with it"
    When an administrator [renames a storage](./blob-storage.md#rename-a-storage), Quix moves the permissions of that folder to the new folder. Nobody loses access, and no permission stays behind on the old folder for a later storage to inherit.

    A [main storage move](./blob-storage.md#make-a-storage-the-main-storage) does the same for the storage that steps down: its permissions move into the folder it gains, so you rebuild nothing.

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

* **[File Explorer](./file-explorer.md):** you see the storages, environments, and folders you are allowed to see.
* **[Data Lake](./data-lake/user-interface.md):** when you browse, you only see the environments and folders you are allowed to see.
* **[Lakehouse](./lakehouse/overview.md):** SQL queries return results only from environments you belong to, or that someone shared with you.
* **[S3-compatible endpoint](./s3-endpoint.md):** the gateway applies the same rules to every S3 request your code makes.

## Examples

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither sees the other's when browsing the lake. If the analytics team sets a folder of reference data to **Public - Anyone can read**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While it stays **Private**, administrators can list it but cannot read or write it. Set it to **Public - Anyone can read & write**, and anyone in the organization can read and write to it.

**A second storage for archives.** An administrator adds a storage named `archive` to the connection. Clients then reach it as the folder `archive/` of its bucket. A permission on that folder opens that storage alone. A permission on the bucket root opens every storage, the main storage included, so set it on the folder when you mean one storage.

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — connect the bucket and add a storage
* [File Explorer](./file-explorer.md) — browse and manage files in the Portal
* [S3-compatible endpoint](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how the Data Lake and Lakehouse fit together

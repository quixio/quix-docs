---
title: Storage Access Gateway
description: How Quix keeps your Quix Lake data private by default, so each team only sees its own data although the whole organization shares one connection.
---

# Storage Access Gateway

Each cluster and node group connects to object storage for [Quix Lake](./overview.md), and your whole organization shares that storage. The **Storage Access Gateway** controls who can see and change what inside it, so each team only works with the data it is meant to.

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

A LIST at the root of the Quix Lake bucket names every storage of the connection, as a folder. Inside each folder, the gateway shows only what the caller may read. The gateway merges the answer across the storages behind it. **ListBuckets** answers that one bucket, so a client discovers the storages with that root listing. A deployment credential that holds only its environment grant cannot list the root. It gets `403 AccessDenied`.

## The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the **main storage**. It always follows the main storage, so a [main storage move](./blob-storage.md#make-a-storage-the-main-storage) points it at the new one. Quix copies no data, so the shortcut answers empty until someone copies the environment folders across. See [The environment shortcut](./s3-endpoint.md#the-environment-shortcut).

## Two kinds of folders

How a folder behaves by default depends on its kind. You see and change this in the **Default Permissions** tab, where every folder shows its current access.

**Environment folders.** Each environment keeps its lake data in its own folder, which carries the **Environment** badge. While it keeps its default, the **Effective access** column shows a people icon and **Project permissions**. Its default is **Project permissions**: members get the same read and write access they have in that environment. If you can view the environment you can read its data, and if you can edit the environment you can write to it. Other teams cannot see it unless someone shares it.

**Other folders.** Any folder that is not tied to an environment shows a lock icon and **No Access** in the **Effective access** column while it keeps its default. A folder you create yourself is one example. Its default is **No Access**: only the people with a user or group permission on it can reach it. Organization administrators can list it, but they need permission to read or write it. It becomes available to others only when someone shares it.

## What administrators can do

An organization administrator can list every folder in every storage. On an environment folder, and the folders below it, the Admin role counts like a project role, so an administrator can read and write there. On any other folder, an administrator can only list. Open, download, upload, delete and new folder follow the storage permissions there, like for any user. An administrator who has an explicit grant on such a folder, or who meets a folder that the **Default Permissions** open, gets that access there.

The File Explorer follows the same rule as the S3 endpoint. A folder an administrator can list but cannot read shows a lock and **No Access**.

## Set permissions for a user or a group

Open the **Storage permissions** tab of a user or of a group. The tab shows a folder tree. Each folder has an **Access** list and an **Effective access** column.

The **Storage permission source** banner says where a user gets storage permissions from:

| Source | What it does |
|---|---|
| **User specific** | The folder permissions you set on this tab apply to the user. The permissions of the user's group fill the folders the user did not set. On a group page, this reads **Group specific**. |
| **Group** | The permissions of the user's group apply. The folder permissions of the user stay suspended. The option is off when the user is not in a group. |
| **Default Permissions** | Only the [Default Permissions](#default-permissions) and the project role of the user apply. The folder permissions of the user and of the group stay suspended. |

While the source is **Group** or **Default Permissions**, the **Access** lists of the user are read only. A change of source can take up to one minute to apply.

The **Access** list of a user or a group has the same choices as the **Default Permissions** page:

- Environment folder: **Inherited**, **Project permissions**, **Read Access** and **Read-Write Access**. It has no **No Access**.
- Other folders: **Inherited**, **No Access**, **Read Access** and **Read-Write Access**.
- The bucket root has **Inherited** in these tables. It does not have it on the **Default Permissions** page.

**Project permissions** saves the same value as on the **Default Permissions** page. The project role then decides.

When you change a folder, a bar shows **Cancel** and **Save changes**. Nothing changes until you click **Save changes**. Only organization Admins, Managers and Editors can edit permissions.

### Access and Effective access {#effective-access}

What the **Access** column shows depends on the source:

- **User specific:** the settings of the user.
- **Group:** an exact copy of the **Access** column of the group's own **Storage permissions** page.
- **Default Permissions:** an exact copy of the **Access** column of the **Default Permissions** page.

On a user page, **Effective access** always shows the real access of the user, by the rule user, then group, then default. The labels are **No Access**, **Read Access**, **Write Access** and **Read-Write Access**. Where the project role shapes the level, an icon shows it:

- A yellow people icon: the project role decides the level, raises it, or gives the same level.
- A red block icon: a user or group setting keeps the project role out.

A tag says where the value comes from. The user page and the group page show these tags. The **Default Permissions** page shows only **Assigned**, **Inherited (from parent folder)**, **Inherited (from default)** and **Inherited (from project permissions)**:

| Tag | Meaning |
|---|---|
| **Assigned** | A setting on this folder |
| **Override** | A **No Access** on this folder that takes away a wider grant, the **Default Permissions** or the project role |
| **Inherited (from parent folder)** | The setting of a folder above, the storage root included |
| **Inherited (from group)** | The setting of the user's group |
| **Inherited (from default)** | The **Default Permissions**, or nothing set |
| **Inherited (from project permissions)** | The project role of the user in that environment |
| **Inherited (from organization role)** | The organization role of the user |

The tooltip of the **Effective access** cell names the folder, the group or the role.

A group page shows **Project permissions** on an environment folder when no grant and no **Default Permissions** give access there, because the result differs for each member.

A permission on a folder for a user or a group is a ceiling. For example, an editor with a **Read Access** grant gets read access only.

!!! note "A grant wins over the Default Permissions"
    A grant on a folder for a user or a group removes the **Default Permissions** for that user. **No Access** denies access, even when the **Default Permissions** give access. The exception is **Project permissions** on an environment folder: the project role decides there. **Read Access** on a folder whose **Default Permissions** are **Read-Write Access** gives read access only.

## How access is decided

The rule is: user, then group, always wins. Quix checks these steps in order for each folder:

1. **A user setting always wins.** The closest user setting applies. It can be on this folder or on a folder above.
2. **No user setting?** A group setting always wins. The closest group setting applies.
3. **No user or group setting?** The **Default Permissions** and the project role both apply. The higher one wins.
4. **An organization administrator** gets read-write access on environment folders, and the folders below them, through the Admin role. On other folders, the administrator sees the folder list only.

A user or group setting is a ceiling: the **Default Permissions** and the project role add nothing. A group setting never beats a user setting, also when the group setting is closer to the folder.

The project role counts only in that environment's folder and the folders below it. **Viewer** gives read access. **Editor** and above give read-write access.

The same rule applies to things that act for you:

* A **dev session** can do exactly what you can.
* A **deployed application** acts as its own environment. It reads its own data and anything shared, and changes its own data. It does not see another team's private data.

**Storage permission source.** **User specific** keeps the user's own permissions, and the group fills the folders the user did not set. **Group** and **Default Permissions** suspend the user's own permissions. Quix deletes nothing. **Default Permissions** also stops the group, so only the **Default Permissions** and the project role apply.

**Choosing Inherited.** On a user or group permission, **Inherited** removes the setting on that folder, so the next step of the rule applies. On the **Default Permissions** tab, **Inherited** removes the folder's own setting, so the parent folder decides.

**Example.** The user is in a group. The user has **No Access** on the root. The group has **Read Access** on `code/`.

| Folder | User setting | Group setting | Result |
|---|---|---|---|
| root | No Access | none | No Access |
| `code/` | none above or on it, except the root | Read Access | No Access: the user setting on the root wins over the group setting |

!!! tip "Share a private folder with one team"
    Give the team a group permission on the folder. Do not open the folder in **Default Permissions**. **Default Permissions** open the folder to the whole organization.

## Default Permissions

<a id="folder-visibility"></a>

The **Default Permissions** tab of the connection sets what everyone in your organization can do with a folder. Set the **Access** list on the row of the folder, and then click **Save changes**. **Inherited** removes the folder's own setting, so the parent folder decides. Opening a folder past its default is called *sharing*. A folder's setting applies to everything beneath it, unless a deeper folder sets its own. User and group settings follow [the rule above](#how-access-is-decided).

| Access | What it means | Default for |
|---|---|---|
| **Project permissions** | The project role decides: members get the same read and write access they have in that environment | Environment folders |
| **No Access** | No one can access it without a user or group permission. Administrators can only list it. | Other folders |
| **Read Access** | Everyone in your organization can read it | Opt-in |
| **Read-Write Access** | Everyone in your organization can read and change it | Opt-in |

!!! warning "A permission on the bucket root reaches every storage"
    Every storage is a folder of one bucket. So a permission you set on the **bucket root** reaches every folder of every storage on the connection. To open one storage alone, set the permission on that storage's folder instead. The row of the main storage, with the **Main** badge, is the bucket root only while the main storage sits at the root of the bucket.

!!! note "A rename carries the permissions with it"
    When an administrator [renames a storage](./blob-storage.md#rename-a-storage), Quix moves the permissions of that folder to the new folder. Nobody loses access, and no permission stays behind on the old folder for a later storage to inherit.

    A [main storage move](./blob-storage.md#make-a-storage-the-main-storage) does the same for the storage that steps down: its permissions move into the folder it gains, so you rebuild nothing.

!!! note "Sharing stays within your organization"
    Sharing only ever opens a folder to people signed in to your Quix organization. Quix never exposes it to the public internet.

## What the gateway does

**Keeps each team's data to itself.** Only that environment's members see the data an environment writes. Other teams in the organization do not see it.

**Keeps storage keys protected.** The credentials for your bucket stay inside the gateway. The gateway never hands them to the rest of the platform.

**Leaves your data in place.** The gateway only governs access. Your files stay in your own object storage, untouched.

## Where it applies

You work with the lake exactly as before. The gateway only determines what appears:

* **[File Explorer](./file-explorer.md):** you see the storages, environments, and folders you are allowed to see.
* **[Data Lake](./data-lake/user-interface.md):** when you browse, you only see the environments and folders you are allowed to see.
* **[Lakehouse](./lakehouse/overview.md):** SQL queries return results only from environments you belong to, or that someone shared with you.
* **S3-compatible endpoint:** the gateway applies the same rules to every S3 request your code makes. See [How to connect](./s3-endpoint.md).

## Examples

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither sees the other's when browsing the lake. If an administrator gives a folder of reference data **Read Access** in **Default Permissions**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While its **Default Permissions** stay **No Access**, administrators can list it but cannot read or write it. Give it **Read-Write Access** in **Default Permissions**, and anyone in the organization can read and write to it.

**A second storage for archives.** An administrator adds a storage named `archive` to the connection. Clients then reach it as the folder `archive/` of its bucket. A permission on that folder opens that storage alone. A permission on the bucket root opens every storage, the main storage included, so set it on the folder when you mean one storage.

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — connect the bucket and add a storage
* [File Explorer](./file-explorer.md) — browse and manage files in the Portal
* [How to connect](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how the Data Lake and Lakehouse fit together

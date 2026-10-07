---
title: Storage permissions
description: Who can read and change each folder of your Quix Lake storage, and how the Storage Access Gateway keeps each team's data private by default although the whole organization shares one connection.
---

<a id="storage-access-gateway"></a>

# Storage permissions

Each cluster and node group connects to object storage for [Quix Lake](./overview.md), and your whole organization shares that storage. **Storage permissions** decide who can read and change each folder inside it. By default, each team only works with the data of its own environments.

Each storage of the connection is a folder of one bucket, the Quix Lake bucket. So a storage permission is always a permission on a folder. The [Storage Access Gateway](#the-storage-access-gateway) applies the permissions to every request.

## How access is decided

The rule is: user, then group, always wins. Quix checks these steps in order for each folder:

1. **A user setting always wins.** The closest user setting applies. It can be on this folder or on a folder above.
2. **No user setting?** A group setting always wins. The closest group setting applies.
3. **No user or group setting?** The **Default Permissions** and the [project role](#the-project-role) both apply. The higher one wins.

The [Storage permission source](#set-permissions-for-a-user-or-a-group) of the user can suspend the user settings or the group settings. Organization administrators follow the same steps, and they can also list every folder. See [What administrators can do](#what-administrators-can-do).

A user or group setting is a ceiling. The **Default Permissions** and the project role add nothing to it:

- An editor with a **Read Access** setting on a folder gets read access only.
- **Read Access** on a folder whose **Default Permissions** are **Read-Write Access** gives read access only.
- **No Access** denies access, even when the **Default Permissions** give access.
- The exception is **Project permissions** on an environment folder. The project role decides there.

A group setting never beats a user setting, also when the group setting is closer to the folder.

The same rule applies to things that act for you:

* A **dev session** can do exactly what you can.
* A **deployed application** acts as its own environment. It reads its own data and anything shared, and changes its own data. It does not see another team's private data.

**Choosing Inherited.** On a user or group permission, **Inherited** removes the setting on that folder, so the next step of the rule applies. On the **Default Permissions** tab, **Inherited** removes the folder's own setting, so the parent folder decides.

**Example.** The user is in a group. The user has **No Access** on the root. The group has **Read Access** on `code/`.

| Folder | User setting | Group setting | Result |
|---|---|---|---|
| root | No Access | none | No Access |
| `code/` | none above or on it, except the root | Read Access | No Access: the user setting on the root wins over the group setting |

### The project role

The project role is the [role](../roles.md) that Quix uses for an environment folder:

1. Your role on the environment, when you have one.
2. Else, your role on the project of the environment.
3. Else, your role on the organization.

The closest role decides, also when it gives less access than a role further up. With **Inherit from group** on, the roles of your group are your roles. If the group has no roles, you get no storage access from a role.

The project role counts only in an environment folder and the folders below it. This is true in every storage of the connection. **Viewer** gives read access. **Editor** and above give read-write access.

A change of a role, of the roles of a group, or of **Inherit from group** applies to storage access at once.

## Two kinds of folders

How a folder behaves by default depends on its kind. You see and change this in the **Default Permissions** tab, where every folder shows its current access.

**Environment folders.** An environment folder is a folder directly under the root of a storage, with the ID of an environment as its name. This is true in every storage: the main storage and each storage that an administrator adds. An environment folder carries the **Environment** badge. Its default is **Project permissions**: the [project role](#the-project-role) decides. While it keeps its default, the **Effective access** column shows a people icon and **Project permissions**. Other teams cannot see it unless someone shares it.

**Other folders.** Any folder that is not an environment folder shows a lock icon and **No Access** in the **Effective access** column while it keeps its default. A folder you create yourself is one example. Its default is **No Access**: only the people with a user or group permission on it can reach it. Organization administrators can list it, but they need permission to read or write it. It becomes available to others only when someone shares it.

## What administrators can do

An organization administrator can list every folder in every storage. To read or write, an administrator follows [the same rule](#how-access-is-decided) as any user:

- On an environment folder, and the folders below it, the project role counts. When the administrator has no role on the environment or on its project, the project role is Admin. Admin gives read-write access.
- When the administrator has a closer role, that role decides. For example, **Viewer** on an environment gives read access there.
- On any other folder, an administrator can only list. Open, download, upload, delete and new folder follow the storage permissions there, like for any user.
- A user or group setting for the administrator, or **Default Permissions** that open the folder, give that access.

The File Explorer follows the same rule as the S3 endpoint. A folder an administrator can list but cannot read shows a lock and **No Access**.

## Set permissions for a user or a group

Open the **Storage permissions** tab of a user or of a group. The tab shows a folder tree. Each folder has an **Access** list and an **Effective access** column. Only organization Admins can save storage permissions.

The **Storage permission source** banner says where a user gets storage permissions from. Each user has one source:

- **User specific:** The folder permissions you set on this tab apply to the user. A folder with no user permission on it or above it uses the group permissions. On a group page, this reads **Group specific**.
- **Group:** The permissions of the user's group apply. Quix suspends the folder permissions of the user. The option is off when the user is not in a group.
- **Default Permissions:** Only the [Default Permissions](#default-permissions) and the project role of the user apply. Quix suspends the folder permissions of the user and of the group. On a group page, it suspends the permissions of the group for all its members.

A change of source deletes no permission.

A user with no saved source and no folder permissions of their own shows **Group** when the user is in a group. Else, the user shows **Default Permissions**. This is the source that applies to the user. Pick **User specific** to give the user folder permissions of their own.

While the source is **Group** or **Default Permissions**, the **Access** lists of the user are read only. A new source applies only after you click **Save changes**, and then it applies at once. If the gateway does not get the change notice, the change can take up to one minute to apply. If the save fails for one storage, a message names that storage. **Try again** retries only that storage.

The **Access** list of a user or a group has the same choices as the **Default Permissions** page:

- Environment folder, in every storage: **Inherited**, **Project permissions**, **Read Access** and **Read-Write Access**. It has no **No Access**.
- Other folders: **Inherited**, **No Access**, **Read Access** and **Read-Write Access**.
- The bucket root has **Inherited** in these tables. It does not have it on the **Default Permissions** page.

**Project permissions** saves the same value as on the **Default Permissions** page. The project role then decides.

When you change a folder, a bar shows **Cancel** and **Save changes**. Nothing changes until you click **Save changes**.

### Access and Effective access {#effective-access}

What the **Access** column shows depends on the source:

- **User specific:** the settings of the user.
- **Group:** an exact copy of the **Access** column of the group's own **Storage permissions** page.
- **Default Permissions:** an exact copy of the **Access** column of the **Default Permissions** page.

On a user page, **Effective access** always shows the real access of the user. It follows the rule user, then group, then the higher of the **Default Permissions** and the project role. The labels are **No Access**, **Read Access**, **Write Access** and **Read-Write Access**. Where the project role shapes the level, an icon shows it:

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

The tooltip of the **Effective access** cell names the folder, the group or the role.

A group page shows **Project permissions** on an environment folder when no grant and no **Default Permissions** give access there, because the result differs for each member.

## Default Permissions

<a id="folder-visibility"></a>

The **Default Permissions** tab of the connection sets what everyone in your organization can do with a folder. Set the **Access** list on the row of the folder, and then click **Save changes**. **Inherited** removes the folder's own setting, so the parent folder decides. Opening a folder past its default is called *sharing*. A folder's setting applies to everything beneath it, unless a deeper folder sets its own. User and group settings follow [the rule above](#how-access-is-decided).

| Access | What it means | Default for |
|---|---|---|
| **Project permissions** | The [project role](#the-project-role) decides: members get the read and write access that their role on that environment gives | Environment folders |
| **No Access** | No one can access it without a user or group permission. Administrators can only list it. | Other folders |
| **Read Access** | Everyone in your organization can read it | Opt-in |
| **Read-Write Access** | Everyone in your organization can read and change it | Opt-in |

!!! warning "A permission on the bucket root reaches every storage"
    [Every storage is a folder of one bucket](#each-storage-is-a-folder-of-one-bucket). So a permission you set on the **bucket root** reaches every folder of every storage on the connection. To open one storage alone, set the permission on that storage's folder instead. The row of the main storage, with the **Main** badge, is the bucket root only while the main storage sits at the root of the bucket.

!!! tip "Share a private folder with one team"
    Give the team a group permission on the folder. Do not open the folder in **Default Permissions**. **Default Permissions** open the folder to the whole organization.

!!! note "A rename carries the permissions with it"
    When an administrator [renames a storage](./blob-storage.md#rename-a-storage), Quix moves the permissions of that folder to the new folder. Nobody loses access, and no permission stays behind on the old folder for a later storage to inherit.

    A [main storage move](./blob-storage.md#make-a-storage-the-main-storage) does the same for the storage that steps down: its permissions move into the folder it gains, so you rebuild nothing.

!!! note "Sharing stays within your organization"
    Sharing only ever opens a folder to people signed in to your Quix organization. Quix never exposes it to the public internet.

## Examples

**Two environments.** An analytics team and an operations team work in separate environments in the same organization. By default, each team sees only its own environment's data, and neither sees the other's when browsing the lake. If an administrator gives a folder of reference data **Read Access** in **Default Permissions**, every team can then read it, but no one else can change it.

**A shared working folder.** Someone creates a folder in the bucket that is not tied to any environment. While its **Default Permissions** stay **No Access**, administrators can list it but cannot read or write it. Give it **Read-Write Access** in **Default Permissions**, and anyone in the organization can read and write to it.

**A second storage for archives.** An administrator adds a storage named `archive` to the connection. Clients then reach it as the folder `archive/` of its bucket. A permission on that folder opens that storage alone. A permission on the bucket root opens every storage, the main storage included, so set it on the folder when you mean one storage.

## The Storage Access Gateway

The **Storage Access Gateway** applies the storage permissions. It sits between the platform and your object storage, and it checks every request. It confirms who is asking and which data the caller may reach. Then it passes through only what the caller may see.

!!! info "Nothing to set up"
    The gateway starts automatically once a [Quix Lake connection](./blob-storage.md) exists for the cluster. You manage no keys and configure no settings.

<a id="what-the-gateway-does"></a>

### Why Quix uses a gateway

Your whole organization shares the storage of a connection. The gateway lets each team work with its own data, and no other part of the platform needs the storage keys:

- **It keeps each team's data to itself.** Only that environment's members see the data an environment writes. Other teams in the organization do not see it.
- **It keeps storage keys protected.** The credentials for your bucket stay inside the gateway. The gateway never hands them to the rest of the platform.
- **It leaves your data in place.** The gateway only governs access. Your files stay in your own object storage, untouched.

### Each storage is a folder of one bucket

A connection holds one main storage and any number of extra storages that an administrator adds. Your clients address **one bucket**, the Quix Lake bucket, and **each storage is a folder** inside it. The **Folder** of a storage is that folder name.

Only the **main storage** may sit at the **root** of the bucket. Every other storage has a folder. The main storage may take a folder of its own too.

```text
s3://quixdevbucket/<workspaceId>/    an environment's data in the main storage
s3://<workspaceId>/                  the same data, through the environment shortcut
s3://quixdevbucket/minio/reports/    a folder in the storage named minio
```

Each storage keeps its own bucket and its own credentials behind the gateway, so one bucket name hides several providers. A new storage never moves a storage that is already there. See [Quix Lake connections and storages](./blob-storage.md) for how you add a storage.

The gateway takes the storage folder off the key and changes nothing else. So an object you write lands at the same key in the bucket behind the storage.

A LIST at the root of the Quix Lake bucket names every storage of the connection, as a folder:

- Inside each folder, the gateway shows only what the caller may read.
- The gateway merges the answer across the storages behind it.
- **ListBuckets** answers that one bucket, so a client discovers the storages with that root listing.
- A deployment credential that holds only its environment grant cannot list the root. It gets `403 AccessDenied`.

### The environment shortcut

`s3://<workspaceId>/` reaches that environment's folder inside the **main storage**. It always follows the main storage, so a [main storage move](./blob-storage.md#make-a-storage-the-main-storage) points it at the new one. Quix copies no data, so the shortcut answers empty until someone copies the environment folders across. See [The environment shortcut](./s3-endpoint.md#the-environment-shortcut).

### Where it applies

You work with the lake exactly as before. The gateway only determines what appears:

* **[File Explorer](./file-explorer.md):** you see the storages, environments, and folders you are allowed to see.
* **[Data Lake](./data-lake/user-interface.md):** when you browse, you only see the environments and folders you are allowed to see.
* **[Lakehouse](./lakehouse/overview.md):** SQL queries return results only from environments you belong to, or that someone shared with you.
* **S3-compatible endpoint:** the gateway applies the same rules to every S3 request your code makes. See [How to connect](./s3-endpoint.md).

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — connect the bucket and add a storage
* [File Explorer](./file-explorer.md) — browse and manage files in the Portal
* [How to connect](./s3-endpoint.md) — reach the same data from your code
* [Quix Lake overview](./overview.md) — how the Data Lake and Lakehouse fit together
* [Roles and permissions](../roles.md) — the roles that decide the project role

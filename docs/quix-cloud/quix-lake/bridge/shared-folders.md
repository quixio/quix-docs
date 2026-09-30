---
title: Shared folders and the bucket root
description: Share a folder or a network server on the bridge, set it read only, and set the bucket root that a sink writes to.
---

# Shared folders and the bucket root

You share folders in the bridge console, on the **Folders** tab. Quix sees a shared folder as a folder of the bridge storage. See [How paths work](./overview.md#how-paths-work) for the address of a file.

## Share a folder

1. Open the bridge console. See [The bridge console](./console.md).
2. Open the **Folders** tab.
3. Find the folder in the tree and turn it to **Shared**.

A new share is read only. The **Allow write access** box starts off. Turn it on to let Quix write to the folder. Click **Edit this share** on the shared row to change it later. A share you add, edit or remove in the console takes effect at once. The console saves every change to `config.yaml`. A change you make in the file applies without a restart. So does a change from `quix-bridge share`.

The tree shows only the folders that the service account can read. Some folders show a state instead of a switch:

| State | Meaning |
|---|---|
| **Share a folder inside it** | The folder holds the operating system, such as `C:\Windows`. Open it and share a folder inside it. |
| **Cannot be shared** | An administrative share, such as `\\server\C$`. You cannot share it or a folder inside it. |
| **N folders inside are shared** | The folder holds shared folders. Open the folder to reach the shares. |

The bridge refuses `\Windows` on every drive, the administrative shares, and `/etc` on Linux. It shares a drive root, `\Users` on any drive, `/` and `/home` as read only. Share a folder inside them to allow writes.

## Share a network folder

1. On the **Folders** tab, click **Add a network server**.
2. Name the server as `\\server\share`.
3. Give the server credential in the console. The console never shows it again.

The bridge runs as its own service account. On Windows this is `NT SERVICE\quix-bridge`. On Linux it is the system user `quix-bridge`. So it cannot see a drive letter that you mapped. On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

## Share a folder in a user profile on Windows

On Windows the service runs as `NT SERVICE\quix-bridge`. That account cannot read a folder in a user profile, such as `C:\Users\alice\data`. `quix-bridge test` and the folder check on the **Health** tab then report that the service cannot read the share.

Give the service account access to that one folder, in an administrator prompt:

```powershell
# Read only share
icacls "C:\Users\alice\data" /grant "NT SERVICE\quix-bridge:(OI)(CI)RX"

# Read and write share
icacls "C:\Users\alice\data" /grant "NT SERVICE\quix-bridge:(OI)(CI)M"
```

`(OI)(CI)` makes the files and folders inside inherit the grant. Then run `quix-bridge test` again.

When you share the folder, the bridge tray does this for you. It grants the service account read access (`RX`) on a read only share, and `Modify` on a write share. Run `icacls` only if the tray cannot grant the access.

## Share a folder on Linux

On Linux the service runs as the system user `quix-bridge`. It has no login. `sudo quix-bridge service install` creates it when it does not exist.

`sudo quix-bridge share add <folder>` gives this user the rights it needs. It uses ACLs. It grants read and write for a read and write share, and read for a read only share. If a parent folder blocks the path, such as a private home folder, it also grants traverse rights on that parent. It never changes the owner or the mode of your folder. The `acl` package must be installed.

A share that you add in the web console cannot get the grant by itself. The console shows **Can't write** and the exact command to run. For example:

```bash
sudo setfacl -R -m u:quix-bridge:rwX -m d:u:quix-bridge:rwX "/srv/data"
```

A folder under a private home folder also needs traverse rights on the parent:

```bash
sudo setfacl -m u:quix-bridge:x /home/alice
```

!!! note
    A network mount takes its rights from the mount options, not from ACLs. Set the mount options so that the user `quix-bridge` can read, and write if the share is read and write.

## The bucket root

A storage that maps **the whole machine**, not one shared folder, can use one writable folder for all its data. This folder is the **bucket root**. When the bridge has a bucket root, every key of that storage lands in the bucket root. The storage then no longer shows the shared folders.

A bridge needs a bucket root before it can be the [main storage](../blob-storage.md#make-a-storage-the-main-storage). It also needs one before the Portal creates a Lakehouse or a Data Lake service on it. Set the bucket root first, then create the service.

The bucket root is a **shared folder with an empty SAG path**. Set it on the **Folders** tab of the bridge console:

1. Share the folder, for example `D:\QuixData` or `/srv/quix`.
2. Click **Edit this share** on its row.
3. Clear the **SAG path** field, then save.

The tree marks the folder **Bucket root**. Only one folder can be the bucket root. The bucket root is always read and write. To move the bucket root, give this share a SAG path again, then clear the SAG path of another share.

## Next steps

* [Write to a bridge from a sink](./sinks.md) — make the bridge the main storage
* [The bridge console](./console.md) — the tabs, the health checks and the log
* [Command line setup](./command-line.md) — share folders with `quix-bridge share`

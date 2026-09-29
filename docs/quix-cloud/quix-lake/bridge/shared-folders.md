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

A new share is read and write. Click **Edit** on the shared row to make it read only. A share you add, edit or remove in the console takes effect at once.

The tree shows only the folders that the service account can read. Some folders show a state instead of a switch:

| State | Meaning |
|---|---|
| **Share a folder inside it** | The folder holds the operating system, such as `C:\Windows`. Open it and share a folder inside it. |
| **Cannot be shared** | An administrative share, such as `\\server\C$`. You cannot share it or a folder inside it. |
| **N folders inside are shared** | The folder holds shared folders. Open the folder to reach the shares. |

The bridge refuses `\Windows` on every drive, the administrative shares, and `/etc` on Linux. It shares a drive root, `\Users` on any drive, `/` and `/home` as read only. Share a folder inside them to allow writes.

!!! note "Changes from the command line"
    Before bridge version 0.1.11, a change from `quix-bridge share` or a hand edit of `config.yaml` needs a service restart. From 0.1.11, the bridge applies such a change at once.

## Share a network folder

1. On the **Folders** tab, click **Add a network server**.
2. Name the server as `\\server\share`.
3. Give the server credential in the console. The console never shows it again.

The bridge runs as its own service account. So it cannot see a drive letter that you mapped. On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

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

## The bucket root

A storage that maps **the whole machine**, not one shared folder, can use one writable folder for all its data. This folder is the **bucket root**. When the bridge has a bucket root, every key of that storage lands in the bucket root. The storage then no longer shows the shared folders.

A bridge needs a bucket root before it can be the [main storage](../blob-storage.md#make-a-storage-the-main-storage). It also needs one before the Portal creates a Lakehouse or a Data Lake service on it. Set the bucket root first, then create the service.

Set it on the **Folders** tab of the bridge console:

1. With no bucket root set, the tab shows an amber warning: **No bucket root**. Click **Choose a folder**, then pick a folder in the tree.
2. To use a path the tree does not show, click **or type a path**. Type the full path, for example `D:\QuixData` or `/srv/quix`. The bridge makes the folder if it is missing.
3. The tree marks the chosen folder with a **Bucket root** chip. To change it, click **Change**. To remove it, click **Clear**.

The console refuses a bucket root that is a share, holds a share, or sits inside a share.

!!! note "Changes in bridge version 0.1.11"
    From 0.1.11, the bucket root is a **shared folder whose Quix path is empty**. To make a share the bucket root, click **Edit this share** on its row and clear the **SAG path** field. Only one folder can be the bucket root. The bucket root is always read and write. The tree marks it **Bucket root**, and the console opens on the **Folders** tab. Every change you make in the console goes to `config.yaml`. A change you make in the file applies without a restart.

## Next steps

* [Write to a bridge from a sink](./sinks.md) — make the bridge the main storage
* [The bridge console](./console.md) — the tabs, the health checks and the log
* [Command line setup](./command-line.md) — share folders with `quix-bridge share`

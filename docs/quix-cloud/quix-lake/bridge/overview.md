---
title: Quix Lake Bridge overview
description: Serve folders on a machine you own as a Quix Lake storage, over outbound connections only, with no inbound port.
search:
  boost: 3
---

# Overview - Quix Lake Bridge

The **Quix Lake Bridge** is a small service that you install on a machine you own. It lets Quix Cloud read and write folders on that machine as one more **storage** of a [Quix Lake connection](../blob-storage.md). The folders can be on a local disk or on a network share. Your services reach the files with the same S3 calls, the same endpoint and the same credential as every other storage.

!!! warning "Preview"
    The Quix Lake Bridge is in preview. Get the releases at [github.com/quixio/quix-lake-bridge](https://github.com/quixio/quix-lake-bridge/releases){target=_blank}. The builds are not signed yet. The install scripts check the download against `SHA256SUMS` from the same release. They stop on a mismatch.

- The bridge opens **only outbound connections** to Quix. You open **no inbound port**.
- **You** choose the folders. The list of shared folders lives on your machine. Quix Cloud cannot add a folder to it.
- A bridge serves **one** Quix Lake connection and **one** storage on it.

<div>
<a class="md-button md-button--primary" href="./quickstart.html" style="margin-right:.5rem;">Try the Quickstart</a>
<br/>
</div>

## When to use it

Use a bridge when the data must stay on your machine, or when a tool on that machine writes the files. Examples:

- A test rig writes result files to a local disk. A Quix service reads them.
- A plant keeps its data on a network share. The Lakehouse queries it in place.
- A Data Lake Sink writes topic data to a folder on the machine. See [Write to a bridge from a sink](./sinks.md).

## Bridges and storages

A bridge and a storage are two separate things:

| | What it is | Where you manage it |
|---|---|---|
| **Bridge** | The machine, paired with the connection | **Quix Lake Bridges** tab of the connection |
| **Storage** | The folder in the Quix Lake bucket that gives the files an address | **Storages** tab of the connection |

One bridge serves one storage. A bridge that no storage uses reaches no client. The Portal marks it **Not used by a storage** and offers **Assign storage**.

The two have separate lifecycles:

- When you delete a storage, the bridge stays. You can pick it for a new storage.
- When you revoke a bridge, its storage stays. The storage shows **Bridge revoked** and moves no data until you pick another bridge for it.
- To remove a bridge, revoke it first. The Portal refuses the remove while a storage uses the bridge.

## How paths work

A bridge storage shows every folder that you share on the bridge, unless the bridge has a [bucket root](./shared-folders.md#the-bucket-root). The console calls the address of a file in Quix its **SAG path**. The SAG path of a file is:

```text
<folder>/<share>/<file>
```

- `<folder>` is the **Folder** of the storage, the storage root.
- `<share>` is the address of the shared folder on the machine.
- `<file>` is the path of the file inside the shared folder.

| On the machine | In Quix, for a storage with the folder `plant-fs` |
|---|---|
| `C:\quix-share\hello.txt` | `plant-fs/c/quix-share/hello.txt` |
| `D:\data\runs\r1.csv` | `plant-fs/d/data/runs/r1.csv` |
| `\\nas01\team\q3.csv` | `plant-fs/nas01/team/q3.csv` |
| `D:\Test Runs\2026-08 (final)\a.csv` | `plant-fs/d/test-runs/2026-08-final/a.csv` |
| `/srv/data/hello.txt` (Linux) | `plant-fs/srv/data/hello.txt` |

By default, the first name after the folder is the drive or the server. On Linux, it is the first folder of the shared path. The console also lets you pick a shorter address for a share. Every folder name in the shared path becomes lower case. Each run of spaces or symbols becomes one hyphen. The names of the files and folders inside the share do not change.

Only the folders you share are visible. A path outside a share answers **Access denied**.

## Revoke and remove a bridge

On the **Quix Lake Bridges** tab, open the menu of the bridge:

- **Revoke bridge** cuts the bridge off. The machine must pair again to come back. The storage of the bridge stays. It shows **Bridge revoked** until you pick another bridge for it.
- **Remove bridge** removes the record of a revoked bridge from the connection. The Portal refuses the remove while a storage uses the bridge. The machine can pair again later with a new token.

To delete a storage, delete it on the **Storages** tab. The bridge stays and shows **Not used by a storage**.

To serve another connection, open the bridge on the **Quix Lake Bridges** tab and move it. The move deletes its storage on the old connection, after you confirm.

## Operating system support

| Feature | Windows | Linux |
|---|---|---|
| Builds | `win-x64`, `win-arm64` | `linux-x64` only |
| Install script | `install.ps1` (MSI or zip) | `install.sh` (deb, rpm or tar.gz) |
| Service | Windows service, runs as `NT SERVICE\quix-bridge` | systemd unit, runs as the system user `quix-bridge` |
| Tray icon | Yes | No. Read the state with `quix-bridge status`. |
| Web console (`quix-bridge ui`) | Yes | Yes |
| Automatic update | MSI only | deb, rpm and tar.gz |
| Network folder (`\\server\share`) | Yes, from the console | No. Mount it, then share the mount folder. |

**macOS is not supported.** `install.sh` stops on a Mac. **Linux arm64 is not shipped yet.** `install.sh` stops on an arm64 Linux machine.

## Next steps

* [Quickstart](./quickstart.md) — install, pair, share a folder, and see it in the Portal
* [Shared folders and the bucket root](./shared-folders.md) — what you can share, and where a sink writes
* [Write to a bridge from a sink](./sinks.md) — make the bridge the main storage
* [Quix Lake connections and storages](../blob-storage.md) — the connection the bridge belongs to

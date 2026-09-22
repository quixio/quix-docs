---
title: Quix Lake Bridge
description: Serve folders on a machine you own as a Quix Lake storage, over one outbound connection, with no inbound port.
---

# Quix Lake Bridge

!!! warning "Preview"
    The Quix Lake Bridge is in preview. The first release is not published yet.

The **Quix Lake Bridge** is a small service that you install on a machine you own. It lets Quix Cloud read and write folders on that machine, such as a local disk or a network share, as one more **storage** of a [Quix Lake connection](./blob-storage.md). Your services reach the files with the same S3 calls, the same endpoint, and the same credential they use for every other storage.

- The bridge opens **one outbound connection** to Quix. You open **no inbound port**.
- **You** choose the folders. The list of shared folders lives on your machine, and Quix Cloud can never add a folder to it.
- A bridge serves **one** Quix Lake connection. Another connection cannot reach it.

## How paths work

A bridge storage shows **the whole bridge**. The Quix path of a file is its address on the machine, under the storage name:

| On the machine | In Quix, for a storage named `plant-fs` |
|---|---|
| `C:\quix-share\hello.txt` | `plant-fs/c/quix-share/hello.txt` |
| `D:\data\runs\r1.csv` | `plant-fs/d/data/runs/r1.csv` |
| `\\nas01\team\q3.csv` | `plant-fs/nas01/team/q3.csv` |
| `D:\Test Runs\2026-08 (final)\a.csv` | `plant-fs/d/test-runs/2026-08-final/a.csv` |

The first name after the storage is the drive or the server. Every folder name turns into lower case, and each run of spaces or symbols turns into one hyphen. A folder you share later on the machine appears in Quix at once, at its own path. There is no step in Quix for it.

Only the folders you shared are visible. A path between two shared folders answers **Access denied**.

## Pair a bridge

1. Open **Settings → Quix Lake** and select the connection.
2. Open the **Bridges** tab.
3. Click **Pair a bridge**.
4. Name the machine, then click **Create pairing token**. The token is valid for **15 minutes**, and Quix shows it one time.
5. Run the install command on the machine, as an administrator:

    === "Windows"

        ```powershell
        irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
        ```

    === "Linux and macOS"

        ```bash
        curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
        ```

6. Open the bridge console. On Windows, click the Quix Lake Bridge icon in the taskbar and select **Open console...**.
7. On the **Connection** tab, paste the pairing token, then click **Connect this bridge**.

During the preview the builds are not signed. Both install scripts check the download against `SHA256SUMS` from the same release and stop on a mismatch.

The install command carries no token. You paste the token into the console, so it never appears on a command line.

## Share a folder

Share folders in the bridge console, on the **Folders** tab:

- Turn a folder to **Shared**, and pick read only or read and write.
- To share a network folder, click **Add a network server** and name it as `\\server\share`. The bridge runs as its own service account, so it cannot see a drive letter you mapped. Give the server credential in the console. The console never shows it again.

The bridge refuses a drive root, `C:\Windows`, `C:\Users`, and the administrative shares such as `\\server\C$`.

## Add the bridge storage

1. Open **Settings → Quix Lake** and select the connection.
2. Open the **Storages** tab and click **Add storage**.
3. Set the **Provider** to **Quix Lake Bridge**.
4. Select the **Bridge**, and set the **Folder**. The folder is the storage name your clients use.
5. Click **Create**.

A bridge gives **one** storage on its connection. A bridge storage can never be the main storage, because the main storage must answer at all times.

## When the machine is away

When the machine is off or the bridge is stopped, every call to the storage answers **503 Service Unavailable**. It never answers "not found" and never an empty listing, so a sync tool that deletes what it cannot see does not delete your files. S3 clients retry a 503.

## Behavior to know

- When you delete the last file in a folder, the bridge removes the folders the delete left empty, the way S3 shows no empty prefix. A folder you make on the machine and never fill stays.
- The bridge keeps its own temporary files and ETag files next to your files. Their names contain `.sag-`, and no listing shows them.
- To serve another connection, open the bridge on the **Bridges** tab and move it. The move deletes its storage on the old connection, after you confirm.

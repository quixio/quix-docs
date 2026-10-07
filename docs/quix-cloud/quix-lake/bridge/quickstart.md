---
title: Bridge quickstart
description: Install the bridge, pair it, share a folder, and see the files in the Portal.
search:
  boost: 3
---

# Quickstart

This quickstart shows you the shortest path from an empty machine to a file you can see in the Portal. You install the bridge, pair it with a Quix Lake connection, share one folder, and open it in the File Explorer.

## Prerequisites

To complete this quickstart you need:

* Administrator rights on a Windows x64 or arm64 machine, or on a Linux x64 machine.
* A [Quix Lake connection](../blob-storage.md) for your cluster.
* The administrator role in your Quix organization.

!!! tip "Install first, then get the token"
    The pairing token lives **15 minutes**, and the Portal shows it one time. Install the bridge before you get the token.

## Step 1: Install the bridge

Run the install script on the machine:

=== "Windows"

    ```powershell
    irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    The script asks for administrator rights itself if it needs them. Then:

    - It installs the bridge in `C:\Program Files\Quix\Bridge`.
    - It creates the service and starts it.
    - It starts the tray icon for your session. The tray starts again at every sign-in.
    - It opens the bridge console in your default browser.

    Run the script again on the same version to repair a broken install.

=== "Linux"

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
    ```

    Run the script as a user who can use `sudo`. The script runs `sudo` itself for the install step.

    On a machine with `dpkg` or `rpm`, the script installs the deb or the rpm package. The package creates the service and starts it.

The install command carries no token. This step needs no Portal visit.

## Step 2: Get the quick config

1. In the Portal, open **Settings → Quix Lake** and select the connection.
2. Open the **Bridges** tab and click **Pair a bridge**.
3. Type the **Bridge name**, then click **Get the install command**.
4. Copy the **quick config**. It holds the two Quix addresses and a fresh pairing token.

!!! warning "The quick config holds a live token"
    Do not paste it in a ticket or a chat.

!!! tip "No screen on the machine?"
    Under the quick config, the Portal also shows **one command** for the selected system. It installs the bridge and connects it. On Linux, run it as a user who can use `sudo`. On Windows, run it in PowerShell as Administrator. The command holds the live token, so treat it like the quick config. The shell writes the command, with the token, to its history file. Use the command only on a machine where you trust that file. After it runs, go to Step 4.

## Step 3: Connect the bridge

1. Open the bridge console. On Windows, click the Quix Lake Bridge icon in the taskbar and select **Open console...**. On any system, run `quix-bridge ui` to get the console address and a login code.
2. On the **Connection** tab, paste the quick config.
3. Click **Connect this bridge**.

The Portal shows the **Bridge ready** dialog when the bridge connects.

??? info "Windows 11 hides the tray icon"
    Windows 11 puts a newly installed tray icon behind the **^** arrow next to the clock. Click the arrow to find the Quix Lake Bridge icon. To keep it visible, go to **Settings > Personalization > Taskbar > Other system tray icons** and turn it on there.

## Step 4: Create the storage

1. In the **Bridge ready** dialog, click **Create storage**. The **Add storage** panel opens with the bridge already picked.
2. Type the **Name** of the storage, for example `Plant FS`.
3. Check the **Folder**. The Portal fills it from the name, for example `plant-fs`.
4. Click **Create**.

A bridge storage has no bucket, no endpoint and no key. So it skips the **Test connection** step that other providers show.

## Step 5: Share a folder

1. Make a folder on the machine, for example `C:\quix-share` or `/srv/quix-share`. Put a file in it, for example `hello.txt`.
2. In the bridge console, open the **Folders** tab.
3. Find the folder in the tree and turn it to **Shared**.

A new share is read only. To let Quix write to the folder, click the **Edit** (pencil) button on the row and turn on **Allow write access**. The share takes effect at once.

## Step 6: See the file in the Portal

1. In the Portal, open your environment and click **File Explorer** in the **Quix Lake** section of the sidebar.
2. Open the folder of the storage, `plant-fs`.
3. Open the share, `c/quix-share` or `srv/quix-share`. The file `hello.txt` is there.

The key of the file is `plant-fs/c/quix-share/hello.txt`. Your code reads it with that key through the S3-compatible endpoint. See [How to connect](../s3-endpoint.md).

## Next steps

* [Shared folders and the bucket root](./shared-folders.md) — share more folders, and set a bucket root
* [Write to a bridge from a sink](./sinks.md) — persist a topic to the machine
* [The bridge console](./console.md) — what each tab shows
* [Command line setup](./command-line.md) — the same steps on a server with no desktop

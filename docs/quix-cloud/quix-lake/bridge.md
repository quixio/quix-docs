---
title: Quix Lake Bridge
description: Serve folders on a machine you own as a Quix Lake storage, over outbound connections only, with no inbound port.
---

# Quix Lake Bridge

The **Quix Lake Bridge** is a small service that you install on a machine you own. It lets Quix Cloud read and write folders on that machine, such as a local disk or a network share, as one more **storage** of a [Quix Lake connection](./blob-storage.md). Your services reach the files with the same S3 calls, the same endpoint, and the same credential they use for every other storage.

!!! warning "Preview"
    The Quix Lake Bridge is in preview. Get the releases at [github.com/quixio/quix-lake-bridge](https://github.com/quixio/quix-lake-bridge/releases){target=_blank}. The builds are not signed yet. Both install scripts check the download against `SHA256SUMS` from the same release and stop on a mismatch.

- The bridge opens **only outbound connections** to Quix. You open **no inbound port**.
- **You** choose the folders. The list of shared folders lives on your machine, and Quix Cloud can never add a folder to it.
- A bridge serves **one** Quix Lake connection, and **one** storage on it.

## Bridges and storages

A bridge and a storage are two separate things:

| | What it is | Where you manage it |
|---|---|---|
| **Bridge** | The machine, paired with the connection | **Quix Lake Bridges** tab of the connection |
| **Storage** | The address that gives the files of that machine a folder in the Quix Lake bucket | **Storages** tab of the connection |

One bridge serves one storage. A bridge that no storage uses reaches no client. The Portal marks it **Not used by a storage** and offers **Assign storage**.

The two have separate lifecycles:

- When you delete a storage, the bridge stays. You can pick it for a new storage.
- When you revoke a bridge, its storage stays. The storage shows **Bridge revoked** and moves no data until you pick another bridge for it.
- To remove a bridge, revoke it first. The Portal refuses the remove while a storage uses the bridge.

## How paths work

A bridge storage shows every folder that you share on the bridge, unless the bridge has a [bucket root](#the-bucket-root). The Quix path of a file is:

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

By default, the first name after the folder is the drive or the server. On Linux it is the first folder of the shared path. The console also lets you pick a shorter address for a share. Every folder name in the shared path turns into lower case, and each run of spaces or symbols turns into one hyphen. The names of the files and folders inside the share do not change.

Only the folders you share are visible. A path outside a share answers **Access denied**.

## Pair a bridge

The pairing creates the bridge only. It creates no storage.

!!! tip "Install first, then mint the token"
    The pairing token lives **15 minutes**, and the Portal shows it one time. Install the bridge first, and get the token in the last step.

1. Install the bridge on the machine, as an administrator:

    === "Windows"

        ```powershell
        irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
        ```

    === "Linux"

        ```bash
        curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
        ```

2. In the Portal, open **Settings → Quix Lake** and select the connection.
3. Open the **Quix Lake Bridges** tab and click **Pair a bridge**.
4. Type the **Bridge name**, then click **Get the install command**. The Portal shows the **quick config**. It holds the two Quix addresses and a fresh pairing token.
5. Open the bridge console. On Windows, click the Quix Lake Bridge icon in the taskbar and select **Open console...**. On any system, run `quix-bridge ui` to get the console address and a login code.
6. On the **Connection** tab, paste the quick config, then click **Connect this bridge**.

!!! warning "The quick config holds a live token"
    Do not paste it in a ticket or a chat. You paste it into the console, so it never appears on a command line.

When the bridge connects, the Portal shows the **Bridge ready** dialog:

- Click **Create storage** to open the **Add storage** panel with the new bridge already picked. Continue at step 4 of [Add a storage for a bridge](#add-a-storage-for-a-bridge).
- Click **Not now** to keep the bridge without a storage. The **Quix Lake Bridges** tab then shows **Not used by a storage** on the bridge, with an **Assign storage** action beside it.

??? info "Windows 11 hides the tray icon"
    Windows 11 puts a newly installed tray icon behind the **^** arrow next to the clock. Click the arrow to find the Quix Lake Bridge icon. To keep it visible, go to **Settings > Personalization > Taskbar > Other system tray icons** and turn it on there.

## Add a storage for a bridge

1. Open **Settings → Quix Lake** and select the connection.
2. Open the **Storages** tab and click **Add storage**.
3. Set the **Provider** to **Quix Lake Bridge**.
4. Type the **Name** of the storage.
5. Check the **Folder**. The Portal fills it from the name, for example `Plant FS 01` gives `plant-fs-01`. You can type another folder.
6. Select the **Bridge**. The list shows only the bridges of this connection that no storage uses. To pair a new machine, select **Add bridge**. When the bridge is ready, click **Create storage**, and the Portal brings you back to this panel with the new bridge picked.
7. Click **Create**.

A bridge storage has no bucket, no endpoint and no key, so it skips the **Test connection** step that other providers show.

!!! note "A bridge as the main storage"
    A bridge storage can become the [main storage](./blob-storage.md#make-a-storage-the-main-storage) of the connection, but only after the bridge has a [bucket root](#the-bucket-root). The Portal refuses **Make this the main storage** until the bridge reports one. The main storage must answer at all times, so keep the bridge machine online.

## Share a folder

Share folders in the bridge console, on the **Folders** tab:

- Turn a folder to **Shared**. A new share is read and write. Click **Edit** on the shared row to make it read only.
- To share a network folder, click **Add a network server** and name it as `\\server\share`. The bridge runs as its own service account, so it cannot see a drive letter you mapped. Give the server credential in the console. The console never shows it again.

The tree shows only the folders that the service account can read. Some folders show a state instead of a switch:

| State | Meaning |
|---|---|
| **Share a folder inside it** | The folder holds the operating system, such as `C:\Windows`. Open it and share a folder inside it. |
| **Cannot be shared** | An administrative share, such as `\\server\C$`. You cannot share it or a folder inside it. |
| **N folders inside are shared** | The folder holds shared folders. Open the folder to reach the shares. |

The bridge refuses `\Windows` on every drive, the administrative shares, and `/etc` on Linux. It shares a drive root, `\Users` on any drive, `/` and `/home` as read only. Share a folder inside them to allow writes.

A share you add, edit or remove in the console takes effect at once. Before bridge version 0.1.11, a change you make with `quix-bridge share` or by hand in `config.yaml` needs a service restart. From 0.1.11, the bridge applies such a change at once too.

## The bucket root

A storage that maps **the whole machine**, not one shared folder, can use one writable folder for all its data. This folder is the **bucket root**. When the bridge has a bucket root, every key of that storage lands in the bucket root, and the storage no longer shows the shared folders.

A bridge needs a bucket root before it can be the [main storage](./blob-storage.md#make-a-storage-the-main-storage), and before the Portal creates a Lakehouse or a Data Lake service on it. Set the bucket root first, then create the service.

Set it on the **Folders** tab of the bridge console:

1. With no bucket root set, the tab shows an amber warning: **No bucket root**. Click **Choose a folder**, then pick a folder in the tree.
2. To use a path the tree does not show, such as a network path, click **or type a path** and type the full path, for example `D:\QuixData` or `/srv/quix`. The bridge makes the folder if it is missing.
3. The tree marks the chosen folder with a **Bucket root** chip. To change it, click **Change**. To remove it, click **Clear**.

The console refuses a bucket root that is a share, holds a share, or sits inside a share.

!!! note "Changes in bridge version 0.1.11"
    From 0.1.11, the bucket root is a **shared folder whose Quix path is empty**. To make a share the bucket root, click **Edit this share** on its row and clear the **SAG path** field. Only one folder can be the bucket root, and it is always read and write. The tree marks it **Bucket root**, and the console opens on the **Folders** tab. Every change you make in the console goes to `config.yaml`, and a change you make in the file applies without a restart.

## Write to a bridge from a sink

A sink binds the **main storage** of the connection. This applies to the managed [Data Lake Sink](./data-lake/sink.md), the [Lakehouse Sink](./lakehouse/sink.md), and a Quix Streams sink in your own deployment with `blobStorage: bind: true`. So a sink writes to a bridge only when the bridge storage is the main storage.

1. Set the [bucket root](#the-bucket-root) in the bridge console, on the **Folders** tab.
2. In the Portal, open **Settings → Quix Lake**, select the connection, and open the **Storages** tab. On the bridge storage, open the `⋮` menu and click **Make this the main storage**.
3. Deploy the sink. A managed sink uses the connection by itself. For your own service, bind the storage in the **Advanced** tab of the deployment, or in `quix.yaml`:

    ```yaml
    deployments:
      - name: my-sink
        application: my-sink
        blobStorage:
          bind: true
    ```

!!! note "Where the data lands"
    The sink writes into the bucket root folder on the bridge machine, under `<workspaceId>/`. For example, with the bucket root `D:\QuixData`, a Data Lake Sink writes to `D:\QuixData\<workspaceId>\Raw\...`.

To write to a bridge storage that is **not** the main storage, use an S3 client such as boto3, the AWS CLI or DuckDB, and put the storage folder first in the key. See [Write to another storage by key](./s3-endpoint.md#write-to-another-storage-by-key).

## The bridge console

The console is a web page on the machine. It listens on this machine only, at `127.0.0.1`. On Windows, open it from the tray icon. On any system, run `quix-bridge ui` to get the console address and a login code.

A **status strip** sits above the tabs. It shows the connection state, the time of the last change, the number of shares and the version. When something is wrong, a second line names the cause, the next step and one action, such as **See activity** or **Pair again**.

| Tab | What it shows |
|---|---|
| **Folders** | The folder tree of the machine. You share folders and set the bucket root here. |
| **Connection** | The connection to Quix. You paste the quick config here. |
| **Activity** | The connection events, newest first. Each row says what happened and what to do. |
| **Health** | Two checks that change nothing. **Run the folder check** reads each shared folder as the service account and checks that the bridge reaches Quix. **Run the reboot check** looks for anything that stops the bridge after a reboot. |
| **Config** | The `config.yaml` file. A secret never appears in this file. |
| **Log** | Writes, deletes, copies and reads of files. The log holds no file content, no secret key and no token. |

An error in the status strip or on the **Activity** tab carries a **reference**. Click the copy button beside it to copy the reference, the time and the error detail, and give this text to Quix support.

??? info "Install the console as an app"
    In Edge or Chrome, the console shows an **Install** bar. Click **Install**. Firefox cannot install the console as an app.

    - In Edge, tick **Pin to taskbar** in the install dialog.
    - In Chrome, right-click the app's taskbar button after install and pick **Pin to taskbar**.

    The app opens straight into the console, with no login code, for 30 days after your last use. After 30 days, sign in again with the tray icon or a login code. When the bridge service is stopped, the app shows an offline page.

## Revoke and remove a bridge

On the **Quix Lake Bridges** tab, open the menu of the bridge:

- **Revoke bridge** cuts the bridge off. The machine must pair again to come back. The storage of the bridge stays, and it shows **Bridge revoked** until you pick another bridge for it.
- **Remove bridge** removes the record of a revoked bridge from the connection. The Portal refuses the remove while a storage uses the bridge, and it names that storage. The machine can pair again later with a new token.

To delete a storage, delete it on the **Storages** tab. The bridge stays, and it shows **Not used by a storage**.

To serve another connection, open the bridge on the **Quix Lake Bridges** tab and move it. The move deletes its storage on the old connection, after you confirm.

## Set up the bridge without the console

Use the command line on a server with no desktop, or in a script. Run every command in an administrator PowerShell on Windows, or with `sudo` on Linux. The pairing creates the bridge only. You add the storage in the Portal after the bridge connects, as in [Add a storage for a bridge](#add-a-storage-for-a-bridge).

### 1. Install the bridge

=== "Windows"

    ```powershell
    irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`, with or without a leading `v`:

    ```powershell
    $env:QUIX_BRIDGE_VERSION = '0.1.4'; irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    The MSI installs the bridge in `C:\Program Files\Quix\Bridge`, creates the service, starts it, and adds that folder to the system `PATH`. Open a new administrator shell for the next steps, so it sees the new `PATH`.

    ??? info "Zip install"
        When you run the script as a file, `.\install.ps1 -Version 0.1.4` also picks a version. With `-Zip`, the script copies the files to the same folder and installs no service. A zip install does not change the `PATH` and does not update itself. Run `& "C:\Program Files\Quix\Bridge\quix-bridge.exe" service install`, and use the full path for each command.

=== "Linux"

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`:

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | QUIX_BRIDGE_VERSION=0.1.4 sh
    ```

    On a machine with `dpkg` or `rpm`, the script installs the deb or the rpm package, which installs and starts the service. On other machines the script copies the binary to `/usr/local/bin`. Then install the service yourself:

    ```bash
    sudo quix-bridge service install
    ```

    The bridge has a Linux build for x64 only. On an arm64 machine, the script stops.

### 2. Get the quick config

1. In the Portal, open **Settings → Quix Lake** and select your connection.
2. Open the **Quix Lake Bridges** tab and click **Pair a bridge**.
3. Type the **Bridge name**, then click **Get the install command**.
4. Copy the **quick config**. It expires after 15 minutes. Do not paste it in a ticket or a chat.

### 3. Pair the bridge

Run `connect` with no argument. The command asks for the quick config, and you paste it, so no shell history file holds the token.

=== "Windows"

    ```powershell
    quix-bridge connect
    ```

    The service enrols at the Portal at its next start, in step 5. You do not run `enrol` on Windows.

=== "Linux"

    ```bash
    sudo quix-bridge connect
    sudo quix-bridge enrol
    ```

    `enrol` sends the pairing token to the Portal. It exits with code 0 when the Portal enrolled the bridge.

### 4. Share folders

=== "Windows"

    ```powershell
    quix-bridge share add "D:\data" --read-only
    quix-bridge share add "D:\results"
    quix-bridge share list
    ```

=== "Linux"

    ```bash
    sudo quix-bridge share add /srv/data --read-only
    sudo quix-bridge share add /srv/results
    sudo quix-bridge share list
    ```

A new share is read and write. Add `--read-only` to stop Quix writing to the folder. The command applies the same rules as the console and refuses the same folders. It does not check that the folder exists, so check the path yourself.

`share list` prints two paths for each row: the path on the machine and the Quix path. To stop sharing a folder, run `quix-bridge share remove <path>` with the path **on the machine**.

Network folders:

- On Windows, `share add` stores no credential. Add a network server and its credential in the console. Run `quix-bridge ui` to get the console address and a login code.
- On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

### 5. Start the service

=== "Windows"

    ```powershell
    quix-bridge service stop
    quix-bridge service start
    ```

=== "Linux"

    ```bash
    sudo quix-bridge service stop
    sudo quix-bridge service start
    ```

The stop and start make the service read the new token and the new shares. Before version 0.1.11, the service reads `config.yaml` only when it starts, so repeat this step after every `share` command. On Windows the service enrols at the Portal at this start.

Every command that needs root, such as `service`, `share list`, `config show` and `status`, stops with a hint and a non-zero exit code when you run it without administrator rights or `sudo`.

### 6. Check the bridge

```bash
sudo quix-bridge status
sudo quix-bridge test
```

- `status` shows the connection, the number of shares and the last error. It exits with code 0 when the service runs and the bridge is connected.
- `test` checks that the service account can read every share, and that the bridge can reach Quix on port 443. It exits with code 0 when every check passed, even while the service is stopped. The report names a check that failed.

Then add the storage in the Portal, as in [Add a storage for a bridge](#add-a-storage-for-a-bridge). On the **Quix Lake Bridges** tab, the menu of the new bridge has **Create storage**, which opens the same panel with the bridge picked.

### 7. Change the settings

The bridge keeps its settings in `config.yaml`:

| Operating system | Location |
|---|---|
| Windows | `C:\ProgramData\Quix\bridge\config.yaml` |
| Linux | `/etc/quix-bridge/config.yaml` |

`quix-bridge config show` prints the config the service uses, without the `update` and `network` sections. Two settings you can change by hand:

```yaml
update:
  channel: stable
log:
  retainDays: 14
```

- `update.channel`: `stable` is the default from version **0.1.8**, and the bridge then installs the latest release by itself. Set it to `manual` to turn automatic updates off. The change needs no restart.
- `log.retainDays`: the number of days the bridge keeps its audit log. The default is 30 days, and the audit log stays at 500 MB or less. Restart the service after you change it.

!!! warning "A bridge before 0.1.8 does not update itself"
    Versions before 0.1.8 read a missing channel as `manual`. To bring such a bridge onto `stable`, install the latest release once by hand, as in [Install the bridge](#1-install-the-bridge), or set `update: channel: stable` in `config.yaml` and restart the service.

??? info "How an update runs"
    The bridge checks for an update **every 5 minutes**. The MSI, the deb and the rpm register this check as a scheduled task. A zip install has no task and does not update. A tar.gz install from 0.1.8 updates through the running service.

    Before it updates, the bridge waits until no transfer is running, for up to 10 minutes. Then it lets the running operations finish, installs the new version and starts the service again. When an install fails, the bridge tries again later, with a longer wait after each failure.

### 8. Uninstall

```bash
quix-bridge service uninstall
```

This stops and removes the service. It keeps `config.yaml` and the stored share credentials. Add `--purge` to delete them too. Uninstalling the bridge does not remove it from Quix. Revoke and remove it in the Portal, as in [Revoke and remove a bridge](#revoke-and-remove-a-bridge).

??? info "Remove the program"
    - **Windows:** remove **Quix Bridge** in **Settings > Apps**. The MSI deletes the config and the stored credentials. To keep them, run `msiexec /x <msi-file> KEEPDATA=1`.
    - **Debian and Ubuntu:** `sudo apt remove quix-bridge` keeps `/etc/quix-bridge`. `sudo apt purge quix-bridge` deletes it.
    - **RHEL and Rocky:** run `sudo quix-bridge service uninstall --purge` first, then `sudo rpm -e quix-bridge`.
    - **Binary only:** run `sudo quix-bridge service uninstall --purge`, then delete `/usr/local/bin/quix-bridge`.

    On Linux, even with `--purge`, the bridge keeps `/var/log/quix-bridge` and `/var/lib/quix-bridge/update` on disk. Delete them by hand if you want a clean machine. If the deb or the rpm is still installed, `service uninstall --purge` also leaves the update timer enabled. Remove the package to stop it.

## Operating system support

| Feature | Windows | Linux |
|---|---|---|
| Builds | `win-x64`, `win-arm64` | `linux-x64` only |
| Install script | `install.ps1` (MSI or zip) | `install.sh` (deb, rpm or tar.gz) |
| Service | Windows service | systemd unit |
| `quix-bridge` on the `PATH` | Yes, with the MSI. No, with the zip. | Yes |
| Tray icon | Yes | No. Read the state with `quix-bridge status`. |
| Web console (`quix-bridge ui`) | Yes | Yes |
| Automatic update | MSI only | deb, rpm, and tar.gz from 0.1.8 |
| Network folder (`\\server\share`) | Yes, from the console | No. Mount it, then share the mount folder. |

- **A tar.gz install updates itself from 0.1.8.** This needs a running systemd service. A tar.gz install before 0.1.8 does not update: install the new release by hand.
- **On a Linux machine with no systemd**, such as a container, the deb or the rpm installs but starts no service. Run the bridge in the foreground with `quix-bridge service run`, and run `quix-bridge update run` yourself, on your own schedule.
- **macOS is not supported.** `install.sh` stops on a Mac.
- **Linux arm64 is not shipped yet.** `install.sh` stops on an arm64 Linux machine.

## Behind a proxy

From version 0.1.5, `network.proxy` and `network.caBundle` in `config.yaml` cover every outbound call the bridge makes. Set them once and restart the service:

```yaml
network:
  proxy: http://proxy.example.com:3128
  caBundle: /etc/ssl/certs/corp-ca.pem
```

Versions before 0.1.5 need the `https_proxy` and `SSL_CERT_FILE` environment variables for the service.

!!! warning "Behind a proxy, never pin a bridge below 0.1.5"
    A version before 0.1.5 ignores `network.proxy` when it asks for an update, so a bridge pinned or rolled back below 0.1.5 stays stuck on that version. Clear the pin, or lift the proxy block, to bring it back.

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

## When the machine is away

When the machine is off or the bridge is stopped, every call to the storage answers **503 Service Unavailable**. It never answers "not found" and never an empty listing, so a sync tool that deletes what it cannot see does not delete your files. S3 clients retry a 503.

## Known limits

- **Speed and uptime depend on the bridge machine.** A bridge storage works like any other storage for the Lakehouse, the Data Lake, and `blobStorage: bind`. The machine must stay online for any service that reads or writes through the storage.
- **One storage per bridge.** To serve a second storage, pair a bridge on a second machine. Pairing again on the same machine reuses the same bridge.
- **A list page can hold fewer keys than you ask for.** A client that asks for 1000 keys can get fewer, often about 560, and a continuation token. The listing stays complete, but a large folder takes about 2 times more calls than on S3.
- **A copy is a download plus an upload.** The bridge has no copy operation, so a copy takes as long as both transfers.
- **The bridge does not see a DNS alias of this machine.** If you share `C:\data` and also `\\my-alias\data`, where `my-alias` is a DNS alias of this machine, the bridge serves one folder under two shares with two sets of rules. Do not add a share through an alias of the same machine.
- **Empty folders disappear.** When you delete the last file in a folder, the bridge removes the folders the delete left empty, the way S3 shows no empty prefix. A folder you make on the machine and never fill stays.
- **Hidden helper files.** The bridge keeps small helper files next to your files. Their names contain `.sag-`, and no listing shows them.
- **The Windows service cannot read a user profile folder** until you grant it access. See [Share a folder in a user profile on Windows](#share-a-folder-in-a-user-profile-on-windows).
- **No macOS host and no Linux arm64 build.** See [Operating system support](#operating-system-support).

## Next steps

* [Quix Lake connections and storages](./blob-storage.md) — add a storage and make it the main storage
* [S3-compatible endpoint](./s3-endpoint.md) — reach a bridge storage from your code
* [Storage explorer](./storage-explorer.md) — browse the bridge files in the Portal
* [Data Lake Sink](./data-lake/sink.md) — persist topics to the bridge

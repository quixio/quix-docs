---
title: Quix Lake Bridge
description: Serve folders on a machine you own as a Quix Lake storage, over one outbound connection, with no inbound port.
---

# Quix Lake Bridge

!!! warning "Preview"
    The Quix Lake Bridge is in preview. Get the releases at [github.com/quixio/quix-lake-bridge](https://github.com/quixio/quix-lake-bridge/releases).

The **Quix Lake Bridge** is a small service that you install on a machine you own. It lets Quix Cloud read and write folders on that machine, such as a local disk or a network share, as one more **storage** of a [Quix Lake connection](./blob-storage.md). Your services reach the files with the same S3 calls, the same endpoint, and the same credential they use for every other storage.

- The bridge opens **one outbound connection** to Quix. You open **no inbound port**.
- **You** choose the folders. The list of shared folders lives on your machine, and Quix Cloud can never add a folder to it.
- A bridge serves **one** Quix Lake connection. Another connection cannot reach it.

## Bridges and storages

A bridge and a storage are two separate things:

- A **bridge** is the machine. You pair it on the **Quix Lake Bridges** tab of the connection.
- A **storage** gives the files of that machine an address. You add it on the **Storages** tab, and you pick the bridge in it.

One bridge serves **one** storage. A bridge that no storage uses reaches no client. Quix marks it **Not used by a storage** and offers **Create storage**.

The two have separate lifecycles:

- When you delete a storage, the bridge stays. You can pick it for a new storage.
- When you revoke a bridge, its storage stays. The storage shows **Bridge revoked** and moves no data until you pick another bridge for it.
- To remove a bridge, revoke it first. Quix refuses the remove while a storage uses the bridge. See [Revoke and remove a bridge](#revoke-and-remove-a-bridge).

## How paths work

A bridge storage shows every folder that you share on the bridge. The Quix path of a file is:

```
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

On Linux there is no drive letter, so the first name after the folder is the first folder of the shared path, for example `srv` for a share under `/srv/data`.

The first name after the folder is the drive or the server. Every folder name turns into lower case, and each run of spaces or symbols turns into one hyphen. There is no extra step in Quix for a new share: you add it on the machine only. But the bridge service reads its share list at start only, so a folder you share does not appear until you restart the service. See [Share a folder](#share-a-folder).

Only the folders you shared are visible. A path between two shared folders answers **Access denied**.

## Pair a bridge

The pairing creates the bridge only. It creates no storage.

The pairing token lives **15 minutes** and Portal shows it one time, so install the bridge first. Mint the token right before you need it, in the last step.

1. Install the bridge on the machine, as an administrator:

    === "Windows"

        ```powershell
        irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
        ```

    === "Linux"

        ```bash
        curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
        ```

    The install command carries no token, so this step needs no Portal visit.

2. Open **Settings > Quix Lake** and select the connection.
3. Open the **Quix Lake Bridges** tab.
4. Click **Pair a bridge**.
5. Type the **Bridge name**, then click **Get the install command**. Portal shows the install command again and the **quick config**. The quick config holds the two Quix addresses and a fresh pairing token.
6. Open the bridge console right away. On Windows, click the Quix Lake Bridge icon in the taskbar and select **Open console...**. If you do not see the icon, click the **^** arrow next to the clock to show hidden icons; Windows 11 hides a newly installed tray icon there by default. On any system, run `quix-bridge ui` to get the console address and a login code.
7. On the **Connection** tab, paste the quick config, then click **Connect this bridge**, before the 15-minute token expires.

You paste the quick config into the console, so the token never appears on a command line. The quick config holds a live token. Do not paste it in a ticket or a chat.

During the preview the builds are not signed. Both install scripts check the download against `SHA256SUMS` from the same release and stop on a mismatch.

When the machine uses the token, Portal shows the **Bridge ready** dialog:

- Click **Create storage** to open the **Add storage** panel on the **Storages** tab, with the new bridge already picked. Then continue at step 4 of [Add a storage for a bridge](#add-a-storage-for-a-bridge).
- Click **Not now** to keep the bridge without a storage. The **Quix Lake Bridges** tab then shows **Not used by a storage** on the bridge, and a **Create storage** action beside it.

## Add a storage for a bridge

1. Open **Settings > Quix Lake** and select the connection.
2. Open the **Storages** tab and click **Add storage**.
3. Set the **Provider** to **Quix Lake Bridge**.
4. Type the **Name** of the storage.
5. Check the **Folder**. Quix fills it from the name, for example `Plant FS 01` gives `plant-fs-01`. You can type another folder. The hint under the field shows the address, `<folder>/<share>/<file>`.
6. Select the **Bridge**. The list shows only the bridges of this connection that no storage uses. To pair a new machine, select **Add bridge**. Portal opens the pairing, and after the pairing it brings you back to this panel with the new bridge picked.
7. Click **Create**.

A bridge storage has no bucket, no endpoint and no key, so it skips the **Test connection** step that other providers show. Click **Create** directly. A bridge storage can never be the main storage, because the main storage must answer at all times.

## The bridge console

The console is a web page on the machine. It listens on this machine only, at `127.0.0.1`. On Windows, open it from the tray icon. On any system, run `quix-bridge ui` to get the console address and a login code.

A **status strip** sits above the tabs, so you see the state from every tab. It shows the connection state, the time of the last change, the number of shares, the open sockets and the version. When something is wrong, a second line under the strip names the cause, the next step and one action, such as **See activity** or **Pair again**.

The console has six tabs:

| Tab | What it shows |
|---|---|
| **Folders** | The folder tree of the machine. You share folders here. |
| **Connection** | The connection to Quix. You paste the quick config here. |
| **Activity** | The connection events, newest first. The bridge keeps the last 50 events in memory. Each row says what happened and what to do. An event holds no token, no path and no file content. |
| **Health** | Two checks that read the machine and change nothing: **Run the folder check** reads each shared folder as the service account and checks that the bridge reaches Quix. **Run the reboot check** looks for anything that stops the bridge after a reboot. |
| **Config** | The `config.yaml` file. A secret never appears in this file. |
| **Log** | One line for each read and each write of a file, the last 200 lines. The log holds no file content, no secret key and no token. |

The **Connection** tab also tells you where to get the quick config: in Portal, **Settings > Quix Lake >** your connection **> Quix Lake Bridges > Pair a bridge**.

An error in the status strip or on the **Activity** tab carries a **reference**, a correlation ID. Click the copy button beside it to copy the reference, the time and the error detail. Give this text to Quix support. Errors in Portal show a reference too.

## Share a folder

Share folders in the bridge console, on the **Folders** tab:

- Turn a folder to **Shared**. A new share is read only. Click **Edit** on the shared row to allow read and write.
- To share a network folder, click **Add a network server** and name it as `\\server\share`. The bridge runs as its own service account, so it cannot see a drive letter you mapped. Give the server credential in the console. The console never shows it again.

The bridge refuses a drive root, `C:\Windows`, `C:\Users`, and the administrative shares such as `\\server\C$`. The tree shows these states:

- **Share a folder inside it**: you cannot share this folder as a whole, such as a drive root. Open it and share a folder inside it.
- **Cannot be shared**: an administrative share. You cannot share it or a folder inside it.
- **N folders inside are shared**: the folder holds shared folders. Its switch shows as partly on and takes no click. Open the folder to reach the shares.

The tree shows only the folders that the service account can read.

The service reads `config.yaml` only when it starts. Restart the service after you add, edit or remove a share, so the change takes effect. Until you restart, the bridge still serves a removed share and still refuses a new one.

## Revoke and remove a bridge

On the **Quix Lake Bridges** tab, open the menu of the bridge:

- **Revoke bridge** cuts the bridge off. The machine must pair again to come back. The storage of the bridge stays, and it shows **Bridge revoked** until you pick another bridge for it.
- **Remove bridge** removes the record of a revoked bridge from the connection. You must revoke the bridge first. Quix refuses the remove while a storage uses the bridge, and it names that storage. The remove deletes no storage. The machine can pair again later with a new token.

To delete a storage, delete it on the **Storages** tab. The bridge stays, and it shows **Not used by a storage**.

## Set up the bridge without the console

You can set up a bridge with the command line only. Use this on a server with no desktop, or in a script. Run every command in an administrator PowerShell on Windows, or with `sudo` on Linux.

The pairing creates the bridge only. It creates no storage. You add the storage in Portal after the bridge connects, as in [Add a storage for a bridge](#add-a-storage-for-a-bridge).

### 1. Install the bridge

=== "Windows"

    ```powershell
    irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`. The script accepts the version with or without a leading `v`:

    ```powershell
    $env:QUIX_BRIDGE_VERSION = '0.1.4'; irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    When you run the script as a file, you can also give the version with `-Version`:

    ```powershell
    .\install.ps1 -Version 0.1.4
    ```

    The MSI installs the bridge in `C:\Program Files\Quix\Bridge`. It creates the service, and it starts it. The MSI adds that folder to the system `PATH`, so `quix-bridge` works in a new shell. A shell that was open during the install keeps its old `PATH`, so open a new administrator shell for the next steps.

    If you install with `-Zip`, the script copies the files to the same folder and installs no service. A zip install does not change the `PATH`. Run `& "C:\Program Files\Quix\Bridge\quix-bridge.exe" service install`, and use the full path for each command.

=== "Linux"

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`:

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | QUIX_BRIDGE_VERSION=0.1.4 sh
    ```

    On a machine with `dpkg` or `rpm`, the script installs the deb or the rpm package. The package installs the service and starts it. On other machines the script copies the binary to `/usr/local/bin`. Then install the service yourself:

    ```bash
    sudo quix-bridge service install
    ```

    The bridge has a Linux build for x64 only. On an arm64 machine, the script stops and names the supported platforms.

### 2. Get the quick config in Portal

1. Open **Settings > Quix Lake** and select your connection.
2. Open the **Quix Lake Bridges** tab.
3. Click **Pair a bridge**.
4. Type the **Bridge name**, then click **Get the install command**.
5. Copy the **quick config**. It holds the two Quix addresses and a pairing token. It expires after 15 minutes.

The quick config holds a live token. Do not paste it in a ticket or a chat.

### 3. Pair the bridge

Run `connect` with no argument. The command asks for the quick config, and you paste it. Then no shell history file holds the token.

=== "Windows"

    ```powershell
    quix-bridge connect
    ```

    Run it from an administrator shell. The service runs as its own account, so `connect` hands the pairing to the service. You do not run `enrol` on Windows. The service enrols at Portal at its next start, in step 5. If you run `enrol`, it tells you to start the service.

=== "Linux"

    ```bash
    sudo quix-bridge connect
    sudo quix-bridge enrol
    ```

    `enrol` sends the pairing token to Portal and stores the token the bridge uses to connect. It exits with code 0 when Portal enrolled the bridge.

You can also give the quick config on the command line, as `quix-bridge connect <quick-config>`. Do not do this: the shell then writes the token to its history file.

### 4. Share folders

=== "Windows"

    ```powershell
    quix-bridge share add "D:\data"
    quix-bridge share add "D:\results" --read-write
    quix-bridge share list
    ```

=== "Linux"

    ```bash
    sudo quix-bridge share add /srv/data
    sudo quix-bridge share add /srv/results --read-write
    sudo quix-bridge share list
    ```

A new share is read only. Add `--read-write` to let Quix write to the folder too. The command applies the same rules as the console, and it refuses the same folders. `share add` does not check that the folder exists, so check the path yourself.

`share list` prints two paths for each row: the path on the machine, and the **sag path**, the path inside the bridge. To stop sharing a folder, run `quix-bridge share remove <path>` with the path **on the machine**, not the sag path.

Network folders:

- On Windows, `share add` stores no credential, because a password on a command line goes to the shell history. Add a network server and its credential in the console. Run `quix-bridge ui` to get the console address and a login code. The console listens on this machine only, at `127.0.0.1`.
- On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

The service reads `config.yaml` only when it starts. After you add or remove a share, restart the service. The console also writes `config.yaml`, so change the shares in one place at a time. Removing a share does not stop the service serving it early: files stay reachable until the restart.

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

Run this as an administrator, or with `sudo`. Without it, every command that needs root, such as `service stop`, `service start`, `share list`, `config show` and `status`, stops with a sudo or administrator hint and a non-zero exit code.

The stop and start make the service read the new token and the new shares. On Windows the service enrols at Portal at this start.

`service install` needs administrator rights. On Windows it creates the service under the virtual account `NT SERVICE\quix-bridge`, and the service starts at every boot. On Linux it writes the systemd unit `/etc/systemd/system/quix-bridge.service` and enables it. The MSI, the deb and the rpm run `service install` for you.

### 6. Check the bridge

```bash
sudo quix-bridge status
sudo quix-bridge test
```

- `status` shows the connection, the number of shares and the last error. It exits with code 0 when the service runs and the bridge is connected.
- `test` checks that the service account can read every share, and that the bridge can open a TCP connection to Quix on port 443. It exits with code 0 when every check passed, even while the service itself is stopped. The report names a check that failed.

Then add the storage in Portal, as in [Add a storage for a bridge](#add-a-storage-for-a-bridge). On the **Quix Lake Bridges** tab, the new bridge shows **Not used by a storage** and a **Create storage** action. That action opens the same panel with the bridge picked.

### 7. Change the settings

The bridge keeps its settings in `config.yaml`:

| Operating system | Location |
|---|---|
| Windows | `C:\ProgramData\Quix\bridge\config.yaml` |
| Linux | `/etc/quix-bridge/config.yaml` |

`quix-bridge config show` prints the effective config the service uses. It does not show the `update` or `network` sections, so use the file itself to check those. Two settings you can change by hand:

```yaml
update:
  channel: stable
log:
  retainDays: 14
```

- `update.channel`: set it to `stable` to turn on automatic updates. With no value (the default), the bridge installs no update by itself. `stable` installs the latest release on GitHub.
- `log.retainDays`: the number of days the bridge keeps its local log. The default is 30 days. The log also stays at 500 MB or less.

Restart the service after you change `log.retainDays`. The update task reads `update.channel` at each run, so that change needs no restart.

**How the update check runs.** A task checks for an update **every 5 minutes**, with a random delay of up to 60 seconds. On Windows it is the scheduled task `\Quix\Bridge Update`. On Linux it is the systemd timer `quix-bridge-update.timer`. Only the MSI, the deb and the rpm register this task; a zip or tar.gz install has none, so `update.channel` does nothing there. Between checks, an operator action in Portal, such as a version pin or a hold, reaches the bridge in seconds: Quix pushes a fresh plan, the bridge does not wait for the next 5-minute check.

**How an update runs.** The bridge waits until no transfer is running, for up to 10 minutes, then tells the service to drain: finish the operations already running, up to `service.drainSeconds` (default 60 seconds), before it stops. Only then does it install the new version and start the service again. If an install fails, the next try waits longer each time: 15 minutes, then 1 hour, then 4 hours, then every 24 hours.

### 8. Uninstall

```bash
quix-bridge service uninstall
```

This stops and removes the service. It keeps `config.yaml` and the stored share credentials. Add `--purge` to delete them too:

```bash
quix-bridge service uninstall --purge
```

Even with `--purge`, the bridge keeps `/var/log/quix-bridge` (the log and the audit file) and `/var/lib/quix-bridge/update` on disk. Delete them by hand if you want a clean machine. If the deb or the rpm is still installed, `service uninstall --purge` also leaves the update timer enabled; remove the package to stop it.

To remove the program too:

- **Windows:** remove **Quix Bridge** in **Settings > Apps** (this is the name Windows shows; the product is the Quix Lake Bridge). The MSI deletes the config and the stored credentials. To keep them, run `msiexec /x <msi-file> KEEPDATA=1`.
- **Debian and Ubuntu:** `sudo apt remove quix-bridge` keeps `/etc/quix-bridge`. `sudo apt purge quix-bridge` deletes it, but still keeps `/var/log/quix-bridge` and `/var/lib/quix-bridge/update`.
- **RHEL and Rocky:** run `sudo quix-bridge service uninstall --purge` first, then `sudo rpm -e quix-bridge`. The rpm has no purge step.
- **Binary only:** run `sudo quix-bridge service uninstall --purge`, then delete `/usr/local/bin/quix-bridge`.

Uninstalling the bridge does not remove it from Quix. Revoke and remove it in Portal, as in [Revoke and remove a bridge](#revoke-and-remove-a-bridge).

## Operating system support

Every release ships three builds: `win-x64`, `win-arm64` and `linux-x64`.

| Feature | Windows | Linux |
|---|---|---|
| Builds | `win-x64`, `win-arm64` | `linux-x64` only |
| Install script | `install.ps1` (MSI or zip) | `install.sh` (deb, rpm or tar.gz) |
| Service (`service install`) | Windows service, account `NT SERVICE\quix-bridge` | systemd unit, runs as `root` |
| `quix-bridge` on the `PATH` | Yes, with the MSI. No, with the zip. | Yes |
| Tray icon (`quix-bridge tray`) | Yes | No |
| Web console (`quix-bridge ui`) | Yes | Yes |
| Automatic update | MSI only | deb and rpm only |
| Network folder (`\\server\share`) | Yes, from the console | No. Mount it, then share the mount folder. |

The tray refuses to start on any system other than Windows. On Linux, read the state with `quix-bridge status`.

**A tar.gz install never auto-updates.** `update run` checks which package owns the running binary. A tar.gz install owns no package, so the run installs nothing: it reports `manual_install` and leaves the binary as it is, even with `update.channel: stable`. Update a tar.gz install by hand: download the new release and repeat the [tar.gz steps](#1-install-the-bridge).

**On a Linux machine with no systemd**, such as a container, the deb or the rpm still installs, but it starts no service. Run the bridge in the foreground with `quix-bridge service run`. Automatic update needs a running service too, so on a machine like this, run `quix-bridge update run` yourself, on your own schedule.

**macOS is not supported.** The release has no macOS build, and `install.sh` stops on a Mac. Run the bridge on Windows or Linux.

**Linux arm64 is not shipped yet.** `install.sh` stops on an arm64 Linux machine. Use a Linux x64 machine.

## Behind a proxy

Since version 0.1.5, `network.proxy` and `network.caBundle` in `config.yaml` cover every outbound call the bridge makes: the data connection, enrolling the bridge, asking for an update plan and downloading an update. Set them once, restart the service, and every road works through the proxy.

Versions before 0.1.5 need the `https_proxy` and `SSL_CERT_FILE` environment variables for the service.

**Behind a proxy, never pin a bridge below 0.1.5.** A version before 0.1.5 ignores `network.proxy` for the update plan ask, so a bridge pinned or rolled back below 0.1.5 cannot receive its next plan and stays stuck on that version. Clear the pin, or lift the proxy block, to bring it back.

## Share a folder in a user profile on Windows

On Windows the service runs as `NT SERVICE\quix-bridge`. That account cannot read a folder in a user profile, such as `C:\Users\alice\data`, because the profile ACL grants access only to that user, the administrators and `SYSTEM`. `quix-bridge test` and the folder check on the **Health** tab then report that the service cannot read the share.

Give the service account access to that one folder, in an administrator prompt:

```powershell
# Read only share
icacls "C:\Users\alice\data" /grant "NT SERVICE\quix-bridge:(OI)(CI)RX"

# Read and write share
icacls "C:\Users\alice\data" /grant "NT SERVICE\quix-bridge:(OI)(CI)M"
```

`(OI)(CI)` makes the files and folders inside inherit the grant. Then run `quix-bridge test` again.

You cannot share `C:\Users` or `C:\Windows` as a whole. This rule applies to `\Users` and `\Windows` on every drive. You can share a folder inside them.

## When the machine is away

When the machine is off or the bridge is stopped, every call to the storage answers **503 Service Unavailable**. It never answers "not found" and never an empty listing, so a sync tool that deletes what it cannot see does not delete your files. S3 clients retry a 503.

## Behavior to know

- When you delete the last file in a folder, the bridge removes the folders the delete left empty, the way S3 shows no empty prefix. A folder you make on the machine and never fill stays.
- The bridge keeps its own temporary files and ETag files next to your files. Their names contain `.sag-`, and no listing shows them.
- To serve another connection, open the bridge on the **Quix Lake Bridges** tab and move it. The move deletes its storage on the old connection, after you confirm.

## Known limits

- **No Lakehouse, Data Lake or Query on a bridge storage.** A Quix Lake Bridge storage cannot back a Quix Lake service in this version. Use a cloud storage for a Lakehouse, a Data Lake or Query.
- **One storage per bridge.** A bridge serves one storage. To serve a second storage, pair a bridge on a second machine. Pairing again on the same machine reuses the same bridge id, so a second bridge from one machine is not supported today.
- **A list page holds about 560 keys.** One list reply must fit in one message of 64 KB or less. So a client that asks for 1000 keys gets about 560 keys and a continuation token. Longer keys give fewer keys per page. The listing stays complete and correct, but a large folder takes about 2 times more calls than on S3.
- **A copy needs 4 connections.** The bridge has no copy operation. Quix copies an object as one read and one write, so a copy holds 2 connections at the same time. The bridge also keeps 2 connections free for small calls. The default is 4 connections, and the pool grows to 8. At the default, a large read or write waits while a copy runs. A copy is as slow as a download plus an upload.
- **The bridge does not see a DNS alias of this machine.** The bridge knows that `localhost`, the computer name, the host name, the full DNS name and the local IP addresses point to this machine. It does not resolve other names. So if you share `C:\data` and also `\\my-alias\data`, where `my-alias` is a DNS alias (CNAME or hosts entry) of this machine, the bridge serves one folder under two shares with two sets of rules. Do not add a share through an alias of the same machine.
- **The gateway log shows "system" when Portal revokes a bridge.** Portal calls the gateway with its own service token, so the gateway log names the caller "system". To find the person, read the Portal audit for the same bridge id and time.
- **User metadata keys can come back with capital letters.** Quix stores every `x-amz-meta-*` key in lower case, as S3 does. The Quix ingress writes header names in capital form over HTTP/1.1, so `x-amz-meta-color` reaches the client as `X-Amz-Meta-Color`. A client that keeps the header case, such as boto3, then shows the key as `Color`. This applies to every storage, not only to a bridge storage. Read user metadata keys without regard to case. Two keys that differ only by case are not supported.
- **The Windows service cannot read a user profile folder** until you grant `NT SERVICE\quix-bridge` access to it. See [Share a folder in a user profile on Windows](#share-a-folder-in-a-user-profile-on-windows).
- **You cannot share `C:\Users` or `C:\Windows` as a whole**, on any drive. Share a folder inside them.
- **No macOS host and no Linux arm64 build.** See [Operating system support](#operating-system-support).

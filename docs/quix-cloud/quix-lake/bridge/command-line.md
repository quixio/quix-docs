---
title: Command line setup
description: Install, pair and share folders with the quix-bridge command, on a server with no desktop or in a script.
---

# Command line setup

Use the command line on a server with no desktop, or in a script. Run every command in an administrator PowerShell on Windows, or with `sudo` on Linux.

The pairing creates the bridge only. You add the storage in the Portal after the bridge connects. See [Step 4 of the quickstart](./quickstart.md#step-4-create-the-storage).

## Step 1: Install the bridge

=== "Windows"

    ```powershell
    irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`, with or without a leading `v`:

    ```powershell
    $env:QUIX_BRIDGE_VERSION = '1.0.0'; irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    The MSI installs the bridge in `C:\Program Files\Quix\Bridge`. It creates the service and starts it. It adds that folder to the system `PATH`. Open a new administrator shell for the next steps, so that it sees the new `PATH`.

    ??? info "Zip install"
        When you run the script as a file, `.\install.ps1 -Version 1.0.0` also picks a version. With `-Zip`, the script copies the files to the same folder and installs no service. A zip install does not change the `PATH`, and it does not update itself. Run `& "C:\Program Files\Quix\Bridge\quix-bridge.exe" service install`. Use the full path for each command.

=== "Linux"

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`:

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | QUIX_BRIDGE_VERSION=1.0.0 sh
    ```

    On a machine with `dpkg` or `rpm`, the script installs the deb or the rpm package. The package installs and starts the service. On other machines, the script copies the binary to `/usr/local/bin`. Then install the service yourself:

    ```bash
    sudo quix-bridge service install
    ```

    This command creates the system user `quix-bridge` (no login) when it does not exist. The service runs as this user. An older install that ran as root moves to the new user by itself at the next install or update.

    The bridge has a Linux build for x64 only. On an arm64 machine, the script stops.

## Step 2: Get the quick config

1. In the Portal, open **Settings → Quix Lake** and select your connection.
2. Open the **Quix Lake Bridges** tab and click **Pair a bridge**.
3. Type the **Bridge name**, then click **Get the install command**.
4. Copy the **quick config**. It expires after 15 minutes. Do not paste it in a ticket or a chat.

## Step 3: Pair the bridge

Run `connect` with no argument. The command asks for the quick config, and you paste it. So no shell history file holds the token.

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

## Step 4: Share folders

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

On Linux, `share add` also grants the user `quix-bridge` the rights it needs, with ACLs, and prints what it granted. See [Share a folder on Linux](./shared-folders.md#share-a-folder-on-linux).

A new share is read only. Add `--read-write` to let Quix write to the folder. `--read-only` is still accepted. `--bucket-root` means write access. The command applies the same rules as the console and refuses the same folders. It does not check that the folder exists. Check the path yourself.

`share list` prints two paths for each row: the path on the machine and the SAG path. To stop sharing a folder, run `quix-bridge share remove <path>` with the path **on the machine**.

Network folders:

- On Windows, `share add` stores no credential. Add a network server and its credential in the [console](./shared-folders.md#share-a-network-folder).
- On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

## Step 5: Start the service

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

The stop and start make the service read the new token. On Windows, the service enrols at the Portal at this start. The shares need no restart. The service applies a `share` command at once.

Every command that needs root stops with a hint and a non-zero exit code when you run it without administrator rights or `sudo`. This applies to `service`, `share list`, `config show` and `status`.

## Step 6: Check the bridge

```bash
sudo quix-bridge status
sudo quix-bridge test
```

- `status` shows the connection, the number of shares and the last error. It exits with code 0 when the service runs and the bridge is connected.
- `test` checks that the service account can read every share, and that the bridge can reach Quix on port 443. It exits with code 0 when every check passed, even while the service is stopped. The report names a check that failed.

Then add the storage in the Portal. On the **Quix Lake Bridges** tab, the menu of the new bridge has **Create storage**. It opens the **Add storage** panel with the bridge picked.

## The config file

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

- `update.channel`: `stable` is the default. Set it to `manual` to turn automatic updates off. The change needs no restart. See [Updates and uninstall](./updates.md).
- `log.retainDays`: the number of days the bridge keeps its audit log. The default is 30 days. The audit log stays at 500 MB or less. Restart the service after you change it.

## Behind a proxy

`network.proxy` and `network.caBundle` in `config.yaml` cover every outbound call the bridge makes. Set them once and restart the service:

```yaml
network:
  proxy: http://proxy.example.com:3128
  caBundle: /etc/ssl/certs/corp-ca.pem
```

## Next steps

* [Updates and uninstall](./updates.md) — how the bridge updates itself, and how you remove it
* [Shared folders and the bucket root](./shared-folders.md) — the same shares in the console
* [Troubleshooting and limits](./troubleshooting.md) — exit codes, states and errors

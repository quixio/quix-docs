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
    $env:QUIX_BRIDGE_VERSION = '0.1.25'; irm https://github.com/quixio/quix-lake-bridge/raw/main/install.ps1 | iex
    ```

    The MSI installs the bridge in `C:\Program Files\Quix\Bridge`. It creates the service and starts it. It adds that folder to the system `PATH`. Open a new administrator shell for the next steps, so that it sees the new `PATH`.

    ??? info "Zip install"
        When you run the script as a file, `.\install.ps1 -Version 0.1.25` also picks a version. With `-Zip`, the script copies the files to the same folder and installs no service. A zip install does not change the `PATH`, and it does not update itself. Run `& "C:\Program Files\Quix\Bridge\quix-bridge.exe" service install`. Use the full path for each command.

=== "Linux"

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | sh
    ```

    To install one fixed version, set `QUIX_BRIDGE_VERSION`:

    ```bash
    curl -fsSL https://github.com/quixio/quix-lake-bridge/raw/main/install.sh | QUIX_BRIDGE_VERSION=0.1.25 sh
    ```

    On a machine with `dpkg` or `rpm`, the script installs the deb or the rpm package. The package installs and starts the service. On other machines, the script copies the binary to `/usr/local/bin`. Then install the service yourself:

    ```bash
    sudo quix-bridge service install
    ```

    This command creates the system user `quix-bridge` (no login) when it does not exist. The service runs as this user. An older install that ran as root moves to the new user by itself at the next install or update.

    The bridge has a Linux build for x64 only. On an arm64 machine, the script stops.

## Step 2: Get the quick config

1. In the Portal, open **Settings → Quix Lake** and select your connection.
2. Open the **Bridges** tab and click **Pair a bridge**.
3. Type the **Bridge name**, then click **Get the install command**.
4. Copy the **quick config**. It expires after 15 minutes. Do not paste it in a ticket or a chat.

## Step 3: Pair the bridge

Run `connect` with no value. The command asks for the quick config, and you paste it. So no shell history file holds the token.

=== "Windows"

    Run this command in an Administrator PowerShell:

    ```powershell
    quix-bridge connect
    ```

=== "Linux"

    ```bash
    sudo quix-bridge connect
    ```

The command stores the token for the service account. If the service runs, the command restarts it by itself. You do not run `enrol` after `connect`.

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

On Linux, `sudo quix-bridge share remove <path>` also takes back the access that the bridge gave the user `quix-bridge` on that folder.

Network folders:

- On Windows, `share add` stores no credential. Add a network server and its credential in the [console](./shared-folders.md#share-a-network-folder).
- On Linux, the bridge accepts no `\\server\share` path. Mount the network share with the operating system, then share the folder where it is mounted.

## Step 5: Restart the service

`connect` already restarts a running service. If the service does not run, start it. To make the service read a changed config, restart it:

=== "Windows"

    ```powershell
    quix-bridge service start
    quix-bridge service restart
    ```

=== "Linux"

    ```bash
    sudo quix-bridge service start
    sudo quix-bridge service restart
    ```

`service restart` needs root or Administrator rights. The shares need no restart. The service applies a `share` command at once.

Every command that needs root stops with a hint and a non-zero exit code when you run it without administrator rights or `sudo`. This applies to `service`, `share list`, `config show`, `logs` and `status`.

!!! warning "The read commands need administrator rights too"
    On Windows, run `status`, `share list`, `test`, `config show` and `ui` in PowerShell as Administrator. Only an administrator can read the bridge config folder. On Linux, run them with `sudo`. Without these rights, the command says "The command has no rights on a file it must read."

## Step 6: Check the bridge

```bash
sudo quix-bridge status
sudo quix-bridge test
```

- `status` shows the connection, the number of shares and the last error. It exits with code 0 when the service runs and the bridge is connected.
- `test` checks that the service account can read every share, and that the bridge can reach Quix on port 443. It exits with code 0 when every check passed, even while the service is stopped. The report names a check that failed.

To read the log, run `quix-bridge logs`:

```bash
sudo quix-bridge logs
sudo quix-bridge logs --lines 500
sudo quix-bridge logs -f
```

- By default, `logs` prints the last 100 lines of the machine log. On Linux, this is `/var/log/quix-bridge/bridge.log`.
- `--lines N` sets the number of lines.
- `-f` or `--follow` keeps the command open and prints new lines.
- `--user` reads the log of your user account instead of the machine log.
- A normal user gets a message to run `sudo quix-bridge logs`.

Then add the storage in the Portal. On the **Bridges** tab, the menu of the new bridge has **Create storage**. It opens the **Add storage** panel with the bridge picked.

## The config file

The bridge keeps its settings in `config.yaml`:

| Operating system | Location |
|---|---|
| Windows | `C:\ProgramData\Quix\bridge\config.yaml` |
| Linux | `/etc/quix-bridge/config.yaml` |

`quix-bridge config show` prints the config the service uses, without the `update` and `network` sections. You can paste the output back into `config.yaml`. These rules apply to the output:

- It leaves out a share key that has its default value.
- A value that the bridge derived from `path` has the comment `# from path`.
- A share with an error prints the error as a `# error:` line.

Two settings you can change by hand:

```yaml
update:
  channel: stable
log:
  retainDays: 14
```

- `update.channel`: `stable` is the default. Set it to `manual` to turn automatic updates off. The change needs no restart. See [Updates and uninstall](./updates.md).
- `log.retainDays`: the number of days the bridge keeps its audit log. The default is 30 days. The audit log stays at 500 MB or less. Restart the service after you change it.

### Shares in config.yaml

Each entry in `shares` has these keys. The keys can come in any order.

| Key | Meaning |
|---|---|
| `path` | The absolute path of the folder on this machine. Required. |
| `name` | The bucket in the SAG address. This is the drive letter on Windows, the first folder on Linux, or `/` for the root share. Optional. |
| `prefix` | The folder inside that bucket. It ends with `/`. Optional. An empty `prefix:` means the default. |
| `readOnly` | `true` by default. Set it to `false` to let Quix write to the folder. |

The bridge takes `name` and `prefix` from `path` when you leave them out. This is the smallest share:

```yaml
shares:
  - path: /srv/data
    readOnly: true
```

This share sets `name` and `prefix` by hand:

```yaml
shares:
  - path: /srv/results
    name: srv
    prefix: results/
    readOnly: false
```

A bad share is skipped. The other shares still serve. The error shows in `quix-bridge status` and `quix-bridge config show`. If you swap `name` and `path`, the error is "name and path look swapped".

## Behind a proxy

`network.proxy` and `network.caBundle` in `config.yaml` cover every outbound call the bridge makes. Set them once and restart the service:

```yaml
network:
  proxy: http://proxy.example.com:3128
  caBundle: /etc/ssl/certs/corp-ca.pem
```

## Next steps

* [Updates and uninstall](./updates.md) — how the bridge updates itself, and how you remove it
* [The bridge console](./console.md) — open the console from another machine
* [Shared folders and the bucket root](./shared-folders.md) — the same shares in the console
* [Troubleshooting and limits](./troubleshooting.md) — exit codes, states and errors

---
title: Updates and uninstall
description: How the bridge updates itself, how to bring an old bridge onto the stable channel, and how to uninstall it.
---

# Updates and uninstall

The bridge installs the latest release by itself. The `update.channel` setting in `config.yaml` controls this. `stable` is the default. Set it to `manual` to turn automatic updates off. See [The config file](./command-line.md#the-config-file).

## Which installs update themselves

| Install | Automatic update |
|---|---|
| Windows MSI | Yes |
| Windows zip | No. Install the new release by hand. |
| Linux deb or rpm | Yes |
| Linux tar.gz | Yes, with a running systemd service |

On a Linux machine with no systemd, such as a container, the deb or the rpm installs but starts no service. Run the bridge in the foreground with `quix-bridge service run`. Run `quix-bridge update run` yourself, on your own schedule.

## How an update runs

The bridge checks for an update **every 5 minutes**:

- The MSI registers this check as a scheduled task that runs as `SYSTEM`.
- The deb and the rpm enable the systemd timer `quix-bridge-update.timer`, which runs as root.
- For a tar.gz install, `sudo /usr/local/bin/quix-bridge service install` registers the same 5-minute update timer.

Before each update, the bridge compares the package with the SHA-256 that Quix sends. A tar.gz install compares the file with the `SHA256SUMS` file of the release. The bridge installs nothing on a mismatch.

An update runs in these steps. You do not need to do anything.

1. The bridge waits until no transfer is running. After 10 minutes, it continues even if a transfer still runs.
2. The service stop gives the running operations up to 60 seconds (`service.drainSeconds`) to finish.
3. The bridge installs the new version and starts the service again.
4. On Windows, the tray restarts by itself.

A failed update puts the old version back. When an install fails, the bridge tries again later, with a longer wait after each failure.

A new release reaches every bridge within about **10 minutes**. The service restarts by itself. In the first minutes after a release, `quix-bridge update run` can print `nothing to do` on Windows, or `no newer version` on Linux. Wait a few minutes, then run it again.

To see the installed version and the last update, see [Check the version and the last update](./troubleshooting.md#check-the-version-and-the-last-update).

## Reinstall

Run `install.ps1` again on the same version to repair the install. The repair puts back the files, the service, the config folder and the update task. It keeps `config.yaml`. The script refuses a version older than the one installed. Uninstall first, or pick the newest version.

## Uninstall

=== "Windows"

    Run this command in PowerShell as Administrator:

    ```powershell
    quix-bridge service uninstall
    ```

=== "Linux"

    ```bash
    sudo quix-bridge service uninstall
    ```

This stops and removes the service. It keeps `config.yaml` and the stored share credentials. Add `--purge` to delete them too. `--purge` refuses on an MSI install and removes nothing. Uninstall the bridge in **Settings > Apps** instead.

On Linux, the uninstall keeps the system user `quix-bridge`, because the ACLs on your shared folders name it. `--purge` removes the user too. For a tar.gz install, the uninstall also removes the update timer that the install wrote.

Uninstalling the bridge does not remove it from Quix. Revoke and remove it in the Portal. See [Revoke and remove a bridge](./overview.md#revoke-and-remove-a-bridge).

??? info "Remove the program"
    - **Windows:** uninstall **Quix Bridge** in **Settings > Apps**. This is the way to remove a bridge that you installed with the MSI. The MSI deletes the config and the stored credentials. To keep them, run `msiexec /x <msi-file> KEEPDATA=1`.
    - **Debian and Ubuntu:** `sudo apt remove quix-bridge` keeps `/etc/quix-bridge`. `sudo apt purge quix-bridge` deletes it.
    - **RHEL and Rocky:** run `sudo quix-bridge service uninstall --purge` first, then `sudo rpm -e quix-bridge`.
    - **Binary only:** run `sudo quix-bridge service uninstall --purge`, then delete `/usr/local/bin/quix-bridge`.

    On Linux, even with `--purge`, the bridge keeps `/var/log/quix-bridge` and `/var/lib/quix-bridge/update` on disk. Delete them by hand if you want a clean machine. If the deb or the rpm is still installed, `service uninstall --purge` also leaves the update timer enabled. Remove the package to stop it.

## Next steps

* [Command line setup](./command-line.md) — the config file and the proxy settings
* [Troubleshooting and limits](./troubleshooting.md) — what to do when the bridge is stuck

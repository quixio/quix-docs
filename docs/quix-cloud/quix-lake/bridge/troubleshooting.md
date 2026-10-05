---
title: Troubleshooting and limits
description: What the bridge states and errors mean, what to check first, and the limits to design for.
---

# Troubleshooting and limits

## Where to look first

1. Open the bridge console. The **status strip** names the cause, the next step and one action. See [The bridge console](./console.md).
2. Open the **Health** tab. Click **Run the folder check** and **Run the reboot check**.
3. On a server with no desktop, run `quix-bridge status` and `quix-bridge test`. Run `quix-bridge logs` to read the log. See [Check the bridge](./command-line.md#step-6-check-the-bridge).

An error carries a **reference**. Copy it with the button beside it and give it to Quix support.

## States in the Portal

| Where | State | Meaning |
|---|---|---|
| **Quix Lake Bridges** tab | **Not used by a storage** | The bridge is paired, but no storage uses it. Click **Assign storage**. |
| **Storages** tab | **Bridge revoked** | The bridge of this storage is revoked. The storage moves no data until you pick another bridge for it. |
| Any client | **503 Service Unavailable** | The machine is off or the bridge is stopped. See below. |

## When the machine is away

When the machine is off or the bridge is stopped, every call to the storage answers **503 Service Unavailable**. It never answers "not found" and never an empty listing. So a sync tool that deletes what it cannot see does not delete your files. S3 clients retry a 503.

A listing of the whole Quix Lake bucket, with no prefix, also answers 503 while the bridge is away, because it cannot be complete. List each storage folder with a prefix instead. See [List the storages](../s3-endpoint.md#list-the-storages).

## Common problems

**The service cannot read a share.** `quix-bridge test` and the folder check report it. On Windows, the service runs as `NT SERVICE\quix-bridge`, which cannot read a user profile folder. Grant it access. See [Share a folder in a user profile on Windows](./shared-folders.md#share-a-folder-in-a-user-profile-on-windows). On Linux, the service runs as the system user `quix-bridge`. Run the `setfacl` command that the console shows. See [Share a folder on Linux](./shared-folders.md#share-a-folder-on-linux).

**"The command has no rights on a file it must read."** The command needs administrator rights. On Windows, run it in PowerShell as Administrator. On Linux, run it again with `sudo`. This applies to the read commands too, such as `status`, `share list`, `test`, `config show` and `ui`.

**"The bridge that serves this storage is not reachable."** A client gets this text with a 503. The bridge machine is off, asleep or offline, or the service is stopped. On that machine, run `quix-bridge status`. See [When the machine is away](#when-the-machine-is-away).

**"OS error 13 (Permission denied)" in the bridge log.** The disk refused a write. The service user cannot write to that folder. On Linux, run the write fix that `sudo quix-bridge status` or the console shows, for example:

```bash
sudo setfacl -R -m u:quix-bridge:rwX -m d:u:quix-bridge:rwX "/srv/data"
```

On Windows, click **Fix write access** on the **Folders** tab of the console. The bridge gives no fix for `/` or a system folder. Share a data folder instead. See [Share a folder on Linux](./shared-folders.md#share-a-folder-on-linux).

**The Linux service does not start.** An older version could crash in a loop under systemd. Update to version 0.1.25 or later. See [Updates and uninstall](./updates.md).

**The pairing token expired.** The token lives 15 minutes. Click **Pair a bridge** again in the Portal to get a fresh quick config.

**The bridge cannot reach Quix behind a proxy.** Set `network.proxy` and `network.caBundle` in `config.yaml`, then restart the service. See [Behind a proxy](./command-line.md#behind-a-proxy).

**The Portal refuses to make the bridge the main storage.** The bridge needs a bucket root first. See [The bucket root](./shared-folders.md#the-bucket-root).

## Check the version and the last update

=== "Windows"

    Run these commands in PowerShell as Administrator:

    ```powershell
    quix-bridge --version
    quix-bridge status
    quix-bridge logs
    ```

=== "Linux"

    ```bash
    quix-bridge --version
    sudo quix-bridge status
    sudo quix-bridge logs
    ```

- `--version` prints the installed version.
- `status` shows the service state, the connection and the last error.
- `logs` shows the log. After an automatic update, it holds a line such as "The bridge installed version 0.1.25 over version 0.1.24."

The status strip of the [console](./console.md#the-status-strip) also shows the version.

## Known limits

- **Speed and uptime depend on the bridge machine.** A bridge storage works like any other storage for the Lakehouse, the Data Lake, and `blobStorage: bind`. The machine must stay online for any service that reads or writes through the storage.
- **One storage per bridge.** To serve a second storage, pair a bridge on a second machine. Pairing again on the same machine reuses the same bridge.
- **A list page can hold fewer keys than you ask for.** A client that asks for 1000 keys can get fewer, often about 560, and a continuation token. The listing stays complete. A large folder takes about 2 times more calls than on S3.
- **A copy is a download plus an upload.** The bridge has no copy operation. So a copy takes as long as both transfers.
- **No copy and no batch delete across two storages.** Both answer `501 Not Implemented`. A copy inside one storage works. To move a file to another storage, download it and upload it. Send one batch delete for each storage.
- **The bridge does not see a DNS alias of this machine.** If you share `C:\data` and also `\\my-alias\data`, where `my-alias` is an alias of this machine, the bridge serves one folder under two shares with two sets of rules. Do not add a share through an alias of the same machine.
- **Empty folders disappear.** When you delete the last file in a folder, the bridge removes the folders the delete left empty. This is how S3 shows no empty prefix. A folder you make on the machine and never fill stays.
- **Hidden helper files.** The bridge keeps small helper files next to your files. Their names contain `.sag-`. No listing shows them.
- **You cannot share `\Windows` as a whole.** A drive root and `\Users` are read only as a whole. Share a folder inside them to allow writes.
- **No macOS host and no Linux arm64 build.** See [Operating system support](./overview.md#operating-system-support).

## Next steps

* [The bridge console](./console.md) — the status strip, the Activity tab and the Health tab
* [Updates and uninstall](./updates.md) — bring an old bridge onto the stable channel

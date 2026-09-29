---
title: The bridge console
description: Open the bridge console, read the status strip and the tabs, and install the console as an app.
---

# The bridge console

The console is a web page on the machine. It listens on this machine only, at `127.0.0.1`.

To open it:

- On Windows, click the Quix Lake Bridge icon in the taskbar and select **Open console...**.
- On any system, run `quix-bridge ui` to get the console address and a login code.

## The status strip

A **status strip** sits above the tabs. It shows the connection state, the time of the last change, the number of shares and the version. When something is wrong, a second line names the cause, the next step and one action, such as **See activity** or **Pair again**.

An error in the status strip or on the **Activity** tab carries a **reference**. Click the copy button beside it to copy the reference, the time and the error detail. Give this text to Quix support.

## The tabs

| Tab | What it shows |
|---|---|
| **Folders** | The folder tree of the machine. You [share folders and set the bucket root](./shared-folders.md) here. |
| **Connection** | The connection to Quix. You paste the quick config here. |
| **Activity** | The connection events, newest first. Each row says what happened and what to do. |
| **Health** | Two checks that change nothing. **Run the folder check** reads each shared folder as the service account and checks that the bridge reaches Quix. **Run the reboot check** looks for anything that stops the bridge after a reboot. |
| **Config** | The `config.yaml` file. A secret never appears in this file. |
| **Log** | Writes, deletes, copies and reads of files. The log holds no file content, no secret key and no token. |

## Install the console as an app

In Edge or Chrome, the console shows an **Install** bar. Click **Install**. Firefox cannot install the console as an app.

- In Edge, tick **Pin to taskbar** in the install dialog.
- In Chrome, right-click the app's taskbar button after install and pick **Pin to taskbar**.

The app opens straight into the console, with no login code, for 30 days after your last use. After 30 days, sign in again with the tray icon or a login code. When the bridge service is stopped, the app shows an offline page.

??? info "Windows 11 hides the tray icon"
    Windows 11 puts a newly installed tray icon behind the **^** arrow next to the clock. Click the arrow to find the Quix Lake Bridge icon. To keep it visible, go to **Settings > Personalization > Taskbar > Other system tray icons** and turn it on there.

## Next steps

* [Shared folders and the bucket root](./shared-folders.md) — what you do on the Folders tab
* [Troubleshooting and limits](./troubleshooting.md) — what the states and errors mean

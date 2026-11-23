---
title: Notebook workers and admin
description: Manage the workers of a notebook workspace, update QuixLab, change the workspace settings, read the logs, and keep the blob storage that notebooks need.
---

# Notebook workers and admin

This page is for the people who run a notebook workspace. Most changes need the Admin or Manager role on the workspace. Every member can see the status and the logs. See [What each role can do](./share-and-permissions.md#what-each-role-can-do).

## Workers

Workers run the nodes of every notebook in the workspace. When all workers are busy, more nodes wait in the run queue. With no worker online, nothing runs, so keep at least one worker running.

A notebook workspace has 1 to 4 workers. Each worker is a deployment with its own CPU and memory. Your organization can also limit the total number of notebook workers.

To open the workers, do one of these steps:

* In the open workspace, click **Workers** in the header. The header also shows how many workers run, for example **1 of 2 workers running**.
* On the Notebooks home, open the actions menu of a workspace in **Notebook workspaces**, and click **Workers**.

The **Workers** dialog has two tabs:

| Tab | What it shows |
|---|---|
| **Workers** | One row per worker: its status, CPU, memory and the nodes it runs. |
| **Run queue** | The nodes that wait, run or ran on the workers, with their state and time. It shows when QuixLab runs. |

### Change the workers

A workspace Admin or Manager can change the workers. Other members see the same dialog without these controls.

| Action | How | What happens |
|---|---|---|
| Add a worker | Click **Add new worker**. Give it a name and a size, and click **Add worker**. | Quix creates the deployment. It joins the pool when its container connects. You can add a worker only when the workspace has fewer than 4. |
| Change a worker | Open the actions menu of the worker, and click **Edit**. Change the size, and click **Save**. | Quix changes the deployment and restarts that worker with the new size. |
| Drain a worker | Open the actions menu of the worker, and click **Drain**. | The worker finishes what it runs and takes nothing new. Click **Resume** to undo it. |
| Remove a worker | Open the actions menu of the worker, and click **Remove**. Confirm with **Remove worker**. | The worker shuts down now, and the nodes it runs stop. You cannot remove the last worker. |

The worker name follows the rules of a deployment name, and it has 120 characters or less. Each worker in a workspace needs its own name. The size uses the deployment sizes of your organization, or custom values.

A change to the workers does not restart QuixLab.

## QuixLab version

The header of the workspace shows a version chip:

* **Latest**: QuixLab runs the latest version.
* **Outdated**: a newer version is available. The tooltip shows the version.

A workspace Admin can click **Outdated** to update QuixLab. A workspace Admin or Manager can also select a version in **Workspace settings**.

!!! warning "An update restarts QuixLab for everyone"
    Before an update, the Portal asks **Restart session?** and shows this text: "This restarts QuixLab for every user in this workspace. Open notebooks disconnect and running cells stop. Saved files are kept." Click **Restart session** to continue. Tell the other users of the workspace before you update.

## Workspace settings

Open the actions menu of a workspace in **Notebook workspaces**, and click **Workspace settings**. The dialog has these fields:

| Field | What it does |
|---|---|
| **Name** | The name of the workspace. Use letters, numbers and spaces. |
| **QuixLab version** | **Latest**, or the version that runs now. Notebooks restart when the version changes. |
| Size | The CPU and memory of QuixLab. Notebooks restart when the size changes. |
| **Cluster** | The cluster of the workspace. It is set at creation, and you cannot change it. |

A workspace Admin or Manager can change the settings and click **Save**. When the change restarts QuixLab, the Portal shows the restart warning first. Other members see the values and **Only notebook workspace Admins and Managers can change these settings.**

The workers have their own dialog. See [Workers](#workers).

## Logs

Every member of the workspace can read the logs, as for dev sessions.

| Logs | Where to find them |
|---|---|
| QuixLab logs | In the open workspace, click **More options** in the header, then **View QuixLab logs**. The logs open in a panel under the notebook. Click **Download QuixLab logs** to save them. |
| Worker logs | In the **Workers** dialog, open the actions menu of the worker, and click **Logs**. |

## Start-up problems

When no QuixLab pod starts within 100 seconds, or the start fails, the workspace shows **Start-up failed** and the reason.

* Click **View logs** to read the QuixLab logs.
* A workspace Admin can click **Restart** to start QuixLab again.

When the workspace has no QuixLab, it shows **QuixLab is not installed in this notebook workspace.** A workspace Admin can click **Install QuixLab**.

## Blob storage

Notebooks keep their files in the blob storage of the cluster. Without blob storage, notebooks cannot open or save.

* You cannot create a notebook workspace on a cluster without blob storage. See [Quix Lake connections and storages](../quix-lake/blob-storage.md).
* When the storage of a workspace is not available, the workspace shows **Storage unavailable**. An open notebook shows **Blob storage is not defined**. A workspace Admin can click **Connect blob storage**.
* The Portal only warns. It does not stop or restart QuixLab or the workers.

## Deployments

A workspace Admin can open the deployments of the workspace: click **More options** in the header, then **Deployments**. QuixLab and each worker are deployments.

## Delete a notebook workspace

A workspace Admin or Manager can delete a notebook workspace.

1. Open the actions menu of the workspace in **Notebook workspaces**, and click **Delete notebook workspace**. You can also find this item in the **More options** menu of the open workspace.
2. Optional: select **Also delete the notebook files**. If you do not select it, the files stay in the storage folder of the workspace.
3. Click **Delete notebook workspace**.

This permanently deletes the workspace and all of its notebooks.

## Next steps

* [Notebooks overview](./overview.md)
* [Share and permissions](./share-and-permissions.md)
* [File Explorer](../quix-lake/file-explorer.md) — see the notebook files in blob storage

---
title: Get started with Notebooks
description: Create a notebook workspace, create your first notebook, and start a notebook from a template.
---

# Get started with Notebooks

This page shows how to create a notebook workspace and your first notebook.

!!! info "Prerequisites"
    - The cluster has [blob storage](../quix-lake/blob-storage.md). Without it, you cannot create a notebook workspace on that cluster.
    - To create a notebook workspace, you need permission to create environments in your organization. Without it, the Portal shows **Ask an admin to create a notebook workspace.**
    - To create a notebook, you need a role that can edit the notebook workspace: Editor, Manager or Admin. See [Roles](../roles.md).

## Create a notebook workspace

1. Open **Notebooks** from the sidebar of your organization.
2. In **Notebook workspaces**, click **New**.
3. In **Name**, type a name. Use letters, numbers and spaces.
4. In **Cluster**, select the cluster. A cluster without blob storage shows **No blob storage**, and you cannot select it.
5. Optional: expand **Workers**. Set the **Number of workers**, from 1 to 4, and the size of each worker.
6. Click **Create**.

By default, a workspace gets 1 worker with 1 CPU core and 2 GB of memory. You can change the workers later. See [Workers](./workers-and-admin.md#workers).

When there is no cluster with blob storage, the dialog shows **Blob storage is not defined**. Click **Set up blob storage** to connect storage first.

### Wait for QuixLab to start

Quix installs QuixLab and the workers in the new workspace. The start can take up to 3 minutes. The status chip shows the progress:

| Status | What it means |
|---|---|
| **Pending** | Quix prepares the workspace. |
| **Starting** | QuixLab starts. |
| **Connecting** | QuixLab runs, and the Portal connects to it. |
| **Running** | QuixLab is ready. |
| **Not installed** | The workspace has no QuixLab. A workspace Admin can click **Install QuixLab**. |
| **Failed** | QuixLab did not start. See [Start-up problems](./workers-and-admin.md#start-up-problems). |

Quix also adds a Private notebook named **Welcome to Notebooks**, owned by you. Quix does not add it when you create the workspace from the **New notebook** dialog, because you create your first notebook next.

## Create a notebook

1. Open **Notebooks**.
2. Click **New notebook**, and select the workspace under **In workspace**.
3. In **Start from**, select **Empty notebook** or a template.
4. In **Name**, type a name. Use letters, numbers, space, dot, dash or underscore. When you leave the name empty, Quix uses the name in the field as a default.
5. In **Workspace**, check the workspace. The list shows only the workspaces where you can edit.
6. Optional: in **Owner**, select another owner. You are the owner by default.
7. Optional: in **Share with (optional)**, add users and groups. Give each one **Can view** or **Can edit**.
8. Click **Create**.

The notebook starts **Private**. When you add a share in step 7, it starts **Shared**. See [Share and permissions](./share-and-permissions.md).

!!! note "An Operator as the owner"
    When you select a user with the [Operator role](../roles.md#the-operator-role) as the owner, that user can open and edit only this notebook. They never see the workspace. If you want to keep access, share the notebook with yourself.

You can also create a notebook workspace from the **Workspace** list of this dialog. Select **+ New notebook workspace**.

## Start from a template

A template is a ready-made notebook. When you use a template, Quix makes a copy that you own. Changes to your copy do not change the template.

1. Open **Notebooks**.
2. In **Templates**, select a template, or click **Browse all templates →** to see all templates.
3. In the **Templates** gallery, use the categories or the search to find a template.
4. Select the template, and click **Use template**.
5. The **New notebook** dialog opens with the template in **Start from**. Complete the steps in [Create a notebook](#create-a-notebook).

The **Start from** list of the **New notebook** dialog also shows all templates.

## Open a notebook

The Notebooks home lists the notebooks you can open. Use the tabs **All**, **Owned by me**, **Shared with me** and **Favorites**, the search, and **Filters** to find a notebook. Click a star to add a notebook to **Favorites**.

Click a notebook to open it in QuixLab. The **Notebooks** panel on the left lists your notebooks, so you can switch between them. Click **Back to my notebooks** to go back to the list.

## Rename or delete a notebook

Open the actions menu of a notebook in the list, or the menu of the open notebook. These actions show only when you can do them:

| Action | What it does | Who can do it |
|---|---|---|
| **Rename** | Changes the name of the notebook. | The owner |
| **Share** | Opens the **Share** dialog. | The owner, a workspace Admin or Manager |
| **Change access** | Opens the **Share** dialog to set **General access**. | The owner, a workspace Admin or Manager |
| **Change owner** | Gives the notebook to another user. | The owner, a workspace Admin or Manager |
| **Delete** | Deletes the notebook. | The owner, a workspace Admin or Manager |

When you delete a notebook, you can select **Also delete the notebook files**. If you do not select it, the files stay in the storage folder of the notebook, and only the owner can see them. To delete the files, QuixLab must run.

## Next steps

* [Share and permissions](./share-and-permissions.md) — share a notebook and see who can do what
* [Workers and admin](./workers-and-admin.md) — manage workers, the QuixLab version and logs

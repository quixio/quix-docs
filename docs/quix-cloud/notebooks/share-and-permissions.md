---
title: Share notebooks and permissions
description: Share a notebook with users and groups, set its general access, and see what each role can do. Notebook folders in File Explorer follow the same rules.
---

# Share notebooks and permissions

Each notebook has one owner. The owner decides who can open the notebook. A share gives access to that notebook only. It never gives access to the notebook workspace.

## General access

The **General access** setting of a notebook has three values:

| Access | Who can open it | Who can run code in it |
|---|---|---|
| **Private** | Only the owner. | The owner. |
| **Shared** | The owner and the people on the share list. | The owner, and people with **Can edit**. |
| **Public** | Every member of the notebook workspace, Viewers included. | Members who can edit the workspace. |

When you set a notebook to **Private**, Quix clears its share list.

!!! warning "Code can reach other notebooks"
    **Private** hides a notebook. Code in other notebooks of the same workspace can still reach its data. People who can run code in a Shared or Public notebook can also reach other notebooks in the same workspace.

## Share a notebook

1. Open the actions menu of the notebook, and click **Share**.
2. In **Add a user or group**, search for a user or a group, and select it.
3. Give each person **Can view** or **Can edit**.
4. Optional: in **General access**, select **Private**, **Shared** or **Public**.
5. Click **Done**.

When you add a person to a Private notebook, the notebook becomes **Shared**. When you remove the last person from a Shared notebook, it becomes **Private** again. When the notebook is **Public**, you cannot add people, because every member can already open it.

| Share role | What the person can do |
|---|---|
| **Can view** | Open the notebook and read the outputs. |
| **Can edit** | Open, edit and run the notebook. |

**Who can share.** The owner, a workspace Admin and a workspace Manager can share a notebook and change its access.

**Who can be on the share list.** Any user of your organization, and any group. A user does not need a role on the notebook workspace:

* A workspace Viewer on the share list gets the share role. With **Can edit**, a Viewer can edit and run that notebook.
* A user with the [Operator role](../roles.md#the-operator-role) gets this notebook only. They never see the workspace. Operators see the notebooks shared with them on their own **Notebooks** page.

A share works only inside your organization.

## Change the owner

1. Open the actions menu of the notebook, and click **Change owner**.
2. Select the new owner. The owner is always a user, not a group.
3. Click **Change owner**.

The old owner loses the owner rights. When the new owner is an Operator, they can open and edit this notebook only.

The owner, a workspace Admin and a workspace Manager can change the owner.

## What each role can do

A role on the notebook workspace gives these rights. The owner of a notebook and its share list add rights to one notebook.

| Action | Admin | Manager | Editor | Viewer | Operator |
|---|---|---|---|---|---|
| Open Public notebooks | Yes | Yes | Yes | Yes | No |
| Run Public notebooks | Yes | Yes | Yes | No | No |
| Open notebooks shared with you | Yes | Yes | Yes | Yes | Yes |
| Create notebooks | Yes | Yes | Yes | No | No |
| Share, change access, change owner and delete any notebook of the workspace | Yes | Yes | No | No | No |
| List every notebook with **Show all users** | Yes | Yes | No | No | No |
| Change workers and **Workspace settings**, the QuixLab version included | Yes | Yes | No | No | No |
| Delete the notebook workspace | Yes | Yes | No | No | No |
| Update QuixLab from the version chip, install QuixLab or restart it after a failed start | Yes | No | No | No | No |
| See workers, the run queue and logs | Yes | Yes | Yes | Yes | No |

Only the owner can rename a notebook.

### Show all users

By default, everyone sees only the notebooks they can open, also a workspace Admin or Manager. A workspace Admin or Manager can turn on **Show all users** to list every notebook of the workspace.

The list then also shows the Private and Shared notebooks of other users. The access icon says **You see it as a workspace admin.** You can manage these notebooks from the actions menu. You cannot open them: QuixLab opens a notebook only for its owner, the people on its share list, and, for a Public notebook, the workspace members. This rule applies to admins too.

## See the shares of a user or a group

Organization administrators see notebook permissions on the **Users** page.

* The **Notebooks** tab of a user shows the role of the user in each notebook workspace.
* Under it, **Notebooks shared with** lists each notebook that a share gives to the user. The **Via** column shows whether the share is direct or comes from a group.
* The permissions tab of a group, in the organization settings, lists the notebooks shared directly with the group.

To give a user one notebook, open the user, and click **Assign notebook**. Select the notebook workspace, the notebook and **Can view** or **Can edit**, and click **Assign**. This adds the user to the share list of the notebook. You can assign a notebook you own, or any notebook when you are an admin.

To change the role of a direct share, select **Can view** or **Can edit** in its row. To remove a direct share, click **Remove the share**.

## Notebooks in File Explorer

Each notebook has its own folder in the blob storage of the cluster: `<workspace id>/notebooks/<notebook id>/`. [File Explorer](../quix-lake/file-explorer.md) and the [storage permissions](../quix-lake/secure-storage-access.md) follow the access of the notebook:

| Notebook access | Folder access |
|---|---|
| **Private** or **Shared** | The owner gets **Read-Write Access**. A **Can edit** share gives **Read-Write Access**. A **Can view** share gives **Read Access**. Everyone else gets **No Access**. |
| **Public** | The [project role](../quix-lake/secure-storage-access.md#the-project-role) on the notebook workspace decides, as for any environment folder. |

In the **Storage permissions** tab, notebook folders show **Inherited (from notebook permissions)**. You cannot change them there. Change the access or the share list of the notebook instead.

An organization administrator can list every notebook folder, as in other folders. They cannot read, change or delete the files of a Private notebook folder that is not shared with them. See [What administrators can do](../quix-lake/secure-storage-access.md#what-administrators-can-do).

## Next steps

* [Workers and admin](./workers-and-admin.md) — workers, QuixLab version, settings, logs and storage
* [Storage permissions](../quix-lake/secure-storage-access.md) — the rules for every other folder
* [Roles](../roles.md) — the roles of Quix Cloud

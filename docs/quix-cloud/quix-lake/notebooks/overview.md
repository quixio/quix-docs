---
title: Notebooks overview
description: Explore and analyze data in Python notebooks inside the Quix Portal. Notebooks live in notebook workspaces, and each notebook has one owner who decides who can open it.
---

# Notebooks overview

**Notebooks** let you explore and analyze data in Python, inside the Quix Portal. You do not install anything on your computer.

Each notebook opens in **QuixLab**, the notebook editor of Quix. A notebook is a plain Python file. QuixLab shows the file as a canvas of nodes. When you edit a node, QuixLab saves the change back to the file.

Open **Notebooks** from the sidebar of your organization.

!!! info "Prerequisites"
    - The cluster has a [Quix Lake connection](../blob-storage.md) with blob storage. Notebooks keep their files in blob storage.
    - You have a role on a notebook workspace, or somebody shared a notebook with you.

## Notebook workspaces

A **notebook workspace** holds the notebooks of a team. It is a project with one environment, and it has no Git repository and no Kafka. It runs one notebook service instead of your own deployments.

Each notebook workspace has these parts:

| Part | What it does |
|---|---|
| **QuixLab** | The notebook service. It opens, edits and saves the notebooks of the workspace. |
| **Workers** | The machines that run the nodes of every notebook in the workspace. A workspace has 1 to 4 workers. See [Workers and admin](./workers-and-admin.md). |
| **Cluster** | The cluster where QuixLab and the workers run. You select it when you create the workspace, and you cannot change it later. |
| **Blob storage** | The storage of the cluster. It keeps the notebook files. |

You manage the members and roles of a notebook workspace in **Users**, as you do for projects. The **Notebooks** tab of a user shows the role of that user in each notebook workspace.

## Notebooks and their owners

Each notebook has one **owner**. The person who creates a notebook is its owner, unless they select another owner.

The **General access** setting of a notebook decides who can open it:

| Access | Who can open the notebook |
|---|---|
| **Private** | Only the owner. |
| **Shared** | The owner and the people on the share list. |
| **Public** | Every member of the notebook workspace. Members who can edit the workspace can run it. |

A new notebook starts **Private**. When you add a person to the share list, the notebook becomes **Shared**. See [Share and permissions](./share-and-permissions.md).

!!! warning "Access controls who opens a notebook, not what code can reach"
    All notebooks of a workspace run on the same workers. Code in one notebook can reach the data of other notebooks in the same workspace, also a Private notebook. Put notebooks that need a hard boundary in different notebook workspaces.

## Where the files are

Quix keeps each notebook in its own folder in the blob storage of the cluster:

```text
<workspace id>/notebooks/<notebook id>/
```

You can see these folders in [File Explorer](../file-explorer.md). The access setting of the notebook also controls the folder. See [Notebooks in File Explorer](./share-and-permissions.md#notebooks-in-file-explorer).

## Next steps

* [Get started](./get-started.md) — create a notebook workspace and your first notebook
* [Share and permissions](./share-and-permissions.md) — who can open, edit and manage a notebook
* [Workers and admin](./workers-and-admin.md) — workers, QuixLab version, settings, logs and storage

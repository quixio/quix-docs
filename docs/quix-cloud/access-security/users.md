---
title: Users
description: Invite people to your Quix Cloud organisation, edit their details and group, set their permissions, and delete them.
---

# Users

The **Users** page in your organisation's sidebar lists the people in your organisation, with their organisation role and their [user group](user-groups.md). Unless your organisation-level role is Admin, Manager, Editor or Viewer, it lists only you.

You need the Admin role at the organisation level to invite and delete users, and to change another user's details, group or permissions. Without it, you can still open users in the list to view their permissions, and edit your own first and last name.

## Invite a user

1. Open your organisation's **Users** page and select the **Users** tab.
2. Click **+ Invite user**.
3. Enter the person's **Email**, **First name** and **Last name**.
4. Choose their **Organisation role**. It is **Editor** by default.
5. Click **Invite user**.

Quix Cloud emails them an invitation. Until they accept it, they appear in the list as **Pending**. To share the invitation yourself, choose **Copy invite link** from their menu in the list.

You can't invite someone who already belongs to, or is invited to, a Quix Cloud organisation.

## The users list

The list shows each user's **Full name**, **Email**, **Organisation role** and **Group**, and more columns you can show or hide with the column picker. Use **Search by name or email…** to filter it, and click a user to open their page.

The **Organisation role** column summarises each user's roles. It shows a **(Custom)** suffix - for example `Editor (Custom)` - when their assignments go beyond a single organisation-wide role. When the user inherits from their group, it shows the group's role and the group's name. See [How group roles and user roles combine](../roles.md#how-group-roles-and-user-roles-combine).

## Edit a user's details

Choose **Edit details** from the user's menu in the list, or open the user and click the pencil next to **Full name** or **Group** in the **User details** panel. In the **Edit details** dialog, change their first name, last name or **Group**, and click **Save**. The email address can't be changed.

A user can belong to one group at a time. After you change a user's **Group**, their **Inherit from group** toggle is off - turn it on to have them inherit the group's roles. You can't change your own group.

## Set a user's permissions

1. Open the user and select the **Project permissions** tab, or choose **Edit permissions** from their menu in the list.
2. Set a role at the organisation level, and override it for specific projects or environments where needed.
3. Click **Save changes**.

Only an Admin can change permissions on this tab, and not their own. While the user's **Inherit from group** toggle is on, their roles come from the group and can't be edited here. The [roles](../roles.md#available-roles), [levels](../roles.md#permission-levels) and [inheritance rules](../roles.md#inheritance) are described in [Roles and permissions](../roles.md).

## Delete a user

Choose **Delete user** from the user's menu in the list, or open the user and click **Delete** in the **Delete this user** card. In the **Delete user?** dialog, type `DELETE` and click **Delete user**.

Deleting a user can't be undone, and applications that use their credentials, such as their [personal access tokens](personal-access-token.md), are no longer authorized. You can't delete yourself, or the last Admin of your organisation.

## See also

- [User groups](user-groups.md) - Give a team the same roles through a group
- [Roles and permissions](../roles.md) - Roles, levels, inheritance, and how group roles combine with a user's own
- [Personal access tokens](personal-access-token.md) - Token-based authentication tied to a user

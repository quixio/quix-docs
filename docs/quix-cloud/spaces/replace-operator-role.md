---
title: Replace the Operator role with a space
description: The Operator role is deprecated. Rebuild the plugin-only view it gave users as a space, then move those users from Operator to a role such as Viewer.
---

# Replace the Operator role with a space

!!! warning "The Operator role is deprecated"

    Existing Operator assignments still work, but don't assign the role to new users. To give users a plugin-only view of Quix Cloud, use a space and a role such as `Viewer`.

## Why replace it

The Operator role combines a permission, full plugin access (`plugin:*`), with a fixed view. An Operator-only user, whose every role assignment is `Operator`, sees only organization plugins, and any other page sends them back to their first one. A space separates the view from the permission, and lets you choose the apps, landing page and sidebar.

The two don't combine. Inside a space, apps open at an address that Operator-only users can't open, so a header app or sidebar app sends them to their first organization plugin instead.

## What changes for your users

| | `Operator` | `Viewer` and a space |
|---|---|---|
| Where they start | Their first organization plugin | The space's landing page |
| Plugin access | `plugin:*` wherever the role applies | `plugin:read` in the environment where you assign `Viewer` |
| Other resources | None | Read access to the environment's other resources, such as its deployments |

## Before you start

* Assign `Viewer` only at the environment that runs the plugins, not at project or organization level. It can read that environment's other resources through the Quix APIs and CLI.
* If a plugin checks for `Create`, `Update` or `Delete` on the `Plugin` resource, test it with `Viewer`. See [Checking permissions programmatically](../services/plugin.md#checking-permissions-programmatically).
* The plugins must be [organization plugins](../services/plugin.md#organization-plugins).
* To find who has `Operator`, check the `Project permissions` tab on each user's or group's page.

<a id="move-users-from-operator-to-a-space"></a>

## Move users off Operator

Work in this order, so users go straight from their Operator view to the space without seeing the standard portal in between:

1. [Create a space](create-space.md#create-a-space).
2. In `Header apps`, select `Custom`, and pin each plugin the users work with.
3. In `Landing page`, select the plugin they use most.
4. In `Organization sidebar`, select `Hidden`. The landing plugin then opens full screen, and members move between plugins from the header. Or select `Custom` and keep only the plugin apps.
5. Optionally, trim `Environment`, and turn off the plugin toolbar in `Dev tools`.
6. In `Membership`, bind the users' group, or add them directly if the group includes people who don't need this view. Save the space.
7. On the group's `Project permissions` tab, set `Viewer` on the environment that runs the plugins, and change every `Operator` row to `None` or the role the group needs there. For a user with `Inherit from group` off, do this on their own `Project permissions` tab.
8. Ask signed-in users to reload the page. The portal checks for the Operator role once per session.

## Check the result

[Preview the space](create-space.md#preview-a-space-as-a-member) to check the view. Preview keeps your own role, so check the roles separately: each user's `Project permissions` tab should show `Viewer` on the plugin environment and no `Operator` rows.

If a header app still sends a user to their first organization plugin, they still have only the `Operator` role, or they haven't reloaded the page.

## See also

* [Roles and permissions](../roles.md)
* [Assign members](membership.md)

---
title: Spaces overview
description: Spaces let organization admins shape the Quix Cloud portal for each audience, controlling the sidebars, header apps, landing page and accent that a group of people sees, without changing their permissions.
---

# Spaces overview

A **space** is a view of the Quix Cloud portal that an organization admin designs for one audience. It decides which sidebar items, header apps and landing page its members see. It changes what people see, never what they can do: permissions still come from [roles](../roles.md).

## When to use a space

Use a space when a group needs a narrower portal than everyone else, such as line operators who need one or two plugin apps, or analysts who need `Query Data` and `File Explorer`. A space is also the only way to put plugin apps in the header.

Creating a space is safe. It affects nobody, you included, until it has members, and users in no space keep the standard portal.

To give people a plugin-only view, use a space instead of the deprecated Operator role. See [Replace the Operator role with a space](replace-operator-role.md).

## What a space controls

* The organization sidebar: which modules appear, plus custom plugin apps, pages inside them, shortcuts into an environment, and headings. Or no sidebar at all.
* The modules inside every environment, including the YAML sync button and the environment `Settings` row.
* The apps pinned to the header. Outside a space, the header app strip is empty.
* The landing page members arrive on.
* The accent color and icon that identify the space.
* Whether members choose their own light or dark theme.
* Whether the plugin toolbar appears over embedded apps.

A hidden module disappears from the sidebar, the command palette and links elsewhere in the portal. Opening its address directly takes members to the space's landing page. When you save a change, signed-in members get it without reloading.

## What a space doesn't control

A space curates the portal's navigation only. It isn't a security boundary:

* **Hiding a page doesn't secure it.** The data and actions behind it stay reachable through the Quix APIs and the Quix CLI for anyone whose role allows them.
* **Showing a page doesn't grant access to it.** The page's own permission check still applies.
* **If spaces fail to load, no space is applied.** People get the standard portal, and nothing is blocked.
* **Some parts aren't curated:** panels that open inside another page, such as the project variables panel, and [environment plugins](../services/plugin.md#environment-plugins) in the `Plugins` section of the environment sidebar. Only clearing every environment module removes that section.

To control what people can do, assign [roles](../roles.md).

## Key concepts

| Term | Meaning |
|---|---|
| **Member** | A user in a space, through a bound permission group or added directly. Binding a group is live: people who join the group later become members, and people who leave it lose the space. |
| **Active space** | The one space shaping a user's portal right now. A user can belong to several spaces. The active one is saved to their account. |
| **Spaceless** | No space applied: the standard portal. Users in no space see it. Once you belong to a space, only organization admins can choose Spaceless. |
| **Source** | Where a designer section comes from: `Stock`, `Custom`, `Hidden` or `None`. See [How section sources work](create-space.md#how-section-sources-work). |

<a id="who-can-do-what"></a>

## Admins are members too

Only organization admins, users with the `Admin` role at organization level, create, edit and preview spaces and assign members. A space shapes an admin's own portal exactly as it shapes anyone else's.

!!! warning "Don't hide your own way back"

    If your active space hides `Spaces`, `Settings` or `Audit`, you lose them too, and opening their address sends you to the landing page. Previewing a space also hides them. To get them back, [switch to Spaceless](use-spaces.md#switch-to-spaceless), or to another of your spaces that shows them.

## Next steps

* [Work in a space](use-spaces.md)
* [Create and design a space](create-space.md)
* [Assign members](membership.md)
* [Replace the Operator role with a space](replace-operator-role.md)

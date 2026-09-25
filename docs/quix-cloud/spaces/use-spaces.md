---
title: Work in a space
description: See which space you're in, switch between your spaces, and understand why sidebar items, header apps or pages change in the Quix Cloud portal while a space is active.
---

# Work in a space

If sidebar items have disappeared, the header shows a colored chip with a name, or a link took you to a different page, you're probably working in a **space**: a view of the portal that an admin set up for your team. A space changes what you see, not your permissions.

## Which space you're in

The space chip in the header shows your active space, and the space's accent color tints the header and sidebars. If there's no chip, no space is applied: either you belong to no space, or the portal couldn't load your spaces. Reload the page to try again.

## Switch spaces

The chip opens a menu when you belong to two or more spaces. Organization admins get the menu with one space, so they can switch to [Spaceless](#switch-to-spaceless). When you pick a space, the portal opens its landing page. If you switch from inside an environment, you leave the environment.

Your active space is saved to your account, so it follows you to any browser or device. The first time, Quix Cloud picks it for you.

When you sign in, you go to your space's landing page once per session, and only if you open the portal's home page. Bookmarks and links still open the page they point to, if your space includes it.

## What changes in a space

* **Sidebars** show only the modules and entries the space includes. Some spaces have no organization sidebar.
* **Header apps** are the plugin apps the space pins.
* **The command palette** (++cmd+k++ on macOS, ++ctrl+k++ on Windows and Linux) lists only the space's modules and apps.
* **`Home`** leaves out sections for hidden modules.
* **Links to hidden pages** stay visible as text, but don't open.
* **Theme:** the space can set it for you. Your own choice comes back when you leave the space.
* **Plugin toolbar:** if the space hides it, leave an embedded app with the command palette or a header app.

<a id="why-a-page-sends-you-to-your-spaces-landing-page"></a>

## Why a page sent you somewhere else

When you open a page your space hides, from a bookmark, a shared link or the address bar, the portal takes you to the space's landing page with a message such as:

> **Deployments** isn't part of **Line operations** — you're back at **Line monitor**.

This isn't a permission error. To reach the page, switch to a space that includes it, or ask an organization admin.

A space redirect always shows the "isn't part of" message. If you're sent somewhere else without it, or you see an access error, your role doesn't allow the page, and switching spaces won't help. See [Roles and permissions](../roles.md).

## When an admin changes your space

The sidebar and header update without a reload, and the portal doesn't move you off the page you're on. If you're removed from your active space, you move to your next space, or to the standard portal if you have none left.

## Switch to Spaceless

**Spaceless** is the standard portal, with no space applied. Only organization admins can choose it. Use it when your active space hides `Spaces`, `Settings` or `Audit`, or to see the portal without any space. Select `Spaceless` at the bottom of the space chip menu, or click `Go spaceless` on a redirect message. You stay Spaceless until you pick a space.

While you're Spaceless, the header app strip is empty. Plugin apps are still in the command palette, and open full screen.

The pencil next to each space in the chip menu opens that space in the designer without switching you into it.

## See also

* [Spaces overview](overview.md)
* [Roles and permissions](../roles.md)

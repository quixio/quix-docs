---
title: Work in a space
description: See which space you're in, switch between your spaces, and understand why sidebar items, header apps or pages change in the Quix Cloud portal while a space is active.
---

# Work in a space

An organization admin can put you in a **space**: a view of the Quix Cloud portal set up for your team. The space decides which sidebar items, header apps and landing page you see. It doesn't change your permissions.

If sidebar items have disappeared, the header shows a colored name chip, or a link took you to a different page, you're probably working in a space. This page explains how to tell which space you're in, how to switch, and why some pages send you to your space's landing page.

## Find your current space

When a space is active, the **space chip** shows its icon and name. The chip appears in two places:

* In the top bar on organization pages such as `Home` and `Projects`, directly after the organization name.
* In the top bar inside a project environment, at the far left.

Hover over the chip to see why you're in the space:

* `Assigned to you` means an admin added you to the space directly.
* `Via your group` means you're in the space because of your permission group.

If the space has a description, the tooltip shows the description first, for example `Line operations tools — via your group`.

The space's accent color gives you a second cue. It draws a thin line across the top of the header, and tints the space chip and the selected item in the sidebars.

!!! note "No space chip"

    If you don't see a space chip, no space is applied. Usually that means you don't belong to any space, and you see the standard portal, with every module your role allows. It can also mean the portal couldn't load your spaces. Reload the page to try again.

## Switch to another space

*(Anyone whose space chip opens a menu — the space chip in the header.)*

Switch spaces when you need a different set of tools, for example to move from an operations view to a development view.

Whether the chip opens a menu depends on your role and how many spaces you belong to:

| You are | You belong to | The space chip |
|---|---|---|
| Any user | No spaces | Doesn't appear |
| Not an admin | One space | Shows the space, but doesn't open a menu |
| Not an admin | Two or more spaces | Opens the switcher menu |
| Organization admin | One or more spaces | Opens the switcher menu. See [For organization admins](#for-organization-admins). |

To switch spaces:

1. Click the space chip in the header.

    The `Switch space` menu opens. It lists every space you belong to, in the order your admins set. Each row shows the space's icon, name and `Assigned to you` or `Via your group`. A check mark marks your active space.

2. Click the space you want.

The portal covers the screen briefly with the new space's icon and name and the caption `Switching space`. It then opens the new space's landing page. If you switch from inside an environment, you leave the environment.

To close the menu without switching, press ++esc++ or click outside it.

### Where you land after switching

The landing page depends on how the new space is set up:

* **An organization page**, such as `Projects` or `Query Data`, opens that page.
* **A plugin app** that is also in the space's sidebar opens inside the portal, with the sidebar still visible.
* **A plugin app** that isn't in the sidebar opens full screen.
* **`Home`**, the default, opens `Home`. If the space hides `Home`, the first item in the space's sidebar opens instead.

## Which space you start in

Quix Cloud saves your active space to your user account, not to your browser. The portal opens in the same space the next time you sign in, on any browser or device.

* If you belong to one space and you aren't an admin, you always work in it.
* If you belong to several spaces, Quix Cloud chooses your starting space the first time. After that, the portal opens in the last space you chose.
* When you sign in and open the portal's home page, you go to your space's landing page once per session. A bookmark or a link to a specific page still opens that page, if your space includes it.

If a switch can't be saved, the portal returns to your previous space and shows an error message.

## What changes when a space is active

The active space shapes most of the portal. Your permissions don't change.

| Part of the portal | What you see in a space |
|---|---|
| Organization sidebar | Only the items the space includes. Some spaces hide this sidebar completely, so you work from the header and the page content. |
| Environment sidebar | Only the modules the space includes. When you open an environment, you start on the first module the space shows, which isn't always `Pipeline`. |
| Header apps (app shortcuts in the top bar) | Only the plugin apps the space pins, in the order your admins set. They open inside the portal. If the space pins no apps, there are none. |
| Command palette | Pages from the modules the space includes, and the apps the space pins or lists in its sidebar. Open it with ++cmd+k++ on macOS or ++ctrl+k++ on Windows and Linux. |
| Home page | Sections and shortcuts for modules the space hides don't appear. |
| Links elsewhere in the portal | Links to pages the space hides stay visible as text, but don't open. See [Links to pages outside your space](#links-to-pages-outside-your-space). |
| Theme | The space can set a light, dark or automatic theme for you. See [Theme set by your space](#theme-set-by-your-space). |
| Plugin toolbar | The space decides whether the floating toolbar button appears over embedded apps. See [Plugin toolbar](#plugin-toolbar). |

The organization name button and the Quix logo take you to `Home`. If the space hides `Home`, they take you to the space's landing page, or to the first entry in its sidebar. When there's nowhere else to go, the button is disabled with the tooltip `This space opens on its landing page only`.

A custom sidebar entry whose app or page no longer exists appears disabled, with the tooltip `This app is not available right now` or `This page is not available right now`.

### Theme set by your space

A space can set the theme for its members instead of letting each person choose. When it does:

* The portal uses the space's theme.
* Your theme switch stays visible but is disabled. It appears in the account menu and at the foot of both sidebars.
* Hover over the disabled switch to see the tooltip `Theme is set by your space, {space name}`.

Your own theme choice isn't lost. When you switch to a space that doesn't set the theme, or an admin stops setting it, the portal uses your choice again.

When you first load the portal, you may briefly see your own theme before the space's theme applies.

### Plugin toolbar

The plugin toolbar is the floating button over an embedded plugin app. It opens a menu of portal shortcuts and gives you a way out of the app. Your space decides whether it appears.

Where the toolbar appears, you can:

* Drag it anywhere on the screen. Your browser remembers the position.
* Hide it by selecting `Hide this button` from its menu. The message `App button hidden until you refresh the page.` confirms this, with an `Undo` action. The button comes back when you refresh the page.

If your space turns the toolbar off, leave an embedded app with the command palette, or with an app pinned in the header.

## Why a page sends you to your space's landing page

A space can hide a page that your role allows you to open. You can still reach the page's address by following a shared link, using an old bookmark, or typing the address.

When you open a hidden page, the portal takes you to your space's landing page and shows a message such as:

> **Deployments** isn't part of **Line operations** — you're back at **Line monitor**.

The message names the page, your space and the landing page. If your space's landing page is `Home`, the default, the message ends after the space name.

This isn't an error, and it isn't about your permissions. The page exists and your role may allow it, but your active space doesn't show it. To reach the page, switch to a space that includes it. If none of your spaces include it, ask an organization admin.

**How to tell a space redirect from a permission block:** a space redirect always shows the "isn't part of" message. If you're sent somewhere else without that message, or you see an access error, your role doesn't allow the page. Switching spaces doesn't help. Ask an organization admin about your role. See [Roles and permissions](../roles.md).

Organization admins also see a `Go spaceless` button on the message. See [Switch to Spaceless](#switch-to-spaceless).

### Links to pages outside your space

Links to hidden pages, for example on deployment cards or in tables, stay visible so you can still read them. They don't open, and the pointer doesn't change when you hover over them.

Hover over one of these links to see the tooltip `Not available in {space name}`. If you click it, the portal shows the same "isn't part of" message as a redirect.

## When an admin changes your space

Admins can change a space, or your membership, while you're signed in. The sidebar and header update without a reload. The portal doesn't navigate away from the page you're on, but it shows a message:

* If you're added to or removed from a space: `Your spaces have changed — the sidebar and header were updated.`
* If an admin edits your active space so that it no longer includes the page you're on: `{space name} was updated — this page is no longer part of it.` Click `Go to landing` to go to the space's landing page.

If an admin removes you from your active space, your active space changes to your next space, or to the standard portal if you have none left. You stay on the current page until you move to another one.

## For organization admins

*(Organization admins only. Other users don't have these options.)*

Admins belong to spaces just as other users do, and their active space shapes their portal in the same way. Admins also get a `Spaceless` row in the switcher, an edit button for each space, and preview.

### Switch to Spaceless

**Spaceless** means no space is applied: you see the standard portal. It's how an admin steps outside every space to see the full platform.

Switch to Spaceless when:

* Your active space hides `Spaces`, `Settings` or `Audit`, and you need them. While the space hides them, you have no sidebar item for them, and opening their address sends you to the landing page.
* You want to see the portal as it looks without any space.

To switch to Spaceless:

1. Click the space chip in the header.
2. At the bottom of the `Switch space` menu, click `Spaceless`. The row has a `Default` badge and the subtitle `The stock platform`.

The portal covers the screen briefly with the name `Platform default` and the caption `Leaving space`, then opens `Home`. The chip now reads `Spaceless`, and its tooltip is `Platform default — pick a space to switch into it`.

You can also click `Go spaceless` on the message that appears when your space redirects you from a hidden page.

Spaceless is saved like any other choice, so you stay Spaceless until you pick a space from the chip.

While you're Spaceless, the header app strip is empty. Every plugin app is still available from the command palette, and opens full screen.

### Edit a space from the switcher

Each space in the `Switch space` menu has an edit button with the tooltip `Edit {space name}`. It opens that space in the designer without switching you into it. See [Create and manage spaces](create-space.md).

If your active space hides `Spaces`, the edit button sends you to the landing page instead, because the designer is part of the `Spaces` module. Switch to Spaceless first.

### Previewing a space

If you see a banner that reads `Previewing as member — this is what members of this space see`, you're previewing a space rather than working in it. Click `Exit preview` to leave the preview and return to the Spaces page, or pick a space from the chip. See [Preview a space as a member](create-space.md#preview-a-space-as-a-member).

## See also

* [Spaces overview](overview.md)
* [Spaces reference](reference.md#troubleshooting)
* [Roles and permissions](../roles.md)

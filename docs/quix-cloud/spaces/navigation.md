---
title: Design navigation
description: Choose the header apps, organization sidebar, environment modules and landing page for a space in the space designer, copy a section from another space, and edit directly in the live preview.
---

# Design navigation

**Space navigation** decides what members of a space can reach and where they start. In four sections of the space designer you choose the apps pinned to the header, the entries in the organization sidebar, the modules inside every environment, and the landing page. You can go from a lightly trimmed platform for developers to a single app with no sidebar at all for line operators.

Start with a space open in the designer: in the organization sidebar, select `Spaces`, then click the space's card. To create a space, see [Create a space](create-space.md#create-a-space).

Hiding a page removes it from members' sidebars, command palette and links, and sends direct visits to the landing page. It doesn't remove access, and showing a page doesn't grant it. See [What a space doesn't control](overview.md#what-a-space-doesnt-control).

## How section sources work

`Header apps`, `Organization sidebar` and `Environment` each start with a row of **source tiles**. The tile you select decides where that part of the portal comes from:

| Section | Sources | Default |
|---|---|---|
| `Header apps` | `None`, `Custom` | `None` |
| `Organization sidebar` | `Stock`, `Custom`, `Hidden` | `Stock` |
| `Environment` | `Stock`, `Custom` | `Stock` |

| Source | What members see |
|---|---|
| `None` | No apps pinned. The header app strip is empty. |
| `Stock` | The platform's standard sidebar. New Quix modules appear in it automatically. |
| `Custom` | Exactly the entries you pick, in your order. |
| `Hidden` | No organization sidebar at all. Members get the header and the page content only. |

Each section also has a `Copy` tile, which replaces the section with the same section from another space. See [Copy a section from another space](#copy-a-section-from-another-space).

!!! warning "A Custom list doesn't change on its own"

    A `Custom` list is frozen. When Quix adds a new module to the portal, it appears automatically in `Stock` sidebars, but not in `Custom` ones. To show a new module in a `Custom` sidebar, select it in the designer and save. Choose `Stock` for any audience that should always get the full, current platform.

!!! warning "Saving on Stock or Hidden removes custom entries"

    While the designer is open, you can switch tiles and switch back to `Custom` without losing anything, unless you copy a section in between. If you save while the organization sidebar is `Stock` or `Hidden`, its custom plugin apps, environment links and headings are deleted. The designer warns you only when you switch to `Stock`.

### What happens when you switch source

* **Switching the organization sidebar to `Stock`** clears your custom entries from the draft, with the message `Custom apps and headings were cleared — the stock sidebar has no custom entries. Pick Custom again before saving to get them back.`
* **Switching to `Hidden`** clears them in the same way, without a message.
* **Switching back to `Custom`** before you save restores them. After you [copy a section](#copy-a-section-from-another-space), switching back no longer restores the entries you had before the copy.
* **Editing a `Stock` sidebar in the live preview** switches it to `Custom`, because a `Stock` sidebar can't hold edits. The new `Custom` list starts as a copy of the stock sidebar, so the only change members see is the one you made. A message confirms the switch:

    `Switched the organization sidebar from Stock to Custom so you can edit it — it no longer picks up new Quix modules automatically. Nothing changes until you save.`

    For the environment sidebar, the message names the `environment sidebar` instead. To undo the switch before you save, select the `Stock` tile.

## Pin header apps

*(Organization admins — space designer, `Header apps` section.)*

The header app strip is the row of plugin apps in the top bar of the portal. For an audience that works in one or two apps, the strip is the main way around the portal. Members open a pinned app inside the portal, with the organization sidebar still visible.

The strip only ever shows apps a space pins. It starts as `None`, which pins nothing. What you pin also matters for search: inside a space, the command palette (++cmd+k++ on macOS, ++ctrl+k++ on Windows and Linux) lists only the apps the space pins or puts in its organization sidebar.

You can pin only [global plugins](../services/plugin.md#global-plugins): deployments with the `Organisation plugin` setting turned on in the deployment dialog, which sets `plugin.globalItem.show: true` in YAML. If the `App` list shows `No plugin apps available yet`, no deployment in the organization is a global plugin yet.

1. In the section list, select `Header apps`.
2. Select the `Custom` tile.

    The caption reads `Only the pinned apps below, in this order`.

3. Click `+ Plugin app`.

    A new row appears with `Not configured yet`, and its editor opens beside it.

4. In `App`, choose the plugin. Each option shows the app name and where it's deployed: the project and environment, or the number of environments when the plugin has several. Apps already pinned to this space aren't offered, because each app can be pinned once.
5. Optionally, in `Label`, enter a shorter name for the pin. Leave it empty to use the app's own name.
6. Optionally, under `Icon`, choose a different icon.
7. Repeat from step 3 for each app, up to 20 pins.
8. Put the pins in order: drag a row by its handle, or use the `Move up` and `Move down` arrows.
9. Click `Save space`.

Members see the pinned apps in the header, in your order, with your labels and icons. To remove a pin, click the **×** on its row, whose tooltip is `Remove from the strip`.

When a plugin is deployed in more than one environment, the editor also shows an `Instance` field. Members open the plugin's default deployment whichever instance you choose, and can switch instance from the app's pill in the header.

A row shows a warning icon in these cases:

* `Choose an app — this pin is left out of the strip until then`: the pin has no app yet. It isn't saved until you choose one.
* `This app is no longer available — remove the pin, or keep it for when the app returns`: the plugin no longer exists. Members don't see the pin while the app is missing.

When the strip has 20 pins, `+ Plugin app` is disabled with the tooltip `The strip is full`.

## Design the organization sidebar

*(Organization admins — space designer, `Organization sidebar` section.)*

The organization sidebar is the sidebar on organization-level pages such as `Home` and `Projects`. Choose `Stock`, `Custom` or `Hidden`. See [How section sources work](#how-section-sources-work).

Modules marked with a shield icon are admin-only: `Spaces`, `Settings` and `Audit`. Non-admin members never see them, whatever the space says. A space can still hide them from admins.

### Customize the organization sidebar

!!! warning "Don't hide your own way back"

    If you clear `Spaces`, `Settings` or `Audit` in a space you belong to, you lose those items yourself while you work in the space. To get them back, switch to Spaceless from the space chip. See [Switch to Spaceless](use-spaces.md#switch-to-spaceless).

1. In the section list, select `Organization sidebar`.
2. Select the `Custom` tile.

    The first time you do this, the list starts as an exact copy of the stock sidebar: all nine modules under the headings `Core`, `Quix Lake`, `Users` and `Governance`. Members see no change until you edit the list and save.

3. Clear the checkbox of each module members don't need. Clicking anywhere on a module row also selects or clears it.

    A cleared module keeps its place in the list, so selecting it again puts it back where it was. You can't move a cleared module.

4. Optionally, add plugin apps, environment links and headings. See the following sections.
5. Put the entries in order: drag a row by its handle, or use the `Move up` and `Move down` arrows.
6. Click `Save space`.

Members of the space see your sidebar, in your order. If you clear every module and remove every custom entry, the sidebar is hidden, and the designer selects the `Hidden` tile.

The designer limits how many entries and headings you can add. See [Limits](reference.md#limits).

### Add a plugin app

A plugin app entry puts a global plugin in the sidebar, optionally with **pages**: links to specific places inside the app. Members open the app inside the portal, with the sidebar still visible.

1. With the `Custom` tile selected, click `+ Plugin app`.

    A row called `New app` appears at the bottom of the list, and its editor opens.

2. In `App`, choose the plugin. Its name replaces `New app` as the label, unless you already renamed the entry. If an `Instance` field appears, members still open the plugin's default deployment.
3. Optionally, change the `Label`.
4. Optionally, in `Opens at (optional)`, enter a path inside the app to open, for example `/dashboard`. Leave it empty to open the app's start page.
5. Optionally, under `Icon`, choose a different icon.
6. Close the editor by clicking outside it or pressing ++esc++.
7. Click `Save space`, or keep editing and save when you finish.

`Opens at` sets where the app itself opens. A page is an extra link under the app. To add a page inside the app:

1. On the app's row, click the **+** icon, whose tooltip is `Add a page inside this app`.

    A page called `New page` appears under the app, and its editor opens.

2. In `Label`, enter the page name members see.
3. In `Path inside the app`, enter the path of the page, for example `/test-runs`. The path must start with `/` and can't contain `..`.
4. Optionally, under `Icon`, choose a different icon.
5. Click `Save space`, or keep editing and save when you finish.

Click the app's row, or its chevron, to show or hide its pages. Drag pages, or use their arrows, to reorder them within the app.

A warning icon on a row explains what's wrong:

| Message | What to do |
|---|---|
| `Choose a plugin app — the entry renders disabled until then` | Click the cog on the entry's row to reopen its editor, and choose an app. |
| `A page needs a path inside the app` | Enter a path for the page. |
| `Path must start with “/” and contain no “..”` | Correct the path. |
| `This app is no longer available — the entry renders disabled for members` | The plugin was removed. Remove the entry, or keep it for when the app returns. Members see the entry as disabled. |

### Add an environment link

An environment link is a shortcut from the organization sidebar straight into one environment of a project, for example the production pipeline a line operator watches.

1. With the `Custom` tile selected, click `+ Environment`.

    A row called `New environment` appears, and its editor opens. Until you choose a project and environment, the row shows `Choose a project and environment — the entry renders disabled until then`.

2. In `Project`, start typing and choose the project.
3. In `Environment`, choose the environment. Its name replaces `New environment` as the label, unless you already renamed the entry.
4. In `Opens at`, choose the page to open. The options are grouped as in the environment sidebar. The default is `Pipeline`.

    If you choose `Topics`, `Connectors`, `Templates` or `Data Lake`, a hint reminds you that the page needs a Kafka broker. Members of an environment without one don't see that page.

5. Optionally, change the `Label` and `Icon`.
6. Click `Save space`, or keep editing and save when you finish.

If the environment is later deleted, the row shows `This environment is no longer available — the entry renders disabled for members`.

### Add a heading

A heading is a caption that groups the entries below it, up to the next heading.

1. With the `Custom` tile selected, click `+ Heading`.

    A heading called `New section` appears at the bottom of the list.

2. Type the heading text directly in the row. A heading can be up to 16 characters.
3. Drag the heading above the entries it should group.
4. Click `Save space`, or keep editing and save when you finish.

To remove a heading, click the **×** on its row. The entries under it stay in the list.

### Hide the organization sidebar

A `Hidden` sidebar suits audiences who only use header apps and a landing page. Before you hide the sidebar, [pin at least one header app](#pin-header-apps) and [choose a landing page](#choose-a-landing-page). Without them, members can reach only `Home` and the command palette.

!!! warning "Hiding removes custom entries and admin items"

    Saving with `Hidden` selected deletes the sidebar's custom plugin apps, environment links and headings. If you belong to this space, it also removes `Spaces`, `Settings` and `Audit` for you. To get them back, switch to Spaceless from the space chip.

1. In the section list, select `Organization sidebar`.
2. Select the `Hidden` tile.

    The caption reads `Members get the header and content only`.

3. Click `Save space`.

Members of the space get no organization sidebar.

## Choose the environment modules

*(Organization admins — space designer, `Environment` section.)*

The `Environment` section controls what members see inside every environment of every project. It covers the environment sidebar, the YAML sync button in the environment header, and the `Settings` row at the foot of the sidebar.

It has two sources, `Stock` and `Custom`. There is no `Hidden` tile, because an environment with no sidebar would give members no way to reach its pages.

1. In the section list, select `Environment`.
2. Select the `Custom` tile.

    The first time you do this, the list shows every environment module, all selected, grouped under `Core`, `Library`, `Quix Lake` and `Environment`. The `Environment` group holds `YAML` and `Settings`.

3. Clear the checkbox of each module members don't need.

    To show or hide a whole group, use the checkbox on the group's heading. The heading shows how many of its modules are visible, for example `3 of 6`.

4. Put the modules in order: drag a row, or use the `Move up` and `Move down` arrows. Modules move only within their own group, and only selected modules can move.
5. Click `Save space`.

Members of the space see only the modules you selected, in every environment:

* A hidden module disappears from the sidebar and the command palette, and links to it elsewhere in the portal no longer open. Panels that open inside another page, such as the project variables panel, stay available.
* If you hide `Pipeline`, members who open an environment start on the first module the space shows.
* If you hide `Deployments`, the `View in environment` action on header apps and the `View deployment` action on the plugin toolbar disappear too.
* If you clear every module, members get no environment sidebar at all, including its `Plugins` section, no YAML sync button and no `Settings` row. The section summary reads `Everything hidden`.

`Topics`, `Connectors`, `Templates` and `Data Lake` still need a Kafka broker. A space can hide them, but it can't show them in an environment that has no broker.

!!! note "Plugins in the environment sidebar aren't curated"

    Plugin apps that a deployment adds to the `Plugins` section of the environment sidebar appear whatever the space says, as long as the environment sidebar is shown. The `Environment` section controls only the built-in modules.

## Choose a landing page

*(Organization admins — space designer, `Landing page` section.)*

The landing page is where members of the space arrive when they sign in and when they switch into the space. The default is `Home`.

1. In the section list, select `Landing page`.
2. Select one entry:

    * Under `Org pages`, one of the nine organization pages, such as `Projects` or `File Explorer`. Don't choose a page marked with a shield icon unless every member of the space is an admin. Other members can't open admin-only pages.
    * Under `Plugins`, a global plugin. This list appears only when your organization has at least one.

    The selected entry shows a check mark.

3. Click `Save space`.

When you select `Landing page`, the live preview shows the destination with an `opens on login` tag.

If the plugin is deployed in more than one environment, its cog (tooltip `Choose instance`) lets you choose an `Instance`. Members still open the plugin's default deployment.

A warning icon on the selected entry means members can land there but can't find their way back later:

* `This page isn’t in the space’s sidebar — members still land on it, they just won’t find it in the rail.`
* `This app isn’t in the space’s sidebar or pinned in its header — members still land on it, they just won’t find it again afterwards.`

If a plugin chosen as the landing page no longer exists, members arrive on the home page instead.

### How members arrive

* **After sign-in**, members go to the landing page once per session, and only when they open the portal's home page. A bookmark or a link to a specific page still opens that page.
* **When they switch into the space**, members go to its landing page. See [Work in a space](use-spaces.md).
* **A plugin landing** opens inside the portal with the sidebar visible if the same app is in the space's organization sidebar. Otherwise it opens full screen, even if the app is pinned in the header.
* **If you hide `Home`** and leave the landing page as `Home`, members arrive on the first entry in the space's sidebar instead.

## Copy a section from another space

*(Organization admins — space designer, `Copy` tile.)*

To reuse a design, copy a whole section from another space. You can copy `Header apps`, `Organization sidebar` or `Environment`. The `Copy` tile is disabled when there are no other spaces.

1. In the section list, select the section to replace.
2. Select the `Copy` tile.

    A dialog opens, called `Copy header apps`, `Copy organization sidebar` or `Copy environment`.

3. Choose a space from the list. Type in `Search spaces...` to filter it.

    A space whose section is identical to yours is marked `Same as current` and can't be selected.

4. Compare the `Now` and `After` previews. Rows that would be removed are struck through and marked −. Rows that would be added are marked +. Between the previews, counts such as `+2 added`, `−1 removed` and `5 kept` summarize the change. If only the order changes, the dialog says `Same entries, new order`.
5. Click `Copy header apps`, or `Copy sidebar` for the organization sidebar and environment.
6. Review the result, then click `Save space`.

The section is replaced in your draft only. Nothing is saved until you click `Save space`.

Copying replaces the whole section, including its source: copying from a `Stock` space makes your section `Stock` too. Copying the organization sidebar brings its modules, plugin apps, environment links, headings and order together.

To copy a whole space, including its identity, landing page and plugin toolbar setting, duplicate it instead. See [Duplicate a space](create-space.md#duplicate-a-space).

## Edit in the live preview

*(Organization admins — space designer, live preview.)*

The live preview in the middle of the designer is also an editor. It shows the organization sidebar, or the environment sidebar while the `Environment` section is selected.

!!! warning "Editing a Stock sidebar switches it to Custom"

    On a `Stock` sidebar, hiding a module or clicking, renaming or removing a heading in the preview switches the sidebar to `Custom`. A `Custom` list no longer picks up new Quix modules. The right-click menu warns you with `This sidebar is Stock — editing switches it to Custom`. To undo the switch before you save, select the `Stock` tile. See [What happens when you switch source](#what-happens-when-you-switch-source).

| Action | Result |
|---|---|
| Click a header app, plugin app or page | Its editor opens in a popover beside it, with the same fields as the inspector. Close it with the **×** or ++esc++. |
| Click a heading | Selects the heading's text in the inspector, ready to rename. On a `Stock` sidebar, this switches the sidebar to `Custom`. |
| Click a module | The designer opens its section. In a `Custom` section, it also highlights the module's row. |
| Drag a header app or sidebar row | The entry moves to the new position. This works only for a `Custom` section. |
| Right-click an entry | A menu offers the actions for that entry. See [Live preview menu](reference.md#live-preview-menu). |

## See also

* [Create and manage spaces](create-space.md)
* [Assign members](membership.md)
* [Work in a space](use-spaces.md)
* [Spaces reference](reference.md)
* [Plugins](../services/plugin.md)

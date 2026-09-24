---
title: Spaces reference
description: Designer sections, module catalogs, accent colors, limits, live preview actions, troubleshooting and a glossary for Spaces in Quix Cloud.
---

# Spaces reference

This page lists the exact details behind Spaces: designer sections, modules, accent colors, limits, live preview actions, troubleshooting and terms. For an introduction, start with the [Spaces overview](overview.md).

## Designer sections

The space designer lists seven sections, in this order. Each entry in the section list shows a one-line summary of the current settings. In the summaries below, `N` stands for a number.

| Section | Summary shown in the section list |
|---|---|
| `Identity` | The accent, for example `blue accent`, plus the theme when the space sets one, for example `blue accent · Dark theme` |
| `Header apps` | `N pinned` |
| `Organization sidebar` | `Platform default`, `N of 9 visible` or `Modules hidden`, plus the number of custom plugin apps and environment links, for example `· 2 apps` |
| `Environment` | `Platform default`, `N of 14 visible` or `Everything hidden` |
| `Landing page` | `→ Home`, or `→` followed by the landing page's name |
| `Membership` | `N groups · N direct` |
| `Dev tools` | `Platform default`, `Toolbar shown` or `Toolbar hidden` |

[Find your way around the designer](create-space.md#find-your-way-around-the-designer) describes what each section controls.

## Organization sidebar modules

A space can show or hide these nine modules in the organization sidebar. The table lists them in stock order, under the heading the stock sidebar files each one under.

| Module | Stock heading | Description in the designer | Admin-only |
|---|---|---|:---:|
| `Home` | Core | Organisation overview and recent activity | No |
| `Projects` | Core | Projects and their environments | No |
| `Query Data` | Quix Lake | Query the data lake across environments | No |
| `File Explorer` | Quix Lake | Browse blob storage across environments | No |
| `Users` | Users | People and permission groups | No |
| `Spaces` | Users | Curated views for audiences | Yes |
| `Settings` | Governance | Organisation configuration | Yes |
| `Audit` | Governance | Activity and audit logs | Yes |
| `Clusters` | Governance | Kafka broker clusters | No |

**Admin-only** modules appear only for organization admins, whatever the space says. The designer marks them with a shield icon and the tooltip `Admin-only module — non-admin members never see this, regardless of the space's settings`. A space can still hide them from admins.

`Users` also doesn't appear in the Community edition or in a disabled organization, whatever the space says.

## Environment modules

A space can show or hide these 14 environment modules. None of them are admin-only. The table lists them in stock order, grouped by the section the designer uses.

| Module | Section | Needs a Kafka broker |
|---|---|:---:|
| `Pipeline` | Core | No |
| `Deployments` | Core | No |
| `Topics` | Core | Yes |
| `Repository` | Core | No |
| `Dev Sessions` | Core | No |
| `Variables` | Core | No |
| `Connectors` | Library | Yes |
| `Services` | Library | No |
| `Templates` | Library | Yes |
| `Data Lake` | Quix Lake | Yes |
| `Query Data` | Quix Lake | No |
| `File Explorer` | Quix Lake | No |
| `YAML` | Environment | No |
| `Settings` | Environment | No |

The first 12 modules are entries in the environment sidebar. `YAML` controls the YAML sync button in the environment header, and `Settings` controls the `Settings` row at the foot of the environment sidebar.

A module that needs a Kafka broker appears only in environments that have one, even when the space shows it.

A space doesn't control plugin apps listed in the `Plugins` section of the environment sidebar. If the space hides every environment module, though, the whole environment sidebar disappears, including that section.

## Accent colors

Pick one of seven presets in the `Identity` section, or any custom color. Blue is the default.

| Preset | Color | Text and icon color in light theme |
|---|---|---|
| Blue | `#008eff` | `#0063b2` |
| Purple | `#bd2eff` | `#9600db` |
| Green | `#00dd81` | `#007242` |
| Amber | `#ffae3d` | `#915500` |
| Orange | `#ff7828` | `#ab4000` |
| Pink | `#ee26dc` | `#ae0ea0` |
| Aqua | `#00d4f7` | `#006c7e` |

In light theme, the portal draws accent-colored text and icons in a darker shade so they stay readable. It darkens a custom color automatically in the same way. In dark theme, the portal uses the accent color as it is.

## Limits

The designer enforces these limits. When you reach one, the control that adds more is disabled.

| Item | Limit | What you see |
|---|---|---|
| Pinned header apps per space | 20 | The `+ Plugin app` button in `Header apps` is disabled, with the tooltip `The strip is full`. |
| Times one plugin app can be pinned | 1 | An app that's already pinned doesn't appear in the `App` list of another pin. |
| Custom organization sidebar entries per space | 30 in total, counting plugin apps, their pages and environment links | The `+ Plugin app` and `+ Environment` buttons in `Organization sidebar` are disabled. |
| Pages per plugin app | 20 | The **+** icon on the app's row (tooltip `Add a page inside this app`) is disabled. |
| Headings per space | 10, including the four headings a `Custom` organization sidebar starts with | The `+ Heading` button is disabled. |
| Heading length | 16 characters | Typing stops at 16 characters. |
| Name of a duplicated space | 100 characters | Typing in the `Duplicate space` dialog's `Name` field stops at 100 characters. A suggested name that would be longer is cut to 100 characters. |

Headings, and the organization sidebar's modules, don't count toward the 30-entry limit.

## Live preview menu

Right-click an entry in the designer's live preview to open a menu of actions for it. On a `Stock` sidebar, the menu warns you with `This sidebar is Stock — editing switches it to Custom`. See [Edit in the live preview](navigation.md#edit-in-the-live-preview).

| Entry | Menu items |
|---|---|
| Header app | `Configure app`, `Unpin from header` |
| Module | `Hide from sidebar`, and `Open sidebar settings` when the sidebar is `Stock` |
| Heading | `Rename heading`, `Remove heading` |
| Plugin app or environment link | `Configure app`, `Remove from sidebar` |
| Page | `Configure page`, `Remove page` |

## Troubleshooting

### Sidebar items or pages have disappeared

*(For members.)*

**Cause:** You're working in a space, and it doesn't include those items. Your permissions haven't changed.

**Fix:**

* If your space chip opens a menu, switch to a space that includes the items.
* Otherwise, ask an organization admin to add the items to your space, or to add you to another space.

### The space chip doesn't open a menu

*(For members.)*

**Cause:** You belong to only one space, and you aren't an organization admin.

**Fix:** Ask an organization admin to add you to another space.

### The space chip is missing

*(For members and admins.)*

**Cause:** One of the following:

* You don't belong to any space, so you see the standard portal.
* The portal couldn't load your spaces. No space is applied, and no page is hidden or blocked.

**Fix:** If you expected to be in a space, reload the page. If the chip still doesn't appear, ask an organization admin to check your membership.

### A page redirected to the space's landing page

*(For members.)*

**Cause:** The page you opened isn't part of your active space. The portal takes you to the space's landing page, with a message such as **Deployments** isn't part of **Line operations** — you're back at **Line monitor**. This also happens when you follow a bookmark or an old link. If there's no "isn't part of" message, your role doesn't allow the page. See [Why a page sends you to your space's landing page](use-spaces.md#why-a-page-sends-you-to-your-spaces-landing-page).

**Fix:**

* If you belong to another space that includes the page, click the space chip in the header and switch to it.
* If you need the page in this space, ask an organization admin to add it.
* If you're an admin, click `Go spaceless` in the message to see the standard portal.

Links to pages outside your space stay visible but don't open. Hover over one to see `Not available in {space name}`.

### The theme switch is disabled

*(For members.)*

**Cause:** Your active space sets the theme. The switch shows the tooltip `Theme is set by your space, {space name}`.

**Fix:**

* If you belong to another space that lets members choose their theme, click the space chip in the header and switch to it. Your own theme choice is kept, and comes back when you leave the space.
* Otherwise, ask an organization admin to let members choose their theme.

If you're an admin, open the space in the designer, select `Identity`, turn on `Members choose their theme`, and click `Save space`.

### Spaces, Settings or Audit is missing from the sidebar

*(For organization admins.)*

**Cause:** One of the following:

* You're previewing a space. Preview hides admin-only items.
* Your active space hides the module. A space shapes an admin's portal in the same way as a member's. While it hides `Spaces`, the edit buttons in the space chip menu also send you to the landing page.
* You don't have the `Admin` role at organization level. Only organization admins can see `Spaces`, `Settings` and `Audit`.

**Fix:**

* If a preview banner is showing, click `Exit preview`.
* If your active space hides the module, click the space chip in the header and select `Spaceless`, or another of your spaces that shows the module. If the portal has just redirected you from one of these pages, you can click `Go spaceless` in the message instead.
* If you still can't see it, ask another organization admin to check your role. See [Roles and permissions](../roles.md).

To show the module in the space again, open the space in the designer, select `Organization sidebar`, select the `Custom` tile if the sidebar is `Hidden`, select the module, and click `Save space`.

### A new Quix module doesn't appear in a Custom sidebar

*(For organization admins.)*

**Cause:** The sidebar uses the `Custom` source. A custom list is frozen, so modules that Quix adds later don't appear until you add them.

**Fix:**

1. Open the space in the designer.
2. Select the `Organization sidebar` or `Environment` section.
3. Find the new module. It's listed but not selected.
4. Select it, and drag it into place if you want.
5. Click `Save space`.

To pick up new modules automatically instead, choose the `Stock` tile. In `Organization sidebar`, saving on `Stock` removes your custom apps, environment links and headings.

### The YAML button or the environment Settings row is missing

*(For members and admins.)*

**Cause:** The space's `Environment` section uses the `Custom` source, and `YAML` or `Settings` isn't selected. A custom list shows only the modules it names.

**Fix:** If you're a member, ask an organization admin to show them in your space. If you're an admin:

1. Open the space in the designer, and select the `Environment` section.
2. Under `Environment`, select `YAML` and `Settings`.
3. Click `Save space`.

### A plugin app in the sidebar or header is missing or disabled

*(For organization admins.)*

**Cause:** The plugin app the entry points to isn't available, for example because its deployment was deleted. The space keeps the entry. Members see a sidebar entry as disabled, with the tooltip `This app is not available right now`, and the header leaves out a pin that doesn't resolve.

**Fix:**

1. Open the space in the designer, and select `Header apps` or `Organization sidebar`.
2. Find the entry with the warning that starts `This app is no longer available`.
3. Choose another app in its settings, or remove the entry.
4. Click `Save space`.

### A member can't see a space

*(For organization admins.)*

**Cause:** One of the following:

* The member isn't in the space. Neither their permission group nor their user is assigned.
* You selected the member in the designer but didn't click `Save space`, or `Create space` for a new space. Membership changes in the designer apply only when you save.
* The member is in the space, but another space is active for them.

**Fix:**

1. Open the space in the designer, and select `Membership`. If the summary line below the lists reads `No audience — bind a group or add users.`, nobody can see the space.
2. Select the member's permission group, or select the member under `Direct members`, and click `Save space`.
3. Ask the member to click the space chip in the header and select the space.

See [Assign members](membership.md).

## Glossary

The [Spaces overview](overview.md#key-concepts) introduces the core terms. This list repeats them and adds the terms the other Spaces pages use.

| Term | Definition |
|---|---|
| **Accent** | The space's identity color. It draws a thin line across the top of the header, and tints the space chip and the selected item in the sidebars. It doesn't change the portal's own colors or the user's theme. |
| **Active space** | The one space that currently shapes a user's portal. The portal saves it to the user's account. |
| **Audience** | Everyone who belongs to a space: the users in its bound groups and its direct members. |
| **Bind** | To assign a permission group to a space, so every user in the group becomes a member. |
| **Custom** | A source that shows exactly the entries an admin chose, in the admin's order. A custom list is frozen: new Quix modules don't appear in it until an admin adds them. |
| **Direct member** | A user added to a space individually, not through a permission group. |
| **Global plugin** | A plugin deployment with the `Organisation plugin` setting on. Only global plugins can be pinned to the header, added to a sidebar or used as a landing page. See [Global plugins](../services/plugin.md#global-plugins). |
| **Hidden** | An organization sidebar source that removes the sidebar. Members get the header and the page content only. |
| **Landing page** | Where members arrive when they sign in, and when they switch into the space. It can be an organization page or a plugin app. The default is `Home`. |
| **Member** | A user who belongs to a space, through a permission group bound to the space or because an admin added them directly. A user can belong to several spaces. |
| **None** | The default header apps source. No apps are pinned, so the header app strip is empty. |
| **Permission group** | A named group of users that shares the same permissions. The portal lists groups on the `User Groups` tab of `Users`. Each user belongs to one group. |
| **Plugin toolbar** | The floating button over an embedded plugin app, with portal shortcuts and a way out of the app. Each space decides whether it appears. |
| **Preview** | An admin-only mode that shows the portal as a member of a space sees it. |
| **Source** | The setting at the top of the designer's `Header apps`, `Organization sidebar` and `Environment` sections that decides where that part of the portal comes from: `None`, `Stock`, `Custom` or `Hidden`. See [How section sources work](navigation.md#how-section-sources-work). |
| **Space** | A named, organization-wide view of the portal, designed by an admin for an audience. It has a name, an optional description, an icon and an accent color. It changes what people see, never what they can do. |
| **Space chip** | The control in the header that shows your active space. If you belong to more than one space, click it to switch. |
| **Space designer** | The page where an admin creates and edits a space. It has a section list, a live preview and an inspector with the settings for the selected section. |
| **Spaceless** | No space applied: the standard portal, with every module the user's role allows and no header apps. It is what everyone sees in an organization with no spaces, and what a user who belongs to no space sees. Only organization admins can choose Spaceless while they belong to a space. In the switcher, its row has the subtitle `The stock platform`. |
| **Standard portal** | The portal with no space applied. See **Spaceless**. |
| **Stock** | A source that shows the platform's standard sidebar. New Quix modules appear in it automatically. |

## See also

* [Spaces overview](overview.md)
* [Create and manage spaces](create-space.md)
* [Design navigation](navigation.md)
* [Assign members](membership.md)
* [Work in a space](use-spaces.md)
* [Roles and permissions](../roles.md)

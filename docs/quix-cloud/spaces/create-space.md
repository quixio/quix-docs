---
title: Create and design a space
description: Create a space, choose its header apps, organization sidebar, environment modules and landing page, preview it as a member, and copy, duplicate or reorder spaces.
---

# Create and design a space

<a id="edit-in-the-live-preview"></a>

Organization admins build each space in the **space designer**, from `Spaces` in the organization sidebar. Its live preview is also an editor: click an entry to configure it, drag entries to reorder them, and right-click for more actions. Nothing reaches members until you save.

## Create a space

A `New space` draft exists only in your browser until you click `Create space`, so leaving without creating it leaves nothing behind. `Preview` works only on a saved space.

A new space curates nothing: members see the standard sidebars and no header apps.

A good order to work in is `Header apps`, `Organization sidebar`, `Environment`, `Landing page`, then [`Membership`](membership.md), then [preview](#preview-a-space-as-a-member).

<a id="what-happens-when-you-switch-source"></a>

## How section sources work

`Header apps`, `Organization sidebar` and `Environment` each start with source tiles that decide where that part of the portal comes from:

| Source | Available in | What members see |
|---|---|---|
| `None` | `Header apps` (default) | No pinned apps. |
| `Stock` | `Organization sidebar` and `Environment` (default) | The standard sidebar. New Quix modules appear in it automatically. |
| `Custom` | All three | Exactly the entries you pick, in your order. |
| `Hidden` | `Organization sidebar` | No organization sidebar. |

!!! warning "Custom lists are frozen"

    New Quix modules appear in `Stock` sidebars only. To show a new module in a `Custom` sidebar, select it in the designer and save. Choose `Stock` for audiences that should always get the full, current platform.

!!! warning "Saving on Stock or Hidden deletes custom entries"

    If you save while the organization sidebar is `Stock` or `Hidden`, its custom plugin apps, environment links and headings are deleted. The designer warns you only when you switch to `Stock`.

Switching back to `Custom` before you save restores those entries, unless you used `Copy` in between. Editing a `Stock` sidebar in the live preview switches it to `Custom`, starting from a copy of the stock sidebar, so the only change members see is the one you made.

## Pin header apps

The header app strip shows only the apps a space pins. Outside a space, including Spaceless, it's empty.

* You can pin only [organization plugins](../services/plugin.md#organization-plugins): deployments with `Organisation plugin` turned on in the deployment dialog, or `plugin.organisationItem.show: true` in YAML. If the `App` list shows `No plugin apps available yet`, the organization has none.
* Inside a space, the command palette lists only the apps the space pins or puts in its organization sidebar.
* Each app can be pinned once.
* A pin to an app that no longer exists is hidden from members until the app returns.

!!! note "The Instance choice doesn't change what members open"

    For a plugin deployed in several environments, the `Instance` you choose for a header app, sidebar app or landing page is ignored. Members open the plugin's default deployment. From a header app, they can switch instance on the app's pill.

<a id="customize-the-organization-sidebar"></a><a id="add-a-plugin-app"></a><a id="add-an-environment-link"></a><a id="hide-the-organization-sidebar"></a>

## Design the organization sidebar

Choosing `Custom` the first time starts from a copy of the stock sidebar. Modules, plugin apps, environment links and headings are peers in one list. A cleared module keeps its place, so selecting it again puts it back where it was. Clearing every module and custom entry is the same as `Hidden`.

* **Plugin app:** an organization plugin that opens inside the portal. `Opens at` sets where the app opens. Pages are extra links under the app, with paths that start with `/`. An app with pages and no `Opens at` opens its first page.
* **Environment link:** a shortcut straight to one page of one environment, for example the production pipeline a line operator watches.
* **`Hidden`:** suits audiences who use only header apps. [Pin header apps](#pin-header-apps) and [choose a landing page](#choose-a-landing-page) first. Without them, members reach only `Home` and the command palette.

`Spaces`, `Settings` and `Audit`, marked with a shield, never appear for non-admins. Hiding them hides them from you too while you're in the space. See [Admins are members too](overview.md#admins-are-members-too).

## Choose the environment modules

The `Environment` section applies to every environment in every project. `YAML`, the sync button in the environment header, and `Settings`, the row at the foot of the environment sidebar, are entries in the list.

* If you hide `Pipeline`, environments open on the first visible module.
* If you hide `Deployments`, the `View in environment` action on header apps and `View deployment` on the plugin toolbar go too.
* If you clear every module, members get no environment sidebar, including its `Plugins` section, and no YAML sync button or `Settings` row.
* `Topics`, `Connectors`, `Templates` and `Data Lake` still need a Kafka broker. A space can't show them in an environment that has none.
* Otherwise, [environment plugins](../services/plugin.md#environment-plugins) appear whatever the space says.

<a id="how-members-arrive"></a>

## Choose a landing page

Members arrive on the landing page:

* After sign-in, once per session, and only when they open the portal's home page. Bookmarks and links still open the page they point to.
* When they switch into the space.

A plugin landing page opens inside the portal only if the same app is in the space's organization sidebar. Otherwise it opens full screen, even if it's pinned in the header. If you hide `Home` and leave it as the landing page, members arrive on the first entry in the sidebar.

<a id="set-the-identity"></a><a id="set-the-theme"></a>

## Identity and theme

Give each space a distinct accent and icon, so members can tell which space they're in. Turning off `Members choose their theme` sets the theme for everyone in the space. With `Auto`, the theme follows each member's device, and members can't override it. A member's own theme choice isn't overwritten: it comes back when they leave the space.

## Hide the plugin toolbar

The plugin toolbar is the floating button over an embedded app. Turn it off in `Dev tools` when members work in one app and the button gets in the way. Without it, members leave an embedded app only with the command palette or a header app, so keep at least one header app.

<a id="copy-a-section-from-another-space"></a><a id="duplicate-a-space"></a><a id="reorder-spaces"></a>

## Copy, duplicate and reorder

* The `Copy` tile replaces a whole section with the same section from another space, including its source. Copying from a `Stock` space makes your section `Stock`.
* `Duplicate space`, in a card's menu, copies the whole space. Membership is copied only if you select `Copy membership`.
* The order of the cards on the `Spaces` page is the order of every member's space chip menu. A new order is saved as soon as you drop the card.

## Preview a space as a member

Click the eye on a space's card, or `Preview` in the designer, to open the portal as a member of the space sees it:

* Preview shows the saved space, not unsaved edits.
* You keep your own role, so a page a member can't open may still open for you.
* Admin-only items are hidden, and redirects apply, as they do for members.

## Limits

The designer enforces these limits silently: the control that adds more is disabled, or typing stops. Only the header strip says why.

| Item | Limit |
|---|---|
| Header app pins | 20 |
| Custom organization sidebar entries: plugin apps, their pages and environment links | 30 in total |
| Pages per plugin app | 20 |
| Headings | 10, including the 4 a `Custom` sidebar starts with |
| Heading length | 16 characters |

## See also

* [Spaces overview](overview.md)
* [Assign members](membership.md)
* [Organization plugins](../services/plugin.md#organization-plugins)

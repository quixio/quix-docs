---
title: Plugin system
description: Turn any deployment into a plugin. Embed its web UI in the Quix Cloud portal, add it to an environment sidebar, or make it available across the organization, with Quix sign-in and permissions built in.
---

# Plugin system

A **plugin** is a deployment whose web UI opens inside the Quix Cloud portal. Use plugins to put tools such as configuration panels, dashboards or operations consoles next to the pipelines they belong to, with Quix sign-in and permissions built in.

A plugin can appear in the portal in three ways, in any combination:

* **Embedded view**: the deployment's web UI, shown in an iframe inside the portal.
* **Environment plugin**: an item in the `Plugins` section of the sidebar of the environment it runs in. Only users working in that environment see it.
* **Organization plugin**: available across the organization, outside its environment. The portal shows it as an **app**. Organization admins use [spaces](../spaces/overview.md) to decide where apps appear for each group of users.

## Configure a plugin

Before you start, check that:

* The deployment serves a web UI over HTTP.
* A deployment that isn't a managed service has public access turned on (`Basic` › `Network settings` › `Public access`, or `publicAccess.enabled` in YAML). Its embedded view loads from its public URL. See [Deploy a public service](../deployments/deploy-public-page.md).
* The plugin's server doesn't block framing. An `X-Frame-Options` header, or a `Content-Security-Policy` `frame-ancestors` directive that doesn't include the portal's origin, gives a blank iframe. Security middleware often sets these headers by default.

### Configure in the deployment dialog

The plugin settings are on the `Advanced` tab of the deployment dialog, under `Plugin Settings`. What the dialog doesn't tell you:

* Turning off `Environment plugin`, `Organisation plugin` or `Embedded View` deletes that block's settings, such as its label and icon.
* The `Plugin` section of Deployment details still uses the old names: `Sidebar item` is the environment plugin and `Global item` is the organization plugin.

<a id="yaml-configuration"></a>
<a id="configuration-example"></a>

### Configure in YAML

Add a `plugin` block to the deployment in `quix.yaml`. Every block is optional:

```yaml
deployments:
  - name: Config Manager
    application: config-manager
    version: latest
    deploymentType: Service
    publicAccess:
      enabled: true                # Required for the embedded view of a non-managed deployment
      urlPrefix: config-manager
    plugin:
      embeddedView:
        enabled: true
        hideHeader: false
        default: true
      environmentItem:
        show: true                 # Make this an environment plugin
        label: "Configuration"
        icon: "tune"
        order: 1
        badge: "Alpha"
      organisationItem:
        show: true                 # Make this an organization plugin
        label: "Configuration"
        icon: "tune"
        badge: "Alpha"
```

`organisationItem` is spelled with an "s". Quix skips unknown keys under `plugin` without an error, so if a plugin doesn't appear, check the spelling of its keys.

!!! note "Renamed keys"

    `environmentItem` and `organisationItem` replace the old keys `sidebarItem` and `globalItem`. Quix Cloud still reads the old keys, and writes the new keys the next time it saves `quix.yaml`. If a deployment has both, the new key wins. Tools built on older Quix packages, including older versions of the Quix CLI, ignore the new keys and lose these settings, so update the Quix CLI before you use them.

| Key | Default | Notes |
|---|---|---|
| `embeddedView.enabled` | `false` | Turns on the embedded view. |
| `embeddedView.hideHeader` | `false` | Hides the title bar above the plugin, so the plugin fills the whole panel. |
| `embeddedView.default` | `false` | Opens the embedded view instead of Deployment details. See [Embedded view](#embedded-view). The dialog turns it on for a new deployment. |
| `environmentItem.show`, `organisationItem.show` | `false` | Makes the deployment an environment plugin or an organization plugin. |
| `label` | The deployment name | The dialog allows up to 25 characters. |
| `icon` | `extension` | A [Google Material icon](https://fonts.google.com/icons){target=_blank} code, such as `tune` or `fact_check`. |
| `badge` | None | Short text next to the label, such as `Beta`. The environment sidebar shows it only when expanded. |
| `environmentItem.order` | None | Lowest first. Set it on every environment plugin: items without one sort unpredictably. `organisationItem` has no `order`: each space sets the order of its own header apps and sidebar entries. |

### Managed services

When you deploy a managed service that Quix defines as a plugin, and you don't set `plugin` yourself, Quix turns on its embedded view as the default view. Your own `plugin` settings replace these defaults. If you remove them later, Quix restores the defaults.

<a id="what-it-does"></a>
<a id="where-a-plugin-appears"></a>

## Where plugins appear

### Embedded view

The embedded view opens at one of three portal URLs, depending on where you open it from:

| Portal URL | Layout | Opened from |
|---|---|---|
| `/pipeline/deployments/<deployment-id>/embedded?workspace=<environment-id>` | Inside the environment, with its sidebar | The environment sidebar, the pipeline, Deployment details |
| `/apps/<deployment-id>` | With the organization sidebar | In a space: header apps, organization sidebar entries, the command palette, and the landing page when the space's organization sidebar also lists the plugin |
| `/plugins/details/<deployment-id>` | Full screen | The command palette outside a space, and a space's landing page when its organization sidebar doesn't list the plugin |

Anything after the plugin's address is passed to the plugin as a path, so you can link to a page inside a plugin. For example, `/apps/<deployment-id>/alarms` opens the plugin's `/alarms` page.

`embeddedView.default` decides whether the pipeline, the environment sidebar and, outside a space, the command palette open the embedded view or Deployment details. In a space, apps always open at `/apps/<deployment-id>`, which is blank if the embedded view is off.

<a id="environment-sidebar"></a>

### Environment plugins

An environment plugin adds an item to the `Plugins` section of its environment's sidebar, sorted by `environmentItem.order`. Clicking it opens the embedded view if that's the default view, and Deployment details otherwise. To reach the plugin from outside its environment, make it an organization plugin.

<a id="what-are-global-plugins"></a>
<a id="when-to-use-global-plugins"></a>
<a id="global-plugins"></a>

## Organization plugins

An organization plugin is a deployment that users can open from anywhere in the organization, such as a test manager or an operations console that serves several projects. Organization plugins were previously called global plugins. Also turn on the embedded view and make it the default view, so the plugin opens as an app wherever users reach it.

An organization plugin is *available*, not shown. It appears in the header only when an organization admin pins it in a space. See [Pin header apps](../spaces/create-space.md#pin-header-apps).

<a id="where-global-plugins-appear"></a>

| Place | In a space | Without a space |
|---|---|---|
| Header app strip | The apps the space pins, in the space's order | Empty |
| Organization sidebar | Where the space adds the plugin | Not listed |
| Command palette, under `Apps` | The apps the space pins or adds to its organization sidebar | Every organization plugin you can access |
| Landing page | When the space uses the plugin as its landing page | Not used |

"Without a space" covers organizations that don't use spaces, users who aren't in any space, and organization admins who switch to `Spaceless`. The header app strip shows on organization-level pages, such as `Home` and `Projects`. Inside a project, the header shows the project and environment instead.

The portal groups organization plugins that share a project and a deployment name into one app. Each deployment in the group, typically one per environment, is an **instance**. Users open the app's default instance, even if the space sets a different `Instance`, and can switch instances from the header pin or the plugin toolbar.

<a id="how-the-globalitem-settings-are-used"></a>

The `organisationItem` settings describe the app wherever it appears:

* A space can override `label` and `icon` for its pins and sidebar entries, but not `badge`.
* When `show` is `false` or missing, a space's pin for the plugin disappears, and its organization sidebar entry is shown disabled.

<a id="permissions-and-access-control"></a>

To see and open an organization plugin, a user needs `plugin:read` in the environment the plugin runs in. Plugin permissions apply per environment, not per deployment, and `workspace:read` isn't needed. The narrowest role that grants `plugin:read` is Viewer at the environment level. See [Permission levels](../roles.md#permission-levels).

Spaces don't grant access. A user without access to a plugin doesn't see it in the header or the command palette, and sees its organization sidebar entry disabled.

<a id="what-operator-only-users-see"></a>

**Operator role (deprecated).** To give users a plugin-only view, use a space instead of the Operator role. See [Replace the Operator role with a space](../spaces/replace-operator-role.md). Existing Operator-only users land on their first organization plugin. In a space, `/apps` links send them back to that plugin instead of the one they chose.

## Plugin toolbar

Every embedded view has a floating button in its bottom-right corner, the **plugin toolbar**, with actions to reload, restart or leave the plugin. What its menu doesn't tell you:

* It can cover part of your UI. Users can drag it, but keep essential controls away from the bottom-right corner. An organization admin can turn it off for a space. See [Hide the plugin toolbar](../spaces/create-space.md#hide-the-plugin-toolbar).
* It shows the plugin's `organisationItem` label and icon, even when the plugin is opened from the environment sidebar.
* `Open in new tab` opens the plugin's root URL, not the page you're on. `Copy app link` copies a link to the current page.
* `Hide this button` lasts until the user refreshes the page.

## Embedded view URL

The embedded view loads from a URL that Quix derives for the deployment: the deployment's public URL, or for a managed service a URL that Quix sets. You don't set it in YAML. The Portal API returns it as `plugin.embeddedViewUrl`.

The Portal API keeps the old names for the other plugin settings. Its JSON uses `plugin.sidebarItem` for `environmentItem` and `plugin.globalItem` for `organisationItem`. `GET /workspaces/<environment-id>/plugins` lists an environment's plugins, and `GET /plugins/global` lists the organization plugins the signed-in user can access.

When it opens the plugin, the portal also sends a `GET` request to the embedded view URL. If your server answers `404 Not Found`, the portal shows `Embedded service not available` instead of the plugin. Make sure your server answers requests for its root URL.

### What the portal adds to the URL

The portal builds the iframe address from the embedded view URL plus:

1. **The plugin path**: anything after the plugin's portal URL, including a `#fragment`.
2. **The portal's query parameters**: all of them are forwarded, including `workspace=<environment-id>` inside an environment. Parameters that your plugin adds to its own URL through the SDK are merged into the portal URL. The portal never removes a parameter, so one that your plugin drops comes back on the next load. Set an empty or default value instead of removing it.
3. **Three parameters for the plugin**: the portal sets these last, so they override your own, and strips them from its address bar.

    | Parameter | Value |
    |---|---|
    | `isIframe` | `true` |
    | `portalOrigin` | The portal's origin. The SDK accepts navigation and theme messages only from this origin. |
    | `theme` | `light` or `dark`: the portal's mode when the iframe loads. Later changes arrive as messages. |

For example, the portal URL `/pipeline/deployments/<deployment-id>/embedded/runs/42?workspace=<environment-id>` loads:

```text
<embedded-view-url>/runs/42?workspace=<environment-id>&isIframe=true&portalOrigin=https%3A%2F%2F<your-portal-domain>&theme=dark
```

A deep link or a refresh requests the plugin path, such as `/runs/42`, from your server, so answer every route with your entry page. See [Navigation](plugin-sdk.md#navigation).

The portal exchanges messages only with the embedded view's origin. If your plugin redirects the iframe to another origin, such as an external sign-in page, that page gets no token and its navigation isn't mirrored. See [How the SDK talks to the portal](plugin-sdk.md#how-the-sdk-talks-to-the-portal).

<a id="quick-start"></a>
<a id="what-the-sdk-does"></a>
<a id="auth-handshake"></a>
<a id="url-synchronisation"></a>
<a id="api-reference"></a>
<a id="token-refresh-and-expiration"></a>
<a id="verifying-the-sdk-is-loaded"></a>
<a id="migrating-from-the-manual-postmessage-integration"></a>

## Quix Plugin SDK

To connect your plugin's UI to the portal, use the [Quix Plugin SDK](plugin-sdk.md), a small JavaScript library that the portal serves. It passes your UI the signed-in user's token and keeps it fresh, keeps the portal URL and your plugin's routes in step, and follows the portal's light or dark mode.

<a id="authentication-and-authorization-recommended"></a>

## Authentication and authorization

Authentication is optional. Use it to reuse Quix sign-in and permissions, so users don't sign in separately and your plugin can check what each user can do. Your plugin's UI can get the user's token in two ways:

* **The Quix Plugin SDK (recommended).** The SDK passes each token to your `onToken` callback and requests a new one before it expires. Send it as `Authorization: Bearer <token>` to Quix APIs or to your own backend. See [Quick start](plugin-sdk.md#quick-start) and [Authentication token](plugin-sdk.md#authentication-token).
* **The `quix_access_token` cookie.** The portal stores the signed-in user's token in this cookie. Only two Portal API endpoints accept it in place of an `Authorization` header: workspace file content and library template files. This is useful for files the browser loads directly, such as images.

If you use the cookie:

* The browser sends it to every host under the Quix domain that the portal runs under. If your plugin's public URL is under that domain, your backend receives the token with every request, and so does any other backend there. Treat it as a credential: don't log it.
* Nothing refreshes it for your plugin. The portal updates it only when it renews its own session, so requests can fail with `401` after the token expires. Handle `401` responses, for example by asking the user to reload the page.

### How to handle the token in the backend

Validate the token on your backend for every request. Don't trust a token only because your UI received it: the SDK accepts a token from whichever page embeds your plugin.

Install the Quix Portal helper package, `quixportal`, from the public feed:

```bash
pip install -i https://pkgs.dev.azure.com/quix-analytics/53f7fe95-59fe-4307-b479-2473b96de6d1/_packaging/public/pypi/simple/ quixportal
```

Then validate the token and check the user's permission for each request:

```python
import os
from quixportal.auth import Auth

# Reads the Portal API URL from the Quix__Portal__Api environment variable
auth = Auth()

# From the request header Authorization: Bearer <token>
token = ...

if auth.validate_permissions(
    token=token,
    resourceType="Workspace",
    resourceID=os.environ["Quix__Workspace__Id"],
    permissions="Read",
):
    ...  # Authorized: handle the request
```

Quix injects `Quix__Portal__Api` and `Quix__Workspace__Id` into your deployment as environment variables. See [Quix variables](../deployments/quix-variables.md).

## Checking permissions programmatically

<a id="api-endpoint"></a>

Your backend can check a user's [permissions](../roles.md) with `GET /auth/permissions/query` on the Portal API, with the query parameters `resourceType`, `resourceId` and `permission`. Send the user's token as `Authorization: Bearer <token>`. The endpoint returns `true` or `false`.

For example, to check whether the user can read an environment, where `<portal-api-url>` is the value of `Quix__Portal__Api`:

```bash
curl -H "Authorization: Bearer <token>" \
  "<portal-api-url>/auth/permissions/query?resourceType=Workspace&resourceId=<environment-id>&permission=Read"
```

<a id="resource-types"></a>
<a id="permission-types"></a>

The values are PascalCase:

* **Resource types:** `Organisation`, `Repository`, `Workspace` (an environment), `Topic`, `Deployment`, `User`, `Session` and `Plugin`. For `Topic`, `Deployment` and `Plugin`, pass the environment ID as `resourceId`. See [Available resources](../roles.md#available-resources).
* **Permissions:** `Create`, `Read`, `Update`, `Delete`, `Write` (streaming operations only) and `All`. See [Available actions](../roles.md#available-actions).

## See also

* [Quix Plugin SDK](plugin-sdk.md): pass the token, navigation and theme between the portal and your plugin's UI.
* [Spaces](../spaces/overview.md): choose which organization plugins each group of users sees.
* [Roles and permissions](../roles.md): the roles that grant access to plugins.
* [Personal access tokens](../access-security/personal-access-token.md): tokens for scripts and local development.
* [Portal API](../apis/portal-api/overview.md): the API your plugin can call with the token.

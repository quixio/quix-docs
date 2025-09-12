# Plugin System

The plugin system enables services to expose an embedded UI inside Deployment Details (rendered as an iframe), and optionally add a shortcut in the environment’s left sidebar.

Managed services may populate these plugin properties automatically via the Managed Framework, and you can always override them explicitly in YAML.

Non-managed services can also define these properties in YAML, making any deployment behave like a plugin without being a managed service.

## What it does

* Embed a UI in Deployment Details when enabled

  ![Embedded View](images/dynamic-configuration-embedded-view.png){width=80%}

* Optionally show a sidebar shortcut to the embedded view

  ![Sidebar example](images/plugin-sidebar.png){height=50%}

* Provide basic authentication integration with Quix Cloud so publicly exposed services don’t require a separate login

## YAML configuration

In your deployment YAML, you can enable the embedded UI and, optionally, a sidebar item:

```yaml
plugin:
  embeddedView: true            # Enables embedded UI (frontend renders iframe)
  sidebarItem:                  # Optional environment sidebar shortcut
    show: true                  # Whether to display a shortcut in the sidebar
    label: "Configuration"      # Text for the menu item
    icon: "tune"                # Material icon name (see notes below)
    order: 1                    # Ordering (lower = higher)
```

Notes

* `plugin.embeddedView`: boolean. true → FE renders embedded UI.
* `plugin.sidebarItem`: optional object configuring the Environment’s left sidebar item.
* `plugin.sidebarItem.icon`: must be a [Google Material icon](https://fonts.google.com/icons). Use the **internal icon code**, typically written in **lowercase** (e.g. `tune`, `settings`, `play_arrow`).

## Embedded view URL

When the plugin feature is enabled, the deployment exposes a public URL dedicated to the embedded UI. The Portal uses this URL to load the embedded view inside the iframe when `embeddedView` is enabled. This URL is not set in YAML; it’s exposed by the API.

Population rules:

* Managed service → Derived from Managed Services conventions.
* Non-managed service → Requires `publicAccess` to be enabled; resolves from the deployment’s public URL.

## Authentication and authorization

The embedded view inherits authentication and authorization from the Quix platform: no separate login is required, and the same user/environment permissions apply.
When an embedded view loads, the Plugin system injects the Quix user token into the iframe. The UI uses this token to call the backend securely.

### How the token is injected in the embedded view

On initial load of the embedded view (and on reload), the Portal provides the user token to the iframe so the UI can authenticate calls to the backend.

#### Frontend token exchange (postMessage)

The token is passed via `window.postMessage` between the parent (Portal) and the embedded iframe.

**Message types**

* `REQUEST_AUTH_TOKEN` — sent by the iframe to ask the parent for a token
* `AUTH_TOKEN` — sent by the parent with `{ token: string }`

**In the embedded view (iframe)**

```ts
// Ask the parent window (Portal) for a token
window.parent.postMessage({ type: 'REQUEST_AUTH_TOKEN' }, '*');

// Listen for the token response from the parent
function messageHandler(event: MessageEvent) {
  const { data } = event;
  if (data?.type === 'AUTH_TOKEN' && data.token) {
    // Your app-specific setter
    setToken(data.token);
    // Optionally remove the listener if you only need the token once
    // window.removeEventListener('message', messageHandler);
  }
}

window.addEventListener('message', messageHandler);
```

**In the Portal (parent window)**

```ts
// Listen for requests from the target iframe
function messageHandler(event: MessageEvent) {
  const { origin, data } = event;

  // Ensure the origin matches the iframe URL you expect
  if (origin !== targetUrl) return;

  if (data?.type === 'REQUEST_AUTH_TOKEN') {
    // Reply with the token to the requesting iframe
    const iframeWindow = deploymentIframe?.contentWindow;
    iframeWindow?.postMessage({ type: 'AUTH_TOKEN', token }, targetUrl);
  }
}

window.addEventListener('message', messageHandler);
```

**Security notes**

* Always validate `event.origin` in the parent before responding.
* Prefer using a specific `targetUrl` over `'*'` when posting back to the iframe.
* Remove listeners when no longer needed to avoid leaks.

### How to handle the token in the backend

Install the Quix Portal helper package from the public feed:

```bash
pip install -i https://pkgs.dev.azure.com/quix-analytics/53f7fe95-59fe-4307-b479-2473b96de6d1/_packaging/public/pypi/simple/ quixportal
```

Then, in the backend service, validate the token and enforce authorization for each request. For example:

```python
import os
from quixportal.auth import Auth

# Instantiate authentication client. By default it will read
# the portal API url from the environment variable Quix__Portal__Api
auth = Auth()

# Obtain the authorization token, traditionally passed as a header
# Authorization: Bearer <token>
token = ...

# Example to obtain "Read" access to the "Workspace" resource
resource_type = "Workspace"
workspace_id = os.environ["Quix__Workspace__Id"]
permissions = "Read"

# Authorize the token bearer to access the resource
if auth.validate_permissions(
    token=token,
    resourceType=resource_type,
    resourceID=workspace_id,
    permissions=permissions,
):
    print("Bearer is authorized to access the resource")
else:
    print("Bearer is not authorized to access the resource")
```


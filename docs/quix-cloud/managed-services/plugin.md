# Plugin System

The plugin system enables services to expose an embedded UI inside Deployment Details (rendered as an iframe), and optionally add a shortcut in the environment’s left sidebar. Managed services populate these fields automatically via the Managed Framework; Non‑managed services can be configured in the yaml.

## What it does

- Embed a UI in Deployment Details when enabled

  ![Embedded View](images/dynamic-configuration-embedded-view.png){width=80%}

- Optionally show a sidebar shortcut to the embedded view

  ![Sidebar example](images/plugin-sidebar.png){height=50%}

## YAML

In your deployment YAML, you can enable the embedded UI and, optionally, a sidebar item:

```yaml
plugin:
  embeddedView: true            # Enables embedded UI (frontend renders iframe)
  sidebarItem:                  # Optional environment sidebar shortcut
    show: true                  # Whether to display a shortcut in the sidebar
    label: "Configuration"       # Text for the menu item
    icon: "tune"                 # Material icon name
    order: 1                    # Ordering (lower = higher)
```

Notes

- plugin.embeddedView: boolean. true → FE renders embedded UI.
- plugin.sidebarItem: optional object configuring the Environment’s left sidebar item.

## Public Url

- Managed service → derived from Managed Services internal conventions.
- Non‑managed service → uses the deployment’s publicUrl.

## Authentication

The embedded view inherits authentication and authorization from the main platform. No separate login is required, and the same user/environment permissions apply to the emmbedded view.

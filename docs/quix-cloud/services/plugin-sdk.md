---
title: Quix Plugin SDK
description: JavaScript library for plugin UIs embedded in the Quix portal. It delivers the user's auth token, keeps the portal URL and your plugin's route in step, and tells your plugin the portal's light or dark mode.
---

# Quix Plugin SDK

The **Quix Plugin SDK** is a small JavaScript library that connects a plugin's embedded UI to the Quix portal around it. Your plugin runs in an iframe on its own origin, so it can't read the user's session or see what the portal is doing. The SDK carries that information across the frame boundary for you.

When you call `QuixPlugin.init()`, the SDK:

* **Delivers the auth token.** Your plugin can call your own backend, or Quix APIs, as the signed-in user, without the user signing in again. The SDK requests a new token before each one expires.
* **Keeps the portal URL in step with your plugin's route.** When your plugin navigates, the portal's address bar follows, so refreshes and shared links open the same page inside your plugin.
* **Passes portal navigation to your router.** When the portal opens a page inside your plugin, for example from a space's sidebar, your plugin changes page without reloading and keeps its state.
* **Tells your plugin the portal's color mode.** Your page paints in the right mode, light or dark, and follows every switch without a reload.

This page describes SDK version **1.3.0**. It's for developers building the web UI of a plugin. To configure a deployment as a plugin, see [Configure a plugin](plugin.md#configure-a-plugin). Upgrading a plugin that already uses the SDK? See [Upgrade from an earlier SDK version](#upgrade-from-an-earlier-sdk-version). For the security model and message protocol, see [How the Quix Plugin SDK works](plugin-sdk-internals.md).

## Quick start

This section builds a plugin page that receives the auth token, follows portal navigation, matches the portal's mode and supports deep links.

Before you start, make sure that:

* Your plugin is a deployment with the embedded view turned on. See [Configure a plugin](plugin.md#configure-a-plugin).
* Your app routes by path, such as `/alarms`, not by fragment, such as `#/alarms`.
* Your web server returns your `index.html` with status `200` for every route, not only `/`.
* Your HTML loads scripts, styles and images from root-absolute URLs, such as `/js/app.js`. In Vite, leave `base` at its default of `/`. In Angular, keep `<base href="/">`.
* Your app is served at the root of its origin, not under a path prefix.

[Navigation](#navigation) explains each requirement and shows server configuration.

To add the SDK to your plugin:

1. In the `<head>` of your entry page, load the SDK and call `init()`. The entry page is `index.html` in a Vite project and `src/index.html` in an Angular project. Calling `init()` in `<head>`, before any other script changes the URL, lets the SDK read the parameters the portal adds to the URL and apply the portal's mode before the page first paints:

    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>My plugin</title>
        <script src="https://<your-portal-domain>/static/sdk/quix-plugin.js"></script>
        <script>
          QuixPlugin.init();
        </script>
        <link rel="stylesheet" href="/css/app.css">
      </head>
      <body>
        <main id="view"></main>
        <script src="/js/app.js"></script>
      </body>
    </html>
    ```

    Replace `<your-portal-domain>` with the host you use to open the Quix portal in your browser. For a dedicated, self-hosted or custom-domain installation, that's your own host, for example `portal.example.com`.

    !!! note "Load the SDK from the portal"

        Don't bundle a copy of `quix-plugin.js` into your app. The portal decides what to send to your plugin based on the SDK version it reports, so loading the file from the portal keeps the two in step. The file is a plain script, not an ES module: it defines one global object, `QuixPlugin`. If your plugin sends a `Content-Security-Policy` header, add the portal's origin to `script-src`.

2. In your app code, register an `onToken` callback. It runs with the first token and again after every refresh, so store the latest value each time. Wait for the first token before you make a request:

    ```js
    let authToken = null;

    // Resolves when the first token arrives. Later refreshes update authToken.
    const tokenReady = new Promise((resolve) => {
      QuixPlugin.onToken((token) => {
        authToken = token;
        resolve();
      });
    });

    async function getJson(url) {
      await tokenReady;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    }
    ```

    Validate the token on your backend before you trust it. See [How to handle the token in the backend](plugin.md#how-to-handle-the-token-in-the-backend).

3. Register an `onNavigate` callback that passes the path to your router. Register it once, when your app starts: the SDK has no method to remove a callback. In TypeScript, first add the [TypeScript declarations](#typescript-declarations):

    === "Angular"

        ```ts
        // main.ts: add to your existing bootstrap code
        import { NgZone } from '@angular/core';
        import { Router } from '@angular/router';

        bootstrapApplication(AppComponent, appConfig).then((appRef) => {
          const router = appRef.injector.get(Router);
          const zone = appRef.injector.get(NgZone);
          QuixPlugin.onNavigate((path) => zone.run(() => router.navigateByUrl(path)));
        });
        ```

        The SDK starts in `<head>`, before Angular loads, so its callbacks can run outside Angular's zone. `zone.run()` makes sure the view updates after the navigation.

    === "React Router"

        ```js
        // router.js
        import { createBrowserRouter } from 'react-router-dom';

        export const router = createBrowserRouter(routes);

        // Register at module level, not in a component or an effect.
        QuixPlugin.onNavigate((path) => router.navigate(path));
        ```

        Don't register the callback in a component with the `navigate` function from `useNavigate()`. Every mount adds another callback, and in development React's `StrictMode` runs effects twice.

    === "Vue Router"

        ```js
        // main.js: App and routes are your own
        import { createApp } from 'vue';
        import { createRouter, createWebHistory } from 'vue-router';

        const router = createRouter({ history: createWebHistory(), routes });
        QuixPlugin.onNavigate((path) => router.push(path));

        createApp(App).use(router).mount('#app');
        ```

    === "Plain JavaScript"

        Pass the path to your own navigation function. For a complete example, see [A framework-free router](#a-framework-free-router).

4. Style your page for both color modes. The SDK sets `data-quix-theme` on your `<html>` element. Dark is the portal's default, so make dark your CSS default too:

    ```css
    :root {
      --plugin-bg: #14161c;
      --plugin-surface: #1d2029;
      --plugin-text: #e6e8ee;
    }

    html[data-quix-theme='light'] {
      --plugin-bg: #ffffff;
      --plugin-surface: #f5f6f8;
      --plugin-text: #1b1d23;
    }

    body {
      background: var(--plugin-bg);
      color: var(--plugin-text);
    }
    ```

5. Deploy the plugin, open its embedded view in the portal, and check that:

    * Your page renders in the portal's mode, and follows when you switch the portal's mode.
    * In your browser's network tab, your API requests carry an `Authorization: Bearer ...` header.
    * When you navigate inside your plugin, the portal's address bar follows.
    * When you open the portal URL in a new tab, the plugin opens on the same page.

    If a check fails, see [Verify and troubleshoot](#verify-and-troubleshoot).

The `init()` call also keeps the portal URL in step with your plugin's route. You don't write any code for it: navigate with your router as usual.

!!! tip "Develop locally"

    Outside the portal, no token arrives, so `tokenReady` never resolves, and the mode is `dark`. To call APIs locally, supply a token from your local configuration when the page isn't in an iframe. For example, in a Vite project, replace the `tokenReady` promise from step 2 with:

    ```js
    const tokenReady = new Promise((resolve) => {
      if (window.parent === window) {
        // Local development only: no portal, so use a token from .env.development.local.
        authToken = import.meta.env.VITE_QUIX_TOKEN;
        resolve();
        return;
      }
      QuixPlugin.onToken((token) => {
        authToken = token;
        resolve();
      });
    });
    ```

    Use a [personal access token](../access-security/personal-access-token.md). Keep it out of source control and out of production builds. To preview light mode, add `?theme=light` to your local URL.

## Upgrade from an earlier SDK version

If your plugin loads `quix-plugin.js` from the portal, it already runs the SDK version the portal serves. You don't change the `<script>` tag. If you bundled a copy of the file into your app, replace it with the portal URL, as in [Quick start](#quick-start) step 1.

These behaviors change without any code change:

| Change | Since | What to check |
|---|---|---|
| The SDK requests a new token before the current one expires, and calls `onToken` again with each token the portal returns. | 1.1.0 | Your `onToken` callback replaces the stored token every time, and is safe to run more than once. |
| When the portal opens a page inside your plugin, it no longer reloads the iframe. The SDK passes the path to your `onNavigate` callbacks or, with none registered, calls `history.pushState()` and dispatches `popstate`. | 1.2.1 | Portal navigation reaches your router: register `onNavigate`, or check that your router follows `popstate`. `init()` runs before your router rewrites the URL. See [Navigation](#navigation). |
| The SDK writes the `data-quix-theme` attribute and an inline `color-scheme` style to your `<html>` element. The portal is dark by default. | 1.3.0 | Open your plugin with the portal in dark mode. If your page doesn't set its own background and text colors, the browser now draws a dark page and dark form controls. Style both modes, or pass `init({ applyTheme: false })` to keep the previous look. See [Theme](#theme). |

To check which version is running, open the browser console: the SDK's group header reads, for example, `Quix Plugin SDK v1.3.0`. If it shows an older version than the portal serves, the browser is using a cached copy of the file. Do a hard refresh, or clear the browser cache for your portal's domain.

For every version and what the portal sends to it, see [Version history and compatibility](plugin-sdk-internals.md#version-history-and-compatibility).

## Authentication token

The token lets your plugin act as the signed-in portal user. Send it as a Bearer credential to your plugin's backend and validate it there, or use it to call Quix APIs. Requests made with it are authorized as that user. For the server side, see [Authentication and authorization](plugin.md#authentication-and-authorization).

### Token refresh

Tokens are JWTs that expire. The SDK requests a new token 60 seconds before the current one expires, and calls your `onToken` callbacks with each token the portal returns. That can be the same value as before, when the portal hasn't renewed its own session yet.

Treat `onToken` as "here's the current token", not "the token arrived". Replace the stored token every time, as in [Quick start](#quick-start). Don't copy the first token into a long-lived API client and keep it. For the exact schedule, see [Token refresh schedule](plugin-sdk-internals.md#token-refresh-schedule).

### Handle the token safely

The token is a Bearer credential for the signed-in user:

* Keep it in memory. You don't need to store it, because the SDK requests a new token every time your plugin loads.
* Don't put it in URLs. The SDK reports your plugin's URL to the portal.
* Validate every token on your backend. The SDK accepts a token from whichever page embeds your plugin, so your backend is the place that decides whether a token is genuine. See [How to handle the token in the backend](plugin.md#how-to-handle-the-token-in-the-backend).

The SDK logs the first 20 characters of each token to the browser console. That covers the start of the JWT header, not the signature.

### When no token arrives

Only the portal page that embeds your plugin can answer the token request. You don't receive a token when:

* **Your plugin runs outside the portal**, for example on `localhost` during development. See the "Develop locally" tip in [Quick start](#quick-start).
* **Your plugin's page redirects to another origin**, for example to an external login page, or from one host name to another. The portal exchanges messages only with the origin of your plugin's embedded view URL. See [Stay on the embedded view origin](plugin.md#stay-on-the-embedded-view-origin).

## Navigation

The SDK keeps the portal's address bar and your plugin's route in step in both directions. Each page inside your plugin then has its own portal URL that people can bookmark, refresh and share, and the portal can open a page inside your plugin directly.

### Use path routing

Keep your plugin's route in the URL path, such as `/alarms`, not in the fragment, such as `#/alarms`. Most routers offer a path, or "history", mode. Fragments on a path, such as `/runs#latest`, work normally.

A hash-routed app works in one direction only. The portal mirrors its route as a fragment of the plugin's portal URL, such as `/apps/<deployment-id>#/runs`, so refreshes and shared links still work. Navigation that starts in the portal can't reach it, though: the SDK accepts only paths that start with `/`, so it ignores the portal's path and nothing happens.

When the SDK detects a hash-routed app, it logs this warning once:

```text
⚠ Hash routing detected (#/runs).
  The portal URL mirrors location.pathname, which stays "/" for hash routes,
  so it cannot follow this app. Use path routing (history.pushState).
```

The warning's wording predates the current portal, which does mirror the fragment. The advice still applies.

### Serve every route from your entry page

A deep link loads your plugin at its sub-path. For example, opening `/apps/<deployment-id>/alarms` in the portal loads `<embedded-view-url>/alarms` in the iframe. That first request is a plain HTTP `GET` for `/alarms`. If your server returns `404` or redirects, the deep link fails before any JavaScript runs.

Configure your server to return your `index.html` with status `200` for every route, and `404` for a missing file:

=== "nginx"

    ```nginx
    # Inside your server block, with root set to your build output.
    location / {
      try_files $uri /index.html;
    }

    # A missing asset returns 404 instead of index.html.
    location ~* \.(?:css|js|map|json|ico|png|jpe?g|gif|svg|webp|woff2?|ttf)$ {
      try_files $uri =404;
    }
    ```

=== "Node.js (Express)"

    ```js
    // server.js
    import express from 'express';
    import path from 'node:path';

    const app = express();
    const dist = path.resolve('dist');
    const assetPattern = /\.(?:css|js|map|json|ico|png|jpe?g|gif|svg|webp|woff2?|ttf)$/i;

    // Register your API routes here, before the fallbacks below.
    app.use(express.static(dist));

    // A missing asset returns 404 instead of index.html.
    app.use((req, res, next) => (assetPattern.test(req.path) ? res.sendStatus(404) : next()));

    // Every other route returns the entry page.
    app.use((req, res) => res.sendFile(path.join(dist, 'index.html')));

    app.listen(80);
    ```

=== "Flask"

    ```python
    import os
    from flask import Flask, abort, send_from_directory

    DIST = os.path.abspath("dist")
    ASSET_EXTENSIONS = {".css", ".js", ".map", ".json", ".ico", ".png", ".svg", ".woff2"}

    app = Flask(__name__, static_folder=None)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        if path and os.path.isfile(os.path.join(DIST, path)):
            return send_from_directory(DIST, path)
        # A missing asset returns 404 instead of index.html.
        if os.path.splitext(path)[1] in ASSET_EXTENSIONS:
            abort(404)
        return send_from_directory(DIST, "index.html")
    ```

### Use root-absolute asset URLs

Reference stylesheets, scripts and images with paths that start with `/`:

```html
<link rel="stylesheet" href="/css/app.css">   <!-- works on every route -->
<link rel="stylesheet" href="css/app.css">    <!-- breaks on /rigs/RIG-01 -->
```

On the page `/rigs/RIG-01`, the relative URL `css/app.css` resolves to `/rigs/css/app.css`. A catch-all route that answers every request with `index.html` sends HTML where the browser expects CSS, so the page renders unstyled or blank, and the network tab shows no failed request. The `404` rule for missing assets in the examples above turns this into a visible error.

### Serve your plugin from the root of its origin

Serve your entry page at `/` on its origin. If your plugin is served under a prefix, such as `https://plugins.example.com/ui/`, the SDK reports `/ui/alarms` as the route. The portal appends that to the embedded view URL, which already ends in `/ui`, and the next load requests `/ui/ui/alarms`.

### Plugin to portal

The SDK reports your plugin's route to the portal every time it changes, whichever way your app navigates. The portal appends the path to the plugin's portal URL and updates the address bar without reloading your plugin. For example, when a plugin at `/apps/<deployment-id>` navigates to `/runs?status=failed#latest`, the portal URL becomes `/apps/<deployment-id>/runs?status=failed#latest`.

The portal merges your plugin's query parameters into its own address bar, and your values win when a name is used by both. The portal never removes a parameter: one that your plugin drops from its URL stays in the portal URL and comes back to your plugin on the next load. Treat parameters as additive, or set an explicit empty or default value instead of removing one. For every parameter the portal adds to the iframe URL, see [What the portal adds to the URL](plugin.md#what-the-portal-adds-to-the-url).

### Portal to plugin

When the portal opens a different page inside the same plugin, for example when someone selects a space sidebar entry that points to it, the portal sends the new path to your plugin instead of reloading the iframe. Your plugin keeps its in-memory state, such as open panels, scroll positions and unsaved input. The portal reloads the iframe instead when the portal's own query parameters change, or when your plugin runs an SDK older than 1.2.1.

The SDK passes the path to your plugin in one of two ways:

* **With an `onNavigate` callback.** The SDK calls your callbacks with the path and doesn't touch the browser history itself. Route to the path with your router, as in [Quick start](#quick-start) step 3.
* **Without a callback.** The SDK calls `history.pushState()` with the path and then dispatches a `popstate` event. Most history-based routers react to `popstate`, so this fallback often works with no code. For a fragment-only change on the current page, the SDK sets `location.hash` instead.

The path your callback receives:

* Is relative to your plugin's root and starts with `/`, for example `/alarms` or `/rigs/RIG-01/history`. The root of your plugin is `/`.
* Can include a fragment, for example `/runs#latest`.
* Never includes a query string.

Call your router's navigation method in the callback. Don't set `location.href` or call `location.assign()`: a full page load discards your app's state, repeats the token handshake, and can lose the portal's mode. See [Keep the mode after a full page load](#keep-the-mode-after-a-full-page-load).

### A framework-free router

This example is a complete path router without a framework. It renders a view for each path, follows the browser's back and forward buttons, handles portal navigation, and routes same-origin link clicks without loading a new document:

??? example "app.js"

    ```js
    // Assumes the SDK is loaded and QuixPlugin.init() has run in <head>.

    const routes = {
      '/': renderOverview,
      '/alarms': renderAlarms,
      '/runs': renderRuns,
    };

    function render() {
      const view = routes[window.location.pathname] ?? renderNotFound;
      view(document.getElementById('view'));
    }

    function currentPath() {
      return window.location.pathname + window.location.search + window.location.hash;
    }

    function navigate(path) {
      // Already there, for example when the SDK replays a path it already
      // applied with its fallback: don't add a second history entry.
      if (path === currentPath()) return;
      history.pushState(null, '', path); // the SDK reports this to the portal
      render();
    }

    // Back and forward buttons.
    window.addEventListener('popstate', render);

    // Navigation that starts in the portal.
    QuixPlugin.onNavigate(navigate);

    // Links inside the plugin: route them instead of loading a new document.
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.('a[href]');
      if (!link) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;
      if (link.origin !== window.location.origin) return; // external, mailto: and so on

      // Let the browser scroll to an anchor on the current page.
      const samePage = link.pathname === window.location.pathname && link.search === window.location.search;
      if (samePage && link.hash) return;

      event.preventDefault();
      navigate(link.pathname + link.search + link.hash);
    });

    render();
    ```

## Theme

The Quix portal has a light mode and a dark mode. The SDK tells your plugin which one the portal is showing, so a dark plugin doesn't sit inside a light portal. The portal sends only the mode, `light` or `dark`, never its colors or design tokens. Your plugin keeps full control of its own palette.

Theme support is on by default. `init()` writes the mode to your `<html>` element, including the `color-scheme` style, which sets the browser's default page background, text color and form controls. If your plugin was designed for one mode only, check it with the portal in dark mode, which is the portal's default. Style both modes, or pass `init({ applyTheme: false })` to keep the browser's defaults.

The portal passes its mode on the iframe URL, so `init()` applies it before the first paint, and it sends a message when the mode changes, without reloading your plugin. The mode sent is the one the portal is showing: when a user's appearance setting follows the operating system, the portal resolves it to `light` or `dark` first, and when the active space sets a mode, that mode is sent. Outside the portal, the mode is `dark`. To preview light mode outside the portal, open your page with `?theme=light`.

### Style with CSS only

By default, the SDK writes the mode to your `<html>` element when `init()` runs and again on every change:

* The `data-quix-theme` attribute, set to `light` or `dark`.
* The `color-scheme` style, set to the same value, so browser-drawn controls such as form fields and scrollbars match the mode. It's an inline style, so it overrides any `color-scheme` your stylesheet sets on `html`.

Write your CSS against the attribute, as in [Quick start](#quick-start) step 4. No JavaScript is needed beyond `init()`.

`@media (prefers-color-scheme: ...)` follows the operating system, not the portal, so a light portal on a dark operating system gives you a dark plugin. Replace those media queries with attribute selectors:

```css
/* Follows the operating system: */
@media (prefers-color-scheme: light) { /* ... */ }

/* Follows the portal: */
html[data-quix-theme='light'] { /* ... */ }
```

For Tailwind CSS, point the `dark` variant at the attribute:

=== "Tailwind CSS v4"

    ```css
    @custom-variant dark (&:where([data-quix-theme=dark], [data-quix-theme=dark] *));
    ```

=== "Tailwind CSS v3.4"

    ```js
    // tailwind.config.js
    module.exports = {
      darkMode: ['selector', '[data-quix-theme="dark"]'],
      // ...
    };
    ```

To avoid a flash of the wrong mode, call `init()` in a script in `<head>`. If `init()` runs later, for example from a deferred bundle, the page first paints with your CSS default and then switches.

### Drive your own theme system

If your app already has a theme system, such as a theme store, a component library's theme provider or its own class names, turn off the SDK's changes to `<html>` and set the mode yourself from `onTheme`:

```js
QuixPlugin
  .init({ applyTheme: false })
  .onTheme((theme) => {
    // 'light' or 'dark': runs at once with the current mode, then on every change.
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
```

With `applyTheme: false`, the SDK doesn't write `data-quix-theme` or `color-scheme`. `onTheme` and `QuixPlugin.theme` still report the mode. Pass the option on the first `init()` call: the SDK ignores later calls, including their options.

### Keep the mode after a full page load

The portal sends its mode again only to a page that the portal loaded itself: the first load, `Reload app` in the [plugin toolbar](plugin.md#plugin-toolbar), a different plugin, or a portal navigation that reloads the iframe. When your plugin loads a new page on its own, for example through a plain `<a href>` link, `location.reload()`, a form post or a server redirect, the new page uses the `theme` parameter in its own URL, or `dark` when there's none. It stays in that mode until the user switches the portal's mode again.

To avoid this:

* Navigate with your router or `history.pushState()`, and route link clicks, as in [A framework-free router](#a-framework-free-router).
* If you must load a new page, carry the current mode on its URL:

    ```js
    const url = new URL(window.location.href);
    url.searchParams.set('theme', QuixPlugin.theme);
    window.location.replace(url);
    ```

## API reference

The SDK defines one global object, `QuixPlugin`:

| Member | Kind | Since | Summary |
|---|---|---|---|
| [`init(options)`](#quixplugininitoptions) | Method | 1.0.0 | Starts the SDK. |
| [`onToken(callback)`](#quixpluginontokencallback) | Method | 1.0.0 | Receives the auth token, then each refreshed token. |
| [`onNavigate(callback)`](#quixpluginonnavigatecallback) | Method | 1.2.1 | Receives paths when the portal navigates inside your plugin. |
| [`onTheme(callback)`](#quixpluginonthemecallback) | Method | 1.3.0 | Receives the portal's color mode, then each change. |
| [`theme`](#quixplugintheme) | Read-only property | 1.3.0 | The current color mode. |
| [`version`](#quixpluginversion) | Property | 1.3.0 | The SDK version. |

!!! warning "Register callbacks once"

    The SDK has no method to remove a callback, and it doesn't check for duplicates: registering the same function twice makes it run twice. Register your callbacks once when your app starts, not in code that runs every time a component mounts.

`init()`, `onToken()`, `onNavigate()` and `onTheme()` all return `QuixPlugin`, so you can chain them. You can register callbacks before or after `init()`. If a callback throws, the SDK ignores the error and still runs the other callbacks. For example:

```js
QuixPlugin
  .init()
  .onToken((token) => { authToken = token; })
  .onNavigate((path) => router.navigate(path))
  .onTheme((theme) => console.log('Portal mode:', theme));
```

Members that start with an underscore, such as `_portalOrigin`, are internal and aren't part of the API. Don't read or set them.

### `QuixPlugin.init(options)`

Starts the SDK. Until you call `init()`, the SDK sends no messages, listens for none, and doesn't change `history`.

| Option | Type | Default | Description |
|---|---|---|---|
| `applyTheme` | boolean | `true` | Whether the SDK writes the color mode to your `<html>` element as `data-quix-theme` and `color-scheme`. Only the value `false` turns it off. Available from 1.3.0. |

Call `init()` in `<head>`, before your router or any other script changes the URL. It reads the `portalOrigin` and `theme` parameters that the portal adds to the iframe URL.

`init()` is idempotent. The first call starts the SDK. Later calls do nothing and ignore their options. For the steps it runs, see [What init() does](plugin-sdk-internals.md#what-init-does).

Returns `QuixPlugin`.

### `QuixPlugin.onToken(callback)`

Registers a function that receives the auth token.

| Parameter | Type | Description |
|---|---|---|
| `callback` | `(token: string) => void` | Called with the token string. |

When the callback runs:

* When the first token arrives after `init()`.
* After each [token refresh](#token-refresh), with the token the portal returns, which can be the same value as before.
* **Immediately**, during the `onToken` call, if a token has already arrived. It receives the latest token.

Each registered callback runs for every token. A callback that throws doesn't stop the next token refresh.

Returns `QuixPlugin`.

### `QuixPlugin.onNavigate(callback)`

Registers a function that receives navigation from the portal. Available from 1.2.1.

| Parameter | Type | Description |
|---|---|---|
| `callback` | `(path: string) => void` | Called with a path relative to your plugin's root. The path starts with `/`, can include a `#fragment`, and never includes a query string. |

When the callback runs:

* Each time the portal sends a path that passes the SDK's [security checks](plugin-sdk-internals.md#security-model).
* **Immediately**, during the `onNavigate` call, if the portal sent a path while no callback was registered. It receives the most recent such path. Only the first callback registered after that path arrived receives it. By then, the SDK's fallback has already applied the path, so skip navigation to the page you're already on.

While at least one callback is registered, the SDK leaves `history` alone and relies on your callbacks to route. With no callbacks registered, it uses its fallback: `history.pushState()` followed by a `popstate` event. See [Portal to plugin](#portal-to-plugin).

Navigation that your callback starts isn't reported back to the portal. The exception is the immediate replay to a late callback: navigation it starts is reported, which does nothing when the URL doesn't change.

Returns `QuixPlugin`.

### `QuixPlugin.onTheme(callback)`

Registers a function that receives the portal's color mode. Available from 1.3.0.

| Parameter | Type | Description |
|---|---|---|
| `callback` | `(theme: QuixTheme) => void` | Called with the color mode. `QuixTheme` is `'light'` or `'dark'`. |

When the callback runs:

* **Immediately**, during the `onTheme` call, with the current mode.
* Each time the mode changes. The SDK doesn't call it again for the mode it already reported.

If you register the callback before `init()`, it first receives `dark`, the default. When `init()` then reads a different mode from the iframe URL, the callback runs again with that mode, so registration order doesn't matter.

Returns `QuixPlugin`.

### `QuixPlugin.theme`

The current color mode, `'light'` or `'dark'`. Available from 1.3.0. Read it once when you don't need to follow changes. The value is never empty. Before `init()`, it's `'dark'`. After `init()`, it's the mode from the `theme` parameter in the URL, or `'dark'` when there's none, and then the latest mode the portal sent. The property is read-only.

### `QuixPlugin.version`

The SDK version as a string, for example `'1.3.0'`. It's the same value the SDK reports to the portal. Available from 1.3.0. On older SDKs, it's `undefined`. Treat it as read-only. To check for a feature, test for the method, for example `typeof QuixPlugin.onTheme === 'function'`.

### TypeScript declarations

The SDK doesn't include type definitions. If your plugin uses TypeScript, add a declaration file, for example `quix-plugin.d.ts`, anywhere your `tsconfig.json` includes. Don't add `import` or `export` statements to it, or the declaration stops being global:

```ts
type QuixTheme = 'light' | 'dark';

interface QuixPluginInitOptions {
  applyTheme?: boolean;
}

interface QuixPluginSdk {
  readonly version: string;
  readonly theme: QuixTheme;
  init(options?: QuixPluginInitOptions): QuixPluginSdk;
  onToken(callback: (token: string) => void): QuixPluginSdk;
  onNavigate(callback: (path: string) => void): QuixPluginSdk;
  onTheme(callback: (theme: QuixTheme) => void): QuixPluginSdk;
}

declare const QuixPlugin: QuixPluginSdk;
```

## Verify and troubleshoot

### Check the console

The browser console shows lines from both sides. The SDK marks its lines with a blue `Quix` badge, and the portal marks its lines with a `Quix Portal` badge. To check your integration:

1. Open your plugin's embedded view in the portal, then open your browser's developer tools and select the `Console` tab.
2. Expand the SDK's `Quix Plugin SDK` group and compare it with the example output below.
3. Check that the `<html>` element in your plugin's frame has a `data-quix-theme` attribute, unless you passed `applyTheme: false`.
4. Navigate inside your plugin. Check that the portal's address bar follows, that the SDK logs `⟶ navigate` with a `Quix` badge, and that the portal logs `⟵ navigate` with a `Quix Portal` badge.
5. If a portal sidebar entry points to a page inside your plugin, select it. Check that the portal logs `⟶ soft navigate` with a `Quix Portal` badge, that the SDK logs `⟵ navigate` with a `Quix` badge, and that the iframe doesn't reload.
6. Switch the portal between light and dark mode. Check that the SDK logs `⟵ theme` and your plugin's colors change.

For a plugin loaded at `/alarms` by a portal at `https://portal.example.com`, the SDK's group looks like this:

```text
Quix Plugin SDK v1.3.0
  Quix  ◎ Initialising
  Quix  ⚿ Portal origin https://portal.example.com
  Quix  ◑ Theme dark
  Quix  ⟶ navigate /alarms?isIframe=true&portalOrigin=https%3A%2F%2Fportal.example.com&theme=dark
  Quix  ⟳ Requesting auth token...
  Quix  ✓ Ready
  Quix  ✓ Auth token received <first 20 characters of the token>••••
Quix  ⟳ Next token refresh in 3540s
```

Paths, origins and the refresh delay depend on your plugin and token. The group closes when the first token arrives, so later lines appear outside it. In light mode, a `⟵ theme light` line also appears directly before `◑ Theme light`.

??? info "Other console lines"

    Lines the SDK can log, with a `Quix` badge:

    | Line | Meaning |
    |---|---|
    | `⚿ Portal origin restored from session cache` | The URL had no `portalOrigin`, so the SDK used the origin saved earlier in this tab. |
    | `⚿ No portalOrigin param — inbound navigation disabled` | The portal origin is unknown. Portal navigation and live mode changes are turned off. |
    | `⚠ Hash routing detected (<fragment>).` | Your app keeps its route in the fragment. See [Use path routing](#use-path-routing). |
    | `⟵ navigate <path>` | The portal sent a path to your plugin. |
    | `⊘ Ignored unsafe NAVIGATE path` | The portal sent a path that failed the SDK's checks. The path follows on the same line. |
    | `⟵ theme <mode>` | The SDK applied a mode that differs from its previous one: at `init()` when the iframe URL says `light`, and on every change afterwards. |
    | `⊘ Ignored unknown theme` | A theme message held a value other than `light` or `dark`. |

    Lines the portal can log, with a `Quix Portal` badge:

    | Line | Meaning |
    |---|---|
    | `⟵ handshake — SDK <version>` | The portal received the token request and the version your plugin reported. |
    | `⟵ handshake — SDK pre-1.2 (no version reported)` | The request had no version, so the portal treats the plugin as older than 1.2. |
    | `⟶ theme <mode>` | The portal sent its mode to your plugin. |
    | `⟵ navigate <portal URL>` | The portal updated its address bar from your plugin's route. |
    | `⟶ soft navigate <path>` | The portal sent a path to your plugin, without a reload. |
    | `↻ reload — SDK <version> lacks soft navigation` | The portal reloaded the iframe instead of sending a path. Usually the plugin reported no version or one older than 1.2, or the page hasn't finished loading and handshaking yet. `<version>` reads `unknown` when no version is known. |
    | `↻ reload — plugin changed (<old path> → <new path>)` | The portal loaded a different plugin. Also logged on the first load of a deep link, as `(none → ...)`. |
    | `⊘ ignored unsafe NAVIGATE path — <path>` | The portal rejected a path your plugin reported. |

### Common problems

**Loading**

| Symptom | Cause | Fix |
|---|---|---|
| The embedded view is blank, or the browser reports that the site refused to connect | Your server sends `X-Frame-Options`, or a `Content-Security-Policy` `frame-ancestors` directive that excludes the portal. Security middleware, such as helmet, Flask-Talisman and Django's clickjacking middleware, sets one by default. | Remove `X-Frame-Options`, and allow the portal's origin in `frame-ancestors`. |
| No `Quix Plugin SDK` group in the console | The script didn't load, or `init()` wasn't called. | Check the network tab for `quix-plugin.js` and the `<script>` URL. Make sure `QuixPlugin.init()` runs. |

**Token**

| Symptom | Cause | Fix |
|---|---|---|
| The first API request fails with `401`, and its header is `Bearer null` | The request ran before the first token arrived. | Wait for the first token, as in [Quick start](#quick-start) step 2. |
| `onToken` never runs | Your plugin runs outside the portal. | Supply a local token for development. See [When no token arrives](#when-no-token-arrives). |
| `onToken` never runs inside the portal, and the portal logs no `⟵ handshake` line | Your plugin's page is on a different origin from its embedded view URL, for example after a redirect to another host or a login page. | Serve the plugin's pages from the origin of its embedded view URL. See [Stay on the embedded view origin](plugin.md#stay-on-the-embedded-view-origin). |

**Navigation and deep links**

| Symptom | Cause | Fix |
|---|---|---|
| A deep link shows a `404` page | Your server doesn't return `index.html` for that route. | Add a catch-all route. See [Serve every route from your entry page](#serve-every-route-from-your-entry-page). |
| A deep link shows a blank or unstyled page | Relative asset URLs resolve under the current route. | Use [root-absolute asset URLs](#use-root-absolute-asset-urls). |
| The portal URL gets a repeated path segment after a reload | Your plugin is served under a path prefix. | [Serve your plugin from the root of its origin](#serve-your-plugin-from-the-root-of-its-origin). |
| Selecting a portal sidebar entry for a page of your plugin does nothing, and the SDK logs `⊘ Ignored unsafe NAVIGATE path #/...` | Your app uses hash routing. | Switch your router to [path routing](#use-path-routing). |
| The iframe reloads when you navigate from the portal, and the portal logs `↻ reload — SDK ... lacks soft navigation` | The plugin runs an SDK older than 1.2.1, often a cached copy. | Do a hard refresh, and check the version in the console group header. |
| `onNavigate` never runs, and the SDK logs `No portalOrigin param` | The portal origin is unknown, so the SDK rejects portal navigation. | Make sure `init()` runs on the first page load, before your app changes the URL. |
| Angular logs `Navigation triggered outside Angular zone`, or the view doesn't update after portal navigation | SDK callbacks can run outside Angular's zone. | Wrap router calls in `NgZone.run()`, as in [Quick start](#quick-start) step 3. |
| Navigating inside your plugin loses state or repeats the token handshake | Plain `<a href>` links load a new document. | Intercept same-origin link clicks and route them. See [A framework-free router](#a-framework-free-router). |
| A query parameter your plugin removed comes back after a reload | The portal merges parameters and never removes one. | Set an explicit empty or default value instead. See [Plugin to portal](#plugin-to-portal). |

**Theme**

| Symptom | Cause | Fix |
|---|---|---|
| The plugin turns dark after it follows a plain link, reloads itself or is redirected | The new page has no `theme` parameter, and the portal doesn't resend its mode to a page your plugin loaded. | Navigate without a full page load, or carry the mode on the URL. See [Keep the mode after a full page load](#keep-the-mode-after-a-full-page-load). |
| The wrong mode flashes on load | `init()` runs after the first paint, or after your app removed the `theme` parameter from the URL. | Call `init()` in a script in `<head>`, before your router changes the URL. |
| The plugin follows the operating system's mode, not the portal's | Your CSS uses `@media (prefers-color-scheme)`. | Use `html[data-quix-theme]` selectors. See [Style with CSS only](#style-with-css-only). |
| A light-only plugin shows a dark background or dark form controls | The SDK writes `color-scheme`, and the portal is dark by default. | Style both modes, or pass `init({ applyTheme: false })`. |
| The mode never changes | The plugin runs an SDK older than 1.3, or the portal origin is unknown. | Do a hard refresh and check the version in the console group header. Check for the `No portalOrigin param` line. |
| `data-quix-theme` is missing | You passed `applyTheme: false`, or `init()` wasn't called. | Use `onTheme`, or remove the option. |

## Migrate from a manual postMessage integration

This section is for plugins that exchange `REQUEST_AUTH_TOKEN` and `AUTH_TOKEN` messages with the portal by hand, as earlier versions of the plugin documentation showed. Already using the SDK? See [Upgrade from an earlier SDK version](#upgrade-from-an-earlier-sdk-version).

A hand-rolled integration usually stops working when the token expires, doesn't check where messages come from, and sends no version, so the portal reloads the iframe for every portal navigation inside the plugin and never sends its mode. The SDK handles all of this. A typical hand-rolled integration looks like this:

```js
// Before: hand-rolled handshake
window.addEventListener('message', (event) => {
  if (event.data?.type === 'AUTH_TOKEN') {
    myApi.setAuthHeader(`Bearer ${event.data.token}`);
  }
});
window.parent.postMessage({ type: 'REQUEST_AUTH_TOKEN' }, '*');
```

To move to the SDK:

1. Delete your `message` event listener for `AUTH_TOKEN` and the code that posts `REQUEST_AUTH_TOKEN`.
2. If your code posts `NAVIGATE` messages to report routes, delete it too. The SDK reports routes itself, and keeping both sends each route twice.
3. Load the SDK and call `init()` in `<head>`, as in [Quick start](#quick-start) step 1.
4. Move the body of your old `AUTH_TOKEN` handler into an `onToken` callback. The callback runs again after every refresh, so make sure it's safe to run more than once:

    ```js
    // After: the SDK
    QuixPlugin.onToken((token) => {
      myApi.setAuthHeader(`Bearer ${token}`);
    });
    ```

5. If your app has a client-side router, register an `onNavigate` callback, as in [Quick start](#quick-start) step 3.
6. Style your plugin for both color modes. See [Theme](#theme).
7. Open the plugin in the portal and check that the portal logs `⟵ handshake — SDK` followed by the SDK version.

The portal side of the protocol is the same for the SDK and for a hand-rolled integration, so the migration touches only your plugin's code. To keep your own integration instead, see [Requirements for a hand-rolled integration](plugin-sdk-internals.md#requirements-for-a-hand-rolled-integration).

## See also

* [Plugin system](plugin.md): configure a deployment as a plugin and choose where it appears in the portal.
* [How the Quix Plugin SDK works](plugin-sdk-internals.md): security model, message protocol and version history.
* [Embedded view URL](plugin.md#embedded-view-url): the URL your plugin loads from, and the parameters the portal adds to it.
* [Authentication and authorization](plugin.md#authentication-and-authorization): validate the token on your backend.
* [Personal access tokens](../access-security/personal-access-token.md): tokens for scripts and local development.
* [Portal API](../apis/portal-api/overview.md): the API your plugin can call with the token.

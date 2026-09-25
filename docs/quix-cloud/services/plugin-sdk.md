---
title: Quix Plugin SDK
description: JavaScript library for plugin UIs embedded in the Quix portal. It delivers the user's auth token, keeps the portal URL and your plugin's route in step, and tells your plugin the portal's light or dark mode.
---

# Quix Plugin SDK

Your plugin's UI runs in an iframe on its own origin. The **Quix Plugin SDK** connects it to the portal: it delivers the signed-in user's token and refreshes it, keeps the portal URL and your plugin's route in step in both directions, and tells your plugin whether the portal is in light or dark mode.

This page describes SDK version **1.3.0**. To set up a deployment as a plugin first, see [Plugin system](plugin.md).

## Quick start

Before you start, check that your plugin meets these requirements. [Navigation](#navigation) explains each one.

* Has the embedded view turned on. See [Configure in the deployment dialog](plugin.md#configure-in-the-deployment-dialog).
* Routes by path, such as `/alarms`, not by fragment, such as `#/alarms`.
* Returns `index.html` with status `200` for every route, not only `/`.
* Loads assets from root-absolute URLs, such as `/js/app.js`. In Vite, keep `base: '/'`. In Angular, keep `<base href="/">`.
* Is served at the root of its origin, not under a path prefix.

Then add the SDK:

1. In the `<head>` of your entry page, load the SDK from the portal and call `init()`:

    ```html
    <head>
      <script src="https://<your-portal-domain>/static/sdk/quix-plugin.js"></script>
      <script>QuixPlugin.init();</script>
      <!-- your stylesheets and scripts follow -->
    </head>
    ```

    `<your-portal-domain>` is the host you open the portal on. Don't bundle a copy of the file: the portal decides what to send based on the version the SDK reports. It's a plain script, not an ES module, and defines one global, `QuixPlugin`. If your plugin sends a `Content-Security-Policy` header, add the portal's origin to `script-src`.

    Call `init()` in `<head>`, before your router changes the URL. It reads the `portalOrigin` and `theme` parameters the portal adds to the URL, and applies the mode before the first paint.

2. Register an `onToken` callback. It runs with the first token and after every refresh, so replace the stored value each time. Wait for the first token before you make a request:

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
      const response = await fetch(url, { headers: { Authorization: `Bearer ${authToken}` } });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    }
    ```

    Validate the token on your backend. See [How to handle the token in the backend](plugin.md#how-to-handle-the-token-in-the-backend).

3. Pass portal navigation to your router. Register the callback once, at module level or in bootstrap code, not in a component: every mount adds another callback, and React's `StrictMode` mounts twice in development. Angular needs `zone.run()`, because SDK callbacks can run outside its zone. In TypeScript, add the [TypeScript declarations](#typescript-declarations) first.

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

    === "React Router"

        ```js
        // router.js
        import { createBrowserRouter } from 'react-router-dom';

        export const router = createBrowserRouter(routes);
        QuixPlugin.onNavigate((path) => router.navigate(path));
        ```

    In Vue Router, call `router.push(path)` the same way. Without a router, you can skip `onNavigate`: the SDK then calls `history.pushState()` and dispatches `popstate`, so render your view from a `popstate` listener.

4. Style both color modes. The SDK sets `data-quix-theme` on `<html>`. The portal is dark by default, so make dark your CSS default:

    ```css
    :root { --plugin-bg: #14161c; --plugin-text: #e6e8ee; }
    html[data-quix-theme='light'] { --plugin-bg: #ffffff; --plugin-text: #1b1d23; }
    body { background: var(--plugin-bg); color: var(--plugin-text); }
    ```

Deploy and open the embedded view. Your API requests carry `Authorization: Bearer …`, the portal's address bar follows your navigation, and the page follows the portal's mode. If not, see [Troubleshoot](#troubleshoot).

!!! tip "Develop locally"

    Outside the portal, no token arrives and the mode is `dark`. When the page isn't in an iframe, use a [personal access token](../access-security/personal-access-token.md) from local configuration instead. Keep it out of source control and production builds. In Vite, replace the step 2 promise with:

    ```js
    const tokenReady = new Promise((resolve) => {
      if (window.parent === window) {
        authToken = import.meta.env.VITE_QUIX_TOKEN; // from .env.development.local
        return resolve();
      }
      QuixPlugin.onToken((token) => { authToken = token; resolve(); });
    });
    ```

## Upgrade from an earlier SDK version

A plugin that loads `quix-plugin.js` from the portal already runs the version the portal serves. If you bundled a copy, switch to the portal URL. These behaviors change with no code change:

| Since | Change | What to check |
|---|---|---|
| 1.1.0 | The SDK refreshes the token and calls `onToken` again with each token. | Your callback replaces the stored token and is safe to run more than once. |
| 1.2.1 | Portal navigation inside your plugin no longer reloads the iframe. The SDK calls `onNavigate`, or with no callback, `history.pushState()` plus `popstate`. | Your router receives the path. `init()` runs before your router rewrites the URL. |
| 1.3.0 | The SDK writes `data-quix-theme` and an inline `color-scheme` to `<html>`. The portal is dark by default. | Your page styles both modes, or passes `init({ applyTheme: false })`. |

## Authentication token

The token lets your plugin act as the signed-in user, against your own backend or Quix APIs. Tokens expire. The SDK requests a new one 60 seconds before expiry and calls `onToken` with whatever the portal returns, which can be the same value.

* Treat `onToken` as "the current token". Replace the stored value every time. Don't copy the first token into a long-lived client.
* Keep it in memory, never in URLs: the SDK reports your URL to the portal.

No token arrives outside the portal, or after your page redirects to another origin, such as an external login page. The portal talks only to the origin of your plugin's [embedded view URL](plugin.md#embedded-view-url).

## Navigation

The SDK reports every route change to the portal, whichever way your app navigates, so each page of your plugin has a portal URL that people can refresh and share. You write no code for this direction.

### Use path routing

Keep your route in the path, such as `/alarms`. Fragments on a path, such as `/runs#latest`, are fine. A hash-routed app, such as `#/alarms`, works one way only: the portal URL follows it, but portal navigation can't reach it, because the SDK ignores paths that don't start with `/`.

### Serve every route from your entry page

A deep link such as `/apps/<deployment-id>/alarms` loads `<embedded-view-url>/alarms` in the iframe. That first request is a plain `GET`, so a `404` or a redirect breaks the link before any JavaScript runs. Return `index.html` with `200` for every route, and `404` for a missing asset. In nginx:

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

In another server, such as Flask or Express, add a last catch-all route that returns `index.html` for any path that isn't an existing file and has no asset extension.

### Use root-absolute asset URLs

```html
<link rel="stylesheet" href="/css/app.css">   <!-- works on every route -->
<link rel="stylesheet" href="css/app.css">    <!-- breaks on /rigs/RIG-01 -->
```

On `/rigs/RIG-01`, `css/app.css` resolves to `/rigs/css/app.css`. The catch-all answers with HTML, so the page renders unstyled or blank with no failed request in the network tab. The asset `404` rule above makes the failure visible.

### Serve your plugin from the root of its origin

If your plugin is served under a prefix, such as `https://plugins.example.com/ui/`, the SDK reports `/ui/alarms`. The portal appends that to an embedded view URL that already ends in `/ui`, and the next load requests `/ui/ui/alarms`.

### Portal to plugin

When the portal opens another page inside the same plugin, it sends the path instead of reloading the iframe, so your app keeps its state. With an `onNavigate` callback, the SDK leaves history to you. Without one, it calls `history.pushState()` and dispatches `popstate`, which many history-based routers pick up.

The path starts with `/`, can include a `#fragment`, and never includes a query string. Route it with your router. Don't set `location.href`, and route same-origin link clicks rather than letting a plain `<a href>` load a new document: a full page load drops your app's state and can [lose the portal's mode](#keep-the-mode-after-a-full-page-load).

## Theme

The portal sends only its mode, `light` or `dark`, never colors, so your plugin keeps its own palette. The mode arrives on the iframe URL for the first paint, and by message on every change, without a reload. Outside the portal, it's `dark`. Preview light mode with `?theme=light`.

### Style with CSS only

On `init()` and on every change, the SDK sets the `data-quix-theme` attribute on `<html>` to `light` or `dark`. Write your CSS against it, as in [Quick start](#quick-start) step 4. It also sets an inline `color-scheme` style so form controls and scrollbars match. Being inline, it overrides any `color-scheme` your stylesheet sets on `html`.

`@media (prefers-color-scheme)` follows the operating system, not the portal. Use `html[data-quix-theme='light']` selectors instead. For Tailwind CSS, point the `dark` variant at the attribute:

=== "Tailwind CSS v4"

    ```css
    @custom-variant dark (&:where([data-quix-theme=dark], [data-quix-theme=dark] *));
    ```

=== "Tailwind CSS v3.4"

    ```js
    // tailwind.config.js
    module.exports = { darkMode: ['selector', '[data-quix-theme="dark"]'] };
    ```

### Drive your own theme system

If your app has its own theme store, provider or class names, turn off the SDK's writes to `<html>` and set the mode from `onTheme`. Use this in place of the `init()` call in `<head>`:

```js
QuixPlugin
  .init({ applyTheme: false })
  .onTheme((theme) => {
    // 'light' or 'dark': runs at once with the current mode, then on every change.
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
```

Only the first `init()` call counts, so a later call with `applyTheme: false` has no effect.

### Keep the mode after a full page load

The portal resends its mode only to a page it loaded itself, such as the first load or `Reload app` in the [plugin toolbar](plugin.md#plugin-toolbar). A page your plugin loads on its own, through a plain link, `location.reload()`, a form post or a redirect, uses the `theme` parameter in its URL, or `dark`. Navigate with your router, or carry the mode:

```js
const url = new URL(window.location.href);
url.searchParams.set('theme', QuixPlugin.theme);
window.location.replace(url);
```

## API reference

The SDK defines one global, `QuixPlugin`:

| Member | Since | Behavior |
|---|---|---|
| `init(options?)` | 1.0.0 | Starts the SDK. `options.applyTheme` (1.3.0, default `true`): `false` stops the writes to `<html>`. Only the first call counts; later calls and their options are ignored. |
| `onToken(callback)` | 1.0.0 | `(token: string) => void`. Runs with the first token and after every refresh. Runs immediately if a token already arrived. |
| `onNavigate(callback)` | 1.2.1 | `(path: string) => void`. Runs when the portal navigates inside your plugin. A path that arrived before any callback is replayed once to the first callback registered later. The fallback already applied it, so skip a path you're on. |
| `onTheme(callback)` | 1.3.0 | `(theme: 'light' \| 'dark') => void`. Runs immediately with the current mode, then on each change. Registered before `init()`, it gets `dark` first, then the real mode if that differs. |
| `theme` | 1.3.0 | Read-only current mode. Never empty: `'dark'` until the portal says otherwise. |
| `version` | 1.3.0 | The SDK version, such as `'1.3.0'`. `undefined` on older SDKs, so feature-detect with `typeof QuixPlugin.onTheme === 'function'`. |

The methods return `QuixPlugin`, so you can chain them, before or after `init()`. There's no way to remove a callback, and no dedupe: registering a function twice runs it twice, so register once at startup. A callback that throws doesn't stop the others. Members that start with `_` are internal.

### TypeScript declarations

The SDK ships no types. Add a file such as `quix-plugin.d.ts` where your `tsconfig.json` includes it. Don't add `import` or `export`, or the declaration stops being global:

```ts
type QuixTheme = 'light' | 'dark';

interface QuixPluginSdk {
  readonly version: string;
  readonly theme: QuixTheme;
  init(options?: { applyTheme?: boolean }): QuixPluginSdk;
  onToken(callback: (token: string) => void): QuixPluginSdk;
  onNavigate(callback: (path: string) => void): QuixPluginSdk;
  onTheme(callback: (theme: QuixTheme) => void): QuixPluginSdk;
}

declare const QuixPlugin: QuixPluginSdk;
```

## Troubleshoot

Open the browser console with the plugin loaded in the portal. The SDK logs a collapsed `Quix Plugin SDK v<version>` group. If the version is older than you expect, the browser cached an old copy: do a hard refresh.

??? example "Expected console output"

    For a plugin loaded at `/alarms` by a portal at `https://portal.example.com`:

    ```text
    Quix Plugin SDK v1.3.0
      Quix  ◎ Initialising
      Quix  ⚿ Portal origin https://portal.example.com
      Quix  ◑ Theme dark
      Quix  ⟶ navigate /alarms?isIframe=true&portalOrigin=https%3A%2F%2Fportal.example.com&theme=dark
      Quix  ⟳ Requesting auth token...
      Quix  ✓ Ready
      Quix  ✓ Auth token received <first 20 characters>••••
    Quix  ⟳ Next token refresh in 3540s
    ```

| Symptom | Cause | Fix |
|---|---|---|
| Embedded view is blank, or the site "refused to connect" | `X-Frame-Options` or a `frame-ancestors` that excludes the portal, often set by security middleware such as helmet or Flask-Talisman | Remove `X-Frame-Options` and allow the portal origin in `frame-ancestors`. |
| First request fails with `401` and `Bearer null` | The request ran before the first token | Wait for `tokenReady` ([Quick start](#quick-start) step 2). |
| No token inside the portal, and the portal logs no `⟵ handshake` line | The page redirected to another origin | Serve every page from the embedded view URL's origin. |
| A deep link or refresh shows a `404` | No catch-all route | [Serve every route from your entry page](#serve-every-route-from-your-entry-page). |
| A deep link is blank or unstyled | Relative asset URLs | [Use root-absolute asset URLs](#use-root-absolute-asset-urls). |
| The portal URL repeats a path segment after a reload | Served under a path prefix | [Serve from the origin root](#serve-your-plugin-from-the-root-of-its-origin). |
| Portal navigation does nothing, and the SDK logs `⊘ Ignored unsafe NAVIGATE path #/...` | Hash routing | [Use path routing](#use-path-routing). |
| Iframe reloads on portal navigation, and the portal logs `↻ reload — SDK ... lacks soft navigation` | SDK older than 1.2.1, often cached | Hard refresh and check the console header version. |
| `onNavigate` never runs or the mode never changes, and the SDK logs `No portalOrigin param` | The portal origin is unknown, usually because `init()` ran after your router dropped the URL parameters | Call `init()` in `<head>`, before your router changes the URL. |
| Angular view doesn't update after portal navigation | Callback ran outside Angular's zone | Wrap the router call in `zone.run()`. |
| A query parameter you removed comes back | The portal never removes parameters | Set an explicit empty or default value. See [What the portal adds to the URL](plugin.md#what-the-portal-adds-to-the-url). |
| Plugin turns dark after a link, reload or redirect | The new page has no `theme` parameter | [Keep the mode after a full page load](#keep-the-mode-after-a-full-page-load). |
| Plugin follows the operating system's mode | CSS uses `prefers-color-scheme` | Use `html[data-quix-theme]` selectors. |
| Light-only plugin shows a dark background or controls | The SDK writes `color-scheme`, and the portal defaults to dark | Style both modes, or `init({ applyTheme: false })`. |

## Migrate from a manual postMessage integration

A hand-rolled handshake stops working when the token expires, trusts any sender, and reports no version, so the portal reloads the iframe on every navigation and never sends its mode. Replace it:

```js
// Before
window.addEventListener('message', (event) => {
  if (event.data?.type === 'AUTH_TOKEN') myApi.setAuthHeader(`Bearer ${event.data.token}`);
});
window.parent.postMessage({ type: 'REQUEST_AUTH_TOKEN' }, '*');

// After: load the SDK and call init() in <head>, as in Quick start step 1
QuixPlugin.onToken((token) => myApi.setAuthHeader(`Bearer ${token}`));
```

Also delete any code that posts `NAVIGATE`: the SDK reports routes itself, and keeping both reports each route twice. Then add `onNavigate` and theme styles as in [Quick start](#quick-start).

<a id="how-the-sdk-talks-to-the-portal"></a>
<a id="security-model"></a>

??? info "How the SDK talks to the portal"

    The SDK and the portal exchange `window.postMessage` messages. You need this only to audit a plugin or to keep a hand-rolled integration.

    **Security model.** The portal adds `portalOrigin` to the iframe URL. The SDK accepts it only as a bare origin and caches it per tab in `sessionStorage`. The URL value wins over the cache. The SDK accepts messages only from `window.parent`:

    * `NAVIGATE` and `THEME` must come from the portal origin. If the origin is unknown, the SDK rejects them all (fails closed): tokens and route reporting still work, but portal navigation and live mode changes stop.
    * `AUTH_TOKEN` has no origin check, so any page that embeds your plugin can hand it a token. **Validate every token on your backend.**
    * A `NAVIGATE` path must start with `/`, not start with `//`, and not contain `..`. A `THEME` value must be `light` or `dark`. Anything else is logged and ignored.
    * The SDK posts to the portal origin, or to `*` when it's unknown, so keep secrets out of your URLs.
    * The portal accepts messages only from the origin of your embedded view URL, and sends the token only there.

    | Type | Direction | Payload | Sent |
    |---|---|---|---|
    | `REQUEST_AUTH_TOKEN` | Plugin to portal | `version` (1.2.1 and later) | At `init()` and on every refresh |
    | `AUTH_TOKEN` | Portal to plugin | `token` | In reply to each request |
    | `NAVIGATE` | Plugin to portal | `path`: pathname, query and fragment | At `init()` and on every route change |
    | `NAVIGATE` | Portal to plugin | `path`: sub-path and fragment, never a query | When the portal navigates inside the same plugin |
    | `THEME` | Portal to plugin | `theme`: `light` or `dark` | After the handshake on a page the portal loaded, and on every change |

    The `version` in `REQUEST_AUTH_TOKEN` decides what the portal sends:

    | Reported version | Portal navigation inside the plugin | `THEME` |
    |---|---|---|
    | None, or older than 1.2 | Reloads the iframe | Not sent |
    | 1.2.x | Sends `NAVIGATE` | Not sent |
    | 1.3 or later | Sends `NAVIGATE` | Sent |

    The SDK requests a new token 60 seconds before the JWT `exp`, or 4 minutes after the last token when it has no readable `exp`. It never waits longer than 24 hours.

    A hand-rolled integration must do the same:

    * Refresh the token before `exp`, capping any `setTimeout` delay at 24 hours.
    * Report a `version` only for what you handle. From 1.2 the portal stops reloading the iframe, so you must handle inbound `NAVIGATE`. From 1.3 you must handle `THEME`.
    * Accept messages only from `window.parent`, and `NAVIGATE` and `THEME` only when `event.origin` matches `portalOrigin`.
    * Post to `portalOrigin`, not to `*`.

## See also

* [Plugin system](plugin.md): configure a deployment as a plugin and choose where it appears.
* [Authentication and authorization](plugin.md#authentication-and-authorization): validate the token on your backend.
* [Embedded view URL](plugin.md#embedded-view-url): the URL your plugin loads from and the parameters the portal adds.
* [Portal API](../apis/portal-api/overview.md): the API your plugin can call with the token.

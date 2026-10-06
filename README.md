# Next.js App Router Sample

A hybrid Next.js App Router application used to qualify Builder Apps framework
detection, build output, runtime startup, routing, and lifecycle behavior.

## Requirements

- Node.js 20.9 or later
- npm 10 or later

The fixture currently pins Next.js `16.4.0-canary.52`, React `19.3.0`, and
React DOM `19.3.0`, matching the versions produced by `create-next-app@latest`
when the fixture was created.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build and verification

```powershell
npm run lint
npm run build
$env:PORT = "8080"
$env:HOSTNAME = "127.0.0.1"
npm start
```

In another terminal:

```powershell
.\scripts\verify.ps1 -BaseUrl http://127.0.0.1:8080
```

The server action is interactive and should also be checked in a browser by
submitting a value on `/server-action`.

## Builder Apps configuration

The root `builder.yaml` declares only the component name and public path. It
intentionally relies on Next.js detection for:

- The Next.js adapter and Node.js platform
- The production build command
- Static and compute outputs
- The web role
- Runtime startup, port, and health behavior

`next.config.mjs` retains `output: "standalone"` because standalone output is
application/framework configuration rather than Builder Apps configuration.

For the formal `N0` run, remove `builder.yaml` without changing any other
source or lockfile content. The checked-in file is the `M1` variant.

## Routes and features

| Route | Purpose |
|---|---|
| `/` | Prerendered landing page, public asset, and optimized image |
| `/dynamic` | Request-time server-rendered page and runtime setting |
| `/products/widget-1` | Dynamic App Router segment |
| `/api/version` | Route handler with framework and runtime identity |
| `/health` | Runtime health route handler |
| `/middleware-check` | Page with a deterministic response header from `src/proxy.js` |
| `/server-action` | Interactive React Server Action form |
| `/legacy` | Framework-configured temporary redirect to `/` |
| `/missing-page` | Custom App Router not-found behavior |

Next.js 16 renamed the `middleware.js` convention to `proxy.js`. This fixture
uses the current convention while testing the same pre-render request behavior.

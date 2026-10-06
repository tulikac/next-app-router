# Next.js App Router Sample

A hybrid Next.js App Router application used to qualify Builder Apps framework
detection, build output, runtime startup, routing, and lifecycle behavior.

## Requirements

- Node.js 24
- npm 10 or later

The fixture follows the stable framework line used by the working Builder Apps
Next.js references, with current security patches: Next.js `16.3.7`, React
`19.2.8`, and React DOM `19.2.8`.

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

The root `builder.yaml` declares one public web component and its runtime
startup contract:

- Start the standalone compute artifact with `node server.js`
- Listen on Builder Apps component port `3000`
- Report readiness through `/health`

Builder Apps runs the start command from the prepared compute artifact root,
where Next.js standalone output exposes `server.js`. It intentionally relies
on Next.js detection for:

- The Next.js adapter
- The Node.js platform and supported runtime version
- The production build command
- Static and compute outputs

The package does not declare a broad Node.js engine range because the build
provider previously resolved that range to unsupported Node.js major version
`20`. The runtime contract is explicit because the earlier inferred plan
completed the build but timed out during startup health checks.

`next.config.mjs` retains `output: "standalone"` because standalone output is
application/framework configuration rather than Builder Apps configuration.

For the formal `N0` run, remove `builder.yaml` without changing any other
source or lockfile content. The checked-in file is the current working
manifest variant.

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

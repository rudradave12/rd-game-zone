# RD Game Zone

Responsive website for RD Game Zone, Ahmedabad. It is a static Remix/Vite
single-page application with a game library, device-aware cinematic hero,
booking and pricing information, guidelines, legal pages, and light/dark mode.

## Local development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

## Production build

```bash
npm run build
```

The deployable static site is generated in `build/client`.

## Cloudflare Pages

The project includes [`wrangler.toml`](./wrangler.toml) with the same static
output directory used by the build:

```text
Production branch: main
Build command: npm run build
Build output directory: build/client
```

With the existing Cloudflare Pages Git connection, a push to `main` creates a
production deployment; other branches create preview deployments. No Cloudflare
credential or token is stored in this repository.

For a direct Wrangler deployment in the future, make sure `name` in
`wrangler.toml` exactly matches the Cloudflare Pages project name before
running an authenticated Wrangler command.

## Validation before publishing

```bash
npm run build
```

Confirm that the build succeeds, then commit and push the changes to the
connected production branch. The service worker deliberately does not cache
HTML navigations, so a newly deployed version is not held back by an old page
shell.

# Google Analytics

`src/layouts/Layout.astro` includes the Google tag for measurement ID `G-2RWQQR8ZKN` once per page, covering both `/` and `/contacto`.

The asynchronous loader and inline initialization use `is:inline` to preserve Google's snippet without Astro bundling it. They are emitted only in production builds when `SITE_ENV` is `production` (the default). Development and staging do not load analytics.

The integration initializes GA4's default page tracking. It adds no custom events, consent banner, or consent management. Configure consent requirements and verify actual event reception in Google Analytics separately.

## Verify

```sh
npm run build:production
ANALYTICS_EXPECTED=enabled node --test scripts/analytics.test.mjs
node --test scripts/contact.test.mjs
npm run build:staging
ANALYTICS_EXPECTED=disabled node --test scripts/analytics.test.mjs
npm run check
```

The rendered-HTML tests verify one loader and one initialization per production page, correct measurement ID and initialization order, absence in staging, and preservation of canonical links and structured data.

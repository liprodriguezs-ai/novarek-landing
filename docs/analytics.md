# Google Analytics

`src/layouts/Layout.astro` includes the Google tag for measurement ID `G-2RWQQR8ZKN` once per page, covering both `/` and `/contacto`.

The asynchronous loader and inline initialization use `is:inline` to preserve Google's snippet without Astro bundling it. They are emitted only in production builds when `SITE_ENV` is `production` (the default). Development and staging do not load analytics.

The integration initializes GA4's default page tracking plus these conversion events (same names as the herraga and Metatron sites):

| Event | Fired when | Params |
| --- | --- | --- |
| `contact_form_submit` | Web3Forms confirms a contact form submission (`src/components/ContactForm.astro`) | `channel: "email"` |
| `whatsapp_click` | A `wa.me` link is clicked (`src/lib/track.ts`) | `link_location`, `link_text` |
| `phone_click` | A `tel:` link is clicked | `link_location` |
| `email_click` | A `mailto:` link is clicked | `link_location` |

`contact_form_submit` is marked as a key event in GA. The form event is pushed inline (no import) so the form script stays a classic script, which `scripts/contact-submit.test.mjs` relies on. There is no consent banner or consent management.

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

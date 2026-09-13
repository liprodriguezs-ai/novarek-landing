# Cloudflare deploy configuration

This project deploys the Astro static build to Cloudflare Workers Assets with two separate Worker identities:

| Environment | Worker name | Hostname | Deploy command |
| --- | --- | --- | --- |
| Production | `novarek-landing-prod` | `novarek.mx` | `npm run deploy:production` |
| Staging | `novarek-landing-staging` | `staging.novarek.mx` | `npm run deploy:staging` |

## Workers Builds setup

Configure each Worker from the Cloudflare dashboard using Workers Builds:

### Production

- Branch: `main`
- Root directory: `/`
- Build command: leave empty
- Deploy command: `npm run deploy:production`
- Watch paths: leave default or restrict to project files if this becomes a monorepo

### Staging

- Branch: your staging branch, for example `staging` or `develop`
- Root directory: `/`
- Build command: leave empty
- Deploy command: `npm run deploy:staging`
- Watch paths: leave default or restrict to project files if this becomes a monorepo

## Domain assignment

Do not add `routes` or `custom_domain` to `wrangler.jsonc`. Assign hostnames from the Cloudflare dashboard or API after the Workers exist:

- `novarek.mx` -> `novarek-landing-prod`
- `staging.novarek.mx` -> `novarek-landing-staging`

The deploy guard fails if `routes` or `custom_domain` are added, because Wrangler synchronizes domain declarations and can unintentionally remove or reassign hostnames.

## Local commands

```sh
npm run build:production
npm run build:staging
npm run assert:deploy -- --expected-name novarek-landing-prod --env production
npm run assert:deploy -- --expected-name novarek-landing-staging --env staging
```

Use `wrangler login` before the first manual deploy.

# Revify Studio — Freelancing Website (Next.js)

A production-ready freelancing website built with **Next.js App Router**, custom theming, and deployment-focused defaults.

## What is included

- Premium, responsive marketing website (home + services + portfolio + about + contact)
- Light / dark / system mode using `next-themes`
- Accent customization (violet, blue, emerald, rose) persisted in local storage
- Contact form with:
  - Client + server validation via Zod
  - Honeypot spam protection
  - In-memory rate limiting
  - Optional webhook forwarding (`CONTACT_WEBHOOK_URL`)
- SEO baseline:
  - Metadata + OpenGraph tags
  - Dynamic icon route
  - `sitemap.xml` and `robots.txt`
- Security headers configured in `next.config.ts`
- CI workflow for lint + production build

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod
- next-themes

## Local development

```bash
npm install
npm run dev
```

Default dev port follows `PORT` env variable if provided.

## Environment variables

Copy the example file and fill values:

```bash
cp .env.example .env.local
```

Required / optional:

- `NEXT_PUBLIC_SITE_URL` (recommended): public site URL (for metadata and sitemap)
- `CONTACT_WEBHOOK_URL` (optional): where contact submissions should be sent

If webhook URL is not set, submissions are logged server-side.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

Vercel will run `npm run build` automatically and serve the site with Next.js optimizations.

### Optional: automatic production deploy from GitHub Actions

The repository includes `.github/workflows/deploy-vercel.yml` (triggers on `main`).
Add these repository secrets to enable it:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Custom domain

After first deployment:

1. Add your custom domain in Vercel project settings.
2. Update DNS records at your domain provider as instructed by Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your final domain URL.

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs:

- `npm ci`
- `npm run lint`
- `npm run build`

This ensures the project stays deploy-safe on every push and PR.

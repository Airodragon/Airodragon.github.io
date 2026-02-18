# Deployment and Health Checks

## Auto-deploy behavior

Deployments to GitHub Pages are fully automated.

- Workflow: `.github/workflows/nextjs.yml`
- Trigger: any push to `main`
- Output: `dist/public`
- Live URL: `https://airodragon.github.io/`

So yes, **every push to `main` will auto-deploy**.

## Deployment health workflow

An additional workflow now validates quality on every push/PR to `main`:

- Workflow: `.github/workflows/deployment-health.yml`
- Checks performed:
  1. `npm ci`
  2. `npm run build`
  3. Internal link validation (local preview crawl)
  4. Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
  5. Score gate thresholds:
     - Performance `>= 0.80`
     - Accessibility `>= 0.90`
     - Best Practices `>= 0.90`
     - SEO `>= 0.90`
- Artifacts uploaded on each run:
  - `lighthouse.json`
  - `lighthouse.html`
  - preview server log

## Recommended deployment flow

1. Open PR to `main` (health checks run automatically).
2. Merge PR.
3. GitHub Pages deploy runs automatically from `main`.
4. Verify production URL quickly after deploy.

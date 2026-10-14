# github-page

## Use this package when

- Writing a public web page for the app that store reviews or Google OAuth verification point to (home, privacy policy, support).

## Conventions

- Next.js static export (`output: "export"`) served from GitHub Pages under the `/log-diary` base path; link with `next/link` and root-relative paths so the base path is added for you.
- Put routes in `src/app/<route>/page.tsx` and route-only components in that route's `_components/<name>/` folder with its own `index.ts`.
- Put components shared by two or more routes in `src/components/<name>/`.
- When adding a route, add its path to `ROUTE_PATHS` in `src/app/sitemap.ts`.
- Deploy by running `.github/workflows/deploy-github-page.yml` manually (`workflow_dispatch`) from the GitHub Actions tab.

# @log-diary/shared-biome-config

## Use this package when

- Changing lint or format rules for the whole monorepo — edit `base.json`.

## Conventions

- Put rules for a single package in that package's `biome.json`.
- The root `biome.json` (`root: true`) and every package's `biome.json` (`root: false`) extend `@log-diary/shared-biome-config/base`.
- After editing, run `npm run check` from the repo root.

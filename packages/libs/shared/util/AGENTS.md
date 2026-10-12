# @log-diary/shared-util

## Use this package when

- A plain TypeScript function is used by two or more packages.

## Conventions

- One folder per function under `src/<group>/<name>/` with its own `index.ts`.
- Exposed via group sub exports (`./strings/*`). A new group needs a new `exports` entry in `package.json`.

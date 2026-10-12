# @log-diary/shared-const

## Use this package when

- A plain TypeScript constant is used by two or more packages.

## Conventions

- One folder per constant under `src/<group>/<name>/` with its own `index.ts`.
- Exposed via group sub exports (`./app/*`). A new group needs a new `exports` entry in `package.json`.

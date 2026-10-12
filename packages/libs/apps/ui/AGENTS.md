# @log-diary/apps-ui

## Use this package when

- Writing a React Native UI component that is reused across screens or apps and stays independent of any single app's routes, data, or theme.

## Conventions

- Keep `react` and `react-native` in `peerDependencies`, pinned to the app's versions.
- One folder per component under `src/<group>/<name>/` with its own `index.ts`; exposed via group sub exports (`./texts/*`). A new group needs a new `exports` entry in `package.json`.

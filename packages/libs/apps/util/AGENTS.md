# @log-diary/apps-util

## Use this package when

- Writing a non-UI helper (function or hook) that imports React / React Native / `expo-*`, is reused across screens or apps, and stays independent of any single app's routes, data, or state.

## Conventions

- Keep `react` and `react-native` in `peerDependencies`, pinned to the app's versions.
- One folder per function under `src/<group>/<name>/` with its own `index.ts`; exposed via group sub exports (`./strings/*`). A new group needs a new `exports` entry in `package.json`.

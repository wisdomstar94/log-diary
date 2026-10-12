This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — check the versioned docs first

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need and base every answer on those docs.

## Commands

Use `bunx` in place of `npx` when `bun.lock` is present.

This repo is an npm workspaces monorepo. Run `npm install` from the root; run Expo commands from the app package directory (`packages/apps/log-diary`).

| Path | Package | Use when |
| --- | --- | --- |
| `packages/apps/log-diary` | `log-diary` (Expo app) | Screens and app-only code |
| `packages/libs/shared/const` | `@log-diary/shared-const` | Plain TypeScript constants used by two or more packages |
| `packages/libs/shared/util` | `@log-diary/shared-util` | Plain TypeScript functions used by two or more packages |
| `packages/libs/shared/biome-config` | `@log-diary/shared-biome-config` (shared Biome config, `base.json`) | Monorepo-wide lint/format rules |
| `packages/libs/apps/const` | `@log-diary/apps-const` | Reusable constants that depend on React/RN/`expo-*` |
| `packages/libs/apps/ui` | `@log-diary/apps-ui` | Reusable React Native UI |
| `packages/libs/apps/util` | `@log-diary/apps-util` | Reusable non-UI helpers (functions, hooks) that depend on React/RN/`expo-*` |
| `packages/libs/apps/turbo-modules/*` | `@log-diary/turbo-module-<name>` | Custom native modules, one package each |

`libs/shared` holds plain TypeScript code; `libs/apps` holds code that depends on React / React Native / `expo-*`. Each package (and `turbo-modules/`) has its own `AGENTS.md` — read it before adding code there.

Libraries expose group-level sub exports pointing directly at TypeScript source, e.g. `@log-diary/apps-ui/texts/sample-text` (except `shared-biome-config`, which exports `./base`).

```bash
npx expo install <package>  # add every dependency with this — resolves SDK-compatible versions
npx expo start              # start the dev server
npm run check               # Biome lint + format check (run from root)
npm run format              # Biome format --write
npm run typecheck           # tsc --noEmit in every workspace (run from root)
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

Lint and format use **Biome**. The shared config lives in `packages/libs/shared/biome-config/base.json`; the root `biome.json` (`root: true`) and each package's `biome.json` (`root: false`) extend `@log-diary/shared-biome-config/base`. A new package needs its own `biome.json` and the config package as a devDependency.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `packages/apps/log-diary/src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — everything runs in the cloud, with local Xcode and Android Studio optional. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Custom native modules

When a native feature needs code that existing libraries lack, write the module yourself — one package per module under `packages/libs/apps/turbo-modules/`.

- Default to the **Expo Modules API**. Use a raw Turbo Module (Codegen spec) only when the module needs C++. Docs: https://docs.expo.dev/modules/overview.md
- Scaffold from the repo root: `npx create-expo-module@latest packages/libs/apps/turbo-modules/<module-name>`, then
  - name the package `@log-diary/turbo-module-<module-name>`, `"private": true`
  - delete the generated `example/` app so the monorepo keeps a single React Native copy
  - move `react`, `react-native`, `expo` to `peerDependencies` (pinned, same versions as the app) so only the app's copy is linked
  - add `biome.json` (`root: false`) and `@log-diary/shared-biome-config` as a devDependency
- Reference it from the app with `"@log-diary/turbo-module-<module-name>": "*"`, then rebuild the dev client (`npx expo run:ios|android`) — Expo Go cannot load it.
- After installing, run `npm why react-native` and confirm a single version.

## Rules

- Configure native behavior in `app.json` and config plugins; `ios/` and `android/` are generated by Continuous Native Generation.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Writing AGENTS.md

- Write every rule as a positive instruction: say what to do and where it goes, e.g. "Put plain TypeScript constants used by two or more packages in `@log-diary/shared-const`."
- Describe each package by what belongs in it, using two sections: `## Use this package when` and `## Conventions`.
- When adding a package, give it an `AGENTS.md` with those two sections and add its row to the package table above.

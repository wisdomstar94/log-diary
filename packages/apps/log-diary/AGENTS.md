# log-diary (Expo app)

## Use this package when

- Adding or changing a screen or navigator — routes live in `src/app/` only.
- Writing code used by this app alone: app-specific components, hooks, theme, app config (`app.json`).

## Conventions

- Whenever you increase `version` in `packages/apps/log-diary/package.json`, also increment `expo.ios.buildNumber` in `packages/apps/log-diary/app.json` by 1 in the same change. Keep the build number as a numeric string (for example, `"2"` → `"3"`).
- Put non-route code (components, hooks, utils) in `src/`, outside `src/app/`.
- Keep each screen route file in `src/app/` (every file except `_layout.tsx`) to a single re-export of a screen from `src/screens/<name>-screen/`; put the screen's parts in that folder's `_components/` and `_hooks/`.
- Put each piece of `src/` in the folder that matches its role:

  | Folder | Put here |
  | --- | --- |
  | `src/db/` | SQLite access — one function per folder, grouped by table (`entries/`, `day-titles/`, `settings/`). Schema and migrations live in `open-database/_utils/migrate-database/` |
  | `src/hooks/` | App-wide hooks. Read DB data through `use-db-query`, which refetches after every DB write |
  | `src/contexts/` | React contexts for app-wide managers (settings, toast, theme name) |
  | `src/components/` | App-wide UI parts that read the theme tokens |
  | `src/constants/` | Theme tokens (`theme/`), fonts, default settings, fixed identifiers |
  | `src/utils/` | Plain helpers, grouped by subject (`dates/`, `strings/`, `exports/`, …) |
  | `src/types/` | Shared TypeScript types |
  | `src/notifications/` | Android persistent quick-write notification |
  | `src/backup/` · `src/drive/` · `src/google/` | Backup payload and restore, Google Drive REST calls, Google sign-in |
  | `src/widgets/` | iOS widgets built with `expo-widgets` (`'widget'` directive) |

- Call write functions in `src/db/` to change data; they notify `data-change-emitter` so screens, the notification, and the widget stay in sync.
- Change a manager's state only through its `change*` function and pass `{ from }` to describe the caller.
- Define background tasks (`TaskManager.defineTask`) in the entry file `index.ts`, which loads before `expo-router/entry` runs the app.
- Load native-only modules (`react-native-nitro-google-signin`, `expo-widgets`) with a dynamic `import()` and skip them in Expo Go, so the app still runs there.
- Add Expo/RN dependencies with `npx expo install <package>` from this directory, then pin the exact version in `package.json`.
- Reference internal packages with `"*"`.

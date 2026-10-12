# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

This repo is an npm workspaces monorepo.

- `packages/apps/log-diary` — Expo app
- `packages/libs/shared/const` — `@log-diary/shared-const`
- `packages/libs/apps/ui` — `@log-diary/apps-ui`

1. Install dependencies (from the repo root)

   ```bash
   npm install
   ```

2. Start the app (pick an environment — see below)

   ```bash
   npm run app:start:local
   ```

### Environments (local · dev · prod)

`APP_VARIANT` picks the environment. It is required: any Expo command run without it stops with an error, so use the scripts below.

| APP_VARIANT | App name |
| --- | --- |
| `local` | 로그일기 Local |
| `dev` | 로그일기 Dev |
| `prod` | 로그일기 |

Every variant uses the same bundle id / package `com.wisdomstar94.logdiary`, so installing one variant replaces the other on the device and keeps its data.

Copy `packages/apps/log-diary/envs/example.env` to `envs/<variant>.env` and fill it in. Values already set in the shell or CI override the file.

| Situation | Command (from the repo root, `<v>` = local · dev · prod) |
| --- | --- |
| Expo Go, or attach to an installed dev build | `npm run app:start:<v>` |
| Web | `npm run app:web:<v>` |
| Install a dev build on a simulator/device | `npm run app:ios:<v>` · `npm run app:android:<v>` |
| Run a Release build on a simulator/device | `npm run app:ios:<v>:release` · `npm run app:android:<v>:release` |
| Store artifacts (IPA · AAB) | `npm run app:build:ios:<v>` · `npm run app:build:android:<v>` |

- `ios:*` · `android:*` · `build:*` run `expo prebuild --clean` first, because `expo run` keeps an existing native folder and would build it with the previous variant's config.
- A dev build loads its JS config from the dev server, so start the same variant you installed (`app:ios:dev` → `app:start:dev`).
- `build:ios:*` needs `APPLE_TEAM_ID`; set the `APP_STORE_CONNECT_API_*` keys to sign without an Xcode login (CI). Output : `packages/apps/log-diary/build/release/ios/`.
- `build:android:*` needs the four `LOG_DIARY_UPLOAD_*` keys. Output : `packages/apps/log-diary/android/app/build/outputs/bundle/release/app-release.aab`.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **packages/apps/log-diary/src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project -w log-diary
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

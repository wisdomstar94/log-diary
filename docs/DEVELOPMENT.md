# 로그일기 개발 안내

## 목차

- [저장소 구성](#저장소-구성)
- [시작하기](#시작하기)
- [환경 (local · dev · prod)](#환경-local--dev--prod)
- [실행과 빌드](#실행과-빌드)
- [검사](#검사)

## 저장소 구성

npm workspaces 모노레포입니다. 패키지별 역할은 [`AGENTS.md`](../AGENTS.md) 의 패키지 표를 참고하세요.

- `packages/apps/log-diary` — Expo 앱
- `packages/webs/github-page` — GitHub Pages 정책 페이지(홈 · 개인정보처리방침 · 고객지원)
- `packages/libs/*` — 앱과 웹이 함께 쓰는 라이브러리

화면은 Expo Router 파일 기반 라우팅으로, `packages/apps/log-diary/src/app/` 아래에 있습니다.

## 시작하기

1. 저장소 루트에서 의존성을 설치합니다.

   ```bash
   npm install
   ```

2. 환경을 골라 앱을 실행합니다. (아래 「환경」 참고)

   ```bash
   npm run app:start:local
   ```

## 환경 (local · dev · prod)

`APP_VARIANT` 가 환경을 정합니다. **필수 값**이라 없이 Expo 명령을 실행하면 에러로 멈추므로, 아래 스크립트를 쓰세요.

| APP_VARIANT | 앱 이름 |
| --- | --- |
| `local` | 로그일기 Local |
| `dev` | 로그일기 Dev |
| `prod` | 로그일기 |

모든 환경이 같은 bundle id / package `com.wisdomstar94.logdiary` 를 씁니다. 그래서 한 환경을 설치하면 기기의 다른 환경을 덮어쓰고, 데이터는 유지됩니다.

`packages/apps/log-diary/envs/example.env` 를 `envs/<variant>.env` 로 복사해 채우세요. 셸이나 CI 에 이미 설정된 값이 파일보다 우선합니다.

## 실행과 빌드

저장소 루트에서 실행합니다. `<v>` 는 `local` · `dev` · `prod` 입니다.

| 상황 | 명령 |
| --- | --- |
| Expo Go, 또는 설치된 개발 빌드에 연결 | `npm run app:start:<v>` |
| 웹 | `npm run app:web:<v>` |
| 시뮬레이터·기기에 개발 빌드 설치 | `npm run app:ios:<v>` · `npm run app:android:<v>` |
| 시뮬레이터·기기에서 Release 빌드 실행 | `npm run app:ios:<v>:release` · `npm run app:android:<v>:release` |
| 스토어 제출용 파일 (IPA · AAB) | `npm run app:build:ios:<v>` · `npm run app:build:android:<v>` |
| 정책 페이지 개발 서버 · 빌드 | `npm run web:github-page:dev` · `npm run web:github-page:build` |

- `ios:*` · `android:*` · `build:*` 는 먼저 `expo prebuild --clean` 을 실행합니다. `expo run` 은 기존 네이티브 폴더를 그대로 두어, 이전 환경의 설정으로 빌드되기 때문입니다.
- 개발 빌드는 JS 설정을 개발 서버에서 받으므로, **설치한 환경과 같은 환경으로 서버를 띄우세요.** (`app:ios:dev` → `app:start:dev`)
- `build:ios:*` 는 `APPLE_TEAM_ID` 가 필요합니다. Xcode 로그인 없이 서명하려면(CI) `APP_STORE_CONNECT_API_*` 키를 설정하세요. 결과물 : `packages/apps/log-diary/build/release/ios/`
- `build:android:*` 는 `LOG_DIARY_UPLOAD_*` 키 4개가 필요합니다. 결과물 : `packages/apps/log-diary/android/app/build/outputs/bundle/release/app-release.aab`

## 검사

작업을 마치기 전에 저장소 루트에서 실행합니다.

```bash
npm run check      # Biome 린트 + 포맷 검사
npm run typecheck  # 모든 워크스페이스 tsc --noEmit
```

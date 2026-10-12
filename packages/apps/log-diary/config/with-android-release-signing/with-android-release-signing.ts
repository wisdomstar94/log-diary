import { type ConfigPlugin, withAppBuildGradle } from "expo/config-plugins.js";

const DEBUG_SIGNING_ANCHOR = `            keyPassword 'android'
        }
`;

// 서명 정보는 prebuild 결과물에 남기지 않고, gradle 실행 시점의 환경변수에서 읽는다.
const RELEASE_SIGNING_CONFIG = `        if (System.getenv('LOG_DIARY_UPLOAD_STORE_FILE')) {
            release {
                storeFile file(System.getenv('LOG_DIARY_UPLOAD_STORE_FILE'))
                storePassword System.getenv('LOG_DIARY_UPLOAD_STORE_PASSWORD')
                keyAlias System.getenv('LOG_DIARY_UPLOAD_KEY_ALIAS')
                keyPassword System.getenv('LOG_DIARY_UPLOAD_KEY_PASSWORD')
            }
        }
`;

const RELEASE_BUILD_TYPE_ANCHOR = `            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug`;

const RELEASE_BUILD_TYPE_SIGNING = `            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.findByName('release') ?: signingConfigs.debug`;

function replaceOnce(contents: string, anchor: string, replacement: string) {
  if (!contents.includes(anchor)) {
    throw new Error(
      "android/app/build.gradle 템플릿이 바뀌어 release 서명 설정을 넣을 수 없습니다. with-android-release-signing 을 확인해 주세요.",
    );
  }
  return contents.replace(anchor, replacement);
}

export const withAndroidReleaseSigning: ConfigPlugin = (config) =>
  withAppBuildGradle(config, (gradleConfig) => {
    if (gradleConfig.modResults.contents.includes("LOG_DIARY_UPLOAD_STORE_FILE")) {
      return gradleConfig;
    }
    const withSigningConfig = replaceOnce(
      gradleConfig.modResults.contents,
      DEBUG_SIGNING_ANCHOR,
      `${DEBUG_SIGNING_ANCHOR}${RELEASE_SIGNING_CONFIG}`,
    );
    gradleConfig.modResults.contents = replaceOnce(
      withSigningConfig,
      RELEASE_BUILD_TYPE_ANCHOR,
      RELEASE_BUILD_TYPE_SIGNING,
    );
    return gradleConfig;
  });

import type { ConfigContext, ExpoConfig } from "expo/config";

import { getVariantName } from "./config/get-variant-name/index.ts";
import { loadVariantEnv } from "./config/load-variant-env/index.ts";
import { readRequiredEnv } from "./config/read-required-env/index.ts";
import { withAndroidReleaseSigning } from "./config/with-android-release-signing/index.ts";
import { version } from "./package.json";

function readGoogleClientIds(isRequired: boolean) {
  if (isRequired) {
    return {
      webClientId: readRequiredEnv("GOOGLE_WEB_CLIENT_ID"),
      iosClientId: readRequiredEnv("GOOGLE_IOS_CLIENT_ID"),
    };
  }
  return {
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID ?? "",
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID ?? "",
  };
}

export default ({ config, projectRoot }: ConfigContext): ExpoConfig => {
  const variant = loadVariantEnv(projectRoot);
  // local · dev 는 OAuth 클라이언트가 없어도 Google 연동만 끈 채 실행되게 한다.
  const googleClientIds = readGoogleClientIds(variant === "prod");
  // 플러그인이 Podfile 의 modular_headers 설정도 넣으므로, ID 가 없어도 자리표시 scheme 으로 항상 적용한다.
  const googleIosClientKey =
    googleClientIds.iosClientId === ""
      ? "not-configured"
      : googleClientIds.iosClientId.replace(".apps.googleusercontent.com", "");
  const appleTeamId = process.env.APPLE_TEAM_ID ?? "";

  return withAndroidReleaseSigning({
    ...config,
    name: getVariantName(variant, config.name ?? ""),
    slug: config.slug ?? "",
    version,
    ios: {
      ...config.ios,
      ...(appleTeamId === "" ? {} : { appleTeamId }),
    },
    plugins: [
      ...(config.plugins ?? []),
      [
        "react-native-nitro-google-signin",
        { iosUrlScheme: `com.googleusercontent.apps.${googleIosClientKey}` },
      ],
    ],
    extra: {
      ...config.extra,
      appVariant: variant,
      googleWebClientId: googleClientIds.webClientId,
      googleIosClientId: googleClientIds.iosClientId,
    },
  });
};

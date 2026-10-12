import type { ConfigContext } from "expo/config";
import { version } from "./package.json";

function readRequiredEnv(name: string) {
  const value = process.env[name] ?? "";
  if (value === "") {
    throw new Error(
      `${name} 가 설정되지 않았습니다. packages/apps/log-diary/.env.example 을 참고해 .env 를 만들어 주세요.`,
    );
  }
  return value;
}

export default ({ config }: ConfigContext) => {
  const googleWebClientId = readRequiredEnv("GOOGLE_WEB_CLIENT_ID");
  const googleIosClientId = readRequiredEnv("GOOGLE_IOS_CLIENT_ID");
  const googleIosUrlScheme = `com.googleusercontent.apps.${googleIosClientId.replace(".apps.googleusercontent.com", "")}`;

  return {
    ...config,
    version,
    plugins: [
      ...(config.plugins ?? []),
      ["react-native-nitro-google-signin", { iosUrlScheme: googleIosUrlScheme }],
    ],
    extra: {
      ...config.extra,
      googleWebClientId,
      googleIosClientId,
    },
  };
};

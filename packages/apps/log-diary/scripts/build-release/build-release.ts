import { join } from "node:path";

import { loadVariantEnv } from "../../config/load-variant-env/index.ts";
import { readRequiredEnv } from "../../config/read-required-env/index.ts";
import { archiveIos } from "./_utils/archive-ios/index.ts";
import { buildAndroidBundle } from "./_utils/build-android-bundle/index.ts";
import { runCommand } from "./_utils/run-command/index.ts";

const ANDROID_SIGNING_ENV_NAMES = [
  "LOG_DIARY_UPLOAD_STORE_FILE",
  "LOG_DIARY_UPLOAD_STORE_PASSWORD",
  "LOG_DIARY_UPLOAD_KEY_ALIAS",
  "LOG_DIARY_UPLOAD_KEY_PASSWORD",
];

const projectRoot = join(import.meta.dirname, "../..");
const platform = process.argv[2];
const variant = loadVariantEnv(projectRoot);

if (platform === "android") {
  for (const name of ANDROID_SIGNING_ENV_NAMES) {
    readRequiredEnv(name);
  }
  runCommand("npx", ["expo", "prebuild", "--clean", "--platform", "android"], projectRoot);
  console.log(`[${variant}] AAB : ${buildAndroidBundle(projectRoot)}`);
} else if (platform === "ios") {
  const teamId = readRequiredEnv("APPLE_TEAM_ID");
  runCommand("npx", ["expo", "prebuild", "--clean", "--platform", "ios"], projectRoot);
  console.log(`[${variant}] IPA 폴더 : ${archiveIos(projectRoot, teamId)}`);
} else {
  throw new Error("플랫폼을 ios 또는 android 로 넘겨 주세요. 예 : build-release.ts ios");
}

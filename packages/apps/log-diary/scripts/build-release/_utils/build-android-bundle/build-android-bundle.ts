import { homedir } from "node:os";
import { join } from "node:path";

import { runCommand } from "../run-command/index.ts";

export function buildAndroidBundle(projectRoot: string) {
  // prebuild --clean 이 local.properties 를 지워, gradle 은 ANDROID_HOME 으로만 SDK 를 찾는다.
  process.env.ANDROID_HOME ||= join(homedir(), "Library/Android/sdk");
  runCommand("./gradlew", ["bundleRelease"], join(projectRoot, "android"));
  return join(projectRoot, "android/app/build/outputs/bundle/release/app-release.aab");
}

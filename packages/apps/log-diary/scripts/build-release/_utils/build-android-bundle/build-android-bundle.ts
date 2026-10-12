import { join } from "node:path";

import { runCommand } from "../run-command/index.ts";

export function buildAndroidBundle(projectRoot: string) {
  runCommand("./gradlew", ["bundleRelease"], join(projectRoot, "android"));
  return join(projectRoot, "android/app/build/outputs/bundle/release/app-release.aab");
}

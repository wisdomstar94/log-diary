import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

import { runCommand } from "../run-command/index.ts";

function readAuthenticationArgs() {
  const keyPath = process.env.APP_STORE_CONNECT_API_KEY_PATH ?? "";
  const keyId = process.env.APP_STORE_CONNECT_API_KEY_ID ?? "";
  const issuerId = process.env.APP_STORE_CONNECT_API_ISSUER_ID ?? "";
  const hasApiKey = (() => {
    if (keyPath === "") {
      return false;
    }
    if (keyId === "") {
      return false;
    }
    if (issuerId === "") {
      return false;
    }
    return true;
  })();
  if (!hasApiKey) {
    return [];
  }
  return [
    "-authenticationKeyPath",
    keyPath,
    "-authenticationKeyID",
    keyId,
    "-authenticationKeyIssuerID",
    issuerId,
  ];
}

function createExportOptions(teamId: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>teamID</key>
  <string>${teamId}</string>
  <key>signingStyle</key>
  <string>automatic</string>
</dict>
</plist>
`;
}

export function archiveIos(projectRoot: string, teamId: string) {
  const iosDir = join(projectRoot, "ios");
  const workspaceFile = readdirSync(iosDir).find((file) => file.endsWith(".xcworkspace"));
  if (workspaceFile === undefined) {
    throw new Error("ios/ 에서 .xcworkspace 를 찾지 못했습니다.");
  }
  const scheme = basename(workspaceFile, ".xcworkspace");
  const outputDir = join(projectRoot, "build/release/ios");
  const archivePath = join(outputDir, `${scheme}.xcarchive`);
  const exportOptionsPath = join(outputDir, "ExportOptions.plist");
  const authenticationArgs = readAuthenticationArgs();

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(exportOptionsPath, createExportOptions(teamId));

  runCommand(
    "xcodebuild",
    [
      "-workspace",
      join(iosDir, workspaceFile),
      "-scheme",
      scheme,
      "-configuration",
      "Release",
      "-destination",
      "generic/platform=iOS",
      "-archivePath",
      archivePath,
      "-allowProvisioningUpdates",
      ...authenticationArgs,
      "archive",
    ],
    projectRoot,
  );
  runCommand(
    "xcodebuild",
    [
      "-exportArchive",
      "-archivePath",
      archivePath,
      "-exportPath",
      outputDir,
      "-exportOptionsPlist",
      exportOptionsPath,
      "-allowProvisioningUpdates",
      ...authenticationArgs,
    ],
    projectRoot,
  );
  return outputDir;
}

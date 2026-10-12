import * as Network from "expo-network";

import { BackupVersionTooNewError } from "@/backup/backup-version-too-new-error";
import { DriveRequestError } from "@/drive/drive-request-error";
import type { BackupFailureKind } from "@/types/backup-failure";

export async function getBackupFailureKind(error: unknown): Promise<BackupFailureKind> {
  if (error instanceof BackupVersionTooNewError) {
    return "outdated";
  }
  if (error instanceof DriveRequestError && error.body.includes("storageQuotaExceeded")) {
    return "quota";
  }
  // fetch 는 연결 자체가 실패하면 TypeError("Network request failed") 를 던진다.
  if (error instanceof TypeError) {
    return "network";
  }
  const isConnected = await Network.getNetworkStateAsync()
    .then((state) => state.isConnected !== false)
    .catch(() => true);
  return isConnected ? "unknown" : "network";
}

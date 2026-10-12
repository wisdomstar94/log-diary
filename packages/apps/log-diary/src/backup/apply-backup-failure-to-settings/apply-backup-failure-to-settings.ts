import { BackupFailedError } from "@/backup/backup-failed-error";
import type { SettingsManager } from "@/contexts/settings-manager-context";

/** runBackup 이 설정에 남긴 실패를 화면 상태에도 반영한다 */
export function applyBackupFailureToSettings(
  settingsManager: SettingsManager,
  error: unknown,
  from: string,
) {
  if (!(error instanceof BackupFailedError)) {
    return;
  }
  settingsManager.changeSetting("lastBackupFailure", error.failure, { from });
}

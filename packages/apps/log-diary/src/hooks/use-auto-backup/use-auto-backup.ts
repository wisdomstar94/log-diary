import { useEffect, useEffectEvent } from "react";
import { AppState } from "react-native";

import { applyBackupFailureToSettings } from "@/backup/apply-backup-failure-to-settings";
import { runAutoBackupIfDue } from "@/backup/run-auto-backup-if-due";
import { syncAutoBackupTask } from "@/backup/sync-auto-backup-task";
import type { SettingsManager } from "@/contexts/settings-manager-context";

/** 앱을 열거나 앱으로 돌아올 때 24시간이 지났으면 백업하고, 백그라운드 작업 등록을 설정과 맞춘다 */
export function useAutoBackup(settingsManager: SettingsManager) {
  const { autoBackup, driveAccountEmail } = settingsManager.settings;
  const isEnabled = (() => {
    if (driveAccountEmail === null) {
      return false;
    }
    return autoBackup;
  })();

  const backupIfDue = useEffectEvent(async () => {
    try {
      const backedUpAt = await runAutoBackupIfDue();
      if (backedUpAt === null) {
        return;
      }
      settingsManager.changeSetting("lastBackupAt", backedUpAt, { from: "자동 백업" });
      settingsManager.changeSetting("lastBackupFailure", null, { from: "자동 백업" });
    } catch (error) {
      applyBackupFailureToSettings(settingsManager, error, "자동 백업 실패");
      if (__DEV__) {
        console.warn("자동 백업 실패", error);
      }
    }
  });

  useEffect(() => {
    syncAutoBackupTask(isEnabled).catch(() => {});
    if (!isEnabled) {
      return;
    }
    backupIfDue();
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        backupIfDue();
      }
    });
    return () => subscription.remove();
  }, [isEnabled]);
}

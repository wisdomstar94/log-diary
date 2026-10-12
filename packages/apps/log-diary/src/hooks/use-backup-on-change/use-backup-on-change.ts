import * as Network from "expo-network";
import { useEffect, useEffectEvent, useRef } from "react";
import { AppState } from "react-native";

import { applyBackupFailureToSettings } from "@/backup/apply-backup-failure-to-settings";
import { markUnsyncedChange } from "@/backup/mark-unsynced-change";
import { runChangeBackup } from "@/backup/run-change-backup";
import type { SettingsManager } from "@/contexts/settings-manager-context";
import { subscribeDataChanged } from "@/db/data-change-emitter";
import { getSettings } from "@/db/settings/get-settings";

const DEBOUNCE_MS = 5000;

/** 사용자가 기록을 바꾸면 5초 뒤 백업하고, 실패했던 변경은 앱 복귀 · 네트워크 연결 시 다시 올린다 */
export function useBackupOnChange(settingsManager: SettingsManager) {
  const { driveAccountEmail, backupOnChange, isBackupImportPending } = settingsManager.settings;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEnabled = (() => {
    if (driveAccountEmail === null) {
      return false;
    }
    if (!backupOnChange) {
      return false;
    }
    return !isBackupImportPending;
  })();

  const backup = useEffectEvent(async () => {
    try {
      const backedUpAt = await runChangeBackup();
      if (backedUpAt === null) {
        return;
      }
      settingsManager.changeSetting("lastBackupAt", backedUpAt, { from: "변경 시 백업" });
      settingsManager.changeSetting("lastBackupFailure", null, { from: "변경 시 백업" });
    } catch (error) {
      applyBackupFailureToSettings(settingsManager, error, "변경 시 백업 실패");
      if (__DEV__) {
        console.warn("변경 시 백업 실패", error);
      }
    }
  });

  const retryIfUnsynced = useEffectEvent(async () => {
    const settings = await getSettings();
    if (!settings.hasUnsyncedChanges) {
      return;
    }
    backup();
  });

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    retryIfUnsynced();
    const unsubscribeData = subscribeDataChanged((source) => {
      if (source !== "user") {
        return;
      }
      markUnsyncedChange();
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(backup, DEBOUNCE_MS);
    });
    const appStateSubscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        retryIfUnsynced();
      }
    });
    const networkSubscription = Network.addNetworkStateListener((state) => {
      if (state.isConnected) {
        retryIfUnsynced();
      }
    });
    return () => {
      unsubscribeData();
      appStateSubscription.remove();
      networkSubscription.remove();
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isEnabled]);
}

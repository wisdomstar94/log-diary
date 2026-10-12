import { useEffect, useEffectEvent, useState } from "react";
import { AppState } from "react-native";

import { applyBackupFailureToSettings } from "@/backup/apply-backup-failure-to-settings";
import { runBackup } from "@/backup/run-backup";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { getSettings } from "@/db/settings/get-settings";

/**
 * 아직 알리지 않은 백업 실패가 있으면 알림창을 띄운다.
 * 백그라운드 작업이 남긴 실패는 앱으로 돌아올 때 설정을 다시 읽어 반영한다.
 */
export function useBackupFailureDialog() {
  const settingsManager = useSettingsManagerContext();
  const toastManager = useToastManagerContext();
  const { lastBackupFailure, driveAccountEmail } = settingsManager.settings;
  const [isVisible, setIsVisible] = useState(false);
  const isNotifyNeeded = (() => {
    if (driveAccountEmail === null) {
      return false;
    }
    if (lastBackupFailure === null) {
      return false;
    }
    return !lastBackupFailure.isNotified;
  })();

  // setIsVisible 은 이 함수에서만 호출한다.
  function changeIsVisible(nextIsVisible: boolean, options?: { from: string }) {
    if (__DEV__) {
      console.log("changeBackupFailureDialogVisible", nextIsVisible, "from", options?.from);
    }
    setIsVisible(nextIsVisible);
  }

  const notify = useEffectEvent(() => {
    if (lastBackupFailure === null) {
      return;
    }
    changeIsVisible(true, { from: "알리지 않은 백업 실패" });
    settingsManager.changeSetting(
      "lastBackupFailure",
      { ...lastBackupFailure, isNotified: true },
      { from: "백업 실패 알림창 표시" },
    );
  });

  const reloadFailure = useEffectEvent(async () => {
    const stored = (await getSettings()).lastBackupFailure;
    if (stored?.at === lastBackupFailure?.at) {
      return;
    }
    settingsManager.changeSetting("lastBackupFailure", stored, {
      from: "앱 복귀 — 실패 기록 읽기",
    });
  });

  useEffect(() => {
    if (!isNotifyNeeded) {
      return;
    }
    notify();
  }, [isNotifyNeeded]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        reloadFailure();
      }
    });
    return () => subscription.remove();
  }, []);

  async function retryNow() {
    changeIsVisible(false, { from: "지금 바로 백업하기" });
    toastManager.showToast("백업하는 중…", { from: "실패 알림창 — 백업 시작" });
    try {
      const result = await runBackup({ isFailureNotified: true });
      settingsManager.changeSetting("lastBackupAt", result.backedUpAt, {
        from: "실패 알림창 — 백업",
      });
      settingsManager.changeSetting("lastBackupFailure", null, { from: "실패 알림창 — 백업" });
      settingsManager.changeSetting("hasUnsyncedChanges", false, { from: "실패 알림창 — 백업" });
      toastManager.showToast(`백업 완료 · ${result.entryCount}개 기록`, {
        from: "실패 알림창 — 백업",
      });
    } catch (error) {
      applyBackupFailureToSettings(settingsManager, error, "실패 알림창 — 백업 실패");
      changeIsVisible(true, { from: "지금 바로 백업하기 실패" });
    }
  }

  return {
    isVisible,
    failureKind: lastBackupFailure?.kind ?? null,
    close: () => changeIsVisible(false, { from: "백업 실패 알림창 닫기" }),
    retryNow,
  };
}

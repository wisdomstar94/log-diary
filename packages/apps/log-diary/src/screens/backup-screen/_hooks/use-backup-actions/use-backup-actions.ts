import { useState } from "react";

import { applyBackupFailureToSettings } from "@/backup/apply-backup-failure-to-settings";
import { BackupFailedError } from "@/backup/backup-failed-error";
import { getBackupFailureLabel } from "@/backup/get-backup-failure-label";
import { importRemoteBackup } from "@/backup/import-remote-backup";
import { runBackup } from "@/backup/run-backup";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { findBackupFile } from "@/drive/find-backup-file";
import { connectGoogleAccount } from "@/google/connect-google-account";
import { disconnectGoogleAccount } from "@/google/disconnect-google-account";
import { getErrorMessage } from "@/utils/errors/get-error-message";

/** connect : 연결 직후 기존 백업 발견 · manual : `백업에서 가져오기` 버튼 */
export type ImportConfirmKind = "connect" | "manual";

export function useBackupActions(params: { onBackedUp: () => void }) {
  const settingsManager = useSettingsManagerContext();
  const toastManager = useToastManagerContext();
  const [isBusy, setIsBusy] = useState(false);
  const [importConfirmKind, setImportConfirmKind] = useState<ImportConfirmKind | null>(null);
  const [isDisconnectConfirmVisible, setIsDisconnectConfirmVisible] = useState(false);

  async function runTask(task: () => Promise<void>, failMessage: string, from: string) {
    setIsBusy(true);
    try {
      await task();
    } catch (error) {
      toastManager.showToast(getFailMessage(error, failMessage), { from });
    } finally {
      setIsBusy(false);
    }
  }

  function connect() {
    runTask(
      async () => {
        const account = await connectGoogleAccount();
        if (account === null) {
          return;
        }
        // 계정을 저장하기 전에 대기 표시를 먼저 남겨, 합치기 전에 자동 백업이 돌지 않게 한다.
        const hasRemoteBackup = (await findBackupFile()) !== null;
        settingsManager.changeSetting("isBackupImportPending", hasRemoteBackup, {
          from: "백업 — 연결",
        });
        settingsManager.changeSetting("driveAccountEmail", account.email, { from: "백업 — 연결" });
        if (hasRemoteBackup) {
          setImportConfirmKind("connect");
          return;
        }
        toastManager.showToast("Google 드라이브 연결됨", { from: "백업 — 연결" });
      },
      "Google 계정을 연결하지 못했어요",
      "백업 — 연결 실패",
    );
  }

  function backupNow() {
    // 지금 백업도 드라이브 백업을 먼저 합치므로, 합치기를 미뤄 둔 상태면 확인 창부터 띄운다.
    if (settingsManager.settings.isBackupImportPending) {
      setImportConfirmKind("manual");
      return;
    }
    runTask(
      async () => {
        try {
          const result = await runBackup({ isFailureNotified: true });
          settingsManager.changeSetting("lastBackupAt", result.backedUpAt, {
            from: "백업 — 지금 백업",
          });
          settingsManager.changeSetting("lastBackupFailure", null, { from: "백업 — 지금 백업" });
          params.onBackedUp();
          toastManager.showToast(`백업 완료 · ${result.entryCount}개 기록`, {
            from: "백업 — 지금 백업",
          });
        } catch (error) {
          applyBackupFailureToSettings(settingsManager, error, "백업 — 지금 백업 실패");
          throw error;
        }
      },
      "백업하지 못했어요",
      "백업 — 지금 백업 실패",
    );
  }

  function confirmImport() {
    const kind = importConfirmKind;
    setImportConfirmKind(null);
    runTask(
      async () => {
        const isImported = await importRemoteBackup();
        settingsManager.changeSetting("isBackupImportPending", false, {
          from: "백업 — 가져오기",
        });
        const message = (() => {
          if (!isImported) {
            return "드라이브에 백업이 없습니다";
          }
          if (kind === "connect") {
            return "기존에 백업된 내용이 복원되었습니다.";
          }
          return "백업에서 가져왔습니다";
        })();
        toastManager.showToast(message, { from: "백업 — 가져오기" });
      },
      "백업을 가져오지 못했어요",
      "백업 — 가져오기 실패",
    );
  }

  function disconnect() {
    setIsDisconnectConfirmVisible(false);
    runTask(
      async () => {
        await disconnectGoogleAccount();
        settingsManager.changeSetting("driveAccountEmail", null, { from: "백업 — 연결 해제" });
        settingsManager.changeSetting("lastBackupAt", null, { from: "백업 — 연결 해제" });
        settingsManager.changeSetting("lastBackupFailure", null, { from: "백업 — 연결 해제" });
        settingsManager.changeSetting("isBackupImportPending", false, {
          from: "백업 — 연결 해제",
        });
        toastManager.showToast("연결 해제됨", { from: "백업 — 연결 해제" });
      },
      "연결을 해제하지 못했어요",
      "백업 — 연결 해제 실패",
    );
  }

  return {
    isBusy,
    importConfirmKind,
    connect,
    backupNow,
    openImportConfirm: () => setImportConfirmKind("manual"),
    closeImportConfirm: () => setImportConfirmKind(null),
    confirmImport,
    isDisconnectConfirmVisible,
    openDisconnectConfirm: () => setIsDisconnectConfirmVisible(true),
    closeDisconnectConfirm: () => setIsDisconnectConfirmVisible(false),
    disconnect,
  };
}

/** 백업 실패는 원래 오류로 문구를 고르고, 사유를 함께 붙인다 */
function getFailMessage(error: unknown, fallback: string) {
  if (!(error instanceof BackupFailedError)) {
    return getErrorMessage(error, fallback);
  }
  const message = getErrorMessage(error.cause, fallback);
  if (message !== fallback) {
    return message;
  }
  return `${fallback} · ${getBackupFailureLabel(error.failure.kind)}`;
}

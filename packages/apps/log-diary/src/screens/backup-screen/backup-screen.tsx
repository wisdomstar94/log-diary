import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getBackupFailureLabel } from "@/backup/get-backup-failure-label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { HeaderBar } from "@/components/header-bar";
import { ScreenContainer } from "@/components/screen-container";
import { SettingsGroup } from "@/components/settings-group";
import { SettingsRow } from "@/components/settings-row";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { formatDateTime } from "@/utils/dates/format-date-time";
import { getBackLabel } from "@/utils/platforms/get-back-label";

import { ConnectedCard } from "./_components/connected-card";
import { NotConnectedCard } from "./_components/not-connected-card";
import { useBackupActions } from "./_hooks/use-backup-actions";
import { useRemoteBackupInfo } from "./_hooks/use-remote-backup-info";

const IMPORT_GUIDE =
  "이 기기에만 작성한 기록과 드라이브에 저장된 기록을 하나로 합칩니다.\n어느 한쪽에만 있는 기록도 지워지지 않습니다.";
const DISCONNECT_GUIDE =
  "이 기기와 드라이브에 저장된 기록은 지워지지 않아요.\n해제하면 자동 백업이 멈추고, 이후 기록은 이 기기에만 저장됩니다.";

export function BackupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const settingsManager = useSettingsManagerContext();
  const { driveAccountEmail, lastBackupAt, autoBackup, backupOnChange, lastBackupFailure } =
    settingsManager.settings;
  const remoteBackupInfo = useRemoteBackupInfo(driveAccountEmail);
  const backupActions = useBackupActions({ onBackedUp: remoteBackupInfo.refresh });
  const lastBackupLabel = (() => {
    const timestamp = remoteBackupInfo.info?.modifiedAt ?? lastBackupAt;
    if (timestamp === null) {
      return "없음";
    }
    return formatDateTime(timestamp);
  })();
  const failureLabel = (() => {
    if (lastBackupFailure === null) {
      return null;
    }
    return `${getBackupFailureLabel(lastBackupFailure.kind)} · ${formatDateTime(lastBackupFailure.at)}`;
  })();
  const isConnectConfirm = backupActions.importConfirmKind === "connect";

  return (
    <ScreenContainer>
      <HeaderBar
        backLabel={getBackLabel("설정")}
        onBack={() => router.back()}
        title="백업 및 복원"
      />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + insets.bottom }]}>
        {driveAccountEmail === null ? (
          <NotConnectedCard onConnect={backupActions.connect} isBusy={backupActions.isBusy} />
        ) : (
          <>
            <ConnectedCard
              email={driveAccountEmail}
              lastBackupLabel={lastBackupLabel}
              failureLabel={failureLabel}
              onBackup={backupActions.backupNow}
              isBusy={backupActions.isBusy}
            />
            <SettingsGroup>
              <SettingsRow
                title="매일 자동 백업"
                description="Wi‑Fi 연결 시 하루 한 번"
                accessory={{ type: "toggle", isOn: autoBackup }}
                onPress={() =>
                  settingsManager.changeSetting("autoBackup", !autoBackup, {
                    from: "백업 — 자동 백업 토글",
                  })
                }
              />
              <SettingsRow
                hasTopBorder
                title="기록이 바뀔 때마다 백업"
                description="쓰기 · 고치기 · 지우기 5초 뒤 · 모바일 데이터 포함"
                accessory={{ type: "toggle", isOn: backupOnChange }}
                onPress={() =>
                  settingsManager.changeSetting("backupOnChange", !backupOnChange, {
                    from: "백업 — 변경 시 백업 토글",
                  })
                }
              />
              <SettingsRow
                hasTopBorder
                title="백업에서 가져오기"
                description="이 기기의 기록과 드라이브 백업을 합침"
                accessory={{ type: "chevron" }}
                onPress={backupActions.openImportConfirm}
              />
              <SettingsRow
                title="계정 연결 해제"
                onPress={backupActions.openDisconnectConfirm}
                hasTopBorder
                isDanger
              />
            </SettingsGroup>
          </>
        )}
      </ScrollView>
      <ConfirmDialog
        isVisible={backupActions.importConfirmKind !== null}
        title={isConnectConfirm ? "드라이브에 백업이 있습니다" : "백업에서 가져올까요?"}
        body={IMPORT_GUIDE}
        confirmLabel="합치기"
        cancelLabel={isConnectConfirm ? "나중에" : "취소"}
        isDanger={false}
        onConfirm={backupActions.confirmImport}
        onCancel={backupActions.closeImportConfirm}
      />
      <ConfirmDialog
        isVisible={backupActions.isDisconnectConfirmVisible}
        title="Google 계정 연결을 해제할까요?"
        body={DISCONNECT_GUIDE}
        confirmLabel="연결 해제"
        onConfirm={backupActions.disconnect}
        onCancel={backupActions.closeDisconnectConfirm}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
    gap: 22,
  },
});

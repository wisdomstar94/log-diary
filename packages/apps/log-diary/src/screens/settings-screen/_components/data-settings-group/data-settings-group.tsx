import { useRouter } from "expo-router";

import { getBackupFailureLabel } from "@/backup/get-backup-failure-label";
import { SettingsGroup } from "@/components/settings-group";
import { SettingsRow } from "@/components/settings-row";
import { StatusBadge } from "@/components/status-badge";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { formatDateTime } from "@/utils/dates/format-date-time";

export function DataSettingsGroup() {
  const router = useRouter();
  const { driveAccountEmail, lastBackupAt, lastBackupFailure } =
    useSettingsManagerContext().settings;
  const isBackupFailed = (() => {
    if (driveAccountEmail === null) {
      return false;
    }
    return lastBackupFailure !== null;
  })();
  const backupDescription = (() => {
    if (driveAccountEmail === null) {
      return "연결 안 됨";
    }
    if (lastBackupFailure !== null) {
      return `백업 실패 · ${getBackupFailureLabel(lastBackupFailure.kind)} (${formatDateTime(lastBackupFailure.at)})`;
    }
    if (lastBackupAt === null) {
      return "아직 백업 안 함";
    }
    return `마지막 백업 ${formatDateTime(lastBackupAt)}`;
  })();

  return (
    <SettingsGroup label="데이터">
      <SettingsRow
        title="Google 드라이브 백업"
        titleAccessory={driveAccountEmail !== null && <StatusBadge label="연동됨" tone="success" />}
        description={backupDescription}
        isDescriptionDanger={isBackupFailed}
        accessory={{ type: "chevron" }}
        onPress={() => router.push("/settings/backup")}
      />
      <SettingsRow
        hasTopBorder
        title="텍스트로 내보내기"
        description=".txt 파일 저장 또는 공유"
        accessory={{ type: "chevron" }}
        onPress={() => router.push("/settings/export")}
      />
    </SettingsGroup>
  );
}

import { BackupFailureDialog } from "@/components/backup-failure-dialog";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useAutoBackup } from "@/hooks/use-auto-backup";
import { useBackupOnChange } from "@/hooks/use-backup-on-change";

/** 매일 자동 백업 · 변경 시 백업 · 백업 실패 알림창. 설정을 다 불러온 뒤에만 그린다 */
export function AutoBackupSync() {
  const settingsManager = useSettingsManagerContext();
  useAutoBackup(settingsManager);
  useBackupOnChange(settingsManager);
  return <BackupFailureDialog />;
}

import type { ThemeName } from "@/constants/theme";
import type { BackupFailure } from "@/types/backup-failure";

export type StartMode = "month" | "list";

export type Settings = {
  onboarded: boolean;
  persistentNotification: boolean;
  startMode: StartMode;
  theme: ThemeName;
  autoBackup: boolean;
  lastBackupAt: number | null;
  driveAccountEmail: string | null;
  /** 드라이브 백업을 아직 합치지 않음. 이 동안 자동 백업을 멈춘다 */
  isBackupImportPending: boolean;
  backupOnChange: boolean;
  /** 사용자 변경 뒤 아직 백업에 올라가지 않음. 앱 복귀 · 네트워크 연결 시 다시 올린다 */
  hasUnsyncedChanges: boolean;
  /** 가장 최근 백업 실패. 백업이 성공하면 null 로 지운다 */
  lastBackupFailure: BackupFailure | null;
};

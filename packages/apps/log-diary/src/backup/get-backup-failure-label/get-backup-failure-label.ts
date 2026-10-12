import type { BackupFailureKind } from "@/types/backup-failure";

const LABELS: Record<BackupFailureKind, string> = {
  quota: "드라이브 저장공간 부족",
  network: "네트워크 오류",
  outdated: "앱 업데이트 필요",
  unknown: "알 수 없는 오류",
};

export function getBackupFailureLabel(kind: BackupFailureKind) {
  return LABELS[kind];
}

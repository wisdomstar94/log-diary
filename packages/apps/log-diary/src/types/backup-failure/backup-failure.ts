export type BackupFailureKind = "quota" | "network" | "outdated" | "unknown";

export type BackupFailure = {
  kind: BackupFailureKind;
  at: number;
  /** 이번 연속 실패에 대해 알림창을 이미 띄웠음. 백업이 성공하면 실패 기록과 함께 사라진다 */
  isNotified: boolean;
};

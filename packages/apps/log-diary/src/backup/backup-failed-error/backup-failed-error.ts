import type { BackupFailure } from "@/types/backup-failure";

/** 실패를 설정에 기록한 뒤 던진다. 화면은 failure 로 상태를 맞추고, 원래 오류는 cause 에 있다 */
export class BackupFailedError extends Error {
  readonly failure: BackupFailure;

  constructor(failure: BackupFailure, cause: unknown) {
    super("백업 실패", { cause });
    this.name = "BackupFailedError";
    this.failure = failure;
  }
}

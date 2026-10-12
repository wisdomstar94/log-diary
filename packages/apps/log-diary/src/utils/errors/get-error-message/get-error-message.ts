import { BackupVersionTooNewError } from "@/backup/backup-version-too-new-error";
import { GoogleUnavailableError } from "@/google/google-unavailable-error";

/** 사용자에게 그대로 보여 줄 수 있는 오류만 그 문구를 쓰고, 나머지는 fallback 을 쓴다 */
export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof GoogleUnavailableError) {
    return error.message;
  }
  if (error instanceof BackupVersionTooNewError) {
    return error.message;
  }
  if (__DEV__) {
    console.warn(error);
  }
  return fallback;
}

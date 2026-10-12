import { getBackupFailureKind } from "@/backup/get-backup-failure-kind";
import { getSettings } from "@/db/settings/get-settings";
import { updateSetting } from "@/db/settings/update-setting";
import type { BackupFailure } from "@/types/backup-failure";

/** 연속 실패 중이면 알림창 표시 여부를 이어받아, 같은 실패로 알림창이 반복해 뜨지 않게 한다 */
export async function recordBackupFailure(error: unknown, options: { isNotified: boolean }) {
  const previous = (await getSettings()).lastBackupFailure;
  const failure: BackupFailure = {
    kind: await getBackupFailureKind(error),
    at: Date.now(),
    isNotified: options.isNotified || (previous?.isNotified ?? false),
  };
  await updateSetting("lastBackupFailure", failure);
  return failure;
}

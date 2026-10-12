import { runBackup } from "@/backup/run-backup";
import { getSettings } from "@/db/settings/get-settings";
import { updateSetting } from "@/db/settings/update-setting";

let runningPromise: Promise<number | null> | null = null;
let isRerunNeeded = false;

/**
 * 「기록이 바뀔 때마다 백업」. 백업 중에 또 불리면 끝난 뒤 한 번 더 돈다.
 * 백업했으면 그 시각을, 쓸 수 없는 상태라 건너뛰면 null 을 돌려준다. 실패하면 예외를 던진다.
 */
export function runChangeBackup() {
  if (runningPromise !== null) {
    isRerunNeeded = true;
    return runningPromise;
  }
  runningPromise = backupUntilSettled().finally(() => {
    runningPromise = null;
  });
  return runningPromise;
}

async function backupUntilSettled() {
  let backedUpAt: number | null = null;
  do {
    isRerunNeeded = false;
    backedUpAt = (await backupIfEnabled()) ?? backedUpAt;
  } while (isRerunNeeded);
  return backedUpAt;
}

async function backupIfEnabled() {
  const settings = await getSettings();
  const isEnabled = (() => {
    if (settings.driveAccountEmail === null) {
      return false;
    }
    if (!settings.backupOnChange) {
      return false;
    }
    return !settings.isBackupImportPending;
  })();
  if (!isEnabled) {
    return null;
  }
  const result = await runBackup();
  await updateSetting("lastBackupAt", result.backedUpAt);
  await updateSetting("hasUnsyncedChanges", false);
  return result.backedUpAt;
}

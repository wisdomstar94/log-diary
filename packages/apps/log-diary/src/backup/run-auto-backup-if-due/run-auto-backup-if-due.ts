import * as Network from "expo-network";

import { AUTO_BACKUP_INTERVAL_MS } from "@/backup/auto-backup-constants";
import { runBackup } from "@/backup/run-backup";
import { getSettings } from "@/db/settings/get-settings";
import { updateSetting } from "@/db/settings/update-setting";

let runningPromise: Promise<number | null> | null = null;

/**
 * 연결된 계정 · 자동 백업 켜짐 · 드라이브 백업 합치기 완료 · 24시간 경과 · Wi‑Fi 일 때만 백업한다.
 * 백업했으면 그 시각을, 건너뛰었으면 null 을 돌려준다. 앱과 백그라운드 작업이 겹쳐 불러도 한 번만 돈다.
 */
export function runAutoBackupIfDue() {
  if (runningPromise === null) {
    runningPromise = backupIfDue().finally(() => {
      runningPromise = null;
    });
  }
  return runningPromise;
}

async function backupIfDue() {
  const settings = await getSettings();
  const isDue = await (async () => {
    if (settings.driveAccountEmail === null) {
      return false;
    }
    if (!settings.autoBackup) {
      return false;
    }
    if (settings.isBackupImportPending) {
      return false;
    }
    if (settings.lastBackupAt !== null) {
      const elapsed = Date.now() - settings.lastBackupAt;
      if (elapsed < AUTO_BACKUP_INTERVAL_MS) {
        return false;
      }
    }
    const network = await Network.getNetworkStateAsync();
    return network.type === Network.NetworkStateType.WIFI;
  })();
  if (!isDue) {
    return null;
  }
  const result = await runBackup();
  await updateSetting("lastBackupAt", result.backedUpAt);
  return result.backedUpAt;
}

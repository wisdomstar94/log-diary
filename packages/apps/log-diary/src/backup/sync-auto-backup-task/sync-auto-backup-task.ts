import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

import {
  AUTO_BACKUP_TASK_INTERVAL_MINUTES,
  AUTO_BACKUP_TASK_NAME,
} from "@/backup/auto-backup-constants";

/** 자동 백업을 쓸 수 있으면 백그라운드 작업을 등록하고, 아니면 해제한다 */
export async function syncAutoBackupTask(isEnabled: boolean) {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(AUTO_BACKUP_TASK_NAME);
  if (isEnabled === isRegistered) {
    return;
  }
  if (!isEnabled) {
    await BackgroundTask.unregisterTaskAsync(AUTO_BACKUP_TASK_NAME);
    return;
  }
  await BackgroundTask.registerTaskAsync(AUTO_BACKUP_TASK_NAME, {
    minimumInterval: AUTO_BACKUP_TASK_INTERVAL_MINUTES,
  });
}

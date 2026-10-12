import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

import { AUTO_BACKUP_TASK_NAME } from "@/backup/auto-backup-constants";
import { runAutoBackupIfDue } from "@/backup/run-auto-backup-if-due";

/** 작업 정의는 전역에서 한 번만 해야 해서 진입 파일(index.ts)에서 부른다 */
export function defineAutoBackupTask() {
  TaskManager.defineTask(AUTO_BACKUP_TASK_NAME, async () => {
    try {
      await runAutoBackupIfDue();
      return BackgroundTask.BackgroundTaskResult.Success;
    } catch {
      return BackgroundTask.BackgroundTaskResult.Failed;
    }
  });
}

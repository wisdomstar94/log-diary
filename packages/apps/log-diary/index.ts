import "expo-router/entry";

import { defineAutoBackupTask } from "@/backup/define-auto-backup-task";
import { registerQuickWriteTask } from "@/notifications/quick-write/register-quick-write-task";
import { setQuickWriteNotificationHandler } from "@/notifications/quick-write/set-quick-write-notification-handler";

// 백그라운드 작업은 앱 번들이 처음 실행되는 시점에 정의돼 있어야 실행된다.
setQuickWriteNotificationHandler();
registerQuickWriteTask();
defineAutoBackupTask();

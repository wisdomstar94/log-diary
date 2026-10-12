import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";

import { QUICK_WRITE_TASK_NAME } from "@/notifications/quick-write/quick-write-constants";
import { saveQuickWriteReply } from "@/notifications/quick-write/save-quick-write-reply";

/**
 * 앱이 백그라운드이거나 꺼져 있을 때 알림 버튼 응답을 받는 작업.
 * 앱 번들이 처음 실행될 때 등록되도록 진입 파일(index.ts)에서 불러온다.
 */
export function registerQuickWriteTask() {
  if (Platform.OS !== "android") {
    return;
  }
  TaskManager.defineTask<Notifications.NotificationTaskPayload>(
    QUICK_WRITE_TASK_NAME,
    async ({ data }) => {
      const isResponse = "actionIdentifier" in data;
      if (!isResponse) {
        return;
      }
      await saveQuickWriteReply(data);
    },
  );
  Notifications.registerTaskAsync(QUICK_WRITE_TASK_NAME);
}

import * as Notifications from "expo-notifications";

import { getTodayStatusText } from "@/notifications/quick-write/get-today-status-text";
import {
  QUICK_WRITE_CATEGORY_ID,
  QUICK_WRITE_CHANNEL_ID,
  QUICK_WRITE_NOTIFICATION_ID,
} from "@/notifications/quick-write/quick-write-constants";

/** 같은 identifier 로 다시 띄워 기존 알림의 내용을 갱신한다 */
export async function showQuickWriteNotification(params: { isSticky: boolean }) {
  await Notifications.scheduleNotificationAsync({
    identifier: QUICK_WRITE_NOTIFICATION_ID,
    content: {
      title: "일기 바로 작성",
      body: await getTodayStatusText(),
      categoryIdentifier: QUICK_WRITE_CATEGORY_ID,
      sticky: params.isSticky,
      autoDismiss: false,
      sound: false,
    },
    trigger: { channelId: QUICK_WRITE_CHANNEL_ID },
  });
}

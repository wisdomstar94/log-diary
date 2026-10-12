import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import { QUICK_WRITE_NOTIFICATION_ID } from "@/notifications/quick-write/quick-write-constants";
import { setupQuickWriteChannel } from "@/notifications/quick-write/setup-quick-write-channel";
import { showQuickWriteNotification } from "@/notifications/quick-write/show-quick-write-notification";

/** 설정이 켜져 있으면 상시 알림을 띄우거나 갱신하고, 꺼져 있으면 내린다. Android 전용 */
export async function syncQuickWriteNotification(isEnabled: boolean) {
  if (Platform.OS !== "android") {
    return;
  }
  if (!isEnabled) {
    await Notifications.dismissNotificationAsync(QUICK_WRITE_NOTIFICATION_ID);
    return;
  }
  await setupQuickWriteChannel();
  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    return;
  }
  await showQuickWriteNotification({ isSticky: true });
}

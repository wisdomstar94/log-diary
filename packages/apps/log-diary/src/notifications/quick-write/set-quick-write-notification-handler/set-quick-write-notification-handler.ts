import * as Notifications from "expo-notifications";

/** 앱을 보고 있을 때 띄운 알림은 배너 없이 알림 패널에만 둔다 */
export function setQuickWriteNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: false,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

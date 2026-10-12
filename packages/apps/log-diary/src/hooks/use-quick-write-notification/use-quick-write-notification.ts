import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useEffectEvent } from "react";
import { AppState, Platform } from "react-native";

import { subscribeDataChanged } from "@/db/data-change-emitter";
import { getQuickWriteRoute } from "@/notifications/quick-write/get-quick-write-route";
import { saveQuickWriteReply } from "@/notifications/quick-write/save-quick-write-reply";
import { syncQuickWriteNotification } from "@/notifications/quick-write/sync-quick-write-notification";

/**
 * Android 상시 알림을 설정값과 맞춘다.
 * 기록 · 백업 실패가 바뀌거나 앱으로 돌아올 때 내용을 갱신하고, 알림 버튼 응답을 처리한다.
 */
export function useQuickWriteNotification(isEnabled: boolean, backupFailureAt: number | null) {
  const router = useRouter();
  const lastResponse = Notifications.useLastNotificationResponse();

  const sync = useEffectEvent(() => {
    syncQuickWriteNotification(isEnabled);
  });

  const handleResponse = useEffectEvent((response: Notifications.NotificationResponse) => {
    saveQuickWriteReply(response);
    const route = getQuickWriteRoute(response);
    if (route === null) {
      return;
    }
    router.push(route);
    Notifications.clearLastNotificationResponseAsync();
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: 실패 기록이 바뀌면 알림 본문을 다시 그린다
  useEffect(() => {
    syncQuickWriteNotification(isEnabled);
  }, [isEnabled, backupFailureAt]);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    const unsubscribeData = subscribeDataChanged(sync);
    const appStateSubscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        sync();
      }
    });
    return () => {
      unsubscribeData();
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!lastResponse) {
      return;
    }
    handleResponse(lastResponse);
  }, [lastResponse]);
}

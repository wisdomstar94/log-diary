import * as Notifications from "expo-notifications";
import type { Href } from "expo-router";

import {
  QUICK_WRITE_ACTION_VIEW_TODAY,
  QUICK_WRITE_NOTIFICATION_ID,
} from "@/notifications/quick-write/quick-write-constants";
import { toDateKey } from "@/utils/dates/to-date-key";

/** 알림 본문을 누르면 빠른 기록, 「오늘 기록 보기」를 누르면 오늘 날짜 상세로 보낸다 */
export function getQuickWriteRoute(response: Notifications.NotificationResponse): Href | null {
  if (response.notification.request.identifier !== QUICK_WRITE_NOTIFICATION_ID) {
    return null;
  }
  const today = toDateKey(new Date());
  if (response.actionIdentifier === QUICK_WRITE_ACTION_VIEW_TODAY) {
    return { pathname: "/days/[date]", params: { date: today } };
  }
  if (response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
    return { pathname: "/compose", params: { date: today, quick: "1" } };
  }
  return null;
}

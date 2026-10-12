import * as Notifications from "expo-notifications";

import {
  QUICK_WRITE_ACTION_VIEW_TODAY,
  QUICK_WRITE_ACTION_WRITE,
  QUICK_WRITE_CATEGORY_ID,
  QUICK_WRITE_CHANNEL_ID,
} from "@/notifications/quick-write/quick-write-constants";

let setupPromise: Promise<void> | null = null;

/** Android 전용. 알림 채널과 「바로 작성」 · 「오늘 기록 보기」 버튼을 한 번만 등록한다 */
export function setupQuickWriteChannel() {
  if (setupPromise === null) {
    setupPromise = registerChannelAndCategory();
  }
  return setupPromise;
}

async function registerChannelAndCategory() {
  await Notifications.setNotificationChannelAsync(QUICK_WRITE_CHANNEL_ID, {
    name: "일기 바로 작성",
    description: "알림 패널에서 바로 일기를 적는 상시 알림",
    importance: Notifications.AndroidImportance.LOW,
    showBadge: false,
  });
  await Notifications.setNotificationCategoryAsync(QUICK_WRITE_CATEGORY_ID, [
    {
      identifier: QUICK_WRITE_ACTION_WRITE,
      buttonTitle: "바로 작성",
      textInput: { submitButtonTitle: "저장", placeholder: "지금 떠오른 일을 적어 보세요" },
      options: { opensAppToForeground: false },
    },
    {
      identifier: QUICK_WRITE_ACTION_VIEW_TODAY,
      buttonTitle: "오늘 기록 보기",
      options: { opensAppToForeground: true },
    },
  ]);
}

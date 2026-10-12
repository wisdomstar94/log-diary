import type { NotificationResponse } from "expo-notifications";

import { markUnsyncedChange } from "@/backup/mark-unsynced-change";
import { runChangeBackup } from "@/backup/run-change-backup";
import { insertEntry } from "@/db/entries/insert-entry";
import { getSettings } from "@/db/settings/get-settings";
import { QUICK_WRITE_ACTION_WRITE } from "@/notifications/quick-write/quick-write-constants";
import { showQuickWriteNotification } from "@/notifications/quick-write/show-quick-write-notification";
import { getNowTime } from "@/utils/dates/get-now-time";
import { toDateKey } from "@/utils/dates/to-date-key";

const handledResponseKeys = new Set<string>();

/**
 * 알림 안에서 입력한 내용을 오늘 날짜로 저장하고 알림을 갱신한다.
 * 앞 · 뒤 상태 리스너가 같은 응답을 둘 다 받아도 한 번만 저장한다.
 */
export async function saveQuickWriteReply(response: NotificationResponse) {
  if (response.actionIdentifier !== QUICK_WRITE_ACTION_WRITE) {
    return;
  }
  const content = response.userText?.trim() ?? "";
  if (content === "") {
    return;
  }
  const responseKey = `${response.notification.date}:${content}`;
  if (handledResponseKeys.has(responseKey)) {
    return;
  }
  handledResponseKeys.add(responseKey);
  const now = new Date();
  await insertEntry({ date: toDateKey(now), time: getNowTime(now), content });
  // Android 는 인라인 답장 뒤 알림을 다시 띄워야 입력 중 표시가 풀린다.
  const settings = await getSettings();
  await showQuickWriteNotification({ isSticky: settings.persistentNotification });
  // 앱이 꺼진 상태(백그라운드 작업)에서도 바로 백업을 시도한다. 실패하면 다음 실행 때 다시 올린다.
  await markUnsyncedChange();
  await runChangeBackup().catch(() => {});
}

import { getBackupFailureLabel } from "@/backup/get-backup-failure-label";
import { getEntriesByDate } from "@/db/entries/get-entries-by-date";
import { getSettings } from "@/db/settings/get-settings";
import { toDateKey } from "@/utils/dates/to-date-key";

/** 오늘 3개 기록 · 마지막 09:59 (백업이 실패해 있으면 둘째 줄에 사유) */
export async function getTodayStatusText() {
  const [entryText, settings] = await Promise.all([getEntryText(), getSettings()]);
  const failure = settings.driveAccountEmail === null ? null : settings.lastBackupFailure;
  if (failure === null) {
    return entryText;
  }
  return `${entryText}\n백업 실패 · ${getBackupFailureLabel(failure.kind)}`;
}

async function getEntryText() {
  const entries = await getEntriesByDate(toDateKey(new Date()));
  const lastEntry = entries.at(-1);
  if (lastEntry === undefined) {
    return "오늘 아직 기록이 없어요";
  }
  return `오늘 ${entries.length}개 기록 · 마지막 ${lastEntry.time}`;
}

import { WEEKDAY_LABELS } from "@/constants/weekday-labels";
import { parseDateKey } from "@/utils/dates/parse-date-key";

/** 2026-10-01 (목) */
export function formatDateWithWeekday(dateKey: string) {
  return `${dateKey} (${WEEKDAY_LABELS[parseDateKey(dateKey).getDay()]})`;
}

import { WEEKDAY_LABELS } from "@/constants/weekday-labels";
import { parseDateKey } from "@/utils/dates/parse-date-key";

/** 10월 5일 (월) */
export function formatShortDate(dateKey: string) {
  const date = parseDateKey(dateKey);
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAY_LABELS[date.getDay()]})`;
}

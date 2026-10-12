import { WEEKDAY_LABELS } from "@/constants/weekday-labels";
import { padTwo } from "@/utils/dates/pad-two";
import { parseDateKey } from "@/utils/dates/parse-date-key";

/** 2026년 10월 11일 일요일 */
export function formatLongDate(dateKey: string) {
  const date = parseDateKey(dateKey);
  const weekday = WEEKDAY_LABELS[date.getDay()];

  return `${date.getFullYear()}년 ${padTwo(date.getMonth() + 1)}월 ${padTwo(date.getDate())}일 ${weekday}요일`;
}

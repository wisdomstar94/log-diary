import { getNowTime } from "@/utils/dates/get-now-time";
import { toDateKey } from "@/utils/dates/to-date-key";

/** 2026-10-11 09:13 */
export function formatDateTime(timestamp: number) {
  const date = new Date(timestamp);
  return `${toDateKey(date)} ${getNowTime(date)}`;
}

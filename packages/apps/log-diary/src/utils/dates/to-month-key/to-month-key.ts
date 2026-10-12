import { padTwo } from "@/utils/dates/pad-two";

/** month 는 0 부터 시작 (Date 와 같음) */
export function toMonthKey(year: number, month: number) {
  return `${year}-${padTwo(month + 1)}`;
}

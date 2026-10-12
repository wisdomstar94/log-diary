import { padTwo } from "@/utils/dates/pad-two";

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${padTwo(date.getMonth() + 1)}-${padTwo(date.getDate())}`;
}

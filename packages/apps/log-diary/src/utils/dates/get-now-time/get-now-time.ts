import { padTwo } from "@/utils/dates/pad-two";

export function getNowTime(now = new Date()) {
  return `${padTwo(now.getHours())}:${padTwo(now.getMinutes())}`;
}

import type { DayTitle } from "@/types/entry";

import { isRecord } from "../is-record";

export function isValidDayTitle(value: unknown): value is DayTitle {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.date !== "string") {
    return false;
  }
  if (typeof value.title !== "string") {
    return false;
  }
  return typeof value.updatedAt === "number";
}

import type { Entry } from "@/types/entry";

import { isRecord } from "../is-record";

const STRING_KEYS = ["id", "date", "time", "content"];

/** 백업 v1 · v2 의 기록. 위치 필드가 없다 */
export type EntryV2 = Omit<Entry, "location">;

export function isValidEntry(value: unknown): value is EntryV2 {
  if (!isRecord(value)) {
    return false;
  }
  if (!STRING_KEYS.every((key) => typeof value[key] === "string")) {
    return false;
  }
  if (typeof value.createdAt !== "number") {
    return false;
  }
  return typeof value.updatedAt === "number";
}

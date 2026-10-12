import type { EntryLocation } from "@/types/entry";

import { isRecord } from "../is-record";

export function isValidEntryLocation(value: unknown): value is EntryLocation {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.latitude !== "number") {
    return false;
  }
  if (typeof value.longitude !== "number") {
    return false;
  }
  if (value.placeName === null) {
    return true;
  }
  return typeof value.placeName === "string";
}

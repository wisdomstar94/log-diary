import type { DayTitle, DeletedEntry } from "@/types/entry";

import { isRecord } from "../is-record";
import { isValidDayTitle } from "../is-valid-day-title";
import { isValidDeletedItem } from "../is-valid-deleted-item";
import { type EntryV2, isValidEntry } from "../is-valid-entry";

type BackupPayloadV2 = {
  entries: EntryV2[];
  dayTitles: DayTitle[];
  deletedEntries: DeletedEntry[];
};

export function isValidBackupPayloadV2(value: unknown): value is BackupPayloadV2 {
  if (!isRecord(value)) {
    return false;
  }
  if (value.app !== "log-diary") {
    return false;
  }
  if (value.version !== 2) {
    return false;
  }
  if (!Array.isArray(value.entries)) {
    return false;
  }
  if (!value.entries.every(isValidEntry)) {
    return false;
  }
  if (!Array.isArray(value.dayTitles)) {
    return false;
  }
  if (!value.dayTitles.every(isValidDayTitle)) {
    return false;
  }
  if (!Array.isArray(value.deletedEntries)) {
    return false;
  }
  return value.deletedEntries.every(isValidDeletedItem);
}

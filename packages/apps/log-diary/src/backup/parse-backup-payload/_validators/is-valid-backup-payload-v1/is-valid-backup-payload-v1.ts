import { isRecord } from "../is-record";
import { type EntryV2, isValidEntry } from "../is-valid-entry";

type BackupPayloadV1 = {
  entries: EntryV2[];
  dayTitles: { date: string; title: string }[];
};

function isValidDayTitleV1(value: unknown) {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.date !== "string") {
    return false;
  }
  return typeof value.title === "string";
}

export function isValidBackupPayloadV1(value: unknown): value is BackupPayloadV1 {
  if (!isRecord(value)) {
    return false;
  }
  if (value.app !== "log-diary") {
    return false;
  }
  if (value.version !== 1) {
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
  return value.dayTitles.every(isValidDayTitleV1);
}

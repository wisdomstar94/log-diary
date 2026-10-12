import type { BackupPayload } from "@/types/backup-payload";

import { isRecord } from "../is-record";
import { isValidAttachment } from "../is-valid-attachment";
import { isValidDayTitle } from "../is-valid-day-title";
import { isValidDeletedItem } from "../is-valid-deleted-item";
import { isValidEntryV3 } from "../is-valid-entry-v3";

const ARRAY_VALIDATORS: [keyof BackupPayload, (item: unknown) => boolean][] = [
  ["entries", isValidEntryV3],
  ["dayTitles", isValidDayTitle],
  ["deletedEntries", isValidDeletedItem],
  ["attachments", isValidAttachment],
  ["deletedAttachments", isValidDeletedItem],
];

export function isValidBackupPayloadV3(value: unknown): value is BackupPayload {
  if (!isRecord(value)) {
    return false;
  }
  if (value.app !== "log-diary") {
    return false;
  }
  if (value.version !== 3) {
    return false;
  }
  return ARRAY_VALIDATORS.every(([key, isValidItem]) => {
    const items = value[key];
    return Array.isArray(items) && items.every(isValidItem);
  });
}

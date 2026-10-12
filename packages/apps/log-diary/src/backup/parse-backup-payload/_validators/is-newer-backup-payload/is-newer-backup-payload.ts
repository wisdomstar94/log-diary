import { BACKUP_PAYLOAD_VERSION } from "@/constants/backup-payload";

import { isRecord } from "../is-record";

export function isNewerBackupPayload(value: unknown): value is { version: number } {
  if (!isRecord(value)) {
    return false;
  }
  if (value.app !== "log-diary") {
    return false;
  }
  if (typeof value.version !== "number") {
    return false;
  }
  return value.version > BACKUP_PAYLOAD_VERSION;
}

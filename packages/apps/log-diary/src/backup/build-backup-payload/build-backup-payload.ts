import { BACKUP_PAYLOAD_VERSION } from "@/constants/backup-payload";
import { getAttachments } from "@/db/attachments/get-attachments";
import { getDayTitlesByDatePrefix } from "@/db/day-titles/get-day-titles-by-date-prefix";
import { getDeletedAttachments } from "@/db/deleted-attachments/get-deleted-attachments";
import { getDeletedEntries } from "@/db/deleted-entries/get-deleted-entries";
import { getEntriesByDatePrefix } from "@/db/entries/get-entries-by-date-prefix";
import type { BackupPayload } from "@/types/backup-payload";

export async function buildBackupPayload(): Promise<BackupPayload> {
  const [entries, dayTitles, deletedEntries, attachments, deletedAttachments] = await Promise.all([
    getEntriesByDatePrefix(""),
    getDayTitlesByDatePrefix(""),
    getDeletedEntries(),
    getAttachments(),
    getDeletedAttachments(),
  ]);
  return {
    app: "log-diary",
    version: BACKUP_PAYLOAD_VERSION,
    createdAt: Date.now(),
    entries,
    dayTitles,
    deletedEntries,
    attachments,
    deletedAttachments,
  };
}

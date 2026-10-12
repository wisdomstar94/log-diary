import type { BACKUP_PAYLOAD_VERSION } from "@/constants/backup-payload";
import type { Attachment, DayTitle, DeletedAttachment, DeletedEntry, Entry } from "@/types/entry";

export type BackupData = {
  entries: Entry[];
  dayTitles: DayTitle[];
  deletedEntries: DeletedEntry[];
  attachments: Attachment[];
  deletedAttachments: DeletedAttachment[];
};

export type BackupPayload = BackupData & {
  app: "log-diary";
  version: typeof BACKUP_PAYLOAD_VERSION;
  createdAt: number;
};

export type RemoteBackupInfo = {
  fileId: string;
  modifiedAt: number;
};

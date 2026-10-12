import { notifyDataChanged } from "@/db/data-change-emitter";
import { openDatabase } from "@/db/open-database";
import type { BackupData } from "@/types/backup-payload";

import { mergeAttachments } from "./_utils/merge-attachments";
import { mergeEntries } from "./_utils/merge-entries";

/** 백업 내용을 기기 DB 에 합친다. 기기에만 있는 기록 · 첨부는 그대로 둔다 */
export async function mergeBackupIntoLocal(data: BackupData) {
  const db = await openDatabase();
  await db.withExclusiveTransactionAsync(async (txn) => {
    await mergeEntries(txn, data);
    await mergeAttachments(txn, data);
  });
  notifyDataChanged("sync");
}

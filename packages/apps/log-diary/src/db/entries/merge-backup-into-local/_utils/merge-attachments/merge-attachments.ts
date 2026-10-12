import type { SQLiteDatabase } from "expo-sqlite";

import type { BackupData } from "@/types/backup-payload";

/**
 * 첨부는 고치지 않으므로 「양쪽 합집합 − 지운 것」으로 합친다.
 * 기록이 빠졌으면 그 첨부도 지운 것으로 남긴다. mergeEntries 다음에 불러야 한다.
 */
export async function mergeAttachments(txn: SQLiteDatabase, data: BackupData) {
  for (const attachment of data.attachments) {
    await txn.runAsync(
      `INSERT INTO attachments (id, entry_id, kind, mime_type, width, height, byte_size, sort_order, remote_file_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         remote_file_id = coalesce(attachments.remote_file_id, excluded.remote_file_id)`,
      attachment.id,
      attachment.entryId,
      attachment.kind,
      attachment.mimeType,
      attachment.width,
      attachment.height,
      attachment.byteSize,
      attachment.sortOrder,
      attachment.remoteFileId,
      attachment.createdAt,
    );
  }
  for (const deleted of data.deletedAttachments) {
    await txn.runAsync(
      `INSERT INTO deleted_attachments (id, deleted_at) VALUES (?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = max(deleted_at, excluded.deleted_at)`,
      deleted.id,
      deleted.deletedAt,
    );
  }
  await txn.runAsync(
    `INSERT INTO deleted_attachments (id, deleted_at)
     SELECT a.id, ? FROM attachments AS a
      WHERE NOT EXISTS (SELECT 1 FROM entries AS e WHERE e.id = a.entry_id)
     ON CONFLICT(id) DO NOTHING`,
    Date.now(),
  );
  await txn.runAsync("DELETE FROM attachments WHERE id IN (SELECT id FROM deleted_attachments)");
}

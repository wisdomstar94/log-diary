import { openDatabase } from "@/db/open-database";
import type { Attachment } from "@/types/entry";

export async function getAttachments() {
  const db = await openDatabase();
  return db.getAllAsync<Attachment>(
    `SELECT id, entry_id AS entryId, kind, mime_type AS mimeType, width, height,
            byte_size AS byteSize, sort_order AS sortOrder, remote_file_id AS remoteFileId,
            created_at AS createdAt
       FROM attachments ORDER BY entry_id, sort_order`,
  );
}

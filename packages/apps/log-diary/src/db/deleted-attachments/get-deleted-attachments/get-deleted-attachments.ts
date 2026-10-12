import { openDatabase } from "@/db/open-database";
import type { DeletedAttachment } from "@/types/entry";

export async function getDeletedAttachments() {
  const db = await openDatabase();
  return db.getAllAsync<DeletedAttachment>(
    "SELECT id, deleted_at AS deletedAt FROM deleted_attachments ORDER BY deleted_at",
  );
}

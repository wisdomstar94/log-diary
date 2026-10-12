import { openDatabase } from "@/db/open-database";
import type { DeletedEntry } from "@/types/entry";

export async function getDeletedEntries() {
  const db = await openDatabase();
  return db.getAllAsync<DeletedEntry>(
    "SELECT id, deleted_at AS deletedAt FROM deleted_entries ORDER BY deleted_at",
  );
}

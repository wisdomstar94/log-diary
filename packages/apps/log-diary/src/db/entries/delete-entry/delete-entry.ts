import { notifyDataChanged } from "@/db/data-change-emitter";
import { openDatabase } from "@/db/open-database";

/** 지운 사실을 deleted_entries · deleted_attachments 에 남겨 백업 · 다른 기기에서도 빠지게 한다 */
export async function deleteEntry(id: string) {
  const db = await openDatabase();
  const now = Date.now();
  await db.withExclusiveTransactionAsync(async (txn) => {
    await txn.runAsync("DELETE FROM entries WHERE id = ?", id);
    await txn.runAsync(
      "INSERT INTO deleted_entries (id, deleted_at) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at",
      id,
      now,
    );
    await txn.runAsync(
      `INSERT INTO deleted_attachments (id, deleted_at)
       SELECT id, ? FROM attachments WHERE entry_id = ?
       ON CONFLICT(id) DO UPDATE SET deleted_at = excluded.deleted_at`,
      now,
      id,
    );
    await txn.runAsync("DELETE FROM attachments WHERE entry_id = ?", id);
  });
  notifyDataChanged();
}

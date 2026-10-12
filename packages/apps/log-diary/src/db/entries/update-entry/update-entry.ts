import { notifyDataChanged } from "@/db/data-change-emitter";
import { openDatabase } from "@/db/open-database";

export async function updateEntry(params: { id: string; time: string; content: string }) {
  const db = await openDatabase();
  await db.runAsync(
    "UPDATE entries SET time = ?, content = ?, updated_at = ? WHERE id = ?",
    params.time,
    params.content,
    Date.now(),
    params.id,
  );
  notifyDataChanged();
}

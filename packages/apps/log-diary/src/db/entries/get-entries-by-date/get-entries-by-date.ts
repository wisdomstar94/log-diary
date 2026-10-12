import { type EntryRow, toEntry } from "@/db/_utils/to-entry";
import { openDatabase } from "@/db/open-database";

export async function getEntriesByDate(date: string) {
  const db = await openDatabase();
  const rows = await db.getAllAsync<EntryRow>(
    "SELECT * FROM entries WHERE date = ? ORDER BY time, created_at",
    date,
  );
  return rows.map(toEntry);
}

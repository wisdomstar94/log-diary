import { type EntryRow, toEntry } from "@/db/_utils/to-entry";
import { openDatabase } from "@/db/open-database";

/** prefix 가 빈 문자열이면 전체 기록 */
export async function getEntriesByDatePrefix(prefix: string) {
  const db = await openDatabase();
  const rows = await db.getAllAsync<EntryRow>(
    "SELECT * FROM entries WHERE date LIKE ? ORDER BY date, time, created_at",
    `${prefix}%`,
  );
  return rows.map(toEntry);
}

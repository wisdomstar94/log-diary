import { type EntryRow, toEntry } from "@/db/_utils/to-entry";
import { openDatabase } from "@/db/open-database";

const SEARCH_LIMIT = 60;

export async function searchEntries(query: string) {
  const db = await openDatabase();
  const escaped = query.replace(/[\\%_]/g, (char) => `\\${char}`);
  const rows = await db.getAllAsync<EntryRow>(
    `SELECT * FROM entries WHERE content LIKE ? ESCAPE '\\'
      ORDER BY date DESC, time DESC, created_at DESC LIMIT ?`,
    `%${escaped}%`,
    SEARCH_LIMIT,
  );
  return rows.map(toEntry);
}

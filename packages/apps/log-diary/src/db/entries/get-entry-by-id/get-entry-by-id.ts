import { type EntryRow, toEntry } from "@/db/_utils/to-entry";
import { openDatabase } from "@/db/open-database";

export async function getEntryById(id: string) {
  const db = await openDatabase();
  const row = await db.getFirstAsync<EntryRow>("SELECT * FROM entries WHERE id = ?", id);
  return row === null ? null : toEntry(row);
}

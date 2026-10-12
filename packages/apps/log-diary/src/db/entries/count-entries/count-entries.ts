import { openDatabase } from "@/db/open-database";

export async function countEntries() {
  const db = await openDatabase();
  const row = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) AS count FROM entries");
  return row?.count ?? 0;
}

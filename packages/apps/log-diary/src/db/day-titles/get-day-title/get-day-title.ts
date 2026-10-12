import { openDatabase } from "@/db/open-database";

export async function getDayTitle(date: string) {
  const db = await openDatabase();
  const row = await db.getFirstAsync<{ title: string }>(
    "SELECT title FROM day_titles WHERE date = ?",
    date,
  );
  return row?.title ?? "";
}

import { openDatabase } from "@/db/open-database";
import type { DayTitle } from "@/types/entry";

/** prefix 가 빈 문자열이면 전체. 지운 제목(빈 문자열)도 포함한다 */
export async function getDayTitlesByDatePrefix(prefix: string) {
  const db = await openDatabase();
  return db.getAllAsync<DayTitle>(
    "SELECT date, title, updated_at AS updatedAt FROM day_titles WHERE date LIKE ? ORDER BY date",
    `${prefix}%`,
  );
}

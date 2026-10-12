import { openDatabase } from "@/db/open-database";
import type { DaySummary } from "@/types/day-summary";

/** monthKey : 'YYYY-MM' */
export async function getMonthDaySummaries(monthKey: string) {
  const db = await openDatabase();
  return db.getAllAsync<DaySummary>(
    `SELECT e.date AS date,
            COUNT(*) AS count,
            t.title AS title,
            (SELECT content FROM entries AS last
              WHERE last.date = e.date
              ORDER BY last.time DESC, last.created_at DESC LIMIT 1) AS lastContent
       FROM entries AS e
       LEFT JOIN day_titles AS t ON t.date = e.date
      WHERE e.date LIKE ?
      GROUP BY e.date
      ORDER BY e.date`,
    `${monthKey}-%`,
  );
}

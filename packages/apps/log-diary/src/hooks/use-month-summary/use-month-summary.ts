import { getMonthDaySummaries } from "@/db/entries/get-month-day-summaries";
import { useDbQuery } from "@/hooks/use-db-query";

/** monthKey : 'YYYY-MM' */
export function useMonthSummary(monthKey: string) {
  const dbQuery = useDbQuery(`month:${monthKey}`, () => getMonthDaySummaries(monthKey));
  const days = dbQuery.data ?? [];
  const entryCount = days.reduce((sum, day) => sum + day.count, 0);

  return { days, entryCount, isLoading: dbQuery.isLoading };
}

import { getDayTitle } from "@/db/day-titles/get-day-title";
import { getEntriesByDate } from "@/db/entries/get-entries-by-date";
import { useDbQuery } from "@/hooks/use-db-query";

export function useDayEntries(date: string) {
  const dbQuery = useDbQuery(`day:${date}`, async () => {
    const [entries, title] = await Promise.all([getEntriesByDate(date), getDayTitle(date)]);
    return { entries, title };
  });

  return {
    entries: dbQuery.data?.entries ?? [],
    title: dbQuery.data?.title ?? "",
    isLoading: dbQuery.isLoading,
  };
}

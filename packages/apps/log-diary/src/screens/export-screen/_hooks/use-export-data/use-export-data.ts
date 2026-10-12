import { getDayTitlesByDatePrefix } from "@/db/day-titles/get-day-titles-by-date-prefix";
import { getEntriesByDatePrefix } from "@/db/entries/get-entries-by-date-prefix";
import { useDbQuery } from "@/hooks/use-db-query";
import { buildExportText } from "@/utils/exports/build-export-text";

/** prefix : 'YYYY-MM' 이면 그 달, 빈 문자열이면 전체 */
export function useExportData(prefix: string) {
  const dbQuery = useDbQuery(`export:${prefix}`, async () => {
    const [entries, dayTitles] = await Promise.all([
      getEntriesByDatePrefix(prefix),
      getDayTitlesByDatePrefix(prefix),
    ]);
    return { count: entries.length, text: buildExportText(entries, dayTitles) };
  });

  return {
    count: dbQuery.data?.count ?? 0,
    text: dbQuery.data?.text ?? "",
    isLoading: dbQuery.isLoading,
  };
}

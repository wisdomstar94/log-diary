import { searchEntries } from "@/db/entries/search-entries";
import { useDbQuery } from "@/hooks/use-db-query";

export function useSearchEntries(query: string) {
  const trimmed = query.trim();
  const dbQuery = useDbQuery(`search:${trimmed}`, async () => {
    if (trimmed === "") {
      return [];
    }
    return searchEntries(trimmed);
  });

  return { results: dbQuery.data ?? [], isLoading: dbQuery.isLoading };
}

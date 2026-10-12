import { countEntries } from "@/db/entries/count-entries";
import { useDbQuery } from "@/hooks/use-db-query";

export function useTotalEntryCount() {
  const dbQuery = useDbQuery("total-count", countEntries);
  return dbQuery.data ?? 0;
}

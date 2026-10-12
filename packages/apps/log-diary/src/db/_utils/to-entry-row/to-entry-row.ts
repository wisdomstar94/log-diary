import type { EntryRow } from "@/db/_utils/to-entry";
import type { Entry } from "@/types/entry";

/** entries 에 쓰는 쿼리는 이 순서로 컬럼 · 값을 만든다. 필드를 추가하면 여기와 EntryRow 만 고친다 */
export const ENTRY_COLUMN_NAMES = [
  "id",
  "date",
  "time",
  "content",
  "location_json",
  "created_at",
  "updated_at",
] as const satisfies readonly (keyof EntryRow)[];

export function toEntryRow(entry: Entry): EntryRow {
  return {
    id: entry.id,
    date: entry.date,
    time: entry.time,
    content: entry.content,
    location_json: entry.location === null ? null : JSON.stringify(entry.location),
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  };
}

export function toEntryRowValues(entry: Entry) {
  const row = toEntryRow(entry);
  return ENTRY_COLUMN_NAMES.map((name) => row[name]);
}

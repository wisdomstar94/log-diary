import type { Entry } from "@/types/entry";

export type EntryRow = {
  id: string;
  date: string;
  time: string;
  content: string;
  location_json: string | null;
  created_at: number;
  updated_at: number;
};

export function toEntry(row: EntryRow): Entry {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    content: row.content,
    location: row.location_json === null ? null : JSON.parse(row.location_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

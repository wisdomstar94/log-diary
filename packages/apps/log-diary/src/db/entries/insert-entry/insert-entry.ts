import { createEntryId } from "@/db/_utils/create-entry-id";
import { ENTRY_COLUMN_NAMES, toEntryRowValues } from "@/db/_utils/to-entry-row";
import { notifyDataChanged } from "@/db/data-change-emitter";
import { openDatabase } from "@/db/open-database";
import type { Entry } from "@/types/entry";

export async function insertEntry(params: { date: string; time: string; content: string }) {
  const db = await openDatabase();
  const now = Date.now();
  const entry: Entry = {
    id: createEntryId(),
    ...params,
    location: null,
    createdAt: now,
    updatedAt: now,
  };
  await db.runAsync(
    `INSERT INTO entries (${ENTRY_COLUMN_NAMES.join(", ")})
     VALUES (${ENTRY_COLUMN_NAMES.map(() => "?").join(", ")})`,
    toEntryRowValues(entry),
  );
  notifyDataChanged();
  return entry;
}

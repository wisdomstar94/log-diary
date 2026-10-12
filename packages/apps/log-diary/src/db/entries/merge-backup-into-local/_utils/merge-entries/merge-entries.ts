import type { SQLiteDatabase } from "expo-sqlite";

import { ENTRY_COLUMN_NAMES, toEntryRowValues } from "@/db/_utils/to-entry-row";
import type { BackupData } from "@/types/backup-payload";

const UPDATE_ON_CONFLICT = ENTRY_COLUMN_NAMES.filter(
  (name) => name !== "id" && name !== "created_at",
)
  .map((name) => `${name} = excluded.${name}`)
  .join(", ");

/**
 * - 같은 기록 · 날짜 제목은 수정 시각이 더 늦은 쪽을 남긴다
 * - 지운 시각이 기록의 수정 시각 이후면 그 기록을 뺀다 (기기 · 백업 어느 쪽에서 지웠든)
 */
export async function mergeEntries(txn: SQLiteDatabase, data: BackupData) {
  for (const entry of data.entries) {
    await txn.runAsync(
      `INSERT INTO entries (${ENTRY_COLUMN_NAMES.join(", ")})
       VALUES (${ENTRY_COLUMN_NAMES.map(() => "?").join(", ")})
       ON CONFLICT(id) DO UPDATE SET ${UPDATE_ON_CONFLICT}
       WHERE excluded.updated_at > entries.updated_at`,
      toEntryRowValues(entry),
    );
  }
  for (const dayTitle of data.dayTitles) {
    await txn.runAsync(
      `INSERT INTO day_titles (date, title, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(date) DO UPDATE SET title = excluded.title, updated_at = excluded.updated_at
       WHERE excluded.updated_at > day_titles.updated_at`,
      dayTitle.date,
      dayTitle.title,
      dayTitle.updatedAt,
    );
  }
  for (const deleted of data.deletedEntries) {
    await txn.runAsync(
      `INSERT INTO deleted_entries (id, deleted_at) VALUES (?, ?)
       ON CONFLICT(id) DO UPDATE SET deleted_at = max(deleted_at, excluded.deleted_at)`,
      deleted.id,
      deleted.deletedAt,
    );
  }
  await txn.runAsync(
    `DELETE FROM entries WHERE EXISTS (
       SELECT 1 FROM deleted_entries AS d
        WHERE d.id = entries.id AND d.deleted_at >= entries.updated_at
     )`,
  );
}

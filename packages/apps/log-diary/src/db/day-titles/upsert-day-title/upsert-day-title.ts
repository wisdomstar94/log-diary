import { notifyDataChanged } from "@/db/data-change-emitter";
import { openDatabase } from "@/db/open-database";

/** 빈 제목도 행으로 남겨 수정 시각을 기록한다. 화면에서는 빈 제목을 「제목 없음」으로 본다 */
export async function upsertDayTitle(date: string, title: string) {
  const db = await openDatabase();
  await db.runAsync(
    "INSERT INTO day_titles (date, title, updated_at) VALUES (?, ?, ?) ON CONFLICT(date) DO UPDATE SET title = excluded.title, updated_at = excluded.updated_at",
    date,
    title.trim(),
    Date.now(),
  );
  notifyDataChanged();
}

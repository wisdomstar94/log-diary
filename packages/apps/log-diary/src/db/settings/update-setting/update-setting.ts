import { openDatabase } from "@/db/open-database";
import type { Settings } from "@/types/settings";

export async function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  const db = await openDatabase();
  await db.runAsync(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    key,
    JSON.stringify(value),
  );
}

import { DEFAULT_SETTINGS } from "@/constants/default-settings";
import { openDatabase } from "@/db/open-database";
import type { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  const db = await openDatabase();
  const rows = await db.getAllAsync<{ key: string; value: string }>(
    "SELECT key, value FROM settings",
  );
  const stored = Object.fromEntries(rows.map((row) => [row.key, JSON.parse(row.value)]));
  return { ...DEFAULT_SETTINGS, ...stored };
}

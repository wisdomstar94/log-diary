import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 3;

export async function migrateDatabase(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  const currentVersion = row?.user_version ?? 0;
  if (currentVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_entries_date_time ON entries(date, time);
      CREATE TABLE IF NOT EXISTS day_titles (date TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
    `);
  }
  if (currentVersion < 2) {
    await db.execAsync(`
      ALTER TABLE day_titles ADD COLUMN updated_at INTEGER NOT NULL DEFAULT 0;
      CREATE TABLE IF NOT EXISTS deleted_entries (
        id TEXT PRIMARY KEY NOT NULL,
        deleted_at INTEGER NOT NULL
      );
    `);
  }
  if (currentVersion < 3) {
    await db.execAsync(`
      ALTER TABLE entries ADD COLUMN location_json TEXT;
      CREATE TABLE IF NOT EXISTS attachments (
        id TEXT PRIMARY KEY NOT NULL,
        entry_id TEXT NOT NULL,
        kind TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        width INTEGER,
        height INTEGER,
        byte_size INTEGER,
        sort_order INTEGER NOT NULL,
        remote_file_id TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_attachments_entry ON attachments(entry_id, sort_order);
      CREATE TABLE IF NOT EXISTS deleted_attachments (
        id TEXT PRIMARY KEY NOT NULL,
        deleted_at INTEGER NOT NULL
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

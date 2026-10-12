import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import { migrateDatabase } from "./_utils/migrate-database";

const DATABASE_NAME = "log-diary.db";

let databasePromise: Promise<SQLiteDatabase> | null = null;

// 알림 응답 · 백그라운드 작업처럼 React 트리 밖에서도 같은 연결을 쓰기 위해 모듈 단위로 한 번만 연다.
export function openDatabase() {
  if (databasePromise === null) {
    databasePromise = openDatabaseAsync(DATABASE_NAME).then(async (db) => {
      await migrateDatabase(db);
      return db;
    });
  }
  return databasePromise;
}

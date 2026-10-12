import { isRecord } from "../is-record";

/** 지운 기록 · 지운 첨부 공통 형태 */
export function isValidDeletedItem(value: unknown): value is { id: string; deletedAt: number } {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string") {
    return false;
  }
  return typeof value.deletedAt === "number";
}

import { BackupVersionTooNewError } from "@/backup/backup-version-too-new-error";
import type { BackupData } from "@/types/backup-payload";

import { isNewerBackupPayload } from "./_validators/is-newer-backup-payload";
import { isValidBackupPayloadV1 } from "./_validators/is-valid-backup-payload-v1";
import { isValidBackupPayloadV2 } from "./_validators/is-valid-backup-payload-v2";
import { isValidBackupPayloadV3 } from "./_validators/is-valid-backup-payload-v3";

/**
 * 형식이 맞지 않으면 예외를 던져, 잘못된 파일로 기기 기록을 바꾸지 않게 한다.
 * 더 새 버전의 백업이면 BackupVersionTooNewError 를 던져, 모르는 데이터를 덮어쓰지 않게 한다.
 * 버전 1 · 2 백업은 버전 3 형태로 바꿔 돌려준다.
 */
export function parseBackupPayload(json: string): BackupData {
  const parsed: unknown = JSON.parse(json);
  if (isNewerBackupPayload(parsed)) {
    throw new BackupVersionTooNewError(parsed.version);
  }
  if (isValidBackupPayloadV3(parsed)) {
    return {
      entries: parsed.entries,
      dayTitles: parsed.dayTitles,
      deletedEntries: parsed.deletedEntries,
      attachments: parsed.attachments,
      deletedAttachments: parsed.deletedAttachments,
    };
  }
  if (isValidBackupPayloadV2(parsed)) {
    return {
      entries: parsed.entries.map((entry) => ({ ...entry, location: null })),
      dayTitles: parsed.dayTitles,
      deletedEntries: parsed.deletedEntries,
      attachments: [],
      deletedAttachments: [],
    };
  }
  if (isValidBackupPayloadV1(parsed)) {
    return {
      entries: parsed.entries.map((entry) => ({ ...entry, location: null })),
      dayTitles: parsed.dayTitles.map((dayTitle) => ({ ...dayTitle, updatedAt: 0 })),
      deletedEntries: [],
      attachments: [],
      deletedAttachments: [],
    };
  }
  throw new Error("백업 파일 형식이 올바르지 않습니다");
}

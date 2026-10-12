import { BackupFailedError } from "@/backup/backup-failed-error";
import { buildBackupPayload } from "@/backup/build-backup-payload";
import { downloadRemoteBackup } from "@/backup/download-remote-backup";
import { recordBackupFailure } from "@/backup/record-backup-failure";
import { mergeBackupIntoLocal } from "@/db/entries/merge-backup-into-local";
import { updateSetting } from "@/db/settings/update-setting";
import { uploadBackupFile } from "@/drive/upload-backup-file";

let queue: Promise<unknown> = Promise.resolve();

/**
 * 드라이브 백업을 먼저 기기에 합친 뒤, 합쳐진 기기 데이터를 올린다.
 * 그래서 드라이브에만 있던 기록(다른 기기 · 재설치 전 기록)이 덮어써져 사라지지 않는다.
 * 수동 · 매일 · 변경 시 백업이 겹치지 않도록 한 번에 하나씩 차례로 실행한다.
 * 실패하면 사유를 설정에 남기고 BackupFailedError 를 던진다.
 * isFailureNotified : 실패를 호출한 쪽이 직접 알리므로 실패 알림창을 띄우지 않는다.
 */
export function runBackup(options: { isFailureNotified?: boolean } = {}) {
  const next = queue.then(() => backupOnce(options.isFailureNotified ?? false));
  queue = next.catch(() => {});
  return next;
}

async function backupOnce(isFailureNotified: boolean) {
  try {
    const result = await uploadMergedBackup();
    await updateSetting("lastBackupFailure", null);
    return result;
  } catch (error) {
    const failure = await recordBackupFailure(error, { isNotified: isFailureNotified });
    throw new BackupFailedError(failure, error);
  }
}

async function uploadMergedBackup() {
  const remote = await downloadRemoteBackup();
  if (remote !== null) {
    await mergeBackupIntoLocal(remote.data);
  }
  const payload = await buildBackupPayload();
  await uploadBackupFile(JSON.stringify(payload), remote?.fileId ?? null);
  return { entryCount: payload.entries.length, backedUpAt: Date.now() };
}

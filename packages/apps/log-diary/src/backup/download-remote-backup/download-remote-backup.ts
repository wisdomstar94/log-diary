import { parseBackupPayload } from "@/backup/parse-backup-payload";
import { downloadBackupFile } from "@/drive/download-backup-file";
import { findBackupFile } from "@/drive/find-backup-file";

/** 드라이브 백업 파일을 찾아 내용을 읽는다. 없으면 null */
export async function downloadRemoteBackup() {
  const remote = await findBackupFile();
  if (remote === null) {
    return null;
  }
  const data = parseBackupPayload(await downloadBackupFile(remote.fileId));
  return { fileId: remote.fileId, data };
}

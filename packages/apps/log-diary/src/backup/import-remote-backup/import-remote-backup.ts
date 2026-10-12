import { downloadRemoteBackup } from "@/backup/download-remote-backup";
import { mergeBackupIntoLocal } from "@/db/entries/merge-backup-into-local";

/** 드라이브 백업을 기기에 합친다. 기기에만 있는 기록은 남는다. 백업이 없으면 false */
export async function importRemoteBackup() {
  const remote = await downloadRemoteBackup();
  if (remote === null) {
    return false;
  }
  await mergeBackupIntoLocal(remote.data);
  return true;
}

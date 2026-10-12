import { BACKUP_FILE_NAME } from "@/constants/google-drive";
import { driveFetch } from "@/drive/drive-fetch";
import type { RemoteBackupInfo } from "@/types/backup-payload";

/** 앱 전용 폴더의 백업 파일 정보. 없으면 null */
export async function findBackupFile(): Promise<RemoteBackupInfo | null> {
  // iOS 는 인코딩되지 않은 문자가 하나라도 있으면 URL 전체를 다시 인코딩해 q 가 이중 인코딩된다.
  const params = [
    ["spaces", "appDataFolder"],
    ["q", `name = '${BACKUP_FILE_NAME}'`],
    ["fields", "files(id,modifiedTime)"],
    ["orderBy", "modifiedTime desc"],
  ]
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const response = await driveFetch(`https://www.googleapis.com/drive/v3/files?${params}`);
  const body: { files: { id: string; modifiedTime: string }[] } = await response.json();
  const file = body.files[0];
  if (file === undefined) {
    return null;
  }
  return { fileId: file.id, modifiedAt: Date.parse(file.modifiedTime) };
}

import { BACKUP_FILE_NAME } from "@/constants/google-drive";
import { driveFetch } from "@/drive/drive-fetch";

const BOUNDARY = "log-diary-backup-boundary";

/**
 * fileId 가 있으면 그 파일 내용을 바꾸고, 없으면 앱 전용 폴더에 새로 만든다.
 * 올리는 내용은 드라이브 백업을 이미 합친 데이터여야 한다 (run-backup 참고).
 */
export async function uploadBackupFile(json: string, fileId: string | null) {
  if (fileId !== null) {
    await driveFetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
      { method: "PATCH", headers: { "Content-Type": "application/json" }, body: json },
    );
    return;
  }
  const metadata = JSON.stringify({ name: BACKUP_FILE_NAME, parents: ["appDataFolder"] });
  const body = [
    `--${BOUNDARY}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    metadata,
    `--${BOUNDARY}`,
    "Content-Type: application/json",
    "",
    json,
    `--${BOUNDARY}--`,
  ].join("\r\n");
  await driveFetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: { "Content-Type": `multipart/related; boundary=${BOUNDARY}` },
    body,
  });
}

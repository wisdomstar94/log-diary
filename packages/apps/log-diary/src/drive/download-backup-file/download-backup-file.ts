import { driveFetch } from "@/drive/drive-fetch";

export async function downloadBackupFile(fileId: string) {
  const response = await driveFetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
  );
  return response.text();
}

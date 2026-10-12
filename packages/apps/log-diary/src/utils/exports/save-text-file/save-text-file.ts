import { Directory, File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

/**
 * Android 는 사용자가 고른 폴더에 바로 저장하고 true 를 돌려준다.
 * iOS 는 공유 시트로 넘겨 「파일에 저장」을 고르게 하며, 저장 여부를 알 수 없어 false 를 돌려준다.
 * 사용자가 폴더 선택을 취소하면 예외를 던진다.
 */
export async function saveTextFile(fileName: string, text: string) {
  if (Platform.OS === "android") {
    const directory = await Directory.pickDirectoryAsync();
    const file = directory.createFile(fileName, "text/plain");
    file.write(text);
    return true;
  }
  const file = new File(Paths.cache, fileName);
  if (file.exists) {
    file.delete();
  }
  file.create();
  file.write(text);
  await Sharing.shareAsync(file.uri, { UTI: "public.plain-text", mimeType: "text/plain" });
  return false;
}

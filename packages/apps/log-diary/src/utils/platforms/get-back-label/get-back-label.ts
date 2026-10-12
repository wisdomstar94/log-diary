import { Platform } from "react-native";

/** iOS 는 `‹ 설정` 처럼 돌아갈 화면 이름을, Android 는 화살표만 보여 준다 */
export function getBackLabel(iosLabel: string) {
  if (Platform.OS === "ios") {
    return `‹ ${iosLabel}`;
  }
  return "←";
}

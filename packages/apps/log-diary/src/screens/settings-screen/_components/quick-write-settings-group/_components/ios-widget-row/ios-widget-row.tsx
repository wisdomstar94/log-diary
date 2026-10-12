import { Alert } from "react-native";

import { SettingsRow } from "@/components/settings-row";

const GUIDE_MESSAGE = [
  "1. 잠금화면을 길게 누르고 「사용자화」를 누릅니다.",
  "2. 잠금화면을 고르고 시계 아래 위젯 칸을 누릅니다.",
  "3. 목록에서 「로그일기」를 찾아 「일기 바로 작성」을 추가합니다.",
  "",
  "위젯을 누르면 바로 빠른 기록이 열립니다.",
].join("\n");

/** iOS 는 앱이 알림을 상시 고정할 수 없어, 잠금화면 위젯 추가 방법을 안내한다 */
export function IosWidgetRow() {
  return (
    <SettingsRow
      title="잠금화면 위젯"
      description="iOS는 상시 알림 대신 위젯으로 제공"
      accessory={{ type: "chevron" }}
      onPress={() => Alert.alert("잠금화면 위젯 추가", GUIDE_MESSAGE)}
    />
  );
}

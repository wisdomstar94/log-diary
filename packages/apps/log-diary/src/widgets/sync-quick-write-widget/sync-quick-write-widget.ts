import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

/**
 * 위젯 모양을 네이티브에 등록하고 내용을 채운다. iOS 개발 빌드 · 배포 빌드에서만 동작한다.
 * 네이티브 모듈이 없는 Expo Go 에서 앱이 멈추지 않도록 필요할 때만 require() 로 불러온다.
 */
export async function syncQuickWriteWidget() {
  if (Platform.OS !== "ios") {
    return;
  }
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return;
  }
  const {
    quickWriteWidget,
  }: typeof import("@/widgets/quick-write-widget") = require("@/widgets/quick-write-widget");
  quickWriteWidget.updateSnapshot({});
}

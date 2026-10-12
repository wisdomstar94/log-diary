import { Image, Text, VStack } from "@expo/ui/swift-ui";
import { containerBackground, font, widgetURL } from "@expo/ui/swift-ui/modifiers";
import { createWidget, type WidgetEnvironment } from "expo-widgets";

// 위젯 본문은 네이티브로 옮겨 그려져 바깥 상수를 쓸 수 없어, 주소를 본문 안에 둔다.
function QuickWriteWidgetLayout(_props: object, environment: WidgetEnvironment) {
  "widget";
  const quickWriteUrl = "logdiary://compose?quick=1";
  if (environment.widgetFamily === "accessoryCircular") {
    return (
      <Image
        systemName="square.and.pencil"
        modifiers={[
          font({ size: 22, weight: "medium" }),
          containerBackground("clear", "widget"),
          widgetURL(quickWriteUrl),
        ]}
      />
    );
  }
  if (environment.widgetFamily === "accessoryInline") {
    return (
      <Text modifiers={[containerBackground("clear", "widget"), widgetURL(quickWriteUrl)]}>
        일기 바로 작성
      </Text>
    );
  }
  return (
    <VStack
      alignment="leading"
      spacing={2}
      modifiers={[containerBackground("clear", "widget"), widgetURL(quickWriteUrl)]}>
      <Text modifiers={[font({ size: 12, weight: "medium" })]}>로그일기</Text>
      <Text modifiers={[font({ size: 16, weight: "semibold" })]}>일기 바로 작성</Text>
      <Text modifiers={[font({ size: 12 })]}>눌러서 바로 기록</Text>
    </VStack>
  );
}

export const quickWriteWidget = createWidget("QuickWriteWidget", QuickWriteWidgetLayout);

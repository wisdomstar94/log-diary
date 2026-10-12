import { Platform, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { StepBody } from "../step-body";
import { StepCard } from "../step-card";
import { StepLayout } from "../step-layout";
import { StepTitle } from "../step-title";

const COPY = Platform.select({
  ios: {
    title: "알림을 허용하면\n잠금화면에서 바로 적을 수 있어요",
    body: "잠금화면 위젯과 알림을 탭하면 앱을 찾지 않아도 바로 입력창이 열립니다.",
    cardMeta: "잠금화면 위젯 · 로그일기",
  },
  default: {
    title: "알림 패널에 '일기 바로 작성'을\n항상 띄워 둘게요",
    body: "알림 패널을 내리고 탭하면 그 자리에서 바로 입력하고 저장할 수 있습니다. 언제든 설정에서 끌 수 있어요.",
    cardMeta: "로그일기 · 진행 중",
  },
});

export function NotificationStep(props: { onAllow: () => void; onLater: () => void }) {
  const { onAllow, onLater } = props;
  const theme = useTheme();

  return (
    <StepLayout
      label="1 / 2"
      primaryLabel="알림 허용"
      onPrimary={onAllow}
      secondaryLabel="나중에"
      onSecondary={onLater}>
      <StepTitle>{COPY.title}</StepTitle>
      <StepBody>{COPY.body}</StepBody>
      <StepCard style={styles.card}>
        <ThemedText size={12} color="sub">
          {COPY.cardMeta}
        </ThemedText>
        <ThemedText size={15} weight={600} style={styles.cardTitle}>
          일기 바로 작성
        </ThemedText>
        <View
          style={[
            styles.fakeInput,
            {
              borderRadius: theme.radius.button,
              borderColor: theme.colors.line,
              backgroundColor: theme.colors.bg,
            },
          ]}>
          <ThemedText size={14} color="faint">
            지금 떠오른 일을 적어 보세요
          </ThemedText>
        </View>
      </StepCard>
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 32,
    padding: 16,
  },
  cardTitle: {
    marginTop: 4,
  },
  fakeInput: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});

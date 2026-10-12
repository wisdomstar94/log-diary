import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { StepBody } from "../step-body";
import { StepLayout } from "../step-layout";
import { StepTitle } from "../step-title";

const BULLETS = ["내 드라이브의 앱 전용 폴더에만 저장", "매일 자동 백업 (설정에서 변경)"];

export function BackupStep(props: { onConnect: () => void; onSkip: () => void }) {
  const { onConnect, onSkip } = props;
  const theme = useTheme();

  return (
    <StepLayout
      label="2 / 2"
      primaryLabel="Google 드라이브 연결"
      onPrimary={onConnect}
      secondaryLabel="건너뛰기"
      onSecondary={onSkip}>
      <StepTitle>{"기록은 이 휴대폰에만\n저장됩니다"}</StepTitle>
      <StepBody>
        별도 서버가 없어 휴대폰을 바꾸거나 앱을 지우면 기록이 사라질 수 있어요. Google 드라이브에
        백업해 두면 언제든 복원할 수 있습니다.
      </StepBody>
      <View style={styles.bullets}>
        {BULLETS.map((bullet) => (
          <View key={bullet} style={styles.bullet}>
            <View style={[styles.dot, { backgroundColor: theme.colors.ink }]} />
            <ThemedText size={14}>{bullet}</ThemedText>
          </View>
        ))}
      </View>
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  bullets: {
    marginTop: 32,
    gap: 10,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

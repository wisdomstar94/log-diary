import { APP_NAME } from "@log-diary/shared-const/app/app-name";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { StepBody } from "../step-body";
import { StepCard } from "../step-card";
import { StepLayout } from "../step-layout";
import { StepTitle } from "../step-title";

const SAMPLE_LINES = [
  { time: "09:00", text: "출근" },
  { time: "09:20", text: "갑자기 긴급 회의 일정이 공유됨" },
  { time: "09:59", text: "긴급 회의 하러 회의실로 감" },
];

export function IntroStep(props: { onStart: () => void }) {
  const { onStart } = props;
  const theme = useTheme();

  return (
    <StepLayout
      label="Log Diary"
      primaryLabel="시작하기"
      onPrimary={onStart}
      footerTop={
        <View style={styles.dots}>
          <View style={[styles.dotActive, { backgroundColor: theme.colors.ink }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.line }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.line }]} />
        </View>
      }>
      <StepTitle size={34}>{APP_NAME}</StepTitle>
      <StepBody size={16}>
        겪은 일, 순간 든 생각을 그때그때 바로 적는 일기. 나중에 정리하려다 잊어버리기 전에 남겨
        두세요.
      </StepBody>
      <StepCard style={styles.card}>
        <ThemedText font="time" size={14} color="sub" lineHeightRatio={1.7} style={styles.date}>
          2026년 10월 11일 일요일
        </ThemedText>
        {SAMPLE_LINES.map((line) => (
          <ThemedText key={line.time} font="time" size={14} lineHeightRatio={1.7}>
            <ThemedText font="time" size={14} color="accent">
              {`[${line.time}]`}
            </ThemedText>
            {` ${line.text}`}
          </ThemedText>
        ))}
        <ThemedText font="time" size={14} color="faint" lineHeightRatio={1.7}>
          …
        </ThemedText>
      </StepCard>
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 36,
    padding: 20,
  },
  date: {
    marginBottom: 10,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

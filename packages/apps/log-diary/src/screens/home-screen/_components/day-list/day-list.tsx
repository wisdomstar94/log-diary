import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import type { DaySummary } from "@/types/day-summary";

import { DayListRow } from "./_components/day-list-row";

export function DayList(props: { days: DaySummary[]; onPressDay: (dateKey: string) => void }) {
  const { days, onPressDay } = props;
  const theme = useTheme();

  if (days.length === 0) {
    return (
      <ThemedText size={14} color="sub" style={styles.empty}>
        이 달에는 기록이 없습니다
      </ThemedText>
    );
  }

  return (
    <View style={[styles.container, { gap: theme.listGap }]}>
      {days.map((day) => (
        <DayListRow key={day.date} day={day} onPress={() => onPressDay(day.date)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  empty: {
    paddingVertical: 60,
    textAlign: "center",
  },
});
